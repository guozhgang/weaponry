package com.cce.weaponry.service.config;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cce.modules.orm.Page;
import com.cce.modules.orm.PropertyFilter;
import com.cce.modules.service.CrudServiceInterface;
import com.cce.weaponry.dao.config.SysConfigDao;
import com.cce.weaponry.entity.config.SysConfig;
import com.cce.weaponry.web.vo.config.SysConfigVO;

@Service
@Transactional
public class SysConfigService implements CrudServiceInterface<SysConfig> {

	@Autowired
	private SysConfigDao sysConfigDao;

	public void delete(List<Long> ids) {
		sysConfigDao.delete(ids);
	}

	public SysConfig get(Long id) {
		return sysConfigDao.get(id);
	}

	public List<SysConfig> list(List<PropertyFilter> filters) {
		return sysConfigDao.find(filters);
	}

	public Page<SysConfig> list(Page<SysConfig> page,
			List<PropertyFilter> filters) {
		sysConfigDao.getSession().evict(SysConfig.class);
		return sysConfigDao.findPage(page, filters);
	}

	public void save(SysConfig entity) {
		sysConfigDao.save(entity);
		sysConfigDao.getSession().flush();
	}

	public String getModuleNameByConfigId(Long configId) {
		String hql = "select i.sysModule.moduleName from SysConfig i where i.id="
				+ configId;
		Object ret = sysConfigDao.getSession().createQuery(hql).uniqueResult();
		return ret == null ? null : ret.toString();
	}

	public String getValueByCode(String confCode) {
		return sysConfigDao.getValueByCode(confCode);
	}

	/**
	 * 通过查询条件模糊查询系统配置数据
	 */
	public Page<SysConfig> find(Page<SysConfig> page, SysConfigVO searchVO) {
		sysConfigDao.getSession().evict(SysConfig.class);

		StringBuilder hql = new StringBuilder("from SysConfig s where 1=1 ");
		if (null != searchVO) {
			hql.append(" and s.sysModule.moduleName like '%").append(
					searchVO.getModuleName()).append("%' ");
		}
		page = sysConfigDao.findPage(page, hql.toString());
		return page;
	}

}
