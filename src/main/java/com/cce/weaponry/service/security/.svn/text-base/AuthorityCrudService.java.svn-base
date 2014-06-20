package com.cce.weaponry.service.security;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cce.modules.orm.Page;
import com.cce.modules.orm.PropertyFilter;
import com.cce.modules.service.CrudServiceInterface;
import com.cce.weaponry.dao.security.AuthorityDao;
import com.cce.weaponry.entity.security.Authority;

@Service
@Transactional
public class AuthorityCrudService implements CrudServiceInterface<Authority> {

	@Autowired
	private AuthorityDao authorityDao;

	public void delete(List<Long> ids) {
		authorityDao.delete(ids);
	}

	public void delete(Long id) {
		authorityDao.delete(id);
	}

	@Transactional(readOnly = true)
	public Authority get(Long id) {
		return authorityDao.get(id);
	}

	@Transactional(readOnly = true)
	public List<Authority> list(List<PropertyFilter> filters) {
		return authorityDao.find(filters);
	}

	@Transactional(readOnly = true)
	public Page<Authority> list(Page<Authority> page,
			List<PropertyFilter> filters) {
		return authorityDao.findPage(page, filters);
	}

	@Transactional(readOnly = true)
	public List<Authority> getAll() {
		return authorityDao.getAll();
	}

	public void save(Authority entity) {
		authorityDao.save(entity);
	}

	public List<Authority> findAuthoritiesByIds(List<Long> ids) {
		if (null != ids && ids.size() > 0) {
			StringBuilder hql = new StringBuilder(
					"from Authority a where a.id in ( ");
			for (Long i : ids) {
				hql.append(i).append(",");
			}
			hql.deleteCharAt(hql.length() - 1).append(" ) ");
			return authorityDao.find(hql.toString());
		}
		return new ArrayList<Authority>();
	}

}
