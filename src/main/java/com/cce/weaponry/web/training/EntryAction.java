package com.cce.weaponry.web.training;

import java.util.List;

import org.apache.struts2.convention.annotation.Namespace;

import com.cce.modules.orm.Page;
import com.cce.modules.service.CrudServiceInterface;
import com.cce.modules.web.json.JsonStore;
import com.cce.weaponry.entity.training.Entry;
import com.cce.weaponry.entity.training.Project;
import com.cce.weaponry.service.training.EntryServiceImpl;
import com.cce.weaponry.web.JsonCrudActionSupport;

import flexjson.JSONSerializer;

@Namespace("/training")
public class EntryAction extends JsonCrudActionSupport<Entry> {


	EntryServiceImpl entryService;
	
	

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.cce.safepork.web.JsonCrudActionSupport#list()
	 */
	@Override
	public void list() throws Exception {
		Page<Entry> page = this.setupPage();
		page.setOrder("desc");
		page.setOrderBy("startTime");
		page = this.getCrudService().list(page,
				this.setupFilters());
		this.render(page);
	}

	public void getVodList() {
		List<Entry> list = entryService.getEntryByProject(Project.VOD);
		JsonStore model = new JsonStore(list);

		JSONSerializer js = this.getJsonSerializer();
		// new JSONSerializer().exclude(".parent");

		String json = js.exclude("*.parent").serialize(model);

		this.render(json);

	}

	@Override
	public CrudServiceInterface<Entry> getCrudService() {

		return null;
	}

}
