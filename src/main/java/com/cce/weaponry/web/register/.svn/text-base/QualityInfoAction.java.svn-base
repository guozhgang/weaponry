package com.cce.weaponry.web.register;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.springframework.beans.factory.annotation.Autowired;

import com.cce.modules.service.CrudServiceInterface;
import com.cce.weaponry.entity.register.QualityInfo;
import com.cce.weaponry.service.register.CompanyInfoService;
import com.cce.weaponry.service.register.QualityInfoService;
import com.cce.weaponry.web.JsonCrudActionSupport;

@Namespace("/record")
@Action("qualityInfo")
public class QualityInfoAction extends JsonCrudActionSupport<QualityInfo> {

	@Autowired
	private QualityInfoService qualityInfoService;

	@Autowired
	private CompanyInfoService companyInfoService;

	@Override
	public CrudServiceInterface<QualityInfo> getCrudService() {
		return qualityInfoService;
	}



}
