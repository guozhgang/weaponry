package com.cce.weaponry.service.register;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cce.modules.orm.Page;
import com.cce.modules.orm.PropertyFilter;
import com.cce.modules.service.CrudServiceInterface;
import com.cce.weaponry.dao.register.EnforceOrgDao;
import com.cce.weaponry.dao.register.RegionDao;
import com.cce.weaponry.entity.register.EnforceOrg;
import com.cce.weaponry.entity.register.Region;

@Service
@Transactional
public class EnforceOrgService implements CrudServiceInterface<EnforceOrg> {

	@Autowired
	private EnforceOrgDao enforceOrgDao;

	@Autowired
	private RegionDao regionDao;

	public void delete(List<Long> ids) {
		for (Long i : ids) {
			enforceOrgDao.delete(i);
		}
	}

	public EnforceOrg get(Long id) {
		return enforceOrgDao.get(id);
	}

	public List<EnforceOrg> list(List<PropertyFilter> filters) {
		return enforceOrgDao.find(filters);
	}

	public Page<EnforceOrg> list(Page<EnforceOrg> page,
			List<PropertyFilter> filters) {
		return enforceOrgDao.findPage(page, filters);
	}

	public void save(EnforceOrg entity) {
		enforceOrgDao.save(entity);
		enforceOrgDao.getSession().flush();
	}

	public EnforceOrg getEnforceOrgByName(String orgName) {
		String hql = "from EnforceOrg e where e.name='" + orgName + "'";
		List<EnforceOrg> orgs = enforceOrgDao.find(hql);
		return orgs.size() == 0 ? null : orgs.get(0);
	}

	public boolean isExistsEnforceOrg(String orgName) {
		String hql = "select count(*) from EnforceOrg e where e.name='"
				+ orgName + "'";
		Long count = (Long) enforceOrgDao.createQuery(hql).uniqueResult();
		return count > 0 ? true : false;
	}

	public Page<EnforceOrg> findEnforceOrgByRegionId(Page<EnforceOrg> page,
			Long regionId) {
		StringBuilder hql = new StringBuilder("from EnforceOrg e where 1=1 ");
		List<Region> regions = regionDao.findRegionsById(regionId);
		if (regions.size() > 0) {
			hql.append(" and e.region.id in ( ");
			for (Region i : regions) {
				hql.append(i.getId()).append(",");
			}
			hql.deleteCharAt(hql.length()-1).append(" ) ");
		}
		enforceOrgDao.getSession().flush();
		enforceOrgDao.getSession().evict(EnforceOrg.class);
		System.out.println("查询方法执行前。。。");
		page = enforceOrgDao.findPage(page, hql.toString());
		System.out.println("查询方法执行后。。。");
		return page;
	}

	public List<EnforceOrg> findEnforceOrgsByRegionId(Long regionId) {
		StringBuilder hql = new StringBuilder("from EnforceOrg e where 1=1 ");
		List<Region> regions = regionDao.findRegionsById(regionId);
		if (regions.size() > 0) {
			hql.append(" and e.region.id in ( ");
			for (Region i : regions) {
				hql.append(i.getId()).append(",");
			}
			hql.deleteCharAt(hql.length() - 1).append(" ) ");
		}
		return enforceOrgDao.find(hql.toString());
	}
}
