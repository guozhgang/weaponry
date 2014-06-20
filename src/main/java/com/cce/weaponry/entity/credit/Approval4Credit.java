package com.cce.weaponry.entity.credit;

import java.util.ArrayList;
import java.util.Date;
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

import com.cce.modules.orm.IdEntity;

@Entity
@Table(name = "APPROVE_CREDIT")
public class Approval4Credit extends IdEntity {
	// 1: 提交 2:通过 3： 退回
	private Date createDate;// 申请时间
	private Date updateDate;// 最后更新时间
	// 0:非活动；1：活动状态
	private Boolean isActive;// 是否是活动状态
	// 新建说明
	private String comComment;
	// 网上审核
	private String netstatus;// 网上审批状态
	// 网上意见
	private String netcomment;// 网上审批意见
	// 现场审核
	private String scenestatus;// 现场审批状态
	// 现场意见
	private String scenecomment;// 现场审批意见
	private CompanyCredit companyCredit; // 所属信用等级
	private List<ApproveCreditDetail> details = new ArrayList<ApproveCreditDetail>();// 审批历史

	@Column(length = 500)
	public String getComComment() {
		return comComment;
	}

	public void setComComment(String comComment) {
		this.comComment = comComment;
	}

	public void setDetails(List<ApproveCreditDetail> details) {
		this.details = details;
	}

	@OneToMany(mappedBy = "approval", cascade = CascadeType.REMOVE, fetch = FetchType.EAGER)
	public List<ApproveCreditDetail> getDetails() {
		return details;
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

	@Column(nullable = false)
	public Boolean getIsActive() {
		return isActive;
	}

	public void setIsActive(Boolean isActive) {
		this.isActive = isActive;
	}

	@Column(length = 20)
	public String getNetstatus() {
		return netstatus;
	}

	public void setNetstatus(String netstatus) {
		this.netstatus = netstatus;
	}

	@Column(length = 500)
	public String getNetcomment() {
		return netcomment;
	}

	public void setNetcomment(String netcomment) {
		this.netcomment = netcomment;
	}

	@Column(length = 20)
	public String getScenestatus() {
		return scenestatus;
	}

	public void setScenestatus(String scenestatus) {
		this.scenestatus = scenestatus;
	}

	@Column(length = 500)
	public String getScenecomment() {
		return scenecomment;
	}

	public void setScenecomment(String scenecomment) {
		this.scenecomment = scenecomment;
	}

	@ManyToOne
	@JoinColumn(name = "CC_ID")
	public CompanyCredit getCompanyCredit() {
		return companyCredit;
	}

	public void setCompanyCredit(CompanyCredit companyCredit) {
		this.companyCredit = companyCredit;
	}

	@Transient
	public String getStatus() {
		if (null == netstatus && null == scenestatus)
			return "创建";
		else if ("PASSED".equals(netstatus) && "PASSED".equals(scenestatus))
			return "审批通过";
		else if ("REJECTED".equals(netstatus) || "REJECTED".equals(scenestatus))
			return "退回";
		else if ("WAITING".equals(netstatus) && "WAITING".equals(scenestatus))
			return "等待审批";
		else
			return "审批中";
	}

	@Override
	public String toString() {
		return "com.cce.weaponry.entity.credit.Approval4Credit id = "
				+ id;
	}

}
