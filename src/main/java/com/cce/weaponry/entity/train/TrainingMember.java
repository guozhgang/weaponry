package com.cce.weaponry.entity.train;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import com.cce.modules.orm.IdEntity;

/**
 * The persistent class for the training_members database table.
 * 
 */
@Entity
@Table(name="training_members")
public class TrainingMember extends IdEntity {
	private static final long serialVersionUID = 1L;

	private String attend;

	@Column(name = "TM_Attend", length = 200)
	public String getAttend() {
		return attend;
	}

	public void setAttend(String attend) {
		this.attend = attend;
	}

	public TrainingMember() {
	}
}