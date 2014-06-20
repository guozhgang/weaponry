package com.cce.weaponry.web.training;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.util.Calendar;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import com.cce.modules.web.struts2.Struts2Utils;
import com.cce.weaponry.entity.security.User;
import com.cce.weaponry.entity.training.FileInfo;
import com.cce.weaponry.entity.training.FileTypeInfo;
import com.cce.weaponry.service.common.CompanyUtils;
import com.cce.weaponry.service.config.SysConfigService;
import com.cce.weaponry.service.security.UserCrudService;
import com.cce.weaponry.service.training.FileConfigServiceImpl;
import com.cce.weaponry.service.training.FileInfoService;
import com.cce.weaponry.service.training.FileMananger;
import com.cce.weaponry.web.JsonActionSupport;

@SuppressWarnings("unchecked")
@Namespace("/training")
// @Results( { @Result(name = "success", location = "/WEB-INF/json_output.jsp")
// })
public class FileUploadAction extends JsonActionSupport {

	FileUploadAction() {
		super();
		this.setContentType(DEFAULT_HTML_CONTENT_TYPE);
	}

	@Autowired
	private FileInfoService fileInfoService;

	@Autowired
	private UserCrudService userCrudService;

	@Autowired
	private FileConfigServiceImpl fileConfig;

	@Autowired
	private SysConfigService sysConfigService;

	@Autowired
	private FileMananger fileMgr;

	private static boolean isInit;

	public String getConfigValue(String name) {
		return sysConfigService.getValueByCode(name);
	}

	// upload 这个名字和form的文件上传组件的name保持一致
	// 其余的工作都是客户端和struts2来实现
	private File upload;
	// private String fileName;
	private String title;
	private String targetFileName;
	private int fileType;
	private String errorMsg;
	// 文件类型 -- Struts2
	private String uploadContentType;

	// 文件名称 -- Struts2
	private String uploadFileName;

	// 相对于网站的保存路径
	private static String savePath; // = getConfigValue("savePath");//
	// "/WEB-INF/upload";
	// // 可配置

	// 允许上传的文件类型
	private static String allowTypes;// = getConfigValue("allowTypes");//
	// "image/bmp,image/png,image/gif,image/jpeg,image/jpg";

	// 文件大小 -- 以 KB 为单位
	private static Long maxSize;// = Long.parseLong(getConfigValue("maxSize"));

	// // 可配置

	public FileMananger getFileMgr() {
		return fileMgr;
	}

	public void setFileMgr(FileMananger fileMgr) {
		this.fileMgr = fileMgr;
	}

	public String getSavePath() {
		return Struts2Utils.getRequest().getRealPath(savePath);
	}

	public void setSavePath(String savePath) {
		this.savePath = savePath;
	}

	public String getAllowTypes() {
		return allowTypes;
	}

	public void setAllowTypes(String allowTypes) {
		this.allowTypes = allowTypes;
	}

	public Long getMaxSize() {
		return maxSize;
	}

	public void setMaxSize(Long maxSize) {
		this.maxSize = maxSize;
	}

	public String getFileConfigName() {
		HttpServletRequest req = Struts2Utils.getRequest();
		String fn = req.getSession().getServletContext().getRealPath("/")
				+ "WEB-INF/training-file.xml";
		return fn;
	}

	public String getErrorMsg() {
		return errorMsg;
	}

	public void setErrorMsg(String errorMsg) {
		this.errorMsg = errorMsg;
	}

	public int getFileType() {
		return fileType;
	}

	public void setFileType(int fileType) {
		// System.out.println("fileType" + fileType);
		this.fileType = fileType;
	}

	protected Logger logger = LoggerFactory.getLogger(getClass());

	public String getUploadFileName() {
		return CompanyUtils.trimBlank(uploadFileName);
	}

	public void setUploadFileName(String uploadFileName) {
		this.uploadFileName = CompanyUtils.trimBlank(uploadFileName);
	}

	public String getTargetFileName() {
		return this.targetFileName;
	}

	public void setTargetFileName(String fileName) {
		this.targetFileName = fileName;
	}

	public String getUploadContentType() {
		return uploadContentType;
	}

	public void setUploadContentType(String contentType) {
		this.uploadContentType = contentType;
	}

	boolean checkValid() {

		if (this.upload == null) {
			// System.out.println("upload is null");
			this.errorMsg = "必须选择一个文件";
			return false;
		}

		if (this.title == null) {
			// System.out.println("caption is null");
			this.errorMsg = "文件标题不能为空";
			return false;
		}
		// if (getTitle().length() < 10) {
		// this.errorMsg = "文件标题不能少于10个字！";
		// return false;
		// }

		return true;
	}

	/**
	 * 初始化类成员变量
	 */
	private void initData() {
		if (!isInit) {
			System.out.println("初始化类成员");
			this.setAllowTypes(getConfigValue("allowTypes"));
			this.setSavePath(getConfigValue("savePath"));
			this.setMaxSize(Long.parseLong(getConfigValue("maxSize")));
			isInit = true;
		}
	}

	@Override
	@Action("upload")
	public String execute() {
		initData();
		if (null != fileMgr.getFileByTitle(title)
 && fileMgr.getFileByTitle(title).size() > 0) {
			this.renderMessage(false, "文件标题已存在;请更改标题");
			return null;
		}
		System.out.println("测试： " + fileType);
		if (checkValid()) {
			try {
				if (1 == fileType || 4 == fileType) {
					// 保存文件实体
					// 文件名称
					String fileName = CompanyUtils.getRandom("file") + "~"
							+ getUploadFileName();

					// 文件物理路径
					String realPath = getSavePath() + File.separator + fileName;

					// 相对网站的访问路径
					String relativePath = savePath + File.separator + fileName;

					FileOutputStream fos = new FileOutputStream(realPath);

					FileInputStream fis = new FileInputStream(getUpload());

					byte[] buffer = new byte[1024];
					int len = 0;
					while ((len = fis.read(buffer)) > 0) {

						fos.write(buffer, 0, len);
					}

					fis.close();

					fos.close();

					// 保存文件对象
					FileTypeInfo typeInfo = fileConfig
							.getTypeInfo((long) fileType);
					FileInfo df = new FileInfo();
					Calendar t = Calendar.getInstance();

					df.setUploadTime(t.getTime());
					df.setUploadName(getUploadFileName());

					df.setTitle(this.title);
					df.setType(typeInfo);
					df.setTypeName(typeInfo.getName());

					User user = userCrudService.getLoginUser();
					if (user != null) {
						df.setOwnerUserId(user.getId());
					}

					df.setName(relativePath);

					fileInfoService.save(df);
					this.renderSuccess();
				} else if (2 == fileType) {
					try {
						fileMgr.addFile(this.fileType, this.title, this.upload
								.toString(), getUploadFileName());
						this.renderSuccess();
						return NONE;
					} catch (Exception e) {
						this.renderMessage(false, e.getMessage());
						e.printStackTrace();
					}
				}
				return NONE;
			} catch (Exception e) {
				this.renderMessage(false, e.getMessage());
				e.printStackTrace();
			}
		} else {
			this.renderMessage(false, this.errorMsg);
		}
		return NONE;
	}

	public File getUpload() {
		return upload;
	}

	public void setUpload(File upload) {

		this.upload = upload;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		System.out.println("set file title " + title);
		this.title = title;
	}

}
