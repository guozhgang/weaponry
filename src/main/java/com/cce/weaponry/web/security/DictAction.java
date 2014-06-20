package com.cce.weaponry.web.security;

import java.util.List;

import org.apache.struts2.convention.annotation.Namespace;
import org.springframework.beans.factory.annotation.Autowired;

import com.cce.modules.orm.IdEntity;
import com.cce.modules.service.CrudServiceInterface;
import com.cce.modules.web.json.JsonStore;
import com.cce.modules.web.struts2.Struts2Utils;
import com.cce.weaponry.entity.register.EnforceOfficer;
import com.cce.weaponry.service.CommonEntityService;
import com.cce.weaponry.web.JsonCrudActionSupport;
import com.cce.weaponry.web.vo.StatusVO;

import flexjson.JSONDeserializer;

@Namespace("/dict")
public class DictAction extends JsonCrudActionSupport {

	@Override
	public CrudServiceInterface getCrudService() {
		return null;
	}

	@Autowired
	private CommonEntityService commonService;

	/**
	 * 封装 {@link EnforceOfficer} 对象的方法
	 * 
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public StatusVO getStatusVO() {
		String data = Struts2Utils.getParameter(JsonStore.RootProperty);
		if (data == null)
			return null;
		JSONDeserializer deserializer = this.getJsonDeserializer();
		JSONDeserializer<IdEntity> jsonDeserializer = deserializer.use(null,
				StatusVO.class);
		return (StatusVO) jsonDeserializer.deserialize(data);
	}

	@Override
	public String execute() throws Exception {
		StatusVO vo = this.getStatusVO();
		// 获取类类型
		if (null != vo) {
			// Class clz = Class.forName("com.cce.safepork.entity.dict."
			// + vo.getName());

			StringBuilder hql = new StringBuilder(" from ");

			hql.append(vo.getName()).append(" i where 1=1 ");

			if (null != vo.getId() && 0 != vo.getId()) {
				hql.append(" and i.id =").append(vo.getId()).append(" ");
			}
			
			if (null != vo.getCode() && !"".equals(vo.getCode())) {
				hql.append(" and i.code='").append(vo.getCode()).append("' ");
			}
			
			if (null != vo.getName() && !"".equals(vo.getName())
					&& "DictCompanyCredit".equals(vo.getName())) {
				hql.append(" order by i.id desc ");
			}
			
			List list = commonService.getSession().createQuery(hql.toString())
					.list();

			// // 获取类所对应的表的数据
			// List list = commonService.getDictEntities(clz);
			//
			// if (null != vo.getId() && 0 != vo.getId()) {
			// for (int i = 0; i < list.size(); i++) {
			// IdEntity entity = (IdEntity) list.get(i);
			// if (vo.getId().longValue() == entity.getId().longValue()) {
			// render(entity);
			// return NONE;
			// }
			// }
			// }
			//
			// if (null != vo.getCode() && !"".equals(vo.getCode())) {
			// for (int i = 0; i < list.size(); i++) {
			// IdEntity entity = (IdEntity) list.get(i);
			// String code = null;
			// try {
			// code = PropertyUtils.getProperty(entity, "code")
			// .toString();
			// } catch (Exception e) {
			// }
			// if (vo.getCode().equals(code)) {
			// render(entity);
			// return NONE;
			// }
			// }
			// }

			render(list);
			return NONE;
		}else
			throw new RuntimeException("传入数据格式不正确");// data={"name"="DictApprovalStatus","id"=1}
	}

}
