package com.cce.weaponry.web.level;

import java.util.Date;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.springframework.beans.factory.annotation.Autowired;

import com.cce.modules.orm.IdEntity;
import com.cce.modules.orm.Page;
import com.cce.modules.service.CrudServiceInterface;
import com.cce.modules.web.json.JsonStore;
import com.cce.modules.web.struts2.Struts2Utils;
import com.cce.weaponry.entity.level.CheckMember;
import com.cce.weaponry.service.level.CheckMemberService;
import com.cce.weaponry.web.JsonCrudActionSupport;
import com.cce.weaponry.web.vo.level.ProfessorInfoVO;

import flexjson.JSONDeserializer;

@Namespace("/info")
@Action("checkMember")

public class CheckMemberAction extends JsonCrudActionSupport<CheckMember> {
	@Autowired
	protected CheckMemberService checkMemberService;

	@Override
	public CrudServiceInterface<CheckMember> getCrudService() {
		// TODO Auto-generated method stub
		return checkMemberService;
	}

	/**
	 * 列表显示地区的审核成员
	 */
	@Override
	public void list() throws Exception {
		Page<CheckMember> list = checkMemberService.getall(this.setupPage());
		render(getJsonSerializer().serialize(new JsonStore(list)));
	}

	@Override
	public void save() throws Exception {
		try {
			ProfessorInfoVO entity = this.getProfessorInfoVO();
			CheckMember cm;
			if (null == entity.getId() || "".equals(entity.getId())) {
				cm = new CheckMember();
				cm.setCreateDate(new Date());
			} else {
				cm = checkMemberService.get(entity.getId());
			}
			cm.setAddress(entity.getAddress());
			cm.setDuty(entity.getDuty());
			cm.setMail(entity.getMail());
			cm.setMobile(entity.getMobile());
			cm.setName(entity.getName());
			cm.setCertificate(entity.getCertificate());
			cm.setZipcode(entity.getZipcode());
			checkMemberService.save(cm);
			entity.setId(cm.getId());
			entity.setCreateDate(cm.getCreateDate());
			if (entity != null) {
				this.render(getJsonSerializer().serialize(new JsonStore(entity)));
			} else
				throw new RuntimeException("参数错误,指定的数据不存在!");
		} catch (Exception e) {
			this.renderMessage(false, e.getMessage());
			logger.error(e.getMessage(), e);
		}
	}

	@SuppressWarnings("unchecked")
	public ProfessorInfoVO getProfessorInfoVO() {
		String data = Struts2Utils.getParameter(JsonStore.RootProperty);
		if (data == null)
			return null;
		JSONDeserializer deserializer = this.getJsonDeserializer();
		JSONDeserializer<IdEntity> jsonDeserializer = deserializer.use(null, ProfessorInfoVO.class);
		return (ProfessorInfoVO) jsonDeserializer.deserialize(data);
	}
}
