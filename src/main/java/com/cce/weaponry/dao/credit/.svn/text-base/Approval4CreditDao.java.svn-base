package com.cce.weaponry.dao.credit;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.cce.modules.orm.hibernate.HibernateDao;
import com.cce.weaponry.entity.credit.Approval4Credit;

@Repository
public class Approval4CreditDao extends HibernateDao<Approval4Credit, Long> {

	public List<Approval4Credit> findApproval4CreditsByComTemId(Long companyId,
			Long templateId) {
		String hql = "from Approval4Credit i where i.companyCredit.company.id="
				+ companyId + " and i.companyCredit.template.id=" + templateId;
		return find(hql);
	}

	public void setIsActiveByCompanyInfoId(boolean isActive, Long companyInfoId) {
		String hql = " update Approval4Credit a set a.isActive="
				+ (isActive ? 1 : 0) + " where a.companyCredit.companyInfo.id="
				+ companyInfoId;
		super.createQuery(hql).executeUpdate();
	}

	public Approval4Credit getWaitSubmitApprovalCreditByCreditId(Long creditId) {
		String hql = "from Approval4Credit a where (a.netstatus=null or a.netstatus='REJECTED' or a.scenestatus='REJECTED') and a.companyCredit.id="
				+ creditId;
		List list = super.find(hql);
		return list.size() == 0 ? null : (Approval4Credit) list.get(0);
	}

	public void setIsActiveByCreditId(boolean isActive, Long companyCreditId) {
		String hql = " update Approval4Credit a set a.isActive="
				+ (isActive ? 1 : 0) + " where a.companyCredit.id="
				+ companyCreditId;
		super.createQuery(hql).executeUpdate();
	}

	public List<Approval4Credit> findApproval4CreditsByComId(Long companyId) {
		String hql = "from Approval4Credit i where i.companyCredit.company.id="
				+ companyId;
		return find(hql);
	}

}
