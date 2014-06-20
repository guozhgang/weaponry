package com.cce.weaponry.web.security;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.apache.struts2.convention.annotation.Namespace;
import org.springframework.beans.factory.annotation.Autowired;

import com.cce.modules.service.CrudServiceInterface;
import com.cce.modules.web.json.JsonStore;
import com.cce.weaponry.entity.security.Menu;
import com.cce.weaponry.entity.security.Role;
import com.cce.weaponry.service.security.RoleCrudService;
import com.cce.weaponry.web.JsonCrudActionSupport;

import flexjson.JSONDeserializer;
import flexjson.JSONSerializer;

/**
 * 角色管理Action.
 * 
 * 演示不分页的简单管理界面.
 * 
 * TODO: 仿照UserAction进行改造
 * 
 * @author cce
 */
@Namespace("/security")
public class RoleAction extends JsonCrudActionSupport<Role> {
	@Autowired
	private RoleCrudService roleCrudService;

	@Override
	public JSONSerializer getJsonSerializer() {
		// TODO Auto-generated method stub
		return super.getJsonSerializer().transform(getArrayObjectTransformer(),
				"menuList");
	}

	/**
	 * 请开发人员在List方法中，增加一个返回字段 其字段名称是:menuids 内容是用户组所选择权限的id id以,号分隔
	 * 与menuNames一样就可以
	 */
	@Override
	public void save() throws Exception {
		Role role = this.getRequestBean();
		List<Menu> menus = role.getMenuList();
		List<Menu> newMenus = new ArrayList<Menu>();
		Map<Long, Menu> mapMenu = new HashMap<Long, Menu>();
		for (Menu i : menus) {
			mapMenu.put(i.getId(), i);
		}
		for (Iterator<Menu> it = mapMenu.values().iterator(); it.hasNext();) {
			newMenus.add(it.next());
		}
		role.setMenuList(newMenus);

		try {
			if (role != null) {
				roleCrudService.save(role);
				this.render(getJsonSerializer().serialize(new JsonStore(role)));
			} else
				throw new RuntimeException("参数错误,指定的数据不存在!");
		} catch (Exception e) {
			this.renderMessage(false, e.getMessage());
			logger.error(e.getMessage(), e);
		}
	}

	@Override
	public JSONDeserializer<Role> getJsonDeserializer() {
		return super.getJsonDeserializer().use(null, Role.class).use(
				getIdArrayObjectFactory(), "menuList");
	}

	/**
	 * 获取分组
	 * 
	 * @return
	 * @throws Exception
	 */
	public void listBox() throws Exception {
		List<Role> roles = roleCrudService.getAll();
		// JSONObject json;
		// for (Role role : roles) {
		// json = new JSONObject();
		// json.element("roleid", role.getId()).element("rolename",
		// role.getName());
		// model.addRow(json);
		// }
		// boolean checked = Struts2Utils.getParameter("checked") == null ?
		// false
		// : true;
		List<Map<String, Object>> list = new ArrayList<Map<String, Object>>(
				roles.size());
		Map<String, Object> map;
		for (Role role : roles) {
			map = new HashMap<String, Object>();
			map.put("roleid", role.getId());
			map.put("rolename", role.getName());
			// if (checked) {
			// map.put("checked", true);
			// }
			list.add(map);
		}
		this.render(new JsonStore(list));
	}

	@Override
	public CrudServiceInterface<Role> getCrudService() {
		return roleCrudService;
	}

	/**
	 * 删除角色
	 */
	@Override
	public void delete() throws Exception {
		List<Long> ids = getIdArrayParam();
		Long count = roleCrudService.sumUsersByRoleIds(ids);
		if (count <= 0) {
			roleCrudService.delete(ids);
			renderSuccess();
		} else {
			renderMessage(false, "用户组还存在用户，删除失败");
		}
	}


}