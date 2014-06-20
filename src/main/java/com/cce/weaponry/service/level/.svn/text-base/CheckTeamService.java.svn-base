package com.cce.weaponry.service.level;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import sun.security.util.Debug;

import com.cce.modules.orm.Page;
import com.cce.modules.orm.PropertyFilter;
import com.cce.modules.service.CrudServiceInterface;
import com.cce.weaponry.dao.level.CheckTeamDao;
import com.cce.weaponry.entity.level.CheckTeam;

@Service
@Transactional
public class CheckTeamService implements CrudServiceInterface<CheckTeam> {

	@Autowired
	private CheckTeamDao checkTeamDao;

	/**
	 * 根据名称查看审查组
	 * 
	 * @param name
	 * @return
	 */
	public CheckTeam getByName(String name) {
		String hql = "from CheckTeam c where c.name='" + name + "' ";
		Debug.println("根据审查组名称查看审查组 ", hql);
		return checkTeamDao.findUnique(hql.toString());
	}

	/**
	 * 查看所有审查组
	 * 
	 * @param page
	 * @return
	 */
	public Page<CheckTeam> getall(Page<CheckTeam> page) {
		page.setOrder("desc");
		page.setOrderBy("createDate");
		return checkTeamDao.getAll(page);
	}

	/**
	 * 分级评审中加载审查组名称
	 * 
	 * @return
	 */
	public List<CheckTeam> getCheckTeam() {
		String hql = "select new Map(c.id as groupId,c.name as groupName) from CheckTeam c";
		Debug.println("查看审查组的ID和名称", hql);
		return checkTeamDao.find(hql.toString());
	}

	/**
	 * 根据ID删除专家组
	 */
	public void delete(List<Long> ids) {
		checkTeamDao.delete(ids);
	}

	/**
	 * 根据ID查看专家组
	 */
	public CheckTeam get(Long id) {
		return checkTeamDao.get(id);
	}
	public List<CheckTeam> list(List<PropertyFilter> filters) {
		return checkTeamDao.find(filters);
	}
	public Page<CheckTeam> list(Page<CheckTeam> page, List<PropertyFilter> filters) {
		return checkTeamDao.findPage(page, filters);
	}

	/**
	 * 保存、修改专家组
	 */
	public void save(CheckTeam entity) {
		checkTeamDao.save(entity);
	}

}
