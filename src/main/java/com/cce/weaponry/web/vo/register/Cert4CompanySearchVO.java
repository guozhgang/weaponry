package com.cce.weaponry.web.vo.register;

import java.util.Date;

import com.cce.weaponry.web.vo.BaseVO;

public class Cert4CompanySearchVO extends BaseVO {
	// {"beginDate":"05/30/2010","endDate":"07/01/2010","regionId":"2","entName":"1","fixedButchNo":"r","registerNo":"","status":1}
	private String entName;
	private Date beginDate;
	private Date endDate;
	private String regionId;
	private String registerNo;// 企业备案登记号
	private String fixedButchNo;// 定点屠宰证号
	private Integer status;// 状态

	public String getRegisterNo() {
		return registerNo;
	}

	public void setRegisterNo(String registerNo) {
		this.registerNo = registerNo;
	}

	public String getFixedButchNo() {
		return fixedButchNo;
	}

	public void setFixedButchNo(String fixedButchNo) {
		this.fixedButchNo = fixedButchNo;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public String getEntName() {
		return entName;
	}

	public void setEntName(String entName) {
		this.entName = entName;
	}

	public Date getBeginDate() {
		return beginDate;
	}

	public void setBeginDate(Date beginDate) {
		this.beginDate = beginDate;
	}

	public Date getEndDate() {
		return endDate;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}

	public String getRegionId() {
		return regionId;
	}

	public void setRegionId(String regionId) {
		this.regionId = regionId;
	}
}
