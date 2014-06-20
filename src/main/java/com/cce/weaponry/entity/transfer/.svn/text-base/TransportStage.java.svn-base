package com.cce.weaponry.entity.transfer;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.cce.modules.orm.IdEntity;
import com.cce.weaponry.entity.register.CompanyInfo;

/**
 * The persistent class for the transport_stage database table.
 * 
 */
@Entity
@Table(name="transport_stage")
public class TransportStage extends IdEntity {
	private static final long serialVersionUID = 1L;
	private String carNumber;
	private String driver;
	private Timestamp endTime;
	private int maxHum;
	private int maxTemper;
	private int minHum;
	private int minTemper;
	private Timestamp startTime;
	private CompanyInfo companyInfo;
	private TraceInfo traceInfo;

    public TransportStage() {
    }

	@Column(name = "TS_CarNumber")
	public String getCarNumber() {
		return carNumber;
	}

	public void setCarNumber(String carNumber) {
		this.carNumber = carNumber;
	}

	@Column(name = "TS_Driver")
	public String getDriver() {
		return driver;
	}

	public void setDriver(String driver) {
		this.driver = driver;
	}

	@Column(name = "TS_EndTime")
	public Timestamp getEndTime() {
		return endTime;
	}

	public void setEndTime(Timestamp endTime) {
		this.endTime = endTime;
	}

	@Column(name = "TS_MaxHum")
	public int getMaxHum() {
		return maxHum;
	}

	public void setMaxHum(int maxHum) {
		this.maxHum = maxHum;
	}

	@Column(name = "TS_MaxTemper")
	public int getMaxTemper() {
		return maxTemper;
	}

	public void setMaxTemper(int maxTemper) {
		this.maxTemper = maxTemper;
	}

	@Column(name = "TS_MinHum")
	public int getMinHum() {
		return minHum;
	}

	public void setMinHum(int minHum) {
		this.minHum = minHum;
	}

	@Column(name = "TS_MinTemper")
	public int getMinTemper() {
		return minTemper;
	}

	public void setMinTemper(int minTemper) {
		this.minTemper = minTemper;
	}

	@Column(name = "TS_StartTime")
	public Timestamp getStartTime() {
		return startTime;
	}

	public void setStartTime(Timestamp startTime) {
		this.startTime = startTime;
	}

	//bi-directional many-to-one association to CompanyInfo
    @ManyToOne
	@JoinColumn(name="CI_ID")
	public CompanyInfo getCompanyInfo() {
		return this.companyInfo;
	}

	public void setCompanyInfo(CompanyInfo companyInfo) {
		this.companyInfo = companyInfo;
	}
	

	//bi-directional many-to-one association to TraceInfo
    @ManyToOne
	@JoinColumn(name="TI_ID")
	public TraceInfo getTraceInfo() {
		return this.traceInfo;
	}

	public void setTraceInfo(TraceInfo traceInfo) {
		this.traceInfo = traceInfo;
	}
	
}