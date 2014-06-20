package com.cce.weaponry.integration.dao;

import java.util.List;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.cce.modules.test.spring.SpringTxTestCase;
import com.cce.weaponry.dao.level.CompanyLevelDao;
import com.cce.weaponry.entity.level.CompanyLevel;
import com.cce.weaponry.entity.register.CompanyInfo;

public class CompanyLevelTest extends SpringTxTestCase {
	@Autowired
	private CompanyLevelDao dao;

	@Test
	public void addLevel() {
		List<CompanyLevel> list = dao.getAll();
		int size1 = list.size();
		CompanyInfo info = new CompanyInfo();
		info.setAddress("address");
		CompanyLevel level = new CompanyLevel();
		level.setRecNo("no");
		dao.save(level);
		flush();
		int size2 = dao.getAll().size();
		assertTrue(size1 < size2);
	}

}
