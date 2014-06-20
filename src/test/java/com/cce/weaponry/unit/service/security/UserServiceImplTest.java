package com.cce.weaponry.unit.service.security;

import java.util.ArrayList;
import java.util.List;

import org.easymock.classextension.EasyMock;
import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.springframework.mock.web.MockHttpServletRequest;

import com.cce.modules.orm.Page;
import com.cce.modules.orm.PropertyFilter;
import com.cce.modules.orm.hibernate.HibernateWebUtils;
import com.cce.modules.utils.ReflectionUtils;
import com.cce.weaponry.dao.security.UserDao;
import com.cce.weaponry.data.SecurityEntityData;
import com.cce.weaponry.entity.security.Menu;
import com.cce.weaponry.entity.security.User;
import com.cce.weaponry.service.ServiceException;
import com.cce.weaponry.service.security.UserCrudService;

/**
 * UserDetailsServiceImpl的单元测试用例, 测试Service层的业务逻辑.
 * 
 * 使用EasyMock对UserManager进行模拟.
 * 
 * @author cce
 */
public class UserServiceImplTest extends Assert {

	private UserCrudService userCrudService;
	private UserDao userDao;
	@Before
	public void setUp() {
		userCrudService = new UserCrudService();
		userDao = EasyMock.createMock(UserDao.class);
		ReflectionUtils.setFieldValue(userCrudService, "userDao", userDao);
	}

	@After
	public void tearDown() {
		EasyMock.verify(userDao);
	}

	/*
	 * 所有用户
	 */
	@Test
	public void loadAllUsers() {
		MockHttpServletRequest request = new MockHttpServletRequest();
		Page<User> page = new Page<User>(5);// 每页5条记录
		List<PropertyFilter> filters = HibernateWebUtils.buildPropertyFilters(request);
		// 设置默认排序方式
		if (!page.isOrderBySetted()) {
			page.setOrderBy("id");
			page.setOrder(Page.ASC);
		}
		Page<User> thePage = new Page<User>(5);
		thePage.setTotalCount(3);
		List<User> userList = new ArrayList<User>();
		userList.add(SecurityEntityData.getRandomUser());
		userList.add(SecurityEntityData.getRandomUser());
		userList.add(SecurityEntityData.getRandomUser());
		thePage.setResult(userList);
		EasyMock.expect(userDao.findPage(page, filters)).andReturn(thePage);
		EasyMock.replay(userDao);
		page = userCrudService.list(page, filters);
		assertEquals(3, page.getTotalCount());
	}

	@Test
	public void deleteUser() {
		Long id = 2L;
		List ids = new ArrayList();
		ids.add(id);
		userDao.delete(ids);
		EasyMock.replay(userDao);
		// 正常删除用户.
		userCrudService.delete(ids);
		// 删除超级管理用户抛出异常.
		try {
			ids.add(1L);
			userCrudService.delete(ids);
			fail("expected ServicExcepton not be thrown");
		} catch (ServiceException e) {
			// expected exception
		}
	}

	/*
	 * 根据登录名查用户
	 */
	@Test
	public void getUserByLoginName() {
		String loginName = "loginName";
		User user = SecurityEntityData.getRandomUser();
		EasyMock.expect(userDao.findUniqueBy("loginName", loginName)).andReturn(user);
		EasyMock.replay(userDao);
		User theUser = userCrudService.findUserByLoginName(loginName);
		assertEquals(user.getLoginName(), theUser.getLoginName());
	}

	/*
	 * 用户的菜单
	 */
	@Test
	public void getUserMenuList() {
		Long id = 1L;
		User u = SecurityEntityData.getRandomUserWithRole();
		EasyMock.expect(userDao.get(id)).andReturn(u);
		EasyMock.replay(userDao);
		User user = userCrudService.get(id);
		Menu menu = new Menu();
		menu.setId(1L);
		menu.setText("text1");
		user.getRoleList().get(0).getMenuList().add(menu);
	}

	/*
	 * 根据用户ID查用户
	 */
	@Test
	public void getUserById() {
		Long id = 1L;
		User u = SecurityEntityData.getRandomUser();
		EasyMock.expect(userDao.get(id)).andReturn(u);
		EasyMock.replay(userDao);
		User user = userCrudService.get(id);
		assertEquals(u.getName(), user.getName());
	}

	/*
	 * 增加用户
	 */
	@Test
	public void addNewUser() {
		User user = SecurityEntityData.getRandomUser();
		userDao.save(user);
		EasyMock.replay(userDao);
		userCrudService.save(user);
	}

	/*
	 * 删除用户
	 */
	@Test
	public void removeUser() {
		Long id = 2L;
		List ids = new ArrayList();
		ids.add(id);
		userDao.delete(ids);
		EasyMock.replay(userDao);
		userCrudService.delete(ids);
	}
}