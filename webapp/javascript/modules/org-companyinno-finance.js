Ext.ns("com.cce.companyinno");
ScriptMgr.load({ scripts: ['javascript/utils/SearchField.js']});
ScriptMgr.load({ scripts: ['javascript/utils/FormTableLayout.js']});
ScriptMgr.load({ scripts: ['javascript/utils/Ext.ux.grid.Search.js']}); //载入查询插件

var proxy = new Ext.data.HttpProxy({
	api: {
		    read : 'companyinno/AppFinance!list.action',
		    create : 'companyinno/AppFinance!save.action',
		    destroy: 'companyinno/AppFinance!delete.action'
		}
});
var proxy_detail = new Ext.data.HttpProxy({
	api: {
		    read : 'companyinno/AppFinance!getDetails.action'
		}
});

//------------------------------------------------------------------------------
//Module的reader定义..
//------------------------------------------------------------------------------
var reader = new Ext.data.JsonReader(
	{root:'data'},
	[ 
	 	{name: 'id',mapping:"id"},
	 	{name: 'entName',mapping:'entName'},
		{name: 'name',mapping:'name'}, //申请人资料
		{name: 'tel',mapping:'tel'}, //联系电话
		{name: 'mobile',mapping:'mobile'}, //手机
		{name: 'accountName',mapping:'accountName'},//开户名
		{name: 'bank',mapping:'bank'},//开户行
		{name: 'accountNo',mapping:'accountNo'},//银行账号 
		{name: 'beginDate',mapping:'beginDate',type:'date',dateFormat:'time'},//开始时间
		{name: 'endDate',mapping:'endDate',type:'date',dateFormat:'time'},//开始时间
		{name: 'quantity',mapping:'quantity'},//补贴头数
		{name: 'standard',mapping:'standard'},//补贴标准
		{name: 'amount',mapping:'amount'},//补贴金额
		{name: 'createDate',mapping:'createDate',type:'date',dateFormat:'time'}
	     
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
   {header:'申领人姓名',dataIndex:'name'}, 
   {header:'联系电话',dataIndex:'tel'}, 
   {header:'手机',dataIndex:'mobile'},
   {header:'开户名',dataIndex:'accountName'},
   {header:'开户行',dataIndex:'bank'},
   {header:'补贴头数',dataIndex:'quantity'},
   {header:'补贴标准',dataIndex:'standard'},
   {header:'创建时间',dataIndex:'createDate',renderer:Ext.util.Format.dateRenderer('Y年m月d日 H时i分s秒'),sortable:true}
];
var columns_detail = [
   {header:'操作人',dataIndex:'createBy'},
   {header:'角色',dataIndex:'role'},
   {header:'操作',dataIndex:'operate'},
   {header:'日期',dataIndex:'createDate',renderer:Ext.util.Format.dateRenderer('Y年m月d日 H时i分s秒'),sortable:true},
   {header:'备注',dataIndex:'comment'}
];


//主panel 
com.cce.companyinno.OrgCompanyinnoFinance=Ext.extend(Ext.Panel,{
	id:'OrgCompanyinno-Finance-main',
	loadMask: true,
	border: false,
	enableHdMenu: false,
	header:false,
	region:'center',
	closable:true,
	layout:"border",
	frame:true
});

//无害化处理-Finance-表格1

com.cce.companyinno.OrgCompanyinnoFinanceMaster = Ext.extend(Ext.grid.GridPanel, {
	  id:'OrgCompanyinnoFinanceMaster',
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
		    com.cce.companyinno.OrgCompanyinnoFinanceMaster.superclass.initComponent.call(this);
		    
		    this.addEvents(
			    	'doNetBack',
			    	'doSceenBack',
			    	'doPass',
			    	'doView'
			    	 
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
							 	accessor:'市级用户,省级用户'
				   			},
				   			{
								id:5,
				   				accessor:'市级用户,省级用户'
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
//					toolbar.add({
//						text:"查看",
//						iconCls:"info",
//						scope: this,
//						handler:this.onView
//					});
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

              , disableIndexes: ['id','createDate']//不参与查询的列名

               
              
              ,allowBlank: true

      })],
//      onPass:function(){
//		  var record = this.getSelectionModel().getSelected();
//	      if (!record) {
//	            return false;
//	      }	    
//	      
//	      this.fireEvent('doPass', this, this.store, record);
//	  },
//	  onDeny:function(){
//		  var record = this.getSelectionModel().getSelected();
//	      if (!record) {
//	            return false;
//	      }	    
//	      
//	      this.fireEvent('doDeny', this, this.store, record);
//	  },
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
				url : 'companyinno/AppFinance!netPass.action',
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
							   org_store_detail.load({params:{data:''}});
					       }
						   else
						   {
							   if(record!=null)
							   {
								   org_store_detail.load({
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
				url : 'companyinno/AppFinance!sceenPass.action',
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
							   org_store_detail.load({params:{data:''}});
					       }
						   else
						   {
							   if(record!=null)
							   {
								   org_store_detail.load({
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

	  },
	  onView:function(){
		  var record = this.getSelectionModel().getSelected();
	      if (!record) {
	            return false;
	      }

	      this.fireEvent('doView', this, this.store, record);
	      
	  }
      
	  
	  
});

//------------------------------------------------------------------------------
//Module的OrgCompanyinnoFinanceDetail内容Panel定义..
//------------------------------------------------------------------------------

com.cce.companyinno.OrgCompanyinnoFinanceDetail=Ext.extend(Ext.grid.GridPanel ,{
	  id:'OrgCompanyinnoFinanceDetail',
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
		    com.cce.companyinno.OrgCompanyinnoFinanceDetail.superclass.initComponent.call(this);
		    
	  }
		
});

//定义无害化处理-补贴申领-窗口输入

com.cce.companyinno.OrgCompanyinnoFinanceDetailForm=Ext.extend(Ext.form.FormPanel, {
	title: '补贴申领',
	modal:true,
	iconCls: 'silk-user',
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
	record : null,
	initComponent : function() {
		// build the form-fields.  Always a good idea to defer form-building to a method so that this class can
	    // be over-ridden to provide different form-fields
	    this.items = this.buildForm();
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
	    // build form-buttons
	    this.buttons = this.buildUI();
	
	    // add a create event for convenience in our application-code.
	    this.addEvents(
	    		'save',
	    		'afterSave'
	    );
	    
	    // super
	    com.cce.companyinno.OrgCompanyinnoFinanceDetailForm.superclass.initComponent.call(this);
	    
	     

	},
	buildForm : function() {
		var hiddenId = new Ext.form.Hidden({name:"id"});
		return [
				{
					xtype:'displayfield',
				    fieldLabel: '姓名',			 
				    anchor: '100%',					 
				    id:'name',
				    name:'name'
			 
				},
				{
					xtype:'displayfield',
				    fieldLabel: '联系电话',			 
				    anchor: '100%',					 
				    id:'tel',
				    name:'tel'
				     
				},
				{
					xtype:'displayfield',
				    fieldLabel: '手机',				 
				    anchor: '100%',					 
				    id:'mobile',
				    name:'mobile'
				  
				},
				{
					xtype:'displayfield',
				    fieldLabel: '开户名',				 
				    anchor: '100%',					 
				    id:'accountName',
				    name:'accountName'
				   
				}, 
				{
					xtype:'displayfield',
				    fieldLabel: '开户行',			 
				    anchor: '100%',					 
				    id:'bank',
				    name:'bank'
				  
				},
				{
					xtype:'displayfield',
				    fieldLabel: '银行账号',				 
				    anchor: '100%',					 
				    id:'accountNo',
				    name:'accountNo'
				  
				},
				{
					xtype:'displayfield',
				    fieldLabel: '申领开始日期',
					id:'beginDate',				 
				    name:'beginDate',
				    format:'m/d/Y',
					anchor:"100%",
				    align:'left'
				   
				},
				{
					xtype:'displayfield',
				    fieldLabel: '申领结束日期',
					id:'endDate',				 
				    name:'endDate',
				    format:'m/d/Y',
					anchor:"100%",
				    align:'left'
				 
				},
				{
					xtype:'displayfield',
				    fieldLabel: '补贴头数',			 
				    anchor: '100%',					 
				    id:'quantity',
				    name:'quantity'
				   
				},
				{
					xtype:'displayfield',
				    fieldLabel: '补贴标准',					 
				    anchor: '100%',					 
				    id:'standard',
				    name:'standard'
				 
				},
				{
					xtype:'displayfield',
				    fieldLabel: '申领金额',			 
				    anchor: '100%',					 
				    id:'amount',
				    name:'amount',
				    colspan:2
				   
				},
				{
					xtype:'displayfield',
				    fieldLabel: '商务部主管意见', 
				    anchor: '100%',					 
				    id:'MView',
				    name:'MView',
				    colspan:2
				     
				},
				{
					xtype:'displayfield',
				    fieldLabel: '财务部主管意见', 
				    anchor: '100%',					 
				    id:'FView',
				    name:'FView',
				    colspan:2
				  
				},
				hiddenId
		]
	},
	loadRecord : function(rec) {
	      this.record = rec;	      
	      this.getForm().loadRecord(this.record);
	 
	      Ext.getCmp('beginDate').setValue(this.record.get('beginDate').format('m/d/Y').toString());
	      Ext.getCmp('endDate').setValue(this.record.get('endDate').format('m/d/Y').toString());
	      
	},
	buildUI : function(){
	      return [ {
			          text: '关闭',
			          handler: function(btn, ev){
	    	  				this.fireEvent('afterSave', this);
			          },
	          scope: this
	      }];
	}
	 
});

//网络退回处理的form


com.cce.companyinno.OrgCompanyinnoFinanceTaskNetBackForm = Ext.extend(Ext.form.FormPanel, {
	
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
	        'doReload',
	        'afterSave'
	    );
	
	    // super
	    com.cce.companyinno.OrgCompanyinnoFinanceTaskNetBackForm.superclass.initComponent.call(this);
	
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
	          text: '取消',
	          handler: function(btn, ev){
		  		this.fireEvent('afterSave', this);
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
	      var selected = Ext.getCmp('OrgCompanyinnoFinanceMaster').getSelectionModel().getSelected();
	      if (!selected) {
	            return false;
	      }
	      var rows=Ext.getCmp('OrgCompanyinnoFinanceMaster').getSelectionModel().getSelections();
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
				url : 'companyinno/AppFinance!netBack.action',
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
				   org_finance_store.load({
					   scope: this,
					   params:{start:0,limit:20},
					   callback:function(records,options,succees){
						   var record = Ext.getCmp('OrgCompanyinnoFinanceMaster').getSelectionModel().getSelected();
						   
						   if (!record){
							   org_store_detail.load({params:{data:''}});
					       }
						   else
						   {
							   if(record!=null)
							   {
								   org_store_detail.load({
							  	         params : { 
							   			 	data:record.get("id")
							   			 }
								   });
							   }
							   
						   }
					   }
				   }); 
 
				   this.fireEvent('afterSave', this);
				}, 
				failure : function(response) { 
				   App.setAlert(false,"提交失败！"); 
			    }
		   });
	      
	       this.fireEvent('netBack', this, null);
	}
	
	
});

//省级用户通过填写处理意见

com.cce.companyinno.OrgCompanyinnoFinanceTaskSPassForm = Ext.extend(Ext.form.FormPanel, {
	
	title: '处理意见',
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
	        'afterSave'
	    );
	
	    // super
	    com.cce.companyinno.OrgCompanyinnoFinanceTaskSPassForm.superclass.initComponent.call(this);
	
	},
	
	/**
	   * buildform
	   * @private
	   */
	buildForm : function() {
		var hiddenId = new Ext.form.Hidden({name:"id"});
		return [
		        
		        {
		        	xtype:"textarea",
					fieldLabel:"商务部主管处理意见",
					anchor:"100%",
					labelStyle:"",
					name:'MView',
					id:'MView',
					height:100
		        },
		        {
		        	xtype:"textarea",
					fieldLabel:"财政部主管处理意见",
					anchor:"100%",
					labelStyle:"",
					name:'FView',
					id:'FView',
					height:100
		        },
		        hiddenId
		
		
		
	   ]
	  
	},
	buildUI : function(){
	      return [{
				text:"确认",
				scope: this,
				handler:this.update
		  	}, {
	          text: '取消',
	          handler: function(btn, ev){
		  		this.fireEvent('afterSave', this);
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
	      var selected = Ext.getCmp('OrgCompanyinnoFinanceMaster').getSelectionModel().getSelected();
	      if (!selected) {
	            return false;
	      }
	      var rows=Ext.getCmp('OrgCompanyinnoFinanceMaster').getSelectionModel().getSelections();
	      var rowids = [];
	      for(var i=0;i<rows.length;i++)
	      {
	        	rowids.push(rows[i].get("id"));
	      }
	      var data={
	    		  'id':rowids,
	    		  'MView':Ext.getCmp('MView').getValue(),
	    		  'FView':Ext.getCmp('FView').getValue()
	      };
	      Ext.Ajax.request({ 
				url : 'companyinno/AppFinance!pass.action',
				scope: this,
				params : { 
				 data:Ext.encode(data)
				}, 
				success : function(response) { 
				   var data=Ext.util.JSON.decode(response.responseText);					
				   App.setAlert(data.success,data.message);
				   org_finance_store.load({
					   scope: this,
					   params:{start:0,limit:20},
					   callback:function(records,options,succees){
						   var record = Ext.getCmp('OrgCompanyinnoFinanceMaster').getSelectionModel().getSelected();
						   
						   if (!record){
							   org_store_detail.load({params:{data:''}});
					       }
						   else
						   {
							   if(record!=null)
							   {
								   org_store_detail.load({
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
	      this.fireEvent('afterSave', this);
	       
	}
	
	
});


//省级用户通过填写处理意见

com.cce.companyinno.OrgCompanyinnoFinanceTaskSDenyForm = Ext.extend(Ext.form.FormPanel, {
	
	title: '处理意见',
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
	        'afterSave'
	    );
	
	    // super
	    com.cce.companyinno.OrgCompanyinnoFinanceTaskSDenyForm.superclass.initComponent.call(this);
	
	},
	
	/**
	   * buildform
	   * @private
	   */
	buildForm : function() {
		var hiddenId = new Ext.form.Hidden({name:"id"});
		return [
		        
		        {
		        	xtype:"textarea",
					fieldLabel:"商务部主管处理意见",
					anchor:"100%",
					labelStyle:"",
					name:'MView',
					id:'MView',
					height:100
		        },
		        {
		        	xtype:"textarea",
					fieldLabel:"财政部主管处理意见",
					anchor:"100%",
					labelStyle:"",
					name:'FView',
					id:'FView',
					height:100
		        },
		        hiddenId
		
		
		
	   ]
	  
	},
	buildUI : function(){
	      return [{
				text:"确认",
				scope: this,
				handler:this.update
		  	}, {
	          text: '取消',
	          handler: function(btn, ev){
		  		this.fireEvent('afterSave', this);
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
	      var selected = Ext.getCmp('OrgCompanyinnoFinanceMaster').getSelectionModel().getSelected();
	      if (!selected) {
	            return false;
	      }
	      var rows=Ext.getCmp('OrgCompanyinnoFinanceMaster').getSelectionModel().getSelections();
	      var rowids = [];
	      for(var i=0;i<rows.length;i++)
	      {
	        	rowids.push(rows[i].get("id"));
	      }
	      var data={
	    		  'id':rowids,
	    		  'MView':Ext.getCmp('MView').getValue(),
	    		  'FView':Ext.getCmp('FView').getValue()
	      };
	      Ext.Ajax.request({ 
				url : 'companyinno/AppFinance!deny.action',
				scope: this,
				params : { 
				 data:Ext.encode(data)
				}, 
				success : function(response) { 
				   var data=Ext.util.JSON.decode(response.responseText);					
			       App.setAlert(data.success,data.message);
				   org_finance_store.load({
					   scope: this,
					   params:{start:0,limit:20},
					   callback:function(records,options,succees){
						   var record = Ext.getCmp('OrgCompanyinnoFinanceMaster').getSelectionModel().getSelected();
						   
						   if (!record){
							   org_store_detail.load({params:{data:''}});
					       }
						   else
						   {
							   if(record!=null)
							   {
								   org_store_detail.load({
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
	      this.fireEvent('afterSave', this);
	       
	}
	
	
});


//纸质退回处理的form


com.cce.companyinno.OrgCompanyinnoFinanceTaskSceenBackForm = Ext.extend(Ext.form.FormPanel, {
	
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
	    	'doReload',
	        'afterSave'
	    );
	
	    // super
	    com.cce.companyinno.OrgCompanyinnoFinanceTaskSceenBackForm.superclass.initComponent.call(this);
	
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
	          text: '取消',
	          handler: function(btn, ev){
		  		this.fireEvent('afterSave', this);
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
	      
	      var selected = Ext.getCmp('OrgCompanyinnoFinanceMaster').getSelectionModel().getSelected();
	      if (!selected) {
	            return false;
	      }
	      
	      var rows=Ext.getCmp('OrgCompanyinnoFinanceMaster').getSelectionModel().getSelections();
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
				url : 'companyinno/AppFinance!sceenBack.action',
				scope: this, 
				params : { 
				 	data:Ext.encode(rowids),
				 	cause:Ext.getCmp('comment').getValue()
				}, 
				success : function(response) { 
					var data=Ext.util.JSON.decode(response.responseText);					
					   App.setAlert(data.success,data.message);
				   
				   org_finance_store.load({
					   scope: this,
					   params:{start:0,limit:20},
					   callback:function(records,options,succees){
						   var record = Ext.getCmp('OrgCompanyinnoFinanceMaster').getSelectionModel().getSelected();
						   
						   if (!record){
							   org_store_detail.load({params:{data:''}});
					       }
						   else
						   {
							   if(record!=null)
							   {
								   org_store_detail.load({
							  	         params : { 
							   			 	data:record.get("id")
							   			 }
								   });
							   }
							   
						   }
					   }
				   }); 
				   this.fireEvent('afterSave', this);
				}, 
				failure : function(response) { 
				   App.setAlert(false,"提交失败！"); 
			    }
		   });
	      
	       this.fireEvent('afterSave', this, null);
	}
	
	
});

//------------------------------------------------------------------------------
//Module的定义放在最后,eval(xxx.js)后返回Module的类定义..
//------------------------------------------------------------------------------

var org_finance_store = new Ext.data.Store({
	id: 'org_finance_store',
	message: 'message',
	proxy: proxy,
	reader: reader,
	writer: writer,  // <-- plug a DataWriter into the store just as you would a Reader
	autoSave: false
});

var org_store_detail = new Ext.data.Store({
	id: 'org_store_detail',
	message: 'message',
	proxy: proxy_detail,
	reader: reader_detail,
	writer: writer,  // <-- plug a DataWriter into the store just as you would a Reader
	autoSave: false
});

com.cce.companyinno.OrgCompanyinnoFinanceContentPanel=Ext.extend(Ext.Panel ,{
   id:'OrgCompanyinnoFinanceContentPanel',
   region:'south',
   height:260,
   title:'详细信息',
   split:true,
   autoScroll:true,
   frame:true,
   bodyStyle: 'padding: 10px; font-family: Arial; font-size: 12px;',
	initComponent: function(store){
		this.stroe = store;
		com.cce.companyinno.OrgCompanyinnoFinanceContentPanel.superclass.initComponent.call(this);
	}
});

var proxy_inno_checked = new Ext.data.HttpProxy({
	api: {
		    read : 'companyinno/InnoFinance!findInnoList.action'
		}
});

var reader_inno = new Ext.data.JsonReader(
		{root:'data'},
		[ 
		 	{name: 'id',mapping:"id"},
			{name: 'owner',mapping:'owner'}, //货主
			{name: 'partName',mapping:'partName'},//产品名称
			{name: 'cause',mapping:'cause'}, //处理原因
			{name: 'weight',mapping:'weight'}, //处理数量
			{name: 'quantity',mapping:'quantity'}, //折合头数
			{name: 'Approach',mapping:'approachValue'},//处理方式
			{name: 'qcSign',mapping:'qcSign'},//检验人员
			{name: 'pcSign',mapping:'pcSign'},//无害化处理人员
			{name: 'status',mapping:'status'},//状态
			{name: 'financeId',mapping:'financeId'},//视频文件
			{name: 'recFile',mapping:'recFile'},//视频文件
			{name: 'createDate',mapping:'createDate',type:'date',dateFormat:'time'},
			{name: 'beginDate',mapping:'beginDate',type:'date',dateFormat:'time'},//开始时间
			{name: 'dueDate',mapping:'dueDate',type:'date',dateFormat:'time'}//结束时间
		]
);

var writer_inno = new Ext.data.JsonWriter({
	encode: true,
	writeAllFields: false
});

var store_inno_checked = new Ext.data.Store({
    id: 'inno_store',
    message: 'message',
    proxy: proxy_inno_checked,
    reader: reader_inno,
    writer: writer_inno,  // <-- plug a DataWriter into the store just as you would a Reader
    autoSave: false
});

var columns_inno_checked = [
        	{header:'无害化编号',dataIndex:'id'},
            {header:'货主',dataIndex:'owner'},
            {header:'折合头数',dataIndex:'quantity'},
            {header:'处理方式',dataIndex:'Approach'},
           	{header:'视频开始时间',dataIndex:'beginDate',renderer:Ext.util.Format.dateRenderer('Y年m月d日 H时i分s秒')},  
           	{header:'视频结束时间',dataIndex:'dueDate',renderer:Ext.util.Format.dateRenderer('Y年m月d日 H时i分s秒')} ,
            {header:'视频文件',dataIndex:'recFile'}
];

com.cce.companyinno.companyinnoFinanceContentForm=Ext.extend(Ext.form.FormPanel, {
	id:'companyinnoFinanceContentForm',
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
	    com.cce.companyinno.companyinnoFinanceContentForm.superclass.initComponent.call(this);
	},
	buildForm : function() {
		return [
				{
				    xtype:"displayfield",
				    fieldLabel: '姓名',
					id:'name',				 
				    name:'name',
					anchor:"100%",
				    align:'left'
				},
				{
				    xtype:"displayfield",
				    fieldLabel: '开户名',
					id:'accountName',				 
				    name:'accountName',
					anchor:"100%",
				    align:'left'
				},{
				    xtype:"displayfield",
				    fieldLabel: '联系电话',
					id:'tel',				 
				    name:'tel',
					anchor:"100%",
				    align:'left'
				},
				{
				    xtype:"displayfield",
				    fieldLabel: '手机号',
					id:'mobile',				 
				    name:'mobile',
					anchor:"100%",
				    align:'left'
				},{
				    xtype:"displayfield",
				    fieldLabel: '开户行',
					id:'bank',				 
				    name:'bank',
					anchor:"100%",
				    align:'left'
				},
				{
				    xtype:"displayfield",
				    fieldLabel: '银行账号',
					id:'accountNo',				 
				    name:'accountNo',
					anchor:"100%",
				    align:'left'
				},
				{
				    xtype:"displayfield",
				    fieldLabel: '申领开始日期',
					id:'beginDate',				 
				    name:'beginDate',
					anchor:"100%",
				    align:'left'
				},
				{
				    xtype:"displayfield",
				    fieldLabel: '申领结束日期',
					id:'endDate',				 
				    name:'endDate',
					anchor:"100%",
				    align:'left'
				},
				{
				    xtype: 'displayfield',
				    fieldLabel: '补贴头数',
				    anchor: '100%',					 
				    id:'quantity',
				    name:'quantity'
				},
				{
				    xtype: 'displayfield',
				    fieldLabel: '补贴标准',
				    anchor: '100%',					 
				    id:'standard',
				    name:'standard'
				},
				{
				    xtype: 'displayfield',
				    fieldLabel: '申领金额',
				    anchor: '100%',					 
				    id:'amount',
				    name:'amount',
				    colspan:2
				}, 
				{
					xtype:"grid",
					id:'innogrid1',
					title:"补贴项",
					store:store_inno_checked,
					columns:columns_inno_checked,
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
	      if(this.record.get('beginDate'))this.record.set('beginDate',this.record.get('beginDate').format('Y年m月d日 H时i分s秒').toString());
	      if(this.record.get('endDate'))this.record.set('endDate',this.record.get('endDate').format('Y年m月d日 H时i分s秒').toString());
	      this.getForm().loadRecord(this.record);
	}
});

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
		this.master = new com.cce.companyinno.OrgCompanyinnoFinanceMaster({ store : org_finance_store });
		this.detail= new com.cce.companyinno.OrgCompanyinnoFinanceDetail({ store : org_store_detail });
		this.full = new com.cce.companyinno.companyinnoFinanceContentForm();
//		this.full = new com.cce.companyinno.OrgCompanyinnoFinanceContentPanel();
		this.frame= new com.cce.companyinno.OrgCompanyinnoFinance();		
		
		
		//关联自定义事件
	    //this.relayEvents(this.store, ['destroy', 'save', 'update']);
		
		this.master.on('doNetBack', this.showNetBackForm, this);
		this.master.on('doSceenBack', this.showSceenBackForm, this);
		this.master.on('doView', this.showViewForm, this);
//		this.master.on('doPass', this.showPassForm, this);
//		this.master.on('doDeny', this.showDenyForm, this);	
		this.master.on('rowclick', function(g, index, ev){
			this.record =g.store.getAt(index);
			org_store_detail.load({
				params : { 
				 	data:this.record.get("id")
				}
			}); 
			store_inno_checked.load({
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
//			var html='<table width="600" border="0" cellpadding="1" cellspacing="1" class="datalist">'+
//			  		'<tr>'+
//				      '<td width="83" height="30" align="center" bgcolor="#FFFFFF" class="company_info_bold" >姓名</td>'+
//				      '<td width="176" align="left" bgcolor="#FFFFFF" class="company_info" >'+spname+'</td>'+
//				      '<td width="146" align="center" bgcolor="#FFFFFF" class="company_info_bold" >开户名</td>'+
//				      '<td width="167" align="left" bgcolor="#FFFFFF" class="company_info" >'+spaccountName+'</td>'+
//				    '</tr>'+
//					'<tr>'+
//					  '<td height="30" align="center" bgcolor="#FFFFFF"  class="company_info_bold" >联系电话</td>'+
//					  '<td align="left" bgcolor="#FFFFFF" class="company_info">'+sptel+'</td>'+
//					  '<td align="center" bgcolor="#FFFFFF"  class="company_info_bold" >手机</td>'+
//					  '<td align="left" bgcolor="#FFFFFF" class="company_info" >'+spmobile+'</td>'+
//					'</tr>'+
//					'<tr>'+
//					  '<td height="30" align="center" bgcolor="#FFFFFF" class="company_info_bold" >开户行</td>'+
//					  '<td align="left" bgcolor="#FFFFFF" class="company_info" >'+spbank+'</td>'+
//					  '<td align="center" bgcolor="#FFFFFF"  class="company_info_bold" >银行账号</td>'+
//					  '<td align="left" bgcolor="#FFFFFF" class="company_info" >'+spaccountNo+'</td>'+
//					'</tr>'+
//					'<tr>'+
//					  '<td height="30" align="center" bgcolor="#FFFFFF" class="company_info_bold" >申领开始日期</td>'+
//					  '<td align="left" bgcolor="#FFFFFF" class="company_info" >'+spbeginDate+'</td>'+
//					  '<td align="center" bgcolor="#FFFFFF"  class="company_info_bold" >申领结束日期</td>'+
//					  '<td align="left" bgcolor="#FFFFFF" class="company_info" >'+spdueDate+'</td>'+
//					'</tr>'+
//					'<tr>'+
//					  '<td height="30" align="center" bgcolor="#FFFFFF" class="company_info_bold" >补贴头数</td>'+
//					  '<td align="left" bgcolor="#FFFFFF" class="company_info" >'+spquantity+'</td>'+
//					  '<td align="center" bgcolor="#FFFFFF"  class="company_info_bold" >补贴标准</td>'+
//					  '<td align="left" bgcolor="#FFFFFF" class="company_info" >'+spstandard+'</td>'+
//					'</tr>'+
//					'<tr>'+
//					  '<td height="30" align="center" bgcolor="#FFFFFF" class="company_info_bold" >申领金额</td>'+
//					  '<td align="left" bgcolor="#FFFFFF" class="company_info" colspan="3">'+spamount+'</td>'+
//					'</tr>'+
//					'</table>';
//			Ext.getCmp('OrgCompanyinnoFinanceContentPanel').body.update(html);
		}, this);
		this.frame.add(this.master);
		this.frame.add(this.tabPanel);
		this.tabPanel.add(this.full);
		
		this.main.add(this.frame);
		this.main.doLayout();
		this.tabPanel.add(this.detail);
		org_finance_store.load({params:{start:0,limit:20}}); 
	
	
	},
	showViewForm : function(g, store, record){
		
		if(!record){
	        record = new store.recordType();
		}
		
		var form = new com.cce.companyinno.OrgCompanyinnoFinanceDetailForm();
		
		this.win = new Ext.Window({
		    title: '无害化处理-补贴申请',
		    closable:true,
		    width:590,
		    height:310,
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
		form.on('afterSave',this.afterSave,this);
		this.win.show();
		
		
	},
	showNetBackForm:function(g, store, record){
		if(!record){
	        record = new store.recordType();
		}
		
		var form = new com.cce.companyinno.OrgCompanyinnoFinanceTaskNetBackForm();
		
		this.win = new Ext.Window({
		    title: '网络退回',
		    closable:true,
		    width:590,
		    height:300,
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
		form.on('afterSave',this.afterSave,this);
		this.win.show();
	},
	showSceenBackForm:function(g, store, record){
		if(!record){
	        record = new store.recordType();
		}
		
		var form = new com.cce.companyinno.OrgCompanyinnoFinanceTaskSceenBackForm();
		
		this.win = new Ext.Window({
		    title: '纸质退回',
		    closable:true,
		    width:590,
		    height:300,
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
		form.on('afterSave',this.afterSave,this);
		this.win.show();
		
	},
	showPassForm:function(g, store, record){
		if(!record){
	        record = new store.recordType();
		}
		
		var form = new com.cce.companyinno.OrgCompanyinnoFinanceTaskSPassForm();
		
		this.win = new Ext.Window({
		    title: '处理意见',
		    closable:true,
		    width:590,
		    height:360,
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
		form.on('afterSave',this.afterSave,this);
		this.win.show();
	},
	showDenyForm:function(g, store, record){
		if(!record){
	        record = new store.recordType();
		}
		
		var form = new com.cce.companyinno.OrgCompanyinnoFinanceTaskSDenyForm();
		
		this.win = new Ext.Window({
		    title: '处理意见',
		    closable:true,
		    width:590,
		    height:360,
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
		form.on('afterSave',this.afterSave,this);
		this.win.show();
	},
	afterSave:function(fp, record){
		this.win.close();
	}
	
	
});