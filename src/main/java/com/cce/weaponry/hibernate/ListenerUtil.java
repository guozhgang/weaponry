package com.cce.weaponry.hibernate;

import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.Session;

import com.cce.modules.security.springsecurity.SpringSecurityUtils;
import com.cce.weaponry.entity.register.Region;
import com.cce.weaponry.entity.security.User;
import com.cce.weaponry.service.common.CompanyUtils;

public class ListenerUtil {

	/**
	 * 是否包含Region
	 * 
	 * @param session
	 * @param code
	 *            进行对比的regionCode
	 * @return 要对比的regionCode 是否包含在当前登录用户的region的管辖范围之内
	 */
	public static boolean containRegion(Session session, String code) {
		String userName = SpringSecurityUtils.getCurrentUserName();

		if (null == userName || "".equals(userName))
			return true;

		String hql = " from User u where u.loginName='" + userName + "' ";
		User u = (User) session.createQuery(hql).list().iterator().next();
		hql = "select r from Region r,User u where u.region.id=r.id and u.id="
				+ u.getId();
		List<Region> regions = new ArrayList<Region>();
		Region region = (Region) session.createQuery(hql).iterate().next();
		u.setRegion(region);
		regions.add(region);
		int index = CompanyUtils.ifRegion(u.getRegion().getCode());
		if (2 == index) {
			hql = " from Region r where r.parent.id=" + region.getId();
			List<Region> children = session.createQuery(hql).list();
			regions.addAll(children);
		} else if (3 == index) {
			hql = " from Region r where r.parent.id=" + region.getId();
			List<Region> children = session.createQuery(hql).list();
			regions.addAll(children);
			for (int i = 0; i < children.size(); i++) {
				hql = " from Region r where r.parent.id="
						+ children.get(i).getId();
				regions.addAll(session.createQuery(hql).list());
			}
		}
		
		for (int i = 0; i < regions.size(); i++) {
			Region r = regions.get(i);
			if (r.getCode().equals(code))
				return true;

		}
		return false;
	}

	/**
	 * 返回本项目的实体
	 * 
	 * @param model
	 *            实体
	 * @return 本项目的实体
	 */
	public static Object retLocalBean(Object model) {
		Field[] field = model.getClass().getDeclaredFields();
		// 获取实体类的所有属性，返回Field数组
		for (int j = 0; j < field.length; j++) { // 遍历所有属性

			String name = field[j].getName(); // 获取属性的名字

			name = name.substring(0, 1).toUpperCase() + name.substring(1); // 首字母大写

			String type = field[j].getGenericType().toString(); // 获取属性的类型

			if (type.length() >= 29
					&& type.substring(0, 29).equals(
							"class com.cce.safepork.entity.beans")) { //
				// 如果type是类类型，则前面包含"class "，后面跟类名
				Method m = null;
				try {
					m = model.getClass().getMethod("get" + name);
				} catch (Exception e) {
				}
				Object value = null;
				try {
					if (null != m) {
						value = m.invoke(model);
					}
				} catch (Exception e) {
					e.printStackTrace();
				} // 调用getter方法获取属性值
				return value;
			}
		}
		return null;
	}

	// 判断是否是允许操作的数据
	public static int isLegal(Session session, Object value) {
		Field[] field = value.getClass().getDeclaredFields(); //

		// 获取实体类的所有属性，返回Field数组
		for (int j = 0; j < field.length; j++) { // 遍历所有属性

			String name = field[j].getName(); // 获取属性的名字

			name = name.substring(0, 1).toUpperCase() + name.substring(1);

			String type = field[j].getGenericType().toString(); // 获取属性的类型

			// security 包不检查
			if (type.length() >= 38
					&& type.substring(0, 38).equals(
					"class com.cce.safepork.entity.security"))
				return 1;

			if (type.equals("class com.cce.safepork.entity.beans.Region")
					&& !"Parent".equals(name)) { //

				// 如果type是类类型，则前面包含"class "，后面跟类名

				Method m = null;

				try {
					m = value.getClass().getMethod("get" + name);
				} catch (Exception e) {
				}

				Region region = null;

				try {

					if (null != m) {

						region = (Region) m.invoke(value);

					}
				} catch (Exception e) {
					e.printStackTrace();
				} // 调用getter方法获取属性值
				if (value != null) {
					// 有region 且相同 或 没有region return true 否则 return false
					if (ListenerUtil.containRegion(session, region.getCode()))
						return 1;
					else
						return 0;
				}
			}
		}
		return -1;
	}

}
