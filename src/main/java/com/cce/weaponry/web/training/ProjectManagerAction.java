package com.cce.weaponry.web.training;

import org.apache.struts2.convention.annotation.Namespace;

import com.opensymphony.xwork2.ActionSupport;


@Namespace("/training")
public class ProjectManagerAction extends ActionSupport {

	// /**
	// *
	// */
	// @Autowired
	// private ProjectServiceImpl docMgr;
	//
	// private static final long serialVersionUID = -3910704112587694674L;
	//
	// private Long id;
	// private Long entryId;
	//
	// String getEntryList() {
	//
	// if (id == null)
	// return NONE;//sendJSON("[{}]");
	//
	// if (entryId == null) {
	// entryId = new Long(0);
	// }
	//
	// List<Entry> list = docMgr.getEntryList(id, entryId);
	// JSONArray jsonObject = JSONArray.fromObject(list);
	//
	// Struts2Utils.renderText(jsonObject.toString());
	// return NONE;// sendJSON(jsonObject.toString());
	// }
	//
	// void getEntryDirList(Entry parent, List<Entry> list,
	// List<EntryNode> dirList) {
	// for (int i = 0; i < list.size(); i++) {
	// Entry item = list.get(i);
	// if (parent == null) {
	// if (item.getType() == Entry.DIR) {
	// EntryNode node = new EntryNode(item);
	// dirList.add(node);
	// getEntryDirList(item, list, node.getChildren());
	// }
	// } else if (item.getType() == Entry.DIR
	// && item.getParent().getId() == parent.getId()) {
	// EntryNode node = new EntryNode(item);
	// dirList.add(node);
	// getEntryDirList(item, list, node.getChildren());
	// }
	// }
	// }
	//
	// String getEntryDirList()
	// {
	// List<Entry> list = docMgr.getEntryList(id);
	// List<EntryNode> dirList = new ArrayList<EntryNode>();
	// EntryNode node = new EntryNode(0L, "根目录");
	// dirList.add(node);
	// getEntryDirList( null, list, node.getChildren() );
	//		
	// return NONE;
	// }
	//
	// public void setId(Long id) {
	// this.id = id;
	// }
	//
	// public Long getId() {
	// return id;
	// }
	//
	// public void setEntryId(Long entryId) {
	// this.entryId = entryId;
	// }
	//
	// public Long getEntryId() {
	// return entryId;
	// }
	//
	// @Override
	// @Action("ProjectMgr")
	// public String execute() {
	// return SUCCESS;
	// }
}
