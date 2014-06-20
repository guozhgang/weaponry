package com.cce.weaponry.web.register;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.springframework.beans.factory.annotation.Autowired;

import com.cce.modules.orm.IdEntity;
import com.cce.modules.orm.Page;
import com.cce.modules.service.CrudServiceInterface;
import com.cce.modules.web.json.JsonStore;
import com.cce.modules.web.struts2.Struts2Utils;
import com.cce.weaponry.entity.register.BusinessCase;
import com.cce.weaponry.entity.register.Company;
import com.cce.weaponry.entity.register.CompanyInfo;
import com.cce.weaponry.entity.security.User;
import com.cce.weaponry.service.common.CompanyUtils;
import com.cce.weaponry.service.register.BusinessCaseService;
import com.cce.weaponry.service.security.UserCrudService;
import com.cce.weaponry.web.JsonCrudActionSupport;
import com.cce.weaponry.web.vo.register.BusinessCaseVO;
import com.cce.weaponry.web.vo.register.StatsCompany;

import flexjson.JSONDeserializer;

@Namespace("/record")
@Action
public class BusinessCaseAction extends JsonCrudActionSupport<BusinessCase> {

	@Autowired
	private BusinessCaseService businessCaseService;

	@Autowired
	private UserCrudService userCrudService;

	@Override
	public CrudServiceInterface<BusinessCase> getCrudService() {
		return businessCaseService;
	}

	/**
	 * 按经营状况进行同比
	 * 
	 * @throws Exception
	 */
	public void collect() throws Exception {
		BusinessCaseVO businessCaseVO = getBusinessCaseVO();
		User user = userCrudService.getLoginUser();
		businessCaseVO = (null == businessCaseVO) ? (new BusinessCaseVO())
				: businessCaseVO;
		if (null == businessCaseVO.getRegionId()
				|| "".equals(businessCaseVO.getRegionId())) {
			businessCaseVO.setRegionId(Long.toString(user.getRegion().getId()));
		}
		Page<BusinessCaseVO> page = businessCaseService.collects(
				CompanyUtils.setupPage(), businessCaseVO);
		render(page);
	}

	/**
	 * 根据条件进行经营状况统计
	 * 
	 * @throws Exception
	 */
	public void statistics() throws Exception {
		// 得到封装对象
		BusinessCaseVO condition = getBusinessCaseVO();

		// 查询统计数据
		Map<String, Long> coms = businessCaseService.statsCompanies(condition);

		// 得到迭代变量
		Iterator<String> itRegion = coms.keySet().iterator();
		Iterator<Long> itCount = coms.values().iterator();

		// 返回前台的集合
		List<StatsCompany> list = new ArrayList<StatsCompany>();

		// 封装数据
		for (int i = 0; i < coms.size(); i++) {
			StatsCompany ret = new StatsCompany();

			ret.setCity(itRegion.next());// regionManagementService.getNameById(itRegion.next()));
			ret.setCount(itCount.next());

			list.add(ret);
		}
		// 返回前台

		if (logger.isDebugEnabled()) {
			CompanyUtils.printRequestInfo();
			CompanyUtils.printResponseInfo(list);
		}

		render(new JsonStore(list));
	}

	/**
	 * 根据条件进行备案查询
	 * 
	 * @throws Exception
	 */
	public void search() throws Exception {
		// 得到封装对象
		BusinessCaseVO condition = getBusinessCaseVO();
		Page<BusinessCase> page = businessCaseService.search(this.setupPage(),
				condition);
		this.render(page);
	}

	@Override
	public void save() throws Exception {
		Company company = userCrudService.getLoginUser().getCompany();

		if (null == company) {
			renderMessage(false, "未备案通过的企业不可提交");
			return;
		}

		CompanyInfo companyInfo = company.getLastAppCompanyInfo();

		// 1. 判断企业备案是否已经备案成功
		if (null==companyInfo || !"PASSED".equals(companyInfo.getStatus())) {
			renderMessage(false, "未备案通过的企业不可提交");
			return;
		}
		// 2. 判断是新增还是修改 若新增 则 判断今年的是否已经保存了 保存了,修改 否则 新增 , 若是修改  则判断是否
		BusinessCase businessCase = this.getRequestBean();

		businessCase.setCompany(userCrudService.getLoginUser().getCompany());
		businessCase.setUpdateDate(new Date());
		// 最后一次的提交
		BusinessCase primaryCase = businessCaseService
				.findLastBusinessCase();
		int year = 0;
		int now = 0;
		if (null != primaryCase) {
			Calendar calendar = Calendar.getInstance();
			calendar.setTime(primaryCase.getUpdateDate());
			year = calendar.get(Calendar.YEAR);
			calendar.setTime(new Date());
			now = calendar.get(Calendar.YEAR);
		}
		// 新增
		if (null == businessCase.getId() || 0l == businessCase.getId()) {
			// 企业第一次新增
			if (year == 0) {
				businessCase.setCreateDate(new Date());
				businessCaseService.save(businessCase);
				// render(businessCase);
				renderSuccess();
			}
			// 今年又一次新增
			else if (now <= year) {
				renderMessage(false, "一年只能新增一次经营情况");
			}
			// 今年的新增
			else {
				businessCase.setCreateDate(new Date());
				businessCaseService.save(businessCase);
				// render(businessCase);
				renderSuccess();
			}
		}
		// 修改
		else {
			// 企业第一次新增
			if (year == 0)
				throw new RuntimeException("程序出现异常!");
			// 今年的又一修改
			else if (now <= year) {
				businessCaseService.save(businessCase);
				// render(businessCase);
				renderSuccess();
			}
			// 更改以前的记录
			else {
				renderMessage(false, "以前的经营情况不能修改");
			}
		}
	}

	@Override
	public void get() {
		super.get();
	}

	/**
	 * 查询统计方法封装对象
	 * 
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public BusinessCaseVO getBusinessCaseVO() {
		String data = Struts2Utils.getParameter(JsonStore.RootProperty);
		if (data == null)
			return null;
		JSONDeserializer deserializer = this.getJsonDeserializer();
		JSONDeserializer<IdEntity> jsonDeserializer = deserializer.use(null,
				BusinessCaseVO.class);
		return (BusinessCaseVO) jsonDeserializer.deserialize(data);
	}

	public static void main(String[] args) {
		Date date = new Date();
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		System.out.println(calendar.get(Calendar.YEAR));
		System.out.println(date.getYear() + "  ");
		System.out.println("");
		System.out.println(date);
	}

}
