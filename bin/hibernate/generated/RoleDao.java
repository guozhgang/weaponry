package com.cce.safepork.entity.security;

import org.springframework.stereotype.Repository;
import org.springside.modules.orm.hibernate.HibernateDao;

import com.cce.safepork.entity.security.Role;

@Repository
public class RoleDao extends HibernateDao<Role, Long> {
}

