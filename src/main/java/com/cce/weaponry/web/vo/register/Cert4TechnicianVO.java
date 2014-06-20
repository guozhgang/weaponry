package com.cce.weaponry.web.vo.register;

import com.cce.weaponry.web.vo.BaseVO;

public class Cert4TechnicianVO extends BaseVO {
	private String entName;
	private Long fileId;
	private String regionName;
	private String name;

	public String getEntName() {
		return entName;
	}

	public void setEntName(String entName) {
		this.entName = entName;
	}

	public Long getFileId() {
		return fileId;
	}

	public void setFileId(Long fileId) {
		this.fileId = fileId;
	}

	public String getRegionName() {
		return regionName;
	}

	public void setRegionName(String regionName) {
		this.regionName = regionName;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

}
