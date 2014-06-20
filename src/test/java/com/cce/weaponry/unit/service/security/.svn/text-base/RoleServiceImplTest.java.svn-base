package com.cce.weaponry.unit.service.security;

import java.util.ArrayList;
import java.util.List;

import org.easymock.classextension.EasyMock;
import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

import com.cce.modules.utils.ReflectionUtils;
import com.cce.weaponry.dao.security.RoleDao;
import com.cce.weaponry.data.SecurityEntityData;
import com.cce.weaponry.entity.security.Role;
import com.cce.weaponry.service.security.RoleCrudService;

/**
 * UserDetailsServiceImpl的单元测试用例, 测试Service层的业务逻辑.
 * 
 * 使用EasyMock对UserManager进行模拟.
 * 
 * @author cce
 */
public class RoleServiceImplTest extends Assert {

	private RoleCrudService roleCrudService;
	private RoleDao roleDao;
	@Before
	public void setUp() {
		roleCrudService = new RoleCrudService();
		roleDao = EasyMock.createMock(RoleDao.class);
		ReflectionUtils.setFieldValue(roleCrudService, "roleDao", roleDao);
	}

	@After
	public void tearDown() {
		EasyMock.verify(roleDao);
	}

	/*
	 * 所有角色
	 */
	@Test
	public void loadAllRoles() {
		List<Role> roleList = SecurityEntityData.getDefaultRoleList();
		EasyMock.expect(roleDao.getAll("id", true)).andReturn(roleList);
		EasyMock.replay(roleDao);
		List<Role> list = roleCrudService.getAll();
		assertEquals(2, list.size());
	}

	/*
	 * 角色相关的所有授权
	 */
	@Test
	public void findAuthsByRoleId() {
		Long id = 1L;
		Role role = SecurityEntityData.getRandomRole();
		role.getAuthorityList().add(SecurityEntityData.getRandomAuthority());
		role.getAuthorityList().add(SecurityEntityData.getRandomAuthority());
		EasyMock.expect(roleDao.get(id)).andReturn(role);
		EasyMock.replay(roleDao);
		Role tmp = roleCrudService.get(id);
		assertEquals(tmp.getAuthorityList().size(), role.getAuthorityList().size());
	}

	/*
	 * 增加角色
	 */
	@Test
	public void addRole() {
		Role role = SecurityEntityData.getRandomRole();
		roleDao.save(role);
		EasyMock.replay(roleDao);
		roleCrudService.save(role);
	}

	/*
	 * 删除角色
	 */
	@Test
	public void removeRole() {
		Long id = 1L;
		List ids = new ArrayList();
		ids.add(id);
		roleDao.delete(ids);
		EasyMock.replay(roleDao);
		roleCrudService.delete(ids);
	}

}