package com.cce.weaponry.unit.service.approval;

import java.io.File;
import java.lang.reflect.Method;
import java.text.DateFormat;
import java.text.MessageFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.Scanner;

import javax.servlet.http.HttpServletRequest;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.beanutils.PropertyUtils;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;
import org.w3c.dom.Document;
import org.w3c.dom.NodeList;

import com.cce.weaponry.service.common.CompanyUtils;

public class Test {

	public static void main(String[] args) {
		for (int i = 1; i < 25; i++) {
			System.out
					.println("insert into trace_monitor (create_date )values('2010-02-"
							+ i + "');");

		}
		for (int i = 1; i < 25; i++) {

			System.out
					.println("insert into trace_zzxsxx (DJ,PM,ZL,	ZSM,MONITOR_ID) values(10,'烤猪肉',12,'0025',"
							+ i + ") ;");
			System.out
					.println("insert into trace_tzjdxx (CDJYZFZDWMZ ,CDJYZHM,CXJDWCPJYDWMZ,CXJDWCPJYHGZH,DJJYJGMC,DWCPJYDWMC,DWCPJYHGZH,DWYZGJXDZMDWMC,DWYZGJXDZMH,HZLYDQ,QYMC,RPPZJYJYDWMZ,RPPZJYJYZH,WHBFYQZMSFZDW,YZC,	ZZJGDMZH,CCRQSJ ,DJRQSJ,	HZJCRQSJ,SJRQSJ ,TZRQSJ ,WHBFYQZMSRQSJ  ,MONITOR_ID  ) values(1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,'2010-02-03','2010-02-03','2010-02-03','2010-02-03','2010-02-03','2010-02-03',"
							+ i + ") ;");
		}

		for (int j = 2; j < 4; j++) {
			for (int i = 1; i < 23; i++) {
				System.out
						.println("insert into trace_lthj (QYMC,ZZJGDMZH,CHRQSJ,JHRQSJ,MONITOR_ID) values('企业名称"
								+ i
								+ "','orgCode','2010-01-02','2010-01-01',"
								+ i + ");");
				System.out
						.println("insert into trace_cydxx (DJDD ,DJZFZJGMZ,DJZH,CYRQSJ,	MONITOR_ID) values('动检地点2','动检发证机关2','动检证号2','2010-02-03',"
								+ i + ") ;");
			}
		}

	}

	public static void main45(String[] args) {
		Date date = new Date(System.currentTimeMillis());
		DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
		System.out.println(formatter.format(date));
		System.out
				.println(CompanyUtils.formatDate(date, "yyyy-MM-dd HH:mm:ss"));
	}

	/**
	 * 使用JDOM解析XML文件
	 * 
	 * @param args
	 */
	public static void main44(String[] args) {
		try {
			File file = new File("E:\\pro2\\data.xml");
			SAXReader reader = new SAXReader();
			org.dom4j.Document doc = reader.read(file);
			Element root = doc.getRootElement();
			System.out.println(root.elements().size());
			Element foo;
			for (Iterator<Element> i = root.elementIterator("VALUE"); i
					.hasNext();) {
				foo = i.next();
				System.out.println(foo.elementText("NO"));
				System.out.println(foo.elementText("ADDR"));
			}
		} catch (Exception e) {
		}
		System.out.println("...");

	}

	public static int[] halfArray(int[] arr) {
		int[] retArr = new int[arr.length];
		for (int i = 0; i < arr.length; i++) {
			retArr[i] = arr[i] / 2;
		}
		return retArr;
	}

	public static void main43(String[] args) {
		HttpServletRequest request = null;
		request.getSession(true);
		Double latitude = Integer.parseInt("1197.1111".substring(0, 2))
				+ Double.parseDouble("1197.1111".substring(2, 9)) / 60 + 0.0001;// 纬度
	}
	public static void main42(String[] args) {
		Integer i = 1;
		if (1 == i) {
			System.out.println(true);
		}
		// String str = "";
	}

	public static void main41(String[] args) {
		Thread t = new Thread();
		t.start();
		t.stop();
	}

	public static void main40(String[] args) {

		System.out.println("123".substring(0, 2));
		// "*TH,7090708109,V1,101001,A,36.6441466666667,N,117.056563333333,E,020.00,0,310810,000000000#";//
		String str = "*TH,7090708109,V1,095444,A,20.0000000,N,020.000000,E,20,20,010901,000000000#";
		String[] strs = str.split(",");
		System.out.println(strs[7].substring(0, 3));
		Integer.parseInt(strs[7].substring(0, 3));
		Double.parseDouble(strs[7].substring(3, 10));
		str = "*TH,7090708109,V1,101001,A,36.6441466666667,N,117.056563333333,E,020.00,0,310810,000000000#";
		strs = str.split(",");
		System.out.println(strs[7].substring(0, 3));
		Integer.parseInt(strs[7].substring(0, 3));
		Double.parseDouble(strs[7].substring(3, 10));// 经度
		// String str =
		// "*TH,7090708109,V1,101010,A,36.64413,N,117.05654,E,20.00,15,111110,000000000#";
		// String[] strs = str.split(",");
		// System.out.println("1111.1111");
		// Double latitude = Integer.parseInt("1111.1111".substring(0, 2))
		// + Double.parseDouble("1111.1111".substring(2, 9)) / 60 + 0.0001;// 纬度
	}

	public static void main39(String[] args) {
		System.out.println(System.getProperty("user.dir"));
	}

	public static void main38(String[] args) {
		String test = "aa%s";
		// TODO Auto-generated method stub
		String ERR_MSG = "{0}{1}{2}";
		Object arguments[] = { "sunnidy", "123", "456" };
		String errorMsg = MessageFormat.format(ERR_MSG, arguments);
		System.out.println(errorMsg);
		arguments = new Object[] { "sunnidy", "123" };
		errorMsg = MessageFormat.format(ERR_MSG, arguments);
		System.out.println(errorMsg);
		System.out.println(ERR_MSG);
	}

	public static void main37(String[] args) {
		String dateStr = "2010-08-26T16:14:10";
		dateStr = dateStr.replace('T', ' ');

		Date date = CompanyUtils.parseDate(dateStr,
				"yyyy-MM-dd HH:mm:ss");// new

		System.out
				.println(CompanyUtils.formatDate(date, "yyyy-MM-dd HH:mm:ss"));
		// Date("2010-08-26T16:14:10");
		System.out.println(date.toString());
	}

	/**
	 * 从 数组转换成逗号分隔的字符串
	 * 
	 * @param args
	 */
	public static void main36(String[] args) {
		List<Long> ids = new ArrayList<Long>();

		ids.add(1l);
		ids.add(2l);
		ids.add(3l);

		Long[] idsArr = new Long[] {};

		idsArr = ids.toArray(idsArr);

		String idsStr = Arrays.toString(idsArr);

		System.out.println(idsStr.substring(1, idsStr.length() - 1));
	}

	public static void main35(String[] args) {
		Map<List<String>, String> mpa = new HashMap<List<String>, String>();

		Map map = new HashMap();

		map.put("ser", "value");
		
		for (Iterator keys = map.keySet().iterator(); keys.hasNext();) {
			String key = keys.next().toString();
			String va = (String)map.get(key);
			System.out.println(key + va);
		}

		System.out.println(map.get("ser"));
	}

	public static void main34(String[] args) {
		Map<String, Long> maps = new HashMap<String, Long>();

		maps.put("山东省", 4l);
		maps.put("济南市", 2l);
		maps.put("济阳县", 1l);


		Iterator<String> keys = maps.keySet().iterator();

		while (keys.hasNext()) {
			System.out.println(keys.next());
		}
	}

	public static void main33(String[] args) {
		System.out.println("A级".substring(0, 1));
	}

	public static void main32(String[] args) {
		String str = "[1,3,4]";
		System.out.println(str.substring(1, str.length() - 1).toString());
	}

	public static void main31(String[] args) {
		Long i = 2l;
		System.out.println(i.toString());
	}

	public static void main30(String[] args) {
		System.out.println("A".compareTo(null));
		String[] strs = new String[] { "A", "B", "C", "D" };

		String ret = "D";

		for (int i = 0; i < strs.length; i++) {
			if (ret.compareTo(strs[i]) > 0) {
				ret = strs[i];
			}
		}

		System.out.println(ret);

		// System.out.println("B".compareTo("D"));
		//
		// System.out.println("A".compareTo("B"));
		// System.out.println("B".compareTo("C"));
		// System.out.println("D".compareTo("C"));

	}

	public static void main29(String[] args) {
		File file = new File("c:\\id.txt");
		System.out.println(file.exists());
	}

	public static void main28(String[] args) {
		System.out.println(CompanyUtils.formatDate(new Date(1280678400000l)));
		System.out.println(CompanyUtils.formatDate(new Date(1280419200000l)));
	}

	public static void main27(String[] args) {
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

		System.out.println(fn);
	}

	/**
	 * 使用DOM解析XML
	 * 
	 * @param args
	 * @throws Exception
	 */
	public static void main26(String args[]) throws Exception {
		File f = new File("src/main/resources/upload.xml");
		DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
		DocumentBuilder builder = factory.newDocumentBuilder();
		Document doc = builder.parse(f);
		System.out.println(doc.getElementsByTagName("savePath").item(0)
				.getFirstChild().getNodeValue());
	}

	public static void main25(String arge[]) {

		long lasting = System.currentTimeMillis();

		try {
			File f = new File("src/main/resources/upload.xml");
			DocumentBuilderFactory factory = DocumentBuilderFactory
					.newInstance();
			DocumentBuilder builder = factory.newDocumentBuilder();
			Document doc = builder.parse(f);
			NodeList nl = doc.getElementsByTagName("VALUE");
			for (int i = 0; i < nl.getLength(); i++) {
				System.out.print("车牌号码:"
						+ doc.getElementsByTagName("NO").item(i)
								.getFirstChild().getNodeValue());
				System.out.println("车主地址:"
						+ doc.getElementsByTagName("ADDR").item(i)
								.getFirstChild().getNodeValue());
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public static void putValue(Long[] a, Map<Long, Long> map) {
		for (Long i : a) {
			if (map.containsKey(i)) {
				Long count = map.get(i);
				map.put(i, ++count);
			} else {
				map.put(i, 1l);
			}
		}
	}

	public static void main24(String[] args) {

		Map<Long, Long> map = new HashMap<Long, Long>();

		Long[] a = new Long[] { 1l, 3l, 5l, 6l };
		Long[] b = new Long[] { 2l, 5l, 3l };

		putValue(a, map);
		putValue(b, map);

		for (Iterator<Long> itKey = map.keySet().iterator(); itKey.hasNext();) {
			Long key = itKey.next();
			System.out.println(key + "   " + map.get(key));
		}

	}

	public static void main23(String[] args) {

		System.out.println("PROCESSING".length());
		System.out.println("370000".length());
		String temp = "ser";
		String cause = "";
		if (temp.length() > 2) {
			cause = temp.substring(1, temp.length() - 1);
		}
		System.out.println(temp);
	}

	public static void main22(String[] args) {
		System.out.println((new Date()).getTime());
	}

	public static void main21(String[] args) throws Exception {
		// Stu i = new Stu();
		// Tea t = new Tea();
		// t.setName("teaser");
		// i.setTea(t);
		//
		// System.out.println(PropertyUtils.getProperty(i, "tea.name"));
	}

	public static void main20(String[] args) {
		StringBuilder str = new StringBuilder();

		str.append("abc,efi,");

		System.out.println(str.toString());

		str.deleteCharAt(str.length() - 1);

		System.out.println(str.toString());

		str.delete(str.length() - 1, str.length());

		System.out.println(str.toString());

	}

	public static void main19(String[] args) {
		String str = "ser";
		System.out.println(str.concat("abc"));
		System.out.println(str);

		StringBuilder sb = new StringBuilder("test");

		System.out.println(sb.append("ser"));
		System.out.println(sb);
	}

	public static void main18(String[] args) throws Exception {

		Stu i = new Stu();

		i.setId(1);
		i.setName("zhangsan");
		i.setAge(15);
		i.setHobby("singing");

		Object obj = i;

		Object name1 = PropertyUtils.getProperty(obj, "name");

		System.out.println(name1.toString());

	}

	public static void main17(String[] args) throws Exception {

		Stu i = new Stu();

		i.setId(1);
		i.setName("zhangsan");

		Stu j = (Stu) BeanUtils.cloneBean(i);

		i.setName("lisi");

		System.out.println(i.getName() + "   " + j.getName());

		Stu i2 = new Stu();

		i2.setId(1);
		i2.setName("zhangsan");

		Stu j2 = new Stu();

		PropertyUtils.copyProperties(j2, i2);

		i2.setName("lisi");

		System.out.println(i2.getName() + "   " + j2.getName());

	}

	public static void main16(String[] args) throws Exception {

		String[] cols = new String[] { "name", "hobby" };

		Class clz = Class.forName("com.cce.safepork.unit.service.approval.Stu");

		Method[] methods = clz.getMethods();

		Object obj = clz.newInstance();

		int i = 0;
		for (String c : cols) {
			i++;
			c = c.substring(0, 1).toUpperCase().concat(
					c.substring(1, c.length()));
			String methodName = "set" + c;
			for (Method m : methods) {
				if (methodName.equals(m.getName())) {
					m.invoke(obj, Integer.toString(i));
				}
			}
		}

		Stu stu = (Stu) obj;

		System.out.println(stu.getName() + "  " + stu.getId() + "  "
				+ stu.getHobby());

	}

	public static void main14(String[] args) {
		// {"certNo":"se","name":"r","category":"3","region_id":"27"}
		Scanner input = new Scanner(System.in);

		String str = input.nextLine();

		String certNo = str.substring(11, str.indexOf("name") - 3);
		String name = str.substring(str.indexOf("name") + 7, str
				.indexOf("category") - 3);
		String category = str.substring(str.indexOf("category") + 11, str
				.indexOf("region_id") - 3);
		String regionId = str.substring(str.indexOf("region_id") + 12, str
				.lastIndexOf("}") - 1);

		System.out.println(certNo);
		System.out.println(name);
		System.out.println(category);
		System.out.println(regionId);
	}

	public static void main13(String[] args) {
		// {"region_id":"1"}
		Scanner input = new Scanner(System.in);

		String str = input.nextLine();

		System.out.println(str.substring(14, str.length() - 2));
	}

	public static void main12(String[] args) {
		System.out.println(Long.parseLong(""));
	}

	public static void main11(String[] args) {
		// {"startdate":"2010-05-30","enddate":"2010-07-10","region_id":"2"}

		Scanner input = new Scanner(System.in);

		String str = input.nextLine();

		String startdate = str.substring(14, str.indexOf("enddate") - 3);

		String enddate = str.substring(str.indexOf("enddate") + 10, str
				.indexOf("region_id") - 3);

		String regionId = str.substring(str.indexOf("region_id") + 12, str
				.lastIndexOf("}") - 1);

		System.out.println(startdate);
		System.out.println(enddate);
		System.out.println(regionId);

	}

	public static void main10(String[] args) {
		Date date = CompanyUtils.parseDate("06/08/2010", "MM/dd/yyyy");

		System.out.println(CompanyUtils.formatDate(date));
	}

	public static void main9(String[] args) {
		// {"name":"1","tname":"111","expireDate":"06/08/2010","description":"sadasdasd","tid":"1","fileId":"118"}

		Scanner input = new Scanner(System.in);

		String str = input.nextLine();

		String name = str.substring(9, str.indexOf("tname") - 3);

		String tname = str.substring(str.indexOf("tname") + 8, str
				.indexOf("expireDate") - 3);

		String expireDate = str.substring(str.indexOf("expireDate") + 13, str
				.indexOf("description") - 3);

		String description = str.substring(str.indexOf("description") + 14, str
				.indexOf("tid") - 3);

		String tid = str.substring(str.indexOf("tid") + 6, str
				.indexOf("fileId") - 3);

		String fileId = str.substring(str.indexOf("fileId") + 9, str
				.lastIndexOf("}") - 1);

		System.out.println(name);
		System.out.println(tname);
		System.out.println(expireDate);
		System.out.println(description);
		System.out.println(tid);
		System.out.println(fileId);

	}

	public static void main8(String[] args) {

		System.out.println("A级申请".substring(0, 2));

	}

	// {"startdate":"2010-05-30","enddate":"2010-07-10","region_id":"","scalefrom":"","scaleto":"","degree":""}
	// {"startdate":"2010-05-30","enddate":"2010-07-10","region_id":"1","scalefrom":21,"scaleto":2,"degree":"1"}
	public static void main7(String[] args) {

		// {"startdate":"2010-05-30","enddate":"2010-07-10","region_id":"2","scalefrom":1,"scaleto":2,"degree":"1"}
		// {"startdate":"2010-05-30","enddate":"2010-07-10","region_id":"","scalefrom":,"scaleto":,"degree":""}

		Scanner input = new Scanner(System.in);

		String data = input.nextLine();

		data = data.replace("\"", "'");

		System.out.println(data);

		String startdateStr = data.substring(14, data.indexOf("enddate") - 3);
		String enddateStr = data.substring(data.indexOf("enddate") + 10, data
				.indexOf("region_id") - 3);
		String regionIdStr = data.substring(data.indexOf("region_id") + 12,
				data.indexOf("scale") - 3);
		String scalefrom = data.substring(data.indexOf("scalefrom") + 11, data
				.indexOf("scaleto") - 2);
		String scaleto = data.substring(data.indexOf("scaleto") + 9, data
				.indexOf("degree") - 2);
		String degree = data.substring(data.indexOf("degree") + 9, data
				.lastIndexOf("}") - 1);

		System.out.println(startdateStr + "   " + enddateStr + "   "
				+ regionIdStr + "   " + scalefrom + "   " + scaleto + "   "
				+ degree);
	}

	public static void main6(String[] args) {
		System.out.println(CompanyUtils.getFixedLengthRandom(5));
	}

	public static void main5(String[] args) {

		// System.out.println("qualityEstablished".length());
		Scanner input = new Scanner(System.in);

		String str = input.nextLine();

		int index = str.indexOf("qualityEstablished");

		String begin = str.substring(0, index + 20);

		String end = str.substring(index + 23, str.length());

		System.out.println(begin + "true" + end);

	}

	public static void main4(String[] args) {
		CompanyUtils.parseDate("2010-05-30");
	}

	public static void main3(String[] args) {
		// {"startdate":"2010-05-30","enddate":"2010-06-29","region_id":"1","scale":"1","degree":"2"}
		Scanner input = new Scanner(System.in);

		String str = input.nextLine();

		str = str.replace("\"", "'");

		String beginDate = str.substring(14, str.indexOf("enddate") - 3);
		String endDate = str.substring(str.indexOf("enddate") + 10, str
				.indexOf("region_id") - 3);
		String regionId = str.substring(str.indexOf("region_id") + 12, str
				.indexOf("scale") - 3);
		String scale = str.substring(str.indexOf("scale") + 8, str
				.indexOf("degree") - 3);
		String degree = str.substring(str.indexOf("degree") + 9, str
				.lastIndexOf("}") - 1);

		System.out.println(beginDate);
		System.out.println(endDate);
		System.out.println(regionId);
		System.out.println(scale);
		System.out.println(degree);
	}

	public static void main15(String[] args) {
		// {'startdate':'2010-05-30','enddate':'2010-07-10','region_id':'1','entName':'名称','fpNo':'证号','CompanyNo':'等级证号','status':2}
		// {"startdate":"2010-05-30","enddate":"2010-06-30","region_id":"27","entName":"1","fpNo":"2","CompanyNo":"3"}
		Scanner input = new Scanner(System.in);

		String str = input.nextLine();

		str = str.replace("\"", "'");

		// {'startdate':'2010-05-30','enddate':'2010-06-30','region_id':'27','entName':'1','fpNo':'2','CompanyNo':'3'}

		String beginDate = str.substring(14, str.indexOf("enddate") - 3);
		String endDate = str.substring(str.indexOf("enddate") + 10, str
				.indexOf("region_id") - 3);
		String regionId = str.substring(str.indexOf("region_id") + 12, str
				.indexOf("entName") - 3);
		String entName = str.substring(str.indexOf("entName") + 10, str
				.indexOf("fpNo") - 3);
		String fpNo = str.substring(str.indexOf("fpNo") + 7, str
				.lastIndexOf("CompanyNo") - 3);
		String companyNo = str.substring(str.indexOf("CompanyNo") + 12, str
				.indexOf("status") - 3);
		String status = str.substring(str.indexOf("status") + 8, str
				.lastIndexOf("}"));

		System.out.println(beginDate);
		System.out.println(endDate);
		System.out.println(regionId);
		System.out.println(entName);
		System.out.println(fpNo);
		System.out.println(companyNo);
		System.out.println(status);
	}

	public static void main1(String[] args) {
		// {"fileId":"542","name":"1","approvalDept":"11","certNo":"1","education":"1","periodDate":"2010-05-09T00:00:00"}

		// Scanner input = new Scanner(System.in);
		//
		// String str = input.nextLine();
		//
		// str = str.replaceAll("\"", "'");
		//
		// String date = str.substring(str.indexOf("fileId") + 9, str
		// .indexOf("name") - 3);
		//
		// // Date date = CompanyUtils.parseDate();
		//
		// System.out.println(date);//2010-05-05
		// Date date = new Date();
		// System.out.println(CompanyUtils.formatDate(date).substring(0, 7));

	}

}
