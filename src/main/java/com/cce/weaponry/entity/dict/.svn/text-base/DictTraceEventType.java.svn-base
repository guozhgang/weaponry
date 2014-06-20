package com.cce.weaponry.entity.dict;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import com.cce.modules.orm.IdEntity;

/*
 TZ_RK("TZ_RK", "屠宰入圈"),

 TZ_DJ("TZ_DJ", "屠宰动检"),

 TZ_TZ("TZ_TZ", "屠宰"),

 TZ_FJ("TZ_FJ", "屠宰分拣"),

 TZ_SJ("TZ_SJ", "屠宰商检"),

 TZ_ZX("TZ_ZX", "屠宰装箱"),

 TZ_CK("TZ_CK", "屠宰出库"),

 TZ_WHH("TZ_WHH", "屠宰无害化"),

 PS_RK("PS_RK", "配送入库"),

 PS_ZX("PS_ZX", "配送装箱"),

 PS_FJ("PS_FJ", "配送分拣"),

 PS_RLC("PS_RLC", "配送入冷藏"),

 PS_CK("PS_CK", "配送出库"),

 XS_RK("XS_RK", "销售入库"),

 XS_FJ("XS_FJ", "销售分拣"),

 XS_SG("XS_SG", "销售上柜"),

 XS_SC("XS_SC", "销售售出"),

 YS_ZC("YS_ZC", "运输装车"),

 YS_XH("YS_XH", "运输卸货");
 */
@Entity
@Table(name = "DICT_TRACE_EVENT_TYPE")
public class DictTraceEventType extends IdEntity implements IDict {
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
