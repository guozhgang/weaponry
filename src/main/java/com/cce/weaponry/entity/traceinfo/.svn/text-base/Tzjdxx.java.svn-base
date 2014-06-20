package com.cce.weaponry.entity.traceinfo;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.cce.modules.orm.IdEntity;

/**
 * The persistent class for the tzjdxx database table. 屠宰阶段信息
 */
@Entity
@Table(name = "trace_tzjdxx")
public class Tzjdxx extends IdEntity {
	private static final long serialVersionUID = 1L;
	private Date ccrqsj; // 出场日期时间
	private String CDJYZFZDWMZ;
	private String CDJYZHM;
	private String CXJDWCPJYHGZH;
	private String CXJDWCPJYDWMZ;
	private String DJJYJGMC;
	private Date djrqsj; // 动检日期时间
	private String DWCPJYDWMC;
	private String DWCPJYHGZH;
	private String DWYZGJXDZMDWMC;
	private String DWYZGJXDZMH;
	private Date hzjcrqsj; // 活猪进场日期时间
	private String HZLYDQ; // 活猪来源地区
	private String QYMC;
	private String RPPZJYJYDWMZ;
	private String RPPZJYJYZH;
	private Date sjrqsj; // 商检日期时间
	private Date tzrqsj;// 屠宰日期时间
	private String WHBFYQZMSFZDW;
	private Date whbfyqzmsrqsj;// 五号病非疫区证明书日期时间
	private String YZC;
	private String ZZJGDMZH;
	private Monitor monitor;

    public Tzjdxx() {
    }

    public Date getCcrqsj() {
		return ccrqsj;
	}

	public void setCcrqsj(Date ccrqsj) {
		this.ccrqsj = ccrqsj;
	}

	public Date getDjrqsj() {
		return djrqsj;
	}

	public void setDjrqsj(Date djrqsj) {
		this.djrqsj = djrqsj;
	}

	public Date getHzjcrqsj() {
		return hzjcrqsj;
	}

	public void setHzjcrqsj(Date hzjcrqsj) {
		this.hzjcrqsj = hzjcrqsj;
	}

	public Date getSjrqsj() {
		return sjrqsj;
	}

	public void setSjrqsj(Date sjrqsj) {
		this.sjrqsj = sjrqsj;
	}

	public Date getTzrqsj() {
		return tzrqsj;
	}

	public void setTzrqsj(Date tzrqsj) {
		this.tzrqsj = tzrqsj;
	}

	public Date getWhbfyqzmsrqsj() {
		return whbfyqzmsrqsj;
	}

	public void setWhbfyqzmsrqsj(Date whbfyqzmsrqsj) {
		this.whbfyqzmsrqsj = whbfyqzmsrqsj;
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

	@Column(length = 50)
	public String getCDJYZFZDWMZ() {
		return CDJYZFZDWMZ;
	}

	public void setCDJYZFZDWMZ(String cDJYZFZDWMZ) {
		CDJYZFZDWMZ = cDJYZFZDWMZ;
	}

	@Column(length = 20)
	public String getCDJYZHM() {
		return CDJYZHM;
	}

	public void setCDJYZHM(String cDJYZHM) {
		CDJYZHM = cDJYZHM;
	}

	@Column(length = 20)
	public String getCXJDWCPJYHGZH() {
		return CXJDWCPJYHGZH;
	}

	public void setCXJDWCPJYHGZH(String cXJDWCPJYHGZH) {
		CXJDWCPJYHGZH = cXJDWCPJYHGZH;
	}

	@Column(length = 50)
	public String getCXJDWCPJYDWMZ() {
		return CXJDWCPJYDWMZ;
	}

	public void setCXJDWCPJYDWMZ(String cXJDWCPJYDWMZ) {
		CXJDWCPJYDWMZ = cXJDWCPJYDWMZ;
	}

	@Column(length = 50)
	public String getDJJYJGMC() {
		return DJJYJGMC;
	}

	public void setDJJYJGMC(String dJJYJGMC) {
		DJJYJGMC = dJJYJGMC;
	}

	@Column(length = 50)
	public String getDWCPJYDWMC() {
		return DWCPJYDWMC;
	}

	public void setDWCPJYDWMC(String dWCPJYDWMC) {
		DWCPJYDWMC = dWCPJYDWMC;
	}

	@Column(length = 20)
	public String getDWCPJYHGZH() {
		return DWCPJYHGZH;
	}

	public void setDWCPJYHGZH(String dWCPJYHGZH) {
		DWCPJYHGZH = dWCPJYHGZH;
	}

	@Column(length = 50)
	public String getDWYZGJXDZMDWMC() {
		return DWYZGJXDZMDWMC;
	}

	public void setDWYZGJXDZMDWMC(String dWYZGJXDZMDWMC) {
		DWYZGJXDZMDWMC = dWYZGJXDZMDWMC;
	}

	@Column(length = 20)
	public String getDWYZGJXDZMH() {
		return DWYZGJXDZMH;
	}

	public void setDWYZGJXDZMH(String dWYZGJXDZMH) {
		DWYZGJXDZMH = dWYZGJXDZMH;
	}

	@Column(length = 50)
	public String getHZLYDQ() {
		return HZLYDQ;
	}

	public void setHZLYDQ(String hZLYDQ) {
		HZLYDQ = hZLYDQ;
	}

	@Column(length = 50)
	public String getQYMC() {
		return QYMC;
	}

	public void setQYMC(String qYMC) {
		QYMC = qYMC;
	}

	@Column(length = 50)
	public String getRPPZJYJYDWMZ() {
		return RPPZJYJYDWMZ;
	}

	public void setRPPZJYJYDWMZ(String rPPZJYJYDWMZ) {
		RPPZJYJYDWMZ = rPPZJYJYDWMZ;
	}

	@Column(length = 20)
	public String getRPPZJYJYZH() {
		return RPPZJYJYZH;
	}

	public void setRPPZJYJYZH(String rPPZJYJYZH) {
		RPPZJYJYZH = rPPZJYJYZH;
	}

	@Column(length = 50)
	public String getWHBFYQZMSFZDW() {
		return WHBFYQZMSFZDW;
	}

	public void setWHBFYQZMSFZDW(String wHBFYQZMSFZDW) {
		WHBFYQZMSFZDW = wHBFYQZMSFZDW;
	}

	@Column(length = 50)
	public String getYZC() {
		return YZC;
	}

	public void setYZC(String yZC) {
		YZC = yZC;
	}

	@Column(length = 20)
	public String getZZJGDMZH() {
		return ZZJGDMZH;
	}

	public void setZZJGDMZH(String zZJGDMZH) {
		ZZJGDMZH = zZJGDMZH;
	}
	
}