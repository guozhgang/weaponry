package com.cce.weaponry.web.upload;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.util.Date;
import java.util.List;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.springframework.beans.factory.annotation.Autowired;

import com.cce.modules.orm.Page;
import com.cce.modules.security.springsecurity.SpringSecurityUtils;
import com.cce.modules.web.struts2.Struts2Utils;
import com.cce.weaponry.entity.register.FileBean;
import com.cce.weaponry.service.common.CompanyUtils;
import com.cce.weaponry.service.register.FileBeanService;
import com.cce.weaponry.web.JsonActionSupport;

@SuppressWarnings("unchecked")
@Namespace("/upload")
@Action("uploads")
public class FilesUploadAction extends JsonActionSupport {

	FilesUploadAction() {
		super();
		this.setContentType(DEFAULT_HTML_CONTENT_TYPE);
	}

	@Autowired
	private FileBeanService fileBeanService;

	// 标题 -- 表单
	private String title;

	// 上传的文件 -- Struts2内部
	private List<File> upload;

	// 文件类型 -- Struts2内部
	private List<String> uploadContentType;

	// 文件名称 -- Struts2内部
	private List<String> uploadFileName;

	// 相对于网站的保存路径
	private String savePath = ServletActionContext.getServletContext()
			.getInitParameter("uploadUrl"); // "/upload"; // 可配置

	// 允许上传的文件类型
	private String allowTypes = "image/bmp,image/png,image/gif,image/jpeg,image/jpg"; // 可配置

	// 文件大小 -- KB 为单位
	private Long maxSize = 2097152l; // 可配置

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

	public List<File> getUpload() {
		return upload;
	}

	public void setUpload(List<File> upload) {
		this.upload = upload;
	}

	public List<String> getUploadContentType() {
		return uploadContentType;
	}

	public void setUploadContentType(List<String> uploadContentType) {
		this.uploadContentType = uploadContentType;
	}

	public List<String> getUploadFileName() {
		return uploadFileName;
	}

	public void setUploadFileName(List<String> uploadFileName) {
		this.uploadFileName = uploadFileName;
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

		if (this.upload == null || this.upload.size() == 0) {
			this.errorMsg = "必须选择一个文件";
			return false;
		}

		// if (this.title == null) {
		// this.errorMsg = "文件标题不能为空";
		// return false;
		// }

		// 拦截文件类型
		// if (!filterType(getAllowTypes().split(","))) {
		// this.errorMsg = "您要上传的文件类型不正确！";
		// return false;
		// }

		// 拦截文件大小
		if (!filterSize(getMaxSize())) {
			this.errorMsg = "您要上传的文件太大，请重新选择！";
			return false;
		}

		return true;
	}

	// 过滤文件类型
	public boolean filterType(String[] types) {
		// 设置文件不符合类型
		for (String fileType : getUploadContentType()) {
			boolean isRight = false;
			for (String type : types) {
				// 类型符合则进行下一个文件的判断
				if (type.equals(fileType)) {
					isRight = true;
					break;
				} else {
					isRight = false;
				}
			}
			// 若循环完后还没有符合项,返回FALSE
			if (!isRight)
				return false;
		}
		// 若循环完后都符合,返回TRUE
		return true;
	}

	// 过滤文件大小
	public boolean filterSize(Long maxmumSize) {
		for (File f : upload) {
			if (null != maxmumSize) {
				if (f.length() >= maxmumSize)
					return false;
			}
		}
		return true;
	}

	// the method of upload file...
	public void upload() throws Exception {

		System.out.println("测试：物理路径：" + this.getSavePath() + "标题："
				+ this.getTitle() + "类型: " + this.getUploadContentType()
				+ "文件名: " + this.getUploadFileName());

		if (checkValid()) {
			try {
				String ids = "{";
				for (int i = 0; i < upload.size(); i++) {
					File f = upload.get(i);
					// 保存文件实体
					// 文件名称
					String fileName = CompanyUtils.getRandom("file") + "~"
							+ getUploadFileName().get(i);

					// 文件物理路径
					String realPath = getSavePath() + "\\" + fileName;

					// 相对网站的访问路径
					String relativePath = savePath + "\\" + fileName;

					FileOutputStream fos = new FileOutputStream(realPath);

					FileInputStream fis = new FileInputStream(f);

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
					fileBean.setCreateBy(SpringSecurityUtils
							.getCurrentUserName());
					fileBean.setCreateDate(new Date());
					fileBean.setFileType(getUploadContentType().get(i));
					fileBean.setFileURI(relativePath);

					fileBeanService.save(fileBean);

					ids += fileBean.getId() + ",";
				}
				ids = ids.substring(0, ids.length() - 1) + "}";
				this.renderMessage(true, ids);
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