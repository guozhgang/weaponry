package com.cce.weaponry.web.level;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.springframework.beans.factory.annotation.Autowired;

import com.cce.modules.orm.IdEntity;
import com.cce.modules.security.springsecurity.SpringSecurityUtils;
import com.cce.modules.service.CrudServiceInterface;
import com.cce.modules.web.json.JsonStore;
import com.cce.modules.web.struts2.Struts2Utils;
import com.cce.weaponry.entity.dict.DictCompanyLevel;
import com.cce.weaponry.entity.level.Approval4Level;
import com.cce.weaponry.entity.level.ApproveLevelDetail;
import com.cce.weaponry.entity.level.CheckSteps;
import com.cce.weaponry.entity.level.CompanyLevel;
import com.cce.weaponry.entity.level.CompanyLevelDetail;
import com.cce.weaponry.entity.level.CompanyLevelItemTemplate;
import com.cce.weaponry.entity.level.CompanyLevelTemplate;
import com.cce.weaponry.entity.register.Company;
import com.cce.weaponry.entity.register.FileBean;
import com.cce.weaponry.entity.security.User;
import com.cce.weaponry.service.CommonEntityService;
import com.cce.weaponry.service.level.Approval4LevelService;
import com.cce.weaponry.service.level.ApproveLevelDetailService;
import com.cce.weaponry.service.level.CheckStepsService;
import com.cce.weaponry.service.level.CompanyLevelDetailService;
import com.cce.weaponry.service.level.CompanyLevelItemTemplateService;
import com.cce.weaponry.service.level.CompanyLevelService;
import com.cce.weaponry.service.level.CompanyLevelTemplateService;
import com.cce.weaponry.service.register.CompanyInfoService;
import com.cce.weaponry.service.register.CompanyService;
import com.cce.weaponry.service.register.FileBeanService;
import com.cce.weaponry.service.security.UserCrudService;
import com.cce.weaponry.web.JsonCrudActionSupport;
import com.cce.weaponry.web.util.WebDataUtil;
import com.cce.weaponry.web.vo.level.CheckStepVO;
import com.cce.weaponry.web.vo.level.CompanyLevelItemVO;
import com.cce.weaponry.web.vo.level.CompanyLevelVO;

import flexjson.JSONDeserializer;
import flexjson.ObjectBinder;
import flexjson.ObjectFactory;

@Namespace("/companylevel")
@Action("companyLevelProcess")
public class CompanyLevelProcessAction extends JsonCrudActionSupport<CompanyLevelItemVO> {
	@Autowired
	protected CompanyLevelService companyLevelService;
	@Autowired
	protected CompanyLevelTemplateService templateService;
	@Autowired
	protected CompanyLevelItemTemplateService itemplateService;
	@Autowired
	protected UserCrudService userCrudService;
	@Autowired
	protected CompanyInfoService companyInfoService;
	@Autowired
	protected CompanyService companyService;
	@Autowired
	protected CompanyLevelDetailService detailService;
	@Autowired
	protected FileBeanService fileBeanService;
	@Autowired
	protected Approval4LevelService approval4LevelService;
	@Autowired
	protected ApproveLevelDetailService approveLevelDetailService;
	@Autowired
	protected CommonEntityService commonEntityService;
	private static Long templateId;
	private static Long companylevelId;
	private CompanyLevel companyLevel;
	private CompanyLevelDetail detail;

	@Autowired
	protected CheckStepsService checkStepsService;

	@Override
	public CrudServiceInterface<CompanyLevelItemVO> getCrudService() {
		return null;
	}

	@SuppressWarnings("unchecked")
	public ObjectFactory getCompanyLevelItemVOFactory() {
		return new ObjectFactory() {
			public Object instantiate(ObjectBinder context, Object value, Type targetType, Class targetClass) {
				if ((value == null || value.toString().length() < 1) || !targetClass.getClass().isInstance(List.class))
					return null;
				List list = WebDataUtil.splitJsonArray(value.toString());
				List<CompanyLevelItemVO> levelList = new ArrayList<CompanyLevelItemVO>();
				JSONDeserializer<IdEntity> jsonDeserializer = getJsonDeserializer().use(null, CompanyLevelItemVO.class);
				for (Iterator iterator = list.iterator(); iterator.hasNext();) {
					String levelStr = (String) iterator.next();
					levelList.add((CompanyLevelItemVO) jsonDeserializer.deserialize(levelStr));
				}
				return levelList;
			};
		};
	}

	@SuppressWarnings("unchecked")
	public ObjectFactory getCompanyLevelStepFactory() {
		return new ObjectFactory() {
			public Object instantiate(ObjectBinder context, Object value, Type targetType, Class targetClass) {
				if ((value == null || value.toString().length() < 1) || !targetClass.getClass().isInstance(List.class))
					return null;
				List list = WebDataUtil.splitJsonArray(value.toString());
				List<CheckStepVO> levelList = new ArrayList<CheckStepVO>();
				JSONDeserializer<IdEntity> jsonDeserializer = getJsonDeserializer().use(null, CheckStepVO.class);
				for (Iterator iterator = list.iterator(); iterator.hasNext();) {
					String levelStr = (String) iterator.next();
					levelList.add((CheckStepVO) jsonDeserializer.deserialize(levelStr));
				}
				return levelList;
			};
		};
	}

	@SuppressWarnings("unchecked")
	@Override
	public JSONDeserializer getJsonDeserializer() {
		return super.getJsonDeserializer().use(null, CompanyLevelVO.class).use(this.getCompanyLevelItemVOFactory(), "items").use(
				this.getCompanyLevelStepFactory(), "steps");
	}

	@SuppressWarnings("unchecked")
	public CompanyLevelVO getCompanyLevelVO() {
		String data = Struts2Utils.getParameter(JsonStore.RootProperty);
		System.out.println(data);
		if (data == null)
			return null;
		JSONDeserializer deserializer = this.getJsonDeserializer();
		JSONDeserializer<IdEntity> jsonDeserializer = deserializer.use(null,
				CompanyLevelVO.class);
		return (CompanyLevelVO) jsonDeserializer.deserialize(data);
	}

	public void saveAndSubmit() {
		try {
			if (logger.isDebugEnabled()) {
				logger.debug("保存修改分级信息后直接提交分级申请");
			}
			boolean isNew = false;
			String str = "";
			// 通过登陆用户获取公司信息
			User user = userCrudService.getLoginUser();
			if (null == user.getCompany()
					|| null == user.getCompany().getLastAppCompanyInfo()) {
				isNew = false;
				this.renderMessage(isNew, "企业备案未通过不可以申请分级");
				return;
			}
			List<CompanyLevel> comLevel = companyLevelService.getStatus(user
					.getCompany().getId());
			if (comLevel.size() > 0) {
				this.renderMessage(isNew, "请耐心等待提交的申请");
				return;
			}
			CompanyLevelVO vo = getCompanyLevelVO();// 使用这个对象
			List<CompanyLevelItemVO> vos = vo.getItems();// 需要改成CompanyLevelVO对象。=
			if (null == vo || null == vo.getItems()) {
				this.renderMessage(false, "申请等级失败;请认真填写表单");
				return;
			}

			Company company = user.getCompany();
			FileBean file = null;
			if (null != vo.getFileId()) {
				file = fileBeanService.get(vo.getFileId());
			}
			/**
			 * 判断templateId(页面传过来的等级模板 ID)为空;则为修改;
			 */
			if (templateId == null) {
				companyLevel = companyLevelService.get(companylevelId);
				// 保存申请分级
				if ("PASSED".equals(companyLevel.getStatus())
						|| "PROCESSING".equals(companyLevel.getStatus())
						|| "WAITING".equals(companyLevel.getStatus())) {
					this.renderMessage(false, "审批通过或审批中的申请不可以修改");
					return;
				}
				companyLevel.setId(companylevelId);
				companyLevel.setStatus("WAITING");
				companyLevel.setUpdateDate(new Date());
				if (null != vo.getFileId()) {
					companyLevel.setFile(file);
				}
				companyLevelService.save(companyLevel);
				// 保存申请项

				for (int i = 0; i < vos.size(); i++) {
					if (null == vos.get(i).getDetailId()) {
					detail = new CompanyLevelDetail();//
					} else {
						detail = detailService.get(vos.get(i).getDetailId());
					}
					CompanyLevelItemTemplate tempalte = itemplateService
							.get(vos.get(i).getId());
					detail.setDescription(vos.get(i).getRemark());
					detail.setIsContained(vos.get(i).getIsContained());
					detail.setLevelItem(tempalte);
					detail.setCompanyLevel(companyLevel);
					detailService.save(detail);
				}
				Approval4Level al = new Approval4Level();
				al.setCreateDate(new Date());
				al.setIsActive(true);
				al.setCompanyLevel(companyLevel);
				al.setUpdateDate(new Date());
				approval4LevelService.save(al);
				ApproveLevelDetail adi = new ApproveLevelDetail();
				adi.setApproval(al);
				adi.setCreateDate(new Date());
				adi.setCreateBy(SpringSecurityUtils.getCurrentUserName());
				adi.setType("提交");
				approveLevelDetailService.save(adi);
				isNew = true;
				str = "提交成功";
				this.renderMessage(isNew, str);
				return;
			} else {
				if (templateId == 5) {
					this.renderMessage(false, "暂不支持5级申请");
					return;
				}

				Long companyId = user.getCompany().getId();
				String levelnum = companyLevelService.getLevel(companyId);
				if (null != levelnum) {
					if (templateId < Long.parseLong(levelnum)) {
						this.renderMessage(false, "创建级别应比当前的级别要大");
						return;
					}
				}
				CompanyLevel cl = companyLevelService.getLevelByCompanyID(
						companyId, templateId);
				if (null != cl) {
					this.renderMessage(false, "企业已申请过" + templateId
							+ "级;请勿再次申请");
					return;
				}
				companyLevel = new CompanyLevel();
				CompanyLevelTemplate levelTemplate = templateService
						.get(templateId);
				// 保存申请分级
				companyLevel.setCompany(company);
				companyLevel.setCreateBy(SpringSecurityUtils
						.getCurrentUserName());
				companyLevel.setCreateDate(new Date());
				companyLevel.setUpdateDate(new Date());
				companyLevel.setStatus("WAITING");
				companyLevel.setLevelTemplate(levelTemplate);
				if (null != vo.getFileId()) {
					companyLevel.setFile(file);
				}
				companyLevelService.save(companyLevel);
				templateId = null;
				// 保存申请项

				for (int i = 0; i < vos.size(); i++) {
					if (null == vos.get(i).getDetailId()) {
					detail = new CompanyLevelDetail();//
					} else {
						detail = detailService.get(vos.get(i).getDetailId());
					}
					CompanyLevelItemTemplate tempalte = itemplateService
							.get(vos.get(i).getId());
					detail.setDescription(vos.get(i).getRemark());
					detail.setIsContained(vos.get(i).getIsContained());
					detail.setLevelItem(tempalte);
					detail.setCompanyLevel(companyLevel);
					detailService.save(detail);
				}
				Approval4Level al = new Approval4Level();
				al.setCreateDate(new Date());
				al.setIsActive(true);
				al.setCompanyLevel(companyLevel);
				al.setUpdateDate(new Date());
				approval4LevelService.save(al);
				ApproveLevelDetail adi = new ApproveLevelDetail();
				adi.setApproval(al);
				adi.setCreateDate(new Date());
				adi.setCreateBy(SpringSecurityUtils.getCurrentUserName());
				adi.setType("提交");
				approveLevelDetailService.save(adi);
				isNew = true;
				str = "提交成功";
				this.renderMessage(isNew, str);
				return;
			}
		} catch (Exception e) {
			this.renderMessage(false, e.getMessage());
			logger.error(e.getMessage(), e);
		}

	}

	/**
	 * 企业用户 新增 、修改 企业分级 申请信息
	 */
	@Override
	public void save() throws Exception {
		if (logger.isDebugEnabled()) {
			logger.debug("保存申请分级");
		}
			try {

			boolean isNew = false;
			String str = "";
			// 通过登陆用户获取公司信息
			User user = userCrudService.getLoginUser();
			if (null == user.getCompany()
					|| null == user.getCompany().getLastAppCompanyInfo()) {
				isNew = false;
				logger.debug("企业未备案;请先进行企业备案再申请分级");
				this.renderMessage(isNew, "企业备案未通过不可以申请分级");
				return;
			}
			List<CompanyLevel> comLevel = companyLevelService.getStatus(user
					.getCompany().getId());
			if (comLevel.size() > 0) {
				this.renderMessage(isNew, "请耐心等待提交的申请");
				return;
			}
			CompanyLevelVO vo = getCompanyLevelVO();// 使用这个对象
			List<CompanyLevelItemVO> vos = vo.getItems();// 需要改成CompanyLevelVO对象。=
			if (null == vo || null == vo.getItems()) {
				this.renderMessage(false, "申请等级失败;请认真填写表单");
				return;
			}
			
			Company company = user.getCompany();
			FileBean file = null;
			if (null != vo.getFileId()) {
				file = fileBeanService.get(vo.getFileId());
			}
			/**
			 * 判断templateId(页面传过来的等级模板 ID)为空;则为修改;
			 */
				if (templateId == null) {
				companyLevel = companyLevelService.get(companylevelId);
				// 保存申请分级
				if ("PASSED".equals(companyLevel.getStatus())
						|| "PROCESSING".equals(companyLevel.getStatus())
						|| "WAITING".equals(companyLevel.getStatus())) {
					this.renderMessage(false, "审批通过或审批中的申请不可以修改");
					return;
				}
				companyLevel.setId(companylevelId);
				companyLevel.setUpdateDate(new Date());
				if (null != vo.getFileId()) {
					companyLevel.setFile(file);
				}
				companyLevelService.save(companyLevel);
				// 保存申请项

				for (int i = 0; i < vos.size(); i++) {
					if (null == vos.get(i).getDetailId()) {
						detail = new CompanyLevelDetail();//
					} else {
						detail = detailService.get(vos.get(i).getDetailId());
					}
					CompanyLevelItemTemplate tempalte = itemplateService
							.get(vos.get(i).getId());
					detail.setDescription(vos.get(i).getRemark());
					detail.setIsContained(vos.get(i).getIsContained());
					detail.setLevelItem(tempalte);
					detail.setCompanyLevel(companyLevel);
					detailService.save(detail);
				}
				isNew = true;
				str = "分级信息修改成功";
				this.renderMessage(isNew, str);
				return;
			} else {
				if (templateId == 5) {
					this.renderMessage(false, "暂不支持5级申请");
					return;
				}

				Long companyId = user.getCompany().getId();
				String levelnum = companyLevelService.getLevel(companyId);
				if (null != levelnum) {
				if (templateId < Long.parseLong(levelnum)) {
						this.renderMessage(false, "创建级别应比当前的级别要大");
						return;
					}
				}
				CompanyLevel cl = companyLevelService.getLevelByCompanyID(
						companyId, templateId);
				if (null != cl) {
					this.renderMessage(false, "企业已申请过" + templateId
							+ "级;请勿再次申请");
					return;
				}
					companyLevel = new CompanyLevel();
					CompanyLevelTemplate levelTemplate = templateService
							.get(templateId);
				// 保存申请分级
				companyLevel.setCompany(company);
					companyLevel.setCreateBy(SpringSecurityUtils
							.getCurrentUserName());
					companyLevel.setCreateDate(new Date());
					companyLevel.setUpdateDate(new Date());
					companyLevel.setLevelTemplate(levelTemplate);
				companyLevel.setStatus("CREATED");
				if (null != vo.getFileId()) {
					companyLevel.setFile(file);
				}
					companyLevelService.save(companyLevel);
					templateId = null;
				// 保存申请项

				for (int i = 0; i < vos.size(); i++) {
					if (null == vos.get(i).getDetailId()) {
						detail = new CompanyLevelDetail();//
					} else {
						detail = detailService.get(vos.get(i).getDetailId());
					}
					CompanyLevelItemTemplate tempalte = itemplateService
							.get(vos.get(i).getId());
						detail.setDescription(vos.get(i).getRemark());
						detail.setIsContained(vos.get(i).getIsContained());
						detail.setLevelItem(tempalte);
						detail.setCompanyLevel(companyLevel);
						detailService.save(detail);
						}
					isNew = true;
				str = "企业分级申请成功";
				this.renderMessage(isNew, str);
				return;
			}
			} catch (Exception e) {
				this.renderMessage(false, e.getMessage());
				logger.error(e.getMessage(), e);
			}

		}

	/**
	 * 申请分级时 加载等级模板 ----企业 用户新增、修改 分级 申请时加载
	 */
	public void getTemplateInfo() {
		DictCompanyLevel level = (DictCompanyLevel) commonEntityService
				.getDictEntityByCode(
				DictCompanyLevel.class, Struts2Utils
						.getParameter(JsonStore.RootProperty));
		templateId = level.getId();
		List<CompanyLevelItemTemplate> list = new ArrayList<CompanyLevelItemTemplate>();
		list = itemplateService.showLevelTemplate(templateId);
					render(new JsonStore(list));
		if (logger.isDebugEnabled()) {
			logger.debug("分级申请加载模板信息" + list);
		}
	}

	/**
	 * 省级待审批时查看分级申请项
	 */
	public void getLevelItemsByApp() {

		Approval4Level al = approval4LevelService.get(getIdParam());
		CompanyLevel level = companyLevelService.get(al.getCompanyLevel()
				.getId());
		List<CompanyLevelItemTemplate> levelTemplate = itemplateService
				.showLevelTemplate(level.getLevelTemplate().getId()); // Level
		// 申请等级
		List<CompanyLevelItemVO> vos = new ArrayList();
		CompanyLevelItemVO vot;
		List<CompanyLevelDetail> list = detailService.getLevelDetail(level
				.getId()); // getIdParam();
		for (int i = 0; i < levelTemplate.size(); i++) {
			vot = new CompanyLevelItemVO();
			vot.setIsContained(true);
			for (int t = 0; t < list.size(); t++) {
				if (list.get(t).getLevelItem().getId().intValue() == levelTemplate
						.get(i).getId().intValue()) {
					if (list.get(t).getIsContained() != null) {
						vot.setIsContained(list.get(t).getIsContained()
								.booleanValue());
					} else {
						vot.setIsContained(true);
					}
					if (list.get(t).getDescription() != null) {
						vot.setRemark(list.get(t).getDescription());
					} else {
						vot.setDescription("");
					}
				}
			}
			vot.setId(levelTemplate.get(i).getId());
			vot.setItemid(levelTemplate.get(i).getItemid());
			vot.setItemName(levelTemplate.get(i).getItemName());
			vot.setDescription(levelTemplate.get(i).getDescription());

			vos.add(vot);
		}
		if (logger.isDebugEnabled()) {
			logger.debug("省级用户查看企业分级的申请项信息" + vos);
		}
		render(new JsonStore(vos));
	}
	@SuppressWarnings("unchecked")
	public void getLevelItems() {
		templateId = null;// 修改时调用查看审批项;
		companylevelId = getIdParam();
		User user = userCrudService.getLoginUser();
		CompanyLevel level = companyLevelService.get(getIdParam());

		List<CompanyLevelItemTemplate> levelTemplate = itemplateService
				.showLevelTemplate(level.getLevelTemplate().getId()); // Level
		// 申请等级
		List<CompanyLevelItemVO> vos = new ArrayList();
		CompanyLevelItemVO vot;
		List<CompanyLevelDetail> list = detailService.getLevelDetail(level
				.getId()); // getIdParam();
		for (int i = 0; i < levelTemplate.size(); i++) {
			vot = new CompanyLevelItemVO();
			vot.setIsContained(true);
			for (int t = 0; t < list.size(); t++) {
				if (list.get(t).getLevelItem().getId().intValue() == levelTemplate
						.get(i).getId().intValue()) {
					vot.setDetailId(list.get(t).getId());
					if (list.get(t).getIsContained() != null) {
						vot.setIsContained(list.get(t).getIsContained()
								.booleanValue());
					} else {
						vot.setIsContained(true);
					}
					if (list.get(t).getDescription() != null) {
						vot.setRemark(list.get(t).getDescription());
					} else {
						vot.setDescription("");
					}
				}
			}
			vot.setId(levelTemplate.get(i).getId());
			vot.setItemid(levelTemplate.get(i).getItemid());
			vot.setItemName(levelTemplate.get(i).getItemName());
			vot.setDescription(levelTemplate.get(i).getDescription());

			vos.add(vot);
		}
		if (logger.isDebugEnabled()) {
			logger.debug("企业用户查看企业分级的申请项信息" + vos);
		}
		render(new JsonStore(vos));
	}

	// 保存处理步骤
	public void processFlowData() {
		CompanyLevelVO vo = getCompanyLevelVO();

		List<CheckStepVO> vos = vo.getSteps();
		System.out.println(vos + "" + vo);
		if (null == vos || "".equals(vos)
				|| vos.size() <= 0) {
			renderMessage(false, "处理步骤不能为空;");
			return;
		}
		CheckSteps cs = null;
		List<CheckSteps> stepList = new ArrayList<CheckSteps>();
		for (Iterator iterator = vos.iterator(); iterator.hasNext();) {
			CheckStepVO checkStepVO = (CheckStepVO) iterator.next();
			CheckSteps step = new CheckSteps();
			step.setId(checkStepVO.getId());
			step.setChecked(checkStepVO.isStatus());
			stepList.add(step);
		}
		checkStepsService.updateStatus(stepList);
		boolean passed = checkStepsService.isFlowPassed(vo.getId());
		Approval4Level al = approval4LevelService.get(vo.getId());
		ApproveLevelDetail detaiapp = new ApproveLevelDetail(); // 增加审批历史
		// 得到审批记录
		if (passed) {// 审批全部通过：
			DictCompanyLevel entLevel = (DictCompanyLevel) commonEntityService
					.getDictEntityById(
					DictCompanyLevel.class, Long.parseLong(al.getCompanyLevel()
							.getLevelTemplate().getLevelNo()));
			al.getCompanyLevel().getCompany().getLastAppCompanyInfo().setLevel(
					entLevel.getValue());// 企业信息表中赋值
			approval4LevelService.updateCompanyLevelStatus(al.getCompanyLevel().getId(), "PASSED");
			detaiapp.setApproval(al);
			detaiapp.setComment("");// 
			detaiapp.setCreateBy(SpringSecurityUtils.getCurrentUserName());
			detaiapp.setType("通过");
			detaiapp.setCreateDate(new Date());
			approveLevelDetailService.saveApproveLevelDetail(detaiapp);
		} else {
			approval4LevelService.updateCompanyLevelStatus(al.getCompanyLevel().getId(), "PROCESSING");
			detaiapp.setApproval(al);
			detaiapp.setComment("");// 
			detaiapp.setCreateBy(SpringSecurityUtils.getCurrentUserName());
			detaiapp.setType("审批");// 审批历史描述此处操作类型
			detaiapp.setCreateDate(new Date());
			approveLevelDetailService.saveApproveLevelDetail(detaiapp);
		}
		renderSuccess();
	}
}
