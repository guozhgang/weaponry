package com.cce.weaponry.entity.dict;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import com.cce.modules.orm.IdEntity;

/*
 BOX("BOX","BOX"),
 BATCH("BATCH","BATCH");
 */
@Entity
@Table(name = "DICT_TRACE_QTY_UNIT")
public class DictTraceQtyUnit extends IdEntity implements IDict {
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
