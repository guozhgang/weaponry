package com.cce.weaponry.service.credit;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cce.modules.orm.Page;
import com.cce.modules.orm.PropertyFilter;
import com.cce.modules.service.CrudServiceInterface;
import com.cce.weaponry.dao.credit.Approval4CreditDao;
import com.cce.weaponry.dao.credit.ApproveCreditDetailDao;
import com.cce.weaponry.dao.credit.CompanyCreditDao;
import com.cce.weaponry.dao.register.CompanyDao;
import com.cce.weaponry.dao.security.UserDao;
import com.cce.weaponry.entity.credit.Approval4Credit;
import com.cce.weaponry.entity.credit.ApproveCreditDetail;
import com.cce.weaponry.entity.credit.CompanyCredit;
import com.cce.weaponry.entity.dict.DictCompanyCredit;
import com.cce.weaponry.entity.register.Company;
import com.cce.weaponry.entity.register.FileBean;
import com.cce.weaponry.entity.security.User;
import com.cce.weaponry.service.CommonEntityService;
import com.cce.weaponry.service.register.FileBeanService;

@Service
@Transactional
public class CompanyCreditService implements
		CrudServiceInterface<CompanyCredit> {

	@Autowired
	private UserDao userDao;

	@Autowired
	private CompanyDao companyDao;

	@Autowired
	private CompanyCreditDao companyCreditDao;

	@Autowired
	private CommonEntityService commonService;

	@Autowired
	private Approval4CreditDao approval4CreditDao;

	@Autowired
	private ApproveCreditDetailDao approveCreditDetailDao;

	@Autowired
	private FileBeanService fileBeanService;

	// ------------ 最新代码分隔 ------------

	/**
	 * 保存公司信用等级
	 */
	public Long saveCompanyCreditApproval(Long companyId, Long approvalLevelId,
			String remark, Long fileId) {
		User loginUser = userDao.getLoginUser();

		List<Approval4Credit> apps = approval4CreditDao
				.findApproval4CreditsByComId(companyId);
		for (Approval4Credit i : apps) {
			if (("PROCESSING".equals(i.getNetstatus()) && "PROCESSING".equals(i
					.getScenestatus()))
					|| ("PROCESSING".equals(i.getNetstatus()) && "PASSED"
							.equals(i.getScenestatus()))
					|| ("PASSED".equals(i.getNetstatus()) && "PROCESSING"
							.equals(i.getScenestatus())))
				return 0l;
		}

		apps = approval4CreditDao.findApproval4CreditsByComTemId(companyId,
				approvalLevelId);

		boolean isRight = true;
		for (Approval4Credit i : apps) {
			System.out.println("测试：" + i.getNetstatus() + "  "
					+ i.getScenestatus());
			// 企业已经有了此项申请且被退回
			if ("REJECTED".equals(i.getNetstatus())
					|| "REJECTED".equals(i.getScenestatus())
					|| (null == i.getNetstatus() && null == i.getScenestatus())) {
				isRight = true;
			} else {
				isRight = false;
				break;
			}
		}

		if (!isRight)
			return null;

		// 保存信用等级
		Company company = companyDao.get(companyId);

		CompanyCredit companyCredit = getCompanyCreditByCondition(companyId,
				approvalLevelId);

		// 如果公司没有此等级的申请
		if (null == companyCredit) {
			companyCredit = new CompanyCredit();
		}

		companyCredit.setCompany(company);
		companyCredit.setCreateBy(loginUser.getLoginName());
		companyCredit.setCreateDate(new Date());
		companyCredit.setDescription(remark);

		// 相关文件
		FileBean file = fileBeanService.get(fileId);
		companyCredit.setFile(file);
		companyCredit.setTemplate((DictCompanyCredit) commonService
				.getDictEntityById(DictCompanyCredit.class, approvalLevelId));

		companyCreditDao.save(companyCredit);

		// 保存信用等级申请项
		Approval4Credit approvalCredit = new Approval4Credit();

		approvalCredit.setCompanyCredit(companyCredit);
		approvalCredit.setCreateDate(new Date());
		approvalCredit.setIsActive(true);
		approvalCredit.setComComment(remark);
		// approvalCredit.setNetcomment(remark);
		// approvalCredit.setNetstatus(null);
		// approvalCredit.setScenecomment(null);
		// approvalCredit.setScenestatus(null);

		approval4CreditDao.save(approvalCredit);
		return approvalCredit.getId();
	}

	/**
	 * 得到公司最高等级
	 * 
	 * @param companyId
	 * @param levelId
	 * @return A、B、C、D
	 */
	public String getSummitCredit(Long companyId) {
		StringBuilder hql = new StringBuilder(
				"select distinct(i.template.code) from CompanyCredit i left join i.approval a where i.company.id=");
		hql.append(companyId).append(
				" and a.netstatus='PASSED' and a.scenestatus='PASSED' ");
		List list = companyCreditDao.find(hql.toString());
		if (list.size() == 0)
			return null;
		String ret = "D";
		for (int i = 0; i < list.size(); i++) {
			String value = list.get(i).toString().trim();
			if (ret.compareTo(value) > 0) {
				ret = value;
			}
		}
		return ret;
	}

	// ------------ 最新代码分隔 ------------

	public void delete(List<Long> ids) {
		companyCreditDao.delete(ids);
	}

	public CompanyCredit get(Long id) {
		return companyCreditDao.get(id);
	}

	public List<CompanyCredit> list(List<PropertyFilter> filters) {
		return companyCreditDao.find(filters);
	}

	public Page<CompanyCredit> list(Page<CompanyCredit> page,
			List<PropertyFilter> filters) {
		return companyCreditDao.findPage(page, filters);
	}

	public void save(CompanyCredit entity) {
		companyCreditDao.save(entity);
	}

	/**
	 * 通过限制条件获得公司信用申请信息
	 * 
	 * @param condition
	 *            限制条件
	 * @return 公司信用申请信息
	 */
	public CompanyCredit getCompanyCreditByCondition(CompanyCredit condition) {
		String hql = " from CompanyCredit c where 1=1 ";
		if (null != condition) {
			// if (null != condition.getCompanyInfo()) {
			// if (null != condition.getCompanyInfo().getId()
			// && 0 != condition.getCompanyInfo().getId()) {
			// hql += " and c.companyInfo.id="
			// + condition.getCompanyInfo().getId() + " ";
			// }
			// }
			if (null != condition.getTemplate()) {
				if (null != condition.getTemplate().getId()
						&& 0 != condition.getTemplate().getId()) {
					hql += " and c.template.id="
							+ condition.getTemplate().getId() + " ";
				}
			}
		}
		return companyCreditDao.findUnique(hql);
	}

	public CompanyCredit getCompanyCreditByCondition(Long companyId,
			Long templateId) {
		String hql = " from CompanyCredit c where 1=1 ";
		if (null != companyId) {
			hql += " and c.company.id=" + companyId + " ";
		}
		if (null != templateId) {
			hql += " and c.template.id=" + templateId + " ";
		}
		return companyCreditDao.findUnique(hql);
	}

	/**
	 * 判断是否正在处理中
	 * 
	 * @param companyId
	 * @return
	 */
	public boolean isProcessing(Long companyId) {
		List<Approval4Credit> apps = approval4CreditDao
				.findApproval4CreditsByComId(companyId);
		for (Approval4Credit i : apps) {
			// 判断是否正在处理
			if (("PROCESSING".equals(i.getNetstatus()) && "PROCESSING".equals(i
					.getScenestatus()))
					|| ("PROCESSING".equals(i.getNetstatus()) && "PASSED"
							.equals(i.getScenestatus()))
					|| ("PASSED".equals(i.getNetstatus()) && "PROCESSING"
							.equals(i.getScenestatus())))
				return true;
		}
		return false;
	}

	/**
	 * 处理公司提交信用等级申请
	 * 
	 * @param companyId
	 *            公司id
	 * @param approvalLevelId
	 *            申请模板id
	 * @param description
	 *            描述
	 * @param fileUrl
	 *            文件路径
	 * @param isSubmit
	 *            保存或提交 为TRUE时提交
	 */
	public synchronized Long submitCompanyCreditApproval(Long companyId,
			Long approvalLevelId, String description, Long fileId,
			boolean isSubmit) {
		companyCreditDao.getSession().clear();
		User loginUser = userDao.getLoginUser();
		if (null == loginUser.getCompany().getLastAppCompanyInfo())
			return 0l;

		if (isProcessing(companyId))
			return null;

		DictCompanyCredit template = (DictCompanyCredit) commonService
				.getDictEntityById(DictCompanyCredit.class, approvalLevelId);

		String summitCredit = this.getSummitCredit(loginUser.getCompany()
				.getId());

		if (null != summitCredit) {// a b
			if (summitCredit.compareTo(template.getCode()) < 0)// 提交的级别要比当前级别要高!
				return -1l;
		}

		Company company = companyDao.get(companyId);

		CompanyCredit companyCredit = getCompanyCreditByCondition(companyId,
				approvalLevelId);

		// 如果公司没有此等级的申请
		if (null == companyCredit) {
			companyCredit = new CompanyCredit();
		}

		companyCredit.setCompany(company);
		companyCredit.setCreateBy(loginUser.getLoginName());
		companyCredit.setCreateDate(new Date());
		companyCredit.setDescription(description);

		// 相关文件
		FileBean file = fileBeanService.get(fileId);
		companyCredit.setFile(file);
		companyCredit.setTemplate(template);

		companyCreditDao.save(companyCredit);

		// 保存信用等级申请项
		Approval4Credit approvalCredit = approval4CreditDao
				.getWaitSubmitApprovalCreditByCreditId(companyCredit.getId());

		if (null == approvalCredit) {
			approvalCredit = new Approval4Credit();
		}

		approvalCredit.setCompanyCredit(companyCredit);
		approvalCredit.setCreateDate(new Date());
		approvalCredit.setIsActive(true);
		approvalCredit.setUpdateDate(new Date());
		approvalCredit.setNetcomment(description);

		approvalCredit.setNetstatus("WAITING");
		approvalCredit.setScenestatus("WAITING");

		// approvalCredit.setScenecomment(null);
		// approvalCredit.setScenestatus(null);

		approval4CreditDao.save(approvalCredit);

		// 保存信用等级申请历史
		ApproveCreditDetail approveCreditDetail = new ApproveCreditDetail();

		approveCreditDetail.setApproval(approvalCredit);
		approveCreditDetail.setComment(description);
		approveCreditDetail.setCreateBy(loginUser.getLoginName());
		approveCreditDetail.setCreateDate(new Date());
		approveCreditDetail.setType("提交");

		approveCreditDetailDao.save(approveCreditDetail);

		companyCreditDao.getSession().flush();
		return approvalCredit.getId();
	}

	/**
	 * 省级审批公司申请
	 * 
	 * @param approval4CreditId
	 *            公司申请项id（即Approval4Credit对象id）
	 * @param opnion
	 *            审批意见
	 * @param isPass
	 *            是否通过
	 * @param dealBy
	 *            处理人
	 */
	public void processCompanyCreditApproval(Long approval4CreditId,
			String opnion, boolean isPass, String dealBy) {
		Approval4Credit approval4Credit = approval4CreditDao
				.get(approval4CreditId);
		approval4Credit.setIsActive(false);
		approval4Credit.setNetcomment(opnion);
		approval4Credit.setNetstatus((isPass ? "PASSED" : "REJECTED"));

		if ("WAITING".equals(approval4Credit.getScenestatus())) {
			approval4Credit.setScenestatus("PROCESSING");
		}

		approval4Credit.setUpdateDate(new Date());

		approval4CreditDao.save(approval4Credit);

		ApproveCreditDetail approveCreditDetail = new ApproveCreditDetail();

		approveCreditDetail.setComment(opnion);
		approveCreditDetail.setCreateBy(dealBy);
		approveCreditDetail.setCreateDate(new Date());
		approveCreditDetail.setType((isPass ? "网上通过" : "网上退回"));
		approveCreditDetail.setApproval(approval4Credit);

		approveCreditDetailDao.save(approveCreditDetail);

		if ("PASSED".equals(approval4Credit.getNetstatus())
				&& "PASSED".equals(approval4Credit.getScenestatus())) {
			// 如果通过则改变此企业所有审批项的信用等级的值
			changeCredit(approval4Credit.getCompanyCredit().getCompany()
					.getId(), approval4Credit.getCompanyCredit().getTemplate()
					.getValue());
			// CompanyInfo com = approval4Credit.getCompanyCredit().getCompany()
			// .getLastAppCompanyInfo();
			// String value = approval4Credit.getCompanyCredit().getTemplate()
			// .getValue();
			// com.setCredit(value);
			// com.setCreditRating(value);
			// companyInfoDao.save(com);
		}
	}

	/**
	 * 省级审批公司申请(现场审批)
	 * 
	 * @param approval4CreditId
	 *            公司申请项id（即Approval4Credit对象id）
	 * @param opnion
	 *            审批意见
	 * @param isPass
	 *            是否通过
	 * @param dealBy
	 *            处理人
	 */
	public synchronized void processCompanyCreditApprovalOfSence(
			Long approval4CreditId, String opnion, boolean isPass, String dealBy) {
		Approval4Credit approval4Credit = approval4CreditDao
				.get(approval4CreditId);
		// approval4Credit.setIsActive(false);
		approval4Credit.setScenecomment(opnion);
		approval4Credit.setScenestatus((isPass ? "PASSED" : "REJECTED"));

		if ("WAITING".equals(approval4Credit.getNetstatus())) {
			approval4Credit.setNetstatus("PROCESSING");
		}

		approval4Credit.setUpdateDate(new Date());

		approval4CreditDao.save(approval4Credit);

		ApproveCreditDetail approveCreditDetail = new ApproveCreditDetail();

		approveCreditDetail.setComment(opnion);
		approveCreditDetail.setCreateBy(dealBy);
		approveCreditDetail.setCreateDate(new Date());
		approveCreditDetail.setType((isPass ? "现场通过" : "现场退回"));
		approveCreditDetail.setApproval(approval4Credit);

		approveCreditDetailDao.save(approveCreditDetail);

		if ("PASSED".equals(approval4Credit.getNetstatus())
				&& "PASSED".equals(approval4Credit.getScenestatus())) {

			// 如果通过则改变此企业所有审批项的信用等级的值
			changeCredit(approval4Credit.getCompanyCredit().getCompany()
					.getId(), approval4Credit.getCompanyCredit().getTemplate()
					.getValue());
			// Company com =
			// approval4Credit.getCompanyCredit().getCompany().getId();
			// String value =
			// approval4Credit.getCompanyCredit().getTemplate().getValue();
			// com.setCredit(value);
			// com.setCreditRating(value);
			// companyInfoDao.save(com);
		}
	}

	/**
	 * 改变此企业所有审批项的信用等级的值
	 * 
	 * @param companyId
	 *            企业id
	 * @param creditValue
	 *            信用档案的值
	 * @return 影响的函数
	 */
	public int changeCredit(Long companyId, String creditValue) {
		StringBuilder hql = new StringBuilder();
		hql
				.append("update CompanyInfo set credit='")
				.append(creditValue)
				.append("',creditRating='")
				.append(creditValue)
				.append(
						"' where id in (select i.id from CompanyInfo i where i.company.id=")
				.append(companyId).append(" )");
		return companyCreditDao.getSession().createQuery(hql.toString())
				.executeUpdate();
	}

	/**
	 * 修改公司等级
	 * 
	 * @param approval4CreditId
	 *            申请项id
	 * @param templateId
	 *            申请模板id
	 * @param reason
	 *            修改原因
	 * @param opnion
	 *            修改意见
	 * @param dealBy
	 *            处理人
	 */
	public boolean modifyCompanyCredit(Long approval4CreditId, Long templateId,
			String reason, String opnion, String dealBy) {
		User loginUser = userDao.getLoginUser();
		Approval4Credit approval4Credit = approval4CreditDao
				.get(approval4CreditId);

		Company company = approval4Credit.getCompanyCredit().getCompany();

		Long companyId = company.getId();

		List<Approval4Credit> apps = approval4CreditDao
				.findApproval4CreditsByComTemId(companyId, templateId);
		for (Approval4Credit i : apps) {
			// 企业已经有了此申请且正在处理，即 退回 或 新建 的情况
			if (!("REJECTED".equals(i.getScenestatus()) || "REJECTED".equals(i
					.getNetstatus()))
					&& null != i.getNetstatus() && null != i.getScenestatus())
				return false;
		}
		CompanyCredit companyCredit = getCompanyCreditByCondition(companyId,
				templateId);

		// 如果公司没有此等级的申请
		if (null == companyCredit) {
			companyCredit = new CompanyCredit();

			companyCredit.setCompany(approval4Credit.getCompanyCredit()
					.getCompany());
			companyCredit.setCreateBy(loginUser.getLoginName());
			companyCredit.setCreateDate(new Date());
			companyCredit.setDescription("");

			companyCredit.setTemplate((DictCompanyCredit) commonService
					.getDictEntityById(DictCompanyCredit.class, templateId));
			companyCredit.setFile(approval4Credit.getCompanyCredit().getFile());

			companyCreditDao.save(companyCredit);
		}

		// company.setCredit(companyCredit.getTemplate().getName().substring(0,
		// 2));

		companyDao.save(company);

		approval4Credit.setCompanyCredit(companyCredit);
		approval4Credit.setNetstatus("PASSED");
		approval4Credit.setScenestatus("PASSED");
		approval4Credit.setNetcomment(reason);
		approval4Credit.setUpdateDate(new Date());

		// 保存修改意见
		approval4CreditDao.save(approval4Credit);

		ApproveCreditDetail approveCreditDetail = new ApproveCreditDetail();

		approveCreditDetail.setComment(opnion);
		approveCreditDetail.setCreateBy(dealBy);
		approveCreditDetail.setCreateDate(new Date());
		approveCreditDetail.setType("信用调整");
		approveCreditDetail.setApproval(approval4Credit);

		// 保存修改历史
		approveCreditDetailDao.save(approveCreditDetail);

		// 改变当前企业的信用等级
		// changeCredit(approval4Credit.getCompanyCredit().getCompany().getId(),
		// approval4Credit.getCompanyCredit().getTemplate().getValue());

		// CompanyInfo com = approval4Credit.getCompanyCredit().getCompany()
		// .getLastAppCompanyInfo();
		// String value = approval4Credit.getCompanyCredit().getTemplate()
		// .getValue();
		// com.setCredit(value);
		// com.setCreditRating(value);
		// companyInfoDao.save(com);

		return true;
	}

	public List<CompanyCredit> findCreditsByCompanyId(Long companyId) {
		String hql = "from CompanyCredit c where c.company.id=" + companyId;
		return companyCreditDao.find(hql);
	}

}
