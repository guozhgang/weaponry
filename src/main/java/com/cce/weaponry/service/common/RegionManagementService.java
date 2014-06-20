package com.cce.weaponry.service.common;

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
import com.cce.weaponry.dao.register.RegionDao;
import com.cce.weaponry.dao.security.UserDao;
import com.cce.weaponry.entity.register.Region;

@Service
@Transactional
public class RegionManagementService implements CrudServiceInterface<Region> {
	private static final String FIND_PROVINCE = "from Region where parent is null";

	@Autowired
	private UserDao userDao;

	@Autowired
	private RegionDao regionDao;

	public List<Region> findAllRegions() {
		return regionDao.getAll();
	}

	public List<Region> findAllProvince() {
		return regionDao.find(FIND_PROVINCE);
	}

	public void delete(List<Long> ids) {
		regionDao.delete(ids);
	}

	public Region getRegion(Long id) {
		String hql = new String("from Region r where r.id='" + id + "'");
		return regionDao.findUnique(hql);
	}
	public Region get(Long id) {
		return regionDao.get(id);
	}

	public List<Region> list(List<PropertyFilter> filters) {
		return regionDao.find(filters);
	}

	public Page<Region> list(Page<Region> page, List<PropertyFilter> filters) {
		return regionDao.findPage(page, filters);
	}

	public void save(Region entity) {
		regionDao.save(entity);
	}

	/**
	 * 查找所有备案技术人员的地区
	 * 
	 * @return 所有备案技术人员的地区
	 */
	public Map<Region, Long> findFilingTechnicianInfoRegions() {
		Long regionId = userDao.getLoginUserRegionId();
		StringBuilder hql = new StringBuilder(
				" select r.id,count(t) from Region r,CompanyInfo c,Company i,TechnicianInfo t where i.active=1 and c.company=i and r.id = i.region.id and t.company=i and c.status='PASSED' ");
		List<Region> regionList = regionDao.findRegionsById(regionId);
		if (regionList.size() > 0) {
			hql.append(" and r.id in ( ");
			for (Region i : regionList) {
				hql.append(i.getId()).append(",");
			}
			hql.deleteCharAt(hql.length() - 1).append(" ) ");
		}
		hql.append(" group by r.id ");
		List list = regionDao.find(hql.toString());
		Map<Region, Long> regions = new HashMap<Region, Long>();
		for (int i = 0; i < list.size(); i++) {
			Object[] obj = (Object[]) list.get(i);
			Long count = (Long) obj[1];
			Long id = (Long) obj[0];
			Region region = regionDao.get(id);
			regions.put(region, count);
		}
		return regions;
	}

	/**
	 * 根据名字查找所属ID
	 */
	public Region getIdByName( String name){
		String hql="from Region r where r.name='"+name+"'";
		return regionDao.findUnique(hql.toString());
	 
	}

	/**
	 * 根据登陆用户REGION(区域)ID获得所有所属区域的id集合
	 */
	public List<Long> getById(Long id) {
		Region region = regionDao.get(id);
		if (null == region)
			return null;
		List<Long> ids = new ArrayList<Long>();
		if (null != region.getParent()) {
			Region county=regionDao.get(region.getParent().getId());
			if (null != county.getParent()) {
				ids.add(region.getId());
				System.out.println(ids + "县");
				return ids;
			} else {
				List<Region> children = region.getChildren();
				for (Region r : children) {
					ids.add(r.getId());
				}
				ids.add(region.getId());
				System.out.println(ids + "市");
				return ids;
			}

		} else {
			List<Region> r=regionDao.getAll();
			for (Region list : r) {
				ids.add(list.getId());
			}
			System.out.println(ids + "省");
			return ids;
		}

	}

	/**
	 * 根据区域ID得到所在地区的地址 ：如 山东省 济南市 商河县 ;id是商河县的id 得到所属的省市
	 * 
	 * @param id
	 * @return
	 */
	public String getStr(Long id) {
		String str = "";
		while (true) {
			Region region = regionDao.get(id);// 
			if (null != region)
			return region.getName();
			if (null != region.getParent()) {
				Region city = regionDao.get(region.getParent().getId());//
				if (null != city.getParent()) {
					Region county = regionDao.get(city.getParent().getId());
					if (null != county.getParent())
						return str;
					else {
						str = county.getName() + "," + city.getName() + ","
								+ region.getName();
						return str;
					}
				} else {
					str = city.getName() + "," + region.getName();
					return str;
				}

			} else {
				str = region.getName();
				return str;
			}
		}
	}

	/**
	 * 查找所有备案企业的地区
	 * 
	 * @return 所有备案企业的地区
	 */
	public Map<Region, Long> findFilingCompanyInfoRegions() {
		Long regionId = userDao.getLoginUserRegionId();
		StringBuilder hql = new StringBuilder(
				" select r.id,count(c) from Region r,CompanyInfo c where c.company.active=1 and r.id = c.company.region.id and c.status='PASSED' ");
		List<Region> regionList = regionDao.findRegionsById(regionId);
		if (regionList.size() > 0) {
			hql.append(" and r.id in ( ");
			for (Region i : regionList) {
				hql.append(i.getId()).append(",");
			}
			hql.deleteCharAt(hql.length() - 1).append(" ) ");
		}
		hql.append(" group by r.id ");
		List list = regionDao.find(hql.toString());
		Map<Region, Long> regions = new HashMap<Region, Long>();
		for (int i = 0; i < list.size(); i++) {
			Object[] obj = (Object[]) list.get(i);
			Long count = (Long) obj[1];
			Long id = (Long) obj[0];
			regions.put(regionDao.get(id), count);
		}
		return regions;
	}

	/**
	 * 根据地区编码得到地区对象
	 * 
	 * @param code
	 *            地区编码
	 * @return 相应的地区对象
	 */
	public Region getRegionByCode(String code) {
		return regionDao.getRegionByCode(code);
	}

	/**
	 * 根据地区编码得到所包含地区的对象集合
	 * 
	 * @param code
	 *            地区编码
	 * @return 所包含地区的对象集合
	 */
	public List<Region> findRegionsByCode(String code) {
		return regionDao.findRegionsByCode(code);
	}

	public List<Region> findRegionsById(Long regionId) {
		return regionDao.findRegionsById(regionId);
	}

	public List<Region> getPreviousRegionsById(Long id) {
		List<Region> regions = new ArrayList<Region>();
		Region region = regionDao.get(id);
		if (null != region) {
			regions.add(region);
			region = region.getParent();
			if (null != region) {
				regions.add(region);
				region = region.getParent();
				if (null != region) {
					regions.add(region);
				}
			}
		}
		return regions;
	}

	/**
	 * 
	 * @param regionId
	 *            区域id
	 * @return 区域名称
	 */
	public String getNameById(Long regionId) {
		String hql = "select r.name from Region r where r.id=" + regionId;
		List list = regionDao.find(hql);
		if (list.size() > 0)
			return (String) list.get(0);
		else
			return null;
	}

}
