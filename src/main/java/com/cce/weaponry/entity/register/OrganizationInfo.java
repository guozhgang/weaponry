package com.cce.weaponry.entity.register;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.cce.modules.orm.IdEntity;

/**
 * The persistent class for the organization_info database table.
 * 
 */
@Entity
@Table(name="organization_info")
public class OrganizationInfo extends IdEntity {
	private static final long serialVersionUID = 1L;

	private String area;// 地区
	private String name;// 名称
	private Region region;// 地区
	private List<Company> company = new ArrayList<Company>();
	private OrganizationInfo parent;

	// private List<PolicyInfo> policyInfos;
	public OrganizationInfo() {
    }

	//bi-directional many-to-one association to CompanyInfo
	@OneToMany(mappedBy="organizationInfo")
	public List<Company> getCompany() {
		return this.company;
	}

	@Column(name = "OI_Area", length = 50)
	public String getArea() {
		return area;
	}

	public void setArea(String area) {
		this.area = area;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public void setCompany(List<Company> company) {
		this.company = company;
	}

	@ManyToOne
	@JoinColumn(name = "REGION_ID")
	public Region getRegion() {
		return region;
	}

	public void setRegion(Region region) {
		this.region = region;
	}
	
	@ManyToOne
	@JoinColumn(name = "PARENT_ID")
	public OrganizationInfo getParent() {
		return parent;
	}

	public void setParent(OrganizationInfo parent) {
		this.parent = parent;
	}
}