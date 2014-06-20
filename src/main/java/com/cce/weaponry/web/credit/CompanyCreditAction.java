package com.cce.weaponry.web.credit;

import java.util.ArrayList;
import java.util.List;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.springframework.beans.factory.annotation.Autowired;

import com.cce.modules.orm.IdEntity;
import com.cce.modules.orm.Page;
import com.cce.modules.service.CrudServiceInterface;
import com.cce.modules.web.json.JsonStore;
import com.cce.modules.web.struts2.Struts2Utils;
import com.cce.weaponry.entity.credit.Approval4Credit;
import com.cce.weaponry.entity.credit.CompanyCredit;
import com.cce.weaponry.entity.dict.DictCompanyCredit;
import com.cce.weaponry.entity.register.Company;
import com.cce.weaponry.entity.register.CompanyInfo;
import com.cce.weaponry.entity.security.User;
import com.cce.weaponry.service.CommonEntityService;
import com.cce.weaponry.service.common.CompanyUtils;
import com.cce.weaponry.service.credit.Approval4CreditService;
import com.cce.weaponry.service.credit.CompanyCreditService;
import com.cce.weaponry.service.register.CompanyInfoService;
import com.cce.weaponry.service.security.UserCrudService;
import com.cce.weaponry.web.JsonCrudActionSupport;
import com.cce.weaponry.web.vo.credit.CompanyCreditVO;

import flexjson.JSONDeserializer;

@Namespace("/credit")
@Action("companycredit")
public class CompanyCreditAction extends JsonCrudActionSupport<CompanyCredit> {

	@Autowired
	private CompanyInfoService companyInfoService;

	@Autowired
	private CompanyCreditService companyCreditService;

	@Autowired
	private Approval4CreditService approval4CreditService;

	@Autowired
	private UserCrudService userCrudService;

	@Autowired
	private CommonEntityService commonService;

	@Override
	public CrudServiceInterface<CompanyCredit> getCrudService() {
		return companyCreditService;
	}

	// ------------------ 最新代码分隔 --------------------

	/**
	 * 获得当前登录用户的企业信用申请；信用档案->信用档案申请
	 */
	@Override
	public void list() throws Exception {
		// 得到登录用户的企业
		Company com = userCrudService.getLoginUser().getCompany();
		Long comId = com == null ? 0l : com.getId();
		// 根据公司id得到信用档案申请
		Page approval4Credits = approval4CreditService
				.findApprovalCreditsByComId(CompanyUtils.setupPage(), comId);
		// 封装到VO对象的集合
		List<CompanyCreditVO> creditList = new ArrayList<CompanyCreditVO>();
		for (int j = 0; j < approval4Credits.getResult().size(); j++) {
			// 得到某一项
			Approval4Credit i = (Approval4Credit) approval4Credits.getResult()
					.get(j);
			// 封装对象
			CompanyCreditVO vo = new CompanyCreditVO();

			vo.setId(i.getId()); // 申请项id
			vo.setEntName(i.getCompanyCredit().getCompany().getName());// 公司名称
			vo.setCreateDate(i.getCreateDate());// 创建日期
			vo.setEntCredit(i.getCompanyCredit().getTemplate().getValue()); // 等级名称
			vo.setFileId(i.getCompanyCredit().getFile().getId()); // 档案相关文件
			vo.setStatus(i.getStatus());// 当前状态
			vo.setRemark(i.getComComment());

			creditList.add(vo);
		}
		// 重新设置结果集
		approval4Credits.setResult(creditList);

		if (logger.isDebugEnabled()) {
			CompanyUtils.printRequestInfo();
			CompanyUtils.printResponseInfo(creditList);
		}

		// 返回给页面结果
		render(getJsonSerializer().serialize(new JsonStore(approval4Credits)));

	}

	/**
	 * 得到当前登录用户所有公司的信用最高等级
	 * http://localhost:8080/cce-web/credit/companycredit!getSummitCredit.action
	 * 
	 * @throws Exception
	 */
	public void getSummitCredit() throws Exception {
		Company company = userCrudService.getLoginUser().getCompany();
		if (null != company) {
			String credit = companyCreditService.getSummitCredit(company
					.getId());
			Object companyCredit = commonService.getDictEntityByCode(
					DictCompanyCredit.class, credit);
			if (null != companyCredit) {
				credit = ((DictCompanyCredit) companyCredit).getValue();
			}
			if (logger.isDebugEnabled()) {
				CompanyUtils.printResponseInfo(credit);
			}
			this.renderMessage(true, credit);
			return;
		}
		this.renderMessage(false, "无");
	}

	// ------------------ 最新代码分隔 --------------------

	/**
	 * 省级处理公司申请
	 * 
	 * @throws Exception
	 */
	public void processCompanyCreditApproval() throws Exception {
		Long approval4CreditId = Long.parseLong(Struts2Utils
				.getParameter("approval4CreditId"));
		String opnion = Struts2Utils.getParameter("opnion");
		String isPassStr = Struts2Utils.getParameter("isPass");
		boolean isPass = "1".equals(isPassStr) ? true : false;
		String dealBy = Struts2Utils.getParameter("dealBy");
		companyCreditService.processCompanyCreditApproval(approval4CreditId,
				opnion, isPass, dealBy);
	}

	// 提交公司申请
	public void submitCompanyCreditApproval() throws Exception {
		Long companyInfoId = Long.parseLong(Struts2Utils
				.getParameter("companyInfoId"));
		// 申请的模板id
		Long templateId = Long.parseLong(Struts2Utils
				.getParameter("templateId"));
		String description = Struts2Utils.getParameter("description");
		Long fileId = Long.parseLong(Struts2Utils.getParameter("fileUrl"));
		String isSubmitStr = Struts2Utils.getParameter("isSubmit");
		boolean isSubmit = "1".equals(isSubmitStr) ? true : false;

		companyCreditService.submitCompanyCreditApproval(companyInfoId,
				templateId, description, fileId, isSubmit);
	}

	// 修改分级
	public void modifyCompanyCredit() throws Exception {
		Long approval4CreditId = Long.parseLong(Struts2Utils
				.getParameter("approval4CreditId"));
		Long templateId = Long.parseLong(Struts2Utils
				.getParameter("templateId"));
		String reason = Struts2Utils.getParameter("reason");
		String opnion = Struts2Utils.getParameter("opnion");
		// String dealBy = Struts2Utils.getParameter("dealBy");

		User loginUser = userCrudService.getLoginUser();

		companyCreditService.modifyCompanyCredit(approval4CreditId, templateId,
				reason, opnion, loginUser.getLoginName());
	}

	/**
	 * 企业 用户提交信用申请
	 * 
	 * @throws Exception
	 */
	public void submit() throws Exception {
		if (getIdArrayParam().size() > 1) {
			renderMessage(false, "不可提交多个申请!");
		} else {
			User loginUser = userCrudService.getLoginUser();
			for (Long i : getIdArrayParam()) {
				Approval4Credit app = approval4CreditService.get(i);
				if ("PASSED".equals(app.getNetstatus())
						&& "PASSED".equals(app.getScenestatus())) {
					renderMessage(false, "此申请已经通过审批，不可提交");
					return;
				}

				CompanyCredit companyCredit = app.getCompanyCredit();
				DictCompanyCredit template = (DictCompanyCredit) commonService
						.getDictEntityByValue(DictCompanyCredit.class,
								companyCredit.getTemplate().getValue());
				Long ret = companyCreditService.submitCompanyCreditApproval(
						loginUser.getCompany().getId(), template.getId(),
						companyCredit.getDescription(), companyCredit.getFile()
								.getId(), true);
				if (null == ret) {
					renderMessage(false, "已有在审批中的申请！");
				} else if (0l == ret) {
					renderMessage(false, "企业备案未通过，不能提交信用等级申请");
				} else if (-1 == ret) {
					renderMessage(true, "提交的级别要比当前级别要高!");
				} else {
					renderMessage(true, "提交申请成功！");
				}
			}
		}
	}

	public void saveSubmit() throws Exception {
		// 得到登录用户
		User loginUser = userCrudService.getLoginUser();
		// 登录用户的企业
		Company company = loginUser.getCompany();
		if (null == company) {
			renderMessage(false, "请先注册企业信息");
		} else {
			if (null == company.getLastAppCompanyInfo()) {
				renderMessage(false, "备案通过后才可新建档案申请");
				return;
			}
			CompanyCreditVO condition = getCompanyCreditVO();
			if (condition == null)
				return;
			else {
				// 等级模板信息
				DictCompanyCredit template = (DictCompanyCredit) commonService
						.getDictEntityByCode(DictCompanyCredit.class, condition
								.getEntCredit());

				String summitCredit = companyCreditService
						.getSummitCredit(loginUser.getCompany().getId());

				if (null != summitCredit) {// a b
					if (summitCredit.compareTo(template.getCode()) < 0) {// 提交的级别要比当前级别要高!
						renderMessage(false, "新建级别应比当前企业信用等级要高");
						return;
					}
				}

				Long companyId = company.getId();
				// 保存公司信用申请
				Long id = companyCreditService.saveCompanyCreditApproval(
						companyId, template.getId(), condition.getRemark(),
						condition.getFileId());
				if (null != id) {
					if (0 != id.intValue()) {
						CompanyCredit companyCredit = approval4CreditService
								.get(id).getCompanyCredit();
						Long ret = companyCreditService
								.submitCompanyCreditApproval(loginUser
										.getCompany().getId(),
										template.getId(), companyCredit
												.getDescription(),
										companyCredit.getFile().getId(), true);
						if (null == ret) {
							renderMessage(false, "已有在审批中的申请！");
						} else if (0l == ret) {
							renderMessage(false, "企业备案未通过，不能提交信用等级申请");
						} else if (-1 == ret) {
							renderMessage(false, "提交的级别要比当前级别要高!");
						} else {
							renderMessage(true, "提交申请成功！");
						}
					} else {
						this.renderMessage(false, "有正在处理中的申请，不可新建");
					}
				} else {
					this.renderMessage(false, "此等级申请已经提交或通过!");
				}
			}
		}

	}

	/**
	 * 删除申请项信息
	 */
	@Override
	public void delete() throws Exception {
		try {
			approval4CreditService.delete(getIdArrayParam());
			renderSuccess();
		} catch (Exception e) {
			renderMessage(false, "已提交申请不可删除");
		}
	}

	/**
	 * 如果是新增企业信用等级，则包括内容包括登录用户信息和申请信息；
	 */
	@Override
	public void save() throws Exception {
		// 得到登录用户
		User loginUser = userCrudService.getLoginUser();
		// 登录用户的企业
		Company company = loginUser.getCompany();
		if (null == company) {
			renderMessage(false, "请先注册企业信息");
		} else {
			if (null == company.getLastAppCompanyInfo()) {
				renderMessage(false, "备案通过后才可新建档案申请");
				return;
			}
			CompanyCreditVO condition = getCompanyCreditVO();
			if (condition == null)
				return;
			else {
				// 等级模板信息
				DictCompanyCredit template = (DictCompanyCredit) commonService
						.getDictEntityByCode(DictCompanyCredit.class, condition
								.getEntCredit());

				String summitCredit = companyCreditService
						.getSummitCredit(loginUser.getCompany().getId());

				if (null != summitCredit) {// a b
					if (summitCredit.compareTo(template.getCode()) < 0) {// 提交的级别要比当前级别要高!
						renderMessage(false, "新建级别应比当前企业信用等级要高");
						return;
					}
				}

				Long companyId = company.getId();
				// 保存公司信用申请
				Long id = companyCreditService.saveCompanyCreditApproval(
						companyId, template.getId(), condition.getRemark(),
						condition.getFileId());
				if (null != id) {
					if (0 != id.intValue()) {
						condition.setId(id);
						if (logger.isDebugEnabled()) {
							CompanyUtils.printRequestInfo();
							CompanyUtils.printResponseInfo(condition);
						}
						this.render(getJsonSerializer().serialize(
								new JsonStore(condition)));
					} else {
						this.renderMessage(false, "有正在处理中的申请，不可新建");
					}
				} else {
					this.renderMessage(false, "此等级申请已经提交或通过!");
				}
			}
		}
	}

	/**
	 * 把{@link #save()} 方法需要接收的参数封装成对象
	 * 
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public CompanyCreditVO getCompanyCreditVO() {
		String data = Struts2Utils.getParameter(JsonStore.RootProperty);
		if (data == null)
			return null;
		JSONDeserializer deserializer = this.getJsonDeserializer();
		JSONDeserializer<IdEntity> jsonDeserializer = deserializer.use(null,
				CompanyCreditVO.class);
		return (CompanyCreditVO) jsonDeserializer.deserialize(data);
	}

	/**
	 * 获取档案分级列表
	 */
	public void getCreditLevel() {
		String data = Struts2Utils.getParameter("data");

		System.out.println("测试：1 " + data);

		StringBuffer sb = new StringBuffer();

		sb.append("{\"message\":\"操作成功\",\"data\":[");

		sb.append("{\"name\":\"D级\",\"value\":\"D\"}");
		sb.append("{\"name\":\"C级\",\"value\":\"C\"},");
		sb.append("{\"name\":\"B级\",\"value\":\"B\"},");
		sb.append("{\"name\":\"A级\",\"value\":\"A\"},");

		sb.append("],\"succeess\":true}");

		this.render(sb.toString());
	}

	// 1、判断企业备案是否通过；2、判断是否有审批中的记录
	public void newBtnEnabled() throws Exception {
		User user = userCrudService.getLoginUser();
		boolean flag = false;
		CompanyInfo companyInfo = companyInfoService.getCompanyNewInfo(user
				.getId());
		// 判断企业备案是否通过
		if (null != companyInfo) {
			// 判断是否有审批中的记录
			flag = !companyCreditService
					.isProcessing(user.getCompany().getId());
		}
		if (flag) {
			this.renderSuccess();
		} else {
			this.renderFailure();
		}
	}
}
