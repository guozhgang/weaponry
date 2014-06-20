package com.cce.weaponry.web.mainpage;

import java.util.ArrayList;
import java.util.Hashtable;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.springframework.beans.factory.annotation.Autowired;

import com.cce.modules.service.CrudServiceInterface;
import com.cce.modules.web.json.JsonStore;
import com.cce.weaponry.entity.news.NewsPage;
import com.cce.weaponry.entity.training.Entry;
import com.cce.weaponry.service.news.NewsCategoryCrudService;
import com.cce.weaponry.service.news.NewsPageCrudService;
import com.cce.weaponry.service.training.EntryServiceImpl;
import com.cce.weaponry.web.JsonCrudActionSupport;
import com.cce.weaponry.web.vo.mainpage.MainPageNewsVO;
import com.cce.weaponry.web.vo.mainpage.MainPageTrainingVO;

@Namespace("/mainpage")
@Action("news")
public class MainPageNewsAction extends JsonCrudActionSupport<MainPageNewsVO> {

	@Autowired
	private EntryServiceImpl entryMgr;
	@Autowired
	private NewsPageCrudService newsPageService;

	@Autowired
	private NewsCategoryCrudService newsCategoryService;

	@Override
	public CrudServiceInterface<MainPageNewsVO> getCrudService() {
		// TODO Auto-generated method stub
		return null;
	}

	/**
	 * @deprecated { id:'1', title: '分类1', html: '
	 *             <p>
	 *             <a href="javascript:showNews(1,\'Row spanning\')">Row
	 *             spanning.</a>
	 *             </p>
	 *             <p>
	 *             <a href="javascript:showNews(2,\'Row spanning.1\')">Row
	 *             spanning.1</a>
	 *             </p>
	 *             ', width: 380 }
	 */
	@Deprecated
	public void getMyNews() {
		List<MainPageNewsVO> list = new ArrayList<MainPageNewsVO>();
		// 查询要求 1： 此用户是允许查看的角色 2: 按照时间倒序排序 3： 前五条数据 4： 每个分类都要有
		Map<Long, String> categories = newsCategoryService.findCategories();

		Iterator<Long> categoryIds = categories.keySet().iterator();

		for (Iterator<String> categoryNames = categories.values().iterator(); categoryNames
				.hasNext();) {
			Long categoryId = categoryIds.next();
			String categoryName = categoryNames.next();
			Map<Long, String> newses = newsPageService
					.findNewsByLogin(categoryId);
			MainPageNewsVO vo = new MainPageNewsVO();
			Hashtable<Long, String> ht = new Hashtable<Long, String>();
			Iterator<Long> newsIds = newses.keySet().iterator();
			for (Iterator<String> newsTitles = newses.values().iterator(); newsTitles
					.hasNext();) {
				ht.put(newsIds.next(), newsTitles.next());
			}
			vo.setId(categoryId);
			vo.setTitle(categoryName);
			// vo.setMsgs(ht);
			list.add(vo);
		}
		render(new JsonStore(list));
	}

	public void getMainpageNews() {
		List<NewsPage> newses = newsPageService.findNews4MainPage();
		List<Entry> entryList = entryMgr.findEntry4MainPage();
		List list = new ArrayList();
		MainPageNewsVO nvo = new MainPageNewsVO();
		nvo.setId(1l);
		nvo.setNews(newses);
		list.add(nvo);
		MainPageTrainingVO tvo = new MainPageTrainingVO();
		tvo.setId(2l);
		tvo.setNews(entryList);
		list.add(tvo);
		render(new JsonStore(list));
	}
}
