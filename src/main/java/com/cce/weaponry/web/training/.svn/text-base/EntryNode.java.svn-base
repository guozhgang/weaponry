package com.cce.weaponry.web.training;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.cce.weaponry.entity.training.Entry;
import com.cce.weaponry.entity.training.FileInfo;
import com.cce.weaponry.entity.training.FileTypeInfo;


public class EntryNode {

	public EntryNode(Entry entry,
			com.cce.weaponry.entity.training.FileTypeInfo typeInfo) {

		FileInfo fileInfo = entry.getRefFile();

		// this.url = typeInfo.getBaseUrl() + fileInfo.getName();
		this.entry = entry;
	}

	public Long getId() {
		return this.entry.getId();
	}


	public String getTitle() {
		return this.entry.getTitle();
	}


	public List<EntryNode> getChildren() {
		return children;
	}

	public void setChildren(List<EntryNode> children) {
		this.children = children;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getUrl() {
		return url;
	}


	private String url;
	private Entry entry;

	private List<EntryNode> children = new ArrayList<EntryNode>();

	static List<EntryNode> convert(List<Entry> list,
			Map<Integer, FileTypeInfo> typeInfoMap) {

		List<EntryNode> nodeList = new ArrayList<EntryNode>();

		for (int i = list.size() - 1; i >= 0; i--)
		{
			Entry item = list.get(i);
			if (item.getParent() == null) {
				FileTypeInfo typeInfo = typeInfoMap.get(item.getRefFile()
						.getType());

				list.remove(i);
				EntryNode newNode = new EntryNode(item, typeInfo);
				nodeList.add(newNode);

				convert(newNode, item, list, typeInfoMap);
			}
		}

		return nodeList;
	}

	static void convert(EntryNode node, Entry entry,
			List<Entry> list, Map<Integer, FileTypeInfo> typeInfoMap) {


		for (int i = 0; i < list.size(); i++) {
			Entry item = list.get(i);
			if (item.getParent() == entry) {
				FileTypeInfo typeInfo = typeInfoMap.get(item.getRefFile()
						.getType());

				EntryNode newNode = new EntryNode(item, typeInfo);
				node.getChildren().add(newNode);

				convert(newNode, item, list, typeInfoMap);
			}
		}
	}

};
