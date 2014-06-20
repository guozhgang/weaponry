package com.cce.weaponry.entity.transfer;

import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.cce.modules.orm.IdEntity;
import com.cce.weaponry.entity.register.Company;

/**
 * The persistent class for the management_info database table.
 * 
 */
@Entity
@Table(name="management_info")
public class ManagementInfo extends IdEntity {
	private static final long serialVersionUID = 1L;

	private Date date;
	private Long exPrice;
	private int num;
	private BigDecimal purchasePrice;
	private Company company;

    public ManagementInfo() {
    }

	@Column(name = "MI_Date")
	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	@Column(name = "MI_Ex_Price")
	public Long getExPrice() {
		return exPrice;
	}

	public void setExPrice(Long exPrice) {
		this.exPrice = exPrice;
	}

	@Column(name = "MI_Num")
	public int getNum() {
		return num;
	}

	public void setNum(int num) {
		this.num = num;
	}

	@Column(name = "MI_Purchase_Price")
	public BigDecimal getPurchasePrice() {
		return purchasePrice;
	}

	public void setPurchasePrice(BigDecimal purchasePrice) {
		this.purchasePrice = purchasePrice;
	}

	//bi-directional many-to-one association to CompanyInfo
    @ManyToOne
	@JoinColumn(name = "C_ID")
	public Company getCompany() {
		return this.company;
	}

	public void setCompany(Company company) {
		this.company = company;
	}
	
}