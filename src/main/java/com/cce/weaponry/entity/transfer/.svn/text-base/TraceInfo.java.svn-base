package com.cce.weaponry.entity.transfer;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.cce.modules.orm.IdEntity;

/**
 * The persistent class for the trace_info database table.
 * 
 */
@Entity
@Table(name="trace_info")
public class TraceInfo extends IdEntity {
	private static final long serialVersionUID = 1L;

	private String traceCode;
	private List<ButcherStage> butcherStages = new ArrayList<ButcherStage>();
	private List<InventoryStage> inventoryStages = new ArrayList<InventoryStage>();
	private List<SaleStage> saleStages = new ArrayList<SaleStage>();
	private List<TransportStage> transportStages = new ArrayList<TransportStage>();

    public TraceInfo() {
    }

	@Column(name = "TI_Trace_Code")
	public String getTraceCode() {
		return traceCode;
	}

	public void setTraceCode(String traceCode) {
		this.traceCode = traceCode;
	}

	//bi-directional many-to-one association to ButcherStage
	@OneToMany(mappedBy="traceInfo")
	public List<ButcherStage> getButcherStages() {
		return this.butcherStages;
	}

	public void setButcherStages(List<ButcherStage> butcherStages) {
		this.butcherStages = butcherStages;
	}
	

	//bi-directional many-to-one association to InventoryStage
	@OneToMany(mappedBy="traceInfo")
	public List<InventoryStage> getInventoryStages() {
		return this.inventoryStages;
	}

	public void setInventoryStages(List<InventoryStage> inventoryStages) {
		this.inventoryStages = inventoryStages;
	}
	

	//bi-directional many-to-one association to SaleStage
	@OneToMany(mappedBy="traceInfo")
	public List<SaleStage> getSaleStages() {
		return this.saleStages;
	}

	public void setSaleStages(List<SaleStage> saleStages) {
		this.saleStages = saleStages;
	}
	

	//bi-directional many-to-one association to TransportStage
	@OneToMany(mappedBy="traceInfo")
	public List<TransportStage> getTransportStages() {
		return this.transportStages;
	}

	public void setTransportStages(List<TransportStage> transportStages) {
		this.transportStages = transportStages;
	}
	
}