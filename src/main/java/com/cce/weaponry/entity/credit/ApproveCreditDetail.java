package com.cce.weaponry.entity.credit;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.cce.modules.orm.IdEntity;

@Entity
@Table(name = "APPROVE_CREDIT_DETAIL")
// @DiscriminatorValue("credit")
public class ApproveCreditDetail extends IdEntity { // extends ApproveDetails {
	private Date createDate;// 创建日期
	private String createBy;// 创建人
	private String type;// 审批是否通过
	private String comment;// 审批意见
	private Approval4Credit approval; // 所属的申请项

	public Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

	@Column(length = 20)
	public String getCreateBy() {
		return createBy;
	}

	public void setCreateBy(String createBy) {
		this.createBy = createBy;
	}

	@Column(length = 20)
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
	@JoinColumn(name = "AC_ID")
	public Approval4Credit getApproval() {
		return approval;
	}

	public void setApproval(Approval4Credit approval) {
		this.approval = approval;
	}

	@Override
	public String toString() {
		return "com.cce.weaponry.entity.credit.ApproveCreditDetail id=" + id;
	}

}
