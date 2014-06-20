package com.cce.weaponry.unit.service.news;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import junit.framework.Assert;

import org.easymock.classextension.EasyMock;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import com.cce.modules.utils.ReflectionUtils;
import com.cce.weaponry.dao.message.InnerMessageDao;
import com.cce.weaponry.entity.message.InnerMessage;
import com.cce.weaponry.service.message.InnerMessageCrudService;

public class InnerMessageServiceTest extends Assert {

	private InnerMessageCrudService innerMessageManager;
	private InnerMessageDao InnerMessageDao;
	@Before
	public void setUp() {
		innerMessageManager = new InnerMessageCrudService();
		InnerMessageDao = EasyMock.createMock(InnerMessageDao.class);
		ReflectionUtils.setFieldValue(innerMessageManager, "InnerMessageDao", InnerMessageDao);
	}

	@After
	public void tearDown() {
		EasyMock.verify(InnerMessageDao);
	}



	/*
	 * 我的所有消息
	 */
	@Test
	public void getNewMessageCount() {
		String username = "user";
		List messages = new ArrayList();
		InnerMessage im = new InnerMessage();
		im.setId(1L);
		im.setTopic("topic1");
		// im.setContent("content1");
		im.setReceiver(username);
		im.setCreateTime(new Date());
		messages.add(im);
		im = new InnerMessage();
		im.setId(2L);
		im.setTopic("topic2");
		// im.setContent("content2");
		im.setReceiver(username);
		im.setCreateTime(new Date());
		messages.add(im);
		// 录制脚本
		EasyMock.expect(InnerMessageDao.getNewMessageCount("user")).andReturn(new Long(2));
		EasyMock.replay(InnerMessageDao);
		// 验证结果
		long ret = innerMessageManager.getNewMessagesCount(username);
		assertEquals(2, ret);
	}

	/*
	 * 发送消息
	 */
	@Test
	public void sendMessage() {
		String username = "user";
		InnerMessage im = new InnerMessage();
		im.setId(1L);
		im.setTopic("topic1");
		// im.setContent("content1");
		im.setReceiver(username);
		im.setCreateTime(new Date());
		// 录制脚本
		InnerMessageDao.save(im);
		EasyMock.replay(InnerMessageDao);
		// 验证结果
		innerMessageManager.save(im);
	}

	/*
	 * 删除消息
	 */
	@Test
	public void removeMessage() {
		Long id = 1L;
		List ids = new ArrayList();
		ids.add(id);
		InnerMessageDao.delete(ids);
		EasyMock.replay(InnerMessageDao);
		innerMessageManager.delete(ids);
	}
}
