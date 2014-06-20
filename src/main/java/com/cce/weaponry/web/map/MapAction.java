package com.cce.weaponry.web.map;

import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.apache.struts2.convention.annotation.Namespace;
import org.springframework.beans.factory.annotation.Autowired;

import com.cce.modules.service.CrudServiceInterface;
import com.cce.modules.web.json.JsonStore;
import com.cce.weaponry.entity.register.Region;
import com.cce.weaponry.entity.security.User;
import com.cce.weaponry.service.common.RegionManagementService;
import com.cce.weaponry.service.security.UserCrudService;
import com.cce.weaponry.web.JsonCrudActionSupport;
import com.cce.weaponry.web.vo.map.MapDataInfoVO;

/**
 * 由于不知道要写什么Bean所以随便找了一个，请注意修改成Map的bean
 * 
 * @author Administrator
 * 
 */
@Namespace("/map")
public class MapAction extends JsonCrudActionSupport<MapDataInfoVO> {

	@Autowired
	private RegionManagementService regionManagementService;
	@Autowired
	private UserCrudService userCrudService;

	/**
	 * 获取统计数据
	 * 
	 * baqyfb 是否显示备案企业分布数。
	 * 
	 * whhclfb 是否显示无害化处理分布数
	 * 
	 * jsryfb 是否显示技术人员分布数
	 * 
	 * 这个3个参数都会传递到action中。 类型是boolean 当请求类型等于false的时候则不获取该统计数据。如果等于 true
	 * 则获取统计数据。
	 * 
	 * 统计数据获取时，需要按照城市区域分组，如下格式:
	 * 
	 * [ {city:'济南市',baqyfb_num:'1500',whhclfb_num:'5000',jsryfb_num:'10000'},
	 * {city:'青岛市',baqyfb_num:'1500',whhclfb_num:'5000',jsryfb_num:'10000'},
	 * {city:'威海市',baqyfb_num:'1500',whhclfb_num:'5000',jsryfb_num:'10000'} ]
	 * 
	 * 以上数据格式是获取所有字段的。例如前台传送参数
	 * 
	 * baqyfb=true&whhclfb=false&jsryfb=false
	 * 
	 * 返回json数据应该如下：
	 * 
	 * [ {city:'济南市',baqyfb_num:'1500'}, {city:'青岛市',baqyfb_num:'1500'},
	 * {city:'威海市',baqyfb_num:'1500'} ]
	 */
	@Override
	public void list() {
		User user = userCrudService.getLoginUser();
		List<Long> ids = regionManagementService.getById(user.getRegion()
				.getId());
		Map map = new HashMap<String, MapDataInfoVO>();
		// this.render("[{city:'济南市',batzqy_num:'1500',whhry_num:'100'},{city:'青岛市',batzqy_num:'1500',whhry_num:'100'},{city:'威海市',batzqy_num:'1500',whhry_num:'100'}]");
		MapDataInfoVO entity = super.getRequestBean();
		if (entity != null) {
			if (entity.isFetchEnt()) {
				Map<Region, Long> info = regionManagementService
						.findFilingCompanyInfoRegions();
				for (Iterator iterator = info.keySet().iterator(); iterator
						.hasNext();) {
					Region region = (Region) iterator.next();
					MapDataInfoVO mapdata = getMapData(region, map);
					mapdata.setEntDistNum(info.get(region));
				}
			}
			if (entity.isFetchInno()) {
				Map<Region, Long> info = new HashMap<Region, Long>();
				for (Iterator iterator = info.keySet().iterator(); iterator
						.hasNext();) {
					Region region = (Region) iterator.next();
					MapDataInfoVO mapdata = getMapData(region, map);
					mapdata.setInnoDistNum(info.get(region));
				}
			}
			if (entity.isFetchTech()) {
				Map<Region, Long> info = regionManagementService
						.findFilingTechnicianInfoRegions();
				for (Iterator iterator = info.keySet().iterator(); iterator
						.hasNext();) {
					Region region = (Region) iterator.next();
					MapDataInfoVO mapdata = getMapData(region, map);
					mapdata.setTechDistNum(info.get(region));
				}
			}
		}
		this.render(new JsonStore(map.values()));
		// this.render("[ {city:'济南市',baqyfb_num:'1500'}, {city:'青岛市',baqyfb_num:'1500'}, {city:'威海市',baqyfb_num:'1500'} ]");
	}

	private MapDataInfoVO getMapData(Region region,
			Map<Region, MapDataInfoVO> data) {
		MapDataInfoVO mapdata = null;
		if (data.get(region) != null) {
			mapdata = (MapDataInfoVO) data.get(region);
		} else {
			mapdata = new MapDataInfoVO();
			data.put(region, mapdata);
			mapdata.setRegionName(region.getName());
		}
		return mapdata;
	}

	@Override
	public CrudServiceInterface<MapDataInfoVO> getCrudService() {
		return null;
	}

}
