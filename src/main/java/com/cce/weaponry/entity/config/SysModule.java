package com.cce.weaponry.entity.config;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.cce.modules.orm.IdEntity;

/**
 * 需要配置的系统模块
 */
@Entity
@Table(name = "sys_module")
public class SysModule extends IdEntity {

	private String moduleName; // 模块名称

	private String moduleDesc; // 模块描述

	private List<SysConfig> sysConfigs = new ArrayList<SysConfig>();

	@OneToMany(cascade = CascadeType.REMOVE, mappedBy = "sysModule")
	public List<SysConfig> getSysConfigs() {
		return sysConfigs;
	}

	public void setSysConfigs(List<SysConfig> sysConfigs) {
		this.sysConfigs = sysConfigs;
	}

	@Column(length = 50)
	public String getModuleName() {
		return moduleName;
	}

	public void setModuleName(String moduleName) {
		this.moduleName = moduleName;
	}

	@Column(length = 250)
	public String getModuleDesc() {
		return moduleDesc;
	}

	public void setModuleDesc(String moduleDesc) {
		this.moduleDesc = moduleDesc;
	}

	public SysModule() {
	}

	public SysModule(String moduleName, String moduleDesc) {
		this.moduleName = moduleName;
		this.moduleDesc = moduleDesc;
	}

}
