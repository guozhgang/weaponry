package com.cce.weaponry.service.message;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cce.modules.orm.Page;
import com.cce.modules.orm.PropertyFilter;
import com.cce.modules.security.springsecurity.SpringSecurityUtils;
import com.cce.modules.service.CrudServiceInterface;
import com.cce.weaponry.dao.message.InnerMessageDao;
import com.cce.weaponry.entity.message.InnerMessage;

@Service
@Transactional
public class InnerMessageCrudService implements
		CrudServiceInterface<InnerMessage> {
	private final String DELETE_FROM_INBOX = "update InnerMessage set inbox=3 where id in (:ids)";
	private final String DELETE_FROM_OUTBOX = "update InnerMessage set outbox=3 where id in (:ids)";

	@Autowired
	private InnerMessageDao innerMessageDao;

	public InnerMessageDao getInnerMessageDao() {
		return innerMessageDao;
	}

	public void setInnerMessageDao(InnerMessageDao InnerMessageDao) {
		this.innerMessageDao = InnerMessageDao;
	}
	@Transactional(readOnly = true)
	public InnerMessage get(Long id) {
		return innerMessageDao.get(id);
	}

	@Transactional(readOnly = true)
	public List<InnerMessage> list(final List<PropertyFilter> filters) {
		return innerMessageDao.find(filters);
	}

	@Transactional(readOnly = true)
	public Page<InnerMessage> list(final Page<InnerMessage> page,
			final List<PropertyFilter> filters) {
		return innerMessageDao.findPage(page, filters);
	}

	@Transactional(readOnly = true)
	public Page<InnerMessage> listMyInboxMessages(
			final Page<InnerMessage> page, final List<PropertyFilter> filters) {
		filters.add(new PropertyFilter("EQS_receiver", SpringSecurityUtils
				.getCurrentUserName()));
		filters.add(new PropertyFilter("NEI_inbox", "3"));
		return innerMessageDao.findPage(page, filters);
	}
	@Transactional(readOnly = true)
	public long getNewMessagesCount(String loginName) {
		return innerMessageDao.getNewMessageCount(loginName);
	}

	public void save(InnerMessage entity) {
		if (entity.getId() == null) {
			entity.setSender(SpringSecurityUtils.getCurrentUserName());
			entity.setCreateTime(new Date());
		} else {
			entity.setDueTime(new Date());
		}
		innerMessageDao.save(entity);
	}

	// 发送邮件
	public void sendTo(InnerMessage entity, String[] userNames) {
		entity.setSender(SpringSecurityUtils.getCurrentUserName());
		entity.setCreateTime(new Date());
		try {
			for (int i = 0; i < userNames.length; i++) {
				InnerMessage obj = (InnerMessage) entity.clone();
				if (null != userNames[i]) {
				obj.setReceiver(userNames[i]);
					innerMessageDao.save(obj);
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	// 删除收件箱邮件
	public void deleteFromInbox(List<Long> ids) {
		Map<String, List<Long>> idsMap = new HashMap<String, List<Long>>();
		idsMap.put("ids", ids);
		innerMessageDao.batchExecute(DELETE_FROM_INBOX, idsMap);
	}

	// 删除发件箱邮件
	public void deleteFromOutbox(List<Long> ids) {
		Map<String, List<Long>> idsMap = new HashMap<String, List<Long>>();
		idsMap.put("ids", ids);
		innerMessageDao.batchExecute(DELETE_FROM_OUTBOX, idsMap);
	}

	public void delete(List<Long> ids) {
		innerMessageDao.delete(ids);
	}

}
