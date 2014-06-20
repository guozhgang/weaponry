package com.cce.weaponry.hibernate;

import org.hibernate.HibernateException;
import org.hibernate.event.DeleteEvent;
import org.hibernate.event.def.DefaultDeleteEventListener;

public class DeleteListener extends DefaultDeleteEventListener {

	@Override
	public void onDelete(DeleteEvent event) throws HibernateException {
		Object model = event.getObject();

		int result = ListenerUtil.isLegal(event.getSession(), model);

		Object local = null;

		if (1 == result) {
			super.onDelete(event);
		} else if (-1 == result) {
			local = ListenerUtil.retLocalBean(model);
			if (null != local) {
				result = ListenerUtil.isLegal(event.getSession(), local);
				if (1 == result) {
					super.onDelete(event);
				} else if (-1 == result) {
					local = ListenerUtil.retLocalBean(local);
					if (null != local) {
						result = ListenerUtil
								.isLegal(event.getSession(), local);
						if (1 == result) {
							super.onDelete(event);
						} else if (-1 == result) {
							local = ListenerUtil.retLocalBean(local);
							if (null != local) {
								result = ListenerUtil.isLegal(event
										.getSession(), local);
								if (1 == result) {
									super.onDelete(event);
								} else if (-1 == result) {
									super.onDelete(event);
								}
							}
						}
					}
				}
			}
		}
		super.onDelete(event);
	}

}
