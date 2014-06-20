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
 * 角色.
 * 
 * 管理员,省级用户,市级用户,区（县）级用户,企业用户
 * 
 * 
 * 注释见{@link User}.
 * 
 * @author cce
 */
@Entity
@Table(name = "SS_ROLE")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Role extends IdEntity {




	// 角色名称
	private String name;

	private List<Authority> authorityList = new ArrayList<Authority>();

	private List<Menu> menuList = new ArrayList<Menu>();

	@ManyToMany
	@JoinTable(name = "SS_ROLE_MENU", joinColumns = { @JoinColumn(name = "ROLE_ID") }, inverseJoinColumns = { @JoinColumn(name = "MENU_ID") })
	@Fetch(FetchMode.SUBSELECT)
	@OrderBy("treePosition")
	@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
	public List<Menu> getMenuList() {
		return menuList;
	}

	public void setMenuList(List<Menu> menuList) {
		this.menuList = menuList;
	}

	public Role() {

	}

	public Role(Long id, String name) {
		this.id = id;
		this.name = name;
	}

	@Column(nullable = false, unique = true)
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@ManyToMany
	@JoinTable(name = "SS_ROLE_AUTHORITY", joinColumns = { @JoinColumn(name = "ROLE_ID") }, inverseJoinColumns = { @JoinColumn(name = "AUTHORITY_ID") })
	@Fetch(FetchMode.SUBSELECT)
	@OrderBy("id")
	@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
	public List<Authority> getAuthorityList() {
		return authorityList;
	}

	public void setAuthorityList(List<Authority> authorityList) {
		this.authorityList = authorityList;
	}

	@Transient
	public String getAuthNames() {
		return ReflectionUtils.convertElementPropertyToString(authorityList,
				"displayName", ", ");
	}

	@Transient
	public String getMenuIDs() {
		return ReflectionUtils.convertElementPropertyToString(menuList, "id",
				", ");
	}

	@Transient
	public String getMenuNames() {
		return ReflectionUtils.convertElementPropertyToString(menuList, "text",
				", ");
	}

	@Transient
	@SuppressWarnings("unchecked")
	public List<Long> getAuthIds() {
		return ReflectionUtils
				.convertElementPropertyToList(authorityList, "id");
	}

	@Override
	public String toString() {
		return this.getName();
	}

}
