package com.cce.weaponry.service.credit;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cce.modules.orm.Page;
import com.cce.modules.orm.PropertyFilter;
import com.cce.modules.service.CrudServiceInterface;
import com.cce.weaponry.dao.credit.EvaluationTeamDao;
import com.cce.weaponry.entity.credit.EvaluationTeam;

@Service
@Transactional
public class EvaluationTeamService implements CrudServiceInterface<EvaluationTeam> {

	@Autowired
	private EvaluationTeamDao evaluationTeamDao;

	public EvaluationTeam getByName(String name) {
		String hql = "from EvaluationTeam e where e.name='" + name + "'";
		return evaluationTeamDao.findUnique(hql.toString());
	}
	public Page<EvaluationTeam> getall(Page<EvaluationTeam> page) {
		return evaluationTeamDao.getAll(page);
	}
	public void delete(List<Long> ids) {
		evaluationTeamDao.delete(ids);
	}

	public EvaluationTeam get(Long id) {
		return evaluationTeamDao.get(id);
	}

	public List<EvaluationTeam> list(List<PropertyFilter> filters) {
		return evaluationTeamDao.find(filters);
	}

	public Page<EvaluationTeam> list(Page<EvaluationTeam> page, List<PropertyFilter> filters) {
		return evaluationTeamDao.findPage(page, filters);
	}

	public void save(EvaluationTeam entity) {
		evaluationTeamDao.save(entity);
	}
}
