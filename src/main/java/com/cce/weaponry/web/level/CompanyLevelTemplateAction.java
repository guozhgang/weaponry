package com.cce.weaponry.web.level;

import org.apache.struts2.convention.annotation.Namespace;
import org.springframework.beans.factory.annotation.Autowired;

import com.cce.modules.service.CrudServiceInterface;
import com.cce.weaponry.entity.level.CompanyLevelTemplate;
import com.cce.weaponry.service.level.CompanyLevelTemplateService;
import com.cce.weaponry.web.JsonCrudActionSupport;

@Namespace("/companylevel")
public class CompanyLevelTemplateAction extends
		JsonCrudActionSupport<CompanyLevelTemplate> {
	@Autowired
	protected CompanyLevelTemplateService templateService;


	@Override
	public CrudServiceInterface<CompanyLevelTemplate> getCrudService() {
		// TODO Auto-generated method stub
		return templateService;
	}


 
}
