package com.cce.weaponry.hibernate;

import org.hibernate.engine.EntityKey;
import org.hibernate.event.LoadEvent;
import org.hibernate.event.def.DefaultLoadEventListener;
import org.hibernate.persister.entity.EntityPersister;

public class LoadListener extends DefaultLoadEventListener {

	/**
	 * 在读取任何一个javaBean时调用
	 */
	@Override
	protected Object load(LoadEvent event, EntityPersister persister,
			EntityKey keyToLoad, LoadType options) {
		// 得到要读取的对象
		Object model = super.load(event, persister, keyToLoad, options);

		// 判断要读取得对象是否合法（即是否为当前登录用户可操纵对象）
		int result = ListenerUtil.isLegal(event.getSession(), model);

		Object local = null;

		// 包含region属性，且在可操纵范围之内
		if (1 == result)
			return model;
		else if (0 == result)
			return null; // 包含region属性，但不在可操纵范围之内
		else { // 查看对象所包含的属性的属性是否包含region属性
			local = ListenerUtil.retLocalBean(model);
			if (null != local) {
				result = ListenerUtil.isLegal(event.getSession(), local);
				if (1 == result)
					return model;
				else if (0 == result)
					return null;
				else {
					local = ListenerUtil.retLocalBean(local);
				}
				if (null != local) {
					result = ListenerUtil.isLegal(event.getSession(), local);
					if (1 == result)
						return model;
					else if (0 == result)
						return null;
					else {
						local = ListenerUtil.retLocalBean(local);
						if (null != local) {
							result = ListenerUtil.isLegal(event.getSession(),
									local);
							if (1 == result)
								return model;
							else if (0 == result)
								return null;
							else
								return model;
						}
					}
				}
			}
		}
		return model;
	}



}
