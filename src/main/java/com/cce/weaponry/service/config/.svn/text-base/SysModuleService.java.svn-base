package com.cce.weaponry.service.config;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cce.modules.orm.Page;
import com.cce.modules.orm.PropertyFilter;
import com.cce.modules.service.CrudServiceInterface;
import com.cce.weaponry.dao.config.SysModuleDao;
import com.cce.weaponry.entity.config.SysModule;

@Service
@Transactional
public class SysModuleService implements CrudServiceInterface<SysModule> {

	@Autowired
	private SysModuleDao sysModuleDao;

	public void delete(List<Long> ids) {
		for (Long i : ids) {
			sysModuleDao.delete(i);
		}
	}

	public SysModule get(Long id) {
		return sysModuleDao.get(id);
	}

	public List<SysModule> list(List<PropertyFilter> filters) {
		return sysModuleDao.find(filters);
	}

	public Page<SysModule> list(Page<SysModule> page,
			List<PropertyFilter> filters) {
		return sysModuleDao.findPage(page, filters);
	}

	public void save(SysModule entity) {
		sysModuleDao.save(entity);
	}

	public SysModule getSysModuleByName(String moduleName) {
		Criteria c = sysModuleDao.getSession().createCriteria(SysModule.class)
				.add(Restrictions.eq("moduleName", moduleName));
		List<SysModule> list = c.list();
		return list.size() > 0 ? list.get(0) : null;
	}

	public boolean ifExistsByName(String moduleName) {
		StringBuilder hql = new StringBuilder(
				"select count(i.id) from SysModule i where i.moduleName='");
		hql.append(moduleName).append("' ");
		Long count = (Long) sysModuleDao.createQuery(hql.toString())
				.uniqueResult();
		return (count != null && count > 0l) ? true : false;
	}
	
	
}
