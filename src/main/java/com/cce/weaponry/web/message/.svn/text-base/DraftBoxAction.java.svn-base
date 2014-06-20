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
import com.cce.weaponry.entity.message.DraftBox;
import com.cce.weaponry.entity.message.InnerMessage;
import com.cce.weaponry.entity.message.SenderMessage;
import com.cce.weaponry.entity.register.FileBean;
import com.cce.weaponry.entity.register.Region;
import com.cce.weaponry.entity.security.User;
import com.cce.weaponry.service.common.CompanyUtils;
import com.cce.weaponry.service.common.RegionManagementService;
import com.cce.weaponry.service.message.AttachmentService;
import com.cce.weaponry.service.message.DraftBoxCrudService;
import com.cce.weaponry.service.message.InnerMessageCrudService;
import com.cce.weaponry.service.message.SenderMessageCrudService;
import com.cce.weaponry.service.register.FileBeanService;
import com.cce.weaponry.service.security.UserCrudService;
import com.cce.weaponry.web.JsonCrudActionSupport;
import com.cce.weaponry.web.util.WebFilterUtil;
import com.cce.weaponry.web.vo.message.InnerMessageVO;

import flexjson.JSONDeserializer;

@Namespace("/message")
public class DraftBoxAction extends JsonCrudActionSupport<DraftBox> {

	@Autowired
	protected DraftBoxCrudService draftBoxCrudService;
	@Autowired
	protected RegionManagementService regionManagementService;
	@Autowired
	protected UserCrudService userCrudService;
	@Autowired
	private AttachmentService attachmentService;
	@Autowired
	private FileBeanService fileBeanService;
	@Autowired
	private SenderMessageCrudService senderMessageCrudService;
	@Autowired
	private InnerMessageCrudService crudService;
	@Override
	public CrudServiceInterface<DraftBox> getCrudService() {
		return draftBoxCrudService;
	}

	public InnerMessageVO getRequestMap() {
		String data = Struts2Utils.getParameter(JsonStore.RootProperty);
		JSONDeserializer deserializer = this.getJsonDeserializer();
		JSONDeserializer<IdEntity> jsonDeserializer = deserializer.use(null,
				InnerMessageVO.class);
		return (InnerMessageVO) jsonDeserializer.deserialize(data);
	}

	/**
	 * 发送草稿箱邮件
	 * 
	 * @throws Exception
	 */
	public void sendMsg() throws Exception {
		try {
			if (logger.isDebugEnabled()) {
				logger.debug("草稿箱页面发送邮件");
			}
			User role = userCrudService.getLoginUser();
			if (null == role)
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
					int j=0;
					boolean tre = true;
					for (int i=0;i<username.length;i++) {
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
							allName.append(str[0]);
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
				/**
				 * 发送草稿箱邮件后删除草稿箱信息
				 */
				if (null != entity.getId() && !"".equals(entity.getId())) {
					List<Long> list = new ArrayList<Long>();
					list.add(entity.getId());
					List<Long> ids = attachmentService.getAttByDrafBoxID(list);
					if (null != ids && ids.size() > 0) {
						attachmentService.delete(ids);
						draftBoxCrudService.delete(list);
					}
				}

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
	@Override
	public void save() {
		try {
			String data = Struts2Utils.getParameter(JsonStore.RootProperty);
			if (logger.isDebugEnabled()) {
				logger.debug("保存草稿" + data);
			}
			JSONDeserializer deserializer = this.getJsonDeserializer();
			JSONDeserializer<IdEntity> jsonDeserializer = deserializer.use(
					null, InnerMessageVO.class);
			InnerMessageVO entity = (InnerMessageVO) jsonDeserializer
					.deserialize(data);
			if (null == entity.getId()) {
			if (null == entity.getTopic() || "".equals(entity.getTopic())) {
					this.renderMessage(false, "标题不允许为空");
					System.out.println("标题不允许为空");
				return;
				}
			}
			DraftBox box;
			if (null == entity.getId()) {
				box = new DraftBox();
			} else {
				box = draftBoxCrudService.get(entity.getId());
			}
			if (null != entity.getContent() && !"".equals(entity.getContent())) {
				box.setContent(entity.getContent());
			}
			if (null != entity.getReceiver()
					&& !"".equals(entity.getReceiver())) {
				box.setReceiver(entity.getReceiver());
			}
			if (null != entity.getTopic() && !"".equals(entity.getTopic())) {
				box.setTopic(entity.getTopic());
			}
			draftBoxCrudService.save(box);
			FileBean file = null;
			if (null != entity.getFileId() && !"".equals(entity.getFileId())) {
				file = fileBeanService.get(Long.parseLong(entity.getFileId()));

			}
			Attachment at = null;
			if (null == draftBoxCrudService.get(box.getId()).getAttachment()) {
				at = new Attachment();
			} else {
				at = box.getAttachment().get(0);
				if (null != entity.getFileId()
						&& !"".equals(entity.getFileId())) {
					file = fileBeanService.get(Long.parseLong(entity
							.getFileId()));

				} else if (null != at.getFile()) {
					file = fileBeanService.get(at.getFile().getId());
				}
			}
			at.setFile(file);
			at.setDraftBox(box);
			attachmentService.save(at);
			this.renderMessage(true, "草稿保存成功");
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	@Override
	public void delete() throws Exception {
		if (logger.isDebugEnabled()) {
			logger.debug("删除草稿箱邮件ids" + getIdArrayParam());
		}
		List<Long> ids = attachmentService.getAttByDrafBoxID(getIdArrayParam());
		if (ids.size() > 0) {
			attachmentService.delete(ids);
		}
		draftBoxCrudService.delete(getIdArrayParam());
		renderMessage(true, "删除成功");
	}

	/**
	 * 查看草稿箱
	 */
	@Override
	public void list() {
		WebFilterUtil filter = new WebFilterUtil();
		Page page = attachmentService.getDraftBox(CompanyUtils.setupPage(),
				filter.getFilterValue());
		List<Attachment> ctlist = page.getResult();
		List<InnerMessageVO> list = new ArrayList<InnerMessageVO>();
		InnerMessageVO db;
		for (Attachment d : ctlist) {
			db = new InnerMessageVO();
			db.setContent(d.getDraftBox().getContent());
			db.setCreateTime(d.getDraftBox().getCreateTime());
			db.setId(d.getDraftBox().getId());
			db.setSender(d.getDraftBox().getSender());
			db.setTopic(d.getDraftBox().getTopic());
			if (null != d.getFile()) {
				db.setFileId(d.getFile().getId().toString());
				db.setFileName(fileBeanService.getFileNameById(d.getFile()
						.getId()));
			} else {
				db.setFileId("");
				db.setFileName("");
			}
			if (null != d.getDraftBox().getReceiver()
					&& !"".equals(d.getDraftBox().getReceiver())) {
			if (d.getDraftBox().getReceiver().matches("\\d*")) {
					Region r = regionManagementService.getRegion(Long
							.parseLong(d
							.getDraftBox()
							.getReceiver()));
					if (null != r) {
					List<Long> ids = regionManagementService.getById(Long
						.parseLong(d.getDraftBox().getReceiver()));
						List<User> users = userCrudService.getByids(ids);
						String str = regionManagementService.getStr(Long
								.parseLong(d.getDraftBox().getReceiver()));
						db.setReceiver(str);
					} else {
						db.setReceiver(d.getDraftBox().getReceiver());
					}
			} else {
				db.setReceiver(d.getDraftBox().getReceiver());
				}
			} else {
				db.setReceiver("");
			}
				list.add(db);
			}
		page.setResult(list);
		if (logger.isDebugEnabled()) {
			logger.debug("查看草稿箱邮件" + list);
		}
		render(getJsonSerializer().serialize(new JsonStore(page)));
	}
}
