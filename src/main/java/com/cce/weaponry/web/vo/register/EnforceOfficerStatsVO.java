package com.cce.weaponry.web.vo.register;

import java.util.Date;

import com.cce.weaponry.web.vo.BaseVO;

public class EnforceOfficerStatsVO extends BaseVO {

	// {"beginDate":"05/30/2010","endDate":"06/15/2010","regionId":"2"}

	private Date beginDate;

	private Date endDate;

	private String regionId;

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

	public EnforceOfficerStatsVO() {
		super();
		// TODO Auto-generated constructor stub
	}

	public EnforceOfficerStatsVO(Date beginDate, Date endDate, String regionId) {
		super();
		this.beginDate = beginDate;
		this.endDate = endDate;
		this.regionId = regionId;
	}

}
