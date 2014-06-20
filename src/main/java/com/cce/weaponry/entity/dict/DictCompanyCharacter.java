package com.cce.weaponry.entity.dict;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import com.cce.modules.orm.IdEntity;

@Entity
@Table(name = "DICT_COMPANY_CHARACTER")
public class DictCompanyCharacter extends IdEntity implements IDict {
	// { "国有", "民营", "私营", "合资" }; // 企业性质[[1,'国有'],[2,'民营'],[3,'私营'],[4,'合资']];
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
