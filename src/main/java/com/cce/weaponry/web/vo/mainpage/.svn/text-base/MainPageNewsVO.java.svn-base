package com.cce.weaponry.web.vo.mainpage;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import javax.persistence.Transient;

import com.cce.weaponry.entity.news.NewsPage;
import com.cce.weaponry.web.vo.BaseVO;

public class MainPageNewsVO extends BaseVO {
	// public static final String TITLE_NEWS = "信息专栏";
	// public static final String TITLE_TRAINING = "培训通知";
	private String title = "•&nbsp信息专栏";
	private List<NewsPage> news = new ArrayList<NewsPage>();
	private String html;

	// private int width = 380;
	// private Hashtable<Long, String> msgs = new Hashtable<Long, String>();//
	// key：消息的ID，value：消息的内容

	@Transient
	public List<NewsPage> getNews() {
		return news;
	}

	public void setNews(List<NewsPage> news) {
		this.news = news;
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
.append("<table><tr>");
		if (news.size() == 0) {
			sb
.append("<td><img src='images/icons/infomation.gif'/></td>");
		} else {
			sb.append("<td rowspan=");
			sb.append(news.size());
			sb.append("><img src='images/icons/infomation.gif'/></td>");
				sb.append("<td>");
			for (Iterator<NewsPage> iterator = news.iterator(); iterator
					.hasNext();) {
				NewsPage newsPage = (NewsPage) iterator.next();

			sb.append("<p>•&nbsp;&nbsp【").append(newsPage.getCategoryName())
					.append(
					"】&nbsp;<a href=\"javascript:showNews(").append(
					newsPage.getId()).append(
					",\'").append(newsPage.getTitle()).append("\')\">").append(newsPage.getTitle()).append("</a></p>");
			}
			sb.append("</td>");
		}
		sb.append("</tr></table>");
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
