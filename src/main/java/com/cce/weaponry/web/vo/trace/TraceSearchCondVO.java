package com.cce.weaponry.web.vo.trace;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.cce.weaponry.web.vo.BaseVO;

public class TraceSearchCondVO extends BaseVO {
	// {"beginDate":"08/10/2010","endDate":"08/12/2010","regionId":"1","traceCode":"ser"}
	private Date beginDate;

	private Date endDate;

	private String regionId;
	private Long regionIdd;
	private Long traceType;



	/**
	 * @return the regionIdd
	 */
	public Long getRegionIdd() {
		return regionIdd;
	}

	/**
	 * @return the traceType
	 */
	public Long getTraceType() {
		return traceType;
	}

	/**
	 * @param traceType
	 *            the traceType to set
	 */
	public void setTraceType(Long traceType) {
		this.traceType = traceType;
	}

	/**
	 * @param regionIdd
	 *            the regionIdd to set
	 */
	public void setRegionIdd(Long regionIdd) {
		this.regionIdd = regionIdd;
	}

	private String traceCode;
	List<Long> regionIds = new ArrayList<Long>();

	/**
	 * @return the regionIds
	 */
	public List<Long> getRegionIds() {
		return regionIds;
	}

	/**
	 * @param regionIds
	 *            the regionIds to set
	 */
	public void setRegionIds(List<Long> regionIds) {
		this.regionIds = regionIds;
	}

	public Date getBeginDate() {
		return beginDate;
	}

	public void setBeginDate(Date beginDate) {
		this.beginDate = beginDate;
	}

	public Date getEndDate() {
		return endDate;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}

	public String getRegionId() {
		return regionId;
	}

	public void setRegionId(String regionId) {
		this.regionId = regionId;
	}

	public String getTraceCode() {
		return traceCode;
	}

	public void setTraceCode(String traceCode) {
		this.traceCode = traceCode;
	}

}
