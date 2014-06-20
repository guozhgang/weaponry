package com.cce.weaponry.service.train;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cce.modules.orm.Page;
import com.cce.modules.orm.PropertyFilter;
import com.cce.modules.service.CrudServiceInterface;
import com.cce.weaponry.dao.train.TrainingMemberDao;
import com.cce.weaponry.entity.train.TrainingMember;

@Service
@Transactional
public class TrainingMemberService implements CrudServiceInterface<TrainingMember> {

	@Autowired
	private TrainingMemberDao trainingMemberDao;

	public void delete(List<Long> ids) {
		trainingMemberDao.delete(ids);
	}

	public TrainingMember get(Long id) {
		return trainingMemberDao.get(id);
	}

	public List<TrainingMember> list(List<PropertyFilter> filters) {
		return trainingMemberDao.find(filters);
	}

	public Page<TrainingMember> list(Page<TrainingMember> page, List<PropertyFilter> filters) {
		return trainingMemberDao.findPage(page, filters);
	}

	public void save(TrainingMember entity) {
		trainingMemberDao.save(entity);
	}
}
