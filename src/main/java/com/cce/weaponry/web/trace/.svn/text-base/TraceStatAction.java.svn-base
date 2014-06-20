package com.cce.weaponry.web.trace;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.springframework.beans.factory.annotation.Autowired;

import com.cce.modules.orm.IdEntity;
import com.cce.modules.service.CrudServiceInterface;
import com.cce.modules.web.json.JsonStore;
import com.cce.modules.web.struts2.Struts2Utils;
import com.cce.weaponry.entity.register.Region;
import com.cce.weaponry.entity.traceinfo.Lthj;
import com.cce.weaponry.service.common.RegionManagementService;
import com.cce.weaponry.service.security.UserCrudService;
import com.cce.weaponry.service.traceinfo.LthjService;
import com.cce.weaponry.web.JsonCrudActionSupport;
import com.cce.weaponry.web.vo.trace.CompanyTypeVO;
import com.cce.weaponry.web.vo.trace.TraceSearchCondVO;
import com.cce.weaponry.web.vo.trace.TraceStatVO;

import flexjson.JSONDeserializer;

@Namespace("/trace")
@Action("trace")
public class TraceStatAction extends JsonCrudActionSupport<Lthj> {
	@Autowired
	private LthjService lthjService;
	@Autowired
	private RegionManagementService regionManagementService;
	@Autowired
	private UserCrudService userCrudService;

	// 重量统计
	public void stat() {
		TraceSearchCondVO vo = getTraceSearchCondVO();
		List<Long> listRegionIds = new ArrayList<Long>();
		Long id = userCrudService.getLoginUserRegionId();
		Region region;
		// 当所选区域为空时;从登陆用户的id去所有区域的ids
		if (vo.getRegionIdd() != null) {
			region = regionManagementService.get(vo.getRegionIdd());
			listRegionIds = regionManagementService.getById(vo.getRegionIdd());
		} else {
			region = regionManagementService.get(id);
			listRegionIds = regionManagementService.getById(id);
		}
		// 判断为县、区级别统计
		List<String> regionNames = new ArrayList<String>();
		for (Long regId : listRegionIds) {
			regionNames.add(regionManagementService.get(regId).getName());
		}
		TraceStatVO tv = new TraceStatVO();
		List<TraceStatVO> vos = new ArrayList<TraceStatVO>();
		List list = lthjService.getStat(vo.getBeginDate(), vo.getEndDate(), vo
				.getTraceType(), regionNames);
		Map map = new HashMap();
		for (int i = 0; i < list.size(); i++) {
			Map m = (Map) list.get(i);
			map.put(m.get("city"), m.get("count"));
		}
		
		Iterator iter = map.entrySet().iterator();
		for (int i = 0; i < map.size(); i++) {
			Map.Entry entry = (Entry) iter.next();
			tv = new TraceStatVO();
			tv.setCity((String) entry.getKey());
			tv.setCount(Double
					.parseDouble(entry.getValue().toString()));
			vos.add(tv);
		}
		render(new JsonStore(vos));
	}

	// 价格统计
	public void priceStat() {
		TraceSearchCondVO vo = getTraceSearchCondVO();
		List<Long> listRegionIds = new ArrayList<Long>();
		Long id = userCrudService.getLoginUserRegionId();
		Region region;
		// 当所选区域为空时;从登陆用户的id去所有区域的ids
		if (vo.getRegionIdd() != null) {
			region = regionManagementService.get(vo.getRegionIdd());
			listRegionIds = regionManagementService.getById(vo.getRegionIdd());
		} else {
			region = regionManagementService.get(id);
			listRegionIds = regionManagementService.getById(id);
		}
		List<String> regionNames = new ArrayList<String>();
		for (Long regId : listRegionIds) {
			regionNames.add(regionManagementService.get(regId).getName());
		}
		TraceStatVO tv = new TraceStatVO();
		List<TraceStatVO> vos = new ArrayList<TraceStatVO>();
		List list = lthjService.getPriceStat(vo.getBeginDate(),
				vo.getEndDate(),
				regionNames);
		Map map = new HashMap<String, Long>();
		for (int i = 0; i < list.size(); i++) {
			Map m = (Map) list.get(i);
			map.put(m.get("city"), m.get("price"));
		}
		Iterator iter = map.entrySet().iterator();
		for (int i = 0; i < map.size(); i++) {
			Map.Entry entry = (Entry) iter.next();
			tv = new TraceStatVO();
			tv.setCity((String) entry.getKey());
			tv.setPrice(Double
					.parseDouble(entry.getValue().toString()));
			vos.add(tv);
		}
		render(new JsonStore(vos));
	}
	// 动检、活猪进厂、屠宰、商检、出厂、销售
	public void listbox() {

		List<CompanyTypeVO> vos = new ArrayList<CompanyTypeVO>();
		CompanyTypeVO vo = new CompanyTypeVO(1l, "动检");
		vos.add(vo);
		vo = new CompanyTypeVO(2l, "活猪进场");
		vos.add(vo);
		vo = new CompanyTypeVO(3l, "屠宰");
		vos.add(vo);
		vo = new CompanyTypeVO(4l, "商检");
		vos.add(vo);
		vo = new CompanyTypeVO(5l, "出厂");
		vos.add(vo);
		vo = new CompanyTypeVO(6l, "销售");
		vos.add(vo);


		render(getJsonSerializer().serialize(new JsonStore(vos)));
	}
	@SuppressWarnings("unchecked")
	public TraceSearchCondVO getTraceSearchCondVO() {
		String data = Struts2Utils.getParameter(JsonStore.RootProperty);
		TraceSearchCondVO vo = new TraceSearchCondVO();
		if (data != null) {
			JSONDeserializer deserializer = this.getJsonDeserializer();
			JSONDeserializer<IdEntity> jsonDeserializer = deserializer.use(
					null, TraceSearchCondVO.class);
			return (TraceSearchCondVO) jsonDeserializer.deserialize(data);
		} else
			return vo;

	}

	@Override
	public CrudServiceInterface<Lthj> getCrudService() {
		// TODO Auto-generated method stub
		return lthjService;
	}
}
