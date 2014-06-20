package com.cce.weaponry.web.vo.trace;

import java.math.BigDecimal;
import java.util.Date;

import com.cce.modules.orm.IdEntity;

public class TraceInfoVO extends IdEntity {

	private String traceCode;

	private String productName;

	private BigDecimal weight;

	private BigDecimal unitPrice;

	private String butCompany;

	private Date intoTime;

	private Date butTime;

	private Date outTime;

	private Date saleTime;

	public String getTraceCode() {
		return traceCode;
	}

	public void setTraceCode(String traceCode) {
		this.traceCode = traceCode;
	}

	public String getProductName() {
		return productName;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}

	public BigDecimal getWeight() {
		return weight;
	}

	public void setWeight(BigDecimal weight) {
		this.weight = weight;
	}

	public BigDecimal getUnitPrice() {
		return unitPrice;
	}

	public void setUnitPrice(BigDecimal unitPrice) {
		this.unitPrice = unitPrice;
	}

	public String getButCompany() {
		return butCompany;
	}

	public void setButCompany(String butCompany) {
		this.butCompany = butCompany;
	}

	public Date getIntoTime() {
		return intoTime;
	}

	public void setIntoTime(Date intoTime) {
		this.intoTime = intoTime;
	}

	public Date getButTime() {
		return butTime;
	}

	public void setButTime(Date butTime) {
		this.butTime = butTime;
	}

	public Date getOutTime() {
		return outTime;
	}

	public void setOutTime(Date outTime) {
		this.outTime = outTime;
	}

	public Date getSaleTime() {
		return saleTime;
	}

	public void setSaleTime(Date saleTime) {
		this.saleTime = saleTime;
	}

	public TraceInfoVO() {
	}

	public TraceInfoVO(String traceCode, String productName, BigDecimal weight,
			BigDecimal unitPrice, String butCompany, Date intoTime,
			Date butTime, Date outTime, Date saleTime) {
		this.traceCode = traceCode;
		this.productName = productName;
		this.weight = weight;
		this.unitPrice = unitPrice;
		this.butCompany = butCompany;
		this.intoTime = intoTime;
		this.butTime = butTime;
		this.outTime = outTime;
		this.saleTime = saleTime;
	}


}
