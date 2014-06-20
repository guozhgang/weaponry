package com.cce.weaponry.unit.service.security;

import java.util.ArrayList;
import java.util.List;

import org.easymock.classextension.EasyMock;
import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

import com.cce.modules.utils.ReflectionUtils;
import com.cce.weaponry.dao.security.AuthorityDao;
import com.cce.weaponry.data.SecurityEntityData;
import com.cce.weaponry.entity.security.Authority;
import com.cce.weaponry.service.security.AuthorityCrudService;

/**
 * UserDetailsServiceImpl的单元测试用例, 测试Service层的业务逻辑.
 * 
 * 使用EasyMock对UserManager进行模拟.
 * 
 * @author cce
 */
public class AuthServiceImplTest extends Assert {

	private AuthorityCrudService authorityCrudService;
	private AuthorityDao authorityDao;
	@Before
	public void setUp() {
		authorityCrudService = new AuthorityCrudService();
		authorityDao = EasyMock.createMock(AuthorityDao.class);
		ReflectionUtils.setFieldValue(authorityCrudService, "authorityDao",
				authorityDao);
	}

	@After
	public void tearDown() {
		EasyMock.verify(authorityDao);
	}

	/*
	 * 所有授权
	 */
	@Test
	public void loadAllAuthorities() {
		List<Authority> authList = new ArrayList<Authority>();
		authList.add(SecurityEntityData.getRandomAuthority());
		authList.add(SecurityEntityData.getRandomAuthority());
		EasyMock.expect(authorityDao.getAll()).andReturn(authList);
		EasyMock.replay(authorityDao);
		List<Authority> list = authorityCrudService.getAll();
		assertEquals(2, list.size());
	}

	/*
	 * 增加授权信息
	 */
	@Test
	public void AddAuth() {
		Authority authority = SecurityEntityData.getRandomAuthority();
		authorityDao.save(authority);
		EasyMock.replay(authorityDao);
		authorityCrudService.save(authority);
	}

}