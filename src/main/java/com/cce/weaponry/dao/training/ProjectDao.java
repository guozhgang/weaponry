package com.cce.weaponry.dao.training;

import org.springframework.stereotype.Repository;

import com.cce.modules.orm.hibernate.HibernateDao;
import com.cce.weaponry.entity.training.Project;

@Repository
public class ProjectDao extends HibernateDao<Project, Long> {

	// private static final String QUERY_ENTRY_BY_PROJECT_ID =
	// "select e from DocumentEntry e " +
	// "where document_project_id in ( select  ";
	//	
	// public List<DocumentEntry> getEntryList(long id) {
	// //List<User> users = createQuery(QUERY_USER_BY_ROLEID,
	// role.getId()).list();
	// //select u from User u left join u.roleList r where r.id=?
	// return createQuery(QUERY_ENTRY_BY_PROJECT_ID, id)
	// .list();
	//
	// }

}


