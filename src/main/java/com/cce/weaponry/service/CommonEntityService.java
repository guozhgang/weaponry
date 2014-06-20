package com.cce.weaponry.service;

import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Assert;

import com.cce.weaponry.entity.dict.IDict;

@Service
public class CommonEntityService {
	protected Logger logger = LoggerFactory.getLogger(getClass());
	protected SessionFactory sessionFactory;
	private static Map<String, Object> dictMap = new HashMap<String, Object>();

	public CommonEntityService() {
	}

	/**
	 * 取得sessionFactory.
	 */
	public SessionFactory getSessionFactory() {
		return sessionFactory;
	}

	/**
	 * 采用@Autowired按类型注入SessionFactory,当有多个SesionFactory的时候Override本函数.
	 */
	@Autowired
	public void setSessionFactory(final SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}

	/**
	 * 取得当前Session.
	 */
	public Session getSession() {
		return sessionFactory.getCurrentSession();
	}

	@Transactional(readOnly = true)
	public Object getDictEntityByValue(final Class<?> entityClass, String value) {
		List<IDict> dList = getDictEntities(entityClass);
		for (Iterator iterator = dList.iterator(); iterator.hasNext();) {
			IDict dict = (IDict) iterator.next();
			if (dict.getValue().equals(value))
				return dict;
		}
		return null;
	}

	/**
	 * 根据类名和code得到相应的实体信息
	 * 
	 * @param entityClass
	 * @param code
	 * @return
	 */
	@Transactional(readOnly = true)
	public Object getDictEntityByCode(final Class<?> entityClass, String code) {
		// 创建查询标准
		Criteria criteria = getSession().createCriteria(entityClass);
		// 添加约束 - code
		criteria.add(Restrictions.eq("code", code));
		// 查询
		List list = criteria.list();

		// 因code不会重复,故得到第一项
		if (list.size() > 0)
			return list.get(0);
		// 没有匹配项时返回null
		return null;
	}

	/**
	 * 通过类名和id得到相应的实体信息
	 * 
	 * @param entityClass
	 * @param id
	 * @return
	 */
	@Transactional(readOnly = true)
	public Object getDictEntityById(final Class<?> entityClass, Long id) {
		// 创建标准
		Criteria criteria = getSession().createCriteria(entityClass);

		// 添加约束 - id
		criteria.add(Restrictions.eq("id", id));

		// 查询
		List list = criteria.list();

		// 因id唯一,故第一项即为查找项
		if (list.size() > 0)
			return list.get(0);
		// 没有匹配项，返回null
		return null;
	}

	@Transactional(readOnly = true)
	public List getDictEntities(final Class<?> entityClass) {
		if (!dictMap.containsKey(entityClass.getName())) {
			dictMap.put(entityClass.getName(), findAll(entityClass));
		}
		return (List) dictMap.get(entityClass.getName());
	}

	/**
	 * 按class获取对象.
	 */
	@Transactional(readOnly = true)
	public List findAll(final Class<?> entityClass) {
		return getSession().createCriteria(entityClass).list();
	}

	/**
	 * 按class和id获取对象.
	 */
	@Transactional(readOnly = true)
	public Object get(final Class<?> entityClass, Long id) {
		Assert.notNull(id, "id不能为空");
		return getSession().get(entityClass, id);
	}

	/**
	 * 按class和id获取对象.
	 */
	@Transactional(readOnly = true)
	public List getAllEntity(final Class<?> entityClass, List<Long> ids) {
		Assert.notNull(ids, "ids不能为空");
		Criteria criteria = getSession().createCriteria(entityClass);
		criteria.add(Restrictions.in("id", ids));
		return criteria.list();
	}

	@Transactional
	public void delete(Object entity) {
		Assert.notNull(entity, "entity is null");
		getSession().delete(entity);
	}

	@Transactional
	public void save(Object entity) {
		Assert.notNull(entity, "entity is null");
		getSession().save(entity);
	}

	@Transactional(readOnly = true)
	public List createSQLQuery(String sql) {
		return getSession().createSQLQuery(sql).list();
	}

}
