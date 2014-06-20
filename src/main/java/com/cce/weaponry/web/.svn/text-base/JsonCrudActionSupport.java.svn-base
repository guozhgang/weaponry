package com.cce.weaponry.web;

import java.lang.reflect.Constructor;
import java.util.List;

import com.cce.modules.orm.IdEntity;
import com.cce.modules.orm.Page;
import com.cce.modules.service.CrudServiceInterface;
import com.cce.modules.utils.ReflectionUtils;
import com.cce.modules.web.json.JsonStore;

/**
 * CRUD接口定义.
 * 
 * 页面中Ext.data.HttpProxy的定义如下:
 * 
 * <pre>
 * <code>
 * var proxy = new Ext.data.HttpProxy({
 *    api: {
 *     read : 'security/user!list.action',
 *     create : 'security/user!save.action',
 *     update: 'security/user!save.action',
 *     destroy: 'security/user!delete.action'
 * 	   }
 * );
 * </code>
 * 
 * JsonCrudActionSupport的接口, 与Ext.data.HttpProxy的对应关系如下:
 * 
 * read<-->list
 * 页面从Action中读取数据,一般是列表形式.<br>
 * 
 * create,update<-->save
 * 页面打开的form编辑完成后,向Action提交数据,Action通过解析HttpRequest中的Parameters,
 * 并执行JSON的反序列化(this.getRequestBean()),拿到页面传进来的java bean.调用Service层进行持久化操作..
 * create时,id为null, Hibernate会新建记录; save时,Hibernate会更新记录...
 *                
 * delete<-->destroy               
 * 页面传入id,要求Action删除一条记录.
 * 
 * input
 * 当页面打开一个form,需要新建或编辑一条记录时,向Action请求数据,所请求的数据,可能是这条记录本身(此时需传入ID),
 * 可能还包括一些辅助信息(用来生成下拉框等)
 * 
 * </pre>
 * 
 * @author cce
 * 
 * @param <T>
 */
public abstract class JsonCrudActionSupport<T extends IdEntity> extends JsonActionSupport<T> {

	/**
	 * Action函数, 默认的action函数, 默认调用list()函数.
	 */
	@Override
	public String execute() throws Exception {
		list();
		return NONE;
	}

	/**
	 * 子类需实现此方法, 提供Crud类型的Service具体实现.
	 * 
	 * @return
	 */
	public abstract CrudServiceInterface<T> getCrudService();

	// -- CRUD Action函数 --//

	/**
	 * Action函数,分页形式显示Entity列表界面.
	 */
	public void list() throws Exception {
		Page<T> page = this.getCrudService().list(this.setupPage(), this.setupFilters());
		this.render(page);
	}

	/**
	 * Action函数,显示Entity列表界面.
	 */
	public void listAll() {
		List<T> list = this.getCrudService().list(this.setupFilters());
		this.render(new JsonStore(list));
	}

	/**
	 * Action函数,新增或修改Entity.
	 * 
	 * Save后,返回保存后的带有id字段的Record,这样做的两个好处:
	 * 
	 * <pre>
	 * 1.创建或保存后,不必再调用store.reload()方法刷新数据,后台和页面已经保持同步了.
	 * 2.只有这样,才能使Ext.data.DataProxy.addListener('write',function(){...})捕获到write事件,弹出提示窗口.
	 * </pre>
	 */
	public void save() throws Exception {
		try {
			T entity = this.getRequestBean();
			if (entity != null) {
				getCrudService().save(entity);
				this.render(getJsonSerializer().serialize(new JsonStore(entity)));
			} else
				throw new RuntimeException("参数错误,指定的数据不存在!");
		} catch (Exception e) {
			this.renderMessage(false, e.getMessage());
			logger.error(e.getMessage(), e);
		}
	}

	/**
	 * Action函数,删除Entity.
	 */
	public void delete() throws Exception {
		try {
			List<Long> ids = getIdArrayParam();
			if (ids != null && !ids.isEmpty()) {
				getCrudService().delete(ids);
				renderSuccess();
			} else
				throw new RuntimeException("参数错误,指定的数据不存在!");
		} catch (Exception e) {
			this.renderMessage(false, e.getMessage());
			logger.error(e.getMessage(), e);
		}
	}

	/**
	 * Action函数,当显示新增或修改Entity界面时, 返回指定ID(HttpRequest参数)的Entity. 子类可以重载此方法,
	 * 为编辑页面提供数据. 也可以重载prepareInput(JsonStore jsonStore), 只添加除此Entity之外的数据.
	 */
	public void input() {
		Long entityId = getIdParam();
		T entity = null;
		if (entityId != null) {
			entity = getCrudService().get(entityId);
		} else {
			Class<T> clazz = ReflectionUtils.getSuperClassGenricType(this.getClass());
			try {
				Constructor<T> constructor = clazz.getDeclaredConstructor();
				constructor.setAccessible(true);
				entity = constructor.newInstance();
			} catch (Exception e) {
				logger.warn("There was an exception trying to instantiate an instance of " + clazz.getName(), e);
			}
		}
		JsonStore js = new JsonStore(entity);
		prepareInput(js);
		this.render(js);
	}

	/**
	 * 子类可重载此方法, 为input提供额外的数据.
	 * 
	 * @param jsonStore
	 */
	protected void prepareInput(JsonStore jsonStore) {
		// do nothing here...
	}

	/**
	 * Action函数,返回指定id的Entity.
	 */
	public void get() {
		Long entityId = getIdParam();
		if (entityId != null) {
			T entity = getCrudService().get(entityId);
			render(new JsonStore(entity));
		} else {
			this.renderMessage(false, "查询失败,ID为[" + entityId + "]的记录不存在!");
		}
	}
		
}
