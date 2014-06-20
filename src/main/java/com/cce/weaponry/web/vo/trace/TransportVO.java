package com.cce.weaponry.web.vo.trace;

import java.util.Date;

import com.cce.modules.orm.IdEntity;

public class TransportVO extends IdEntity {

	private String companyName;

	private String orgCode;

	private Date stock;

	private Date shipment;

	public String getCompanyName() {
		return companyName;
	}

	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}

	public String getOrgCode() {
		return orgCode;
	}

	public void setOrgCode(String orgCode) {
		this.orgCode = orgCode;
	}

	public Date getStock() {
		return stock;
	}

	public void setStock(Date stock) {
		this.stock = stock;
	}

	public Date getShipment() {
		return shipment;
	}

	public void setShipment(Date shipment) {
		this.shipment = shipment;
	}

	public TransportVO() {
		super();
		// TODO Auto-generated constructor stub
	}

	public TransportVO(String companyName, String orgCode, Date stock,
			Date shipment) {
		super();
		this.companyName = companyName;
		this.orgCode = orgCode;
		this.stock = stock;
		this.shipment = shipment;
	}

}
