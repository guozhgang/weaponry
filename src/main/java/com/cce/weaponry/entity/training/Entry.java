package com.cce.weaponry.entity.training;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.cce.modules.orm.IdEntity;
import com.cce.weaponry.entity.security.Role;

@Entity
@Table(name = "SS_TRAINING_ENTRY")
public class Entry extends IdEntity {

	public static final int FILE = 1;
	public static final int DIR = 2;
	public List<Role> roleList = new ArrayList<Role>();

	/**
	 * @return the roleList
	 */
	@ManyToMany(cascade = CascadeType.REMOVE)
	@JoinTable(name = "SS_TRAINING_ROLE", joinColumns = { @JoinColumn(name = "TRIN_ID") }, inverseJoinColumns = { @JoinColumn(name = "ROLE_ID") })
	public List<Role> getRoleList() {
		return roleList;
	}

	/**
	 * @param roleList
	 *            the roleList to set
	 */
	public void setRoleList(List<Role> roleList) {
		this.roleList = roleList;
	}

	@OneToOne
	@JoinColumn(name = "REF_ID")
	public FileInfo getRefFile() {
		return this.refFile;
	}

	public void setRefFile(FileInfo fi) {
		this.refFile = fi;
	}

	public int getType() {
		return type;
	}

	public void setType(int type) {
		this.type = type;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public Date getPublishTime() {
		return publishTime;
	}

	public void setPublishTime(Date publishTime) {
		this.publishTime = publishTime;
	}

	public void setPublishType(PublishType type) {
		this.publishType = type;
	}

	@ManyToOne
	public PublishType getPublishType() {
		return publishType;
	}

	public void setProjectId(long projectId) {
		this.projectId = projectId;
	}

	public long getProjectId() {
		return projectId;
	}

	// public void setResource(Resource resource) {
	// this.resource = resource;
	// }

	// @OneToOne
	// @JoinColumn(name = "RESOURCE_ID")
	// public Resource getResource() {
	// return resource;
	// }
	//
	
	public void setParent(Entry parent) {
		this.parent = parent;
	}

	@ManyToOne
	@JoinColumn(name = "PARENT_ID", nullable = true)
	public Entry getParent() {
		return parent;
	}

	// @OneToMany(mappedBy = "parent")
	// public List<Entry> getChildren() {
	// return this.children;
	// }


	private FileInfo refFile;
	private int type;
	private long projectId;
	private PublishType publishType;
	private Entry parent;
	private String title;
	private Date publishTime;
	private Date startTime;
	private Date endTime;
	// private List<Entry> children;
	// // private Resource resource;

	// public void setChildren(List<Entry> children) {
	// this.children = children;
	// }

	// @Transient
	// public String getPublishTypeName() {
	//
	// return publishType.getName();
	// }

	@Transient
	public String getFileName() {
		return refFile.getTitle() + "[" + refFile.getName() + "]";
	}

	@Transient
	public String getName() {
		return refFile.getName();
	}

	private String url;

	public void setUrl(String url) {
		this.url = url;
	}

	@Transient
	public String getUrl() {
		return url;
	}

	// @Transient
	// public String getUrl() {
	// String code = "";
	// // refFile.getType().getBaseUrl() +
	// if (1L == refFile.getType().getId()) {// TYPE_DOC
	// code = "doc_base_dir";
	// } else if (2L == refFile.getType().getId()) {// TYPE_VIDEO
	// code = "video_base_dir";
	// } else if (3L == refFile.getType().getId()) {// TYPE_ONLINE
	// code = "online_base_dir";
	// }
	// String baseUrl = "";
	// this.url = baseUrl + refFile.getName();
	// return url;
	// }

	/*
	 * 是否要新建一个entity 处理在线培训
	 */
	public void setStartTime(Date startTime) {
		this.startTime = startTime;
	}

	public Date getStartTime() {
		return startTime;
	}

	public void setEndTime(Date endTime) {
		this.endTime = endTime;
	}

	public Date getEndTime() {
		return endTime;
	}

	/*
	 * 使用了数字常量
	 */

	@Transient
	public int getStatus() {
		Date dt = new Date();
		if (startTime == null || endTime == null)
			return 0;

		if (dt.before(startTime))
			return 1;

		if (dt.after(startTime) && dt.before(endTime))
			return 2;

		return 0;
	}

	@Transient
	public String getStatusText() {
		switch (getStatus()) {
		case 1:
			return "培训未开始";
		case 2:
			return "培训开始";
		default:
			return "培训已经结束";

		}
	}

	@Transient
	String getStartTimeString() {
		return DateTimeConvert.toString(this.startTime);
	}

	@Transient
	String getEndTimeString() {
		return DateTimeConvert.toString(this.endTime);
	}

}
