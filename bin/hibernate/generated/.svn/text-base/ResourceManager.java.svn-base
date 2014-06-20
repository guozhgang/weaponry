package com.cce.safepork.entity.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cce.safepork.entity.security.Resource;

@Service
@Transactional
public class ResourceManager {
	@Autowired
	private ResourceDao resourceDao;

	// Resource Manager //
	@Transactional(readOnly = true)
	public Resource getResource(Long id) {
		return resourceDao.get(id);
	}

	public List<Resource> getAllResource() {
		return resourceDao.getAll();
	}
	
	public void saveResource(Resource resource) {
		resourceDao.save(resource);
	}

	public void deleteResource(Long id) {
		resourceDao.delete(id);
	}
}

