package com.cce.weaponry.web.vo.innocuous;

import java.util.Date;

import com.cce.weaponry.web.vo.BaseVO;

public class InnoSearchReturnVO extends BaseVO {
	private Long id;
	private Long innId;
	private Long financeId;// 财政补贴ID
	private String name;
	private String mobile;
	private String tel;
	private String bank;
	private String standard;
	private String accountName;
	private String recFile;
	private Date dueDate;

	private String entName;

	private String partName;

	private Double weight;

	private String owner;

	private String cause;

	private Integer quantity;

	private String approachValue;
	private Long approachId;

	private String qcSign;
	private Long qcSignId;
	private String pcSign;
	private Long pcSignId;

	private Date createDate;
	private Date beginDate;
	private String amount;
	private String createBy;
	private String accountNo;

	public Long getApproachId() {
		return approachId;
	}

	public void setApproachId(Long approachId) {
		this.approachId = approachId;
	}

	public Long getQcSignId() {
		return qcSignId;
	}

	public void setQcSignId(Long qcSignId) {
		this.qcSignId = qcSignId;
	}

	public Long getPcSignId() {
		return pcSignId;
	}

	public void setPcSignId(Long pcSignId) {
		this.pcSignId = pcSignId;
	}

	public Date getDueDate() {
		return dueDate;
	}

	public void setDueDate(Date dueDate) {
		this.dueDate = dueDate;
	}

	public Double getWeight() {
		return weight;
	}

	public void setWeight(Double weight) {
		this.weight = weight;
	}

	public Date getEndDate() {
		return endDate;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}

	public Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

	public Date getBeginDate() {
		return beginDate;
	}

	public void setBeginDate(Date beginDate) {
		this.beginDate = beginDate;
	}

	public Long getFinanceId() {
		return financeId;
	}

	public void setFinanceId(Long financeId) {
		this.financeId = financeId;
	}


	/**
	 * @return the recFile
	 */
	public String getRecFile() {
		return recFile;
	}

	/**
	 * @param recFile
	 *            the recFile to set
	 */
	public void setRecFile(String recFile) {
		this.recFile = recFile;
	}

	/**
	 * @return the name
	 */
	public String getName() {
		return name;
	}

	/**
	 * @param name
	 *            the name to set
	 */
	public void setName(String name) {
		this.name = name;
	}

	/**
	 * @return the mobile
	 */
	public String getMobile() {
		return mobile;
	}

	/**
	 * @param mobile
	 *            the mobile to set
	 */
	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	/**
	 * @return the tel
	 */
	public String getTel() {
		return tel;
	}

	/**
	 * @param tel
	 *            the tel to set
	 */
	public void setTel(String tel) {
		this.tel = tel;
	}

	/**
	 * @return the bank
	 */
	public String getBank() {
		return bank;
	}

	/**
	 * @param bank
	 *            the bank to set
	 */
	public void setBank(String bank) {
		this.bank = bank;
	}

	/**
	 * @return the standard
	 */
	public String getStandard() {
		return standard;
	}

	/**
	 * @param standard
	 *            the standard to set
	 */
	public void setStandard(String standard) {
		this.standard = standard;
	}

	/**
	 * @return the accountName
	 */
	public String getAccountName() {
		return accountName;
	}

	/**
	 * @param accountName
	 *            the accountName to set
	 */
	public void setAccountName(String accountName) {
		this.accountName = accountName;
	}

	/**
	 * @return the innId
	 */
	public Long getInnId() {
		return innId;
	}

	/**
	 * @param innId
	 *            the innId to set
	 */
	public void setInnId(Long innId) {
		this.innId = innId;
	}

	/**
	 * @return the accountNo
	 */
	public String getAccountNo() {
		return accountNo;
	}

	/**
	 * @param accountNo
	 *            the accountNo to set
	 */
	public void setAccountNo(String accountNo) {
		this.accountNo = accountNo;
	}

	/**
	 * @return the amount
	 */
	public String getAmount() {
		return amount;
	}

	/**
	 * @param amount
	 *            the amount to set
	 */
	public void setAmount(String amount) {
		this.amount = amount;
	}

	/**
	 * @return the createBy
	 */
	public String getCreateBy() {
		return createBy;
	}

	/**
	 * @param createBy
	 *            the createBy to set
	 */
	public void setCreateBy(String createBy) {
		this.createBy = createBy;
	}

	private Date endDate;
	private String status;

	private String regionFullName;

	private String type;

	@Override
	public Long getId() {
		return id;
	}

	@Override
	public void setId(Long id) {
		this.id = id;
	}

	public String getEntName() {
		return entName;
	}

	public void setEntName(String entName) {
		this.entName = entName;
	}

	public String getPartName() {
		return partName;
	}

	public void setPartName(String partName) {
		this.partName = partName;
	}

	public String getOwner() {
		return owner;
	}

	public void setOwner(String owner) {
		this.owner = owner;
	}

	public String getCause() {
		return cause;
	}

	public void setCause(String cause) {
		this.cause = cause;
	}

	public Integer getQuantity() {
		return quantity;
	}

	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}

	public String getApproachValue() {
		return approachValue;
	}

	public void setApproachValue(String approachValue) {
		this.approachValue = approachValue;
	}

	public String getQcSign() {
		return qcSign;
	}

	public void setQcSign(String qcSign) {
		this.qcSign = qcSign;
	}

	public String getPcSign() {
		return pcSign;
	}

	public void setPcSign(String pcSign) {
		this.pcSign = pcSign;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getRegionFullName() {
		return regionFullName;
	}

	public void setRegionFullName(String regionFullName) {
		this.regionFullName = regionFullName;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public InnoSearchReturnVO() {
		super();
		// TODO Auto-generated constructor stub
	}

	public InnoSearchReturnVO(Long id, String entName, String partName, Double weight, String owner, String cause, Integer quantity, String approach,
			String qcSign, String pcSign, Date createDate, String status, String regionFullName, String type) {
		super();
		this.id = id;
		this.entName = entName;
		this.partName = partName;
		this.weight = weight;
		this.owner = owner;
		this.cause = cause;
		this.quantity = quantity;
		this.approachValue = approach;
		this.qcSign = qcSign;
		this.pcSign = pcSign;
		this.createDate = createDate;
		this.status = status;
		this.regionFullName = regionFullName;
		this.type = type;
	}

}
