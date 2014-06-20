package com.cce.weaponry.entity.message;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Lob;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.cce.modules.orm.IdEntity;

/**
 * 草稿箱
 * 
 */
@Entity
@Table(name = "DRAFT_BOX")
public class DraftBox extends IdEntity {
	String sender;// 发送者
	String receiver;// 接收者
	String topic;// 主题
	String content;// 内容
	String groups;// 组
	Date createTime;// 创建时间
	private List<Attachment> attachment;// 附件

	@OneToMany(mappedBy = "draftBox", cascade = CascadeType.REMOVE)
	public List<Attachment> getAttachment() {
		return attachment;
	}

	public void setAttachment(List<Attachment> attachment) {
		this.attachment = attachment;
	}

	@Column(length = 50)
	public String getGroups() {
		return groups;
	}

	public void setGroups(String groups) {
		this.groups = groups;
	}

	@Override
	public Object clone() throws CloneNotSupportedException {
		return super.clone();
	}

	@Column(length = 20)
	public String getSender() {
		return sender;
	}

	public void setSender(String sender) {
		this.sender = sender;
	}

	@Column(length = 200)
	public String getReceiver() {
		return receiver;
	}

	public void setReceiver(String receiver) {
		this.receiver = receiver;
	}

	@Column(length = 100)
	public String getTopic() {
		return topic;
	}

	public void setTopic(String topic) {
		this.topic = topic;
	}

	@Column(length = 6000000)
	@Lob
	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	@Column(name = "create_time")
	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

}
