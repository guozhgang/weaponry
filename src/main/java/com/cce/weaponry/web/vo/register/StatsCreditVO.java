package com.cce.weaponry.web.vo.register;

public class StatsCreditVO {

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

	public StatsCreditVO() {
		super();
		// TODO Auto-generated constructor stub
	}

	public StatsCreditVO(Long count, String city) {
		super();
		this.count = count;
		this.city = city;
	}

}
