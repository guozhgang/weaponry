Ext.ns("com.cce.record");
ScriptMgr.load( {
	scripts : [ 'javascript/utils/Ext.ux.grid.Search.js' ]
}); // 载入查询插件
// ------------------------------------------------------------------------------
// Module的proxy定义..
// ------------------------------------------------------------------------------
// 企业信息列表
var proxy = new Ext.data.HttpProxy( {
	api : {
		read : 'record/companyInfo!companyInfoList.action',
		create : 'record/companyInfo!createCompanyInfo.action',
		update : 'record/companyInfo!saveCompanyInfo.action',
		destroy : 'record/companyInfo!delete.action'
	}
});
// 证书信息
var company_proxy_badge = new Ext.data.HttpProxy( {
	api : {
		read : 'record/companyBadge!list.action',
		create : 'record/companyBadge!saveCompanyBadge.action',
		update : 'record/companyBadge!saveCompanyBadge.action',
		destroy : 'record/companyBadge!delete.action'
	}
});
// 获取最新企业信息
var proxy_record = new Ext.data.HttpProxy( {
	api : {
		read : 'record/companyInfo!getCompanyInfo.action'
	}
});

// 详细状态
var proxy_detail = new Ext.data.HttpProxy( {
	api : {
		read : 'record/approveRegisterDetail!list.action',
		create : 'record/approveRegisterDetail!save.action',
		destroy : 'record/approveRegisterDetail!delete.action'
	}
});
// 详细信息
var proxy_info = new Ext.data.HttpProxy( {
	api : {
		read : 'record/companyInfo!get.action'
	}
});

// ------------------------------------------------------------------------------
// Module的reader定义..
// ------------------------------------------------------------------------------
var reader = new Ext.data.JsonReader(

{
	root : 'data',
	successProperty : 'success',
	messageProperty : 'message'
}, [ {
	name : 'id',
	mapping : "id"
},
// {name: 'regionFullName',mapping:'company.regionFullName'},
		{
			name : 'nameCN',
			mapping : 'nameCN'
		}, {
			name : 'taxCert ',
			mapping : 'taxCert'
		}, {
			name : 'orgCode',
			mapping : "orgCode"
		}, {
			name : 'legal',
			mapping : 'legal'
		}, {
			name : 'address',
			mapping : 'address'
		}, {
			name : 'bank',
			mapping : 'bank'
		}, {
			name : 'bankAccount',
			mapping : 'bankAccount'
		}, {
			name : 'certDept',
			mapping : 'certDept'
		}, {
			name : 'companyType',
			mapping : 'companyType'
		}, {
			name : 'createBy',
			mapping : 'createBy'
		}, {
			name : 'credit',
			mapping : 'credit'
		}, {
			name : 'creditRating',
			mapping : 'creditRating'
		}, {
			name : 'fpNo',
			mapping : 'fpNo'
		}, {
			name : 'fixedButchNo',
			mapping : 'fixedButchNo'
		}, {
			name : 'legalFax',
			mapping : 'legalFax'
		}, {
			name : 'legalMail',
			mapping : 'legalMail'
		}, {
			name : 'legalMobile',
			mapping : 'legalMobile'
		}, {
			name : 'legalTel',
			mapping : 'legalTel'
		}, {
			name : 'level',
			mapping : 'level'
		}, {
			name : 'licenseCertDate',
			mapping : 'licenseCertDate',
			type : 'date',
			dateFormat : 'time'
		}, {
			name : 'licenseCertDept',
			mapping : 'licenseCertDept'
		}, {
			name : 'licenseNo',
			mapping : 'licenseNo'
		}, {
			name : 'nameEN',
			mapping : 'nameEN'
		}, {
			name : 'nature',
			mapping : 'nature'
		}, {
			name : 'organizationInfo',
			mapping : 'organizationInfo'
		}, {
			name : 'parent',
			mapping : 'parent'
		}, {
			name : 'qualityEstablished',
			mapping : 'qualityEstablished'
		}, {
			name : 'qurCert',
			mapping : 'qurCert'
		}, {
			name : 'relaFax',
			mapping : 'relaFax'
		}, {
			name : 'relaMail',
			mapping : 'relaMail'
		}, {
			name : 'relaMobile',
			mapping : 'relaMobile'
		}, {
			name : 'relaName',
			mapping : 'relaName'
		}, {
			name : 'relaTel',
			mapping : 'relaTel'
		}, {
			name : 'simpleName',
			mapping : 'simpleName'
		}, {
			name : 'status',
			mapping : 'status'
		}, {
			name : 'taxCert',
			mapping : 'taxCert'
		}, {
			name : 'updateDate',
			mapping : 'updateDate',
			type : 'date',
			dateFormat : 'time'
		}, {
			name : 'validity',
			mapping : 'validity',
			type : 'date',
			dateFormat : 'time'
		}, {
			name : 'version',
			mapping : 'version'
		}, {
			name : 'zipcode',
			mapping : 'zipcode'
		}, {
			name : 'createDate',
			mapping : 'createDate',
			type : 'date',
			dateFormat : 'time'
		}, {
			name : 'mechanize',
			mapping : 'mechanize'
		}, {
			name : 'butchPerYear',
			mapping : 'butchPerYear',
			type : 'double'
		}, {
			name : 'qualityEstablished',
			mapping : 'qualityEstablished'
		},
		// {name: 'RegistrationNo',mapping:'RegistrationNo'},
		{
			name : 'region',
			mapping : 'region'
		}, {
			name : 'registerNo',
			mapping : 'registerNo'
		}, {
			name : 'saveType',
			mapping : 'saveType'
		} // 提交类型

		// ,
		// {name: 'status',mapping:'status'}//审核状态
		]);

var reader_detail = new Ext.data.JsonReader( {
	root : 'data'
}, [ {
	name : 'id',
	mapping : "id"
}, {
	name : 'createBy',
	mapping : 'createBy'
}, {
	name : 'createDate',
	mapping : 'createDate',
	type : 'date',
	dateFormat : 'time'
}, {
	name : 'role',
	mapping : "role"
}, {
	name : 'type',
	mapping : 'type'
}, {
	name : 'comment',
	mapping : 'comment'
}, {
	name : 'ra_id',
	mapping : 'ra_id'
} ]);
var company_reader_badge = new Ext.data.JsonReader( {
	root : 'data'

}, [ {
	name : 'id',
	mapping : "id"
}, {
	name : 'name',
	mapping : 'name'
}, {
	name : 'type',
	mapping : 'type'
}, {
	name : 'fileId',
	mapping : 'fileId'
}, {
	name : 'createDate',
	mapping : 'createDate',
	type : 'date',
	dateFormat : 'time'
}, {
	name : 'description',
	mapping : 'description'
}, {
	name : 'nameCN',
	mapping : "nameCN"
}

]);

// ------------------------------------------------------------------------------
// Module的writer定义..
// ------------------------------------------------------------------------------
var writer = new Ext.data.JsonWriter( {
	encode : true,
	writeAllFields : false
});

var company_writer_badge = new Ext.data.JsonWriter( {
	encode : true,
	writeAllFields : false
});
var writer_detail = new Ext.data.JsonWriter( {
	encode : true,
	writeAllFields : false
});

var proxy_badge_de = new Ext.data.HttpProxy({
	api: {
		    read : 'record/companyInfo!listBadge.action',
		    create : 'record/companyInfo!saveBadge.action',
		    destroy: 'record/companyInfo!deleteBadge.action'
		 }
});

var reader_badge_de = new Ext.data.JsonReader(
		{root:'data'},
		[ 
		    	{name: 'id',mapping:"id"},
		    	{name: 'bagdname',mapping:'bagdname'},
		    	{name: 'dNumber',mapping:'certNo '}, //证件编号
		    	{name: 'bagdpath',mapping:'bagdpath'},
		    	{name: 'fileId',mapping:'fileId'},
		    	{name: 'createDate',mapping:'createDate',type:'date',dateFormat:'time'}
		    	
		]
);
var columns_badge_de = [
            new Ext.grid.CheckboxSelectionModel(), 
           	{header:'证书名称',dataIndex:'bagdname'},  
           	{header:'创建时间',dataIndex:'createDate',renderer:Ext.util.Format.dateRenderer('Y年m月d日 H时i分s秒'),sortable:true} 
           	
];
var writer_badge_de = new Ext.data.JsonWriter({
	encode: true,
	writeAllFields: false
});


// ------------------------------------------------------------------------------
// Module的columns定义..
// ------------------------------------------------------------------------------
var columns = [
// new Ext.grid.CheckboxSelectionModel(),
		{
			header : '企业名称',
			dataIndex : 'nameCN'
		}, {
			header : '税务登记号',
			dataIndex : 'taxCert'
		}, {
			header : '组织机构代码',
			dataIndex : 'orgCode'
		}, {
			header : '法人代表',
			dataIndex : 'legal'
		}, {
			header : '创建时间',
			dataIndex : 'createDate',
			renderer : Ext.util.Format.dateRenderer('Y年m月d日 H时i分s秒'),
			sortable : true
		}, {
			header : '状态',
			dataIndex : 'status'
		} ];

var columns_detail = [
// new Ext.grid.CheckboxSelectionModel(),
		{
			header : '操作人',
			dataIndex : 'createBy'
		}, {
			header : '角色',
			dataIndex : 'role'
		}, {
			header : '操作',
			dataIndex : 'type'
		}, {
			header : '日期',
			dataIndex : 'createDate',
			renderer : Ext.util.Format.dateRenderer('Y年m月d日 H时i分s秒'),
			sortable : true
		}, {
			header : '备注',
			dataIndex : 'comment'
		} ];

function image(val) {
	if (val && val != "")
		return "<img alt='双击查看大图' width='80' height='80' src='upload/download.action?id="
				+ val + "'>";
	else
		return "";
}

var company_columns_badge = [ new Ext.grid.CheckboxSelectionModel(), {
	header : '编号',
	dataIndex : 'id'
}, {
	header : '证章证件',
	dataIndex : 'name'
},
// {header:'证件类型',dataIndex:'type'},
		{
			header : '创建时间',
			dataIndex : 'createDate',
			renderer : Ext.util.Format.dateRenderer('Y年m月d日 H时i分s秒'),
			sortable : true
		}, {
			header : '说明',
			dataIndex : 'description'
		}, {
			header : '证书查看',
			dataIndex : 'fileId',
			renderer : image
		}

];
// ------------------------------------------------------------------------------
// Module的company主Panel定义..
// ------------------------------------------------------------------------------

com.cce.record.CompanyRecordMain = Ext.extend(Ext.Panel, {
	id : 'company-record-main',
	loadMask : true,
	border : false,
	enableHdMenu : false,
	header : false,
	region : 'center',
	closable : true,
	frame : true,
	layout : "border"
});

// ------------------------------------------------------------------------------
// Module的CompanyRecordGrid定义..
// ------------------------------------------------------------------------------

com.cce.record.CompanyRecordGrid = Ext.extend(Ext.grid.GridPanel, {
	id : 'com.cce.record.CompanyRecordGrid',
	stripeRows : true,
	loadMask : true,
	border : false,
	enableHdMenu : false,
	header : false,
	region : 'center',
	closable : true,
	frame : true,
	columns : columns,
	sm : new Ext.grid.CheckboxSelectionModel(),

	initComponent : function() {

		// typical viewConfig
		this.viewConfig = {
			forceFit : true
		};

		// build toolbars and buttons.
		this.tbar = this.buildTopToolbar();
		this.bbar = this.buildBottomToolbar();

		// super
		com.cce.record.CompanyRecordGrid.superclass.initComponent.call(this);

		this.addEvents('doedit', 'doBadge');
	},

	/**
	 * buildTopToolbar
	 */
	buildTopToolbar : function() {
		return [ {
			text : "新增",
			iconCls : "company_record_add",
			id : 'addBtn_record',
			scope : this,
			handler : this.onAdd
		}, {
			text : "提交",
			iconCls : "company_record_update",
			id : 'subBtn_record',
			scope : this,
			handler : this.onUpdate
		}, {
			text : "修改",
			iconCls : "company_record_edit",
			id : 'edtBtn_record',
			scope : this,
			handler : this.onEdit
		}, {
			text : "企业证书",
			iconCls : "company_record_adds",
			id : 'crtBtn_record',
			scope : this,
			handler : this.onBadge
		},
		// {
				// text:"删除",
				// iconCls:"company_record_delete",
				// scope: this,
				// handler:this.onDelete
				// },
				new Ext.Toolbar.Fill(), ' '

		];
	},

	/**
	 * buildBottomToolbar
	 */
	buildBottomToolbar : function() {
		return new Ext.PagingToolbar( {
			pageSize : 20,
			store : this.store,
			displayInfo : true
		});
	},
	/**
	 * 查询插件载入
	 */
	// plugins: [new Ext.ux.grid.Search({
	//
	// iconCls: false
	//
	// , showSelectAll: false
	//
	// , dateFormat: 'm/d/Y'
	//
	// , position: 'top'
	//
	// , searchText: '搜索'
	//
	// , disableIndexes: ['id','createDate']//不参与查询的列名
	//
	// , minLength: 1
	//
	// })],
	/**
	 * onAdd
	 */
	onAdd : function() {

		this.fireEvent('doedit', this, this.store, null);
	},
	onEdit : function() {
		var record = this.getSelectionModel().getSelected();
		if (!record) {
			return false;
		}
		this.fireEvent('doedit', this, this.store, record);
	},
	onUpdate : function() {

		// 提交数据，只能提交一条
		var selected = this.getSelectionModel().getSelected();
		if (!selected) {
			return false;
		}
		var rows = this.getSelectionModel().getSelections();

		if (rows.length > 1) {
			Ext.Msg.alert('错误', '请选择一条记录提交');
			return false;
		}

		Ext.Ajax.request( {
			url : 'record/companyInfo!submitCompanyInfo.action',
			scope : this,
			params : {
				data : selected.get("id")
			},
			success : function(response) {
				App.setAlert(
						Ext.util.JSON.decode(response.responseText).success,
						Ext.util.JSON.decode(response.responseText).message);
				this.store.load( {
					scope : this,
					params : {
						start : 0,
						limit : 20
					},
					callback : function(records, options, succees) {

						var record = this.getSelectionModel().getSelected();

						if (!record) {
							store_detail.load( {
								params : {
									data : ''
								}
							});
						} else {
							if (record != null) {
								store_detail.load( {
									params : {
										data : record.get("id")
									}
								});
							}

						}

					}

				});

			},
			failure : function(response) {
				App.setAlert(false, "执行失败！");
			}
		});

	},
	/**
	 * onDelete
	 */
	onDelete : function(btn, ev) {
		var selected = this.getSelectionModel().getSelected();
		if (!selected) {
			return false;
		}
		var rows = this.getSelectionModel().getSelections();
		Ext.Msg.confirm('确认删除', '你确定删除该条记录?', function(btn) {
			if (btn == 'yes') {
				for ( var i = 0; i < rows.length; i++) {
					this.store.remove(rows[i]);
				}
				this.store.save();

				this.store.load( {
					scope : this,
					params : {
						start : 0,
						limit : 20
					},
					callback : function(records, options, succees) {

						var record = this.getSelectionModel().getSelected();

						if (!record) {
							store_detail.load( {
								params : {
									data : ''
								}
							});
						} else {
							if (record != null) {
								store_detail.load( {
									params : {
										data : record.get("id")
									}
								});
							}

						}

					}

				});
			}
		});
	},
	onBadge : function(btn, ev) { // 证书管理
		var record = this.getSelectionModel().getSelected();
		if (!record) {
			return false;
		}
		this.fireEvent('doBadge', this, this.store, record);
	}
});

var tpl = new Ext.XTemplate(
		'<tpl for=".">',
            '<div class="thumb-wrap" id="{fileId}">',
		    '<div class="thumb"><img src="upload/download.action?id={fileId}" title="{fileId}"  width="300" height="300"></div>',
		    '<span>{name}</span><span>{description}</span></div>',
 		'</tpl>',
        '<div class="x-clear"></div>'
);

//------------------------------------------------------------------------------
//Module的RecordExpertMore内容Panel定义..
//------------------------------------------------------------------------------

com.cce.record.CompanyBadgeInfo=Ext.extend(Ext.Panel, {
	  id:'CompanyBadgeInfo',
	  loadMask: true,
	  border: false,
	  title:"企业证书",
	  enableHdMenu: false,	 
	  region:'south',
	  closable:true,
	  autoScroll:true,
	  height:260,
	  frame:true,
	  split:true,
	  //html:'暂时没有上传证书信息',
	  initComponent : function() {
		    
		    // super
		    this.items=  new Ext.DataView({
		         id:'images-view',
	           	 tpl: tpl,
	           	 store: this.store,
	           	 overClass:'x-view-over',
	           	 multiSelect: true,
	           	 autoHeight:true,
	           	 itemSelector: 'div.thumb-wrap'
           	 
	        }),
		    com.cce.record.CompanyBadgeInfo.superclass.initComponent.call(this);
	 }
	 
	
});


// ------------------------------------------------------------------------------
// Module的CompanyRecordInfo内容Panel定义..
// ------------------------------------------------------------------------------

com.cce.record.CompanyRecordInfo = Ext.extend(Ext.Panel, {// Ext.grid.GridPanel,
			// {
			id : 'CompanyRecordInfo',
			region : 'south',
			height : 260,
			title : '详细信息',
			split : true,
			closable : true,
			autoScroll : true,
			frame : true,
			bodyStyle : 'padding: 10px; font-family: Arial; font-size: 12px;',
			initComponent : function(store) {
				com.cce.record.CompanyRecordInfo.superclass.initComponent
						.call(this);
			}

		// title : '详细信息',
		// id : 'CompanyRecordInfo',
		// stripeRows : true,
		// loadMask : true,
		// border : false,
		// enableHdMenu : false,
		// header : false,
		// region : 'south',
		// closable : true,
		// height : 260,
		// split : true,
		// columns : columns_detail,
		// frame : true,
		// initComponent : function() {
		// // typical viewConfig
		// this.viewConfig = {
		// forceFit : true
		// };
		// // super
		// com.cce.record.CompanyRecordInfo.superclass.initComponent.call(this);
		// }

		});

// ------------------------------------------------------------------------------
// Module的Message内容Panel定义..
// ------------------------------------------------------------------------------

com.cce.record.CompanyRecordDetail = Ext.extend(Ext.grid.GridPanel, {
	title : "审批历史",
	id : 'CompanyRecordDetail',
	stripeRows : true,
	loadMask : true,
	border : false,
	enableHdMenu : false,
	header : false,
	region : 'south',
	closable : true,
	height : 260,
	split : true,
	columns : columns_detail,
	frame : true,
	initComponent : function() {
		// typical viewConfig
	this.viewConfig = {
		forceFit : true
	};
	// super
	com.cce.record.CompanyRecordDetail.superclass.initComponent.call(this);

}

});
// ------------------------------------------------------------------------------
// Module的CompanyRecordForm定义..
// ------------------------------------------------------------------------------
com.cce.record.CompanyRecordForm = Ext
		.extend(
				Ext.form.FormPanel,
				{
					title : '企业备案',
					modal : true,
					loadMask : true,
					iconCls : 'silk-user',
					labelWidth : 100,
					width : 500,
					height : 1729,
					header : false,
					frame : true,
					region : 'center',
					layout : 'form',
					autoScroll : true,
					store : null,
					// private A pointer to the currently loaded record
					record : null,

					initComponent : function() {

						var nature_store = new Ext.data.SimpleStore( {
							fields : [ 'id', 'code', 'value' ],
							data : DICT_COMPANY_CHARACTER
						});

						this.nature_combo = new Ext.form.ComboBox( {
							store : nature_store,
							id : "nature",
							name : "nature",
							fieldLabel : '企业性质',
							displayField : 'value',
							triggerAction : 'all',
							valueField : 'id',
							mode : 'local',
							anchor : '100%',
							emptyText : '请选择企业性质',
							editable : false,
							allowBlank : false,
							validateOnBlur : false

						});

						var degree_store = new Ext.data.SimpleStore( {
							fields : [ 'id', 'code', 'value' ],
							data : DICT_AUTO_MATION
						});

						this.degree_combo = new Ext.form.ComboBox( {
							store : degree_store,
							id : "mechanize",
							name : "mechanize",
							fieldLabel : '机械化程度',
							displayField : 'value',
							triggerAction : 'all',
							valueField : 'id',
							mode : 'local',
							anchor : '100%',
							emptyText : '请选择机械化程度',
							editable : false,
							allowBlank : false,
							validateOnBlur : false

						});

						// build the form-fields. Always a good idea to defer
						// form-building to a method so that this class can
						// be over-ridden to provide different form-fields
						this.items = this.buildForm();

						// build form-buttons
						this.buttons = this.buildUI();

						// add a create event for convenience in our
						// application-code.
						this.addEvents( {
							/**
							 * @event create Fires when user clicks [create]
							 *        button
							 * @param {FormPanel}
							 *            this
							 * @param {Record}
							 *            values, the Form's record object
							 */
							save : true
						});
						if (this.companyid != null && this.companyid != '') {

						} else {

							this.store
									.load( {
										scope : this,
										callback : function(r, o, s) {
											if (r[0])
												this.record = r[0];
											else
												this.record = new this.store.recordType();
											// this.getForm().loadRecord(this.record);

											// Ext.getCmp('id').setValue(this.record.get('id'));

											if (this.record.get('nameCN') != null
													&& this.record
															.get('nameCN') != "") { // 中文
												Ext.getCmp('nameCN').setValue(
														this.record
																.get('nameCN'));
											}
											if (this.record.get('nameEN') != null
													&& this.record
															.get('nameEN') != "") { // 英文
												Ext.getCmp('nameEN').setValue(
														this.record
																.get('nameEN'));
											}

											Ext.getCmp('simpleName').setValue(
													this.record
															.get('simpleName')); // 简称
											Ext.getCmp('address').setValue(
													this.record.get('address')); // 联系地址
											if (this.record.get('zipcode') != null
													&& this.record
															.get('zipcode') != "")
													Ext.getCmp('zipcode').setValue(
													this.record.get('zipcode')); // 邮编
											Ext
													.getCmp('butchPerYear')
													.setValue(
															this.record
																	.get('butchPerYear')); // 年屠宰规模
											Ext
													.getCmp(
															'qualityEstablished')
													.setValue(
															this.record
																	.get('qualityEstablished')); // 是否有相应加工设备
											if (this.record.get('taxCert') != null&& this.record.get('taxCert') != '') {
												Ext
														.getCmp('taxCert')
														.setValue(
																this.record
																		.get('taxCert')); // 税务登记证号
											}
											Ext.getCmp('bank').setValue(
													this.record.get('bank')); // 开户银行
											Ext
													.getCmp('bankAccount')
													.setValue(
															this.record
																	.get('bankAccount')); // 银行账号
											// Ext.getCmp('creditRating').setValue(this.record.get('creditRating'));

											Ext.getCmp('regionFullName')
													.setValue(_USER_REGION_);
											Ext
													.getCmp('fixedButchNo')
													.setValue(
															this.record
																	.get('fixedButchNo'));
											Ext
													.getCmp('certDept')
													.setValue(
															this.record
																	.get('certDept'));
											if (this.record.get('validity') != null&& this.record.get('validity') != '') 
											Ext
													.getCmp('validity')
													.setValue(
															this.record
																	.get('validity'));
											// Ext.getCmp('RegistrationNo').setValue(this.record.get('RegistrationNo'));
											Ext.getCmp('qurCert').setValue(
													this.record.get('qurCert'));
											Ext
													.getCmp('licenseCertDept')
													.setValue(
															this.record
																	.get('licenseCertDept'));
											Ext
													.getCmp('licenseCertDate')
													.setValue(
															this.record
																	.get('licenseCertDate'));
											if (this.record.get('licenseNo') != null&& this.record.get('licenseNo') != '') 
											Ext.getCmp('licenseNo').setValue(
													this.record
															.get('licenseNo'));

											Ext.getCmp('registerNo').setValue(
													this.record
															.get('registerNo'));

											if (this.record.get('legal') != null
													&& this.record.get('legal') != "") {
												Ext.getCmp('legal').setValue(
														this.record
																.get('legal'));
											}
											if (this.record.get('legalTel') != null
													&& this.record
															.get('legalTel') != "") {
												Ext
														.getCmp('legalTel')
														.setValue(
																this.record
																		.get('legalTel'));
											}
											if (this.record.get('legalMail') != null
													&& this.record
															.get('legalMail') != "") {
												Ext
														.getCmp('legalMail')
														.setValue(
																this.record
																		.get('legalMail'));
											}
											if (this.record.get('legalMobile') != null
													&& this.record
															.get('legalMobile') != "") {
												Ext
														.getCmp('legalMobile')
														.setValue(
																this.record
																		.get('legalMobile'));
											}
											if (this.record.get('legalFax') != null
													&& this.record
															.get('legalFax') != "") {
												Ext
														.getCmp('legalFax')
														.setValue(
																this.record
																		.get('legalFax'));
											}
											if (this.record.get('relaName') != null
													&& this.record
															.get('relaName') != "") {
												Ext
														.getCmp('relaName')
														.setValue(
																this.record
																		.get('relaName'));
											}
											if (this.record.get('relaTel') != null
													&& this.record
															.get('relaTel') != "") {
												Ext
														.getCmp('relaTel')
														.setValue(
																this.record
																		.get('relaTel'));
											}
											if (this.record.get('relaMail') != null
													&& this.record
															.get('relaMail') != "") {
												Ext
														.getCmp('relaMail')
														.setValue(
																this.record
																		.get('relaMail'));
											}
											if (this.record.get('relaMobile') != null
													&& this.record
															.get('relaMobile') != "") {
												Ext
														.getCmp('relaMobile')
														.setValue(
																this.record
																		.get('relaMobile'));
											}
											if (this.record.get('relaFax') != null
													&& this.record
															.get('relaFax') != "") {
												Ext
														.getCmp('relaFax')
														.setValue(
																this.record
																		.get('relaFax'));
											}

											if (this.record.get('orgCode') != null
													&& this.record
															.get('orgCode') != "") {
												Ext
														.getCmp('orgCode')
														.setValue(
																this.record
																		.get('orgCode'));
											}
											if (this.record.get('nature') != null
													&& this.record
															.get('nature') != "") {
												Ext.getCmp('nature').setValue(
														this.record
																.get('nature'));
											}
											if (this.record.get('mechanize') != null
													&& this.record
															.get('mechanize') != "") {
												Ext
														.getCmp('mechanize')
														.setValue(
																this.record
																		.get('mechanize'));
											}

										}
									});
						}
						// super
						com.cce.record.CompanyRecordForm.superclass.initComponent
								.call(this);
					},

					loadRecord : function(rec) {
						if (rec == null)
							this.record = new this.store.recordType();
						else
							this.record = rec;
						this.getForm().loadRecord(this.record);
						Ext.getCmp('regionFullName').setValue(_USER_REGION_);
					},

					/**
					 * buildform
					 * 
					 * @private
					 */
					buildForm : function() {

						return [

						{
							xtype : 'fieldset',
							title : '企业名称',
							layout : 'form',
							collapsible : true,
							maskDisabled : false,
							animCollapse : false,
							checkboxToggle : false,
							width : 480,
							items : [ new Ext.form.Hidden( {
								id : "id",
								name : "id"
							}), {
								xtype : 'textfield',
								fieldLabel : '中文',
								anchor : '100%',
								allowBlank : false,
								validateOnBlur : false,
								id : 'nameCN',
								name : 'nameCN'

							}, {
								xtype : 'textfield',
								fieldLabel : '英文',//<FONT color=red>*</FONT>
								anchor : '100%',
								id : 'nameEN',
								name : 'nameEN',
								regex : /^[a-zA-Z][a-zA-Z0-9_ ]{0,49}$/,
								regexText : '请输入以字母开头允许下划线最多50个字符',
								validateOnBlur : false,
								allowBlank:false
							}, {
								xtype : 'textfield',
								fieldLabel : '简称',
								anchor : '100%',
								id : 'simpleName',
								name : 'simpleName'
							} ]
						}, {
							xtype : 'fieldset',
							title : '单位信息',
							layout : 'form',
							collapsible : true,
							width : 480,
							items : [
							// {
									// xtype: 'textfield',
									// fieldLabel: '审核状态',
									// allowBlank:false,
									// anchor: '100%',
									// id:'status',
									// name:'status',
									// readOnly:true
									// },
									{
										xtype : 'textfield',
										fieldLabel : '单位地址',
										anchor : '100%',
										id : 'address',
										name : 'address',
										allowBlank : false,
										validateOnBlur : false
									}, {
										xtype : 'textfield',
										fieldLabel : '邮编',
										anchor : '100%',
										id : 'zipcode',
										name : 'zipcode',
										allowBlank : false,
										validateOnBlur : false
									}, this.nature_combo, {
										xtype : 'numberfield',
										fieldLabel : '年屠宰规模/万头',
										anchor : '100%',
										id : 'butchPerYear',
										name : 'butchPerYear'

									}, {
										xtype : "checkbox",
										fieldLabel : "是否有相应屠宰加工设备",
										boxLabel : "有",
										checked : true,
										anchor : "100%",
										name : 'qualityEstablished',
										id : 'qualityEstablished',
										value : true
									}, this.degree_combo, {
										xtype : 'textfield',
										fieldLabel : '税务登记证号',
										anchor : '100%',
										id : 'taxCert',
										name : 'taxCert',
										allowBlank : false,
										validateOnBlur : false
									}, {
										xtype : 'textfield',
										fieldLabel : '组织机构代码',
										anchor : '100%',
										id : 'orgCode',
										name : 'orgCode',
										allowBlank : false,
										validateOnBlur : false
									},
									// {
									// xtype: 'textfield',
									// fieldLabel: '证章备案管理',
									// anchor: '100%',
									// id:'version',
									// name:'version'
									// },
									{
										xtype : 'textfield',
										fieldLabel : '开户银行',
										anchor : '100%',
										id : 'bank',
										name : 'bank'
									}, {
										xtype : 'textfield',
										fieldLabel : '银行账号',
										anchor : '100%',
										id : 'bankAccount',
										name : 'bankAccount'
									}, {
										xtype : 'textfield',
										fieldLabel : '屠宰企业备案登记号',
										anchor : '100%',
										id : 'registerNo',
										name : 'registerNo',
										readOnly : true
									}, {
										xtype : 'textfield',
										fieldLabel : '所属区域',
										anchor : '100%',
										id : 'regionFullName',
										name : 'regionFullName',
										readOnly : true
									}

							]
						}, {
							xtype : 'fieldset',
							title : '证书信息',
							layout : 'form',
							collapsible : true,
							width : 480,
							items : [ {
								xtype : 'textfield',
								fieldLabel : '生猪屠宰定点证号',
								anchor : '100%',
								id : 'fixedButchNo',
								name : 'fixedButchNo'
							}, {
								xtype : 'textfield',
								fieldLabel : '发证部门',
								anchor : '100%',
								id : 'certDept',
								name : 'certDept'
							}, {
								xtype : 'datefield',
								fieldLabel : '有效期至',
								anchor : '100%',
								format : 'm/d/Y',
								emptyText : '请选择有效期 ...',
								id : 'validity',
								name : 'validity',
								allowBlank : false,
								validateOnBlur : false
							},
							// {
									// xtype: 'textfield',
									// fieldLabel: '屠宰企业备案登记号',
									// anchor: '100%',
									// id:'RegistrationNo',
									// name:'RegistrationNo',
									// readOnly:true
									// },
									{
										xtype : 'textfield',
										fieldLabel : '卫生检验检疫证号',
										anchor : '100%',
										id : 'qurCert',
										name : 'qurCert'
									}, {
										xtype : 'fieldset',
										title : '营业执照',
										layout : 'form',
										items : [ {
											xtype : 'textfield',
											fieldLabel : '签发机关',
											anchor : '100%',
											id : 'licenseCertDept',
											allowBlank : false,
											name : 'licenseCertDept',
											validateOnBlur : false
										}, {
											xtype : 'datefield',
											fieldLabel : '签发日期',
											anchor : '100%',
											format : 'm/d/Y',
											allowBlank : false,
											emptyText : '请选择签发日期 ...',
											id : 'licenseCertDate',
											name : 'licenseCertDate',
											validateOnBlur : false
										}, {
											xtype : 'textfield',
											fieldLabel : '编号',
											anchor : '100%',
											id : 'licenseNo',
											allowBlank : false,
											name : 'licenseNo',
											validateOnBlur : false
										} ]
									} ]
						}, {
							xtype : 'fieldset',
							title : '企业法人',
							layout : 'form',
							collapsible : true,
							width : 480,
							items : [ {
								xtype : 'textfield',
								fieldLabel : '姓名',
								anchor : '100%',
								id : 'legal',
								name : 'legal',
								allowBlank : false

							}, {
								xtype : 'textfield',
								fieldLabel : '固定电话',
								anchor : '100%',
								id : 'legalTel',
								name : 'legalTel',
								allowBlank : true

							}, {
								xtype : 'textfield',
								fieldLabel : '邮箱',
								anchor : '100%',
								id : 'legalMail',
								name : 'legalMail',
								allowBlank : true
							}, {
								xtype : 'textfield',
								fieldLabel : '手机',
								anchor : '100%',
								id : 'legalMobile',
								name : 'legalMobile',
								allowBlank : true
							}, {
								xtype : 'textfield',
								fieldLabel : '传真',
								anchor : '100%',
								id : 'legalFax',
								name : 'legalFax',
								allowBlank : true
							} ]
						}, {
							xtype : 'fieldset',
							title : '联系人',
							layout : 'form',
							collapsible : true,
							width : 480,
							items : [ {
								xtype : 'textfield',
								fieldLabel : '姓名',
								anchor : '100%',
								id : 'relaName',
								name : 'relaName',
								allowBlank : true

							}, {
								xtype : 'textfield',
								fieldLabel : '固定电话',
								anchor : '100%',
								id : 'relaTel',
								name : 'relaTel',
								allowBlank : true

							}, {
								xtype : 'textfield',
								fieldLabel : '邮箱',
								anchor : '100%',
								id : 'relaMail',
								name : 'relaMail'

							}, {
								xtype : 'textfield',
								fieldLabel : '手机',
								anchor : '100%',
								id : 'relaMobile',
								name : 'relaMobile'

							}, {
								xtype : 'textfield',
								fieldLabel : '传真',
								anchor : '100%',
								id : 'relaFax',
								name : 'relaFax'

							} ]
						}, new Ext.form.Hidden( {
							name : "saveType",
							id : 'saveType',
							hiddenName : 'saveType'
						})

						];
					},

					buildUI : function() {
						return [
								{
									text : "保存",
									scope : this,
									handler : this.onSave
								 },
								{
								 text:"提交",
								 scope: this,
								 handler:this.onSubmit
								},
								{
									text : '取消',
									handler : function(btn, ev) {
										this.fireEvent('afterSave', this, null);
									},
									scope : this
								} ];
					},

					/**
					 * onUpdate
					 */
					onSave : function(btn, ev) {

						if (!this.getForm().isValid()) {
							App.setAlert(false, "表单数据有错误.");
							return false;
						}
						var zipcode = Ext.getCmp('zipcode').getValue();
						var date = Ext.getCmp('validity').getValue();

						var legalTel = Ext.getCmp('legalTel').getValue();
						var legalMail = Ext.getCmp('legalMail').getValue();
						var legalMobile = Ext.getCmp('legalMobile').getValue();
						var legalFax = Ext.getCmp('legalFax').getValue();

						var relaTel = Ext.getCmp('relaTel').getValue();
						var relaMail = Ext.getCmp('relaMail').getValue();
						var relaMobile = Ext.getCmp('relaMobile').getValue();
						var relaFax = Ext.getCmp('relaFax').getValue();
						
						var taxCert = Ext.getCmp("taxCert").getValue();
						var orgCode = Ext.getCmp("orgCode").getValue();

						if (this.isZipcode(zipcode)
								&& this.isDate(date)
								&& this.isPhone(legalTel, 'legalTel')
								&& this.isEmail(legalMail, 'legalMail')
								&& this.isMobilePhone(legalMobile,
										'legalMobile')
								&& this.isPhone(legalFax, 'legalFax')
								&& this.isPhone(relaTel, 'relaTel')
								&& this.isEmail(relaMail, 'relaMail')
								&& this.isMobilePhone(relaMobile, 'relaMobile')
								&& this.isPhone(relaFax, 'relaFax')
								&& this.isTaxCert(taxCert,'taxCert')
								&& this.isOrgCode(orgCode,'orgCode')
								&& this.isTaxCert_OrgCode(taxCert, orgCode, "taxCert")) {

							if (Ext.getCmp('id').getValue() == null
									|| Ext.getCmp('id').getValue() == '') {

								var record = new this.store.recordType(this
										.getForm().getValues());
								record.data.nature = Ext.getCmp('nature')
										.getValue();
								record.data.mechanize = Ext.getCmp('mechanize')
										.getValue();
								record.data.qualityEstablished = Ext.getCmp(
										'qualityEstablished').getValue();
								record.data.licenseCertDate = Ext.getCmp(
										'licenseCertDate').getValue();
								record.data.validity = Ext.getCmp('validity')
										.getValue();
								record.data.butchPerYear = Ext.getCmp(
										'butchPerYear').getValue();
								store.add(record);
								store.save();
								var i = 0;
								store.on('save', function(store, batch, data) {
									i++;
									if (i == 1) {

										store.load( {
											params : {
												start : 0,
												limit : 20
											}
										});
									}

								});
							} else {

								this.getForm().updateRecord(this.record);
								store.save();
								var i = 0;
								store.on('save', function(store, batch, data) {
									i++;
									if (i == 1) {

										store.load( {
											params : {
												start : 0,
												limit : 20
											}
										});
									}

								});
							}
							this.fireEvent('afterSave', this, null);
						}
					},
					onUpdate : function(btn, ev) {
						if (!this.getForm().isValid()) {
							App.setAlert(false, "表单数据有错误.");
							return false;
						}

						if (Ext.getCmp('id').getValue() == null
								|| Ext.getCmp('id').getValue() == '') {
							var record = new this.store.recordType(this
									.getForm().getValues());
							record.data.nature = Ext.getCmp('nature')
									.getValue();
							record.data.mechanize = Ext.getCmp('mechanize')
									.getValue();
							record.data.qualityEstablished = Ext.getCmp(
									'qualityEstablished').getValue();
							record.data.licenseCertDate = Ext.getCmp(
									'licenseCertDate').getValue();
							record.data.validity = Ext.getCmp('validity')
									.getValue();
							record.data.butchPerYear = Ext.getCmp(
									'butchPerYear').getValue();
							store.add(record);
							store.save();
							var i = 0;
							store.on('save', function(store, batch, data) {
								i++;
								if (i == 1) {

									store.load( {
										params : {
											start : 0,
											limit : 20
										}
									});
								}

							});

						} else {

							this.getForm().updateRecord(this.record);
							store.save();
							var i = 0;
							store.on('save', function(store, batch, data) {
								i++;
								if (i == 1) {

									store.load( {
										params : {
											start : 0,
											limit : 20
										}
									});
								}

							});
						}
						var i = 1;
						this.store
								.on(
										'save',
										function(store, data) {

											if (i == 1) {
												Ext.Ajax
														.request( {
															url : 'record/companyInfo!submitCompanyInfo.action',
															scope : this,
															params : {
																data : store.data.id
															},
															success : function(
																	response) {
																App
																		.setAlert(
																				Ext.util.JSON
																						.decode(response.responseText).success,
																				Ext.util.JSON
																						.decode(response.responseText).message);
															},
															failure : function(
																	response) {
																App
																		.setAlert(
																				false,
																				"执行失败！");
															}
														});
											}

											i++;
										}, this);

					},
					onSubmit : function(btn, ev) {
						if (!this.getForm().isValid()) {
							App.setAlert(false, "表单数据有错误.");
							return false;
						}

						if (Ext.getCmp('id').getValue() == null
								|| Ext.getCmp('id').getValue() == '') {
							var record = new this.store.recordType(this
									.getForm().getValues());
							record.data.nature = Ext.getCmp('nature')
									.getValue();
							record.data.mechanize = Ext.getCmp('mechanize')
									.getValue();
							record.data.qualityEstablished = Ext.getCmp(
									'qualityEstablished').getValue();
							record.data.licenseCertDate = Ext.getCmp(
									'licenseCertDate').getValue();
							record.data.validity = Ext.getCmp('validity')
									.getValue();
							record.data.butchPerYear = Ext.getCmp(
									'butchPerYear').getValue();
							store.add(record);
							store.save();
							var i = 0;
							store.on('save', function(store, batch, data) {
								i++;
								if (i == 1) {
									Ext.Ajax.request( {
										url : 'record/companyInfo!submitCompanyInfo.action',
										scope : this,
										params : {
											data : store.getAt(store.getTotalCount()).get('id')
										},
										success : function(
												response) {
//											App
//													.setAlert(
//															Ext.util.JSON
//																	.decode(response.responseText).success,
//															Ext.util.JSON
//																	.decode(response.responseText).message);
										},
										failure : function(
												response) {
											App
													.setAlert(
															false,
															"执行失败！");
										}
									});
									store.load( {
										params : {
											start : 0,
											limit : 20
										}
									});
								}
							});
						}
						this.fireEvent('afterSave', this, null);
					},
					isZipcode : function(s) {

						var regex = /^[1-9]\d{5}$/;
						if (s == '') {
							return true;
						} else {
							if (!regex.exec(s)) {
								Ext.getCmp('zipcode').markInvalid("请输入正确的邮政编码");
								return false;
							} else {
								return true;
							}
						}
					},
					isTaxCert : function(s, text) {
						if (s == '') {
							return false;
						} else {
							if (s.length!=15) {
								Ext.getCmp(text).markInvalid(
										"税务登记证号应为15位");
								return false;
							} else {
								return true;
							}
						}
					},
					isOrgCode : function(s, text) {
						if (s == '') {
							return false;
						} else {
							if (s.length!=9) {
								Ext.getCmp(text).markInvalid(
										"组织机构代码应为9位");
								return false;
							} else {
								return true;
							}
						}
					},
					isTaxCert_OrgCode : function(tax,org,text) {
						if (tax == '') {
							return false;
						}
						else if(org == ''){
								return false;
						}else {
							if (tax.substring(tax.length-9,tax.length)!=org) {
								Ext.getCmp(text).markInvalid(
										"税务登记证号后9位应和组织机构代码相同");
								return false;
							} else {
								return true;
							}
						}
					},
					isDate : function(s) {

						if (s == '') {
							return true;
						} else {
							var date = new Date();

							var date_temp = Ext.getCmp('validity').getValue();

							if (date_temp > date) {
								return true;
							} else {
								Ext.getCmp('validity').markInvalid("请输入正确的日期");
								return false;
							}
						}

					},
					isPhone : function(s, text) {
						var regex = /^(\d{3,4}-)?\d{7,8}/;
						if (s == '') {
							return true;
						} else {
							if (!regex.exec(s)) {
								Ext.getCmp(text).markInvalid(
										"固定电话格式不正确应为0531-12345678");
								return false;
							} else {
								return true;
							}
						}
					},
					isMobilePhone : function(s, text) {
						var regex = /^(13[0-9]|15[0|1|3|6|7|8|9]|18[8|9])\d{8}/;

						if (s == '') {
							return true;
						} else {

							if (!regex.exec(s)) {
								Ext.getCmp(text).markInvalid("手机号码不正确");
								return false;
							} else {
								return true;
							}
						}
					},
					isEmail : function(s, text) {
						var regex = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
						if (s == '') {
							return true;
						} else {
							if (!regex.exec(s)) {
								Ext.getCmp(text).markInvalid("请输入正确的电子邮箱");
								return false;
							} else {
								return true;
							}
						}
					}

				});

var company_store_badge = new Ext.data.Store( {
	id : 'badge_store',
	message : 'message',
	proxy : company_proxy_badge,
	reader : company_reader_badge,
	writer : company_writer_badge, // <-- plug a DataWriter into the store just
	// as you would a Reader
	autoSave : false
});

com.cce.record.RecordBadgeForm = Ext.extend(Ext.form.FormPanel, {

	title : '企业证章证书',
	modal : true,
	iconCls : 'silk-user',
	labelWidth : 75,
	padding : 10,
	header : false,
	frame : true,
	region : 'center',
	layout : "form",
	autoScroll : true,
	// private A pointer to the currently loaded record
	record : null,
	cid : null,
	fileUpload : true,

	initComponent : function() {
		this.items = this.buildForm();

		// build form-buttons
	this.buttons = this.buildUI();

	this.addEvents('onBadge');
	company_store_badge.load( {
		params : {
			data : this.cid
		}
	});

	// super

	com.cce.record.RecordBadgeForm.superclass.initComponent.call(this);

	Ext.getCmp('CompanybadgeGrid').on('rowclick', function(g, index, ev) {
		this.record = g.store.getAt(index);

		Ext.getCmp('name').setValue(this.record.get('name'));
		Ext.getCmp('description').setValue(this.record.get('description'));
		Ext.getCmp('fileId').setValue(this.record.get('fileId'));

	}, this);
},
	buildForm : function() {
		return [

		{
			xtype : 'textfield',
			fieldLabel : '证件名称',
			anchor : '100%',
			id : 'name',
			name : 'name',
			allowBlank : false
		}, {
			xtype : 'textfield',
			fieldLabel : '备注',
			anchor : '100%',
			id : 'description',
			name : 'description'
		}, {
			xtype : 'fileuploadfield',
			id : 'file',
			anchor : '100%',
			name : 'upload',
			allowBlank : false,
			emptyText : '请选择文件',
			fieldLabel : '上传文件',
			buttonText : '浏 览',
			colspan : 2

		}, new Ext.form.Hidden( {
			name : "id",
			id : 'id',
			hiddenName : 'id'
		}), new Ext.form.Hidden( {
			name : "fileId",
			id : 'fileId',
			hiddenName : 'fileId'
		}), {
			xtype : "grid",
			id : 'CompanybadgeGrid',
			title : "证书管理",
			store : company_store_badge,
			sm : new Ext.grid.CheckboxSelectionModel(),
			columns : company_columns_badge,
			frame : true,
			height : 200,
			stripeRows : true,
			loadMask : true,
			border : false,
			enableHdMenu : false

		} ];
	},
	buildUI : function() {
		return [ {
			text : "上传",
			scope : this,
			handler : this.onSave
		}, {
			text : '删除',
			handler : this.onDelete,
			scope : this
		}, {
			text : '关闭',
			handler : function(btn, ev) {
				this.fireEvent('afterSave', this, null);
			},
			scope : this
		} ];
	},
	loadRecord : function(rec) {
		this.record = rec;
		this.getForm().loadRecord(this.record);

	},
	onDelete : function(btn, ev) {

		var theSelect = Ext.getCmp('CompanybadgeGrid').getSelectionModel()
				.getSelected();
		if (!theSelect) {
			return false;
		}

		var rows = Ext.getCmp('CompanybadgeGrid').getSelectionModel()
				.getSelections();

		Ext.Msg.confirm('确认删除', '你确定删除该条记录?', function(btn) {
			if (btn == 'yes') {

				for ( var i = 0; i < rows.length; i++) {

					company_store_badge.remove(rows[i]);
				}

				company_store_badge.save();
				var i = 0;
				company_store_badge.on('save', function(store, batch, data) {
					i++;
					if (i == 1) {
						if (this.record) {
							company_store_badge.load( {
								params : {
									data : this.record.get('id')
								}
							});
						}
					}

				}, this);

			}
		});
	},
	onUploadOk : function(f, o) {
		var thestore = Ext.getCmp('CompanybadgeGrid').store;
		Ext.getCmp('fileId').setValue(o.result.message);
		thestore.add(new thestore.recordType(this.getForm().getValues()));
		thestore.save();
		var i = 0;
		thestore.on('save', function(store, batch, data) {
			i++;
			if (i == 1) {

				thestore.load( {
					params : {
						data : this.cid
					}
				});
			}

		}, this);

	},
	onSave : function(btn, ev) {

		if (!this.getForm().isValid()) {
			App.setAlert(false, "表单数据有错误.");
			return false;
		}

		if (this.isFileOk(Ext.getCmp('file').getValue())) {

			this.getForm().submit( {
				url : 'upload/upload!upload.action',
				waitMsg : '正在上传文件...',
				scope : this,
				success : this.onUploadOk,
				failure : function(f, o) {
					App.setAlert(false, "上传失败." + o.result.message);
					return false;
				}
			});

		} else {
			App.setAlert(false, "请上传正确的文件格式(jpg gif bmp)");
		}
	},
	isFileOk : function(s) {

		var patrn = /[.](jpg|gif|bmp)$/;

		if (s != '') {

			s = s.toLocaleLowerCase(); // 全部转换成小写

	if (!patrn.exec(s)) {
		return false;
	} else {
		return true;
	}
} else {
	return true;
}

}
});

var store = new Ext.data.Store( {
	id : 'store',
	message : 'message',
	proxy : proxy,
	reader : reader,
	writer : writer, // <-- plug a DataWriter into the store just as you
	// would a Reader
	autoSave : false
});

var store_record = new Ext.data.Store( {
	id : 'store_record',
	message : 'message',
	proxy : proxy_record,
	reader : reader,
	writer : writer, // <-- plug a DataWriter into the store just as you
	// would a Reader
	autoSave : false
});

var store_detail = new Ext.data.Store( {
	id : 'store_detail',
	message : 'message',
	proxy : proxy_detail,
	reader : reader_detail,
	writer : writer_detail, // <-- plug a DataWriter into the store just as you
	// would a Reader
	autoSave : false
});

var store_info = new Ext.data.Store( {
	id : 'store_info',
	message : 'message',
	proxy : proxy_info,
	autoSave : false
});

// ------------------------------------------------------------------------------
// Module的定义放在最后,eval(xxx.js)后返回Module的类定义..
// ------------------------------------------------------------------------------
Ext.extend(
				com.cce.Module,
				{
					win : null,
					init : function() {
						this.tabPanel = new Ext.TabPanel( {
							loadMask : true,
							autoScroll : false,
							border : false,
							enableHdMenu : false,
							header : false,
							region : 'south',
							closable : true,
							height : 260,
							split : true,
							activeTab : 0,
							frame : true,
							enableTabScroll : true
						});
						this.grid = new com.cce.record.CompanyRecordGrid( {
							store : store
						});
						this.content = new com.cce.record.CompanyRecordDetail( {
							store : store_detail
						});
						this.badge = new com.cce.record.CompanyBadgeInfo({ store : store_company_badge });
						this.info = new com.cce.record.CompanyRecordInfo( {
							store : store_info
						});
						this.mainPanel = new com.cce.record.CompanyRecordMain();
						store
								.on(
										'load',
										function(Store, records, options) {
											Ext.Ajax
													.request( {
														url : 'record/companyInfo!newBtnEnabled.action',// 1、判断企业备案是否通过；2、判断是否有审批中的记录
														scope : this,
														callback : function(o,
																s, r) {
															if (!Ext.util.JSON
																	.decode(r.responseText).success) {
																Ext
																		.getCmp(
																				'addBtn_record')
																		.setDisabled(
																				true);
																Ext
																		.getCmp(
																				'subBtn_record')
																		.setDisabled(
																				true);
																Ext
																		.getCmp(
																				'edtBtn_record')
																		.setDisabled(
																				true);
																Ext
																		.getCmp(
																				'crtBtn_record')
																		.setDisabled(
																				true);
																CAN_DO_ADD = false;
															} else {
																Ext
																		.getCmp(
																				'addBtn_record')
																		.setDisabled(
																				false);
																var selected = Ext
																		.getCmp(
																				'com.cce.record.CompanyRecordGrid')
																		.getSelectionModel()
																		.getSelected();
																if (!selected) {
																	Ext
																			.getCmp(
																					'subBtn_record')
																			.setDisabled(
																					false);
																}
																CAN_DO_ADD = true;
															}
														}
													});
										});
						this.grid.on('doedit', this.showForm, this);
						this.grid.on('doBadge', this.showBadgeForm, this);
						this.grid
								.on(
										'rowclick',
										function(g, index, ev) {
											this.record = g.store.getAt(index);
											if (this.record.get('status') == '等待审批'
													|| this.record
															.get('status') == '审批中'
													|| this.record
															.get('status') == '审批通过') {
												Ext.getCmp('edtBtn_record')
														.setDisabled(true);
												Ext.getCmp('crtBtn_record')
														.setDisabled(true);
												if (CAN_DO_ADD)
													Ext.getCmp('subBtn_record')
															.setDisabled(true);
											} else {
												Ext.getCmp('edtBtn_record')
														.setDisabled(false);
												Ext.getCmp('crtBtn_record')
														.setDisabled(false);
												if (CAN_DO_ADD)
													Ext.getCmp('subBtn_record')
															.setDisabled(false);
											}
											;
											store_detail.load( {
												params : {
													data : this.record
															.get("id")
												}
											});
											
											// 证章信息
											store_company_badge.load({
													params:{
														data:this.record.get('id')
													},
													scope:this,
													callback:function(records,options,success){
														if(records){
															var count=records.length;
															
															if(count==0)
															{
																try{
																	Ext.getCmp('images-view').update("<br/><br/><div align='center'>暂时没有相关证书信息。</div>");
																}catch(err){
																	
																}
															}
														}
													}
											});
											
											this.badge.doLayout();
											
											// store_info.load( {
											// params : {
											// data : this.record.get("id")
											// }
											// });

											// 企业信息
											var infoPanel = Ext
													.getCmp('CompanyRecordInfo');
											if (null != infoPanel) {

												Ext.Ajax
														.request( {
															url : 'record/companyInfo!get.action',
															scope : this,
															params : {
																data : this.record
																		.get("id")
															},
															callback : function(
																	o, s, r) {
																var companyinfo = Ext.util.JSON
																		.decode(r.responseText).data;

																var validity = ""; // 有效期
																var licenseCertDate = ""; // 签发日期
																var qualityEstablished = "";// 有无
																var mechanizeCN = "";// 机械化程度
																var natureCN = "";// 企业性质
																var butchPerYear = "";// 年屠宰规模
																var creditRating = "";// 信用登记
																var level = "";// 企业分级

																if (companyinfo.validity != null
																		&& companyinfo.validity != "") {

																	validity = Ext.util.Format
																			.date(
																					new Date(
																							companyinfo.validity),
																					'Y年m月d日 ');

																}
																if (companyinfo.licenseCertDate != null
																		&& companyinfo.licenseCertDate != "") {
																	licenseCertDate = Ext.util.Format
																			.date(
																					new Date(
																							companyinfo.licenseCertDate),
																					'Y年m月d日 ');
																}

																if (companyinfo.qualityEstablished) {
																	qualityEstablished = "有";
																} else {
																	qualityEstablished = "无";
																}

																// 判断企业性质
																// if(companyinfo.nature=="0"){
																// nature="国有";
																// }else
																// if(companyinfo.nature=="1"){
																// nature="民营";
																// }else
																// if(companyinfo.nature=="2"){
																// nature="私营";
																// }else
																// if(companyinfo.nature=="3"){
																// nature="合资";
																// }else{
																// nature="未知";
																// }

																if (companyinfo.natureCN != null
																		&& companyinfo.natureCN != '') {
																	natureCN = companyinfo.natureCN;
																}

																// if(companyinfo.mechanize=="0"){
																// mechanize="自动化屠宰";
																// }else
																// if(companyinfo.mechanize=="1"){
																// mechanize="半自动化屠宰";
																// }else
																// if(companyinfo.mechanize=="2"){
																// mechanize="手工屠宰";
																// }

																if (companyinfo.mechanizeCN != null
																		&& companyinfo.mechanizeCN != '') {
																	mechanizeCN = companyinfo.mechanizeCN;
																}

																if (companyinfo.butchPerYear != null
																		&& companyinfo.butchPerYear != '') {
																	butchPerYear = companyinfo.butchPerYear;
																}

																if (companyinfo.creditRating != null
																		&& companyinfo.creditRating != ''
																		&& companyinfo.creditRating != 'null') {
																	creditRating = companyinfo.creditRating;
																}

																if (companyinfo.level != null
																		&& companyinfo.level != ''
																		&& companyinfo.level != 'null') {
																	level = companyinfo.level;
																}

																var ContentHtml = '<table width="519" border="0" cellpadding="1" cellspacing="1" bgcolor="#000000" class=".x-grid3-focus">'
																		+ '<tr>'
																		+ '<td width="112" rowspan="3"  align="center" bgcolor="#FFFFFF" class="company_info_bold" >企业名称:</td>'
																		+ '<td width="45" height="30"  align="center" bgcolor="#FFFFFF" class="company_info_bold" >中文:</td>'
																		+ '<td width="340" bgcolor="#FFFFFF" class="company_info" >'
																		+ companyinfo.nameCN
																		+ '</td>'
																		+ '</tr>'
																		+ '<tr>'
																		+ '<td height="30" align="center" bgcolor="#FFFFFF" class="company_info_bold" >英文:</td>'
																		+ '<td bgcolor="#FFFFFF" class="company_info"  >'
																		+ companyinfo.nameEN
																		+ '</td>'
																		+ '</tr>'
																		+ '<tr>'
																		+ '<td height="30" align="center" bgcolor="#FFFFFF" class="company_info_bold" >简称:</td>'
																		+ '<td bgcolor="#FFFFFF" class="company_info" >'
																		+ companyinfo.simpleName
																		+ '</td>'
																		+ '</tr>'
																		+ '</table>'
																		+ '<br />'
																		+ '<table width="800" border="0" cellpadding="1" cellspacing="1" bgcolor="#000000">'
																		+ '<tr>'
																		+ '<td width="111" height="30" align="center" bgcolor="#FFFFFF" class="company_info_bold" >单位地址</td>'
																		+ '<td colspan="2" bgcolor="#FFFFFF" class="company_info" >'
																		+ companyinfo.address
																		+ '</td>'
																		+ '<td width="110" align="center" bgcolor="#FFFFFF" class="company_info_bold" >邮编</td>'
																		+ '<td width="103" bgcolor="#FFFFFF" class="company_info" >'
																		+ companyinfo.zipcode
																		+ '</td>'
																		+ '<td width="109" bgcolor="#FFFFFF" colspan="3">&nbsp;</td>'
																		+ '</tr>'
																		+ '<tr>'
																		+ '<td height="30" align="center" bgcolor="#FFFFFF" class="company_info_bold" >企业性质</td>'
																		+ '<td colspan="2" bgcolor="#FFFFFF" class="company_info" >'
																		+ natureCN
																		+ '</td>'
																		+ '<td align="center" bgcolor="#FFFFFF" class="company_info_bold" >机械化程度</td>'
																		+ '<td bgcolor="#FFFFFF" class="company_info" >'
																		+ mechanizeCN
																		+ '</td>'
																		+ '<td width="105" align="center" bgcolor="#FFFFFF" class="company_info_bold" >年屠宰规模</td>'
																		+ '<td colspan="2" bgcolor="#FFFFFF"  class="company_info">'
																		+ butchPerYear
																		+ '</td>'
																		+ '</tr>'
																		+ '<tr>'
																		+ '<td height="30" align="center" bgcolor="#FFFFFF" class="company_info_bold" >生猪屠宰定点证号</td>'
																		+ '<td colspan="2" bgcolor="#FFFFFF" class="company_info" >'
																		+ companyinfo.fixedButchNo
																		+ '</td>'
																		+ '<td align="center" bgcolor="#FFFFFF" class="company_info_bold" >发证部门</td>'
																		+ '<td bgcolor="#FFFFFF" class="company_info" >'
																		+ companyinfo.certDept
																		+ '</td>'
																		+ '<td width="105" align="center" bgcolor="#FFFFFF" class="company_info_bold" >有效期</td>'
																		+ '<td colspan="2" bgcolor="#FFFFFF"  class="company_info">'
																		+ validity
																		+ '</td>'
																		+ '</tr>'
																		+ '<tr>'
																		+ '<td height="30" align="center" bgcolor="#FFFFFF" class="company_info_bold" >卫生检验检疫证</td>'
																		+ '<td colspan="2" bgcolor="#FFFFFF" class="company_info" >'
																		+ companyinfo.qurCert
																		+ '</td>'
																		+ '<td colspan="5" align="center" bgcolor="#FFFFFF" >&nbsp;</td>'
																		+ '</tr>'
																		+ '<tr>'
																		+ '<td height="30" rowspan="2" align="center" bgcolor="#FFFFFF" class="company_info_bold" >营业执照:</td>'
																		+ '<td width="97" height="30" align="center" bgcolor="#FFFFFF"  class="company_info_bold" >签发单位</td>'
																		+ '<td width="113" align="left" bgcolor="#FFFFFF" class="company_info" >'
																		+ companyinfo.licenseCertDept
																		+ '</td>'
																		+ '<td colspan="5" align="center" bgcolor="#FFFFFF" >&nbsp;</td>'
																		+ '</tr>'
																		+ '<tr>'
																		+ '<td height="30" align="center" bgcolor="#FFFFFF" class="company_info_bold" >签发日期</td>'
																		+ '<td align="left" bgcolor="#FFFFFF" class="company_info" >'
																		+ licenseCertDate
																		+ '</td>'
																		+ '<td align="center" bgcolor="#FFFFFF" class="company_info_bold" >编号</td>'
																		+ '<td bgcolor="#FFFFFF"  class="company_info" >'
																		+ companyinfo.licenseNo
																		+ '</td>'
																		+ '<td colspan="3" bgcolor="#FFFFFF" >&nbsp;</td>'
																		+ '</tr>'
																		+ '<tr>'
																		+ '<td height="30" align="center" bgcolor="#FFFFFF" class="company_info_bold" >税务登记证号</td>'
																		+ '<td colspan="2" align="left" bgcolor="#FFFFFF" class="company_info" >'
																		+ companyinfo.taxCert
																		+ '</td>'
																		+ '<td colspan="5" bgcolor="#FFFFFF" >&nbsp;</td>'
																		+ '</tr>'
																		+ '<tr>'
																		+ '<td height="30" align="center" bgcolor="#FFFFFF" class="company_info_bold" >组织机构代码证</td>'
																		+ '<td colspan="2" align="left" bgcolor="#FFFFFF" class="company_info" >'
																		+ companyinfo.orgCode
																		+ '</td>'
																		+ '<td colspan="5" bgcolor="#FFFFFF" >&nbsp;</td>'
																		+ '</tr>'
																		+ '<tr>'
																		+ '<td height="30" rowspan="2" align="center" bgcolor="#FFFFFF" class="company_info_bold" >法定代表人</td>'
																		+ '<td rowspan="2" align="left" bgcolor="#FFFFFF" class="company_info" >'
																		+ companyinfo.legal
																		+ '</td>'
																		+ '<td height="30" align="center" bgcolor="#FFFFFF" class="company_info_bold" >固定电话</td>'
																		+ '<td bgcolor="#FFFFFF" class="company_info" >'
																		+ companyinfo.legalTel
																		+ '</td>'
																		+ '<td align="center" bgcolor="#FFFFFF" class="company_info_bold" >邮箱</td>'
																		+ '<td colspan="3" bgcolor="#FFFFFF" class="company_info" >'
																		+ companyinfo.legalMail
																		+ '</td>'
																		+ '</tr>'
																		+ '<tr>'
																		+ '<td height="30" align="center" bgcolor="#FFFFFF" class="company_info_bold" >手机</td>'
																		+ '<td bgcolor="#FFFFFF" class="company_info" >'
																		+ companyinfo.legalMobile
																		+ '</td>'
																		+ '<td align="center" bgcolor="#FFFFFF" class="company_info_bold" >传真</td>'
																		+ '<td  colspan="3" bgcolor="#FFFFFF" class="company_info" >'
																		+ companyinfo.legalFax
																		+ '</td>'
																		+ '</tr>'
																		+ '<tr>'
																		+ '<td height="30" rowspan="2" align="center" bgcolor="#FFFFFF" class="company_info_bold" >单位联系人</td>'
																		+ '<td rowspan="2" align="left" bgcolor="#FFFFFF" class="company_info">'
																		+ companyinfo.relaName
																		+ '</td>'
																		+ '<td height="30" align="center" bgcolor="#FFFFFF" class="company_info_bold" >固定电话</td>'
																		+ '<td bgcolor="#FFFFFF" class="company_info" >'
																		+ companyinfo.relaTel
																		+ '</td>'
																		+ '<td align="center" bgcolor="#FFFFFF" class="company_info_bold" >邮箱</td>'
																		+ '<td colspan="3" bgcolor="#FFFFFF" class="company_info" >'
																		+ companyinfo.relaMail
																		+ '</td>'
																		+ '</tr>'
																		+ '<tr>'
																		+ '<td height="30" align="center" bgcolor="#FFFFFF" class="company_info_bold" >手机</td>'
																		+ '<td bgcolor="#FFFFFF" class="company_info" >'
																		+ companyinfo.relaMobile
																		+ '</td>'
																		+ '<td align="center" bgcolor="#FFFFFF" class="company_info_bold" >传真</td>'
																		+ '<td colspan="3" bgcolor="#FFFFFF" class="company_info" >'
																		+ companyinfo.relaFax
																		+ '</td>'
																		+ '</tr>'
																		+ '<tr>'
																		+ '<td height="30" align="center" bgcolor="#FFFFFF" class="company_info_bold" >是否有相应屠宰加工设备</td>'
																		+ '<td colspan="2" align="left" bgcolor="#FFFFFF" class="company_info" >'
																		+ qualityEstablished
																		+ '</td>'
																		+ '<td bgcolor="#FFFFFF" >&nbsp;</td>'
																		+ '<td colspan="4" bgcolor="#FFFFFF" >&nbsp;</td>'
																		+ '</tr>'
																		+ '<tr>'
																		+ '<td height="30" align="center" bgcolor="#FFFFFF" class="company_info_bold" >开户银行</td>'
																		+ '<td colspan="2" align="left" bgcolor="#FFFFFF" class="company_info" >'
																		+ companyinfo.bank
																		+ '</td>'
																		+ '<td align="center" bgcolor="#FFFFFF"  class="company_info_bold" >银行账号</td>'
																		+ '<td bgcolor="#FFFFFF" class="company_info" >'
																		+ companyinfo.bankAccount
																		+ '</td>'
																		+ '<td colspan="3" bgcolor="#FFFFFF" class="company_info" >&nbsp;</td>'
																		+ '</tr>'
																		+ '<tr>'
																		+ '<td height="30" align="center" bgcolor="#FFFFFF" class="company_info_bold" >信用等级</td>'
																		+ '<td colspan="2" align="left" bgcolor="#FFFFFF"  class="company_info" >'
																		+ creditRating
																		+ '</td>'
																		+ '<td colspan="5" bgcolor="#FFFFFF" class="company_info" >&nbsp;</td>'
																		+ '</tr>'
																		+ '<tr>'
																		+ '<td height="30" align="center" bgcolor="#FFFFFF" class="company_info_bold"  >企业分级</td>'
																		+ '<td colspan="2" align="left" bgcolor="#FFFFFF" class="company_info" >'
																		+ level
																		+ '</td>'
																		+ '<td colspan="5" bgcolor="#FFFFFF" >&nbsp;</td>'
																		+ '</tr>';

																infoPanel.body
																		.update(ContentHtml);
															}
														});
											}

										}, this);

						this.mainPanel.add(this.grid);
						
						this.mainPanel.add(this.tabPanel);
						
						this.tabPanel.add(this.info);

						this.main.add(this.mainPanel);
						this.main.doLayout();
						
						this.tabPanel.add(this.badge);
						this.tabPanel.add(this.content);
						
						store.load( {
							params : {
								start : 0,
								limit : 20
							}
						});
					},

					showForm : function(g, store, record) {
						if (!record) {
							record = new store.recordType();
						}
						var form = new com.cce.record.CompanyRecordForm( {
							store : store_record,
							companyid : record.get('id')
						});

						this.win = new Ext.Window( {
							title : '备案信息',
							closable : true,
							width : 580,
							height : 541,
							constrain : true,
							// border:false,
							plain : true,
							modal : true,
							layout : 'border',
							resizable : true,
							autoScroll : true,
							items : [ form ]
						});

						form.on('save', this.onSave, this);
						form.on('afterSave', this.afterSave, this);

						form.loadRecord(record);

						this.win.show();

					},

					showBadgeForm : function(g, store, record) {

						var form = new com.cce.record.RecordBadgeForm( {
							cid : record.get('id')
						});
						this.win = new Ext.Window( {
							title : '企业证章证书',
							closable : true,
							width : 600,
							height : 400,
							constrain : true,
							// border:false,
							plain : true,
							layout : 'border',
							resizable : true,
							autoScroll : true,
							modal : true,
							items : [ form ]
						});

						form.loadRecord(record);

						form.on('afterSave', this.afterSave, this);

						form.loadRecord(record);

						this.win.show();

						Ext
								.getCmp('CompanybadgeGrid')
								.on(
										'rowdblclick',
										function(g, index, ev) {

											this.record = g.store.getAt(index);

											var win = new Ext.Window( {
												title : '证章证书',
												closable : true,
												width : 600,
												height : 500,
												constrain : true,
												plain : true,
												maximizable : true,
												resizable : true,
												autoScroll : true,
												modal : true
											});

											var html = "<img src='upload/download.action?id="
													+ this.record.get('fileId')
													+ "'>";

											win.show();
											win.update(html);
										});

					},
					showReForm : function(g, store, record) {

					},
					afterSave : function(fp, record) {
						this.win.close();
					},

					onSave : function(fp, record) {
						fp.getForm().updateRecord(record);
						if (record.data.id == null) {
							store.add(record);
						}
						store.save();
						this.win.close();
					}

				});
var store_company_badge = new Ext.data.Store({
    id: 'id',
    message: 'message',
    proxy: proxy_badge_de,
    reader: reader_badge_de,
    writer: writer_badge_de,  // <-- plug a DataWriter into the store just as you would a Reader
    autoSave: false
  });
var CAN_DO_ADD = false;