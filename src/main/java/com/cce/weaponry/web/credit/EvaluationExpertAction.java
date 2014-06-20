package com.cce.weaponry.web.credit;

import java.util.Date;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.springframework.beans.factory.annotation.Autowired;

import com.cce.modules.orm.IdEntity;
import com.cce.modules.orm.Page;
import com.cce.modules.service.CrudServiceInterface;
import com.cce.modules.web.json.JsonStore;
import com.cce.modules.web.struts2.Struts2Utils;
import com.cce.weaponry.entity.credit.EvaluationExpert;
import com.cce.weaponry.service.credit.EvaluationExpertService;
import com.cce.weaponry.web.JsonCrudActionSupport;
import com.cce.weaponry.web.vo.level.ProfessorInfoVO;

import flexjson.JSONDeserializer;

@Namespace("/info")
@Action("evalExpert")
public class EvaluationExpertAction extends
		JsonCrudActionSupport<EvaluationExpert> {

	@Autowired
	private EvaluationExpertService evaluationExpertService;

	@Override
	public CrudServiceInterface<EvaluationExpert> getCrudService() {
		return evaluationExpertService;
	}

	/**
	 * 列表显示地区的评估专家
	 */
	@Override
	public void list() throws Exception {
		// List<ProfessorInfoVO> list = new ArrayList<ProfessorInfoVO>();
		Page<EvaluationExpert> list = evaluationExpertService.getall(this
				.setupPage());
		ProfessorInfoVO vo;

		// for (EvaluationExpert et : etlist) {
		// vo = new ProfessorInfoVO();
		// vo.setAddress(et.getAddress());
		// vo.setCertificate(et.getCertificate());
		// vo.setCreateDate(et.getCreateDate());
		// vo.setDuty(et.getDuty());
		// vo.setId(et.getId());
		// vo.setMail(et.getMail());
		// vo.setMobile(et.getMobile());
		// vo.setName(et.getName());
		// vo.setRegionName(et.getResumeUrl());
		// vo.setResumeInfo(et.getResumeUrl());
		// vo.setZipcode(et.getZipcode());
		// list.add(vo);
		// }
		render(getJsonSerializer().serialize(new JsonStore(list)));
	}

	@Override
	public void save() throws Exception {
		try {
			ProfessorInfoVO entity = this.getProfessorInfoVO();
			EvaluationExpert et;
			if (null == entity.getId() || "".equals(entity.getId())) {
				et = new EvaluationExpert();
				et.setCreateDate(new Date());
			} else {
				et = evaluationExpertService.get(entity.getId());
			}
			et.setAddress(entity.getAddress());
			et.setCertificate(entity.getCertificate());
			et.setDuty(entity.getDuty());
			et.setMail(entity.getMail());
			et.setZipcode(entity.getZipcode());
			et.setMobile(entity.getMobile());
			et.setName(entity.getName());
			et.setResumeUrl(entity.getResumeInfo());
			// et.setRegion(entity.getRegionName());
			evaluationExpertService.save(et);
			entity.setId(et.getId());
			entity.setCreateDate(et.getCreateDate());
			if (entity != null) {
				// getCrudService().save(entity);
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
