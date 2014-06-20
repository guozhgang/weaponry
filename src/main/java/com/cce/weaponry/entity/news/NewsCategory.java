package com.cce.weaponry.entity.news;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.cce.modules.orm.IdEntity;

@Entity
@Table(name = "NEWS_CATEGORY")
public class NewsCategory extends IdEntity {
	private String shorthand;// 标题
	private String value;// 内容
	private Date createTime;// 创建日期
	private Date updateTime;// 更新日期
	private Set<NewsPage> pages = new HashSet<NewsPage>();

	public NewsCategory() {
	}

	public NewsCategory(Long id, String shorthand) {
		this.id = id;
		this.shorthand = shorthand;
	}

	@Column(length = 100)
	public String getShorthand() {
		return shorthand;
	}

	public void setShorthand(String shorthand) {
		this.shorthand = shorthand;
	}

	@Column(length = 500)
	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
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

	@OneToMany(mappedBy = "category", cascade = CascadeType.REMOVE)
	public Set<NewsPage> getPages() {
		return pages;
	}

	public void setPages(Set<NewsPage> pages) {
		this.pages = pages;
	}
}
