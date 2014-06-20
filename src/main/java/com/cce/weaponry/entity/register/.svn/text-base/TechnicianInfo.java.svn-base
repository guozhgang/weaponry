package com.cce.weaponry.entity.register;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.cce.modules.orm.IdEntity;

/**
 * The persistent class for the technician_info database table.
 * 
 */
@Entity
@Table(name = "technician_info")
public class TechnicianInfo extends IdEntity {
	private static final long serialVersionUID = 1L;

	private String approvalDept;// 发证机关
	private String certNo;// 检验检疫证号
	private String education;// 学历
	private String tel;// 联系电话
	private String name;// 姓名
	private String type;// 技术人员类别 （下拉框: 肉品品质检验人员/无害化处理人员/屠宰生产技术人员）
	private Company company;// 所属公司
	private FileBean photo; // 照片
	private List<TechnicianBadge> badge;

	@ManyToOne
	@JoinColumn(name = "photo")
	public FileBean getPhoto() {
		return photo;
	}

	public void setPhoto(FileBean photo) {
		this.photo = photo;
	}

	@Column(length = 15)
	public String getTel() {
		return tel;
	}

	public void setTel(String tel) {
		this.tel = tel;
	}

	@Column(length = 100)
	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	@OneToMany(mappedBy = "techInfo", cascade = CascadeType.REMOVE)
	public List<TechnicianBadge> getBadge() {
		return badge;
	}

	public void setBadge(List<TechnicianBadge> badge) {
		this.badge = badge;
	}

	public TechnicianInfo() {
	}

	@Column(length = 200)
	public String getApprovalDept() {
		return approvalDept;
	}

	public void setApprovalDept(String approvalDept) {
		this.approvalDept = approvalDept;
	}

	@Column(length = 200)
	public String getCertNo() {
		return certNo;
	}

	public void setCertNo(String certNo) {
		this.certNo = certNo;
	}

	@Column(length = 50)
	public String getEducation() {
		return education;
	}

	public void setEducation(String education) {
		this.education = education;
	}

	@Column(length = 50)
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
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

}