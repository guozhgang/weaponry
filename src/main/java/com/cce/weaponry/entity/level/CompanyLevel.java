package com.cce.weaponry.entity.level;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.cce.modules.orm.IdEntity;
import com.cce.weaponry.entity.register.Company;
import com.cce.weaponry.entity.register.FileBean;

/**
 * The persistent class for the company_level database table.
 * 
 */
@Entity
@Table(name = "COMPANY_LEVEL")
public class CompanyLevel extends IdEntity {
	private static final long serialVersionUID = 1L;
	private Date createDate;// 企业申请等级日期
	private Date updateDate;// 最后修改日期
	private String createBy;// 创建人
	private String status; // -1:未提交、0：提交(待审批)、1： 退回/未通过、2：通过、3:现场审批中、4：网上审批中
	private String recNo;// 企业分级
	private Company company;// 企业信息
	private FileBean file;// 审查资料
	// private List<FileManage> fileInfos;
	private CompanyLevelTemplate levelTemplate;// 等级模板
	private List<CompanyLevelDetail> detail = new ArrayList<CompanyLevelDetail>();// 企业申请等级明晰信息

	@ManyToOne
	@JoinColumn(name = "FILE_ID")
	public FileBean getFile() {
		return file;
	}

	public void setFile(FileBean file) {
		this.file = file;
	}

	private List<Approval4Level> approval = new ArrayList<Approval4Level>();// 审批信息

	public CompanyLevel() {
    }

	@Column(length = 50)
	public String getCreateBy() {
		return createBy;
	}
	public void setCreateBy(String createBy) {
		this.createBy = createBy;
	}

	@Column(length = 20)
	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

	public Date getUpdateDate() {
		return updateDate;
	}

	public void setUpdateDate(Date updateDate) {
		this.updateDate = updateDate;
	}

	@Column(length = 50)
	public String getRecNo() {
		return recNo;
	}

	public void setRecNo(String recNo) {
		this.recNo = recNo;
	}

	//bi-directional many-to-one association to CompanyInfo
	@ManyToOne()
	@JoinColumn(name = "C_ID")
	public Company getCompany() {
		return this.company;
	}

	public void setCompany(Company company) {
		this.company = company;
	}
	
	@OneToMany(mappedBy = "companyLevel")
	public List<Approval4Level> getApproval() {
		return approval;
	}

	public void setApproval(List<Approval4Level> approval) {
		this.approval = approval;
	}

	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "LEVEL_NO")
	public CompanyLevelTemplate getLevelTemplate() {
		return levelTemplate;
	}

	public void setLevelTemplate(CompanyLevelTemplate levelTemplate) {
		this.levelTemplate = levelTemplate;
	}

	@OneToMany(mappedBy = "companyLevel")
	public List<CompanyLevelDetail> getDetail() {
		return detail;
	}

	public void setDetail(List<CompanyLevelDetail> detail) {
		this.detail = detail;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.cce.modules.orm.IdEntity#toString()
	 */
	@Override
	public String toString() {
		return "com.cce.weaponry.entity.level.CompanyLevel id = " + id;
	}

}