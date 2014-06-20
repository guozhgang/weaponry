package com.cce.weaponry.service.security;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cce.modules.orm.Page;
import com.cce.modules.orm.PropertyFilter;
import com.cce.modules.service.CrudServiceInterface;
import com.cce.weaponry.dao.security.ResourceDao;
import com.cce.weaponry.entity.security.Resource;

@Service
@Transactional
public class ResourceCrudService implements CrudServiceInterface<Resource> {
	private static Logger logger = LoggerFactory
			.getLogger(ResourceCrudService.class);

	@Autowired
	private ResourceDao resourceDao;

	public void delete(List<Long> ids) {
		resourceDao.delete(ids);
	}

	@Transactional(readOnly = true)
	public Resource get(Long id) {
		return resourceDao.get(id);
	}

	@Transactional(readOnly = true)
	public List<Resource> list(List<PropertyFilter> filters) {
		return resourceDao.find(filters);
	}

	@Transactional(readOnly = true)
	public Page<Resource> list(Page<Resource> page, List<PropertyFilter> filters) {
		return resourceDao.findPage(page, filters);
	}

	public void save(Resource entity) {
		resourceDao.save(entity);
	}

	@Transactional(readOnly = true)
	public List<Resource> getAll() {
		return resourceDao.getAll();
	}
}
