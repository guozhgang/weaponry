package com.cce.weaponry.service.train;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cce.modules.orm.Page;
import com.cce.modules.orm.PropertyFilter;
import com.cce.modules.service.CrudServiceInterface;
import com.cce.weaponry.dao.train.TrainingTestDao;
import com.cce.weaponry.entity.train.TrainingTest;

@Service
@Transactional
public class TrainingTestService implements CrudServiceInterface<TrainingTest> {

	@Autowired
	private TrainingTestDao trainingTestDao;

	public void delete(List<Long> ids) {
		trainingTestDao.delete(ids);
	}

	public TrainingTest get(Long id) {
		return trainingTestDao.get(id);
	}

	public List<TrainingTest> list(List<PropertyFilter> filters) {
		return trainingTestDao.find(filters);
	}

	public Page<TrainingTest> list(Page<TrainingTest> page, List<PropertyFilter> filters) {
		return trainingTestDao.findPage(page, filters);
	}

	public void save(TrainingTest entity) {
		trainingTestDao.save(entity);
	}
}
