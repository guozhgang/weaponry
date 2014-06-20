package com.cce.weaponry.service.transfer;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cce.modules.orm.Page;
import com.cce.modules.orm.PropertyFilter;
import com.cce.modules.service.CrudServiceInterface;
import com.cce.weaponry.dao.transfer.ManagementInfoDao;
import com.cce.weaponry.entity.transfer.ManagementInfo;

@Service
@Transactional
public class ManagementInfoService implements CrudServiceInterface<ManagementInfo> {

	@Autowired
	private ManagementInfoDao managementInfoDao;

	public void delete(List<Long> ids) {
		managementInfoDao.delete(ids);
	}

	public ManagementInfo get(Long id) {
		return managementInfoDao.get(id);
	}

	public List<ManagementInfo> list(List<PropertyFilter> filters) {
		return managementInfoDao.find(filters);
	}

	public Page<ManagementInfo> list(Page<ManagementInfo> page, List<PropertyFilter> filters) {
		return managementInfoDao.findPage(page, filters);
	}

	public void save(ManagementInfo entity) {
		managementInfoDao.save(entity);
	}
}
