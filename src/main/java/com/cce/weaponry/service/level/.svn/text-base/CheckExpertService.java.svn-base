package com.cce.weaponry.service.level;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import sun.security.util.Debug;

import com.cce.modules.orm.Page;
import com.cce.modules.orm.PropertyFilter;
import com.cce.modules.service.CrudServiceInterface;
import com.cce.weaponry.dao.level.CheckExpertDao;
import com.cce.weaponry.entity.level.CheckExpert;

@Service
@Transactional
public class CheckExpertService implements CrudServiceInterface<CheckExpert> {

	@Autowired
	private CheckExpertDao checkExpertDao;

	public Page<CheckExpert> getall(Page<CheckExpert> page) {
		page.setOrder("desc");
		page.setOrderBy("createDate");
		return checkExpertDao.getAll(page);
	}

	/**
	 * 删除组的时候把所属成员设置为NULL
	 * 
	 * @param ids
	 */
	public void updateIsNull(List<Long> ids) {
		Map<String, List<Long>> idsmap = new HashMap<String, List<Long>>();
		idsmap.put("ids", ids);
		String hql = "update CheckExpert c set c.team=null where c.team.id in (:ids)";
		sun.security.util.Debug.println("删除审查组后把所属成员设置为null", hql);
		checkExpertDao.batchExecute(hql.toString(), idsmap);
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
						"update CheckExpert c set c.team ='" + id + "' ")
						.append("where c.id ='" + num + "'");
				Debug.println("修改审查成员到一个审查组", hql.toString());
				checkExpertDao.batchExecute(hql.toString());
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
						"update CheckExpert c set c.team =null ").append(
						" where c.id='" + num + "' ");
				Debug.println("修改审查成员为null", hql.toString());
				checkExpertDao.batchExecute(hql.toString());
			}
		}
	}

	/**
	 * 加载组
	 * 
	 * @param teamId
	 *            组ID
	 * @return
	 */
	public List<CheckExpert> isTeam(Long teamId) {
		String hql = "from CheckExpert c where c.team='" + teamId + "'";
		Debug.println("查看审查组成员", hql);
		return checkExpertDao.find(hql.toString());
	}

	/**
	 * 如果是null的话加载为非成员组
	 * 
	 * @return
	 */

	public List<CheckExpert> notTeam(Long teamId) {
		String hql = "from CheckExpert c where   c.team!='" + teamId
				+ "' or c.team=null";
		Debug.println("加载非组成员信息", hql);
		return checkExpertDao.find(hql.toString());
	}

	public List<CheckExpert> allNotTeam() {

		return checkExpertDao.getAll();
	}

	/**
	 * 删除专家信息
	 */
	public void delete(List<Long> ids) {
		checkExpertDao.delete(ids);

	}

	/**
	 * 根据编号查找专家
	 */
	public CheckExpert get(Long id) {
		return checkExpertDao.get(id);
	}

	/**
	 * 根据专家名字查找专家(List重名专家)
	 */
	 public List<CheckExpert> getProfessorByName(String name) {
		// TODO Auto-generated method stub
		return checkExpertDao.findBy("name", name);
	}
	public List<CheckExpert> list(List<PropertyFilter> filters) {

		return checkExpertDao.find(filters);
	}

	/**
	 * 查看所有专家
	 */
	public Page<CheckExpert> list(Page<CheckExpert> page, List<PropertyFilter> filters) {
		return checkExpertDao.findPage(page, filters);
	}

	/**
	 * 保存、修改专家信息
	 */
	public void save(CheckExpert entity) {
		checkExpertDao.save(entity);
	}

	/**
	 * 随机抽取专家数
	 * 
	 * @param num
	 * @return
	 */
	public List<CheckExpert> getRandomProfessor(int num) {

		List<CheckExpert> list = checkExpertDao.getAll();
		List<CheckExpert> checkExpertlist = new ArrayList<CheckExpert>();
		List<Integer> tempnum = new ArrayList<Integer>();
		if (num <= list.size()) {
			while (true) {
				if (tempnum.size() < num) {
					int temp = (int) (Math.random() * list.size());
					if (!tempnum.contains(temp)) {
						tempnum.add(temp);
						checkExpertlist.add(list.get(temp));
					}
				} else {
					break;
				}
			}

		}
		return checkExpertlist;
	}
}
