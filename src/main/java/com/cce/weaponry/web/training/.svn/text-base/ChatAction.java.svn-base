package com.cce.weaponry.web.training;

import java.util.List;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.springframework.beans.factory.annotation.Autowired;

import com.cce.modules.web.json.JsonStore;
import com.cce.weaponry.entity.training.ChatMessage;
import com.cce.weaponry.service.training.ChatServiceImpl;
import com.cce.weaponry.web.JsonActionSupport;

@Namespace("/training")
@Action("chat")
public class ChatAction extends JsonActionSupport<ChatMessage> {

	@Autowired
	private ChatServiceImpl chatService;

	public Long getEntryId() {
		return entryId;
	}

	public void setEntryId(Long entryId) {
		this.entryId = entryId;
	}

	public Integer getMaxCount() {
		return maxCount;
	}

	public void setMaxCount(Integer maxCount) {
		this.maxCount = maxCount;
	}

	public ChatServiceImpl getChatService() {
		return chatService;
	}

	public void setChatService(ChatServiceImpl chatService) {
		this.chatService = chatService;
	}

	private String content;
	private Long entryId;
	private Integer maxCount;
	
	


	public void submit() {
		Debug.printRequest(this.getClass().getName() + " submit");

		chatService.submit(entryId, content);
		this.renderSuccess();
	}

	public void list() {
		Debug.printRequest(this.getClass().getName() + " list");

		if (maxCount == null) {
			maxCount = 30;
		}
		List<ChatMessage> list = chatService.getLast(entryId, maxCount);
		JsonStore store = new JsonStore(list);

		this.render(store);
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getContent() {
		return content;
	}
}
