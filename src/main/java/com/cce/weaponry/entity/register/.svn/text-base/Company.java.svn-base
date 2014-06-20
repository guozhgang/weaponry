package com.cce.weaponry.entity.register;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.cce.modules.orm.IdEntity;
import com.cce.weaponry.entity.credit.CompanyCredit;
import com.cce.weaponry.entity.level.CompanyLevel;
import com.cce.weaponry.entity.transfer.ManagementInfo;

@Entity
@Table(name = "company")
public class Company extends IdEntity {
	private String name;
	private Company parent;
	private Region region;// 地区
	private Boolean active;
	private OrganizationInfo organizationInfo;
	private List<CompanyInfo> companyInfo = new ArrayList<CompanyInfo>();
	private List<CompanyCredit> companyCredits = new ArrayList<CompanyCredit>();// 公司等级
	private List<CompanyLevel> companyLevels = new ArrayList<CompanyLevel>();// 公司等级
	// private List<CompanyInnocuousButch> innoButch = new
	// ArrayList<CompanyInnocuousButch>();//
	// private List<CompanyInnocuousDisease> innoDisease = new
	// ArrayList<CompanyInnocuousDisease>();
	// private List<CompanyInnocuousProduct> innoProduct = new
	// ArrayList<CompanyInnocuousProduct>();
	private List<ManagementInfo> managementInfos = new ArrayList<ManagementInfo>();
	private List<TechnicianInfo> technicianInfos = new ArrayList<TechnicianInfo>();// 技术人员信息
	private List<BusinessCase> businessCases = new ArrayList<BusinessCase>();

	@OneToMany(cascade = CascadeType.ALL, mappedBy = "company")
	public List<BusinessCase> getBusinessCases() {
		return businessCases;
	}

	public void setBusinessCases(List<BusinessCase> businessCases) {
		this.businessCases = businessCases;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Boolean getActive() {
		if (active == null)
			return true;
		return active;
	}

	public void setActive(Boolean active) {
		this.active = active;
	}

	@Transient
	public CompanyInfo getLastAppCompanyInfo() {
		// TODO 返回最后一次审批通过企业信息。
		List<CompanyInfo> coms = new ArrayList<CompanyInfo>();
		Date date = null;
		CompanyInfo ret = null;
		for (CompanyInfo i : getCompanyInfo()) {
			if ("PASSED".equals(i.getStatus())) {
				if (null == date) {
					date = i.getUpdateDate();
					ret = i;
				} else {
					if (date.before(i.getUpdateDate())) {
						date = i.getUpdateDate();
						ret = i;
					}
				}
			}
		}
		return ret;
	}

	@ManyToOne
	@JoinColumn(name = "PARENT_ID")
	public Company getParent() {
		return parent;
	}

	public void setParent(Company parent) {
		this.parent = parent;
	}

	@OneToMany(mappedBy = "company")
	public List<CompanyInfo> getCompanyInfo() {
		return companyInfo;
	}

	public void setCompanyInfo(List<CompanyInfo> companyInfo) {
		this.companyInfo = companyInfo;
	}

	// bi-directional many-to-one association to CompanyCredit
	@OneToMany(mappedBy = "company")
	public List<CompanyCredit> getCompanyCredits() {
		return this.companyCredits;
	}

	public void setCompanyCredits(List<CompanyCredit> companyCredits) {
		this.companyCredits = companyCredits;
	}

	@ManyToOne()
	@JoinColumn(name = "REGION_ID")
	public Region getRegion() {
		return region;
	}

	public void setRegion(Region region) {
		this.region = region;
	}

	// bi-directional many-to-one association to OrganizationInfo
	@ManyToOne
	@JoinColumn(name = "OI_ID")
	public OrganizationInfo getOrganizationInfo() {
		return this.organizationInfo;
	}

	public void setOrganizationInfo(OrganizationInfo organizationInfo) {
		this.organizationInfo = organizationInfo;
	}

	// bi-directional many-to-one association to CompanyLevel
	@OneToMany(mappedBy = "company")
	public List<CompanyLevel> getCompanyLevels() {
		return this.companyLevels;
	}

	public void setCompanyLevels(List<CompanyLevel> companyLevels) {
		this.companyLevels = companyLevels;
	}

	// @OneToMany(mappedBy = "company")
	// public List<CompanyInnocuousButch> getInnoButch() {
	// return innoButch;
	// }
	//
	// public void setInnoButch(List<CompanyInnocuousButch> innoButch) {
	// this.innoButch = innoButch;
	// }
	//
	// @OneToMany(mappedBy = "company")
	// public List<CompanyInnocuousDisease> getInnoDisease() {
	// return innoDisease;
	// }
	//
	// public void setInnoDisease(List<CompanyInnocuousDisease> innoDisease) {
	// this.innoDisease = innoDisease;
	// }
	//
	// @OneToMany(mappedBy = "company")
	// public List<CompanyInnocuousProduct> getInnoProduct() {
	// return innoProduct;
	// }
	//
	// public void setInnoProduct(List<CompanyInnocuousProduct> innoProduct) {
	// this.innoProduct = innoProduct;
	// }



	// bi-directional many-to-one association to ManagementInfo
	@OneToMany(mappedBy = "company")
	public List<ManagementInfo> getManagementInfos() {
		return this.managementInfos;
	}

	public void setManagementInfos(List<ManagementInfo> managementInfos) {
		this.managementInfos = managementInfos;
	}

	// bi-directional many-to-one association to TechnicianInfo
	@OneToMany(mappedBy = "company")
	public List<TechnicianInfo> getTechnicianInfos() {
		return this.technicianInfos;
	}

	public void setTechnicianInfos(List<TechnicianInfo> technicianInfos) {
		this.technicianInfos = technicianInfos;
	}

	@Transient
	public String getRegionFullName() {
		if (null == region)
			return null;
		else
			return region.getFullName();
	}

	@Override
	public String toString() {
		return "com.cce.weaponry.entity.register.Company id = "
				+ id;
	}

}
