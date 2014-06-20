package com.cce.weaponry.web.message;

import java.util.ArrayList;
import java.util.List;

import org.apache.struts2.convention.annotation.Namespace;
import org.springframework.beans.factory.annotation.Autowired;

import com.cce.modules.orm.IdEntity;
import com.cce.modules.orm.Page;
import com.cce.modules.service.CrudServiceInterface;
import com.cce.modules.web.json.JsonStore;
import com.cce.modules.web.struts2.Struts2Utils;
import com.cce.weaponry.entity.message.Attachment;
import com.cce.weaponry.entity.message.InnerMessage;
import com.cce.weaponry.entity.message.SenderMessage;
import com.cce.weaponry.entity.register.FileBean;
import com.cce.weaponry.entity.security.User;
import com.cce.weaponry.service.common.CompanyUtils;
import com.cce.weaponry.service.common.RegionManagementService;
import com.cce.weaponry.service.message.AttachmentService;
import com.cce.weaponry.service.message.InnerMessageCrudService;
import com.cce.weaponry.service.message.SenderMessageCrudService;
import com.cce.weaponry.service.register.FileBeanService;
import com.cce.weaponry.service.security.UserCrudService;
import com.cce.weaponry.web.JsonCrudActionSupport;
import com.cce.weaponry.web.util.WebFilterUtil;
import com.cce.weaponry.web.vo.message.InnerMessageVO;

import flexjson.JSONDeserializer;

@Namespace("/message")
public class SenderMessageAction extends JsonCrudActionSupport<SenderMessage> {

	@Autowired
	protected SenderMessageCrudService senderMessageCrudService;
	@Autowired
	protected RegionManagementService regionManagementService;
	@Autowired
	protected UserCrudService userCrudService;
	@Autowired
	protected AttachmentService attachmentService;
	@Autowired
	protected FileBeanService fileBeanService;
	@Autowired
	protected InnerMessageCrudService crudService;
	@Override
	public CrudServiceInterface<SenderMessage> getCrudService() {
		return senderMessageCrudService;
	}

	/**
	 * 发送邮件
	 */
	@Override
	public void save() {
		try {
			if (logger.isDebugEnabled()) {
				logger.debug("发件箱页面发送邮件");
			}
			User role = userCrudService.getLoginUser();
			if (null == role)
				return;
			boolean bl = false;
			String data = Struts2Utils.getParameter(JsonStore.RootProperty);
			System.out.println(data + "senderMessage");
			JSONDeserializer deserializer = this.getJsonDeserializer();
			JSONDeserializer<IdEntity> jsonDeserializer = deserializer.use(
					null, InnerMessageVO.class);
			InnerMessageVO entity = (InnerMessageVO) jsonDeserializer
					.deserialize(data);
			String str[] = null;
			StringBuilder allName = new StringBuilder();
			String successMsg = "";
			if (null == entity.getReceiver() || "".equals(entity.getReceiver()))
				return;
			if (entity.getReceiver().matches("\\d*")) {
				if (null != regionManagementService.getRegion(Long
						.parseLong(entity.getReceiver()))) {
					String regionName = regionManagementService
							.getNameById(Long.parseLong(entity.getReceiver()));
					List<Long> ids = regionManagementService.getById(Long
							.parseLong(entity.getReceiver()));
					List<User> user = userCrudService.getByids(ids);
					str = new String[user.size()];
					for (int i = 0; i < user.size(); i++) {
						str[i] = user.get(i).getLoginName();
					}
					if (user.size() > 0) {
						bl = true;
						allName.append(regionName);
						successMsg = "邮件发送成功";
					} else {
						bl = false;
						this.renderMessage(false, "该区域下暂时还没有用户");
						return;
					}
				} else {
					bl = false;
					this.renderMessage(false, "该区域不存在");
					return;
				}
			} else {
				if (entity.getReceiver().indexOf(",") > 0) {
					String[] username = entity.getReceiver().split(",");
					int t = 0;
					int j = 0;
					boolean tre = true;
					for (int i = 0; i < username.length; i++) {
						User u = userCrudService
								.findUserByLoginName(username[i]);
						if (null != u) {
							tre = false;
							username[i] = u.getLoginName();
							t++;
						} else {
							username[i] = null;
						}
					}
					if (tre) {
						this.renderMessage(false, "收件人不存在;请确认后发送");
						return;
					}
					String[] trueName = new String[t];

					for (int i = 0; i < username.length; i++) {
						if (username[i] != null) {
							trueName[j] = username[i];
							allName.append(trueName[j] + ",");
							j++;
						}
					}
					bl = true;
					allName.deleteCharAt(allName.lastIndexOf(","));
					str = new String[trueName.length];
					str = trueName;
					successMsg = "邮件已成功发送至用户" + allName;
				} else {
					if (null != regionManagementService.getIdByName(entity
							.getReceiver())) {
						Long id = regionManagementService.getIdByName(
								entity.getReceiver()).getId();
						List<Long> idlist = regionManagementService.getById(id);

						if (!"管理员".equals(role.getRole().getName())
								&& !"省级用户".equals(role.getRole().getName())) {
							List<Long> userids = regionManagementService
									.getById(role.getRegion().getId());
							for (Long ids : idlist) {
								if (!userids.contains(ids)) {
									this.renderMessage(false, "请勿手动录入地区");
									return;
								}
							}
						}
						List<User> user = userCrudService.getByids(idlist);
						str = new String[user.size()];
						for (int i = 0; i < user.size(); i++) {

							str[i] = user.get(i).getLoginName();
							allName.append(str[i] + ",");
						}
						if (user.size() > 0) {
							successMsg = "邮件发送成功";
							allName.deleteCharAt(allName.lastIndexOf(","));
							bl = true;
						} else {
							bl = false;
						}
					} else {
						User user = userCrudService.findUserByLoginName(entity
								.getReceiver());
						if (null != user) {
							str = new String[1];
							str[0] = user.getLoginName();
							allName.append(user.getLoginName());
							bl = true;
							successMsg = "邮件已成功发送至" + str[0];
						} else {
							bl = false;
							this.renderMessage(false, "收件人不存在;请确认后发送");
							return;
						}
					}
				}
			}

			if (bl) {
				InnerMessage innerMessage = null;
				FileBean file = null;
				if (null != entity.getFileId()
						&& !"".equals(entity.getFileId())) {
					file = fileBeanService.get(Long.parseLong(entity
							.getFileId()));
				}

				SenderMessage msg = new SenderMessage();
				msg.setContent(entity.getContent());
				msg.setReceiver(allName.toString());
				msg.setTopic(entity.getTopic());
				senderMessageCrudService.save(msg);
				Attachment at = new Attachment();
				at.setSenderMessage(msg);
				if (null != entity.getFileId()
						&& !"".equals(entity.getFileId())) {
					at.setFile(file);
				}

				attachmentService.save(at);
				String top = entity.getTopic();
				String cont = entity.getContent();
				for (int i = 0; i < str.length; i++) {
					innerMessage = new InnerMessage();
					at = new Attachment();
					innerMessage.setReceiver(str[i]);
					innerMessage.setContent(cont);
					innerMessage.setTopic(top);
					crudService.save(innerMessage);
					at.setInnerMessage(innerMessage);
					if (null != entity.getFileId()
							&& !"".equals(entity.getFileId())) {
						at.setFile(file);
					}
					attachmentService.save(at);
				}
				this.renderMessage(bl, successMsg);
			} else {
				this.renderMessage(false, "收件人不存在;请确认后发送");
				return;
			}
			if (entity == null)
				throw new RuntimeException("参数错误,指定的数据不存在!");
		} catch (Exception e) {
			this.renderMessage(false, e.getMessage());
			logger.error(e.getMessage(), e);
		}
	}

	/**
	 * 查看发件箱邮件
	 */
	public void myOutbox() {
		WebFilterUtil filter=new WebFilterUtil();
		String aa = (String) filter.getFilterValue();
		Page page = attachmentService.getSenderMsg(CompanyUtils
				.setupPage(), filter.getFilterValue());

		List<Attachment> mslist = page.getResult();
		List<InnerMessageVO> list = new ArrayList<InnerMessageVO>();
		InnerMessageVO msg;
		for (Attachment s : mslist) {
			msg = new InnerMessageVO();
			msg.setContent(s.getSenderMessage().getContent());
			msg.setId(s.getSenderMessage().getId());
			msg.setTopic(s.getSenderMessage().getTopic());
			msg.setSender(s.getSenderMessage().getSender());
			msg.setCreateTime(s.getSenderMessage().getCreateTime());
			if (null != s.getFile()) {
				msg.setFileId(s.getFile().getId().toString());
				msg.setFileName(fileBeanService.getFileNameById(s.getFile()
						.getId()));
			} else {
				msg.setFileId("");
				msg.setFileName("");
			}
			if (null != s.getSenderMessage().getReceiver()
					&& !"".equals(s.getSenderMessage().getReceiver())) {
				if (s.getSenderMessage().getReceiver().matches("\\d*")) {
					String str = regionManagementService.getStr(Long
							.parseLong(s.getSenderMessage().getReceiver()));
					msg.setReceiver(str);
				} else {
					msg.setReceiver(s.getSenderMessage().getReceiver());
				}
			} else {
				msg.setReceiver("");
			}
			list.add(msg);
		}
		page.setResult(list);
		if (logger.isDebugEnabled()) {
			logger.debug("查看发件箱内容" + page);
		}
		this.render(getJsonSerializer().serialize(new JsonStore(page)));
	}

	/**
	 * 删除发件箱邮件
	 * 
	 * @throws Exception
	 */
	public void deleteFromOutbox() throws Exception {
		try {
			if (logger.isDebugEnabled()) {
				logger.debug("删除发件箱内容" + getIdArrayParam());
			}
			List<Long> ids = getIdArrayParam();
			List<Long> list = attachmentService.getAttBySenderMessageID(ids);
			if (list.size() > 0) {
				attachmentService.delete(list);
			}
			if (ids != null && !ids.isEmpty()) {
				senderMessageCrudService.deleteFromOutbox(ids);
				renderSuccess();
			} else
				throw new RuntimeException("参数错误,指定的数据不存在!");
		} catch (Exception e) {
			this.renderMessage(false, e.getMessage());
			logger.error(e.getMessage(), e);
		}
	}
}
