package com.cce.weaponry.service.train;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cce.modules.orm.Page;
import com.cce.modules.orm.PropertyFilter;
import com.cce.modules.service.CrudServiceInterface;
import com.cce.weaponry.dao.train.TraningHistoryDao;
import com.cce.weaponry.entity.train.TraningHistory;

@Service
@Transactional
public class TraningHistoryService implements CrudServiceInterface<TraningHistory> {

	@Autowired
	private TraningHistoryDao traningHistoryDao;

	public void delete(List<Long> ids) {
		traningHistoryDao.delete(ids);
	}

	public TraningHistory get(Long id) {
		return traningHistoryDao.get(id);
	}

	public List<TraningHistory> list(List<PropertyFilter> filters) {
		return traningHistoryDao.find(filters);
	}

	public Page<TraningHistory> list(Page<TraningHistory> page, List<PropertyFilter> filters) {
		return traningHistoryDao.findPage(page, filters);
	}

	public void save(TraningHistory entity) {
		traningHistoryDao.save(entity);
	}
}
