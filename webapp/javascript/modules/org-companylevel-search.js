Ext.ns("com.cce.companylevel");

ScriptMgr.load({ scripts: ['javascript/utils/FormTableLayout.js']});
//------------------------------------------------------------------------------
//Module的proxy定义..
//------------------------------------------------------------------------------
var proxy = new Ext.data.HttpProxy({
	api: {
	    read : 'companylevel/approvallevel!findApprovalByCriterial.action',
	    create : 'companylevel/approvallevel!save.action',
	    update: 'companylevel/approvallevel!save.action',
	    destroy: 'companylevel/approvallevel!delete.action'
		}
	});

var proxy_detail = new Ext.data.HttpProxy({
	api: {
		    read : 'companylevel/approvallevel!getDetailsByApprovalId.action',
		    create : 'companylevel/approvallevel!save.action',
		    destroy: 'companylevel/approvallevel!delete.action'
		}
	});
var proxy_full = new Ext.data.HttpProxy({
	api: {
		    read : 'companylevel/approvallevel!getProcessByLevelId.action'
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
			{name: 'entNo',mapping:'entNo'},
			{name: 'fileId',mapping:'fileId'},
		    {name: 'createDate',mapping:"createDate",type:'date',dateFormat:'time'},
		    {name: 'updateDate',mapping:"updateDate",type:'date',dateFormat:'time'},
			{name: 'status',mapping:'status'}
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
var reader_full = new Ext.data.JsonReader(
		{root:'data'},
		[ 
		    	{name: 'id',mapping:"id"},
		    	{name: 'teamName',mapping:'teamName'},
		    	{name: 'stepName',mapping:'stepName'} ,
		    	{name: 'step',mapping:'step'} 
		]
	);
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
	read:'companylevel/levelInfo!get.action'
}
});

var columns_level_checked = [
{header: '编号',dataIndex:'itemid'},
{header: '名称',dataIndex:'itemName'},
{header: '说明',dataIndex:'description'} ,//{name: 'levelItems',mapping:'levelItems'},
{header: '是否符合',dataIndex: 'isContained',renderer : function(v){
	if(v==false||v=='false') return '否';
  return '是';
} },
{header:'描述',dataIndex:'remark'} 
  	                 ];
com.cce.companylevel.orgLevelPanel=Ext.extend(Ext.grid.GridPanel,{
	 title:'分级信息',
	 id:'orgLevelPanel',
	 stripeRows: true,
	  loadMask: true,
	  border: false,
	  enableHdMenu: false,
	  header:false,
	  region:'south',
	  closable:true,
	  height:260,
	  split:true,
	  columns:columns_level_checked,
	  frame:true,
	  initComponent : function() {
		    this.viewConfig = {
		        forceFit: true
		    };
		    com.cce.companylevel.orgLevelPanel.superclass.initComponent.call(this);
}
});
	var GroupRemoteProxy = new Ext.data.HttpProxy({
		 method: 'POST',
		prettyUrls: false,
		url: 'companylevel/companyLevelProcess!save.action',
		api: {
		    read : 'companylevel/companyLevelProcess!getLevelItems.action',
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

//------------------------------------------------------------------------------
//Module的columns定义..
//------------------------------------------------------------------------------
function linker(val){
	if(val&&val!="")
	return "<a title='点击下载' target='_blank' href='upload/download.action?id="+val+"'>↓下载</a>";  
	else return "";
}  

function status(val){
	if(val&&val!="")
	for(var i=0;i<DICT_APPROVE_STATUS.length;i++)
	{
		if(val==DICT_APPROVE_STATUS[i][1]) return DICT_APPROVE_STATUS[i][2];
	}
	return ""; 
}  

var columns = [
               {header:'企业名',dataIndex:'entName'},
               {header:'税务登记号',dataIndex:'entNo'},
               {header:'企业分级',dataIndex:'entLevel'},
               {header:'文件下载',dataIndex:'fileId',renderer:linker},
	           {header:'创建日期',dataIndex:'createDate',renderer:Ext.util.Format.dateRenderer('Y年m月d日 H时i分s秒'),sortable:true},
	           {header:'最后更新日期',dataIndex:'updateDate',renderer:Ext.util.Format.dateRenderer('Y年m月d日 H时i分s秒'),sortable:true},
               {header:'状态',dataIndex:'status'}
           ];

var columns_detail = [
  {header:'操作人',dataIndex:'createBy'},
  {header:'角色',dataIndex:'role'},
  {header:'操作',dataIndex:'operate'},
  {header:'日期',dataIndex:'createDate',renderer:Ext.util.Format.dateRenderer('Y年m月d日 H时i分s秒'),sortable:true},
  {header:'备注',dataIndex:'comment'}
];

var full_detail=[
                 {header:'审查组',dataIndex:'teamName'},
                 {header:'评审步骤',dataIndex:'stepName'},
                 {header:'评审结果',dataIndex:'step'}
                  
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

com.cce.companylevel.OrgCompanyLevelSearch=Ext.extend(Ext.Panel,{
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

com.cce.companylevel.OrgCompanyLevelSearchMaster = Ext.extend(Ext.grid.GridPanel, {
	id:'OrgCompanyLevelSearchMaster',  
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
		    com.cce.companylevel.OrgCompanyLevelSearchMaster.superclass.initComponent.call(this);
		    
		    this.addEvents(
		    	'doedit',
		    	'doAll'
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
		}
//		,
//		{
//			text:"查看",
//			iconCls:"company_level_show",
//			scope: this,
//			handler:this.onView
//	}
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
	
	  /**
	   * onAdd
	   */
	  onAll:function(){
		  
		  this.fireEvent('doAll', this, this.store, null);
		  
	  },
	  onSearch : function() {
	      this.fireEvent('doSearch', this, this.store, null);
	  },
	  onView : function(){
		  var record = this.getSelectionModel().getSelected();
	      if (!record) {
	            return false;
	      }
	      this.fireEvent('doView', this, this.store, record);
	  }
});
com.cce.companylevel.OrgCompanyLevelContent=Ext.extend(Ext.grid.GridPanel,{
	title: '评审信息',
	  stripeRows: true,
	  loadMask: true,
	  border: false,
	  enableHdMenu: false,
	  header:false,
	  region:'south',
	  closable:true,
	  height:260,
	  split:true,
	  columns:full_detail,
	  frame:true,
	  initComponent : function() {
		    // typical viewConfig
		    this.viewConfig = {
		        forceFit: true
		    };
		    // super
		    com.cce.companylevel.OrgCompanyLevelContent.superclass.initComponent.call(this);
		    
		}
});
//------------------------------------------------------------------------------
//Module的RecordExpertMore内容Panel定义..
//------------------------------------------------------------------------------

com.cce.companylevel.OrgCompanyLevelSearchDetail=Ext.extend(Ext.grid.GridPanel ,{
	  title: '审批历史',
	  id:'OrgCompanyLevelSearchDetail',
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
		    com.cce.companylevel.OrgCompanyLevelSearchDetail.superclass.initComponent.call(this);
		    
		}
		
});


com.cce.companylevel.CompanyLevelForm = Ext.extend(Ext.form.FormPanel, {
	title: '分级查询',
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
	        anchor: '100%',
	        editable:       false,
	        colspan:2
		});
		
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
	    com.cce.companylevel.CompanyLevelForm.superclass.initComponent.call(this);
	    
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
				            xtype: 'textfield',
				            fieldLabel: '企业名称',
						    anchor: '100%',
						    colspan:2,
				            id:'entName',
				            name:'entName'
				        },
				        this.status_combo,
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
            				scope: this,
                            xtype:          'combo',
                            mode:           'local',
                            emptyText:'请选择企业级别',
						    anchor: '100%',
						    colspan:2,
                            triggerAction:  'all',
                            forceSelection: true,
                            editable:       false,
                            fieldLabel:     '企业级别',
                            name:           'entLevel',
                            hiddenName:     'entLevel',
                            id        :     'entLevel-s',
                            displayField:   'name',
                            valueField:     'value',
                            store:          new Ext.data.JsonStore({
                                fields : ['name', 'value'],
                                data   : [
                                    {name : '一级',   value: '1'},
                                    {name : '二级',  value: '2'},
                                    {name : '三级', value: '3'},
                                    {name : '四级', value: '4'},
                                    {name : '五级', value: '5'}
                                ]
                            })
				        },
						this.regionTree,
						this.regionTree.hiddenRegionId
				    ]
  },  
 
  buildUI : function(){
      return [{
			text:"查询",
			scope: this,
			handler:this.searchLevelInfo
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
  searchLevelInfo : function(){
	  if (this.record == null) {
          return;
      }
      if (!this.getForm().isValid()) {
          App.setAlert(false, "表单数据有错误.");
          return false;
      }
      this.fireEvent('doSearchForm', this, this.record);
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
      this.fireEvent('save', this, this.record);
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
		this.store = new Ext.data.Store({
		    id: 'id',
		    message: 'message',
		    proxy: proxy,
		    reader: reader,
		    writer: writer,  // <-- plug a DataWriter into the store just as you would a Reader
		    autoSave: false
		  });
		this.store.on("beforeload", function(thiz, options) {
	 		thiz.baseParams["data"] = searchParams;
		});
		this.store_detail = new Ext.data.Store({
		    id: 'store_detail',
		    message: 'message',
		    proxy: proxy_detail,
		    reader: reader_detail,
		    writer: writer,  // <-- plug a DataWriter into the store just as you would a Reader
		    autoSave: false
		  });
		this.store_full = new Ext.data.Store({
		    id: 'store_full',
		    message: 'message',
		    proxy: proxy_full,
		    reader: reader_full,
		    writer: writer,  // <-- plug a DataWriter into the store just as you would a Reader
		    autoSave: false
		  });
		this.store_level_checked = new Ext.data.Store({
		    id: 'store_level_checked',
		    message: 'message',
		    proxy: proxy_level, //proxy_level
		    reader: reader_level,
		    writer: writer,  // <-- plug a DataWriter into the store just as you would a Reader
		    autoSave: false
		});
		this.master = new com.cce.companylevel.OrgCompanyLevelSearchMaster({ store : this.store });
		this.level=new com.cce.companylevel.orgLevelPanel({store:this.store_level_checked});
		this.detail= new com.cce.companylevel.OrgCompanyLevelSearchDetail({ store : this.store_detail });
		this.full=new com.cce.companylevel.OrgCompanyLevelContent({store:this.store_full});
		this.frame= new com.cce.companylevel.OrgCompanyLevelSearch();		
		
		
		//关联自定义事件
	    //this.relayEvents(this.store, ['destroy', 'save', 'update']);

		this.master.on('doSearch', this.showSearchForm, this);
		this.master.on('doAll', this.onAllData, this);
		this.master.on('doView', this.viewLevelForm, this);
		this.master.on('rowclick', function(g, index, ev){
			this.record =g.store.getAt(index);
			this.store_detail.load({
    			params : { 
     			 	data:this.record.get("id")
     			}
    		}); 
		   this.store_full.load({
    			params : { 
     			 	data:this.record.get("id")
     			}
    		});
			this.store_level_checked.load({
    			params : { 
     			 	data:this.record.get("id")
     			}
    		});
		}, this);
		
		this.frame.add(this.master);
		this.frame.add(this.tabPanel);
		this.tabPanel.add(this.level);
		
  	this.main.add(this.frame);
  	this.main.doLayout();
  	this.tabPanel.add(this.full);
	this.tabPanel.add(this.detail);
  	this.store.load({params:{start:0,limit:20}}); 
	},
	viewLevelForm : function(g, store, record){
		if(!record){
	        record = new store.recordType();
		}
		var form = new com.cce.companylevel.ViewLevelInfoForm();
		this.win = new Ext.Window({
		    title: '查看分级信息',
		    closable:true,
		    width:580,
		    height:505,
		    constrain:true,
		    plain:true,
		    layout: 'border',
		    resizable:true,
		    autoScroll: true,
		    modal:true,
		    items: [form]
		});
		form.on('afterSearch', this.afterSearch, this);
 
		form.loadRecord(record);		
		this.win.show();
	},
	showSearchForm : function(g, store, record){
		if(!record){
	        record = new store.recordType();
		}
		var form = new com.cce.companylevel.CompanyLevelForm();
		form.on('afterSearch', this.afterSearch, this);
		form.on('doSearchForm',this.onSelect,this);
		this.win = new Ext.Window({
		    title: '分级查询',
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
		form.get('entLevel-s').setValue(entLevel);
		form.get('status').setValue(status);
		
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
		
		entLevel= fp.get('entLevel-s').getValue();
		
		if(entLevel!=""){
			data.push('entLevel',entLevel);
		}
		
	    status = fp.get('status').getValue();
		
		if(status!=""){
			data.push('status',status);
		}
		 
		searchParams=Ext.encode({
			'beginDate':startdate,
			'endDate':enddate,
			'regionId':region_id,
			'entname':entname,
			'entLevel':entLevel,
			'status':status
		});	 
		 
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
			'entname':'',
			'entLevel':'',
			'status':''
		});
		 
		//查询
		 this.store.load({
				params:{
					start:0,
				    limit:20
				}
		 });
	},
	afterSearch : function(fp, record){
        this.win.close();
	}
});

var startdate="";
var enddate="";
var region_id="";
var entname="";
var entLevel="";
var status="";
var searchParams=Ext.encode({
	'beginDate':'',
	'endDate':'',
	'regionId':'',
	'entname':'',
	'entLevel':'',
	'status':''
});