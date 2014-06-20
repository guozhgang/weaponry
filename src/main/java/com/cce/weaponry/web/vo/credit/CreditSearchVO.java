package com.cce.weaponry.web.vo.credit;

import java.util.Date;

import com.cce.weaponry.web.vo.BaseVO;

public class CreditSearchVO extends BaseVO {

	// {"beginDate":"2010-05-30","endDate":"2010-06-11","regionId":"27","entName":"ser","entCredit":"A"}

	private Date beginDate;

	private Date endDate;

	private String regionId;

	private String entName;

	private String entCredit;

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

	public CreditSearchVO() {
		super();
		// TODO Auto-generated constructor stub
	}

	public CreditSearchVO(Date beginDate, Date endDate, String regionId,
			String entName, String entCredit) {
		super();
		this.beginDate = beginDate;
		this.endDate = endDate;
		this.regionId = regionId;
		this.entName = entName;
		this.entCredit = entCredit;
	}

}
