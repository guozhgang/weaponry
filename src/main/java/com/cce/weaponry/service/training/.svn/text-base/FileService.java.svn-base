package com.cce.weaponry.service.training;

import java.util.List;

import com.cce.modules.orm.Page;
import com.cce.modules.orm.PropertyFilter;
import com.cce.weaponry.entity.training.FileInfo;
import com.cce.weaponry.entity.training.FileTypeInfo;



public interface FileService {

	// public abstract void setConfigName(String configName);

	// public abstract void saveFile(FileInfo file);

	public abstract void deleteFile(FileInfo file);

	public abstract List<FileInfo> getFileListByType(int type);

	public abstract List<FileInfo> getAllFile();

	public abstract void addFile(int fileType, String fileTitle,
			String tempFileName, String uploadFileName) throws Exception;


	public abstract List<FileTypeInfo> getTypeInfoList(boolean all)
			throws Exception;

	// public abstract List<RemoveFileTypeInfo> getTypeInfoList(boolean all)
	// throws Exception;

	public abstract Page<FileInfo> searchFile(final Page<FileInfo> page,
			final List<PropertyFilter> filters);

	public abstract void updateFileInfo(Long id, String title, int type)
			throws Exception;
}
