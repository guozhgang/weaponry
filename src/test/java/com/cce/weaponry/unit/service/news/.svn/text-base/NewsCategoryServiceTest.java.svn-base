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
import com.cce.weaponry.dao.news.NewsCategoryDao;
import com.cce.weaponry.entity.news.NewsCategory;
import com.cce.weaponry.service.news.NewsCategoryCrudService;

public class NewsCategoryServiceTest extends Assert {

	private NewsCategoryCrudService newsManager;
	private NewsCategoryDao categoryDao;
	@Before
	public void setUp() {
		newsManager = new NewsCategoryCrudService();
		categoryDao = EasyMock.createMock(NewsCategoryDao.class);
		ReflectionUtils.setFieldValue(newsManager, "categoryDao", categoryDao);
	}

	@After
	public void tearDown() {
		EasyMock.verify(categoryDao);
	}

	/*
	 * 所有分类
	 */
	@Test
	public void loadAllCategories() {
		List<NewsCategory> catList = new ArrayList<NewsCategory>();
		NewsCategory nc = new NewsCategory();
		nc.setId(1L);
		nc.setShorthand("shortHand1");
		nc.setValue("value1");
		nc.setCreateTime(new Date());
		catList.add(nc);
		nc = new NewsCategory();
		nc.setId(2L);
		nc.setShorthand("shortHand2");
		nc.setValue("value2");
		nc.setCreateTime(new Date());
		catList.add(nc);
		// 录制脚本
		EasyMock.expect(categoryDao.getAll()).andReturn(catList);
		EasyMock.replay(categoryDao);
		// 验证结果
		List<NewsCategory> ret = newsManager.getAll();
		assertEquals(2, ret.size());
	}

	/*
	 * 增加分类
	 */
	@Test
	public void addNewCategory() {
		NewsCategory nc = new NewsCategory();
		nc.setId(1L);
		nc.setShorthand("shortHand1");
		nc.setValue("value1");
		nc.setCreateTime(new Date());
		// 录制脚本
		categoryDao.save(nc);
		EasyMock.replay(categoryDao);
		// 验证结果
		newsManager.save(nc);
	}

	/*
	 * 删除分类
	 */
	@Test
	public void removeCategory() {
		Long id = 1L;
		List ids = new ArrayList();
		ids.add(id);
		categoryDao.delete(ids);
		EasyMock.replay(categoryDao);
		newsManager.delete(ids);
	}

}
