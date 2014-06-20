Ext.ns("com.cce.record");

ScriptMgr.load({ scripts: ['javascript/utils/Ext.ux.grid.Search.js']}); //查询插件

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
		{name: 'companyInfo_nameCN',mapping:'companyInfo.nameCN'},
		{name: 'companyInfo_taxCert',mapping:'companyInfo.taxCert'},
		{name: 'companyInfo_orgCode',mapping:'companyInfo.orgCode'},
		{name: 'createDate',mapping:"createDate",type:'date',dateFormat:'time'},
		{name: 'companyInfo_status',mapping:'cstatus'},
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

var writer_detail = new Ext.data.JsonWriter({
	encode: true,
	writeAllFields: false
});

//------------------------------------------------------------------------------
//Module的columns定义..
//------------------------------------------------------------------------------
var columns = [
 new Ext.grid.CheckboxSelectionModel(),
	{header:'企业名称',dataIndex:'companyInfo_nameCN'},
	{header:'税务登记号',dataIndex:'companyInfo_taxCert'},
	{header:'创建日期',dataIndex:'createDate',renderer:Ext.util.Format.dateRenderer('Y年m月d日 H时i分s秒'), sortable:true},
	{header:'最后更新日期',dataIndex:'updateDate',renderer:Ext.util.Format.dateRenderer('Y年m月d日 H时i分s秒'), sortable:true},
	{header:'状态',dataIndex:'companyInfo_status',renderer:function(value){if(value=='1') {return "待批";} else if(value=='2'){return "通过";} else if(value=='3'){return "退回";}else {return "未通过";}}}
];

var columns_detail = [
 new Ext.grid.CheckboxSelectionModel(),
   {header:'操作人',dataIndex:'createBy'},
   {header:'角色',dataIndex:'role'},
   {header:'操作',dataIndex:'type'},
   {header:'日期',dataIndex:'createDate',renderer:Ext.util.Format.dateRenderer('Y年m月d日 H时i分s秒'), sortable:true},
   {header:'备注',dataIndex:'comment'}
];


//------------------------------------------------------------------------------
//Module的FilingApprovalMain主Panel定义..
//------------------------------------------------------------------------------

com.cce.record.FilingApprovalMain=Ext.extend(Ext.Panel,{
	id:'filing-approval-main',
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

com.cce.record.FilingApprovalGrid = Ext.extend(Ext.grid.GridPanel, {
	  id:'com.cce.record.FilingApprovalGrid',
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
		    com.cce.record.FilingApprovalGrid.superclass.initComponent.call(this);
		    
		    this.addEvents(
		    	'doedit'
		    );
		},
		
	  buildTopToolbar : function() {
//		 return [
//			 new Ext.Toolbar.Fill(),
//			 ' '
//		 ]
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
//	  plugins: [new Ext.ux.grid.Search({
//
//    		iconCls: false
//
//        , showSelectAll: false
//
//        , dateFormat: 'm/d/Y'
//
//        , position: 'top'
//
//        , searchText: '搜索'
//
//        , disableIndexes: ['id','createDate','updateDate']//不参与查询的列名
//
//        , minLength: 1
//
//	  })],
	  /**
	   * onAdd
	   */
	  onAdd : function() {
	      this.fireEvent('doedit', this, this.store, null);
	  },
	  onEdit : function(){
		  var record = this.getSelectionModel().getSelected();
	      if (!record) {
	            return false;
	      }
	      this.fireEvent('doedit', this, this.store, record);
	  },
	  onUpdate:function() {
		  
	  },	  
	  /**
	   * onDelete
	   */
	  onDelete : function(btn, ev) {
		  var selected = this.getSelectionModel().getSelected();
	        if (!selected) {
	            return false;
	        }
			  var rows=this.getSelectionModel().getSelections();
		      Ext.Msg.confirm('确认删除', '你确定删除该条记录?', function(btn) {
					if (btn == 'yes') {
				        for(var i=0;i<rows.length;i++)
				        {
				        	Ext.getCmp('com.cce.record.FilingApprovalGrid').store.remove(rows[i]);
				        }
				        Ext.getCmp('com.cce.record.FilingApprovalGrid').store.save();
					}
		      });
	  }
});

//------------------------------------------------------------------------------
//Module的CompanyRecordGrid定义..
//------------------------------------------------------------------------------

com.cce.record.FilingApprovalDetail = Ext.extend(Ext.grid.GridPanel, {
	  stripeRows: true,
	  loadMask: true,
	  border: false,
	  enableHdMenu: false,
	  header:false,
	  region:'center',
	  closable:true,
	  //height:260,
	  //split:true,
	  columns:columns_detail,
	  sm : new Ext.grid.CheckboxSelectionModel(),
	  frame:true,
	  initComponent : function() {
		    // typical viewConfig
		    this.viewConfig = {
		        forceFit: true
		    };
		
		    // build toolbars and buttons.
		    //this.tbar = this.buildTopToolbar();
		    this.bbar = this.buildBottomToolbar();
		    
		    
		    
		    // super
		    com.cce.record.FilingApprovalDetail.superclass.initComponent.call(this);
		    
		    this.addEvents(
		    	'doedit'
		    );
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
	  onAdd : function() {
	      this.fireEvent('doedit', this, this.store, null);
	  },
	  onEdit : function(){
		  var record = this.getSelectionModel().getSelected();
	      if (!record) {
	            return false;
	      }
	      this.fireEvent('doedit', this, this.store, record);
	  },
	  onUpdate:function() {
		  
	  },	  
	  /**
	   * onDelete
	   */
	  onDelete : function(btn, ev) {
		  var selected = this.getSelectionModel().getSelected();
	        if (!selected) {
	            return false;
	        }
	        var rows=this.getSelectionModel().getSelections();
	        for(var i=0;i<rows.length;i++)
	        {
	        	 this.store.remove(rows[i]);
	        }
	        this.store.save();
	  }
});

//------------------------------------------------------------------------------
//Module的定义放在最后,eval(xxx.js)后返回Module的类定义..
//------------------------------------------------------------------------------
Ext.extend(com.cce.Module, {
	win: null,
	init: function(){
		this.store = new Ext.data.Store({
		    id: 'id',
		    message: 'message',
		    proxy: proxy,
		    reader: reader,
		    writer: writer,  // <-- plug a DataWriter into the store just as you would a Reader
		    autoSave: false
		});
		
		this.store_detail = new Ext.data.Store({
		    id: 'id',
		    message: 'message',
		    proxy: proxy_detail,
		    reader: reader_detail,
		    writer: writer,  // <-- plug a DataWriter into the store just as you would a Reader
		    autoSave: false
		});
		
		this.grid = new com.cce.record.FilingApprovalGrid({ store : this.store });
		this.detail= new com.cce.record.FilingApprovalDetail({ store : this.store_detail });
		this.mainPanel= new com.cce.record.FilingApprovalMain();		
		
		
		//关联自定义事件
	    //this.relayEvents(this.store, ['destroy', 'save', 'update']);
		
		//		this.grid.on('doedit', this.showForm, this);
			    this.grid.on('rowclick', function(g, index, ev){
					this.record =g.store.getAt(index);
					
					this.store_detail.load({
						params:{
							data:this.record.get("id")
						}
					})
					
				}, this);
	    
		
		//this.mainPanel.add(this.grid);
		this.mainPanel.add(this.detail);
		
	  	this.main.add(this.mainPanel);
	  	this.main.doLayout();
	  	this.store_detail.load({params:{start:0,limit:20}}); 
	},

	showForm : function(g, store, record){
		
		
	},

	showReForm : function(g, store, record){
		
		
	},
	
	onSave : function(fp, record){		

		
	}
	
});
