package com.cce.weaponry.web.security;

import com.cce.modules.web.struts2.Struts2Utils;
import com.opensymphony.xwork2.ActionSupport;

public class GroupAction extends ActionSupport {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public String list() {

		String groupString = "{totalProperty:10,root:" + "["
				+ "{role_id:'1',role_name:'系统管理员',authority:'添加,删除,修改'},"
				+ "{role_id:'2',role_name:'企业用户',authority:'添加,删除,修改'},"
				+ "{role_id:'3',role_name:'浏览角色',authority:'添加,删除,修改'}," + "]"
				+ "}";

		Struts2Utils.renderJson(groupString);

		return NONE;
	}

}
