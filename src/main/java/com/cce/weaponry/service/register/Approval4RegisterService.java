package com.cce.weaponry.service.register;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cce.modules.orm.Page;
import com.cce.modules.orm.PropertyFilter;
import com.cce.modules.service.CrudServiceInterface;
import com.cce.weaponry.dao.register.Approval4RegisterDao;
import com.cce.weaponry.dao.register.ApproveRegisterDetailDao;
import com.cce.weaponry.dao.register.CompanyDao;
import com.cce.weaponry.dao.register.CompanyInfoDao;
import com.cce.weaponry.dao.register.RegionDao;
import com.cce.weaponry.dao.security.UserDao;
import com.cce.weaponry.entity.register.Approval4Register;
import com.cce.weaponry.entity.register.ApproveRegisterDetail;
import com.cce.weaponry.entity.register.Company;
import com.cce.weaponry.entity.register.CompanyInfo;
import com.cce.weaponry.entity.register.Region;
import com.cce.weaponry.entity.security.User;
import com.cce.weaponry.service.common.CompanyUtils;

@Service
@Transactional
public class Approval4RegisterService implements
		CrudServiceInterface<Approval4Register> {

	@Autowired
	private CompanyDao companyDao;

	@Autowired
	private Approval4RegisterDao approval4RegisterDao;

	@Autowired
	private ApproveRegisterDetailDao approveRegisterDetailDao;

	@Autowired
	private CompanyInfoDao companyInfoDao;

	@Autowired
	private RegionDao regionDao;

	@Autowired
	private UserDao userDao;

	// ---------------- 最新代码分隔 ---------------------

	/**
	 * 提交企业信息
	 * 
	 * @param companyId
	 *            企业id
	 * @return 申请项的id
	 */
	public Long submitCompanyInfo(Long companyId) {
		if (null == companyId || 0l == companyId)
			return null;
		CompanyInfo company = companyInfoDao.get(companyId);

		// 判断企业是否可以提交企业信息
		boolean submit = isSubmitByCompanyId(company.getCompany().getId());

		if (!submit)
			return null;
		if ("PASSED".equals(company.getStatus()))
			return 0l;

		company.setStatus("WAITING");

		companyInfoDao.save(company); // 保存企业信息

		// 将所有审批项调整为不活动状态
		setIsActiveByComId(company.getId());

		Approval4Register approval = new Approval4Register(); // 保存申请项

		approval.setCreateDate(new Date());
		approval.setIsActive(true);
		approval.setCompanyInfo(company);
		approval.setCnstatus("WAITING");
		approval.setCpstatus("WAITING");
		approval.setCstatus(null);

		approval4RegisterDao.save(approval);

		// 保存申请历史
		ApproveRegisterDetail detail = new ApproveRegisterDetail();

		detail.setApproval(approval);
		detail.setCreateBy(userDao.getLoginUser().getLoginName());
		detail.setCreateDate(new Date());
		detail.setType("提交");
		detail.setRole("企业");
		detail.setComment("");

		approveRegisterDetailDao.save(detail);

		return approval.getId();
	}

	/**
	 * 判断企业是否可以提交备案信息
	 * 
	 * @param companyId
	 *            企业id
	 */
	public boolean isSubmitByCompanyId(Long companyId) {
		String hql = "select count(i.id) from CompanyInfo i where i.company.id="
				+ companyId
				+ " and (i.status='WAITING' or i.status='PROCESSING') ";
		Long count = (Long) approval4RegisterDao.createQuery(hql)
				.uniqueResult();
		return count > 0 ? false : true;
	}

	/**
	 * 得到登录用户的企业备案的待处理数量
	 */
	public int getTaskCount() {
		StringBuilder hql = new StringBuilder(
				"select count(r.id) from Approval4Register r where r.companyInfo.company.active=1 ");

		User user = userDao.getLoginUser();

		Region region = user.getRegion();
		List<Region> regionList = regionDao.findRegionsById(region.getId());
		if (regionList.size() > 0) {
			hql.append(" and r.companyInfo.company.region.id in ( ");
			for (Region i : regionList) {
				hql.append(i.getId()).append(",");
			}
			hql.deleteCharAt(hql.length() - 1);
			hql.append(" ) ");
		}
		if ("县级用户".equals(user.getRole().getName())) {
			hql
					.append(" and ( (r.cnstatus='WAITING' and r.cpstatus='WAITING') or ((r.cnstatus='PROCESSING' or r.cpstatus='PROCESSING') and r.cnstatus<>'REJECTED' and r.cpstatus<>'REJECTED') ) ");
		} else if ("市级用户".equals(user.getRole().getName())) {
			hql.append(" and r.cstatus='PROCESSING' ");
		} else
			return 0;
		return ((Long) approval4RegisterDao.createQuery(hql.toString())
				.uniqueResult()).intValue();
	}

	// ---------------- 最新代码分隔 ---------------------

	public void delete(List<Long> ids) {
		approval4RegisterDao.delete(ids);
	}

	public Approval4Register get(Long id) {
		return approval4RegisterDao.get(id);
	}

	public List<Approval4Register> list(List<PropertyFilter> filters) {
		return approval4RegisterDao.find(filters);
	}

	public Page<Approval4Register> list(Page<Approval4Register> page,
			List<PropertyFilter> filters) {
		return approval4RegisterDao.findPage(page, filters);
	}

	public void save(Approval4Register entity) {
		approval4RegisterDao.save(entity);
	}

	public void setIsActiveByComId(Long comId) {
		if (null != comId && 0 != comId.intValue()) {
			String hql = "update Approval4Register r set r.isActive=0 where r.companyInfo.id="
					+ comId;
			approval4RegisterDao.createQuery(hql).executeUpdate();
		}
	}

	public Approval4Register getApprovalByCompanyId(Long companyId) {
		if (null != companyId) {
			String hql = "from Approval4Register r where r.companyInfo.id="
					+ companyId + " order by r.createDate desc ";
			List<Approval4Register> approvals = approval4RegisterDao.find(hql);
			return approvals.size() == 0 ? null : approvals.get(0);
		}
		return null;
	}

	/**
	 * 根据企业id得到相应的申请项
	 * 
	 * @param companyId
	 * @return 活动的申请项
	 */
	public Approval4Register getActiveApprovalByCompanyId(long companyId) {
		String hql = "from Approval4Register r where r.isActive=1 and r.companyInfo.id="
				+ companyId + " order by r.createDate desc ";// r.isActive=1 and
		List<Approval4Register> approvals = approval4RegisterDao.find(hql);
		return approvals.size() == 0 ? null : approvals.get(0);
	}

	/**
	 * 根据企业id得到相应的申请项
	 * 
	 * @param companyId
	 * @return 活动的申请项
	 */
	public Page<Approval4Register> findApprovalsByCompanyId(
			Page<Approval4Register> page, long companyId) {
		String hql = "from Approval4Register r where r.companyInfo.id="
				+ companyId + " order by r.createDate desc ";
		Page<Approval4Register> approvals = approval4RegisterDao.findPage(page,
				hql);
		return approvals;
	}

	/**
	 * 通过县的审批
	 * 
	 * @param approval4Register
	 *            审批项
	 * @param dealBy
	 *            处理人
	 * @param comment
	 *            审批意见
	 */
	public void passCounty(Long approval4RegisterId, String dealBy,
			String comment) {
		Approval4Register approval4Register = approval4RegisterDao
				.get(approval4RegisterId);

		// approval4Register.setIsActive(true);
		approval4Register.setCnstatus("PASSED");
		approval4Register.setCncomment(comment);

		// 在纸质通过、网上通过时，将市级的状态调整为正在处理
		if ("PASSED".equals(approval4Register.getCpstatus())) {
			approval4Register.setCstatus("PROCESSING");
		}
		// 在纸质在待处理状态时,将此审批项的状态调整为正在处理
		if ("WAITING".equals(approval4Register.getCpstatus())) {
			approval4Register.setCpstatus("PROCESSING");
		}

		approval4RegisterDao.save(approval4Register);

		ApproveRegisterDetail detail = new ApproveRegisterDetail();

		detail.setApproval(approval4Register);
		detail.setCreateBy(dealBy);
		detail.setCreateDate(new Date());
		detail.setType("网上通过");
		detail.setComment("");
		detail.setRole("县级");

		approveRegisterDetailDao.save(detail);

		CompanyInfo companyInfo = approval4Register.getCompanyInfo();

		companyInfo.setStatus("PROCESSING");

		companyInfoDao.save(companyInfo);
	}

	/**
	 * 未通过县的审批
	 * 
	 * @param approval4Register
	 *            审批项
	 * @param dealBy
	 *            处理人
	 */
	public void notPassCounty(Long approval4RegisterId, String dealBy,
			String comment) {
		Approval4Register approval4Register = approval4RegisterDao
				.get(approval4RegisterId);

		// approval4Register.setIsActive(false);
		approval4Register.setCnstatus("REJECTED");
		approval4Register.setCstatus(null);
		approval4Register.setCncomment(comment);

		if ("WAITING".equals(approval4Register.getCpstatus())) {
			approval4Register.setCpstatus("PROCESSING");
		}

		approval4RegisterDao.save(approval4Register);

		ApproveRegisterDetail detail = new ApproveRegisterDetail();

		detail.setApproval(approval4Register);
		detail.setCreateBy(dealBy);
		detail.setCreateDate(new Date());
		detail.setType("网上退回");
		detail.setComment(comment);
		detail.setRole("县级"); // 县级审批

		approveRegisterDetailDao.save(detail);

		CompanyInfo companyInfo = approval4Register.getCompanyInfo();

		companyInfo.setStatus("REJECTED");

		companyInfoDao.save(companyInfo);
	}

	/**
	 * 通过市的审批
	 * 
	 * @param approval4Register
	 *            审批项
	 * @param dealBy
	 *            处理人
	 */
	public void passCity(Long approval4RegisterId, String dealBy, String comment) {
		Approval4Register approval4Register = approval4RegisterDao
				.get(approval4RegisterId);

		// approval4Register.setIsActive(false);
		approval4Register.setCnstatus("PASSED");
		approval4Register.setCpstatus("PASSED");
		approval4Register.setCstatus("PASSED");// 设置市级网上状态是通过
		approval4Register.setCcomment(comment); // 设置市级审批意见

		approval4RegisterDao.save(approval4Register);
		// 保存审批历史
		ApproveRegisterDetail detail = new ApproveRegisterDetail();

		detail.setApproval(approval4Register);
		detail.setCreateBy(dealBy);
		detail.setCreateDate(new Date());
		detail.setType("通过");
		detail.setComment("");// comment
		detail.setRole("市级"); // 市级审批

		approveRegisterDetailDao.save(detail);

		// 将公司信息设置为已通过审批
		CompanyInfo com = approval4Register.getCompanyInfo();

		com.setStatus("PASSED");
		com.setUpdateDate(new Date());

		companyInfoDao.save(com);

		// 通过备案后则以通过备案的企业名称为准
		Company company = com.getCompany();

		company.setName(com.getNameCN());

		companyDao.save(company);
	}

	/**
	 * 未通过市的审批
	 * 
	 * @param approval4Register
	 *            审批项
	 * @param dealBy
	 *            处理人
	 */
	public void notPassCity(Long approval4RegisterId, String dealBy,
			String comment) {
		Approval4Register approval4Register = approval4RegisterDao
				.get(approval4RegisterId);

		// approval4Register.setIsActive(true);
		approval4Register.setCnstatus("PROCESSING");
		approval4Register.setCpstatus("PROCESSING");
		approval4Register.setCstatus("REJECTED"); // 设置市级网上状态是未通过
		approval4Register.setCcomment(comment);// 设置市级审批意见

		approval4RegisterDao.save(approval4Register);
		// 审批历史
		ApproveRegisterDetail detail = new ApproveRegisterDetail();

		detail.setApproval(approval4Register);
		detail.setCreateBy(dealBy);
		detail.setCreateDate(new Date());
		detail.setType("退回");
		detail.setComment(comment);
		detail.setRole("市级"); // 市级审批

		approveRegisterDetailDao.save(detail);

		CompanyInfo companyInfo = approval4Register.getCompanyInfo();

		companyInfo.setStatus("PROCESSING");

		companyInfoDao.save(companyInfo);
	}

	/**
	 * 通过限制查询条件构建查询申请项的hql语句
	 * 
	 * @param criterial
	 * @return hql 语句
	 */
	public String buildApprovalHql(Object criterial) {
		Object[] arr = (Object[]) criterial;

		Approval4Register registerApproval = null;
		Date beginDate = null;
		Date endDate = null;

		if (null != criterial) {
			registerApproval = (Approval4Register) arr[0];
			beginDate = (Date) arr[1];
			endDate = (Date) arr[2];
		}

		String hql = " from Approval4Register r where 1=1 ";

		if (null != registerApproval) {
			if (null != registerApproval.getIsActive()) {
				hql += " and r.isActive = "
						+ (registerApproval.getIsActive() ? 1 : 0) + " ";
			}
			// 县级网上状态
			if (null != registerApproval.getCnstatus()
					&& !"".equals(registerApproval.getCnstatus())) {
				if ("4".equals(registerApproval.getCnstatus())) {// 县级审批项
					hql += " and (((r.cnstatus='1' or r.cpstatus='1') and r.cstatus='1')) ";
				} else if ("5".equals(registerApproval.getCnstatus())) { // 审批中
					hql += " and (((r.cnstatus='2' and r.cpstatus='1') or (r.cnstatus='1' or r.cpstatus='2')) and r.cstatus='1') or (r.cnstatus='2' and r.cstatus='1' and r.cpstatus='2') ";
				} else if ("6".equals(registerApproval.getCnstatus())) { // 退回
					hql += " and (r.cnstatus='3' or r.cpstatus='3') and cstatus is null ";
				} else {
					hql += " and r.cnstatus='" + registerApproval.getCnstatus()
							+ "' ";
				}
			}
			// 市级网上状态
			if (null != registerApproval.getCstatus()
					&& !"".equals(registerApproval.getCstatus())) {
				hql += " and r.cstatus='" + registerApproval.getCstatus()
						+ "' ";
			}// 县级纸质状态
			if (null != registerApproval.getCpstatus()
					&& !"".equals(registerApproval.getCpstatus())) {
				hql += " and r.cpstatus='" + registerApproval.getCpstatus()
						+ "' ";
			}
			if (null != registerApproval.getCompanyInfo()) {
				// if (null != registerApproval.getCompanyInfo().getRegion()) {
				// if (!"".equals(registerApproval.getCompanyInfo()
				// .getRegion().getCode())) {
				// String code = registerApproval.getCompany()
				// .getRegion().getCode();
				// hql += " and ( r.company.region.code='"
				// + registerApproval.getCompany().getRegion()
				// .getCode() + "' ";
				// List<Region> cities = regionDao.findRegionsByCode(code);
				// for (int j = 0; j < cities.size(); j++) {
				// hql += " or r.company.region.code='"
				// + cities.get(j).getCode() + "' ";
				// }
				// hql += " ) ";
			}
		}
		// if (null != registerApproval.getCompany().getFixedButchNo()
		// && !"".equals(registerApproval.getCompany()
		// .getFixedButchNo())) {
		// hql += " and r.company.fixedButchNo like '%"
		// + registerApproval.getCompany()
		// .getFixedButchNo() + "%' ";
		// }
		// if (null != registerApproval.getCompany().getRegisterNo()
		// && !"".equals(registerApproval.getCompany()
		// .getRegisterNo())) {
		// hql += " and r.company.registerNo like '%"
		// + registerApproval.getCompany().getRegisterNo()
		// + "%' ";
		// }
		// String hql2 = "";
		// if (null != registerApproval.getCompany().getSimpleName()
		// && !"".equals(registerApproval.getCompany()
		// .getSimpleName())) {
		// hql2 += " or r.company.nameCN like '%"
		// + registerApproval.getCompany().getSimpleName()
		// + "%' ";
		// }
		// if (null != registerApproval.getCompany().getTaxCert()
		// && !"".equals(registerApproval.getCompany()
		// .getTaxCert())) {
		// hql2 += " or r.company.taxCert like '%"
		// + registerApproval.getCompany().getTaxCert()
		// + "%' ";
		// }
		// if (null != registerApproval.getCompany().getOrgCode()
		// && !"".equals(registerApproval.getCompany()
		// .getOrgCode())) {
		// hql2 += " or r.company.orgCode like '%"
		// + registerApproval.getCompany().getOrgCode()
		// + "%' ";
		// }
		// if (!"".equals(hql2)) {
		// hql2 = hql2.substring(3, hql2.length());
		// hql += " and ( " + hql2 + " ) ";
		// }
		// }
		// }
		if (null != beginDate && null != endDate
				&& endDate.compareTo(beginDate) == 0) {
			hql += " and r.createDate ='" + CompanyUtils.formatDate(beginDate)
					+ "' ";
		} else {
			if (null != beginDate) {
				hql += " and r.createDate >='"
						+ CompanyUtils.formatDate(beginDate) + "' ";
			}
			if (null != endDate) {
				hql += " and r.createDate <='"
						+ CompanyUtils.formatDate(endDate) + "' ";
			}
		}
		hql += " order by r.createDate desc ";
		System.out.println("测试：" + hql);
		return hql;
	}

	/**
	 * 通过限制查询条件查询申请项
	 * 
	 * @param criterial
	 *            限制条件
	 * @return 申请项
	 */
	public Page<Approval4Register> findActiveApproval(
			Page<Approval4Register> page, Object criterial) {
		String hql = buildApprovalHql(criterial);
		return approval4RegisterDao.findPage(page, hql);
	}

	public void saveCountyComment(Long approval4RegisterId, String comment) {
		Approval4Register approval4Register = approval4RegisterDao
				.get(approval4RegisterId);
		approval4Register.setCncomment(comment);
		approval4RegisterDao.save(approval4Register);

	}

	public void saveCityComment(Long approval4RegisterId, String comment) {
		Approval4Register approval4Register = approval4RegisterDao
				.get(approval4RegisterId);

		approval4Register.setCcomment(comment);
		approval4RegisterDao.save(approval4Register);
	}

	public synchronized void scenePassCounty(Long approvalId, String dealBy,
			String opnion) {
		Approval4Register approval4Register = approval4RegisterDao
				.get(approvalId);

		// approval4Register.setIsActive(true);
		approval4Register.setCpstatus("PASSED");
		approval4Register.setCpcomment(opnion);

		// 在纸质通过、网上通过时，将市级的状态调整为正在处理
		if ("PASSED".equals(approval4Register.getCnstatus())) {
			approval4Register.setCstatus("PROCESSING");
		}
		// 在网上在待处理状态时,将此审批项的状态调整为正在处理
		if ("WAITING".equals(approval4Register.getCnstatus())) {
			approval4Register.setCnstatus("PROCESSING");
		}

		approval4RegisterDao.save(approval4Register);
		// 保存审批历史
		ApproveRegisterDetail detail = new ApproveRegisterDetail();

		detail.setApproval(approval4Register);
		detail.setCreateBy(dealBy);
		detail.setCreateDate(new Date());
		detail.setType("纸质通过");
		detail.setComment("");
		detail.setRole("县级");

		approveRegisterDetailDao.save(detail);

		CompanyInfo company = approval4Register.getCompanyInfo();

		company.setStatus("PROCESSING");

		companyInfoDao.save(company);
	}

	public void sceneNotPassCounty(Long approvalId, String dealBy, String opnion) {
		Approval4Register approval4Register = approval4RegisterDao
				.get(approvalId);

		// approval4Register.setIsActive(false);
		approval4Register.setCpstatus("REJECTED");
		approval4Register.setCstatus(null);
		approval4Register.setCpcomment(opnion);

		if ("WAITING".equals(approval4Register.getCnstatus())) {
			approval4Register.setCnstatus("PROCESSING");
		}

		approval4RegisterDao.save(approval4Register);
		// 审批历史
		ApproveRegisterDetail detail = new ApproveRegisterDetail();

		detail.setApproval(approval4Register);
		detail.setCreateBy(dealBy);
		detail.setCreateDate(new Date());
		detail.setType("纸质退回");
		detail.setComment(opnion);
		detail.setRole("县级");

		approveRegisterDetailDao.save(detail);

		CompanyInfo company = approval4Register.getCompanyInfo();

		company.setStatus("REJECTED");

		companyInfoDao.save(company);
	}

	public Page<Approval4Register> findApprovalsByCondition(
			Page<Approval4Register> page, List<PropertyFilter> filters,
			User user) {
		String nameCN = null; // 企业名称
		String taxCert = null; // 税务等级
		String orgCode = null; // 组织机构
		String status = null; // 状态

		if (null != filters && filters.size() > 0) {
			PropertyFilter filter = filters.get(0);
			if (null != filter.getPropertyNames()) {
				String value = filter.getPropertyValue().toString();
				for (int i = 0; i < filter.getPropertyNames().length; i++) {
					if ("nameCN".equals(filter.getPropertyNames()[i])) {
						nameCN = value;
					}
					if ("taxCert".equals(filter.getPropertyNames()[i])) {
						taxCert = value;
					}
					if ("orgCode".equals(filter.getPropertyNames()[i])) {
						orgCode = value;
					}
					if ("status".equals(filter.getPropertyNames()[i])) {
						if ("创建".equals(value)) {
							status = "CREATED";
						} else if ("等待审批".equals(value)) {
							status = "WAITING";
						} else if ("审批中".equals(value)) {
							status = "PROCESSING";
						} else if ("审批通过".equals(value)) {
							status = "PASSED";
						} else if ("退回".equals(value)) {
							status = "REJECTED";
						}
					}
				}
			}
		}

		System.out.println("测试：" + nameCN + "    " + taxCert + "        "
				+ orgCode + "    " + status);

		StringBuilder hql = new StringBuilder(
				" from Approval4Register r where 1=1 ");
		StringBuilder condition = new StringBuilder();

		if (null != nameCN && !"".equals(nameCN)) {
			condition.append(" or r.companyInfo.nameCN like '%").append(nameCN)
					.append("%' ");
		}
		if (null != taxCert && !"".equals(taxCert)) {
			condition.append(" or r.companyInfo.taxCert like '%").append(
					taxCert).append("%' ");
		}
		if (null != orgCode && !"".equals(orgCode)) {
			condition.append(" or r.companyInfo.orgCode like '%").append(
					orgCode).append("%' ");
		}
		if (null != status && !"".equals(status)) {
			condition.append(" or r.companyInfo.status like '%").append(status)
					.append("%' ");
		}

		if (condition.length() > 0) {
			condition.delete(0, 3);
			hql.append(" and ( ").append(condition).append(" ) ");
		}

		hql.append(" and r.companyInfo.company.active=1 ");

		Region region = user.getRegion();
		List<Region> regionList = regionDao.findRegionsById(region.getId());
		if (regionList.size() > 0) {
			hql.append(" and r.companyInfo.company.region.id in ( ");
			for (Region i : regionList) {
				hql.append(i.getId()).append(",");
			}
			hql.deleteCharAt(hql.length() - 1);
			hql.append(" ) ");
		}
		if ("县级用户".equals(user.getRole().getName())) {
			hql
					.append(" and ( (r.cnstatus='WAITING' and r.cpstatus='WAITING') or ((r.cnstatus='PROCESSING' or r.cpstatus='PROCESSING') and r.cnstatus<>'REJECTED' and r.cpstatus<>'REJECTED') ) ");
		} else if ("市级用户".equals(user.getRole().getName())) {
			hql.append(" and r.cstatus='PROCESSING' ");
		}
		return approval4RegisterDao.findPage(page, hql.toString());
	}

}
