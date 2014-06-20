Ext.ns("com.cce.companyinno");

ScriptMgr.load({ scripts: ['javascript/utils/SearchField.js']});
ScriptMgr.load({ scripts: ['javascript/utils/FormTableLayout.js']});
ScriptMgr.load({ scripts: ['javascript/utils/Ext.ux.grid.Search.js']}); //载入查询插件
 

var proxy = new Ext.data.HttpProxy({
	api: {
		    read : 'companyinno/AppProduct!list.action',
		    create : 'companyinno/AppProduct!save.action',
		    destroy: 'companyinno/AppProduct!delete.action'
		}
});
var proxy_detail = new Ext.data.HttpProxy({
	api: {
		    read : 'companyinno/AppProduct!getDetails.action'
		}
});
//------------------------------------------------------------------------------
//Module的reader定义..
//------------------------------------------------------------------------------
var reader = new Ext.data.JsonReader(
	{root:'data'},
	[ 
	 	{name: 'id',mapping:"id"},
	 	{name: 'innId',mapping:"innId"},
	 	{name: 'entName',mapping:'entName'},
		{name: 'owner',mapping:'owner'}, //货主
		{name: 'partName',mapping:'partName'},//产品名称
		{name: 'cause',mapping:'cause'}, //处理原因
		{name: 'weight',mapping:'weight'}, //处理数量
		{name: 'quantity',mapping:'quantity'}, //折合头数
		{name: 'Approach',mapping:'approachValue'},//处理方式
		{name: 'qcSign',mapping:'qcSign'},//检验人员
		{name: 'pcSign',mapping:'pcSign'},//无害化处理人员
		{name: 'recFile',mapping:'recFile'},//视频文件
		{name: 'createDate',mapping:'createDate',type:'date',dateFormat:'time'},
		{name: 'beginDate',mapping:'beginDate',type:'date',dateFormat:'time'},//开始时间
		{name: 'dueDate',mapping:'dueDate',type:'date',dateFormat:'time'}//结束时间
	     
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
   {header:'编号',dataIndex:'innId'},
   {header:'所属企业',dataIndex:'entName'},
   {header:'货主',dataIndex:'owner'},
   {header:'产品名称',dataIndex:'partName'},
   {header:'处理原因',dataIndex:'cause'},
   {header:'处理数量(公斤)',dataIndex:'weight'},
   {header:'折合头数',dataIndex:'quantity'},
   {header:'处理方式',dataIndex:'Approach'},
   {header:'检验人员',dataIndex:'qcSign'},
   {header:'无害化处理人员',dataIndex:'pcSign'}, 
   {header:'提交时间',dataIndex:'createDate',renderer:Ext.util.Format.dateRenderer('Y年m月d日 H时i分s秒'),sortable:true}
];
var columns_detail = [
   {header:'操作人',dataIndex:'createBy'},
   {header:'角色',dataIndex:'role'},
   {header:'操作',dataIndex:'operate'},
   {header:'日期',dataIndex:'createDate',renderer:Ext.util.Format.dateRenderer('Y年m月d日 H时i分s秒'),sortable:true},
   {header:'备注',dataIndex:'comment'}
];

//主panel 
com.cce.companyinno.OrgCompanyinnoProduct=Ext.extend(Ext.Panel,{
	id:'OrgCompanyinno-Product-main',
	loadMask: true,
	border: false,
	enableHdMenu: false,
	header:false,
	region:'center',
	closable:true,
	layout:"border",
	frame:true
});

//无害化处理-产品-表格1

com.cce.companyinno.OrgCompanyinnoProductMaster = Ext.extend(Ext.grid.GridPanel, {
	  id:'OrgCompanyinnoProductMaster',
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
		    com.cce.companyinno.OrgCompanyinnoProductMaster.superclass.initComponent.call(this);
		    
		    this.addEvents(
		    	'doedit'
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
				url : 'companyinno/AppProduct!netPass.action',
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
				url : 'companyinno/AppProduct!sceenPass.action',
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
//Module的OrgCompanyinnoProductDetail内容Panel定义..
//------------------------------------------------------------------------------

com.cce.companyinno.OrgCompanyinnoProductDetail=Ext.extend(Ext.grid.GridPanel ,{
	  id:'OrgCompanyinnoProductDetail',
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
		    com.cce.companyinno.OrgCompanyinnoProductDetail.superclass.initComponent.call(this);
		    
	  }
		
});

//定义无害化处理-病害猪-窗口输入

com.cce.companyinno.OrgCompanyinnoProductForm=Ext.extend(Ext.form.FormPanel, {
	title: '产品登记',
	modal:true,
	iconCls: 'silk-user',
	labelWidth: 100,
	width: 560,
	height: 340,
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
	    		 
	    		'afterSave'
	    );
	    
	    // super
	    com.cce.companyinno.OrgCompanyinnoProductForm.superclass.initComponent.call(this);
	    
	     

	},
	buildForm : function() {
		var hiddenId = new Ext.form.Hidden({name:"id"});
		return [
				{
					xtype:'displayfield',
				    fieldLabel: '货主',			 
				    anchor: '100%',					 
				    id:'owner',
				    name:'owner'
				   
				},
				{
					xtype:'displayfield',
				    fieldLabel: '产品名称',			 
				    anchor: '100%',					 
				    id:'partName',
				    name:'partName'
				  
				},
				{
					xtype:'displayfield',
				    fieldLabel: '处理数量',				 
				    anchor: '100%',					 
				    id:'weight',
				    name:'weight'
				   
				},
				{
					xtype:'displayfield',
				    fieldLabel: '折合头数',			 
				    anchor: '100%',					 
				    id:'quantity',
				    name:'quantity'
				    
				},
				{
					xtype:'displayfield',
				    fieldLabel: '检验人员',				 
				    anchor: '100%',					 
				    id:'qcSign',
				    name:'qcSign'
				 
				},
				{
					xtype:'displayfield',
				    fieldLabel: '无害化处理人员',				 
				    anchor: '100%',					 
				    id:'pcSign',
				    name:'pcSign'
				   
				}, 
				{
					xtype:'displayfield',
				    fieldLabel: '处理类型',			 
				    anchor: '100%',					 
				    id:'Approach',
				    name:'Approach',
				    colspan:2
				 
				},
				{
					xtype:'displayfield',
				    fieldLabel: '处理原因',			 
				    anchor: '100%',					 
				    id:'cause',
				    name:'cause',
				    colspan:2
				 
				},
				hiddenId
		]
	},
	loadRecord : function(rec) {
	      this.record = rec;	      
	      this.getForm().loadRecord(this.record);
//	      if(this.record.get('Approach')=='1')
//	      {
//	    	  Ext.getCmp('Approach').setValue('自营');
//	      }
//	      else
//	      {
//	    	  Ext.getCmp('Approach').setValue('代宰');
//	      }
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


com.cce.companyinno.OrgCompanyinnoProductTaskNetBackForm = Ext.extend(Ext.form.FormPanel, {
	
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
	    com.cce.companyinno.OrgCompanyinnoProductTaskNetBackForm.superclass.initComponent.call(this);
	
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
	      var selected = Ext.getCmp('OrgCompanyinnoProductMaster').getSelectionModel().getSelected();
	      if (!selected) {
	            return false;
	      }
	      var rows=Ext.getCmp('OrgCompanyinnoProductMaster').getSelectionModel().getSelections();
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
				url : 'companyinno/AppProduct!netBack.action',
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
				   
				   org_Product_store.load({
					   scope: this,
					   params:{start:0,limit:20},
					   callback:function(records,options,succees){
						   var record = Ext.getCmp('OrgCompanyinnoProductMaster').getSelectionModel().getSelected();
						   
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
	      
	       
	}
	
	
});


//纸质退回处理的form


com.cce.companyinno.OrgCompanyinnoProductTaskSceenBackForm = Ext.extend(Ext.form.FormPanel, {
	
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
	    com.cce.companyinno.OrgCompanyinnoProductTaskSceenBackForm.superclass.initComponent.call(this);
	
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
	      
	      var selected = Ext.getCmp('OrgCompanyinnoProductMaster').getSelectionModel().getSelected();
	      if (!selected) {
	            return false;
	      }
	      
	      var rows=Ext.getCmp('OrgCompanyinnoProductMaster').getSelectionModel().getSelections();
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
				url : 'companyinno/AppProduct!sceenBack.action',
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
				   org_Product_store.load({
					   scope: this,
					   params:{start:0,limit:20},
					   callback:function(records,options,succees){
						   var record = Ext.getCmp('OrgCompanyinnoProductMaster').getSelectionModel().getSelected();
						   
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
	      
	       
	}
	
	
});

var org_Product_store = new Ext.data.Store({
	  id: 'org_Product_store',
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

com.cce.companyinno.OrgCompanyinnoProductContentPanel=Ext.extend(Ext.Panel ,{
   id:'OrgCompanyinnoProductContentPanel',
   region:'south',
   height:260,
   title:'详细信息',
   split:true,
   autoScroll:true,
   frame:true,
   bodyStyle: 'padding: 10px; font-family: Arial; font-size: 12px;',
	initComponent: function(store){
		this.stroe = store;
		com.cce.companyinno.OrgCompanyinnoProductContentPanel.superclass.initComponent.call(this);
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
		this.master = new com.cce.companyinno.OrgCompanyinnoProductMaster({ store : org_Product_store });
		this.detail= new com.cce.companyinno.OrgCompanyinnoProductDetail({ store : org_store_detail });
		this.full = new com.cce.companyinno.OrgCompanyinnoProductContentPanel();
		this.frame= new com.cce.companyinno.OrgCompanyinnoProduct();		
		
		
		//关联自定义事件
	    //this.relayEvents(this.store, ['destroy', 'save', 'update']);
		
		this.master.on('doNetBack', this.showNetBackForm, this);
		this.master.on('doSceenBack', this.showSceenBackForm, this);
		this.master.on('doView', this.showViewForm, this);		 
		this.master.on('rowclick', function(g, index, ev){
			this.record =g.store.getAt(index);
			org_store_detail.load({
				params : { 
	 			 	data:this.record.get("id")
	 			}
			}); 
			var spbeginDate="&nbsp;";
			var spdueDate="&nbsp;";
			var spfile="&nbsp;";

			var spowner="&nbsp;";
			var sppartName="&nbsp;";
			var spweight="&nbsp;";
			var spquantity="&nbsp;";
			var spqcSign="&nbsp;";
			var sppcSign="&nbsp;";
			var spapproach="&nbsp;";
			var spcause="&nbsp;";
			
			if(this.record.get('beginDate'))spbeginDate=this.record.get('beginDate').format('Y年m月d日 H时i分s秒').toString();
			if(this.record.get('dueDate'))spdueDate=this.record.get('dueDate').format('Y年m月d日 H时i分s秒').toString();
			if(this.record.get('recFile')) spfile=this.record.get('recFile');

			if(this.record.get('owner')) spowner=this.record.get('owner');
			if(this.record.get('partName')) sppartName=this.record.get('partName');
			if(this.record.get('weight')) spweight=this.record.get('weight');
			if(this.record.get('quantity')) spquantity=this.record.get('quantity');
			if(this.record.get('qcSign')) spqcSign=this.record.get('qcSign');
			if(this.record.get('pcSign')) sppcSign=this.record.get('pcSign');
			if(this.record.get('Approach')) spapproach=this.record.get('Approach');
			if(this.record.get('cause')) spcause=this.record.get('cause');
			var html='<table width="600" border="0" cellpadding="1" cellspacing="1" class="datalist">'+
	  		'<tr>'+
		      '<td width="83" height="30" align="center" bgcolor="#FFFFFF" class="company_info_bold" >货主</td>'+
		      '<td width="176" align="left" bgcolor="#FFFFFF" class="company_info" >'+spowner+'</td>'+
		      '<td width="146" align="center" bgcolor="#FFFFFF" class="company_info_bold" >产品名称</td>'+
		      '<td width="167" align="left" bgcolor="#FFFFFF" class="company_info" >'+sppartName+'</td>'+
		    '</tr>'+
			'<tr>'+
			  '<td height="30" align="center" bgcolor="#FFFFFF"  class="company_info_bold" >处理数量</td>'+
			  '<td align="left" bgcolor="#FFFFFF" class="company_info">'+spweight+'</td>'+
			  '<td align="center" bgcolor="#FFFFFF"  class="company_info_bold" >折合头数</td>'+
			  '<td align="left" bgcolor="#FFFFFF" class="company_info" >'+spquantity+'</td>'+
			'</tr>'+
			'<tr>'+
			  '<td height="30" align="center" bgcolor="#FFFFFF" class="company_info_bold" >检验人员</td>'+
			  '<td align="left" bgcolor="#FFFFFF" class="company_info" >'+spqcSign+'</td>'+
			  '<td align="center" bgcolor="#FFFFFF"  class="company_info_bold" >无害化处理人员</td>'+
			  '<td align="left" bgcolor="#FFFFFF" class="company_info" >'+sppcSign+'</td>'+
			'</tr>'+
			'<tr>'+
			  '<td height="30" align="center" bgcolor="#FFFFFF" class="company_info_bold" >视频开始日期</td>'+
			  '<td align="left" bgcolor="#FFFFFF" class="company_info" >'+spbeginDate+'</td>'+
			  '<td align="center" bgcolor="#FFFFFF"  class="company_info_bold" >视频结束日期</td>'+
			  '<td align="left" bgcolor="#FFFFFF" class="company_info" >'+spdueDate+'</td>'+
			'</tr>'+
			'<tr>'+
			  '<td height="30" align="center" bgcolor="#FFFFFF" class="company_info_bold" >视频文件</td>'+
			  '<td align="left" bgcolor="#FFFFFF" class="company_info" >'+spfile+'</td>'+
			  '<td align="center" bgcolor="#FFFFFF"  class="company_info_bold" >处理方式</td>'+
			  '<td align="left" bgcolor="#FFFFFF" class="company_info" >'+spapproach+'</td>'+
			'</tr>'+
			'<tr>'+
			  '<td height="100" align="center" bgcolor="#FFFFFF"  class="company_info_bold" >处理原因</td>'+
		      '<td colspan="3" valign="top" bgcolor="#FFFFFF" class="company_info" >'+spcause+'</td>'+
		    '</tr>'+
			'</table>';
			Ext.getCmp('OrgCompanyinnoProductContentPanel').body.update(html);
		}, this);
		this.frame.add(this.master);
		this.frame.add(this.tabPanel);
		this.tabPanel.add(this.full);
		
		this.main.add(this.frame);
		this.main.doLayout();
		this.tabPanel.add(this.detail);
		org_Product_store.load({params:{start:0,limit:20}}); 
	
	
	},
	showViewForm : function(g, store, record){
		
		if(!record){
	        record = new store.recordType();
		}
		
		var form = new com.cce.companyinno.OrgCompanyinnoProductForm();
		
		this.win = new Ext.Window({
		    title: '无害化处理-产品登记',
		    closable:true,
		    width:540,
		    height:240,
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
		
		var form = new com.cce.companyinno.OrgCompanyinnoProductTaskNetBackForm();
		
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
		
		var form = new com.cce.companyinno.OrgCompanyinnoProductTaskSceenBackForm();
		
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
	afterSave:function(fp, record){
		this.win.close();
	}
	
	
});
