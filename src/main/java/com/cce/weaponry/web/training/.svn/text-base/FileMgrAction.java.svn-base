package com.cce.weaponry.web.training;

import java.util.List;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.springframework.beans.factory.annotation.Autowired;

import com.cce.modules.orm.Page;
import com.cce.modules.web.json.JsonStore;
import com.cce.weaponry.entity.training.FileInfo;
import com.cce.weaponry.entity.training.FileTypeInfo;
import com.cce.weaponry.service.training.EntryServiceImpl;
import com.cce.weaponry.service.training.FileMananger;
import com.cce.weaponry.web.JsonActionSupport;

@Namespace("/training")
@Action("filemgr")
public class FileMgrAction extends JsonActionSupport<FileInfo> {

	@Autowired
	private FileMananger fileMgr;
	@Autowired
	private EntryServiceImpl entryServiceImpl;

	public void autoLoadFileTypeInfo() {
		try {
			fileMgr.getTypeInfoList(true);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public int getType() {
		return type;
	}

	public void setType(int type) {
		this.type = type;
	}

	private Long id;
	private String title;
	private int type;

	public void list() {

		autoLoadFileTypeInfo();
		Page<FileInfo> page = fileMgr.searchFile(this.setupPage(),
				setupFilters());
		this.render(page);
	}

	// public String getFileConfigName() {
	// HttpServletRequest req = Struts2Utils.getRequest();
	// String fn = req.getSession().getServletContext().getRealPath("/")
	// + "WEB-INF/training-file.xml";
	// return fn;
	// }

	public void getTypeInfoList() {
		try {
			List<FileTypeInfo> list = fileMgr.getTypeInfoList(false);
			JsonStore model = new JsonStore(list);
			render(model);

		} catch (Exception e) {
			e.printStackTrace();
		}

	}


	public void delete() throws Exception {
		List<Long> ids = entryServiceImpl.getEntryIDs(getIdArrayParam());
		if (ids.size() > 0) {
		System.out.println(ids);
		}
		if (ids.size() > 0) {
			entryServiceImpl.delete(ids);
		}
		for (Long i : getIdArrayParam()) {
			FileInfo entry = fileMgr.getFile(i);
			if (null != entry) {
				fileMgr.deleteFile(entry);
			}
		}
		this.renderMessage(true, "操作成功");
	}

	// fileInfo 可以用修改的字段不多,
	public void updateInfo() {
		if (null != fileMgr.getFileByTitle(title)
				&& fileMgr.getFileByTitle(title).size() > 0) {
			this.renderMessage(false, "文件标题已存在;请更改标题");
			return;
		}
		try {
			fileMgr.updateFileInfo(id, title, type);
			this.renderMessage(true, "修改成功");
		} catch (Exception e) {
			e.printStackTrace();
			renderMessage(false, e.getMessage());
		}
	}

	//
	public void saveOnLine() throws Exception {
		// FileInfo fileInfo = this.getRequestBean();
		// fileMgr.saveFile(fileInfo);
		// renderSuccess();
	}

}
