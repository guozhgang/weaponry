package com.cce.weaponry.unit.service.security;

import org.easymock.classextension.EasyMock;
import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.springframework.security.core.authority.GrantedAuthorityImpl;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.cce.modules.utils.ReflectionUtils;
import com.cce.weaponry.data.SecurityEntityData;
import com.cce.weaponry.entity.security.Authority;
import com.cce.weaponry.entity.security.Role;
import com.cce.weaponry.entity.security.User;
import com.cce.weaponry.service.security.UserCrudService;
import com.cce.weaponry.service.security.UserDetailsServiceImpl;

/**
 * UserDetailsServiceImpl的单元测试用例, 测试Service层的业务逻辑.
 * 
 * 使用EasyMock对UserManager进行模拟.
 * 
 * @author cce
 */
public class UserDetailsServiceImplTest extends Assert {

	private UserDetailsServiceImpl userDetailsServiceImpl;
	private UserCrudService userCrudService;

	@Before
	public void setUp() {

		userDetailsServiceImpl = new UserDetailsServiceImpl();
		userCrudService = EasyMock.createMock(UserCrudService.class);
		ReflectionUtils.setFieldValue(userDetailsServiceImpl,
				"userCrudService", userCrudService);
	}

	@After
	public void tearDown() {
		EasyMock.verify(userCrudService);
	}

	@Test
	public void loadUserExist() {

		String authName = "A_foo";
		// 准备数据
		User user = SecurityEntityData.getRandomUser();
		Role role = SecurityEntityData.getRandomRole();
		user.getRoleList().add(role);
		Authority auth = new Authority();
		auth.setName(authName);
		role.getAuthorityList().add(auth);

		// 录制脚本
		EasyMock.expect(
				userCrudService.findUserByLoginName(user.getLoginName()))
				.andReturn(user);
		EasyMock.replay(userCrudService);

		// 执行测试
		UserDetails userDetails = userDetailsServiceImpl
				.loadUserByUsername(user
				.getLoginName());

		// 校验结果
		assertEquals(user.getLoginName(), userDetails.getUsername());
		assertEquals(user.getPassword(), userDetails.getPassword());
		assertEquals(1, userDetails.getAuthorities().size());
		assertEquals(new GrantedAuthorityImpl(authName), userDetails.getAuthorities().iterator().next());
	}

	@Test(expected = UsernameNotFoundException.class)
	public void loadUserNotExist() {
		// 录制脚本
		EasyMock
				.expect(userCrudService.findUserByLoginName("userNameNotExist"))
				.andReturn(null);
		EasyMock.replay(userCrudService);
		// 执行测试
		userDetailsServiceImpl.loadUserByUsername("userNameNotExist");
	}
}