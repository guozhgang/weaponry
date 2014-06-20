package com.cce.weaponry.service.credit;

import java.util.List;

import org.hibernate.criterion.Expression;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cce.modules.orm.Page;
import com.cce.modules.orm.PropertyFilter;
import com.cce.modules.service.CrudServiceInterface;
import com.cce.weaponry.dao.credit.EvaluationMemberDao;
import com.cce.weaponry.entity.credit.EvaluationMember;

@Service
@Transactional
public class EvaluationMemberService implements CrudServiceInterface<EvaluationMember> {

	@Autowired
	private EvaluationMemberDao evaluationMemberDao;

	public Page<EvaluationMember> getall(Page<EvaluationMember> page) {
		return evaluationMemberDao.getAll(page);
	}
	public void delete(Long id) {
		evaluationMemberDao.delete(id);
	}

	public void delete(List<Long> ids) {
		evaluationMemberDao.delete(ids);
	}

	public EvaluationMember get(Long id) {
		return evaluationMemberDao.get(id);
	}

	public List<EvaluationMember> list(List<PropertyFilter> filters) {
		return evaluationMemberDao.find(filters);
	}

	public Page<EvaluationMember> list(Page<EvaluationMember> page, List<PropertyFilter> filters) {
		return evaluationMemberDao.findPage(page, filters);
	}

	public void save(EvaluationMember entity) {
		evaluationMemberDao.save(entity);
	}

	@SuppressWarnings("unchecked")
	public List<EvaluationMember> findRandomEvaluationMembers(int num) {
		return evaluationMemberDao.createCriteria().add(
				Expression.sql("1=1 order by rand()")).setMaxResults(num)
				.list();
	}

	public List<EvaluationMember> findEvaluationMembersByName(String memberName) {
		String hql = " from EvaluationMember e where e.name like '%"
				+ memberName + "%' ";
		return evaluationMemberDao.find(hql);
	}

}
