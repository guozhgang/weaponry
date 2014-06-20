package com.cce.weaponry.service.train;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cce.modules.orm.Page;
import com.cce.modules.orm.PropertyFilter;
import com.cce.modules.service.CrudServiceInterface;
import com.cce.weaponry.dao.train.TestQuestionDao;
import com.cce.weaponry.entity.train.TestQuestion;

@Service
@Transactional
public class TestQuestionService implements CrudServiceInterface<TestQuestion> {

	@Autowired
	private TestQuestionDao testQuestionDao;

	public void delete(List<Long> ids) {
		testQuestionDao.delete(ids);
	}

	public TestQuestion get(Long id) {
		return testQuestionDao.get(id);
	}

	public List<TestQuestion> list(List<PropertyFilter> filters) {
		return testQuestionDao.find(filters);
	}

	public Page<TestQuestion> list(Page<TestQuestion> page, List<PropertyFilter> filters) {
		return testQuestionDao.findPage(page, filters);
	}

	public void save(TestQuestion entity) {
		testQuestionDao.save(entity);
	}
}
