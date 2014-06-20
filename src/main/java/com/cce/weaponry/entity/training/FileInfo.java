package com.cce.weaponry.entity.training;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.cce.modules.orm.IdEntity;

@Entity
@Table(name = "SS_TRAINING_FILE")
public class FileInfo extends IdEntity {

	private String name;// 名称
	private String title;// 标题


	private Long ownerUserId;

	private FileTypeInfo type;// 类型

	private Date uploadTime;// 更新日期
	private String uploadName;// 

	public Date getUploadTime() {
		return uploadTime;
	}


	public void setUploadTime(Date uploadTime) {
		this.uploadTime = uploadTime;
	}

	@Column(nullable = false, unique = true)
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Column(nullable = false, unique = true)
	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	@ManyToOne
	public FileTypeInfo getType() {
		return type;
	}

	public void setType(FileTypeInfo type) {
		this.type = type;
	}

	public void setUploadName(String uploadName) {
		this.uploadName = uploadName;
	}


	public String getUploadName() {
		return uploadName;
	}

	@Transient
	public String getTimeString() {

		return DateTimeConvert.toString(uploadTime);
	}

	private String typeName;

	public void setTypeName(String typeName) {
		this.typeName = typeName;
	}
	public String getTypeName() {

		return typeName;
	}
	// switch (this.fileType) {
	// case 1:
	// return "DOC";
	// case 2:
	// return "VIDEO";
	//
	// }
	// return "未知类型";
	// }
	//
	// @Transient
	// public Integer getTypeId() {
	//
	// return this.fileType();
	// }


	@Column(nullable = true)
	public void setOwnerUserId(Long id) {
		this.ownerUserId = id;
	}

	// @OneToOne
	// @JoinColumn(name = "OWNER_USER_ID", nullable = true)
	public Long getOwnerUserId() {
		return this.ownerUserId;
	}



}
