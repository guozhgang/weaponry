package com.cce.weaponry.web.training;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.springframework.beans.factory.annotation.Autowired;

import com.cce.weaponry.service.training.FileConfigServiceImpl;
import com.cce.weaponry.web.JsonActionSupport;

@Namespace("/training")
@Action("resetconfig")
public class ResetConfigAction extends JsonActionSupport {

	
	@Autowired
	private FileConfigServiceImpl fileConfig;

	public void exec() {

		fileConfig.reload();
		
		
	}
}
