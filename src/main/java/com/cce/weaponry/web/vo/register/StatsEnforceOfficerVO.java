package com.cce.weaponry.web.vo.register;

public class StatsEnforceOfficerVO {

	private Long count;

	private String city;

	public Long getCount() {
		return count;
	}

	public void setCount(Long count) {
		this.count = count;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public StatsEnforceOfficerVO() {
		super();
		// TODO Auto-generated constructor stub
	}

	public StatsEnforceOfficerVO(Long count, String city) {
		super();
		this.count = count;
		this.city = city;
	}

}
