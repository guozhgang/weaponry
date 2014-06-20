package com.cce.weaponry.web;

import java.beans.PropertyDescriptor;
import java.lang.reflect.Constructor;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.lang.reflect.Modifier;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.FatalBeanException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.Assert;

import com.cce.modules.orm.IdEntity;
import com.cce.modules.orm.Page;
import com.cce.modules.orm.PropertyFilter;
import com.cce.modules.orm.hibernate.HibernateWebUtils;
import com.cce.modules.utils.ReflectionUtils;
import com.cce.modules.web.json.JsonAction;
import com.cce.modules.web.json.JsonStore;
import com.cce.modules.web.struts2.Struts2Utils;
import com.cce.weaponry.service.CommonEntityService;

import flexjson.JSONDeserializer;
import flexjson.JSONException;
import flexjson.JSONSerializer;
import flexjson.ObjectBinder;
import flexjson.ObjectFactory;
import flexjson.Transformer;

/**
 * 支持Json<-->JavaBean转换的Action
 * 
 * @author cce
 * 
 */
public class JsonActionSupport<T extends IdEntity> extends JsonAction {

	@Autowired
	protected CommonEntityService entityService;

	// ///////////////////////////////////////////////////////////////////////////////////
	// Java ---> Json
	// ///////////////////////////////////////////////////////////////////////////////////

	/**
	 * 返回默认的JSONSerializer. 子类可重载此方法以定制Java-->Json的参数.
	 * 例如使用transform方法添加transformer以定制json数据的输出.
	 * 
	 * @return
	 */
	@Override
	public JSONSerializer getJsonSerializer() {
		return new JSONSerializer().exclude("*.class");
	}

	/**
	 * 此Transformer的作用是输出Entity对象所关联的对象的id.
	 * 
	 * 比如, <code>
	 * String json = new JSONSerializer().serialize(user);
	 * 那么,user.Role, 输出到json就是 role 的 id.
	 * </code>
	 * 
	 * @return
	 */
	public Transformer getEntityIdTransformer() {
		return new Transformer() {
			public String transform(Object value) {
				if (value != null && value instanceof IdEntity)
					return ((IdEntity) value).getId().toString();
				return null;
			}
		};
	}

	/**
	 * 输出数组对象所关联的所有对象的id.
	 * 
	 * 比如, <code>
	 * String json = new JSONSerializer().serialize(user);
	 * 那么,role.menuList, 输出到json就是 id1,id2,id3.
	 * </code>
	 * 
	 * @return
	 */
	public Transformer getArrayObjectTransformer() {
		return new Transformer() {
			public String transform(Object value) {
				try {
					if (value != null && value instanceof ArrayList)
						return ReflectionUtils.convertElementPropertyToString(
								(List) value, "id", ", ");
				} catch (Exception e) {
					logger.error("transform error", e);
				}
				return null;
			}
		};
	}

	// ///////////////////////////////////////////////////////////////////////////////////
	// Json ---> Java
	// ///////////////////////////////////////////////////////////////////////////////////

	/**
	 * 返回默认的JSONDeserializer. 子类可重载此方法以定制Json-->Java的参数.
	 * 例如使用use方法添加transformer,控制json生成java bean的过程.
	 * 
	 * @return
	 */
	public JSONDeserializer<T> getJsonDeserializer() {
		return new JSONDeserializer<T>();
	}

	/**
	 * 利用JSON的反序列化生成JavaBean.
	 * 
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public T getRequestBean() {
		T ret = null;
		String data = Struts2Utils.getParameter(JsonStore.RootProperty);
		if (data == null)
			return ret;
		Class<T> clazz = ReflectionUtils.getSuperClassGenricType(this
				.getClass());
		JSONDeserializer<T> deserializer = this.getJsonDeserializer();
		T entityFromJson = deserializer.use(null, clazz).deserialize(data);
		Map<String, Object> jsonMap = deserializer.getJsonMap();

		return (T) populateEntity(entityFromJson, jsonMap, clazz);
	}

	@SuppressWarnings("unchecked")
	protected IdEntity populateEntity(IdEntity entityFromJson,
			Map<String, Object> jsonMap, Class clazz) {
		IdEntity ret = null;
		/*
		 * 如果id!=null, 说明是update动作.这时我们需要根据id把Entity从数据库中找出来, 然后把json->java
		 * bean得到的Entity的值复制到Entity中.. 之所以这样做,是为了可以处理页面writeAllFields=false的情况.
		 * 即,如果不是所有字段都在json数据里,那么我们只应该把变化过的字段进行处理...
		 */
		if (entityFromJson.getId() != null) {
			T entityFromDB = (T) this.entityService.get(clazz, entityFromJson
					.getId());

			if (jsonMap != null && jsonMap.size() > 0) {
				copyBean(entityFromJson, entityFromDB, jsonMap);
				ret = entityFromDB;
			}
		} else {
			// id == null, 说明是新建对象,只需要返回反序列化得到的entity对象即可.
			ret = entityFromJson;
		}
		return ret;
	}

	/**
	 * 根据jsonMap中出现的key, 把source中key对应的属性值复制到target中. 即, 局部更新entityFromDB的属性值..
	 * 代码实现参考Springframework的BeanUtils
	 */
	public static void copyBean(Object source, Object target,
			Map<String, Object> jsonMap) {

		Assert.notNull(source, "Source must not be null");
		Assert.notNull(target, "Target must not be null");
		Class<?> actualEditable = target.getClass();

		PropertyDescriptor[] targetPds = BeanUtils
				.getPropertyDescriptors(actualEditable);
		Set<String> propList = jsonMap.keySet();

		for (PropertyDescriptor targetPd : targetPds) {
			// 如果target包含在jsonMap的keySet中, 并且可以写入.
			if (propList.contains(targetPd.getName()) && targetPd.getWriteMethod() != null) {
				PropertyDescriptor sourcePd = BeanUtils.getPropertyDescriptor(source.getClass(), targetPd.getName());
				if (sourcePd != null && sourcePd.getReadMethod() != null) {
					try {
						Method readMethod = sourcePd.getReadMethod();
						if (!Modifier.isPublic(readMethod.getDeclaringClass().getModifiers())) {
							readMethod.setAccessible(true);
						}
						Object value = readMethod.invoke(source);
						Method writeMethod = targetPd.getWriteMethod();
						if (!Modifier.isPublic(writeMethod.getDeclaringClass().getModifiers())) {
							writeMethod.setAccessible(true);
						}
						writeMethod.invoke(target, value);
					} catch (Throwable ex) {
						throw new FatalBeanException("Could not copy properties from source to target", ex);
					}
				}
			}
		}
	}

	/**
	 * 返回FlexJson的ObejctFactory.
	 * 
	 * 举例来说,前台页面传递json数据User,其中User有关联的Region,而页面只是把Region的id传进来.
	 * 这时需要根据id找到对应的Region,把把User的region属性设为新找到的Region.
	 * EntityObjectFactory是当FlexJson解析json数据生成JavaBean的时候,做id-->Entity转换的"对象工厂".
	 * 他可以处理所有的Entity...
	 * 
	 * 还有一种情况是,页面传进来的不是id,而是Region类对应的json数据.此时,就需要使用instantiateByJson()方法,
	 * 来解析json数据并把数据绑定到User所关联的Region对象.
	 * 
	 */
	@SuppressWarnings("unchecked")
	public ObjectFactory getEntityFactory() {
		return new ObjectFactory() {
			public Object instantiate(ObjectBinder context, Object value,
					Type targetType, Class targetClass) {
				// 如果是空字符串,我们认为是null. 因为对于一个表示Entity的字符串来说,要么是id,要是对象的json数据.
				if (value == null || value.toString().length() == 0)
					return null;

				Object entity = null;
				try {
					// 传进来的json数据是id, 如: {role:'12'}, 即id为12的Role.
					Long entityId = Long.parseLong(value.toString());
					if (entityId != null) {
						entity = entityService.get(targetClass, entityId);
					}
				} catch (NumberFormatException e) {
					// 传进来的数据是json对象, 对象里的id可以为null表示新建, 也可以不为null, 表示更新.
					// 如: {role: {id:'12', name:'admin', auths:'xxx'}}
					IdEntity entityFromJson = (IdEntity) instantiateByJson(
							context, value, targetType, targetClass);
					entity = populateEntity(entityFromJson,
							(Map<String, Object>) value, targetClass);
				}
				return entity;
			};
		};
	}

	/**
	 * 传进来的json数据是id集合, 如: {menuList:'1,2'}. 把 id 的Array 作为查询参数,
	 * 交给entityService, entityService用id Array创建Query查询, 一次性把所有entity查询出来,
	 * 以List形式返回.
	 */
	@SuppressWarnings("unchecked")
	public ObjectFactory getIdArrayObjectFactory() {
		return new ObjectFactory() {
			public Object instantiate(ObjectBinder context, Object value,
					Type targetType, Class targetClass) {
				// 如果是空字符串,我们认为是null. 因为对于一个表示Entity的字符串来说,要么是id,要是对象的json数据.
				if ((value == null || value.toString().length() < 1)
						|| !targetClass.getClass().isInstance(List.class))
					return null;
				// List list = new ArrayList();
				List<Long> idArray = new ArrayList<Long>();
				String[] ids = value.toString().split(",");
				for (int j = 0; j < ids.length; j++) {
					idArray.add(Long.parseLong(ids[j]));
				}
				return entityService.getAllEntity(
						(Class<T>) ((ParameterizedType) targetType)
								.getActualTypeArguments()[0], idArray);
			};
		};
	}

	@SuppressWarnings("unchecked")
	Object instantiateByJson(ObjectBinder context, Object value,
			Type targetType, Class targetClass) {
		try {
			Constructor constructor = targetClass.getDeclaredConstructor();
			constructor.setAccessible(true);
			Object target = constructor.newInstance();
			return context.bindIntoObject((Map) value, target, targetType);
		} catch (InstantiationException e) {
			throw new JSONException(
					context.getCurrentPath()
							+ ":There was an exception trying to instantiate an instance of "
							+ targetClass.getName(), e);
		} catch (IllegalAccessException e) {
			throw new JSONException(
					context.getCurrentPath()
							+ ":There was an exception trying to instantiate an instance of "
							+ targetClass.getName(), e);
		} catch (InvocationTargetException e) {
			throw new JSONException(
					context.getCurrentPath()
							+ ":There was an exception trying to instantiate an instance of "
							+ targetClass.getName(), e);
		} catch (NoSuchMethodException e) {
			throw new JSONException(
					context.getCurrentPath()
							+ ": "
							+ targetClass.getName()
							+ " lacks a no argument constructor.  Flexjson will instantiate any protected, private, or public no-arg constructor.",
					e);
		}

	}

	// /////////////////////////////////////////////////////////////////////////
	// --------------------------- Helper 函数 --------------------------- //
	// /////////////////////////////////////////////////////////////////////////
	/**
	 * 将ExtJS写入httpRequest中的分页参数,转换为Page类的参数. 前台传入httpRequest参数说明: start=0 开始页数
	 * limit=3 显示条数 sort=ID 排序字段 dir=DESC 排序方式
	 * 
	 * @return
	 */
	protected Page<T> setupPage() {
		Page<T> page = new Page<T>();

		try {
			int limit = Integer.parseInt(Struts2Utils.getParameter("limit"));
			int start = Integer.parseInt(Struts2Utils.getParameter("start"))
					/ limit + 1;
			String sort = Struts2Utils.getParameter("sort");
			String dir = Struts2Utils.getParameter("dir");
			page.setPageNo(start);
			page.setPageSize(limit);
			page.setOrderBy(sort);
			page.setOrder(dir);
		} catch (NumberFormatException e) {
		}
		return setOrderBy(page);
	}

	/**
	 * 设置默认排序方式
	 * 
	 * @param page
	 */
	protected Page<T> setOrderBy(Page<T> page) {
		if (!page.isOrderBySetted()) {
			page.setOrderBy("id");
			page.setOrder(Page.ASC);
		}
		return page;
	}

	/**
	 * 创建httpRequest中的过滤参数
	 * 
	 * @return
	 */
	protected List<PropertyFilter> setupFilters() {
		return HibernateWebUtils
				.buildPropertyFilters(Struts2Utils.getRequest());
	}

	/**
	 * 从httpRequest中获取Id参数.
	 * 
	 * @return
	 */
	protected Long getIdParam() {
		return getIdParam(JsonStore.RootProperty);
	}

	protected List<Long> getIdArrayParam() {
		List<Long> idArray = new ArrayList<Long>();
		try {
			String param = Struts2Utils.getParameter(JsonStore.RootProperty);
			if (param.startsWith("[")) {
				param = param.substring(1, param.length() - 1);
			}
			String[] ids = param.toString().split(",");
			for (int j = 0; j < ids.length; j++) {
				idArray.add(Long.parseLong(ids[j]));
			}
		} catch (NumberFormatException ex) {
		}
		return idArray;
	}

	protected Long getIdParam(String key) {
		String param = Struts2Utils.getParameter(key);
		try {
			return Long.valueOf(param);
		} catch (NumberFormatException ex) {
		}
		return null;
	}
}
