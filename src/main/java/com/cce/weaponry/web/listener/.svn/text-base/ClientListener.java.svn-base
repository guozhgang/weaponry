package com.cce.weaponry.web.listener;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletRequestEvent;
import javax.servlet.ServletRequestListener;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.cce.modules.security.springsecurity.SpringSecurityUtils;

public class ClientListener implements HttpSessionListener,
		ServletRequestListener {
	@SuppressWarnings("unchecked")
	private static Map sessionMap = new HashMap();
	@SuppressWarnings("unchecked")
	private static Map ipMap = new HashMap();
	private static DateFormat dateFormat = new SimpleDateFormat(
			"yyyy-MM-dd HH:mm:ss");
	Logger logger = LoggerFactory.getLogger(getClass());
	private static boolean bl = true;

	@SuppressWarnings("unchecked")
	public void sessionCreated(HttpSessionEvent event) {
		// TODO Auto-generated method stub
		HttpSession session = event.getSession();
		String sessionId = session.getId();
		sessionMap.put(sessionId, new Date().getTime());
	}

	public void sessionDestroyed(HttpSessionEvent event) {
		// TODO Auto-generated method stub

		HttpSession session = event.getSession();
		try {
			File file = new File(System.getProperty("user.dir")
					+ "/weaponry-clientlistener.txt");
			if (!file.exists()) {
				file.createNewFile();
			}
			FileWriter fw = new FileWriter(file, true);
			if (bl) {
				logger.debug("ClientListener-----------filePath:"
						+ System.getProperty("user.dir")
						+ "/weaponry-clientlistener.txt");
				bl = false;
			}
			String userName = SpringSecurityUtils.getCurrentUserName();
			if (sessionMap.containsKey(session.getId())) {
				Long staytime = new Date().getTime()
						- Long.parseLong(String.valueOf(session
								.getCreationTime()));
				StringBuilder str = new StringBuilder();
				str.append("IP："
						+ ipMap.get(session.getId())
						+ "   ConnTime:"
						+ dateFormat.format(Long.valueOf(session
								.getCreationTime())) + "    LeaveTime："
						+ dateFormat.format(new Date()) + "   StayTime:"
						+ staytime / (1000 * 60) + "分" + staytime / 1000 % 60
						+ "秒");
				if (userName != null && !"".equals(userName)) {
					str.append("  User：" + userName);
				}
				str.append("\n");
				fw.write(str.toString());
				fw.flush();
				fw.close();
				sessionMap.remove(session.getId());
			}
			if (ipMap.containsKey(session.getId())) {
				ipMap.remove(session.getId());
			}

		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}

	public void requestDestroyed(ServletRequestEvent arg0) {
		// TODO Auto-generated method stub
	}

	@SuppressWarnings("unchecked")
	public void requestInitialized(ServletRequestEvent arg0) {
		// TODO Auto-generated method stub
		HttpServletRequest request = (HttpServletRequest) arg0
				.getServletRequest();
		String ip = request.getHeader("x-forwarded-for");
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("Proxy-Client-IP");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("WL-Proxy-Client-IP");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getRemoteAddr();
		}

		HttpSession session = request.getSession();
		if (!ipMap.containsKey(session.getId())) {
			ipMap.put(session.getId(), ip);
		}

	}

}
