package com.cce.weaponry.dao.training;

import org.springframework.stereotype.Repository;

import com.cce.modules.orm.hibernate.HibernateDao;
import com.cce.weaponry.entity.training.FileInfo;

@Repository
public class FileInfoDao extends HibernateDao<FileInfo, Long> {

}
