package com.cce.weaponry.entity.level;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import com.cce.modules.orm.IdEntity;

@Entity
@Table(name = "COMPANY_LEVEL_ITEM_TEMPLATE")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class CompanyLevelItemTemplate extends IdEntity {
	private String itemid;// 组编号
	private String itemName;// 组名称
	private String description;// 描述
	private String position;// 位置

	private CompanyLevelTemplate levelTemplate;// 模板

	@Column(nullable = false, length = 50)
	public String getItemName() {
		return itemName;
	}

	public void setItemName(String itemName) {
		this.itemName = itemName;
	}

	@Column(length = 50)
	public String getPosition() {
		return position;
	}

	public void setPosition(String position) {
		this.position = position;
	}

	@Column(nullable = false, length = 50)
	public String getItemid() {
		return itemid;
	}

	public void setItemid(String itemid) {
		this.itemid = itemid;
	}

	@Column(length = 1000)
	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	@ManyToOne
	@JoinColumn(name = "LEVEL_NO")
	public CompanyLevelTemplate getLevelTemplate() {
		return levelTemplate;
	}

	public void setLevelTemplate(CompanyLevelTemplate levelTemplate) {
		this.levelTemplate = levelTemplate;
	}

	@Transient
	public Boolean getIsContained() {
		return true;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		return "com.cce.weaponry.entity.level.CompanyLevelItemTemplate id="
				+ id;
	}

}
