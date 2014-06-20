package com.cce.weaponry.service.register;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.hibernate.SQLQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cce.modules.orm.Page;
import com.cce.modules.orm.PropertyFilter;
import com.cce.modules.service.CrudServiceInterface;
import com.cce.weaponry.dao.register.BusinessCaseDao;
import com.cce.weaponry.dao.register.RegionDao;
import com.cce.weaponry.dao.security.UserDao;
import com.cce.weaponry.entity.register.BusinessCase;
import com.cce.weaponry.entity.register.Company;
import com.cce.weaponry.entity.register.Region;
import com.cce.weaponry.entity.security.User;
import com.cce.weaponry.service.common.CompanyUtils;
import com.cce.weaponry.web.vo.register.BusinessCaseVO;

@Service
@Transactional
public class BusinessCaseService implements CrudServiceInterface<BusinessCase> {

	@Autowired
	private BusinessCaseDao businessCaseDao;

	@Autowired
	private UserDao userDao;

	@Autowired
	private RegionDao regionDao;

	public BusinessCase get(Long id) {
		return businessCaseDao.get(id);
	}

	public List<BusinessCase> list(List<PropertyFilter> filters) {
		return businessCaseDao.find(filters);
	}

	public Page<BusinessCase> list(Page<BusinessCase> page,
			List<PropertyFilter> filters) {
		return businessCaseDao.findPage(page, filters);
	}

	public void save(BusinessCase entity) {
		businessCaseDao.save(entity);
	}

	public void delete(List<Long> ids) {
		businessCaseDao.delete(ids);
	}

	public BusinessCase findLastBusinessCase() {
		long companyId = userDao.getLoginUser().getCompany().getId();
		String hql = "select b from BusinessCase b where b.company.id="
				+ companyId + " order by b.updateDate desc ";
		BusinessCase businessCase = (BusinessCase) businessCaseDao
				.createQuery(hql).setMaxResults(1).uniqueResult();
		return businessCase;
	}

	public Map<String, Long> statsCompanies(BusinessCaseVO condition) {
		User loginUser = userDao.getLoginUser();
		// 得到限制的区域id
		Long regionId = loginUser.getRegion().getId();

		// 查询不重复的且符合条件的公司id
		StringBuilder hql = new StringBuilder(
				" select distinct(i.id) from Company i left join i.companyInfo c where i.active=1 and c.status!='CREATED' ");

		if (null != condition) {
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

	public Page<BusinessCase> search(Page<BusinessCase> page,
			BusinessCaseVO condition) {
		StringBuffer hql = new StringBuffer(
				"select b from BusinessCase b where 1=1 ");
		long regionId = userDao.getLoginUserRegionId();
		if (null != condition) {
			if (null != condition.getRegionId()
					&& !"".equals(condition.getRegionId())) {
				regionId = Long.parseLong(condition.getRegionId());
			}
		}
		List<Region> regionList = regionDao.findRegionsById(regionId);
		if (regionList.size() > 0) {
			hql.append(" and b.company.region.id in ( ");
			for (Region i : regionList) {
				hql.append(i.getId()).append(",");
			}
			hql.deleteCharAt(hql.length() - 1);
			hql.append(" ) ");
		}

		User user = userDao.getLoginUser();

		if ("企业用户".equals(user.getRole().getName())) {
			Company company = user.getCompany();
			if (null == company)
				return page;
			long companyId = user.getCompany().getId();
			hql.append(" and b.company.id=").append(companyId).append(" ");
		}
		hql.append(" order by b.updateDate desc ");
		System.out.println(" --- " + hql.toString());
		page = businessCaseDao.findPage(page, hql.toString());
		List<BusinessCase> list = page.getResult();
		for (BusinessCase i : list) {
			i.setCompanyName(i.getCompany().getName());
		}
		page.setResult(list);
		return page;
	}

	public Page collect(Page page, BusinessCaseVO businessCaseVO) {
		StringBuffer hql = new StringBuffer(
				"select b from BusinessCase b where 1=1 ");
		return businessCaseDao.findPage(page, hql.toString());
	}

	public Page<BusinessCaseVO> collects(Page page, BusinessCaseVO condition) {
		StringBuffer sql = new StringBuffer();
		StringBuffer sqlCount = new StringBuffer("select count(*) ");
		StringBuffer sqlCondition = new StringBuffer();
		List<BusinessCaseVO> list = new ArrayList<BusinessCaseVO>();
		Map<String, Object> params = new HashMap<String, Object>();
		String regionCode = regionDao.get(Long.parseLong(condition.getRegionId())).getCode();
		int regionFlag = CompanyUtils.ifRegion(regionCode);
		if (1 == regionFlag) { // 县
			sql.append("select ")
					.append("a.butcher_quantity,b.butcher_quantity,")
					.append("a.taking,b.taking,")
					.append("a.profit_tax,b.profit_tax,")
					.append("a.total_assets,b.total_assets,")
					.append("a.totalliabilities,b.totalliabilities,")
					.append("a.employee_numbers,b.employee_numbers,")
					.append("c.name ");
			sqlCondition
					.append(" from business_case as a inner join business_case as b ")
					.append("on year(a.update_date)=(1+year(b.update_date)) and a.company=b.company ")
					.append("left join company c on a.company=c.id ")
					.append("where 1=1 ")
					.append("and c.region_id=:regionId ");

		} else if (2 == regionFlag) { // 市
			sql.append("select ")
					.append("sum(a.butcher_quantity),sum(b.butcher_quantity),")
					.append("sum(a.taking),sum(b.taking),")
					.append("sum(a.profit_tax),sum(b.profit_tax),")
					.append("sum(a.total_assets),sum(b.total_assets),")
					.append("sum(a.totalliabilities),sum(b.totalliabilities),")
					.append("sum(a.employee_numbers),sum(b.employee_numbers) ")
					.append(", r.name ");
			sqlCondition
					.append(" from business_case as a inner join business_case as b ")
					.append("on year(a.update_date)=(1+year(b.update_date)) and a.company=b.company ")
					.append("left join company c on a.company=c.id ")
					.append("left join region r on c.region_id=r.id ")
					.append("left join region r2 on r.region_id=r2.id ")
					.append("where 1=1 ").append("and r2.id=:regionId ");

		} else if (3 == regionFlag) { // 省
			sql.append("select ")
					.append("sum(a.butcher_quantity),sum(b.butcher_quantity),")
					.append("sum(a.taking),sum(b.taking), ")
					.append("sum(a.profit_tax),sum(b.profit_tax), ")
					.append("sum(a.total_assets),sum(b.total_assets), ")
					.append("sum(a.totalliabilities),sum(b.totalliabilities), ")
					.append("sum(a.employee_numbers),sum(b.employee_numbers) ")
					.append(",r2.name ");
			sqlCondition
					.append(" from business_case as a inner join business_case as b  ")
					.append("on year(a.update_date)=(1+year(b.update_date)) and a.company=b.company ")
					.append("left join company c on a.company=c.id  ")
					.append("left join region r on c.region_id=r.id  ")
					.append("left join region r2 on r.region_id=r2.id ")
					.append("where 1=1 ").append("and r2.region_id=:regionId ");

		} else
			return page;
		if (null != condition) {
			if (null != condition.getStartDate()) {
				sqlCondition.append(" and a.update_date >= :startDate ");
				params.put("startDate", condition.getStartDate());
			}
			if (null != condition.getEndDate()) {
				sqlCondition.append(" and a.update_date <= :endDate ");
				params.put("endDate", condition.getEndDate());
			}
			if (null != condition.getRegionId()
					&& !"".equals(condition.getRegionId())) {
				params.put("regionId", Long.parseLong(condition.getRegionId()));
			}
			if (null != condition.getRepresenting()
					&& !"".equals(condition.getRepresenting())) {
				sqlCondition.append(" and c.name like :companyName ");
				params.put("companyName", "%" + condition.getRepresenting()
						+ "%");
			}
		}
		if (1 == regionFlag) {
			sqlCondition.append(" order by a.update_date desc ");
		} else if (2 == regionFlag) { // 市
			sqlCondition.append(" group by r.id ");
		} else if (3 == regionFlag) { // 省
			sqlCondition.append(" group by r2.id ");
		}
		sql.append(sqlCondition);
		sqlCount.append(sqlCondition);
		SQLQuery query = businessCaseDao.getSession().createSQLQuery(
				sql.toString());
		SQLQuery countQuery = businessCaseDao.getSession().createSQLQuery(
				sqlCount.toString());
		Iterator<String> keys = params.keySet().iterator();
		while (keys.hasNext()) {
			String key = keys.next();
			query.setParameter(key, params.get(key));
			countQuery.setParameter(key, params.get(key));
		}

		List ret = query.setFirstResult(page.getFirst() - 1)
				.setMaxResults(page.getPageSize()).list();
		for (Iterator iterator = ret.iterator(); iterator.hasNext();) {
			Object[] row = (Object[])iterator.next();
			BusinessCaseVO vo = new BusinessCaseVO();
			
			vo.setMaxButcherQuantity((Double)row[0]);
			vo.setMinButcherQuantity((Double)row[1]);
			vo.setMaxTaking((Double)row[2]);
			vo.setMinTaking((Double)row[3]);
			vo.setMaxProfitTax((Double) row[4]);
			vo.setMinProfitTax((Double) row[5]);
			vo.setMaxTotalAssets((Double) row[6]);
			vo.setMinTotalAssets((Double) row[7]);
			vo.setMaxTotalliabilities((Double) row[8]);
			vo.setMinTotalliabilities((Double) row[9]);
			try {
				vo.setMaxEmployeeNumbers((Integer) row[10]);
				vo.setMinEmployeeNumbers((Integer) row[11]);
			} catch (Exception e) {
				vo.setMaxEmployeeNumbers((BigDecimal) row[10]);
				vo.setMinEmployeeNumbers((BigDecimal) row[11]);
			}
			vo.setRepresenting((String) row[12]);

			list.add(vo);
		}
		if (1 == regionFlag) {
			page.setTotalCount(((BigInteger) countQuery.uniqueResult())
					.longValue());
		} else {
			page.setTotalCount(countQuery.list().size());
		}

		page.setResult(list);
		
		return page;
	}

}
