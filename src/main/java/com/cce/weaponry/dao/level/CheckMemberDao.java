package com.cce.weaponry.dao.level;

import org.springframework.stereotype.Repository;

import com.cce.modules.orm.hibernate.HibernateDao;
import com.cce.weaponry.entity.level.CheckMember;

@Repository
public class CheckMemberDao extends HibernateDao<CheckMember, Long> {

}
