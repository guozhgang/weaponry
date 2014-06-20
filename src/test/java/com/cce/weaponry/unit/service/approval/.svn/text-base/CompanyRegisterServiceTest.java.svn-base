package com.cce.weaponry.unit.service.approval;

import java.util.Date;
import java.util.List;
import java.util.Random;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.cce.modules.orm.Page;
import com.cce.modules.test.spring.SpringTxTestCase;
import com.cce.weaponry.entity.register.Approval4Register;
import com.cce.weaponry.entity.register.CompanyBadge;
import com.cce.weaponry.entity.register.CompanyInfo;
import com.cce.weaponry.entity.register.EnforceOfficer;
import com.cce.weaponry.entity.register.EnforceOrg;
import com.cce.weaponry.entity.register.QualityInfo;
import com.cce.weaponry.entity.register.Region;
import com.cce.weaponry.entity.register.TechnicianInfo;
import com.cce.weaponry.service.common.CompanyUtils;
import com.cce.weaponry.service.common.RegionManagementService;
import com.cce.weaponry.service.register.Approval4RegisterService;
import com.cce.weaponry.service.register.ApproveRegisterDetailService;
import com.cce.weaponry.service.register.CompanyBadgeService;
import com.cce.weaponry.service.register.CompanyInfoService;
import com.cce.weaponry.service.register.EnforceOfficerService;
import com.cce.weaponry.service.register.EnforceOrgService;
import com.cce.weaponry.service.register.QualityInfoService;
import com.cce.weaponry.service.register.TechnicianInfoService;

/**
 * 业务逻辑方法测试
 * 
 */
public class CompanyRegisterServiceTest extends SpringTxTestCase {

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

	@Autowired
	private EnforceOrgService enforceOrgService;

	@Autowired
	private EnforceOfficerService enforceOfficerService;

	public String getRandom() {
		Random random = new Random();
		return Integer.toString(random.nextInt());
	}

	// 保存执法部门->县级|市级| 执法人员备案
	@Test
	public void addEnforceOrg() {
		EnforceOrg enforceOrg = new EnforceOrg();

		enforceOrg.setAddress(getRandom());
		enforceOrg.setAuthority(getRandom());
		enforceOrg.setAuthTel(getRandom());
		enforceOrg.setLeader(getRandom() + "leader");
		enforceOrg.setLeaderMobile(getRandom());
		enforceOrg.setName(getRandom());
		enforceOrg.setOrganizationInfo(null);
		enforceOrg.setTel(getRandom());
		enforceOrg.setZipcode(getRandom());

		enforceOrgService.save(enforceOrg);
		System.out.println("addEnforceOrg" + enforceOrg.getId());
		assertTrue(enforceOrg.getId() > 0);
	}

	// 保存执法人员->县级|市级| 执法人员备案
	@Test
	public void saveEnforceOfficer() {
		EnforceOrg enforceOrg = new EnforceOrg();

		enforceOrg.setAddress(getRandom());
		enforceOrg.setAuthority(getRandom());
		enforceOrg.setAuthTel(getRandom());
		enforceOrg.setLeader(getRandom() + "leader");
		enforceOrg.setLeaderMobile(getRandom());
		enforceOrg.setName(getRandom());
		enforceOrg.setOrganizationInfo(null);
		enforceOrg.setTel(getRandom());
		enforceOrg.setZipcode(getRandom());

		enforceOrgService.save(enforceOrg);

		// Page<EnforceOfficer> officers = enforceOfficerService
		// .findEnforceOfficers(CompanyUtils.setupPage(), null);
		// int size1 = officers.getResult().size();
		EnforceOfficer enforceOfficer = new EnforceOfficer();

		// enforceOfficer.setFile(null);
		enforceOfficer.setCreateDate(new Date());
		enforceOfficer.setDuty(getRandom());
		enforceOfficer.setIssueAuth(getRandom());
		enforceOfficer.setIssueNo(getRandom());
		enforceOfficer.setMobile(getRandom());
		enforceOfficer.setName(getRandom());
		Region region = regionManagementService.getRegionByCode("370321");
		enforceOfficer.setRegion(region);
		enforceOfficer.setEnforceOrg(enforceOrg);

		enforceOfficerService.save(enforceOfficer);

		// officers = enforceOfficerService.findEnforceOfficers(CompanyUtils
		// .setupPage(), null);
		//
		// assertEquals(officers.getResult().size() - size1, 1);
	}

	// 删除执法人员->县级|市级 |执法人员备案登记
	@Test
	public void delEnforceOfficer() {
		EnforceOrg enforceOrg = new EnforceOrg();

		enforceOrg.setAddress(getRandom());
		enforceOrg.setAuthority(getRandom());
		enforceOrg.setAuthTel(getRandom());
		enforceOrg.setLeader(getRandom() + "leader");
		enforceOrg.setLeaderMobile(getRandom());
		enforceOrg.setName(getRandom());
		enforceOrg.setOrganizationInfo(null);
		enforceOrg.setTel(getRandom());
		enforceOrg.setZipcode(getRandom());

		enforceOrgService.save(enforceOrg);

		// List<EnforceOfficer> officers = companyService
		// .findEnforceOfficers(null);
		// int size1 = officers.size();
		EnforceOfficer enforceOfficer = new EnforceOfficer();

		// enforceOfficer.setFile(null);
		enforceOfficer.setCreateDate(new Date());
		enforceOfficer.setDuty(getRandom());
		enforceOfficer.setIssueAuth(getRandom());
		enforceOfficer.setIssueNo(getRandom());
		enforceOfficer.setMobile(getRandom());
		enforceOfficer.setName(getRandom());
		Region region = regionManagementService.getRegionByCode("370321");
		enforceOfficer.setRegion(region);
		enforceOfficer.setEnforceOrg(enforceOrg);

		enforceOfficerService.save(enforceOfficer);

		// officers = companyService.findEnforceOfficers(null);
		//
		// assertEquals(officers.size() - size1, 1);

		// Page<EnforceOfficer> officers = enforceOfficerService
		// .findEnforceOfficers(CompanyUtils.setupPage(), null);
		// int size1 = officers.getResult().size();
		// enforceOfficerService.delete(enforceOfficer.getId());
		// officers = enforceOfficerService.findEnforceOfficers(CompanyUtils
		// .setupPage(), null);
		// assertTrue(officers.getResult().size() + 1 == size1);
	}

	// 根据企业id得到技术人员->企业|企业备案材料
	@Test
	public void findTechnicianInfoByCompanyId() {
		CompanyInfo company = initCompanyData();
		Page<TechnicianInfo> technicianInfos = technicianInfoService
				.findTechniciansByCompanyId(CompanyUtils.setupPage(),
						company.getId());
		assertEquals(1, technicianInfos.getResult().size());
	}

	//
	// 根据企业id得到质量体系信息->企业|企业备案材料
	@Test
	public void findQualitiesByCompanyId() {
		CompanyInfo company = initCompanyData();
		List<QualityInfo> qualityInfos = qualityInfoService
				.findQualityInfosByCompanyId(company.getId());
		assertEquals(1, qualityInfos.size());
	}

	//
	// 根据地区编码得到所包含地区的对象->省级|企业备案查询，企业备案统计，执法人员查看的查询地区下拉框
	@Test
	public void findRegionsByCode() {
		List<Region> regions = regionManagementService
				.findRegionsByCode("371725");
		assertEquals(1, regions.size());
	}

	//
	// 根据地区编码得到地区对象->在Action内部使用
	@Test
	public void getRegionByCode() {
		Region region = regionManagementService.getRegionByCode("371725");
		assertEquals("郓城县", region.getName());
	}

	//
	// 通过企业id得到申请项->企业|审批状态
	@Test
	public void getApprovalByCompanyId() {
		CompanyInfo company = initCompanyData();
		Approval4Register app = approval4RegisterService
				.getActiveApprovalByCompanyId(company.getId());
		assertNotNull(app);
	}

	//
	// 根据企业id得到企业对象->省级，市级，县级|企业备案状态
	@Test
	public void getCompanyInfo() {
		CompanyInfo company = initCompanyData();
		CompanyInfo com = companyInfoService.get(company.getId());
		assertNotNull(com.getSimpleName());
	}

	//
	// 根据id得到执法人员对象->省级，市级，县级|执法人员备案
	@Test
	public void getEnforceOfficerById() {
		EnforceOfficer off = initEnforceOfficerData();
		EnforceOfficer officer = enforceOfficerService.get(off
				.getId());
		// assertEquals(null, officer.getFile());
	}

	//
	// 根据名字得到执法人员对象->省|市|执法人员备案
	@Test
	public void getEnforceStaffByName() {
		EnforceOfficer off = initEnforceOfficerData();
		List<EnforceOfficer> officers = enforceOfficerService
				.getEnforceOfficerByName(off.getName());
		assertTrue(officers.size() > 0);
	}

	//
	// 保存公司证章->省级|企业证书颁发
	@Test
	public void saveCompanyBadge() {
		CompanyInfo com = initCompanyData();
		List<CompanyBadge> companyBadges = companyBadgeService
				.findCompanyBadgesByCompanyId(com.getId());
		int size1 = companyBadges.size();

		CompanyBadge badge = new CompanyBadge();
		badge.setDescription("description.jpg");
		badge.setExpireDate(new Date());
		badge.setName("name");
		badge.setType("type");
		badge.setCompanyInfo(com);

		companyBadgeService.save(badge);

		assertEquals(1, companyBadgeService
				.findCompanyBadgesByCompanyId(com.getId()).size()
				- size1);
	}

	//
	// 保存企业信息->企业|备案材料
	@Test
	public void saveCompanyInfo() {
		CompanyInfo company = new CompanyInfo();

		company.setAddress(getRandom());
		company.setBank(getRandom());
		company.setBankAccount(getRandom());
		company.setCertDept("certDept");
		company.setCompanyType("companyType");
		company.setCreateBy("createBy");
		company.setCreateDate(new Date());
		company.setCredit("credit");
		company.setCreditRating(getRandom());
		company.setZipcode("zipcode");

		companyInfoService.save(company);
		assertNotNull(company.getId());
	}

	//
	// 保存质量体系->企业|备案材料
	@Test
	public void saveQualityInfo() {
		CompanyInfo com = initCompanyData();
		int size = qualityInfoService.findQualityInfosByCompanyId(com.getId())
				.size();

		QualityInfo qualityInfo = new QualityInfo();

		qualityInfo.setDeadLine(new java.util.Date());
		qualityInfo.setEstablished("stablished");
		qualityInfo.setEstDate(new java.util.Date());
		qualityInfo.setEstOrg("estOrg");
		qualityInfo.setCompanyInfo(com);

		qualityInfoService.save(qualityInfo);

		assertEquals(1, qualityInfoService.findQualityInfosByCompanyId(
				com.getId()).size()
				- size);
	}

	//
	// 保存技术人员信息->企业|备案材料
	@Test
	public void saveTechnicianInfo() {
		CompanyInfo com = initCompanyData();
		TechnicianInfo technicianInfo = new TechnicianInfo();

		technicianInfo.setApprovalDept("approvalDept");
		technicianInfo.setCertNo(getRandom());
		technicianInfo.setEducation("education");
		technicianInfo.setName("name");
		// technicianInfo.setCompanyInfo(com);

		int size = technicianInfoService.findTechniciansByCompanyId(
				CompanyUtils.setupPage(), com.getId()).getResult().size();
		technicianInfoService.save(technicianInfo);

		assertEquals(1, technicianInfoService.findTechniciansByCompanyId(
				CompanyUtils.setupPage(), com.getId()).getResult().size()
				- size);
	}

	//

	//
	// 提交企业信息->企业|备案材料
	// @Test
	// public void submitCompanyInfo() {
	// int size = companyService.findActiveApproval(null).size();
	//
	// companyService.submitCompanyInfo(1l);
	//
	// // company = companyService.getCompanyInfo(id);
	// //
	// // assertEquals("1", company.getStatus());
	// assertEquals(1, companyService.findActiveApproval(null).size() - size);
	// }

	//
	// 通过企业id得到公司证章->企业|证章管理
	@Test
	public void findCompanyBadgesByCompanyId() {
		CompanyInfo com = initCompanyData();
		List<CompanyBadge> badges = companyBadgeService
				.findCompanyBadgesByCompanyId(com.getId());
		assertEquals(1, badges.size());
	}

	//
	// 通过id删除质量体系信息->企业|备案材料
	@Test
	public void delQuality() {
		CompanyInfo com = initCompanyData();
		List<QualityInfo> qualityInfos = qualityInfoService
				.findQualityInfosByCompanyId(com.getId());
		int size = qualityInfos.size();
		qualityInfoService.delete(qualityInfos.get(0).getId());
		assertEquals(1, size
				- qualityInfoService.findQualityInfosByCompanyId(com.getId())
						.size());
	}

	//
	// 通过id删除技术人员信息->企业|备案材料
	@Test
	public void delTechnician() {
		CompanyInfo com = initCompanyData();
		Page<TechnicianInfo> technicians = technicianInfoService
				.findTechniciansByCompanyId(CompanyUtils.setupPage(), com
						.getId());
		int size = technicians.getResult().size();
		technicianInfoService.delete(technicians.getResult().get(0).getId());
		assertEquals(1, size
				- technicianInfoService.findTechniciansByCompanyId(
						CompanyUtils.setupPage(),
						com.getId()).getResult().size());
	}

	//
	// 通过id删除证章信息->省级|企业证书颁发
	@Test
	public void delBadge() {
		CompanyInfo com = initCompanyData();
		List<CompanyBadge> badges = companyBadgeService
				.findCompanyBadgesByCompanyId(com.getId());
		int size = badges.size();
		companyBadgeService.delete(badges.get(0).getId());
		assertEquals(1, size
				- companyBadgeService.findCompanyBadgesByCompanyId(com.getId())

						.size());
	}

	//
	// 通过id得到地区信息->Action内部使用
	@Test
	public void getRegionById() {
		Region region = regionManagementService.get(5l);
		assertEquals("枣庄市", region.getName());
	}

	//
	// 通过限制查询条件查询申请项->省级|企业备案查询，县级|备案材料审批 市级退回重审 县级备案查询 ，市级|备案材料复审 县级备案查询
	@Test
	public void findActiveApproval() {
		initCompanyData();
		Object[] criterial = new Object[3];
		Approval4Register condition = new Approval4Register();
		// code=370921&isActive=1&cnstatus=1&companyName=1&beginDate=2010-04-19&endDate=2010-04-20
		// condition.setCompanyInfo(new CompanyInfo());
		// condition.getCompanyInfo().setRegion(regionManagementService.get(20l));
		condition.setIsActive(true);
		// condition.setCnstatus("1");
		// condition.getCompanyInfo().setSimpleName("1");

		criterial[0] = condition;
		criterial[1] = null;// CompanyUtils.parseDate("2010-04-19");
		criterial[2] = null;// CompanyUtils.parseDate("2010-04-20");

		Page<Approval4Register> approvals = approval4RegisterService
				.findActiveApproval(CompanyUtils.setupPage(), criterial);
		assertTrue(approvals.getResult().size() > 0);
	}

	//
	// 通过id得到申请项信息->
	// @Test
	// public void getApprovalById() {
	// Approval4Register approval = companyService.getApprovalById(5l);
	// assertEquals("ser", approval.getCncomment());
	// }

	//
	// 保存申请项->县，市|审批申请项
	@Test
	public void saveApproval() {

		int size = approval4RegisterService.findActiveApproval(

				CompanyUtils.setupPage(), null).getResult().size();
		Approval4Register approval = new Approval4Register();

		approval.setCcomment("ccomment");
		approval.setCncomment("cncomment");
		approval.setCnstatus("2");
		approval.setCreateDate(new Date());
		// approval.setCompanyInfo(new CompanyInfo());
		// approval.getCompanyInfo().setId(1l);

		approval4RegisterService.save(approval);

		assertEquals(1, approval4RegisterService.findActiveApproval(
				CompanyUtils.setupPage(), null).getResult().size()
				- size);

	}

	// 通过限制条件查找企业信息->省市县|企业备案统计
	@Test
	public void findCompanies() {
		CompanyInfo com = initCompanyData();
		// System.out.println(com.getRegion().getCode() + com.getStatus()
		// + com.getUpdateDate());
		Object[] criteria = new Object[3];
		CompanyInfo condition = new CompanyInfo();

		condition.setStatus("1");
		// condition.setRegion(regionManagementService.get(20l));

		criteria[0] = condition;
		criteria[1] = null;// new Date();
		criteria[2] = null;// new Date();

		List<CompanyInfo> infos = companyInfoService.findCompanies(criteria);
		assertEquals(1, infos.size());
	}

	// //
	// 通过限制条件查找技术人员信息->省市县|企业备案统计
	@Test
	public void findTechnicianInfos() {
		initCompanyData();
		Object[] arr = new Object[3];
		TechnicianInfo technician = new TechnicianInfo();
		Date beginDate = null;
		Date endDate = null;

		// technician.setCompanyInfo(new CompanyInfo());
		// technician.getCompanyInfo().setStatus("1");
		// technician.getCompanyInfo().setRegion(regionManagementService.get(20l));

		arr[0] = technician;
		// arr[1] = beginDate;
		// arr[2] = endDate;

		List<TechnicianInfo> infos = technicianInfoService
				.findTechnicianInfos(arr);

		assertEquals(1, infos.size());
	}

	// 通过限制条件查找执法人员信息->省，市，县|执法人员备案
	@Test
	public void findEnforceOfficers() {
		initEnforceOfficerData();
		Object[] obj = new Object[3];

		EnforceOfficer condition = new EnforceOfficer();

		condition.setName("ser");
		condition.setRegion(regionManagementService.get(50l));

		obj[0] = condition;
		obj[1] = new Date();
		obj[2] = null;// new Date();

		// Page<EnforceOfficer> officers = enforceOfficerService
		// .findEnforceOfficers(CompanyUtils.setupPage(), obj);
		//
		// assertEquals(1, officers.getResult().size());

	}

	private CompanyInfo initCompanyData() {
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

		// 质量体系
		QualityInfo qualityInfo = new QualityInfo();

		qualityInfo.setDeadLine(new java.util.Date());
		qualityInfo.setEstablished("stablished");
		qualityInfo.setEstDate(new java.util.Date());
		qualityInfo.setEstOrg("estOrg");
		qualityInfo.setCompanyInfo(company);

		// 保存质量体系信息
		qualityInfoService.save(qualityInfo);

		// 技术人员
		TechnicianInfo technicianInfo = new TechnicianInfo();

		technicianInfo.setApprovalDept("approvalDept");
		technicianInfo.setCertNo(getRandom());
		technicianInfo.setEducation("education");
		technicianInfo.setName("name");
		// technicianInfo.setCompanyInfo(company);

		// 保存技术人员信息
		technicianInfoService.save(technicianInfo);

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

		// 提交公司申请
		approval4RegisterService.submitCompanyInfo(company.getId());

		return company;
	}

	private EnforceOfficer initEnforceOfficerData() {

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

		EnforceOfficer off = new EnforceOfficer();

		// off.setFile(null);
		off.setCreateDate(new Date());
		off.setDuty(getRandom());
		off.setIssueAuth(getRandom());
		off.setIssueNo(getRandom());
		off.setMobile(getRandom());
		off.setName("ser");

		Region region = regionManagementService.get(50l);

		off.setRegion(region);
		off.setEnforceOrg(org);

		enforceOfficerService.save(off);

		return off;
	}

}
