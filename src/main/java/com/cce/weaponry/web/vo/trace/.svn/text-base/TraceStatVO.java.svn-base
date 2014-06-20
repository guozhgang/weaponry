package com.cce.weaponry.web.vo.trace;

import java.text.DecimalFormat;

import com.cce.weaponry.web.vo.BaseVO;

public class TraceStatVO extends BaseVO {
	DecimalFormat df = new DecimalFormat("0.00");
	private Double count;
	private String city;
	private Long num;
	private String safenum;
	private String destroynum;
	private Double price;
	private String dangesnum;
	/**
	 * @return the count
	 */
	public Double getCount() {
		return count;
	}

	/**
	 * @param count
	 *            the count to set
	 */
	public void setCount(Double count) {
		this.count = count;
	}

	/**
	 * @return the price
	 */
	public Double getPrice() {
		return price;
	}

	/**
	 * @param price
	 *            the price to set
	 */
	public void setPrice(Double price) {
		this.price = Double.valueOf(df.format(price));
	}


	/**
	 * @return the num
	 */
	public Long getNum() {
		return num;
	}

	/**
	 * @param num
	 *            the num to set
	 */
	public void setNum(Long num) {
		this.num = num;
	}

	/**
	 * @return the safenum
	 */
	public String getSafenum() {
		if (null != safenum)
			return safenum;
		else
			return "0";
	}

	/**
	 * @param safenum
	 *            the safenum to set
	 */
	public void setSafenum(String safenum) {
		this.safenum = safenum;
	}

	/**
	 * @return the destroynum
	 */
	public String getDestroynum() {
		if (null != destroynum)
			return destroynum;
		else
			return "0";
	}

	/**
	 * @param destroynum
	 *            the destroynum to set
	 */
	public void setDestroynum(String destroynum) {
		this.destroynum = destroynum;
	}

	/**
	 * @return the dangesnum
	 */
	public String getDangesnum() {
		if (null != dangesnum)
			return dangesnum;
		else
			return "0";
	}

	/**
	 * @param dangesnum
	 *            the dangesnum to set
	 */
	public void setDangesnum(String dangesnum) {
		this.dangesnum = dangesnum;
	}


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

}
