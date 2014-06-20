Ext.ns("com.cce.companyinno");
ScriptMgr.load({ scripts: ['javascript/utils/FormTableLayout.js']});
//------------------------------------------------------------------------------
//Module的proxy定义..
//------------------------------------------------------------------------------
var proxy = new Ext.data.HttpProxy({
	api: {
		    read : 'companyinno/InnoFinance!findInnoFinance.action'
		   
		}
}); 
var proxy_detail = new Ext.data.HttpProxy({
	api: {
		    read : 'companyinno/InnoFinance!getDetails.action'
		}
});
//------------------------------------------------------------------------------
//Module的reader定义..
//------------------------------------------------------------------------------
var reader = new Ext.data.JsonReader(
	{root:'data'},
	[ 
	   		{name: 'id',mapping:"id"},
 			{name: 'accountName',mapping:"accountName"},// 银行开户名
	    	{name: 'accountNo',mapping:"accountNo"},// 银行帐号
	    	{name: 'amount',mapping:"amount"},
	    	{name: 'bank',mapping:"bank"},
	    	{name: 'createBy',mapping:"createBy"},
			{name: 'beginDate',mapping:'beginDate',type:'date',dateFormat:'time'},// 补贴开始日期
			{name: 'endDate',mapping:'endDate',type:'date',dateFormat:'time'},// 补贴结束日期
			{name: 'receiveDate',mapping:'receiveDate',type:'date',dateFormat:'time'},// 收到补贴日期
			{name: 'createDate',mapping:'createDate',type:'date',dateFormat:'time'},// 申领日期
	    	{name: 'entName',mapping:'entName'},//所属企业	
	    	{name: 'mobile',mapping:"mobile"},
	    	{name: 'name',mapping:"name"},// 申领人姓名
	    	{name: 'partName',mapping:'partName'},//产品名称
	    	{name: 'quantity',mapping:'quantity'}, //折合头数
			{name: 'status',mapping:'status'},
			{name: 'standard',mapping:'standard'},// 补贴标准(NN元/头)
			{name: 'regionFullName',mapping:'regionFullName'},	
	    	{name: 'tel',mapping:"tel"}
	]
);

var reader_detail = new Ext.data.JsonReader(
		{root:'data'},
		[ 
		   	{name: 'id',mapping:"id"},
		   	{name: 'createBy',mapping:'createBy'},
		   	{name: 'role',mapping:'role'},
		   	{name: 'operate',mapping:'operate'},
		   	{name: 'comment',mapping:'comment'},
		   	{name: 'createDate',mapping:'createDate',type:'date',dateFormat:'time'}
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
       {header:'所属企业',dataIndex:'entName'},
       {header:'创建时间',dataIndex:'createDate',renderer:Ext.util.Format.dateRenderer('Y年m月d日 H时i分s秒'),sortable:true},
       {header:'所属区域',dataIndex:'regionFullName'},
       {header:'状态',dataIndex:'status'}
       
];

var columns_detail = [
      {header:'操作人',dataIndex:'createBy'},
      {header:'角色',dataIndex:'role'},
      {header:'操作',dataIndex:'operate'},
      {header:'日期',dataIndex:'createDate',renderer:Ext.util.Format.dateRenderer('Y年m月d日 H时i分s秒'),sortable:true},
      {header:'备注',dataIndex:'comment'}
];

//------------------------------------------------------------------------------
//Module的company主Panel定义..
//------------------------------------------------------------------------------

com.cce.companyinno.OrgCompanyInnoFSearch=Ext.extend(Ext.Panel,{
	id:'companylevel-FSearch-main',
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

com.cce.companyinno.OrgCompanyInnoFSearchMaster = Ext.extend(Ext.grid.GridPanel, {
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
		    
		    
		    
		    // super
		    com.cce.companyinno.OrgCompanyInnoFSearchMaster.superclass.initComponent.call(this);
		    
		    this.addEvents(
		    	'doSearch',
		    	'doAll'
//		    	,'doView'
		    );
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
				}//,
//				{
//						text:"查看",
//						iconCls:"info",
//						scope: this,
//						handler:this.onView
//				}
		       ];
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
//	  ,
//	  onView:function(){
//		  var record = this.getSelectionModel().getSelected();
//	      if (!record) {
//	            return false;
//	      }
//
//	      this.fireEvent('doView', this, this.store, record);
//	  }
		  
	   
});

//------------------------------------------------------------------------------
//Module的OrgCompanyInnoSearchDetail内容Panel定义..
//------------------------------------------------------------------------------

com.cce.companyinno.OrgCompanyInnoFSearchDetail=Ext.extend(Ext.grid.GridPanel ,{
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
		    com.cce.companyinno.OrgCompanyInnoFSearchDetail.superclass.initComponent.call(this);
		    
		}
		
});

com.cce.companyinno.OrgCompanyInnoFSearchForm = Ext.extend(Ext.form.FormPanel, {
	title: '无害化查询',
	modal:true,
	iconCls: 'silk-user',
	labelWidth: 100,
	width: 500,
	height: 1729,
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
			hiddenRegionId : new Ext.form.Hidden({ name:"regionId" }),
			id : 'cce_regionTree',
			title : '所属地区: ',
			anchor : '100%',
			autoScroll : true,
			height : 130,
			header : true,
			rootVisible : false,
			frame : true,
			colspan:2,
			scope: this,
			listeners: {
			    "click": function( node){
			     	this.setTitle('所属地区: ' + node.text);
			     	this.hiddenRegionId.setValue(node.id);
		    	},
		    	"load":function(node){
		    		if(node.id == this.hiddenRegionId.value)
		    			this.getSelectionModel().select(node);
		    	}
		    }
		});
		
		var status_store = new Ext.data.SimpleStore({
            fields: ['id', 'code', 'value'],
            data : DICT_APPROVE_STATUS
        });
		
		this.status_combo = new Ext.form.ComboBox({
	        store: status_store,
	        id:"status",
	        name:"status",
	        fieldLabel:'状态',
	        displayField:'value',
	        triggerAction:'all',
	        valueField:'id',
	        mode: 'local',
	        editable:false,
	        anchor: '100%',
	        colspan:2
		});

//		var type_store = new Ext.data.SimpleStore({
//            fields: ['id', 'code', 'value'],
//            data : DICT_INNO_TYPE
//        });
//		
//		this.type_combo = new Ext.form.ComboBox({
//	        store: type_store,
//	        id:"type",
//	        name:"type",
//	        fieldLabel:'无害化处理类型',
//	        displayField:'value',
//	        triggerAction:'all',
//	        valueField:'id',
//	        mode: 'local',
//	        anchor: '100%',
//	        editable:false,
//	        colspan:2
//		});
		// build the form-fields.  Always a good idea to defer form-building to a method so that this class can
	    // be over-ridden to provide different form-fields
	    this.items = this.buildForm();
	
	    // build form-buttons
	    this.buttons = this.buildUI();
	
	    // add a create event for convenience in our application-code.
	    this.addEvents({
	        /**
	         * @event create
	         * Fires when user clicks [create] button
	         * @param {FormPanel} this
	         * @param {Record} values, the Form's record object
	         */
	        save : true
	    },'doSearchForm');
	
	    // super
	    com.cce.companyinno.OrgCompanyInnoFSearchForm.superclass.initComponent.call(this);
	    
//	    Ext.apply(Ext.form.VTypes, {   
//	        dateRange: function(val, field){   
//	            if(field.dateRange){   
//	                var beginId = field.dateRange.begin;   
//	                this.beginField = Ext.getCmp(beginId);   
//	                var endId = field.dateRange.end;   
//	                this.endField = Ext.getCmp(endId);   
//	                var beginDate = this.beginField.getValue();   
//	                var endDate = this.endField.getValue();   
//	            }   
//	            if(beginDate <= endDate){   
//	                return true;   
//	            }else{   
//	                return false;   
//	            }   
//	        },   
//	        //验证失败信息   
//	        dateRangeText: '开始日期不能大于结束日期'  
//	    }); 
	},
	
  /**
   * buildform
   * @private
   */
  buildForm : function() {	
		var date=new Date();
      return [
				        {
				            xtype: 'textfield',
				            fieldLabel: '企业名称',
						    anchor: '100%',
						    colspan:2,
				            id:'entName',
				            name:'entName'
				        },
				        this.status_combo,
//				        this.type_combo,
				        {
					    	   xtype:"datefield",
					           fieldLabel: '开始日期',
					    	   id:'startdate',
					           name:'startdate',
					           format:'m/d/Y',
							   anchor:"100%",
							    colspan:2,
					           align:'left'//,					         
//							   dateRange: {begin: 'startdate', end: 'enddate' }  
//			                   , vtype: 'dateRange' 
					    },
				        {
					    	   xtype:"datefield",
					           fieldLabel: '结束日期',
					    	   id:'enddate',
					           name:'enddate',
					           format:'m/d/Y',
							   anchor:"100%",
							    colspan:2,
					           align:'left'//,					          
//							   dateRange: {begin: 'startdate', end: 'enddate' }   
//			                  , vtype: 'dateRange'
					    },				        
						this.regionTree,
						this.regionTree.hiddenRegionId
				    ]
  },  
 
  buildUI : function(){
      return [{
			text:"查询",
			scope: this,
			handler:this.search
	  	}, {
	        text: '关闭',
	        handler: function(btn, ev){
	  			this.fireEvent('afterSearch', this, null);
	        },
          scope: this
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
  search : function(){
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

//com.cce.companyinno.OrgCompanyinnoFinanceView=Ext.extend(Ext.form.FormPanel, {
//	title: '补贴申领',
//	modal:true,
//	iconCls: 'silk-user',
//	labelWidth: 100,
//	width: 540,
//	height: 260,
//	padding: 10,
//	header: false,
//	frame: true,
//	region:'center',
//	layout: 'tableform',
//	layoutConfig:{
//		columns:2,
//		columnWidths: [0.5,0.5]
//	},
//	autoScroll: true,
//	record : null,
//	initComponent : function() {
//		
//		
//		 		
//			
//		// build the form-fields.  Always a good idea to defer form-building to a method so that this class can
//	    // be over-ridden to provide different form-fields
//	    this.items = this.buildForm();
//	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
//	    // build form-buttons
//	    this.buttons = this.buildUI();
//	
//	    // add a create event for convenience in our application-code.
//	    this.addEvents(
//	    		'save',
//	    		'afterSave'
//	    );
//	    
//	    // super
//	    com.cce.companyinno.OrgCompanyinnoFinanceView.superclass.initComponent.call(this);
//	    
//	     
//
//	},
//	buildForm : function() {
//		var hiddenId = new Ext.form.Hidden({name:"id"});
//		return [
//				{
//					xtype:'displayfield',
//				    fieldLabel: '姓名',			 
//				    anchor: '100%',					 
//				    id:'name',
//				    name:'name'
//			 
//				},
//				{
//					xtype:'displayfield',
//				    fieldLabel: '联系电话',			 
//				    anchor: '100%',					 
//				    id:'tel',
//				    name:'tel'
//				     
//				},
//				{
//					xtype:'displayfield',
//				    fieldLabel: '手机',				 
//				    anchor: '100%',					 
//				    id:'mobile',
//				    name:'mobile'
//				  
//				},
//				{
//					xtype:'displayfield',
//				    fieldLabel: '开户名',				 
//				    anchor: '100%',					 
//				    id:'accountName',
//				    name:'accountName'
//				   
//				}, 
//				{
//					xtype:'displayfield',
//				    fieldLabel: '开户行',			 
//				    anchor: '100%',					 
//				    id:'bank',
//				    name:'bank'
//				  
//				},
//				{
//					xtype:'displayfield',
//				    fieldLabel: '银行账号',				 
//				    anchor: '100%',					 
//				    id:'accountNo',
//				    name:'accountNo'
//				  
//				},
//				{
//					xtype:'displayfield',
//				    fieldLabel: '申领开始日期',
//					id:'beginDate',				 
//				    name:'beginDate',
//				    format:'m/d/Y',
//					anchor:"100%",
//				    align:'left'
//				   
//				},
//				{
//					xtype:'displayfield',
//				    fieldLabel: '申领结束日期',
//					id:'endDate',				 
//				    name:'endDate',
//				    format:'m/d/Y',
//					anchor:"100%",
//				    align:'left'
//				 
//				},
//				{
//					xtype:'displayfield',
//				    fieldLabel: '补贴头数',			 
//				    anchor: '100%',					 
//				    id:'quantity',
//				    name:'quantity'
//				   
//				},
//				{
//					xtype:'displayfield',
//				    fieldLabel: '补贴标准',					 
//				    anchor: '100%',					 
//				    id:'standard',
//				    name:'standard'
//				 
//				},
//				{
//					xtype:'displayfield',
//				    fieldLabel: '申领金额',			 
//				    anchor: '100%',					 
//				    id:'amount',
//				    name:'amount',
//				    colspan:2
//				   
//				},
//				{
//					xtype:'displayfield',
//				    fieldLabel: '商务部主管意见', 
//				    anchor: '100%',					 
//				    id:'MView',
//				    name:'MView',
//				    colspan:2
//				     
//				},
//				{
//					xtype:'displayfield',
//				    fieldLabel: '财务部主管意见', 
//				    anchor: '100%',					 
//				    id:'FView',
//				    name:'FView',
//				    colspan:2
//				  
//				},
//				hiddenId
//		]
//	},
//	loadRecord : function(rec) {
//	      this.record = rec;	      
//	      this.getForm().loadRecord(this.record);
//	 
//	      Ext.getCmp('beginDate').setValue(this.record.get('beginDate').format('m/d/Y').toString());
//	      Ext.getCmp('endDate').setValue(this.record.get('endDate').format('m/d/Y').toString());
//	      
//	},
//	buildUI : function(){
//	      return [ {
//			          text: '关闭',
//			          handler: function(btn, ev){
//	  					this.fireEvent('afterView', this, null);
//			          },
//	          scope: this
//	      }];
//	}
//	 
//});

var FSearch_store = new Ext.data.Store({
    id: 'id',
    message: 'message',
    proxy: proxy,
    reader: reader,
    writer: writer,  // <-- plug a DataWriter into the store just as you would a Reader
    autoSave: false
});

var Fstore_detail = new Ext.data.Store({
	  id: 'Fstore_detail',
	  message: 'message',
	  proxy: proxy_detail,
	  reader: reader_detail,
	  writer: writer,  // <-- plug a DataWriter into the store just as you would a Reader
	  autoSave: false
});




var fproxy_inno_checked = new Ext.data.HttpProxy({
	api: {
		    read : 'companyinno/InnoFinance!findCheckedInnoList.action'
		}
});

var freader_inno = new Ext.data.JsonReader(
		{root:'data'},
		[ 
		 	{name: 'id',mapping:"id"},
			{name: 'owner2',mapping:'owner'}, //货主
			{name: 'partName2',mapping:'partName'},//产品名称
			{name: 'cause2',mapping:'cause'}, //处理原因
			{name: 'weight2',mapping:'weight'}, //处理数量
			{name: 'quantity2',mapping:'quantity'}, //折合头数
			{name: 'Approach2',mapping:'approachValue'},//处理方式
			{name: 'qcSign2',mapping:'qcSign'},//检验人员
			{name: 'pcSign2',mapping:'pcSign'},//无害化处理人员
			{name: 'status2',mapping:'status'},//状态
			{name: 'financeId2',mapping:'financeId'},//视频文件
			{name: 'recFile2',mapping:'recFile'},//视频文件
			{name: 'createDate2',mapping:'createDate',type:'date',dateFormat:'time'},
			{name: 'beginDate2',mapping:'beginDate',type:'date',dateFormat:'time'},//开始时间
			{name: 'dueDate2',mapping:'dueDate',type:'date',dateFormat:'time'}//结束时间
		]
);

var fwriter_inno = new Ext.data.JsonWriter({
	encode: true,
	writeAllFields: false
});

var fstore_inno_checked = new Ext.data.Store({
    id: 'finno_store',
    message: 'message',
    proxy: fproxy_inno_checked,
    reader: freader_inno,
    writer: fwriter_inno,  // <-- plug a DataWriter into the store just as you would a Reader
    autoSave: false
});

var fcolumns_inno_checked = [
        	{header:'无害化编号',dataIndex:'id'},
            {header:'货主',dataIndex:'owner2'},
            {header:'折合头数',dataIndex:'quantity2'},
            {header:'处理方式',dataIndex:'Approach2'},
           	{header:'视频开始时间',dataIndex:'beginDate2',renderer:Ext.util.Format.dateRenderer('Y年m月d日 H时i分s秒')},  
           	{header:'视频结束时间',dataIndex:'dueDate2',renderer:Ext.util.Format.dateRenderer('Y年m月d日 H时i分s秒')} ,
            {header:'视频文件',dataIndex:'recFile2'}
];

com.cce.companyinno.companyinnoFSearchContentForm=Ext.extend(Ext.form.FormPanel, {
	id:'companyinnoFSearchContentForm',
	title: '补贴申领',
	modal:true,
	labelWidth: 100,
	width: 540,
	height: 260,
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
	fid:null,
	record : null,
	initComponent : function() {
	    this.items = this.buildForm();
	    // super
	    com.cce.companyinno.companyinnoFSearchContentForm.superclass.initComponent.call(this);
	},
	buildForm : function() {
		return [
				{
				    xtype:"displayfield",
				    fieldLabel: '姓名',
					id:'name2',				 
				    name:'name2',
					anchor:"100%",
				    align:'left'
				},
				{
				    xtype:"displayfield",
				    fieldLabel: '开户名',
					id:'accountName2',				 
				    name:'accountName2',
					anchor:"100%",
				    align:'left'
				},{
				    xtype:"displayfield",
				    fieldLabel: '联系电话',
					id:'tel2',				 
				    name:'tel2',
					anchor:"100%",
				    align:'left'
				},
				{
				    xtype:"displayfield",
				    fieldLabel: '手机号',
					id:'mobile2',				 
				    name:'mobile2',
					anchor:"100%",
				    align:'left'
				},{
				    xtype:"displayfield",
				    fieldLabel: '开户行',
					id:'bank2',				 
				    name:'bank2',
					anchor:"100%",
				    align:'left'
				},
				{
				    xtype:"displayfield",
				    fieldLabel: '银行账号',
					id:'accountNo2',				 
				    name:'accountNo2',
					anchor:"100%",
				    align:'left'
				},
				{
				    xtype:"displayfield",
				    fieldLabel: '申领开始日期',
					id:'beginDate2',				 
				    name:'beginDate2',
					anchor:"100%",
				    align:'left'
				},
				{
				    xtype:"displayfield",
				    fieldLabel: '申领结束日期',
					id:'endDate2',				 
				    name:'endDate2',
					anchor:"100%",
				    align:'left'
				},
				{
				    xtype: 'displayfield',
				    fieldLabel: '补贴头数',
				    anchor: '100%',					 
				    id:'quantity2',
				    name:'quantity2'
				},
				{
				    xtype: 'displayfield',
				    fieldLabel: '补贴标准',
				    anchor: '100%',					 
				    id:'standard2',
				    name:'standard2'
				},
				{
				    xtype: 'displayfield',
				    fieldLabel: '申领金额',
				    anchor: '100%',					 
				    id:'amount2',
				    name:'amount2',
				    colspan:2
				}, 
				{
					xtype:"grid",
					id:'innogrid2',
					title:"补贴项",
					store:fstore_inno_checked,
					columns:fcolumns_inno_checked,
					frame:true,
					height: 200,
				    colspan:2,
					stripeRows: true,
					loadMask: true,
					border: false,
					enableHdMenu: false	 
				}
		]
	},
	loadRecord : function(rec) {
	      this.record = rec;	
	      Ext.getCmp("amount2").setValue(this.record.get('amount'));
	      Ext.getCmp("standard2").setValue(this.record.get('standard'));
	      Ext.getCmp("quantity2").setValue(this.record.get('quantity'));
	      Ext.getCmp("accountNo2").setValue(this.record.get('accountNo'));
	      Ext.getCmp("bank2").setValue(this.record.get('bank'));
	      Ext.getCmp("mobile2").setValue(this.record.get('mobile'));
	      Ext.getCmp("tel2").setValue(this.record.get('tel'));
	      Ext.getCmp("beginDate2").setValue(this.record.get('beginDate').format('Y年m月d日 H时i分s秒').toString());
	      Ext.getCmp("endDate2").setValue(this.record.get('endDate').format('Y年m月d日 H时i分s秒').toString());
	      Ext.getCmp("name2").setValue(this.record.get('name'));
	      Ext.getCmp("accountName2").setValue(this.record.get('accountName'));
//	      if(this.record.get('beginDate'))this.record.set('beginDate',this.record.get('beginDate').format('Y年m月d日 H时i分s秒').toString());
//	      if(this.record.get('endDate'))this.record.set('endDate',this.record.get('endDate').format('Y年m月d日 H时i分s秒').toString());
//	      this.getForm().loadRecord(this.record);
	}
});

com.cce.companyinno.OrgCompanyFInnoContentPanel=Ext.extend(Ext.Panel ,{
   id:'OrgCompanyFInnoContentPanel',
   region:'south',
   height:260,
   title:'详细信息',
   split:true,
   autoScroll:true,
   frame:true,
   bodyStyle: 'padding: 10px; font-family: Arial; font-size: 12px;',
	initComponent: function(store){
		this.stroe = store;
		com.cce.companyinno.OrgCompanyFInnoContentPanel.superclass.initComponent.call(this);
	}
});
//------------------------------------------------------------------------------
//Module的定义放在最后,eval(xxx.js)后返回Module的类定义..
//------------------------------------------------------------------------------
Ext.extend(com.cce.Module, {
	win: null,
	init: function(){

		this.tabPanel = new Ext.TabPanel( {
			loadMask: true,
			autoScroll : true,
			border: false,
			enableHdMenu: false,
			header:false,
			region:'south',
			closable:true,
			height:260,
			split:true,
			activeTab : 0,
			frame:true,
			enableTabScroll : true
		});
		this.master = new com.cce.companyinno.OrgCompanyInnoFSearchMaster({ store : FSearch_store });
		this.detail= new com.cce.companyinno.OrgCompanyInnoFSearchDetail({ store : Fstore_detail });
		this.full = new com.cce.companyinno.companyinnoFSearchContentForm();
//		this.full = new com.cce.companyinno.OrgCompanyFInnoContentPanel();
		this.frame= new com.cce.companyinno.OrgCompanyInnoFSearch();	
		FSearch_store.on("beforeload", function(thiz, options) {
	 		thiz.baseParams["data"] = searchParams;
		});
		
		//关联自定义事件
	    //this.relayEvents(this.store, ['destroy', 'save', 'update']);
		
		this.master.on('doSearch', this.showSearchForm, this);
		this.master.on('doAll', this.onAllData, this);	
//		this.master.on('doView', this.showViewForm, this);	
		this.master.on('rowclick', function(g, index, ev){
			this.record =g.store.getAt(index);
			Fstore_detail.load({
    			params : { 
					data:this.record.get("id")
     			}
    		}); 
			fstore_inno_checked.load({
	    		params : { 
					data:this.record.get("id")
	 			}
			}); 
			this.full.loadRecord(this.record);
//			var spbeginDate="";
//			var spdueDate="";
//			var spname="";
//			var spaccountName="";
//			var sptel="";
//			var spmobile="";
//			var spbank="";
//			var spaccountNo="";
//			var spquantity="";
//			var spstandard="";
//			var spamount="";
//			if(this.record.get('beginDate'))spbeginDate=this.record.get('beginDate').format('Y年m月d日 H时i分s秒').toString();
//			if(this.record.get('endDate'))spdueDate=this.record.get('endDate').format('Y年m月d日 H时i分s秒').toString();
//			if(this.record.get('name')) spname=this.record.get('name');
//			if(this.record.get('accountName')) spaccountName=this.record.get('accountName');
//			if(this.record.get('tel')) sptel=this.record.get('tel');
//			if(this.record.get('mobile')) spmobile=this.record.get('mobile');
//			if(this.record.get('bank')) spbank=this.record.get('bank');
//			if(this.record.get('accountNo')) spaccountNo=this.record.get('accountNo');
//			if(this.record.get('quantity')) spquantity=this.record.get('quantity');
//			if(this.record.get('standard')) spstandard=this.record.get('standard');
//			if(this.record.get('amount')) spamount=this.record.get('amount');
//				var html='<table width="600" border="0" cellpadding="1" cellspacing="1" class="datalist">'+
//				  		'<tr>'+
//					      '<td width="83" height="30" align="center" bgcolor="#FFFFFF" class="company_info_bold" >姓名</td>'+
//					      '<td width="176" align="left" bgcolor="#FFFFFF" class="company_info" >'+spname+'</td>'+
//					      '<td width="146" align="center" bgcolor="#FFFFFF" class="company_info_bold" >开户名</td>'+
//					      '<td width="167" align="left" bgcolor="#FFFFFF" class="company_info" >'+spaccountName+'</td>'+
//					    '</tr>'+
//						'<tr>'+
//						  '<td height="30" align="center" bgcolor="#FFFFFF"  class="company_info_bold" >联系电话</td>'+
//						  '<td align="left" bgcolor="#FFFFFF" class="company_info">'+sptel+'</td>'+
//						  '<td align="center" bgcolor="#FFFFFF"  class="company_info_bold" >手机</td>'+
//						  '<td align="left" bgcolor="#FFFFFF" class="company_info" >'+spmobile+'</td>'+
//						'</tr>'+
//						'<tr>'+
//						  '<td height="30" align="center" bgcolor="#FFFFFF" class="company_info_bold" >开户行</td>'+
//						  '<td align="left" bgcolor="#FFFFFF" class="company_info" >'+spbank+'</td>'+
//						  '<td align="center" bgcolor="#FFFFFF"  class="company_info_bold" >银行账号</td>'+
//						  '<td align="left" bgcolor="#FFFFFF" class="company_info" >'+spaccountNo+'</td>'+
//						'</tr>'+
//						'<tr>'+
//						  '<td height="30" align="center" bgcolor="#FFFFFF" class="company_info_bold" >申领开始日期</td>'+
//						  '<td align="left" bgcolor="#FFFFFF" class="company_info" >'+spbeginDate+'</td>'+
//						  '<td align="center" bgcolor="#FFFFFF"  class="company_info_bold" >申领结束日期</td>'+
//						  '<td align="left" bgcolor="#FFFFFF" class="company_info" >'+spdueDate+'</td>'+
//						'</tr>'+
//						'<tr>'+
//						  '<td height="30" align="center" bgcolor="#FFFFFF" class="company_info_bold" >补贴头数</td>'+
//						  '<td align="left" bgcolor="#FFFFFF" class="company_info" >'+spquantity+'</td>'+
//						  '<td align="center" bgcolor="#FFFFFF"  class="company_info_bold" >补贴标准</td>'+
//						  '<td align="left" bgcolor="#FFFFFF" class="company_info" >'+spstandard+'</td>'+
//						'</tr>'+
//						'<tr>'+
//						  '<td height="30" align="center" bgcolor="#FFFFFF" class="company_info_bold" >申领金额</td>'+
//						  '<td align="left" bgcolor="#FFFFFF" class="company_info" colspan="3">'+spamount+'</td>'+
//						'</tr>'+
//						'</table>';
//				Ext.getCmp('OrgCompanyFInnoContentPanel').body.update(html);
		}, this);
		this.frame.add(this.master);
		this.frame.add(this.tabPanel);
		this.tabPanel.add(this.full);	
		this.main.add(this.frame);
		this.main.doLayout();
		this.tabPanel.add(this.detail);
		FSearch_store.load({params:{start:0,limit:20}}); 
	},

	showSearchForm : function(g, store, record){
		if(!record){
	        record = new store.recordType();
		}
		var form = new com.cce.companyinno.OrgCompanyInnoFSearchForm();
		form.on('afterSearch', this.afterSearch, this);
		form.on('doSearchForm',this.onSelect,this);
		this.win = new Ext.Window({
		    title: '无害化查询',
		    closable:true,
		    width:480,
		    height:340,
		    constrain:true,
		    //border:false,
		    plain:true,
		    layout: 'border',
		    resizable:true,
		    autoScroll: true,
		    modal:true,
		    items: [form]
		});
		
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
		form.get('entName').setValue(entname);
		form.get('status').setValue(status);
//		form.get('type').setValue(type);
		
		this.win.show();
	},
	onSelect:function(fp){
		var data = new Array();
 
		
		if(fp.get('startdate').getValue()!=null&&fp.get('startdate').getValue()!=""){
			startdate  = fp.get('startdate').getValue().format('m/d/Y').toString();
			data.push("startdate", startdate);
		}
		if(fp.get('enddate').getValue()!=null&&fp.get('enddate').getValue()!=""){
			enddate = fp.get('enddate').getValue().format('m/d/Y').toString();
			data.push("enddate", enddate);
		}
		 
		
	    region_id = fp.get('cce_regionTree').hiddenRegionId.getValue();
		
		if(region_id!=""){
			data.push('region_id',region_id);
		}
	    entname= fp.get('entName').getValue();
		
		if(entname!=""){
			data.push('entname',entname);
		}		
	 
		
		status = fp.get('status').getValue();
		
		if(status!=""){
			data.push('status',status);
		}
		
//		type=fp.get('type').getValue();
		
		searchParams=Ext.encode({
			'beginDate':startdate,
			'endDate':enddate,
			'regionId':region_id,
			'entname':entname,						 
			'status':status
//			'type':type
		});	 
		
		//查询
		FSearch_store.load({
				params:{
					start:0,
				    limit:20
				}
		 });
			
		 this.win.close();
	},
	onAllData:function(fp){
		searchParams=Ext.encode({
			'beginDate':'',
			'endDate':'',
			'regionId':'',
			'entname':'',						 
			'status':''
//			'type':''
		});
		//查询
		FSearch_store.load({
				params:{
					start:0,
				    limit:20
				}
		 });
	},
//	showViewForm:function(g, store, record){
//		if(!record){
//	        record = new store.recordType();
//		}
//		
//		var form = new com.cce.companyinno.OrgCompanyinnoFinanceView();
//		form.on('afterView', this.afterSearch, this);
//		
//		this.win = new Ext.Window({
//		    title: '无害化处理-补贴申领',
//		    closable:true,
//		    width:590,
//		    height:310,
//		    constrain:true,
//		    //border:false,
//		    plain:true,
//		    layout: 'border',
//		    resizable:true,
//		    autoScroll: true,
//		    modal:true,
//		    items: [form]
//		});
//		form.loadRecord(record);
//		this.win.show();
//			
//	},
	afterSearch:function(fp, record){
		this.win.close();
	}

	 
	
});

var startdate="";
var enddate="";
var region_id="";
var entname="";
var status="";
var type="";
var searchParams=Ext.encode({
	'beginDate':'',
	'endDate':'',
	'regionId':'',
	'entname':'',						 
	'status':''
//	'type':''
});