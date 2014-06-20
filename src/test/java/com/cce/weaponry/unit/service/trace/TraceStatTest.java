package com.cce.weaponry.unit.service.trace;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.easymock.classextension.EasyMock;
import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

import com.cce.modules.utils.ReflectionUtils;
import com.cce.weaponry.dao.traceinfo.LthjDao;
import com.cce.weaponry.entity.traceinfo.Lthj;
import com.cce.weaponry.entity.traceinfo.Monitor;
import com.cce.weaponry.entity.traceinfo.Tzjdxx;
import com.cce.weaponry.entity.traceinfo.Zzxsxx;
import com.cce.weaponry.service.common.CompanyUtils;
import com.cce.weaponry.service.traceinfo.LthjService;
import com.cce.weaponry.web.vo.trace.TraceStatVO;
public class TraceStatTest extends Assert {
	private LthjService lthjService;
	private LthjDao lthjDao;

	@Before
	public void setUp() {
		lthjService = new LthjService();
		lthjDao = EasyMock.createMock(LthjDao.class);
		ReflectionUtils.setFieldValue(lthjService, "lthjDao", lthjDao);
	}

	@After
	public void tearDown() {
		EasyMock.verify(lthjDao);
	}

	// 重量统计测试
	@Test
	public void weigthStat() {
		Date startDate = null;
		Date endDate = null;
		Long type = 1l;
		Monitor m = new Monitor();
		m.setId(1l);
		Lthj l = new Lthj();
		l.setId(1l);
		l.setChrqsj(new Date());
		l.setQYMC("qymc");
		l.setZZJGDMZH("zzjgdm");
		l.setMonitor(m);
		Tzjdxx t = new Tzjdxx();
		t.setId(1l);
		t.setHZLYDQ("1");
		t.setMonitor(m);
		Zzxsxx z = new Zzxsxx();
		z.setId(1l);
		z.setDJ(BigDecimal.valueOf(22.5d));
		z.setMonitor(m);
		z.setZL(BigDecimal.valueOf(12.5d));
		List<String> regionids = new ArrayList<String>();
		String id = "1";
		regionids.add(id);
		Map<String, List<String>> ids = new HashMap<String, List<String>>();
		ids.put("ids", regionids);
		StringBuilder hql = new StringBuilder();
		if (regionids.size() == 1) {
			hql
					.append("select new map(l.ZZJGDMZH as city"
							+ ",sum(l.monitor.zzxsxx.ZL) as count) from Lthj l  where 1=1");
		} else {
			hql
					.append("select new map(l.monitor.tzjdxx.HZLYDQ as city"
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
					+ CompanyUtils.formatDate(startDate) + "'");
			hql.append(" and l.monitor.createDate<'"
					+ CompanyUtils.formatDate(endDate) + "'");

		}
		if (regionids.size() == 1) {
			hql.append(" and l.monitor.tzjdxx.HZLYDQ ='" + regionids.get(0)
					+ "'");
			hql.append(" group by l.ZZJGDMZH");
		} else {
			hql.append(" and l.monitor.tzjdxx.HZLYDQ in (:ids)");
			hql.append(" group by l.monitor.tzjdxx.HZLYDQ");
		}
		TraceStatVO vo = new TraceStatVO();
		vo.setId(1l);
		vo.setCount(12.5d);
		vo.setCity("1");
		List map = new ArrayList();
		map.add(vo);
		EasyMock.expect(lthjDao.find(hql.toString(), ids)).andReturn(map);
		 EasyMock.replay(lthjDao);
		List mapa = lthjService.getStat(null, null, 1l, regionids);
		assertEquals(map.size(), mapa.size());
	}
	// 价格统计测试
	@Test
	public void priceStat() {
		Date startDate = null;
		Date endDate = null;
		Long type = 1l;
		Monitor m = new Monitor();
		m.setId(1l);
		Lthj l = new Lthj();
		l.setId(1l);
		l.setChrqsj(new Date());
		l.setQYMC("qymc");
		l.setZZJGDMZH("zzjgdm");
		l.setMonitor(m);
		Tzjdxx t = new Tzjdxx();
		t.setId(1l);
		t.setHZLYDQ("1");
		t.setMonitor(m);
		Zzxsxx z = new Zzxsxx();
		z.setId(1l);
		z.setDJ(BigDecimal.valueOf(22.5d));
		z.setMonitor(m);
		z.setZL(BigDecimal.valueOf(12.5d));
		List<String> regionids = new ArrayList<String>();
		String id = "1";
		regionids.add(id);
		Map<String, List<String>> ids = new HashMap<String, List<String>>();
		ids.put("ids", regionids);

		StringBuilder hql = new StringBuilder();
		// 根据企业或区域
		if (regionids.size() == 1) {
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
		if (regionids.size() == 1) {
			hql.append(" and l.monitor.tzjdxx.HZLYDQ in(:ids)");
			hql.append(" group by l.ZZJGDMZH");
		} else {
			hql.append(" and l.monitor.tzjdxx.HZLYDQ in(:ids)");
			hql.append(" group by l.monitor.tzjdxx.HZLYDQ");
		}
		TraceStatVO vo = new TraceStatVO();
		vo.setId(1l);
		vo.setCity("1");
		vo.setPrice(22.5d);
		List map = new ArrayList();
		map.add(vo);
		EasyMock.expect(lthjDao.find(hql.toString(), ids))
				.andReturn(map);
		EasyMock.replay(lthjDao);
		List list = lthjService.getPriceStat(startDate, endDate, regionids);
		assertEquals(list.size(), map.size());
	}
}
