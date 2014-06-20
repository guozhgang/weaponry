package com.cce.weaponry.dao.message;

import org.springframework.stereotype.Repository;

import com.cce.modules.orm.hibernate.HibernateDao;
import com.cce.weaponry.entity.message.SenderMessage;

@Repository
public class SenderMessageDao extends HibernateDao<SenderMessage, Long> {

}
