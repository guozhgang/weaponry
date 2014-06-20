package com.cce.weaponry.web.security;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.struts2.convention.annotation.Namespace;
import org.springframework.beans.factory.annotation.Autowired;

import com.cce.modules.service.CrudServiceInterface;
import com.cce.modules.web.json.JsonStore;
import com.cce.weaponry.entity.security.Authority;
import com.cce.weaponry.entity.security.Resource;
import com.cce.weaponry.service.security.AuthorityCrudService;
import com.cce.weaponry.service.security.ResourceCrudService;
import com.cce.weaponry.web.JsonCrudActionSupport;

import flexjson.JSONDeserializer;
import flexjson.JSONSerializer;

@Namespace("/security")
public class ResourceAction extends JsonCrudActionSupport<Resource> {

	@Autowired
	private ResourceCrudService resourceService;

	@Autowired
	private AuthorityCrudService authSevice;

	@Override
	public CrudServiceInterface<Resource> getCrudService() {
		return resourceService;
	}

	@Override
	public JSONSerializer getJsonSerializer() {
		return super.getJsonSerializer().include("authorityList");
		// .transform(new Transformer() {
		// public String transform(Object value) {
		// return value.toString();
		// }
		// }, "authorityList");
	}

	@Override
	public JSONDeserializer<Resource> getJsonDeserializer() {
		return super.getJsonDeserializer().use(this.getEntityFactory(), "authorityList");
	}

	public void authorities() {
		List<Authority> auths = authSevice.getAll();

		List<Map<String, Object>> list = new ArrayList<Map<String, Object>>(auths.size());
		Map<String, Object> map;
		for (Authority auth : auths) {
			map = new HashMap<String, Object>();
			map.put("authId", auth.getId());
			map.put("authName", auth.getDisplayName());
			map.put("checked", false);
			list.add(map);
		}
		this.render(new JsonStore(list));
	}
}
