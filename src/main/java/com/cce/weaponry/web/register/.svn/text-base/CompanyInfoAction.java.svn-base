package com.cce.weaponry.web.register;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.springframework.beans.factory.annotation.Autowired;

import com.cce.modules.orm.Page;
import com.cce.modules.security.springsecurity.SpringSecurityUtils;
import com.cce.modules.service.CrudServiceInterface;
import com.cce.modules.web.json.JsonStore;
import com.cce.modules.web.struts2.Struts2Utils;
import com.cce.weaponry.entity.dict.DictApprovalStatus;
import com.cce.weaponry.entity.register.Approval4Register;
import com.cce.weaponry.entity.register.Company;
import com.cce.weaponry.entity.register.CompanyBadge;
import com.cce.weaponry.entity.register.CompanyInfo;
import com.cce.weaponry.entity.register.Region;
import com.cce.weaponry.entity.security.User;
import com.cce.weaponry.service.CommonEntityService;
import com.cce.weaponry.service.common.CompanyUtils;
import com.cce.weaponry.service.register.Approval4RegisterService;
import com.cce.weaponry.service.register.CompanyInfoService;
import com.cce.weaponry.service.security.UserCrudService;
import com.cce.weaponry.web.JsonCrudActionSupport;
import com.cce.weaponry.web.vo.register.BadgeVO;
import com.cce.weaponry.web.vo.register.ComNameRegionVO;

import flexjson.JSONDeserializer;

@Namespace("/record")
@Action("companyInfo")
public class CompanyInfoAction extends JsonCrudActionSupport<CompanyInfo> {

	@Autowired
	private CommonEntityService commonEntityService;

	@Autowired
	private UserCrudService userCrudService;

	@Autowired
	private CompanyInfoService companyInfoService;

	@Autowired
	private Approval4RegisterService approval4RegisterService;

	@Override
	public CrudServiceInterface<CompanyInfo> getCrudService() {
		return companyInfoService;
	}

	@Override
	public JSONDeserializer<CompanyInfo> getJsonDeserializer() {
		return super.getJsonDeserializer().use(null, Region.class).use(
				this.getEntityFactory(), "region");
	}

	// --------------- 最新代码分隔 ---------------

	/**
	 * 企业用户企业信息列表 : 企业用户->备案管理->企业信息
	 */
	public void companyInfoList() throws Exception {
		// 得到当前登录用户
		User user = userCrudService.getLoginUser();
		// 根据登录用户查询企业信息列表
		Page<CompanyInfo> page = companyInfoService.findComInfosByUserId(this
				.setupPage(), user.getId());
		// 封装到实体对象集合
		List<CompanyInfo> list = new ArrayList<CompanyInfo>();
		// 遍历
		for (int i = 0; i < page.getResult().size(); i++) {
			// 得到其中项
			CompanyInfo com = page.getResult().get(i);
			// 防止传到前台内容无用信息,故将 其 相关联的 企业 属性设为null
			com.setCompany(null);
			// 设置企业的当前备案审批状态
			Object obj = commonEntityService.getDictEntityByCode(
					DictApprovalStatus.class, com.getStatus());
			if (null != obj) {
				DictApprovalStatus status = (DictApprovalStatus) obj;
				com.setStatus(status.getValue());
			}
			// 增加到集合
			list.add(com);
		}
		// 设置结果集
		page.setResult(list);
		if (logger.isDebugEnabled()) {
			CompanyUtils.printRequestInfo();
			CompanyUtils.printResponseInfo(page);
		}
		// 返回给页面
		render(new JsonStore(page));
	}

	@Override
	public void get() {
		Long entityId = getIdParam();
		if (entityId != null) {
			CompanyInfo entity = getCrudService().get(entityId);
			if (logger.isDebugEnabled()) {
				CompanyUtils.printRequestInfo();
				CompanyUtils.printResponseInfo(entity);
			}
			render(new JsonStore(entity));
		} else {
			this.renderMessage(false, "查询失败,ID为[" + entityId + "]的记录不存在!");
		}
	}

	/**
	 * 通过审批项id得到企业信息
	 */
	public void getByAppId() {
		Long entityId = getIdParam();
		if (entityId != null) {
			Approval4Register app = approval4RegisterService.get(entityId);
			CompanyInfo entity = app.getCompanyInfo();
			if (logger.isDebugEnabled()) {
				CompanyUtils.printRequestInfo();
				CompanyUtils.printResponseInfo(entity);
			}
			render(new JsonStore(entity));
		} else {
			this.renderMessage(false, "查询失败,ID为[" + entityId + "]的记录不存在!");
		}
	}

	/**
	 * 返回企业最后一次审批通过的企业信息；如果没有返回空。 : 企业用户->备案管理->企业信息，其他用户->查看企业信息
	 */
	public void getCompanyInfo() {
		// 得到当前登录用户
		User loginUser = userCrudService.getLoginUser();

		CompanyInfo companyInfo = null;

		// 判断当前登录用户
		if ("企业用户".equals(loginUser.getRole().getName())) {
			// 企业用户通过登录用户的id查询
			companyInfo = companyInfoService.getCompanyNewInfo(loginUser
					.getId());
		} else {
			// 其他用户通过前台传入的id查询企业信息
			companyInfo = companyInfoService.get(getIdParam());
		}
		// 封装到List 返回给前台
		List<CompanyInfo> list = new ArrayList<CompanyInfo>();
		if (companyInfo != null) {
			list.add(companyInfo);
		}
		// 相应给前台
		render(new JsonStore(list));
	}

	/**
	 * 新建企业信息 : 备案管理->企业信息
	 */
	public void createCompanyInfo() {
		CompanyInfo companyInfo = this.getRequestBean();
		companyInfo = companyInfoService.createCompanyInfo(companyInfo);
		if (null != companyInfo) {
			if (logger.isDebugEnabled()) {
				CompanyUtils.printRequestInfo();
				CompanyUtils.printResponseInfo(companyInfo);
			}
			this.render(getJsonSerializer().serialize(
					new JsonStore(companyInfo)));
		} else {
			renderMessage(false, "有正在申请中的申请项，不可新建");
		}
	}

	/**
	 * 修改公司信息 : 备案管理-》企业信息
	 * 
	 * @throws Exception
	 */
	public void saveCompanyInfo() throws Exception {
		CompanyInfo companyInfo = companyInfoService.saveCompanyInfo(this
				.getRequestBean());
		if (null == companyInfo) {
			renderMessage(false, "企业正在审批或已经通过");
		} else {
			if (logger.isDebugEnabled()) {
				CompanyUtils.printRequestInfo();
				CompanyUtils.printResponseInfo(companyInfo);
			}
			this.render(getJsonSerializer().serialize(
					new JsonStore(companyInfo)));
		}
	}

	/**
	 * 返回登录用户公司的公司地区名称和公司名称 ： 企业备案->专业技术人员->新增
	 */
	public void getEntNameAndRegion() {
		Company company = userCrudService.getLoginUser().getCompany();
		if (null != company) {

			ComNameRegionVO vo = new ComNameRegionVO(company.getName(), company
					.getRegionFullName());

			render(vo);
		} else {
			renderMessage(false, "请先注册企业信息");
		}
	}

	/**
	 * 提交公司信息 ： 企业备案->企业信息
	 * 
	 * @throws Exception
	 */
	public void submitCompanyInfo() throws Exception {
		CompanyInfo companyInfo = companyInfoService.get(getIdParam());
		if (null == companyInfo) {
			renderMessage(false, "请先保存企业信息");
		} else {
			Long ret = approval4RegisterService.submitCompanyInfo(companyInfo
					.getId());
			if (null == ret) {
				renderMessage(false, "备案处理中，请稍后提交");
			} else if (0l == ret.longValue()) {
				renderMessage(false, "已审批通过不能再提交");
			} else {
				renderSuccess();
			}
		}
	}

	// --------------- 最新代码分隔 ---------------

	/**
	 * 保存且提交企业信息
	 */
	public void saveSubmitComInfo() throws Exception {
		CompanyInfo companyInfo = companyInfoService.saveCompanyInfo(this
				.getRequestBean());
		if (null == companyInfo) {
			renderMessage(false, "企业正在等待审批或审批中");
		} else {
			Long ret = approval4RegisterService.submitCompanyInfo(companyInfo
					.getId());
			if (null == ret) {
				renderMessage(false, "备案处理中，请稍后提交");
			} else {
				renderMessage(true, "保存提交成功");
			}
		}
	}

	/**
	 * 根据企业名称模糊查询企业IDS
	 */
	public void findComIdsByNameCN() throws Exception {
		String companyName = Struts2Utils.getParameter("companyName");
		List<Long> ids = companyInfoService.findComIdsByNameCN(companyName);
		render(new JsonStore(ids));
	}

	// 统计通过县、市审批的公司
	public void statsPassAllCompanies() throws Exception {
		String beginDateStr = Struts2Utils.getParameter("beginDate");
		String endDateStr = Struts2Utils.getParameter("endDate");
		Date beginDate = CompanyUtils.isEmpty(beginDateStr) ? null
				: CompanyUtils.parseDate(beginDateStr);
		Date endDate = CompanyUtils.isEmpty(endDateStr) ? null : CompanyUtils
				.parseDate(endDateStr);
		String loginUserName = SpringSecurityUtils.getCurrentUserName();
		User user = userCrudService.findUserByLoginName(loginUserName);

		String regionCode = user.getRegion().getCode();
		Object[] arr = new Object[3];
		CompanyInfo companyInfo = new CompanyInfo();
		companyInfo.setCompany(new Company());
		companyInfo.getCompany().setRegion(new Region());
		companyInfo.getCompany().getRegion().setCode(regionCode);
		companyInfo.setStatus("2");
		arr[0] = companyInfo;
		arr[1] = beginDate;
		arr[2] = endDate;

		Map<Date, Integer> map = companyInfoService
				.findCompanyInfosByCondition(arr);
	}

	// 通过县、市审批的公司
	public void passAllCompanies() throws Exception {
		String beginDateStr = Struts2Utils.getParameter("beginDate");
		String endDateStr = Struts2Utils.getParameter("endDate");
		Date beginDate = CompanyUtils.isEmpty(beginDateStr) ? null
				: CompanyUtils.parseDate(beginDateStr);
		Date endDate = CompanyUtils.isEmpty(endDateStr) ? null : CompanyUtils
				.parseDate(endDateStr);
		String loginUserName = SpringSecurityUtils.getCurrentUserName();
		User user = userCrudService.findUserByLoginName(loginUserName);

		String regionCode = user.getRegion().getCode();
		Object[] arr = new Object[3];
		CompanyInfo companyInfo = new CompanyInfo();
		companyInfo.setCompany(new Company());
		companyInfo.getCompany().setRegion(new Region());
		companyInfo.getCompany().getRegion().setCode(regionCode);
		companyInfo.setStatus("2");
		arr[0] = companyInfo;
		arr[1] = beginDate;
		arr[2] = endDate;

		List<CompanyInfo> companyInfos = companyInfoService.findCompanies(arr);
		this.render(companyInfos);
	}

	/**
	 * 根据公司id返回公司证章集合
	 */
	public void listBadge() {
		List<CompanyBadge> companyBadges = null;
		try { // 前台传入的为公司id
			CompanyInfo companyInfo = companyInfoService.get(getIdParam());
			companyBadges = companyInfo.getCompanyBadge();
		} catch (Exception e) {
			// 前台传入的是申请项的id
			companyBadges = approval4RegisterService.get(getIdParam())
					.getCompanyInfo().getCompanyBadge();
		}

		List<BadgeVO> vos = new ArrayList<BadgeVO>();

		for (CompanyBadge i : companyBadges) {
			BadgeVO vo = new BadgeVO();
			vo.setId(i.getId());
			vo.setTname(i.getName());// 证件名称
			vo.setCreateDate(i.getFile().getCreateDate());
			vo.setFileId(i.getFile().getId());
			vos.add(vo);
		}
		if (logger.isDebugEnabled()) {
			CompanyUtils.printRequestInfo();
			CompanyUtils.printResponseInfo(vos);
		}
		this.render(getJsonSerializer().serialize(new JsonStore(vos)));
	}

	/**
	 * 根据审批项id返回公司证章集合
	 */
	public void listBadgeByAppId() {
		List<CompanyBadge> companyBadges = null;
		try { // 前台传入的为公司id
			CompanyInfo companyInfo = approval4RegisterService
					.get(getIdParam()).getCompanyInfo();
			companyBadges = companyInfo.getCompanyBadge();
		} catch (Exception e) {
			// 前台传入的是申请项的id
			companyBadges = approval4RegisterService.get(getIdParam())
					.getCompanyInfo().getCompanyBadge();
		}

		List<BadgeVO> vos = new ArrayList<BadgeVO>();

		for (CompanyBadge i : companyBadges) {
			BadgeVO vo = new BadgeVO();
			vo.setId(i.getId());
			vo.setTname(i.getName());// 证件名称
			vo.setCreateDate(i.getFile().getCreateDate());
			vo.setFileId(i.getFile().getId());
			vos.add(vo);
		}
		if (logger.isDebugEnabled()) {
			CompanyUtils.printRequestInfo();
			CompanyUtils.printResponseInfo(vos);
		}
		this.render(getJsonSerializer().serialize(new JsonStore(vos)));
	}

	// 判断是否有审批中的记录
	public void newBtnEnabled() throws Exception {
		boolean flag = false;
		Company company = userCrudService.getLoginUser().getCompany();
		// 没有注册企业信息
		if (null == company) {
			flag = true;
		} else { // 是否有正在处理的审批项
			flag = approval4RegisterService
					.isSubmitByCompanyId(company.getId());
		}
		if (flag) {
			this.renderSuccess();
		} else {
			this.renderFailure();
		}
	}
}
