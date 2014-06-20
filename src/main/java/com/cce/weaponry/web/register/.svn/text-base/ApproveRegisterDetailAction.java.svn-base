package com.cce.weaponry.web.register;

import java.util.ArrayList;
import java.util.List;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.springframework.beans.factory.annotation.Autowired;

import com.cce.modules.service.CrudServiceInterface;
import com.cce.modules.web.json.JsonStore;
import com.cce.weaponry.entity.register.ApproveRegisterDetail;
import com.cce.weaponry.service.common.CompanyUtils;
import com.cce.weaponry.service.register.ApproveRegisterDetailService;
import com.cce.weaponry.service.register.CompanyInfoService;
import com.cce.weaponry.service.security.UserCrudService;
import com.cce.weaponry.web.JsonCrudActionSupport;
import com.cce.weaponry.web.vo.register.ApprovalRegisterDetailVO;

@Namespace("/record")
@Action("approveRegisterDetail")
public class ApproveRegisterDetailAction extends
		JsonCrudActionSupport<ApproveRegisterDetail> {

	@Autowired
	private ApproveRegisterDetailService approveRegisterDetailService;

	@Autowired
	private CompanyInfoService companyInfoService;

	@Autowired
	private UserCrudService userCrudService;

	@Override
	public CrudServiceInterface<ApproveRegisterDetail> getCrudService() {
		return approveRegisterDetailService;
	}

	// ---------- 最新代码分隔 -------------

	/**
	 * 根据公司信息id得到审批项历史 : 备案管理-》企业信息
	 */
	@Override
	public void list() throws Exception {
		List<ApproveRegisterDetail> list = approveRegisterDetailService
				.findApprovalHistoryByCompanInfoId(getIdParam());

		// 封装到实体
		List<ApprovalRegisterDetailVO> vos = new ArrayList<ApprovalRegisterDetailVO>();

		for (ApproveRegisterDetail i : list) {
			ApprovalRegisterDetailVO vo = new ApprovalRegisterDetailVO();

			vo.setComment(i.getComment());
			vo.setCreateBy(i.getCreateBy());
			vo.setCreateDate(i.getCreateDate().getTime());
			vo.setId(i.getId());
			vo.setRa_id(i.getApproval().getId());
			vo.setRole(i.getRole());
			vo.setType(i.getType());

			vos.add(vo);
		}
		if (logger.isDebugEnabled()) {
			CompanyUtils.printRequestInfo();
			CompanyUtils.printResponseInfo(vos);
		}
		render(new JsonStore(vos));

	}

	/**
	 * 查询待处理任务审批历史 根据审批id查询公司信息审批历史
	 * 
	 * @throws Exception
	 */
	public void listByAppId() throws Exception {
		List<ApproveRegisterDetail> list = approveRegisterDetailService
				.findApprovalHistoryByApprovalId(getIdParam());

		// 封装到实体
		List<ApprovalRegisterDetailVO> vos = new ArrayList<ApprovalRegisterDetailVO>();

		for (ApproveRegisterDetail i : list) {
			ApprovalRegisterDetailVO vo = new ApprovalRegisterDetailVO();

			vo.setComment(i.getComment());
			vo.setCreateBy(i.getCreateBy());
			vo.setCreateDate(i.getCreateDate().getTime());
			vo.setId(i.getId());
			vo.setRa_id(i.getApproval().getId());
			vo.setRole(i.getRole());
			vo.setType(i.getType());

			vos.add(vo);
		}

		if (logger.isDebugEnabled()) {
			CompanyUtils.printRequestInfo();
			CompanyUtils.printResponseInfo(vos);
		}

		render(new JsonStore(vos));

	}

	// ---------- 最新代码分隔 -------------

}
