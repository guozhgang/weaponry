package com.cce.weaponry.entity.training;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

/*
 * 普通文件,视频文件,在线文档 3种类型
 * 
 * 
 *  
 */
@Entity
@Table(name = "SS_TRAINING_FILE_TYPE")
public class FileTypeInfo {

	public final static Long TYPE_DOC = 1L;
	public final static Long TYPE_VIDEO = 2L;
	public final static Long TYPE_ONLINE = 3L;

	private Long id;// 编号

	private String name;// 名称

	// private String baseDir;// 基本路径

	// private String baseUrl;

	public void setName(String name) {
		this.name = name;
	}

	public String getName() {
		return name;
	}

	// public void setBaseDir(String baseFileDir) {
	// this.baseDir = baseFileDir;
	// }
	//
	// public String getBaseDir() {
	// return baseDir;
	// }

	public void setId(Long id) {
		this.id = id;
	}

	@Id
	public Long getId() {
		return id;
	}

	@Transient
	public String getCode() {
		String code = null;
		if (null != this.id) {
			switch (this.id.intValue()) {
			case 2:
				code = "video_base_url";
				break;
			case 3:
				code = "online_base_url";
				break;
			}
		}
		return code;
	}

	// public void setBaseUrl(String baseUrl) {
	// this.baseUrl = baseUrl;
	// }
	//
	// public String getBaseUrl() {
	// return baseUrl;
	// }

	// public void setId(String id) {
	// this.id = Integer.parseInt(id);
	// }

}
