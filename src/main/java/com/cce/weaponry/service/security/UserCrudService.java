package com.cce.weaponry.service.security;

import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cce.modules.orm.Page;
import com.cce.modules.orm.PropertyFilter;
import com.cce.modules.security.springsecurity.SpringSecurityUtils;
import com.cce.modules.service.CrudServiceInterface;
import com.cce.weaponry.dao.register.RegionDao;
import com.cce.weaponry.dao.security.UserDao;
import com.cce.weaponry.entity.register.Region;
import com.cce.weaponry.entity.security.User;
import com.cce.weaponry.service.ServiceException;
import com.cce.weaponry.web.vo.register.UserSearchVO;

//Spring Service Bean的标识.
@Service
// 默认将类中的所有函数纳入事务管理.
@Transactional
public class UserCrudService implements CrudServiceInterface<User> {

	@Autowired
	private RegionDao regionDao;

	public static final String CRITERIA_ROLEID = "ROLE_ID";
	public static final String CRITERIA_REGIONID = "REGION_ID";
	private static Logger logger = LoggerFactory
			.getLogger(UserCrudService.class);

	@Autowired
	private UserDao userDao;

	public User getLoginUser() {
		User user = this.findUserByLoginName(SpringSecurityUtils
				.getCurrentUserName());
		return user;
	}

	/**
	 * 根据IDS查找所属人员
	 */
	public List<User> getByids(List<Long> ids) {
		StringBuilder hql = new StringBuilder()
				.append("from User u where 1=1 ");
		if (ids.size() > 0) {
			if (ids.size() == 1) {
				hql.append(" and u.region='" + ids.get(0) + "' ");
			} else {
				for (int i = 0; i < ids.size(); i++) {
					if (i == 0) {
						hql.append(" and (u.region='" + ids.get(i) + "'");
					}
					if (ids.size() - 1 == i) {
						hql.append(" or  u.region='" + ids.get(i) + "' )");
					} else {
						hql.append(" or  u.region='" + ids.get(i) + "'");
					}

				}
			}
		}
		return userDao.find(hql.toString());

	}

	/**
	 * 判断是否超级管理员.
	 */
	private boolean isSupervisor(Long id) {
		return id == 1;
	}

	@Transactional(readOnly = true)
	public User findUserByLoginName(String loginName) {
		String hql = "from User i where i.loginName='" + loginName + "' ";
		List<User> us = userDao.find(hql);
		return us.size() == 0 ? null : us.get(0);
	}

	/**
	 * 得到登录用户regionId
	 */
	@Transactional(readOnly = true)
	public Long getLoginUserRegionId() {
		return userDao.getLoginUserRegionId();
	}

	@Transactional(readOnly = true)
	public List<User> findByMap(Map<String, ?> criteria) {
		if (criteria.isEmpty())
			return null;
		String hql = "from User user inner join user.roleList roles";
		StringBuffer sb = new StringBuffer();
		if (criteria.get(CRITERIA_REGIONID) != null) {
			sb.append(" where user.region.id in (:").append(CRITERIA_REGIONID)
					.append(")");
		}
		if (criteria.get(CRITERIA_ROLEID) != null) {
			if (sb.length() < 1) {
				sb.append(" where ");
			} else {
				sb.append(" and ");
			}
			sb.append("roles.id in (:").append(CRITERIA_ROLEID).append(")");
		}
		return userDao.find(hql.concat(sb.toString()), criteria);
	}

	/**
	 * 检查用户名是否唯一.
	 * 
	 * @return loginName在数据库中唯一或等于oldLoginName时返回true.
	 */
	@Transactional(readOnly = true)
	public boolean isLoginNameUnique(String newLoginName, String oldLoginName) {
		return userDao
				.isPropertyUnique("loginName", newLoginName, oldLoginName);
	}

	public void delete(List<Long> ids) {
		for (Iterator iterator = ids.iterator(); iterator.hasNext();) {
			Long id = (Long) iterator.next();
			if (isSupervisor(id)) {
				logger.error("操作员{}尝试删除超级管理员用户", SpringSecurityUtils
						.getCurrentUserName());
				throw new ServiceException("不能删除超级管理员用户");
			}
		}
		userDao.delete(ids);
	}

	@Transactional(readOnly = true)
	public List<User> list(List<PropertyFilter> filters) {
		return userDao.find(filters);
	}

	@Transactional(readOnly = true)
	public Page<User> list(Page<User> page, List<PropertyFilter> filters) {
		return userDao.findPage(page, filters);
	}

	public void save(User entity) {
		if (null == entity.getId() && StringUtils.isEmpty(entity.getPassword())) {
			entity.setPassword(entity.getName());
		}
		userDao.save(entity);
	}

	@Transactional(readOnly = true)
	public User get(Long id) {
		return userDao.get(id);
	}

	public Page<User> findUsersByCondition(Page<User> page,
			UserSearchVO condition) {
		User user = userDao.getLoginUser();
		Region region = user.getRegion();
		boolean isAdmin = false;
		if (user.getRole().getId() == 1) {
			isAdmin = true;
		}
		Long regionId = region.getId();
		StringBuilder hql = new StringBuilder(
				"select i from User i left join i.roleList r where 1=1 ");

		if (null != condition) {
			if (null != condition.getLoginName()
					&& !"".equals(condition.getLoginName())) {
				hql.append(" and i.loginName like '%").append(
						condition.getLoginName()).append("%' ");
			}
			if (null != condition.getName() && !"".equals(condition.getName())) {
				hql.append(" and i.name like '%").append(condition.getName())
						.append("%' ");
			}
			if (null != condition.getRoleId() && 0 != condition.getRoleId()) {
				hql.append(" and r.id=").append(condition.getRoleId()).append(
						" ");
			}
			if (null != condition.getRegionId() && 0!= condition.getRegionId().intValue()) {
				regionId = condition.getRegionId();
				isAdmin = false;
			}
		}

		if (!isAdmin && null != regionId && 0 != regionId.intValue()) {
			List<Region> regions = regionDao.findRegionsById(regionId);
			if (regions.size() > 0) {
				hql.append(" and i.region.id in ( ");
				for (Region i : regions) {
					hql.append(i.getId() + ",");
				}
				hql.deleteCharAt(hql.length() - 1);
				hql.append(" ) ");
			}
		}

		hql.append(" order by i.id desc ");
		userDao.getSession().evict(User.class);
		return userDao.findPage(page, hql.toString());
	}

	/**
	 * 判断是否是企业用户
	 * 
	 * @param ids
	 * @return
	 */
	public boolean isCompanyUser(List<Long> ids) {
		StringBuilder hql = new StringBuilder("select count(i.id) from User i left join i.roleList r where r.name!='企业用户' ");
		if (null != ids && ids.size() > 0) {
			hql.append(" and i.id in ( ");
			for (Long i : ids) {
				hql.append(i).append(",");
			}
			hql.deleteCharAt(hql.length() - 1).append(" ) ");
		}
		Long count = (Long) userDao.createQuery(hql.toString()).uniqueResult();
		return count > 0 ? false : true;
	}

}
