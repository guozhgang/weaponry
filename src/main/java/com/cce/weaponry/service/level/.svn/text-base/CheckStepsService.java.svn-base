package com.cce.weaponry.service.level;

import java.util.Iterator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import sun.security.util.Debug;

import com.cce.modules.orm.Page;
import com.cce.modules.orm.PropertyFilter;
import com.cce.modules.service.CrudServiceInterface;
import com.cce.weaponry.dao.level.CheckStepsDao;
import com.cce.weaponry.entity.level.CheckSteps;

@Service
@Transactional
public class CheckStepsService implements CrudServiceInterface<CheckSteps> {

	@Autowired
	private CheckStepsDao checkStepsDao;

	// 根据审批ID删除审批步骤
	public void deletesteps(Long appID) {
		String hql = "delete from CheckSteps c where c.approval='" + appID
				+ "'";
		sun.security.util.Debug.println("根据审批ID删除审批步骤 ", hql);
		checkStepsDao.batchExecute(hql.toString());
	}

	/**
	 * 修改审批(审批分级)
	 * 
	 * @param steps
	 */
	public void updateStatus(List<CheckSteps> steps) {
		for (Iterator iterator = steps.iterator(); iterator.hasNext();) {
			CheckSteps checkSteps = (CheckSteps) iterator.next();
			StringBuffer updateSql = new StringBuffer("update CheckSteps c set c.checked =").append(checkSteps.isChecked()).append(" where c.id =")
					.append(checkSteps.getId());
			sun.security.util.Debug.println("修改审批步骤 ", updateSql.toString());
			checkStepsDao.batchExecute(updateSql.toString());
		}
	}

	/**
	 * 保存审批步骤
	 * 
	 * @param appId
	 * @param steps
	 */
	public void saveSteps(Long appId, String steps) {
		String[] stepIds = steps.split(",");
		if (stepIds.length == 0)
			return;
		deletesteps(appId);
		StringBuffer insertsql = new StringBuffer("insert into CHECK_STEPS( approval, checked , position , step ) values(").append(appId).append(",")
				.append(false);
		for (int i = 0; i < stepIds.length; i++) {
			String stepid = stepIds[i];
			StringBuffer sql = new StringBuffer(insertsql);
			sql.append(",").append(i + 1).append(",").append(stepid).append(")");
			checkStepsDao.getSession().createSQLQuery(sql.toString()).executeUpdate();
		}
		Debug.println("保存审批步骤-评审配置", insertsql.toString());
	}

	/**
	 * 根据审批ID查看审批步骤
	 * 
	 * @param appid
	 * @return
	 */
	@Transactional(readOnly = true)
	public List<CheckSteps> getStepsIsChecked(Long appid) {
		String hql = "from CheckSteps c where c.approval='"
				+ appid + "' order by c.position";
		Debug.println("根据审批查看审批步骤 ", hql);
		return checkStepsDao.find(hql.toString());
	}

	/**
	 * 根据审批ID查看是否有审批没通过的
	 * 
	 * @param appid
	 * @return
	 */
	@Transactional(readOnly = true)
	public Boolean isFlowPassed(Long appid) {
		String hql = "select count(c.id) from CheckSteps c where c.approval='" + appid + "' and c.checked is false";
		List l = checkStepsDao.find(hql.toString());
		Debug.println("查看审批是否有没通过的步骤", hql);
		return l.get(0).equals(Long.valueOf(0));
	}

	/**
	 * 根据审批ID查找审批步骤
	 */
	@Transactional(readOnly = true)
	public List getStepsByAppId(Long appid) {
		String hql = "select new Map(c.id as id,c.step.id as stepId,c.step.value as stepValue,c.checked as status,c.position as position,c.approval.team.id as groupId) from CheckSteps c where c.approval='"
				+ appid + "' order by c.position";
		Debug.println("根据审批ID查找审批步骤", hql);
		return checkStepsDao.find(hql.toString());
	}
	public void delete(List<Long> ids) {
		checkStepsDao.delete(ids);
	}

	@Transactional(readOnly = true)
	public CheckSteps get(Long id) {
		return checkStepsDao.get(id);
	}

	@Transactional(readOnly = true)
	public List<CheckSteps> list(List<PropertyFilter> filters) {
		return checkStepsDao.find(filters);
	}

	@Transactional(readOnly = true)
	public Page<CheckSteps> list(Page<CheckSteps> page, List<PropertyFilter> filters) {
		return checkStepsDao.findPage(page, filters);
	}

	public void save(CheckSteps entity) {
		checkStepsDao.save(entity);
	}

}
