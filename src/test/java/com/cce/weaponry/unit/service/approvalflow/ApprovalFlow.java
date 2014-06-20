package com.cce.weaponry.unit.service.approvalflow;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.cce.modules.orm.Page;
import com.cce.modules.test.spring.SpringTxTestCase;
import com.cce.weaponry.entity.register.Approval4Register;
import com.cce.weaponry.entity.register.CompanyInfo;
import com.cce.weaponry.entity.security.User;
import com.cce.weaponry.service.common.RegionManagementService;
import com.cce.weaponry.service.register.Approval4RegisterService;
import com.cce.weaponry.service.register.CompanyInfoService;
import com.cce.weaponry.service.security.RoleCrudService;
import com.cce.weaponry.service.security.UserCrudService;

public class ApprovalFlow extends SpringTxTestCase {

	@Autowired
	private CompanyInfoService companyInfoService;

	@Autowired
	private UserCrudService userService;

	@Autowired
	private RoleCrudService roleService;

	@Autowired
	private Approval4RegisterService approvalRegisterService;

	@Autowired
	private RegionManagementService regionManagementService;

	@Test
	public void saveSubmitTest() {

		User user = new User();

		user.setLoginName("iser");
		user.setEmail("ser@ser.com");
		user.setLoginName("iser");
		user.setPassword("iser");
		user.setRole(roleService.get(5l));
		user.setRegion(regionManagementService.get(27l));

		userService.save(user);

		CompanyInfo companyInfo = new CompanyInfo();

		companyInfo.setNameCN("中食运通");

		// companyInfo = companyInfoService.saveCompanyInfo(companyInfo, user);

		approvalRegisterService.submitCompanyInfo(companyInfo.getId());

		Page<Approval4Register> page = new Page<Approval4Register>();

		page.setPageNo(1);
		page.setPageSize(20);

		Page<Approval4Register> list = approvalRegisterService
				.findApprovalsByCompanyId(page, companyInfo.getId());

		System.out.println("测试：");
		for (Approval4Register i : list.getResult()) {
			// System.out.println(i.getCompanyInfo().getNameCN());
		}
	}

	@Test
	public void approvalFlow() {

		User user = new User();

		user.setLoginName("iser");
		user.setEmail("ser@ser.com");
		user.setLoginName("iser");
		user.setPassword("iser");
		user.setRole(roleService.get(5l));
		user.setRegion(regionManagementService.get(27l));

		userService.save(user);

		CompanyInfo companyInfo = new CompanyInfo();

		companyInfo.setNameCN("中食运通");

		// companyInfo = companyInfoService.saveCompanyInfo(companyInfo, user);

		approvalRegisterService.submitCompanyInfo(companyInfo.getId());

		Page<Approval4Register> page = new Page<Approval4Register>();

		page.setPageNo(1);
		page.setPageSize(20);

		Page<Approval4Register> list = approvalRegisterService
				.findApprovalsByCompanyId(page, companyInfo.getId());

		System.out.println("第一次申请" + list.getResult().size());
		for (Approval4Register i : list.getResult()) {
			// System.out.println(i.getCompanyInfo().getNameCN());
		}

		Long appId = page.getResult().get(0).getId();

		approvalRegisterService.passCounty(appId, "县级", "");

		approvalRegisterService.scenePassCounty(appId, "县级", "");

		approvalRegisterService.passCity(appId, "市级", "");

		approvalRegisterService.submitCompanyInfo(companyInfo.getId());

		list = approvalRegisterService.findApprovalsByCompanyId(page,
				companyInfo.getId());

		System.out.println("第二次申请" + list.getResult().size());
		for (Approval4Register i : list.getResult()) {
			// System.out.println(i.getCompanyInfo().getNameCN());
		}

	}
}
