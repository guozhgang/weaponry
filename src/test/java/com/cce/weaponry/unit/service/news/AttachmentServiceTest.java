package com.cce.weaponry.unit.service.news;

import java.util.ArrayList;
import java.util.List;

import junit.framework.Assert;

import org.easymock.classextension.EasyMock;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import com.cce.modules.utils.ReflectionUtils;
import com.cce.weaponry.dao.message.AttachmentDao;
import com.cce.weaponry.entity.message.Attachment;
import com.cce.weaponry.entity.message.DraftBox;
import com.cce.weaponry.entity.message.InnerMessage;
import com.cce.weaponry.entity.message.SenderMessage;
import com.cce.weaponry.service.message.AttachmentService;


public class AttachmentServiceTest extends Assert {
	private AttachmentService attachmentService;
	private AttachmentDao attachmentDao;

	@Before
	public void setUp() {
		attachmentService = new AttachmentService();
		attachmentDao = EasyMock.createMock(AttachmentDao.class);
		ReflectionUtils.setFieldValue(attachmentService, "attachmentDao",
				attachmentDao);
	}

	@After
	public void tearDown() {
		EasyMock.verify(attachmentDao);
	}

	/**
	 * 测试保存附件
	 */
	@Test
	public void save() {
		Attachment at = new Attachment();
		at.setId(1l);
		at.setFile(null);
		attachmentDao.save(at);
		EasyMock.replay(attachmentDao);
		attachmentService.save(at);
	}

	/**
	 *测试 删除附件
	 */
	@Test
	public void delete() {
		Long id = 1l;
		List<Long> ids = new ArrayList<Long>();
		ids.add(id);
		attachmentDao.delete(ids);
		EasyMock.replay(attachmentDao);
		attachmentService.delete(ids);
	}

	/**
	 * 根据附件ID查看附件
	 */

	@Test
	public void getByID() {
		Attachment at = new Attachment();
		at.setId(1l);
		at.setFile(null);
		EasyMock.expect(attachmentDao.get(at.getId())).andReturn(at);
		EasyMock.replay(attachmentDao);
		Attachment att = attachmentService.get(at.getId());
		assertEquals(at, att);

	}

	/**
	 * 根据收件箱ID查看附件
	 */
	@Test
	public void getByInnMsgId() {

		List<Long> ids = new ArrayList<Long>();
		List atts = new ArrayList();
		InnerMessage im = new InnerMessage();
		im.setId(1l);
		ids.add(1l);
		Attachment at = new Attachment();
		at.setId(1l);
		at.setInnerMessage(im);
		atts.add(at);
		at = new Attachment();
		at.setId(2l);
		at.setInnerMessage(im);
		atts.add(at);
		StringBuilder hql = new StringBuilder()
				.append("select a.id from Attachment a where a.innerMessage.id in(");
		for (Long id : ids) {
			hql.append(id);
		}
		hql.append(")");
		EasyMock.expect(attachmentDao.find(hql.toString())).andReturn(atts);
		EasyMock.replay(attachmentDao);
		List<Long> list = attachmentService.getAttByInnerMessageID(ids);
		assertEquals(atts.size(), list.size());
	}

	/**
	 * 测试根据发件箱ID查看附件
	 */
	@Test
	public void getBySendMsgId() {
		List<Long> ids = new ArrayList<Long>();
		List atts = new ArrayList();
		SenderMessage im = new SenderMessage();
		im.setId(1l);
		ids.add(1l);
		Attachment at = new Attachment();
		at.setId(1l);
		at.setSenderMessage(im);
		atts.add(at);
		at = new Attachment();
		at.setId(2l);
		at.setSenderMessage(im);
		atts.add(at);
		StringBuilder hql = new StringBuilder()
				.append("select a.id from Attachment a where a.senderMessage.id in(");
		for (Long id : ids) {
			hql.append(id);
		}
		hql.append(")");
		EasyMock.expect(attachmentDao.find(hql.toString())).andReturn(atts);
		EasyMock.replay(attachmentDao);
		List<Long> list = attachmentService.getAttBySenderMessageID(ids);
		assertEquals(atts.size(), list.size());
	}

	/**
	 * 根据草稿箱ID查看附件
	 */
	@Test
	public void getByDrafBoxId() {
		List<Long> ids = new ArrayList<Long>();
		List atts = new ArrayList();
		DraftBox im = new DraftBox();
		im.setId(1l);
		ids.add(1l);
		Attachment at = new Attachment();
		at.setId(1l);
		at.setDraftBox(im);
		atts.add(at);
		at = new Attachment();
		at.setId(2l);
		at.setDraftBox(im);
		atts.add(at);
		StringBuilder hql = new StringBuilder()
				.append("select a.id  from Attachment a where a.draftBox.id in(");
		for (Long id : ids) {
			hql.append(id);
		}
		hql.append(")");
		System.out.println(hql.toString());
		EasyMock.expect(attachmentDao.find(hql.toString())).andReturn(atts);
		EasyMock.replay(attachmentDao);
		List<Long> list = attachmentService.getAttByDrafBoxID(ids);
		assertEquals(atts.size(), list.size());
	}
}
