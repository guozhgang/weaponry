package com.cce.weaponry.entity.traceinfo;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.cce.modules.orm.IdEntity;

/**
 * The persistent class for the cydxx database table. 查验点信息
 */
@Entity
@Table(name = "trace_cydxx")
public class Cydxx extends IdEntity {
	private static final long serialVersionUID = 1L;
	private Date cyrqsj;
	private String DJDD;
	private String DJZFZJGMZ;
	private String DJZH;
	private Monitor monitor;

    public Cydxx() {
    }

	public Date getCyrqsj() {
		return cyrqsj;
	}

	public void setCyrqsj(Date cyrqsj) {
		this.cyrqsj = cyrqsj;
	}

	//bi-directional many-to-one association to Monitor
	@ManyToOne
	@JoinColumn(name="monitor_id")
	public Monitor getMonitor() {
		return this.monitor;
	}

	public void setMonitor(Monitor monitor) {
		this.monitor = monitor;
	}

	public String getDJDD() {
		return DJDD;
	}

	public void setDJDD(String dJDD) {
		DJDD = dJDD;
	}

	public String getDJZFZJGMZ() {
		return DJZFZJGMZ;
	}

	public void setDJZFZJGMZ(String dJZFZJGMZ) {
		DJZFZJGMZ = dJZFZJGMZ;
	}

	public String getDJZH() {
		return DJZH;
	}

	public void setDJZH(String dJZH) {
		DJZH = dJZH;
	}
	
}