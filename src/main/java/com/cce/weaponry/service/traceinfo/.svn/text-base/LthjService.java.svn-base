package com.cce.weaponry.service.traceinfo;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cce.modules.orm.Page;
import com.cce.modules.orm.PropertyFilter;
import com.cce.modules.service.CrudServiceInterface;
import com.cce.weaponry.dao.traceinfo.LthjDao;
import com.cce.weaponry.entity.traceinfo.Lthj;
import com.cce.weaponry.service.common.CompanyUtils;

@Service
@Transactional
public class LthjService implements CrudServiceInterface<Lthj> {

	@Autowired
	LthjDao lthjDao;

	// 溯源重量统计
	public List getStat(Date startDate, Date endDate, Long type,
			List<String> regionId) {
		Map<String, List<String>> ids = new HashMap<String, List<String>>();
		ids.put("ids", regionId);
		StringBuilder hql = new StringBuilder();
		if (regionId.size() == 1) {
			hql
					.append("select new map(l.ZZJGDMZH as city"
							+ ",sum(l.monitor.zzxsxx.ZL) as count) from Lthj l  where 1=1");
		} else {
		hql.append("select new map(l.monitor.tzjdxx.HZLYDQ as city"
							+ ",sum(l.monitor.zzxsxx.ZL) as count) from Lthj l  where 1=1");
		}
		if (type != null && type == 1) {
			if (startDate != null && endDate != null) {
				hql.append(" and l.monitor.tzjdxx.djrqsj>'"
						+ CompanyUtils.formatDate(startDate) + "'");
				hql.append(" and l.monitor.tzjdxx.djrqsj<'"
						+ CompanyUtils.formatDate(endDate) + "'");
			}
		} else if (startDate != null && endDate != null) {
			hql.append(" and l.monitor.createDate>'"
					+ CompanyUtils.formatDate(startDate)
							+ "'");
			hql.append(" and l.monitor.createDate<'"
					+ CompanyUtils.formatDate(endDate) + "'");

		}
		if (regionId.size() == 1) {
			hql.append(" and l.monitor.tzjdxx.HZLYDQ ='" + regionId.get(0)
					+ "'");
			hql.append(" group by l.ZZJGDMZH");
		} else {
			hql.append(" and l.monitor.tzjdxx.HZLYDQ in (:ids)");
			hql.append(" group by l.monitor.tzjdxx.HZLYDQ");
		}
		List list = lthjDao.find(hql.toString(), ids);
		// Map map = new HashMap();
		// for (int i = 0; i < list.size(); i++) {
		// Map vo = (Map) list.get(i);
		// map.put(vo.get("city"), vo.get("count"));
		// }
		return list;
	}

	// 溯源价格统计
	public List getPriceStat(Date startDate, Date endDate, List<String> regionId) {
		Map<String, List<String>> ids = new HashMap<String, List<String>>();
		ids.put("ids", regionId);
		StringBuilder hql = new StringBuilder();
		// 根据企业或区域
		if (regionId.size() == 1) {
			hql
					.append("select new map(l.ZZJGDMZH as city"
							+ ",avg(l.monitor.zzxsxx.DJ) as price) from Lthj l  where 1=1");
		} else {
			hql
					.append("select new map(l.monitor.tzjdxx.HZLYDQ as city"
							+ ",avg(l.monitor.zzxsxx.DJ) as price) from Lthj l  where 1=1");
		}
		if (startDate != null) {
			hql.append(" and l.monitor.createDate>'"
					+ CompanyUtils.formatDate(startDate) + "'");

		}
		if (endDate != null) {
			hql.append(" and l.monitor.createDate<'"
					+ CompanyUtils.formatDate(endDate) + "'");
		}
		if (regionId.size() == 1) {
			hql.append(" and l.monitor.tzjdxx.HZLYDQ in(:ids)");
			hql.append(" group by l.ZZJGDMZH");
		} else {
			hql.append(" and l.monitor.tzjdxx.HZLYDQ in(:ids)");
			hql.append(" group by l.monitor.tzjdxx.HZLYDQ");
		}
		List list = lthjDao.find(hql.toString(), ids);
		// Map map = new HashMap<String, Long>();
		// for (int i = 0; i < list.size(); i++) {
		// Map vo = (Map) list.get(i);
		// map.put(vo.get("city"), vo.get("price"));
		// }
		return list;
	}
	public void delete(List<Long> ids) {
		lthjDao.delete(ids);
	}

	public Lthj get(Long id) {
		return lthjDao.get(id);
	}

	public List<Lthj> list(List<PropertyFilter> filters) {
		return lthjDao.find(filters);
	}

	public Page<Lthj> list(Page<Lthj> page, List<PropertyFilter> filters) {
		return lthjDao.findPage(page, filters);
	}

	public void save(Lthj entity) {
		lthjDao.save(entity);
	}

	public List<Lthj> findByMonitorId(Long id) {
		String hql = "select l from Lthj l where l.monitor.id=" + id;
		return lthjDao.find(hql);
	}
}
