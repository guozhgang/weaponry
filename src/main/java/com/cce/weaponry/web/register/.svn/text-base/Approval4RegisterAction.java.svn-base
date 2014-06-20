package com.cce.weaponry.web.register;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.springframework.beans.factory.annotation.Autowired;

import com.cce.modules.orm.IdEntity;
import com.cce.modules.orm.Page;
import com.cce.modules.orm.hibernate.HibernateWebUtils;
import com.cce.modules.service.CrudServiceInterface;
import com.cce.modules.web.json.JsonStore;
import com.cce.modules.web.struts2.Struts2Utils;
import com.cce.weaponry.entity.dict.DictApprovalStatus;
import com.cce.weaponry.entity.register.Approval4Register;
import com.cce.weaponry.entity.register.CompanyInfo;
import com.cce.weaponry.entity.security.User;
import com.cce.weaponry.service.CommonEntityService;
import com.cce.weaponry.service.common.CompanyUtils;
import com.cce.weaponry.service.common.RegionManagementService;
import com.cce.weaponry.service.register.Approval4RegisterService;
import com.cce.weaponry.service.register.CompanyInfoService;
import com.cce.weaponry.service.security.UserCrudService;
import com.cce.weaponry.web.JsonCrudActionSupport;
import com.cce.weaponry.web.vo.register.Cert4CompanySearchVO;
import com.cce.weaponry.web.vo.register.Cert4CompanyStatsVO;
import com.cce.weaponry.web.vo.register.SearchRecordVO;
import com.cce.weaponry.web.vo.register.StatsCompany;
import com.cce.weaponry.web.vo.register.UserVO;

import flexjson.JSONDeserializer;

@Namespace("/record")
@Action("approval4Register")
public class Approval4RegisterAction extends
		JsonCrudActionSupport<Approval4Register> {
	@Autowired
	private Approval4RegisterService approval4RegisterService;

	@Autowired
	private RegionManagementService regionManagementService;

	@Autowired
	private CommonEntityService commonService;

	@Autowired
	private UserCrudService userCrudService;
	@Autowired
	private CompanyInfoService companyInfoService;

	@Override
	public CrudServiceInterface<Approval4Register> getCrudService() {
		return approval4RegisterService;
	}

	// -------------- 最新代码分隔 ---------------------

	/**
	 * 县市级用户登录：企业备案：待处理任务
	 */
	@Override
	public void list() throws Exception {
		User loginUser = userCrudService.getLoginUser();
		Page<Approval4Register> approvals = approval4RegisterService
				.findApprovalsByCondition(this.setupPage(), HibernateWebUtils
						.buildPropertyFilters(Struts2Utils.getRequest()),
						loginUser);
		List<Approval4Register> list = new ArrayList<Approval4Register>();
		for (Approval4Register i : approvals.getResult()) {
			CompanyInfo com = i.getCompanyInfo();

			i.setRegion(com.getCompany().getRegionFullName());

			com.setStatus(((DictApprovalStatus) commonService
					.getDictEntityByCode(DictApprovalStatus.class, com
							.getStatus())).getValue());
			com.setCompany(null);
			i.setCompanyInfo(com);

			list.add(i);
		}
		approvals.setResult(list);

		if (logger.isDebugEnabled()) {
			CompanyUtils.printRequestInfo();
			CompanyUtils.printResponseInfo(approvals);
		}

		this.render(new JsonStore(approvals));
	}

	/**
	 * 根据条件进行备案查询
	 * 
	 * @throws Exception
	 */
	public void search() throws Exception {
		Cert4CompanySearchVO condition = getSearchVO();
		Page page = companyInfoService.searchApprovalRegistersByCondition(
				CompanyUtils.setupPage(), condition);
		List<CompanyInfo> list = page.getResult();
		List<SearchRecordVO> vos = new ArrayList<SearchRecordVO>();
		for (int i = 0; i < list.size(); i++) {
			CompanyInfo com = (CompanyInfo) list.get(i);
			SearchRecordVO vo = new SearchRecordVO();

			vo.setCreateDate(com.getCreateDate());
			vo.setId(com.getId());
			vo.setName(com.getNameCN());
			vo.setOrgCode(com.getOrgCode());
			Object obj = commonService.getDictEntityByCode(
					DictApprovalStatus.class, com.getStatus());
			if (null != obj) {
				vo.setStatus(((DictApprovalStatus) (obj)).getValue());
			}
			vo.setTaxCert(com.getTaxCert());
			vo.setUpdateDate(com.getUpdateDate());

			vos.add(vo);
		}

		page.setResult(vos);

		if (logger.isDebugEnabled()) {
			CompanyUtils.printRequestInfo();
			CompanyUtils.printResponseInfo(vos);
		}

		this.render(new JsonStore(page));
	}


	// -------------- 最新代码分隔 ---------------------

	/**
	 * 根据公司id得到相应的申请项
	 * 
	 * @throws Exception
	 */
	public void getActiveApprovalByCompanyId() throws Exception {
		Long companyInfoId = Long.parseLong(Struts2Utils
				.getParameter("companyInfoId"));
		Approval4Register approval = approval4RegisterService
				.getActiveApprovalByCompanyId(companyInfoId);
		this.render(new JsonStore(approval));
	}

	/**
	 * 网上通过 审批项，并且添加审批项历史
	 * 
	 * @throws Exception
	 */
	public void netPass() throws Exception {

		// 接收数据
		// data 参数
		// 数据[id] 例如 data=[1,2,3,4]

		List<Long> ids = getIdArrayParam();
		for (int i = 0; i < ids.size(); i++) {
			Long approvalId = ids.get(i);
			Approval4Register approval4Register = approval4RegisterService
					.get(approvalId);

			User user = userCrudService.getLoginUser();
			// 处理人
			String dealBy = user.getName();
			// 审批意见
			String opnion = "网上通过";
			// 判断登录用户
			if ("县级用户".equals(user.getRole().getName())) {
				if ("PASSED".equals(approval4Register.getCnstatus())) {
					renderMessage(false, "此申请已经网上通过");
					return;
				}
				if ("REJECTED".equals(approval4Register.getCnstatus())) {
					renderMessage(false, "此申请已经网上退回");
					return;
				}
				approval4RegisterService.passCounty(approvalId, dealBy, opnion);
			} else if ("市级用户".equals(user.getRole().getName())) { // 市级登录
				if ("PASSED".equals(approval4Register.getCstatus())) {
					renderMessage(false, "此申请已经网上通过");
					return;
				}
				if ("REJECTED".equals(approval4Register.getCstatus())) {
					renderMessage(false, "此申请已经网上退回");
					return;
				}
				// 进行通过市级处理的一些操纵
				approval4RegisterService.passCity(approvalId, dealBy, opnion);
			}
		}
		renderSuccess();
	}

	/**
	 * 现场通过审批项，且记录审批项历史
	 * 
	 * @throws Exception
	 */
	public void sceenPass() throws Exception {
		// 接收数据
		// data 参数
		// 数据[id] 例如 data=[1,2,3,4]

		List<Long> ids = getIdArrayParam();
		for (int i = 0; i < ids.size(); i++) {
			Long approvalId = ids.get(i);

			Approval4Register approval = approval4RegisterService
					.get(approvalId);

			User user = userCrudService.getLoginUser();
			// 处理人
			String dealBy = user.getName();
			// 审批意见
			String opnion = "现场通过";
			// 判断登录用户
			if ("县级用户".equals(user.getRole().getName())) {
				if ("PASSED".equals(approval.getCpstatus())) {
					renderMessage(false, "此申请已经纸质通过");
					return;
				}
				if ("REJECTED".equals(approval.getCpstatus())) {
					renderMessage(false, "此申请已经纸质退回");
					return;
				}
				// 进行县级现场通过处理
				approval4RegisterService.scenePassCounty(approvalId, dealBy,
						opnion);
			}
		}
		renderSuccess();
	}

	/**
	 * 网上退回审批项，且记录审批项历史
	 * 
	 * @throws Exception
	 */
	public void netBack() throws Exception {
		// 接收数据
		// data 参数 有id，comment原因
		// 例如 data={id:[1,3,2,3],comment:'退回原因'}
		// 审批意见
		String opnion = this.getCauseParam();

		User user = userCrudService.getLoginUser();
		// 处理人
		String dealBy = user.getName();

		List<Long> ids = getIdArrayParam();
		for (int i = 0; i < ids.size(); i++) {
			Long approvalId = ids.get(i);
			Approval4Register approval4Register = approval4RegisterService
					.get(approvalId);
			// 判断登录用户
			if ("县级用户".equals(user.getRole().getName())) {
				// 防止网上通过的再次执行网上通过
				if ("PASSED".equals(approval4Register.getCnstatus())) {
					renderMessage(false, "此申请已经网上通过");
					return;
				}
				// 防止网上退回的再次执行网上退回
				if ("REJECTED".equals(approval4Register.getCnstatus())) {
					renderMessage(false, "此申请已经网上退回");
					return;
				}
				// 执行县级现场未通过
				approval4RegisterService.notPassCounty(approvalId, dealBy,
						opnion);
			} else if ("市级用户".equals(user.getRole().getName())) { // 市级登录
				// 防止已经通过的执行退回操作
				if ("PASSED".equals(approval4Register.getCstatus())) {
					renderMessage(false, "此申请已经网上通过");
					return;
				}
				// 防止已经通过的再次执行退回操作
				if ("REJECTED".equals(approval4Register.getCstatus())) {
					renderMessage(false, "此申请已经网上退回");
					return;
				}
				// 进行市级退回操作
				approval4RegisterService
						.notPassCity(approvalId, dealBy, opnion);
			}
		}
		renderSuccess();
	}

	public String getCauseParam() {
		return Struts2Utils.getParameter("cause");
	}

	/**
	 * 现场退回审批项，且记录历史
	 * 
	 * @throws Exception
	 */
	public void sceenBack() throws Exception {
		// 接收数据
		// data 参数 有id，comment原因
		// 例如 data={id:[1,3,2,3],comment:'退回原因'}
		// 审批意见
		String opnion = this.getCauseParam();

		User user = userCrudService.getLoginUser();
		// 处理人
		String dealBy = user.getName();

		List<Long> ids = getIdArrayParam();
		for (int i = 0; i < ids.size(); i++) {
			Long approvalId = ids.get(i);
			Approval4Register approval = approval4RegisterService
					.get(approvalId);
			// 判断登录用户
			if ("县级用户".equals(user.getRole().getName())) {
				if ("PASSED".equals(approval.getCpstatus())) {
					renderMessage(false, "此申请已经纸质通过");
					return;
				}
				if ("REJECTED".equals(approval.getCpstatus())) {
					renderMessage(false, "此申请已经纸质退回");
					return;
				}
				approval4RegisterService.sceneNotPassCounty(approvalId, dealBy,
						opnion);
			}
		}
		renderSuccess();
	}

	/**
	 * 封装页面传入的搜索条件为对象
	 * 
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public Cert4CompanySearchVO getSearchVO() {
		String data = Struts2Utils.getParameter(JsonStore.RootProperty);
		if (data == null)
			return null;
		JSONDeserializer deserializer = this.getJsonDeserializer();
		JSONDeserializer<IdEntity> jsonDeserializer = deserializer.use(null,
				Cert4CompanySearchVO.class);
		return (Cert4CompanySearchVO) jsonDeserializer.deserialize(data);
	}

	/**
	 * 统计方法需封装对象
	 * 
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public Cert4CompanyStatsVO getStatsVO() {
		String data = Struts2Utils.getParameter(JsonStore.RootProperty);
		if (data == null)
			return null;
		JSONDeserializer deserializer = this.getJsonDeserializer();
		JSONDeserializer<IdEntity> jsonDeserializer = deserializer.use(null,
				Cert4CompanyStatsVO.class);
		return (Cert4CompanyStatsVO) jsonDeserializer.deserialize(data);
	}

	/**
	 * 根据条件进行备案统计
	 * 
	 * @throws Exception
	 */
	public void statistics() throws Exception {
		// 得到封装对象
		Cert4CompanyStatsVO condition = getStatsVO();

		// 查询统计数据
		Map<String, Long> coms = companyInfoService.statsCompanies(condition);

		// 得到迭代变量
		Iterator<String> itRegion = coms.keySet().iterator();
		Iterator<Long> itCount = coms.values().iterator();

		// 返回前台的集合
		List<StatsCompany> list = new ArrayList<StatsCompany>();

		// 封装数据
		for (int i = 0; i < coms.size(); i++) {
			StatsCompany ret = new StatsCompany();

			ret.setCity(itRegion.next());// regionManagementService.getNameById(itRegion.next()));
			ret.setCount(itCount.next());

			list.add(ret);
		}
		// 返回前台

		if (logger.isDebugEnabled()) {
			CompanyUtils.printRequestInfo();
			CompanyUtils.printResponseInfo(list);
		}

		render(new JsonStore(list));
	}

	/**
	 * 返回登录用户的regionId
	 */
	public void getRegionId() {
		/**
		 * 根据当前登录用户，返回所在区域id
		 * 
		 * 格式如下 //
		 * sb.append("{region_id:").append(loginUser.getRegion().getId())
		 * .append( // "}"); // // this.render(sb.toString());
		 */

		StringBuffer sb = new StringBuffer();

		User loginUser = userCrudService.getLoginUser();

		UserVO vo = new UserVO(loginUser.getRegion().getId());

		render(vo);
	}

}
