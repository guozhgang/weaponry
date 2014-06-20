package com.cce.weaponry.dao.security;

import java.util.List;

import org.hibernate.Query;
import org.springframework.stereotype.Repository;

import com.cce.modules.orm.hibernate.HibernateDao;
import com.cce.weaponry.entity.security.Resource;

/**
 * 受保护资源对象的泛型DAO.
 * 
 * @author cce
 */
@Repository
public class ResourceDao extends HibernateDao<Resource, Long> {

	public static final String QUERY_BY_RESOURCETYPE_WITH_AUTHORITY = "from Resource r left join fetch r.authorityList WHERE r.resourceType=? ORDER BY r.position ASC";

	/**
	 * 查询URL类型的资源并预加载可访问该资源的授权信息.
	 */
	@SuppressWarnings("unchecked")
	public List<Resource> getUrlResourceWithAuthorities() {
		Query query = createQuery(QUERY_BY_RESOURCETYPE_WITH_AUTHORITY, Resource.URL_TYPE);
		return distinct(query).list();
	}
}
