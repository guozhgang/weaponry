package com.cce.weaponry.unit.service.companyInfo.record;

import java.util.Date;
import java.util.List;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.cce.modules.orm.Page;
import com.cce.modules.test.spring.SpringTxTestCase;
import com.cce.weaponry.entity.register.Approval4Register;
import com.cce.weaponry.entity.register.CompanyInfo;
import com.cce.weaponry.entity.register.Region;
import com.cce.weaponry.entity.register.TechnicianInfo;
import com.cce.weaponry.service.common.CompanyUtils;
import com.cce.weaponry.service.common.RegionManagementService;
import com.cce.weaponry.service.register.Approval4RegisterService;
import com.cce.weaponry.service.register.CompanyInfoService;
import com.cce.weaponry.service.register.TechnicianInfoService;

public class RecordStatsTest extends SpringTxTestCase {

	@Autowired
	private CompanyInfoService companyInfoService;

	@Autowired
	private TechnicianInfoService technicianInfoService;

	@Autowired
	private RegionManagementService regionManagementService;

	@Autowired
	private Approval4RegisterService approval4RegisterService;

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

			// 技术人员
			TechnicianInfo technicianInfo = new TechnicianInfo();

			technicianInfo.setApprovalDept("approvalDept");
			technicianInfo.setCertNo(CompanyUtils.getRandom());
			technicianInfo.setEducation("education");
			technicianInfo.setName("name" + company.getId());
			// technicianInfo.setCompanyInfo(company);

			// 保存技术人员信息
			technicianInfoService.save(technicianInfo);
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
				// System.out.println("审批公司:" + a.getCompanyInfo().getId());
				// approval4RegisterService.passCity(a.getId(), "处理人", "市级审批意见:"
				// + a.getCompanyInfo().getSimpleName());
			}
		}
	}

	@Test
	public void testRecordStats() {
		initPassCityCompanyInfo();
		System.out.println("通过审批的公司");
		Object[] arr = new Object[3];

		CompanyInfo companyInfo = new CompanyInfo();
		// companyInfo.setRegion(new Region());
		// companyInfo.getRegion().setCode("370100");
		companyInfo.setStatus("2");

		arr[0] = companyInfo;

		List<CompanyInfo> coms = companyInfoService.findCompanies(arr);
		for (CompanyInfo c : coms) {
			System.out.println(c.getNameCN() + c.getId());
		}

		System.out.println("技术人员:");

		arr = new Object[3];

		TechnicianInfo technician = new TechnicianInfo();

		companyInfo = new CompanyInfo();
		// companyInfo.setRegion(new Region());
		// companyInfo.getRegion().setCode("370100");
		companyInfo.setStatus("2");

		// technician.setCompanyInfo(companyInfo);

		arr[0] = technician;
		arr[1] = new Date();
		// arr[2] = new Date();
		
		List<TechnicianInfo> technicians = technicianInfoService
				.findTechnicianInfos(arr);

		for (TechnicianInfo i : technicians) {
			System.out.println(i.getName());
		}
	}
}
