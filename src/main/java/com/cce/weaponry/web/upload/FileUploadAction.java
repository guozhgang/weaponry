package com.cce.weaponry.web.upload;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.util.Date;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.springframework.beans.factory.annotation.Autowired;

import com.cce.modules.orm.Page;
import com.cce.modules.security.springsecurity.SpringSecurityUtils;
import com.cce.modules.web.struts2.Struts2Utils;
import com.cce.weaponry.entity.register.FileBean;
import com.cce.weaponry.service.common.CompanyUtils;
import com.cce.weaponry.service.config.SysConfigService;
import com.cce.weaponry.service.register.FileBeanService;
import com.cce.weaponry.web.JsonActionSupport;

@SuppressWarnings("unchecked")
@Namespace("/upload")
@Action("upload")
public class FileUploadAction extends JsonActionSupport {

	@Autowired
	private SysConfigService sysConfigService;

	private static boolean isInit;

	public String getConfigValue(String name) {
		return sysConfigService.getValueByCode(name);

		// try {
		// String configPath = Struts2Utils.getRequest().getRealPath("/")
		// + "/WEB-INF/classes/upload.xml";
		// System.out.println("configPath:" + configPath);
		// File f = new File(configPath);
		// DocumentBuilderFactory factory = DocumentBuilderFactory
		// .newInstance();
		// DocumentBuilder builder = factory.newDocumentBuilder();
		// Document doc = builder.parse(f);
		// String value = doc.getElementsByTagName(name).item(0)
		// .getFirstChild().getNodeValue();
		// System.out.println(value);
		// return value;
		// } catch (Exception e) {
		// System.out.println("异常...");
		// return null;
		// }
	}

	FileUploadAction() {
		super();
		this.setContentType(DEFAULT_HTML_CONTENT_TYPE);
	}

	@Autowired
	private FileBeanService fileBeanService;

	// 标题 -- 表单
	private String title;

	// 上传的文件 -- Struts2
	private File upload;

	// 文件类型 -- Struts2
	private String uploadContentType;

	// 文件名称 -- Struts2
	private String uploadFileName;

	// 相对于网站的保存路径
	private static String savePath;// = getConfigValue("savePath");//
	// "/WEB-INF/upload";
	// // 可配置

	// 允许上传的文件类型
	private static String allowTypes;// = getConfigValue("allowTypes");//
	// "image/bmp,image/png,image/gif,image/jpeg,image/jpg";

	// 文件大小 -- 以 KB 为单位
	private static Long maxSize;// = Long.parseLong(getConfigValue("maxSize"));
								// // 可配置

	// 验证出错 -- 错误消息
	private String errorMsg;

	public String getErrorMsg() {
		return errorMsg;
	}

	public void setErrorMsg(String errorMsg) {
		this.errorMsg = errorMsg;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public File getUpload() {
		return upload;
	}

	public void setUpload(File upload) {
		this.upload = upload;
	}

	public String getUploadContentType() {
		return uploadContentType;
	}

	public void setUploadContentType(String uploadContentType) {
		this.uploadContentType = uploadContentType;
	}

	public String getUploadFileName() {
		return CompanyUtils.trimBlank(uploadFileName);
	}

	public void setUploadFileName(String uploadFileName) {
		this.uploadFileName = CompanyUtils.trimBlank(uploadFileName);
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

	// 验证上传的文件
	boolean checkValid() {

		if (this.upload == null) {
			this.errorMsg = "必须选择一个文件";
			return false;
		}

		// if (this.title == null) {
		// this.errorMsg = "文件标题不能为空";
		// return false;
		// }
		//
		// if (!filterType(getAllowTypes().split(","))) {
		// this.errorMsg = "您要上传的文件类型不正确！";
		// return false;
		// }

		if (!filterSize(getMaxSize())) {
			this.errorMsg = "您要上传的文件太大，请重新选择！";
			return false;
		}

		return true;
	}

	// 过滤文件类型
	public boolean filterType(String[] types) {
		String fileType = getUploadContentType();

		for (String type : types) {
			if (type.equals(fileType))
				return true;
		}

		return false;
	}

	// 过滤文件大小
	public boolean filterSize(Long maxmumSize) {
		System.out.println("测试" + upload.length());
		if (null != maxmumSize) {
			if (upload.length() <= maxmumSize)
				return true;
		}

		return false;
	}

	/**
	 * 初始化类成员变量
	 */
	private void initData() {
		if (!isInit) {
			System.out.println("初始化类成员变量");
			this.setSavePath(getConfigValue("savePath"));
			this.setAllowTypes(getConfigValue("allowTypes"));
			this.setMaxSize(Long.parseLong(getConfigValue("maxSize")));
			isInit = true;
		}
	}

	// the method of upload file...
	public void upload() throws Exception {
		initData();
		System.out.println("测试：物理路径：" + this.getSavePath() + "标题："
				+ this.getTitle() + "类型: " + this.getUploadContentType()
				+ "文件名: " + this.getUploadFileName());

		if (checkValid()) {
			try {
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
				FileBean fileBean = new FileBean();

				fileBean.setContent(null);
				fileBean.setCreateBy(SpringSecurityUtils.getCurrentUserName());
				fileBean.setCreateDate(new Date());
				fileBean.setFileType(uploadContentType);
				fileBean.setFileURI(relativePath);

				fileBeanService.save(fileBean);

				this.renderMessage(true, fileBean.getId().toString());
			} catch (Exception e) {
				this.renderMessage(false, e.getMessage());
				e.printStackTrace();
			}
		} else {
			this.renderMessage(false, this.errorMsg);
		}

	}

	public void list() throws Exception {
		Page<FileBean> fileBeans = fileBeanService.list(this.setupPage(), this
				.setupFilters());
		this.render(fileBeans);
	}

	public void delete() throws Exception {
		FileBean fileBean = fileBeanService.get(getIdParam());
		if (fileBean == null) {
			renderMessage(false, "无效参数");
		} else {
			// 删除物理文件
			File file = new File(fileBean.getFileURI());
			file.delete();
			// 删除数据库信息
			fileBeanService.delete(getIdArrayParam());
			renderSuccess();
		}
	}

}
