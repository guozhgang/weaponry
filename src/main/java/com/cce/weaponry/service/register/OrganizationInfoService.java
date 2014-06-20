package com.cce.weaponry.service.register;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cce.modules.orm.Page;
import com.cce.modules.orm.PropertyFilter;
import com.cce.modules.service.CrudServiceInterface;
import com.cce.weaponry.dao.register.OrganizationInfoDao;
import com.cce.weaponry.entity.register.OrganizationInfo;

@Service
@Transactional
public class OrganizationInfoService implements CrudServiceInterface<OrganizationInfo> {

	@Autowired
	private OrganizationInfoDao organizationInfoDao;

	public void delete(List<Long> ids) {
		organizationInfoDao.delete(ids);
	}

	public OrganizationInfo get(Long id) {
		return organizationInfoDao.get(id);
	}

	public List<OrganizationInfo> list(List<PropertyFilter> filters) {
		return organizationInfoDao.find(filters);
	}

	public Page<OrganizationInfo> list(Page<OrganizationInfo> page, List<PropertyFilter> filters) {
		return organizationInfoDao.findPage(page, filters);
	}

	public void save(OrganizationInfo entity) {
		organizationInfoDao.save(entity);
	}
}
