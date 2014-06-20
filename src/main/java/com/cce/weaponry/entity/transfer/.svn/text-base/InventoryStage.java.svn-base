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
 * The persistent class for the inventory_stage database table.
 * 
 */
@Entity
@Table(name="inventory_stage")
public class InventoryStage extends IdEntity {
	private static final long serialVersionUID = 1L;

	private Timestamp invetoryDeliverTime;
	private Timestamp invetoryEnterTime;
	private String invetoryLoc;
	private int invetoryMaxHum;
	private int invetoryMaxTemper;
	private int invetoryMinHum;
	private int invetoryMinTemper;
	private String invetoryOper;
	private String invetoryTransNext;
	private String partLoc;
	private int partMaxHum;
	private int partMaxTemper;
	private int partMinHum;
	private int partMinTemper;
	private String partOper;
	private Timestamp partTime;
	private String receiveOper;
	private Timestamp receiveTime;
	private CompanyInfo companyInfo;
	private TraceInfo traceInfo;

    public InventoryStage() {
    }

	@Column(name = "TI_InvetoryDeliverTime")
	public Timestamp getInvetoryDeliverTime() {
		return invetoryDeliverTime;
	}

	public void setInvetoryDeliverTime(Timestamp invetoryDeliverTime) {
		this.invetoryDeliverTime = invetoryDeliverTime;
	}

	@Column(name = "TI_InvetoryEnterTime")
	public Timestamp getInvetoryEnterTime() {
		return invetoryEnterTime;
	}

	public void setInvetoryEnterTime(Timestamp invetoryEnterTime) {
		this.invetoryEnterTime = invetoryEnterTime;
	}

	@Column(name = "TI_InvetoryLoc")
	public String getInvetoryLoc() {
		return invetoryLoc;
	}

	public void setInvetoryLoc(String invetoryLoc) {
		this.invetoryLoc = invetoryLoc;
	}

	@Column(name = "TI_InvetoryMaxHum")
	public int getInvetoryMaxHum() {
		return invetoryMaxHum;
	}

	public void setInvetoryMaxHum(int invetoryMaxHum) {
		this.invetoryMaxHum = invetoryMaxHum;
	}

	@Column(name = "TI_InvetoryMaxTemper")
	public int getInvetoryMaxTemper() {
		return invetoryMaxTemper;
	}

	public void setInvetoryMaxTemper(int invetoryMaxTemper) {
		this.invetoryMaxTemper = invetoryMaxTemper;
	}

	@Column(name = "TI_InvetoryMinHum")
	public int getInvetoryMinHum() {
		return invetoryMinHum;
	}

	public void setInvetoryMinHum(int invetoryMinHum) {
		this.invetoryMinHum = invetoryMinHum;
	}

	@Column(name = "TI_InvetoryMinTemper")
	public int getInvetoryMinTemper() {
		return invetoryMinTemper;
	}

	public void setInvetoryMinTemper(int invetoryMinTemper) {
		this.invetoryMinTemper = invetoryMinTemper;
	}

	@Column(name = "TI_InvetoryOper")
	public String getInvetoryOper() {
		return invetoryOper;
	}

	public void setInvetoryOper(String invetoryOper) {
		this.invetoryOper = invetoryOper;
	}

	@Column(name = "TI_InvetoryTransNext")
	public String getInvetoryTransNext() {
		return invetoryTransNext;
	}

	public void setInvetoryTransNext(String invetoryTransNext) {
		this.invetoryTransNext = invetoryTransNext;
	}

	@Column(name = "TI_PartLoc")
	public String getPartLoc() {
		return partLoc;
	}

	public void setPartLoc(String partLoc) {
		this.partLoc = partLoc;
	}

	@Column(name = "TI_PartMaxHum")
	public int getPartMaxHum() {
		return partMaxHum;
	}

	public void setPartMaxHum(int partMaxHum) {
		this.partMaxHum = partMaxHum;
	}

	@Column(name = "TI_PartMaxTemper")
	public int getPartMaxTemper() {
		return partMaxTemper;
	}

	public void setPartMaxTemper(int partMaxTemper) {
		this.partMaxTemper = partMaxTemper;
	}

	@Column(name = "TI_PartMinHum")
	public int getPartMinHum() {
		return partMinHum;
	}

	public void setPartMinHum(int partMinHum) {
		this.partMinHum = partMinHum;
	}

	@Column(name = "TI_PartMinTemper")
	public int getPartMinTemper() {
		return partMinTemper;
	}

	public void setPartMinTemper(int partMinTemper) {
		this.partMinTemper = partMinTemper;
	}

	@Column(name = "TI_PartOper")
	public String getPartOper() {
		return partOper;
	}

	public void setPartOper(String partOper) {
		this.partOper = partOper;
	}

	@Column(name = "TI_PartTime")
	public Timestamp getPartTime() {
		return partTime;
	}

	public void setPartTime(Timestamp partTime) {
		this.partTime = partTime;
	}

	@Column(name = "TI_ReceiveOper")
	public String getReceiveOper() {
		return receiveOper;
	}

	public void setReceiveOper(String receiveOper) {
		this.receiveOper = receiveOper;
	}

	@Column(name = "TI_ReceiveTime")
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