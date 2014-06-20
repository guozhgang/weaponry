package com.cce.weaponry.entity.dict;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import com.cce.modules.orm.IdEntity;

@Entity
@Table(name = "DICT_APPROVAL_STATUS")
public class DictApprovalStatus extends IdEntity implements IDict {
	// { "创建", "等待审批", "审批中", "审批通过", "退回" };// 审批状态
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
