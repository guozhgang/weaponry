package com.cce.weaponry.web.vo.trans;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import com.cce.weaponry.entity.register.Company;
import com.cce.weaponry.entity.register.TechnicianInfo;
import com.cce.weaponry.web.vo.register.TechnicianInfoVO;

public class TechnicianInfoVOConverter extends BaseVDOConverter {

	public List<TechnicianInfoVO> converts(List<TechnicianInfo> entities) {
		List<TechnicianInfoVO> list = new ArrayList<TechnicianInfoVO>();
		if (entities != null && !entities.isEmpty()) {
			for (Iterator iterator = entities.iterator(); iterator.hasNext();) {
				TechnicianInfo entity = (TechnicianInfo) iterator.next();
				TechnicianInfoVO vo = new TechnicianInfoVO();
				copyBean(entity, vo);
				list.add(vo);
			}
		}
		return list;
	}

	public void convert(TechnicianInfo entity, TechnicianInfoVO vo) {
		copyBean(entity, vo);
	}

	@Override
	protected void doSpecialProcess(String srcName, Object srcValue, Object target) {
		TechnicianInfoVO vo = (TechnicianInfoVO) target;
		if ("company".equals(srcName)) {
			vo.setEntName(((Company) srcValue).getName());
		} else if ("photo".equals(srcName)) {
			// vo.setFileId(((FileBean) srcValue).getId());
		}
	}
}
