package com.cce.weaponry.service.train;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cce.modules.orm.Page;
import com.cce.modules.orm.PropertyFilter;
import com.cce.modules.service.CrudServiceInterface;
import com.cce.weaponry.dao.train.TrainingOwnerDao;
import com.cce.weaponry.entity.train.TrainingOwner;

@Service
@Transactional
public class TrainingOwnerService implements CrudServiceInterface<TrainingOwner> {

	@Autowired
	private TrainingOwnerDao trainingOwnerDao;

	public void delete(List<Long> ids) {
		trainingOwnerDao.delete(ids);
	}

	public TrainingOwner get(Long id) {
		return trainingOwnerDao.get(id);
	}

	public List<TrainingOwner> list(List<PropertyFilter> filters) {
		return trainingOwnerDao.find(filters);
	}

	public Page<TrainingOwner> list(Page<TrainingOwner> page, List<PropertyFilter> filters) {
		return trainingOwnerDao.findPage(page, filters);
	}

	public void save(TrainingOwner entity) {
		trainingOwnerDao.save(entity);
	}
}
