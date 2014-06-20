package com.cce.weaponry.entity.register;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import com.cce.modules.orm.IdEntity;

/**
 * 权限.
 * 
 * 注释见{@link User}.
 * 
 * @author cce
 */
@Entity
@Table(name = "REGION")
@Cache(usage = CacheConcurrencyStrategy.READ_ONLY)
public class Region extends IdEntity {
	private String code;// 代码

	private String name;// 名称

	private Region parent;
	private List<Region> children = new ArrayList<Region>();

	public Region() {
	}

	@ManyToOne
	@JoinColumn(name = "REGION_ID")
	public Region getParent() {
		return parent;
	}

	public void setParent(Region parent) {
		this.parent = parent;
	}

	@Column(nullable = false, unique = true, length = 10)
	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public Region(Long id, String code, String name) {
		this.id = id;
		this.code = code;
		this.name = name;
	}

	@Column(nullable = false, length = 50)
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@OneToMany(mappedBy = "parent", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JoinColumn(name = "REGION_ID")
	public List<Region> getChildren() {
		return children;
	}

	public void setChildren(List<Region> children) {
		this.children = children;
	}

	@Transient
	public String getFullName() {
		StringBuilder sb = new StringBuilder();
		sb.append(this.getName());
		if (this.getParent() != null) {
			sb.insert(0, this.getParent().getName() + "/");
			if (this.getParent().getParent() != null) {
				sb.insert(0, this.getParent().getParent().getName() + "/");
			}
		}

		return sb.toString();
	}

	// /////////////////////////////////////////////////////////////////////////
	// implements JsonTreeSupport
	// /////////////////////////////////////////////////////////////////////////

	@Transient
	public String getNodeId() {
		return this.getId().toString();
	}

	@Transient
	public String getText() {
		return this.getName();
	}

	@Transient
	public boolean isLeaf() {
		return this.children.isEmpty();
	}

	@Override
	public String toString() {
		StringBuilder str = new StringBuilder();
		return str.append("id:").append(this.getId()).append(" code:").append(
				this.getCode()).toString();
	}

}
