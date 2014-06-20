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
import com.cce.weaponry.dao.security.RoleDao;
import com.cce.weaponry.entity.security.Role;

@Service
@Transactional
public class RoleCrudService implements CrudServiceInterface<Role> {
	private static Logger logger = LoggerFactory
			.getLogger(RoleCrudService.class);

	@Autowired
	private RoleDao roleDao;

	public void delete(List<Long> ids) {
		roleDao.delete(ids);
	}

	public Long sumUsersByRoleIds(List<Long> ids) {
		StringBuilder hql = new StringBuilder(
				" select count(u.id) from User u left join u.roleList r where r.id in ( ");
		if (ids.size() > 0) {
			for (Long i : ids) {
				hql.append(i).append(",");
			}
			hql.deleteCharAt(hql.length() - 1).append(" ) ");
		}
		Long count = (Long) roleDao.getSession().createQuery(hql.toString())
				.uniqueResult();
		return count;
	}

	@Transactional(readOnly = true)
	public Role get(Long id) {
		return roleDao.get(id);
	}

	@Transactional(readOnly = true)
	public List<Role> getAll() {
		return roleDao.getAll("id", true);
	}

	@Transactional(readOnly = true)
	public List<Role> list(List<PropertyFilter> filters) {
		return roleDao.find(filters);
	}

	@Transactional(readOnly = true)
	public Page<Role> list(Page<Role> page, List<PropertyFilter> filters) {
		return roleDao.findPage(page, filters);
	}

	public void save(Role entity) {
		roleDao.save(entity);
	}

	/**
	 * 通过角色名称获得角色对象
	 * 
	 * @return
	 */
	public Role getRoleByName(String roleName) {
		String hql = " from Role r where r.name='" + roleName + "' ";
		List<Role> roles = roleDao.find(hql);
		if (roles.size() > 0)
			return roles.get(0);
		else
			return null;
	}

}
