package com.cce.weaponry.entity.security;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OrderBy;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import com.cce.modules.orm.IdEntity;
import com.cce.modules.utils.ReflectionUtils;

/**
 * 受保护的资源.
 * 
 * 注释见{@link User}.
 * 
 * @author cce
 */
@Entity
@Table(name = "SS_RESOURCE")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Resource extends IdEntity {
	//-- resourceType常量 --//
	public static final String URL_TYPE = "url";
	public static final String MENU_TYPE = "menu";

	// 模块名称
	private String module;
	// 资源类型
	private String resourceType;
	// 值
	private String value;
	// 位置
	private Double position;

	private List<Authority> authorityList = new ArrayList<Authority>();

	/**
	 * 资源类型.
	 */
	@Column(nullable = false)
	public String getResourceType() {
		return resourceType;
	}

	public void setResourceType(String resourceType) {
		this.resourceType = resourceType;
	}

	/**
	 * 资源标识.
	 */
	@Column(nullable = false, unique = true)
	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	/**
	 * 资源在SpringSecurity中的校验顺序字段.
	 */
	public Double getPosition() {
		return position;
	}

	public void setPosition(Double position) {
		this.position = position;
	}

	/**
	 * 可访问该资源的授权集合.
	 */
	@ManyToMany
	@JoinTable(name = "SS_RESOURCE_AUTHORITY", joinColumns = { @JoinColumn(name = "RESOURCE_ID") }, inverseJoinColumns = { @JoinColumn(name = "AUTHORITY_ID") })
	@Fetch(FetchMode.JOIN)
	@OrderBy("id")
	@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
	public List<Authority> getAuthorityList() {
		return authorityList;
	}

	public void setAuthorityList(List<Authority> authorityList) {
		this.authorityList = authorityList;
	}

	/**
	 * 可访问该资源的授权名称字符串, 多个授权用','分隔.
	 */
	@Transient
	public String getAuthNames() {
		return ReflectionUtils.convertElementPropertyToString(authorityList, "name", ",");
	}

	@Transient
	public String getAuthDisplayNames() {
		return ReflectionUtils.convertElementPropertyToString(authorityList, "displayName", ",");
	}

	public String getModule() {
		return module;
	}

	public void setModule(String module) {
		this.module = module;
	}
}
