package com.cce.weaponry.service.message;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import sun.security.util.Debug;

import com.cce.modules.orm.Page;
import com.cce.modules.orm.PropertyFilter;
import com.cce.modules.security.springsecurity.SpringSecurityUtils;
import com.cce.modules.service.CrudServiceInterface;
import com.cce.weaponry.dao.message.AttachmentDao;
import com.cce.weaponry.entity.message.Attachment;

@Service
@Transactional
public class AttachmentService implements CrudServiceInterface<Attachment> {
	@Autowired
	private AttachmentDao attachmentDao;

	public void delete(List<Long> ids) {
		attachmentDao.delete(ids);

	}

	/**
	 * 查看 收件箱
	 * 
	 * @param page
	 * @param object
	 * @return
	 */
	public Page<Attachment> getInnMsg(Page<Attachment> page, Object object) {
		StringBuilder hql = new StringBuilder()
				.append(" from Attachment a where a.innerMessage.receiver='"
								+ SpringSecurityUtils.getCurrentUserName()
								+ "' and a.innerMessage.inbox=0   ");
		if (null != object && !"".equals(object)) {
			hql.append(" and (a.innerMessage.sender like '%" + object + "%'");
			hql.append(" or a.innerMessage.topic like '%" + object + "%')");
		}
		hql.append(" order by a.innerMessage.createTime desc");
		Debug.println("用户查看收件箱内容 ", hql.toString());
		return attachmentDao.findPage(page, hql.toString());
	}

	/**
	 * 查看发件箱
	 * 
	 * @param page
	 * @param object
	 * @return
	 */
	public Page<Attachment> getSenderMsg(Page<Attachment> page, Object object) {
		StringBuilder hql = new StringBuilder()
				.append(
						"from Attachment a where a.senderMessage.sender='"
								+ SpringSecurityUtils.getCurrentUserName()
								+ "'");
		if (null != object && !"".equals(object)) {
			hql
					.append(" and (a.senderMessage.receiver like '%" + object
							+ "%'");
			hql.append(" or a.senderMessage.topic like '%" + object + "%')");
		}
		hql.append(" order by a.senderMessage.createTime desc");
		Debug.println("用户查看发件箱内容", hql.toString());
		return attachmentDao.findPage(page, hql.toString());
	}

	/**
	 * 查看草稿箱
	 */
	public Page<Attachment> getDraftBox(Page<Attachment> page, Object object) {
		StringBuilder hql = new StringBuilder()
				.append("from Attachment a where a.draftBox.sender='"
						+ SpringSecurityUtils.getCurrentUserName() + "'");
		if (null != object && !"".equals(object)) {
			hql.append(" and (a.draftBox.receiver like '%" + object
							+ "%'");
			hql.append(" or a.draftBox.topic like '%" + object + "%')");
		}
		hql.append(" order by a.draftBox.createTime desc");
		Debug.println("用户查看草稿箱内容", hql.toString());
		return attachmentDao.findPage(page, hql.toString());
	}

	// 根据附件的ID查看附件
	public Attachment getFileId(Long id) {
		StringBuilder hql = new StringBuilder()
				.append("from Attachment a where a.file.id='" + id + "'");
		Debug.println("根据文件ID查看附件", hql.toString());
		return attachmentDao.findUnique(hql.toString());
	}

	/**
	 * 根据收件箱ID查找附件
	 * 
	 * @param id
	 * @return
	 */
	public List<Long> getAttByInnerMessageID(List<Long> ids) {
		StringBuilder hql = new StringBuilder()
				.append("select a.id from Attachment a where a.innerMessage.id in(");
		if (null == ids)
			return null;
		for (Long id : ids) {
			hql.append(id).append(",");
		}
		hql.deleteCharAt(hql.length() - 1);
		hql.append(")");
		Debug.println("根据收件箱ID查看附件", hql.toString());
		return attachmentDao.find(hql.toString());
	}

	/**
	 * 根据发件信息ID查找附件
	 * 
	 * @param id
	 * @return
	 */
	public List<Long> getAttBySenderMessageID(List<Long> ids) {
		StringBuilder hql = new StringBuilder()
				.append("select a.id from Attachment a where a.senderMessage.id in(");
		if (null == ids)
			return null;
		for (Long id : ids) {
			hql.append(id).append(",");
		}
		hql.deleteCharAt(hql.length() - 1);
		hql.append(")");
		Debug.println("根据发件箱ID查看附件 ", hql.toString());
		return attachmentDao.find(hql.toString());
	}

	/**
	 * 根据草稿箱信息ID查找附件
	 * 
	 * @param id
	 * @return
	 */
	public List<Long> getAttByDrafBoxID(List<Long> ids) {
		if (ids.size() <= 0)
			return null;
		StringBuilder hql = new StringBuilder()
				.append("select a.id  from Attachment a where a.draftBox.id in(");
		for (Long id : ids) {
			hql.append(id).append(",");
		}
		hql.deleteCharAt(hql.length() - 1);
		hql.append(")");
		Debug.println("根据草稿箱ID查看附件 ", hql.toString());
		return attachmentDao.find(hql.toString());
	}
	public List<Attachment> list(List<PropertyFilter> filters) {
		// TODO Auto-generated method stub
		return null;
	}

	public Page<Attachment> list(Page<Attachment> page,
			List<PropertyFilter> filters) {
		// TODO Auto-generated method stub
		return null;
	}

	public void save(Attachment entity) {
		// TODO Auto-generated method stub
		attachmentDao.save(entity);
	}

	public Attachment get(Long id) {
		// TODO Auto-generated method stub
		return attachmentDao.get(id);
	}
	 

}
