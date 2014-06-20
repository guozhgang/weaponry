Ext.ns("com.cce.companyinfo");


//载入布局文件
ScriptMgr.load({ scripts: ['javascript/utils/FormTableLayout.js']});

//------------------------------------------------------------------------------
//Module的proxy定义..
//------------------------------------------------------------------------------
var proxy = new Ext.data.HttpProxy({
	api: {
		    read : 'record/approval4Register!search.action',
		    create : 'record/approval4Register!save.action',
		    destroy: 'record/approval4Register!delete.action'
		}
});

var proxy_badge_de = new Ext.data.HttpProxy({
	api: {
		    read : 'record/companyInfo!listBadge.action'
		    
		}
});

//详细信息
var proxy_info = new Ext.data.HttpProxy( {
	api : {
		read : 'record/companyInfo!get.action'
	}
});

var reader_badge_de = new Ext.data.JsonReader(
		{root:'data'},
		[ 
		    	{name: 'id',mapping:"id"},
		    	{name: 'bagdname',mapping:'tname'},
//		    	{name: 'bagdpath',mapping:'bagdpath'},
		    	{name: 'fileId',mapping:'fileId'},
		    	{name: 'createDate',mapping:'createDate',type:'date',dateFormat:'time'}
		    	
		]
);


var proxy_detail  = new Ext.data.HttpProxy({
	api: {
		    read : 'record/approveRegisterDetail!list.action',
		    create : 'record/approveRegisterDetail!save.action',
		    destroy: 'record/approveRegisterDetail!delete.action'
		}
});

//------------------------------------------------------------------------------
//Module的reader定义..
//------------------------------------------------------------------------------
var reader = new Ext.data.JsonReader(
{root:'data'},
[ 
  	{name: 'id',mapping:"id"},
  	{name: 'companyInfo_nameCN',mapping:'name'},//mapping:'companyInfo.nameCN'},
//  	{name: 'companyInfo_Id',mapping:'companyInfo.id'},
	{name: 'companyInfo_taxCert',mapping:'taxCert'},//,mapping:'companyInfo.taxCert'},
	{name: 'companyInfo_orgCode',mapping:'orgCode'},//mapping:'companyInfo.orgCode'},
  	{name: 'createDate',mapping:"createDate",type:'date',dateFormat:'time'},
  	{name: 'companyInfo_status',mapping:'status'},//,mapping:'companyInfo.status'},
  	{name: 'updateDate',mapping:'updateDate',type:'date',dateFormat:'time'},
//  	{name: 'cstatus',mapping:'cstatus'},
//  	{name: 'region_id',mapping:'region_id'},
//  	{name: 'nameCN',mapping:'nameCN'},
//  	{name: 'startdate',mapping:'startdate'},
//  	{name: 'enddate',mapping:'enddate'}
]
);

var reader_detail = new Ext.data.JsonReader(
{root:'data'},
[ 
		{name: 'id',mapping:"id"},
		{name: 'createBy',mapping:'createBy'},
		{name: 'createDate',mapping:'createDate',type:'date',dateFormat:'time'},
		{name: 'role',mapping:"role"},
		{name: 'type',mapping:'type'},
		{name: 'comment',mapping:'comment'},
		{name: 'ra_id',mapping:'ra_id'}
]
);
//------------------------------------------------------------------------------
//Module的writer定义..
//------------------------------------------------------------------------------
var writer = new Ext.data.JsonWriter({
	encode: true,
	writeAllFields: false
});

//------------------------------------------------------------------------------
//Module的columns定义..
//------------------------------------------------------------------------------
var columns = [
               new Ext.grid.CheckboxSelectionModel(), 
               {header:'企业名',dataIndex:'companyInfo_nameCN'},
               {header:'税务登记号',dataIndex:'companyInfo_taxCert'},
               {header:'组织机构代码',dataIndex:'companyInfo_orgCode'},
               {header:'创建日期',dataIndex:'createDate',renderer:Ext.util.Format.dateRenderer('Y年m月d日 H时i分s秒'), sortable:true},
               {header:'状态',dataIndex:'companyInfo_status'}
//               {header:'状态',dataIndex:'companyInfo_status',renderer:function(value){if(value=='1') {return "已提交";} else if(value=='2'){return "通过";}else if(value=='3'){return "未通过"}else if(value=='4'){return "已删除"}}}
           ];

var columns_detail = [ 
     {header:'操作人',dataIndex:'createBy'},
     {header:'角色',dataIndex:'role'},
     {header:'操作',dataIndex:'type'},
     {header:'日期',dataIndex:'createDate',renderer:Ext.util.Format.dateRenderer('Y年m月d日 H时i分s秒'), sortable:true},
     {header:'备注',dataIndex:'comment'}
];

//------------------------------------------------------------------------------
//Module的company主Panel定义..
//------------------------------------------------------------------------------

com.cce.companyinfo.OrgCompanyInfoSearch=Ext.extend(Ext.Panel,{
	id:'companylevel-input-main',
	loadMask: true,
	border: false,
	enableHdMenu: false,
	header:false,
	region:'center',
	closable:true,
	layout:"border",
	frame:true
});


//------------------------------------------------------------------------------
//Module的CompanyRecordGrid定义..
//------------------------------------------------------------------------------

com.cce.companyinfo.OrgCompanyInfoSearchMaster = Ext.extend(Ext.grid.GridPanel, {
	  stripeRows: true,
	  loadMask: true,
	  border: false,
	  enableHdMenu: false,
	  header:false,
	  region:'center',
	  closable:true,
	  columns:columns,
	  sm : new Ext.grid.CheckboxSelectionModel(),
	  frame:true,
	  initComponent : function() {
		    // typical viewConfig
		    this.viewConfig = {
		        forceFit: true
		    };
		
		    // build toolbars and buttons.
		    this.tbar = this.buildTopToolbar();
		    this.bbar = this.buildBottomToolbar();	    
		    
		    this.addEvents(
			    	'doSearch',
			    	'doAll' 
		    );
		    
		    // super
		    com.cce.companyinfo.OrgCompanyInfoSearchMaster.superclass.initComponent.call(this);
 
		},
		
		 /**
	   * buildTopToolbar
	   */
	  buildTopToolbar : function() {
		return [
		{
				text:"查询全部",
				iconCls:"select",
				scope: this,
				handler:this.onAll
		},
    	{
				text:"条件查询",
				iconCls:"selectby",
				scope: this,
				handler:this.onSearch
		}];
	  },
	
	  /**
	   * buildBottomToolbar
	   */
	  buildBottomToolbar : function() {
	  	return new Ext.PagingToolbar({
	          pageSize: 20,
	          store: this.store,
	          displayInfo: true
	      });
	  },
	  onAll:function(){
		  this.fireEvent('doAll', this, this.store, null);
	  },
	  onSearch:function(){
		  this.fireEvent('doSearch', this, this.store, null);
	  }
 
});



com.cce.companyinfo.CompanyBadge=Ext.extend(Ext.Panel, {
	  id:'CompanyBadge',
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
		    
		    com.cce.companyinfo.CompanyBadge.superclass.initComponent.call(this);
		    
	 }
	 
	
});


// ------------------------------------------------------------------------------
// Module的CompanyRecordInfo内容Panel定义..
// ------------------------------------------------------------------------------

com.cce.companyinfo.CompanyRecordInfo = Ext.extend(Ext.Panel, {// Ext.grid.GridPanel,
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
				com.cce.companyinfo.CompanyRecordInfo.superclass.initComponent
						.call(this);
			}
 
		});

//------------------------------------------------------------------------------
//Module的CompanyBadge内容Panel定义..
//------------------------------------------------------------------------------

com.cce.companyinfo.OrgCompanyInfoSearchDetail=Ext.extend(Ext.grid.GridPanel ,{
      title:'审批历史',
	  stripeRows: true,
	  loadMask: true,
	  border: false,
	  enableHdMenu: false,
	  header:false,
	  region:'south',
	  closable:true,
	  height:260,
	  split:true,
	  columns:columns_detail,
	  frame:true,
	  initComponent : function() {
		    // typical viewConfig
		    this.viewConfig = {
		        forceFit: true
		    };
		    // super
		    com.cce.companyinfo.OrgCompanyInfoSearchDetail.superclass.initComponent.call(this);
		    
		}
		
});


//定义查询窗口

com.cce.companyinfo.OrgCompanyInfoSearchForm = Ext.extend(Ext.form.FormPanel, {
	
	title: '查询', 
	iconCls: 'silk-user', 
	labelWidth: 100,
	height: 400,
	padding: 10,
	header: false,
	frame: true,
	region:'center',
	layout: 'tableform',
	layoutConfig:{
			columns:2,
			columnWidths: [0.5,0.5]
	},
	autoScroll: true,
    // private A pointer to the currently loaded record
	record : null,
  
	initComponent : function() {	 
		
		//地区树
		this.regionTree = new Ext.tree.TreePanel({
			root:  new Ext.tree.AsyncTreeNode(),
			loader: new Ext.tree.TreeLoader({
						dataUrl : 'security/region!treelist.action'
				}),
			hiddenRegionId : new Ext.form.Hidden({ id:'region_id',name:"region_id",anchor:"100%" }),
			id : 'cce_regionTree',
			title : '所属地区: ',
			anchor:"100%",
			autoScroll : true,
			height : 150,
			header : true,
			rootVisible : false,
			frame : true,
			scope: this,
			colspan:2,
			listeners: {
			    "click": function( node){
			     	this.setTitle('所属地区: ' + node.text);
			     	this.hiddenRegionId.setValue(node.id);
		    	},
		    	"load":function(node){
		    		//alert(this.getNodeById(this.hiddenRegionId.value));
		    		//	this.getSelectionModel().select();
		    	}
		    }
		});
		 
		var status_store = new Ext.data.SimpleStore({
            fields: ['id', 'code', 'value'],
            data : DICT_APPROVE_STATUS
        });
		
		this.status_combo = new Ext.form.ComboBox({
	        store: status_store,
	        id:"org_status",
	        name:"org_status",
	        fieldLabel:'状态',
	        displayField:'value',
	        triggerAction:'all',
	        valueField:'id',
	        mode: 'local',
	        anchor: '100%',
	        editable:false,
	        colspan:2
		});
		
		// build the form-fields.  Always a good idea to defer form-building to a method so that this class can
	    // be over-ridden to provide different form-fields
	    this.items = this.buildForm();
	
	    // build form-buttons
	    this.buttons = this.buildUI();
	
	    this.addEvents(
		    	'doSearchForm' 
	    );
	
	    // super
	    com.cce.companyinfo.OrgCompanyInfoSearchForm.superclass.initComponent.call(this);
	    
//	    Ext.Ajax.request({ 
//			url : 'record/approval4Register!getRegionId.action',
//			scope: this,
//			async:false,
//			success : function(response) { 
//					var region = Ext.util.JSON.decode(response.responseText);
//					
//					this.getForm().setValues({						 
//						'region_id':region.region_id
//					});
//					
//					
//			}, 
//			failure : function(response) { 
//			   App.setAlert(false,"执行失败！"); 
//		    }
//	    }); 
	    
	    
	    Ext.apply(Ext.form.VTypes, {   
	        dateRange: function(val, field){   
	            if(field.dateRange){   
	                var beginId = field.dateRange.begin;   
	                this.beginField = Ext.getCmp(beginId);   
	                var endId = field.dateRange.end;   
	                this.endField = Ext.getCmp(endId);   
	                var beginDate = this.beginField.getValue();   
	                var endDate = this.endField.getValue();   
	            }   
	            if(beginDate <= endDate){   
	                return true;   
	            }else{   
	                return false;   
	            }   
	        },   
	        //验证失败信息   
	        dateRangeText: '开始日期不能大于结束日期'  
	    }); 
	    
	},
	
	/**
	   * buildform
	   * @private
	   */
	buildForm : function() {
		var date=new Date();
		return [
				{
				    xtype:"datefield",
				    fieldLabel: '开始日期',
					id:'startdate',				 
				    name:'startdate',
				    format:'m/d/Y',
					anchor:"100%",
				    align:'left', 
				    dateRange: {begin: 'startdate', end: 'enddate' },   
                    vtype: 'dateRange' 
				},
				{
					 xtype:"datefield",
				     fieldLabel: '结束日期',
					 id:'enddate',					 
				     name:'enddate',
				     format:'m/d/Y',
					 anchor:"100%",
				     align:'left', 
				     dateRange: {begin: 'startdate', end: 'enddate' },   
	                 vtype: 'dateRange' 
				},
				{
				    xtype: 'textfield',
				    fieldLabel: '企业名称',
				    anchor: '100%',				  
				    id:'entName',
				    name:'entName'
				},
				{
					 xtype: 'textfield',
					 fieldLabel: '定点屠宰证号',
					 anchor: '100%', 
					 id:'fixedButchNo',
					 name:'fixedButchNo'
				},
				this.status_combo,
				{
					 xtype: 'textfield',
				     fieldLabel: '企业备案登记号',
					 anchor: '100%',
					 colspan:2,
					 id:'CompanyNo',
					 name:'CompanyNo'
				},
				this.regionTree,
				this.regionTree.hiddenRegionId
 
		
		
		
	   ]
	  
	},
	buildUI : function(){
	      return [{
					text:"查询",
					scope: this,
					handler:this.onSearch
		  		  }];
	},
	/**
	   * loadRecord
	   * @param {Record} rec
	   */
	loadRecord : function(rec) {
	      this.record = rec;
	      this.getForm().loadRecord(this.record);
	},

	  /**
	   * onUpdate
	   */
	onSearch : function(btn, ev) {
	      if (this.record == null) {
	          return;
	      }
	      if (!this.getForm().isValid()) {
	          App.setAlert(false, "表单数据有错误.");
	          return false;
	      }
	      this.fireEvent('doSearchForm', this, this.record);
	}
	
	
});


com.cce.companyinfo.OrgCompanyCertificateForm=Ext.extend(Ext.form.FormPanel, {
	title: '企业证章证书',
	modal:true,
	iconCls: 'silk-user',
	labelWidth: 75,
	width: 550,
	height: 500,
	padding: 10,
	header: false,
	frame: true,
	region:'center',
	layout:"form",
	autoScroll: true,
    // private A pointer to the currently loaded record
	record : null,
	tid:null,
	
	initComponent : function() {
	
		com.cce.companyinfo.OrgCompanyCertificateForm.superclass.initComponent.call(this);
	    
	},
	buildForm : function() {
		return [
		]
	},
	buildUI : function(){
	},
	loadRecord : function(rec) {
	      this.record = rec;
	      this.getForm().loadRecord(this.record);
	}
});


var tpl = new Ext.XTemplate(
		'<tpl for=".">',
            '<div class="thumb-wrap" id="{fileId}">',
		    '<div class="thumb"><img src="upload/download.action?id={fileId}" title="{bagdname}"  width="140" height="120"></div>',
		    '<span>{bagdname}</span></div>',
        '</tpl>',
        '<div class="x-clear"></div>'
);

//企业证书 panel

com.cce.companyinfo.OrgCompanyBadgePanel=Ext.extend(Ext.Panel, {
	  loadMask: true,
	  border: false,
	  enableHdMenu: false, 
	  closable:true,
	  autoScroll:true, 
	  frame:true,
	  region:'center',
	  initComponent : function() {
		    
		    // super
		    
		    this.items=  new Ext.DataView({
		    	 id:'images-view',
	           	 tpl: tpl,
	           	 store: this.store,
	           	 overClass:'x-view-over',
	           	 multiSelect: true,
	           	 itemSelector: 'div.thumb-wrap'
         	 
	        }),
		    
	        com.cce.companyinfo.OrgCompanyBadgePanel.superclass.initComponent.call(this);
		    
	 }
	 
	
});

var store_info = new Ext.data.Store( {
	id : 'store_info',
	message : 'message',
	proxy : proxy_info,
	autoSave : false
});

//------------------------------------------------------------------------------
//Module的定义放在最后,eval(xxx.js)后返回Module的类定义..
//------------------------------------------------------------------------------
Ext.extend(com.cce.Module, {
	win: null,
	init: function(){
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
		this.store = new Ext.data.Store({
		    id: 'id_company',
		    message: 'message',
		    proxy: proxy,
		    reader: reader,
		    writer: writer,  // <-- plug a DataWriter into the store just as you would a Reader
		    autoSave: false
		});
		this.store.on("beforeload", function(thiz, options) {
	 		thiz.baseParams["data"] = searchParams;
		});
		
		this.store_detail=new Ext.data.Store({
			id:'detail_store',
			proxy:proxy_detail,
			reader:reader_detail,
			writer: writer,
			autoSave: false
		});
		
		this.store_badge = new Ext.data.Store({
		    id: 'id_company_badge',
		    message: 'message',
		    proxy: proxy_badge_de,
		    reader: reader_badge_de,		    
		    autoSave: false
		});
		
		this.badge = new com.cce.companyinfo.CompanyBadge({ store : store_badge_more });
		this.info = new com.cce.companyinfo.CompanyRecordInfo( { store : store_info });
		this.master = new com.cce.companyinfo.OrgCompanyInfoSearchMaster({ store : this.store });
		this.detail= new com.cce.companyinfo.OrgCompanyInfoSearchDetail({ store : this.store_detail });
		this.frame= new com.cce.companyinfo.OrgCompanyInfoSearch();		
		
		
		//关联自定义事件
	    //this.relayEvents(this.store, ['destroy', 'save', 'update']);
		
		this.master.on('doSearch', this.showForm, this);
		this.master.on('doAll', this.onAllData, this); 
		this.master.on('rowclick', function(g, index, ev){
			this.record =g.store.getAt(index);
			
			this.store_detail.load({
				params:{data:this.record.get('id')}
			});
			
			// 证章信息
			store_badge_more.load({
					params:{
						data:this.record.get('id')
					},
					scope:this,
					callback:function(records,options,succees){
						var count=records.length;
														
						if(count==0)
						{
							if(Ext.getCmp('images-view'))
								Ext.getCmp('images-view').update("<br/><br/><div align='center'>暂时没有相关证书信息。</div>");
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
		
		this.frame.add(this.master);
		this.frame.add(this.tabPanel);
		this.tabPanel.add(this.info); // 详细信息
		
  	this.main.add(this.frame);
  	this.main.doLayout();
  	
  	this.tabPanel.add(this.badge); // 证书信息
	this.tabPanel.add(this.detail); // 审批历史
  	
  	this.store.load({params:{start:0,limit:20}}); 
	},

	showForm : function(g, store, record){		
		if(!record){
			record = new store.recordType({
				 
				
	        });
		}
		var form = new com.cce.companyinfo.OrgCompanyInfoSearchForm();
		this.win = new Ext.Window({
		    title: '查询',
		    closable:true,
		    width:550,
		    height:400,
		    constrain:true,		   
		    plain:true,
		    layout: 'border',
		    resizable:true,
		    autoScroll: true,
		    modal:true,
		    items: [form]
		});	
		
		form.on('doSearchForm', this.onSelect, this);
		
 
		form.loadRecord(record);
		
		if(startdate==''){
			//form.get('startdate').setValue(new Date());
		}else{
			form.get('startdate').setValue(startdate);
		}
		if(enddate==''){
			//form.get('enddate').setValue(new Date());
		}else{
			form.get('enddate').setValue(enddate);
		}	
		
		form.get('cce_regionTree').hiddenRegionId.setValue(region_id);
		form.get('entName').setValue(entName);
		form.get('fixedButchNo').setValue(fixedButchNo);
		form.get('CompanyNo').setValue(CompanyNo);
		form.get('org_status').setValue(status);
		
		
		this.win.show();
		
	},

	showReForm : function(g, store, record){
	 

	},
	onSelect : function(fp, record){
		
		 
		fp.getForm().updateRecord(record);
		
		var data = new Array();
		
		
		if(fp.get('startdate').getValue()!=null&&fp.get('startdate').getValue()!=""){
			startdate  = fp.get('startdate').getValue().format('m/d/Y').toString();
			data.push("beginDate", startdate);
		}
		if(fp.get('enddate').getValue()!=null&&fp.get('enddate').getValue()!=""){
			enddate = fp.get('enddate').getValue().format('m/d/Y').toString();
			data.push("endDate", enddate);
		}
		 
		
	    region_id = fp.get('cce_regionTree').hiddenRegionId.getValue();
		
		if(region_id!=""){
			data.push('regionId',region_id);
		}
		
		entName = fp.get('entName').getValue();
		if(entName!=""){
			data.push("entName", entName);
		}
		fixedButchNo = fp.get('fixedButchNo').getValue();
		if(fixedButchNo!=""){
			data.push("fixedButchNo",fixedButchNo);
		}
	    CompanyNo = fp.get('CompanyNo').getValue();
		if(CompanyNo!=""){
			data.push("registerNo",CompanyNo);
		}
		status = fp.get('org_status').getValue();
		if(status!=""){
			data.push("org_status", status);
		}

		searchParams=Ext.encode({
			'beginDate':startdate,
			'endDate':enddate,
			'regionId':region_id,
			'entName':entName,
			'fixedButchNo':fixedButchNo,
			'registerNo':CompanyNo,
			'status':status					
		}),
		
		//查询
		this.store.load({
			params:{ 
				start:0,
			    limit:20
			}
		});
		
		this.win.close();
	},
	onAllData:function(fp, record){
		searchParams=Ext.encode({
			'beginDate':'',
			'endDate':'',
			'regionId':'',
			'entName':'',
			'fixedButchNo':'',
			'registerNo':'',
			'status':''
		});
		
		//查询
		this.store.load({
			params:{ 
				start:0,
			    limit:20
			}
		});
		
	}
	
});

var store_badge_more = new Ext.data.Store({
    id: 'id',
    message: 'message',
    proxy: proxy_badge_de,
    reader: reader_badge_de,
    // writer: writer_badge_de,  // <-- plug a DataWriter into the store just as you would a Reader
    autoSave: false
  });

var startdate='';
var enddate='';
var region_id='';
var entName='';
var fixedButchNo='';
var CompanyNo='';
var status='';
var searchParams=Ext.encode({
	'beginDate':'',
	'endDate':'',
	'regionId':'',
	'entName':'',
	'fixedButchNo':'',
	'registerNo':'',
	'status':''
});