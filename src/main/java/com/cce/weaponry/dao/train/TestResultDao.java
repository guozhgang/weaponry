package com.cce.weaponry.dao.train;

import org.springframework.stereotype.Repository;

import com.cce.modules.orm.hibernate.HibernateDao;
import com.cce.weaponry.entity.train.TestResult;

@Repository
public class TestResultDao extends HibernateDao<TestResult, Long> {

}
