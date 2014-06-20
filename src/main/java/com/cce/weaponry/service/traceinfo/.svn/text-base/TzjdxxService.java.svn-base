package com.cce.weaponry.service.traceinfo;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cce.modules.orm.Page;
import com.cce.modules.orm.PropertyFilter;
import com.cce.modules.service.CrudServiceInterface;
import com.cce.weaponry.dao.traceinfo.TzjdxxDao;
import com.cce.weaponry.entity.traceinfo.Tzjdxx;

@Service
@Transactional
public class TzjdxxService implements CrudServiceInterface<Tzjdxx> {

	@Autowired
	TzjdxxDao tzjdxxDao;

	public void delete(List<Long> ids) {
		tzjdxxDao.delete(ids);
	}

	public Tzjdxx get(Long id) {
		return tzjdxxDao.get(id);
	}

	public List<Tzjdxx> list(List<PropertyFilter> filters) {
		return tzjdxxDao.find(filters);
	}

	public Page<Tzjdxx> list(Page<Tzjdxx> page, List<PropertyFilter> filters) {
		return tzjdxxDao.findPage(page, filters);
	}

	public void save(Tzjdxx entity) {
		tzjdxxDao.save(entity);
	}

	public List<Tzjdxx> findByMonitorId(Long monitorId) {
		String hql = "select i from Tzjdxx i where i.monitor.id=" + monitorId;
		return tzjdxxDao.find(hql);
	}
}
