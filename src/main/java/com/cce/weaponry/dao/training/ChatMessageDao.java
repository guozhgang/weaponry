package com.cce.weaponry.dao.training;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Order;
import org.springframework.stereotype.Repository;

import com.cce.modules.orm.PropertyFilter;
import com.cce.modules.orm.hibernate.HibernateDao;
import com.cce.weaponry.entity.training.ChatMessage;

@Repository
public class ChatMessageDao extends HibernateDao<ChatMessage, Long> {

	/*
	 * 返回最新的聊天记录,
	 */
	@SuppressWarnings("unchecked")
	public List<ChatMessage> getLast(Long entryId, int maxCount) {

		List<PropertyFilter> filterList = new ArrayList<PropertyFilter>();
		// filter_EQL_projectId=3
		System.out.println(this.getClass().getName() + " entryId " + entryId);
		filterList.add(new PropertyFilter("EQL_entryId", entryId.toString()));

		Criteria criteria = this.getSession().createCriteria(entityClass);

		Criterion[] criterions = this.buildPropertyFilterCriterions(filterList);

		for (Criterion c : criterions) {
			criteria.add(c);
		}
		criteria.addOrder(Order.desc("time"));
		criteria.setMaxResults(maxCount);

		List<ChatMessage> list = criteria.list();
		System.out.println(this.getClass().getName() + " count " + list.size());
		return list;
	}

}
