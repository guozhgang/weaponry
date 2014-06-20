package com.cce.weaponry.dao.security;

import org.springframework.stereotype.Repository;

import com.cce.modules.orm.hibernate.HibernateDao;
import com.cce.weaponry.entity.security.Authority;

/**
 * 授权对象的泛型DAO.
 * 
 * @author cce
 */
@Repository
public class AuthorityDao extends HibernateDao<Authority, Long> {
}
