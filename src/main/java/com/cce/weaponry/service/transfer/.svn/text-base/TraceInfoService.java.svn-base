package com.cce.weaponry.service.transfer;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cce.modules.orm.Page;
import com.cce.modules.orm.PropertyFilter;
import com.cce.modules.service.CrudServiceInterface;
import com.cce.weaponry.dao.transfer.TraceInfoDao;
import com.cce.weaponry.entity.transfer.TraceInfo;

@Service
@Transactional
public class TraceInfoService implements CrudServiceInterface<TraceInfo> {

	@Autowired
	private TraceInfoDao traceInfoDao;

	public void delete(List<Long> ids) {
		traceInfoDao.delete(ids);
	}

	public TraceInfo get(Long id) {
		return traceInfoDao.get(id);
	}

	public List<TraceInfo> list(List<PropertyFilter> filters) {
		return traceInfoDao.find(filters);
	}

	public Page<TraceInfo> list(Page<TraceInfo> page, List<PropertyFilter> filters) {
		return traceInfoDao.findPage(page, filters);
	}

	public void save(TraceInfo entity) {
		traceInfoDao.save(entity);
	}
}
