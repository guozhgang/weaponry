package com.cce.weaponry.web.config;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.cce.modules.orm.IdEntity;
import com.cce.modules.orm.Page;
import com.cce.modules.service.CrudServiceInterface;
import com.cce.modules.web.json.JsonStore;
import com.cce.modules.web.struts2.Struts2Utils;
import com.cce.weaponry.entity.config.SysConfig;
import com.cce.weaponry.service.config.SysConfigService;
import com.cce.weaponry.service.config.SysModuleService;
import com.cce.weaponry.web.JsonCrudActionSupport;
import com.cce.weaponry.web.vo.config.SysConfigVO;

import flexjson.JSONDeserializer;

public class SysConfigAction extends JsonCrudActionSupport<SysConfig> {

	@Autowired
	private SysConfigService sysConfigService;

	@Autowired
	private SysModuleService sysModuleService;

	@Override
	public CrudServiceInterface<SysConfig> getCrudService() {
		return sysConfigService;
	}

	/**
	 * 保存配置
	 */
	@Override
	public void save() throws Exception {
		try {
			SysConfig entity = this.getRequestBean();
			if (entity != null) {
				entity.setSysModule(sysModuleService.getSysModuleByName(entity
						.getModuleName()));
				getCrudService().save(entity);
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
	 * 得到页面封装的查询数据
	 * 
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public SysConfigVO getSearchVO() {
		String data = Struts2Utils.getParameter(JsonStore.RootProperty);
		if (data == null)
			return null;
		JSONDeserializer deserializer = this.getJsonDeserializer();
		JSONDeserializer<IdEntity> jsonDeserializer = deserializer.use(null,
				SysConfigVO.class);
		return (SysConfigVO) jsonDeserializer.deserialize(data);
	}

	/**
	 * 查询系统配置
	 */
	public void search() throws Exception {
		SysConfigVO searchVO = getSearchVO();
		Page<SysConfig> page = this.sysConfigService.find(this.setupPage(),
				searchVO);
		List<SysConfig> list = page.getResult();
		List<SysConfig> ret = new ArrayList<SysConfig>();
		for (SysConfig i : list) {
			i
					.setModuleName(sysConfigService.getModuleNameByConfigId(i
							.getId()));
			ret.add(i);
		}
		page.setResult(ret);
		this.render(page);
	}

}
