package com.cce.weaponry.service.transfer;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cce.modules.orm.Page;
import com.cce.modules.orm.PropertyFilter;
import com.cce.modules.service.CrudServiceInterface;
import com.cce.weaponry.dao.transfer.ButcherStageDao;
import com.cce.weaponry.entity.transfer.ButcherStage;

@Service
@Transactional
public class ButcherStageService implements CrudServiceInterface<ButcherStage> {

	@Autowired
	private ButcherStageDao butcherStageDao;

	public void delete(List<Long> ids) {
		butcherStageDao.delete(ids);
	}

	public ButcherStage get(Long id) {
		return butcherStageDao.get(id);
	}

	public List<ButcherStage> list(List<PropertyFilter> filters) {
		return butcherStageDao.find(filters);
	}

	public Page<ButcherStage> list(Page<ButcherStage> page, List<PropertyFilter> filters) {
		return butcherStageDao.findPage(page, filters);
	}

	public void save(ButcherStage entity) {
		butcherStageDao.save(entity);
	}
}
