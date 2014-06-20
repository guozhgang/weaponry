package com.cce.weaponry.entity.traceinfo;

import java.math.BigDecimal;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.cce.modules.orm.IdEntity;

/**
 * The persistent class for the zzxsxx database table. 终端销售信息
 */
@Entity
@Table(name = "trace_zzxsxx")
public class Zzxsxx extends IdEntity {
	private static final long serialVersionUID = 1L;
	private String ZSM;
	private BigDecimal DJ;
	private String PM;
	private BigDecimal ZL;
	private Monitor monitor;

    public Zzxsxx() {
    }

	// bi-directional many-to-one association to Monitor
	@OneToOne
	@JoinColumn(name = "monitor_id")
	public Monitor getMonitor() {
		return this.monitor;
	}

	public void setMonitor(Monitor monitor) {
		this.monitor = monitor;
	}

	public String getZSM() {
		return ZSM;
	}

	public void setZSM(String zSM) {
		ZSM = zSM;
	}

	public BigDecimal getDJ() {
		return DJ;
	}

	public void setDJ(BigDecimal dJ) {
		DJ = dJ;
	}

	public String getPM() {
		return PM;
	}

	public void setPM(String pM) {
		PM = pM;
	}

	public BigDecimal getZL() {
		return ZL;
	}

	public void setZL(BigDecimal zL) {
		ZL = zL;
	}
}