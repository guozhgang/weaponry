Ext.ns("com.cce.companyinfo");

ScriptMgr.load({ scripts: ['javascript/utils/Ext.ux.grid.Search.js']}); //载入查询插件



//------------------------------------------------------------------------------
//Module的proxy定义..
//------------------------------------------------------------------------------
var proxy = new Ext.data.HttpProxy({
api: {
	    read : 'record/approval4Register!list.action',
	    create : 'record/approval4Register!save.action',
	    destroy: 'record/approval4Register!delete.action'
	}
});

//详细信息
var proxy_info = new Ext.data.HttpProxy( {
	api : {
		read : 'record/companyInfo!get.action'
	}
});

var proxy_badge_de = new Ext.data.HttpProxy({
	api: {
		    read : 'record/companyInfo!listBadgeByAppId.action'
		}
});

var store_info = new Ext.data.Store( {
	id : 'store_info',
	message : 'message',
	proxy : proxy_info,
	autoSave : false
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
		    read : 'record/approveRegisterDetail!listByAppId.action',
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
    	{name: 'companyInfo_nameCN',mapping:'companyInfo.nameCN'},
    	{name: 'companyInfo_id',mapping:'companyInfo.id'},
    	{name: 'companyInfo_taxCert',mapping:'companyInfo.taxCert'},
    	{name: 'companyInfo_orgCode',mapping:'companyInfo.orgCode'},
    	{name: 'region',mapping:'region'},
    	{name: 'createDate',mapping:"createDate",type:'date',dateFormat:'time'},
    	{name: 'companyInfo_status',mapping:'companyInfo.status'},
    	{name: 'updateDate',mapping:'updateDate',type:'date',dateFormat:'time'}
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
    {header:'所属区域',dataIndex:'region'},
    {header:'税务登记号',dataIndex:'companyInfo_taxCert'},
    {header:'组织机构',dataIndex:'companyInfo_orgCode'},
    {header:'创建日期',dataIndex:'createDate',renderer:Ext.util.Format.dateRenderer('Y年m月d日 H时i分s秒'), sortable:true},
    {header:'状态',dataIndex:'companyInfo_status'}
 
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

com.cce.companyinfo.OrgCompanyInfoTask=Ext.extend(Ext.Panel,{
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
//Module的RecordExpertMore内容Panel定义..
//------------------------------------------------------------------------------

com.cce.companyinfo.RecordExpertMore=Ext.extend(Ext.Panel, {
	  id:'RecordExpertMore',
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
		    
		    com.cce.companyinfo.RecordExpertMore.superclass.initComponent.call(this);
		    
	 }
	 
	
});


//------------------------------------------------------------------------------
//Module的CompanyRecordInfo内容Panel定义..
//------------------------------------------------------------------------------

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
//Module的CompanyRecordGrid定义..
//------------------------------------------------------------------------------

com.cce.companyinfo.OrgCompanyInfoTaskMaster = Ext.extend(Ext.grid.GridPanel, {
	  id:'OrgCompanyInfoTaskMaster',
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
		    com.cce.companyinfo.OrgCompanyInfoTaskMaster.superclass.initComponent.call(this);
		    
		    this.addEvents(
		    	'doNetBack',
		    	'doSceenBack',
		    	'doCompanyInfo',
		    	'doReload'
		    );
		},
		
		 /**
	   * buildTopToolbar
	   */
	  buildTopToolbar : function() {
		var toolbar = new Ext.Toolbar();
		var btnArray=[];
		btnArray[0]={
				text:"网上通过",
				iconCls:"net_pass",
				scope: this,
				handler:this.onNetPass
    	};
		btnArray[1]={
				text:"网上退回",
				iconCls:"net_back",
				scope: this,
				handler:this.onNetDeny
		};
		btnArray[2]={
				text:"纸质通过",
				iconCls:"local_pass",
				scope: this,
				handler:this.onSceenPass
		};
		btnArray[3]={
				text:"纸质退回",
				iconCls:"local_back",
				scope: this,
				handler:this.onSceenDeny
		};
		btnArray[4]={
				text:"通过",
				iconCls:"provice_pass",
				scope: this,
				handler:this.onNetPass
    	};
		btnArray[5]={
				text:"退回",
				iconCls:"provice_back",
				scope: this,
				handler:this.onNetDeny
		}; 
		Ext.Ajax.request({
			async:false,
			url : 'security/user!buildTopButtons.action',
			params : 
			{ 
				data:Ext.encode([
						{
							id:0,
   					 		accessor:'县级用户'
			   	    	},
			   	    	{
							id:1,
   					 		accessor:'县级用户'
			   	    	},
			   			{
							id:2,
						 	accessor:'县级用户'
			   			},
			   			{
							id:3,
			   				accessor:'县级用户'
			   			},
			   			{
							id:4,
						 	accessor:'市级用户'
			   			},
			   			{
							id:5,
			   				accessor:'市级用户'
			   			}
		   		])
			},  	
			scope:this,    			 
			success: function(response, opts) {
				var rsp = Ext.util.JSON.decode(response.responseText);
				var arrays = new Array(rsp.length);
				for(var i=0;i<rsp.length;i++)
				{
					toolbar.add(btnArray[rsp[i].id]);
				}
				 
				toolbar.addFill();
			},
			failure : function(response, opts) {
				App.setAlert(false, "服务器通信错误,请重试.");
				return false;
			}
		});
		
		return toolbar;
		 
		
		 
  
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
	  /**
	   *  查询插件载入
	   */
	  plugins: [new Ext.ux.grid.Search({

          		iconCls: false

              , showSelectAll: false

              , dateFormat: 'm/d/Y'

              , position: 'top'

              , searchText: '搜索'

              , disableIndexes: ['id','createDate','updateDate']//不参与查询的列名

               
              
              ,allowBlank: true

      })],
	  onNetPass:function(){
		  
		    var selected = this.getSelectionModel().getSelected();
	        if (!selected) {
	            return false;
	        }
	        var rows=this.getSelectionModel().getSelections();
	        var rowids = [];
	        for(var i=0;i<rows.length;i++)
	        {
	        	rowids.push(rows[i].get("id"));
	        }
	        Ext.Ajax.request({ 
				url : 'record/approval4Register!netPass.action',
				scope: this,
				params : { 
				 data:Ext.encode(rowids)
				}, 
				success : function(response) { 
					
				   var data=Ext.util.JSON.decode(response.responseText);					
				   App.setAlert(data.success,data.message);
				   
 
				   
				   this.store.load({
					   scope: this,
					   params:{start:0,limit:20},
					   callback:function(records,options,succees){
						   var record = this.getSelectionModel().getSelected();
						   
						   if (!record){
							   detail_store.load({params:{data:''}});
					       }
						   else
						   {
							   if(record!=null)
							   {
								   detail_store.load({
							  	         params : { 
							   			 	data:record.get("id")
							   			 }
								   });
							   }
							   
						   }
					   }
				   }); 
				   
				   
				   
				}, 
				failure : function(response) { 
				   App.setAlert(false,"提交失败！"); 
			    }
		   }); 
	        
	       
	  
	  },
	  onNetDeny:function(){

		  var record = this.getSelectionModel().getSelected();
	      if (!record) {
	            return false;
	      }
	    
	      
	      this.fireEvent('doNetBack', this, this.store, record);
	  },
	  onSceenPass:function(){
		  
		    var selected = this.getSelectionModel().getSelected();
	        if (!selected) {
	            return false;
	        }
	        var rows=this.getSelectionModel().getSelections();
	        var rowids = [];
	        for(var i=0;i<rows.length;i++)
	        {
	        	rowids.push(rows[i].get("id"));
	        }
	        Ext.Ajax.request({ 
				url : 'record/approval4Register!sceenPass.action',
				scope: this,
				params : { 
				 data:Ext.encode(rowids)
				}, 
				success : function(response) { 
				   var data=Ext.util.JSON.decode(response.responseText);					
				   App.setAlert(data.success,data.message);
				   this.store.load({
					   scope: this,
					   params:{start:0,limit:20},
					   callback:function(records,options,succees){
						   var record = this.getSelectionModel().getSelected();
						   
						   if (!record){
							   detail_store.load({params:{data:''}});
					       }
						   else
						   {
							   if(record!=null)
							   {
								   detail_store.load({
							  	         params : { 
							   			 	data:record.get("id")
							   			 }
								   });
							   }
							   
						   }
					   }
				   }); 
				}, 
				failure : function(response) { 
				   App.setAlert(false,"提交失败！"); 
			    }
		   }); 
		  
	  },
	  onSceenDeny:function(){
		  var record = this.getSelectionModel().getSelected();
	      if (!record) {
	            return false;
	      }
	      this.fireEvent('doSceenBack', this, this.store, record);
 
	  }  
});

//------------------------------------------------------------------------------
//Module的RecordExpertMore内容Panel定义..
//------------------------------------------------------------------------------

com.cce.companyinfo.OrgCompanyInfoTaskDetail=Ext.extend(Ext.grid.GridPanel ,{
	  id:'OrgCompanyInfoTaskDetail',
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
		    com.cce.companyinfo.OrgCompanyInfoTaskDetail.superclass.initComponent.call(this);
		    
		}
});

//网络退回处理的form


com.cce.companyinfo.CompanyInfoTaskNetBackForm = Ext.extend(Ext.form.FormPanel, {
	
	title: '网络退回原因',
	modal:true,
	iconCls: 'silk-user',
	labelAlign:'top',
	labelWidth: 75,
	width: 450,
	height: 240,
	padding: 10,
	header: false,
	frame: true,
	region:'center',
	layout: 'form',
	autoScroll: true,
    // private A pointer to the currently loaded record
	record : null,
  
	initComponent : function() {	 
		

		// build the form-fields.  Always a good idea to defer form-building to a method so that this class can
	    // be over-ridden to provide different form-fields
	    this.items = this.buildForm();
	
	    // build form-buttons
	    this.buttons = this.buildUI();
	
	    this.addEvents(
	        /**
	         * @event create
	         * Fires when user clicks [create] button
	         * @param {FormPanel} this
	         * @param {Record} values, the Form's record object
	         */
	        'netBack',
	        'doReload'
	    );
	
	    // super
	    com.cce.companyinfo.CompanyInfoTaskNetBackForm.superclass.initComponent.call(this);
	
	},
	
	/**
	   * buildform
	   * @private
	   */
	buildForm : function() {
		
		return [
		        
		        {
		        	xtype:"textarea",
					fieldLabel:"退回原因",
					anchor:"100%",
					labelStyle:"",
					name:'comment',
					id:'comment',
					height:100
		        }
		
		
		
	   ]
	  
	},
	buildUI : function(){
	      return [{
				text:"确认",
				scope: this,
				handler:this.update
		  	}, {
	          text: '重置',
	          handler: function(btn, ev){
	              this.getForm().reset();
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

	  /**
	   * onUpdate
	   */
    update : function(btn, ev) {
	      if (this.record == null) {
	          return;
	      }
	      if (!this.getForm().isValid()) {
	          App.setAlert(false, "表单数据有错误.");
	          return false;
	      }
	      var selected = Ext.getCmp('OrgCompanyInfoTaskMaster').getSelectionModel().getSelected();
	      if (!selected) {
	            return false;
	      }
	      var rows=Ext.getCmp('OrgCompanyInfoTaskMaster').getSelectionModel().getSelections();
	      var rowids = [];
	      for(var i=0;i<rows.length;i++)
	      {
	        	rowids.push(rows[i].get("id"));
	      }
//	      var data={
//	    		  'id':rowids,
//	    		  'comment':Ext.getCmp('comment').getValue()
//	      };
	      Ext.Ajax.request({ 
				url : 'record/approval4Register!netBack.action',
				scope: this,
//				params : { 
//				 data:Ext.encode(data)
//				}, 
				params : { 
				 	data:Ext.encode(rowids),
				 	cause:Ext.getCmp('comment').getValue()
				}, 
				success : function(response) { 
				   var data=Ext.util.JSON.decode(response.responseText);					
				   App.setAlert(data.success,data.message);
	  
				   cinfo_store.load({
					   scope: this,
					   params:{start:0,limit:20},
					   callback:function(records,options,succees){
						   var record = Ext.getCmp('OrgCompanyInfoTaskMaster').getSelectionModel().getSelected();
						   
						   if (!record){
							   detail_store.load({params:{data:''}});
					       }
						   else
						   {
							   if(record!=null)
							   {
								   detail_store.load({
							  	         params : { 
							   			 	data:record.get("id")
							   			 }
								   });
							   }
							   
						   }
					   }
				   }); 
				}, 
				failure : function(response) { 
					var data=Ext.util.JSON.decode(response.responseText);
					App.setAlert(data.success,data.message);
			    }
		   });
	      
	       this.fireEvent('netBack', this, null);
	}
	
	
});

//纸质退回处理的form
 

com.cce.companyinfo.CompanyInfoTaskSceenBackForm = Ext.extend(Ext.form.FormPanel, {
	
	title: '纸质退回原因',
	modal:true,
	iconCls: 'silk-user',
	labelAlign:'top',
	labelWidth: 75,
	width: 450,
	height: 240,
	padding: 10,
	header: false,
	frame: true,
	region:'center',
	layout: 'form',
	autoScroll: true,
    // private A pointer to the currently loaded record
	record : null,
  
	initComponent : function() {	 
		

		// build the form-fields.  Always a good idea to defer form-building to a method so that this class can
	    // be over-ridden to provide different form-fields
	    this.items = this.buildForm();
	
	    // build form-buttons
	    this.buttons = this.buildUI();
	    this.addEvents(
	    		
	    	'sceenBack',
	    	'doReload'
	    );
	
	    // super
	    com.cce.companyinfo.CompanyInfoTaskSceenBackForm.superclass.initComponent.call(this);
	
	},
	
	/**
	   * buildform
	   * @private
	   */
	buildForm : function() {
		
		return [
		        
		        {
		        	xtype:"textarea",
					fieldLabel:"退回原因",
					anchor:"100%",
					labelStyle:"",
					name:'comment',
					id:'comment',
					height:100
		        }
		
		
		
	   ]
	  
	},
	buildUI : function(){
	      return [{
				text:"确认",
				scope: this,
				handler:this.update
		  	}, {
	          text: '重置',
	          handler: function(btn, ev){
	              this.getForm().reset();
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

	  /**
	   * onUpdate
	   */
    update : function(btn, ev) {
	      if (this.record == null) {
	          return;
	      }
	      if (!this.getForm().isValid()) {
	          App.setAlert(false, "表单数据有错误.");
	          return false;
	      }
	      
	      var selected = Ext.getCmp('OrgCompanyInfoTaskMaster').getSelectionModel().getSelected();
	      if (!selected) {
	            return false;
	      }
	      
	      var rows=Ext.getCmp('OrgCompanyInfoTaskMaster').getSelectionModel().getSelections();
	      var rowids = [];
	      for(var i=0;i<rows.length;i++)
	      {
	        	rowids.push(rows[i].get("id"));
	      }
//	      var data={
//	    		  'id':rowids,
//	    		  'comment':Ext.getCmp('comment').getValue()
//	      };
	      Ext.Ajax.request({ 
				url : 'record/approval4Register!sceenBack.action',
				scope: this,
//				params : { 
//				 data:Ext.encode(data)
//				}, 
				params : { 
				 	data:Ext.encode(rowids),
				 	cause:Ext.getCmp('comment').getValue()
				}, 
				success : function(response) { 
				   var data=Ext.util.JSON.decode(response.responseText);
				   App.setAlert(data.success,data.message);
				   cinfo_store.load({
					   scope: this,
					   params:{start:0,limit:20},
					   callback:function(records,options,succees){
						   var record = Ext.getCmp('OrgCompanyInfoTaskMaster').getSelectionModel().getSelected();
						   
						   if (!record){
							   detail_store.load({params:{data:''}});
					       }
						   else
						   {
							   if(record!=null)
							   {
								   detail_store.load({
							  	         params : { 
							   			 	data:record.get("id")
							   			 }
								   });
							   }
							   
						   }
					   }
				   }); 
				   
				}, 
				failure : function(response) { 
					var data=Ext.util.JSON.decode(response.responseText);
					App.setAlert(data.success,data.message); 
			    }
		   });
	      
	       this.fireEvent('sceenBack', this, null);
	}
	
	
});

var cinfo_store = new Ext.data.Store({
    id: 'cinfo_store',
    name:'cinfo_store',
    message: 'message',
    proxy: proxy,
    reader: reader,
    writer: writer,  // <-- plug a DataWriter into the store just as you would a Reader
    autoSave: false
  });

var detail_store=new Ext.data.Store({
	id:'detail_store',
	name:'detail_store',
	proxy:proxy_detail,
	reader:reader_detail,
	writer: writer,
	autoSave: false
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


//------------------------------------------------------------------------------
//Module的定义放在最后,eval(xxx.js)后返回Module的类定义..
//------------------------------------------------------------------------------
Ext.extend(com.cce.Module, {
	win: null,
	netBackwin:null,
	sceenBackwin:null,
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
	
		this.store_badge = new Ext.data.Store({
		    id: 'id_company_badge',
		    message: 'message',
		    proxy: proxy_badge_de,
		    reader: reader_badge_de,		    
		    autoSave: false
		});
	
		this.badge = new com.cce.companyinfo.RecordExpertMore({ store : store_badge_more });
		this.info = new com.cce.companyinfo.CompanyRecordInfo({ store : store_info });
		this.master = new com.cce.companyinfo.OrgCompanyInfoTaskMaster({ store : cinfo_store });
		this.detail= new com.cce.companyinfo.OrgCompanyInfoTaskDetail({ store : detail_store });
		this.frame= new com.cce.companyinfo.OrgCompanyInfoTask();		
		
		
 
		this.master.on('doNetBack', this.showNetBackForm, this);
		this.master.on('doSceenBack', this.showSceenBackForm, this); 
		this.master.on('doReload', this.detailReload, this);
		
        this.master.on('rowclick', function(g, index, ev){
					this.record =g.store.getAt(index);
					
					detail_store.load({
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
									try {
										Ext.getCmp('images-view').update("<br/><br/><div align='center'>暂时没有相关证书信息。</div>");
									} catch (e) {
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
									url : 'record/companyInfo!getByAppId.action',
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
		this.tabPanel.add(this.info); // 企业信息
		
		this.main.add(this.frame);
		this.main.doLayout();
		
		this.tabPanel.add(this.badge); // 证书信息
		this.tabPanel.add(this.detail); // 审批历史
		
		cinfo_store.load({params:{start:0,limit:20}}); 
	},
	showSceenBackForm : function(g, store, record){
		if(!record){
	        record = new store.recordType();
		}
		var form = new com.cce.companyinfo.CompanyInfoTaskSceenBackForm();
		
		
		this.win = new Ext.Window({
		    title: '纸质退回',
		    closable:true,
		    width:450,
		    height:240,
		    constrain:true,		     
		    plain:true,
		    layout: 'border',
		    resizable:true,
		    autoScroll: true,
		    modal:true,
		    items: [form]
		});	
		
		form.on('sceenBack',this.sceenBack,this);
		form.on('doReload',this.detailReload,this);
		
		form.loadRecord(record);		
		
		this.win.show();
	},

	showNetBackForm : function(g, store, record){
		
		if(!record){
	        record = new store.recordType();
		}
		var form = new com.cce.companyinfo.CompanyInfoTaskNetBackForm();
		
		this.win = new Ext.Window({
		    title: '网络退回',
		    closable:true,
		    width:450,
		    height:240,
		    constrain:true,		   
		    plain:true,
		    layout: 'border',
		    resizable:true,
		    autoScroll: true,
		    modal:true,
		    items: [form]
		});	
		
		form.on('netBack',this.netBack,this);
		
		form.on('doReload',this.detailReload,this);
		
		form.loadRecord(record);		
		
		this.win.show();
		
	},
	netBack:function(){
		this.win.close();
	},
	sceenBack:function(){
		this.win.close();
	},
	detailReload:function(g, store, record){
		detail_store.load({params:{start:0,limit:20}});
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