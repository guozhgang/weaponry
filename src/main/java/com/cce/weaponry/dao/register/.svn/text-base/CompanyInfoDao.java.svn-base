package com.cce.weaponry.dao.register;

import org.springframework.stereotype.Repository;

import com.cce.modules.orm.hibernate.HibernateDao;
import com.cce.weaponry.entity.register.CompanyInfo;

@Repository
public class CompanyInfoDao extends HibernateDao<CompanyInfo, Long> {

	public void merge(CompanyInfo entity) {
		super.getSession().merge(entity);
	}

}
