package com.cce.weaponry.dao.news;

import org.springframework.stereotype.Repository;

import com.cce.modules.orm.hibernate.HibernateDao;
import com.cce.weaponry.entity.news.NewsCategory;

@Repository
public class NewsCategoryDao extends HibernateDao<NewsCategory, Long> {

}
