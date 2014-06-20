package com.cce.weaponry.web.upload;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.beans.factory.annotation.Autowired;

import com.cce.modules.web.struts2.Struts2Utils;
import com.cce.weaponry.entity.register.FileBean;
import com.cce.weaponry.entity.training.FileInfo;
import com.cce.weaponry.service.config.SysConfigService;
import com.cce.weaponry.service.register.FileBeanService;
import com.cce.weaponry.service.training.FileInfoService;
import com.opensymphony.xwork2.ActionSupport;

/**
 * @author Administrator
 * 
 */
@Action("download")
@Result(type = "stream", name = "success", params = { "inputName",
		"targetFile", "contentDisposition",
		"attachment;filename=${downloadFileName}" })
// 
public class FileDownloadAction extends ActionSupport {

	// <result name="success" type="stream">
	// <param name="contentType">application\zip</param>
	// <param name="inputName">targetFile</param>
	// <param name="contentDisposition">filename="download2.zip"</param>
	// <param name="bufferSize">4096</param>
	// </result>

	private static boolean isInit;

	@Autowired
	private SysConfigService sysConfigService;

	@Autowired
	private FileInfoService fileInfoService;

	@Autowired
	private FileBeanService fileBeanService;

	// 下载文件名称
	private String downloadFileName;

	// 文件存储的文件夹
	private static String folderPosition; // =

	// FileUploadAction.getConfigValue("savePath");

	public String getFolderPosition() {
		return folderPosition;
	}

	public void setFolderPosition(String folderPosition) {
		this.folderPosition = folderPosition;
	}

	public String getDownloadFileName() throws Exception {
		return new String(downloadFileName.getBytes("gb2312"), "iso-8859-1");
	}

	public void setDownloadFileName(String downloadFileName) {
		this.downloadFileName = downloadFileName;
	}

	private String filePath;
	private String realPath;

	public String getRealPath() {
		return realPath;
	}

	public void setRealPath(String realPath) {
		this.realPath = realPath;
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
		// return ServletActionContext.getServletContext().getResourceAsStream(
		// getFilePath());
		System.out.println(getRealPath());
		return new FileInputStream(getRealPath());
	}

	public String getConfigValue(String name) {
		return sysConfigService.getValueByCode(name);
	}

	/**
	 * 初始化类成员
	 */
	private void initData() {
		if (!isInit) {
			System.out.println("初始化类成员");
			this.setFolderPosition(getConfigValue("savePath"));
			isInit = true;
		}
	}

	@Override
	public String execute() throws Exception {
		initData();
		try {
			// 文件路径
			String fileURI = "";
			String idStr = Struts2Utils.getParameter("id");

			if (null != idStr) {
				// 文件id
				Long fileId = Long.parseLong(idStr);
				// 文件
				FileBean fileBean = fileBeanService.get(fileId);
				fileURI = fileBean.getFileURI();

			} else {
				Long fileId = Long.parseLong(Struts2Utils
						.getParameter("fileId"));
				FileInfo fileInfo = fileInfoService.get(fileId);
				fileURI = fileInfo.getName();
			}

			// 文件路径
			setFilePath(fileURI.substring(
					fileURI.lastIndexOf(folderPosition) + 1, fileURI.length()));
			System.out.println("DownloadPath=" + getFilePath());
			// 文件名称
			setDownloadFileName(getFilePath().substring(
					getFilePath().lastIndexOf("~") + 1, getFilePath().length()));
			System.out.println("DownloadFile="
					+ (realPath = Struts2Utils.getRequest().getRealPath(
							folderPosition)
							+ fileURI.substring(fileURI
									.lastIndexOf(File.separator), fileURI
									.length())));
			if ((new File(realPath)).exists())
				return SUCCESS;
			Struts2Utils.getResponse().getWriter().write(
					"{\"data\":\"message\":\"文件不存在！\",\"success\":false}");
			return NONE;
		} catch (Exception e) {
			Struts2Utils.getResponse().getWriter().write(
					"{\"data\":\"message\":\"文件不存在！\",\"success\":false}");
			return NONE;
		}
	}

}
