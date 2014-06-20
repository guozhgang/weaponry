package com.cce.weaponry.web.vo.register;

import com.cce.weaponry.web.vo.BaseVO;

public class TechnicianInfoVO extends BaseVO {
	private Long fileId; // 人员照片id
	private String entName;
	private String approvalDept;// 发证机关
	private String education;// 学历
	private String tel;// 联系电话
	private String name;// 姓名
	private String type;// 技术人员类别 （下拉框: 肉品品质检验人员/无害化处理人员/屠宰生产技术人员）

	public TechnicianInfoVO(Long fileId, String entName, String approvalDept,
			String education, String tel, String name, String type) {
		super();
		this.fileId = fileId;
		this.entName = entName;
		this.approvalDept = approvalDept;
		this.education = education;
		this.tel = tel;
		this.name = name;
		this.type = type;
	}

	public Long getFileId() {
		return fileId;
	}

	public void setFileId(Long fileId) {
		this.fileId = fileId;
	}

	public String getEntName() {
		return entName;
	}

	public void setEntName(String entName) {
		this.entName = entName;
	}

	public String getApprovalDept() {
		return approvalDept;
	}

	public void setApprovalDept(String approvalDept) {
		this.approvalDept = approvalDept;
	}

	public String getEducation() {
		return education;
	}

	public void setEducation(String education) {
		this.education = education;
	}

	public String getTel() {
		return tel;
	}

	public void setTel(String tel) {
		this.tel = tel;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public TechnicianInfoVO() {
		super();
		// TODO Auto-generated constructor stub
	}

	// private String certNo;// 检验检疫证号

}
