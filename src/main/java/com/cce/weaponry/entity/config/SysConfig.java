package com.cce.weaponry.entity.config;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.cce.modules.orm.IdEntity;

/**
 * 系统配置_system_configuration
 */
@Entity
@Table(name = "sys_config")
public class SysConfig extends IdEntity {

	private String confCode; // 键

	private String confValue; // 值

	private String confName; // 名称

	private String confDesc; // 描述

	private SysModule sysModule; // 所属系统模块

	@ManyToOne
	@JoinColumn(name = "module_id")
	public SysModule getSysModule() {
		return sysModule;
	}

	public void setSysModule(SysModule sysModule) {
		this.sysModule = sysModule;
	}

	@Column(length = 50)
	public String getConfCode() {
		return confCode;
	}

	public void setConfCode(String confCode) {
		this.confCode = confCode;
	}

	@Column(length = 250)
	public String getConfValue() {
		return confValue;
	}

	public void setConfValue(String confValue) {
		this.confValue = confValue;
	}

	@Column(length = 50)
	public String getConfName() {
		return confName;
	}

	public void setConfName(String confName) {
		this.confName = confName;
	}

	@Column(length = 250)
	public String getConfDesc() {
		return confDesc;
	}

	public void setConfDesc(String confDesc) {
		this.confDesc = confDesc;
	}

	private String moduleName;

	@Transient
	public String getModuleName() {
		return moduleName;
	}

	public void setModuleName(String moduleName) {
		this.moduleName = moduleName;
	}

	public SysConfig() {
	}

	public SysConfig(String confCode, String confValue, String confName,
			String confDesc) {
		this.confCode = confCode;
		this.confValue = confValue;
		this.confName = confName;
		this.confDesc = confDesc;
	}
}
