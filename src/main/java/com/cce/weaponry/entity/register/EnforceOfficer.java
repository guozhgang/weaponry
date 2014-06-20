package com.cce.weaponry.entity.register;

import java.util.Date;
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
 * The persistent class for the enforce_officer database table.
 * 
 */
@Entity
@Table(name="enforce_officer")
public class EnforceOfficer extends IdEntity {
	private static final long serialVersionUID = 1L;
	private String duty;// 职务
	private String name;// 姓名
	private String idnumber;// 身份证号
	private String issueAuth;// 执法证发证机关
	private String issueNo;// 证章编号
	private String mobile;// 手机
	private EnforceOrg enforceOrg;// 单位信息
	private Region region;// 地区
	private Date createDate;// 创建日期
	private FileBean photo; // 照片
	private List<EnforceOfficerBadge> badge;// 证章路径

	@ManyToOne
	@JoinColumn(name = "photo")
	public FileBean getPhoto() {
		return photo;
	}

	public void setPhoto(FileBean photo) {
		this.photo = photo;
	}

	@OneToMany(mappedBy = "eofficer", cascade = CascadeType.REMOVE)
	public List<EnforceOfficerBadge> getBadge() {
		return badge;
	}

	public void setBadge(List<EnforceOfficerBadge> badge) {
		this.badge = badge;
	}

	@Column(length = 18)
	public String getIdnumber() {
		return idnumber;
	}

	public void setIdnumber(String idnumber) {
		this.idnumber = idnumber;
	}

	public Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

	public EnforceOfficer() {
    }

	@Column(length = 50)
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Column(length = 50)
	public String getDuty() {
		return duty;
	}

	public void setDuty(String duty) {
		this.duty = duty;
	}

	@Column(length = 100)
	public String getIssueAuth() {
		return issueAuth;
	}

	public void setIssueAuth(String issueAuth) {
		this.issueAuth = issueAuth;
	}

	@Column(length = 100)
	public String getIssueNo() {
		return issueNo;
	}

	public void setIssueNo(String issueNo) {
		this.issueNo = issueNo;
	}

	@Column(length = 15)
	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	//bi-directional many-to-one association to EnforceOrg
    @ManyToOne
	@JoinColumn(name = "ORG_ID")
	public EnforceOrg getEnforceOrg() {
		return this.enforceOrg;
	}

	public void setEnforceOrg(EnforceOrg enforceOrg) {
		this.enforceOrg = enforceOrg;
	}

	@ManyToOne
	@JoinColumn(name = "REGION_ID")
	public Region getRegion() {
		return region;
	}

	public void setRegion(Region region) {
		this.region = region;
	}
}