package com.cce.weaponry.entity.register;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.cce.modules.orm.IdEntity;

/**
 * The persistent class for the company_info database table.
 * 
 */
@Entity
@Table(name="company_info")
public class CompanyInfo extends IdEntity {
	private static final long serialVersionUID = 1L;
	private String address;// 单位地址
	private String bank;// 开户银行
	private String bankAccount;// 银行账号
	private String certDept;// 发证部门
	private String companyType;// 公司分类
	private Date createDate;// 创建日期
	private String createBy;// 创建人
	private String credit;
	private String creditRating;// 信用等级
	private String registerNo;// 1. 屠宰企业备案登记号 -- 监管平台自动生成的唯一编号. 37----
	private String fixedButchNo;// 定点屠宰资格证号
	private Double butchPerYear;// 年屠宰规模 (用户填写数字（小数）, 单位为"万"头)
	private Integer mechanize;// 机械化程度 （下拉框选择: 自动化/半自动化/手工 屠宰, 默认值:自动化）
	private String fpNo;//
	private Date updateDate;// 通过审批时间
	private String legal;// 法定代表人名称
	private String legalFax;// 法定代表人传真
	private String legalMail;// 法定代表人邮箱
	private String legalMobile;// 法定代表人手机
	private String legalTel;// 法定代表人固定电话
	private String level;// 公司等级
	private String status;// null:未保存 0：录入、1：已提交(处理中)、2：通过、3：未通过、4：已删除
	private Date licenseCertDate;// 营业执照签发日期
	private String licenseCertDept;// 营业执照签发单位
	private String licenseNo;// 营业执照编号
	private String nameCN;// 企业名称-中文
	private String nameEN;// 企业名称-英文
	private String simpleName;// 企业名称-简称
	private Integer nature;// 企业性质
	private String orgCode;// 组织机构代码
	private Boolean qualityEstablished;// 质量体系是否建立
	private String qurCert; // 检验检疫证
	private String relaFax;// 单位联系人传真
	private String relaMail;// 单位联系人邮箱
	private String relaMobile;// 单位联系人手机
	private String relaName;// 单位联系人名称
	private String relaTel;// 单位联系人固定电话
	private String taxCert;// 税务等级证号
	private Date validity;// 有效期
	private String version; // 证章备案管理
	private String zipcode;// 邮政编码
	private Company company;
	private List<Approval4Register> companyRegister = new ArrayList<Approval4Register>();// 公司申请
	private List<QualityInfo> qualityInfos = new ArrayList<QualityInfo>();// 质量体系信息
	private List<CompanyBadge> companyBadge = new ArrayList<CompanyBadge>();// 公司证章信息

	public CompanyInfo() {
	}

	@Column(length = 50)
	public String getRegisterNo() {
		return registerNo;
	}

	public void setRegisterNo(String registerNo) {
		this.registerNo = registerNo;
	}

	public String getFixedButchNo() {
		return fixedButchNo;
	}

	public void setFixedButchNo(String fixedButchNo) {
		this.fixedButchNo = fixedButchNo;
	}

	public Double getButchPerYear() {
		return butchPerYear;
	}

	public void setButchPerYear(Double butchPerYear) {
		this.butchPerYear = butchPerYear;
	}

	public Integer getMechanize() {
		return mechanize;
	}

	public void setMechanize(Integer mechanize) {
		this.mechanize = mechanize;
	}

	public Integer getNature() {
		return nature;
	}

	public void setNature(Integer nature) {
		this.nature = nature;
	}

	@Column(length = 50)
	public String getCreateBy() {
		return createBy;
	}

	public void setCreateBy(String createBy) {
		this.createBy = createBy;
	}

	@Column(length = 20)
	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	@Column(length = 500)
	public String getBank() {
		return bank;
	}

	public void setBank(String bank) {
		this.bank = bank;
	}

	@Column(length = 20)
	public String getBankAccount() {
		return bankAccount;
	}

	public void setBankAccount(String bankAccount) {
		this.bankAccount = bankAccount;
	}

	@Column(length = 50)
	public String getCertDept() {
		return certDept;
	}

	public void setCertDept(String certDept) {
		this.certDept = certDept;
	}

	@Column(length = 50)
	public String getCompanyType() {
		return companyType;
	}

	public void setCompanyType(String companyType) {
		this.companyType = companyType;
	}

	public Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

	@Column(length = 50)
	public String getCredit() {
		return credit;
	}

	public void setCredit(String credit) {
		this.credit = credit;
	}

	@Column(length = 50)
	public String getCreditRating() {
		return creditRating;
	}

	public void setCreditRating(String creditRating) {
		this.creditRating = creditRating;
	}

	@Column(length = 200)
	public String getFpNo() {
		return fpNo;
	}

	public void setFpNo(String fpNo) {
		this.fpNo = fpNo;
	}

	public Date getUpdateDate() {
		return updateDate;
	}

	public void setUpdateDate(Date updateDate) {
		this.updateDate = updateDate;
	}

	public String getLegal() {
		return legal;
	}

	public void setLegal(String legal) {
		this.legal = legal;
	}

	public String getLegalFax() {
		return legalFax;
	}

	public void setLegalFax(String legalFax) {
		this.legalFax = legalFax;
	}

	public String getLegalMail() {
		return legalMail;
	}

	public void setLegalMail(String legalMail) {
		this.legalMail = legalMail;
	}

	@Column(length = 11)
	public String getLegalMobile() {
		return legalMobile;
	}

	public void setLegalMobile(String legalMobile) {
		this.legalMobile = legalMobile;
	}

	@Column(length = 12)
	public String getLegalTel() {
		return legalTel;
	}

	public void setLegalTel(String legalTel) {
		this.legalTel = legalTel;
	}

	@Column(name = "leveles", length = 20)
	public String getLevel() {
		return level;
	}

	public void setLevel(String level) {
		this.level = level;
	}

	public Date getLicenseCertDate() {
		return licenseCertDate;
	}

	public void setLicenseCertDate(Date licenseCertDate) {
		this.licenseCertDate = licenseCertDate;
	}

	@Column(length = 50)
	public String getLicenseCertDept() {
		return licenseCertDept;
	}

	public void setLicenseCertDept(String licenseCertDept) {
		this.licenseCertDept = licenseCertDept;
	}

	@Column(length = 50)
	public String getLicenseNo() {
		return licenseNo;
	}

	public void setLicenseNo(String licenseNo) {
		this.licenseNo = licenseNo;
	}

	@Column(length = 150)
	public String getNameCN() {
		return nameCN;
	}

	public void setNameCN(String nameCN) {
		this.nameCN = nameCN;
	}

	@Column(length = 150)
	public String getNameEN() {
		return nameEN;
	}

	public void setNameEN(String nameEN) {
		this.nameEN = nameEN;
	}

	@Column(length = 150)
	public String getSimpleName() {
		return simpleName;
	}

	public void setSimpleName(String simpleName) {
		this.simpleName = simpleName;
	}

	@Column(length = 200)
	public String getOrgCode() {
		return orgCode;
	}

	public void setOrgCode(String orgCode) {
		this.orgCode = orgCode;
	}

	public Boolean getQualityEstablished() {
		return qualityEstablished;
	}

	public void setQualityEstablished(Boolean qualityEstablished) {
		this.qualityEstablished = qualityEstablished;
	}

	@Column(length = 20)
	public String getQurCert() {
		return qurCert;
	}

	public void setQurCert(String qurCert) {
		this.qurCert = qurCert;
	}

	@Column(length = 50)
	public String getRelaFax() {
		return relaFax;
	}

	public void setRelaFax(String relaFax) {
		this.relaFax = relaFax;
	}

	public String getRelaMail() {
		return relaMail;
	}

	public void setRelaMail(String relaMail) {
		this.relaMail = relaMail;
	}

	@Column(length = 11)
	public String getRelaMobile() {
		return relaMobile;
	}

	public void setRelaMobile(String relaMobile) {
		this.relaMobile = relaMobile;
	}

	@Column(length = 50)
	public String getRelaName() {
		return relaName;
	}

	public void setRelaName(String relaName) {
		this.relaName = relaName;
	}

	@Column(length = 12)
	public String getRelaTel() {
		return relaTel;
	}

	public void setRelaTel(String relaTel) {
		this.relaTel = relaTel;
	}

	@Column(length = 50)
	public String getTaxCert() {
		return taxCert;
	}

	public void setTaxCert(String taxCert) {
		this.taxCert = taxCert;
	}

	public Date getValidity() {
		return validity;
	}

	public void setValidity(Date validity) {
		this.validity = validity;
	}

	@Column(length = 50)
	public String getVersion() {
		return version;
	}

	public void setVersion(String version) {
		this.version = version;
	}

	@Column(length = 50)
	public String getZipcode() {
		return zipcode;
	}

	public void setZipcode(String zipcode) {
		this.zipcode = zipcode;
	}

	@ManyToOne
	@JoinColumn(name = "C_ID")
	public Company getCompany() {
		return company;
	}

	public void setCompany(Company company) {
		this.company = company;
	}

	@OneToMany(mappedBy = "companyInfo")
	public List<Approval4Register> getCompanyRegister() {
		return companyRegister;
	}

	public void setCompanyRegister(List<Approval4Register> companyRegister) {
		this.companyRegister = companyRegister;
	}

	@Override
	// 为防止内存溢出，故重写企业toString()方法
	public String toString() {
		return "企业toString()方法--企业id:" + this.getId();
	}

	// bi-directional many-to-one association to QualityInfo
	@OneToMany(mappedBy = "companyInfo")
	public List<QualityInfo> getQualityInfos() {
		return this.qualityInfos;
	}

	public void setQualityInfos(List<QualityInfo> qualityInfos) {
		this.qualityInfos = qualityInfos;
	}

	@OneToMany(mappedBy = "companyInfo")
	public List<CompanyBadge> getCompanyBadge() {
		return companyBadge;
	}

	public void setCompanyBadge(List<CompanyBadge> companyBadge) {
		this.companyBadge = companyBadge;
	}

	/**
	 * 企业性质中文表示
	 * 
	 * @return
	 */
	@Transient
	public String getNatureCN() {
		if (null == nature)
			return null;
		else if (1 == nature.intValue())
			return "国有";
		else if (2 == nature.intValue())
			return "民营";
		else if (3 == nature.intValue())
			return "私营";
		else
			return "合资";
	}

	/**
	 * 机械化程度中文表示
	 * 
	 * @return
	 */
	@Transient
	public String getMechanizeCN() {
		if (null == mechanize)
			return null;
		else if (1 == mechanize.intValue())
			return "自动化屠宰";
		else if (2 == mechanize.intValue())
			return "半自动化屠宰";
		else
			return "手工屠宰";
	}

}