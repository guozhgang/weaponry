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
import com.cce.weaponry.dao.message.SenderMessageDao;
import com.cce.weaponry.entity.message.SenderMessage;

@Service
@Transactional
public class SenderMessageCrudService implements CrudServiceInterface<SenderMessage> {

	private final String DELETE_FROM_OUTBOX = "delete SenderMessage  where id in (:ids)";
	@Autowired
	private SenderMessageDao senderMessageDao;

	/**
	 * 删除发件箱内容
	 * 
	 * @param ids
	 */
	public void deleteFromOutbox(List<Long> ids) {
		Map<String, List<Long>> idsMap = new HashMap<String, List<Long>>();
		idsMap.put("ids", ids);
		senderMessageDao.batchExecute(DELETE_FROM_OUTBOX, idsMap);
	}

	@Transactional(readOnly = true)
	public SenderMessage get(Long id) {
		return senderMessageDao.get(id);
	}

	@Transactional(readOnly = true)
	public List<SenderMessage> list(List<PropertyFilter> filters) {
		filters.add(new PropertyFilter("EQS_sender", SpringSecurityUtils.getCurrentUserName()));
		return senderMessageDao.find(filters);
	}

	@Transactional(readOnly = true)
	public Page<SenderMessage> list(Page<SenderMessage> page, List<PropertyFilter> filters) {
		filters.add(new PropertyFilter("EQS_sender", SpringSecurityUtils.getCurrentUserName()));
		return senderMessageDao.findPage(page, filters);
	}

	/**
	 * 保存发件内容
	 */
	public void save(SenderMessage entity) {
		if (entity.getId() == null) {
			entity.setSender(SpringSecurityUtils.getCurrentUserName());
			entity.setCreateTime(new Date());
		}
		senderMessageDao.save(entity);
	}

	/**
	 * 根据登录用户名查看发件箱内容
	 * 
	 * @param page
	 * @return
	 */
	public Page<SenderMessage> getMySelfSender(Page<SenderMessage> page) {
		String hql = "from SenderMessage where sender='"
				+ SpringSecurityUtils.getCurrentUserName() + "'";
		sun.security.util.Debug.println("查看发件箱内容", hql);
		return senderMessageDao.findPage(page, hql.toString());
	}

	public Page<SenderMessage> getfilter(Page<SenderMessage> page, Object str) {
		StringBuilder hql = new StringBuilder()
				.append("from SenderMessage  s where s.sender='"
						+ SpringSecurityUtils.getCurrentUserName() + "'");
		if (null != str && !"".equals(str)) {
			hql.append(" and (s.receiver like '%" + str
					+ "%' or s.topic like '%" + str + "%')");
		}
		sun.security.util.Debug.println("当条件不为空时根据接收者、标题查看发件箱", hql.toString());
		return senderMessageDao.findPage(page, hql.toString());
	}
	public void delete(List<Long> ids) {
		// TODO Auto-generated method stub
	}
}
