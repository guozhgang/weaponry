package com.cce.weaponry.service.training;

import java.util.Date;

import com.cce.modules.service.CrudServiceInterface;
import com.cce.weaponry.entity.training.Entry;
import com.cce.weaponry.entity.training.FileInfo;
import com.cce.weaponry.entity.training.PublishType;

public interface EntryService extends CrudServiceInterface<Entry> {

	public abstract Entry getEntry(long id);

	public abstract void addEntry(Entry entry, long projectId, String title,
			FileInfo fileInfo, PublishType publishType, Date startTime,
			Date endTime);

	public abstract void deleteEntry(long id);
}
