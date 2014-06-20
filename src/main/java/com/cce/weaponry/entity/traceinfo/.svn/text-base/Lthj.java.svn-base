package com.cce.weaponry.entity.traceinfo;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.cce.modules.orm.IdEntity;

/**
 * The persistent class for the lthj database table. 流通环节信息
 */
@Entity
@Table(name = "trace_lthj")
public class Lthj extends IdEntity {
	private static final long serialVersionUID = 1L;
	private Date chrqsj; //
	private Date jhrqsj;
	private String QYMC; // 企业名称
	private String ZZJGDMZH;// 组织机构代码
	private Monitor monitor;

    public Lthj() {
    }

	public Date getChrqsj() {
		return chrqsj;
	}

	public void setChrqsj(Date chrqsj) {
		this.chrqsj = chrqsj;
	}

	public Date getJhrqsj() {
		return jhrqsj;
	}

	public void setJhrqsj(Date jhrqsj) {
		this.jhrqsj = jhrqsj;
	}

	// bi-directional many-to-one association to Monitor
	@ManyToOne
	@JoinColumn(name = "monitor_id")
	public Monitor getMonitor() {
		return this.monitor;
	}

	public void setMonitor(Monitor monitor) {
		this.monitor = monitor;
	}

	public String getQYMC() {
		return QYMC;
	}

	public void setQYMC(String qYMC) {
		QYMC = qYMC;
	}

	public String getZZJGDMZH() {
		return ZZJGDMZH;
	}

	public void setZZJGDMZH(String zZJGDMZH) {
		ZZJGDMZH = zZJGDMZH;
	}
	
}