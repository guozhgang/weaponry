package com.cce.weaponry.integration.dao.security;

import java.util.List;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.cce.modules.test.DataUtils;
import com.cce.modules.test.spring.SpringTxTestCase;
import com.cce.weaponry.dao.security.MenuDao;
import com.cce.weaponry.dao.security.RoleDao;
import com.cce.weaponry.dao.security.UserDao;
import com.cce.weaponry.entity.security.Menu;
import com.cce.weaponry.entity.security.Role;
import com.cce.weaponry.entity.security.User;
import com.cce.weaponry.service.security.MenuCrudService;

public class MenuDaoTest extends SpringTxTestCase {
	@Autowired
	private MenuDao menuDao;
	@Autowired
	private RoleDao roleDao;
	@Autowired
	private UserDao userDao;
	@Autowired
	private MenuCrudService menuCrudService;

	@Test
	public void deleteMenu() {
		Menu menu = new Menu();
		menu.setText(DataUtils.randomName("Menu"));
		menuDao.save(menu);
		Role role = roleDao.get(1L);
		int menusize1 = role.getMenuList().size();
		role.getMenuList().add(menu);
		roleDao.save(role);
		flush();
		int menusize2 = role.getMenuList().size();
		assertEquals(1, menusize2 - menusize1);
		int menuCount1 = countRowsInTable("SS_MENU");
		int menuRoleMenuCount1 = countRowsInTable("SS_ROLE_MENU");
		int menuRole1 = countRowsInTable("SS_ROLE");
		role.getMenuList().remove(menu);
		menuDao.delete(menu.getId());
		flush();
		int menuCount2 = countRowsInTable("SS_MENU");
		int menuRoleMenuCount2 = countRowsInTable("SS_ROLE_MENU");
		int menuRole2 = countRowsInTable("SS_ROLE");
		assertEquals(1, menuCount1 - menuCount2);
		assertEquals(1, menuRoleMenuCount1 - menuRoleMenuCount2);
		assertEquals(0, menuRole1 - menuRole2);
	}

	@Test
	public void saveMenus() {
		Menu xtgl = new Menu("xtgl", "系统管理", null); // 系统管理
		Menu yhgl = new Menu("yhgl", "用户管理", xtgl); // 用户管理
		yhgl.setTreePosition(11);
		Menu qxgl = new Menu("qxgl", "权限管理", xtgl); // 权限管理
		qxgl.setTreePosition(12);
		Menu yhzgl = new Menu("yhzgl", "用户组管理", xtgl); // 用户组管理
		yhzgl.setTreePosition(13);
		Menu zygl = new Menu("zygl", "资源管理", xtgl); // 资源管理
		zygl.setTreePosition(14);

		this.menuDao.save(xtgl);

		Long id = xtgl.getId();
		this.flush();

		Menu menu = this.menuDao.get(id);
		this.assertEquals(menu.getChildren().size(), 4);// 测试Menu是否级联更新
	}

	@Test
	public void getUserMenus() {
		Role role = new Role();
		role.setName("Administrators");
		roleDao.save(role);

		long roleId = role.getId();

		User user = new User();
		user.setLoginName("super");
		user.setName("Super User");
		user.getRoleList().add(role);
		userDao.save(user);

		this.flush();

		Menu xtgl = new Menu("xtgl", "系统管理", null); // 系统管理
		Menu yhgl = new Menu("yhgl", "用户管理", xtgl); // 用户管理
		yhgl.setTreePosition(11);
		Menu qxgl = new Menu("qxgl", "权限管理", xtgl); // 权限管理
		qxgl.setTreePosition(12);
		Menu yhzgl = new Menu("yhzgl", "用户组管理", xtgl); // 用户组管理
		yhzgl.setTreePosition(13);
		Menu zygl = new Menu("zygl", "资源管理", xtgl); // 资源管理
		zygl.setTreePosition(14);

		this.menuDao.save(xtgl);

		Long id = xtgl.getId();
		this.evict(xtgl);

		Menu menu = this.menuDao.get(id);
		this.assertEquals(menu.getChildren().size(), 4);// 测试Menu是否级联更新

		Role pRole = roleDao.get(roleId);
		pRole.getMenuList().add(xtgl);
		roleDao.save(pRole);

		List<Menu> menus = menuCrudService.getUserMenus(user);
		this.assertEquals(menus.size(), 4);
	}

	@Test
	public void getAllMenu() {
		List<Menu> menus = menuDao.getAll();
		System.out.println("menus.size()=" + menus.size());
		assertTrue(menus.size() > 0);
	}
}
