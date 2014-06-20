package com.cce.weaponry.web.test;

import java.util.Iterator;
import java.util.List;

import org.apache.struts2.convention.annotation.Namespace;
import org.springframework.beans.factory.annotation.Autowired;

import com.cce.modules.service.CrudServiceInterface;
import com.cce.modules.web.struts2.Struts2Utils;
import com.cce.modules.workflow.Action;
import com.cce.modules.workflow.History;
import com.cce.modules.workflow.TaskExecuteService;
import com.cce.weaponry.entity.news.NewsCategory;
import com.cce.weaponry.web.JsonCrudActionSupport;

@Namespace("/task")
public class ExampleAction extends JsonCrudActionSupport<NewsCategory> {

	@Autowired
	TaskExecuteService taskService;

	@Override
	public CrudServiceInterface<NewsCategory> getCrudService() {
		// TODO Auto-generated method stub
		return null;
	}

	/**
	 * 开始工作流
	 * 
	 * @throws Exception
	 */
	public void createCredit() throws Exception {
		Long id = taskService.create("credit");
		if (id != null) {
			initResponse().getWriter().write(Long.toString(id));
		}
	}

	/**
	 * 执行任务
	 * 
	 * @throws Exception
	 */
	public void executeTask() throws Exception {
		String id = Struts2Utils.getParameter("id");
		String action = Struts2Utils.getParameter("action");
		if (id == null || id == "" || action == null || action == "")
			return;
		long taskId = Long.valueOf(id);
		int actionId = Integer.valueOf(action);
		executeTask(taskId, actionId);
	}

	public void executeTask(long taskId, int actionId) throws Exception {
		if (actionId > 0) {
			taskService.execute(taskId, actionId, null);
		}

		String str = findTaskActions(taskId);
		if (str != null && str != "") {
			initResponse().getWriter().write(str);
		}
	}

	/**
	 * 显示可执行的任务
	 * 
	 * @param taskId
	 * @return
	 * @throws Exception
	 */
	private String findTaskActions(long taskId) throws Exception {
		List<Action> actions = taskService.findTaskActions(taskId);
		StringBuffer sb = new StringBuffer();
		for (int i = 0; i < actions.size(); i++) {
			String name = actions.get(i).getName();
			sb.append("<li><a href='#' onclick='dosubmit(").append(
					actions.get(i).getId()).append(");'>").append(name).append(
					"</a>");
		}
		return sb.toString();
	}

	/**
	 * 显示任务历史
	 * 
	 * @throws Exception
	 */
	public void findTaskHistory() throws Exception {
		String id = Struts2Utils.getParameter("id");
		if (id == null || id == "")
			return;
		long taskId = Long.valueOf(id);
		findTaskHistory(taskId);
	}

	public void findTaskHistory(long taskId) throws Exception {
		List<History> history = taskService.findTaskHistory(taskId);
		StringBuffer sb = new StringBuffer()
				.append(
						"<table cellpadding='0' cellspacing='0' bordercolor='#0000FF' border='1'>")
				.append("<tr>").append("<th>当前位置</th>").append("<th>动作</th>")
				.append("<th>状态</th>").append("<th>所有者</th>").append(
						"<th>开始时间</th>").append("<th>结束时间</th>").append(
						"<th>上一位置</th>").append("</tr>");
		for (Iterator iterator = history.iterator(); iterator.hasNext();) {
			History step = (History) iterator.next();
			String owner = step.getOwner();
			sb.append("<tr><td>").append(step.getStepName()).append("(")
					.append(step.getId()).append(")</td>").append("<td>")
					.append(step.getAction()).append("</td>").append("<td>")
					.append(step.getStatus()).append("</td>").append("<td>")
					.append(owner).append("</td>").append("<td>").append(
							step.getStartDate()).append("</td>").append("<td>")
					.append(step.getDueDate()).append("</td>").append("<td>")
					.append("</td>").append("</tr>");
		}
		initResponse().getWriter().write(sb.append("</table>").toString());
	}
}
