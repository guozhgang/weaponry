package com.cce.weaponry.web.security;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.apache.struts2.convention.annotation.Namespace;
import org.springframework.beans.factory.annotation.Autowired;

import com.cce.modules.orm.IdEntity;
import com.cce.modules.orm.Page;
import com.cce.modules.security.springsecurity.SpringSecurityUtils;
import com.cce.modules.service.CrudServiceInterface;
import com.cce.modules.web.json.JsonStore;
import com.cce.modules.web.struts2.Struts2Utils;
import com.cce.weaponry.entity.register.Region;
import com.cce.weaponry.entity.security.Role;
import com.cce.weaponry.entity.security.User;
import com.cce.weaponry.service.common.CompanyUtils;
import com.cce.weaponry.service.common.RegionManagementService;
import com.cce.weaponry.service.security.RoleCrudService;
import com.cce.weaponry.service.security.UserCrudService;
import com.cce.weaponry.web.JsonCrudActionSupport;
import com.cce.weaponry.web.util.WebDataUtil;
import com.cce.weaponry.web.vo.TopButtonBuilderVO;
import com.cce.weaponry.web.vo.register.UserSearchVO;

import flexjson.JSONDeserializer;
import flexjson.JSONSerializer;

/**
 * 用户管理Action.
 * 
 * TODO: 把批量删除用户的功能在Service层实现,放在一个Transaction里面.
 * Struts负责解析HttpRequest参数,传入表示ID的Long数组...
 * 
 * @author cce
 */
// 定义URL映射对应/security/user.action
@Namespace("/security")
public class UserAction extends JsonCrudActionSupport<User> {

	@Autowired
	private UserCrudService userManager;
	@Autowired
	private RoleCrudService roleManager;
	@Autowired
	private RegionManagementService regionManager;

	public void saveRegionUser() {
		// TODO 根据当前登录用户所在地区，增加企业用户。
		try {
			User entity = this.getRequestBean();

			if (entity != null) {
				User loginUser = userManager.getLoginUser();
				entity.setRegion(loginUser.getRegion());
				entity.setRole(roleManager.getRoleByName("企业用户"));
				getCrudService().save(entity);

				if (logger.isDebugEnabled()) {
					CompanyUtils.printRequestInfo();
					CompanyUtils.printResponseInfo(entity);
				}

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
	 * 删除企业用户
	 * 
	 * @throws Exception
	 */
	public void deleteRegionUsers() throws Exception {
		try {
			List<Long> ids = getIdArrayParam();
			boolean isComUser = userManager.isCompanyUser(ids);
			if (ids != null && !ids.isEmpty()) {
				if (isComUser) {
					getCrudService().delete(ids);
					renderSuccess();
				} else {
					renderMessage(false, "您无权删除非企业用户");
				}
			} else
				throw new RuntimeException("参数错误,指定的数据不存在!");
		} catch (Exception e) {
			this.renderMessage(false, e.getMessage());
			logger.error(e.getMessage(), e);
		}
	}

	/**
	 * 在生成json数据时,把User的两个属性"region"和"role"输出为其id值...
	 */
	@Override
	public JSONSerializer getJsonSerializer() {
		return super.getJsonSerializer().transform(
				this.getEntityIdTransformer(), "region", "role");
	}

	/**
	 * 在从json数据生成java bean时, 根据"region"和"role"的id,在数据库中查找记录,然后用其更新User对象.
	 */
	@Override
	public JSONDeserializer<User> getJsonDeserializer() {
		return super.getJsonDeserializer().use(null, User.class).use(
				this.getEntityFactory(), "region", "role");
	}

	/**
	 * 显示用户编辑画面时, 为画面返回 1.用户信息 2.角色列表 3.区域列表
	 */
	@Override
	protected void prepareInput(JsonStore jsonStore) {
		// 添加角色列表
		List<Role> roles = roleManager.getAll();
		String jsonRoles = super.getJsonSerializer().serialize(roles);
		jsonStore.put("roleList", jsonRoles);

		// 添加区域树列表
		List<Region> regions = regionManager.findAllProvince();
		String jsonRegions = super.getJsonSerializer().exclude("*.parent")
				.serialize(regions);
		jsonStore.put("regionList", jsonRegions);
	}

	/**
	 * 支持使用Jquery.validate Ajax检验用户名是否重复.
	 */
	public void checkLoginName() {
		String newLoginName = Struts2Utils.getParameter("loginName");
		String oldLoginName = Struts2Utils.getParameter("oldLoginName");

		if (userManager.isLoginNameUnique(newLoginName, oldLoginName)) {
			this.render("true");
		} else {
			this.render("false");
		}
	}

	public void checkEmail() {
		String newLoginName = Struts2Utils.getParameter("email");

		StringBuffer sb = new StringBuffer();

		this.render("true");
	}

	/**
	 * 检查地区是否选择合理
	 */
	public void checkRegion() {
		Long regionId = Long.parseLong(Struts2Utils.getParameter("regionId"));
		Long roleId = Long.parseLong(Struts2Utils.getParameter("roleId"));
		Role role = roleManager.get(roleId);
		int regionFlag = CompanyUtils.ifRegion(regionManager.get(regionId)
				.getCode());
		boolean isRight = true;
		if ("管理员".equals(role.getName()) || "省级用户".equals(role.getName())) {
			if (regionFlag != 3) {
				isRight = false;
			}
		} else if ("市级用户".equals(role.getName())) {
			if (regionFlag != 2) {
				isRight = false;
			}
		} else if ("县级用户".equals(role.getName())
				|| "企业用户".equals(role.getName())) {
			if (regionFlag != 1) {
				isRight = false;
			}
		}
		if (isRight) {
			renderSuccess();
		} else {
			StringBuilder ret = new StringBuilder();
			ret.append(role.getName()).append("必须选择").append(
					(("企业用户".equals(role.getName()) || "县级用户".equals(role
							.getName())) ? "县"
							: ("市级用户".equals(role.getName()) ? "市" : "省")))
					.append("级地区");
			renderMessage(false, ret.toString());
		}
	}

	@Override
	public CrudServiceInterface<User> getCrudService() {
		return this.userManager;
	}

	public void getCurrentUser() {
		this.render(new JsonStore(SpringSecurityUtils.getCurrentUser()));
	}

	public void buildTopButtons() {
		String role = userManager.getLoginUser().getRole().getName();
		List<TopButtonBuilderVO> vos = getTopButtonBuilderVOS();
		List<TopButtonBuilderVO> ret = new ArrayList<TopButtonBuilderVO>();
		for (Iterator vo = vos.iterator(); vo.hasNext();) {
			TopButtonBuilderVO btnVO = (TopButtonBuilderVO) vo.next();
			if (btnVO.getAccessor().indexOf(role) > -1) {
				ret.add(btnVO);
			}
		}
		this.render(ret);
	}

	@SuppressWarnings("unchecked")
	private List<TopButtonBuilderVO> getTopButtonBuilderVOS() {
		String data = Struts2Utils.getParameter(JsonStore.RootProperty);
		List list = WebDataUtil.splitJsonArray(data);
		List<TopButtonBuilderVO> levelList = new ArrayList<TopButtonBuilderVO>();
		JSONDeserializer deserializer = this.getJsonDeserializer();
		JSONDeserializer<IdEntity> jsonDeserializer = deserializer.use(null,
				TopButtonBuilderVO.class);
		for (Iterator iterator = list.iterator(); iterator.hasNext();) {
			String str = (String) iterator.next();
			levelList.add((TopButtonBuilderVO) jsonDeserializer
					.deserialize(str));
		}
		return levelList;
	}

	/**
	 * 封装查找方法所需数据
	 */
	@SuppressWarnings("unchecked")
	public UserSearchVO getSearchVO() {
		String data = Struts2Utils.getParameter(JsonStore.RootProperty);
		if (data == null)
			return null;
		JSONDeserializer deserializer = this.getJsonDeserializer();
		JSONDeserializer<IdEntity> jsonDeserializer = deserializer.use(null,
				UserSearchVO.class);
		return (UserSearchVO) jsonDeserializer.deserialize(data);
	}

	public void listRegionUsers() {
		// TODO 根据当前登录用户所在地区，返回该地区的企业信息。
		// {"loginName":"se","roleId":5,"name":"se"}
		UserSearchVO vo = getSearchVO();

		if (null == vo) {
			vo = new UserSearchVO();
		}

		vo.setRoleId(roleManager.getRoleByName("企业用户").getId());

		Page<User> page = userManager
				.findUsersByCondition(this.setupPage(), vo);
		List<User> list = new ArrayList<User>();

		for (User i : page.getResult()) {
			i.setCompany(null);
			list.add(i);
		}

		page.setResult(list);

		if (logger.isDebugEnabled()) {
			CompanyUtils.printRequestInfo();
			CompanyUtils.printResponseInfo(list);
		}

		this.render(page);
	}

	/**
	 * 查询用户方法
	 * 要求数据格式：data={"roleId":2,"regionId":1,"loginName":"puser","name":"puser"}
	 */
	@Override
	public void list() throws Exception {
		UserSearchVO vo = getSearchVO();

		Page<User> page = userManager
				.findUsersByCondition(this.setupPage(), vo);

		List<User> list = new ArrayList<User>();

		for (User i : page.getResult()) {
			i.setCompany(null);
			list.add(i);
		}

		page.setResult(list);
		this.render(page);
	}

	// public void isCompany() {
	//
	// /**
	// * 根据当前登陆用户判断是否是企业用户 如果是的话，返回true,不是返回false
	// */
	// Long loginUserId = userManager.getLoginUser().getId();
	// List<Long> ids = new ArrayList<Long>();
	// ids.add(loginUserId);
	// boolean isComUser = userManager.isAllComUser(ids);
	// this.render(isComUser);
	//
	// }

}
