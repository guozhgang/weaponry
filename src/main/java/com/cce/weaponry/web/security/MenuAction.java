package com.cce.weaponry.web.security;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;

import com.cce.modules.web.json.JsonStore;
import com.cce.weaponry.entity.security.Menu;
import com.cce.weaponry.service.security.MenuCrudService;
import com.cce.weaponry.web.JsonActionSupport;

import flexjson.JSONSerializer;

public class MenuAction extends JsonActionSupport<Menu> {

	@Autowired
	MenuCrudService menuCrudService;

	@Override
	public JSONSerializer getJsonSerializer() {
		return super.getJsonSerializer().include("children");
	}

	/**
	 * 为系统菜单提供数据.
	 */
	public void tree() {
		List<Menu> menus = menuCrudService.getLoginUserMenus();
		render(this.getJsonSerializer().serialize(menus));
	}

	/**
	 * 返回一级菜单的ID和显示内容，用于新增组
	 */
	public void rootMenus() {
		List<Menu> menus = menuCrudService.getRootMenus();
		List<Map<String, Object>> list = new ArrayList<Map<String, Object>>(
				menus.size());
		Map<String, Object> map;
		for (Menu menu : menus) {
			map = new HashMap<String, Object>();
			map.put("id", menu.getId());
			map.put("text", menu.getText());
			map.put("checked", false);
			list.add(map);
		}
		this.render(new JsonStore(list));
	}
}