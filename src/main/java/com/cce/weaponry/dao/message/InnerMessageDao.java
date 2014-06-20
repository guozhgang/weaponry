package com.cce.weaponry.dao.message;

import org.springframework.stereotype.Repository;

import com.cce.modules.orm.hibernate.HibernateDao;
import com.cce.weaponry.entity.message.InnerMessage;

@Repository
public class InnerMessageDao extends HibernateDao<InnerMessage, Long> {

	/**
	 * 返回新邮件数量
	 * 
	 * @param userName
	 * @return
	 */
	public long getNewMessageCount(String userName) {
		String hql = "select count (*) from InnerMessage WHERE receiver = ? and dueTime is null and inbox!=3";
		return (Long) this.createQuery(hql, userName).uniqueResult();
	}
}
