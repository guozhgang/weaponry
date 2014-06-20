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
import com.cce.weaponry.dao.news.NewsPageDao;
import com.cce.weaponry.entity.news.NewsPage;
import com.cce.weaponry.service.news.NewsPageCrudService;

public class NewsPageServiceTest extends Assert {
	private NewsPageCrudService newsManager;
	private NewsPageDao pageDao;
	@Before
	public void setUp() {
		newsManager = new NewsPageCrudService();
		pageDao = EasyMock.createMock(NewsPageDao.class);
		ReflectionUtils.setFieldValue(newsManager, "pageDao", pageDao);
	}

	@After
	public void tearDown() {
		EasyMock.verify(pageDao);
	}

	/*
	 * 所有编排
	 */
	@Test
	public void loadAllPages() {
		List<NewsPage> pages = new ArrayList<NewsPage>();
		NewsPage page = new NewsPage();
		page.setId(1L);
		page.setTitle("title1");
		// page.setContent("content1");
		pages.add(page);
		page = new NewsPage();
		page.setId(2L);
		page.setTitle("title2");
		// page.setContent("content2");
		pages.add(page);
		EasyMock.expect(pageDao.getAll()).andReturn(pages);
		EasyMock.replay(pageDao);
		newsManager.getAll();
	}

	/*
	 * 分类相关的编排信息
	 */
	@Test
	public void findPagesByCatId() {
		Long categoryId = 2L;
		List<NewsPage> list = new ArrayList<NewsPage>();
		NewsPage page = new NewsPage();
		page.setId(1L);
		page.setTitle("page title1");
		// page.setContent("page content1");
		list.add(page);
		page = new NewsPage();
		page.setId(2L);
		page.setTitle("page title2");
		// page.setContent("page content2");
		list.add(page);
		// 录制脚本
		EasyMock.expect(pageDao.findBy("CATEGORY_ID", categoryId)).andReturn(list);
		EasyMock.replay(pageDao);
		List<NewsPage> pageList = newsManager.findAllPagesByCatId(categoryId);
		assertEquals(2, pageList.size());
	}

	/*
	 * 增加编排
	 */
	@Test
	public void addPage() {
		NewsPage page = new NewsPage();
		page.setId(1L);
		page.setTitle("page title1");
		// page.setContent("page content1");
		pageDao.save(page);
		EasyMock.replay(pageDao);
		newsManager.save(page);
	}

	/*
	 * 删除编排
	 */
	@Test
	public void removePage() {
		Long id = 1L;
		List ids = new ArrayList();
		ids.add(id);
		pageDao.delete(ids);
		EasyMock.replay(pageDao);
		newsManager.delete(ids);
	}

	/*
	 * 根据日期段、编排信息搜索
	 */
	@Test
	public void searchPages() {
		String content = "content";
		Date beginDate = null;
		Date endDate = null;
		String hql = "from com.cce.safepork.entity.platform.Pageinfo p where 1=1 ";
		if (null != content && !"".equals(content)) {
			hql += " and p.content like '%" + content + "%' ";
		}
		if (null != beginDate) {
			hql += " and p.createTime>='" + beginDate + "' ";
		}
		if (null != endDate) {
			hql += " and p.createTime<='" + endDate + "' ";
		}
		List list = new ArrayList();
		NewsPage page = new NewsPage();
		page.setId(1L);
		page.setTitle("page title1");
		// page.setContent("page content1");
		list.add(page);
		page = new NewsPage();
		page.setId(2L);
		page.setTitle("page title2");
		// page.setContent("page content2");
		list.add(page);
		EasyMock.expect(pageDao.find(hql)).andReturn(list);
		EasyMock.replay(pageDao);
		List<NewsPage> ret = newsManager.findPagesByCondition(content,
				beginDate, endDate);
		assertEquals(2, ret.size());
	}
}
