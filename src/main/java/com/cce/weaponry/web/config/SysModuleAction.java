package com.cce.weaponry.web.config;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;

import com.cce.modules.orm.PropertyFilter;
import com.cce.modules.service.CrudServiceInterface;
import com.cce.modules.web.json.JsonStore;
import com.cce.weaponry.entity.config.SysModule;
import com.cce.weaponry.service.config.SysModuleService;
import com.cce.weaponry.web.JsonCrudActionSupport;

public class SysModuleAction extends JsonCrudActionSupport<SysModule> {

	@Autowired
	private SysModuleService sysModuleService;

	@Override
	public CrudServiceInterface<SysModule> getCrudService() {
		return sysModuleService;
	}

	@Override
	public void save() throws Exception {
		try {
			SysModule entity = this.getRequestBean();
			if (entity != null) {
				boolean isExists = sysModuleService.ifExistsByName(entity
						.getModuleName());
				if (!isExists) {
					getCrudService().save(entity);
					this.render(getJsonSerializer().serialize(
							new JsonStore(entity)));
				} else {
					this.renderMessage(false, "此模块名称已经存在！");
				}
			} else
				throw new RuntimeException("参数错误,指定的数据不存在!");
		} catch (Exception e) {
			this.renderMessage(false, e.getMessage());
			logger.error(e.getMessage(), e);
		}
	}

	public void simpleModules() throws Exception {
		List<SysModule> list = sysModuleService
				.list(new ArrayList<PropertyFilter>());
		List<Map<String, Object>> ret = new ArrayList<Map<String, Object>>();
		Map<String, Object> map;
		for (SysModule i : list) {
			map = new HashMap<String, Object>();
			map.put("id", i.getId());
			map.put("name", i.getModuleName());
			ret.add(map);
		}
		this.render(new JsonStore(ret));
	}


	@Override
	public void delete() throws Exception {
		try {
			List<Long> ids = getIdArrayParam();
			if (ids != null && !ids.isEmpty()) {
				sysModuleService.delete(ids);
				renderSuccess();
			} else
				throw new RuntimeException("参数错误,指定的数据不存在!");
		} catch (Exception e) {
			this.renderMessage(false, e.getMessage());
			logger.error(e.getMessage(), e);
		}
	}

}
