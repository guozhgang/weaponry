package com.cce.weaponry.service.security;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cce.modules.orm.Page;
import com.cce.modules.orm.PropertyFilter;
import com.cce.modules.security.springsecurity.SpringSecurityUtils;
import com.cce.modules.service.CrudServiceInterface;
import com.cce.weaponry.dao.security.MenuDao;
import com.cce.weaponry.dao.security.UserDao;
import com.cce.weaponry.entity.security.Menu;
import com.cce.weaponry.entity.security.Role;
import com.cce.weaponry.entity.security.User;

@Service
@Transactional
public class MenuCrudService implements CrudServiceInterface<Menu> {

	private static Logger logger = LoggerFactory
			.getLogger(MenuCrudService.class);
	@Autowired
	private MenuDao menuDao;
	@Autowired
	private UserDao userDao;

	public void delete(List<Long> ids) {
		menuDao.delete(ids);
	}

	@Transactional(readOnly = true)
	public Menu get(Long id) {
		return menuDao.get(id);
	}

	@Transactional(readOnly = true)
	public List<Menu> list(List<PropertyFilter> filters) {
		return menuDao.find(filters);
	}

	@Transactional(readOnly = true)
	public Page<Menu> list(Page<Menu> page, List<PropertyFilter> filters) {
		return menuDao.findPage(page, filters);
	}

	public List<Menu> getAll() {
		return menuDao.getAll();
	}

	public void save(Menu entity) {
		menuDao.save(entity);
	}

	/**
	 * 返回一级菜单
	 * 
	 * @return
	 */
	public List<Menu> getRootMenus() {
		return menuDao.getRootMenus();
	}

	/**
	 * 返回登录用户的菜单. 因为菜单是有顺序排列的,所以必须使用ArrayList而不是Set
	 * 
	 * @return
	 */
	@Transactional(readOnly = true)
	public List<Menu> getLoginUserMenus() {
		User user = userDao.findUniqueBy("loginName", SpringSecurityUtils
				.getCurrentUserName());
		List<Menu> menus = new ArrayList<Menu>();
		if (user != null) {
			for (Role role : user.getRoleList()) {
				menus.addAll(role.getMenuList());
			}
		}
		return menus;
	}

	@Transactional(readOnly = true)
	public List<Menu> getUserMenus(User user) {
		List<Menu> menus = new ArrayList<Menu>();
		for (Role role : user.getRoleList()) {
			menus.addAll(role.getMenuList());
		}
		return menus;
	}
}
