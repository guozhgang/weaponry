package com.cce.weaponry.web.vo.register;

import java.util.Date;

import com.cce.weaponry.web.vo.BaseVO;

public class EnforceOfficerBadgeVO extends BaseVO {
	// {"name":"张三","tname":"se","expireDate":"06/15/2010","description":"ser","tid":"357","fileId":"1022"}
	private String name;

	private String tname;

	private Date expireDate;

	private String description;

	private String tid;
	
	private String fileId;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getTname() {
		return tname;
	}

	public void setTname(String tname) {
		this.tname = tname;
	}

	public Date getExpireDate() {
		return expireDate;
	}

	public void setExpireDate(Date expireDate) {
		this.expireDate = expireDate;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getTid() {
		return tid;
	}

	public void setTid(String tid) {
		this.tid = tid;
	}

	public String getFileId() {
		return fileId;
	}

	public void setFileId(String fileId) {
		this.fileId = fileId;
	}

	public EnforceOfficerBadgeVO() {
		super();
		// TODO Auto-generated constructor stub
	}

	public EnforceOfficerBadgeVO(String name, String tname, Date expireDate,
			String description, String tid, String fileId) {
		super();
		this.name = name;
		this.tname = tname;
		this.expireDate = expireDate;
		this.description = description;
		this.tid = tid;
		this.fileId = fileId;
	}

}
