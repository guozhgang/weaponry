package com.cce.weaponry.web.vo;

import java.util.List;

public class RegionVO extends BaseVO {
	private String text;
	private boolean leaf;
	private boolean checked;
	private RegionVO parent;
	private List<RegionVO> children;
	/**
	 * @return the text
	 */
	public String getText() {
		return text;
	}

	/**
	 * @return the parent
	 */
	public RegionVO getParent() {
		return parent;
	}

	/**
	 * @param parent
	 *            the parent to set
	 */
	public void setParent(RegionVO parent) {
		this.parent = parent;
	}

	/**
	 * @return the children
	 */
	public List<RegionVO> getChildren() {
		return children;
	}

	/**
	 * @param children
	 *            the children to set
	 */
	public void setChildren(List<RegionVO> children) {
		this.children = children;
	}

	/**
	 * @param text
	 *            the text to set
	 */
	public void setText(String text) {
		this.text = text;
	}

	/**
	 * @return the leaf
	 */
	public boolean isLeaf() {
		return leaf;
	}

	/**
	 * @param leaf
	 *            the leaf to set
	 */
	public void setLeaf(boolean leaf) {
		this.leaf = leaf;
	}

	/**
	 * @return the checked
	 */
	public boolean isChecked() {
		return false;
	}

	/**
	 * @param checked
	 *            the checked to set
	 */
	public void setChecked(boolean checked) {
		this.checked = checked;
	}
}
