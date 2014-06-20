package com.cce.weaponry.unit.service.security;

import java.util.ArrayList;
import java.util.List;

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
import com.cce.weaponry.service.security.ResourceCrudService;

public class ResourceServiceTest extends Assert {
	private ResourceCrudService resourceCrudService;
	private ResourceDao resourceDao;
	@Before
	public void setUp() {
		resourceCrudService = new ResourceCrudService();
		resourceDao = EasyMock.createMock(ResourceDao.class);
		ReflectionUtils.setFieldValue(resourceCrudService, "resourceDao",
				resourceDao);
	}

	@After
	public void tearDown() {
		EasyMock.verify(resourceDao);
	}

	/*
	 * 所有资源
	 */
	@Test
	public void loadAllResources() {
		List<Resource> resrcList = new ArrayList<Resource>();
		resrcList.add(SecurityEntityData.getRandomResource());
		resrcList.add(SecurityEntityData.getRandomResource());
		EasyMock.expect(resourceDao.getAll()).andReturn(resrcList);
		EasyMock.replay(resourceDao);
		List<Resource> list = resourceCrudService.getAll();
		assertEquals(2, list.size());
	}

	/*
	 * 增加资源
	 */
	@Test
	public void addResource() {
		Authority a1 = SecurityEntityData.getRandomAuthority();
		Resource resource = SecurityEntityData.getRandomResource();
		resource.getAuthorityList().add(a1);
		resourceDao.save(resource);
		EasyMock.replay(resourceDao);
		resourceCrudService.save(resource);
	}

	/*
	 * 删除资源
	 */
	@Test
	public void removeResource() {
		Long id = 1L;
		List ids = new ArrayList();
		ids.add(id);
		resourceDao.delete(ids);
		EasyMock.replay(resourceDao);
		resourceCrudService.delete(ids);
	}
}
