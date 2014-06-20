package com.cce.weaponry.web.trace;

import java.util.ArrayList;
import java.util.List;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.springframework.beans.factory.annotation.Autowired;

import com.cce.modules.orm.IdEntity;
import com.cce.modules.orm.Page;
import com.cce.modules.service.CrudServiceInterface;
import com.cce.modules.web.json.JsonStore;
import com.cce.modules.web.struts2.Struts2Utils;
import com.cce.weaponry.entity.traceinfo.Cydxx;
import com.cce.weaponry.entity.traceinfo.Lthj;
import com.cce.weaponry.entity.traceinfo.Monitor;
import com.cce.weaponry.entity.traceinfo.Tzjdxx;
import com.cce.weaponry.entity.traceinfo.Zzxsxx;
import com.cce.weaponry.service.common.CompanyUtils;
import com.cce.weaponry.service.traceinfo.CydxxService;
import com.cce.weaponry.service.traceinfo.LthjService;
import com.cce.weaponry.service.traceinfo.MonitorService;
import com.cce.weaponry.service.traceinfo.TzjdxxService;
import com.cce.weaponry.service.traceinfo.ZzxsxxService;
import com.cce.weaponry.web.JsonCrudActionSupport;
import com.cce.weaponry.web.vo.trace.ButcherVO;
import com.cce.weaponry.web.vo.trace.CompanyTypeVO;
import com.cce.weaponry.web.vo.trace.InventoryVO;
import com.cce.weaponry.web.vo.trace.SaleVO;
import com.cce.weaponry.web.vo.trace.TraceInfoVO;
import com.cce.weaponry.web.vo.trace.TraceSearchVO;
import com.cce.weaponry.web.vo.trace.TransportVO;

import flexjson.JSONDeserializer;

@Namespace("/trace")
@Action("traceinfo")
public class TraceInfoAction extends JsonCrudActionSupport<Monitor> {

	@Autowired
	private MonitorService monitorService;

	@Autowired
	private CydxxService cydxxService;

	@Autowired
	private LthjService lthjService;

	@Autowired
	private ZzxsxxService zzxsxxService;

	@Autowired
	private TzjdxxService tzjdxxService;

	@Override
	public CrudServiceInterface<Monitor> getCrudService() {
		return monitorService;
	}

	public void listTransport() throws Exception {
		List<Lthj> list = lthjService.findByMonitorId(getIdParam());
		List<TransportVO> retList = new ArrayList<TransportVO>();

		for (Lthj i : list) {
			TransportVO vo = new TransportVO();

			vo.setCompanyName(i.getQYMC());
			vo.setId(i.getId());
			vo.setOrgCode(i.getZZJGDMZH());
			vo.setShipment(i.getChrqsj());
			vo.setStock(i.getJhrqsj());

			retList.add(vo);
		}

		render(new JsonStore(retList));
	}

	public void listButcher() throws Exception {
		List<Tzjdxx> list = tzjdxxService.findByMonitorId(getIdParam());

		List<ButcherVO> retList = new ArrayList<ButcherVO>();

		for (Tzjdxx i : list) {
			ButcherVO vo = new ButcherVO();

			vo.setAnimalCertificateNo(i.getDWCPJYHGZH());
			vo.setAnimalCheckDepart(i.getDWCPJYDWMC());
			vo.setAutoCheckOrg(i.getDJJYJGMC());
			vo.setAutoCheckTime(i.getDjrqsj());
			vo.setButcherTime(i.getTzrqsj());
			vo.setCompanyName(i.getQYMC());
			vo.setExtenalCheckDepart(i.getCXJDWCPJYDWMZ());
			vo.setExtenalCheckNo(i.getCXJDWCPJYHGZH());
			vo.setFarm(i.getYZC());
			vo.setId(i.getId());
			vo.setInspectionTime(i.getSjrqsj());
			vo.setListerizeCheckDepart(i.getDWYZGJXDZMDWMC());
			vo.setListerizeNo(i.getDWYZGJXDZMH());
			vo.setNonEpizootieDepart(i.getWHBFYQZMSFZDW());
			vo.setNonEpizootieTime(i.getWhbfyqzmsrqsj());
			vo.setOrgCode(i.getZZJGDMZH());
			vo.setOriginCheckNo(i.getCDJYZHM());
			vo.setOriginGovAgency(i.getCDJYZFZDWMZ());
			vo.setPigOrigin(i.getHZLYDQ());
			vo.setPigStockTime(i.getHzjcrqsj());
			vo.setQualityCheckDepart(i.getRPPZJYJYDWMZ());
			vo.setQualityCheckNo(i.getRPPZJYJYZH());
			vo.setShipmentTime(i.getCcrqsj());

			retList.add(vo);
		}

		render(new JsonStore(retList));
	}

	public void listInventory() throws Exception {
		List<Cydxx> list = cydxxService.findByMonitorId(getIdParam());
		List<InventoryVO> retList = new ArrayList<InventoryVO>();

		for (Cydxx i : list) {
			InventoryVO vo = new InventoryVO();

			vo.setCheckNo(i.getDJZH());
			vo.setCheckPlace(i.getDJDD());
			vo.setCheckTime(i.getCyrqsj());
			vo.setGovAgency(i.getDJZFZJGMZ());
			vo.setId(i.getId());

			retList.add(vo);
		}

		render(new JsonStore(retList));
	}

	public void listSale() throws Exception {
		List<Zzxsxx> list = zzxsxxService.findByMonitorId(getIdParam());
		List<SaleVO> retList = new ArrayList<SaleVO>();

		for (Zzxsxx i : list) {
			SaleVO vo = new SaleVO();

			vo.setId(i.getId());
			vo.setProductName(i.getPM());
			vo.setTraceCode(i.getZSM());
			vo.setUnitPrice(i.getDJ());
			vo.setWeight(i.getZL());

			retList.add(vo);
		}

		render(new JsonStore(retList));
	}

	@SuppressWarnings("unchecked")
	public TraceSearchVO getSearchVO() {
		String data = Struts2Utils.getParameter(JsonStore.RootProperty);
		if (data == null)
			return null;
		JSONDeserializer deserializer = this.getJsonDeserializer();
		JSONDeserializer<IdEntity> jsonDeserializer = deserializer.use(null,
				TraceSearchVO.class);
		return (TraceSearchVO) jsonDeserializer.deserialize(data);
	}

	@Override
	public void list() throws Exception {
		Page page = monitorService.search(CompanyUtils.setupPage(),
				getSearchVO());
		
		List<Monitor> list = page.getResult();
		List<TraceInfoVO> retList = new ArrayList<TraceInfoVO>();

		for (Monitor i : list) {
			TraceInfoVO vo = new TraceInfoVO();

			if (null != i.getTzjdxx()) {
				vo.setButCompany(i.getTzjdxx().getQYMC());
				vo.setButTime(i.getTzjdxx().getTzrqsj());
				vo.setIntoTime(i.getTzjdxx().getHzjcrqsj());
				vo.setOutTime(i.getTzjdxx().getCcrqsj());
			}
			if (null != i.getZzxsxx()) {
				vo.setProductName(i.getZzxsxx().getPM());
				vo.setTraceCode(i.getZzxsxx().getZSM());
				vo.setUnitPrice(i.getZzxsxx().getDJ());
				vo.setWeight(i.getZzxsxx().getZL());
			}
			vo.setId(i.getId());
			vo.setSaleTime(i.getCreateDate());

			retList.add(vo);
		}

		page.setResult(retList);
		render(page);
	}

	public void listTypeBox() throws Exception {
		render(new JsonStore(CompanyTypeVO.getTypeList()));
	}

}
