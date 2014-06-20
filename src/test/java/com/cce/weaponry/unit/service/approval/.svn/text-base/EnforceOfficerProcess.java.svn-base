package com.cce.weaponry.unit.service.approval;

import java.util.Date;
import java.util.Random;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.cce.modules.test.spring.SpringTxTestCase;
import com.cce.weaponry.entity.register.EnforceOfficer;
import com.cce.weaponry.entity.register.EnforceOrg;
import com.cce.weaponry.entity.register.Region;
import com.cce.weaponry.service.common.RegionManagementService;
import com.cce.weaponry.service.register.EnforceOfficerService;
import com.cce.weaponry.service.register.EnforceOrgService;

public class EnforceOfficerProcess extends SpringTxTestCase {

	@Autowired
	private EnforceOfficerService enforceOfficerService;
	
	@Autowired
	private EnforceOrgService enforceOrgService;
	
	@Autowired
	private RegionManagementService regionManagementService;

	private String getRandom() {
		return Integer.toString(new Random().nextInt());
	}

	// 保存、查找 执法人员信息
	@Test
	public void recordEnforceOfficer() {
		EnforceOrg org = new EnforceOrg();

		org.setAddress("address");
		org.setAuthority("thority");
		org.setAuthTel(getRandom());
		org.setLeader("leader");
		org.setLeaderMobile("leaderMobile");
		org.setLeaderTel(getRandom());
		org.setName("name");
		org.setTel("tel");
		org.setZipcode("zipcode");

		enforceOrgService.save(org);

		for (int i = 0; i < 3; i++) {
			EnforceOfficer off = new EnforceOfficer();

			// off.setFile(null);
			off.setCreateDate(new Date());
			off.setDuty(getRandom());
			off.setIssueAuth(getRandom());
			off.setIssueNo(getRandom());
			off.setMobile(getRandom());
			off.setName("ser" + i);

			Region region = regionManagementService.get(50l + i);

			off.setRegion(region);
			off.setEnforceOrg(org);

			enforceOfficerService.save(off);
		}

		Object[] obj = new Object[3];
		EnforceOfficer officer = new EnforceOfficer();

		officer.setRegion(new Region());
		officer.getRegion().setCode("370323");
		officer.setName("1");

		obj[0] = officer;

		// 根据条件查找执法人员
		// Page<EnforceOfficer> officers = enforceOfficerService
		// .findEnforceOfficers(CompanyUtils.setupPage(), obj);

		// for (EnforceOfficer e : officers.getResult()) {
		// System.out.println(e.getId() + "  " + e.getName() + "   "
		// + e.getRegion().getName() + e.getCreateDate());
		// }
		//
		// EnforceOfficer off = enforceOfficerService.get(officers.getResult()
		// .get(0).getId());

		// System.out.println(off.getName() + off.getFile());

	}
	
}
