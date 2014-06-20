package com.cce.weaponry.unit.service.companyInfo.record;

import java.util.Date;
import java.util.List;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.cce.modules.orm.Page;
import com.cce.modules.test.spring.SpringTxTestCase;
import com.cce.weaponry.dao.register.BusinessCaseDao;
import com.cce.weaponry.service.register.BusinessCaseService;
import com.cce.weaponry.web.vo.register.BusinessCaseVO;

public class BusinessCaseTest extends SpringTxTestCase {

	@Autowired
	private BusinessCaseService businessCaseService;
	
	@Autowired
	private BusinessCaseDao businessCaseDao;

	@Test
	public void testCounty() {
		BusinessCaseVO condition = new BusinessCaseVO();

		condition.setStartDate(new Date(2011, 01, 01));
		condition.setEndDate(new Date(2012, 12, 12));
		condition.setRegionId("20");

		Page page = new Page();

		page.setPageNo(1);
		page.setPageSize(20);

		page = businessCaseService.collects(page,
				condition);
		System.out.println(page.getResult() + "-----------"
				+ page.getResult().size() + " ====" + page.getTotalCount());
	}

	@Test
	public void testCity() {
		BusinessCaseVO condition = new BusinessCaseVO();

		// condition.setStartDate(new Date(2009, 1, 1));
		// condition.setEndDate(new Date(2012, 12, 12));
		condition.setRegionId("2");
		
		Page page = new Page();

		page.setPageNo(1);
		page.setPageSize(20);

		page = businessCaseService.collects(page, condition);
		System.out.println(page.getResult() + "-----------"
				+ page.getResult().size() + " ====" + page.getTotalCount());
	}

	@Test
	public void testProvince() {
		BusinessCaseVO condition = new BusinessCaseVO();

		// condition.setStartDate(new Date(2009, 1, 1));
		// condition.setEndDate(new Date(2012, 12, 12));
		condition.setRegionId("1");

		Page page = new Page();

		page.setPageNo(1);
		page.setPageSize(20);

		page = businessCaseService.collects(page, condition);
		System.out.println(page.getResult() + "-----------"
				+ page.getResult().size() + " ====" + page.getTotalCount());
	}

	@Test
	public void testCountySQL() {
		StringBuilder sql = new StringBuilder();
		sql.append("select ")
				.append("a.butcher_quantity,b.butcher_quantity")
				.append(",a.taking,b.taking,")
				.append("a.profit_tax,b.profit_tax,")
				.append("a.total_assets,b.total_assets,")
				.append("a.totalliabilities,b.totalliabilities,")
				.append("a.employee_numbers,b.employee_numbers,")
				.append("c.name ")
				.append("from business_case as a inner join business_case as b ")
				.append("on year(a.update_date)=(1+year(b.update_date)) and a.company=b.company ")
				.append("left join company c on a.company=c.id ")
				.append("where year(a.update_date)=2011 ")
				.append("and c.region_id=20 ");
		
		List list = businessCaseDao.getSession().createSQLQuery(sql.toString())
				.list();
		System.out.println(list + "-----------" + list.size());
	}

	@Test
	public void testCitySQL() {
		StringBuilder sql = new StringBuilder();
		sql.append("select ")
				.append("sum(a.butcher_quantity),sum(b.butcher_quantity),")
				.append("sum(a.taking),sum(b.taking),")
				.append("sum(a.profit_tax),sum(b.profit_tax),")
				.append("sum(a.total_assets),sum(b.total_assets),")
				.append("sum(a.totalliabilities),sum(b.totalliabilities),")
				.append("sum(a.employee_numbers),sum(b.employee_numbers) ")
				.append(", r.name ")
		.append("from business_case as a inner join business_case as b ")
		.append("on year(a.update_date)=(1+year(b.update_date)) and a.company=b.company ")
		.append("left join company c on a.company=c.id ")
		.append("left join region r on c.region_id=r.id ")
		.append("left join region r2 on r.region_id=r2.id ")
				.append("where 1=1 ").append("and r2.id=2 ");
		sql.append(" group by r.id ");

		List list = businessCaseDao.getSession().createSQLQuery(sql.toString())
				.list();
		System.out.println(list + "==========" + list.size());
	}

	@Test
	public void testPrivinceSQL() {
		StringBuilder sql = new StringBuilder();
		sql.append("select ")
				.append("sum(a.butcher_quantity),sum(b.butcher_quantity),")
				.append("sum(a.taking),sum(b.taking), ")
				.append("sum(a.profit_tax),sum(b.profit_tax), ")
				.append("sum(a.total_assets),sum(b.total_assets), ")
				.append("sum(a.totalliabilities),sum(b.totalliabilities), ")
				.append("sum(a.employee_numbers),sum(b.employee_numbers) ")
				.append(",r2.name ")
				.append("from business_case as a inner join business_case as b  ")
				.append("on year(a.update_date)=(1+year(b.update_date)) and a.company=b.company ")
				.append("left join company c on a.company=c.id  ")
				.append("left join region r on c.region_id=r.id  ")
				.append("left join region r2 on r.region_id=r2.id ")
				.append("where 1=1 ").append("and r2.region_id=1 ");
		sql.append(" group by r2.id ");
		List list = businessCaseDao.getSession().createSQLQuery(sql.toString())
				.list();
		System.out.println(list + "==========" + list.size());
	}

	public static void main(String[] args) {
		Date date = new Date(2011, 01, 01); // 小
		Date date2 = new Date(2012, 02, 02); // 大

		System.out.println(date2.compareTo(date));
		;

	}

}
