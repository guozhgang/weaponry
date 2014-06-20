package com.cce.weaponry.entity.dict;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import com.cce.modules.orm.IdEntity;

@Entity
@Table(name = "DICT_CHECK_STEP")
public class DictCheckStep extends IdEntity implements IDict {
	// 基本资质、环境和建设、设施和设备、屠宰加工、屠宰检验、卫生控制、运输条件、产品质量
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
