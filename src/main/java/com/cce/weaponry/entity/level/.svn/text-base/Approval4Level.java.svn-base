package com.cce.weaponry.entity.level;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.cce.modules.orm.IdEntity;

@Entity
@Table(name = "APPROVE_LEVEL")
public class Approval4Level extends IdEntity {
	private Date createDate;// 审核创建日期
	private Date updateDate; // 审核结束日期
	// 0:非活动；1：活动状态
	private Boolean isActive;// 是否是活动状态
	// 网上审核
	private String netstatus;// 网上审批状态
	// 网上意见
	private String netcomment;// 网上审批意见
	// 现场审核
	private String scenestatus;// 现场审批状态
	// 现场意见
	private String scenecomment;// 现场审批意见
	private CompanyLevel companyLevel;// 企业等级申请信息
	private CheckTeam team;
	private List<ApproveLevelDetail> details = new ArrayList<ApproveLevelDetail>();// 审批历史记录
	private List<CheckSteps> checkSteps = new ArrayList<CheckSteps>();

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
	@JoinColumn(name = "team")
	public CheckTeam getTeam() {
		return team;
	}

	public void setTeam(CheckTeam team) {
		this.team = team;
	}

	@ManyToOne
	@JoinColumn(name = "LEVEL_ID")
	public CompanyLevel getCompanyLevel() {
		return companyLevel;
	}

	public void setCompanyLevel(CompanyLevel companyLevel) {
		this.companyLevel = companyLevel;
	}

	@OneToMany(mappedBy = "approval")
	public List<CheckSteps> getCheckSteps() {
		return checkSteps;
	}

	public void setCheckSteps(List<CheckSteps> checkSteps) {
		this.checkSteps = checkSteps;
	}

	@OneToMany(mappedBy = "approval")
	public List<ApproveLevelDetail> getDetails() {
		return details;
	}

	public void setDetails(List<ApproveLevelDetail> details) {
		this.details = details;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		return "com.cce.weaponry.entity.level.Approval4Level id=" + id;
	}

}
