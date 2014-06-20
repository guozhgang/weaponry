package com.cce.weaponry.entity.register;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.cce.modules.orm.IdEntity;

/**
 * The persistent class for the quality_info database table.
 * 
 */
@Entity
@Table(name="quality_info")
public class QualityInfo extends IdEntity {
	private static final long serialVersionUID = 1L;

	private Date deadLine;// 截止日期
	private Date estDate;// 认证日期
	private String estOrg;// 认证机构
	private String established;// 已获得认证
	private CompanyInfo companyInfo;// 所属公司

    public QualityInfo() {
    }

	@Column(name = "QI_DeadLine")
	public Date getDeadLine() {
		return deadLine;
	}

	public void setDeadLine(Date deadLine) {
		this.deadLine = deadLine;
	}

	@Column(name = "QIEstDate")
	public Date getEstDate() {
		return estDate;
	}

	public void setEstDate(Date estDate) {
		this.estDate = estDate;
	}

	@Column(name = "QIEstOrg")
	public String getEstOrg() {
		return estOrg;
	}

	public void setEstOrg(String estOrg) {
		this.estOrg = estOrg;
	}

	@Column(name = "QI_Established")
	public String getEstablished() {
		return established;
	}

	public void setEstablished(String established) {
		this.established = established;
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
	
}