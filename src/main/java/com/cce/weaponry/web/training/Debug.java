package com.cce.weaponry.web.training;

import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;

import com.cce.modules.web.struts2.Struts2Utils;

public class Debug {

	@SuppressWarnings("unchecked")
	public static void printRequest(String title) {
		System.out.println(title + " request");
		HttpServletRequest req = Struts2Utils.getRequest();
		Map map = req.getParameterMap();
		String[] params = ((Set<String>) map.keySet()).toArray(new String[0]);
		for (int i = 0; i < params.length; i++) {
			System.out.println(params[i] + "= " + req.getParameter(params[i]));
		}

	}
}
