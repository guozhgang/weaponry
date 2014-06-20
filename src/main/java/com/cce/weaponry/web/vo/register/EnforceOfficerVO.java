package com.cce.weaponry.web.vo.register;

import java.util.Date;

import com.cce.weaponry.web.vo.BaseVO;

public class EnforceOfficerVO extends BaseVO {
	private String duty;// 职务
	private String name;// 姓名
	private String issueAuth;// 执法证发证机关
	private String issueNo;// 证章编号
	private String mobile;// 手机
	private String regionName;
	private Long orgId;
	private String orgName;
	private Date createDate;// 创建日期
	private Long fileId;

	public Long getOrgId() {
		return orgId;
	}

	public void setOrgId(Long orgId) {
		this.orgId = orgId;
	}

	public String getOrgName() {
		return orgName;
	}

	public void setOrgName(String orgName) {
		this.orgName = orgName;
	}

	public String getDuty() {
		return duty;
	}

	public void setDuty(String duty) {
		this.duty = duty;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getIssueAuth() {
		return issueAuth;
	}

	public void setIssueAuth(String issueAuth) {
		this.issueAuth = issueAuth;
	}

	public String getIssueNo() {
		return issueNo;
	}

	public void setIssueNo(String issueNo) {
		this.issueNo = issueNo;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
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

	public Long getFileId() {
		return fileId;
	}

	public void setFileId(Long fileId) {
		this.fileId = fileId;
	}

}
