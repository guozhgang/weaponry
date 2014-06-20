package com.cce.weaponry.service.training;

import java.io.File;
import java.util.Calendar;
import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cce.modules.orm.Page;
import com.cce.modules.orm.PropertyFilter;
import com.cce.modules.security.springsecurity.SpringSecurityUtils;
import com.cce.weaponry.dao.config.SysConfigDao;
import com.cce.weaponry.dao.training.FileInfoDao;
import com.cce.weaponry.entity.security.User;
import com.cce.weaponry.entity.training.FileInfo;
import com.cce.weaponry.entity.training.FileTypeInfo;
import com.cce.weaponry.service.security.UserCrudService;

@Service
@Transactional
public class FileMananger implements FileService {

	@Autowired
	private FileInfoDao fileDao;

	@Autowired
	private SysConfigDao sysConfigDao;

	@Autowired
	FileConfigServiceImpl fileConfig;

	@Autowired
	private UserCrudService userCrudService;


	public List<FileInfo> getFileByTitle(String title) {
		return fileDao.findBy("title", title);
	}
	public void deleteFile(FileInfo fi) {
		File file = new File(fi.getName());
		fileDao.delete(fi.getId());
		fileDao.getSession().flush();
		System.out.println("delete " + fi.getName());
		file.delete();
	}

	public List<FileInfo> getAllFile() {

		return fileDao.getAll();
	}

	public List<FileInfo> getFileListByType(int type) {
		return fileDao.getAll();
	}

	public void saveFile(FileInfo file) {
		fileDao.save(file);
	}

	boolean moveFile(String oldName, String newName) {

		File oldFile = new File(oldName);
		File newFile = new File(newName);

		File newDir = newFile.getParentFile();
		if (!newDir.exists()) {
			newDir.mkdirs();
		}
		if (oldFile.renameTo(newFile))
			return true;
		return false;
	}

	private void dprint(String name, String value) {
		System.out.print(name);
		System.out.print("=");
		System.out.println(value);
	}

	private void dprint(String name, int value) {
		System.out.print(name);
		System.out.print("=");
		System.out.println(value);
	}

	private String getFileId() {
		Calendar t = Calendar.getInstance();
		Random r = new Random(t.getTimeInMillis());
		String fn = String.valueOf(t.get(Calendar.YEAR))
				+ String.valueOf(t.get(Calendar.YEAR))
				+ String.valueOf(t.get(Calendar.MONTH))
				+ String.valueOf(t.get(Calendar.DAY_OF_MONTH))
				+ String.valueOf(t.get(Calendar.HOUR_OF_DAY))
				+ String.valueOf(t.get(Calendar.MINUTE))
				+ String.valueOf(t.get(Calendar.SECOND))
				+ String.valueOf(t.get(Calendar.MILLISECOND))
				+ String.valueOf(r.nextInt());

		return fn;
	}

	public void addFile(int fileType, String fileTitle, String tempFileName,
			String uploadFileName) throws Exception {

		dprint("fileType", fileType);
		dprint("fileTitle", fileTitle);
		dprint("tempFileName", tempFileName);
		dprint("uploadFileName", uploadFileName);

		FileTypeInfo typeInfo = fileConfig.getTypeInfo((long) fileType);

		FileInfo df = new FileInfo();
		Calendar t = Calendar.getInstance();

		df.setUploadTime(t.getTime());
		df.setUploadName(uploadFileName);

		df.setTitle(fileTitle);
		df.setType(typeInfo);
		df.setTypeName(typeInfo.getName());
		String userName = SpringSecurityUtils.getCurrentUserName();
		dprint("upload file user ", userName);
		//
		User user = userCrudService.findUserByLoginName(userName);
		if (user != null) {
			df.setOwnerUserId(user.getId());
		}

		// 生成一个唯一文件名
		// FileType ft = fileTypeDao.get(fileType);
		String fn = getFileId() + uploadFileName;
		String fullName;

		fullName = this.getBaseDirByTypeId(typeInfo.getId()) + fn;// .getBaseDir()

		dprint("save fullName", fullName);

		df.setName(fn);
		if (moveFile(tempFileName, fullName)) {
			dprint("savefile ok", "");
			fileDao.save(df);

		} else {
			fileDao.delete(df);
		}

	}

	public FileInfo getFile(Long id) {

		return fileDao.get(id);
	}

	@Transactional(readOnly = true)
	public Page<FileInfo> searchFile(final Page<FileInfo> page,
			final List<PropertyFilter> filters) {
		page.setOrder("desc");
		page.setOrderBy("uploadTime");
		fileDao.getSession().evict(FileInfo.class);
		return fileDao.findPage(page, filters);
	}

	public List<FileTypeInfo> getTypeInfoList(boolean all) throws Exception {

		return fileConfig.getTypeInfoList(all);
	}

	public void updateFileInfo(Long id, String title, int type)
			throws Exception {
		FileInfo info = getFile(id);
		info.setTitle(title);
		System.out.println("oldType" + info.getType());
		System.out.println("newType" + type);
		if (info.getType().getId() != type) {

			FileTypeInfo oldTypeInfo = fileConfig.getTypeInfo(info.getType()
					.getId());

			FileTypeInfo newTypeInfo = fileConfig.getTypeInfo((long) type);

			String oldFn = this.getBaseDirByTypeId(oldTypeInfo.getId())
					+ info.getName();
			String newFn = this.getBaseDirByTypeId(newTypeInfo.getId()) + info.getName();

			moveFile(oldFn, newFn);
			info.setType(newTypeInfo);
			info.setTypeName(newTypeInfo.getName());
		}
	}

	public String getBaseDirByTypeId(Long typeId) {
		String code = "";
		switch (typeId.intValue()) {
		case 1:// TYPE_DOC
			code = "doc_base_dir";
			break;
		case 2:// TYPE_VIDEO
			code = "video_base_dir";
			break;
		case 3:// TYPE_ONLINE
			code = "online_base_dir";
			break;
		}// refFile.getType().getBaseUrl() +
		return sysConfigDao.getValueByCode(code);
	}

}
