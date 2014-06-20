package com.cce.weaponry.web.util;

import java.io.Reader;
import java.sql.Clob;
import java.util.ArrayList;
import java.util.List;

import javax.sql.rowset.serial.SerialClob;

import org.apache.commons.lang.StringUtils;

public class WebDataUtil {

	public static String keyWord;

	public static List splitJsonArray(String data) {
		List list = new ArrayList();
		int pos = 0;
		while ((pos = data.indexOf("{")) > -1) {
			int pos2 = data.indexOf("}") + 1;
			list.add(data.substring(pos, data.indexOf("}") + 1));
			data = data.substring(pos2);
		}
		return list;
	}

	/**
	 * 删除input字符串中的html格式
	 * 
	 * @param input
	 * @param length
	 * @return
	 */
	public static String removeHTMLTag(String input, int length) {
		if (StringUtils.isEmpty(input))
			return "";
		// 去掉所有html元素,
		String str = input.replaceAll("\\&[a-zA-Z]{1,10};", "").replaceAll("<[^>]*>", "");
		str = str.replaceAll("[(/>)<]", "");
		int len = str.length();
		if (len <= length)
			return str;
		else {
			// if (null != keyWord && !"".equals(keyWord)) {
			// int index = str.indexOf(keyWord); // 关键字的位置
			// int last = len - index; // 从关键字到最后的长度
			// int offset = last - length; // 多或少的偏移
			//
			// String end = "";
			// String begin = "";
			//
			// if (offset > 0) {
			// end = str.substring(index, index + length);
			// } else {
			// end = str.substring(index, index + last);
			// if (-offset > index) {
			// begin = str.substring(0, index);
			// } else {
			// begin = str.substring(index + offset, index);
			// }
			// }
			// str = begin + end + ".....";
			// return str;
			// } else {
			str = str.substring(0, length).concat("....");
			return str;
			// }
		}
	}

	public static String hightLight(String str, String key) {
		if (StringUtils.isEmpty(str) || StringUtils.isEmpty(key))
			return str;
		keyWord = key;
		return str.replaceAll(key, "<font class=\\\"keyword\\\">" + key + "</font>");
	}

	public static String clob2String(Clob clob) throws Exception {
		try {
			Reader inStreamDoc = clob.getCharacterStream();
			char[] tempDoc = new char[(int) clob.length()];
			inStreamDoc.read(tempDoc);
			inStreamDoc.close();
			return new String(tempDoc);
		} catch (Exception e) {
			throw e;
		}
	}

	public static Clob str2Clob(String str) throws Exception {
		try {
			return new SerialClob(str.toCharArray());
		} catch (Exception e) {
			throw e;
		}
	}
}
