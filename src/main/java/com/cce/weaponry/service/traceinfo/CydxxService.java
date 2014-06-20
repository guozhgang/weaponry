package com.cce.weaponry.service.traceinfo;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cce.modules.orm.Page;
import com.cce.modules.orm.PropertyFilter;
import com.cce.modules.service.CrudServiceInterface;
import com.cce.weaponry.dao.traceinfo.CydxxDao;
import com.cce.weaponry.entity.traceinfo.Cydxx;

@Service
@Transactional
public class CydxxService implements CrudServiceInterface<Cydxx> {

	@Autowired
	CydxxDao cydxxDao;

	public void delete(List<Long> ids) {
		cydxxDao.delete(ids);
	}

	public Cydxx get(Long id) {
		return cydxxDao.get(id);
	}

	public List<Cydxx> list(List<PropertyFilter> filters) {
		return cydxxDao.find(filters);
	}

	public Page<Cydxx> list(Page<Cydxx> page, List<PropertyFilter> filters) {
		return cydxxDao.findPage(page, filters);
	}

	public void save(Cydxx entity) {
		cydxxDao.save(entity);
	}

	public List<Cydxx> findByMonitorId(Long id) {
		String hql = "select c from Cydxx c where c.monitor.id=" + id;
		return cydxxDao.find(hql);
	}
}
