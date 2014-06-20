package com.cce.weaponry.web.credit;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.springframework.beans.factory.annotation.Autowired;

import com.cce.modules.orm.IdEntity;
import com.cce.modules.orm.Page;
import com.cce.modules.security.springsecurity.SpringSecurityUtils;
import com.cce.modules.service.CrudServiceInterface;
import com.cce.modules.web.json.JsonStore;
import com.cce.modules.web.struts2.Struts2Utils;
import com.cce.weaponry.entity.credit.EvaluationExpert;
import com.cce.weaponry.entity.credit.EvaluationTeam;
import com.cce.weaponry.service.credit.EvaluationExpertService;
import com.cce.weaponry.service.credit.EvaluationTeamService;
import com.cce.weaponry.web.JsonCrudActionSupport;
import com.cce.weaponry.web.util.WebFilterUtil;
import com.cce.weaponry.web.vo.level.ProfessorInfoVO;
import com.cce.weaponry.web.vo.level.ProfessorTeamVO;

import flexjson.JSONDeserializer;
import flexjson.JSONSerializer;

@Namespace("/info")
@Action("evalTeam")
public class EvaluationTeamAction extends JsonCrudActionSupport<EvaluationTeam> {

	@Autowired
	private EvaluationTeamService evaluationTeamService;
	@Autowired
	protected EvaluationExpertService evaluationExpertService;
	private static List<Long> allId;
	private static List<Long> noId;
	private static List<Long> yesId;
	private static Long teamID;
	@Override
	public CrudServiceInterface<EvaluationTeam> getCrudService() {
		return evaluationTeamService;
	}

	@Override
	public void delete()throws Exception {
		if (getIdArrayParam().size() > 0) {
			evaluationExpertService.updateIsNull(getIdArrayParam());
			evaluationTeamService.delete(getIdArrayParam());
			this.renderMessage(true, "删除组成功");
		}
	}

	/**
	 * 新增组或修改组、添加组成员
	 */
	@Override
	public void save() throws Exception {
		try {
			boolean bl = false;
			ProfessorTeamVO entity = this.getProfessorTeamVO();
			EvaluationTeam et;
			if (null == entity.getId() || "".equals(entity.getId())) {
				et = new EvaluationTeam();
				et.setCreateDate(new Date());
				et.setCreateBy(SpringSecurityUtils.getCurrentUserName());
				bl = false;
			} else {
				bl = true;
				et = evaluationTeamService.get(entity.getId());
			}
			if (null == entity.getName()) {
				this.renderMessage(false, "用户组名称不可以为空  ");
				return;
			}
			EvaluationTeam name = evaluationTeamService.getByName(entity
					.getName());
			if (!bl && null != name) {
				logger.debug("用户组名称不可以重复");
				entity.setName(null);
				this.renderMessage(false, "用户组名称不可以重复 ");
				return;
			}
			yesId = new ArrayList<Long>();
			if (null != entity.getMembers()) {
			if (entity.getMembers().length() > 0) {
				if (entity.getMembers().indexOf(",") > 0) {
					String[] str = entity.getMembers().split(",");
					for (String string : str) {
						yesId.add(Long.parseLong(string));
					}
				} else {
					Long ids = Long.parseLong(entity.getMembers());
					yesId.add(ids);
				}
				}
			}
			// et.setCount(Long.parseLong(String.valueOf(yesId.size())));
			et.setName(entity.getName());
			et.setProfessorList(null);
			et.setEnforceOrg(null);
			noId = new ArrayList<Long>();
			if (bl) {
			for (Long num : allId) {
					EvaluationExpert ev = evaluationExpertService.get(num);
					if (null != ev.getTeam() && !yesId.contains(num)) {
						if (ev.getTeam().getId().longValue() == teamID
								.longValue()) {
						noId.add(num);
						}
					}
			}
			}
			evaluationTeamService.save(et);
			evaluationExpertService.updateIsTeam(yesId, et.getId());
			evaluationExpertService.updateNotTeam(noId);
			entity.setId(et.getId());
			entity.setCreateDate(et.getCreateDate());
			entity.setCount(Long.parseLong(String.valueOf(yesId.size())));
			if (entity != null) {
				// getCrudService().save(entity);
				this.render(getJsonSerializer().serialize(new JsonStore(entity)));
			} else
				throw new RuntimeException("参数错误,指定的数据不存在!");
		} catch (Exception e) {
			this.renderMessage(false, e.getMessage());
			logger.error(e.getMessage(), e);
		}
	}

	@SuppressWarnings("unchecked")
	public ProfessorTeamVO getProfessorTeamVO() {
		String data = Struts2Utils.getParameter(JsonStore.RootProperty);
		if (data == null)
			return null;
		JSONDeserializer deserializer = this.getJsonDeserializer();
		JSONDeserializer<IdEntity> jsonDeserializer = deserializer.use(null, ProfessorTeamVO.class);
		return (ProfessorTeamVO) jsonDeserializer.deserialize(data);
	}

	/**
	 * 列表显示地区的评估组
	 */
	@Override
	public void list() throws Exception {

		List<ProfessorTeamVO> list = new ArrayList<ProfessorTeamVO>();
		WebFilterUtil filter = new WebFilterUtil();
		logger.debug("过滤值 " + filter.getFilterValue());
		Page<EvaluationTeam> page = evaluationTeamService.getall(this
				.setupPage());
		ProfessorTeamVO vo;
		List<EvaluationTeam> etlist = page.getResult();
		for (EvaluationTeam et : etlist) {
			vo = new ProfessorTeamVO();
			vo.setCreateDate(et.getCreateDate());
			vo.setCreateBy(et.getCreateBy());
			vo.setId(et.getId());
			vo.setName(et.getName());
			vo.setCount(Long.parseLong(String.valueOf(et.getProfessorList()
					.size())));
			vo.setRegionName("regionName1");
			list.add(vo);
		}
		render(getJsonSerializer().serialize(new JsonStore(list)));
	}

	/**
	 * 根据组ID查找评估专家
	 * 
	 * @throws Exception
	 */
	public void findExpertByTeamId() throws Exception {
		if (null == getIdParam()) {
			this.renderMessage(false, "评价组不存在;请刷新查看");
			return;
		}
		System.out.println(getIdParam());
		List<ProfessorInfoVO> list = new ArrayList<ProfessorInfoVO>();
		EvaluationTeam et = evaluationTeamService.get(getIdParam());
		List<EvaluationExpert> expert = et.getProfessorList();
		ProfessorInfoVO vo;
		for (EvaluationExpert ept : expert) {
			vo = new ProfessorInfoVO();
			vo.setAddress(ept.getAddress());
			vo.setCertificate(ept.getCertificate());
			vo.setCreateDate(ept.getCreateDate());
			vo.setDuty(ept.getDuty());
			vo.setId(ept.getId());
			vo.setMail(ept.getMail());
			vo.setMobile(ept.getMobile());
			vo.setName(ept.getName());
			vo.setRegionName("regionName1");
			vo.setResumeInfo("resumeInfo1");
			vo.setZipcode(ept.getZipcode());
			list.add(vo);
		}

		render(getJsonSerializer().serialize(new JsonStore(list)));
	}

	/**
	 * 返回前台组成员、可分配的评价专家
	 */
	public void getMemberChoice() {
		JSONSerializer serializer = new JSONSerializer().include("id").include("value").exclude("*");
		Map<String, Object> data = new HashMap<String, Object>();
		List listAvailables = new ArrayList();// 非组成员
		List listAvailable;
		List<EvaluationExpert> ent = new ArrayList<EvaluationExpert>();
		if (null == getIdParam()) {
			ent = evaluationExpertService.allNotTeam();
		} else {
			teamID = getIdParam();
			ent = evaluationExpertService.notTeam(getIdParam());
		}

		allId = new ArrayList<Long>();
		for (int i = 0; i < ent.size(); i++) {
			allId.add(ent.get(i).getId());
			listAvailable = new ArrayList();
			listAvailable.add(ent.get(i).getId());
			listAvailable.add(ent.get(i).getName());
			listAvailables.add(listAvailable);
		}

		List listObtaineds = new ArrayList();// 组成员
		List listObtained;
		if (null == getIdParam()) {
			listObtained = new ArrayList();
		} else {

			List<EvaluationExpert> eyt = evaluationExpertService
					.isTeam(getIdParam());
			for (int i = 0; i < eyt.size(); i++) {
				allId.add(eyt.get(i).getId());
				listObtained = new ArrayList();
				listObtained.add(eyt.get(i).getId());
				listObtained.add(eyt.get(i).getName());
				listObtaineds.add(listObtained);
			}
		}
		logger.debug(allId + "所有 ID");
		data.put("available", listAvailables);
		data.put("obtained", listObtaineds);
		this.render(serializer.serialize(data));
	}

}
