package com.cce.weaponry.service.transfer;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cce.modules.orm.Page;
import com.cce.modules.orm.PropertyFilter;
import com.cce.modules.service.CrudServiceInterface;
import com.cce.weaponry.dao.transfer.InventoryStageDao;
import com.cce.weaponry.entity.transfer.InventoryStage;

@Service
@Transactional
public class InventoryStageService implements CrudServiceInterface<InventoryStage> {

	@Autowired
	private InventoryStageDao inventoryStageDao;

	public void delete(List<Long> ids) {
		inventoryStageDao.delete(ids);
	}

	public InventoryStage get(Long id) {
		return inventoryStageDao.get(id);
	}

	public List<InventoryStage> list(List<PropertyFilter> filters) {
		return inventoryStageDao.find(filters);
	}

	public Page<InventoryStage> list(Page<InventoryStage> page, List<PropertyFilter> filters) {
		return inventoryStageDao.findPage(page, filters);
	}

	public void save(InventoryStage entity) {
		inventoryStageDao.save(entity);
	}
}
