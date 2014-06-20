package com.cce.weaponry.service.training;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.hibernate.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Assert;

import sun.security.util.Debug;

import com.cce.modules.orm.Page;
import com.cce.modules.orm.PropertyFilter;
import com.cce.weaponry.dao.security.UserDao;
import com.cce.weaponry.dao.training.EntryDao;
import com.cce.weaponry.dao.training.ProjectDao;
import com.cce.weaponry.entity.security.Role;
import com.cce.weaponry.entity.training.Entry;
import com.cce.weaponry.entity.training.FileInfo;
import com.cce.weaponry.entity.training.Project;
import com.cce.weaponry.entity.training.PublishType;

@Service
@Transactional
public class EntryServiceImpl implements EntryService {

	@Autowired
	private EntryDao entryDao;
	@Autowired
	private UserDao userDao;
	@Autowired
	private ProjectDao projectDao;

	/**
	 * 根据IDS删除发布内容
	 * 
	 * @param ids
	 */
	public void deleteEntryByMgrId(List<Long> ids) {
		Map<String, List<Long>> map = new HashMap<String, List<Long>>();
		map.put("ids", ids);
		StringBuilder hql = new StringBuilder()
				.append("delete Entry e where e.refFile.id in (:ids)");
		Debug.println("根据培训文件ID删除发布", hql.toString());
		entryDao.batchExecute(hql.toString(), map);
	}

	/**
	 * 根据文件ID查看发布ids
	 * 
	 * @param ids
	 * @return
	 */
	public List<Long> getEntryIDs(List<Long> ids) {
		Map<String, List<Long>> map = new HashMap<String, List<Long>>();
		map.put("ids", ids);
		StringBuilder hql = new StringBuilder()
				.append("select e.id from  Entry e where e.refFile.id in (:ids)");
		Debug.println("根据培训文件查看所属发布IDS", hql.toString());
		return entryDao.find(hql.toString(), map);
	}

	// 保存发布培训内容
	public void addEntry(Entry entry, long projectId, String title,
			FileInfo fileInfo,
			PublishType publishType, Date startTime, Date endTime)
	{
		entry.setProjectId(projectId);
		entry.setTitle(title);
		entry.setPublishType(publishType);
		entry.setPublishTime(new Date());
		entry.setRefFile(fileInfo);
		entry.setStartTime(startTime);
		entry.setEndTime(endTime);
		entryDao.save(entry);
	}

	public void deleteEntry(long entryId) {

		entryDao.delete(entryId);
	}

	public Entry getEntry(long id) {

		return entryDao.get(id);
	}

	public List<Entry> getEntryByProject(long projectId) {

		Project project = projectDao.get(projectId);
		Assert.notNull(project);
		return project.getChildren();

	}

	public void save(Entry entry) {

		Assert.notNull(entry);
		entryDao.save(entry);
	}

	/**
	 * 根据发布ID删除发布及角色权限
	 */
	public void delete(List<Long> ids) {
		for (Long id : ids) {
			Entry entry = entryDao.get(id);
			entry.getRoleList().removeAll(entry.getRoleList());
			entryDao.delete(entry);
		}

	}

	public Entry get(Long id) {
		return entryDao.get(id);
	}

	public List<Entry> list(List<PropertyFilter> filters) {

		return entryDao.find(filters);
	}

	/**
	 * 根据登录用户角色查看发布的培训内容
	 * 
	 * @param page
	 * @param projectId
	 * @return
	 */
	public Page<Entry> getEntryByRole(Page<Entry> page, String projectId) {
		StringBuilder hql = new StringBuilder(
				"select e from Entry e left join e.roleList r where e.projectId='"
						+ projectId + "' ");

		List<Role> roleList = userDao.getLoginUser().getRoleList();
		boolean isAdmin = false;
		if (roleList.size() > 0) {
			hql.append(" and  r.id in ( ");
			for (Role r : roleList) {
				if ("管理员".equals(r.getName())) {
					isAdmin = true;
				}
				hql.append(r.getId()).append(",");
			}
			hql.deleteCharAt(hql.length() - 1).append(" ) ");
		}
		if (!isAdmin) {
			hql.append(" and e.startTime<=? ").append(" and e.endTime>=? ");
		}
		hql.append(" order by e.startTime desc ");
		Debug.println("根据角色查看发布的培训内容 ", hql.toString());
		if (isAdmin)
			return entryDao.findPage(page, hql.toString());
		else
			return entryDao.findPage(page,hql.toString(),(new Date(System.currentTimeMillis())),(new Date(System.currentTimeMillis())));
	}

	public List<Entry> findEntry4MainPage() {
		StringBuilder hql = new StringBuilder("from Entry e left join e.roleList r ");
		List<Role> roleList = userDao.getLoginUser().getRoleList();
		if (roleList.size() > 0) {
			hql.append(" where r.id in ( ");
			for (Role r : roleList) {
				hql.append(r.getId()).append(",");
			}
			hql.deleteCharAt(hql.length() - 1).append(" ) ");
		}
		// hql.append(" and e.startTime <='").append(
		// CompanyUtils.formatDate(new Date(System.currentTimeMillis()),
		// "yyyy-MM-dd HH:mm:ss")).append("' and s.endTime >='")
		// .append(
		// CompanyUtils.formatDate(new Date(System
		// .currentTimeMillis()), "yyyy-MM-dd HH:mm:ss"))
		// .append("' ");
		hql.append(" and e.startTime<=?");
		hql.append(" and e.endTime>=?");
		hql.append(" order by e.startTime desc ");
		Query query = entryDao.createQuery(hql.toString()).setParameter(0,
				(new Date(System.currentTimeMillis()))).setParameter(1,
				new Date(System.currentTimeMillis()));
		List<Entry> newsList = query.list();
		List<Entry> ret = new ArrayList();
		for (Iterator iterator = newsList.iterator(); iterator.hasNext();) {
			Object[] entry = (Object[]) iterator.next();
			ret.add((Entry) entry[0]);
		}
		return ret;
	}

	/**
	 * 查看发布内容
	 */
	public Page<Entry> list(Page<Entry> page, List<PropertyFilter> filters) {
		page.setOrder("desc");
		page.setOrderBy("startTime");
		return entryDao.findPage(page, filters);
	}

}
