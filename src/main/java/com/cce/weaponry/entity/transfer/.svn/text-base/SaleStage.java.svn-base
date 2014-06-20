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
 * The persistent class for the sale_stage database table.
 * 
 */
@Entity
@Table(name="sale_stage")
public class SaleStage extends IdEntity {
	private static final long serialVersionUID = 1L;

	private Timestamp inventoryEnterTime;
	private String inventoryLoc;
	private int inventoryMaxHum;
	private int inventoryMaxTemper;
	private int inventoryMinHum;
	private int inventoryMinTemper;
	private Timestamp inventoryOnShelveTime;
	private String inventoryOper;
	private Timestamp onShelveAccountTime;
	private String onShelveCashier;
	private String onShelveLoc;
	private int onShelveMaxHum;
	private int onShelveMaxTemper;
	private int onShelveMinHum;
	private int onShelveMinTemper;
	private String onShelveOper;
	private Timestamp onShelveTime;
	private String receiveOper;
	private Timestamp receiveTime;
	private CompanyInfo companyInfo;
	private TraceInfo traceInfo;

    public SaleStage() {
    }

	@Column(name = "SS_InventoryEnterTime")
	public Timestamp getInventoryEnterTime() {
		return inventoryEnterTime;
	}

	public void setInventoryEnterTime(Timestamp inventoryEnterTime) {
		this.inventoryEnterTime = inventoryEnterTime;
	}

	@Column(name = "SS_InventoryLoc")
	public String getInventoryLoc() {
		return inventoryLoc;
	}

	public void setInventoryLoc(String inventoryLoc) {
		this.inventoryLoc = inventoryLoc;
	}

	@Column(name = "SS_InventoryMaxHum")
	public int getInventoryMaxHum() {
		return inventoryMaxHum;
	}

	public void setInventoryMaxHum(int inventoryMaxHum) {
		this.inventoryMaxHum = inventoryMaxHum;
	}

	@Column(name = "SS_InventoryMaxTemper")
	public int getInventoryMaxTemper() {
		return inventoryMaxTemper;
	}

	public void setInventoryMaxTemper(int inventoryMaxTemper) {
		this.inventoryMaxTemper = inventoryMaxTemper;
	}

	@Column(name = "SS_InventoryMinHum")
	public int getInventoryMinHum() {
		return inventoryMinHum;
	}

	public void setInventoryMinHum(int inventoryMinHum) {
		this.inventoryMinHum = inventoryMinHum;
	}

	@Column(name = "SS_InventoryMinTemper")
	public int getInventoryMinTemper() {
		return inventoryMinTemper;
	}

	public void setInventoryMinTemper(int inventoryMinTemper) {
		this.inventoryMinTemper = inventoryMinTemper;
	}

	@Column(name = "SS_InventoryOnShelveTime")
	public Timestamp getInventoryOnShelveTime() {
		return inventoryOnShelveTime;
	}

	public void setInventoryOnShelveTime(Timestamp inventoryOnShelveTime) {
		this.inventoryOnShelveTime = inventoryOnShelveTime;
	}

	@Column(name = "SS_InventoryOper")
	public String getInventoryOper() {
		return inventoryOper;
	}

	public void setInventoryOper(String inventoryOper) {
		this.inventoryOper = inventoryOper;
	}

	@Column(name = "SS_OnShelveAccountTime")
	public Timestamp getOnShelveAccountTime() {
		return onShelveAccountTime;
	}

	public void setOnShelveAccountTime(Timestamp onShelveAccountTime) {
		this.onShelveAccountTime = onShelveAccountTime;
	}

	@Column(name = "SS_OnShelveCashier")
	public String getOnShelveCashier() {
		return onShelveCashier;
	}

	public void setOnShelveCashier(String onShelveCashier) {
		this.onShelveCashier = onShelveCashier;
	}

	@Column(name = "SS_OnShelveLoc")
	public String getOnShelveLoc() {
		return onShelveLoc;
	}

	public void setOnShelveLoc(String onShelveLoc) {
		this.onShelveLoc = onShelveLoc;
	}

	@Column(name = "SS_OnShelveMaxHum")
	public int getOnShelveMaxHum() {
		return onShelveMaxHum;
	}

	public void setOnShelveMaxHum(int onShelveMaxHum) {
		this.onShelveMaxHum = onShelveMaxHum;
	}

	@Column(name = "SS_OnShelveMaxTemper")
	public int getOnShelveMaxTemper() {
		return onShelveMaxTemper;
	}

	public void setOnShelveMaxTemper(int onShelveMaxTemper) {
		this.onShelveMaxTemper = onShelveMaxTemper;
	}

	@Column(name = "SS_OnShelveMinHum")
	public int getOnShelveMinHum() {
		return onShelveMinHum;
	}

	public void setOnShelveMinHum(int onShelveMinHum) {
		this.onShelveMinHum = onShelveMinHum;
	}

	@Column(name = "SS_OnShelveMinTemper")
	public int getOnShelveMinTemper() {
		return onShelveMinTemper;
	}

	public void setOnShelveMinTemper(int onShelveMinTemper) {
		this.onShelveMinTemper = onShelveMinTemper;
	}

	@Column(name = "SS_OnShelveOper")
	public String getOnShelveOper() {
		return onShelveOper;
	}

	public void setOnShelveOper(String onShelveOper) {
		this.onShelveOper = onShelveOper;
	}

	@Column(name = "SS_OnShelveTime")
	public Timestamp getOnShelveTime() {
		return onShelveTime;
	}

	public void setOnShelveTime(Timestamp onShelveTime) {
		this.onShelveTime = onShelveTime;
	}

	@Column(name = "SS_ReceiveOper")
	public String getReceiveOper() {
		return receiveOper;
	}

	public void setReceiveOper(String receiveOper) {
		this.receiveOper = receiveOper;
	}

	@Column(name = "SS_ReceiveTime")
	public Timestamp getReceiveTime() {
		return receiveTime;
	}

	public void setReceiveTime(Timestamp receiveTime) {
		this.receiveTime = receiveTime;
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