package com.cce.weaponry.entity.level;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.cce.modules.orm.IdEntity;
import com.cce.weaponry.entity.register.FileBean;

@Entity
@Table(name = "COMPANY_LEVEL_DETAIL")
public class CompanyLevelDetail extends IdEntity {
	private Boolean isContained;// 是否符合
	private String description;// 说明
	private FileBean file;// 上传文件
	private CompanyLevelItemTemplate levelItem;// 模板
	private CompanyLevel companyLevel;// 企业等级申请信息


	@Column(length = 500)
	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	@ManyToOne
	@JoinColumn(name = "TEMPLATE_Item_ID")
	public CompanyLevelItemTemplate getLevelItem() {
		return levelItem;
	}

	public void setLevelItem(CompanyLevelItemTemplate levelItem) {
		this.levelItem = levelItem;
	}

	public Boolean getIsContained() {
		return isContained;
	}

	public void setIsContained(Boolean isContained) {
		this.isContained = isContained;
	}

	@ManyToOne
	@JoinColumn(name = "FILE_ID")
	public FileBean getFile() {
		return file;
	}

	public void setFile(FileBean file) {
		this.file = file;
	}

	// bi-directional many-to-one association to CompanyLevel
	@ManyToOne
	@JoinColumn(name = "CL_ID")
	public CompanyLevel getCompanyLevel() {
		return this.companyLevel;
	}

	public void setCompanyLevel(CompanyLevel companyLevel) {
		this.companyLevel = companyLevel;
	}
}
