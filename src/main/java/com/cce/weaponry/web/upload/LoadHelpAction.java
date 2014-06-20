package com.cce.weaponry.web.upload;

import java.io.FileInputStream;
import java.io.InputStream;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.beans.factory.annotation.Autowired;

import com.cce.modules.web.struts2.Struts2Utils;
import com.cce.weaponry.entity.security.User;
import com.cce.weaponry.service.security.UserCrudService;
import com.opensymphony.xwork2.ActionSupport;

/**
 * 用于根据不同用户下载平台操作手册
 * 
 */
@Action("loadhelp")
@Result(type = "stream", name = "success", params = { "contentType",
		"application/msword", "inputName",
		"targetFile", "contentDisposition",
		"attachment;filename=${downloadFileName}", "bufferSize", "4096" })
// 
public class LoadHelpAction extends ActionSupport {

	@Autowired
	private UserCrudService userService;

	// 下载文件名称
	private String downloadFileName;

	private String filePath;

	public String getDownloadFileName() throws Exception {
		Struts2Utils.getResponse().setHeader("charset", "ISO-8859-1");
		return new String(downloadFileName.getBytes("gb2312"), "ISO-8859-1");
	}

	public void setDownloadFileName(String downloadFileName) {
		this.downloadFileName = downloadFileName;
	}

	public String getFilePath() {
		return filePath;
	}

	public void setFilePath(String filePath) {
		this.filePath = filePath;
	}

	// 得到输出流
	public InputStream getTargetFile() throws Exception {
		// 根据相对路径得到输出流
		return new FileInputStream(Struts2Utils.getRequest().getRealPath(
				getFilePath()));
	}

	@Override
	public String execute() throws Exception {
		User loginUser = userService.getLoginUser();
		String fileName = "放心肉监管平台操作手册_";
		if (null == loginUser)
			return NONE;
		else {
			String roleName = loginUser.getRole().getName();
			fileName = fileName + roleName + ".doc";
			setDownloadFileName(fileName);
			setFilePath("WEB-INF/help/" + fileName);
		}
		System.out.println("realPath : "
				+ Struts2Utils.getRequest().getRealPath(getFilePath()));
		return SUCCESS;
	}

}
