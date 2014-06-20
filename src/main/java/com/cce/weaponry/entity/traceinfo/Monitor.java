package com.cce.weaponry.entity.traceinfo;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.cce.modules.orm.IdEntity;


/**
 * The persistent class for the monitor database table.
 * 
 */
@Entity
@Table(name = "trace_monitor")
public class Monitor extends IdEntity {
	private static final long serialVersionUID = 1L;
	private Date createDate;
	private List<Cydxx> cydxxs;
	private List<Lthj> lthjs;
	private Tzjdxx tzjdxx;
	private Zzxsxx zzxsxx;

    public Monitor() {
    }

	public Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

	//bi-directional many-to-one association to Cydxx
	@OneToMany(mappedBy = "monitor", cascade = CascadeType.ALL)
	public List<Cydxx> getCydxxs() {
		return this.cydxxs;
	}

	public void setCydxxs(List<Cydxx> cydxxs) {
		this.cydxxs = cydxxs;
	}
	

	//bi-directional many-to-one association to Lthj
	@OneToMany(mappedBy = "monitor", cascade = CascadeType.ALL)
	public List<Lthj> getLthjs() {
		return this.lthjs;
	}

	public void setLthjs(List<Lthj> lthjs) {
		this.lthjs = lthjs;
	}
	
	@OneToOne(mappedBy = "monitor", cascade = CascadeType.ALL)
	public Tzjdxx getTzjdxx() {
		return tzjdxx;
	}

	public void setTzjdxx(Tzjdxx tzjdxx) {
		this.tzjdxx = tzjdxx;
	}

	@OneToOne(mappedBy = "monitor", cascade = CascadeType.ALL)
	public Zzxsxx getZzxsxx() {
		return zzxsxx;
	}

	public void setZzxsxx(Zzxsxx zzxsxx) {
		this.zzxsxx = zzxsxx;
	}

}