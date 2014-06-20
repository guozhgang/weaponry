package com.cce.weaponry.service.message;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import sun.security.util.Debug;

import com.cce.modules.orm.Page;
import com.cce.modules.orm.PropertyFilter;
import com.cce.modules.security.springsecurity.SpringSecurityUtils;
import com.cce.modules.service.CrudServiceInterface;
import com.cce.weaponry.dao.message.DraftBoxDao;
import com.cce.weaponry.entity.message.DraftBox;

@Service
@Transactional
public class DraftBoxCrudService implements CrudServiceInterface<DraftBox> {

	@Autowired
	private DraftBoxDao draftBoxDao;

	public void delete(List<Long> ids) {
		draftBoxDao.delete(ids);
	}

	@Transactional(readOnly = true)
	public DraftBox get(Long id) {
		return draftBoxDao.get(id);
	}

	@Transactional(readOnly = true)
	public List<DraftBox> list(List<PropertyFilter> filters) {
		filters.add(new PropertyFilter("EQS_sender", SpringSecurityUtils.getCurrentUserName()));
		return draftBoxDao.find(filters);
	}

	@Transactional(readOnly = true)
	public Page<DraftBox> list(Page<DraftBox> page, List<PropertyFilter> filters) {
		filters.add(new PropertyFilter("EQS_sender", SpringSecurityUtils.getCurrentUserName()));
		return draftBoxDao.findPage(page, filters);
	}

	public void save(DraftBox entity) {
		if (entity.getId() == null) {
			entity.setSender(SpringSecurityUtils.getCurrentUserName());
			entity.setCreateTime(new Date());
		}
		draftBoxDao.save(entity);
	}

	public Page<DraftBox> getMySelfSender(Page<DraftBox> page) {
		String hql = "from DraftBox where sender='"
				+ SpringSecurityUtils.getCurrentUserName() + "'";
		Debug.println("查看草稿箱", hql);
		return draftBoxDao.findPage(page, hql.toString());
	}

	public Page<DraftBox> getfilter(Page<DraftBox> page, Object str) {
		StringBuilder hql = new StringBuilder()
				.append("from DraftBox d where d.sender='"
						+ SpringSecurityUtils.getCurrentUserName() + "'");
		if (null != str && !"".equals(str)) {
			hql.append(" and  (d.receiver like '%" + str
					+ "%' or d.topic like '%" + str + "%')");
		}
		Debug.println("提交不为空时根据接收者、标题查看草稿箱", hql.toString());
		return draftBoxDao.findPage(page, hql.toString());
	}
}
