package com.cce.weaponry.entity.register;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.cce.modules.orm.IdEntity;

@Entity
@Table(name = "APPROVE_REGISTER_DETAIL")
public class ApproveRegisterDetail extends IdEntity { // extends ApproveDetails
	// 处理时间、处理人、状态、备注
	private Date createDate;// 处理时间
	private String createBy;// 处理人
	private String type;// 状态
	private String comment;// 备注
	private String role;// 1：企业 2： 县级 3： 市级
	private Approval4Register approval;

	@Column(name = "ROLE", length = 50)
	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

	@Column(length = 50)
	public String getCreateBy() {
		return createBy;
	}

	public void setCreateBy(String createBy) {
		this.createBy = createBy;
	}

	@Column(name = "TYPE", length = 50)
	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	@Column(name = "COMMENTS", length = 500)
	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	@ManyToOne
	@JoinColumn(name = "RA_ID")
	public Approval4Register getApproval() {
		return approval;
	}

	public void setApproval(Approval4Register approval) {
		this.approval = approval;
	}
}
