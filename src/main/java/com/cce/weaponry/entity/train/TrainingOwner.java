package com.cce.weaponry.entity.train;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.cce.modules.orm.IdEntity;
import com.cce.weaponry.entity.register.FileBean;

/**
 * The persistent class for the training_owner database table.
 * 
 */
@Entity
@Table(name="training_owner")
public class TrainingOwner extends IdEntity {
	private static final long serialVersionUID = 1L;

	private String address;// 地址
	private String course;// 课程
	private String job;// 
	private String mail;// 电子邮件
	private String mobile;// 手机
	private String name;// 名称
	private String zipcode;// 邮政编码
	private FileBean fileInfo;// 文件类型
	private List<TraningHistory> traningHistories = new ArrayList<TraningHistory>();

    public TrainingOwner() {
    }

	@Column(name = "TO_Address", length = 200)
	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	@Column(name = "TO_Course", length = 200)
	public String getCourse() {
		return course;
	}

	public void setCourse(String course) {
		this.course = course;
	}

	@Column(name = "TO_Job", length = 200)
	public String getJob() {
		return job;
	}

	public void setJob(String job) {
		this.job = job;
	}

	@Column(name = "TO_Mail", length = 200)
	public String getMail() {
		return mail;
	}

	public void setMail(String mail) {
		this.mail = mail;
	}

	@Column(name = "TO_Mobile", length = 11)
	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	@Column(name = "TO_Name", length = 50)
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Column(name = "TO_Zipcode", length = 6)
	public String getZipcode() {
		return zipcode;
	}

	public void setZipcode(String zipcode) {
		this.zipcode = zipcode;
	}

	//bi-directional many-to-one association to FileInfo
    @ManyToOne
	@JoinColumn(name="Resume")
	public FileBean getFileInfo() {
		return this.fileInfo;
	}

	public void setFileInfo(FileBean fileInfo) {
		this.fileInfo = fileInfo;
	}
	

	//bi-directional many-to-one association to TraningHistory
	@OneToMany(mappedBy="trainingOwner")
	public List<TraningHistory> getTraningHistories() {
		return this.traningHistories;
	}

	public void setTraningHistories(List<TraningHistory> traningHistories) {
		this.traningHistories = traningHistories;
	}
	
}