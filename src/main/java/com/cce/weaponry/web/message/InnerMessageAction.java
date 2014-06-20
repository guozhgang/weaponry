package com.cce.weaponry.web.message;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.apache.struts2.convention.annotation.Namespace;
import org.springframework.beans.factory.annotation.Autowired;

import com.cce.modules.orm.IdEntity;
import com.cce.modules.orm.Page;
import com.cce.modules.security.springsecurity.SpringSecurityUtils;
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
public class InnerMessageAction extends JsonCrudActionSupport<InnerMessage> {
	private Map<String, Object> jsonMap = null;
	public static final String CRITERIA_ROLEID_WEB = "groups";

	@Autowired
	protected InnerMessageCrudService crudService;
	@Autowired
	private UserCrudService userCrudService;
	@Autowired
	private RegionManagementService regionManagementService;
	@Autowired
	private SenderMessageCrudService senderMessageCrudService;
	@Autowired
	private AttachmentService attachmentService;
	@Autowired
	private FileBeanService fileBeanService;
	public void newMsgNumber() {
		render(crudService.getNewMessagesCount(SpringSecurityUtils.getCurrentUserName()));
	}

	/**
	 * 查看收件箱
	 * 
	 * @throws Exception
	 */
	public void myInbox() throws Exception {
		WebFilterUtil filter = new WebFilterUtil();
		Page page = attachmentService.getInnMsg(CompanyUtils.setupPage(),
				filter.getFilterValue());
		List<Attachment> msg=page.getResult();
		InnerMessageVO vo;
		List<InnerMessageVO> vos = new ArrayList<InnerMessageVO>();
		for (Attachment m : msg) {
			vo = new InnerMessageVO();
			vo.setId(m.getInnerMessage().getId());
			vo.setCreateTime(m.getInnerMessage().getCreateTime());
			vo.setDueTime(m.getInnerMessage().getDueTime());
			if (null != m.getFile()) {
				vo.setFileId(m.getFile().getId().toString());
				vo.setFileName(fileBeanService.getFileNameById(m.getFile()
						.getId()));
			} else {
				vo.setFileId("");
				vo.setFileName("");
			}

			vo.setReceiver(m.getInnerMessage().getReceiver());
			vo.setSender(m.getInnerMessage().getSender());
			vo.setTopic(m.getInnerMessage().getTopic());
			vo.setContent(m.getInnerMessage().getContent());
			vos.add(vo);
		}
		page.setResult(vos);
		if (logger.isDebugEnabled()) {
			logger.debug("查看收件箱" + page);
		}
		this.render(page);
	}

	// 未读邮件数
	public void loadNoReadMsgNum() {
		Long unreadMail = crudService.getNewMessagesCount(SpringSecurityUtils
				.getCurrentUserName());
		if (logger.isDebugEnabled()) {
			logger.debug("主页面显示当前用户的未读邮件数" + unreadMail);
		}
		this.render(unreadMail);
	}
	@SuppressWarnings("unchecked")
	public InnerMessageVO getRequestMap() {
		String data = Struts2Utils.getParameter(JsonStore.RootProperty);
		System.out.println(data + "innerMessage");
		JSONDeserializer deserializer = this.getJsonDeserializer();
		JSONDeserializer<IdEntity> jsonDeserializer = deserializer.use(null,
				InnerMessageVO.class);
		return (InnerMessageVO) jsonDeserializer.deserialize(data);
	}

	/**
	 * 发送邮件;根据收件人(receiver: 群发{区域id};单一发送给用户{userName})
	 * 由于草稿箱得到的群发是区域名称;所以这里要解析所属区域的所有ID;来获得用户列表
	 * 
	 */
	@Override
	public void save() throws Exception {
		try {
			if (logger.isDebugEnabled()) {
				logger.debug("收件箱页面的发送邮件按钮");
			}
			User role=userCrudService.getLoginUser();
			if(null==role)
				return;
			boolean bl = false;
			InnerMessageVO entity = getRequestMap();
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
							tre = true;
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

				InnerMessage innerMessage;
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
				if (null != entity.getFileId()) {
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
	 * 删除收件箱邮件
	 * 
	 * @throws Exception
	 */
	public void deleteFromInbox() throws Exception {
		try {
			if (logger.isDebugEnabled()) {
				logger.debug("删除收件箱内容" + getIdArrayParam());
			}
			List<Long> ids = getIdArrayParam();
			if (ids != null && !ids.isEmpty()) {
				crudService.deleteFromInbox(ids);
				renderSuccess();
			} else
				throw new RuntimeException("参数错误,指定的数据不存在!");
		} catch (Exception e) {
			this.renderMessage(false, e.getMessage());
			logger.error(e.getMessage(), e);
		}
	}

	/**
	 * 删除发件箱邮件
	 * 
	 * @throws Exception
	 */
	public void deleteFromOutbox() throws Exception {
		try {
			List<Long> ids = getIdArrayParam();
			if (ids != null && !ids.isEmpty()) {
				crudService.deleteFromOutbox(ids);
				renderSuccess();
			} else
				throw new RuntimeException("参数错误,指定的数据不存在!");
		} catch (Exception e) {
			this.renderMessage(false, e.getMessage());
			logger.error(e.getMessage(), e);
		}
	}

	@Override
	public CrudServiceInterface<InnerMessage> getCrudService() {
		return crudService;
	}

	/**
	 * 标记已读邮件
	 */
	public void readMessage() {

		String data = Struts2Utils.getParameter("data"); // 获取读取邮件的id
		InnerMessage msg = crudService.get(Long.parseLong(data));
		msg.setDueTime(new Date());
		if (logger.isDebugEnabled()) {
			logger.debug("获取邮件id===" + data);
		}
		crudService.save(msg);
		/**
		 * 此时应当向数据空duttime更新该字段。返回一个true 或者 false即可
		 */

		this.render(true);
	}

}
