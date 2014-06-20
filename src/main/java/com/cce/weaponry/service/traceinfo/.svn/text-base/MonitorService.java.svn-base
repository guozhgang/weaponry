package com.cce.weaponry.service.traceinfo;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cce.modules.orm.Page;
import com.cce.modules.orm.PropertyFilter;
import com.cce.modules.service.CrudServiceInterface;
import com.cce.weaponry.dao.register.RegionDao;
import com.cce.weaponry.dao.traceinfo.MonitorDao;
import com.cce.weaponry.entity.traceinfo.Monitor;
import com.cce.weaponry.web.vo.trace.TraceSearchVO;

@Service
@Transactional
public class MonitorService implements CrudServiceInterface<Monitor> {

	@Autowired
	MonitorDao monitorDao;

	@Autowired
	private RegionDao regionDao;

	public void delete(List<Long> ids) {
		monitorDao.delete(ids);
	}

	public Monitor get(Long id) {
		return monitorDao.get(id);
	}

	public List<Monitor> list(List<PropertyFilter> filters) {
		return monitorDao.find(filters);
	}

	public Page<Monitor> list(Page<Monitor> page, List<PropertyFilter> filters) {
		return monitorDao.findPage(page, filters);
	}

	public void save(Monitor entity) {
		monitorDao.save(entity);
	}

	public Page<Monitor> search(Page page, TraceSearchVO vo) {
		String infoHql = "select distinct i from Monitor i left join i.cydxxs c where 1=1 " ;
		String countHql = "select distinct(i.id) from Monitor i left join i.cydxxs c where 1=1 " ;
		StringBuilder hql = new StringBuilder();
		Map<String,Object> map = new HashMap<String,Object>();
		if (null != vo) {
			if (null != vo.getTypeId() && 1l != vo.getTypeId()) {
				if(null!=vo.getBeginDate()){
					hql.append(" and c.cyrqsj >=:beginDate ");
					map.put("beginDate", vo.getBeginDate()) ;
				}
				if(null!=vo.getEndDate()){
					hql.append(" and c.cyrqsj <=:endDate ") ;
					map.put("endDate", vo.getEndDate()) ;
				}
			} else {
				if(null!=vo.getBeginDate()){
					hql.append(" and i.createDate >=:beginDate ");
					map.put("beginDate", vo.getBeginDate()) ;
				}
				if(null!=vo.getEndDate()){
					hql.append(" and i.createDate <=:endDate ");
					map.put("endDate", vo.getEndDate()) ;
				}
			}
			if (null != vo.getTraceCode() && !"".equals(vo.getTraceCode())) {
				hql.append(" and i.zzxsxx.ZSM like :traceCode ") ;
				map.put("traceCode","%" + vo.getTraceCode() + "%") ;
			}
			if (null != vo.getCompanyName() && !"".equals(vo.getCompanyName())) {
				hql.append(" and i.tzjdxx.QYMC like :companyName ");
				map.put("companyName", "%" + vo.getCompanyName() + "%");
			}
			if (null != vo.getRegionId() && 0l != vo.getRegionId()) {
				hql.append(" and i.tzjdxx.HZLYDQ like :region ");
				map.put("region", "%"
						+ regionDao.get(vo.getRegionId()).getName() + "%");
			}
		}
		page.setAutoCount(false) ;
		page.setTotalCount(monitorDao.createQuery(countHql + hql.toString(),
				map).list().size());
		return monitorDao.findPage(page, infoHql + hql.toString()
				+ " order by i.createDate desc ", map);
	}
}
