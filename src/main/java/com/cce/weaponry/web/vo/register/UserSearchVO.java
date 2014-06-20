package com.cce.weaponry.web.vo.register;

import com.cce.weaponry.web.vo.BaseVO;

public class UserSearchVO extends BaseVO {

	// 需要实现按角色、地区和用户登录名、用户姓名过滤用户的过滤器。

	private Long roleId;
	
	private Long regionId;
	
	private String loginName;

	private String name;

	public Long getRoleId() {
		return roleId;
	}

	public void setRoleId(Long roleId) {
		this.roleId = roleId;
	}

	public Long getRegionId() {
		return regionId;
	}

	public void setRegionId(Long regionId) {
		this.regionId = regionId;
	}

	public String getLoginName() {
		return loginName;
	}

	public void setLoginName(String loginName) {
		this.loginName = loginName;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public UserSearchVO() {
		super();
		// TODO Auto-generated constructor stub
	}

	public UserSearchVO(Long roleId, Long regionId, String loginName,
			String name) {
		super();
		this.roleId = roleId;
		this.regionId = regionId;
		this.loginName = loginName;
		this.name = name;
	}

}
