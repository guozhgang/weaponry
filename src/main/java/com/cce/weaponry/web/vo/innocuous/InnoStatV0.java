package com.cce.weaponry.web.vo.innocuous;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.cce.weaponry.web.vo.BaseVO;

public class InnoStatV0 extends BaseVO {
	private Date beginDate;
	private Date endDate;
	private Long count;
	private String ent;
	private String city;

	/**
	 * @return the city
	 */
	public String getCity() {
		return city;
	}

	/**
	 * @param city
	 *            the city to set
	 */
	public void setCity(String city) {
		this.city = city;
	}

	List<Long> region = new ArrayList<Long>();

	/**
	 * @return the region
	 */
	public List<Long> getRegion() {
		return region;
	}

	/**
	 * @param region
	 *            the region to set
	 */
	public void setRegion(List<Long> region) {
		this.region = region;
	}

	/**
	 * @return the count
	 */
	public Long getCount() {
		return count;
	}

	/**
	 * @param count
	 *            the count to set
	 */
	public void setCount(Long count) {
		this.count = count;
	}

	/**
	 * @return the beginDate
	 */
	public Date getBeginDate() {
		return beginDate;
	}

	/**
	 * @param beginDate
	 *            the beginDate to set
	 */
	public void setBeginDate(Date beginDate) {
		this.beginDate = beginDate;
	}

	/**
	 * @return the endDate
	 */
	public Date getEndDate() {
		return endDate;
	}

	/**
	 * @param endDate
	 *            the endDate to set
	 */
	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}

	/**
	 * @return the ent
	 */
	public String getEnt() {
		return ent;
	}

	/**
	 * @param ent
	 *            the ent to set
	 */
	public void setEnt(String ent) {
		this.ent = ent;
	}

}
