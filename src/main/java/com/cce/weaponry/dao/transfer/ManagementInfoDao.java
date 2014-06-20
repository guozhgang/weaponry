package com.cce.weaponry.dao.transfer;

import org.springframework.stereotype.Repository;

import com.cce.modules.orm.hibernate.HibernateDao;
import com.cce.weaponry.entity.transfer.ManagementInfo;

@Repository
public class ManagementInfoDao extends HibernateDao<ManagementInfo, Long> {

}
