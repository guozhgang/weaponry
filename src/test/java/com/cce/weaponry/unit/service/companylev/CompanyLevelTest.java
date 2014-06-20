package com.cce.weaponry.unit.service.companylev;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.cce.modules.test.spring.SpringTxTestCase;
import com.cce.weaponry.entity.level.Approval4Level;
import com.cce.weaponry.entity.level.ApproveLevelDetail;
import com.cce.weaponry.entity.level.CheckExpert;
import com.cce.weaponry.entity.level.CheckMember;
import com.cce.weaponry.entity.level.CompanyLevel;
import com.cce.weaponry.entity.level.CompanyLevelDetail;
import com.cce.weaponry.entity.level.CompanyLevelItemTemplate;
import com.cce.weaponry.entity.register.CompanyInfo;
import com.cce.weaponry.entity.register.EnforceOrg;
import com.cce.weaponry.service.common.CompanyUtils;
import com.cce.weaponry.service.level.Approval4LevelService;
import com.cce.weaponry.service.level.ApproveLevelDetailService;
import com.cce.weaponry.service.level.CheckExpertService;
import com.cce.weaponry.service.level.CheckMemberService;
import com.cce.weaponry.service.level.CheckTeamService;
import com.cce.weaponry.service.level.CompanyLevelDetailService;
import com.cce.weaponry.service.level.CompanyLevelItemTemplateService;
import com.cce.weaponry.service.level.CompanyLevelService;
import com.cce.weaponry.service.level.CompanyLevelTemplateService;
import com.cce.weaponry.service.register.CompanyInfoService;
import com.cce.weaponry.service.register.EnforceOrgService;

public class CompanyLevelTest extends SpringTxTestCase {
	private static final Exception Exception = null;
	@Autowired
	private CompanyLevelService companyLevelService;
	@Autowired
	private CompanyInfoService companyInfoService;
	@Autowired
	private CompanyLevelDetailService companyLevelDetailService;
	@Autowired
	private CheckExpertService checkExpertService;
	@Autowired
	private Approval4LevelService approval4LevelService;
	@Autowired
	private CheckMemberService checkMemberService;
	@Autowired
	private CheckTeamService checkTeamService;
	@Autowired
	private ApproveLevelDetailService approveLevelDetailService;
	@Autowired
	private CompanyLevelItemTemplateService companyLevelItemTemplateService;
	@Autowired
	private CompanyLevelTemplateService companyLevelTemplateService;
	@Autowired
	private EnforceOrgService enforceOrgService;

	/**
	 * 企业申请等级;审批等级测试
	 */
	@Test
	public void levelApproval() {

	CompanyInfo ci = new CompanyInfo();
	CompanyLevel cl = new CompanyLevel();
	Approval4Level al = new Approval4Level();
	CompanyLevelDetail cd = new CompanyLevelDetail();
		List<ApproveLevelDetail> lt = new ArrayList<ApproveLevelDetail>();
	List<CompanyLevelDetail> list = new ArrayList<CompanyLevelDetail>();

		ci.setNameCN("中国运通");
		ci.setSimpleName("中国运通");
	ci.setLevel("1");
	ci.setStatus("1");
		companyInfoService.save(ci);// 保存企业信息
		cd.setDescription("基本资质符合条件");
	cd.setIsContained(false);
	cd.setFile(null);
	list.add(cd);
		// cl.setCompanyInfo(ci);
	cl.setCreateBy("aaa");
	cl.setCreateDate(CompanyUtils.parseDate("2010-10-01"));
	cl.setUpdateDate(CompanyUtils.parseDate("2010-12-30"));
	cl.setDetail(list);
	cl.setRecNo("123");
	cl.setStatus("1");
	ApproveLevelDetail ad = new ApproveLevelDetail();
	ad.setApproval(al);
	ad.setComment("a");
	ad.setCreateBy("aa");
	ad.setCreateDate(new Date());
	ad.setType("a");
		lt.add(ad);
		companyLevelService.save(cl); // 保存申请等级信息
		// companyLevelService.saveDetail(cl.getId(), list);// 通过申请保存详细信息

		System.out.println("=============" + cl.getDetail()
				+ "============================");
		al.setCompanyLevel(cl);
		al.setCreateDate(CompanyUtils.parseDate("2010-10-01"));
		al.setIsActive(true);
		al.setNetcomment("网上审核");
		al.setNetstatus("网上意见");
		al.setScenecomment("现场审核");
		al.setScenestatus("现场意见");
		al.setDetails(lt);
		approval4LevelService.save(al);// 保存审批等级

		// 通过审批保存审批详细信息
		List<ApproveLevelDetail> listdt = approval4LevelService
				.getApprovelLevelDetail(al.getId());
		assertEquals(1, listdt.size());
		companyLevelDetailService.save(cd);// 保存申请资料信息
		approveLevelDetailService.save(ad);// 保存审批详细记录
		List<CompanyLevelDetail> ltd = companyLevelService.findLevelDetail(cl
				.getId());// 查看申请详细资料信息
		assertEquals(1, ltd.size()); 
		assertEquals(ltd.get(0).getDescription(), "基本资质符合条件");// 判断输出是否为1条记录；和当前的输入值是否一致
		Approval4Level app = approval4LevelService.get(al.getId());// 根据申请ID查看审批记录
		assertEquals("网上审核", app.getNetcomment());// 判断结果和输入值是否一致

		CompanyLevelDetail listcd = companyLevelDetailService.get(cd
.getId());// 查看等级申请详细信息
		assertEquals("基本资质符合条件", listcd.getDescription());
		CompanyLevel cll = companyLevelService.get(cl.getId()); // 查看当前审批状态
		assertEquals("1", cll.getStatus());


		Object[] obj = new Object[5];

	obj[0] = cl.getCreateDate();
	obj[1] = cl.getCreateDate();
		obj[2] = "中国运通";
	obj[3] = cl.getStatus();
		obj[4] = "1";

		// Page<CompanyLevel> li = companyLevelService.findCompLevelApprovals(
		// Page < CompanyLevel > page, obj);//
		// // 根据日期、企业名称、企业申请状态、企业等级查询申请等级信息
		// assertEquals(li.get(0).getCreateBy(), cl.getCreateBy());//
		// // // 判断得到的一条记录中的一个值是否和输入的相等
		// assertEquals(li.size(), 1);// 判断得到的值是否为输入的一条记录

		// 审批详细资料
		// Object[] appobj = new Object[5];
		// appobj[0] = al.getCreateDate();
		// appobj[1] = al.getCreateDate();
		// appobj[2] = ci.getNameCN();
		// appobj[3] = cl.getStatus();
		// appobj[4] = ci.getLevel();
		// List<Approval4Level> listapp = approval4LevelService
		// .getAllLevelApproval(appobj);// 根据时间、企业名称、状态、等级查看审批
		// assertEquals(1, listapp.size());

}

	/**
	 * 专家、委员 审查组的业务方法测试
	 */
 @Test
 public void CheckExpertTest() {
 int n = 2;
		// 委员
		EnforceOrg en = new EnforceOrg();
		en.setAddress("asdf");
		enforceOrgService.save(en);
 CheckExpert pi = new CheckExpert();

		pi.setAddress("北京");
		pi.setDuty("主任");
 pi.setCreateDate(new Date());
 pi.setMail("google.mail.com");
 pi.setMobile("16812312312");
 pi.setName("jack");
 pi.setZipcode("032568");
		pi.setType("委员");
		pi.setEnforceOrg(en);
		checkExpertService.save(pi);
		// 添加专家

 CheckMember cm = new CheckMember();
		cm.setAddress("上海");
		cm.setDuty("经理");
 cm.setCreateDate(new Date());
 cm.setMail("baidu.mail.com");
 cm.setMobile("19812312312");
 cm.setName("tom");
 cm.setZipcode("231223");
		cm.setType("专家");
		List<CheckExpert> listch = checkExpertService.getRandomProfessor(1); // 随机抽取N个专家
		assertEquals(1, listch.size());// 判断取出的专家数
		for (Object obj : listch) {
			int num = Collections.frequency(listch, obj);
			if (num > 1) {

				System.out.println("有重复出现");
			}
		
		}// 测试判断是否有重复

		checkMemberService.save(cm);
		CheckMember ck=checkMemberService.get(cm.getId());
		assertEquals("上海", ck.getAddress());
		cm = new CheckMember();
		cm.setAddress("wuhan");
		checkMemberService.save(cm);
		assertEquals(cm.getAddress(), "wuhan");
		// List<CheckExpert> listce = checkExpertService.list("");// 得到所有专家信息
		// assertEquals(1, listce.size());// 判断得到所有的专家信息是否为1条刚输入的记录
		CheckExpert ce = checkExpertService.get(pi.getId());// 通过ID的到专家信息
		assertEquals(ce.getDuty(), "主任");
		// assertNotNull(pi);// 得到的数据不为空 且值与输入的一致
		List<CheckExpert> list = null;// checkExpertService.list(pi.getName());//
		// 得到名字是TOM的专家信息
		// assertEquals(pi.getName(), "jack");// 判断输入的名字是否一致
 pi = new CheckExpert();
 pi.setAddress("beijing");
		checkExpertService.save(pi); // 修改专家委员信息
		assertEquals(pi.getAddress(), "beijing"); // 判断修改的值是否正确

 }

	/**
	 * 等级模板加载
	 */
	@Test
	public void getTemplate() {

		List<CompanyLevelItemTemplate> list = companyLevelItemTemplateService
				.showLevelTemplate(1L);// 根据等级加载模板信息
		assertEquals(31, list.size()); // 判断加载信息

	}

}
