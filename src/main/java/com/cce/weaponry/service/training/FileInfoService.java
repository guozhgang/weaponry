package com.cce.weaponry.service.training;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cce.modules.orm.Page;
import com.cce.modules.orm.PropertyFilter;
import com.cce.modules.service.CrudServiceInterface;
import com.cce.weaponry.dao.training.FileInfoDao;
import com.cce.weaponry.entity.training.FileInfo;
@Service
@Transactional
public class FileInfoService implements CrudServiceInterface<FileInfo> {

	@Autowired
	private FileInfoDao fileInfoDao;

	public void delete(List<Long> ids) {
		fileInfoDao.delete(ids);
	}

	public FileInfo get(Long id) {
		fileInfoDao.getSession().evict(FileInfo.class);
		return fileInfoDao.get(id);
	}

	public List<FileInfo> list(List<PropertyFilter> filters) {
		return fileInfoDao.find(filters);
	}

	public Page<FileInfo> list(Page<FileInfo> page, List<PropertyFilter> filters) {
		return fileInfoDao.findPage(page, filters);
	}

	public void save(FileInfo entity) {
		fileInfoDao.save(entity);
	}

	
	
}
