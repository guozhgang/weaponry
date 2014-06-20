package com.cce.weaponry.service.level;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import sun.security.util.Debug;

import com.cce.modules.orm.Page;
import com.cce.modules.orm.PropertyFilter;
import com.cce.modules.service.CrudServiceInterface;
import com.cce.weaponry.dao.level.ApproveLevelDetailDao;
import com.cce.weaponry.entity.level.ApproveLevelDetail;

@Service
@Transactional
public class ApproveLevelDetailService implements CrudServiceInterface<ApproveLevelDetail> {

	@Autowired
	private ApproveLevelDetailDao approveLevelDetailDao;

	// 根据审批ID 查看审批历史
	@Transactional(readOnly = true)
	public List<ApproveLevelDetail> getAll(Long appId) {
		String hql = "from ApproveLevelDetail a where a.approval='" + appId
				+ "' order by a.createDate desc";
		sun.security.util.Debug.println("根据分级申请的审批ID查看审批历史", hql);
		return approveLevelDetailDao.find(hql.toString());
	}

	/**
	 * 删除审批等级信息
	 */
	public void delete(Long ids) {
		String hql = "";
		// if (ids.size() > 0) {
		// for (int i = 0; i < ids.size(); i++) {
		hql = "delete ApproveLevelDetail a where a.approval.companyLevel='"
				+ ids + "'";
		// }
		sun.security.util.Debug.println("根据申请分级ID删除审批历史", hql);
		approveLevelDetailDao.batchExecute(hql.toString());
		// }

	}

	/**
	 * 删除审批企业等级历史记录
	 */
	public void delete(List<Long> ids) {
		if (ids.size() > 0) {
		approveLevelDetailDao.delete(ids);}
	}

	/**
	 * 查看审批企业等级历史
	 */
	public ApproveLevelDetail get(Long id) {
		return approveLevelDetailDao.get(id);
	}

	/**
	 * 查看审批历史记录
	 */
	public List<ApproveLevelDetail> list(List<PropertyFilter> filters) {
		return approveLevelDetailDao.find(filters);
	}

	public Page<ApproveLevelDetail> list(Page<ApproveLevelDetail> page, List<PropertyFilter> filters) {
		return approveLevelDetailDao.findPage(page, filters);
	}

	/**
	 * 保存审批企业等级历史记录
	 */
	public void save(ApproveLevelDetail entity) {
		approveLevelDetailDao.save(entity);
	}

	// 保存审批历史
	public void saveApproveLevelDetail(ApproveLevelDetail entity) {
		StringBuffer insertsql = new StringBuffer("insert into APPROVE_LEVEL_DETAIL( al_id , type , comment , create_by , create_date ) values(")
				.append(entity.getApproval().getId()).append(",'").append(entity.getType()).append("','").append(entity.getComment()).append("','")
				.append(entity.getCreateBy()).append("','").append(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date())).append("')");
		Debug.println("保存分级申请的审批历史 ", insertsql.toString());
		approveLevelDetailDao.getSession().createSQLQuery(insertsql.toString()).executeUpdate();
	}
}
