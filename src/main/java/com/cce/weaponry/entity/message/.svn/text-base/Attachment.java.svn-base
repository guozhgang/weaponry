package com.cce.weaponry.entity.message;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.cce.modules.orm.IdEntity;
import com.cce.weaponry.entity.register.FileBean;

@Entity
@Table(name = "ATTACHMENT")
public class Attachment extends IdEntity {
	private InnerMessage innerMessage;
	private DraftBox draftBox;
	private SenderMessage senderMessage;
	private FileBean file;

	@ManyToOne
	@JoinColumn(name = "SENDBOX_ID")
	public SenderMessage getSenderMessage() {
		return senderMessage;
	}

	public void setSenderMessage(SenderMessage senderMessage) {
		this.senderMessage = senderMessage;
	}

	@ManyToOne
	@JoinColumn(name = "DRAFTBOX_ID")
	public DraftBox getDraftBox() {
		return draftBox;
	}

	public void setDraftBox(DraftBox draftBox) {
		this.draftBox = draftBox;
	}

	@ManyToOne
	@JoinColumn(name = "INNERBOX_ID")
	public InnerMessage getInnerMessage() {
		return innerMessage;
	}

	public void setInnerMessage(InnerMessage innerMessage) {
		this.innerMessage = innerMessage;
	}

	@ManyToOne
	@JoinColumn(name = "FILE_ID")
	public FileBean getFile() {
		return file;
	}

	public void setFile(FileBean file) {
		this.file = file;
	}
}
