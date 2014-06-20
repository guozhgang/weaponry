Ext.ns("com.cce.companycredit");
ScriptMgr.load({ scripts: ['javascript/utils/Ext.ux.grid.Search.js']});

//------------------------------------------------------------------------------
//Module的proxy定义..
//------------------------------------------------------------------------------
var proxy = new Ext.data.HttpProxy({
	api: {
	    read : 'credit/approval4Credit!findWaitingStatusApprovalInfo.action',
	    create : 'credit/approval4Credit!save.action',
	    destroy: 'credit/approval4Credit!delete.action'
		}
	});

var proxy_detail = new Ext.data.HttpProxy({
	api: {
		    read : 'credit/approval4Credit!getDetailsByApprovalId.action',
		    create : 'credit/approval4Credit!save.action',
		    destroy: 'credit/approval4Credit!delete.action'
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
		{name: 'entCredit',mapping:'entCredit'},
		{name: 'fileId',mapping:'fileId'},
		{name: 'remark',mapping:'remark'},
	    {name: 'createDate',mapping:"createDate",type:'date',dateFormat:'time'},
	    {name: 'updateDate',mapping:"updateDate",type:'date',dateFormat:'time'},
		{name: 'entNo',mapping:'entNo'}
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

function linker(val){
	if(val&&val!="")
	return "<a title='点击下载' target='_blank' href='upload/download.action?id="+val+"'>↓下载</a>";  
	else return "";
}   
//------------------------------------------------------------------------------
//Module的columns定义..
//------------------------------------------------------------------------------
var columns = [
    new Ext.grid.CheckboxSelectionModel(), 
    {header:'企业名',dataIndex:'entName'},
    {header:'税务登记号',dataIndex:'entNo'},
    {header:'信用等级',dataIndex:'entCredit'},
    {header:'档案文件',dataIndex:'fileId',renderer:linker},
    {header:'说明',dataIndex:'remark'},
   	{header:'创建日期',dataIndex:'createDate',renderer:Ext.util.Format.dateRenderer('Y年m月d日 H时i分s秒'),sortable:true},
	{header:'更新日期',dataIndex:'updateDate',renderer:Ext.util.Format.dateRenderer('Y年m月d日 H时i分s秒'),sortable:true}
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

com.cce.companycredit.OrgCompanyCreditTask=Ext.extend(Ext.Panel,{
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


com.cce.companycredit.NetDenyCreditForm = Ext.extend(Ext.form.FormPanel,{
	title : '退回原因',
	modal : true,
	iconCls : 'silk-user',
	labelAlign : 'top',
	labelWidth : 75,
	width : 450,
	height : 240,
	padding : 10,
	header : false,
	frame : true,
	region : 'center',
	layout : 'form',
	autoScroll : true,
	record : null,
	initComponent : function() {
		this.items = this.buildForm();
		this.buttons = this.buildUI();
		this.addEvents(
				'doNetDeny',
				'afterSave'
		);
		com.cce.companycredit.NetDenyCreditForm.superclass.initComponent.call(this);
	},
	buildForm : function(){
		return [
		        {
		        	xtype : 'textarea',
		        	fieldLabel : '退回原因',
		        	anchor : '100%',
		        	labelStyle : '',
		        	name : 'comment',
		        	id : 'comment',
		        	height : 100
		        }
		];
	},
	buildUI : function(){
		return [
		        {
		        	text : '确认',
		        	scope : this,
		        	handler : this.updateNetRet
		        },
		        {
		        	text : '取消',
		        	handler : function(btn,ev){
		        	this.fireEvent('afterSave',this);
		        	},
		        	scope : this
		        }
		        ];
	},
	loadRecord : function(rec){
		this.record = rec;
		this.getForm().loadRecord(this.record);
	},
	updateNetRet : function(btn,ev){
		if(this.record == null){
			return ;
		}
		if(!this.getForm().isValid()){
			App.setAlert(false,"表单数据错误.");
			return false;
		}
		var selected = Ext.getCmp('OrgCompanyCreditTaskMaster').getSelectionModel().getSelected();
		if(!selected){
			return false;
		}
		var rows = Ext.getCmp('OrgCompanyCreditTaskMaster').getSelectionModel().getSelections();
		var rowids = [];
		for(var i=0;i<rows.length;i++){
			rowids.push(rows[i].get("id"));
		}
		Ext.Ajax.request({
			url : 'credit/approval4Credit!netDeny.action',
			scope : this,
			params : {
				data : Ext.encode(rowids),
				cause : Ext.getCmp('comment').getValue()
			},
			success : function(response){
				var data = Ext.util.JSON.decode(response.responseText);
				App.setAlert(Ext.util.JSON.decode(response.responseText).success,Ext.util.JSON.decode(response.responseText).message);
				store_credit.load({
					scope : this,
					params : {start:0,limit:20},
					callback:function(records,options,success){
						var record = Ext.getCmp('OrgCompanyCreditTaskMaster').getSelectionModel().getSelected();
						if(!record){
							store_credit_detail.load({params:{data:''}});
						}else{
							if(null!=record){
								store_credit_detail.load({
									params: {
										data : record.get('id')
									}
								});
							}
						}
						}
				});
			},
			failure : function(response){
				App.setAlert(false,'提交失败!');
			}
		});
		this.fireEvent('afterSave',this,null);
	}
});

com.cce.companycredit.SceneDenyCreditForm = Ext.extend(Ext.form.FormPanel,{
	title : '退回原因',
	modal : true,
	iconCls : 'silk-user',
	labelAlign : 'top',
	labelWidth : 75,
	width : 450,
	height : 240,
	padding : 10,
	header : false,
	frame : true,
	region : 'center',
	layout : 'form',
	autoScroll : true,
	record : null,
	initComponent : function() {
		this.items = this.buildForm();
		this.buttons = this.buildUI();
		this.addEvents(
				'doSceneDeny',
				'afterSave'
		);
		com.cce.companycredit.SceneDenyCreditForm.superclass.initComponent.call(this);
	},
	buildForm : function(){
		return [
		        {
		        	xtype : 'textarea',
		        	fieldLabel : '退回原因',
		        	anchor : '100%',
		        	labelStyle : '',
		        	name : 'comment',
		        	id : 'comment',
		        	height : 100
		        }
		];
	},
	buildUI : function(){
		return [
		        {
		        	text : '确认',
		        	scope : this,
		        	handler : this.updateSceneRet
		        },
		        {
		        	text : '取消',
		        	handler : function(btn,ev){
		        	this.fireEvent('afterSave',this);
		        	},
		        	scope : this
		        }
		        ];
	},
	loadRecord : function(rec){
		this.record = rec;
		this.getForm().loadRecord(this.record);
	},
	updateSceneRet : function(btn,ev){
		if(this.record == null){
			return ;
		}
		if(!this.getForm().isValid()){
			App.setAlert(false,"表单数据错误.");
			return false;
		}
		var selected = Ext.getCmp('OrgCompanyCreditTaskMaster').getSelectionModel().getSelected();
		if(!selected){
			return false;
		}
		var rows = Ext.getCmp('OrgCompanyCreditTaskMaster').getSelectionModel().getSelections();
		var rowids = [];
		for(var i=0;i<rows.length;i++){
			rowids.push(rows[i].get("id"));
		}
		Ext.Ajax.request({
			url : 'credit/approval4Credit!sceenDeny.action',
			scope : this,
			params : {
				data : Ext.encode(rowids),
				cause : Ext.getCmp('comment').getValue()
			},
			success : function(response){
				var data = Ext.util.JSON.decode(response.responseText);
				App.setAlert(Ext.util.JSON.decode(response.responseText).success,Ext.util.JSON.decode(response.responseText).message);
				store_credit.load({
					scope : this,
					params : {start:0,limit:20},
					callback:function(records,options,success){
						var record = Ext.getCmp('OrgCompanyCreditTaskMaster').getSelectionModel().getSelected();
						if(!record){
							store_credit_detail.load({params:{data:''}});
						}else{
							if(null!=record){
								store_credit_detail.load({
									params: {
										data : record.get('id')
									}
								});
							}
						}
						}
				});
			},
			failure : function(response){
				App.setAlert(false,'提交失败!');
			}
		});
		this.fireEvent('afterSave',this,null);
	}
});


//------------------------------------------------------------------------------
//Module的CompanyRecordGrid定义..
//------------------------------------------------------------------------------

com.cce.companycredit.OrgCompanyCreditTaskMaster = Ext.extend(Ext.grid.GridPanel, {
	  id:'OrgCompanyCreditTaskMaster',
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
		    com.cce.companycredit.OrgCompanyCreditTaskMaster.superclass.initComponent.call(this);
		    
		    this.addEvents(
		    	'doedit',
		    	'doNetDeny',
		    	'doSceneDeny'
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
				text:"现场通过",
				iconCls:"local_pass",
				scope: this,
				handler:this.onSceenPass
		};
		btnArray[3]={
				text:"现场退回",
				iconCls:"local_back",
				scope: this,
				handler:this.onSceneDeny
		};
		Ext.Ajax.request({
			async:false,
			url : 'security/user!buildTopButtons.action',
			params : 
			{ 
				data:Ext.encode([
						{
							id:0,
   					 		accessor:'省级用户'
			   	    	},
			   	    	{
							id:1,
   					 		accessor:'省级用户'
			   	    	},
			   			{
							id:2,
						 	accessor:'省级用户'
			   			},
			   			{
							id:3,
			   				accessor:'省级用户'
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
	   *  查询插件载入
	   */
	  plugins: [new Ext.ux.grid.Search({

          		iconCls: false

              , showSelectAll: false

              , dateFormat: 'm/d/Y'

              , position: 'top'

              , searchText: '搜索'

              , disableIndexes: ['id','fileId','createDate','updateDate']//不参与查询的列名
      })],
      
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

	  onNetPass:function() {
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
				url : 'credit/approval4Credit!netPass.action',
				scope: this,
				params : { 
				 data:Ext.encode(rowids)
				}, 
				success : function(response) { 
					   App.setAlert(Ext.util.JSON.decode(response.responseText).success,Ext.util.JSON.decode(response.responseText).message);
					   store_credit.load({
						   scope: this,
						   params:{start:0,limit:20},
						   callback:function(records,options,succees){
							   var record = Ext.getCmp('OrgCompanyCreditTaskMaster').getSelectionModel().getSelected();
							   
							   if (!record){
								   store_credit_detail.load({params:{data:''}});
						       }
							   else
							   {
								   if(record!=null)
								   {
									   store_credit_detail.load({
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
				   App.setAlert(false,"执行失败！"); 
			    }
		   }); 
	  },	  
	  onNetDeny:function() {
		  var record = this.getSelectionModel().getSelected();
	        if (!record) {
	            return false;
	        }
	        this.fireEvent('doNetDeny',this,this.store,record);
//	        var rows=this.getSelectionModel().getSelections();
//	        var rowids = [];
//	        for(var i=0;i<rows.length;i++)
//	        {
//	        	rowids.push(rows[i].get("id"));
//	        }
//	        Ext.Msg.prompt('原因', '请输入退回原因:', function(btn, text){
//	            if (btn == 'ok'){
//	    	        Ext.Ajax.request({ 
//	    				url : 'credit/approval4Credit!netDeny.action',
//	    				scope: this,
//	    				params : { 
//	    				 	data:Ext.encode(rowids),
//	    				 	cause:Ext.encode(text)
//	    				}, 
//	    				success : function(response) { 
//	    					   App.setAlert(Ext.util.JSON.decode(response.responseText).success,Ext.util.JSON.decode(response.responseText).message);
//	    					   
//	    					   store_credit.load({
//	    						   scope: this,
//	    						   params:{start:0,limit:20},
//	    						   callback:function(records,options,succees){
//	    							   var record = Ext.getCmp('OrgCompanyCreditTaskMaster').getSelectionModel().getSelected();
//	    							   
//	    							   if (!record){
//	    								   store_credit_detail.load({params:{data:''}});
//	    						       }
//	    							   else
//	    							   {
//	    								   if(record!=null)
//	    								   {
//	    									   store_credit_detail.load({
//	    								  	         params : { 
//	    								   			 	data:record.get("id")
//	    								   			 }
//	    									   });
//	    								   }
//	    								   
//	    							   }
//	    						   }
//	    					   }); 
//	    				}, 
//	    				failure : function(response) { 
//	    				   App.setAlert(false,"执行失败！"); 
//	    			    }
//	    		   }); 
//	            }
//	        });
	  },	  
	  onSceenPass:function() {
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
				url : 'credit/approval4Credit!sceenPass.action',
				scope: this,
				params : { 
				 data:Ext.encode(rowids)
				}, 
				success : function(response) { 
					   App.setAlert(Ext.util.JSON.decode(response.responseText).success,Ext.util.JSON.decode(response.responseText).message);
					   store_credit.load({
						   scope: this,
						   params:{start:0,limit:20},
						   callback:function(records,options,succees){
							   var record = this.getSelectionModel().getSelected();
							   
							   if (!record){
								   store_credit_detail.load({params:{data:''}});
						       }
							   else
							   {
								   if(record!=null)
								   {
									   store_credit_detail.load({
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
	  onSceneDeny:function() {
		  var record = this.getSelectionModel().getSelected();
	        if (!record) {
	            return false;
	        }
	        this.fireEvent('doSceneDeny',this,this.store,record);
//	        var rows=this.getSelectionModel().getSelections();
//	        var rowids = [];
//	        for(var i=0;i<rows.length;i++)
//	        {
//	        	rowids.push(rows[i].get("id"));
//	        }
//	        Ext.Msg.prompt('原因', '请输入退回原因:', function(btn, text){
//	            if (btn == 'ok'){
//	    	        Ext.Ajax.request({ 
//	    				url : 'credit/approval4Credit!sceenDeny.action',
//	    				scope: this,
//	    				params : { 
//	    				 	data:Ext.encode(rowids),
//	    				 	cause:Ext.encode(text)
//	    				}, 
//	    				success : function(response) { 
//	    					   App.setAlert(Ext.util.JSON.decode(response.responseText).success,Ext.util.JSON.decode(response.responseText).message);
//	    					   store_credit.load({
//	    						   scope: this,
//	    						   params:{start:0,limit:20},
//	    						   callback:function(records,options,succees){
//	    							   var record = Ext.getCmp('OrgCompanyCreditTaskMaster').getSelectionModel().getSelected();
//	    							   
//	    							   if (!record){
//	    								   store_credit_detail.load({params:{data:''}});
//	    						       }
//	    							   else
//	    							   {
//	    								   if(record!=null)
//	    								   {
//	    									   store_credit_detail.load({
//	    								  	         params : { 
//	    								   			 	data:record.get("id")
//	    								   			 }
//	    									   });
//	    								   }
//	    								   
//	    							   }
//	    						   }
//	    					   }); 
//	    				}, 
//	    				failure : function(response) { 
//	    				   App.setAlert(false,"执行失败！"); 
//	    			    }
//	    		   }); 
//	            }
//	        });
	  } 
});

//------------------------------------------------------------------------------
//Module的RecordExpertMore内容Panel定义..
//------------------------------------------------------------------------------

com.cce.companycredit.OrgCompanyCreditTaskDetail=Ext.extend(Ext.grid.GridPanel ,{
	  id:'OrgCompanyCreditTaskDetail',
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
		    com.cce.companycredit.OrgCompanyCreditTaskDetail.superclass.initComponent.call(this);
		    Ext.getCmp('OrgCompanyCreditTaskMaster').store.reload();
		}
});

var store_credit = new Ext.data.Store({
    id: 'id',
    message: 'message',
    proxy: proxy,
    reader: reader,
    writer: writer,  // <-- plug a DataWriter into the store just as you would a Reader
    autoSave: false
  });
var store_credit_detail = new Ext.data.Store({
    id: 'id',
    message: 'message',
    proxy: proxy_detail,
    reader: reader_detail,
    writer: writer,  // <-- plug a DataWriter into the store just as you would a Reader
    autoSave: false
  });
//------------------------------------------------------------------------------
//Module的定义放在最后,eval(xxx.js)后返回Module的类定义..
//------------------------------------------------------------------------------
Ext.extend(com.cce.Module, {
	win: null,
	init: function(){

		this.master = new com.cce.companycredit.OrgCompanyCreditTaskMaster({ store : store_credit });
		this.detail= new com.cce.companycredit.OrgCompanyCreditTaskDetail({ store : store_credit_detail });
		this.frame= new com.cce.companycredit.OrgCompanyCreditTask();		
		
		
		//关联自定义事件
	    //this.relayEvents(this.store, ['destroy', 'save', 'update']);
		
		this.master.on('doedit', this.showForm, this);
		this.master.on('doNetDeny',this.showNetDenyForm,this);
		this.master.on('doSceneDeny',this.showSceneDenyCreditForm,this);
		this.master.on('rowclick', function(g, index, ev){
			this.record =g.store.getAt(index);
			store_credit_detail.load({
    			params : { 
     			 	data:this.record.get("id")
     			}
    		}); 
		}, this);
		this.frame.add(this.master);
		this.frame.add(this.detail);
		
  	this.main.add(this.frame);
  	this.main.doLayout();
  	store_credit.load({params:{start:0,limit:20}}); 
	},
	
	showNetDenyForm : function(g,store,record){
		if(!record){
			record = new store.recordType();
		}
		
		var form = new com.cce.companycredit.NetDenyCreditForm();
		this.win = new Ext.Window({
			title : '网上退回',
			closable : true,
			width : 590,
			height:300,
			constrain:true,
			plain:true,
			layout:'border',
			resizable : true,
			autoScroll : true,
			modal : true,
			items : [form]
		});
		form.loadRecord(record);
		form.on('afterSave',this.afterSave,this);
		this.win.show();
	},
	
	showSceneDenyCreditForm : function(g,store,record){
		if(!record){
			record = new store.recordType();
		}
		var form = new com.cce.companycredit.SceneDenyCreditForm();
		this.win = new Ext.Window({
			title : '现场退回',
			cloable : true,
			width : 590,
			height : 300,
			constrain : true,
			plain : true,
			layout : 'border',
			resizable : true,
			autoScroll : true,
			modal : true,
			items : [form]
		});
		form.loadRecord(record);
		form.on('afterSave',this.afterSave,this);
		this.win.show();
	},

	showForm : function(g, store, record){
		
	},

	showReForm : function(g, store, record){
		
		
	},
	
	onSave : function(fp, record){		

		
	},
	afterSave : function(fp,record){
		this.win.close();
	}
	
});
