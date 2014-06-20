package com.cce.weaponry.web.vo.mainpage;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import javax.persistence.Transient;

import com.cce.weaponry.entity.training.Entry;
import com.cce.weaponry.service.common.CompanyUtils;
import com.cce.weaponry.web.vo.BaseVO;

public class MainPageTrainingVO extends BaseVO {
	private static final long serialVersionUID = 1L;
	private String title = "•&nbsp培训通知";
	private List<Entry> entryList = new ArrayList<Entry>();
	private String html;

	@Transient
	public List<Entry> getNews() {
		return entryList;
	}

	public void setNews(List<Entry> entryList) {
		this.entryList = entryList;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	// public String getHtml() {
	// StringBuffer sb = new StringBuffer();
	// for (Iterator it = msgs.entrySet().iterator(); it.hasNext(); )
	// {
	// Map.Entry entry = (Map.Entry) it.next();
	// sb.append("<p>【").append(title).append("】&nbsp;<a href=\"javascript:showNews(").append(entry.getKey()).append(",\'").append(
	// entry.getValue()).append("\')\">").append(entry.getValue()).append("</a></p>");
	// }
	// return sb.toString();
	// }

	public String getHtml() {
		StringBuffer sb = new StringBuffer();

		sb
				.append("<table><tr><td valign='middle'><img src='/safepork/images/icons/training.gif'/></td><td>");

		for (Iterator<Entry> iterator = entryList.iterator(); iterator
				.hasNext();) {
			Entry entry = (Entry) iterator.next();
			sb.append("<p> • 【").append(
					CompanyUtils.formatDate(entry.getStartTime(),
							"yyyy-MM-dd HH:mm:ss")).append(" - ").append(
					CompanyUtils.formatDate(entry.getEndTime(),
							"yyyy-MM-dd HH:mm:ss")).append("】&nbsp;").append(
					entry.getTitle()).append("</p>");
		}

		sb.append("</td></tr></table>");

		return sb.toString();
	}

	public void setHtml(String html) {
		this.html = html;
	}

	// public int getWidth() {
	// return width;
	// }
	//
	// public void setWidth(int width) {
	// this.width = width;
	// }

	// public Hashtable<Long, String> getMsgs() {
	// return msgs;
	// }
	//
	// public void setMsgs(Hashtable<Long, String> msgs) {
	// this.msgs = msgs;
	// }

}
