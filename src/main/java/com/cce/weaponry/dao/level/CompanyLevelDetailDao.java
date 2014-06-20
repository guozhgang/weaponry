package com.cce.weaponry.dao.level;

import org.springframework.stereotype.Repository;

import com.cce.modules.orm.hibernate.HibernateDao;
import com.cce.weaponry.entity.level.CompanyLevelDetail;


@Repository
public class CompanyLevelDetailDao extends
		HibernateDao<CompanyLevelDetail, Long> {

}
