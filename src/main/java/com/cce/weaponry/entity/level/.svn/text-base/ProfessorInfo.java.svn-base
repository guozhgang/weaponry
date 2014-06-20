package com.cce.weaponry.entity.level;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.cce.modules.orm.IdEntity;
import com.cce.weaponry.entity.register.EnforceOrg;
import com.cce.weaponry.entity.register.FileBean;
import com.cce.weaponry.entity.register.Region;

/**
 * The persistent class for the professor_info database table.
 * 
 */
@Entity
@Table(name="professor_info")
public class ProfessorInfo extends IdEntity {
	private static final long serialVersionUID = 1L;

	private String address;// 地址
	private String certificate;// 证书
	private Date createDate;// 创建日期
	private String duty;// 职务
	private String mail;// 邮箱
	private String mobile;// 手机
	private String name;// 姓名
	private String zipcode;// 邮遍
	private String type;// 专家/委员
	private Region region;// 区域(市)
	private EnforceOrg enforceOrg;// 执法人

	private FileBean fileInfo;// 文件

    public ProfessorInfo() {
    }

	@Column(length = 20)
	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	@Column(length = 500)
	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	@Column(length = 100)
	public String getCertificate() {
		return certificate;
	}

	public void setCertificate(String certificate) {
		this.certificate = certificate;
	}

	public Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

	@Column(length = 50)
	public String getDuty() {
		return duty;
	}

	public void setDuty(String duty) {
		this.duty = duty;
	}

	@Column(length = 50)
	public String getMail() {
		return mail;
	}

	public void setMail(String mail) {
		this.mail = mail;
	}

	@Column(length = 11)
	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	@Column(length = 20)
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Column(length = 50)
	public String getZipcode() {
		return zipcode;
	}

	public void setZipcode(String zipcode) {
		this.zipcode = zipcode;
	}

	//bi-directional many-to-one association to FileInfo
    @ManyToOne
	@JoinColumn(name="FI_ID")
	public FileBean getFileInfo() {
		return this.fileInfo;
	}

	public void setFileInfo(FileBean fileInfo) {
		this.fileInfo = fileInfo;
	}

	@ManyToOne
	@JoinColumn(name = "REGION_ID")
	public Region getRegion() {
		return region;
	}

	public void setRegion(Region region) {
		this.region = region;
	}

	// bi-directional many-to-one association to EnforceOrg
	@ManyToOne
	@JoinColumn(name = "ORG_ID")
	public EnforceOrg getEnforceOrg() {
		return this.enforceOrg;
	}

	public void setEnforceOrg(EnforceOrg enforceOrg) {
		this.enforceOrg = enforceOrg;
	}
}