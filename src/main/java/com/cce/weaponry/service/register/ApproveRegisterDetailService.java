package com.cce.weaponry.service.register;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cce.modules.orm.Page;
import com.cce.modules.orm.PropertyFilter;
import com.cce.modules.service.CrudServiceInterface;
import com.cce.weaponry.dao.register.ApproveRegisterDetailDao;
import com.cce.weaponry.entity.register.ApproveRegisterDetail;

@Service
@Transactional
public class ApproveRegisterDetailService implements CrudServiceInterface<ApproveRegisterDetail> {

	@Autowired
	private ApproveRegisterDetailDao approveRegisterDetailDao;

	public void delete(List<Long> ids) {
		approveRegisterDetailDao.delete(ids);
	}

	public ApproveRegisterDetail get(Long id) {
		return approveRegisterDetailDao.get(id);
	}

	public List<ApproveRegisterDetail> list(List<PropertyFilter> filters) {
		return approveRegisterDetailDao.find(filters);
	}

	public Page<ApproveRegisterDetail> list(Page<ApproveRegisterDetail> page, List<PropertyFilter> filters) {
		return approveRegisterDetailDao.findPage(page, filters);
	}

	public void save(ApproveRegisterDetail entity) {
		approveRegisterDetailDao.save(entity);
	}

	/**
	 * 根据审批项id得到相应的审批项历史
	 * 
	 * @param id
	 *            审批项id
	 * @return 相应的审批项历史
	 */
	public List<ApproveRegisterDetail> findApprovalHistoryByApprovalId(Long id) {
		StringBuilder hql = new StringBuilder(
				" from ApproveRegisterDetail r where r.approval.companyInfo.id in ( select i.id from CompanyInfo i left join i.companyRegister a where a.id=");
		hql.append(id).append(" ) order by r.createDate desc ");
		return approveRegisterDetailDao.find(hql.toString());
	}

	/**
	 * 根据公司id得到审批项历史
	 * 
	 * @param id
	 *            公司id
	 * @return 审批项历史
	 */
	public List<ApproveRegisterDetail> findApprovalHistoryByCompanInfoId(Long id) {
		String hql = " from ApproveRegisterDetail i where i.approval.companyInfo.id="
				+ id + " order by i.createDate desc ";
		return approveRegisterDetailDao.find(hql);
	}


}
