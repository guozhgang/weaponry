package com.cce.weaponry.unit.service.approval;

import java.util.Iterator;
import java.util.Map;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.cce.modules.test.spring.SpringTxTestCase;
import com.cce.weaponry.entity.register.Region;
import com.cce.weaponry.service.common.RegionManagementService;

public class RegionProcessTest extends SpringTxTestCase {

	@Autowired
	private RegionManagementService regionManagementService;

	@Test
	public void testFilingRegion() {
		Map<Region,Long> regions = regionManagementService
				.findFilingCompanyInfoRegions();

		for (Iterator<Long> its = regions.values().iterator(); its.hasNext();) {
			System.out.println("count:" + its.next().toString());
		}
		for (Iterator<Region> res = regions.keySet().iterator(); res.hasNext();) {
			Region region = (Region)res.next();
			System.out.println("value: " + region.getName() + "  "
					+ region.getCode());
		}

	}

}
