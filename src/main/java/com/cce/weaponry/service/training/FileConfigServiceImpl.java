package com.cce.weaponry.service.training;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cce.weaponry.dao.training.FileTypeInfoDao;
import com.cce.weaponry.entity.training.FileTypeInfo;


@Service
@Transactional
public class FileConfigServiceImpl extends
		XmlConfigServiceDao<FileTypeInfo, Long> implements
		FileConfigService {

	@Autowired
	private FileTypeInfoDao fileTypeInfoDao;



	FileConfigServiceImpl()
	{
		super();
		if (fileTypeInfoDao != null) {
			System.out.println("FileConfigServiceImpl fileTypeInfoDao");
		}
	}


	public FileTypeInfo getTypeInfo(Long typeId)
			throws Exception {
		// getObject(typeId);
		FileTypeInfo info = fileTypeInfoDao.get(typeId);
		return info;// fileTypeInfoDao.get(typeId);
	}

	public List<FileTypeInfo> getTypeInfoList(boolean all)
			throws Exception {


		List<FileTypeInfo> list = new ArrayList<FileTypeInfo>();

		list.add(getTypeInfo(FileTypeInfo.TYPE_DOC));
		list.add(getTypeInfo(FileTypeInfo.TYPE_VIDEO));
		if (all) {
			list.add(getTypeInfo(FileTypeInfo.TYPE_ONLINE));
		}

		return list;
	}


	public Map<Long, FileTypeInfo> getTypeInfoMap()
			throws Exception {
		List<FileTypeInfo> list = getTypeInfoList(true);
		HashMap<Long, FileTypeInfo> map = new HashMap<Long, FileTypeInfo>();
		for (Long i = 0L; i < list.size(); i++) {
			map.put(i, list.get(i.intValue()));
		}
		return map;
	}

	// @Override
	// String getConfigNames() {
	// return "training-config.xml";
	// }

	@Override
	String getObjectName() {
		return "fileType";
	}

	@Override
	List<FileTypeInfo> findBy(Long id) {
		return fileTypeInfoDao.findBy("id", id);
	}

	// @Override
	// void fromElement(Element e, FileTypeInfo p) {
	// p.setBaseDir(getAttribute(e, "baseDir"));
	// p.setName(getAttribute(e, "name"));
	// p.setBaseUrl(getAttribute(e, "baseUrl"));
	// }

	@Override
	void saveObject(Long id, FileTypeInfo obj) {
		obj.setId(id);
		fileTypeInfoDao.save(obj);
	}

	@Override
	FileTypeInfo newObject() {
		return new FileTypeInfo();
	}

	@Override
	public void reload() {

		// try {
		// List<FileTypeInfo> list = fileTypeInfoDao.getAll();
		// Document doc = this.getDoc();
		// for (FileTypeInfo item : list) {
		//
		// Element e = this.getElement(doc, item.getId());
		// fromElement(e, item);
		// fileTypeInfoDao.save(item);
		// }
		// fileTypeInfoDao.getSession().flush();
		//
		// } catch (Exception e) {
		// e.printStackTrace();
		// }

	}

}
