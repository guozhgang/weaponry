package com.cce.weaponry.unit.service.credit;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Random;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.cce.modules.orm.Page;
import com.cce.modules.orm.PropertyFilter;
import com.cce.modules.test.spring.SpringTxTestCase;
import com.cce.weaponry.entity.credit.Approval4Credit;
import com.cce.weaponry.entity.credit.ApproveCreditDetail;
import com.cce.weaponry.entity.credit.CompanyCredit;
import com.cce.weaponry.entity.register.CompanyInfo;
import com.cce.weaponry.entity.register.Region;
import com.cce.weaponry.service.common.CompanyUtils;
import com.cce.weaponry.service.common.RegionManagementService;
import com.cce.weaponry.service.credit.Approval4CreditService;
import com.cce.weaponry.service.credit.ApproveCreditDetailService;
import com.cce.weaponry.service.credit.CompanyCreditService;
import com.cce.weaponry.service.register.CompanyBadgeService;
import com.cce.weaponry.service.register.CompanyInfoService;
import com.cce.weaponry.service.register.QualityInfoService;
import com.cce.weaponry.service.register.TechnicianInfoService;

public class CompanyCreditProcessTest extends SpringTxTestCase {

	@Autowired
	private CompanyCreditService companyCreditService;

	@Autowired
	private CompanyInfoService companyInfoService;

	@Autowired
	private RegionManagementService regionManagementService;

	@Autowired
	private QualityInfoService qualityInfoService;

	@Autowired
	private TechnicianInfoService technicianInfoService;

	@Autowired
	private CompanyBadgeService companyBadgeService;

	@Autowired
	private Approval4CreditService approval4CreditService;

	@Autowired
	private ApproveCreditDetailService approveCreditDetailService;

	private String getRandom() {
		return Integer.toString((new Random()).nextInt());
	}

	private void initCompanyInfoData() {
		System.out.println("企业用户登录");

		for (int i = 0; i < 3; i++) {
			// 企业登录

			CompanyInfo company = new CompanyInfo();

			// 设置公司各种属性
			company.setAddress(getRandom());
			company.setBank(getRandom());
			company.setBankAccount(getRandom());
			company.setCertDept("certDept");
			company.setCompanyType("companyType");
			company.setCreateBy("createBy");
			company.setCreateDate(new Date());
			company.setCredit("credit");
			company.setCreditRating("5");
			company.setZipcode("zipcode");
			company.setFpNo(getRandom());
			company.setLegal("legal" + getRandom());
			company.setLegalFax("legalFax");
			company.setLegalMail("legalMail");
			company.setLegalMobile(getRandom());
			company.setLegalTel(getRandom());
			company.setLevel("5");
			company.setLicenseCertDate(new Date());
			company.setLicenseCertDept("licenseCertDept");
			company.setLicenseNo(getRandom());
			company.setNameCN("中食运通Company" + i);
			company.setNameEN("TheCompanyOfZSYT" + i);
			company.setNature(0);
			company.setOrgCode("orgCode");
			company.setQurCert("qurCert");
			company.setQualityEstablished(true);

			Region region = regionManagementService.get(20l + i);// 从登录用户对象中得到:山东省|济南市|历下区

			// company.setRegion(region);

			System.out.println("公司所在地区编号：" + region.getCode());

			company.setSimpleName("中食运通Company" + i);
			company.setStatus("0");
			company.setTaxCert("taxCert");
			company.setUpdateDate(null); // 审批通过时间
			company.setValidity(null);
			company.setVersion("version");
			company.setZipcode("zipcode");

			// 保存公司基本信息
			companyInfoService.save(company);
			flush();

			// // 质量体系
			// QualityInfo qualityInfo = new QualityInfo();
			//
			// qualityInfo.setDeadLine(new java.util.Date());
			// qualityInfo.setEstablished("stablished");
			// qualityInfo.setEstDate(new java.util.Date());
			// qualityInfo.setEstOrg("estOrg");
			// qualityInfo.setCompanyInfo(company);
			//
			// // 保存质量体系信息
			// qualityInfoService.save(qualityInfo);
			// flush();
			//
			// // 技术人员
			// TechnicianInfo technicianInfo = new TechnicianInfo();
			//
			// technicianInfo.setApprovalDept("approvalDept");
			// technicianInfo.setCertNo(getRandom());
			// technicianInfo.setEducation("education");
			// technicianInfo.setName("name");
			// technicianInfo.setCompanyInfo(company);
			//
			// // 保存技术人员信息
			// technicianInfoService.save(technicianInfo);
			// flush();
			//
			// // 公司证章
			// CompanyBadge companyBadge = new CompanyBadge();
			//			
			// companyBadge.setDescription("图片路径");
			// companyBadge.setExpireDate(null);
			// companyBadge.setFile(null);
			// companyBadge.setName("name");
			// companyBadge.setType("type");
			// companyBadge.setCompanyInfo(company);
			//
			// // 保存公司证章
			// companyBadgeService.save(companyBadge);
			// flush();

			System.out.println("已初始化公司:" + company.getId());
		}
	}

	private void initCompanyCreditTemplateData() {
		String[] strs = new String[] { "A", "B", "C", "D" };

		// for (int i = 0; i < strs.length; i++) {
		// CompanyCreditTemplate template = new CompanyCreditTemplate();
		//
		// template.setName(strs[i] + "级申请");
		// template.setDescription(strs[i] + "级申请描述...");
		//
		// companyCreditTemplateService.save(template);
		// }
		System.out.println("已初始化公司模板信息...");
	}

	// 公司申请
	@Test
	public void testProcessCreditApproval() {
		// 初始化公司数据
		initCompanyInfoData();

		// 得到所有公司信息列表
		List<CompanyInfo> companyInfos = companyInfoService
				.list(new ArrayList<PropertyFilter>());

		// 取出一条数据作为待审批数据
		CompanyInfo companyInfo = companyInfos.get(1);

		// 初始化模板数据集合
		initCompanyCreditTemplateData();

		// 得到所有申请模板集合
		// List<CompanyCreditTemplate> companyCreditTemplates =
		// companyCreditTemplateService
		// .findAll();
		//
		// // 取出一条数据作为公司的申请模板
		// CompanyCreditTemplate template = companyCreditTemplates.get(1);


		// 处理公司等级申请
		// companyCreditService.submitCompanyCreditApproval(companyInfo.getId(),
		// template.getId(), "中食运通信用等级申请", 151l, true);


		System.out.println("提交申请公司的审批历史： ");
		List<Approval4Credit> approval4Credits = approval4CreditService
				.findActiveApproval4CreditByCompanyId(companyInfo.getId());

		for (Approval4Credit a : approval4Credits) {
			int status = a.getNetstatus() == null ? 0 : Integer.parseInt(a
					.getNetstatus());
			String isSubmit = (status >= 1 ? "是" : "否");
			// System.out.println("记录编号: " + a.getId() + " 申请类型：" +
			// a.getCompanyCredit().getTemplate().getName() + " 企业提交: "
			// + isSubmit);

			List<ApproveCreditDetail> approvalCreditDetails = approveCreditDetailService
					.findApproveCreditDetailsByCondition(companyInfo.getId(), a
							.getCompanyCredit().getId(), a.getId());
			for (ApproveCreditDetail d : approvalCreditDetails) {
				System.out.println("申请时间: " + CompanyUtils.formatDate(d.getCreateDate()) + " 处理人: " + d.getCreateBy() + " 状态：" + d.getType()
						+ " 备注： "
						+ d.getComment());
			}
		}

		// 待处理审批项
		System.out.println("\n待处理审批项:");
		Object[] criteria = new Object[3];

		Approval4Credit condition = new Approval4Credit();

		condition.setIsActive(true);
		condition.setNetstatus("1");
		condition.setCompanyCredit(new CompanyCredit());
		// condition.getCompanyCredit().setCompanyInfo(new CompanyInfo());
		// condition.getCompanyCredit().getCompanyInfo().setRegion(new
		// Region());
		// condition.getCompanyCredit().getCompanyInfo().getRegion().setCode(
		// "370100");
		//
		// condition.getCompanyCredit().getCompanyInfo().setSimpleName("中食");

		criteria[0] = condition;
		criteria[1] = new Date();
		// criteria[2] = new Date();

		Page<Approval4Credit> waitintCredits = approval4CreditService
				.findApprovalsByCondition(CompanyUtils.setupPage(), criteria);

		for (Approval4Credit a : waitintCredits.getResult()) {
			int status = a.getNetstatus() == null ? 0 : Integer.parseInt(a
					.getNetstatus());
			System.out.println("记录编号: " + a.getId() + " 申请企业： "
					// + a.getCompanyCredit().getCompanyInfo().getSimpleName()
 + " 申请时间："
					// + CompanyUtils.formatDate(a.getCreateDate()) + " 申请等级：" +
					// a.getCompanyCredit().getTemplate().getName() + " 申请类型："
					+ a.getCompanyCredit().getApproval().size() + " 当前状态：" + a.getNetstatus() + " 审批意见："
					+ a.getNetcomment());
		}

		// 省级用户处理审批
		// 取出一条待处理审批项的数据
		Approval4Credit waitingCredit = waitintCredits.getResult().get(0);

		companyCreditService.processCompanyCreditApproval(
waitingCredit.getId(), "省级审批意见。。。", true, "xx省");

		// 已完成审批项
		System.out.println("已完成审批项:");

		// 构建已完成审批项的查询条件
		criteria = new Object[3];

		condition = new Approval4Credit();

		condition.setIsActive(true);
		condition.setNetstatus("4");
		condition.setCompanyCredit(new CompanyCredit());
		// condition.getCompanyCredit().setCompanyInfo(new CompanyInfo());
		// condition.getCompanyCredit().getCompanyInfo().setRegion(new
		// Region());
		// condition.getCompanyCredit().getCompanyInfo().getRegion().setCode(
		// "370100");
		//
		// condition.getCompanyCredit().getCompanyInfo().setSimpleName("中食");

		criteria[0] = condition;
		criteria[1] = new Date();
		// criteria[2] = new Date();

		Page<Approval4Credit> completedCredits = approval4CreditService
				.findApprovalsByCondition(CompanyUtils.setupPage(), criteria);

		for (Approval4Credit a : completedCredits.getResult()) {
			int status = a.getNetstatus() == null ? 0 : Integer.parseInt(a
					.getNetstatus());
			System.out.println("记录编号: " + a.getId() + " 申请企业： "
					// + a.getCompanyCredit().getCompanyInfo().getSimpleName()
 + " 申请时间："
					// + CompanyUtils.formatDate(a.getCreateDate()) + " 申请等级：" +
					// a.getCompanyCredit().getTemplate().getName() + " 申请类型："
					+ a.getCompanyCredit().getApproval().size() + " 当前状态：" + a.getNetstatus() + " 审批意见："
					+ a.getNetcomment());
		}

		// 被处理的公司的审批历史
		System.out.println("被处理的公司的审批历史");

		approval4Credits = approval4CreditService
				.findActiveApproval4CreditByCompanyId(companyInfo.getId());

		for (Approval4Credit a : approval4Credits) {
			int status = a.getNetstatus() == null ? 0 : Integer.parseInt(a
					.getNetstatus());
			// String isSubmit = (status >= 1 ? "是" : "否");
			// // System.out.println("记录编号: " + a.getId() + " 申请类型：" +
			// a.getCompanyCredit().getTemplate().getName() + " 企业提交: "
			// + isSubmit);

			List<ApproveCreditDetail> approvalCreditDetails = approveCreditDetailService
					.findApproveCreditDetailsByCondition(companyInfo.getId(), a
							.getCompanyCredit().getId(), a.getId());
			for (ApproveCreditDetail d : approvalCreditDetails) {
				System.out.println("申请时间: " + CompanyUtils.formatDate(d.getCreateDate()) + " 处理人: " + d.getCreateBy() + " 状态：" + d.getType()
						+ " 备注： "
						+ d.getComment());
			}
		}
		
		// 查询与统计
		System.out.println("查询统计");
		// Page<Approval4Credit> stats = approval4CreditService
		// .findApproval4Credits(CompanyUtils.setupPage(), template
		// .getId(), "370100", "中食", null,
		// null);
		//
		// for (Approval4Credit a : stats.getResult()) {
		// int status = a.getNetstatus() == null ? 0 : Integer.parseInt(a
		// .getNetstatus());
		// String isSubmit = (status >= 1 ? "是" : "否");
		// System.out.println("企业名称: "
		// // + a.getCompanyCredit().getCompanyInfo().getSimpleName()
		// + " 通过时间："
		// + CompanyUtils.formatDate(a.getUpdateDate()));
		// }
		
		// 修改分级
		// Approval4Credit approval4Credit = stats.getResult().get(0);

		// companyCreditService.modifyCompanyCredit(approval4Credit.getId(),
		// template.getId() + 1, "因xx原因，被修改等级", "等级修改意见", "xx省");
		
		// 被修改等级的公司的审批历史
		System.out.println("修改等级的公司的审批历史");

		approval4Credits = approval4CreditService
				.findActiveApproval4CreditByCompanyId(companyInfo.getId());

		for (Approval4Credit a : approval4Credits) {
			int status = a.getNetstatus() == null ? 0 : Integer.parseInt(a
					.getNetstatus());
			String isSubmit = (status >= 1 ? "是" : "否");
//			System.out.println("记录编号: " + a.getId() + " 申请类型：" + a.getCompanyCredit().getTemplate().getName() + " 企业提交: "
			// + isSubmit);

			List<ApproveCreditDetail> approvalCreditDetails = approveCreditDetailService
					.findApproveCreditDetailsByCondition(companyInfo.getId(), a
							.getCompanyCredit().getId(), a.getId());
			for (ApproveCreditDetail d : approvalCreditDetails) {
				System.out.println("申请时间: " + CompanyUtils.formatDate(d.getCreateDate()) + " 处理人: " + d.getCreateBy() + " 状态：" + d.getType()
						+ " 备注： "
						+ d.getComment());
			}
		}

	}

}
