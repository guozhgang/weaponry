package com.cce.weaponry.service.level;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import sun.security.util.Debug;

import com.cce.modules.orm.Page;
import com.cce.modules.orm.PropertyFilter;
import com.cce.modules.service.CrudServiceInterface;
import com.cce.weaponry.dao.level.CompanyLevelDao;
import com.cce.weaponry.entity.level.CompanyLevel;
import com.cce.weaponry.entity.level.CompanyLevelDetail;
import com.cce.weaponry.entity.register.CompanyInfo;
import com.cce.weaponry.service.common.CompanyUtils;
import com.cce.weaponry.web.vo.level.CompanyLevelSearchVO;

@Service
@Transactional
public class CompanyLevelService implements CrudServiceInterface<CompanyLevel> {

	@Autowired
	private CompanyLevelDao companyLevelDao;

	/**
	 * 根据公司Id查看企业当前的等级
	 * 
	 * @param companyId
	 * @return String level
	 */
	public String getLevel(Long companyId) {
		StringBuilder hql = new StringBuilder().append(
						"select max(c.levelTemplate.levelNo) as entLevel from CompanyLevel c ")
				.append(
						" where c.company.id='" + companyId
								+ "' and c.status='PASSED'");
		Debug.println("企业状态栏显示当前分级级别", hql.toString());
		String level = companyLevelDao.findUnique(hql.toString());
		return level;
	}
	/**
	 * 查看企业当前的等级申请是否存在
	 * 
	 * @param companyID
	 * @param levelID
	 * @return
	 */
	@Transactional(readOnly = true)
	public CompanyLevel getLevelByCompanyID(Long companyID,Long levelID) {
		String hql = "from CompanyLevel  c where c.company='" + companyID
				+ "' and c.levelTemplate='" + levelID + "'";
		Debug.println("企业查看当前申请级别是否存在", hql.toString());
		return companyLevelDao.findUnique(hql.toString());
	}

	/**
	 * 企业申请前查看企业当前有没有申请提交项;如果企业当前有申请则不可以再次提交
	 */
 @Transactional(readOnly = true)
	public List<CompanyLevel> getStatus(Long companyId) {
		String hql = "from CompanyLevel c where (c.status='WAITING' or c.status='PROCESSING') and c.company='"
				+ companyId + "'";
		Debug.println("企业提交前判断是否有提交申请中的分级", hql.toString());
		return companyLevelDao.find(hql.toString());
	}

	/**
	 * 根据时间段或企业名字/等级/县/区/市查找企业审批
	 */
	@Transactional(readOnly = true)
	public Page<CompanyLevel> findCompLevelApprovals(Page<CompanyLevel> page,
			CompanyLevelSearchVO companyLevel, List<Long> region) {
		System.out.println(companyLevel);
		StringBuilder hql = new StringBuilder()
				.append(" from CompanyLevel c where    c.status!='CREATED' and c.company.active=true ");
		if (companyLevel.getEntname() != null
				&& !companyLevel.getEntname().equals("")) {
			hql.append(" and c.company.name like '%"
					+ companyLevel.getEntname()
							+ "%'");
		}
		if (null != companyLevel.getBeginDate()
				&& !"".equals(companyLevel.getBeginDate())) {
			hql.append(" and  c.createDate>='"
					+ CompanyUtils.formatDate(companyLevel.getBeginDate())
					+ "'");
		}
		if (null != companyLevel.getEndDate()
				&& !"".equals(companyLevel.getEndDate())) {
			hql.append(" and c.createDate<='"
					+ CompanyUtils.formatDate(companyLevel.getEndDate()) + "'");
		}
		if (companyLevel.getEntLevel() != null
				&& !companyLevel.getEntLevel().equals("")) {
			hql.append(" and c.levelTemplate.levelNo='"
					+ companyLevel.getEntLevel() + "'");
		}
		if (region != null && !region.equals("")) {
			List<Long> cities = region;
			if (cities.size() == 1) {
				hql.append(" and c.company.region='" + cities.get(0) + "'");
			} else {
			for (int j = 0; j < cities.size(); j++) {
				if (j == 0) {
						hql.append(" and   (c.company.region='"
								+ cities.get(j) + "' ");
					} else {
					if (j == cities.size() - 1) {
							hql.append("or c.company.region='"
									+ cities.get(j) + "')");
					} else {
							hql.append(" or c.company.region='"
									+ cities.get(j) + "' ");
					}
				}
			}
			}
		}
		if (null != companyLevel.getLevelState()
				&& !"".equals(companyLevel.getLevelState())) {
			hql.append(" and c.status='" + companyLevel.getLevelState() + "'");
		}
		hql.append(" order by c.updateDate desc");
		Debug.println("分级查询", hql.toString());
		return companyLevelDao.findPage(page, hql.toString());
	}

	/**
	 * 删除等级申请
	 */
	public void delete(List<Long> ids) {

		companyLevelDao.delete(ids);
	}

	/**
	 * 企业用户查看提交的申请状态
	 */
	public Page<CompanyLevel> getCompanyLevelInfo(Page<CompanyLevel> page,
			Long companyId) {
		StringBuilder hql = new StringBuilder()
				.append("from CompanyLevel c   where  c.company='"
								+ companyId + "'");
		sun.security.util.Debug.println("企业用户查看分级申请service", hql.toString());
		return companyLevelDao.findPage(page, hql.toString());
	}

	/**
	 * 提交企业申请
	 */
	public void submitLevel(Long id) {
		CompanyLevel cl = companyLevelDao.get(id);
		cl.setStatus("WAITING");
		companyLevelDao.save(cl);
		}
	public List<CompanyLevel> list(List<PropertyFilter> filters) {
		new PropertyFilter();
		return companyLevelDao.find(filters);
	}

	public Page<CompanyLevel> list(Page<CompanyLevel> page, List<PropertyFilter> filters) {
		return companyLevelDao.findPage(page, filters);
	}

	/**
	 * 保存、修改申请信息/ 直接修改等级/提交申请
	 */
	public void save(CompanyLevel entity) {
		companyLevelDao.save(entity);
	}

	/**
	 * 查看详细信息
	 * 
	 * @param companyId
	 * @return
	 */
	public List<CompanyLevelDetail> findLevelDetail(Long levelId) {
		CompanyLevel cl = companyLevelDao.get(levelId);
		return cl.getDetail();
	}

	public CompanyLevel get(Long id) {
		return companyLevelDao.get(id);
	}

	/**
	 * 统计Map<String, Long>
	 */
	public Map<String, Long> getCompanyLevelStat(CompanyLevelSearchVO vo,
			List<Long> region) {

		StringBuilder hql = new StringBuilder()
				.append("select new Map(c.region.code as city,count(c.id) as count) from  Company c,CompanyLevel t  where t.status='PASSED' and t.company.id=c.id ");
		if (null != vo.getEntname() && !"".equals(vo.getEntname())) {
			hql.append("  and c.name like '%" + vo.getEntname() + "%'");
		}
		if (null != vo.getBeginDate() && null != vo.getEndDate()) {
			hql.append(" and c.createDate >'"
					+ CompanyUtils.formatDate(vo.getBeginDate())
					+ "' and c.createDate<'"
					+ CompanyUtils.formatDate(vo.getEndDate())
					+ "'");
		}
		if (null != vo.getEntLevel() && !"".equals(vo.getEntLevel())) {
			hql.append(" and c.level='" + vo.getEntLevel() + "'");
		}
		if (region != null && !region.equals("")) {
			List<Long> cities = region;
			if (cities.size() == 1) {
				hql.append(" and c.region='" + cities.get(0) + "'");
			} else {
				for (int j = 0; j < cities.size(); j++) {
					if (j == 0) {
						hql.append(" and   (c.region='"
								+ cities.get(j) + "' ");
					} else {
						if (j == cities.size() - 1) {
							hql.append("or c.region='"
									+ cities.get(j) + "')");
						} else {
							hql.append(" or c.region='"
									+ cities.get(j) + "' ");
						}
					}
				}
			}
		}
		hql.append(" group by c.region");
		Debug.println("分级统计", hql.toString());
		List<CompanyInfo> list = companyLevelDao.find(hql.toString());
		Map<String, Long> regions = new HashMap<String, Long>();
		for (int i = 0; i < list.size(); i++) {
			Map map = (Map) list.get(i);
			String reg = (String) map.get("city");
			Long count = (Long) map.get("count");
			regions.put(reg, count);
		}
		return regions;
	}
}
