package com.cce.weaponry.service.register;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cce.modules.orm.Page;
import com.cce.modules.orm.PropertyFilter;
import com.cce.modules.service.CrudServiceInterface;
import com.cce.weaponry.dao.register.RegionDao;
import com.cce.weaponry.dao.register.TechnicianInfoDao;
import com.cce.weaponry.dao.security.UserDao;
import com.cce.weaponry.entity.dict.DictTechType;
import com.cce.weaponry.entity.register.Region;
import com.cce.weaponry.entity.register.TechnicianInfo;
import com.cce.weaponry.service.CommonEntityService;
import com.cce.weaponry.service.common.CompanyUtils;
import com.cce.weaponry.service.common.RegionManagementService;
import com.cce.weaponry.web.vo.register.TechnicianSearchVO;

@Service
@Transactional
public class TechnicianInfoService implements
		CrudServiceInterface<TechnicianInfo> {

	@Autowired
	private UserDao userDao;

	@Autowired
	private CommonEntityService commonService;

	@Autowired
	private TechnicianInfoDao technicianInfoDao;

	@Autowired
	private RegionManagementService regionManagementService;

	@Autowired
	private RegionDao regionDao;

	public void delete(Long id) {
		technicianInfoDao.delete(id);
	}

	public void delete(List<Long> ids) {
		technicianInfoDao.delete(ids);
	}

	public TechnicianInfo getTechInfo(Long id) {
		StringBuilder hql = new StringBuilder()
				.append("from TechnicianInfo t where t.id='" + id + "'");
		return technicianInfoDao.findUnique(hql.toString());
	}
	public TechnicianInfo get(Long id) {
		return technicianInfoDao.get(id);
	}

	public List<TechnicianInfo> list(List<PropertyFilter> filters) {
		return technicianInfoDao.find(filters);
	}

	public Page<TechnicianInfo> list(Page<TechnicianInfo> page,
			List<PropertyFilter> filters) {
		return technicianInfoDao.findPage(page, filters);
	}

	public void save(TechnicianInfo entity) {
		technicianInfoDao.save(entity);
	}

	/**
	 * 通过限制条件查找技术人员信息
	 * 
	 * @param criteria
	 *            限制条件
	 * @return 技术人员信息
	 */
	public Page<TechnicianInfo> findTechnicianInfos(Page<TechnicianInfo> page,
			Object criteria) {
		String hql = buildTechnicianHql(criteria);
		return technicianInfoDao.findPage(page, hql);
	}

	/**
	 * 通过限制条件查找技术人员信息
	 * 
	 * @param criteria
	 *            限制条件
	 * @return 技术人员信息
	 */
	public List<TechnicianInfo> findTechnicianInfos(Object criteria) {
		String hql = buildTechnicianHql(criteria);
		return technicianInfoDao.find(hql);
	}

	/**
	 * 通过限制条件统计技术人员信息
	 * 
	 * @param criteria
	 *            限制条件
	 * @return 技术人员信息
	 */
	public Map<Date, Integer> findTechnicianInfosByCondition(Object criteria) {
		String hql = buildTechnicianHql(criteria);
		List<TechnicianInfo> list = technicianInfoDao.find(hql);
		Map<Date, Integer> maps = new HashMap<Date, Integer>();
		for (int i = 0; i < list.size(); i++) {
			TechnicianInfo t = list.get(i);
			// Date date = t.getCompany().getUpdateDate();
			// if (maps.containsKey(date)) {
			// Integer temp = maps.get(date);
			// maps.remove(date);
			// maps.put(date, (temp + 1));
			// } else {
			// maps.put(date, 1);
			// }
		}
		return maps;
	}

	/**
	 * 通过限制条件构建 hql 语句
	 * 
	 * @param criteria
	 *            限制条件
	 * @return hql 语句
	 */
	private String buildTechnicianHql(Object criteria) {
		Object[] arr = (Object[]) criteria;
		TechnicianInfo technician = null;
		Date beginDate = null;
		Date endDate = null;

		if (null != criteria) {
			technician = (TechnicianInfo) arr[0];
			beginDate = (Date) arr[1];
			endDate = (Date) arr[2];
		}

		String hql = " from TechnicianInfo t where 1=1 ";

		if (null != technician) {
			if (null != technician.getCompany()) {
				if (null != technician.getCompany().getRegion()) {
					if (!"".equals(technician.getCompany().getRegion()
							.getCode())) {
						String code = technician.getCompany().getRegion()
								.getCode();
						hql += " and ( t.company.region.code='"
								+ technician.getCompany().getRegion().getCode()
								+ "' ";

						List<Region> cities = regionDao.findRegionsByCode(code);
						for (int j = 0; j < cities.size(); j++) {
							hql += " or t.company.region.code='"
									+ cities.get(j).getCode() + "' ";
						}
						hql += " ) ";
					}
				}
				// if (null != technician.getCompany().getButchPerYear()) {
				// hql += " and t.company.butchPerYear="
				// + technician.getCompany().getButchPerYear()
				// + " ";
				// }
				// if (null != technician.getCompany().getMechanize()) {
				// hql += " and t.company.mechanize="
				// + technician.getCompany().getMechanize() + " ";
				// }
				// if (null != technician.getCompany().getSimpleName()
				// && !"".equals(technician.getCompany()
				// .getSimpleName())) {
				// hql += " and t.company.nameCN like '%"
				// + technician.getCompany().getSimpleName()
				// + "%' ";
				// }
				// if (null != technician.getCompany().getStatus()
				// && !"".equals(technician.getCompany().getStatus())) {
				// hql += " and t.company.status='"
				// + technician.getCompany().getStatus() + "' ";
				// }
			}
			// if (null != technician.getName()
			// && !"".equals(technician.getName())) {
			// hql += " and t.name like '%" + technician.getName() + "%' ";
			// }
		}

		if (null != beginDate) {
			hql += " and t.company.updateDate >='"
					+ CompanyUtils.formatDate(beginDate) + "' ";
		}

		if (null != endDate) {
			hql += " and t.company.updateDate <='"
					+ CompanyUtils.formatDate(endDate) + "' ";
		}
		System.out.println("测试：" + hql);
		return hql;
	}

	/**
	 * 根据企业id得到技术人员信息
	 * 
	 * @param companyId
	 *            企业id
	 * @return 相关技术人员信息
	 */
	public Page<TechnicianInfo> findTechniciansByCompanyId(
			Page<TechnicianInfo> page, Long companyId) {
		String hql = " from TechnicianInfo t where t.company.id=" + companyId;
		System.out.println(hql);
		return technicianInfoDao.findPage(page, hql);
	}

	/**
	 * 查询技术人员信息
	 * 
	 * @param page
	 * @param condition
	 * @return
	 */
	public Page<TechnicianInfo> searchTechnicianInfos(
			Page<TechnicianInfo> page, TechnicianSearchVO condition) {
		StringBuilder hql = new StringBuilder("select t from TechnicianInfo t ");

		if (null != condition && null != condition.getCertNo()
				&& !"".equals(condition.getCertNo())) { // 证件编号
			hql
					.append(
							" ,TechnicianBadge i where t.company.active=1 and i.techInfo=t and i.certNo like '%")
					.append(condition.getCertNo()).append("%' ");
		} else {
			hql.append(" where t.company.active=1 ");
		}

		// 区域id默认为登录用户所在区域
		Long regionId = userDao.getLoginUserRegionId();
		
		if (null != condition) {
			if (null != condition.getName() && !"".equals(condition.getName())) { // 技术人员名称
				hql.append(" and t.name like '%").append(condition.getName())
						.append("%' ");
			}
			if (null != condition.getCategory()
					&& !"".equals(condition.getCategory())) {// 技术人员类别
				Object obj = commonService.getDictEntityById(DictTechType.class, Long.parseLong(condition.getCategory()));
				if(null!=obj){
					condition.setCategory(((DictTechType)obj).getValue());
					hql.append(" and t.type like '%").append(
							condition.getCategory()).append("%' ");
				}
			}
			if (null != condition.getEntName()
					&& !"".equals(condition.getEntName())) {// 公司名称
				hql.append(" and t.company.name like '%").append(condition.getEntName()).append("%' ");
			}
			if (null != condition.getRegionId()
					&& !"".equals(condition.getRegionId())) {// 区域id
				regionId = Long.parseLong(condition.getRegionId());
			}
		}

		if (null != regionId) { // 限制区域的hql
			hql.append(" and t.company.region.id in(");
			List<Region> regions = regionDao.findRegionsById(regionId);
			for (Region i : regions) {
				hql.append(i.getId()).append(",");
			}
			hql.deleteCharAt(hql.length() - 1).append(" ) ");
		}
		// 返回分页查询结果
		return technicianInfoDao.findPage(page, hql.toString());
	}

	/**
	 * 根据公司id和技术人员类别查找技术人员
	 * 
	 * @param regionId
	 *            登录用户所在地区id
	 * @param type
	 *            技术人员类别
	 * @return 技术人员 id和名字
	 */
	public Map<Long, String> findTechnicianByType(Long comId, String type) {
		StringBuilder hql = new StringBuilder(
				"select t.id,t.name from TechnicianInfo t where 1=1 ");

		if (null != comId && 0 != comId.intValue()) {
			hql.append(" and t.company.id =").append(comId).append(" ");
		}

		if (null != type && !"".equals(type)) {
			hql.append(" and type='").append(type).append("' ");
		}

		List list = technicianInfoDao.find(hql.toString());

		Map<Long, String> maps = new HashMap<Long, String>();

		for (int i = 0; i < list.size(); i++) {
			Object[] arr = (Object[]) list.get(i);
			maps.put((Long) arr[0], ((String) arr[1]));
		}

		return maps;

	}

}
