package com.cce.weaponry.web.level;

import org.apache.struts2.convention.annotation.Namespace;
import org.springframework.beans.factory.annotation.Autowired;

import com.cce.modules.service.CrudServiceInterface;
import com.cce.weaponry.entity.level.CompanyLevelItemTemplate;
import com.cce.weaponry.service.level.CompanyLevelItemTemplateService;
import com.cce.weaponry.web.JsonCrudActionSupport;

@Namespace("/companylevel")
public class CompanyLevelItemTemplateAction extends
		JsonCrudActionSupport<CompanyLevelItemTemplate> {
	@Autowired
	protected CompanyLevelItemTemplateService companyLevelItemTemplateService;

	@Override
	public CrudServiceInterface<CompanyLevelItemTemplate> getCrudService() {
		// TODO Auto-generated method stub
		return companyLevelItemTemplateService;
	}

}
