package com.cce.weaponry.service.register;

import java.lang.reflect.InvocationTargetException;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.beanutils.BeanUtils;
import org.hibernate.FlushMode;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cce.modules.orm.Page;
import com.cce.modules.orm.PropertyFilter;
import com.cce.modules.security.springsecurity.SpringSecurityUtils;
import com.cce.modules.service.CrudServiceInterface;
import com.cce.weaponry.dao.register.CompanyBadgeDao;
import com.cce.weaponry.dao.register.CompanyDao;
import com.cce.weaponry.dao.register.CompanyInfoDao;
import com.cce.weaponry.dao.register.RegionDao;
import com.cce.weaponry.dao.security.UserDao;
import com.cce.weaponry.entity.register.Company;
import com.cce.weaponry.entity.register.CompanyBadge;
import com.cce.weaponry.entity.register.CompanyInfo;
import com.cce.weaponry.entity.register.Region;
import com.cce.weaponry.entity.security.User;
import com.cce.weaponry.service.common.CompanyUtils;
import com.cce.weaponry.web.vo.register.Cert4CompanySearchVO;
import com.cce.weaponry.web.vo.register.Cert4CompanyStatsVO;

@Service
@Transactional
public class CompanyInfoService implements CrudServiceInterface<CompanyInfo> {

	@Autowired
	private CompanyBadgeDao companyBadgeDao;

	@Autowired
	private CompanyDao companyDao;

	@Autowired
	private CompanyInfoDao companyInfoDao;

	@Autowired
	private RegionDao regionDao;

	@Autowired
	private UserDao userDao;

	// ----------- 最新代码分隔 -----------

	/**
	 * 根据用户id查询企业信息列表
	 */
	public Page<CompanyInfo> findComInfosByUserId(Page<CompanyInfo> page,
			Long userId) {
		String hql = "select c from CompanyInfo c,User u where c.company=u.company and u.id="
				+ userId + " order by c.createDate desc ";
		companyInfoDao.getSession().evict(CompanyInfo.class);
		return companyInfoDao.findPage(page, hql);
	}

	/**
	 * 根据用户Id查询用户最近通过的企业信息
	 * 
	 * @return
	 */
	public CompanyInfo getCompanyNewInfo(Long userId) {
		String hql = "select i from CompanyInfo i,User u where i.company=u.company and u.id="
				+ userId + " and i.status='PASSED' order by i.updateDate desc ";
		List<CompanyInfo> comInfos = companyInfoDao.find(hql);
		if (comInfos.size() > 0)
			return comInfos.get(0);
		else
			return null;
	}

	/**
	 * 修改企业信息
	 * 
	 * @param companyInfo
	 * @return
	 */
	public CompanyInfo saveCompanyInfo(CompanyInfo companyInfo) {
		companyInfoDao.getSession().setFlushMode(FlushMode.NEVER);
		// 判断是否在审批过程当中或者审批成功
		String sql = "select count(c.id) from company_info c where (c.status='WAITING' or c.status='PROCESSING' or c.status='PASSED') and c.id="
				+ companyInfo.getId();
		Object objCount = companyInfoDao.getSession().createSQLQuery(sql)
				.uniqueResult();
		int count = 0;
		try {
			count = ((Integer) objCount).intValue();
		} catch (Exception e) {
			count = ((BigInteger) objCount).intValue();
		}
		if (count > 0)
			return null;
		else {
			Session session = companyInfoDao.getSession();
			session.setFlushMode(FlushMode.AUTO);
			companyInfoDao.save(companyInfo);
			session.flush();
			session.evict(CompanyInfo.class);
			return companyInfo;
		}
	}

	/**
	 * 创建企业信息
	 * 
	 * @param companyInfo
	 * @return
	 * @throws NoSuchMethodException
	 * @throws InvocationTargetException
	 * @throws InstantiationException
	 * @throws Exception
	 */
	public CompanyInfo createCompanyInfo(CompanyInfo companyInfo) {
		User loginUser = userDao.getLoginUser();
		// 保存企业
		Company company = loginUser.getCompany();
		if (null == company) {
			company = new Company();
			company.setRegion(loginUser.getRegion());
			companyDao.save(company);

			// 保存用户信息
			String hql = "update User u set u.company.id=" + company.getId()
					+ " where u.id=" + loginUser.getId();

			userDao.getSession().createQuery(hql).executeUpdate();
		} else {
			// 有正在处理的申请项的话，不可新建
			String hql = "select count(c.id) from CompanyInfo c where (c.status='WAITING' or c.status='PROCESSING') and c.company.id="
					+ company.getId();
			Long count = (Long) companyInfoDao.createQuery(hql).uniqueResult();
			if (count > 0)
				return null;
		}

		// 保存企业信息
		companyInfo.setRegisterNo("37" + CompanyUtils.getFixedLengthRandom(5)); // 企业定点屠宰证号
		companyInfo.setCreateBy(loginUser.getLoginName());
		companyInfo.setCreateDate(new Date());
		companyInfo.setStatus("CREATED");
		companyInfo.setCompany(company);

		// 没有通过备案则新建时更换企业名称
		CompanyInfo com = company.getLastAppCompanyInfo();

		if (null == com) {
			company.setName(companyInfo.getNameCN());
			companyDao.save(company);
		} else {
			companyInfo.setCredit(com.getCredit());
			companyInfo.setCreditRating(com.getCreditRating());
			companyInfo.setLevel(com.getLevel());
		}
		companyInfoDao.save(companyInfo);

		if (null != com) {
			// 复制备案通过的证书证章信息
			List<CompanyBadge> badges = company.getLastAppCompanyInfo()
					.getCompanyBadge();
			for (CompanyBadge i : badges) {
				CompanyBadge tmp = new CompanyBadge();
				try {
					tmp = (CompanyBadge) BeanUtils.cloneBean(i);
					tmp.setId(null);
					tmp.setCompanyInfo(companyInfo);

					companyBadgeDao.save(tmp);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}

		return companyInfo;
	}

	/**
	 * 备案查询
	 * 
	 * @param page
	 * @param condition
	 * @return 页面所需的封装对象page
	 */
	public Page<CompanyInfo> searchApprovalRegistersByCondition(Page page,
			Cert4CompanySearchVO condition) {
		String regionIdStr = null;
		String nameCN = null;
		Date beginDate = null;
		Date endDate = null;
		String fixedButchNo = null;
		String registerNo = null;
		Integer status = null;

		if (null != condition) {
			regionIdStr = condition.getRegionId();
			nameCN = condition.getEntName();
			beginDate = condition.getBeginDate();
			endDate = condition.getEndDate();
			fixedButchNo = condition.getFixedButchNo();
			registerNo = condition.getRegisterNo();
			status = condition.getStatus();
		}

		User user = userDao.getLoginUser();

		Long regionId = (regionIdStr != null && !"".equals(regionIdStr)) ? regionDao
				.get(Long.parseLong(regionIdStr)).getId()
				: user.getRegion().getId();

		// id name taxCert orgCode createDate status updateDate
		String selectHql = "select i from CompanyInfo i where i.company.active=1 ";
		StringBuilder hql = new StringBuilder();
		if (null != nameCN && !"".equals(nameCN)) {
			hql.append(" and i.nameCN like '%").append(nameCN).append("%'");
		}
		if (null != fixedButchNo && !"".equals(fixedButchNo)) {
			hql.append(" and i.fixedButchNo like '%").append(fixedButchNo)
					.append("%' ");
		}
		if (null != registerNo && !"".equals(registerNo)) {
			hql.append(" and i.registerNo like '%").append(registerNo).append(
					"%' ");
		}
		if (null != beginDate && null != endDate
				&& endDate.compareTo(beginDate) == 0) {
			if (beginDate.compareTo(endDate) == 0) {
				hql.append(" and year(i.createDate)='").append(
						CompanyUtils.formatDate(beginDate, "yyyy"))
						.append("' ");
				hql.append(" and month(i.createDate)='").append(
						CompanyUtils.formatDate(beginDate, "MM")).append("' ");
				hql.append(" and day(i.createDate)='").append(
						CompanyUtils.formatDate(beginDate, "dd")).append("' ");
			}
		} else {
			if (null != beginDate) {
				hql.append(" and i.createDate >='").append(
						CompanyUtils.formatDate(beginDate)).append("' ");
			}
			if (null != endDate) {
				hql.append(" and i.createDate <='").append(
						CompanyUtils.formatDate(endDate)).append("' ");
			}
		}
		if (null != regionId && 0 != regionId.intValue()) {
			List<Region> regions = regionDao.findRegionsById(regionId);
			if (regions.size() > 0) {
				hql.append(" and i.company.region.id in ( ");
				for (Region r : regions) {
					hql.append(r.getId()).append(",");
				}
				hql.deleteCharAt(hql.length() - 1).append(" ) ");
			}
		}
		if (null != status && 0 != status.intValue()) {
			// 1创建 2 等待审批 3 审批中 4 通过 5 退回
			if (1 == status) {
				hql.append(" and (i.status=null or i.status='CREATED') ");
			}
			if (2 == status) {
				hql.append(" and i.status='WAITING' ");
			}
			if (3 == status) {
				hql.append(" and i.status='PROCESSING' ");
			}
			if (4 == status) {
				hql.append(" and i.status='PASSED' ");
			}
			if (5 == status) {
				hql.append(" and i.status='REJECTED' ");
			}
		}
		hql.append(" and i.status<>null and i.status<>'CREATED' ");
		hql.append(" order by i.createDate desc ");
		return companyInfoDao.findPage(page, selectHql + hql.toString());
	}

	/**
	 * 根据公司统计技术人员信息
	 * 
	 * @param regionId
	 * @return
	 */
	public Map<String, Integer> statsCompaniesByRegion(String regionIdStr) {
		Long regionId = null;
		if (null != regionIdStr && !"".equals(regionIdStr)) {
			regionId = Long.parseLong(regionIdStr);
		} else {
			regionId = userDao.getLoginUserRegionId();
		}

		StringBuilder hql = new StringBuilder();

		Region region = regionDao.get(regionId);

		if (3 == CompanyUtils.ifRegion(region.getCode())) { // 选择的是省级
			hql
					.append("select c.region.parent.name,c.technicianInfos.size from Company c where c.active=1 and c.technicianInfos.size>0 ");
		} else {
			hql
					.append("select c.region.name,c.technicianInfos.size from Company c where c.active=1 and c.technicianInfos.size>0 ");
		}
		Map<String, Integer> maps = new HashMap<String, Integer>();

		// 得到区域所包含的区域
		List<Region> regions = regionDao.findRegionsById(regionId);

		if (regions.size() > 0) {
			hql.append(" and c.region.id in ( ");
			for (Region i : regions) {
				hql.append(i.getId()).append(",");
			}
			hql.deleteCharAt(hql.length() - 1).append(" ) ");
		}

		List list = companyInfoDao.find(hql.toString());

		for (int i = 0; i < list.size(); i++) {
			Object[] arr = (Object[]) list.get(i);
			String name = (String) arr[0];
			Integer count = (Integer) arr[1];
			if (maps.containsKey(name)) {
				maps.put(name, (count + maps.get(name)));
			} else {
				maps.put(name, count);
			}
		}
		return maps;
	}

	// ----------- 最新代码分隔 -----------

	/**
	 * 防止 org.hibernate.NonUniqueObjectException
	 * 
	 * @param entity
	 */
	public void merge(CompanyInfo entity) {
		companyInfoDao.merge(entity);
	}

	public Company getComOfLoginUser() {
		return userDao.findUniqueBy("loginName",
				SpringSecurityUtils.getCurrentUserName()).getCompany();
	}

	public void delete(List<Long> ids) {
		// String fkApprovalRegisterHql =
		// "delete from Approval4Register a where a.companyInfo.id in (";
		String fkUserHql = "update User u set u.companyInfo.id=null where u.companyInfo.id in (";
		// String fkCompanyLevelHql =
		// "delete from CompanyLevel l where l.companyInfo.id in (";
		// String companyInfoHql = "delete from CompanyInfo c where c.id in (";
		for (Long id : ids) {
			// fkApprovalRegisterHql += id + ",";
			fkUserHql += id + ",";
			// fkCompanyLevelHql += id + ",";
			// companyInfoHql += id + ",";
		}
		fkUserHql = fkUserHql.substring(0, fkUserHql.length() - 1) + ")";
		// fkApprovalRegisterHql = fkApprovalRegisterHql.substring(0,
		// fkApprovalRegisterHql.length() - 1)
		// + ")";
		// fkCompanyLevelHql = fkCompanyLevelHql.substring(0, fkCompanyLevelHql
		// .length() - 1)
		// + ")";
		// companyInfoHql = companyInfoHql.substring(0,
		// companyInfoHql.length() - 1)
		// + ")";

		companyInfoDao.createQuery(fkUserHql).executeUpdate();
		// companyInfoDao.createQuery(fkApprovalRegisterHql).executeUpdate();
		// companyInfoDao.createQuery(fkCompanyLevelHql).executeUpdate();
		// companyInfoDao.createQuery(companyInfoHql).executeUpdate();
	}

	public CompanyInfo get(Long id) {
		return companyInfoDao.get(id);
	}

	public List<CompanyInfo> list(List<PropertyFilter> filters) {
		return companyInfoDao.find(filters);
	}

	public Page<CompanyInfo> list(Page<CompanyInfo> page,
			List<PropertyFilter> filters) {
		return companyInfoDao.findPage(page, filters);
	}

	public void save(CompanyInfo entity) {
		companyInfoDao.save(entity);
	}

	/**
	 * 通过限制条件查找企业信息
	 * 
	 * @param criteria
	 *            限制条件
	 * @return 企业信息
	 */
	public List<CompanyInfo> findCompanies(Object criteria) {
		String hql = buildCompanyInfoHql(criteria);
		return companyInfoDao.find(hql);
	}

	/**
	 * 通过限制条件统计企业信息
	 * 
	 * @param criteria
	 *            限制条件
	 * @return 企业信息
	 */
	public Map<Date, Integer> findCompanyInfosByCondition(Object criteria) {
		String hql = buildCompanyInfoHql(criteria);
		List<CompanyInfo> list = companyInfoDao.find(hql);
		Map<Date, Integer> maps = new HashMap<Date, Integer>();
		for (int i = 0; i < list.size(); i++) {
			CompanyInfo c = (CompanyInfo) list.get(i);
			Date date = c.getUpdateDate();
			if (maps.containsKey(date)) {
				Integer temp = maps.get(date);
				maps.remove(date);
				maps.put(date, (temp + 1));
			} else {
				maps.put(date, 1);
			}
		}
		return maps;
	}

	/**
	 * 通过限制条件得到hql 语句
	 * 
	 * @param criteria
	 *            限制条件
	 * @return hql 语句
	 */
	public String buildCompanyInfoHql(Object criteria) {
		Object[] arr = (Object[]) criteria;
		CompanyInfo companyInfo = null;
		Date beginDate = null;
		Date endDate = null;

		if (null != criteria) {
			companyInfo = (CompanyInfo) arr[0];
			beginDate = (Date) arr[1];
			endDate = (Date) arr[2];
		}

		String hql = " from CompanyInfo c,Company i where c.company=i ";

		if (null != companyInfo) {
			if (null != companyInfo.getStatus()
					&& !"".equals(companyInfo.getStatus())) {
				hql += " and c.status='" + companyInfo.getStatus() + "' ";
			}
			if (null != companyInfo.getButchPerYear()
					&& !"".equals(companyInfo.getButchPerYear())) {
				hql += " and c.butchPerYear=" + companyInfo.getButchPerYear()
						+ " ";
			}
			if (null != companyInfo.getMechanize()
					&& !"".equals(companyInfo.getMechanize())) {
				hql += " and c.mechanize =" + companyInfo.getMechanize() + " ";
			}
			if (null != companyInfo.getCompany().getRegion()) {
				if (!"".equals(companyInfo.getCompany().getRegion().getCode())) {
					String code = companyInfo.getCompany().getRegion()
							.getCode();
					hql += " and (c.company.region.code='"
							+ companyInfo.getCompany().getRegion().getCode()
							+ "' ";

					List<Region> cities = regionDao.findRegionsByCode(code);
					for (int j = 0; j < cities.size(); j++) {
						hql += " or c.region.code='" + cities.get(j).getCode()
								+ "' ";
					}
					hql += " ) ";
				}
			}
		}

		if (null != beginDate) {
			hql += " and c.updateDate >='" + CompanyUtils.formatDate(beginDate)
					+ "' ";
		}

		if (null != endDate) {
			hql += " and c.updateDate <='" + CompanyUtils.formatDate(endDate)
					+ "' ";
		}

		System.out.println(hql);
		return hql;
	}

	public Page<CompanyInfo> findCompanyInfosByCondition(
			Page<CompanyInfo> page, String entName, Date beginDate,
			Date endDate, Long regionId, boolean isPass) {
		System.out
				.println("分页Service:" + page.getPageSize() + page.getPageNo());
		StringBuilder hql = new StringBuilder(" from CompanyInfo c where 1=1 ");
		if (isPass) {
			hql.append(" and c.status='2' ");
		}
		if (null != entName && !"".equals(entName)) {
			hql.append(" and c.nameCN like '%").append(entName).append("%' ");
		}
		if (null != beginDate) {
			hql.append(" and c.createDate >='").append(
					CompanyUtils.formatDate(beginDate)).append("' ");
		}
		if (null != endDate) {
			hql.append(" and c.createDate <='").append(
					CompanyUtils.formatDate(endDate)).append("' ");
		}
		if (null != regionId && 0 != regionId) {
			List<Region> regions = regionDao.findRegionsById(regionId);
			if (1 == regions.size()) {
				hql.append(" and c.region.id=").append(regions.get(0).getId())
						.append(" ");
			} else {
				hql.append(" and (c.region.id=").append(regions.get(0).getId());
				for (Region i : regions) {
					hql.append(" or c.region.id=").append(i.getId());
				}
				hql.append(")");
			}
		}
		page = companyInfoDao.findPage(page, hql.toString());
		return page;
	}

	public Map<Region, Long> statsCompanies(Object criteria, Integer scalefrom,
			Integer scaleto) {
		Object[] arr = (Object[]) criteria;
		CompanyInfo companyInfo = null;
		Date beginDate = null;
		Date endDate = null;

		if (null != criteria) {
			companyInfo = (CompanyInfo) arr[0];
			beginDate = (Date) arr[1];
			endDate = (Date) arr[2];
		}

		String hql = " select r,count(c) from Region r,CompanyInfo c,Company i where r.id = c.region.id and c.company=i ";

		if (null != companyInfo) {
			if (null != companyInfo.getStatus()
					&& !"".equals(companyInfo.getStatus())) {
				hql += " and c.status!=null ";
			}
			if (null != scalefrom) {
				hql += " and c.butchPerYear >=" + scalefrom + " ";
			}
			if (null != scaleto) {
				hql += " and c.butchPerYear <=" + scaleto + " ";
			}
			if (null != companyInfo.getMechanize()
					&& !"".equals(companyInfo.getMechanize())) {
				hql += " and c.mechanize=" + companyInfo.getMechanize() + " ";
			}
			if (null != companyInfo.getCompany().getRegion()) {
				if (!"".equals(companyInfo.getCompany().getRegion().getCode())) {
					String code = companyInfo.getCompany().getRegion()
							.getCode();
					hql += " and (c.company.region.code='"
							+ companyInfo.getCompany().getRegion().getCode()
							+ "' ";

					List<Region> cities = regionDao.findRegionsByCode(code);
					for (int j = 0; j < cities.size(); j++) {
						hql += " or c.region.code='" + cities.get(j).getCode()
								+ "' ";
					}
					hql += " ) ";
				}
			}
		}

		if (null != beginDate) {
			hql += " and c.updateDate >='" + CompanyUtils.formatDate(beginDate)
					+ "' ";
		}

		if (null != endDate) {
			hql += " and c.updateDate <='" + CompanyUtils.formatDate(endDate)
					+ "' ";
		}

		hql += " group by r ";
		List list = regionDao.find(hql);
		Map<Region, Long> regions = new HashMap<Region, Long>();
		for (int i = 0; i < list.size(); i++) {
			Object[] obj = (Object[]) list.get(i);
			Long count = (Long) obj[1];
			Region region = (Region) obj[0];
			regions.put(region, count);
		}
		return regions;
	}

	public List<CompanyInfo> findCompaniesByRegion(Long regionId) {
		String hql = " from CompanyInfo c where c.status='2' and c.region.id in (";
		List<Region> regions = regionDao.findRegionsById(regionId);
		for (Region i : regions) {
			hql += i.getId() + ",";
		}
		hql = hql.substring(0, hql.length() - 1) + ") ";
		return companyInfoDao.find(hql);
	}

	public List<Long> findComIdsByRegionId(Long regionId) {
		List<Long> ids = new ArrayList<Long>();
		List<Region> regions = regionDao.findRegionsById(regionId);
		if (regions.size() > 0) {
			StringBuilder hql = new StringBuilder(
					"select i.id as id from Company  i where i.region in (");
			for (Region i : regions) {
				hql.append(i.getId()).append(",");
			}
			hql.deleteCharAt(hql.length() - 1).append(") ");
			List<Object[]> list = companyDao.find(hql.toString());
			for (Object j : list) {
				ids.add((Long) j);
			}
			return ids;
		} else
			return null;
	}

	public List<Long> findComIdsByNameCN(String companyName) {
		List<Long> idsList = new ArrayList<Long>();
		String hql = "select i.id as id from Company  i where i.name  like '%"
				+ companyName + "%' ";
		List ids = companyDao.find(hql);
		for (Object i : ids) {
			Long id = (Long) i;
			idsList.add(id);
		}
		return idsList;
	}

	/**
	 * 统计企业数量
	 * 
	 * @param condition
	 *            scale 年屠宰规模 (用户填写数字（小数）, 单位为"万"头)|degree 机械化程度|region_id 区域
	 * @return Key 为 RegionId,Value 为数量
	 */
	public Map<String, Long> statsCompanies(Cert4CompanyStatsVO condition) {
		User loginUser = userDao.getLoginUser();
		// 得到限制的区域id
		Long regionId = loginUser.getRegion().getId();

		// 查询不重复的且符合条件的公司id
		StringBuilder hql = new StringBuilder(
				" select distinct(i.id) from Company i left join i.companyInfo c where i.active=1 and c.status!='CREATED' ");

		if (null != condition) {
			// 年屠宰规模
			if (null != condition.getScalefrom()
					&& !"".equals(condition.getScalefrom())) {
				hql.append(" and c.butchPerYear >=").append(
						condition.getScalefrom()).append(" ");
			}
			if (null != condition.getScaleto()
					&& !"".equals(condition.getScaleto())) {
				hql.append(" and c.butchPerYear <=").append(
						condition.getScaleto()).append(" ");
			}
			// 日期
			if (null != condition.getBeginDate()
					&& null != condition.getEndDate()
					&& condition.getBeginDate().getTime() == condition
							.getEndDate().getTime()) {
				hql.append(" and year(c.updateDate)='").append(
						CompanyUtils.formatDate(condition.getBeginDate(),
								"yyyy")).append("' ");
				hql.append(" and month(c.updateDate)='")
						.append(
								CompanyUtils.formatDate(condition
										.getBeginDate(), "MM")).append("' ");
				hql.append(" and day(c.updateDate)='")
						.append(
								CompanyUtils.formatDate(condition
										.getBeginDate(), "dd")).append("' ");
			} else {
				if (null != condition.getBeginDate()) {
					hql.append(" and c.updateDate >='").append(
							CompanyUtils.formatDate(condition.getBeginDate()))
							.append("' ");
				}
				if (null != condition.getEndDate()) {
					hql.append(" and c.updateDate <='").append(
							CompanyUtils.formatDate(condition.getEndDate()))
							.append("' ");
				}
			}
			// 机械化程度
			if (null != condition.getDegree() && 0 != condition.getDegree()) {
				hql.append(" and c.mechanize=").append(condition.getDegree())
						.append(" ");
			}
			// 地区
			if (null != condition.getRegionId()
					&& !"".equals(condition.getRegionId())) {
				regionId = Long.parseLong(condition.getRegionId());
			}
		}

		// 区域
		if (null != regionId && 0 != regionId.intValue()) {
			List<Region> regions = regionDao.findRegionsById(regionId);
			if (regions.size() > 0) {
				hql.append(" and i.region.id in ( ");
				for (Region r : regions) {
					hql.append(r.getId()).append(",");
				}
				hql.deleteCharAt(hql.length() - 1).append(" ) ");
			}
		}
		// 包含所有已备案的企业id
		List<Long> list = regionDao.find(hql.toString());
		// 返回给Action的数据 键为 RegionId, 值为数量
		Map<String, Long> map = new HashMap<String, Long>();
		if (list.size() > 0) {
			Region region = regionDao.get(regionId);
			StringBuilder regionHql = new StringBuilder();
			if (3 == CompanyUtils.ifRegion(region.getCode())) { // 选择省时，查看市级
				regionHql
						.append("select i.region.parent.name from Company i where i.id in ( ");
			} else {
				regionHql
						.append("select i.region.name from Company i where i.id in ( ");
			}
			for (Long id : list) {
				regionHql.append(id).append(",");
			}
			regionHql.deleteCharAt(regionHql.length() - 1).append(" ) ");
			// 查询出公司所在地区
			List listName = regionDao.find(regionHql.toString());
			// RegionId 为 key ，数量为 Value
			for (int i = 0; i < listName.size(); i++) {
				String rName = (String) listName.get(i);
				if (map.containsKey(rName)) {
					Long count = map.get(rName);
					map.put(rName, ++count);
				} else {
					map.put(rName, 1l);
				}
			}
		}
		return map;
	}

}
