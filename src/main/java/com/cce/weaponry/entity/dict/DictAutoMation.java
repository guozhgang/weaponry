package com.cce.weaponry.entity.dict;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import com.cce.modules.orm.IdEntity;

@Entity
@Table(name = "DICT_AUTO_MATION")
public class DictAutoMation extends IdEntity implements IDict {
	// { "自动化屠宰", "半自动化屠宰", "手工屠宰" };// 机械化程度
	private String code;// 代码
	private String value;// 值

	@Column(nullable = false, unique = true, length = 10)
	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	@Column(length = 50)
	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

}
