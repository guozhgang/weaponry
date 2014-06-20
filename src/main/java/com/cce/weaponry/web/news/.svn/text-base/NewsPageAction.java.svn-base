package com.cce.weaponry.web.news;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.apache.struts2.convention.annotation.Namespace;
import org.springframework.beans.factory.annotation.Autowired;

import com.cce.modules.orm.Page;
import com.cce.modules.service.CrudServiceInterface;
import com.cce.modules.web.json.JsonStore;
import com.cce.modules.web.struts2.Struts2Utils;
import com.cce.weaponry.entity.news.NewsPage;
import com.cce.weaponry.entity.security.Role;
import com.cce.weaponry.service.news.NewsPageCrudService;
import com.cce.weaponry.service.security.RoleCrudService;
import com.cce.weaponry.web.JsonCrudActionSupport;
import com.cce.weaponry.web.util.WebDataUtil;

import flexjson.JSONDeserializer;
import flexjson.JSONSerializer;

@Namespace("/message")
public class NewsPageAction extends JsonCrudActionSupport<NewsPage> {

	@Autowired
	protected NewsPageCrudService crudService;

	@Autowired
	private RoleCrudService roleService;

	@Override
	public CrudServiceInterface<NewsPage> getCrudService() {
		return crudService;
	}

	@Override
	public void list() throws Exception {
		Page page = crudService.listWithoutLob(this.setupPage(), this
				.setupFilters());
		this.render(page);
	}

	/**
	 * 在生成json数据时,把NewsPage的属性"category"输出为其id值...
	 */
	@Override
	public JSONSerializer getJsonSerializer() {
		// TODO Auto-generated method stub
		return super.getJsonSerializer().transform(getEntityIdTransformer(),
				"category");
	}

	/**
	 * 在从json数据生成java bean时, 根据"category"的id,在数据库中查找记录,然后用其更新NewsPage对象.
	 */
	@Override
	public JSONDeserializer<NewsPage> getJsonDeserializer() {
		// TODO Auto-generated method stub
		return super.getJsonDeserializer().use(null, NewsPage.class).use(
				this.getEntityFactory(), "category");
	}

	/**
	 * 增加待角色的NewsPage
	 */
	@Override
	public void save() throws Exception {
		NewsPage newsPage = this.getRequestBean();
		String roleIds = newsPage.getRoleList().toString();
		String[] strs = roleIds.substring(1, roleIds.length() - 1).split(",");
		List<Role> roleList = new ArrayList<Role>();
		for (int i = 0; i < strs.length; i++) {
			roleList.add(roleService.get(Long.parseLong(strs[i])));
		}
		newsPage.setRoleList(roleList);
		try {
			if (newsPage != null) {
				crudService.save(newsPage);
				this.render(getJsonSerializer().serialize(
						new JsonStore(newsPage)));
			} else
				throw new RuntimeException("参数错误,指定的数据不存在!");
		} catch (Exception e) {
			this.renderMessage(false, e.getMessage());
			logger.error(e.getMessage(), e);
		}
	}

	/**
	 * 内容检索
	 */
	public void search() {
		WebDataUtil.keyWord = null;
		String keyword = Struts2Utils.getParameter("keyword"); // 接收关键字
		Page<NewsPage> page = crudService.findPagesByTitleAndContent(this
				.setupPage(), keyword);
		List<NewsPage> list = new ArrayList<NewsPage>();

		// boolean isNull = CompanyUtils.isEmpty(keyword);

		for (NewsPage result : page.getResult()) {

			if (!StringUtils.isEmpty(keyword)) {
				String title = result.getTitle();
				if (!StringUtils.isEmpty(title)) {
					result.setTitle(WebDataUtil.hightLight(result.getTitle(),
							keyword));
				}
			}
			result.setRoleList(null);
			list.add(result);
		}

		page.setResult(list);

		// render(page);
		this.render(getJsonSerializer().exclude("content").serialize(
				new JsonStore(page)));
		// the original code ...
		/*
		 * StringBuffer json=new StringBuffer(); String title = "测试标题关键字";
		 * String categoryName = "测试分类"; String excerpt =
		 * "测试测试测试测试测试关键字内容测试测试测试";
		 * 
		 * if (keyword != null && !keyword.equals("")) {
		 * 
		 * System.out.println("测试:" + keyword); title = title.replace(keyword,
		 * "<font class=\\\"keyword\\\">" + keyword + "</font>");
		 * 
		 * excerpt = excerpt.replace(keyword, "<font class=\\\"keyword\\\">" +
		 * keyword + "</font>"); }
		 * 
		 * json.append("{\"message\":\"操作成功\",\"data\":[");
		 * 
		 * json .append("{id:1,excerpt:\"" + excerpt + "\",title:\"" + title +
		 * "1\",createTime:\"1275025047500\",categoryName:\"" + categoryName +
		 * "\",createBy:\"admin\"},"); json .append("{id:2,excerpt:\"" + excerpt
		 * + "\",title:\"" + title +
		 * "2\",createTime:\"1275025047500\",categoryName:\"" + categoryName +
		 * "\",createBy:\"admin\"},"); json .append("{id:3,excerpt:\"" + excerpt
		 * + "\",title:\"" + title +
		 * "3\",createTime:\"1275025047500\",categoryName:\"" + categoryName +
		 * "\",createBy:\"admin\"},"); json .append("{id:4,excerpt:\"" + excerpt
		 * + "\",title:\"" + title +
		 * "4\",createTime:\"1275025047500\",categoryName:\"" + categoryName +
		 * "\",createBy:\"admin\"},"); json .append("{id:5,excerpt:\"" + excerpt
		 * + "\",title:\"" + title +
		 * "5\",createTime:\"1275025047500\",categoryName:\"" + categoryName +
		 * "\",createBy:\"admin\"},"); json .append("{id:6,excerpt:\"" + excerpt
		 * + "\",title:\"" + title +
		 * "6\",createTime:\"1275025047500\",categoryName:\"" + categoryName +
		 * "\",createBy:\"admin\"},"); json .append("{id:7,excerpt:\"" + excerpt
		 * + "\",title:\"" + title +
		 * "7\",createTime:\"1275025047500\",categoryName:\"" + categoryName +
		 * "\",createBy:\"admin\"},"); json .append("{id:8,excerpt:\"" + excerpt
		 * + "\",title:\"" + title +
		 * "8\",createTime:\"1275025047500\",categoryName:\"" + categoryName +
		 * "\",createBy:\"admin\"}");
		 * 
		 * json.append("],succees:true}"); this.render(json.toString());
		 */
	}


}
