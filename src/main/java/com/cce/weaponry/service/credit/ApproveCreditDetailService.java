package com.cce.weaponry.service.credit;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cce.modules.orm.Page;
import com.cce.modules.orm.PropertyFilter;
import com.cce.modules.service.CrudServiceInterface;
import com.cce.weaponry.dao.credit.ApproveCreditDetailDao;
import com.cce.weaponry.entity.credit.ApproveCreditDetail;

@Service
@Transactional
public class ApproveCreditDetailService implements
		CrudServiceInterface<ApproveCreditDetail> {

	@Autowired
	private ApproveCreditDetailDao approveCreditDetailDao;

	public void delete(List<Long> ids) {
		approveCreditDetailDao.delete(ids);
	}

	public ApproveCreditDetail get(Long id) {
		return approveCreditDetailDao.get(id);
	}

	public List<ApproveCreditDetail> list(List<PropertyFilter> filters) {
		return approveCreditDetailDao.find(filters);
	}

	public Page<ApproveCreditDetail> list(Page<ApproveCreditDetail> page,
			List<PropertyFilter> filters) {
		return approveCreditDetailDao.findPage(page, filters);
	}

	public void save(ApproveCreditDetail entity) {
		approveCreditDetailDao.save(entity);
	}

	public List<ApproveCreditDetail> findApproveCreditDetailsByCondition(
			Long companyInfoId, Long companyCreditId, Long approval4CreditId) {
		String hql = " from ApproveCreditDetail a where 1=1 ";
		if (null != companyInfoId) {
			hql += " and a.approval.companyCredit.companyInfo.id="
					+ companyInfoId + " ";
		}
		if (null != companyCreditId) {
			hql += " and a.approval.companyCredit.id=" + companyCreditId + " ";
		}
		if (null != approval4CreditId) {
			hql += " and a.approval.id=" + approval4CreditId + " ";
		}
		return approveCreditDetailDao.find(hql);
	}

}
