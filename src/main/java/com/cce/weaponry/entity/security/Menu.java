package com.cce.weaponry.entity.security;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OrderBy;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import com.cce.modules.orm.IdEntity;

/**
 * 受保护的资源.
 * 
 * 注释见{@link User}.
 * 
 * @author cce
 */
@Entity
@Table(name = "SS_MENU")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Menu extends IdEntity {

	public static String STYLE_LEAF = "forum";
	public static String STYLE_ICON_LEAF = "icon-forum";
	public static String STYLE_PARENT = "forum-ct";
	public static String STYLE_ICON_PARENT = "forum-parent";

	private String nodeId;// 节点id
	private String text;// 节点名称
	private double treePosition;
	private String description;// 节点描述

	private Menu parent;
	private List<Menu> children;

	public Menu() {
	}

	public Menu(String nodeId, String text, Menu parent) {
		this.nodeId = nodeId;
		this.text = text;
		this.setParent(parent);
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	/**
	 * 前台展示菜单用的ID
	 * 
	 * @return
	 */
	public String getNodeId() {
		return nodeId;
	}

	public void setNodeId(String nodeId) {
		this.nodeId = nodeId;
	}

	/**
	 * 菜单的位置顺序字段.
	 */
	public double getTreePosition() {
		return treePosition;
	}

	public void setTreePosition(double position) {
		this.treePosition = position;
	}

	@Transient
	public String getStyle() {
		return this.children.isEmpty() ? Menu.STYLE_LEAF : Menu.STYLE_PARENT;
	}

	@Transient
	public String getIconStyle() {
		return this.children.isEmpty() ? Menu.STYLE_ICON_LEAF : Menu.STYLE_ICON_PARENT;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	@ManyToOne
	@JoinColumn(name = "parent")
	public Menu getParent() {
		return parent;
	}

	public void setParent(Menu parent) {
		this.parent = parent;
	}

	// cascade表示级联操作
	// CascadeType.MERGE级联更新：若items属性修改了那么order对象保存时同时修改items里的对象。对应EntityManager的merge方法
	// CascadeType.PERSIST级联刷新：获取order对象里也同时也重新获取最新的items时的对象。对应EntityManager的refresh(object)方法有效。即会重新查询数据库里的最新数据
	// CascadeType.REFRESH级联保存：对order对象保存时也对items里的对象也会保存。对应EntityManager的presist方法
	// CascadeType.REMOVE级联删除：对order对象删除也对items里的对象也会删除。对应EntityManager的remove方法
	// FetchType.LAZY表示懒加载。对于xxxtoMany时即获得多的一方fetch的默认值是FetchType.LAZY懒加载。对于xxxtoOne时即获得一的一方fetch的默认值是FetchType.EAGER立即加载
	// mappedBy表示关系统被维护端，它的值是关系维护端维护关系的属性
	@OneToMany(mappedBy = "parent", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	@OrderBy("treePosition")
	public List<Menu> getChildren() {
		return children;
	}

	public void setChildren(List<Menu> children) {
		this.children = children;
	}

	/**
	 * 是否叶节点.
	 * 
	 * @return
	 */
	@Transient
	public boolean isLeaf() {
		return this.children.isEmpty();
	}
	
	@Override
	public String toString(){
		return this.text;
	}
}
