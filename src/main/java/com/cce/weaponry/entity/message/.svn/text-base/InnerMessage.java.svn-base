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
 * 站内短信
 * 
 */
@Entity
@Table(name = "INNER_MESSAGE")
public class InnerMessage extends IdEntity implements Cloneable {
	String sender;// 发送者
	String receiver;// 接收者
	String topic;// 主题
	String content;// 内容
	int inbox; // 0:正常，3:从收件箱中删除
	int outbox; // 0:正常，3：从发件箱中删除
	Date createTime;
	Date dueTime;
	private List<Attachment> attachment;// 附件

	@OneToMany(mappedBy = "innerMessage", cascade = CascadeType.REMOVE)
	public List<Attachment> getAttachment() {
		return attachment;
	}

	public void setAttachment(List<Attachment> attachment) {
		this.attachment = attachment;
	}

	public int getInbox() {
		return inbox;
	}

	public void setInbox(int inbox) {
		this.inbox = inbox;
	}

	public int getOutbox() {
		return outbox;
	}

	public void setOutbox(int outbox) {
		this.outbox = outbox;
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

	@Column(name = "due_time")
	public Date getDueTime() {
		return dueTime;
	}

	public void setDueTime(Date dueTime) {
		this.dueTime = dueTime;
	}
}
