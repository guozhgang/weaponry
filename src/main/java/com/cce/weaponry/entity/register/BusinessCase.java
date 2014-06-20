package com.cce.weaponry.entity.register;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.cce.modules.orm.IdEntity;

@Entity
@Table(name = "business_case")
public class BusinessCase extends IdEntity {

	// 实际屠宰量
	private double butcherQuantity;

	// 营业收入
	private double taking;

	// 实现利税
	private double profitTax;

	// 资产总额
	private double totalAssets;

	// 负债总额
	private double totalliabilities;

	// 职工人数
	private int employeeNumbers;

	// 创建日期
	private Date createDate;

	// 修改日期
	private Date updateDate;

	// 所属企业
	private Company company;

	private String companyName;

	/*
	 * getters & setters
	 */

	@Transient
	public String getCompanyName() {
		return companyName;
	}

	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}

	public double getButcherQuantity() {
		return butcherQuantity;
	}

	public void setButcherQuantity(double butcherQuantity) {
		this.butcherQuantity = butcherQuantity;
	}

	public double getTaking() {
		return taking;
	}

	public void setTaking(double taking) {
		this.taking = taking;
	}

	public double getProfitTax() {
		return profitTax;
	}

	public void setProfitTax(double profitTax) {
		this.profitTax = profitTax;
	}

	public double getTotalAssets() {
		return totalAssets;
	}

	public void setTotalAssets(double totalAssets) {
		this.totalAssets = totalAssets;
	}

	public double getTotalliabilities() {
		return totalliabilities;
	}

	public void setTotalliabilities(double totalliabilities) {
		this.totalliabilities = totalliabilities;
	}

	public int getEmployeeNumbers() {
		return employeeNumbers;
	}

	public void setEmployeeNumbers(int employeeNumbers) {
		this.employeeNumbers = employeeNumbers;
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

	@ManyToOne
	public Company getCompany() {
		return company;
	}

	public void setCompany(Company company) {
		this.company = company;
	}

	/*
	 * constructors
	 */

	public BusinessCase() {
	}

	public BusinessCase(double butcherQuantity, double taking,
			double profitTax, double totalAssets, double totalliabilities,
			int employeeNumbers, Date createDate, Date updateDate,
			Company company) {
		this.butcherQuantity = butcherQuantity;
		this.taking = taking;
		this.profitTax = profitTax;
		this.totalAssets = totalAssets;
		this.totalliabilities = totalliabilities;
		this.employeeNumbers = employeeNumbers;
		this.createDate = createDate;
		this.updateDate = updateDate;
		this.company = company;
	}

}
