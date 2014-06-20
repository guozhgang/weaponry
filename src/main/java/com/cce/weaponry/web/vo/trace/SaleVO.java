package com.cce.weaponry.web.vo.trace;

import java.math.BigDecimal;

import com.cce.modules.orm.IdEntity;

public class SaleVO extends IdEntity {

	private String traceCode;

	private String productName;

	private BigDecimal weight;

	private BigDecimal unitPrice;

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

	public SaleVO() {
		super();
		// TODO Auto-generated constructor stub
	}

	public SaleVO(String traceCode, String productName, BigDecimal weight,
			BigDecimal unitPrice) {
		super();
		this.traceCode = traceCode;
		this.productName = productName;
		this.weight = weight;
		this.unitPrice = unitPrice;
	}
}
