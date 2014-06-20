package com.cce.weaponry.web.register;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.springframework.beans.factory.annotation.Autowired;

import com.cce.modules.orm.IdEntity;
import com.cce.modules.orm.Page;
import com.cce.modules.service.CrudServiceInterface;
import com.cce.modules.web.json.JsonStore;
import com.cce.modules.web.struts2.Struts2Utils;
import com.cce.weaponry.entity.register.CompanyBadge;
import com.cce.weaponry.entity.register.CompanyInfo;
import com.cce.weaponry.entity.register.FileBean;
import com.cce.weaponry.service.common.CompanyUtils;
import com.cce.weaponry.service.register.CompanyBadgeService;
import com.cce.weaponry.service.register.CompanyInfoService;
import com.cce.weaponry.service.register.FileBeanService;
import com.cce.weaponry.service.security.UserCrudService;
import com.cce.weaponry.web.JsonCrudActionSupport;
import com.cce.weaponry.web.vo.register.Cert4CompanySearchVO;
import com.cce.weaponry.web.vo.register.Cert4CompanyVO;

import flexjson.JSONDeserializer;

@Namespace("/record")
@Action("companyBadge")
public class CompanyBadgeAction extends JsonCrudActionSupport<CompanyBadge> {

	@Autowired
	private FileBeanService fileBeanService;

	@Autowired
	private CompanyInfoService companyInfoService;

	@Autowired
	private CompanyBadgeService companyBadgeService;

	@Autowired
	private UserCrudService userCrudService;

	@Override
	public CrudServiceInterface<CompanyBadge> getCrudService() {
		return companyBadgeService;
	}

	// ------------ 最新代码分隔 ----------------
	/**
	 * 返回登录用户的所有企业证章信息
	 */
	@Override
	public void list() throws Exception {
		CompanyInfo companyInfo = companyInfoService.get(getIdParam());

		if (null == companyInfo) {
			renderMessage(false, "请先注册企业信息");
			return;
		}
		List<CompanyBadge> badges = companyInfo.getCompanyBadge();

		List<Cert4CompanyVO> list = new ArrayList<Cert4CompanyVO>();

		for (CompanyBadge i : badges) {
			Cert4CompanyVO vo = new Cert4CompanyVO();
			vo.setCreateDate(i.getFile().getCreateDate());
			vo.setDescription(i.getDescription());
			vo.setFileId(i.getFile().getId());
			vo.setId(i.getId());
			vo.setName(i.getName());
			list.add(vo);
		}

		if (logger.isDebugEnabled()) {
			CompanyUtils.printRequestInfo();
			CompanyUtils.printResponseInfo(list);
		}

		this.render(new JsonStore(list));
	}

	/**
	 * 修改企业证章证书。 证书如果没有就不用更新，如果有则需要用新的证书ID替换。
	 */
	public void saveCompanyBadge() throws Exception {
		try {
			Cert4CompanyVO entity = this.getCert4CompanyVO();

			CompanyInfo companyInfo = companyInfoService.get(entity.getId());

			if ("WAITING".equals(companyInfo.getStatus())
					|| "PROCESSING".equals(companyInfo.getStatus())) {
				renderMessage(false, "企业备案审核中,不可更改证书信息");
				return;
			} else if ("PASSED".equals(companyInfo.getStatus())) {
				renderMessage(false, "备案通过的企业信息不可修改");
				return;
			}

			CompanyBadge badge = new CompanyBadge();

			badge.setCompanyInfo(companyInfo);

			badge.setDescription(entity.getDescription());

			FileBean file = fileBeanService.get(entity.getFileId());

			badge.setFile(file);
			badge.setName(entity.getName());

			companyBadgeService.save(badge);

			entity.setId(badge.getId());

			if (logger.isDebugEnabled()) {
				CompanyUtils.printRequestInfo();
				CompanyUtils.printResponseInfo(entity);
			}

			this.render(getJsonSerializer().serialize(new JsonStore(entity)));
		} catch (Exception e) {
			this.renderMessage(false, e.getMessage());
			logger.error(e.getMessage(), e);
			throw e;
		}
	}

	/**
	 * 删除证章信息
	 */
	@Override
	public void delete() throws Exception {
		String status = companyBadgeService.get(getIdArrayParam().get(0))
				.getCompanyInfo().getStatus();
		if ("WAITING".equals(status) || "PROCESSING".equals(status)
				|| "PASSED".equals(status)) {
			renderMessage(false, "不可修改正在处理或通过备案的企业信息");
		} else {
			super.delete();
		}
	}

	// ------------ 最新代码分隔 ----------------

	/**
	 * 根据条件返回公司证章信息
	 */
	public void searchCompanyBadgeInfo() {
		Page companyInfos = new Page<CompanyInfo>();
		List<Cert4CompanyVO> list = new ArrayList<Cert4CompanyVO>();
		Cert4CompanySearchVO condition = getSearchVO();
		// 查询条件为空
		if (null == condition) {
			companyInfos = companyInfoService.findCompanyInfosByCondition(
					CompanyUtils.setupPage(), null, null, null, userCrudService
							.getLoginUser().getRegion().getId(), true);
		} else {
			Date beginDate = condition.getBeginDate();
			Date endDate = condition.getEndDate();
			Long regionId = null;
			if (null != condition.getRegionId()
					&& !"".equals(condition.getRegionId())) {
				regionId = Long.parseLong(condition.getRegionId());
			} else {
				userCrudService.getLoginUser().getRegion().getId();
			}
			companyInfos = companyInfoService.findCompanyInfosByCondition(
					CompanyUtils.setupPage(), condition.getEntName(),
					beginDate, endDate, regionId, true);
		}
		for (int j = 0; j < companyInfos.getResult().size(); j++) {
			CompanyInfo i = (CompanyInfo) companyInfos.getResult().get(j);
			Cert4CompanyVO vo = new Cert4CompanyVO();
			vo.setId(i.getId());
			vo.setEntName(i.getNameCN());
			vo.setEntNo(i.getTaxCert());
			if (null != i.getCompanyBadge() && i.getCompanyBadge().size() > 0) {
				vo.setFileId(i.getCompanyBadge().get(0).getFile().getId());
			}

			// vo.setRegionName(i.getRegion().getName());
			list.add(vo);
		}
		System.out.println("测试：" + companyInfos.getResult().size());
		companyInfos.setResult(list);
		render(getJsonSerializer().serialize(new JsonStore(companyInfos)));
	}

	/**
	 * 把搜索条件信息封装为对象
	 * 
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public Cert4CompanySearchVO getSearchVO() {
		String data = Struts2Utils.getParameter(JsonStore.RootProperty);
		if (data == null)
			return null;
		JSONDeserializer deserializer = this.getJsonDeserializer();
		JSONDeserializer<IdEntity> jsonDeserializer = deserializer.use(null,
				Cert4CompanySearchVO.class);
		return (Cert4CompanySearchVO) jsonDeserializer.deserialize(data);
	}

	/**
	 * 把页面传入的公司证章的信息封装成对象
	 * 
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public Cert4CompanyVO getCert4CompanyVO() {
		String data = Struts2Utils.getParameter(JsonStore.RootProperty);
		if (data == null)
			return null;
		JSONDeserializer deserializer = this.getJsonDeserializer();
		JSONDeserializer<IdEntity> jsonDeserializer = deserializer.use(null,
				Cert4CompanyVO.class);
		return (Cert4CompanyVO) jsonDeserializer.deserialize(data);
	}

}
