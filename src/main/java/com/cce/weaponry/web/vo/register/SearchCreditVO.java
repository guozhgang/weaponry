package com.cce.weaponry.web.vo.register;

import java.io.Serializable;
import java.util.Date;

/**
 * 信用查询所需VO
 */
public class SearchCreditVO implements Serializable {

	// id entName entCredit fileId remark entNo createDate updateDate status
	
	private Long id;
	
	private String entName;
	
	private String entCredit;
	
	private Long fileId;

	private String remark;

	private String entNo;

	private Date createDate;

	private Date updateDate;

	private String status;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getEntName() {
		return entName;
	}

	public void setEntName(String entName) {
		this.entName = entName;
	}

	public String getEntCredit() {
		return entCredit;
	}

	public void setEntCredit(String entCredit) {
		this.entCredit = entCredit;
	}

	public Long getFileId() {
		return fileId;
	}

	public void setFileId(Long fileId) {
		this.fileId = fileId;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public String getEntNo() {
		return entNo;
	}

	public void setEntNo(String entNo) {
		this.entNo = entNo;
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

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public SearchCreditVO() {
		super();
		// TODO Auto-generated constructor stub
	}

	public SearchCreditVO(Long id, String entName, String entCredit, Long fileId,
			String remark, String entNo, Date createDate, Date updateDate,
			String status) {
		super();
		this.id = id;
		this.entName = entName;
		this.entCredit = entCredit;
		this.fileId = fileId;
		this.remark = remark;
		this.entNo = entNo;
		this.createDate = createDate;
		this.updateDate = updateDate;
		this.status = status;
	}

}
