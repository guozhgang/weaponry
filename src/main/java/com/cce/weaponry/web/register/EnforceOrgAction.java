package com.cce.weaponry.web.register;

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
import com.cce.weaponry.entity.register.EnforceOrg;
import com.cce.weaponry.service.common.CompanyUtils;
import com.cce.weaponry.service.register.EnforceOrgService;
import com.cce.weaponry.service.security.UserCrudService;
import com.cce.weaponry.web.JsonCrudActionSupport;
import com.cce.weaponry.web.vo.register.EnforceOrgVO;

import flexjson.JSONDeserializer;

@Namespace("/info")
@Action("enforceOrg")
public class EnforceOrgAction extends JsonCrudActionSupport<EnforceOrg> {

	@Autowired
	private EnforceOrgService enforceOrgService;

	@Autowired
	private UserCrudService userCrudService;

	@Override
	public CrudServiceInterface<EnforceOrg> getCrudService() {
		return enforceOrgService;
	}

	/**
	 * 获得当前登录用户所在地区的机构信息。
	 */
	@Override
	public void list() throws Exception {
		Page enforceOrgs = enforceOrgService.findEnforceOrgByRegionId(this
				.setupPage(), userCrudService.getLoginUser().getRegion()
				.getId());

		List<EnforceOrgVO> list = new ArrayList<EnforceOrgVO>();

		for (int j = 0; j < enforceOrgs.getResult().size(); j++) {
			EnforceOrg org = (EnforceOrg) enforceOrgs.getResult().get(j);
			EnforceOrgVO vo = new EnforceOrgVO();
			vo.setId(org.getId());
			vo.setCreateDate(new Date());
			vo.setAddress(org.getAddress());
			vo.setLeader(org.getLeader());
			vo.setLeaderMobile(org.getLeaderMobile());
			vo.setLeaderTel(org.getLeaderTel());
			vo.setMaster(org.getMaster());
			vo.setMasterFax(org.getMasterFax());
			vo.setMasterTel(org.getMasterTel());
			vo.setName(org.getName());
			vo.setRegionName(org.getRegion().getName());
			vo.setTel(org.getTel());
			vo.setZipCode(org.getZipcode());
			list.add(vo);
		}
		enforceOrgs.setResult(list);
		
		if(logger.isDebugEnabled()){
			CompanyUtils.printRequestInfo();
			CompanyUtils.printResponseInfo(list);
		}
		
		render(getJsonSerializer().serialize(new JsonStore(enforceOrgs)));
	}

	/**
	 * 增加和修改机构信息，机构的所属地区为用户的所属地区。
	 */
	@Override
	public void save() throws Exception {
		try {
			EnforceOrgVO entity = this.getEnforceOrgVO(); 
			
			if (entity != null) {
				EnforceOrg enforceOrg = null;
				boolean isNameExists = enforceOrgService.isExistsEnforceOrg(entity.getName());
				if (isNameExists) {
					renderMessage(false, "此名称已经存在！");
					return;
				}
				// insert
				if (null == entity.getId() || 0 == entity.getId()) {
					enforceOrg = new EnforceOrg();
					enforceOrg.setAddress(entity.getAddress());
					// enforceOrg.setAuthority()
					enforceOrg.setAuthTel(entity.getTel());
					enforceOrg.setLeader(entity.getLeader());
					enforceOrg.setLeaderMobile(entity.getLeaderMobile());
					enforceOrg.setLeaderTel(entity.getLeaderTel());
					enforceOrg.setMaster(entity.getMaster());
					enforceOrg.setMasterFax(entity.getMasterFax());
					enforceOrg.setMasterTel(entity.getMasterTel());
					enforceOrg.setName(entity.getName());
					enforceOrg.setRegion(userCrudService.getLoginUser()
							.getRegion());
					enforceOrg.setTel(entity.getTel());
					enforceOrg.setZipcode(entity.getZipCode());
				}// update
				else {
					enforceOrg = enforceOrgService.get(entity.getId());
					if (isNameExists) {
						if (!enforceOrg.getName().equals(entity.getName())) {
							renderMessage(false, "此名称已经存在！");
							return;
						}
					}
					if (null != entity.getAddress()) {
						enforceOrg.setAddress(entity.getAddress());
					}
					if (null != entity.getTel()) {
						enforceOrg.setAuthTel(entity.getTel());
					}
					if (null != entity.getLeader()) {
						enforceOrg.setLeader(entity.getLeader());
					}
					if (null != entity.getLeaderMobile()) {
						enforceOrg.setLeaderMobile(entity.getLeaderMobile());
					}
					if (null != entity.getLeaderTel()) {
						enforceOrg.setLeaderTel(entity.getLeaderTel());
					}
					if (null != entity.getMaster()) {
						enforceOrg.setMaster(entity.getMaster());
					}
					if (null != entity.getMasterFax()) {
						enforceOrg.setMasterFax(entity.getMasterFax());
					}
					if (null != entity.getMasterTel()) {
						enforceOrg.setMasterTel(entity.getMasterTel());
					}
					if (null != entity.getName()) {
						enforceOrg.setName(entity.getName());
					}
					if (null != entity.getTel()) {
						enforceOrg.setTel(entity.getTel());
					}
					if (null != entity.getZipCode()) {
						enforceOrg.setZipcode(entity.getZipCode());
					}
					enforceOrg.setRegion(userCrudService.getLoginUser()
							.getRegion());
				}
				enforceOrgService.save(enforceOrg);

				entity.setId(enforceOrg.getId());

				if(logger.isDebugEnabled()){
					CompanyUtils.printRequestInfo();
					CompanyUtils.printResponseInfo(entity);
				}
				
				this.render(getJsonSerializer()
						.serialize(new JsonStore(entity)));
			} else
				throw new RuntimeException("参数错误,指定的数据不存在!");
		} catch (Exception e) {
			this.renderMessage(false, e.getMessage());
			logger.error(e.getMessage(), e);
		}
	}

	/**
	 * 把执法机构参数封装成对象
	 * 
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public EnforceOrgVO getEnforceOrgVO() {
		String data = Struts2Utils.getParameter(JsonStore.RootProperty);
		if (data == null)
			return null;
		JSONDeserializer deserializer = this.getJsonDeserializer();
		JSONDeserializer<IdEntity> jsonDeserializer = deserializer.use(null,
				EnforceOrgVO.class);
		return (EnforceOrgVO) jsonDeserializer.deserialize(data);
	}

	/*
	 * 下拉框显示本地区的机构名称
	 */
	public void listBox4Org() throws Exception {
		List<EnforceOrg> enforceOrgs = enforceOrgService
				.findEnforceOrgsByRegionId(userCrudService
						.getLoginUserRegionId());
		List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
		Map<String, Object> map;
		for (EnforceOrg i : enforceOrgs) {
			map = new HashMap<String, Object>();
			map.put("id", i.getName());
			map.put("name", i.getName());
			list.add(map);
		}
		this.render(new JsonStore(list));
	}
}
