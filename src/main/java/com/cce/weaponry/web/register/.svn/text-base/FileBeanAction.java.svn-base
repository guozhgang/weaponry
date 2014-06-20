package com.cce.weaponry.web.register;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.springframework.beans.factory.annotation.Autowired;

import com.cce.modules.service.CrudServiceInterface;
import com.cce.weaponry.entity.register.FileBean;
import com.cce.weaponry.service.register.FileBeanService;
import com.cce.weaponry.web.JsonCrudActionSupport;

@Namespace("/record")
@Action("fileBean")
public class FileBeanAction extends JsonCrudActionSupport<FileBean> {

	@Autowired
	private FileBeanService fileBeanService;

	@Override
	public CrudServiceInterface<FileBean> getCrudService() {
		return fileBeanService;
	}
}
