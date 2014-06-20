package com.cce.weaponry.service.level;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cce.modules.orm.Page;
import com.cce.modules.orm.PropertyFilter;
import com.cce.modules.service.CrudServiceInterface;
import com.cce.weaponry.dao.level.Approval4LevelDao;
import com.cce.weaponry.entity.level.Approval4Level;
import com.cce.weaponry.entity.level.ApproveLevelDetail;
import com.cce.weaponry.entity.level.CheckSteps;

@Service
@Transactional
public class Approval4LevelService implements CrudServiceInterface<Approval4Level> {

	@Autowired
	private Approval4LevelDao approval4LevelDao;

	/**
	 * 根据申请分级ID查看审批
	 * 
	 * @param id
	 * @return
	 */
	public Approval4Level getStep(Long id) {
		StringBuilder hql = new StringBuilder()
				.append("from Approval4Level  a where    a.companyLevel='" + id
						+ "'");
		return approval4LevelDao.findUnique(hql.toString());
	}

	/**
	 * 根据审批ID查找审批步骤
	 */
	@Transactional(readOnly = true)
	public List<CheckSteps> findStepsByAppId(Long appId) {
		Approval4Level ap=approval4LevelDao.get(appId);
		return ap.getCheckSteps();
	}

	/**
	 * 省级用户审批待审批申请等级
	 */
	public Page<Approval4Level> getWaitAppCompanyLevel(
			Page<Approval4Level> page, Object value) {
		StringBuilder hql = new StringBuilder()
				.append("from Approval4Level a where a.isActive=true and a.companyLevel.company.active=true and (a.companyLevel.status='WAITING' or a.companyLevel.status='PROCESSING')");
		if (null != value) {
			hql.append(" and (a.companyLevel.company.name like '%"
					+ value + "%'");
			hql.append(" or a.companyLevel.levelTemplate like '%" + value
					+ "%')");
		}
		hql.append(" order by a.companyLevel.updateDate desc");
		return approval4LevelDao.findPage(page, hql.toString());
	}

	/**
	 * 根据申请ID查找审批历史
	 */
	@Transactional(readOnly = true)
	public List<ApproveLevelDetail> getApprovelLevelDetail(Long levelId) {
		// TODO Auto-generated method stub
		Approval4Level approval4Level = approval4LevelDao.get(levelId);
		String hql = "from ApproveLevelDetail a where a.approval.companyLevel='"
				+ levelId + "' order by a.createDate desc";
		return approval4LevelDao.find(hql.toString());
	}

	@Transactional(readOnly = true)
	public List<Approval4Level> getAppLevel(Long levelId) {
		String hql = "from Approval4Level a where a.companyLevel='" + levelId
				+ "'";
		return approval4LevelDao.find(hql.toString());
	}

	/**
	 * 根据ID查看审批信息
	 */
	@Transactional(readOnly = true)
	public Approval4Level get(Long id) {

		return approval4LevelDao.get(id);
	}

	/**
	 * 根据审批分级ID查看审批组ID
	 * 
	 * @param id
	 * @return
	 */
	@Transactional(readOnly = true)
	public Long getTeamID(Long id) {
		Approval4Level al = approval4LevelDao.get(id);
		Long teamId = null;
		if (null != al.getTeam()) {
			teamId = al.getTeam().getId();
		}
		return teamId;
	}
	public List<Approval4Level> list(List<PropertyFilter> filters) {
		return approval4LevelDao.find(filters);
	}


	public Page<Approval4Level> list(Page<Approval4Level> page, List<PropertyFilter> filters) {
		return approval4LevelDao.findPage(page, filters);
	}

	/**
	 * 修改审批分级的组
	 * 
	 * @param id
	 * @param teamId
	 */
	public void saveConfigTeam(Long id, Long teamId) {
		String sql = "update APPROVE_LEVEL set team=" + teamId + " where id=" + id;
		approval4LevelDao.getSession().createSQLQuery(sql).executeUpdate();
	}

	/**
	 * 根据ID修改分级的状态
	 * 
	 * @param id
	 * @param status
	 */
	public void updateCompanyLevelStatus(Long id, String status) {
		StringBuffer updateSql = new StringBuffer("update CompanyLevel set status ='").append(status).append("' where id =")
				.append(id);
		approval4LevelDao.batchExecute(updateSql.toString());
	}

	/**
	 * 保存、修改审批信息
	 */
	public void save(Approval4Level entity) {
		if (null != entity.getId()) {
			entity.setUpdateDate(new Date());
		}
		approval4LevelDao.save(entity);
	}

	public void delete(List<Long> ids) {
		if (ids.size() > 0) {
		approval4LevelDao.delete(ids);
		}
	}
}
