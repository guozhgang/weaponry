package com.cce.weaponry.web.security;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.struts2.convention.annotation.Namespace;
import org.springframework.beans.factory.annotation.Autowired;

import com.cce.modules.service.CrudServiceInterface;
import com.cce.weaponry.entity.security.Authority;
import com.cce.weaponry.entity.security.Resource;
import com.cce.weaponry.service.security.AuthorityCrudService;
import com.cce.weaponry.service.security.ResourceCrudService;
import com.cce.weaponry.web.JsonCrudActionSupport;

import flexjson.JSONDeserializer;
import flexjson.JSONSerializer;

/**
 * 权限管理。 对系统功能权限的名称、链接地址、权限描述进行添加和编辑。
 * 
 * @author cce
 */
@Namespace("/security")
public class AuthorityAction extends JsonCrudActionSupport<Authority> {

	@Autowired
	AuthorityCrudService authorityManager;
	
	@Autowired
	private ResourceCrudService resourceService;

	@Override
	public CrudServiceInterface<Authority> getCrudService() {
		return authorityManager;
	}

	@Override
	public JSONSerializer getJsonSerializer() {
		return super.getJsonSerializer().include("resources").exclude("resources.authNames",
 "resources.authDisplayNames").transform(
				this.getArrayObjectTransformer(), "resources");
	}
	
	@Override
	public JSONDeserializer<Authority> getJsonDeserializer() {
		return new JSONDeserializer<Authority>().use(this.getIdArrayObjectFactory(), "resources");
	}

	/**
	 * 为Ext.ux.ItemSelector提供Json数据
	 */
	public void resourceStore() {
		JSONSerializer serializer = new JSONSerializer().include("id").include("value").exclude("*");
		Map<String, Object> data = new HashMap<String, Object>();
		List<Resource> obtained = null;
		Long authId = this.getIdParam("auth_id");
		if (authId != null) {
			Authority auth = this.authorityManager.get(authId);
			if (auth != null) {
				obtained = auth.getResources();
			}
		}

		List<Resource> all = resourceService.getAll();
		List<Resource> available = new ArrayList<Resource>();
		if (obtained == null) {
			obtained = new ArrayList<Resource>();
			available = all;
		} else {
			for (Resource res : all) {
				if (!obtained.contains(res)) {
					available.add(res);
				}
			}
		}

		data.put("available", getResArray(available));
		data.put("obtained", getResArray(obtained));
		this.render(serializer.serialize(data));
	}

	/**
	 * 生成如下格式的Ext.data.ArrayStore数据. <code>
	 * [[2,"/security/user!list.action"],[4,"/security/user!save.action"],[1,"/main.action"]]
	 * </code>
	 * 
	 * @param resList
	 * @return
	 */
	private List<List<String>> getResArray(List<Resource> resList) {
		List<List<String>> ret = new ArrayList<List<String>>();
		for (Resource res : resList) {
			List<String> item = new ArrayList<String>();
			item.add(res.getId().toString());
			item.add(res.getValue());
			ret.add(item);
		}
		return ret;
	}


	@Override
	public void delete() throws Exception {
		try {
			List<Long> ids = getIdArrayParam();
			if (ids != null && !ids.isEmpty()) {
				List<Authority> authorities = authorityManager
						.findAuthoritiesByIds(ids);
				for (Authority i : authorities) {
					if ("A_SYS_MAIN".equals(i.getName())) {
						renderMessage(false, "系统权限不允许删除");
						return;
					}
				}
				boolean isRight = true;
				for (Authority i : authorities) {
					try {
						i.setResources(null);
						authorityManager.delete(i.getId());
					} catch (Exception e) {
						isRight = false;
					}
				}
				if (isRight) {
					renderSuccess();
				} else {
					renderFailure();
				}
			} else
				throw new RuntimeException("参数错误,指定的数据不存在!");
		} catch (Exception e) {
			this.renderMessage(false, "服务器内部错误");
			logger.error(e.getMessage(), e);
		}
	}

}
