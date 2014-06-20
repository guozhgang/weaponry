package com.cce.weaponry.web.vo.mainpage;

import com.cce.weaponry.web.vo.BaseVO;

public class MainPageTaskVO extends BaseVO {
	private int unreadMail;
	private int totalTask;
	private int registerTask;
	private int levelTask;
	private int creditTask;
	private int innoTask;
	private boolean showTask = false;

	public boolean isShowTask() {
		return showTask;
	}

	public void setShowTask(boolean showTask) {
		this.showTask = showTask;
	}

	public int getUnreadMail() {
		return unreadMail;
	}

	public void setUnreadMail(int unreadMail) {
		this.unreadMail = unreadMail;
	}

	public int getTotalTask() {
		return totalTask;
	}

	public void setTotalTask(int totalTask) {
		this.totalTask = totalTask;
	}

	public int getRegisterTask() {
		return registerTask;
	}

	public void setRegisterTask(int registerTask) {
		this.registerTask = registerTask;
	}

	public int getLevelTask() {
		return levelTask;
	}

	public void setLevelTask(int levelTask) {
		this.levelTask = levelTask;
	}

	public int getCreditTask() {
		return creditTask;
	}

	public void setCreditTask(int creditTask) {
		this.creditTask = creditTask;
	}

	public int getInnoTask() {
		return innoTask;
	}

	public void setInnoTask(int innoTask) {
		this.innoTask = innoTask;
	}

	@Override
	public String toString() {
		if (showTask)
			return new StringBuilder(
					"<table><tr><td valign='middle'><img src='images/icons/email.gif'/> </td><td>邮件：<span style=\"color:#0099FF\"><b>")
					.append(unreadMail)
					.append(
							"</b></span> 封未读邮件</td></tr><tr><td valign='middle'><img src='images/icons/task.gif'/> ")
					.append("</td><td>任务：<span style=\"color:#0099FF\"><b>")
					.append(totalTask).append(
							"</b></span> 个待处理任务</td></tr><tr><td>&nbsp;</td>")
					.append("<td>(1).企业备案 <span style=\"color:#0099FF\"><b>")
					.append(registerTask).append("</b></span> 个 &nbsp;&nbsp;")
					.append("(2).企业分级 <span style=\"color:#0099FF\"><b>")
					.append(levelTask).append("</b></span> 个 &nbsp;&nbsp;")
					.append("(3).信用档案 <span style=\"color:#0099FF\"><b>")
					.append(creditTask).append("</b></span> 个 &nbsp;&nbsp;")
					.append("(4).无害化 <span style=\"color:#0099FF\"><b>")
					.append(innoTask)
					.append("</b></span> 个 </td></tr></table>").toString();
		else
			return new StringBuilder(
					"<table><tr><td valign='middle'><img src='images/icons/email.gif'/> </td><td>邮件：<span style=\"color:#0099FF\"><b>")
					.append(unreadMail).append(
							"</b></span> 封未读邮件</td></tr></table>").toString();
	}

}
