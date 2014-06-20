package com.cce.weaponry.dao.register;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.cce.modules.orm.hibernate.HibernateDao;
import com.cce.weaponry.entity.register.Region;
import com.cce.weaponry.service.common.CompanyUtils;

@Repository
public class RegionDao extends HibernateDao<Region, Long> {

	/**
	 * 根据地区编码得到地区对象
	 * 
	 * @param code
	 *            地区编码
	 * @return 相应的地区对象
	 */
	public Region getRegionByCode(String code) {
		String hql = " from Region r where r.code='" + code + "' ";
		return findUnique(hql);
	}

	/**
	 * 根据地区编码得到所包含地区的对象集合
	 * 
	 * @param code
	 *            地区编码
	 * @return 所包含地区的对象集合
	 */
	public List<Region> findRegionsByCode(String code) {
		List<Region> regions = new ArrayList<Region>();
		String hql = " from Region r where r.code='" + code + "' ";
		Region region = (Region) find(hql).iterator().next();
		regions.add(region);
		int index = CompanyUtils.ifRegion(code);
		if (2 == index) {
			hql = " from Region r where r.parent.id=" + region.getId();
			List<Region> children = find(hql);
			regions.addAll(children);
		} else if (3 == index) {
			hql = " from Region r where r.parent.id=" + region.getId();
			List<Region> children = find(hql);
			regions.addAll(children);
			for (int i = 0; i < children.size(); i++) {
				hql = " from Region r where r.parent.id="
						+ children.get(i).getId();
				List<Region> subchildren = find(hql);
				regions.addAll(subchildren);
			}
		}
		return regions;
	}

	/**
	 * 根据地区id得到所包含地区的对象集合
	 * 
	 * @param regionId
	 *            地区id
	 * @return 所包含地区的对象集合
	 */
	public List<Region> findRegionsById(Long regionId) {
		List<Region> regions = new ArrayList<Region>();
		Region region = get(regionId);
		regions.add(region);
		int index = CompanyUtils.ifRegion(region.getCode());
		String hql = "";
		if (2 == index) {
			hql = " from Region r where r.parent.id=" + region.getId();
			List<Region> children = find(hql);
			regions.addAll(children);
		} else if (3 == index) {
			hql = " from Region r where r.parent.id=" + region.getId();
			List<Region> children = find(hql);
			regions.addAll(children);
			for (int i = 0; i < children.size(); i++) {
				hql = " from Region r where r.parent.id="
						+ children.get(i).getId();
				List<Region> subchildren = find(hql);
				regions.addAll(subchildren);
			}
		}
		return regions;
	}
}
