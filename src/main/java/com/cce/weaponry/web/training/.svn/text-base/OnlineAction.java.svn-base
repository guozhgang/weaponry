package com.cce.weaponry.web.training;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;

import com.opensymphony.xwork2.ActionSupport;

@SuppressWarnings("serial")
@Namespace("/training")
@Action("online")
@Results( { @Result(name = "success", location = "/WEB-INF/content/training-online.jsp") })
public class OnlineAction extends ActionSupport {

	private Long id;
	private String msg;
	private String url;
	private String title;

	String openPage() {

		
		return SUCCESS;
	}

	void addMsg() {

	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getId() {
		return id;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public String getMsg() {
		return msg;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getUrl() {
		return url;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getTitle() {
		return title;
	}
	
}
