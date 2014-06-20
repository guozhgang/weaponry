package com.cce.weaponry.web.level;

import org.apache.struts2.convention.annotation.Namespace;
import org.springframework.beans.factory.annotation.Autowired;

import com.cce.modules.service.CrudServiceInterface;
import com.cce.weaponry.entity.level.CompanyLevelDetail;
import com.cce.weaponry.service.level.CompanyLevelDetailService;
import com.cce.weaponry.web.JsonCrudActionSupport;

@Namespace("/companylevel")
public class CompanyLevelDetailAction extends
		JsonCrudActionSupport<CompanyLevelDetail> {
	@Autowired
	protected CompanyLevelDetailService companyLevelDetailService;

	@Override
	public CrudServiceInterface<CompanyLevelDetail> getCrudService() {
		// TODO Auto-generated method stub
		return companyLevelDetailService;
	}


}
