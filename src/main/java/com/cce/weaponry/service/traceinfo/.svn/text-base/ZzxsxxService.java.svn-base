package com.cce.weaponry.service.traceinfo;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cce.modules.orm.Page;
import com.cce.modules.orm.PropertyFilter;
import com.cce.modules.service.CrudServiceInterface;
import com.cce.weaponry.dao.traceinfo.ZzxsxxDao;
import com.cce.weaponry.entity.traceinfo.Zzxsxx;

@Service
@Transactional
public class ZzxsxxService implements CrudServiceInterface<Zzxsxx> {

	@Autowired
	ZzxsxxDao zzxsxxDao;

	public void delete(List<Long> ids) {
		zzxsxxDao.delete(ids);
	}

	public Zzxsxx get(Long id) {
		return zzxsxxDao.get(id);
	}

	public List<Zzxsxx> list(List<PropertyFilter> filters) {
		return zzxsxxDao.find(filters);
	}

	public Page<Zzxsxx> list(Page<Zzxsxx> page, List<PropertyFilter> filters) {
		return zzxsxxDao.findPage(page, filters);
	}

	public void save(Zzxsxx entity) {
		zzxsxxDao.save(entity);
	}

	public List<Zzxsxx> findByMonitorId(Long id) {
		String hql = "select i from Zzxsxx i where i.monitor.id=" + id;
		return zzxsxxDao.find(hql);
	}
}
