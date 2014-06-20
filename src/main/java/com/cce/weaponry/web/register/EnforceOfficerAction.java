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
import com.cce.modules.service.CrudServiceInterface;
import com.cce.modules.web.json.JsonStore;
import com.cce.modules.web.struts2.Struts2Utils;
import com.cce.weaponry.entity.register.EnforceOfficer;
import com.cce.weaponry.entity.register.EnforceOfficerBadge;
import com.cce.weaponry.entity.register.EnforceOrg;
import com.cce.weaponry.entity.register.FileBean;
import com.cce.weaponry.service.common.CompanyUtils;
import com.cce.weaponry.service.register.EnforceOfficerBadgeService;
import com.cce.weaponry.service.register.EnforceOfficerService;
import com.cce.weaponry.service.register.EnforceOrgService;
import com.cce.weaponry.service.register.FileBeanService;
import com.cce.weaponry.service.register.UserBadgeService;
import com.cce.weaponry.web.JsonCrudActionSupport;
import com.cce.weaponry.web.vo.register.EnforceOfficerBadgeVO;
import com.cce.weaponry.web.vo.register.EnforceOfficerSearchVO;
import com.cce.weaponry.web.vo.register.EnforceOfficerStatsVO;
import com.cce.weaponry.web.vo.register.EnforceOfficerVO;
import com.cce.weaponry.web.vo.register.ListBadgeVO;
import com.cce.weaponry.web.vo.register.StatsEnforceOfficerVO;

import flexjson.JSONDeserializer;

@Namespace("/info")
@Action("enforceOfficer")
public class EnforceOfficerAction extends JsonCrudActionSupport<EnforceOfficer> {

	@Autowired
	private EnforceOfficerBadgeService enforceOfficerBadgeService;

	@Autowired
	private EnforceOfficerService enforceOfficerService;

	@Autowired
	private UserBadgeService userBadgeService;

	@Autowired
	private FileBeanService fileBeanService;

	@Autowired
	private EnforceOrgService enforceOrgService;

	@Override
	public CrudServiceInterface<EnforceOfficer> getCrudService() {
		return enforceOfficerService;
	}

	// -------------- 最新代码分隔 ---------------------

	/**
	 * 根据执法人员id得到执法人员证章集合
	 */
	public void listBadge() {
		try {
			EnforceOfficer officer = enforceOfficerService.get(getIdParam());// [执法人员id]
			List<EnforceOfficerBadge> badges = officer.getBadge();// 证书列表
			List<ListBadgeVO> vos = new ArrayList<ListBadgeVO>(); // 返回给前台的VO集合

			for (EnforceOfficerBadge i : badges) {// 遍历
				Long expireTime = i.getExpireDate() == null ? null : i
						.getExpireDate().getTime(); // 有效期
				Long createTime = i.getFile().getCreateDate() == null ? null
						: i.getFile().getCreateDate().getTime(); // 创建日期
				ListBadgeVO vo = new ListBadgeVO();

				vo.setCreateDate(createTime);// 创建日期
				vo.setDescription(i.getDescription()); // 证书描述
				vo.setExpireDate(expireTime); // 有效期
				vo.setFileId(i.getFile().getId()); // 证书文件对象id
				vo.setId(i.getId()); // 证书id
				vo.setName(i.getEofficer().getName()); // 执法人员姓名
				vo.setTid(i.getEofficer().getId()); // 执法人员id
				vo.setTname(i.getName());// 证书名称

				vos.add(vo);
			
			}
			
			if(logger.isDebugEnabled()){
				CompanyUtils.printRequestInfo();
				CompanyUtils.printResponseInfo(vos);
			}
			
			render(new JsonStore(vos));
		} catch (Exception e) {
			renderMessage(false, "此记录已不存在");
		}
	}

	/**
	 * 如果查询条件为空查询当前登录用户所在地区的执法人员；否则按查询条件进行查询。
	 */
	@Override
	public void list() throws Exception {
		// 得到前台传入的封装数据对象VO
		EnforceOfficerSearchVO condition = getSearchVO();
		// 查询
		Page officers = enforceOfficerService.findEnforceOfficers(this
				.setupPage(), condition);
		// 封装到实体VO
		List<EnforceOfficerVO> list = new ArrayList<EnforceOfficerVO>();
		for (int j = 0; j < officers.getResult().size(); j++) {
			EnforceOfficer o = (EnforceOfficer) officers.getResult().get(j);
			EnforceOfficerVO vo = new EnforceOfficerVO();
			vo.setName(o.getName());
			vo.setDuty(o.getDuty());
			vo.setFileId(o.getPhoto().getId());
			vo.setIssueAuth(o.getIssueAuth());
			vo.setIssueNo(o.getIssueNo());
			vo.setMobile(o.getMobile());
			vo.setRegionName(o.getRegion().getName());
			vo.setOrgId(o.getEnforceOrg().getId());
			vo.setOrgName(o.getEnforceOrg().getName());
			vo.setId(o.getId());
			vo.setCreateDate(o.getCreateDate());
			list.add(vo);
		}
		officers.setResult(list);
		
		if(logger.isDebugEnabled()){
			CompanyUtils.printRequestInfo();
			CompanyUtils.printResponseInfo(list);
		}
		
		// 返回给前台
		render(getJsonSerializer().serialize(new JsonStore(officers)));
	}

	// -------------- 最新代码分隔 ---------------------

	// 根据条件查找执法人员
	public void findEnforceOfficers() throws Exception {
		// 执法人员姓名
		String officerName = Struts2Utils.getParameter("enforceOfficerName");

		EnforceOfficerSearchVO vo = new EnforceOfficerSearchVO();

		vo.setName(officerName);
		// 查询
		Page<EnforceOfficer> officers = enforceOfficerService
				.findEnforceOfficers(this.setupPage(), vo);
		// 返回给前台
		this.render(officers);
	}

	/**
	 * 增加和修改机构执法人员信息，机构的所属地区为用户的所属地区。 证书如果没有就不用更新，如果有则需要用新的证书ID替换。
	 */
	@Override
	public void save() throws Exception {
		try {
			EnforceOfficerVO entity = this.getEnforceOfficerVO();
			if (entity != null) {
				EnforceOfficer officer = null;
				// insert
				if (null == entity.getId() || 0 == entity.getId()) {
					officer = new EnforceOfficer();
					EnforceOrg org = enforceOrgService
							.getEnforceOrgByName(entity.getOrgName());
					if (org != null) {
						if (enforceOfficerService.isExistsEnforceOfficer(entity
								.getName(), org.getId())) {
							renderMessage(false, "此名称已经存在！");
							return;
						}
					} else {
						renderMessage(false, "请选择执法机构！");
						return;
					}

					officer.setCreateDate(new Date());
					officer.setDuty(entity.getDuty());
					officer.setIssueAuth(entity.getIssueAuth());
					officer.setIssueNo(entity.getIssueNo());
					officer.setMobile(entity.getMobile());
					officer.setName(entity.getName());
					if (null != org) {
						officer.setEnforceOrg(org);
						officer.setRegion(org.getRegion());
					}
					if (null != entity.getFileId() && 0 != entity.getFileId()) {
						officer.setPhoto(fileBeanService
								.get(entity.getFileId()));
					}
				}// update
				else {
					officer = enforceOfficerService.get(entity.getId());

					officer.setCreateDate(new Date());
					if (null != entity.getDuty()) {
						officer.setDuty(entity.getDuty());
					}
					if (null != entity.getIssueAuth()) {
						officer.setIssueAuth(entity.getIssueAuth());
					}
					if (null != entity.getIssueNo()) {
						officer.setIssueNo(entity.getIssueNo());
					}
					if (null != entity.getMobile()) {
						officer.setMobile(entity.getMobile());
					}
					if (null != entity.getName()) {
						officer.setName(entity.getName());
					}
					if (null != entity.getOrgName()) {
						EnforceOrg org = enforceOrgService
								.getEnforceOrgByName(entity.getOrgName());
						if (null != org) {
							officer.setEnforceOrg(org);
							officer.setRegion(org.getRegion());
						}
					}
					if (null != entity.getFileId() && 0 != entity.getFileId()) {
						officer.setPhoto(fileBeanService
								.get(entity.getFileId()));
					}
				}

				enforceOfficerService.save(officer);

				entity.setId(officer.getId());

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
	 * 删除执法人员同时删除该执法人员的证书
	 */
	@Override
	public void delete() throws Exception {
		try {
			List<Long> ids = getIdArrayParam();
			System.out.println("测试： " + ids.size());
			if (ids != null && !ids.isEmpty()) {
				enforceOfficerService.delete(ids);
				renderSuccess();
			} else
				throw new RuntimeException("参数错误,指定的数据不存在!");
		} catch (Exception e) {
			this.renderMessage(false, "指定的数据不存在!");
			logger.error(e.getMessage(), e);
		}
	}

	/**
	 * 颁发证书
	 * 
	 * @throws Exception
	 */
	public void issuing() throws Exception {
		EnforceOfficerVO entity = this.getEnforceOfficerVO();
		System.out.println(entity.getId() + "测试：" + entity.getFileId());
		if (null != entity.getFileId() && null != entity.getId()) {
			EnforceOfficer officer = enforceOfficerService.get(entity.getId());
			FileBean file = fileBeanService.get(entity.getFileId());
			// officer.setFile(file);

			EnforceOfficerBadge e = new EnforceOfficerBadge();
			e.setEofficer(officer);
			e.setFile(file);
			userBadgeService.save(e);

			enforceOfficerService.save(officer);
			entity.setFileId(file.getId());
		}
		this.render(getJsonSerializer().serialize(new JsonStore(entity)));
	}

	/**
	 * 删除证书
	 * 
	 * @throws Exception
	 */
	public void deleteBadge() throws Exception {
		/**
		 * 这个方法是原来就有的，接收参数是ids
		 * 
		 */
		String data = Struts2Utils.getParameter("data"); // 接收技术人员搜索的数据

		System.out.println("接收参数=" + data);
		try {
			List<Long> ids = getIdArrayParam();
			if (ids != null && !ids.isEmpty()) {
				enforceOfficerBadgeService.delete(getIdArrayParam());
				renderSuccess();
			} else
				throw new RuntimeException("参数错误,指定的数据不存在!");
		} catch (Exception e) {
			this.renderMessage(false, e.getMessage());
			logger.error(e.getMessage(), e);
		}
	}

	/**
	 * 封装 {@link EnforceOfficer} 对象的方法
	 * 
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public EnforceOfficerVO getEnforceOfficerVO() {
		String data = Struts2Utils.getParameter(JsonStore.RootProperty);
		if (data == null)
			return null;
		JSONDeserializer deserializer = this.getJsonDeserializer();
		JSONDeserializer<IdEntity> jsonDeserializer = deserializer.use(null,
				EnforceOfficerVO.class);
		return (EnforceOfficerVO) jsonDeserializer.deserialize(data);
	}

	/**
	 * 封装搜索条件为对象
	 * 
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public EnforceOfficerSearchVO getSearchVO() {
		String data = Struts2Utils.getParameter(JsonStore.RootProperty);
		if (data == null)
			return null;
		JSONDeserializer deserializer = this.getJsonDeserializer();
		JSONDeserializer<IdEntity> jsonDeserializer = deserializer.use(null,
				EnforceOfficerSearchVO.class);
		return (EnforceOfficerSearchVO) jsonDeserializer.deserialize(data);
	}

	/**
	 * 封装执法人员证章信息
	 * 
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public EnforceOfficerBadgeVO getEnforceOfficerBadgeVO() {
		String data = Struts2Utils.getParameter(JsonStore.RootProperty);
		if (data == null)
			return null;
		JSONDeserializer deserializer = this.getJsonDeserializer();
		JSONDeserializer<IdEntity> jsonDeserializer = deserializer.use(null,
				EnforceOfficerBadgeVO.class);
		return (EnforceOfficerBadgeVO) jsonDeserializer.deserialize(data);
	}

	/**
	 * 保存直翻人员证章信息
	 */
	public void saveBadge() {
		String data = Struts2Utils.getParameter("data"); // 接收技术人员搜索的数据

		System.out.println("接收参数=" + data);

		/**
		 * 接收参数如下
		 * 
		 * {"name":"张三","tname":"se","expireDate":"06/15/2010","description":
		 * "ser","tid":"357","fileId":"1022"}
		 * 
		 * name 执法人员名称
		 * 
		 * tname 证书名称
		 * 
		 * expireDate 有效期
		 * 
		 * description 说明
		 * 
		 * tid 执法人员id
		 * 
		 * fileId 文件id
		 * 
		 */

		if (null != data && !"".equals(data)) {
			EnforceOfficerBadgeVO entity = getEnforceOfficerBadgeVO();
			String name = entity.getName(); // {"name":"s","tname":"ser","expireDate":"","description":"","tid":"516","fileId":"1726"}

			String tname = entity.getTname();

			Date expireDate = entity.getExpireDate();

			String description = entity.getDescription();

			String tid = entity.getTid();

			String fileId = entity.getFileId();

			// get the enforceOfficer object
			EnforceOfficer officer = enforceOfficerService.get(Long
					.parseLong(tid));

			for (EnforceOfficerBadge i : officer.getBadge()) {
				if (i.getName().equals(entity.getTname())) {
					renderMessage(false, "此名称的证书已经存在!");
					return;
				}
			}

			// init EnforceOfficerBadge
			EnforceOfficerBadge badge = new EnforceOfficerBadge();

			badge.setDescription(description);
			badge.setEofficer(officer);
			if (null != expireDate) {
				badge.setExpireDate(expireDate);
			}
			badge.setFile(fileBeanService.get(Long.parseLong(fileId)));
			badge.setName(tname);

			enforceOfficerBadgeService.save(badge);
			
			if(logger.isDebugEnabled()){
				CompanyUtils.printRequestInfo();
				CompanyUtils.printResponseInfo(badge);
			}

			render(new JsonStore(badge));
		}

	}

	/**
	 * 把统计参数封装成对象
	 * 
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public EnforceOfficerStatsVO getEnforceOfficerStatsVO() {
		String data = Struts2Utils.getParameter(JsonStore.RootProperty);
		if (data == null)
			return null;
		JSONDeserializer deserializer = this.getJsonDeserializer();
		JSONDeserializer<IdEntity> jsonDeserializer = deserializer.use(null,
				EnforceOfficerStatsVO.class);
		return (EnforceOfficerStatsVO) jsonDeserializer.deserialize(data);
	}

	/**
	 * 根据限制条件统计信息
	 */
	public void statistics() {
		EnforceOfficerStatsVO entity = getEnforceOfficerStatsVO();

		Map<String, Long> maps = enforceOfficerService
				.statsEnforceOfficer(entity);

		Iterator<String> itRegion = maps.keySet().iterator();
		Iterator<Long> itCount = maps.values().iterator();

		List<StatsEnforceOfficerVO> list = new ArrayList<StatsEnforceOfficerVO>();

		StatsEnforceOfficerVO vo = new StatsEnforceOfficerVO();

		if (maps.containsKey("山东省")) {
			vo.setCity("山东省");
			vo.setCount(maps.get("山东省"));

			list.add(vo);
		}

		for (int i = 0; i < maps.size(); i++) {
			String region = itRegion.next();
			Long count = itCount.next();

			vo = new StatsEnforceOfficerVO();

			if (!"山东省".equals(region)) {
				vo.setCity(region);
				vo.setCount(count);

				list.add(vo);
			}
		}
		
		if(logger.isDebugEnabled()){
			CompanyUtils.printRequestInfo();
			CompanyUtils.printResponseInfo(list);
		}

		render(new JsonStore(list));
	}

}
