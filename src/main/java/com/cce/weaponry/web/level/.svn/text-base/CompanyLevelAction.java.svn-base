package com.cce.weaponry.web.level;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.springframework.beans.factory.annotation.Autowired;

import com.cce.modules.orm.Page;
import com.cce.modules.security.springsecurity.SpringSecurityUtils;
import com.cce.modules.service.CrudServiceInterface;
import com.cce.modules.web.json.JsonStore;
import com.cce.weaponry.entity.dict.DictApprovalStatus;
import com.cce.weaponry.entity.dict.DictCompanyLevel;
import com.cce.weaponry.entity.level.Approval4Level;
import com.cce.weaponry.entity.level.ApproveLevelDetail;
import com.cce.weaponry.entity.level.CompanyLevel;
import com.cce.weaponry.entity.level.CompanyLevelDetail;
import com.cce.weaponry.entity.level.CompanyLevelItemTemplate;
import com.cce.weaponry.entity.security.User;
import com.cce.weaponry.service.CommonEntityService;
import com.cce.weaponry.service.level.Approval4LevelService;
import com.cce.weaponry.service.level.ApproveLevelDetailService;
import com.cce.weaponry.service.level.CompanyLevelDetailService;
import com.cce.weaponry.service.level.CompanyLevelItemTemplateService;
import com.cce.weaponry.service.level.CompanyLevelService;
import com.cce.weaponry.service.register.CompanyService;
import com.cce.weaponry.service.security.UserCrudService;
import com.cce.weaponry.web.JsonCrudActionSupport;
import com.cce.weaponry.web.vo.level.CompanyLevelItemVO;
import com.cce.weaponry.web.vo.level.CompanyLevelVO;

@Namespace("/companylevel")
@Action("levelInfo")
public class CompanyLevelAction extends JsonCrudActionSupport<CompanyLevel> {
	@Autowired
	protected CompanyLevelService companyLevelService;
	@Autowired
	protected CompanyLevelDetailService companyLevelDetailService;
	@Autowired
	protected UserCrudService crudService;
	@Autowired
	protected Approval4LevelService approval4LevelService;
	@Autowired
	protected ApproveLevelDetailService approveLevelDetailService;
	@Autowired
	protected CommonEntityService commonEntityService;
	@Autowired
	protected CompanyService companyService;
	@Autowired
	protected CompanyLevelItemTemplateService itemTemplateService;
	@Override
	public CrudServiceInterface<CompanyLevel> getCrudService() {
		return companyLevelService;
	}

	/**
	 * 企业用户查看分级时加载当前企业分级申请等级级别
	 */
	public void findCompanyLevel() {
		String level = "无";
		if (null == crudService.getLoginUser().getCompany()) {
			this.renderMessage(true, level);
		} else {
			level = companyLevelService.getLevel(crudService
					.getLoginUser().getCompany().getId());
			if (null != level&&!"".equals(level)) {
				DictCompanyLevel dict = (DictCompanyLevel) commonEntityService
						.getDictEntityById(
						DictCompanyLevel.class, Long.parseLong(level));
				level = dict.getValue();
				this.renderMessage(true, level);
			} else {
				level = "无";
				this.renderMessage(true, level);
			}

		}
		if (logger.isDebugEnabled()) {
			logger.debug("企业用户查看分级时显示当前等级" + level);
		}
	}


	public void getinfo() {
		List<CompanyLevelItemVO> vos = new ArrayList();
		if (null != getIdParam()) {
			CompanyLevel cl = approval4LevelService.get(getIdParam())
					.getCompanyLevel();
			List<CompanyLevelDetail> detail = cl.getDetail();
			List<CompanyLevelItemTemplate> levelTemplate = itemTemplateService
					.showLevelTemplate(cl.getLevelTemplate().getId()); // Level
			// 申请等级
			CompanyLevelItemVO vot;
			for (int i = 0; i < levelTemplate.size(); i++) {
				vot = new CompanyLevelItemVO();
				vot.setIsContained(true);
				for (int t = 0; t < detail.size(); t++) {
					if (detail.get(t).getLevelItem().getId().intValue() == levelTemplate
							.get(i).getId().intValue()) {
						if (detail.get(t).getIsContained() != null) {
							vot.setIsContained(detail.get(t).getIsContained()
									.booleanValue());
						} else {
							vot.setIsContained(true);
						}
						if (detail.get(t).getDescription() != null) {
							vot.setRemark(detail.get(t).getDescription());
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
				logger.debug("企业用户tab显示分级申请的详细信息" + vos);
			}
			render(new JsonStore(vos));
		} else {
			render(new JsonStore(vos));
		}
	}
	/**
	 * 企业用户查看申请分级的详细信息tab
	 */
	@Override
	public void get() {
		List<CompanyLevelItemVO> vos = new ArrayList();
		if (null != getIdParam()) {
			CompanyLevel cl = companyLevelService.get(getIdParam());
			List<CompanyLevelDetail> detail = cl.getDetail();
			List<CompanyLevelItemTemplate> levelTemplate = itemTemplateService
					.showLevelTemplate(cl.getLevelTemplate().getId()); // Level
			// 申请等级
			CompanyLevelItemVO vot;
			for (int i = 0; i < levelTemplate.size(); i++) {
				vot = new CompanyLevelItemVO();
				vot.setIsContained(true);
				for (int t = 0; t < detail.size(); t++) {
					if (detail.get(t).getLevelItem().getId().intValue() == levelTemplate
							.get(i).getId().intValue()) {
						if (detail.get(t).getIsContained() != null) {
							vot.setIsContained(detail.get(t).getIsContained()
									.booleanValue());
						} else {
							vot.setIsContained(true);
						}
						if (detail.get(t).getDescription() != null) {
							vot.setRemark(detail.get(t).getDescription());
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
				logger.debug("企业用户tab显示分级申请的详细信息" + vos);
			}
			render(new JsonStore(vos));
		} else {
			render(new JsonStore(vos));
		}
	}

	/**
	 * 企业用户删除未提交 的分 级申请
	 */
	@Override
	public void delete() {
		if (logger.isDebugEnabled()) {
			logger.debug("删除企业分级ids" + "" + getIdArrayParam());
		}
		List<Long> levelId = getIdArrayParam();// 企业申请等级ID
		boolean bl = false;
		for (Long id : levelId) {
			CompanyLevel clstatus = companyLevelService.get(id);
			if ("PROCESSING".equals(clstatus.getStatus())
					|| "WAITING".equals(clstatus.getStatus())
					) {
				this.renderMessage(false, "申请已进入审批流程不可以删除");
				return;
			} else if ("PASSED".equals(clstatus.getStatus())
					|| "REJECTED".equals(clstatus.getStatus())) {
				this.renderMessage(false, "申请通过或退回的审批不可以删除");
				return;
			}
		}
		if (levelId.size() > 0) {
			for (int i = 0; i < levelId.size(); i++) {
				List<ApproveLevelDetail> detail = approval4LevelService
						.getApprovelLevelDetail(levelId.get(i));
				if (null != detail) {

				List<Long> ids = new ArrayList<Long>();
				for (int j = 0; j < detail.size(); j++) {
					Long id = detail.get(j).getId();
					ids.add(id);
				}
					approveLevelDetailService.delete(ids);
				}
				List<Approval4Level> applevel = approval4LevelService
						.getAppLevel(levelId.get(i));
				if (null != applevel) {
					List<Long> appids = new ArrayList<Long>();
					for (int k = 0; k < applevel.size(); k++) {
						Long appid = applevel.get(k).getId();
						appids.add(appid);
					}
					approval4LevelService.delete(appids);
				}
					bl = true;
			}
		}

	if (bl) {
			companyLevelDetailService.delete(levelId);
			companyLevelService.delete(levelId);
			this.renderMessage(true, "企业分级删除成功 ");
	} else {
			this.renderMessage(false, "企业分级删除失败");
		}
	}
	public void getLevelDetail() {
		this.render(new JsonStore(companyLevelService
				.findLevelDetail(getIdParam())));
	}

	/**
	 * 企业 用户提交分级申请
	 * 
	 * @throws Exception
	 */

	public void submit() throws Exception {
		logger.debug("企业用户提交企业分级" + getIdArrayParam());
		User user = crudService.getLoginUser();
		if (null == user.getCompany()) {
			this.renderMessage(false, "企业信息未备案请先进行企业备案");
			return;
		}
		Long id = user.getCompany().getId();
		List<CompanyLevel> list = companyLevelService.getStatus(id);
		String level = companyLevelService.getLevel(user.getCompany().getId());
		// 企业 分级申请企业用户 只能 提交一个申请(判断当前的申请 有没有 )
		if (list.size() < 1) {
			CompanyLevel companyLevel = companyLevelService
					.get(getIdArrayParam().get(0));
			// 企业还没有申请 过 分级

			if (null != level && !"".equals(level)) {
				// 企业提交的申请等级应该 比企业现在的 等级要大
				if (Long
						.parseLong(companyLevel.getLevelTemplate().getLevelNo()) > Long
						.parseLong(level)) {
					// 申请 5级
					if ("5".equals(companyLevel.getLevelTemplate()
									.getLevelNo())) {
						// 如果当前级别 为4级则可以提交
						if ("4".equals(level)) {
							companyLevelService.submitLevel(getIdArrayParam()
									.get(0));
							saveApp(companyLevel);
							this.renderMessage(true, "提交成功");
							return;

						} else {
							this.renderMessage(false, "企业当前级别未达到4级;不能直接申请5级");
							return;
						}
					} else {
						companyLevelService.submitLevel(getIdArrayParam()
								.get(0));
						saveApp(companyLevel);
						this.renderMessage(true, "提交成功");
						return;
					}
				} else {
					this.renderMessage(false, "申请等级应比当前企业级别要大");
					return;
				}
			} else {
				if (Long
						.parseLong(companyLevel.getLevelTemplate().getLevelNo()) < 5) {
					companyLevelService.submitLevel(getIdArrayParam().get(0));
					saveApp(companyLevel);
					this.renderMessage(true, "提交成功");
					return;
				} else {
					this.renderMessage(false, "企业没有等级前不能直接申请5级");
					return;
				}
			}
		} else {
			this.renderMessage(false, "企业当前有审批中的申请;请耐心等待审批");
			return ;
		}
	}

	// 类中调用保存审批历史
	private void saveApp(CompanyLevel cl) {
		Approval4Level app = new Approval4Level();
		app.setCompanyLevel(cl);
		app.setCreateDate(new Date());
		app.setUpdateDate(new Date());
		app.setIsActive(true);
		approval4LevelService.save(app);
		Approval4Level approval4Level = approval4LevelService.get(app.getId());
		ApproveLevelDetail detail = new ApproveLevelDetail();
		detail.setApproval(approval4Level);
		detail.setCreateBy(SpringSecurityUtils.getCurrentUserName());
		detail.setCreateDate(new Date());
		detail.setType("提交");
		approveLevelDetailService.save(detail);
	}

	/**
	 * 企业用户查看申请分级信息
	 */

	@Override
	public void list() throws Exception {
		if (logger.isDebugEnabled()) {
			logger.debug("企业用户查看分级申请");
		}
		List<CompanyLevelVO> result = new ArrayList<CompanyLevelVO>();
		User user = crudService.getLoginUser();
		if (null == user.getCompany()) {
			this.render(new JsonStore(result));
			return;
		}
		Page list = companyLevelService.getCompanyLevelInfo(
				this.setupPage(), user.getCompany()
						.getId());
		List<CompanyLevel> vos = list.getResult();
		CompanyLevelVO vo;
		for (CompanyLevel v : vos) {
			vo = new CompanyLevelVO();
			vo.setId(v.getId());
			DictCompanyLevel level = (DictCompanyLevel) commonEntityService
					.get(
					DictCompanyLevel.class, Long.parseLong(v.getLevelTemplate()
							.getLevelNo()));
			vo.setEntLevel(level.getValue());
			vo.setEntName(v.getCompany().getName());
			vo.setCreateDate(v.getCreateDate());
			vo.setUpdateDate(v.getUpdateDate());
			DictApprovalStatus state = (DictApprovalStatus) commonEntityService
					.getDictEntityByCode(
					DictApprovalStatus.class, v.getStatus());
			vo.setStatus(state.getValue());
			if (null != v.getFile()) {
				vo.setFileId(v.getFile().getId());
			}

			result.add(vo);
		}
		list.setResult(result);
		if (logger.isDebugEnabled()) {
			logger.debug("企业用户查看申请分级信息" + result);
		}
		render(getJsonSerializer().serialize(new JsonStore(list)));
	}

	// 1、判断企业备案是否通过；2、判断是否有审批中的记录
	public void newBtnEnabled() throws Exception {
		if (null != crudService.getLoginUser().getCompany()
				&& null != crudService.getLoginUser().getCompany()
						.getLastAppCompanyInfo()
				&& companyLevelService.getStatus(
						crudService.getLoginUser().getCompany().getId()).size() <= 0) {
			this.renderSuccess();
			return;
		} else {
			this.renderFailure();
			return;
		}

	}
}
