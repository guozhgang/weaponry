package com.cce.weaponry.service.register;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cce.modules.orm.Page;
import com.cce.modules.orm.PropertyFilter;
import com.cce.modules.service.CrudServiceInterface;
import com.cce.weaponry.dao.register.CompanyDao;
import com.cce.weaponry.dao.register.RegionDao;
import com.cce.weaponry.entity.register.Company;
import com.cce.weaponry.entity.register.Region;

@Service
public class CompanyService implements CrudServiceInterface<Company> {
	@Autowired
	private CompanyDao companyDao;
	@Autowired
	private RegionDao regionDao;
	public void delete(List<Long> ids) {
		companyDao.delete(ids);
	}

	public Company get(Long id) {
		return companyDao.get(id);
	}

	public List<Company> list(List<PropertyFilter> filters) {
		return companyDao.find(filters);
	}

	public Page<Company> list(Page<Company> page, List<PropertyFilter> filters) {
		return companyDao.findPage(page, filters);
	}

	public void save(Company entity) {
		companyDao.save(entity);
	}

	public List<Long> findComIdsByRegionId(Long regionId) {
		List<Long> ids = new ArrayList<Long>();
		List<Region> regions = regionDao.findRegionsById(regionId);
		if (regions.size() > 0) {
			StringBuilder hql = new StringBuilder(
					"select i.id as id from Company  i where i.active=true and i.region in (");
			for (Region i : regions) {
				hql.append(i.getId()).append(",");
			}
			hql.deleteCharAt(hql.length() - 1).append(") ");
			List<Object[]> list = companyDao.find(hql.toString());
			for (Object j : list) {
				ids.add((Long) j);
			}
			return ids;
		} else
			return null;
	}
	public List<Long> findComIdsByNameCN(String companyName) {
		List<Long> idsList = new ArrayList<Long>();
		String hql = "select i.id as id from Company  i where i.active=true and  i.name  like '%"
				+ companyName + "%' ";
		List ids = companyDao.find(hql);
		for (Object i : ids) {
			Long id = (Long) i;
			idsList.add(id);
		}
		return idsList;
	}
}
