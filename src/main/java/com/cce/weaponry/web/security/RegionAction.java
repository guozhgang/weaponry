package com.cce.weaponry.web.security;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.cce.weaponry.entity.register.Region;
import com.cce.weaponry.entity.security.User;
import com.cce.weaponry.service.common.RegionManagementService;
import com.cce.weaponry.service.security.UserCrudService;
import com.cce.weaponry.web.JsonActionSupport;
import com.cce.weaponry.web.vo.RegionVO;

import flexjson.JSONSerializer;

public class RegionAction extends JsonActionSupport<Region> {

	@Autowired
	private RegionManagementService regionService;

	@Autowired
	private UserCrudService userCrudService;

	public void treelist() {
		User loginUser = userCrudService.getLoginUser();
		
		List<Region> regions = new ArrayList<Region>();

		if ("管理员".equals(loginUser.getRole().getName())) {
			regions = regionService.findAllProvince();
		} else {
			regions.add(loginUser.getRegion());
		}

		String json = new JSONSerializer().exclude("*.parent").exclude(
				"*.class").deepSerialize(regions);
		render(json);
	}

	// 邮件处加载区域
	public void treeEmailList() {
		List<Region> regions = new ArrayList<Region>();
		List<RegionVO> list = new ArrayList<RegionVO>();
		RegionVO vo;
			regions = regionService.findAllProvince();
		for (Region r : regions) {
			if (r.getParent() == null) {
				RegionVO parent = new RegionVO();
				parent.setId(r.getId());
				parent.setLeaf(false);
				parent.setText(r.getText());
				List<RegionVO> vos = new ArrayList<RegionVO>();
				for (int i = 0; i < r.getChildren().size(); i++) {
					List<RegionVO> leafvos = new ArrayList<RegionVO>();
					Region region = r.getChildren().get(i);
					vo = new RegionVO();
					vo.setLeaf(false);
					vo.setId(r.getChildren().get(i).getId());
					vo.setText(r.getChildren().get(i).getText());

					for (int j = 0; j < region.getChildren().size(); j++) {
						RegionVO leafvo = new RegionVO();
						leafvo.setId(region.getChildren().get(j).getId());
						leafvo.setText(region.getChildren().get(j).getText());
						leafvo.setLeaf(true);
						leafvos.add(leafvo);
					}
					vo.setChildren(leafvos);
					vos.add(vo);

				}
				parent.setChildren(vos);
				list.add(parent);
			}
			break;
		}

		String json = new JSONSerializer().exclude("*.parent").exclude(
				"*.class").deepSerialize(list);
		render(json);
	}
}
