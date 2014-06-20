Ext.ns("com.cce.companylevel");
ScriptMgr.load({ scripts: ['javascript/utils/Ext.ux.grid.Search.js']});

ScriptMgr.load({ scripts: ['javascript/utils/CheckColumn.js']});
ScriptMgr.load({ scripts: [
                           'javascript/utils/MultiSelect.js',
                           'javascript/utils/ItemSelector.js'
 ]});
//------------------------------------------------------------------------------
//Module的proxy定义..
//------------------------------------------------------------------------------
var proxy = new Ext.data.HttpProxy({
api: {
    read : 'companylevel/approvallevel!findWaitingStatusApprovalInfo.action',
    create : 'companylevel/approvallevel!save.action',
    destroy: 'companylevel/approvallevel!delete.action'
	}
});

var proxy_detail = new Ext.data.HttpProxy({
	api: {
		    read : 'companylevel/approvallevel!getDetailsBylevelId.action',
		    create : 'companylevel/approvallevel!save.action',
		    destroy: 'companylevel/approvallevel!delete.action'
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
		{name: 'entLevel',mapping:'entLevel'},
		{name: 'fileId',mapping:'fileId'},
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

var GroupRemoteProxy = new Ext.data.HttpProxy({
	 method: 'POST',
	prettyUrls: false,
	url: 'companylevel/companyLevelProcess!save.action',
	api: {
	    read : 'companylevel/companyLevelProcess!getLevelItemsByApp.action',
	    create : 'companylevel/companyLevelProcess!save.action',
	    destroy: 'companylevel/companyLevelProcess!delete.action'
	}
});

var GroupRemoteReader = new Ext.data.JsonReader({
  idProperty: 'id',
  fields: [
      {name: 'itemid', type: 'string'},
      {name: 'itemName', type: 'string'},
      {name: 'id', type: 'int'},
      {name: 'description', type: 'string'},
      {name: 'isContained', type: 'string'},
      {name: 'remark', type: 'string'}
  ],
  root:'data',
  remoteGroup:true,
  remoteSort: true
});

var searchLevelInfo = function() {
   if (!this.getForm().isValid()) {
       App.setAlert(false, "表单数据有错误.");
       return false;
   }
	Ext.getCmp('OrgCompanyLevelSearchMaster').store.load({
		params : { 
			 	data:Ext.encode(this.getForm().getValues()),
			 	start:0,limit:20
			}
	}); 
	this.fireEvent('afterSearch', this, null);
}

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
    {header:'企业分级',dataIndex:'entLevel'},
    {header:'文件下载',dataIndex:'fileId',renderer:linker},
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


var grid_view=[
				{
	                xtype: 'grid',
	                id:'ViewGroupGrid',
	                ds: new Ext.data.GroupingStore({
	                	reader: GroupRemoteReader,
	        		    writer: writer,
	                	proxy : GroupRemoteProxy,
	                    sortInfo: {field: 'id', direction: 'ASC'},
	                    autoSave: false,
	                    groupField: 'itemName'
	                }),
	                columns: [
                         {
                             id: 'description',
                             header: '说明',
                             width: 80,
                             sortable: true,
                             dataIndex: 'description'
                         },{
                             header: '类别',
                             width: 20,
                             sortable: true,
                             dataIndex: 'itemName'
                         },{
                             header: '是否符合',
                             width: 25,
                             dataIndex: 'isContained',
                             renderer : function(v){
                             	if(v==false||v=='false') return '否';
                               return '是';
                             }
                         },{
                             header: '备注',
                             width: 30,
                             dataIndex: 'remark'
                         }
                     ],

	                view: new Ext.grid.GroupingView({
	                    forceFit: true,
	                    showGroupName: false,
	                    enableNoGroups: false,
	        			enableGroupingMenu: false,
	                    hideGroupedColumn: true
	                }),
	                height: 380,
	                clicksToEdit: 1,
	                collapsible: false,
	                animCollapse: false,
	                trackMouseOver: false,
	                iconCls: 'icon-grid'
	            }
 ];



//------------------------------------------------------------------------------
//Module的company主Panel定义..
//------------------------------------------------------------------------------

com.cce.companylevel.OrgCompanyLevelTask=Ext.extend(Ext.Panel,{
	id:'OrgCompanyLevelTask',
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

com.cce.companylevel.OrgCompanyLevelTaskMaster = Ext.extend(Ext.grid.GridPanel, {
	  id:'OrgCompanyLevelTaskMaster',
	  stripeRows: true,
	  loadMask: true,
	  border: false,
	  enableHdMenu: false,
	  header:false,
	  region:'center',
	  closable:true,
	  columns:columns,
	  frame:true,
	  sm : new Ext.grid.CheckboxSelectionModel(),
	  initComponent : function() {
		    // typical viewConfig
		    this.viewConfig = {
		        forceFit: true
		    };
		
		    // build toolbars and buttons.
		    

		    this.tbar = this.buildTopToolbar();
		    this.bbar = this.buildBottomToolbar();
		    
		    
		    
		    // super
		    com.cce.companylevel.OrgCompanyLevelTaskMaster.superclass.initComponent.call(this);
		    
		    this.addEvents(
		    	'doConfig',
		    	'doTreat',
		    	'doSceenBack',
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
					text:"评审配置",
					iconCls:"config",
					scope: this,
					handler:this.onConfig
	    	};
			btnArray[1]={
					text:"处理",
					iconCls:"treat",
					scope: this,
					handler:this.onTreat
			};
			btnArray[2]={
					text:"退回",
					iconCls:"back",
					scope: this,
					handler:this.onBack
			};
			btnArray[3]={
					text:"查看",
					iconCls:"info",
					scope: this,
					handler:this.onView
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

              , disableIndexes: ['id','createDate','updateDate']//不参与查询的列名
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
	  onView:function(){
		  var record = this.getSelectionModel().getSelected();
	      if (!record) {
	            return false;
	      }
 
	      this.fireEvent('doView', this, this.store, record);
	  },
	  onConfig:function(){
		  var record = this.getSelectionModel().getSelected();
	      if (!record) {
	            return false;
	      }
 
	      this.fireEvent('doConfig', this, this.store, record);
	  },
	  onTreat:function(){
		  var record = this.getSelectionModel().getSelected();
	      if (!record) {
	            return false;
	      }
 
	      this.fireEvent('doTreat', this, this.store, record);
	  
	  },
//	  onBack:function(){
//		  var selected = this.getSelectionModel().getSelected();
//	        if (!selected) {
//	            return false;
//	        }
//	        var rows=this.getSelectionModel().getSelections();
//	        var rowids = [];
//	        for(var i=0;i<rows.length;i++)
//	        {
//	        	rowids.push(rows[i].get("id"));
//	        }
//	        Ext.Msg.prompt('原因', '请输入退回原因:', function(btn, text){
//	            if (btn == 'ok'){
//				        Ext.Ajax.request({ 
//							url : 'companylevel/approvallevel!levelBack.action',
//							scope: this,
//							params : { 
//		    				 	data:Ext.encode(rowids),
//		    				 	cause:Ext.encode(text)
//							}, 
//							success : function(response) { 
//							   var data=Ext.util.JSON.decode(response.responseText);
//	    					   App.setAlert(Ext.util.JSON.decode(response.responseText).success,Ext.util.JSON.decode(response.responseText).message);
//	    					   org_companylevel_store.load({
//	    						   scope: this,
//	    						   params:{start:0,limit:20},
//	    						   callback:function(records,options,succees){
//	    							   
//	    							   var record = Ext.getCmp('OrgCompanyLevelTaskMaster').getSelectionModel().getSelected();
//	    							   
//	    							   if (!record){
//	    								   org_companylevel_store_detail.load({params:{data:''}});
//	    						       }
//	    							   else
//	    							   {
//	    								   if(record!=null)
//	    								   {
//	    									   org_companylevel_store_detail.load({
//	    								  	         params : { 
//	    								   			 	data:record.get("id")
//	    								   			 }
//	    									   });
//	    								   }
//	    								   
//	    							   }
//	    							   
//	    							    
//	    						   }
//	    					   });
//							   
//							}, 
//							failure : function(response) { 
//							   App.setAlert(false,"提交失败！"); 
//						    }
//					   });
//				}
//	        });
//	      
//	  }
	  onBack:function(){
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
var reader_level = new Ext.data.JsonReader(
		{root:'data'},
		[ 
	    	{name: 'itemid',mapping:'itemid'},
	    	{name: 'itemName',mapping:'itemName'},
	    	{name: 'description',mapping:'description' },
	        {name: 'isContained',mapping:"isContained" },
	    	{name: 'remark',mapping:'remark'} 
 
		]
	);
var proxy_level=new Ext.data.HttpProxy({
	api:{
	read:'companylevel/levelInfo!getinfo.action'
}
});

var info_detail = [
{header: '编号',dataIndex:'itemid'},
{header: '名称',dataIndex:'itemName'},
{header: '说明',dataIndex:'description'} ,//{name: 'levelItems',mapping:'levelItems'},
{header: '是否符合',dataIndex: 'isContained',renderer : function(v){
	if(v==false||v=='false') return '否';
  return '是';
} },
{header:'描述',dataIndex:'remark'} 
  	                 ];
var store_level_checked = new Ext.data.Store({
    id: 'id',
    message: 'message',
    proxy: proxy_level, //proxy_level
    reader: reader_level,
    writer: writer,  // <-- plug a DataWriter into the store just as you would a Reader
    autoSave: false
});
com.cce.companylevel.OrgCompanyLevelInfoDetail=Ext.extend(Ext.grid.GridPanel ,{
	  title:'分级信息',
	  id:'OrgCompanyLevelInfoDetail',
	  stripeRows: true,
	  loadMask: true,
	  border: false,
	  enableHdMenu: false,
	  header:false,
	  region:'south',
	  closable:true,
	  height:260,
	  split:true,
	  columns:info_detail,
	  frame:true,
	  initComponent : function() {
		    // typical viewConfig
		    this.viewConfig = {
		        forceFit: true
		    };
		    // super
		    com.cce.companylevel.OrgCompanyLevelInfoDetail.superclass.initComponent.call(this);
		    
		}
		
});
com.cce.companylevel.OrgCompanyLevelTaskDetail=Ext.extend(Ext.grid.GridPanel ,{
	  title:'审批历史',
	  id:'OrgCompanyLevelTaskDetail',
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
		    com.cce.companylevel.OrgCompanyLevelTaskDetail.superclass.initComponent.call(this);
		    
		}
		
});

com.cce.companylevel.OrgCompanyLevelTaskConfigForm = Ext.extend(Ext.form.FormPanel, {
	title: '定制评审步骤',
    record : null,
    available : null,
    obtained : null,
    groupid:null,
	modal:true,
	iconCls: 'silk-user',
	labelAlign: 'right',
	labelWidth: 65,
	header: false,
	frame: true,
	region:'center',
	defaultType:'textfield',
	defaults: {
	      anchor: '100%'
	},
	   
	initComponent : function() {
		
			var companylevel_Store=new Ext.data.Store({
				url:"companylevel/approvallevel!getReviewGroupListBox.action",
				reader: new Ext.data.JsonReader({ 
					root:'data',
					fields:['groupId','groupName']
				}),
				autoLoad:true,			 
				listeners:{
					scope:this,
                    load:function (){
							if(this.groupid!=null&&this.groupid!="")
							{
								Ext.getCmp('ReviewGroup_Combo').setValue(this.groupid);
							}
							
					}
				}
	
			});
			
			this.ReviewGroup_Combo = new Ext.form.ComboBox({
				id:'ReviewGroup_Combo',
				fieldLabel:"分组列表",
				hiddenName:'groupId',
				triggerAction:'all',
				editable:false,
				store:companylevel_Store,
				displayField:'groupName',
				valueField:'groupId',
				allowBlank:false,
				anchor : '100%'
			});
			
			
			//var Optional_step_data=[['1','基本资质'],['2','环境和建设'],['3','设施和设备'],['4','屠宰加工'],['5','屠宰检验'],['6','卫生控制'],['7','运输条件'],['8','产品质量']];
			
//			this.Optional_step_store = new Ext.data.SimpleStore({
//				url:"companylevel/approvallevel!getReviewGroupListBox.action",
//				reader: new Ext.data.JsonReader({ 
//					root:'data',
//					fields:['id','text']
//				}),
//				autoLoad:true
//	        });
			
			this.Select_step_store = new Ext.data.SimpleStore({
	            fields: ['id', 'text'],
	            data : []
	        });
			
			// build the form-fields.  Always a good idea to defer form-building to a method so that this class can
		    // be over-ridden to provide different form-fields
		    this.items = this.buildForm();
		    // build form-buttons
		    this.buttons = this.buildUI();
		    // add a create event for convenience in our application-code.
		    this.addEvents('closeConfigWindow');
		    // super
		    com.cce.companylevel.OrgCompanyLevelTaskConfigForm.superclass.initComponent.call(this);
	 },
	 
	 /**
	   * buildform
	   * @private
	   */
	  buildForm : function() {
	  		var hiddenId = new Ext.form.Hidden({name:"id"});
	      	return [
				{fieldLabel: '企业名称', name: 'entName', allowBlank: false,readOnly:true},
				this.ReviewGroup_Combo,
				{
					xtype: 'itemselector',
					name: 'steps',
					fieldLabel: '评审步骤',
					imagePath: 'js/ext/ux/images',
					multiselects: [{
						legend:"未选步骤",
						store: this.available,
						width: 200,
						height: 200,
						valueField: 'id',
						displayField: 'value'
					},{
						legend:"已选步骤",
						store: this.obtained,
						width: 200,
						height: 200,
						valueField: 'id',
						displayField: 'value'
					}]
				},
				hiddenId
			];
	  },
	  buildUI : function(){
	      return [{
				text:"保存",
				scope: this,
				handler:this.onSaveConfig
		  	}, {
	          text: '关闭',
	          handler: function(btn, ev){
		  		this.fireEvent('closeConfigWindow', this.closeConfigWindow,null);
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
	  onSaveConfig : function(btn, ev) {
		  	//Ext.Msg.alert('Submitted Values', this.getForm().getValues(true));

			  if (this.record == null) {
			      return;
			  }
			  if (!this.getForm().isValid()) {
			      App.setAlert(false, "表单数据有错误.");
			      return false;
			  }
			  
			  var MyRecord = Ext.data.Record.create([
				  {name:'entName'},
				  {name:'levelId'},
				  {name:'stepLevel'}
				  
			  ]);
			  
			  this.getForm().loadRecord(MyRecord);
			  
			  
			  Ext.Ajax.request({ 
					url : 'companylevel/approvallevel!saveConfigInfo.action',
					scope: this,
					params : { 
					 data:Ext.encode(this.getForm().getValues())
					}, 
					success : function(response) { 
						
					   var data=Ext.util.JSON.decode(response.responseText);
					   App.setAlert(true,data.message);   
					   
					   org_companylevel_store.load({
						   scope: this,
						   params:{start:0,limit:20},
						   callback:function(records,options,succees){
							   var record = Ext.getCmp('OrgCompanyLevelTaskMaster').getSelectionModel().getSelected();
							   
							   if (!record){
								   org_companylevel_store_detail.load({params:{data:''}});
						       }
							   else
							   {
								   if(record!=null)
								   {
									   org_companylevel_store_detail.load({
								  	         params : { 
								   			 	data:record.get("id")
								   			 }
									   });
								   }
								   
							   }
							   
						   }
					   });
					   
				 
					   
					   this.fireEvent('closeConfigWindow', this, this.record);
					   
					}, 
					failure : function(response) { 
					   App.setAlert(false,"提交失败！"); 
				    }
			   }); 
			  

			  
		    
	  }
});


com.cce.companylevel.OrgCompanyLevelTaskTreatForm = Ext.extend(Ext.form.FormPanel, {
	title: '评审处理',
	record : null,
	modal:true,
	iconCls: 'silk-user',
	labelAlign: 'right',
	labelWidth: 65,
	header: false,
	frame: true,
	region:'center',
	defaultType:'textfield',
	defaults: {
	      anchor: '100%'
	},
	initComponent : function() {
		
		
		
		this.proxy_treat = new Ext.data.HttpProxy({
			api: {
				    read : 'companylevel/approvallevel!getTreatStep.action',
				    create : 'companylevel/approvallevel!seveTreatData.action',			    
				    update: 'companylevel/approvallevel!seveTreatData.action'
				 }
		});
		
		this.reader_treat = new Ext.data.JsonReader(
				{root:'data'},
				[ 
				 		{name:'id',mapping:'id'},
				    	{name: 'stepValue',mapping:'stepValue'},
				    	{name: 'status',mapping:'status'}
				    	
				]
	   );
		
		var checkColumn = new Ext.grid.CheckColumn({
		       header: '是否通过',
		       dataIndex: 'status',
		       width: 55
		});
		
	   this.Writer_treat = new Ext.data.JsonWriter({
			   encode: true,
			   writeAllFields: false
	   });
	   this.store_treat = new Ext.data.Store({
		    id: 'id',
		    message: 'message',
		    proxy: this.proxy_treat,
		    reader: this.reader_treat,
		    writer:this.Writer_treat,
		    autoSave: false
		    
	   });
	   
	   
		
	   this.columns = [
		      new Ext.grid.RowNumberer({width: 30}),
		      {header:'名称', dataIndex:'stepValue', sortable:true,width: 400},
		      checkColumn		      
		 ];
		
		this.grid = new Ext.grid.EditorGridPanel({
			
			store: this.store_treat,
			width: 500,
	        height: 300,
	        frame: true,
	        plugins: checkColumn,
	        clicksToEdit: 1,
	        columns:this.columns   
	        
			
		});
		
		this.store_treat.load({
			params:{
   				data:Ext.encode(this.record.get('id'))
   			}
		});
		
		// build the form-fields.  Always a good idea to defer form-building to a method so that this class can
	    // be over-ridden to provide different form-fields
	    this.items = this.buildForm();
	    // build form-buttons
	    this.buttons = this.buildUI();
	    // add a create event for convenience in our application-code.
	    this.addEvents('closeTreatWindow');
	    // super
	    com.cce.companylevel.OrgCompanyLevelTaskTreatForm.superclass.initComponent.call(this);
		
		
	},
	buildForm : function() {
		var hiddenId = new Ext.form.Hidden({name:"id",id:'id'});
		return [
		
		        {fieldLabel: '企业名称', id:'entName',name: 'entName', allowBlank: false,readOnly:true},
		        hiddenId,
		        this.grid
		];
		
	
	},
	buildUI : function(){
		return [{
			text:"提交",
			scope: this,
			handler:this.onTreat
	  	}, {
          text: '关闭',
          handler: function(btn, ev){
	  		this.fireEvent('afterStat', this, null);
          },
          scope: this
       }];
	},
	loadRecord : function(rec) {
		this.record = rec;
	    this.getForm().loadRecord(this.record);
	},
	onTreat : function(btn, ev) {
		
		if (this.record == null) {
		      return;
		}
		if (!this.getForm().isValid()) {
		      App.setAlert(false, "表单数据有错误.");
		      return false;
		}
		
		var rowsData = []; 
		
		var count = this.store_treat.getCount(); 
		
		var record; 
		
		for (var i = 0; i < count; i++) { 
			record = this.store_treat.getAt(i); 
			if (record.dirty) { 
				rowsData.push(record.data); 
			} 
		} 

		
		 
		
		 var date={
        		  'entName':this.get('entName').getValue(),
        		  'id':this.get('id').getValue(),
        		  'steps':rowsData
		 		
         };
		 
		 Ext.Ajax.request({ 
				url : 'companylevel/companyLevelProcess!processFlowData.action',
				scope: this,
				params : { 
				 data:Ext.encode(date)
				}, 
				success : function(response) { 
					
					 var data=Ext.util.JSON.decode(response.responseText);	
					 
					 App.setAlert(data.success,data.message);
					 
					 org_companylevel_store.load({
						   scope: this,
						   params:{start:0,limit:20},
						   callback:function(records,options,succees){
							   var record = Ext.getCmp('OrgCompanyLevelTaskMaster').getSelectionModel().getSelected();
							   
							   if (!record){
								   org_companylevel_store_detail.load({params:{data:''}});
						       }
							   else
							   {
								   if(record!=null)
								   {
									   org_companylevel_store_detail.load({
								  	         params : { 
								   			 	data:record.get("id")
								   			 }
									   });
								   }
								   
							   }
							   
						   }
					   });
					 
					 
					 
					 this.fireEvent('closeTreatWindow', this, this.record);
				   
				}, 
				failure : function(response) { 
				   App.setAlert(false,"提交失败！"); 
			    }
		   }); 
		
		//this.store_treat.save();
		
	}
});

com.cce.companylevel.ViewLevelInfoForm = Ext.extend(Ext.form.FormPanel, {
	title: '企业分级',
	modal:true,
	iconCls: 'silk-user',
	labelWidth: 100,
	width: 500,
	height: 529,
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
	    this.items = grid_view;
	
	    // build form-buttons
	    this.buttons = this.buildUI();

	    this.addEvents({
	        afterSave : true
	    });
	
	    // super
	    com.cce.companylevel.ViewLevelInfoForm.superclass.initComponent.call(this);
	},
	
	
	buildUI : function(){
	    return [{
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
	    Ext.getCmp('ViewGroupGrid').store.load({
			params : { 
 			 	data:this.record.get("id")
 			}
		}); 
	},
	
	/**
	 * onUpdate
	 */
	onSave : function(btn, ev) {
	    if (this.record == null) {
	        return;
	    }
	    if (!this.getForm().isValid()) {
	        App.setAlert(false, "表单数据有错误.");
	        return false;
	    }
	    var theStore=Ext.getCmp('ViewGroupGrid').store;
		theStore.save();
		this.fireEvent('afterSave', this, null);
	}

});

var org_companylevel_store = new Ext.data.Store({
    id: 'id',
    message: 'message',
    proxy: proxy,
    reader: reader,
    writer: writer,  // <-- plug a DataWriter into the store just as you would a Reader
    autoSave: false
});	
var org_companylevel_store_detail = new Ext.data.Store({
    id: 'id',
    message: 'message',
    proxy: proxy_detail,
    reader: reader_detail,
    writer: writer,  // <-- plug a DataWriter into the store just as you would a Reader
    autoSave: false
});	
com.cce.companylevel.OrgCompanyLevelTaskSceenBackForm = Ext.extend(Ext.form.FormPanel, {
	
	title: '退回原因',
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
	    		
	    	'doSceenBack',
	    	'doReload',
	        'afterSave' 
	    	
	    );
	
	    // super
	    com.cce.companylevel.OrgCompanyLevelTaskSceenBackForm.superclass.initComponent.call(this);
	
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
	
	
	
   ];
  
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
      
      var selected = Ext.getCmp('OrgCompanyLevelTaskMaster').getSelectionModel().getSelected();
      if (!selected) {
            return false;
      }
      
      var rows=Ext.getCmp('OrgCompanyLevelTaskMaster').getSelectionModel().getSelections();
      var rowids = [];
      for(var i=0;i<rows.length;i++)
      {
        	rowids.push(rows[i].get("id"));
      }
      
//      var data={
//    		  'id':rowids,
//    		  'comment':Ext.getCmp('comment').getValue()
//      }; 
      Ext.Ajax.request({ 
    	  
			url : 'companylevel/approvallevel!levelBack.action',
			scope: this,
			 
			params : { 
			 	data:Ext.encode(rowids),
			 	cause:Ext.getCmp('comment').getValue()
			}, 
			
			success : function(response) { 
			   var data=Ext.util.JSON.decode(response.responseText);
			   App.setAlert(Ext.util.JSON.decode(response.responseText).success,Ext.util.JSON.decode(response.responseText).message);
			   org_companylevel_store.load({
				   scope: this,
				   params:{start:0,limit:20},
				   callback:function(records,options,succees){
					   var record = Ext.getCmp('OrgCompanyLevelTaskMaster').getSelectionModel().getSelected();
					   
					   if (!record){
						   org_companylevel_store_detail.load({params:{data:''}});
				       }
					   else
					   {
						   if(record!=null)
						   {
							   org_companylevel_store_detail.load({
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
      this.fireEvent('afterSave', this, null);
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
		autoScroll : false,
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
		
		this.master = new com.cce.companylevel.OrgCompanyLevelTaskMaster({ store :org_companylevel_store});
		this.detail= new com.cce.companylevel.OrgCompanyLevelTaskDetail({ store : org_companylevel_store_detail });
		 this.level=new com.cce.companylevel.OrgCompanyLevelInfoDetail({store:store_level_checked});
		this.frame= new com.cce.companylevel.OrgCompanyLevelTask();		
		
		
		//关联自定义事件
	    //this.relayEvents(this.store, ['destroy', 'save', 'update']);
		
		this.master.on('doConfig', this.showConfigForm, this);
		this.master.on('doTreat', this.showTreatForm, this);
		this.master.on('doView', this.showViewForm, this);
		this.master.on('doSceenBack', this.showSceenBackForm, this);
		this.master.on('rowclick', function(g, index, ev){
			this.record =g.store.getAt(index);
			org_companylevel_store_detail.load({
    			params : { 
     			 	data:this.record.get("id")
     			}
    		}); 
			store_level_checked.load({
    			params : { 
     			 	data:this.record.get("id")
     			}
    		}); 
		}, this);
		this.frame.add(this.master);
		this.frame.add(this.tabPanel);
	 	this.tabPanel.add(this.level);
		this.tabPanel.add(this.detail);
		
  	this.main.add(this.frame);
  	this.main.doLayout();
  	org_companylevel_store.load({params:{start:0,limit:20}}); 
	},
	showSceenBackForm:function(g, store, record){
		if(!record){
	        record = new store.recordType();
		}
		
		var form = new com.cce.companylevel.OrgCompanyLevelTaskSceenBackForm();
		
		this.win = new Ext.Window({
		    title: '退回',
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
	showConfigForm : function(g, store, record){
		
		if(!record){
	        record = new store.recordType({
	        	 
	        });
		}
		Ext.Ajax.request({
			async:false,
			url : 'companylevel/approvallevel!getLevelTemplateName.action',
			scope:this,
			params : { data : record.id?record.id: null },
			success: function(response, opts) {
				var json = Ext.util.JSON.decode(response.responseText);
		  		this.available = new Ext.data.ArrayStore({ data: json.available, fields: ['id', 'value'] });
		  		this.obtained = new Ext.data.ArrayStore({ data: json.obtained, fields: ['id', 'value'] });
			},
			failure : function(response, opts) {
				App.setAlert(false, "服务器通信错误,请重试.");
				return false;
			}
		});
		 
		Ext.Ajax.request({
			async:false,
			url : 'companylevel/approvallevel!getTeamId.action',
			scope:this,
			params : { data : record.id?record.id: null },
			success: function(response, opts) {
				var json = Ext.util.JSON.decode(response.responseText);
		 
				
				this.gid=json.data;
		  		 	
			},
			failure : function(response, opts) {
				App.setAlert(false, "服务器通信错误,请重试.");
				return false;
			}
		});
		
		var form = new com.cce.companylevel.OrgCompanyLevelTaskConfigForm({
			record:record,
			available: this.available,
			obtained: this.obtained,
			groupid:this.gid
		});
		
		form.on('closeConfigWindow', this.closeConfigWindow, this);
		
		
		
		form.loadRecord(record);
		
		this.winConfig = new Ext.Window({
		    title: '定制评审步骤',
		    closable:true,
		    width:540,
		    height:350,
		    constrain:true,
		    plain:true,
		    modal:true,
		    resizable:true,
		    layout: 'border',
		    items: [form]
		});
		this.winConfig.show();
		
	},

	showTreatForm : function(g, store, record){
		if(!record){
	        record = new store.recordType({
	        	 
	        });
		}
		var form = new com.cce.companylevel.OrgCompanyLevelTaskTreatForm({
			record:record
		});
		
		form.on('closeTreatWindow', this.closeTreatWindow, this);
		form.loadRecord(record);
		
		this.win = new Ext.Window({
		    title: '处理评审',
		    closable:true,
		    width:540,
		    height:420,
		    constrain:true,
		    plain:true,
		    modal:true,
		    resizable:true,
		    layout: 'border',
		    items: [form]
		});
		this.win.show();
		form.on('afterStat', this.afterStat, this);
		
		
	},
	afterStat : function(fp, record){
        this.win.close();
	},
	afterSave:function(fp, record){
		this.win.close();
	},
	showViewForm:function(g, store, record){
 
		
		if(!record){
	        record = new store.recordType();
		}
		var form = new com.cce.companylevel.ViewLevelInfoForm();
		this.editWin = new Ext.Window({
		    title: '查看分级信息',
		    closable:true,
		    width:580,
		    height:505,
		    constrain:true,
		    plain:true,
		    layout: 'border',
		    modal:true,
		    resizable:true,
		    autoScroll: true,
		    items: [form]
		});
		form.on('afterSearch', this.afterSearch, this);
 
		form.loadRecord(record);		
		this.editWin.show();
	},
	afterSearch:function(){
		this.editWin.close();
	},
	closeConfigWindow:function(){
		this.winConfig.close();
	},
	closeTreatWindow:function(){
		this.win.close();
	},
	onSaveConfig : function(fp, record){		

		
	},
	onSaveTreat : function(fp,record){
		
	}
	
});
