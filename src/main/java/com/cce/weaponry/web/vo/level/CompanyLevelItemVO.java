package com.cce.weaponry.web.vo.level;

import com.cce.weaponry.web.vo.BaseVO;


public class CompanyLevelItemVO extends BaseVO {

	private String itemid;
	private String itemName;
	private String description;
	private Boolean isContained;
	private String remark;
	private Long detailId;

	/**
	 * @return the detailId
	 */
	public Long getDetailId() {
		return detailId;
	}

	/**
	 * @param detailId
	 *            the detailId to set
	 */
	public void setDetailId(Long detailId) {
		this.detailId = detailId;
	}

	public String getItemid() {
		return itemid;
	}

	public void setItemid(String itemid) {
		this.itemid = itemid;
	}

	public String getItemName() {
		return itemName;
	}

	public void setItemName(String itemName) {
		this.itemName = itemName;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Boolean getIsContained() {
		return isContained;
	}

	public void setIsContained(Boolean isContained) {
		this.isContained = isContained;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

}
