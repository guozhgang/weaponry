package com.cce.weaponry.service.training;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cce.weaponry.dao.training.PublishTypeDao;
import com.cce.weaponry.entity.training.PublishType;

@Service
@Transactional
public class PublishTypeServiceImpl extends
		XmlConfigServiceDao<PublishType, Long> implements
		PublishTypeService {

	@Autowired
	private PublishTypeDao ptDao;


	public PublishType get(Long id) {
		// getObjects(id);
		return ptDao.get(id);
	}


	public List<PublishType> getList() {

		// getObjects(PublishType.DOWNLOAD);
		// getObject(PublishType.PLAY);

		return ptDao.getAll();
	}


	// @Override
	// String getConfigNames() {
	//
	// return "training-config.xml";
	// }

	@Override
	String getObjectName() {

		return "publishType";
	}

	@Override
	List<PublishType> findBy(Long id) {

		List<PublishType> list = ptDao.findBy("id", id);
		return list;
	}

	// @Override
	// void fromElement(Element e, PublishType p) {
	// p.setName(this.getAttribute(e, "name"));
	// }

	@Override
	void saveObject(Long id, PublishType obj) {
		obj.setId(id);
		ptDao.save(obj);
	}

	@Override
	PublishType newObject() {
		// TODO Auto-generated method stub
		return new PublishType();
	}

	@Override
	void reload() {

		// try {
		// List<PublishType> list = ptDao.getAll();
		// Document doc = this.getDoc();
		// for (PublishType item : list) {
		//
		// Element e = this.getElement(doc, item.getId());
		// fromElement(e, item);
		// ptDao.save(item);
		// }
		//
		// } catch (Exception e) {
		// e.printStackTrace();
		// }

	}

}
