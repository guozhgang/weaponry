package com.cce.weaponry.entity.training;

import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.cce.modules.orm.IdEntity;
import com.cce.weaponry.entity.security.User;

/*
 * 培训师 
 */

@Table(name = "SS_TRAINING_TEACHER")
public class Teacher extends IdEntity {


	private User user;
	private String OtherInfo;
	public void setUser(User user) {
		this.user = user;
	}

	@OneToOne
	@JoinColumn(name = "USER_ID")
	public User getUser() {
		return user;
	}

	public void setOtherInfo(String otherInfo) {
		OtherInfo = otherInfo;
	}
	public String getOtherInfo() {
		return OtherInfo;
	}
}
