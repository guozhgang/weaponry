package com.cce.weaponry.service.train;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cce.modules.orm.Page;
import com.cce.modules.orm.PropertyFilter;
import com.cce.modules.service.CrudServiceInterface;
import com.cce.weaponry.dao.train.TestResultDao;
import com.cce.weaponry.entity.train.TestResult;

@Service
@Transactional
public class TestResultService implements CrudServiceInterface<TestResult> {

	@Autowired
	private TestResultDao testResultDao;

	public void delete(List<Long> ids) {
		testResultDao.delete(ids);
	}

	public TestResult get(Long id) {
		return testResultDao.get(id);
	}

	public List<TestResult> list(List<PropertyFilter> filters) {
		return testResultDao.find(filters);
	}

	public Page<TestResult> list(Page<TestResult> page, List<PropertyFilter> filters) {
		return testResultDao.findPage(page, filters);
	}

	public void save(TestResult entity) {
		testResultDao.save(entity);
	}
}
