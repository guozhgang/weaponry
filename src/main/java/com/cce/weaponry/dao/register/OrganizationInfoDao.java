package com.cce.weaponry.dao.register;

import org.springframework.stereotype.Repository;

import com.cce.modules.orm.hibernate.HibernateDao;
import com.cce.weaponry.entity.register.OrganizationInfo;

@Repository
public class OrganizationInfoDao extends HibernateDao<OrganizationInfo, Long> {

}
