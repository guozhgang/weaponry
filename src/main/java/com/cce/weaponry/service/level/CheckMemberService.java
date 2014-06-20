package com.cce.weaponry.service.level;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cce.modules.orm.Page;
import com.cce.modules.orm.PropertyFilter;
import com.cce.modules.service.CrudServiceInterface;
import com.cce.weaponry.dao.level.CheckMemberDao;
import com.cce.weaponry.entity.level.CheckMember;

@Service
@Transactional
public class CheckMemberService implements CrudServiceInterface<CheckMember> {

	@Autowired
	private CheckMemberDao checkMemberDao;

	/**
	 * 删除委员信息
	 */
	public void delete(List<Long> ids) {
		checkMemberDao.delete(ids);
	}

	/**
	 * 根据编号查看委员信息
	 */
	public CheckMember get(Long id) {
		return checkMemberDao.get(id);
	}

	public Page<CheckMember> getall(Page<CheckMember> page) {
		return checkMemberDao.getAll(page);
	}

	/**
	 * 多条件查看委员信息
	 */
	public List<CheckMember> list(List<PropertyFilter> filters) {
		return checkMemberDao.find(filters);
	}

	/**
	 * 多条件查看委员信息
	 */
	public Page<CheckMember> list(Page<CheckMember> page, List<PropertyFilter> filters) {
		return checkMemberDao.findPage(page, filters);
	}

	/**
	 * 保存、修改委员信息
	 */
	public void save(CheckMember entity) {
		checkMemberDao.save(entity);
	}
}
