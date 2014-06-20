package com.cce.weaponry.entity.register;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.cce.modules.orm.IdEntity;

/**
 * The persistent class for the enforce_org database table.
 * 
 */
@Entity
@Table(name="enforce_org")
public class EnforceOrg extends IdEntity {
	private static final long serialVersionUID = 1L;
	private String address;// 单位地址
	private String authority;// 权限
	private String authTel;// 电话
	private String leader;// 分管领导
	private String leaderMobile;// 领导手机
	private String leaderTel;// 领导电话
	private String name;// 名称
	private String tel;// 电话
	private String zipcode;// 邮政编码
	private String master; // 主管科室
	private String masterTel;
	private String masterFax;
	private Region region;// 地区
	private OrganizationInfo organizationInfo;
	private List<EnforceOfficer> enforceOfficers = new ArrayList<EnforceOfficer>();

    public EnforceOrg() {
    }

	@ManyToOne
	@JoinColumn(name = "REGION_ID")
	public Region getRegion() {
		return region;
	}

	public void setRegion(Region region) {
		this.region = region;
	}

	@Column(length = 50)
	public String getMaster() {
		return master;
	}

	public void setMaster(String master) {
		this.master = master;
	}

	@Column(length = 12)
	public String getMasterTel() {
		return masterTel;
	}

	public void setMasterTel(String masterTel) {
		this.masterTel = masterTel;
	}

	@Column(length = 50)
	public String getMasterFax() {
		return masterFax;
	}

	public void setMasterFax(String masterFax) {
		this.masterFax = masterFax;
	}

	@Column(length = 50)
	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	@Column(length = 50)
	public String getAuthority() {
		return authority;
	}

	public void setAuthority(String authority) {
		this.authority = authority;
	}

	@Column(length = 15)
	public String getAuthTel() {
		return authTel;
	}

	public void setAuthTel(String authTel) {
		this.authTel = authTel;
	}

	@Column(length = 50)
	public String getLeader() {
		return leader;
	}

	public void setLeader(String leader) {
		this.leader = leader;
	}

	@Column(length = 15)
	public String getLeaderMobile() {
		return leaderMobile;
	}

	public void setLeaderMobile(String leaderMobile) {
		this.leaderMobile = leaderMobile;
	}

	@Column(length = 15)
	public String getLeaderTel() {
		return leaderTel;
	}

	public void setLeaderTel(String leaderTel) {
		this.leaderTel = leaderTel;
	}

	@Column(length = 50)
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Column(length = 15)
	public String getTel() {
		return tel;
	}

	public void setTel(String tel) {
		this.tel = tel;
	}

	@Column(length = 15)
	public String getZipcode() {
		return zipcode;
	}

	public void setZipcode(String zipcode) {
		this.zipcode = zipcode;
	}

	//bi-directional many-to-one association to EnforceOfficer
	@OneToMany(mappedBy = "enforceOrg", cascade = CascadeType.REMOVE)
	public List<EnforceOfficer> getEnforceOfficers() {
		return this.enforceOfficers;
	}

	public void setEnforceOfficers(List<EnforceOfficer> enforceOfficers) {
		this.enforceOfficers = enforceOfficers;
	}

	@ManyToOne
	@JoinColumn(name = "OI_ID")
	public OrganizationInfo getOrganizationInfo() {
		return this.organizationInfo;
	}

	public void setOrganizationInfo(OrganizationInfo organizationInfo) {
		this.organizationInfo = organizationInfo;
	}
}