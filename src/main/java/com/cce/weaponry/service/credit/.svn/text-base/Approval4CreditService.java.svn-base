package com.cce.weaponry.service.credit;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cce.modules.orm.Page;
import com.cce.modules.orm.PropertyFilter;
import com.cce.modules.orm.hibernate.HibernateWebUtils;
import com.cce.modules.service.CrudServiceInterface;
import com.cce.modules.web.struts2.Struts2Utils;
import com.cce.weaponry.dao.credit.Approval4CreditDao;
import com.cce.weaponry.dao.credit.ApproveCreditDetailDao;
import com.cce.weaponry.dao.register.RegionDao;
import com.cce.weaponry.dao.security.UserDao;
import com.cce.weaponry.entity.credit.Approval4Credit;
import com.cce.weaponry.entity.credit.ApproveCreditDetail;
import com.cce.weaponry.entity.register.Region;
import com.cce.weaponry.entity.security.User;
import com.cce.weaponry.service.common.CompanyUtils;
import com.cce.weaponry.web.vo.credit.CompanyCreditSearchVO;
import com.cce.weaponry.web.vo.credit.CreditSearchVO;

@Service
@Transactional
public class Approval4CreditService implements
		CrudServiceInterface<Approval4Credit> {

	@Autowired
	private UserDao userDao;

	@Autowired
	private Approval4CreditDao approval4CreditDao;

	@Autowired
	private ApproveCreditDetailDao detailDao;

	@Autowired
	private RegionDao regionDao;

	// ------------------ 最新代码分隔 ----------------------

	/**
	 * 根据公司id得到信用档案申请项集合
	 */
	public Page findApprovalCreditsByComId(Page page, Long id) {
		String hql = " from Approval4Credit a where a.companyCredit.company.id="
				+ id + " order by a.createDate desc ";
		page = approval4CreditDao.findPage(page, hql);
		return page;
	}

	public List<ApproveCreditDetail> findDetailsByApprovalId(Long approvalId) {
		StringBuilder hql = new StringBuilder(
				" from ApproveCreditDetail d where d.approval.id=");
		hql.append(approvalId).append(" order by d.createDate desc ");
		return detailDao.find(hql.toString());
	}

	/**
	 * 得到信用档案的待处理任务数量
	 */
	public int getTaskCount() {
		User loginUser = userDao.getLoginUser();
		if ("省级用户".equals(loginUser.getRole().getName())) {

			StringBuilder hql = new StringBuilder(
					" from Approval4Credit a left join a.companyCredit.company.companyInfo c where a.companyCredit.company.active=1 ");
			hql
					.append("  and ((a.netstatus='PROCESSING' or a.scenestatus='PROCESSING') and a.netstatus<>'REJECTED' and a.scenestatus<>'REJECTED') ");

			List<Region> regions = regionDao.findRegionsById(loginUser
					.getRegion().getId());

			if (regions.size() > 0) {
				hql.append(" and a.companyCredit.company.region.id in (");
				for (Region i : regions) {
					hql.append(i.getId()).append(",");
				}
				hql.deleteCharAt(hql.length() - 1).append(" ) ");
			}

			String countHql = "select distinct(a.id) " + hql.toString();
			return approval4CreditDao.getSession().createQuery(countHql).list()
					.size();
		}
		return 0;
	}

	// ------------------ 最新代码分隔 ----------------------

	/**
	 * 根据id组成的List来删除
	 */
	public void delete(List<Long> ids) {
		approval4CreditDao.delete(ids);
	}

	/**
	 * 根据id查找对应的申请项
	 */
	public Approval4Credit get(Long id) {
		approval4CreditDao.getSession().evict(Approval4Credit.class);
		return approval4CreditDao.get(id);
	}

	/**
	 * 根据属性过滤器来查找对应的集合
	 */
	public List<Approval4Credit> list(List<PropertyFilter> filters) {
		return approval4CreditDao.find(filters);
	}

	public Page<Approval4Credit> list(Page<Approval4Credit> page,
			List<PropertyFilter> filters) {
		return approval4CreditDao.findPage(page, filters);
	}

	/**
	 * 保存审批项
	 */
	public void save(Approval4Credit entity) {
		approval4CreditDao.save(entity);
	}

	/**
	 * 构建查询 ApprovalCredit 对象的 hql 语句
	 * 
	 * @param criteria
	 *            限制条件
	 * @return hql 语句
	 */
	public String buildApprovalCreditHql(Object criteria) {
		// condition.getCompanyCredit().getCompanyInfo().setSimpleName(entName);
		// condition.getCompanyCredit().getCompanyInfo().setTaxCert(entNo);
		// condition.getCompanyCredit().setDescription(remark);
		// condition.getCompanyCredit().getTemplate().setName(entCredit);

		Approval4Credit approvalCredit = null;
		Date beginDate = null;
		Date endDate = null;

		if (null != criteria) {
			Object[] condition = (Object[]) criteria;
			approvalCredit = (Approval4Credit) condition[0];
			beginDate = (Date) condition[1];
			endDate = (Date) condition[2];
		}

		String hql = " from Approval4Credit a where 1=1 ";

		if (null != approvalCredit) {
			if (null != approvalCredit.getIsActive()) {
				hql += " and a.isActive = "
						+ (approvalCredit.getIsActive() ? 1 : 0) + " ";
			}
			// 县级网上状态
			if (null != approvalCredit.getNetstatus()
					&& !"".equals(approvalCredit.getNetstatus())) {
				if ("4".equals(approvalCredit.getNetstatus())) {
					hql += "  and (a.netstatus='PASSED' or a.netstatus='REJECTED') ";
				} else if ("5".equals(approvalCredit.getNetstatus())) {
					hql += "  and ((a.netstatus='REJECTED' or a.scenestatus='PROCESSING') and a.netstatus<>'REJECTED' and a.scenestatus<>'REJECTED') ";
				} else {
					hql += " and a.netstatus='" + approvalCredit.getNetstatus()
							+ "' ";
				}
			}
			if (null != approvalCredit.getCompanyCredit()) {
				if (null != approvalCredit.getCompanyCredit().getCompany()) {
					if (null != approvalCredit.getCompanyCredit().getCompany()
							.getRegion()) {
						if (!"".equals(approvalCredit.getCompanyCredit()
								.getCompany().getRegion().getCode())) {
							String code = approvalCredit.getCompanyCredit()
									.getCompany().getRegion().getCode();
							hql += " and ( a.companyCredit.companyInfo.region.code='"
									+ approvalCredit.getCompanyCredit()
											.getCompany().getRegion().getCode()
									+ "' ";
							List<Region> cities = regionDao
									.findRegionsByCode(code);
							for (int j = 0; j < cities.size(); j++) {
								hql += " or a.companyCredit.companyInfo.region.code='"
										+ cities.get(j).getCode() + "' ";
							}
							hql += " ) ";
						}
					}
					String hql2 = "";
					if (null != approvalCredit.getCompanyCredit()
							.getDescription()
							&& !"".equals(approvalCredit.getCompanyCredit()
									.getDescription())) {
						hql2 += " or a.companyCredit.description like '%"
								+ approvalCredit.getCompanyCredit()
										.getDescription() + "%' ";
					}
					if (null != approvalCredit.getCompanyCredit().getTemplate()) {
						if (null != approvalCredit.getCompanyCredit()
								.getTemplate().getValue()
								&& !"".equals(approvalCredit.getCompanyCredit()
										.getTemplate().getValue())) {
							hql2 += " or a.companyCredit.template.name like '%"
									+ approvalCredit.getCompanyCredit()
											.getTemplate().getValue() + "%' ";
						}
					}
					// if (null != approvalCredit.getCompanyCredit()
					// .getCompany()
					// .getLastAppCompanyInfo()
					// .getSimpleName()
					// && !"".equals(approvalCredit.getCompanyCredit()
					// .getCompany().get
					// .getSimpleName())) {
					// hql2 += " or a.companyCredit.companyInfo.nameCN like '%"
					// + approvalCredit.getCompanyCredit()
					// .getCompany().getSimpleName()
					// + "%' ";
					// }
					// if (null != approvalCredit.getCompanyCredit()
					// .getCompany()
					// .getTaxCert()
					// && !"".equals(approvalCredit.getCompanyCredit()
					// .getCompany().getTaxCert())) {
					// hql2 += " or a.companyCredit.companyInfo.taxCert like '%"
					// + approvalCredit.getCompanyCredit()
					// .getCompany().getTaxCert()
					// + "%' ";
					// }
					if (!"".equals(hql2)) {
						hql += " and ( " + hql2.substring(3, hql2.length())
								+ " ) ";
					}
				}
			}
		}
		if (null != beginDate) {
			hql += " and a.createDate >='" + CompanyUtils.formatDate(beginDate)
					+ "' ";
		}
		if (null != endDate) {
			hql += " and a.createDate <='" + CompanyUtils.formatDate(endDate)
					+ "' ";
		}
		return hql;
	}

	/**
	 * 通过限制条件查询申请项信息
	 * 
	 * @param criteria
	 *            限制条件
	 * @return 申请项信息
	 */
	public Page<Approval4Credit> findApprovalsByCondition(
			Page<Approval4Credit> page, Object criteria) {
		String hql = buildApprovalCreditHql(criteria);
		System.out.println(hql);
		page = approval4CreditDao.findPage(page, hql);
		return page;
	}

	/**
	 * 通过公司id得到活动的审批项
	 * 
	 * @param companyId
	 *            公司id
	 * @return 活动的审批项
	 */
	public List<Approval4Credit> findActiveApproval4CreditByCompanyId(
			Long companyId) {
		String hql = " from Approval4Credit a where a.isActive=1 and a.companyCredit.companyInfo.id="
				+ companyId;
		return approval4CreditDao.find(hql);
	}

	/**
	 * 通过公司id得到活动的未提交的审批项
	 * 
	 * @param companyId
	 *            公司id
	 * @return 活动的审批项
	 */
	public Page<Approval4Credit> findActiveNotSubmitApproval4CreditByCompanyId(
			Page<Approval4Credit> page, Long companyId) {
		String hql = " from Approval4Credit a where  (a.netstatus=null or a.netstatus='3' or a.scenestatus='3') and a.companyCredit.companyInfo.id="
				+ companyId;// a.isActive=1 and
		System.out.println("测试" + hql);
		page = approval4CreditDao.findPage(page, hql);
		// Query query = approval4CreditDao.createQuery(hql).setFirstResult(
		// page.getPageSize() * (page.getPageNo() - 1));
		// query.setMaxResults(page.getPageSize());
		// List<Approval4Credit> list = query.list();
		// page.setResult(list);
		return page;
	}

	/**
	 * 企业信用情况查询
	 * 
	 * @param templateId
	 *            模板id
	 * @param regionCode
	 *            地区编码
	 * @param companyName
	 *            公司名称
	 * @return 企业信用统计
	 */
	public Page<Approval4Credit> findApproval4Credits(
			Page<Approval4Credit> page, CompanyCreditSearchVO condition) {
		// ,CompanyInfo i where a.companyCredit.company=i.company and
		// i.status='PASSED' and
		StringBuilder hql = new StringBuilder(
				"select a from Approval4Credit a where a.companyCredit.company.active=1 and a.netstatus!=null and a.scenestatus!=null ");

		Long regionId = userDao.getLoginUserRegionId();

		if (null != condition) {
			if (null != condition.getStatus() && 0l != condition.getStatus()) {
				if (5l == condition.getStatus()) { // 退回
					hql
							.append(" and (a.netstatus='REJECTED' or a.scenestatus='REJECTED') ");
				} else if (4l == condition.getStatus()) {// 审批通过
					hql
							.append(" and (a.netstatus='PASSED' and a.scenestatus='PASSED') ");
				} else if (3l == condition.getStatus()) {// 审批中 或者等待审批
					hql
							.append(" and (a.netstatus='PROCESSING' or a.scenestatus='PROCESSING') and a.netstatus<>'REJECTED' and a.scenestatus<>'REJECTED' ");
				} else if (2l == condition.getStatus()) {
					hql
							.append(" and (a.netstatus='WAITING' or a.scenestatus='WAITING') and a.netstatus<>'REJECTED' and a.scenestatus<>'REJECTED' ");
				}
			}
			if (null != condition.getEntCredit()
					&& !"".equals(condition.getEntCredit())) {
				hql.append(" and a.companyCredit.template.code like '%")
						.append(condition.getEntCredit()).append("%' ");
			}
			if (null != condition.getRegionId()
					&& !"".equals(condition.getRegionId())) {
				regionId = Long.parseLong(condition.getRegionId());
			}
			if (null != condition.getEntName()
					&& !"".equals(condition.getEntName())) {
				hql.append(" and a.companyCredit.company.name like '%").append(
						condition.getEntName()).append("%' ");
			}
			if (null != condition.getBeginDate()
					&& null != condition.getEndDate()
					&& condition.getBeginDate().compareTo(
							condition.getEndDate()) == 0) {
				if (null != condition.getBeginDate()) {
					hql.append(" and year(a.createDate)='").append(
							CompanyUtils.formatDate(condition.getBeginDate(),
									"yyyy")).append("' ");
					hql.append(" and month(a.createDate)='").append(
							CompanyUtils.formatDate(condition.getBeginDate(),
									"MM")).append("' ");
					hql.append(" and day(a.createDate)='").append(
							CompanyUtils.formatDate(condition.getBeginDate(),
									"dd")).append("' ");
				}
			} else {
				if (null != condition.getBeginDate()) {
					hql.append(" and a.createDate >='").append(
							CompanyUtils.formatDate(condition.getBeginDate()))
							.append("' ");
				}
				if (null != condition.getEndDate()
						&& !"".equals(condition.getEndDate())) {
					hql.append(" and a.createDate <='").append(
							CompanyUtils.formatDate(condition.getEndDate()))
							.append("' ");
				}
			}
		}

		List<Region> regions = regionDao.findRegionsById(regionId);

		if (regions.size() > 0) {
			hql.append(" and a.companyCredit.company.region.id in ( ");
			for (Region i : regions) {
				hql.append(i.getId()).append(",");
			}
			hql.deleteCharAt(hql.length() - 1).append(" ) ");
		}

		hql.append(" order by a.createDate desc ");

		return approval4CreditDao.findPage(page, hql.toString());
	}

	/**
	 * 企业信用情况统计
	 * 
	 * @param templateId
	 *            模板id
	 * @param regionCode
	 *            地区编码
	 * @param companyName
	 *            公司名称
	 * @return 企业信用统计
	 */
	public Map<String, Long> statsApprovalCredit(CreditSearchVO condition) {
		User loginUser = userDao.getLoginUser();
		Long regionId = loginUser.getRegion().getId();
		StringBuilder hql = new StringBuilder(
				"select distinct(i.id) from Company i left join i.companyCredits c left join c.approval a where i.active=1 and a.netstatus='PASSED' and a.scenestatus='PASSED' ");

		// 信用等级
		if (null != condition.getEntCredit()
				&& !"".equals(condition.getEntCredit())) {
			hql.append(" and a.companyCredit.template.code='").append(
					condition.getEntCredit()).append("' ");
		}

		// 地区
		if (null != condition.getRegionId()
				&& !"".equals(condition.getRegionId())) {
			regionId = Long.parseLong(condition.getRegionId());
		}

		List<Region> regions = regionDao.findRegionsById(regionId);

		if (regions.size() > 0) {
			hql.append(" and i.region.id in ( ");
			for (Region i : regions) {
				hql.append(i.getId()).append(",");
			}
			hql.deleteCharAt(hql.length() - 1).append(" ) ");
		}

		// 企业名称
		if (null != condition.getEntName()
				&& !"".equals(condition.getEntName())) {
			hql.append(" and i.name like '%").append(condition.getEntName())
					.append("%' ");
		}

		// 开始结束日期
		if (null != condition.getBeginDate()
				&& null != condition.getEndDate()
				&& condition.getBeginDate().compareTo(condition.getEndDate()) == 0) {
			hql.append(" and year(a.updateDate)='").append(
					CompanyUtils.formatDate(condition.getBeginDate(), "yyyy"))
					.append("' ");
			hql.append(" and month(a.updateDate)='").append(
					CompanyUtils.formatDate(condition.getBeginDate(), "MM"))
					.append("' ");
			hql.append(" and day(a.updateDate)='").append(
					CompanyUtils.formatDate(condition.getBeginDate(), "dd"))
					.append("' ");
		} else {
			if (null != condition.getBeginDate()) {
				hql.append(" and a.updateDate >='").append(
						CompanyUtils.formatDate(condition.getBeginDate()))
						.append("' ");
			}
			if (null != condition.getEndDate()) {
				hql.append(" and a.updateDate <='").append(
						CompanyUtils.formatDate(condition.getEndDate()))
						.append("' ");
			}
		}

		List<Long> list = approval4CreditDao.find(hql.toString());
		// 返回给Action的数据 键为 RegionId, 值为数量
		Map<String, Long> map = new HashMap<String, Long>();
		if (list.size() > 0) {
			StringBuilder regionHql = new StringBuilder();
			Region region = regionDao.get(regionId);
			int regionFlag = CompanyUtils.ifRegion(region.getCode());
			if (3 == regionFlag) {// 用户选择的是省级
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
			List listRegion = regionDao.find(regionHql.toString());
			// RegionId 为 key ，数量为 Value
			for (int i = 0; i < listRegion.size(); i++) {
				String rName = (String) listRegion.get(i);
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

	public Page<Approval4Credit> findApproval4CreditByCompanyId(
			Page<Approval4Credit> page, Long id) {
		String hql = " from Approval4Credit a where a.netstatus!= null and a.companyCredit.companyInfo.id="
				+ id;
		page = approval4CreditDao.findPage(page, hql);
		System.out.println(page.getTotalCount() + "  " + page.getTotalPages()
				+ "测试：" + hql);
		// Query query = approval4CreditDao.createQuery(hql).setFirstResult(
		// page.getPageSize() * (page.getPageNo() - 1)).setMaxResults(
		// page.getPageSize());
		// List<Approval4Credit> list = query.list();
		// page.setResult(list);
		return page;
	}

	public List<Approval4Credit> statsApproval4Credits(Long templateId,
			String regionCode, String companyName, Date beginDate, Date endDate) {
		String hql = " from Approval4Credit a where 1=1 and a.netstatus='2' and a.scenestatus='2' ";

		if (null != templateId && 0 != templateId) {
			hql += " and a.companyCredit.template.id=" + templateId + " ";
		}

		if (null != regionCode && !"".equals(regionCode)) {
			hql += " and (a.companyCredit.companyInfo.region.code='"
					+ regionCode + "' ";
			List<Region> regions = regionDao.findRegionsByCode(regionCode);
			for (int j = 0; j < regions.size(); j++) {
				hql += " or a.companyCredit.companyInfo.region.code='"
						+ regions.get(j).getCode() + "' ";
			}
			hql += " ) ";
		}
		if (null != companyName && !"".equals(companyName)) {
			hql += " and a.companyCredit.companyInfo.nameCN like '%"
					+ companyName + "%' ";
		}
		if (null != beginDate) {
			hql += " and a.updateDate >='" + CompanyUtils.formatDate(beginDate)
					+ "' ";
		}
		if (null != endDate) {
			hql += " and a.updateDate <='" + CompanyUtils.formatDate(endDate)
					+ "' ";
		}
		System.out.println("测试：" + hql);
		return approval4CreditDao.find(hql);
	}

	public Page findWaitApprovals(Page<Approval4Credit> page) {
		List<PropertyFilter> filters = HibernateWebUtils
				.buildPropertyFilters(Struts2Utils.getRequest());
		String entName = null;
		String entNo = null;
		String entCredit = null;
		String remark = null;
		if (filters.size() > 0) {
			PropertyFilter filter = filters.get(0);
			if (null != filter) {
				if (null != filter.getPropertyValue()
						&& !"".equals(filter.getPropertyValue())) {
					String value = filter.getPropertyValue().toString();
					if (null != filter.getPropertyNames()) {
						for (int i = 0; i < filter.getPropertyNames().length; i++) {
							if ("entName".equals(filter.getPropertyNames()[i])) {
								entName = value;
							}
							if ("entNo".equals(filter.getPropertyNames()[i])) {
								entNo = value;
							}
							if ("entCredit"
									.equals(filter.getPropertyNames()[i])) {
								entCredit = value;
							}
							if ("remark".equals(filter.getPropertyNames()[i])) {
								remark = value;
							}
						}
					}
				}
			}
		}
		User loginUser = userDao.getLoginUser();
		// ,CompanyInfo c,Company i where i.active=1 and
		// a.companyCredit.company=i and c.company=i ";
		StringBuilder hql = new StringBuilder(
				" from Approval4Credit a left join a.companyCredit.company.companyInfo c where a.companyCredit.company.active=1 ");
		hql
				.append("  and ((a.netstatus='PROCESSING' or a.scenestatus='PROCESSING' or a.netstatus='WAITING' or a.scenestatus='WAITING') and a.netstatus<>'REJECTED' and a.scenestatus<>'REJECTED') ");

		List<Region> regions = regionDao.findRegionsById(loginUser.getRegion()
				.getId());

		if (regions.size() > 0) {
			hql.append(" and a.companyCredit.company.region.id in (");
			for (Region i : regions) {
				hql.append(i.getId()).append(",");
			}
			hql.deleteCharAt(hql.length() - 1).append(" ) ");
		}

		StringBuilder hql2 = new StringBuilder();
		if (null != remark && !"".equals(remark)) {
			hql2.append(" or a.companyCredit.description like '%").append(
					remark).append("%' ");
		}
		if (null != entCredit && !"".equals(entCredit)) {
			hql2.append(" or a.companyCredit.template.value like '%").append(
					entCredit).append("%' ");
		}
		if (null != entName && !"".equals(entName)) {
			hql2.append(" or c.nameCN like '%").append(entName).append("%' ");
		}
		if (null != entNo && !"".equals(entNo)) {
			hql2.append(" or c.taxCert like '%").append(entNo).append("%' ");
		}

		if (hql2.length() > 0) {
			hql2.delete(0, 3);
			hql.append(" and ( ").append(hql2).append(" ) ");
		}
		page.setAutoCount(false);
		String countHql = "select distinct(a.id) " + hql.toString();
		List<Long> count = approval4CreditDao.getSession()
				.createQuery(countHql).list();

		page.setTotalCount(count.size());
		String selectHql = "select distinct(a) " + hql.toString()
				+ " order by a.createDate desc ";
		return approval4CreditDao.findPage(page, selectHql);
	}

}
