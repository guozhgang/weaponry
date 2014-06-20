package com.cce.weaponry.dao.security;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.cce.modules.orm.hibernate.HibernateDao;
import com.cce.weaponry.entity.security.Role;
import com.cce.weaponry.entity.security.User;

/**
 * 角色对象的泛型DAO.
 * 
 * @author cce
 */
@Repository
public class RoleDao extends HibernateDao<Role, Long> {

	private static final String QUERY_USER_BY_ROLEID = "select u from User u left join u.roleList r where r.id=?";

	@Override
	public void delete(List<Long> ids) {
		String roleSql = "delete from SS_ROLE where id in(";
		String fkSql = "delete from SS_ROLE_MENU where ROLE_ID in (";
		for (Long l : ids) {
			roleSql += l + ",";
			fkSql += l + ",";
		}
		roleSql = roleSql.substring(0, roleSql.length() - 1) + ");";
		fkSql = fkSql.substring(0, fkSql.length() - 1) + ");";
		String sql = fkSql + roleSql;
		System.out.println("测试:" + sql);
		this.getSessionFactory().getCurrentSession().createSQLQuery(sql)
				.executeUpdate();
	}

	/**
	 * 重载函数,因为Role中没有建立与User的关联,因此需要以较低效率的方式进行删除User与Role的多对多中间表.
	 */
	@SuppressWarnings("unchecked")
	@Override
	public void delete(Long id) {
		Role role = get(id);
		//查询出拥有该角色的用户,并删除该用户的角色.
		List<User> users = createQuery(QUERY_USER_BY_ROLEID, role.getId()).list();
		for (User u : users) {
			u.getRoleList().remove(role);
		}
		super.delete(role);
	}
}
