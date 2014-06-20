package com.cce.weaponry.web.vo.level;

import java.util.Date;

import com.cce.weaponry.web.vo.BaseVO;

public class ProfessorTeamVO extends BaseVO {
	private String name; // 专家组名
	private Date createDate;// 专家组创建日期
	private String createBy;// 创建人
	private String members;
	private Long count;
	private String regionName;

	public String getMembers() {
		return members;
	}

	public void setMembers(String members) {
		this.members = members;
	}

	public Long getCount() {
		return count;
	}

	public void setCount(Long count) {
		this.count = count;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

	public String getCreateBy() {
		return createBy;
	}

	public void setCreateBy(String createBy) {
		this.createBy = createBy;
	}

	public String getRegionName() {
		return regionName;
	}

	public void setRegionName(String regionName) {
		this.regionName = regionName;
	}

}
