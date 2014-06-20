package com.cce.weaponry.entity.training;


import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;



@Entity
@Table(name = "SS_TRAINING_PROJECT")
public class Project {

	public static final long VOD = 1;
	public static final long DOC = 2;
	public static final long ONLINE = 3;

	private Long id;

	@Id
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}



	@Column(nullable = false, unique = true)
	private String title;// 标题
	private String description;// 描述
	private List<Entry> children;// = new ArrayList<Entry>();
	


	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}

	public void setChildren(List<Entry> entryList) {
		this.children = entryList;
	}

	@OneToMany
	@JoinColumn(name = "projectId", nullable = true)
	public List<Entry> getChildren() {
		return children;
	}

	
}
