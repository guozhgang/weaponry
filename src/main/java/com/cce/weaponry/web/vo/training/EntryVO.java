package com.cce.weaponry.web.vo.training;

import com.cce.weaponry.web.vo.BaseVO;

public class EntryVO extends BaseVO {
	private String url;
	private Long refFile;
	private Integer status;
	private String statusText;
	private String startTimeString;
	private String endTimeString;
	private String title;
	/**
	 * @return the status
	 */
	public Integer getStatus() {
		return status;
	}

	/**
	 * @param status
	 *            the status to set
	 */
	public void setStatus(Integer status) {
		this.status = status;
	}

	/**
	 * @return the statusText
	 */
	public String getStatusText() {
		return statusText;
	}

	/**
	 * @param statusText
	 *            the statusText to set
	 */
	public void setStatusText(String statusText) {
		this.statusText = statusText;
	}

	/**
	 * @return the startTimeString
	 */
	public String getStartTimeString() {
		return startTimeString;
	}

	/**
	 * @param startTimeString
	 *            the startTimeString to set
	 */
	public void setStartTimeString(String startTimeString) {
		this.startTimeString = startTimeString;
	}

	/**
	 * @return the endTimeString
	 */
	public String getEndTimeString() {
		return endTimeString;
	}

	/**
	 * @param endTimeString
	 *            the endTimeString to set
	 */
	public void setEndTimeString(String endTimeString) {
		this.endTimeString = endTimeString;
	}

	/**
	 * @return the url
	 */
	public String getUrl() {
		return url;
	}

	/**
	 * @param url
	 *            the url to set
	 */
	public void setUrl(String url) {
		this.url = url;
	}

	/**
	 * @return the refFile
	 */
	public Long getRefFile() {
		return refFile;
	}

	/**
	 * @param refFile
	 *            the refFile to set
	 */
	public void setRefFile(Long refFile) {
		this.refFile = refFile;
	}

	/**
	 * @return the title
	 */
	public String getTitle() {
		return title;
	}

	/**
	 * @param title
	 *            the title to set
	 */
	public void setTitle(String title) {
		this.title = title;
	}

}
