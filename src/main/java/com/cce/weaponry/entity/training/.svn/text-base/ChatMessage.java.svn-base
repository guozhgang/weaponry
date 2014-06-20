package com.cce.weaponry.entity.training;

import java.text.SimpleDateFormat;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.cce.modules.orm.IdEntity;

@Entity
@Table(name = "SS_TRAINING_CHAT")
public class ChatMessage extends IdEntity {

	public Date getTime() {
		return time;
	}

	public void setTime(Date time) {
		this.time = time;
	}

	@Column(length = 2000)
	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	// @ManyToOne
	// @JoinColumn(name = "USER_ID", nullable = true)
	// public User getUser() {
	// return user;
	// }
	//
	// public void setUser(User user) {
	// this.user = user;
	// }

	// public Entry getEntry() {
	// return entry;
	// }
	//
	// public void setEntry(Entry entry) {
	// this.entry = entry;
	// }
	public void setEntryId(Long entryId) {
		this.entryId = entryId;
	}

	public Long getEntryId() {
		return entryId;
	}

	private Date time;

	private String content;
	private Long userId;
	private String userName;

	private Long entryId;

	private String timeString;

	@Transient
	public String getTimeString() {
		SimpleDateFormat formatter;

		formatter = new SimpleDateFormat("yyyy-MM-dd kk:mm:ss");
		timeString = formatter.format(this.time);

		return timeString;
	}


	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getUserName() {
		return userName;
	}

}
