package com.cce.weaponry.service.transfer;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cce.modules.orm.Page;
import com.cce.modules.orm.PropertyFilter;
import com.cce.modules.service.CrudServiceInterface;
import com.cce.weaponry.dao.transfer.SaleStageDao;
import com.cce.weaponry.entity.transfer.SaleStage;

@Service
@Transactional
public class SaleStageService implements CrudServiceInterface<SaleStage> {

	@Autowired
	private SaleStageDao saleStageDao;

	public void delete(List<Long> ids) {
		saleStageDao.delete(ids);
	}

	public SaleStage get(Long id) {
		return saleStageDao.get(id);
	}

	public List<SaleStage> list(List<PropertyFilter> filters) {
		return saleStageDao.find(filters);
	}

	public Page<SaleStage> list(Page<SaleStage> page, List<PropertyFilter> filters) {
		return saleStageDao.findPage(page, filters);
	}

	public void save(SaleStage entity) {
		saleStageDao.save(entity);
	}
}
