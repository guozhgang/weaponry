package com.cce.weaponry.service.train;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cce.modules.orm.Page;
import com.cce.modules.orm.PropertyFilter;
import com.cce.modules.service.CrudServiceInterface;
import com.cce.weaponry.dao.train.OnlineTrainingDao;
import com.cce.weaponry.entity.train.OnlineTraining;

@Service
@Transactional
public class OnlineTrainingService implements CrudServiceInterface<OnlineTraining> {

	@Autowired
	private OnlineTrainingDao onlineTrainingDao;

	public void delete(List<Long> ids) {
		onlineTrainingDao.delete(ids);
	}

	public OnlineTraining get(Long id) {
		return onlineTrainingDao.get(id);
	}

	public List<OnlineTraining> list(List<PropertyFilter> filters) {
		return onlineTrainingDao.find(filters);
	}

	public Page<OnlineTraining> list(Page<OnlineTraining> page, List<PropertyFilter> filters) {
		return onlineTrainingDao.findPage(page, filters);
	}

	public void save(OnlineTraining entity) {
		onlineTrainingDao.save(entity);
	}
}
