package com.cce.weaponry.service.level;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import sun.security.util.Debug;

import com.cce.modules.orm.Page;
import com.cce.modules.orm.PropertyFilter;
import com.cce.modules.service.CrudServiceInterface;
import com.cce.weaponry.dao.level.CompanyLevelDetailDao;
import com.cce.weaponry.entity.level.CompanyLevelDetail;

@Service
@Transactional
public class CompanyLevelDetailService implements CrudServiceInterface<CompanyLevelDetail> {

	@Autowired
	private CompanyLevelDetailDao companyLevelDetailDao;

	/**
	 * 根据申请分级ID查看分级项信息
	 * 
	 * @param levelId
	 * @return
	 */
	public List<CompanyLevelDetail> getLevelDetail(Long levelId) {

		StringBuilder hql = new StringBuilder().append(
				"from   CompanyLevelDetail   d where ").append(
				" d.companyLevel.id='" + levelId + "'");
		Debug.println("根据申请分级ID查看分级审批历史", hql.toString());
		return companyLevelDetailDao.find(hql.toString());
	}

	/**
	 * 删除申请等级详细信息
	 */
	public void delete(List<Long> ids) {
		String hql="";
		 if(ids.size()>0){
					
		 for (int i = 0; i < ids.size(); i++) {
				hql = "delete CompanyLevelDetail c where c.companyLevel='"
						+ ids.get(i) + "'";
				companyLevelDetailDao.batchExecute(hql.toString());
		  }
		}
		Debug.println("根据申请分级ID删除分级申请项", hql);
	}

	/**
	 * 根据ID查看申请等级信息
	 */
	public CompanyLevelDetail get(Long id) {
		return companyLevelDetailDao.get(id);
	}

	/**
	 * 多条件查看申请详细信息
	 */
	public List<CompanyLevelDetail> list(List<PropertyFilter> filters) {
		return companyLevelDetailDao.find(filters);
	}

	/**
	 * 多条件分页查看申请详细信息
	 */
	public Page<CompanyLevelDetail> list(Page<CompanyLevelDetail> page, List<PropertyFilter> filters) {
		return companyLevelDetailDao.findPage(page, filters);
	}

	/**
	 * 保存、修改申请等级详细信息
	 */
	public void save(CompanyLevelDetail entity) {
		companyLevelDetailDao.save(entity);
	}
}
