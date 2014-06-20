package com.cce.weaponry.service.register;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cce.modules.orm.Page;
import com.cce.modules.orm.PropertyFilter;
import com.cce.modules.service.CrudServiceInterface;
import com.cce.weaponry.dao.register.FileBeanDao;
import com.cce.weaponry.entity.register.FileBean;

@Service
@Transactional
public class FileBeanService implements CrudServiceInterface<FileBean> {

	@Autowired
	private FileBeanDao fileBeanDao;

	public void delete(FileBean fileBean) {
		fileBeanDao.delete(fileBean);
	}

	public void delete(Long id) {
		fileBeanDao.delete(id);
	}

	public void delete(List<Long> ids) {
		fileBeanDao.delete(ids);
	}

	public FileBean get(Long id) {
		return fileBeanDao.get(id);
	}

	public List<FileBean> list(List<PropertyFilter> filters) {
		return fileBeanDao.find(filters);
	}

	public Page<FileBean> list(Page<FileBean> page, List<PropertyFilter> filters) {
		return fileBeanDao.findPage(page, filters);
	}

	public void save(FileBean entity) {
		fileBeanDao.save(entity);
	}

	/**
	 * 通过文件id得到文件名称
	 * 
	 * @param fileId
	 *            文件id
	 * @return 文件名称
	 */
	public String getFileNameById(Long fileId) {
		// 文件
		FileBean fileBean = fileBeanDao.get(fileId);
		// 文件路径
		String fileUrl = fileBean.getFileURI().substring(
				fileBean.getFileURI().lastIndexOf("WEB-INF/upload"),
				fileBean.getFileURI().length());
		// 文件名称
		String fileName = fileUrl.substring(fileUrl.lastIndexOf("~") + 1,
				fileUrl.length());
		return fileName;
	}

}
