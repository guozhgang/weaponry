package com.cce.safepork.entity.security;

import org.springframework.stereotype.Repository;
import org.springside.modules.orm.hibernate.HibernateDao;

import com.cce.safepork.entity.security.User;

@Repository
public class UserDao extends HibernateDao<User, Long> {
}

