package com.cce.safepork.entity.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cce.safepork.entity.security.Authority;

@Service
@Transactional
public class AuthorityManager {
	@Autowired
	private AuthorityDao authorityDao;

	// Authority Manager //
	@Transactional(readOnly = true)
	public Authority getAuthority(Long id) {
		return authorityDao.get(id);
	}

	public List<Authority> getAllAuthority() {
		return authorityDao.getAll();
	}
	
	public void saveAuthority(Authority authority) {
		authorityDao.save(authority);
	}

	public void deleteAuthority(Long id) {
		authorityDao.delete(id);
	}
}

