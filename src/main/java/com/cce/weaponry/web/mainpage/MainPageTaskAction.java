package com.cce.weaponry.web.mainpage;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.springframework.beans.factory.annotation.Autowired;

import com.cce.modules.orm.Page;
import com.cce.modules.security.springsecurity.SpringSecurityUtils;
import com.cce.modules.service.CrudServiceInterface;
import com.cce.weaponry.entity.security.User;
import com.cce.weaponry.service.common.RegionManagementService;
import com.cce.weaponry.service.credit.Approval4CreditService;
import com.cce.weaponry.service.level.Approval4LevelService;
import com.cce.weaponry.service.message.InnerMessageCrudService;
import com.cce.weaponry.service.register.Approval4RegisterService;
import com.cce.weaponry.service.security.UserCrudService;
import com.cce.weaponry.web.JsonCrudActionSupport;
import com.cce.weaponry.web.util.WebFilterUtil;
import com.cce.weaponry.web.vo.mainpage.MainPageTaskVO;

@Namespace("/mainpage")
@Action("task")
public class MainPageTaskAction extends JsonCrudActionSupport<MainPageTaskVO> {
	@Autowired
	protected UserCrudService userCrudService;

	@Autowired
	private Approval4RegisterService registerService;

	@Autowired
	private Approval4CreditService creditService;

	@Autowired
	protected InnerMessageCrudService innerMessageCrudService;
	@Autowired
	protected Approval4LevelService approval4LevelService;
	@Autowired
	protected RegionManagementService regionManagementService;
	@Override
	public CrudServiceInterface<MainPageTaskVO> getCrudService() {
		// TODO Auto-generated method stub
		return null;
	}

	public void getMyTask() {
		Page levelvos = null;
		MainPageTaskVO vo = new MainPageTaskVO();
		Long unreadMail = innerMessageCrudService
				.getNewMessagesCount(SpringSecurityUtils
				.getCurrentUserName());
		vo.setUnreadMail(Integer.parseInt(unreadMail.toString()));// 未读邮件
		WebFilterUtil filter = new WebFilterUtil();

		User user = userCrudService.getLoginUser();
		String roleName = user.getRole().getName();
		Page butch = null;
		Page product = null;
		Page finance = null;
		Page disease = null;
		Long num = null;

			renderMessage(true, vo.toString());
			return;
	}
}
