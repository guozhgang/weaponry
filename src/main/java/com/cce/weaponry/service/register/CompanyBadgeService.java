package com.cce.weaponry.service.register;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cce.modules.orm.Page;
import com.cce.modules.orm.PropertyFilter;
import com.cce.modules.service.CrudServiceInterface;
import com.cce.weaponry.dao.register.CompanyBadgeDao;
import com.cce.weaponry.dao.register.RegionDao;
import com.cce.weaponry.entity.register.CompanyBadge;
import com.cce.weaponry.entity.register.Region;
import com.cce.weaponry.service.common.CompanyUtils;

@Service
@Transactional
public class CompanyBadgeService implements CrudServiceInterface<CompanyBadge> {

	@Autowired
	private CompanyBadgeDao companyBadgeDao;

	@Autowired
	private RegionDao regionDao;

	public void delete(Long id) {
		companyBadgeDao.delete(id);
	}

	public void delete(List<Long> ids) {
		companyBadgeDao.delete(ids);
	}

	public CompanyBadge get(Long id) {
		return companyBadgeDao.get(id);
	}

	public List<CompanyBadge> list(List<PropertyFilter> filters) {
		return companyBadgeDao.find(filters);
	}

	public Page<CompanyBadge> list(Page<CompanyBadge> page, List<PropertyFilter> filters) {
		return companyBadgeDao.findPage(page, filters);
	}

	public void save(CompanyBadge entity) {
		companyBadgeDao.save(entity);
	}

	/**
	 * 通过企业id得到公司证章
	 * 
	 * @param companyId
	 *            公司id
	 * @return 公司证章集合
	 */
	public List<CompanyBadge> findCompanyBadgesByCompanyId(Long companyId) {
		String hql = "from CompanyBadge c where c.companyInfo.id=" + companyId;
		return companyBadgeDao.find(hql);
	}

	public List<CompanyBadge> findCompanyBadgesByCondition(String entName,
			Date beginDate, Date endDate, Long regionId) {
		StringBuilder hql = new StringBuilder(" from CompanyBadge c where 1=1 ");
		if (null != entName && !"".equals(entName)) {
			hql.append(" and c.companyInfo.nameCN like '%").append(entName)
					.append("%' ");
		}
		if (null != beginDate) {
			hql.append(" and c.companyInfo.createDate >='").append(
					CompanyUtils.formatDate(beginDate))
					.append("' ");
		}
		if (null != endDate) {
			hql.append(" and c.companyInfo.createDate <='").append(
					CompanyUtils.formatDate(endDate))
					.append("' ");
		}
		if (null != regionId && 0 != regionId) {
			List<Region> regions = regionDao.findRegionsById(regionId);
			if (1 == regions.size()) {
				hql.append(" and c.companyInfo.region.id=").append(
						regions.get(0).getId()).append(" ");
			} else {
				hql.append(" and (c.companyInfo.region.id=").append(
						regions.get(0).getId());
				for (Region i : regions) {
					hql.append(" or c.companyInfo.region.id=")
							.append(i.getId());
				}
				hql.append(")");
			}
		}
		return companyBadgeDao.find(hql.toString());
	}

}
