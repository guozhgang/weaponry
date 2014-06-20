package com.cce.weaponry.entity.dict;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import com.cce.modules.orm.IdEntity;

/*
 NORMAL("NORMAL","NORMAL"),
 PROBLEM("PROBLEM","PROBLEM"),
 WARNING("WARNING","WARNING");
 */
@Entity
@Table(name = "DICT_TRACE_HEALTH_STATUS")
public class DictTraceHealthStatus extends IdEntity implements IDict {
	private String code;// KEY
	private String value;// VALUE

	@Column(nullable = false, unique = true, length = 10)
	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	@Column(length = 20)
	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

}
