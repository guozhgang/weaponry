package com.cce.weaponry.service.register;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cce.modules.orm.Page;
import com.cce.modules.orm.PropertyFilter;
import com.cce.modules.service.CrudServiceInterface;
import com.cce.weaponry.dao.register.EnforceOfficerDao;
import com.cce.weaponry.dao.register.RegionDao;
import com.cce.weaponry.dao.security.UserDao;
import com.cce.weaponry.entity.register.EnforceOfficer;
import com.cce.weaponry.entity.register.Region;
import com.cce.weaponry.entity.security.User;
import com.cce.weaponry.service.common.CompanyUtils;
import com.cce.weaponry.web.vo.register.EnforceOfficerSearchVO;
import com.cce.weaponry.web.vo.register.EnforceOfficerStatsVO;

@Service
@Transactional
public class EnforceOfficerService implements
		CrudServiceInterface<EnforceOfficer> {

	@Autowired
	private EnforceOfficerDao enforceOfficerDao;

	@Autowired
	private UserDao userDao;

	@Autowired
	private RegionDao regionDao;

	// ------------------ 最新代码分隔 -----------------

	/**
	 * 通过限制条件查找执法人员信息
	 * 
	 * @param obj
	 *            限制条件
	 * @return 执法人员信息
	 */
	public Page<EnforceOfficer> findEnforceOfficers(Page<EnforceOfficer> page,
			EnforceOfficerSearchVO condition) {
		StringBuilder hql = new StringBuilder(
				" from EnforceOfficer e where 1=1 ");

		Long regionId = userDao.getLoginUserRegionId(); // 限制的区域id

		if (null != condition) {
			// 区域限制
			if (null != condition.getRegionId()
					&& !"".equals(condition.getRegionId())) {
				regionId = Long.parseLong(condition.getRegionId()); // 传入的regionId
			}
			// 姓名 hql
			if (null != condition.getName() && !"".equals(condition.getName())) {
				hql.append(" and e.name like '%").append(condition.getName())
						.append("%' ");
			}
			// 创建日期的限制
			if (null != condition.getBeginDate()
					&& null != condition.getEndDate()
					&& condition.getBeginDate().compareTo(
							condition.getEndDate()) == 0) {
				hql.append(" and year(e.createDate)='").append(
						CompanyUtils.formatDate(condition.getBeginDate(),
								"yyyy")).append("' ");
				hql.append(" and month(e.createDate)='")
						.append(
								CompanyUtils.formatDate(condition
										.getBeginDate(), "MM")).append("' ");
				hql.append(" and day(e.createDate)='")
						.append(
								CompanyUtils.formatDate(condition
										.getBeginDate(), "dd")).append("' ");
			} else {
				if (null != condition.getBeginDate()) {
					hql.append(" and e.createDate >='").append(
							CompanyUtils.formatDate(condition.getBeginDate()))
							.append("' ");
				}
				if (null != condition.getEndDate()) {
					hql.append(" and e.createDate <='").append(
							CompanyUtils.formatDate(condition.getEndDate()))
							.append("' ");
				}
			}
		}

		// 限制区域 hql
		List<Region> regions = regionDao.findRegionsById(regionId);

		if (regions.size() > 0) {
			hql.append(" and e.region.id in ( ");
			for (Region i : regions) {
				hql.append(i.getId()).append(",");
			}
			hql.deleteCharAt(hql.length() - 1).append(" ) ");
		}

		hql.append(" order by e.createDate desc ");

		enforceOfficerDao.getSession().evict(EnforceOfficer.class);
		// 查询
		page = enforceOfficerDao.findPage(page, hql.toString());
		// 返回
		return page;
	}

	public void delete(List<Long> ids) {
		for (Long i : ids) {
			enforceOfficerDao.delete(i);
		}
	}

	// ------------------ 最新代码分隔 -----------------

	public void delete(Long id) {
		enforceOfficerDao.delete(id);
	}

	public EnforceOfficer get(Long id) {
		return enforceOfficerDao.get(id);
	}

	public List<EnforceOfficer> list(List<PropertyFilter> filters) {
		return enforceOfficerDao.find(filters);
	}

	public Page<EnforceOfficer> list(Page<EnforceOfficer> page,
			List<PropertyFilter> filters) {
		return enforceOfficerDao.findPage(page, filters);
	}

	public void save(EnforceOfficer entity) {
		enforceOfficerDao.save(entity);
		enforceOfficerDao.getSession().flush();
	}

	/**
	 * 根据名字得到执法人员对象 -- 模糊查询
	 * 
	 * @param name
	 *            执法人员名字
	 * @return 执法人员对象
	 */
	public List<EnforceOfficer> getEnforceOfficerByName(String name) {
		String hql = " from EnforceOfficer e where e.name like '%" + name
				+ "%' ";
		return enforceOfficerDao.find(hql);
	}

	public boolean isExistsEnforceOfficer(String officerName, Long orgId) {
		String hql = "select count(*) from EnforceOfficer e where e.name='"
				+ officerName + "' and e.enforceOrg.id=" + orgId;
		Long count = (Long) enforceOfficerDao.findUnique(hql);
		return count > 0 ? true : false;
	}

	public Map<String, Long> statsEnforceOfficer(EnforceOfficerStatsVO condition) {
		User loginUser = userDao.getLoginUser();
		Long regionId = loginUser.getRegion().getId();

		StringBuilder hql = new StringBuilder();
		if (null != condition) {
			if (null != condition.getBeginDate()
					&& null != condition.getEndDate()
					&& condition.getBeginDate().compareTo(
							condition.getEndDate()) == 0) {
				hql.append(" and year(e.createDate)='").append(
						CompanyUtils.formatDate(condition.getBeginDate(),
								"yyyy")).append("' ");
				hql.append(" and month(e.createDate)='")
						.append(
								CompanyUtils.formatDate(condition
										.getBeginDate(), "MM")).append("' ");
				hql.append(" and day(e.createDate)='")
						.append(
								CompanyUtils.formatDate(condition
										.getBeginDate(), "dd")).append("' ");
			} else {
				if (null != condition.getBeginDate()) {
					hql.append(" and e.createDate>='").append(
							CompanyUtils.formatDate(condition.getBeginDate()))
							.append("' ");
				}
				if (null != condition.getEndDate()) {
					hql.append(" and e.createDate<='").append(
							CompanyUtils.formatDate(condition.getEndDate()))
							.append("' ");
				}
			}
			if (null != condition.getRegionId()
					&& !"".equals(condition.getRegionId())) {
				regionId = Long.parseLong(condition.getRegionId());
			}
		}

		StringBuilder hqlRegionCriteria = new StringBuilder();

		List<Region> regions = regionDao.findRegionsById(regionId);

		if (regions.size() > 0) {
			hqlRegionCriteria.append(" and e.region.id in ( "); // (
			for (Region i : regions) {
				hqlRegionCriteria.append(i.getId()).append(",");
			}
			hqlRegionCriteria.deleteCharAt(hqlRegionCriteria.length() - 1)
					.append(" ) ");
		}

		// hql.append(" order by e.region.id desc ");

		Map<String, Long> maps = new HashMap<String, Long>();

		String hqlRegion = "";
		List listRegion = new ArrayList();

		if ("省级用户".equals(loginUser.getRole().getName())) {
			// 省级统计
			hqlRegion = "select count(e.id) from EnforceOfficer e where 1=1 "
					+ hql.toString();

			Long provinceCount = (Long) regionDao.getSession().createQuery(
					hqlRegion.toString()).uniqueResult();

			maps.put("山东省", provinceCount);
		}

		if ("市级用户".equals(loginUser.getRole().getName())
				|| "县级用户".equals(loginUser.getRole().getName())) {
			// 县级统计
			hqlRegion = "select e.region.name from EnforceOfficer e where 1=1 "
					+ hql + hqlRegionCriteria;

			listRegion = regionDao.find(hqlRegion);
			// RegionId 为 key ，数量为 Value
			for (int i = 0; i < listRegion.size(); i++) {
				String rName = (String) listRegion.get(i);
				if (maps.containsKey(rName)) {
					Long count = maps.get(rName);
					maps.put(rName, ++count);
				} else {
					maps.put(rName, 1l);
				}
			}
		}

		if ("省级用户".equals(loginUser.getRole().getName())
				|| "市级用户".equals(loginUser.getRole().getName())) {
			// 市级统计
			hqlRegion = "select e.region.name from EnforceOfficer e where e.region.parent.id=1 "
					+ hql + hqlRegionCriteria;

			listRegion = regionDao.find(hqlRegion);
			// RegionId 为 key ，数量为 Value
			for (int i = 0; i < listRegion.size(); i++) {
				String rName = (String) listRegion.get(i);
				if (maps.containsKey(rName)) {
					Long count = maps.get(rName);
					maps.put(rName, ++count);
				} else {
					maps.put(rName, 1l);
				}
			}

			// 县级统计
			hqlRegion = "select e.region.parent.name from EnforceOfficer e where e.region.parent.id>1 "
					+ hql + hqlRegionCriteria;

			listRegion = regionDao.find(hqlRegion);
			// RegionId 为 key ，数量为 Value
			for (int i = 0; i < listRegion.size(); i++) {
				String rName = (String) listRegion.get(i);
				if (maps.containsKey(rName)) {
					Long count = maps.get(rName);
					maps.put(rName, ++count);
				} else {
					maps.put(rName, 1l);
				}
			}
		}

		return maps;
	}
}
