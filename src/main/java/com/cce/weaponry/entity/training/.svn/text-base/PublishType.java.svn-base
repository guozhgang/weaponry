package com.cce.weaponry.entity.training;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "SS_TRAINING_P_TYPE")
public class PublishType {

	public final static Long PLAY = 2L;
	public final static Long DOWNLOAD = 1L;

	@Id
	public Long getId() {
		return this.id;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getName() {
		return name;
	}

	private Long id;

	public void setId(Long id) {
		this.id = id;
	}

	private String name;

}
