package com.cce.weaponry.web.vo.trans;

import com.cce.weaponry.entity.register.TechnicianInfo;
import com.cce.weaponry.web.register.TechnicianInfoAction;
import com.cce.weaponry.web.vo.register.TechnicianInfoVO;

public class TechnicianInfoDOConverter extends BaseVDOConverter {
	TechnicianInfoAction action;

	public TechnicianInfoDOConverter(TechnicianInfoAction action) {
		super();
		this.action = action;
	}

	public void convert(TechnicianInfoVO vo, TechnicianInfo entity) {
		copyBean(vo, entity);
	}

	@Override
	protected void doSpecialProcess(String srcName, Object srcValue, Object target) {
		TechnicianInfo entity=(TechnicianInfo)target;
		if("fileId".equals(srcName)){
			entity.setPhoto(action.getFileBeanService().get((Long) srcValue));
		}
	}
}
