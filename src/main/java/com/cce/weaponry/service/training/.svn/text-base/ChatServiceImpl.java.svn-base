package com.cce.weaponry.service.training;

import java.util.Calendar;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cce.modules.security.springsecurity.SpringSecurityUtils;
import com.cce.weaponry.dao.training.ChatMessageDao;
import com.cce.weaponry.entity.security.User;
import com.cce.weaponry.entity.training.ChatMessage;
import com.cce.weaponry.service.security.UserCrudService;

@Service
@Transactional
public class ChatServiceImpl implements ChatService {

	@Autowired
	private ChatMessageDao msgDao;

	@Autowired
	private UserCrudService userService;

	public List<ChatMessage> getLast(Long entryId, int maxCount) {

		return msgDao.getLast(entryId, maxCount);
	}

	public User getCurrentUser() {
		String userName = SpringSecurityUtils.getCurrentUserName();
		User user = userService.findUserByLoginName(userName);
		return user;
	}

	public void submit(Long entryId, String content) {

		ChatMessage msg = new ChatMessage();
		User user = getCurrentUser();
		if (user != null) {
			msg.setUserId(user.getId());
			msg.setUserName(user.getName());
		}
		msg.setEntryId(entryId);
		msg.setContent(content);
		msg.setTime(Calendar.getInstance().getTime());
		msgDao.save(msg);
	}

}
