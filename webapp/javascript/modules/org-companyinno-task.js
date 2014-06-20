Ext.ns("com.cce.companyinno");
ScriptMgr.load({ scripts: ['javascript/utils/SearchField.js']});

//------------------------------------------------------------------------------
//Module的proxy定义..
//------------------------------------------------------------------------------
var proxy = new Ext.data.HttpProxy({
api: {
	    read : 'record/companyRecord!list.action',
	    create : 'record/companyRecord!save.action',
	    destroy: 'record/companyRecord!delete.action'
	}
});

//------------------------------------------------------------------------------
//Module的reader定义..
//------------------------------------------------------------------------------
var reader = new Ext.data.JsonReader(
	{root:'data'},
	[ 
	    	{name: 'id',mapping:"id"},
	    	{name: 'approval_dept ',mapping:'approval_dept'},
	    	{name: 'education',mapping:'education'},
	    	{name: 'name',mapping:'name'}
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
    {header:'企业名',dataIndex:'field1'},
    {header:'税务登记号',dataIndex:'field2'},
    {header:'申请类型',dataIndex:'field3'},
    {header:'创建日期',dataIndex:'field4'},
    {header:'更新日期',dataIndex:'field6'}
];

var columns_detail = [
   {header:'操作人',dataIndex:'field1'},
   {header:'角色',dataIndex:'field2'},
   {header:'操作',dataIndex:'field3'},
   {header:'日期',dataIndex:'field4'},
   {header:'备注',dataIndex:'field6'}
];

//------------------------------------------------------------------------------
//Module的company主Panel定义..
//------------------------------------------------------------------------------

com.cce.companyinno.OrgCompanyInnoTask=Ext.extend(Ext.Panel,{
	id:'companylevel-input-main',
	loadMask: true,
	border: false,
	enableHdMenu: false,
	header:false,
	region:'center',
	closable:true,
	layout:"border"
});


//------------------------------------------------------------------------------
//Module的CompanyRecordGrid定义..
//------------------------------------------------------------------------------

com.cce.companyinno.OrgCompanyInnoTaskMaster = Ext.extend(Ext.grid.GridPanel, {
	  stripeRows: true,
	  loadMask: true,
	  border: false,
	  enableHdMenu: false,
	  header:false,
	  region:'center',
	  closable:true,
	  columns:columns,
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
		    com.cce.companyinno.OrgCompanyInnoTaskMaster.superclass.initComponent.call(this);
		    
		    this.addEvents(
		    	'doedit'
		    );
		},
		
		 /**
	   * buildTopToolbar
	   */
	  buildTopToolbar : function() {
		return [{
				text:"网上通过",
				iconCls:"pass",
				scope: this,
				handler:this.onUpdate
    	},
    	{
				text:"网上退回",
				iconCls:"back",
				scope: this,
				handler:this.onUpdate
		},
		{
				text:"纸质通过",
				iconCls:"pass",
				scope: this,
				handler:this.onUpdate
		},
		{
				text:"纸质退回",
				iconCls:"back",
				scope: this,
				handler:this.onUpdate
		},			
		new Ext.Toolbar.Fill(),
		'过滤: ', ' ', 					
		new Ext.ux.form.SearchField({
	                	store: this.store,
	                	width:150
	    })];
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
//Module的RecordExpertMore内容Panel定义..
//------------------------------------------------------------------------------

com.cce.companyinno.OrgCompanyInnoTaskDetail=Ext.extend(Ext.grid.GridPanel ,{
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
	
	  initComponent : function() {
		    // typical viewConfig
		    this.viewConfig = {
		        forceFit: true
		    };
		    // super
		    com.cce.companyinno.OrgCompanyInnoTaskDetail.superclass.initComponent.call(this);
		    
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
		this.master = new com.cce.companyinno.OrgCompanyInnoTaskMaster({ store : this.store });
		this.detail= new com.cce.companyinno.OrgCompanyInnoTaskDetail({ store : this.store });
		this.frame= new com.cce.companyinno.OrgCompanyInnoTask();		
		
		
		//关联自定义事件
	    //this.relayEvents(this.store, ['destroy', 'save', 'update']);
		
		this.master.on('doedit', this.showForm, this);
		
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
