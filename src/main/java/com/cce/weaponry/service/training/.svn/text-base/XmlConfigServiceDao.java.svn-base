package com.cce.weaponry.service.training;

import java.util.List;

public abstract class XmlConfigServiceDao<OBJECT, PK> extends
		XmlConfigService<PK> {

	// protected Class<OBJECT> objectClass;

	// protected Class<OBJECT_DAO> objectDaoClass;

	// abstract OBJECT_DAO getDao();
	// XmlConfigServiceDao() {
	// objectClass = ReflectionUtils.getSuperClassGenricType(getClass());
	// }

	void autoLoads(PK id) {

		// try {
		// Document doc = getDoc();
		// Element e = getElement(doc, id);
		// if (e != null) {
		// OBJECT p = newObject();
		// fromElement(e, p);
		// saveObject(id, p);
		// }
		// } catch (Exception e) {
		// e.printStackTrace();
		// }
	}

	public void getObjects(PK id) {

		// System.out.println("getObject " + this.getClass().getName());
		// if (firstRun) {
		// System.out.println("firstRun " + this.getClass().getName());
		// firstRun = false;
		// reload();
		// }
		//
		// List<OBJECT> list = findBy(id);
		// if (list.size() > 0)
		// return;
		//
		// System.out.println("auto load object " + getObjectName() + " " + id);

		// autoLoad(id);

	}

	abstract List<OBJECT> findBy(PK id);

	// abstract List<OBJECT> getAll();

	abstract void saveObject(PK id, OBJECT obj);

	// abstract void fromElement(Element e, OBJECT p);

	abstract OBJECT newObject();

	// @Override
	// public void reload() {
	//
	// try {
	// List<OBJECT> list = this.getAll();
	// Document doc = this.getDoc();
	// for (OBJECT item : list) {
	//
	// // String s = OBJECT.g
	// // Element e = this.getElement(doc,
	// // .getId());
	// // fromElement(e, item);
	// // fileTypeInfoDao.save(item);
	// }
	//
	// } catch (Exception e) {
	// e.printStackTrace();
	// }
	//
	// }

}
