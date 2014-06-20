package com.cce.weaponry.integration.dao;

import java.util.List;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.cce.modules.test.spring.SpringTxTestCase;
import com.cce.weaponry.dao.register.RegionDao;
import com.cce.weaponry.entity.register.Region;

public class RegionDaoTest extends SpringTxTestCase {
	@Autowired
	private RegionDao regionDao;

	@Test
	public void findAllProvinceTest() {
		List<Region> regionList = regionDao
				.find("from Region where parent is null");
		assertTrue(regionList.size() > 0);
	}
}
