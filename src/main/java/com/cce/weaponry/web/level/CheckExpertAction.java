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
import com.cce.modules.service.CrudServiceInterface;
import com.cce.modules.web.json.JsonStore;
import com.cce.modules.web.struts2.Struts2Utils;
import com.cce.weaponry.entity.level.CheckExpert;
import com.cce.weaponry.entity.register.FileBean;
import com.cce.weaponry.service.level.CheckExpertService;
import com.cce.weaponry.service.register.FileBeanService;
import com.cce.weaponry.web.JsonCrudActionSupport;
import com.cce.weaponry.web.vo.level.ProfessorInfoVO;

import flexjson.JSONDeserializer;
import flexjson.JSONSerializer;

@Namespace("/info")
@Action("checkExpert")
public class CheckExpertAction extends JsonCrudActionSupport<CheckExpert> {

	@Autowired
	private FileBeanService fileBeanService;
	@Autowired
	protected CheckExpertService checkExpertService;


	@Override
	public CrudServiceInterface<CheckExpert> getCrudService() {
		// TODO Auto-generated method stub
		return checkExpertService;
	}

	// 随机抽取专家
	public void getRandomExpert() {
		JSONSerializer serializer = new JSONSerializer().include("id").include(
				"value").exclude("*");
		Map<String, Object> data = new HashMap<String, Object>();
		List<CheckExpert> checkRandom = null;
			checkRandom = checkExpertService
				.getRandomProfessor(Integer.parseInt(String
							.valueOf(getIdParam())));

		data.put("obtained", checkRandom);
		this.render(serializer.serialize(data));
	}

	/**
	 * 列表显示地区的审核专家
	 */
	@Override
	public void list() throws Exception {
		List<ProfessorInfoVO> list = new ArrayList<ProfessorInfoVO>();
		ProfessorInfoVO vo;
		Page page = checkExpertService.getall(this.setupPage());
		List<CheckExpert> ctlist = page.getResult();
		for (CheckExpert ce : ctlist) {
			vo = new ProfessorInfoVO();
			vo.setAddress(ce.getAddress());
			vo.setCreateDate(ce.getCreateDate());
			vo.setDuty(ce.getDuty());
			vo.setId(ce.getId());
			vo.setMail(ce.getMail());
			vo.setMobile(ce.getMobile());
			vo.setName(ce.getName());
			vo.setResumeInfo(ce.getCertificate());
			FileBean file = ce.getFileInfo();
			if (null != file) {
				vo.setFileId(file.getId());
			}
			vo.setZipcode(ce.getZipcode());
			list.add(vo);
		}
		page.setResult(list);
		if (logger.isDebugEnabled()) {
			logger.debug("查看所有的审查专家" + list);
		}
		render(getJsonSerializer().serialize(new JsonStore(page)));
	}

	/**
	 * 保存修改专家信息
	 */
	@Override
	public void save() throws Exception {
		if (logger.isDebugEnabled()) {
			logger.debug("保存、修改专家信息:  " + Struts2Utils.getParameter("data"));
		}
		try {
			ProfessorInfoVO entity = this.getProfessorInfoVO();
			CheckExpert ck;
			if (null == entity.getId() || "".equals(entity.getId())) {
				ck = new CheckExpert();
				ck.setCreateDate(new Date());
			} else {
				ck = checkExpertService.get(entity.getId());
			}
			ck.setAddress(entity.getAddress());
			ck.setDuty(entity.getDuty());
			ck.setMail(entity.getMail());
			ck.setMobile(entity.getMobile());
			ck.setName(entity.getName());
			ck.setCertificate(entity.getResumeInfo());
			ck.setZipcode(entity.getZipcode());
			if (null != entity.getFileId() && !"".equals(entity.getFileId())) {
				ck.setFileInfo(fileBeanService.get(entity.getFileId()));
			}
			checkExpertService.save(ck);
			this.renderMessage(true, "操作成功");
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
