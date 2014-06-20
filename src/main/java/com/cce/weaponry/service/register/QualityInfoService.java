package com.cce.weaponry.service.register;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cce.modules.orm.Page;
import com.cce.modules.orm.PropertyFilter;
import com.cce.modules.service.CrudServiceInterface;
import com.cce.weaponry.dao.register.QualityInfoDao;
import com.cce.weaponry.entity.register.QualityInfo;

@Service
@Transactional
public class QualityInfoService implements CrudServiceInterface<QualityInfo> {

	@Autowired
	private QualityInfoDao qualityInfoDao;

	public void delete(Long id){
		qualityInfoDao.delete(id);
	}

	public void delete(List<Long> ids) {
		qualityInfoDao.delete(ids);
	}

	public QualityInfo get(Long id) {
		return qualityInfoDao.get(id);
	}

	public List<QualityInfo> list(List<PropertyFilter> filters) {
		return qualityInfoDao.find(filters);
	}

	public Page<QualityInfo> list(Page<QualityInfo> page, List<PropertyFilter> filters) {
		return qualityInfoDao.findPage(page, filters);
	}

	public void save(QualityInfo entity) {
		qualityInfoDao.save(entity);
	}

	/**
	 * 根据企业id得到质量体系信息
	 * 
	 * @param companyId
	 *            企业id
	 * @return 相关质量体系信息
	 */
	public List<QualityInfo> findQualityInfosByCompanyId(Long companyId) {
		String hql = " from QualityInfo l where l.companyInfo.id=" + companyId;
		return qualityInfoDao.find(hql);
	}

}
