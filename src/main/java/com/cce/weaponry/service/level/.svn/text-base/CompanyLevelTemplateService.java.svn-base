package com.cce.weaponry.service.level;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cce.modules.orm.Page;
import com.cce.modules.orm.PropertyFilter;
import com.cce.modules.service.CrudServiceInterface;
import com.cce.weaponry.dao.level.CompanyLevelTemplateDao;
import com.cce.weaponry.entity.level.CompanyLevelTemplate;

@Service
@Transactional
public class CompanyLevelTemplateService implements CrudServiceInterface<CompanyLevelTemplate> {

	@Autowired
	private CompanyLevelTemplateDao companyLevelTemplateDao;

	/**
	 * 删除模板信息
	 */
	public void delete(List<Long> ids) {
		companyLevelTemplateDao.delete(ids);
	}

	/**
	 * 根据ID查看等级模板信息
	 */
	@Transactional(readOnly = true)
	public CompanyLevelTemplate get(Long id) {
		return companyLevelTemplateDao.get(id);
	}

	public List<CompanyLevelTemplate> list(List<PropertyFilter> filters) {
		return companyLevelTemplateDao.find(filters);
	}

	public Page<CompanyLevelTemplate> list(Page<CompanyLevelTemplate> page, List<PropertyFilter> filters) {
		return companyLevelTemplateDao.findPage(page, filters);
	}

	/**
	 * 保存、修改等级模板信息
	 */
	public void save(CompanyLevelTemplate entity) {
		companyLevelTemplateDao.save(entity);
	}
}
