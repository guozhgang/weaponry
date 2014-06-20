package com.cce.weaponry.web.vo.register;

import java.util.Date;

import com.cce.weaponry.web.vo.BaseVO;

public class EnforceOrgVO extends BaseVO {
	private String name;
	private String zipCode;
	private String address;
	private String tel;
	private String leader;
	private String leaderTel;
	private String leaderMobile;
	private String master;
	private String masterTel;
	private String masterFax;
	private String regionName;
	private Date createDate;
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getZipCode() {
		return zipCode;
	}
	public void setZipCode(String zipCode) {
		this.zipCode = zipCode;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getTel() {
		return tel;
	}
	public void setTel(String tel) {
		this.tel = tel;
	}
	public String getLeader() {
		return leader;
	}
	public void setLeader(String leader) {
		this.leader = leader;
	}
	public String getLeaderTel() {
		return leaderTel;
	}
	public void setLeaderTel(String leaderTel) {
		this.leaderTel = leaderTel;
	}
	public String getLeaderMobile() {
		return leaderMobile;
	}
	public void setLeaderMobile(String leaderMobile) {
		this.leaderMobile = leaderMobile;
	}
	public String getMaster() {
		return master;
	}
	public void setMaster(String master) {
		this.master = master;
	}
	public String getMasterTel() {
		return masterTel;
	}
	public void setMasterTel(String masterTel) {
		this.masterTel = masterTel;
	}
	public String getMasterFax() {
		return masterFax;
	}
	public void setMasterFax(String masterFax) {
		this.masterFax = masterFax;
	}
	public String getRegionName() {
		return regionName;
	}
	public void setRegionName(String regionName) {
		this.regionName = regionName;
	}
	public Date getCreateDate() {
		return createDate;
	}
	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

}
