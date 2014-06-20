package com.cce.weaponry.web.vo;

public class StatusVO extends BaseVO {

	private Long id;

	private String code;

	private String name;

	@Override
	public Long getId() {
		return id;
	}

	@Override
	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public StatusVO(Long id, String code, String name) {
		super();
		this.id = id;
		this.code = code;
		this.name = name;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public StatusVO() {
		super();
		// TODO Auto-generated constructor stub
	}

	public StatusVO(Long id, String name) {
		super();
		this.id = id;
		this.name = name;
	}

}
