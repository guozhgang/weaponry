package com.cce.weaponry.entity.credit;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.cce.modules.orm.IdEntity;
import com.cce.weaponry.entity.dict.DictCompanyCredit;
import com.cce.weaponry.entity.register.Company;
import com.cce.weaponry.entity.register.FileBean;

/**
 * The persistent class for the company_credit database table.
 * 
 */
@Entity
@Table(name="company_credit")
public class CompanyCredit extends IdEntity {
	private static final long serialVersionUID = 1L;
	private Date createDate;// 创建日期
	private String createBy;// 创建人
	private String description;// 描述
	private FileBean file;// 信用等级申请文件
	private Company company;// 公司信息
	private DictCompanyCredit template;// 申请模板

	private List<Approval4Credit> approval = new ArrayList<Approval4Credit>();

	public CompanyCredit() {
	}

	@ManyToOne
	@JoinColumn(name = "CREDIT_NO")
	public DictCompanyCredit getTemplate() {
		return template;
	}

	public void setTemplate(DictCompanyCredit template) {
		this.template = template;
	}

	@Column(length = 500)
	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
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

	// bi-directional many-to-one association to CompanyInfo
    @ManyToOne
	@JoinColumn(name = "C_ID")
	public Company getCompany() {
		return this.company;
	}

	public void setCompany(Company company) {
		this.company = company;
	}

	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "FILE_ID")
	public FileBean getFile() {
		return file;
	}

	public void setFile(FileBean file) {
		this.file = file;
	}

	@OneToMany(mappedBy = "companyCredit", cascade = CascadeType.ALL)
	public List<Approval4Credit> getApproval() {
		return approval;
	}

	public void setApproval(List<Approval4Credit> approval) {
		this.approval = approval;
	}

	@Override
	public String toString() {
		return "com.cce.weaponry.entity.credit.CompanyCredit id = "
				+ id;
	}

}