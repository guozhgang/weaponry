package com.cce.weaponry.service.training;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cce.weaponry.dao.training.ProjectDao;
import com.cce.weaponry.entity.training.Project;

@Service
@Transactional
public class ProjectServiceImpl extends XmlConfigServiceDao<Project, Long>
		implements
		ProjectService {

	@Autowired
	private ProjectDao dpDao;



	public Project get(Long id) {
		List<Project> list = dpDao.findBy("id", id);
		if (list.size() > 0)
			return list.get(0);

		System.out.println("auto project" + id);

		// autoLoads(id);

		Project d = dpDao.get(id);
		return d;
	}

	public List<Project> getAll() {

		get(Project.VOD);
		get(Project.DOC);
		get(Project.ONLINE);

		return dpDao.getAll();
	}



	// @Override
	// String getConfigNames() {
	// return "training-config.xml";
	// }

	@Override
	String getObjectName() {
		return "project";
	}

	@Override
	void reload() {

		// try {
		// List<Project> list = dpDao.getAll();
		// Document doc = this.getDoc();
		// for (Project item : list) {
		//
		// Element e = this.getElement(doc, item.getId());
		// fromElement(e, item);
		// dpDao.save(item);
		// }
		//
		// } catch (Exception e) {
		// e.printStackTrace();
		// }

	}

	@Override
	List<Project> findBy(Long id) {
		List<Project> list = dpDao.findBy("id", id);
		return list;
	}

	// @Override
	// void fromElement(Element e, Project p) {
	//
	// p.setTitle(this.getAttribute(e, "title"));
	// }

	@Override
	Project newObject() {

		return new Project();
	}

	@Override
	void saveObject(Long id, Project obj) {

		obj.setId(id);
		dpDao.save(obj);
	}
}
