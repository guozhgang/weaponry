package com.cce.weaponry.service.register;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cce.modules.orm.Page;
import com.cce.modules.orm.PropertyFilter;
import com.cce.modules.service.CrudServiceInterface;
import com.cce.weaponry.dao.register.UserBadgeDao;
import com.cce.weaponry.entity.register.UserBadge;

@Service
@Transactional
public class UserBadgeService implements CrudServiceInterface<UserBadge> {

	@Autowired
	private UserBadgeDao userBadgeDao;

	public void delete(List<Long> ids) {
		userBadgeDao.delete(ids);
	}

	public void delete(Long id) {
		userBadgeDao.delete(id);
	}

	public UserBadge get(Long id) {
		return userBadgeDao.get(id);
	}

	public List<UserBadge> list(List<PropertyFilter> filters) {
		return userBadgeDao.find(filters);
	}

	public Page<UserBadge> list(Page<UserBadge> page, List<PropertyFilter> filters) {
		return userBadgeDao.findPage(page, filters);
	}

	public void save(UserBadge entity) {
		userBadgeDao.save(entity);
	}
}
