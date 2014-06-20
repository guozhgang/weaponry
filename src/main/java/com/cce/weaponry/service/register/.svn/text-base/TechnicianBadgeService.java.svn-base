package com.cce.weaponry.service.register;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cce.modules.orm.Page;
import com.cce.modules.orm.PropertyFilter;
import com.cce.modules.service.CrudServiceInterface;
import com.cce.weaponry.dao.register.TechnicianBadgeDao;
import com.cce.weaponry.entity.register.TechnicianBadge;

@Service
@Transactional
public class TechnicianBadgeService implements CrudServiceInterface<TechnicianBadge> {

	@Autowired
	private TechnicianBadgeDao technicianBadgeDao;

	public void delete(List<Long> ids) {
		technicianBadgeDao.delete(ids);
	}

	public void delete(Long id) {
		technicianBadgeDao.delete(id);
	}

	@Transactional(readOnly = true)
	public TechnicianBadge get(Long id) {
		return technicianBadgeDao.get(id);
	}

	@Transactional(readOnly = true)
	public List<TechnicianBadge> list(List<PropertyFilter> filters) {
		return technicianBadgeDao.find(filters);
	}

	@Transactional(readOnly = true)
	public Page<TechnicianBadge> list(Page<TechnicianBadge> page, List<PropertyFilter> filters) {
		return technicianBadgeDao.findPage(page, filters);
	}

	public void save(TechnicianBadge entity) {
		technicianBadgeDao.save(entity);
	}

	/**
	 * 通过技术人员id得到技术人员相关证书信息
	 * 
	 * @param technicianInfoId
	 * @return
	 */
	public List<TechnicianBadge> getBadgesByTechnicianId(Long technicianInfoId) {
		String hql = " from TechnicianBadge i where i.techInfo.id="
				+ technicianInfoId;
		System.out.println(hql);
		return technicianBadgeDao.find(hql);
	}

}
