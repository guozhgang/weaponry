package com.cce.weaponry.dao.security;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.cce.modules.orm.hibernate.HibernateDao;
import com.cce.modules.security.springsecurity.SpringSecurityUtils;
import com.cce.weaponry.entity.security.User;

/**
 * 用户对象的泛型DAO类.
 * 
 * @author cce
 */
@Repository
public class UserDao extends HibernateDao<User, Long> {

	public User getLoginUser() {
		String hql = "from User i where i.loginName='"
				+ SpringSecurityUtils.getCurrentUserName() + "' ";
		List<User> us = this.find(hql);
		return us.size() == 0 ? null : us.get(0);
	}

	@Override
	public void delete(List<Long> ids) {
		StringBuilder chComStatusHql = new StringBuilder(
				"update Company set active=0 where id in ( select u.company.id from User u where u.id in ( ");
		for (Long l : ids) {
			chComStatusHql.append(l).append(",");
		}
		chComStatusHql.deleteCharAt(chComStatusHql.length() - 1)
				.append(" ) ) ");
		// 首先更新企业状态
		this.getSession().createQuery(chComStatusHql.toString())
				.executeUpdate();
		// 然后删除用户
		for (Long i : ids) {
			this.delete(i);
		}
	}

	/**
	 * 得到登录用户regionId
	 */
	public Long getLoginUserRegionId() {
		String hql = "select i.region.id from User i where i.loginName='"
				+ SpringSecurityUtils.getCurrentUserName() + "' ";
		return (Long) getSession().createQuery(hql).uniqueResult();
	}

}
