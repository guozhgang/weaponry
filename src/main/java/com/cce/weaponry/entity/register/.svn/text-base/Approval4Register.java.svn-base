package com.cce.weaponry.entity.register;

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
import javax.persistence.Transient;

import org.hibernate.annotations.Cascade;

import com.cce.modules.orm.IdEntity;

@Entity
@Table(name = "APPROVE_REGISTER")
public class Approval4Register extends IdEntity {
	// 1: 提交，2:通过，3:退回
	private List<ApproveRegisterDetail> details = new ArrayList<ApproveRegisterDetail>();// 审批历史
	private CompanyInfo companyInfo;// 公司信息
	private Date createDate;
	// 0:非活动；1：活动状态
	private Boolean isActive;
	// 县级纸质状态
	private String cpstatus;
	// 纸质意见
	private String cpcomment;
	// 县级网上状态
	private String cnstatus;
	// 县级网上意见
	private String cncomment;
	// 市级状态
	private String cstatus;
	// 市级意见
	private String ccomment;


	public Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

	@Column(nullable = false)
	public Boolean getIsActive() {
		return isActive;
	}

	public void setIsActive(Boolean isActive) {
		this.isActive = isActive;
	}

	@Column(length = 50)
	public String getCpstatus() {
		return cpstatus;
	}

	public void setCpstatus(String cpstatus) {
		this.cpstatus = cpstatus;
	}

	@Column(length = 500)
	public String getCpcomment() {
		return cpcomment;
	}

	public void setCpcomment(String cpcomment) {
		this.cpcomment = cpcomment;
	}

	@Column(length = 50)
	public String getCnstatus() {
		return cnstatus;
	}

	public void setCnstatus(String cnstatus) {
		this.cnstatus = cnstatus;
	}

	@Column(length = 500)
	public String getCncomment() {
		return cncomment;
	}

	public void setCncomment(String cncomment) {
		this.cncomment = cncomment;
	}

	@Column(length = 50)
	public String getCstatus() {
		return cstatus;
	}

	public void setCstatus(String cstatus) {
		this.cstatus = cstatus;
	}

	@Column(length = 500)
	public String getCcomment() {
		return ccomment;
	}

	public void setCcomment(String ccomment) {
		this.ccomment = ccomment;
	}

	@OneToMany(mappedBy = "approval", cascade = CascadeType.ALL)
	@Cascade(org.hibernate.annotations.CascadeType.REMOVE)
	public List<ApproveRegisterDetail> getDetails() {
		return details;
	}

	public void setDetails(List<ApproveRegisterDetail> details) {
		this.details = details;
	}

	// bi-directional many-to-one association to CompanyInfo
	@ManyToOne
	@JoinColumn(name = "CI_ID")
	public CompanyInfo getCompanyInfo() {
		return this.companyInfo;
	}

	public void setCompanyInfo(CompanyInfo companyInfo) {
		this.companyInfo = companyInfo;
	}

	private String region;

	@Transient
	public String getRegion() {
		return region;
	}

	public void setRegion(String region) {
		this.region = region;
	}


}
