package com.cce.weaponry.entity.dict;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import com.cce.modules.orm.IdEntity;

@Entity
@Table(name = "DICT_TECH_TYPE")
public class DictTechType extends IdEntity implements IDict {
	// { "肉品品质检验人员", "无害化处理人员", "屠宰生产技术人员" };// 技术人员类别
	private String code;// 代码
	private String value;// 值

	@Column(nullable = false, unique = true, length = 20)
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
