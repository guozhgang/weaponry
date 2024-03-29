package com.cce.weaponry.integration.dao.security;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.cce.weaponry.dao.security.RoleDao;
import com.cce.weaponry.dao.security.UserDao;
import com.cce.weaponry.entity.security.Role;
import com.cce.weaponry.entity.security.User;
import com.cce.modules.test.DataUtils;
import com.cce.modules.test.spring.SpringTxTestCase;

/**
 * UserDao的集成测试用例,测试ORM映射及特殊的DAO操作.
 * 
 * @author cce
 */
public class RoleDaoTest extends SpringTxTestCase {
	@Autowired
	private RoleDao roleDao;

	@Autowired
	private UserDao userDao;

	/**
	 * 测试删除角色时删除用户-角色的中间表.
	 */
	@Test
	public void deleteRole() {
		//新增测试角色并与admin用户绑定.
		Role role = new Role();
		role.setName(DataUtils.randomName("Role"));
		roleDao.save(role);

		User user = userDao.get(1L);
		user.getRoleList().add(role);
		userDao.save(user);
		flush();

		int oldJoinTableCount = countRowsInTable("SS_USER_ROLE");
		int oldUserTableCount = countRowsInTable("SS_USER");

		//删除用户角色, 中间表将减少1条记录,而用户表应该不受影响.
		roleDao.delete(role.getId());
		flush();

		int newJoinTableCount = countRowsInTable("SS_USER_ROLE");
		int newUserTableCount = countRowsInTable("SS_USER");
		assertEquals(1, oldJoinTableCount - newJoinTableCount);
		assertEquals(0, oldUserTableCount - newUserTableCount);
	}
}
