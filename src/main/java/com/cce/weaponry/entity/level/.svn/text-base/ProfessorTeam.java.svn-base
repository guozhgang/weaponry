package com.cce.weaponry.entity.level;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.DiscriminatorColumn;
import javax.persistence.DiscriminatorType;
import javax.persistence.Entity;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.cce.modules.orm.IdEntity;
import com.cce.weaponry.entity.register.EnforceOrg;

@Entity
@Table(name = "Professor_Team")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "teamtype", discriminatorType = DiscriminatorType.STRING)
public class ProfessorTeam extends IdEntity {
	private String name; // 专家组名
	private Date createDate;// 专家组创建日期
	private String createBy;// 创建人
	private EnforceOrg enforceOrg;// 执法人

	@Column(length = 50)
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

	@Column(length = 20)
	public String getCreateBy() {
		return createBy;
	}

	public void setCreateBy(String createBy) {
		this.createBy = createBy;
	}

	// bi-directional many-to-one association to EnforceOrg
	@ManyToOne
	@JoinColumn(name = "ORG_ID")
	public EnforceOrg getEnforceOrg() {
		return this.enforceOrg;
	}

	public void setEnforceOrg(EnforceOrg enforceOrg) {
		this.enforceOrg = enforceOrg;
	}
}
