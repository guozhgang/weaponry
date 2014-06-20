package com.cce.weaponry.web.register;

import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.springframework.beans.factory.annotation.Autowired;

import com.cce.modules.orm.IdEntity;
import com.cce.modules.orm.Page;
import com.cce.modules.security.springsecurity.SpringSecurityUtils;
import com.cce.modules.service.CrudServiceInterface;
import com.cce.modules.web.json.JsonStore;
import com.cce.modules.web.struts2.Struts2Utils;
import com.cce.weaponry.entity.register.Company;
import com.cce.weaponry.entity.register.FileBean;
import com.cce.weaponry.entity.register.Region;
import com.cce.weaponry.entity.register.TechnicianBadge;
import com.cce.weaponry.entity.register.TechnicianInfo;
import com.cce.weaponry.entity.security.User;
import com.cce.weaponry.service.common.CompanyUtils;
import com.cce.weaponry.service.common.RegionManagementService;
import com.cce.weaponry.service.register.Approval4RegisterService;
import com.cce.weaponry.service.register.CompanyInfoService;
import com.cce.weaponry.service.register.FileBeanService;
import com.cce.weaponry.service.register.TechnicianBadgeService;
import com.cce.weaponry.service.register.TechnicianInfoService;
import com.cce.weaponry.service.register.UserBadgeService;
import com.cce.weaponry.service.security.UserCrudService;
import com.cce.weaponry.web.JsonCrudActionSupport;
import com.cce.weaponry.web.vo.register.BadgeVO;
import com.cce.weaponry.web.vo.register.Cert4TechnicianSearchVO;
import com.cce.weaponry.web.vo.register.Cert4TechnicianVO;
import com.cce.weaponry.web.vo.register.TechnicianInfoVO;
import com.cce.weaponry.web.vo.register.TechnicianSearchVO;
import com.cce.weaponry.web.vo.register.TechnicianStatsVO;
import com.cce.weaponry.web.vo.register.TechnicianVO;
import com.cce.weaponry.web.vo.trans.TechnicianInfoDOConverter;

import flexjson.JSONDeserializer;

@Namespace("/record")
@Action("technician")
public class TechnicianInfoAction extends JsonCrudActionSupport<TechnicianInfo> {

	@Autowired
	private Approval4RegisterService approval4RegisterService;

	@Autowired
	private TechnicianBadgeService technicianBadgeService;

	@Autowired
	private CompanyInfoService companyInfoService;

	@Autowired
	private TechnicianInfoService technicianInfoService;

	@Autowired
	private FileBeanService fileBeanService;

	@Autowired
	private UserBadgeService userBadgeService;

	@Autowired
	private UserCrudService userCrudService;

	@Autowired
	private RegionManagementService regionService;

	public FileBeanService getFileBeanService() {
		return fileBeanService;
	}

	public void setFileBeanService(FileBeanService fileBeanService) {
		this.fileBeanService = fileBeanService;
	}

	@Override
	public CrudServiceInterface<TechnicianInfo> getCrudService() {
		return technicianInfoService;
	}

	// -------------- 最新代码分隔 ---------------

	/**
	 * 根据公司id返回公司的技术人员集合 : 企业用户->企业备案->专业技术人员
	 */
	@Override
	public void list() throws Exception {
		// 得到当前登录用户
		User user = userCrudService.getLoginUser();
		// 得到登录用户的企业
		Company com = user.getCompany();
		// 判断企业是否为空
		// if (null == com) {
		// renderMessage(false, "请先注册企业信息");
		// return;
		// }
		Long comId = com == null ? 0l : com.getId();
		// 查询企业的技术人员信息
		Page technicians = technicianInfoService.findTechniciansByCompanyId(
				this.setupPage(), comId);
		// 得到结果集
		List<TechnicianInfo> list = technicians.getResult();
		// 封装成VO对象集合list
		List<TechnicianInfoVO> vos = new ArrayList<TechnicianInfoVO>();

		for (TechnicianInfo i : list) {
			TechnicianInfoVO vo = new TechnicianInfoVO();

			vo.setApprovalDept(i.getApprovalDept());// 公司
			vo.setEducation(i.getEducation());// 学历
			vo.setEntName(i.getCompany().getName());// 公司名称
			if (null != i.getPhoto()) {
				vo.setFileId(i.getPhoto().getId());// 照片
			}
			vo.setId(i.getId());// 技术人员id
			vo.setName(i.getName()); // 技术人员名称
			vo.setTel(i.getTel()); // 技术人员电话
			vo.setType(i.getType()); // 技术人员类型
			// 加入到集合
			vos.add(vo);
		}
		// 重新设置结果集
		technicians.setResult(vos);
		if (logger.isDebugEnabled()) {
			CompanyUtils.printRequestInfo();
			CompanyUtils.printResponseInfo(technicians);
		}
		// 返回给页面
		this.render(technicians);
	}

	/**
	 * 接收前台传入收据封装为Technician对象
	 */
	@SuppressWarnings("unchecked")
	public TechnicianInfo getTechnicianInfo() {
		String data = Struts2Utils.getParameter(JsonStore.RootProperty);
		if (data == null)
			return null;
		JSONDeserializer deserializer = this.getJsonDeserializer();
		JSONDeserializer<IdEntity> jsonDeserializer = deserializer.use(null,
				TechnicianInfoVO.class);
		TechnicianInfoVO entityFromJson = (TechnicianInfoVO) jsonDeserializer
				.deserialize(data);
		TechnicianInfo entityFromDB = null;
		if (entityFromJson.getId() != null) {
			entityFromDB = getCrudService().get(entityFromJson.getId());
		} else {
			entityFromDB = new TechnicianInfo();
		}
		TechnicianInfoDOConverter converter = new TechnicianInfoDOConverter(
				this);
		converter.convert(entityFromJson, entityFromDB);
		return entityFromDB;
	}

	/**
	 * 保存技术人员信息 : 企业备案->专业技术人员
	 */
	@Override
	public void save() throws Exception {
		try {
			TechnicianInfo entity = getTechnicianInfo();
			if (entity != null) {
				// 若没有注册企业信息则必须首先注册企业信息
				Company com = companyInfoService.getComOfLoginUser();
				if (null == com) {
					renderMessage(false, "请先注册企业信息");
					return;
				}
				// 将技术人员设置为这个企业
				entity.setCompany(com);
				// 保存技术人员
				getCrudService().save(entity);

				if (logger.isDebugEnabled()) {
					CompanyUtils.printRequestInfo();
					CompanyUtils.printResponseInfo(entity);
				}

				// 返回给页面
				this.render(getJsonSerializer()
						.serialize(new JsonStore(entity)));
			} else
				throw new RuntimeException("参数错误,指定的数据不存在!");
		} catch (Exception e) {
			this.renderMessage(false, e.getMessage());
			logger.error(e.getMessage(), e);
		}
	}

	/**
	 * 获取证书列表，根据技术人员id : 企业备案-》专业技术人员
	 */
	public void listBadge() {
		// 通过技术人员id得到技术人员相关证书信息
		List<TechnicianBadge> list = technicianBadgeService
				.getBadgesByTechnicianId(getIdParam());

		// 封装成对象
		List<BadgeVO> vos = new ArrayList<BadgeVO>();

		for (TechnicianBadge i : list) {
			BadgeVO vo = new BadgeVO();

			vo.setCreateDate(new Date()); // 创建日期
			vo.setDescription(i.getDescription()); // 描述
			vo.setExpireDate(i.getExpireDate()); // 有效期
			vo.setFileId(i.getFile().getId()); // 关联文件id
			vo.setName(i.getTechInfo().getName()); // 技术人员名称
			vo.setTid(i.getTechInfo().getId());// 技术人员id
			vo.setTname(i.getName());// 证书名称
			vo.setId(i.getId());// 证书id
			vo.setCertNo(i.getCertNo()); // 证件编号
			// 加入到封装对象集合
			vos.add(vo);
		}
		if (logger.isDebugEnabled()) {
			CompanyUtils.printRequestInfo();
			CompanyUtils.printResponseInfo(vos);
		}
		// 返回给页面
		render(getJsonSerializer().serialize(new JsonStore(vos)));
	}

	/**
	 * 删除技术人员: 企业备案->专业技术人员
	 */
	public void deleteTechnician() throws Exception {
		try {
			List<Long> ids = getIdArrayParam();
			if (ids != null && !ids.isEmpty()) {
				for (Long i : ids) {
					TechnicianInfo technician = technicianInfoService.get(i);
					// 不应使用 technician.setBadge(null);
					technician.getBadge().removeAll(technician.getBadge()); // 移除相关联的证书信息
					// 删除技术人员
					technicianInfoService.delete(i);
				}
				if (logger.isDebugEnabled()) {
					CompanyUtils.printRequestInfo();
				}
				renderSuccess();
			} else
				throw new RuntimeException("参数错误,指定的数据不存在!");
		} catch (Exception e) {
			this.renderMessage(false, e.getMessage());
			logger.error(e.getMessage(), e);
		}
	}

	/**
	 * 保存证章信息 : 企业备案->专业技术人员
	 */
	public void saveBadge() {
		// 得到页面传入的数据
		BadgeVO vo = getBadgeVO();
		try {
			TechnicianInfo technicianInfo = technicianInfoService.get(vo
					.getId());
			// 设置证书属性
			for (TechnicianBadge i : technicianInfo.getBadge()) {
				if (i.getName().equals(vo.getTname())) {
					renderMessage(false, "此名称的证书已经存在!");
					return;
				}
			}
			TechnicianBadge badge = new TechnicianBadge();
			badge.setDescription(vo.getDescription());
			badge.setExpireDate(vo.getExpireDate());
			FileBean file = fileBeanService.get(vo.getFileId());
			badge.setFile(file);
			badge.setName(vo.getTname());
			badge.setTechInfo(technicianInfo);
			badge.setCertNo(vo.getCertNo());
			// 保存证书信息
			userBadgeService.save(badge);
			// 返回页面成功信息
			renderSuccess();
		} catch (Exception e) {
			// 遇到异常返回页面失败信息
			renderFailure();
		}
	}

	/**
	 * 根据限制条件查找技术人员集合
	 */
	public void search() {
		// 从页面得到条件封装对象
		TechnicianSearchVO condition = getTechnicianSearchVO();
		// 查询分页结果
		Page technicians = technicianInfoService.searchTechnicianInfos(this
				.setupPage(), condition);
		// 得到结果集
		List<TechnicianInfo> list = technicians.getResult();
		// 封装到VO对象集合
		List<TechnicianInfoVO> vos = new ArrayList<TechnicianInfoVO>();
		// 循环添加
		for (TechnicianInfo i : list) {
			TechnicianInfoVO vo = new TechnicianInfoVO();

			vo.setApprovalDept(i.getApprovalDept()); // 发证机关
			vo.setEducation(i.getEducation());// 学历
			vo.setEntName(i.getCompany().getName()); // 公司名称
			vo.setId(i.getId());// 技术人员id
			vo.setName(i.getName());// 技术人员名称
			vo.setTel(i.getTel()); // 技术人员电话
			vo.setType(i.getType());// 技术人员类型

			vos.add(vo);
		}
		// 重新设置结果集
		technicians.setResult(vos);

		if (logger.isDebugEnabled()) {
			CompanyUtils.printRequestInfo();
			CompanyUtils.printResponseInfo(vos);
		}

		// 返回给页面数据
		render(technicians);
	}

	/**
	 * 根据公司id和技术人员类别获取技术人员封装对象集合
	 * 
	 * @param comId
	 * @param technicianType
	 * @return
	 */
	private List<TechnicianVO> findTechniciansByComType(Long comId,
			String technicianType) {
		Map<Long, String> maps = technicianInfoService.findTechnicianByType(
				comId, technicianType);

		Iterator<Long> ids = maps.keySet().iterator();
		Iterator<String> names = maps.values().iterator();

		List<TechnicianVO> list = new ArrayList<TechnicianVO>();

		for (int i = 0; i < maps.size(); i++) {
			TechnicianVO vo = new TechnicianVO();

			vo.setId(ids.next());
			vo.setName(names.next());

			list.add(vo);
		}
		return list;
	}

	/**
	 * 获取检验人员列表
	 */
	public void getInspectors() {
		Company company = userCrudService.getLoginUser().getCompany();
		if (null == company)
			return;
		String type = "肉品品质检验人员";

		List<TechnicianVO> list = findTechniciansByComType(company.getId(),
				type);

		if (logger.isDebugEnabled()) {
			CompanyUtils.printRequestInfo();
			CompanyUtils.printResponseInfo(list);
		}

		render(new JsonStore(list));
	}

	/**
	 * 获取无害化人员列表
	 */
	public void getHandlers() {
		Company company = userCrudService.getLoginUser().getCompany();
		if (null == company)
			return;
		String type = "无害化处理人员";

		List<TechnicianVO> list = findTechniciansByComType(company.getId(),
				type);

		if (logger.isDebugEnabled()) {
			CompanyUtils.printRequestInfo();
			CompanyUtils.printResponseInfo(list);
		}

		render(new JsonStore(list));
	}

	// -------------- 最新代码分隔 ---------------

	// 通过县、市审批的技术人员
	public void statsPassAllTechnicianInfos() throws Exception {
		// 开始时间
		String beginDateStr = Struts2Utils.getParameter("beginDate");
		// 结束时间
		String endDateStr = Struts2Utils.getParameter("endDate");
		Date beginDate = CompanyUtils.isEmpty(beginDateStr) ? null
				: CompanyUtils.parseDate(beginDateStr);
		Date endDate = CompanyUtils.isEmpty(endDateStr) ? null : CompanyUtils
				.parseDate(endDateStr);
		// 登录名
		String loginUserName = SpringSecurityUtils.getCurrentUserName();
		// 当前登录用户
		User user = userCrudService.findUserByLoginName(loginUserName);

		// 当前登录用户的RegionCode
		String regionCode = user.getRegion().getCode();
		Object[] arr = new Object[3];
		TechnicianInfo technician = new TechnicianInfo();
		Company companyInfo = new Company();
		companyInfo.setRegion(new Region());
		companyInfo.getRegion().setCode(regionCode);
		// companyInfo.("2");
		technician.setCompany(companyInfo);

		arr[0] = companyInfo;
		arr[1] = beginDate;
		arr[2] = endDate;

		// 查找技术人员
		Map<Date, Integer> technicians = technicianInfoService
				.findTechnicianInfosByCondition(arr);
	}

	// 通过县、市审批的技术人员
	public void passAllTechnicianInfos() throws Exception {
		// 开始时间
		String beginDateStr = Struts2Utils.getParameter("beginDate");
		// 结束时间
		String endDateStr = Struts2Utils.getParameter("endDate");
		Date beginDate = CompanyUtils.isEmpty(beginDateStr) ? null
				: CompanyUtils.parseDate(beginDateStr);
		Date endDate = CompanyUtils.isEmpty(endDateStr) ? null : CompanyUtils
				.parseDate(endDateStr);
		// 登录名
		String loginUserName = SpringSecurityUtils.getCurrentUserName();
		// 当前登录用户
		User user = userCrudService.findUserByLoginName(loginUserName);

		// 当前登录用户的RegionCode
		String regionCode = user.getRegion().getCode();
		Object[] arr = new Object[3];
		TechnicianInfo technician = new TechnicianInfo();
		Company companyInfo = new Company();
		companyInfo.setRegion(new Region());
		companyInfo.getRegion().setCode(regionCode);
		// companyInfo.setStatus("2");
		technician.setCompany(companyInfo);

		arr[0] = companyInfo;
		arr[1] = beginDate;
		arr[2] = endDate;

		// 查找技术人员
		Page<TechnicianInfo> technicians = technicianInfoService
				.findTechnicianInfos(this.setupPage(), arr);
		this.render(technicians);
	}

	/**
	 * 查找技术人员证书信息
	 */
	public void searchTechBadgeInfo() {
		Page technicians = new Page<TechnicianInfo>();
		Page<TechnicianInfo> page = this.setupPage();
		System.out
.println("测试：" + page.getPageNo() + "  " + page.getPageSize());
		List<Cert4TechnicianVO> list = new ArrayList<Cert4TechnicianVO>();
		Cert4TechnicianSearchVO condition = getSearchVO();
		if (null == condition) {
			// // companyName beginDate endDate null 20
			// System.out.println(condition.getEntName() + "   "
			// + condition.getBeginDate() + "   " + condition.getEndDate()
			// + "   " + condition.getName() + "   "
			// + condition.getRegionId());
			Object[] arr = new Object[3];
			TechnicianInfo technician = new TechnicianInfo();
			Company companyInfo = new Company();

			// companyInfo.setStatus("2");
			companyInfo.setRegion(userCrudService.getLoginUser().getRegion());

			technician.setCompany(companyInfo);

			arr[0] = technician;
			technicians = technicianInfoService.findTechnicianInfos(page, arr);
		} else {
			Object[] arr = new Object[3];
			TechnicianInfo technician = new TechnicianInfo();
			Company companyInfo = new Company();
			if (null != condition.getEntName()
					&& !"".equals(condition.getEntName())) {
				// companyInfo.setSimpleName(condition.getEntName());
			}
			if (null != condition.getRegionId()
					&& !"".equals(condition.getRegionId())) {
				companyInfo.setRegion(regionService.get(Long
						.parseLong(condition.getRegionId())));
			}
			technician.setCompany(companyInfo);

			arr[0] = technician;
			if (null != condition.getBeginDate()) {
				arr[1] = condition.getBeginDate();
			}
			if (null != condition.getEndDate()) {
				arr[2] = condition.getEndDate();
			}

			technicians = technicianInfoService.findTechnicianInfos(page, arr);
		}

		for (int j = 0; j < technicians.getResult().size(); j++) {
			TechnicianInfo i = (TechnicianInfo) technicians.getResult().get(j);
			Cert4TechnicianVO vo = new Cert4TechnicianVO();
			vo.setId(i.getId());
			// vo.setEntName(i.getCompanyInfo().getNameCN());
			vo.setName(i.getName());
			// error 先取第一个
			List<TechnicianBadge> badges = i.getBadge();
			if (null != badges) {
				Long fileId = (badges.size() < 1) ? null : badges.get(0)
						.getFile().getId();
				vo.setFileId(fileId);
			}

			// vo.setFileId(i.getFile() == null ? null : i.getFile().getId());
			vo.setRegionName(i.getCompany().getRegion().getName());
			list.add(vo);
		}

		technicians.setResult(list);

		render(getJsonSerializer().serialize(new JsonStore(technicians)));
	}

	/**
	 * 把查找方法需要的接收的参数封装成对象
	 * 
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public Cert4TechnicianSearchVO getSearchVO() {
		String data = Struts2Utils.getParameter(JsonStore.RootProperty);
		if (data == null)
			return null;
		JSONDeserializer deserializer = this.getJsonDeserializer();
		JSONDeserializer<IdEntity> jsonDeserializer = deserializer.use(null,
				Cert4TechnicianSearchVO.class);
		return (Cert4TechnicianSearchVO) jsonDeserializer.deserialize(data);
	}

	/**
	 * 把技术人员证章信息封装成对象
	 * 
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public Cert4TechnicianVO getCert4TechnicianVO() {
		String data = Struts2Utils.getParameter(JsonStore.RootProperty);
		if (data == null)
			return null;
		JSONDeserializer deserializer = this.getJsonDeserializer();
		JSONDeserializer<IdEntity> jsonDeserializer = deserializer.use(null,
				Cert4TechnicianVO.class);
		return (Cert4TechnicianVO) jsonDeserializer.deserialize(data);
	}

	/**
	 * 修改技术人员证章证书。 证书如果没有就不用更新，如果有则需要用新的证书ID替换。
	 */
	public void saveTechnicianBadge() throws Exception {
		try {
			Cert4TechnicianVO entity = this.getCert4TechnicianVO();
			System.out.println(entity.getId() + "测试：" + entity.getFileId());
			if (entity != null) {
				if (null != entity.getFileId()) {
					TechnicianInfo technicianInfo = technicianInfoService
							.get(entity.getId());

					technicianInfoService.save(technicianInfo);
					// technicianInfo.setFile(file);
					FileBean file = fileBeanService.get(entity.getFileId());
					TechnicianBadge badge = new TechnicianBadge();
					badge.setFile(file);
					badge.setTechInfo(technicianInfo);
					userBadgeService.save(badge);
				}
				// getCrudService().save(entity);
				this.render(getJsonSerializer()
						.serialize(new JsonStore(entity)));
			} else
				throw new RuntimeException("参数错误,指定的数据不存在!");
		} catch (Exception e) {
			this.renderMessage(false, e.getMessage());
			logger.error(e.getMessage(), e);
		}
	}

	/**
	 * 删除技术人员
	 */
	@Override
	public void delete() throws Exception {
		try {
			List<Long> ids = getIdArrayParam();
			if (ids != null && !ids.isEmpty()) {
				for (Long i : ids) {
					TechnicianInfo technician = technicianInfoService.get(i);
					List<TechnicianBadge> badges = technician.getBadge();
					if (null != badges) {
						for (TechnicianBadge t : badges) {
							technician.getBadge().remove(t);
							userBadgeService.delete(t.getId());
						}
					}
				}
				renderSuccess();
			} else
				throw new RuntimeException("参数错误,指定的数据不存在!");
		} catch (Exception e) {
			this.renderMessage(false, e.getMessage());
			logger.error(e.getMessage(), e);
		}
	}

	/**
	 * 把查找方法需要接收的参数封装成对象
	 * 
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public TechnicianSearchVO getTechnicianSearchVO() {
		String data = Struts2Utils.getParameter(JsonStore.RootProperty);
		if (data == null)
			return null;
		JSONDeserializer deserializer = this.getJsonDeserializer();
		JSONDeserializer<IdEntity> jsonDeserializer = deserializer.use(null,
				TechnicianSearchVO.class);
		return (TechnicianSearchVO) jsonDeserializer.deserialize(data);
	}

	/**
	 * 用于统计技术人员信息{@link TechnicianInfo}
	 */
	public void statistics() {
		Map<String, Integer> maps = companyInfoService
				.statsCompaniesByRegion(Struts2Utils.getParameter("data"));
		Iterator<String> itNameCN = maps.keySet().iterator();
		Iterator<Integer> itCount = maps.values().iterator();

		List<TechnicianStatsVO> list = new ArrayList<TechnicianStatsVO>();

		for (int i = 0; i < maps.size(); i++) {
			TechnicianStatsVO vo = new TechnicianStatsVO();
			vo.setCompanynameCN(itNameCN.next());
			vo.setCount(itCount.next());

			list.add(vo);
		}

		if (logger.isDebugEnabled()) {
			CompanyUtils.printRequestInfo();
			CompanyUtils.printResponseInfo(list);
		}

		render(new JsonStore(list));
	}

	/**
	 * 封装参数为证章信息
	 * 
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public BadgeVO getBadgeVO() {
		String data = Struts2Utils.getParameter(JsonStore.RootProperty);
		if (data == null)
			return null;
		JSONDeserializer deserializer = this.getJsonDeserializer();
		JSONDeserializer<IdEntity> jsonDeserializer = deserializer.use(null,
				BadgeVO.class);
		return (BadgeVO) jsonDeserializer.deserialize(data);
	}

	/**
	 * 删除技术人员证章信息
	 */
	public void deleteBadge() {
		try {
			for (Long i : getIdArrayParam()) {
				technicianBadgeService.delete(i);
			}
			renderSuccess();
		} catch (Exception e) {
			renderFailure();
		}
	}

	// 1、判断企业备案是否通过；2、判断企业备案是否有审批中的记录
	public void newBtnEnabled() throws Exception {
		boolean flag = false;
		Company company = userCrudService.getLoginUser().getCompany();
		// 没注册企业信息	
		if (null == company) {
			flag = false;
		// 企业备案没有通过
		} else if (null == company.getLastAppCompanyInfo()) {
			flag = false;
		// 备案通过后是否有正在审批中的审批项
		} else {
			flag = approval4RegisterService
					.isSubmitByCompanyId(company.getId());
		}
		if (flag) {
			this.renderSuccess();
		} else {
			this.renderFailure();
		}
	}
}
