package com.cce.weaponry.web.credit;

import java.util.List;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.springframework.beans.factory.annotation.Autowired;

import com.cce.modules.service.CrudServiceInterface;
import com.cce.modules.web.struts2.Struts2Utils;
import com.cce.weaponry.entity.credit.ApproveCreditDetail;
import com.cce.weaponry.service.credit.ApproveCreditDetailService;
import com.cce.weaponry.web.JsonCrudActionSupport;

@Namespace("/record")
@Action("approveCreditDetail")
public class ApproveCreditDetailAction extends
		JsonCrudActionSupport<ApproveCreditDetail> {

	@Autowired
	private ApproveCreditDetailService approveCreditDetailService;

	@Override
	public CrudServiceInterface<ApproveCreditDetail> getCrudService() {
		return approveCreditDetailService;
	}

	/**
	 * 根据公司id，公司等级id，公司等级申请项id 取得审批历史
	 * 
	 * @throws Exception
	 */
	public void findApproveCreditDetailsByCondition() throws Exception {
		Long companyInfoId = Long.parseLong(Struts2Utils
				.getParameter("companyInfoId"));
		Long companyCreditId = Long.parseLong(Struts2Utils
				.getParameter("companyCreditId"));
		Long approval4CreditId = Long.parseLong(Struts2Utils
				.getParameter("approval4CreditId"));
		List<ApproveCreditDetail> approvalCreditDetails = approveCreditDetailService
				.findApproveCreditDetailsByCondition(companyInfoId,
						companyCreditId, approval4CreditId);
		this.render(approvalCreditDetails);
	}

}
