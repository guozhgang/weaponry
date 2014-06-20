package com.cce.weaponry.web.news;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.struts2.convention.annotation.Namespace;
import org.springframework.beans.factory.annotation.Autowired;

import com.cce.modules.service.CrudServiceInterface;
import com.cce.modules.web.json.JsonStore;
import com.cce.weaponry.entity.news.NewsCategory;
import com.cce.weaponry.service.news.NewsCategoryCrudService;
import com.cce.weaponry.web.JsonCrudActionSupport;

@Namespace("/message")
public class NewsCategoryAction extends JsonCrudActionSupport<NewsCategory> {

	@Autowired
	protected NewsCategoryCrudService crudService;

	public List<NewsCategory> getCategoryList() {
		return crudService.getAll();
	}

	public void listBox() throws Exception {
		List<NewsCategory> categoryList = crudService.getAll();
		List<Map<String, Object>> list = new ArrayList<Map<String, Object>>(
				categoryList.size());
		Map<String, Object> map;
		for (NewsCategory category : categoryList) {
			map = new HashMap<String, Object>();
			map.put("id", category.getId());
			map.put("shorthand", category.getShorthand());
			list.add(map);
		}
		this.render(new JsonStore(list));
	}

	@Override
	public CrudServiceInterface<NewsCategory> getCrudService() {
		return crudService;
	}

	@Override
	public void save() throws Exception {
		try {
			NewsCategory entity = this.getRequestBean();
			if (entity != null) {
				if (crudService.saveNewsCategory(entity)) {
					render(new JsonStore(entity));
				} else {
					this.renderMessage(false, "此名称已经存在");
				}
			} else
				throw new RuntimeException("参数错误,指定的数据不存在!");
		} catch (Exception e) {
			this.renderMessage(false, e.getMessage());
			logger.error(e.getMessage(), e);
		}
	}

}
