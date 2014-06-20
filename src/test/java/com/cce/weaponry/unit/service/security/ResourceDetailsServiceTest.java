package com.cce.weaponry.unit.service.security;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map.Entry;

import org.easymock.classextension.EasyMock;
import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

import com.cce.modules.utils.ReflectionUtils;
import com.cce.weaponry.dao.security.ResourceDao;
import com.cce.weaponry.data.SecurityEntityData;
import com.cce.weaponry.entity.security.Authority;
import com.cce.weaponry.entity.security.Resource;
import com.cce.weaponry.service.security.ResourceDetailsServiceImpl;

public class ResourceDetailsServiceTest extends Assert {

	private ResourceDetailsServiceImpl resourceDetailsService;
	private ResourceDao resourceDao;

	@Before
	public void setUp() {
		resourceDetailsService = new ResourceDetailsServiceImpl();
		resourceDao = EasyMock.createMock(ResourceDao.class);
		ReflectionUtils.setFieldValue(resourceDetailsService, "resourceDao",
				resourceDao);
	}

	@After
	public void tearDown() {
		EasyMock.verify(resourceDao);
	}

	@Test
	@SuppressWarnings("unchecked")
	public void getRequestMap() throws Exception {
		// 准备数据
		List<Resource> resourceList = new ArrayList<Resource>();

		Authority a1 = SecurityEntityData.getRandomAuthority();
		Authority a2 = SecurityEntityData.getRandomAuthority();

		Resource r1 = SecurityEntityData.getRandomResource();
		r1.getAuthorityList().add(a1);
		resourceList.add(r1);

		Resource r2 = SecurityEntityData.getRandomResource();
		r2.getAuthorityList().add(a1);
		resourceList.add(r2);

		Resource r3 = SecurityEntityData.getRandomResource();
		r3.getAuthorityList().add(a1);
		r3.getAuthorityList().add(a2);
		resourceList.add(r3);

		// 录制脚本
		EasyMock.expect(resourceDao.getUrlResourceWithAuthorities()).andReturn(
				resourceList);
		EasyMock.replay(resourceDao);

		// 验证结果
		LinkedHashMap<String, String> requestMap = resourceDetailsService
				.getRequestMap();
		assertEquals(3, requestMap.size());
		Object[] requests = requestMap.entrySet().toArray();

		assertEquals(r1.getValue(), ((Entry<String, String>) requests[0]).getKey());
		assertEquals(a1.getName(), ((Entry<String, String>) requests[0]).getValue());

		assertEquals(r3.getValue(), ((Entry<String, String>) requests[2]).getKey());
		assertEquals(a1.getName() + "," + a2.getName(), ((Entry<String, String>) requests[2]).getValue());
	}
}
