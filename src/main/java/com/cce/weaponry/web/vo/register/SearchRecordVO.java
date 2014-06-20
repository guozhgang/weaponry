package com.cce.weaponry.web.vo.register;

import java.io.Serializable;
import java.util.Date;

public class SearchRecordVO implements Serializable {

	// id name taxCert orgCode createDate status updateDate

	private Long id;

	private String name;

	private String taxCert;

	private String orgCode;

	private Date createDate;

	private String status;

	private Date updateDate;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getTaxCert() {
		return taxCert;
	}

	public void setTaxCert(String taxCert) {
		this.taxCert = taxCert;
	}

	public String getOrgCode() {
		return orgCode;
	}

	public void setOrgCode(String orgCode) {
		this.orgCode = orgCode;
	}

	public Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Date getUpdateDate() {
		return updateDate;
	}

	public void setUpdateDate(Date updateDate) {
		this.updateDate = updateDate;
	}

	public SearchRecordVO() {
		super();
		// TODO Auto-generated constructor stub
	}

	public SearchRecordVO(Long id, String name, String taxCert, String orgCode,
			Date createDate, String status, Date updateDate) {
		super();
		this.id = id;
		this.name = name;
		this.taxCert = taxCert;
		this.orgCode = orgCode;
		this.createDate = createDate;
		this.status = status;
		this.updateDate = updateDate;
	}


}