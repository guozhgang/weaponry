package com.cce.weaponry.dao.level;

import org.springframework.stereotype.Repository;

import com.cce.modules.orm.hibernate.HibernateDao;
import com.cce.weaponry.entity.level.CompanyLevelItemTemplate;

@Repository
public class CompanyLevelItemTemplateDao extends
		HibernateDao<CompanyLevelItemTemplate, Long> {

}
