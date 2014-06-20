package com.cce.weaponry.service.register;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cce.modules.orm.Page;
import com.cce.modules.orm.PropertyFilter;
import com.cce.modules.service.CrudServiceInterface;
import com.cce.weaponry.dao.register.EnforceOfficerBadgeDao;
import com.cce.weaponry.entity.register.EnforceOfficerBadge;

@Service
@Transactional
public class EnforceOfficerBadgeService implements CrudServiceInterface<EnforceOfficerBadge> {

	@Autowired
	EnforceOfficerBadgeDao enforceOfficerBadgeDao;

	public void delete(List<Long> ids) {
		enforceOfficerBadgeDao.delete(ids);
	}

	@Transactional(readOnly = true)
	public EnforceOfficerBadge get(Long id) {
		return enforceOfficerBadgeDao.get(id);
	}

	@Transactional(readOnly = true)
	public List<EnforceOfficerBadge> list(List<PropertyFilter> filters) {
		return enforceOfficerBadgeDao.find(filters);
	}

	@Transactional(readOnly = true)
	public Page<EnforceOfficerBadge> list(Page<EnforceOfficerBadge> page, List<PropertyFilter> filters) {
		return enforceOfficerBadgeDao.findPage(page, filters);
	}

	public void save(EnforceOfficerBadge entity) {
		enforceOfficerBadgeDao.save(entity);
	}

}
