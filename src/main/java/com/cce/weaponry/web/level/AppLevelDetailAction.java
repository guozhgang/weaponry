package com.cce.weaponry.web.level;

import org.apache.struts2.convention.annotation.Namespace;
import org.springframework.beans.factory.annotation.Autowired;

import com.cce.modules.service.CrudServiceInterface;
import com.cce.weaponry.entity.level.ApproveLevelDetail;
import com.cce.weaponry.service.level.ApproveLevelDetailService;
import com.cce.weaponry.web.JsonCrudActionSupport;

@Namespace("/companylevel")
public class AppLevelDetailAction extends
		JsonCrudActionSupport<ApproveLevelDetail> {
	@Autowired
	protected ApproveLevelDetailService approveLevelDetailService;


	@Override
	public CrudServiceInterface<ApproveLevelDetail> getCrudService() {
		// TODO Auto-generated method stub
		return approveLevelDetailService;
	}

}
