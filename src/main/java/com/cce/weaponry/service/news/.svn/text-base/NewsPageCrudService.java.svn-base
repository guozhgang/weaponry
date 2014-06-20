package com.cce.weaponry.service.news;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.util.WebUtils;

import com.cce.modules.orm.Page;
import com.cce.modules.orm.PropertyFilter;
import com.cce.modules.service.CrudServiceInterface;
import com.cce.modules.web.struts2.Struts2Utils;
import com.cce.weaponry.dao.news.NewsPageDao;
import com.cce.weaponry.dao.security.UserDao;
import com.cce.weaponry.entity.news.NewsPage;
import com.cce.weaponry.entity.security.Role;

@Service
@Transactional
public class NewsPageCrudService implements CrudServiceInterface<NewsPage> {

	@Autowired
	private NewsPageDao pageDao;

	@Autowired
	private UserDao userDao;

	public void delete(List<Long> ids) {
		for (Long i : ids) {
			NewsPage newsPage = pageDao.get(i);
			newsPage.getRoleList().removeAll(newsPage.getRoleList());
			pageDao.delete(newsPage);
		}
	}

	public void delete(NewsPage newsPage) {
		pageDao.delete(newsPage);
	}

	@Transactional(readOnly = true)
	public NewsPage get(Long id) {
		return pageDao.get(id);
	}

	@Transactional(readOnly = true)
	public List<NewsPage> list(List<PropertyFilter> filters) {
		return pageDao.find(filters);
	}

	@Transactional(readOnly = true)
	public Page<NewsPage> list(Page<NewsPage> page, List<PropertyFilter> filters) {
		return pageDao.findPage(page, filters);
	}

	@Transactional(readOnly = true)
	public Page<NewsPage> listWithoutLob(Page<NewsPage> page,
			List<PropertyFilter> filters) {
		Map<String, Object> values = WebUtils.getParametersStartingWith(
				Struts2Utils.getRequest(), "filter_");
		StringBuilder hql = new StringBuilder(
				"select page from NewsPage page where 1=1 ");// new
		// NewsPage(page.id,page.title,page.category,page.createTime,page.updateTime)
		Iterator<String> it = values.keySet().iterator();
		if (it.hasNext()) {
			String key = it.next();
			String value = values.get(key).toString();
			if ("LIKES_title_OR_category_name".equals(key)) {
				hql.append(" and page.title like '").append(value).append(
						"' and page.category.shorthand like '").append(value)
						.append("' ");// page.category.shorthand
			} else if ("LIKES_category_name".equals(key)) {
				hql.append(" and page.category.shorthand like '").append(value)
						.append("' ");
			} else if ("LIKES_title".equals(key)) {
				hql.append(" and page.title like '").append(value).append("' ");
			}
		}
		Page<NewsPage> pages = pageDao.findPage(page, hql.toString());
		List<NewsPage> list = pages.getResult();
		List<NewsPage> newList = new ArrayList<NewsPage>();
		for (NewsPage i : list) {
			i.setContent(null);
			newList.add(i);
		}
		pages.setResult(newList);
		return pages;
	}

	public void save(NewsPage entity) {
		if (entity.getId() == null) {
			entity.setCreateTime(new Date());
		}
		pageDao.save(entity);
	}

	@Transactional(readOnly = true)
	public List<NewsPage> getAll() {
		return pageDao.getAll();
	}

	@Transactional(readOnly = true)
	public List<NewsPage> findAllPagesByCatId(Long categoryId) {
		return this.pageDao.findBy("CATEGORY_ID", categoryId);
	}

	@Transactional(readOnly = true)
	public List<NewsPage> findPagesByCondition(String content, Date beginDate,
			Date endDate) {
		String hql = "from com.cce.safepork.entity.platform.Pageinfo p where 1=1 ";
		if (null != content && !"".equals(content)) {
			hql += " and p.content like '%" + content + "%' ";
		}
		if (null != beginDate) {
			hql += " and p.createTime>='" + beginDate + "' ";
		}
		if (null != endDate) {
			hql += " and p.createTime<='" + endDate + "' ";
		}
		return pageDao.find(hql);
	}

	public Page<NewsPage> findPagesByTitleAndContent(Page<NewsPage> page,
			String keyword) {
		String hql = "from NewsPage n where 1=1 ";
		if (null != keyword && !"".equals(keyword)) {
			hql += " and (n.title like '%" + keyword
					+ "%' or n.content like '%" + keyword + "%') ";
		}
		return pageDao.findPage(page, hql);
	}

	/**
	 * 通过 允许查看角色、分类id、前五条 条件进行新闻查询
	 * 
	 * @param categoryId
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public Map<Long, String> findNewsByLogin(Long categoryId) {
		StringBuilder hql = new StringBuilder(
				"select new NewsPage(n.id,n.title) from NewsPage n left join n.roleList r where 1=1 ");
		if (null != categoryId && 0l != categoryId) {
			hql.append(" and n.category.id=").append(categoryId).append(" ");
		}
		List<Role> roleList = userDao.getLoginUser().getRoleList();
		if(roleList.size()>0){
			hql.append(" and  r.id in ( ");
			for (Role r : roleList) {
				hql.append(r.getId()).append(",");
			}
			hql.deleteCharAt(hql.length() - 1).append(" ) ");
		}
		hql.append(" order by n.createTime desc ");
		Map<Long, String> newsMap = new HashMap<Long, String>();
		List<NewsPage> newsList = pageDao.createQuery(hql.toString())
				.setFirstResult(0).setMaxResults(5).list();
		for (NewsPage i : newsList) {
			newsMap.put(i.getId(), i.getTitle());
		}
		return newsMap;
	}

	/**
	 * 通过 允许查看角色、分类id、前五条 条件进行新闻查询
	 * 
	 * @param categoryId
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List<NewsPage> findNews4MainPage() {
		StringBuilder hql = new StringBuilder(
"from NewsPage n left join n.roleList r where 1=1 ");
		List<Role> roleList = userDao.getLoginUser().getRoleList();
		if (roleList.size() > 0) {
			hql.append(" and  r.id in ( ");
			for (Role r : roleList) {
				hql.append(r.getId()).append(",");
			}
			hql.deleteCharAt(hql.length() - 1).append(" ) ");
		}
		hql.append(" order by n.createTime desc ");
		Map<Long, String> newsMap = new HashMap<Long, String>();
		List<NewsPage> newsList = pageDao.createQuery(hql.toString()).list();// setMaxResults(5).list();
		List<NewsPage> ret = new ArrayList();
		for (Iterator iterator = newsList.iterator(); iterator.hasNext();) {
			Object[] newsPage = (Object[]) iterator.next();
			ret.add((NewsPage) newsPage[0]);
		}
		return ret;
	}
}
