package com.cce.weaponry.unit.service.security;

import java.util.ArrayList;
import java.util.List;

import org.easymock.classextension.EasyMock;
import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

import com.cce.modules.utils.ReflectionUtils;
import com.cce.weaponry.dao.security.MenuDao;
import com.cce.weaponry.entity.security.Menu;
import com.cce.weaponry.service.security.MenuCrudService;

/**
 * UserDetailsServiceImpl的单元测试用例, 测试Service层的业务逻辑.
 * 
 * 使用EasyMock对UserManager进行模拟.
 * 
 * @author cce
 */
public class MenuServiceImplTest extends Assert {

	private MenuCrudService menuCrudService;
	private MenuDao menuDao;;
	@Before
	public void setUp() {
		menuCrudService = new MenuCrudService();
		menuDao = EasyMock.createMock(MenuDao.class);
		ReflectionUtils.setFieldValue(menuCrudService, "menuDao", menuDao);
	}

	@After
	public void tearDown() {
		EasyMock.verify(menuDao);
	}

	/*
	 * 所有菜单
	 */
	@Test
	public void loadAllMenus() {
		List<Menu> menuList = new ArrayList<Menu>();
		Menu menu1 = new Menu();
		menu1.setId(1L);
		menu1.setText("text1");
		menuList.add(menu1);
		Menu menu2 = new Menu();
		menu2.setId(2L);
		menu2.setText("text2");
		menuList.add(menu2);
		Menu menu3 = new Menu();
		menu3.setId(3L);
		menu3.setText("text3");
		menu3.setParent(menu2);
		menuList.add(menu3);
		EasyMock.expect(menuDao.getAll()).andReturn(menuList);
		EasyMock.replay(menuDao);
		List<Menu> list = menuCrudService.getAll();
		assertEquals(3, list.size());
	}

	/*
	 * 增加菜单
	 */
	@Test
	public void addMenu() {
		Menu menu = new Menu();
		menu.setId(1L);
		menu.setText("text1");
		menuDao.save(menu);
		EasyMock.replay(menuDao);
		menuCrudService.save(menu);
	}

	/*
	 * 删除菜单
	 */
	@Test
	public void removeMenu() {
		Long id = 1L;
		List ids = new ArrayList();
		ids.add(id);
		menuDao.delete(ids);
		EasyMock.replay(menuDao);
		menuCrudService.delete(ids);
	}
}