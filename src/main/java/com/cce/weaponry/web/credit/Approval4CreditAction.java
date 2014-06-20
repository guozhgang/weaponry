package com.cce.weaponry.web.credit;

import java.util.ArrayList;
import java.util.Iterator;
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
import com.cce.weaponry.entity.credit.Approval4Credit;
import com.cce.weaponry.entity.credit.ApproveCreditDetail;
import com.cce.weaponry.entity.credit.CompanyCredit;
import com.cce.weaponry.entity.dict.DictCompanyCredit;
import com.cce.weaponry.entity.register.Company;
import com.cce.weaponry.entity.register.CompanyInfo;
import com.cce.weaponry.entity.register.Region;
import com.cce.weaponry.entity.security.User;
import com.cce.weaponry.service.CommonEntityService;
import com.cce.weaponry.service.common.CompanyUtils;
import com.cce.weaponry.service.common.RegionManagementService;
import com.cce.weaponry.service.credit.Approval4CreditService;
import com.cce.weaponry.service.credit.CompanyCreditService;
import com.cce.weaponry.service.security.UserCrudService;
import com.cce.weaponry.web.JsonCrudActionSupport;
import com.cce.weaponry.web.util.WebDataUtil;
import com.cce.weaponry.web.vo.ApprovalDetailsVO;
import com.cce.weaponry.web.vo.credit.CompanyCreditSearchVO;
import com.cce.weaponry.web.vo.credit.CompanyCreditVO;
import com.cce.weaponry.web.vo.credit.CreditSearchVO;
import com.cce.weaponry.web.vo.register.StatsCreditVO;

import flexjson.JSONDeserializer;

@Namespace("/credit")
@Action("approval4Credit")
public class Approval4CreditAction extends
		JsonCrudActionSupport<Approval4Credit> {

	@Autowired
	private CommonEntityService commonService;

	@Autowired
	private Approval4CreditService approval4CreditService;

	@Autowired
	private RegionManagementService regionManagementService;

	// @Autowired
	// private CompanyCreditTemplateService companyCreditTemplateService;

	@Autowired
	private UserCrudService userCrudService;

	@Autowired
	private CompanyCreditService companyCreditService;

	@Override
	public CrudServiceInterface<Approval4Credit> getCrudService() {
		return approval4CreditService;
	}

	// ------------------ 最新代码分隔 --------------------------

	/**
	 * 根据条件查找信用等级申请项 {@link Approval4Credit} 集合信息
	 */
	public void search() {
		CompanyCreditSearchVO condition = getSearchVO();

		Page info = approval4CreditService.findApproval4Credits(this
				.setupPage(), condition);

		List<CompanyCreditVO> list = new ArrayList<CompanyCreditVO>();
		for (int j = 0; j < info.getResult().size(); j++) {
			Approval4Credit i = (Approval4Credit) info.getResult().get(j);
			CompanyInfo companyInfo = i.getCompanyCredit().getCompany()
					.getLastAppCompanyInfo();
			CompanyCreditVO vo = new CompanyCreditVO();
			if (null != companyInfo) { // 企业已经通过备案
				vo.setEntNo(companyInfo.getTaxCert());
			}
			vo.setCreateDate(i.getCreateDate());
			vo.setEntCredit(i.getCompanyCredit().getTemplate().getValue());
			vo.setEntName(i.getCompanyCredit().getCompany().getName());

			vo.setFileId(i.getCompanyCredit().getFile().getId());
			vo.setId(i.getId());
			vo.setRemark(i.getComComment());
			vo.setStatus(i.getStatus());
			vo.setUpdateDate(i.getUpdateDate());

			list.add(vo);
		}
		info.setResult(list);

		if (logger.isDebugEnabled()) {
			CompanyUtils.printRequestInfo();
			CompanyUtils.printResponseInfo(list);
		}

		this.render(info);
	}

	/**
	 * 调整信用等级
	 * 
	 * @throws Exception
	 */
	public void adjust() throws Exception {
		try {
			List<CompanyCreditVO> vos = getRequestMap();
			User loginUser = userCrudService.getLoginUser();

			String reason = getCauseParam().substring(1,
					getCauseParam().length() - 1);
			boolean isRight = true;
			for (int j = 0; j < vos.size(); j++) {
				CompanyCreditVO i = vos.get(j);
				DictCompanyCredit template = (DictCompanyCredit) commonService
						.getDictEntityByValue(DictCompanyCredit.class, i
								.getEntCredit());
				if (companyCreditService.modifyCompanyCredit(i.getId(),
						template.getId(), reason, reason, loginUser.getName())) {
					vos.remove(j);
				} else {
					isRight = false;
				}
			}
			if (vos == null)
				throw new RuntimeException("参数错误,指定的数据不存在!");
			// TODO 根据VOS的内容 ，更新企业分级信息，并返回完整的VOS记录内容
			if (isRight) {
				this.render(getJsonSerializer().serialize(new JsonStore(vos)));
			} else {
				renderMessage(false, "要调整到的级别已提交、正在处理或已通过");
			}
		} catch (Exception e) {
			this.renderMessage(false, "调整失败");
			logger.error(e.getMessage(), e);
		}
	}

	/**
	 * 根据审批ID号，查找审批历史
	 */
	public void getDetailsByApprovalId() {
		// 审批历史集合
		List<ApproveCreditDetail> details = approval4CreditService
				.findDetailsByApprovalId(getIdParam());
		// 审批历史封装集合
		List<ApprovalDetailsVO> list = new ArrayList<ApprovalDetailsVO>();

		for (ApproveCreditDetail i : details) {
			ApprovalDetailsVO vo = new ApprovalDetailsVO();

			vo.setId(i.getId());
			vo.setCreateBy(i.getCreateBy());
			vo.setCreateDate(i.getCreateDate());
			vo.setOperate(i.getType());
			String role = "提交".equals(i.getType()) ? "企业用户" : "省级用户";
			vo.setRole(role);
			vo.setComment(i.getComment());

			list.add(vo);
		}
		// 返回给页面数据
		if (logger.isDebugEnabled()) {
			CompanyUtils.printRequestInfo();
			CompanyUtils.printResponseInfo(list);
		}
		render(getJsonSerializer().serialize(new JsonStore(list)));
	}


	// -------------------- 最新代码分隔 ----------------------

	// 提交申请公司的申请项集合
	public void findActiveApproval4CreditByCompanyId() throws Exception {
		Long companyInfoId = Long.parseLong(Struts2Utils
				.getParameter("companyInfoId"));
		List<Approval4Credit> approval4Credits = approval4CreditService
				.findActiveApproval4CreditByCompanyId(companyInfoId);
		this.render(approval4Credits);
	}

	// 待处理审批项
	public void waitingCreditApproval() throws Exception {
		String loginUserName = SpringSecurityUtils.getCurrentUserName();
		User user = userCrudService.findUserByLoginName(loginUserName);
		if ("省级用户".equals(user.getRole().getName())) {
			Object[] criteria = new Object[3];

			Approval4Credit condition = new Approval4Credit();

			condition.setIsActive(true);
			condition.setNetstatus("PROCESSING");
			condition.setCompanyCredit(new CompanyCredit());
			condition.getCompanyCredit().setCompany(new Company());
			condition.getCompanyCredit().getCompany().setRegion(new Region());
			condition.getCompanyCredit().getCompany().getRegion().setCode(
					user.getRegion().getCode());

			criteria[0] = condition;

			Page<Approval4Credit> waitintCredits = approval4CreditService
					.findApprovalsByCondition(this.setupPage(), criteria);
			this.render(waitintCredits);
		}

	}

	// 已完成审批项
	public void completedCreditApproval() throws Exception {
		String loginUserName = SpringSecurityUtils.getCurrentUserName();
		User user = userCrudService.findUserByLoginName(loginUserName);
		if ("省级用户".equals(user.getRole().getName())) {
			Object[] criteria = new Object[3];

			Approval4Credit condition = new Approval4Credit();

			condition.setIsActive(true);
			condition.setNetstatus("4");
			condition.setCompanyCredit(new CompanyCredit());
			condition.getCompanyCredit().setCompany(new Company());
			condition.getCompanyCredit().getCompany().setRegion(new Region());
			condition.getCompanyCredit().getCompany().getRegion().setCode(
					user.getRegion().getCode());

			criteria[0] = condition;

			Page<Approval4Credit> completedCredits = approval4CreditService
					.findApprovalsByCondition(this.setupPage(), criteria);

			this.render(completedCredits);
		}

	}

	// 查询与统计
	public void findApproval4Credits() throws Exception {
		CompanyCreditSearchVO vo = new CompanyCreditSearchVO();
		DictCompanyCredit template = (DictCompanyCredit) commonService
				.getDictEntityById(DictCompanyCredit.class, Long
						.parseLong(Struts2Utils.getParameter("templateId")));
		vo.setEntCredit(template.getValue());
		vo.setRegionId(Long.toString(regionManagementService.getRegionByCode(
				Struts2Utils.getParameter("regionCode")).getId()));
		vo.setEntName(Struts2Utils.getParameter("companyInfoName"));

		Page<Approval4Credit> stats = approval4CreditService
				.findApproval4Credits(this.setupPage(), vo);
	}

	/**
	 * 查找待审批项
	 */
	public void findWaitingStatusApprovalInfo() {
		Page waitintCredits = approval4CreditService.findWaitApprovals(this
				.setupPage());

		// 
		List<CompanyCreditVO> vos = new ArrayList<CompanyCreditVO>();
		for (int j = 0; j < waitintCredits.getResult().size(); j++) {
			Approval4Credit i = (Approval4Credit) waitintCredits.getResult()
					.get(j);
			CompanyCreditVO vo = new CompanyCreditVO();
			vo.setId(i.getId());
			vo.setCreateDate(i.getCreateDate());
			vo.setEntCredit(i.getCompanyCredit().getTemplate().getValue());
			vo.setEntName(i.getCompanyCredit().getCompany().getName());
			CompanyInfo com = i.getCompanyCredit().getCompany()
					.getLastAppCompanyInfo();
			if (null != com) {
				vo.setEntNo(com.getTaxCert());
			}
			vo.setUpdateDate(i.getUpdateDate());
			vo.setFileId(i.getCompanyCredit().getFile().getId());
			vo.setRemark(i.getComComment());
			vos.add(vo);
		}
		waitintCredits.setResult(vos);

		if (logger.isDebugEnabled()) {
			CompanyUtils.printRequestInfo();
			CompanyUtils.printResponseInfo(vos);
		}

		render(getJsonSerializer().serialize(new JsonStore(waitintCredits)));
	}

	/**
	 * 根据登录的企业用户信息 ，查找 企业用户信用申请的当前审批状态
	 */
	public void findEnterpriseApprovalInfo() {
		User loginUser = userCrudService.getLoginUser();
		CompanyInfo companyInfo = loginUser.getCompanyInfo();
		if (null == companyInfo)
			return;
		Page approval4Credits = approval4CreditService
				.findApproval4CreditByCompanyId(CompanyUtils.setupPage(),
						loginUser.getCompanyInfo().getId());
		List<CompanyCreditVO> creditList = new ArrayList<CompanyCreditVO>();
		for (int j = 0; j < approval4Credits.getResult().size(); j++) {
			Approval4Credit i = (Approval4Credit) approval4Credits.getResult()
					.get(j);
			CompanyCreditVO vo = new CompanyCreditVO();
			vo.setId(i.getId());
			// vo.setEntName(i.getCompanyCredit().getCompany().getNameCN());
			vo.setCreateDate(i.getCreateDate());
			vo.setEntCredit(i.getCompanyCredit().getTemplate().getValue());
			vo.setFileId(i.getCompanyCredit().getFile().getId());
			String status = "提交";
			if ("3".equals(i.getNetstatus()) || "3".equals(i.getScenestatus())) {
				status = "退回";
			} else if ("2".equals(i.getNetstatus())
					&& "2".equals(i.getScenestatus())) {
				status = "通过";
			} else if ("4".equals(i.getNetstatus())
					&& "4".equals(i.getScenestatus())) {
				status = "调整";
			}
			vo.setStatus(status);
			creditList.add(vo);
		}
		approval4Credits.setResult(creditList);
		render(getJsonSerializer().serialize(new JsonStore(approval4Credits)));
	}

	/**
	 * 1、根据登录用户信息判断用户角色 2、执行网上通过操作
	 */
	public void netPass() throws Exception {
		User loginUser = userCrudService.getLoginUser();
		for (Long i : getIdArrayParam()) {
			Approval4Credit app = approval4CreditService.get(i);
			if ("PASSED".equals(app.getNetstatus())) {
				renderMessage(false, "此申请已经网上通过");
				return;
			}
			if ("REJECTED".equals(app.getNetstatus())) {
				renderMessage(false, "此申请已经网上退回");
				return;
			}
			if ("REJECTED".equals(app.getScenestatus())) {
				renderMessage(false, "此申请已经现场退回");
				return;
			}
			companyCreditService.processCompanyCreditApproval(i, "", true,
					loginUser.getLoginName());
		}
		renderSuccess();
	}

	/**
	 * 1、根据登录用户信息判断用户角色 2、执行网上退回操作
	 */
	public void netDeny() throws Exception {
		User loginUser = userCrudService.getLoginUser();
		String reason = getCauseParam();
		// .substring(1,getCauseParam().length() - 1);
		for (Long i : getIdArrayParam()) {
			Approval4Credit app = approval4CreditService.get(i);
			if ("PASSED".equals(app.getNetstatus())) {
				renderMessage(false, "此申请已经网上通过");
				return;
			}
			if ("REJECTED".equals(app.getNetstatus())) {
				renderMessage(false, "此申请已经网上退回");
				return;
			}
			if ("REJECTED".equals(app.getScenestatus())) {
				renderMessage(false, "此申请已经现场退回");
				return;
			}
			companyCreditService.processCompanyCreditApproval(i, reason, false,
					loginUser.getLoginName());
		}
		renderSuccess();
	}

	/**
	 * 1、根据登录用户信息判断用户角色 2、执行现场通过操作
	 */
	public void sceenPass() throws Exception {
		User loginUser = userCrudService.getLoginUser();
		for (Long i : getIdArrayParam()) {
			Approval4Credit app = approval4CreditService.get(i);
			if ("PASSED".equals(app.getScenestatus())) {
				renderMessage(false, "此申请已经现场通过");
				return;
			}
			if ("REJECTED".equals(app.getScenestatus())) {
				renderMessage(false, "此申请已经现场退回");
				return;
			}
			if ("REJECTED".equals(app.getNetstatus())) {
				renderMessage(false, "此申请已经网上退回");
				return;
			}
			companyCreditService.processCompanyCreditApprovalOfSence(i, "",
					true, loginUser.getLoginName());
		}
		renderSuccess();
	}

	/**
	 * 1、根据登录用户信息判断用户角色 2、执行现场退回操作
	 */
	public void sceenDeny() throws Exception {
		User loginUser = userCrudService.getLoginUser();
		String reason = getCauseParam();
		// .substring(1,getCauseParam().length() - 1);
		for (Long i : getIdArrayParam()) {
			Approval4Credit app = approval4CreditService.get(i);
			if ("PASSED".equals(app.getScenestatus())) {
				renderMessage(false, "此申请已经现场通过");
				return;
			}
			if ("REJECTED".equals(app.getScenestatus())) {
				renderMessage(false, "此申请已经现场退回");
				return;
			}
			companyCreditService.processCompanyCreditApprovalOfSence(i, reason,
					false, loginUser.getLoginName());
		}
		renderSuccess();
	}

	/**
	 * 得到“cause”参数的值
	 * 
	 * @return
	 */
	protected String getCauseParam() {
		return Struts2Utils.getParameter("cause");
	}

	/**
	 * 封装搜索参数为对象
	 * 
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public CompanyCreditSearchVO getSearchVO() {
		String data = Struts2Utils.getParameter(JsonStore.RootProperty);
		if (data == null)
			return null;
		JSONDeserializer deserializer = this.getJsonDeserializer();
		JSONDeserializer<IdEntity> jsonDeserializer = deserializer.use(null,
				CompanyCreditSearchVO.class);
		return (CompanyCreditSearchVO) jsonDeserializer.deserialize(data);
	}

	/**
	 * 封装信用等级对象
	 * 
	 * @return
	 */
	@SuppressWarnings("unchecked")
	private List<CompanyCreditVO> getRequestMap() {
		String data = Struts2Utils.getParameter(JsonStore.RootProperty);
		List list = WebDataUtil.splitJsonArray(data);
		List<CompanyCreditVO> levelList = new ArrayList<CompanyCreditVO>();
		JSONDeserializer deserializer = this.getJsonDeserializer();
		JSONDeserializer<IdEntity> jsonDeserializer = deserializer.use(null,
				CompanyCreditVO.class);
		for (Iterator iterator = list.iterator(); iterator.hasNext();) {
			String levelStr = (String) iterator.next();
			levelList.add((CompanyCreditVO) jsonDeserializer
					.deserialize(levelStr));
		}
		return levelList;
	}

	/**
	 * 各级用户根据统计条件统计信息
	 */
	public void statByCriterial() {
		CreditSearchVO condition = getCredtiSearchVO();

		Map<String, Long> maps = approval4CreditService
				.statsApprovalCredit(condition);

		Iterator<String> region = maps.keySet().iterator();
		Iterator<Long> count = maps.values().iterator();

		List<StatsCreditVO> vos = new ArrayList<StatsCreditVO>();

		for (int i = 0; i < maps.size(); i++) {
			StatsCreditVO vo = new StatsCreditVO();

			vo.setCount(count.next());
			vo.setCity(region.next());// (regionManagementService.getNameById(region.next()));

			vos.add(vo);
		}

		if (logger.isDebugEnabled()) {
			CompanyUtils.printRequestInfo();
			CompanyUtils.printResponseInfo(vos);
		}

		render(new JsonStore(vos));
	}

	/**
	 * 把{@link #search()} 要接收的参数封装成 {@link CreditSearchVO} 对象
	 * 
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public CreditSearchVO getCredtiSearchVO() {
		String data = Struts2Utils.getParameter(JsonStore.RootProperty);
		if (data == null)
			return null;
		JSONDeserializer deserializer = this.getJsonDeserializer();
		JSONDeserializer<IdEntity> jsonDeserializer = deserializer.use(null,
				CreditSearchVO.class);
		return (CreditSearchVO) jsonDeserializer.deserialize(data);
	}

}
