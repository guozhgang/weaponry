package com.cce.weaponry.unit.service.approval;

import java.util.Date;
import java.util.List;
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

public class CompanyProcess2Test extends SpringTxTestCase {

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
	 * 县级用户 备案材料 待审批项 已完成审批项
	 */
	@Test
	public void companyProcess() {

		System.out.println("企业用户登录");

		for (int i = 0; i < 10; i++) {
			// 企业登录

			// 公司对象
			CompanyInfo company = new CompanyInfo();

			// 设置公司各种属性
			company.setAddress(getRandom());// 单位地址
			company.setBank(getRandom());// 开户银行
			company.setBankAccount(getRandom()); // 银行账号
			company.setCertDept("certDept"); // 发证部门
			company.setCompanyType("companyType"); // 企业分类
			company.setCreateBy("createBy"); // 创建人
			company.setCreateDate(new Date()); // 保存日期
			company.setCredit("credit"); // 信用等级
			company.setCreditRating("5");// 信用等级
			company.setZipcode("zipcode");// 邮政编码
			company.setFpNo(getRandom());// 
			company.setLegal("legal" + getRandom());// 法定代表人
			company.setLegalFax("legalFax");// 法定代表人传真
			company.setLegalMail("legalMail"); // 法定代表人邮箱
			company.setLegalMobile(getRandom()); // 法定代表人手机
			company.setLegalTel(getRandom()); // 法定代表人固定电话
			company.setLevel("5"); // 
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
			// Long qualityInfoId = companyService
			// .saveQualityInfo(id, qualityInfo);
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
			// Long technicianInfoId = companyService.saveTechnicianInfo(id,
			// technicianInfo);
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
			// Long badgeId = companyService.saveCompanyBadge(id, companyBadge);
			companyBadgeService.save(companyBadge);
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

		// 开始审批
		for (int i = 0; i < approvals.getResult().size() - 3; i++) {
			Approval4Register temp = approvals.getResult().get(i);
			// CompanyInfo com = temp.getCompanyInfo();

			// 保存审批意见
			// temp.setCncomment("县级审批:" + com.getSimpleName());

			String status = i % 2 == 0 ? "1" : "0";
			// if ("1".equals(status)) {// 点通过按钮
			// approval4RegisterService.passCounty(temp.getId(), "xx县", "县级审批:"
			// + com.getSimpleName());
			// } else if ("0".equals(status)) {// 点退回按钮
			// approval4RegisterService.notPassCounty(temp.getId(), "xx县",
			// "县级审批:" + com.getSimpleName());
			// } else if ("2".equals(status)) {// 点保存按钮
			// approval4RegisterService.saveCountyComment(temp.getId(),
			// "县级审批:" + com.getSimpleName());
			// }
		}

		// 待处理审批项 ...
		System.out.println("待处理审批项");
		obj = new Object[3];
		app = new Approval4Register();

		app.setIsActive(true);
		app.setCnstatus("1");

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

		// 已完成审批项 ...
		System.out.println("已完成审批项");

		obj = new Object[3];
		app = new Approval4Register();

		app.setIsActive(true);
		app.setCnstatus("2");

		comCondition = new CompanyInfo();
		// comCondition.setRegion(new Region());
		// comCondition.getRegion().setCode("370100");
		// comCondition.setSimpleName("中");
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
	}

}
