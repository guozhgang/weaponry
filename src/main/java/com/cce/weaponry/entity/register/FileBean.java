package com.cce.weaponry.entity.register;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import com.cce.modules.orm.IdEntity;

/**
 * The persistent class for the file_info database table.
 * 
 */
@Entity
@Table(name = "files")
public class FileBean extends IdEntity {
	private static final long serialVersionUID = 1L;
	private byte[] content;// 内容
	private String fileURI;// 文件路径
	private Date createDate;// 创建日期
	private String createBy;// 创建人
	private Date updateDate;// 更新日期
	private String updateBy;// 更新人
	private String fileType;// 文件类型:企业文件、信用档案管理文件、分级管理文件、培训文件、专家信息文件等。
	private String refID;// 引用编号

    public FileBean() {
    }

	@Column(length = 50)
	public String getCreateBy() {
		return createBy;
	}

	public void setCreateBy(String createBy) {
		this.createBy = createBy;
	}

	@Column(length = 50)
	public String getUpdateBy() {
		return updateBy;
	}

	public void setUpdateBy(String updateBy) {
		this.updateBy = updateBy;
	}

	public Date getUpdateDate() {
		return updateDate;
	}

	public void setUpdateDate(Date updateDate) {
		this.updateDate = updateDate;
	}

	public byte[] getContent() {
		return content;
	}

	public void setContent(byte[] content) {
		this.content = content;
	}

	public String getFileURI() {
		return fileURI;
	}

	public void setFileURI(String fileURI) {
		this.fileURI = fileURI;
	}

	public Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

	public String getFileType() {
		return fileType;
	}

	public void setFileType(String fileType) {
		this.fileType = fileType;
	}

	public String getRefID() {
		return refID;
	}

	public void setRefID(String refID) {
		this.refID = refID;
	}
}