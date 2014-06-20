package com.cce.weaponry.web.level;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.springframework.beans.factory.annotation.Autowired;

import com.cce.modules.orm.IdEntity;
import com.cce.modules.orm.Page;
import com.cce.modules.security.springsecurity.SpringSecurityUtils;
import com.cce.modules.service.CrudServiceInterface;
import com.cce.modules.web.json.JsonStore;
import com.cce.modules.web.struts2.Struts2Utils;
import com.cce.weaponry.entity.level.CheckExpert;
import com.cce.weaponry.entity.level.CheckTeam;
import com.cce.weaponry.service.level.CheckExpertService;
import com.cce.weaponry.service.level.CheckTeamService;
import com.cce.weaponry.web.JsonCrudActionSupport;
import com.cce.weaponry.web.vo.level.ProfessorInfoVO;
import com.cce.weaponry.web.vo.level.ProfessorTeamVO;

import flexjson.JSONDeserializer;
import flexjson.JSONSerializer;

@Namespace("/info")
@Action("checkTeam")
public class CheckTeamAction extends JsonCrudActionSupport<CheckTeam> {
	@Autowired
	protected CheckTeamService checkTeamService;
	@Autowired
	protected CheckExpertService checkExpertService;
	private static List<Long> allId;
	private static List<Long> noId;
	private static List<Long> yesId;
	private static Long teamID;
	@Override
	public CrudServiceInterface<CheckTeam> getCrudService() {
		// TODO Auto-generated method stub
		return checkTeamService;
	}
	@Override
	public void delete() throws Exception {
		if (logger.isDebugEnabled()) {
			logger.debug("删除专家组ids" + getIdArrayParam());
		}
		if (getIdArrayParam().size() > 0) {
			for (Long id : getIdArrayParam()) {
				CheckTeam team = checkTeamService.get(id);
				if (team.getApproval4LevelList().size() > 0) {
					this.renderMessage(true, "审查组正在评审中;请勿删除");
					return;
				}
			}
			checkExpertService.updateIsNull(getIdArrayParam());
			checkTeamService.delete(getIdArrayParam());
			this.renderMessage(true, "删除组成功");
		}
	}
	@Override
	public void save() throws Exception {
		if (logger.isDebugEnabled()) {
		logger.debug("保存、修改专家组信息"
					+ Struts2Utils.getParameter(JsonStore.RootProperty));
		}
		try {
			boolean bl = false;
			ProfessorTeamVO entity = this.getProfessorTeamVO();
			CheckTeam ct = null;
			CheckTeam name = null;
			if (null == entity.getId() || "".equals(entity.getId())) {
				if (null == entity.getName()
						|| "".equals(entity.getName().trim())) {
					this.renderMessage(false, "审查组名称不可以为空  ");
					return;
				}
				name = checkTeamService.getByName(entity.getName().trim());
				if (null != name && !"".equals(name)) {
					this.renderMessage(false, "审查组名称不可以重复 ");
					return;
				}
				ct = new CheckTeam();
				ct.setName(entity.getName().trim());
				ct.setCreateBy(SpringSecurityUtils.getCurrentUserName());
				ct.setCreateDate(new Date());
				bl = false;
			} else {
				if (null == entity.getName()) {
					ct = checkTeamService.get(entity.getId());
					bl = true;
				} else if (!"".equals(entity.getName().trim())) {
					name = checkTeamService.getByName(entity.getName().trim());
					if (null != name && !"".equals(name)) {
						this.renderMessage(false, "审查组名称不可以重复 ");
						return;
					}
					ct = checkTeamService.get(entity.getId());
					ct.setName(entity.getName().trim());
					bl = true;
				} else {
					this.renderMessage(false, "审查组名称不可以为空  ");
					return;
				}


			}

			yesId = new ArrayList<Long>();
			if (null != entity.getMembers()) {
			if (entity.getMembers().length() > 0) {
				if (entity.getMembers().indexOf(",") > 0) {
					String[] str = entity.getMembers().split(",");
					for (String string : str) {
						yesId.add(Long.parseLong(string));
					}
				} else {
					Long ids = Long.parseLong(entity.getMembers());
					yesId.add(ids);
				}
				}
			}
			noId = new ArrayList<Long>();
			if (bl) {
			for (Long id : allId) {
					CheckExpert ce = checkExpertService.get(id);
					if (ce.getTeam() != null && !yesId.contains(id)) {
						if (ce.getTeam().getId().longValue() == teamID
								.longValue()) {
							noId.add(id);
						}
				}
			}
			}


			checkTeamService.save(ct);
			// 修改成员组
			checkExpertService.updateIsTeam(yesId, ct.getId());
			checkExpertService.updateNotTeam(noId);
			this.renderMessage(true, "操作成功");
			// entity.setId(ct.getId());
			// entity.setCreateDate(ct.getCreateDate());
			// entity.setCount(Long.parseLong(String.valueOf(yesId.size())));
			// this.render(getJsonSerializer().serialize(new
			// JsonStore(entity)));
		} catch (Exception e) {
			this.renderMessage(false, e.getMessage());
			logger.error(e.getMessage(), e);
		}
	}

	@SuppressWarnings("unchecked")
	public ProfessorTeamVO getProfessorTeamVO() {
		String data = Struts2Utils.getParameter(JsonStore.RootProperty);
		if (data == null)
			return null;
		JSONDeserializer deserializer = this.getJsonDeserializer();
		JSONDeserializer<IdEntity> jsonDeserializer = deserializer.use(null, ProfessorTeamVO.class);
		return (ProfessorTeamVO) jsonDeserializer.deserialize(data);
	}

	/**
	 * 列表显示地区的审核组
	 */
	@Override
	public void list() throws Exception {
		if (logger.isDebugEnabled()) {
			logger.debug("查看所有的审查专家组");
		}
		List<ProfessorTeamVO> list = new ArrayList<ProfessorTeamVO>();
		Page page = checkTeamService.getall(this.setupPage());
		ProfessorTeamVO vo;
		List<CheckTeam> ctlist = page.getResult();
		for (CheckTeam ct : ctlist) {
			vo = new ProfessorTeamVO();
			vo.setCreateDate(ct.getCreateDate());
			vo.setCreateBy(ct.getCreateBy());
			vo.setId(ct.getId());
			vo.setCount(Long.parseLong(String.valueOf(ct.getProfessorList()
					.size())));
			vo.setName(ct.getName());
			// vo.setRegionName("regionName1");
			list.add(vo);
		}
		page.setResult(list);
		render(getJsonSerializer().serialize(new JsonStore(page)));
	}

	/**
	 * 根据组ID查找审核专家
	 * 
	 * @throws Exception
	 */
	public void findExpertByTeamId() throws Exception {
		List<ProfessorInfoVO> list = new ArrayList<ProfessorInfoVO>();
		if (null != getIdParam()) {
		CheckTeam ct = checkTeamService.get(getIdParam());
		List<CheckExpert> pi = ct.getProfessorList();
		ProfessorInfoVO vo;
		for (CheckExpert ce : pi) {
			vo = new ProfessorInfoVO();
			vo.setAddress(ce.getAddress());
			vo.setCertificate(ce.getCertificate());
			vo.setCreateDate(ce.getCreateDate());
			vo.setDuty(ce.getDuty());
			vo.setId(ce.getId());
			vo.setMail(ce.getMail());
			vo.setMobile(ce.getMobile());
			vo.setName(ce.getName());
			vo.setZipcode(ce.getZipcode());
			list.add(vo);
		}
			render(getJsonSerializer().serialize(new JsonStore(list)));
		} else {
			render(getJsonSerializer().serialize(new JsonStore(list)));
		}
	}

	/**
	 * 返回前台组成员、可分配的审核专家
	 */
	@SuppressWarnings("unchecked")
	public void getMemberChoice() {
		JSONSerializer serializer = new JSONSerializer().include("id").include("value").exclude("*");
		Map<String, Object> data = new HashMap<String, Object>();
		List<CheckExpert> ept = new ArrayList<CheckExpert>();
		if(null==getIdParam()){
			ept = checkExpertService.allNotTeam();
		}else{
			teamID = getIdParam();
			ept = checkExpertService.notTeam(getIdParam()); // 非组成员
		}
		List listAvailable;
		List listAvailables = new ArrayList();
		allId = new ArrayList<Long>();
		for (int i = 0; i < ept.size(); i++) {
			allId.add(ept.get(i).getId());
			listAvailable = new ArrayList();
			listAvailable.add(ept.get(i).getId());
			listAvailable.add(ept.get(i).getName().toString());
			listAvailables.add(listAvailable);
		}
		List listObtained;
		List listObtaineds = new ArrayList();
		if (getIdParam() == null) {
			listObtained = new ArrayList();
		} else {

			List<CheckExpert> ent = checkExpertService.isTeam(getIdParam());// 组成员
			for (int i = 0; i < ent.size(); i++) {
				allId.add(ent.get(i).getId());
				listObtained = new ArrayList();
				listObtained.add(ent.get(i).getId());
				listObtained.add(ent.get(i).getName().toString());
				listObtaineds.add(listObtained);
			}
			}
		if (logger.isDebugEnabled()) {
			logger.debug("所有加载的专家ID" + allId);
		}
		data.put("available", listAvailables);
		data.put("obtained", listObtaineds);
		this.render(serializer.serialize(data));
	}
}
