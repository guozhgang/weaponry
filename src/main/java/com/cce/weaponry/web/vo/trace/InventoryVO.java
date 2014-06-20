package com.cce.weaponry.web.vo.trace;

import java.util.Date;

import com.cce.modules.orm.IdEntity;

public class InventoryVO extends IdEntity {

	private Date checkTime;

	private String checkNo;

	private String checkPlace;

	private String govAgency;

	public Date getCheckTime() {
		return checkTime;
	}

	public void setCheckTime(Date checkTime) {
		this.checkTime = checkTime;
	}

	public String getCheckNo() {
		return checkNo;
	}

	public void setCheckNo(String checkNo) {
		this.checkNo = checkNo;
	}

	public String getCheckPlace() {
		return checkPlace;
	}

	public void setCheckPlace(String checkPlace) {
		this.checkPlace = checkPlace;
	}

	public String getGovAgency() {
		return govAgency;
	}

	public void setGovAgency(String govAgency) {
		this.govAgency = govAgency;
	}

	public InventoryVO() {
		super();
		// TODO Auto-generated constructor stub
	}

	public InventoryVO(Date checkTime, String checkNo, String checkPlace,
			String govAgency) {
		super();
		this.checkTime = checkTime;
		this.checkNo = checkNo;
		this.checkPlace = checkPlace;
		this.govAgency = govAgency;
	}
}
