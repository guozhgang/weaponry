package com.cce.weaponry.entity.train;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.cce.modules.orm.IdEntity;

/**
 * The persistent class for the online_training database table.
 * 
 */
@Entity
@Table(name="online_training")
public class OnlineTraining extends IdEntity {
	private static final long serialVersionUID = 1L;

	private String content;// 内容
	private String name;// 名称
	private String type;// 类型
	private List<TraningHistory> traningHistories = new ArrayList<TraningHistory>();

    public OnlineTraining() {
    }

	@Column(name = "OT_Content", length = 500)
	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	@Column(name = "OT_Name", length = 50)
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Column(name = "OT_Type", length = 50)
	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	//bi-directional many-to-one association to TraningHistory
	@OneToMany(mappedBy="onlineTraining")
	public List<TraningHistory> getTraningHistories() {
		return this.traningHistories;
	}

	public void setTraningHistories(List<TraningHistory> traningHistories) {
		this.traningHistories = traningHistories;
	}
	
}