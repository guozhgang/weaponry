package com.cce.weaponry.dao.security;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.cce.modules.orm.hibernate.HibernateDao;
import com.cce.weaponry.entity.security.Menu;

@Repository
public class MenuDao extends HibernateDao<Menu, Long> {

	public List<Menu> getRootMenus() {
		return createQuery(
				"FROM com.cce.weaponry.entity.security.Menu WHERE parent IS NULL")
				.list();
	}
}
