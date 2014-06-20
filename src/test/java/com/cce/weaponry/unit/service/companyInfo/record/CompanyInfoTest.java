package com.cce.weaponry.unit.service.companyInfo.record;

import java.util.Date;
import java.util.List;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.cce.modules.test.spring.SpringTxTestCase;
import com.cce.weaponry.entity.register.Approval4Register;
import com.cce.weaponry.entity.register.ApproveRegisterDetail;
import com.cce.weaponry.entity.register.CompanyBadge;
import com.cce.weaponry.entity.register.CompanyInfo;
import com.cce.weaponry.entity.register.FileBean;
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

public class CompanyInfoTest extends SpringTxTestCase {

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

	private CompanyInfo initCompanyInfo() {
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

		return companyInfoService.get(company.getId());
	}

	// 测试保存公司最基本信息
	@Test
	public void testSaveCompanyInfo() {
		CompanyInfo companyInfo = initCompanyInfo();
		System.out.println("saveCompanyInfo: " + companyInfo.getId());
	}
	
	private QualityInfo initQualityInfo() {
		CompanyInfo companyInfo = initCompanyInfo();
		// 质量体系
		QualityInfo qualityInfo = new QualityInfo();

		qualityInfo.setDeadLine(new java.util.Date());
		qualityInfo.setEstablished("stablished");
		qualityInfo.setEstDate(new java.util.Date());
		qualityInfo.setEstOrg("estOrg");
		qualityInfo.setCompanyInfo(companyInfo);

		// 保存质量体系信息
		qualityInfoService.save(qualityInfo);
		flush();

		return qualityInfoService.get(qualityInfo.getId());
	}

	// 测试保存质量体系信息
	@Test
	public void testSaveQualityInfo() {
		QualityInfo qualityInfo = initQualityInfo();
		System.out.println("qualityInfo: " + qualityInfo.getId());
		// 删除质量体系信息
		qualityInfoService.delete(qualityInfo.getId());
	}

	private TechnicianInfo initTechnicianInfo() {
		// 技术人员
		TechnicianInfo technicianInfo = new TechnicianInfo();

		technicianInfo.setApprovalDept("approvalDept");
		technicianInfo.setCertNo(CompanyUtils.getRandom());
		technicianInfo.setEducation("education");
		technicianInfo.setName("name");

		// technicianInfo.setCompanyInfo(initCompanyInfo());

		// 保存技术人员信息
		technicianInfoService.save(technicianInfo);
		flush();

		return technicianInfoService.get(technicianInfo.getId());
	}

	// 测试保存技术人员信息
	@Test
	public void testSaveTechnicianInfo() {
		TechnicianInfo technicianInfo = initTechnicianInfo();
		System.out.println("technicianInfo: " + technicianInfo);
		technicianInfoService.delete(technicianInfo.getId());
	}

	private CompanyBadge initCompanyBadge() {
		CompanyInfo companyInfo = initCompanyInfo();
		// 公司证章
		CompanyBadge companyBadge = new CompanyBadge();

		companyBadge.setDescription("imageDescription");
		companyBadge.setExpireDate(null);
		
		FileBean fileBean = new FileBean();
		
		fileBean.setCreateBy(companyInfo.getSimpleName());
		fileBean.setCreateDate(new Date());
		fileBean.setFileURI("the url of the image");
		
		// 在companyBadge 中设置cascade=cascadeType.ALL 级联保存文件信息
		companyBadge.setFile(fileBean);

		companyBadge.setName("name");
		companyBadge.setType("type");
		companyBadge.setCompanyInfo(companyInfo);

		// 保存公司证章
		companyBadgeService.save(companyBadge);
		flush();

		return companyBadgeService.get(companyBadge.getId());
	}

	// 测试保存公司证章信息
	@Test
	public void testSaveCompanyBadge() {
		CompanyBadge companyBadge = initCompanyBadge();
		System.out.println("companyBadge: " + companyBadge.getId()
				+ companyBadge.getFile().getCreateBy());
		companyBadgeService.delete(companyBadge.getId());
	}

	// 测试提交公司申请
	@Test
	public void testProcessApprovalItem() {
		CompanyInfo companyInfo = initCompanyInfo();
		// 提交公司申请
		approval4RegisterService.submitCompanyInfo(companyInfo.getId());
		flush();
		// 得到申请项
		Approval4Register approval = approval4RegisterService
				.getActiveApprovalByCompanyId(companyInfo.getId());

		System.out.println("申请项信息："
				+ CompanyUtils.formatDate(approval.getCreateDate()));

		// 申请历史
		List<ApproveRegisterDetail> details = approveRegisterDetailService
				.findApprovalHistoryByApprovalId(approval.getId());

		System.out.println("申请历史: " + details.get(0).getCreateBy());
	}

}
