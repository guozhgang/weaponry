package com.cce.weaponry.web.vo.level;

import com.cce.weaponry.web.vo.BaseVO;

public class CheckStepsVO extends BaseVO {
	private Long groupId;// 审查组ID
	private String steps; // 审查步骤ID:1,2,31,
	private String entName; // 企业名称
	private boolean status; // 审查状态

	public Long getGroupId() {
		return groupId;
	}

	public void setGroupId(Long groupId) {
		this.groupId = groupId;
	}

	public String getSteps() {
		return steps;
	}

	public void setSteps(String steps) {
		this.steps = steps;
	}

	public String getEntName() {
		return entName;
	}

	public void setEntName(String entName) {
		this.entName = entName;
	}

	public boolean isStatus() {
		return status;
	}

	public void setStatus(boolean status) {
		this.status = status;
	}



}
