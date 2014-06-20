package com.cce.weaponry.entity.level;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.cce.modules.orm.IdEntity;

@Entity
@Table(name = "APPROVE_LEVEL_DETAIL")
// @DiscriminatorValue("level")
public class ApproveLevelDetail extends IdEntity { // extends ApproveDetails {
	private Date createDate;// 审核明晰创建日期
	private String createBy;// 创建人
	private String type;// 创建类型
	private String comment;// 备注
	private Approval4Level approval;// 审核信息

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
	@JoinColumn(name = "AL_ID")
	public Approval4Level getApproval() {
		return approval;
	}

	public void setApproval(Approval4Level approval) {
		this.approval = approval;
	}

}
