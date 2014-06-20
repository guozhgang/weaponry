package com.cce.weaponry.service.transfer;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cce.modules.orm.Page;
import com.cce.modules.orm.PropertyFilter;
import com.cce.modules.service.CrudServiceInterface;
import com.cce.weaponry.dao.transfer.TransportStageDao;
import com.cce.weaponry.entity.transfer.TransportStage;

@Service
@Transactional
public class TransportStageService implements CrudServiceInterface<TransportStage> {

	@Autowired
	private TransportStageDao transportStageDao;

	public void delete(List<Long> ids) {
		transportStageDao.delete(ids);
	}

	public TransportStage get(Long id) {
		return transportStageDao.get(id);
	}

	public List<TransportStage> list(List<PropertyFilter> filters) {
		return transportStageDao.find(filters);
	}

	public Page<TransportStage> list(Page<TransportStage> page, List<PropertyFilter> filters) {
		return transportStageDao.findPage(page, filters);
	}

	public void save(TransportStage entity) {
		transportStageDao.save(entity);
	}
}
