package com.cce.weaponry.service.level;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import sun.security.util.Debug;

import com.cce.modules.orm.Page;
import com.cce.modules.orm.PropertyFilter;
import com.cce.modules.service.CrudServiceInterface;
import com.cce.weaponry.dao.level.CompanyLevelItemTemplateDao;
import com.cce.weaponry.entity.level.CompanyLevelItemTemplate;

@Service
@Transactional
public class CompanyLevelItemTemplateService implements CrudServiceInterface<CompanyLevelItemTemplate> {

	@Autowired
	private CompanyLevelItemTemplateDao companyLevelItemTemplateDao;

	/**
	 * 等级模板信息加载
	 * 
	 * @param levelNo
	 *            等级
	 */
 	@Transactional(readOnly = true)
	public List<CompanyLevelItemTemplate> showLevelTemplate(Long levelNo) {
		// TODO Auto-generated method stub
		String hql = "select new Map(id as id,itemid as itemid,description as  description,itemName as itemName,levelTemplate as levelNo) from CompanyLevelItemTemplate c where c.levelTemplate='"
				+ levelNo
				+ "' group by c.id,c.itemid,c.description,c.itemName,c.levelTemplate order by c.id ";
		 
		 List list = companyLevelItemTemplateDao
		 .find(hql.toString());
		 Map map = new HashMap();
		 List<CompanyLevelItemTemplate> res = new
		 ArrayList<CompanyLevelItemTemplate>();
		 CompanyLevelItemTemplate cl;
		 for (int i = 0; i < list.size(); i++) {
		 map = (Map) list.get(i);
		 cl = new CompanyLevelItemTemplate();
		 cl.setId((Long) map.get("id"));
		 cl.setItemid((String) map.get("itemid"));
		 cl.setItemName((String) map.get("itemName"));
		 cl.setDescription((String) map.get("description"));
		 res.add(cl);
		 }
		Debug.println("申请分级或查看申请项时查看分级申请模板", hql);
		return res;// companyLevelItemTemplateDao.find(hql.toString());
	}

	/**
	 * 加载级别模板项名称
	 */
	@Transactional(readOnly = true)
	public List<CompanyLevelItemTemplate> getItemTemplateName(Long Level) {
		String hql = "select  new Map(min(c.itemid) as id,c.itemName as itemName)    from     CompanyLevelItemTemplate c where c.levelTemplate='"
				+ Level + "'  group  by c.itemid";
		List maps = companyLevelItemTemplateDao.find(hql);
		List<CompanyLevelItemTemplate> list = new ArrayList<CompanyLevelItemTemplate>();
		Map<String, String> value = new HashMap<String, String>();
		for (int i = 0; i < maps.size(); i++) {
			Map map = (Map) maps.get(i);
			String id = (String) map.keySet().iterator().next();
			String itemName = (String) map.values().iterator().next();
		 
			CompanyLevelItemTemplate ct = new CompanyLevelItemTemplate();
			ct.setItemid(id);
			ct.setItemName(itemName);
			list.add(ct);
		}
		Debug.println("加载分级申请模板的名称 ", hql);
		return list;
	}

	/**
	 * 删除子模板信息
	 */
	public void delete(List<Long> ids) {
		companyLevelItemTemplateDao.delete(ids);
	}

	/**
	 * 查看子模板信息
	 */
	public CompanyLevelItemTemplate get(Long id) {
		return companyLevelItemTemplateDao.get(id);
	}

	public List<CompanyLevelItemTemplate> list(List<PropertyFilter> filters) {
		return companyLevelItemTemplateDao.find(filters);
	}

	public Page<CompanyLevelItemTemplate> list(Page<CompanyLevelItemTemplate> page, List<PropertyFilter> filters) {
		return companyLevelItemTemplateDao.findPage(page, filters);
	}

	public void save(CompanyLevelItemTemplate entity) {
		companyLevelItemTemplateDao.save(entity);
	}
}
