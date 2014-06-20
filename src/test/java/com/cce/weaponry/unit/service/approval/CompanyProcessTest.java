package com.cce.weaponry.unit.service.approval;

import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Random;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.cce.modules.orm.Page;
import com.cce.modules.test.spring.SpringTxTestCase;
import com.cce.weaponry.entity.register.Approval4Register;
import com.cce.weaponry.entity.register.ApproveRegisterDetail;
import com.cce.weaponry.entity.register.CompanyBadge;
import com.cce.weaponry.entity.register.CompanyInfo;
import com.cce.weaponry.entity.register.QualityInfo;
import com.cce.weaponry.entity.register.Region;
import com.cce.weaponry.entity.register.TechnicianInfo;
import com.cce.weaponry.service.common.CompanyUtils;
import com.cce.weaponry.service.common.RegionManagementService;
import com.cce.weaponry.service.register.Approval4RegisterService;
import com.cce.weaponry.service.register.ApproveRegisterDetailService;
import com.cce.weaponry.service.register.CompanyBadgeService;
import com.cce.weaponry.service.register.CompanyInfoService;
import com.cce.weaponry.service.register.QualityInfoService;
import com.cce.weaponry.service.register.TechnicianInfoService;

public class CompanyProcessTest extends SpringTxTestCase {

	@Autowired
	private RegionManagementService regionManagementService;

	@Autowired
	private CompanyInfoService companyInfoService;

	@Autowired
	private QualityInfoService qualityInfoService;

	@Autowired
	private TechnicianInfoService technicianInfoService;

	@Autowired
	private CompanyBadgeService companyBadgeService;

	@Autowired
	private Approval4RegisterService approval4RegisterService;

	@Autowired
	private ApproveRegisterDetailService approveRegisterDetailService;

	private String getRandom() {
		return Integer.toString((new Random()).nextInt());
	}

	/**
	 * 审批流程
	 */
	@Test
	public void companyProcess() {
		System.out.println("企业用户登录");

		for (int i = 0; i < 5; i++) {
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

			// 质量体系
			QualityInfo qualityInfo = new QualityInfo();

			qualityInfo.setDeadLine(new java.util.Date());
			qualityInfo.setEstablished("stablished");
			qualityInfo.setEstDate(new java.util.Date());
			qualityInfo.setEstOrg("estOrg");
			qualityInfo.setCompanyInfo(company);

			// 保存质量体系信息
			qualityInfoService.save(qualityInfo);
			flush();

			// 技术人员
			TechnicianInfo technicianInfo = new TechnicianInfo();

			technicianInfo.setApprovalDept("approvalDept");
			technicianInfo.setCertNo(getRandom());
			technicianInfo.setEducation("education");
			technicianInfo.setName("name");
			// technicianInfo.setCompanyInfo(company);

			// 保存技术人员信息
			technicianInfoService.save(technicianInfo);
			flush();

			// 公司证章
			CompanyBadge companyBadge = new CompanyBadge();

			companyBadge.setDescription("图片路径");
			companyBadge.setExpireDate(null);
			companyBadge.setFile(null);
			companyBadge.setName("name");
			companyBadge.setType("type");
			companyBadge.setCompanyInfo(company);

			// 保存公司证章
			companyBadgeService.save(companyBadge);
			flush();

			// 删除质量体系
			qualityInfoService.delete(qualityInfo.getId());
			flush();

			// 删除技术人员信息
			// technicianInfoService.delete(technicianInfo.getId());
			flush();

			// 删除证章信息
			companyBadgeService.delete(companyBadge.getId());
			flush();

			// 提交公司申请
			approval4RegisterService.submitCompanyInfo(company.getId());
			flush();

			// 得到申请项
			Approval4Register approval = approval4RegisterService
					.getActiveApprovalByCompanyId(company.getId());

			System.out.println(approval.getCreateDate());

			List<ApproveRegisterDetail> details = approveRegisterDetailService
					.findApprovalHistoryByApprovalId(approval.getId());

			System.out.println(details.get(0).getCreateBy());
		}

		// 县级用户登录
		// 备案材料待审批项：
		System.out.println("县级用户登录");
		Object[] obj = new Object[3];
		Approval4Register app = new Approval4Register();

		app.setIsActive(true);
		app.setCnstatus("1");

		CompanyInfo comCondition = new CompanyInfo();

		// comCondition.setRegion(new Region());
		// comCondition.getRegion().setCode("370100");
		//
		// app.setCompanyInfo(comCondition);

		obj[0] = app;

		Page<Approval4Register> approvals = approval4RegisterService
				.findActiveApproval(CompanyUtils.setupPage(), obj);

		for (Approval4Register i : approvals.getResult()) {
			// System.out.println(i.getId() + "   "
			// + i.getCompanyInfo().getSimpleName() + "   "
			// + i.getCreateDate() + "   第"
			// + i.getCompanyInfo().getCompanyRegister().size() + 1
			// + "次申请    纸质状态：" + i.getCpstatus() + "   网上状态：" + i.getCnstatus()
			// + i.getCstatus() + "  审批意见:"
			// + i.getCncomment());
		}

		// 点某一项开始审批

		Approval4Register temp = null;
		CompanyInfo com = null;
		String status = null;
		List<ApproveRegisterDetail> details = null;

		if (approvals.getResult().size() > 0) {
			temp = approval4RegisterService.get(approvals.getResult().get(0)
					.getId());
			// com = temp.getCompanyInfo();
			System.out.println(com.getSimpleName() + "  " + com.getId());

			// 保存审批意见
			// temp.setCncomment("县级审批:" + com.getSimpleName());

			status = "1";
			if ("1".equals(status)) {// 点通过按钮
				approval4RegisterService.passCounty(temp.getId(), "xx县", "县级审批:" + com.getSimpleName());
			} else if ("0".equals(status)) {// 点退回按钮
				approval4RegisterService.notPassCounty(temp.getId(), "xx县", "县级审批:" + com.getSimpleName());
			} else if ("2".equals(status)) {// 点保存按钮
				approval4RegisterService.saveCountyComment(temp.getId(),
 "县级审批:" + com.getSimpleName());
			}

			// 县级下次登录
			System.out.println("县级用户下次登录");
			approvals = approval4RegisterService.findActiveApproval(
					CompanyUtils.setupPage(), obj);

			for (Approval4Register i : approvals.getResult()) {
				// System.out.println(i.getId() + "   "
				// + i.getCompanyInfo().getSimpleName() + "   "
				// + i.getCreateDate() + "   第"
				// + i.getCompanyInfo().getCompanyRegister().size() + 1
				// + "次申请    纸质状态：" + i.getCpstatus() + "   网上状态：" +
				// i.getCnstatus()
				// + i.getCstatus() + "  审批意见:"
				// + i.getCncomment());
			}

			// 公司审批历史
			// details = approveRegisterDetailService
			// .findApprovalHistoryByCompanyId(temp.getCompanyInfo()
			// .getId());

			for (ApproveRegisterDetail i : details) {
				System.out.println(i.getCreateDate() + i.getCreateBy()
						+ i.getType() + i.getComment());
			}
		}

		//

		// 市级登录
		System.out.println("市级登录");
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

		approvals = approval4RegisterService.findActiveApproval(CompanyUtils
				.setupPage(), obj);

		for (Approval4Register i : approvals.getResult()) {
			System.out.println(i.getId() + "   "
					// + i.getCompanyInfo().getSimpleName() + "   "
					// + i.getCreateDate() + "   第"
					// + i.getCompanyInfo().getCompanyRegister().size() + 1
 + "次申请    纸质状态：" + i.getCpstatus() + "   网上状态：" + i.getCnstatus()
					+ "  审批意见:" + i.getCncomment());
		}

		// 点某一项开始审批
		if (approvals.getResult().size() > 0) {
			temp = approval4RegisterService.get(approvals.getResult().get(0)
					.getId());
			// com = temp.getCompanyInfo();
			System.out.println(com.getSimpleName() + "  " + com.getId());

			// 保存审批意见
			// temp.setCncomment("市级审批:" + com.getSimpleName());

			status = "0";
			if ("1".equals(status)) {// 点通过按钮
				approval4RegisterService.passCity(temp.getId(), "xx市", "市级审批:"
						+ com.getSimpleName());
			} else if ("0".equals(status)) {// 点退回按钮
				approval4RegisterService.notPassCity(temp.getId(), "xx市", "市级审批:" + com.getSimpleName());
			} else if ("2".equals(status)) {// 点保存按钮
				approval4RegisterService.saveCityComment(temp.getId(), "市级审批:"
						+ com.getSimpleName());
			}

			// 市级下次登录
			System.out.println("市级下次登录");
			approvals = approval4RegisterService.findActiveApproval(
					CompanyUtils.setupPage(), obj);

			for (Approval4Register i : approvals.getResult()) {
				// System.out.println(i.getId() + "   "
				// + i.getCompanyInfo().getSimpleName() + "   "
				// + i.getCreateDate() + "   第"
				// + i.getCompanyInfo().getCompanyRegister().size() + 1
				// + "次申请    纸质状态：" + i.getCpstatus() + "   网上状态：" +
				// i.getCnstatus()
				// + i.getCstatus() + "  审批意见:"
				// + i.getCncomment());
			}

			// 公司审批历史
			// details = approveRegisterDetailService
			// .findApprovalHistoryByCompanyId(temp.getCompanyInfo()
			// .getId());

			for (ApproveRegisterDetail i : details) {
				System.out.println(i.getCreateDate() + i.getCreateBy()
						+ i.getType() + i.getComment());
			}
		}

		// 县级用户登录市级退回重审
		// 备案材料待审批项：
		System.out.println("县级用户登录市级退回重审");
		obj = new Object[3];
		app = new Approval4Register();

		app.setIsActive(true);
		app.setCnstatus("2");
		app.setCstatus("3");

		comCondition = new CompanyInfo();
		// comCondition.setRegion(new Region());
		// comCondition.getRegion().setCode("370100");
		//
		// app.setCompanyInfo(comCondition);

		obj[0] = app;

		approvals = approval4RegisterService.findActiveApproval(CompanyUtils
				.setupPage(), obj);

		for (Approval4Register i : approvals.getResult()) {
			// System.out.println(i.getId() + "   "
			// + i.getCompanyInfo().getSimpleName() + "   "
			// + i.getCreateDate() + "   第"
			// + i.getCompanyInfo().getCompanyRegister().size() + 1
			// + "次申请    纸质状态：" + i.getCpstatus() + "   网上状态：" + i.getCnstatus()
			// + i.getCstatus() + "  审批意见:"
			// + i.getCncomment());
		}

		// 点某一项开始审批

		if (approvals.getResult().size() > 0) {
			temp = approval4RegisterService.get(approvals.getResult().get(0)
					.getId());
			// com = temp.getCompanyInfo();
			System.out.println(com.getSimpleName() + "  " + com.getId());

			// 保存审批意见
			// temp.setCncomment("县级审批:" + com.getSimpleName());

			status = "1";
			if ("1".equals(status)) {// 点重新提交按钮
				approval4RegisterService.passCounty(temp.getId(), "xx县", "县级审批:" + com.getSimpleName());
			} else if ("0".equals(status)) {// 点退回按钮
				approval4RegisterService.notPassCounty(temp.getId(), "xx县", "县级审批:" + com.getSimpleName());
			}

			// 县级下次登录
			System.out.println("县级用户下次登录");
			approvals = approval4RegisterService.findActiveApproval(
					CompanyUtils.setupPage(), obj);

			for (Approval4Register i : approvals.getResult()) {
				// System.out.println(i.getId() + "   "
				// + i.getCompanyInfo().getSimpleName() + "   "
				// + i.getCreateDate() + "   第"
				// + i.getCompanyInfo().getCompanyRegister().size() + 1
				// + "次申请    纸质状态：" + i.getCpstatus() + "   网上状态：" +
				// i.getCnstatus()
				// + i.getCstatus() + "  审批意见:"
				// + i.getCncomment());
			}

			// 公司审批历史
			// details = approveRegisterDetailService
//					.findApprovalHistoryByCompanyId(temp.getCompanyInfo()
			// .getId());

			for (ApproveRegisterDetail i : details) {
				System.out.println(i.getCreateDate() + i.getCreateBy()
						+ i.getType() + i.getComment());
			}
		}

		// 市级登录
		System.out.println("市级登录");
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

		approvals = approval4RegisterService.findActiveApproval(CompanyUtils
				.setupPage(), obj);

		for (Approval4Register i : approvals.getResult()) {
			// System.out.println(i.getId() + "   "
			// + i.getCompanyInfo().getSimpleName() + "   "
			// + i.getCreateDate() + "   第"
			// + i.getCompanyInfo().getCompanyRegister().size() + 1
			// + "次申请    纸质状态：" + i.getCpstatus() + "   网上状态：" + i.getCnstatus()
			// + "  审批意见:" + i.getCncomment());
		}

		// 点某一项开始审批
		if (approvals.getResult().size() > 0) {
			temp = approval4RegisterService.get(approvals.getResult().get(0)
					.getId());
			// com = temp.getCompanyInfo();
			System.out.println(com.getSimpleName() + "  " + com.getId());

			// 保存审批意见
			// temp.setCncomment("市级审批:" + com.getSimpleName());

			status = "1";
			if ("1".equals(status)) {// 点通过按钮
				approval4RegisterService.passCity(temp.getId(), "xx市", "市级审批:"
						+ com.getSimpleName());
			} else if ("0".equals(status)) {// 点退回按钮
				approval4RegisterService.notPassCity(temp.getId(), "xx市", "市级审批:" + com.getSimpleName());
			} else if ("2".equals(status)) {// 点保存按钮
				approval4RegisterService.saveCityComment(temp.getId(), "市级审批:"
						+ com.getSimpleName());
			}

			// 市级下次登录
			System.out.println("市级下次登录");
			approvals = approval4RegisterService.findActiveApproval(
					CompanyUtils.setupPage(), obj);

			for (Approval4Register i : approvals.getResult()) {
				// System.out.println(i.getId() + "   "
				// + i.getCompanyInfo().getSimpleName() + "   "
				// + i.getCreateDate() + "   第"
				// + i.getCompanyInfo().getCompanyRegister().size() + 1
				// + "次申请    纸质状态：" + i.getCpstatus() + "   网上状态：" +
				// i.getCnstatus()
				// + i.getCstatus() + "  审批意见:"
				// + i.getCncomment());
			}

			// 公司审批历史
			// details = approveRegisterDetailService
//					.findApprovalHistoryByCompanyId(temp.getCompanyInfo()
			// .getId());

			for (ApproveRegisterDetail i : details) {
				System.out.println(i.getCreateDate() + i.getCreateBy()
						+ i.getType() + i.getComment());
			}
		}

		// 省级登录
		System.out.println("省级登录");
		obj = new Object[3];
		app = new Approval4Register();

		app.setIsActive(true);
		app.setCnstatus("2");
		app.setCstatus("2");

		comCondition = new CompanyInfo();
		// comCondition.setRegion(new Region());
		// comCondition.getRegion().setCode("370000");
		//
		// app.setCompanyInfo(comCondition);

		obj[0] = app;

		approvals = approval4RegisterService.findActiveApproval(CompanyUtils
				.setupPage(), obj);

		for (Approval4Register i : approvals.getResult()) {
			// System.out.println(i.getId() + "   "
			// + i.getCompanyInfo().getSimpleName() + "   "
			// + i.getCreateDate() + "   第"
			// + i.getCompanyInfo().getCompanyRegister().size() + 1
			// + "次申请    纸质状态：" + i.getCpstatus() + "   网上状态：" + i.getCnstatus()
			// + "  审批意见:" + i.getCncomment());
		}

		System.out.println("通过审批的公司");

		Object[] arr = new Object[3];
		CompanyInfo companyInfo = new CompanyInfo();
		// companyInfo.setRegion(new Region());
		// companyInfo.getRegion().setCode("370100");
		companyInfo.setStatus("2");
		arr[0] = companyInfo;
		Date beginDate = new Date();
		Date endDate = new Date();
		List<CompanyInfo> coms = companyInfoService.findCompanies(arr);
		for (CompanyInfo c : coms) {
			System.out.println(c.getNameCN());
		}

		Map<Date, Integer> maps = companyInfoService
				.findCompanyInfosByCondition(arr);

		for (Iterator<Date> it = maps.keySet().iterator(); it.hasNext();) {
			Date key = it.next();
			System.out.println(CompanyUtils.formatDate(key) + "     "
					+ maps.get(key).toString());
		}

		System.out.println("技术人员:");
		arr = new Object[3];
		TechnicianInfo technician = new TechnicianInfo();
		companyInfo = new CompanyInfo();
		// companyInfo.setRegion(new Region());
		// companyInfo.getRegion().setCode("370100");
		// companyInfo.setStatus("2");
		// technician.setCompanyInfo(companyInfo);

		arr[0] = technician;
		arr[1] = beginDate;
		// arr[2] = endDate;

		List<TechnicianInfo> technicians = technicianInfoService
				.findTechnicianInfos(arr);
		for (TechnicianInfo i : technicians) {
			System.out.println(i.getName());
		}

		Map<Date, Integer> mapTechnician = technicianInfoService
				.findTechnicianInfosByCondition(arr);

		for (Iterator<Date> its = mapTechnician.keySet().iterator(); its
				.hasNext();) {
			Date key = its.next();
			System.out.println(CompanyUtils.formatDate(key) + "     "
					+ maps.get(key).toString());
		}
	}
}
