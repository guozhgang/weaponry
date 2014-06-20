package com.cce.weaponry.unit.service.companyInfo.record;

import java.util.Date;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.cce.modules.orm.Page;
import com.cce.modules.test.spring.SpringTxTestCase;
import com.cce.weaponry.entity.register.Approval4Register;
import com.cce.weaponry.entity.register.CompanyInfo;
import com.cce.weaponry.entity.register.Region;
import com.cce.weaponry.service.common.CompanyUtils;
import com.cce.weaponry.service.common.RegionManagementService;
import com.cce.weaponry.service.register.Approval4RegisterService;
import com.cce.weaponry.service.register.CompanyInfoService;

public class ProvinceTest extends SpringTxTestCase {

	@Autowired
	private RegionManagementService regionManagementService;

	@Autowired
	private CompanyInfoService companyInfoService;

	@Autowired
	private Approval4RegisterService approval4RegisterService;

	// 初始化通过市级审批的企业信息
	private void initPassCityCompanyInfo() {
		for (int i = 0; i < 5; i++) {
			// 注册企业最基本信息
			CompanyInfo company = new CompanyInfo();

			// 设置公司各种属性
			company.setAddress(CompanyUtils.getRandom("comAdd"));
			company.setBank(CompanyUtils.getRandom("comBank"));
			company.setBankAccount(CompanyUtils.getRandom("comAcc"));
			company.setCertDept("certDept");
			company.setCompanyType("companyType");
			company.setCreateBy("createBy");
			company.setCreateDate(new Date());
			company.setCredit("credit");
			company.setCreditRating("5");
			company.setZipcode("zipcode");
			company.setFpNo(CompanyUtils.getRandom("comFpNo"));
			company.setLegal("legal" + CompanyUtils.getRandom());
			company.setLegalFax("legalFax");
			company.setLegalMail("legalMail");
			company.setLegalMobile(CompanyUtils.getRandom());
			company.setLegalTel(CompanyUtils.getRandom());
			company.setLevel("5");
			company.setLicenseCertDate(new Date());
			company.setLicenseCertDept("licenseCertDept");
			company.setLicenseNo(CompanyUtils.getRandom());
			company.setNameCN("中食运通Company");
			company.setNameEN("TheCompanyOfZSYT");
			company.setNature(0);
			company.setOrgCode("orgCode");
			company.setQurCert("qurCert");
			company.setQualityEstablished(true);

			Region region = regionManagementService.get(20l);// 从登录用户对象中得到:山东省|济南市|历下区

			// company.setRegion(region);

			company.setSimpleName("中食运通Company");
			company.setStatus("0");
			company.setTaxCert("taxCert");
			company.setUpdateDate(null); // 审批通过时间
			company.setValidity(null);
			company.setVersion("version");
			company.setZipcode("zipcode");

			// 保存公司基本信息
			companyInfoService.save(company);
			flush();

			// 1 提交企业信息
			approval4RegisterService.submitCompanyInfo(company.getId());
			flush();
		}

		// 处理待处理审批项
		Object[] obj = new Object[3];
		Approval4Register app = new Approval4Register();

		app.setIsActive(true);
		app.setCnstatus("1");

		CompanyInfo comCondition = new CompanyInfo();

		// comCondition.setRegion(new Region());
		// comCondition.getRegion().setCode("370100");
		// comCondition.setSimpleName("中");
		//
		// app.setCompanyInfo(comCondition);

		obj[0] = app;
		obj[1] = new Date();
		// obj[2] = new Date();

		Page<Approval4Register> approvals = approval4RegisterService
				.findActiveApproval(CompanyUtils.setupPage(), obj);

		for (int j = 0; j < approvals.getResult().size(); j++) {
			Approval4Register a = approvals.getResult().get(j);
			// 通过县级审批
			// approval4RegisterService.passCounty(a.getId(), "xx县", "县级审批"
			// + a.getCompanyInfo().getSimpleName());
		}

		// 查询市里待审批项
		obj = new Object[3];
		app = new Approval4Register();

		app.setIsActive(true);
		app.setCnstatus("2");
		app.setCstatus("1");

		comCondition = new CompanyInfo();
		// comCondition.setRegion(new Region());
		// comCondition.getRegion().setCode("370100");
		//
		// app.setCompanyInfo(comCondition);

		obj[0] = app;
		obj[1] = new Date();

		approvals = approval4RegisterService.findActiveApproval(CompanyUtils
				.setupPage(), obj);

		for (int k = 0; k < approvals.getResult().size(); k++) {
			if (k % 2 == 0) {
				Approval4Register a = approvals.getResult().get(k);
				// approval4RegisterService.passCity(a.getId(), "处理人", "市级审批意见:"
				// + a.getCompanyInfo().getSimpleName());
			}
		}
	}

	// 县级备案查询
	@Test
	public void testProvinceQuery() {
		// 初始化
		initPassCityCompanyInfo();
		// 构建市级待审批项的查询条件
		Object[] obj = new Object[3];
		Approval4Register app = new Approval4Register();

		app.setIsActive(true);
		app.setCnstatus("2");
		app.setCstatus("2");

		CompanyInfo comCondition = new CompanyInfo();
		// comCondition.setRegion(new Region());
		// comCondition.getRegion().setCode("370100");
		// 根据企业名称模糊查询
		comCondition.setSimpleName("中");

		// app.setCompanyInfo(comCondition);

		obj[0] = app;
		obj[1] = new Date();

		Page<Approval4Register> approvals = approval4RegisterService
				.findActiveApproval(CompanyUtils.setupPage(), obj);

		for (Approval4Register i : approvals.getResult()) {
			// System.out.println(i.getId() + "   "
			// // + i.getCompanyInfo().getSimpleName() + "   "
			// + i.getCreateDate() + "   第"
			// + i.getCompanyInfo().getCompanyRegister().size() + 1
			// + "次申请    纸质状态：" + i.getCpstatus() + "   网上状态：" + i.getCnstatus()
			// + i.getCstatus() + "  审批意见:"
			// + i.getCncomment());
		}
	}

	
}
