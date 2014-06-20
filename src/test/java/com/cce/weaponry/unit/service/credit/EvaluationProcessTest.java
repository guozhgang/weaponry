package com.cce.weaponry.unit.service.credit;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.cce.modules.orm.PropertyFilter;
import com.cce.modules.test.spring.SpringTxTestCase;
import com.cce.weaponry.entity.credit.EvaluationExpert;
import com.cce.weaponry.entity.credit.EvaluationMember;
import com.cce.weaponry.entity.credit.EvaluationTeam;
import com.cce.weaponry.entity.register.FileBean;
import com.cce.weaponry.entity.register.Region;
import com.cce.weaponry.service.common.RegionManagementService;
import com.cce.weaponry.service.credit.EvaluationExpertService;
import com.cce.weaponry.service.credit.EvaluationMemberService;
import com.cce.weaponry.service.credit.EvaluationTeamService;
import com.cce.weaponry.service.register.FileBeanService;

public class EvaluationProcessTest extends SpringTxTestCase {

	@Autowired
	private RegionManagementService regionManagementService;

	@Autowired
	private EvaluationExpertService evaluationExpertService;

	@Autowired
	private EvaluationMemberService evaluationMemberService;

	@Autowired
	private FileBeanService fileBeanService;

	@Autowired
	private EvaluationTeamService evaluationTeamService;

	private void initEvaluationExpert() {
		for (int i = 0; i < 5; i++) {
			EvaluationExpert expert = new EvaluationExpert();

			expert.setName("expertName" + i);
			expert.setDuty("expertDuty");
			expert.setMail("expertMail");
			expert.setMobile("expertMobile");
			expert.setAddress("expertAddress");
			expert.setZipcode("expertZipcode");
			expert.setCertificate("expertCertificate");
			expert.setCreateDate(new Date());
			expert.setType("专家");
			expert.setResumeUrl("c:\\person.doc");

			Region region = regionManagementService.get(20l);

			expert.setRegion(region);

			FileBean fileInfo = new FileBean();

			fileInfo.setCreateBy(expert.getName());
			fileInfo.setCreateDate(new Date());
			fileInfo.setFileType("相片");
			fileInfo.setFileURI("c:\\person" + i + ".jpg");
			// fileInfo.setRefID(expert.getId().toString());

			fileBeanService.save(fileInfo);

			expert.setFileInfo(fileInfo);

			evaluationExpertService.save(expert);
		}
	}

	private void printExpertInfo(List<EvaluationExpert> experts) {
		for (EvaluationExpert e : experts) {
			System.out.println(e.getId() + "    " + e.getName() + "    "
					+ e.getDuty() + "   "
					+ e.getCreateDate());
		}
	}

	@Test
	public void testProcessEvaluationExpert() {
		// 初始化数据
		initEvaluationExpert();
		System.out.println("初始化评审专家完毕");

		List<EvaluationExpert> experts = evaluationExpertService
				.list(new ArrayList<PropertyFilter>());

		printExpertInfo(experts);

		EvaluationExpert expert = experts.get(0);

		expert.setDuty("anotherDuty");

		System.out.println("测试修改方法");
		evaluationExpertService.save(expert);

		experts = evaluationExpertService.list(new ArrayList<PropertyFilter>());

		printExpertInfo(experts);

		System.out.println("测试删除方法" + expert.getId());
		evaluationExpertService.delete(expert.getId());

		experts = evaluationExpertService.list(new ArrayList<PropertyFilter>());

		printExpertInfo(experts);


		// 通过名称模糊查询评审专家
		System.out.println("通过名称模糊查询评审专家");
		experts = evaluationExpertService.findEvaluationExpertsByName("3");


		printExpertInfo(experts);

		// 随机查找评审小组
		System.out.println("随机查找评审小组");
		experts = evaluationExpertService.findRandomEvaluationExperts(3);

		// 增加到平价小组中
		System.out.println("增加到平价小组中");
		EvaluationTeam team = new EvaluationTeam();

		team.setCreateBy("createBy");
		team.setCreateDate(new Date());
		team.setName("name");
		team.setProfessorList(experts);

		evaluationTeamService.save(team);

		team = evaluationTeamService.get(team.getId());

		// 检测是否添加进去
		printExpertInfo(team.getProfessorList());
		System.out.println("-------------=========----------");
	}

	private void initEvaluationMember() {
		for (int i = 0; i < 5; i++) {
			EvaluationMember member = new EvaluationMember();

			member.setName("memberName" + i);
			member.setDuty("memberDuty");
			member.setMail("memberMail");
			member.setMobile("memberMobile");
			member.setAddress("memberAddress");
			member.setZipcode("memberZipcode");
			member.setCertificate("memberCertificate");
			member.setCreateDate(new Date());
			member.setType("成员");
			member.setResumeUrl("c:\\person.doc");

			Region region = regionManagementService.get(20l);

			member.setRegion(region);

			FileBean fileInfo = new FileBean();

			fileInfo.setCreateBy(member.getName());
			fileInfo.setCreateDate(new Date());
			fileInfo.setFileType("相片");
			fileInfo.setFileURI("c:\\person.jpg");
			// fileInfo.setRefID(member.getId().toString());

			fileBeanService.save(fileInfo);

			member.setFileInfo(fileInfo);

			evaluationMemberService.save(member);
		}
	}

	private void printMemberInfo(List<EvaluationMember> members) {
		for (EvaluationMember e : members) {
			System.out.println(e.getId() + "  " + e.getName() + "    "
					+ e.getDuty() + "   "
					+ e.getCreateDate());
		}
	}

	@Test
	public void testProcessEvaluationMemeber() {
		// 初始化数据
		initEvaluationMember();
		System.out.println("初始化评审委员完毕");

		List<EvaluationMember> members = evaluationMemberService
				.list(new ArrayList<PropertyFilter>());

		printMemberInfo(members);

		// 测试更改方法
		System.out.println("测试更改方法");
		EvaluationMember member = members.get(0);

		member.setDuty("anotherDuty");

		evaluationMemberService.save(member);

		members = evaluationMemberService.list(new ArrayList<PropertyFilter>());

		printMemberInfo(members);

		// 测试删除方法
		System.out.println("测试删除方法");
		evaluationMemberService.delete(member.getId());

		members = evaluationMemberService.list(new ArrayList<PropertyFilter>());

		printMemberInfo(members);

		// 通过名称模糊查询评审委员
		System.out.println("通过名称模糊查询评审委员");
		members = evaluationMemberService.findEvaluationMembersByName("3");

		printMemberInfo(members);
	}

}
