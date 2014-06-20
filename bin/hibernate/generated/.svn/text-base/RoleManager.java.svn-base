package com.cce.safepork.entity.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cce.safepork.entity.security.Role;

@Service
@Transactional
public class RoleManager {
	@Autowired
	private RoleDao roleDao;

	// Role Manager //
	@Transactional(readOnly = true)
	public Role getRole(Long id) {
		return roleDao.get(id);
	}

	public List<Role> getAllRole() {
		return roleDao.getAll();
	}
	
	public void saveRole(Role role) {
		roleDao.save(role);
	}

	public void deleteRole(Long id) {
		roleDao.delete(id);
	}
}

