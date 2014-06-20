package com.cce.weaponry.service.news;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.hibernate.FlushMode;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cce.modules.orm.Page;
import com.cce.modules.orm.PropertyFilter;
import com.cce.modules.service.CrudServiceInterface;
import com.cce.weaponry.dao.news.NewsCategoryDao;
import com.cce.weaponry.dao.news.NewsPageDao;
import com.cce.weaponry.dao.security.UserDao;
import com.cce.weaponry.entity.news.NewsCategory;
import com.cce.weaponry.entity.news.NewsPage;
import com.cce.weaponry.entity.security.Role;

@Service
@Transactional
public class NewsCategoryCrudService implements
		CrudServiceInterface<NewsCategory> {

	@Autowired
	private NewsCategoryDao categoryDao;

	@Autowired
	private UserDao userDao;

	@Autowired
	private NewsPageDao newsPageDao;

	public void delete(List<Long> ids) {
		if (ids.size() > 0) {
			for (Long i : ids) {
				NewsCategory cate = categoryDao.get(i);
				for (NewsPage j : cate.getPages()) {
					j.getRoleList().remove(j.getRoleList());
					newsPageDao.delete(j);
				}
				categoryDao.delete(i);
			}
		}
	}

	@Transactional(readOnly = true)
	public NewsCategory get(Long id) {
		return categoryDao.get(id);
	}

	@Transactional(readOnly = true)
	public List<NewsCategory> getAll() {
		return categoryDao.getAll();
	}

	@Transactional(readOnly = true)
	public List<NewsCategory> list(List<PropertyFilter> filters) {
		return categoryDao.find(filters);
	}

	@Transactional(readOnly = true)
	public Page<NewsCategory> list(Page<NewsCategory> page,
			List<PropertyFilter> filters) {
		categoryDao.getSession().evict(NewsCategory.class);
		return categoryDao.findPage(page, filters);
	}

	public void save(NewsCategory entity) {
		categoryDao.save(entity);
	}

	public boolean saveNewsCategory(NewsCategory entity) {
		Session session = categoryDao.getSession();
		session.setFlushMode(FlushMode.NEVER);
		NewsCategory real = this.getByName(entity.getShorthand());
		if (entity.getId() == null && null == real) { // 新增且不存在有相同名称的
			entity.setCreateTime(new Date());
			session.setFlushMode(FlushMode.AUTO);
			categoryDao.save(entity);
			session.flush();
			return true;
		} else if (null != entity.getId()) { // 修改
			if (null == real
					|| (null != real && real.getId().longValue() == entity
							.getId())) {
				session.setFlushMode(FlushMode.AUTO);
				categoryDao.save(entity);
				session.flush();
				return true;
			}
		}
		return false;
	}

	public boolean isNameExists(String categoryName) {
		String hql = "select count(i.shorthand) from NewsCategory i where i.shorthand ='"
				+ categoryName + "' ";
		Long count = (Long) categoryDao.findUnique(hql);
		return count > 0 ? true : false;
	}

	public NewsCategory getByName(String shorthand) {
		String hql = "from NewsCategory i where i.shorthand ='" + shorthand
				+ "' ";
		List<NewsCategory> list = categoryDao.find(hql);
		if (list.size() > 0)
			return list.get(0);
		return null;
	}

	public Map<Long, String> findCategories() {
		Map<Long, String> map = new HashMap<Long, String>();
		StringBuilder hql = new StringBuilder(
				"select new NewsCategory(c.id,c.shorthand) from NewsCategory c left join c.pages p left join p.roleList r where 1=1 ");
		List<Role> list = userDao.getLoginUser().getRoleList();
		if (list.size() > 0) {
			hql.append(" and  r.id in ( ");
			for (Role r : list) {
				hql.append(r.getId()).append(",");
			}
			hql.deleteCharAt(hql.length() - 1).append(" ) ");
		}
		hql.append(" order by c.createTime desc ");
		List<NewsCategory> newsCategories = categoryDao.find(hql.toString());
		for (NewsCategory i : newsCategories) {
			map.put(i.getId(), i.getShorthand());
		}
		return map;
	}

}
