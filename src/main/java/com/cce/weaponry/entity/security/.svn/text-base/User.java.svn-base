package com.cce.weaponry.entity.security;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OrderBy;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import com.cce.modules.orm.IdEntity;
import com.cce.modules.utils.ReflectionUtils;
import com.cce.weaponry.entity.register.Company;
import com.cce.weaponry.entity.register.CompanyInfo;
import com.cce.weaponry.entity.register.Region;

/**
 * 用户.
 * 
 * 使用JPA annotation定义ORM关系. 使用Hibernate annotation定义JPA 1.0未覆盖的部分.
 * 
 * @author cce
 */
@Entity
// 表名与类名不相同时重新定义表名.
@Table(name = "SS_USER")
// 默认的缓存策略.
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class User extends IdEntity {

	private String loginName;// 登录名
	private String password;// 为简化演示使用明文保存的密码
	private String name;// 姓名
	private String email;// 电子邮件

	private String sex;// 性别
	private Integer age;// 年龄
	private String mobilePhone;// 手机号
	private String telPhone;// 电话号码
	private String address;// 地址

	private List<Role> roleList = new ArrayList<Role>();// 有序的关联对象集合
	private Region region;
	// private CompanyInfo companyInfo;
	private Company company;
	// private List<UserBadge> userBadge = new ArrayList<UserBadge>();

	// @OneToMany(mappedBy = "user")
	// public List<UserBadge> getUserBadge() {
	// return userBadge;
	// }
	//
	@Column(length = 10)
	public String getSex() {
		return sex;
	}

	public void setSex(String sex) {
		this.sex = sex;
	}

	public Integer getAge() {
		return age;
	}

	public void setAge(Integer age) {
		this.age = age;
	}

	@Column(length = 11)
	public String getMobilePhone() {
		return mobilePhone;
	}

	public void setMobilePhone(String mobilePhone) {
		this.mobilePhone = mobilePhone;
	}

	@Column(length = 15)
	public String getTelPhone() {
		return telPhone;
	}

	public void setTelPhone(String telPhone) {
		this.telPhone = telPhone;
	}

	@Column(length = 200)
	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	// public void setUserBadge(List<UserBadge> userBadge) {
	// this.userBadge = userBadge;
	// }

	@ManyToOne
	@JoinColumn(name = "COMPANY_ID")
	public Company getCompany() {
		return company;
	}

	public void setCompany(Company company) {
		this.company = company;
	}

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "REGION_ID", nullable = false)
	public Region getRegion() {
		return region;
	}

	public void setRegion(Region region) {
		this.region = region;
	}

	// 字段非空且唯一, 用于提醒Entity使用者及生成DDL.
	@Column(nullable = false, unique = true, length = 20)
	public String getLoginName() {
		return loginName;
	}

	public void setLoginName(String loginName) {
		this.loginName = loginName;
	}

	@Column(length = 20)
	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	@Column(length = 50)
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Column(length = 50)
	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	// 多对多定义
	@ManyToMany
	// 中间表定义,表名采用默认命名规则
	@JoinTable(name = "SS_USER_ROLE", joinColumns = { @JoinColumn(name = "USER_ID") }, inverseJoinColumns = { @JoinColumn(name = "ROLE_ID") })
	// Fecth策略定义
	@Fetch(FetchMode.SUBSELECT)
	// 集合按id排序.
	@OrderBy("id")
	// 集合中对象id的缓存.
	@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
	public List<Role> getRoleList() {
		return roleList;
	}

	public void setRoleList(List<Role> roleList) {
		this.roleList = roleList;
	}

	/**
	 * 用户拥有的角色名称字符串, 多个角色名称用','分隔.
	 */
	// 非持久化属性.
	@Transient
	public String getRoleNames() {
		return ReflectionUtils.convertElementPropertyToString(roleList, "name", ", ");
	}
	
	@Transient
	public String getRegionName(){
		if(this.region != null)
			return this.region.getFullName();
		return "";
	}

	@Transient
	public CompanyInfo getCompanyInfo() {
		if (this.company != null && this.company.getLastAppCompanyInfo() != null)
			return this.company.getLastAppCompanyInfo();
		return null;
	}

	@Transient
	public String getCompanyName() {
		CompanyInfo companyInfo = getCompanyInfo();
		if (companyInfo != null)
			return companyInfo.getNameCN();
		return null;
	}

	/**
	 * 用户拥有的角色id字符串, 多个角色id用','分隔.
	 */
	@Transient
	public String getRoleIds() {
		return ReflectionUtils.convertElementPropertyToString(roleList, "id", ", ");
	}

	// 非持久化属性.
	@Transient
	@SuppressWarnings("unchecked")
	public List<Long> getListRoleId() {
		return ReflectionUtils.convertElementPropertyToList(roleList, "id");
	}

	/**
	 * 本期项目,只允许每个用户有一个Role. 此处是为了做roleList的代理,方便与页面交互.
	 * 
	 * @return
	 */
	@Transient
	public Role getRole() {
		if (this.roleList.isEmpty())
			return null;
		return this.roleList.get(0);
	}

	public void setRole(Role role) {
		this.roleList.clear();
		this.roleList.add(role);
	}
}