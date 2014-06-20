package com.cce.weaponry.web.training;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.springframework.beans.factory.annotation.Autowired;

import com.cce.modules.orm.Page;
import com.cce.modules.orm.PropertyFilter;
import com.cce.modules.service.CrudServiceInterface;
import com.cce.modules.web.json.JsonStore;
import com.cce.modules.web.struts2.Struts2Utils;
import com.cce.weaponry.entity.security.Role;
import com.cce.weaponry.entity.training.Entry;
import com.cce.weaponry.entity.training.Project;
import com.cce.weaponry.entity.training.PublishType;
import com.cce.weaponry.service.common.CompanyUtils;
import com.cce.weaponry.service.config.SysConfigService;
import com.cce.weaponry.service.security.RoleCrudService;
import com.cce.weaponry.service.training.EntryServiceImpl;
import com.cce.weaponry.service.training.FileMananger;
import com.cce.weaponry.service.training.ProjectServiceImpl;
import com.cce.weaponry.service.training.PublishTypeServiceImpl;
import com.cce.weaponry.web.JsonCrudActionSupport;
import com.cce.weaponry.web.vo.training.EntryVO;

import flexjson.JSONDeserializer;
import flexjson.JSONSerializer;

@Namespace("/training")
@Action("entrymgr")
public class EntryMgrAction extends JsonCrudActionSupport<Entry> {

	@Autowired
	EntryServiceImpl entryMgr;

	@Autowired
	ProjectServiceImpl projectMgr;

	@Autowired
	FileMananger fileMgr;

	@Autowired
	PublishTypeServiceImpl publishTypeMgr;

	@Autowired
	private SysConfigService sysConfigService;
	@Autowired
	private RoleCrudService roleCrudService;

	/**
	 * 根据角色查看发布
	 */
	public void getTraingByRole() {
		String id = Struts2Utils.getParameter("filter_EQL_projectId");
		List<EntryVO> vos = new ArrayList<EntryVO>();
		Page page = entryMgr
				.getEntryByRole(CompanyUtils.setupPage(), id);
		List<Entry> list = page.getResult();
		for (Entry entry : list) {
			EntryVO vo = new EntryVO();
			vo.setId(entry.getId());
				Entry e = entryMgr.get(entry.getId());
			if (null != e.getRefFile()) {

				vo.setRefFile(e.getRefFile().getId());
				vo.setUrl(sysConfigService.getValueByCode(e.getRefFile()
						.getType().getCode())
						+ e.getRefFile().getName());
			}
			vo.setTitle(entry.getTitle());
			vo.setStatusText(entry.getStatusText());
			vo.setStatus(entry.getStatus());
			vo.setStartTimeString(entry.getStartTime().toLocaleString());
			vo.setEndTimeString(entry.getEndTime().toLocaleString());
			if (new Date().after(entry.getStartTime())
					&& new Date().before(entry.getEndTime())) {
				vos.add(vo);
			}
			
		}
		// Page p = new Page();
		// p = CompanyUtils.setupPage();
		// p.setTotalCount(vos.size());// 总记录数
		// int size = vos.size() >= p.getPageSize() ? p.getPageSize() :
		// vos.size();
		// int fromIndex = p.getPageSize() * (p.getPageNo() - 1);
		// int toIndex = fromIndex + size;
		// if (toIndex >= vos.size()) {
		// toIndex = vos.size();
		// }
		// p.setResult(vos.subList(fromIndex, toIndex));
		page.setResult(vos);
		
		if(logger.isDebugEnabled()){
			CompanyUtils.printRequestInfo();
			CompanyUtils.printResponseInfo(vos);
		}
		
		this.render(page);
	}

	@Override
	public void list() {
		List<PropertyFilter> filters = setupFilters();
		if (Struts2Utils.getParameter(JsonStore.RootProperty) != null
				&& !""
						.equals(Struts2Utils
								.getParameter(JsonStore.RootProperty))) {
			filters.add(new PropertyFilter("EQL_refFile.id", getIdParam().toString()));
		}
		Page<Entry> page = entryMgr.list(this.setupPage(), filters);
		List<Entry> result = page.getResult();
		String url = sysConfigService.getValueByCode("video_base_url");
		for (Iterator iterator = result.iterator(); iterator.hasNext();) {
			Entry entry = (Entry) iterator.next();
			// entry.setUrl(url + entry.getFileName());
		}
		this.render(page);
	}

	public void getEntryList() {
		List<Entry> list = entryMgr.getEntryByProject(projectId);
		JsonStore model = new JsonStore(list);

		JSONSerializer js = this.getJsonSerializer();
		String json = js.exclude("*.parent").serialize(model);

		this.render(json);

	}

	public void getPublishTypeList() {

		List<PublishType> list = publishTypeMgr.getList();
		JsonStore model = new JsonStore(list);
		render(model);

	}

	public void getProjectList() {


		List<Project> list = projectMgr.getAll();
		JsonStore model = new JsonStore(list);
		render(model);
	}

	@Override
	public JSONSerializer getJsonSerializer() {
		return super.getJsonSerializer().transform(
				this.getEntityIdTransformer());
	}

	/**
	 * 在从json数据生成java bean时, 根据"region"和"role"的id,在数据库中查找记录,然后用其更新User对象.
	 */
	@Override
	public JSONDeserializer<Entry> getJsonDeserializer() {
		return super.getJsonDeserializer().use(null, Entry.class).use(
				this.getEntityFactory());
	}

	private Long fileId;
	private String title;
	private Long projectId;
	private Long publishType;
	private String startDate;
	private String startTime;
	private String endDate;
	private String endTime;

	/*
	 * 
	 * SimpleDateFormat函数语法：
	 * 
	 * G 年代标志符 y 年 M 月 d 日 h 时 在上午或下午 (1~12) H 时 在一天中 (0~23) m 分 s 秒 S 毫秒 E 星期 D
	 * 一年中的第几天 F 一月中第几个星期几 w 一年中第几个星期 W 一月中第几个星期 a 上午 / 下午 标记符 k 时 在一天中 (1~24) K
	 * 时 在上午或下午 (0~11) z 时区
	 * 
	 * # # DateFormat format1 = new SimpleDateFormat("yyyy-MM-dd"); # DateFormat
	 * format 2= new SimpleDateFormat("yyyy年MM月dd日 HH时mm分ss秒");
	 */

	Date convertDateTime(String d, String t) {
		String s = d + " " + t;
		DateFormat fmt = new SimpleDateFormat("MM/dd/yyyy HH:mm:ss");
		try {
			return fmt.parse(s);
		} catch (ParseException e) {
			e.printStackTrace();
			return new Date();
		}

	}

	public void saveFunc() {
		String data = Struts2Utils.getParameter("role_id");
		String[] strs = data.split(",");
		List<Role> roleList = new ArrayList<Role>();
		for (int i = 0; i < strs.length; i++) {
			roleList.add(roleCrudService.get(Long.parseLong(strs[i])));
		}
		Entry entry = new Entry();
		entry.setRoleList(roleList);
		Debug.printRequest(this.getClass().getName() + " saveFunc");
		try {
			System.out.println("fileId " + fileId);
			this.setContentType(DEFAULT_HTML_CONTENT_TYPE);

			entryMgr.addEntry(entry, projectId, title, fileMgr.getFile(fileId),
					null, convertDateTime(this.startDate, this.startTime),
					convertDateTime( this.endDate, this.endTime )
					);

			this.renderSuccess();
			return;
		} catch (Exception e) {
			e.printStackTrace();
			this.renderMessage(false, e.getMessage());
		}
	}

	public void setFileId(Long fileId) {
		this.fileId = fileId;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public void setProjectId(Long projectId) {
		this.projectId = projectId;
	}

	public void setPublishType(Long publishType) {
		this.publishType = publishType;
	}

	@Override
	public CrudServiceInterface<Entry> getCrudService() {
		return entryMgr;
	}

	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}

	public String getEndTime() {
		return endTime;
	}

	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}

	public String getEndDate() {
		return endDate;
	}

	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}

	public String getStartTime() {
		return startTime;
	}

	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}

	public String getStartDate() {
		return startDate;
	}

}
