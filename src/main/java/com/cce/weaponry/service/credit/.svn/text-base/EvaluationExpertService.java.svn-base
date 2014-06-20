package com.cce.weaponry.service.credit;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cce.modules.orm.Page;
import com.cce.modules.orm.PropertyFilter;
import com.cce.modules.service.CrudServiceInterface;
import com.cce.weaponry.dao.credit.EvaluationExpertDao;
import com.cce.weaponry.entity.credit.EvaluationExpert;

@Service
@Transactional
public class EvaluationExpertService implements CrudServiceInterface<EvaluationExpert> {

	@Autowired
	private EvaluationExpertDao evaluationExpertDao;

	/**
	 * 删除组设置其成员为NULL
	 * 
	 * @param ids
	 */
	public void updateIsNull(List<Long> ids) {
		if (ids.size() > 0) {
			for (Long num : ids) {
				StringBuilder hql = new StringBuilder().append(
						"update EvaluationExpert c set c.team =null ").append(
						"where c.team ='" + num + "'");

				evaluationExpertDao.batchExecute(hql.toString());
			}
		}
	}

	/**
	 * 修改为成员组
	 * 
	 * @param ids
	 * @param id
	 */
	public void updateIsTeam(List<Long> ids, Long id) {
		if (ids.size() > 0) {
			for (Long num : ids) {
				StringBuilder hql = new StringBuilder().append(
						"update EvaluationExpert c set c.team ='" + id + "' ")
						.append("where c.id ='" + num + "'");

				evaluationExpertDao.batchExecute(hql.toString());
			}
		}
	}

	/**
	 * 修改为非成员组
	 * 
	 * @param ids
	 */
	public void updateNotTeam(List<Long> ids) {
		if (ids.size() > 0) {
			for (Long num : ids) {
				StringBuilder hql = new StringBuilder().append(
						"update EvaluationExpert c set c.team =null ").append(
						" where c.id='" + num + "' ");
				evaluationExpertDao.batchExecute(hql.toString());
			}

		}

	}

	/**
	 * 加载成员
	 * 
	 * @param teamid
	 * @return
	 */
	public List<EvaluationExpert> isTeam(Long teamid) {
		String hql = "from EvaluationExpert e where e.team='" + teamid + "'";
		return evaluationExpertDao.find(hql.toString());
	}

	/**
	 * 加载非成员
	 * 
	 * @return
	 */
	public List<EvaluationExpert> notTeam(Long teamid) {
		String hql = "from EvaluationExpert e where   e.team!='" + teamid
				+ "' or e.team=null";
		return evaluationExpertDao.find(hql.toString());
	}

	public List<EvaluationExpert> allNotTeam() {

		return evaluationExpertDao.getAll();
	}
	public Page<EvaluationExpert> getall(Page<EvaluationExpert> page) {
		return evaluationExpertDao.getAll(page);
	}
	public void delete(Long id) {
		evaluationExpertDao.delete(id);
	}

	/**
	 * 删除成员;当删除成员的时候:如果该成员有所属组;应当将该组的数量-1
	 */
	public void delete(List<Long> ids) {
		evaluationExpertDao.delete(ids);
		// if (ids.size() > 0) {
		// for (Long id : ids) {
		// if (null == evaluationExpertDao.get(id).getTeam()) {
		// evaluationExpertDao.delete(id);
		// } else {
		// EvaluationExpert e = evaluationExpertDao.get(id);
		// e.getTeam().setCount(e.getTeam().getCount() - 1);
		// evaluationExpertDao.save(e);
		// evaluationExpertDao.delete(id);
		// }
		// }
		// }
	}

	public EvaluationExpert get(Long id) {
		return evaluationExpertDao.get(id);
	}

	public List<EvaluationExpert> list(List<PropertyFilter> filters) {
		return evaluationExpertDao.find(filters);
	}

	public Page<EvaluationExpert> list(Page<EvaluationExpert> page, List<PropertyFilter> filters) {
		return evaluationExpertDao.findPage(page, filters);
	}

	public void save(EvaluationExpert entity) {
		evaluationExpertDao.save(entity);
	}

	public List<EvaluationExpert> findEvaluationExpertsByName(
			String evaluationExpertName) {
		String hql = " from EvaluationExpert e where e.name like '%"
				+ evaluationExpertName
				+ "%' ";
		return evaluationExpertDao.find(hql);
	}

	@SuppressWarnings("unchecked")
	public List<EvaluationExpert> findRandomEvaluationExperts(int num) {
		String hql = " from EvaluationExpert e order by rand() ";
		return evaluationExpertDao.createQuery(hql).setMaxResults(num).list();
	}
}
