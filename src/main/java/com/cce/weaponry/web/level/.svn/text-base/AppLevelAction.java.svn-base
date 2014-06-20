package com.cce.weaponry.web.level;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Vector;
import java.util.Map.Entry;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.springframework.beans.factory.annotation.Autowired;

import com.cce.modules.orm.IdEntity;
import com.cce.modules.orm.Page;
import com.cce.modules.security.springsecurity.SpringSecurityUtils;
import com.cce.modules.service.CrudServiceInterface;
import com.cce.modules.web.json.JsonStore;
import com.cce.modules.web.struts2.Struts2Utils;
import com.cce.weaponry.entity.dict.DictApprovalStatus;
import com.cce.weaponry.entity.dict.DictCheckStep;
import com.cce.weaponry.entity.dict.DictCompanyLevel;
import com.cce.weaponry.entity.level.Approval4Level;
import com.cce.weaponry.entity.level.ApproveLevelDetail;
import com.cce.weaponry.entity.level.CheckSteps;
import com.cce.weaponry.entity.level.CheckTeam;
import com.cce.weaponry.entity.level.CompanyLevel;
import com.cce.weaponry.entity.register.CompanyInfo;
import com.cce.weaponry.entity.security.User;
import com.cce.weaponry.service.CommonEntityService;
import com.cce.weaponry.service.common.CompanyUtils;
import com.cce.weaponry.service.common.RegionManagementService;
import com.cce.weaponry.service.level.Approval4LevelService;
import com.cce.weaponry.service.level.ApproveLevelDetailService;
import com.cce.weaponry.service.level.CheckStepsService;
import com.cce.weaponry.service.level.CheckTeamService;
import com.cce.weaponry.service.level.CompanyLevelItemTemplateService;
import com.cce.weaponry.service.level.CompanyLevelService;
import com.cce.weaponry.service.level.CompanyLevelTemplateService;
import com.cce.weaponry.service.register.CompanyInfoService;
import com.cce.weaponry.service.security.UserCrudService;
import com.cce.weaponry.web.JsonCrudActionSupport;
import com.cce.weaponry.web.util.WebDataUtil;
import com.cce.weaponry.web.util.WebFilterUtil;
import com.cce.weaponry.web.vo.ApprovalDetailsVO;
import com.cce.weaponry.web.vo.innocuous.InnoStatV0;
import com.cce.weaponry.web.vo.level.CheckStepsVO;
import com.cce.weaponry.web.vo.level.CompanyLevelSearchVO;
import com.cce.weaponry.web.vo.level.CompanyLevelVO;
import com.cce.weaponry.web.vo.level.StepsInfoVO;

import flexjson.JSONDeserializer;
import flexjson.JSONSerializer;

@Namespace("/companylevel")
@Action("approvallevel")
public class AppLevelAction extends JsonCrudActionSupport<Approval4Level> {
	@Autowired
	private CommonEntityService entityService;

	@Autowired
	protected Approval4LevelService approval4LevelService;
	@Autowired
	protected CompanyLevelService companyLevelService;
	@Autowired
	protected CompanyLevelTemplateService temserTemplate;
	@Autowired
	protected CompanyLevelItemTemplateService templateService;
	@Autowired
	protected ApproveLevelDetailService detailService;
	@Autowired
	protected UserCrudService userCrudService;
	@Autowired
	protected CompanyInfoService companyInfoService;
	@Autowired
	protected RegionManagementService regionManagementService;
	@Autowired
	protected CheckTeamService checkTeamService;
	@Autowired
	protected CheckStepsService checkStepsService;
	@Autowired
	protected CommonEntityService commonEntityService;
	@Override
	public CrudServiceInterface<Approval4Level> getCrudService() {
		return null;
	}

	/**
	 * 省级用户查看待审批分级申请信息
	 */
	@SuppressWarnings("unchecked")
	public void findWaitingStatusApprovalInfo() {
		WebFilterUtil filter = new WebFilterUtil();
		Page levelvos = approval4LevelService
				.getWaitAppCompanyLevel(
				CompanyUtils.setupPage(), filter.getFilterValue());
		List<Approval4Level> vos=levelvos.getResult();
		CompanyLevelVO vo;
		List<CompanyLevelVO> result = new ArrayList<CompanyLevelVO>();
		for (Approval4Level v : vos) {
			vo = new CompanyLevelVO();
			vo.setId(v.getId());
			DictCompanyLevel level = (DictCompanyLevel) commonEntityService
					.get(DictCompanyLevel.class, Long.parseLong(v
							.getCompanyLevel()
							.getLevelTemplate().getLevelNo()));
			vo.setEntLevel(level.getValue());
			vo.setEntName(v.getCompanyLevel().getCompany().getName());
			if (null != v.getCompanyLevel().getFile()) {
				vo.setFileId(v.getCompanyLevel().getFile().getId());
			}
			DictApprovalStatus stat = (DictApprovalStatus) commonEntityService
					.getDictEntityByCode(
					DictApprovalStatus.class, v.getCompanyLevel().getStatus());
			vo.setStatus(stat.getValue());
			vo.setCreateDate(v.getCreateDate());
			vo.setUpdateDate(v.getUpdateDate());
			if (null != v.getCompanyLevel().getCompany()
					.getLastAppCompanyInfo()
					&& !"".equals(v.getCompanyLevel().getCompany()
							.getLastAppCompanyInfo())) {
				vo.setEntNo(v.getCompanyLevel().getCompany()
						.getLastAppCompanyInfo().getTaxCert());
			}
			result.add(vo);
		}
		levelvos.setResult(result);
		logger.debug("省级用户查看待审批分级信息: ", result);
		render(getJsonSerializer().serialize(new JsonStore(levelvos)));
	}
	@SuppressWarnings("unchecked")
	public List<CompanyLevelVO> getRequestMap() {
		String data = Struts2Utils.getParameter(JsonStore.RootProperty);
		List list = WebDataUtil.splitJsonArray(data);
		List<CompanyLevelVO> levelList = new ArrayList<CompanyLevelVO>();
		JSONDeserializer deserializer = this.getJsonDeserializer();
		JSONDeserializer<IdEntity> jsonDeserializer = deserializer.use(null, CompanyLevelVO.class);
		for (Iterator iterator = list.iterator(); iterator.hasNext();) {
			String levelStr = (String) iterator.next();
			levelList.add((CompanyLevelVO) jsonDeserializer.deserialize(levelStr));
		}
		return levelList;
	}

	@SuppressWarnings("unchecked")
	public CompanyLevelSearchVO getSearchVO() {
		String data = Struts2Utils.getParameter(JsonStore.RootProperty);
		System.out.println(data);
		if (data == null)
			return null;
		JSONDeserializer deserializer = this.getJsonDeserializer();
		JSONDeserializer<IdEntity> jsonDeserializer = deserializer.use(null, CompanyLevelSearchVO.class);
		return (CompanyLevelSearchVO) jsonDeserializer.deserialize(data);
	}

	/**
	 * 各级用户根据查询条件查询企业分级申请信息
	 */
	@SuppressWarnings("unchecked")
	public void findApprovalByCriterial() {
		CompanyLevelSearchVO condition = getSearchVO();
		logger.debug("查看企业分级申请信息条件" + condition);
		if (condition == null) {
			condition=new CompanyLevelSearchVO();
		}
		if (null != condition.getStatus()) {
			DictApprovalStatus stat = (DictApprovalStatus) commonEntityService
					.get(
					DictApprovalStatus.class, Long.parseLong(condition
							.getStatus().toString()));
			condition.setLevelState(stat.getCode());
		}
		Long id = userCrudService.getLoginUser().getRegion().getId();
		List<Long> ids = regionManagementService.getById(id);
		List<Long> idlist = new ArrayList<Long>();
		if (null != condition.getRegionId()
				&& !"".equals(condition.getRegionId())) {
			List<Long> region = regionManagementService.getById(Long
					.parseLong(condition.getRegionId()));
			idlist = region;
		} else {
			idlist = ids;
		}
		Page list = companyLevelService
				.findCompLevelApprovals(
				CompanyUtils.setupPage(), condition, idlist);
		List<CompanyLevel> vos = list.getResult();
		List<CompanyLevelVO> result = new ArrayList<CompanyLevelVO>();
		CompanyLevelVO vo;
		for (CompanyLevel v : vos) {
			vo = new CompanyLevelVO();
			vo.setId(v.getId());
			DictCompanyLevel cictlevel = (DictCompanyLevel) commonEntityService
					.get(DictCompanyLevel.class, Long.parseLong(v
							.getLevelTemplate()
							.getLevelNo()));
			vo.setEntLevel(cictlevel.getValue());
			vo.setEntName(v.getCompany().getName());
			vo.setCreateDate(v.getCreateDate());
			vo.setUpdateDate(v.getUpdateDate());
			DictApprovalStatus state = (DictApprovalStatus) commonEntityService
					.getDictEntityByCode(DictApprovalStatus.class, v
							.getStatus());

			vo.setStatus(state.getValue());
			if (null != v.getFile()) {
				vo.setFileId(v.getFile().getId());
			}
			if (null != v.getCompany()
					.getLastAppCompanyInfo()) {
				vo
						.setEntNo(v.getCompany()
						.getLastAppCompanyInfo()
								.getTaxCert());
			}

			result.add(vo);
		}
		list.setResult(result);
		if (logger.isDebugEnabled()) {
			logger.debug("企业分级申请信息" + result);
		}
		render(getJsonSerializer().serialize(new JsonStore(list)));
	}

	/**
	 * 根据申请id查看评审配置
	 * 
	 */
	public void getProcessByLevelId() {
		if (logger.isDebugEnabled()) {
			logger.debug("根据申请ID查看分级审批配置信息" + "id" + getIdParam());
		}
		if (getIdParam() != null) {
			StepsInfoVO vo = new StepsInfoVO();
			List<StepsInfoVO> list = new ArrayList<StepsInfoVO>();
		Approval4Level al = approval4LevelService.getStep(getIdParam());
			if (al != null && al.getCheckSteps() != null) {
				List<CheckSteps> steps = al.getCheckSteps();
				for (int i = 0; i < al.getCheckSteps().size(); i++) {
					StepsInfoVO sv = new StepsInfoVO();
					sv.setId(al.getCheckSteps().get(i).getId());
					sv.setTeamName(al.getTeam().getName());
					sv.setStepName(al.getCheckSteps().get(i).getStep()
							.getValue());
					if (al.getCheckSteps().get(i).isChecked()) {
						DictApprovalStatus state = (DictApprovalStatus) commonEntityService
								.getDictEntityByCode(DictApprovalStatus.class,
										"PASSED");
						sv.setStep(state.getValue());
					} else if (al.getCompanyLevel().getStatus().equals(
							"REJECTED")) {
						DictApprovalStatus state = (DictApprovalStatus) commonEntityService
								.getDictEntityByCode(DictApprovalStatus.class,
										"REJECTED");
						sv.setStep(state.getValue());
					} else {
						DictApprovalStatus state = (DictApprovalStatus) commonEntityService
								.getDictEntityByCode(DictApprovalStatus.class,
										"WAITING");
						sv.setStep(state.getValue());
					}
					list.add(sv);

				}
			}
			render(getJsonSerializer().serialize(new JsonStore(list)));
		}

	}

	/**
	 * 根据申请ID号，查找审批历史
	 */
	public void getDetailsByApprovalId() {
		if (logger.isDebugEnabled()) {
			logger.debug("根据申请ID查看分级审批历史" + "id" + getIdParam());
		}
		List<ApprovalDetailsVO> vos = new ArrayList<ApprovalDetailsVO>();
		if (null != getIdParam()) {
			List<ApproveLevelDetail> list = approval4LevelService
				.getApprovelLevelDetail(getIdParam());
		ApprovalDetailsVO vo;
		for (int i = 0; i < list.size(); i++) {
			vo = new ApprovalDetailsVO();
			vo.setComment(list.get(i).getComment());
			vo.setCreateBy(list.get(i).getCreateBy());
			String username = list.get(i).getCreateBy();
			User user = userCrudService.findUserByLoginName(username);
			String role = user.getRole().getName();
			vo.setCreateDate(list.get(i).getCreateDate());
			vo.setId(list.get(i).getId());
			vo.setOperate(list.get(i).getType());
			vo.setRole(role);
			vos.add(vo);
		}
		render(getJsonSerializer().serialize(new JsonStore(vos)));
		} else {
			render(getJsonSerializer().serialize(new JsonStore(vos)));
		}
	}

	/**
	 * 根据 审批ID号，查找审批历史
	 */
	public void getDetailsBylevelId() {
		if (logger.isDebugEnabled()) {
			logger.debug("根据审批ID查看分级审批历史" + "id" + getIdParam());
		}
		List<ApprovalDetailsVO> vos = new ArrayList<ApprovalDetailsVO>();
		ApprovalDetailsVO vo;
		if (null != getIdParam()) {
			Long id = approval4LevelService.get(getIdParam()).getCompanyLevel()
					.getId();
			List<ApproveLevelDetail> list = approval4LevelService
					.getApprovelLevelDetail(id);
		for (int i = 0; i < list.size(); i++) {
			vo = new ApprovalDetailsVO();
			vo.setId(list.get(i).getId());
			vo.setComment(list.get(i).getComment());
			vo.setCreateBy(list.get(i).getCreateBy());
			String username = list.get(i).getCreateBy();
			User user = userCrudService.findUserByLoginName(username);
			String role = user.getRole().getName();
			vo.setCreateDate(list.get(i).getCreateDate());
			vo.setOperate(list.get(i).getType());
			vo.setRole(role);
			vos.add(vo);
		}
		render(getJsonSerializer().serialize(new JsonStore(vos)));
		} else {
				render(getJsonSerializer().serialize(new JsonStore(vos)));
		}
	}// 审批 退回返回原因描述
	protected String getCauseParam() {
		String cause = Struts2Utils.getParameter("cause");
		if (logger.isDebugEnabled()) {
			logger.debug("分级退回原因" + cause);
		}
		return cause;
	}

	// 统计
	@SuppressWarnings("unchecked")
	public void statistics() {
		CompanyLevelSearchVO condition = getSearchVO();
		if (null == condition) {
			condition = new CompanyLevelSearchVO();
		}
		Long id = userCrudService.getLoginUser().getRegion().getId();
		List<Long> ids = regionManagementService.getById(id);
		if (null != condition.getRegionId()
				&& !"".equals(condition.getRegionId())) {
			List<Long> region = regionManagementService.getById(Long
					.parseLong(condition.getRegionId()));
			ids = region;
		}
		Map<String, Long> map = companyLevelService.getCompanyLevelStat(
				condition, ids);

		Iterator iterator = map.entrySet().iterator();
		InnoStatV0 vo;
		List<InnoStatV0> list = new ArrayList<InnoStatV0>();
		Page page = new Page();
		for (int i = 0; i < map.size(); i++) {
			vo = new InnoStatV0();
			Map.Entry entry = (Entry) iterator.next();
			vo.setCity((String) entry.getKey());
			// vo.setCount((Long) entry.getValue());
			list.add(vo);
		}
		page.setResult(list);
		if (logger.isDebugEnabled()) {
			logger.debug("分级统计数据" + page);
		}
		render(getJsonSerializer().serialize(new JsonStore(page)));
	}
	public void getTeamId() {
		// team 组
		Long teamID = approval4LevelService.getTeamID(getIdParam());
		if (logger.isDebugEnabled()) {
			logger.debug("组ID" + teamID);
		}
		render(new JsonStore(teamID));
	}

	// 获取专家分组
	public void getReviewGroupListBox() {
		  List<CheckTeam> team = checkTeamService.getCheckTeam();
		if (logger.isDebugEnabled()) {
			logger.debug("所有专家组名称" + team);
		}
		render(new JsonStore(team));

	}

	/**
	 * 评审步骤中的可选步骤加载
	 */
	@SuppressWarnings("unchecked")
	public void getLevelTemplateName() {
		List<DictCheckStep> allsteps = entityService.getDictEntities(DictCheckStep.class);
		if (logger.isDebugEnabled()) {
			logger.debug("加载步骤" + Struts2Utils.getParameter("data")
					+ getIdParam());
		}
		JSONSerializer serializer = new JSONSerializer().include("id").include("value").exclude("*");
		Map<String, Object> data = new HashMap<String, Object>();
		CompanyLevel cl = companyLevelService.get(getIdParam());
		List steps = checkStepsService.getStepsByAppId(getIdParam());// 获取已选步骤
		List<String> yesid = new ArrayList<String>();
		List listObtained;
		List listObtaineds = new ArrayList();
		Vector<Long> tmp = new Vector();
		for (int i = 0; i < steps.size(); i++) {
			Map map = (Map) steps.get(i);
			listObtained = new ArrayList();
			tmp.add((Long) map.get("stepId"));
			listObtained.add(map.get("stepId"));
			listObtained.add(map.get("stepValue"));
			listObtaineds.add(listObtained);

		}
		List listAvailable;
		List listAvailables = new ArrayList();
		for (Iterator iterator = allsteps.iterator(); iterator.hasNext();) {
			DictCheckStep dict = (DictCheckStep) iterator.next();
			if (tmp.contains(dict.getId())) {
				continue;
			}
			listAvailable = new ArrayList();
			listAvailable.add(dict.getId());
			listAvailable.add(dict.getValue());
			listAvailables.add(listAvailable);
		}
		data.put("available", listAvailables);// 未选步骤
		data.put("obtained", listObtaineds);// 已选步骤
		this.render(serializer.serialize(data));
	}


	// 保存步骤
	public void saveConfigInfo() {
		String data = Struts2Utils.getParameter(JsonStore.RootProperty);
		if (logger.isDebugEnabled()) {
			logger.debug("保存分级配置 步骤 " + data);
		}
		if (data == null)
			return;
		JSONDeserializer deserializer = this.getJsonDeserializer();
		JSONDeserializer<IdEntity> jsonDeserializer = deserializer.use(null,
				CheckStepsVO.class);
		CheckStepsVO vo = (CheckStepsVO) jsonDeserializer.deserialize(data);
		approval4LevelService.saveConfigTeam(vo.getId(), vo.getGroupId());
		Approval4Level al = approval4LevelService.get(vo.getId());
		List<CheckSteps> list=al.getCheckSteps();
		for (CheckSteps c : list) {
			if (true == c.isChecked()) {
				this.renderMessage(false, "审批中的申请不可以修改审批步骤");
				return;
			}
		}
		  checkStepsService.deletesteps(vo.getId());
		  al.setUpdateDate(new Date());
		al.getCompanyLevel().setUpdateDate(new Date());
		  approval4LevelService.save(al);
		  if (null != vo.getSteps()&&!"".equals(vo.getSteps())) {
		 String[] stepste = vo.getSteps().split(",");
		 int[] steps=new int[stepste.length];
		 for (int i = 0; i < stepste.length; i++) {
		 steps[i] = Integer.parseInt(stepste[i]);
		 CheckSteps cs = new CheckSteps();
		 cs.setApproval(al);
		 cs.setPosition(i + 1);
		 cs.setStep((DictCheckStep)
		 entityService.getDictEntityById(DictCheckStep.class,
		 Long.valueOf(stepste[i])));
		 checkStepsService.save(cs);
		 }
		 }
		 
		renderMessage(true, "步骤保存成功");
	}

	// 获取处理步骤
	public void getTreatStep() {
		String data = Struts2Utils.getParameter("data");
		List<CheckSteps> steps = checkStepsService.getStepsByAppId(Long
				.parseLong(data));
		if (logger.isDebugEnabled()) {
			logger.debug("分级审批中获取处理步骤" + steps);
		}
		this.render(new JsonStore(steps));

	}

	// // 保存处理步骤
	public void seveTreatData() {
		String data = Struts2Utils.getParameter(JsonStore.RootProperty);
		if (logger.isDebugEnabled()) {
			logger.debug("保存分级 处理步骤" + data);
		}
		if (data == null)
			return;
		JSONDeserializer deserializer = this.getJsonDeserializer();
		JSONDeserializer<IdEntity> jsonDeserializer = deserializer.use(null,
				CompanyLevelVO.class);
		CompanyLevelVO vo = (CompanyLevelVO) jsonDeserializer.deserialize(data);
		List<CheckStepsVO> vos = vo.getSteplist();
		Approval4Level al = approval4LevelService.get(vo.getId());

		for (int i = 0; i < vos.size(); i++) {
			CheckSteps cs = checkStepsService.get(vos.get(i).getId());
			cs.setChecked(vos.get(i).isStatus());
			checkStepsService.save(cs);
		}
		List<CheckSteps> steps = checkStepsService
				.getStepsIsChecked(vo.getId());
		boolean bl = false;
		boolean result = true;
		for (CheckSteps c : steps) {
			if (true == c.isChecked()) {
				bl = true;
			} else {
				bl = false;
				result = false;
			}
		}

		if (bl && result) {
			al.getCompanyLevel().setStatus("PASSED");
			String level = al.getCompanyLevel().getLevelTemplate().getLevelNo();
			/**
			 * 审批通过后修改企业等级
			 */
			List<CompanyInfo> info = al.getCompanyLevel().getCompany()
					.getCompanyInfo();
			for (int i = 0; i < info.size(); i++) {
				info.get(i).setLevel(level);
				companyInfoService.save(info.get(i));
			}
			al.setUpdateDate(new Date());
			approval4LevelService.save(al);
			ApproveLevelDetail detaiapp = new ApproveLevelDetail();
			detaiapp.setApproval(al);
			detaiapp.setComment("");//
			detaiapp.setCreateBy(SpringSecurityUtils.getCurrentUserName());
			detaiapp.setType("通过");
			detaiapp.setCreateDate(new Date());
			detailService.save(detaiapp);
		} else {
			al.getCompanyLevel().setStatus("PROCESSING");
			al.setUpdateDate(new Date());
			approval4LevelService.save(al);
			ApproveLevelDetail detaiapp = new ApproveLevelDetail();
			detaiapp.setApproval(al);
			detaiapp.setComment("");// 
			detaiapp.setCreateBy(SpringSecurityUtils.getCurrentUserName());
			detaiapp.setType("审批");
			detaiapp.setCreateDate(new Date());
			detailService.save(detaiapp);
		}
		renderMessage(true, "审批完成");
		/**
		 * 接收参数 data 数据如下：
		 * 
		 * {"entName":"12345","id":"48","Steplist":
		 * [{"id":1,"StepName":"处理1","StepStatus"
		 * :true},{"id":2,"StepName":"处理 2"
		 * ,"StepStatus":true},{"id":3,"StepName":"处理3","StepStatus":true},
		 * {"id"
		 * :4,"StepName":"处理4","StepStatus":false},{"id":5,"StepName":"处理 5"
		 * ,"StepStatus":true}]}
		 * 
		 * 字段说明
		 * 
		 * entName 企业名称
		 * 
		 * id 为所要处理任务的id
		 * 
		 * Steplist 处理步骤 id 处理步骤id StepName 处理名称 StepStatus true 通过 false 不通过
		 * 注意:如果Steplist 没有某个步骤，说明也是不通过的 如 ：本来有5个步骤 1,2,3,4,5 结果只传过来 2,3,4说明 1
		 * 5没有通过，注意判断！
		 */
	}

	// 省级 用户 审批 分级 退回
	public void levelBack() {
		String data = Struts2Utils.getParameter("data");
		if (logger.isDebugEnabled()) {
			logger.debug("企业分级退回：" + data + getIdParam());
		}
		String temp = data.substring(1, data.length() - 1);
		Approval4Level al = approval4LevelService.get(Long.parseLong(temp));
		al.getCompanyLevel().setStatus("REJECTED");
		al.setIsActive(false);
		al.setUpdateDate(new Date());
		approval4LevelService.save(al);
		ApproveLevelDetail detaiapp = new ApproveLevelDetail();
		detaiapp.setApproval(al);
		detaiapp.setComment(getCauseParam());
		detaiapp.setCreateBy(SpringSecurityUtils.getCurrentUserName());
		detaiapp.setType("退回");
		detaiapp.setCreateDate(new Date());
		detailService.save(detaiapp);
		renderSuccess();
	}
	}
