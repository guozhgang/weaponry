package com.cce.weaponry.entity.level;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.cce.modules.orm.IdEntity;

@Entity
@Table(name = "COMPANY_LEVEL_TEMPLATE")
public class CompanyLevelTemplate extends IdEntity {
	private String levelNo;// 等级
	private String description;// 描述
	private List<CompanyLevelItemTemplate> items = new ArrayList<CompanyLevelItemTemplate>();// 模板集

	@OneToMany(mappedBy = "levelTemplate")
	public List<CompanyLevelItemTemplate> getItems() {
		return items;
	}

	public void setItems(List<CompanyLevelItemTemplate> items) {
		this.items = items;
	}

	@Column(name = "LevelNo", length = 50)
	public String getLevelNo() {
		return levelNo;
	}

	public void setLevelNo(String levelNo) {
		this.levelNo = levelNo;
	}

	@Column(name = "DESCRIPTION", length = 500)
	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

}
