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
import com.cce.weaponry.entity.credit.EvaluationMember;
import com.cce.weaponry.service.credit.EvaluationMemberService;
import com.cce.weaponry.web.JsonCrudActionSupport;
import com.cce.weaponry.web.vo.level.ProfessorInfoVO;

import flexjson.JSONDeserializer;

@Namespace("/info")
@Action("evalMember")
public class EvaluationMemberAction extends
		JsonCrudActionSupport<EvaluationMember> {

	@Autowired
	private EvaluationMemberService evaluationMemberService;

	@Override
	public CrudServiceInterface<EvaluationMember> getCrudService() {
		return evaluationMemberService;
	}

	/**
	 * 列表显示地区的评估成员
	 */
	@Override
	public void list() throws Exception {
		// List<ProfessorInfoVO> list = new ArrayList<ProfessorInfoVO>();
		Page<EvaluationMember> list = evaluationMemberService.getall(this
				.setupPage());
		ProfessorInfoVO vo;
		// for (EvaluationMember em : emlist) {
		// vo = new ProfessorInfoVO();
		// vo.setAddress(em.getAddress());
		// vo.setCertificate(em.getCertificate());
		// vo.setCreateDate(em.getCreateDate());
		// vo.setDuty(em.getDuty());
		// vo.setId(em.getId());
		// vo.setMail(em.getMail());
		// vo.setMobile(em.getMobile());
		// vo.setName(em.getName());
		// vo.setRegionName("regionName1");
		// vo.setResumeInfo("resumeInfo1");
		// vo.setZipcode(em.getZipcode());
		// list.add(vo);
		// }
		render(getJsonSerializer().serialize(new JsonStore(list)));
	}

	@Override
	public void save() throws Exception {
		try {
			ProfessorInfoVO entity = this.getProfessorInfoVO();
			EvaluationMember em;
			if (null == entity.getId() || "".equals(entity.getId())) {
				em = new EvaluationMember();
				em.setCreateDate(new Date());
			} else {
				em = evaluationMemberService.get(entity.getId());
			}
			em.setAddress(entity.getAddress());
			em.setCertificate(entity.getCertificate());
			em.setDuty(entity.getDuty());
			em.setMail(entity.getMail());
			em.setMobile(entity.getMobile());
			em.setZipcode(entity.getZipcode());
			em.setName(entity.getName());
			em.setResumeUrl(entity.getResumeInfo());
			em.setType("1");
			evaluationMemberService.save(em);
			entity.setId(em.getId());
			entity.setCreateDate(em.getCreateDate());
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
