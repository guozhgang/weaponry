package com.cce.weaponry.hibernate;

import java.io.Serializable;

import org.hibernate.event.SaveOrUpdateEvent;
import org.hibernate.event.def.DefaultSaveEventListener;

public class SaveListener extends DefaultSaveEventListener {

	@Override
	protected Serializable performSaveOrUpdate(SaveOrUpdateEvent event) {
		Object model = event.getObject();

		int result = ListenerUtil.isLegal(event.getSession(), model);

		Object local = null;

		if (1 == result)
			return super.performSaveOrUpdate(event);
		else if (0 == result)
			return null;
		else {
			local = ListenerUtil.retLocalBean(model);
			if (null != local) {
				result = ListenerUtil.isLegal(event.getSession(), local);
				if (1 == result)
					return super.performSaveOrUpdate(event);
				else if (0 == result)
					return null;
				else {
					local = ListenerUtil.retLocalBean(local);
					if (null != local) {
						result = ListenerUtil
								.isLegal(event.getSession(), local);
						if (1 == result)
							return super.performSaveOrUpdate(event);
						else if (0 == result)
							return null;
						else {
							local = ListenerUtil.retLocalBean(local);
							if (null != local) {
								result = ListenerUtil.isLegal(event
										.getSession(), local);
								if (1 == result)
									return super.performSaveOrUpdate(event);
								else if (0 == result)
									return null;
								else
									return super.performSaveOrUpdate(event);
							}
						}
					}
				}
			}
		}
		return super.performSaveOrUpdate(event);
	}

}
