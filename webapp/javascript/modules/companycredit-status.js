Ext.ns("com.cce.companycredit");

//------------------------------------------------------------------------------
//Module的proxy定义..
//------------------------------------------------------------------------------
var proxy = new Ext.data.HttpProxy({
api: {
	    read : 'credit/approval4Credit!findEnterpriseApprovalInfo.action',
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
 	{header:'编号',dataIndex:'id'},
	{header:'企业名称',dataIndex:'entName'},
	{header:'信用级别',dataIndex:'entCredit'},
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

//------------------------------------------------------------------------------
//Module的company主Panel定义..
//------------------------------------------------------------------------------

com.cce.companycredit.CompanyCreditStatus=Ext.extend(Ext.Panel,{
	id:'CompanyCreditStatus',
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

com.cce.companycredit.CompanyCreditStatusMaster = Ext.extend(Ext.grid.GridPanel, {
	  id:'com.cce.companycredit.CompanyCreditStatusMaster',
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
		    com.cce.companycredit.CompanyCreditStatusMaster.superclass.initComponent.call(this);
		    
		    this.addEvents(
		    	'doedit'
		    );
		},
		
		 /**
	   * buildTopToolbar
	   */
	  buildTopToolbar : function() {
	      
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
		      Ext.Msg.confirm('确认删除', '你确定删除该条记录?', function(btn) {
					if (btn == 'yes') {
				        for(var i=0;i<rows.length;i++)
				        {
				        	Ext.getCmp('com.cce.companycredit.CompanyCreditStatusMaster').store.remove(rows[i]);
				        }
				        Ext.getCmp('com.cce.companycredit.CompanyCreditStatusMaster').store.save();
					}
		      });
	  }
});

//------------------------------------------------------------------------------
//Module的RecordExpertMore内容Panel定义..
//------------------------------------------------------------------------------

com.cce.companycredit.CompanyCreditStatusDetail=Ext.extend(Ext.grid.GridPanel ,{
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
	  sm : new Ext.grid.CheckboxSelectionModel(),
	  frame:true,
	  initComponent : function() {
		    // typical viewConfig
		    this.viewConfig = {
		        forceFit: true
		    };
		    // super
		    com.cce.companycredit.CompanyCreditStatusDetail.superclass.initComponent.call(this);
		    
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
		this.master = new com.cce.companycredit.CompanyCreditStatusMaster({ store : this.store });
		this.detail= new com.cce.companycredit.CompanyCreditStatusDetail({ store : this.store_detail });
		this.frame= new com.cce.companycredit.CompanyCreditStatus();		
		
		
		//关联自定义事件
	    //this.relayEvents(this.store, ['destroy', 'save', 'update']);
		this.master.on('rowclick', function(g, index, ev){
			this.record =g.store.getAt(index);
			this.store_detail.load({
    			params : { 
     			 	data:this.record.get("id")
     			}
    		}); 
		}, this);
		this.frame.add(this.master);
		this.frame.add(this.detail);
		
  	this.main.add(this.frame);
  	this.main.doLayout();
  	this.store.load({params:{start:0,limit:20}}); 
	},

	showForm : function(g, store, record){
		
	},

	showReForm : function(g, store, record){
		
		
	},
	
	onSave : function(fp, record){		

		
	}
	
});
