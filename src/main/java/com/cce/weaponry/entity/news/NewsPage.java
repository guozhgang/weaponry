package com.cce.weaponry.entity.news;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.Lob;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.cce.modules.orm.IdEntity;
import com.cce.modules.utils.ReflectionUtils;
import com.cce.weaponry.entity.security.Role;
import com.cce.weaponry.service.common.CompanyUtils;
import com.cce.weaponry.web.util.WebDataUtil;

@Entity
@Table(name = "NEWS_PAGE")
public class NewsPage extends IdEntity {
	private String title;// 标题
	private String content;// 内容
	private NewsCategory category;// 分类
	private Date createTime;// 创建日期
	private Date updateTime;// 更新日期

	public NewsPage(Long id, String title) {
		this.id = id;
		this.title = title;
	}

	public List<Role> roleList = new ArrayList<Role>();

	@ManyToMany
	@JoinTable(name = "SS_ROLE_PAGE", joinColumns = { @JoinColumn(name = "PAGE_ID") }, inverseJoinColumns = { @JoinColumn(name = "ROLE_ID") })
	public List<Role> getRoleList() {
		return roleList;
	}

	public void setRoleList(List<Role> roleList) {
		this.roleList = roleList;
	}

	@Transient
	public String getRoleIDs() {
		if (null != roleList)
			return ReflectionUtils.convertElementPropertyToString(roleList,
					"id", ", ");
		return null;
	}

	@Transient
	public String getRoleNames() {
		if (null != roleList)
			return ReflectionUtils.convertElementPropertyToString(roleList, "name",
			", ");
		return null;
	}

	public NewsPage() {
		super();
	}

	// page.id,page.title,page.category,page.createTime,page.updateTime,page.roleList
	public NewsPage(Long id, String title, NewsCategory category,
			Date createTime, Date updateTime) {
		super();
		this.id = id;
		this.title = title;
		this.category = category;
		this.createTime = createTime;
		this.updateTime = updateTime;
	}

	@Column(length = 100)
	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	@ManyToOne
	@JoinColumn(name = "CATEGORY_ID")
	public NewsCategory getCategory() {
		return category;
	}

	public void setCategory(NewsCategory category) {
		this.category = category;
	}

	@Lob
	@Basic(fetch = FetchType.LAZY)
	@Column(length = 6000000, nullable = false)
	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	@Column(name = "create_time", columnDefinition = "DATE")
	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	@Column(name = "update_time", columnDefinition = "DATE")
	public Date getUpdateTime() {
		return updateTime;
	}

	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
	}

	@Transient
	public String getCategoryName() {
		return category.getShorthand();
	}

	@Transient
	public String getContentBrief() throws Exception {
		if (content == null)
			return "";
		// return null;
		content = CompanyUtils.delHTMLTag(content);
		return WebDataUtil.removeHTMLTag(content,// WebDataUtil.clob2String(content),
				200);
	}

	@Override
	public String toString() {
		return this.title;
	}

}
