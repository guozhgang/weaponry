package com.cce.weaponry.dao.config;

import org.springframework.stereotype.Repository;

import com.cce.modules.orm.hibernate.HibernateDao;
import com.cce.weaponry.entity.config.SysConfig;

@Repository
public class SysConfigDao extends HibernateDao<SysConfig, Long> {

	public String getValueByCode(String confCode) {
		StringBuilder hql = new StringBuilder(
				"select i.confValue from SysConfig i where i.confCode='");
		hql.append(confCode).append("' ");
		Object ret = getSession().createQuery(hql.toString())
				.uniqueResult();
		return ret == null ? null : ret.toString();
	}

}
