package com.cce.weaponry.service.common;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.http.HttpServletRequest;

import com.cce.modules.orm.Page;
import com.cce.modules.web.struts2.Struts2Utils;

public class CompanyUtils {

	public static String delHTMLTag(String htmlStr) {
		String regEx_script = "<script[^>]*?>[\\s\\S]*?<\\/script>"; // 定义script的正则表达式
		String regEx_style = "<style[^>]*?>[\\s\\S]*?<\\/style>"; // 定义style的正则表达式
		String regEx_html = "<[^>]+>"; // 定义HTML标签的正则表达式

		Pattern p_script = Pattern.compile(regEx_script,
				Pattern.CASE_INSENSITIVE);
		Matcher m_script = p_script.matcher(htmlStr);
		htmlStr = m_script.replaceAll(""); // 过滤script标签

		Pattern p_style = Pattern
				.compile(regEx_style, Pattern.CASE_INSENSITIVE);
		Matcher m_style = p_style.matcher(htmlStr);
		htmlStr = m_style.replaceAll(""); // 过滤style标签

		Pattern p_html = Pattern.compile(regEx_html, Pattern.CASE_INSENSITIVE);
		Matcher m_html = p_html.matcher(htmlStr);
		htmlStr = m_html.replaceAll(""); // 过滤html标签

		return htmlStr.trim(); // 返回文本字符串
	}

	public static void printRequestInfo() {
		HttpServletRequest request = Struts2Utils.getRequest();
		Map map = request.getParameterMap();
		StringBuilder ret = new StringBuilder();
		for (Iterator keys = map.keySet().iterator(); keys.hasNext();) {
			String key = keys.next().toString();
			String[] value = (String[]) map.get(key);
			ret.append("key:").append(key).append(" - values: ");
			for (String str : value) {
				ret.append(str).append(",");
			}
			ret.deleteCharAt(ret.length() - 1);
			ret.append("\n");
		}
		System.out.println(ret.toString());
	}

	public static void printResponseInfo(Object obj) {
		if (null == obj)
			return;
		System.out.println("返回给前台的数据: ");
		StringBuilder ret = new StringBuilder();
		if (obj instanceof Page) {
			Page page = (Page) obj;
			ret.append("总记录数：").append(page.getTotalCount()).append(" 当前页数：")
					.append(page.getPageNo()).append(" 总页数：").append(
							page.getTotalPages()).append("\n 数据为：").append(
							page.getResult().toString());
			System.out.println(ret.toString());
		} else if (obj instanceof List) {
			List list = (List) obj;
			ret.append("总记录数为：").append(list.size()).append("\n数据为：").append(
					list);
			System.out.println(list);
		} else {
			System.out.println(obj);
		}
	}

	public static String trimBlank(String str) {
		String[] strArr = str.split(" ");
		StringBuilder ret = new StringBuilder();
		for (int i = 0; i < strArr.length; i++) {
			ret = ret.append(strArr[i]);
		}
		return ret.toString();
	}

	// @SuppressWarnings("unchecked")
	// public Cert4CompanySearchVO getSearchVO() {
	// String data = Struts2Utils.getParameter(JsonStore.RootProperty);
	// if (data == null)
	// return null;
	// JSONDeserializer deserializer = this.getJsonDeserializer();
	// JSONDeserializer<IdEntity> jsonDeserializer = deserializer.use(null,
	// Cert4CompanySearchVO.class);
	// return (Cert4CompanySearchVO) jsonDeserializer.deserialize(data);
	// }

	public static String getCauseParam() {
		String temp = Struts2Utils.getParameter("cause");
		String cause = "";
		if (temp.length() > 2) {
			cause = temp.substring(1, temp.length() - 1);
		}
		return cause;
	}

	/**
	 * 将ExtJS写入httpRequest中的分页参数,转换为Page类的参数. 前台传入httpRequest参数说明: start=0 开始页数
	 * limit=3 显示条数 sort=ID 排序字段 dir=DESC 排序方式
	 * 
	 * @return
	 */
	public static Page setupPage() {
		Page page = new Page();

		try {
			int limit = Integer.parseInt(Struts2Utils.getParameter("limit"));
			int start = Integer.parseInt(Struts2Utils.getParameter("start"))
					/ limit + 1;
			String sort = Struts2Utils.getParameter("sort");
			String dir = Struts2Utils.getParameter("dir");
			page.setPageNo(start);
			page.setPageSize(limit);
			page.setOrderBy(sort);
			page.setOrder(dir);
		} catch (NumberFormatException e) {
		}
		return setOrderBy(page);
	}

	public static Page setOrderBy(Page page) {
		if (!page.isOrderBySetted()) {
			page.setOrderBy("id");
			page.setOrder(Page.ASC);
		}
		return page;
	}

	@SuppressWarnings("unchecked")
	public static void printReqParam() {
		Map reqMap = Struts2Utils.getRequest().getParameterMap();

		for (Iterator keys = reqMap.keySet().iterator(); keys.hasNext();) {
			String key = keys.next().toString();
			System.out.println("测试参数： ");
			System.out.println(key + "  " + reqMap.get(key).toString());
		}
		if (reqMap.containsKey("data")) {
			System.out.println("data数据；");
			System.out.println(Struts2Utils.getParameter("data"));
		}
	}

	public static boolean isEmpty(String str) {
		if (null == str)
			return true;
		else if ("".equals(str))
			return true;
		else
			return false;
	}

	public static String formatDate(Date date) {
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
		return format.format(date);
	}

	public static String formatDate(Date date, String pattern) {// MM/dd/yyyy
		SimpleDateFormat format = new SimpleDateFormat(pattern);
		return format.format(date);
	}

	public static Date parseDate(String date, String pattern) { // MM/dd/yyyy
		DateFormat format = new SimpleDateFormat(pattern);
		try {
			return format.parse(date);
		} catch (ParseException e) {
			return null;
		}
	}

	public static Date parseDate(String date) {
		DateFormat format = new SimpleDateFormat("yyyy-MM-dd");
		try {
			return format.parse(date);
		} catch (ParseException e) {
			return null;
		}
	}

	/**
	 * 判断是否是省、市、县
	 * 
	 * @param code
	 *            地区编码
	 * @return 1: 县，2： 市 ，3：省
	 */
	public static int ifRegion(String code) {
		if (6 != code.length())
			return 0;
		String center = code.substring(2, 4);
		String last = code.substring(4, 6);
		if ("00".equals(last)) {
			if ("00".equals(center))
				return 3;
			return 2;
		}
		return 1;
	}

	public static void main(String[] args) {
		// System.out.println(ifRegion("370120") + " " + "370000".length());
		// System.out.print(parseDate("2005-05-05"));
		// System.out.println("system".substring(0, "system".length() - 1));
		// System.out.println("测试：");
		// System.out.println("1".substring(0, 10));
	}

	public static String getRandom(String prefix) {
		Calendar t = Calendar.getInstance();
		Random r = new Random(t.getTimeInMillis());
		String fn = String.valueOf(t.get(Calendar.YEAR))
				+ String.valueOf(t.get(Calendar.YEAR))
				+ String.valueOf(t.get(Calendar.MONTH))
				+ String.valueOf(t.get(Calendar.DAY_OF_MONTH))
				+ String.valueOf(t.get(Calendar.HOUR_OF_DAY))
				+ String.valueOf(t.get(Calendar.MINUTE))
				+ String.valueOf(t.get(Calendar.SECOND))
				+ String.valueOf(t.get(Calendar.MILLISECOND))
				+ String.valueOf(r.nextInt());
		return prefix + fn;
	}

	public static String getFixedLengthRandom(int length) {
		int temp = 10;
		for (int i = 0; i < length; i++) {
			temp = temp * 10;
		}
		String str = Double.toString(new Random().nextDouble() * temp);
		str = str.substring(0, length);
		if (str.indexOf(".") != -1)
			return getFixedLengthRandom(length);
		else
			return str;
	}

	public static String getRandom() {
		return Integer.toString(new Random().nextInt());
	}

}
