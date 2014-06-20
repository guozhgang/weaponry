package com.cce.safepork.entity.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cce.safepork.entity.security.User;

@Service
@Transactional
public class UserManager {
	@Autowired
	private UserDao userDao;

	// User Manager //
	@Transactional(readOnly = true)
	public User getUser(Long id) {
		return userDao.get(id);
	}

	public List<User> getAllUser() {
		return userDao.getAll();
	}
	
	public void saveUser(User user) {
		userDao.save(user);
	}

	public void deleteUser(Long id) {
		userDao.delete(id);
	}
}

