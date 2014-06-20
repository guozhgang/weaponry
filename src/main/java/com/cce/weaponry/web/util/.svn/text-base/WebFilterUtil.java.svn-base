package com.cce.weaponry.web.util;

import java.util.List;

import com.cce.modules.orm.PropertyFilter;
import com.cce.modules.orm.hibernate.HibernateWebUtils;
import com.cce.modules.web.struts2.Struts2Utils;

public class WebFilterUtil {
	PropertyFilter filter;

	public WebFilterUtil(PropertyFilter filter) {
		super();
		this.filter = filter;
	}

	public WebFilterUtil() {
		super();
		List<PropertyFilter> filters = HibernateWebUtils.buildPropertyFilters(Struts2Utils.getRequest());
		if (!filters.isEmpty()) {
			filter = filters.get(0);
		}
	}

	public String[] getFilterNames() {
		if (filter == null)
			return null;
		return filter.getPropertyNames();
	}

	public Object getFilterValue() {
		if (filter == null)
			return null;
		return filter.getPropertyValue();
	}

}
