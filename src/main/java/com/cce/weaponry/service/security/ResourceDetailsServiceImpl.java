package com.cce.weaponry.service.security;

import java.util.LinkedHashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import com.cce.modules.security.springsecurity.ResourceDetailsService;
import com.cce.weaponry.dao.security.ResourceDao;
import com.cce.weaponry.entity.security.Resource;

/**
 * 从数据库查询URL--授权定义Map的实现类.
 * 
 * @author cce
 */
@Transactional(readOnly = true)
public class ResourceDetailsServiceImpl implements ResourceDetailsService {

	@Autowired
	private ResourceDao resourceDao;

	/**
	 * 查找URL类型的资源并初始化可访问该资源的授权.
	 */
	@Transactional(readOnly = true)
	public List<Resource> getUrlResourceWithAuthorities() {
		return resourceDao.getUrlResourceWithAuthorities();
	}

	/**
	 * @see ResourceDetailsService#getRequestMap()
	 */
	@Transactional(readOnly = true)
	public LinkedHashMap<String, String> getRequestMap() {
		List<Resource> resourceList = getUrlResourceWithAuthorities();

		LinkedHashMap<String, String> requestMap = new LinkedHashMap<String, String>(
				resourceList.size());
		for (Resource resource : resourceList) {
			requestMap.put(resource.getValue(), resource.getAuthNames());
		}
		return requestMap;
	}
}
