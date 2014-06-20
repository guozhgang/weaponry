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
	    	{name: 'field1 ',mapping:'field1'},
	    	{name: 'field2',mapping:'field2'},
	    	{name: 'field3 ',mapping:'field3'},
	    	{name: 'field4',mapping:'field4'},
	    	{name: 'field5',mapping:'field5'},
	    	{name: 'field6',mapping:'field6'}
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
	{header:'编号',dataIndex:'field1'},
	{header:'企业名称',dataIndex:'field2'},
	{header:'无害化类型',dataIndex:'field3'},
	{header:'创建日期',dataIndex:'field4'},
	{header:'最后更新日期',dataIndex:'field5'},
	{header:'状态',dataIndex:'field6'}
];

var columns_detail = [
 new Ext.grid.CheckboxSelectionModel(),
   {header:'操作人',dataIndex:'field1'},
   {header:'角色',dataIndex:'field2'},
   {header:'操作',dataIndex:'field3'},
   {header:'日期',dataIndex:'field4'},
   {header:'备注',dataIndex:'field6'}
];

//------------------------------------------------------------------------------
//Module的company主Panel定义..
//------------------------------------------------------------------------------

com.cce.companyinno.CompanyInnoStatus=Ext.extend(Ext.Panel,{
	id:'CompanyInnoStatus',
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

com.cce.companyinno.CompanyInnoStatusMaster = Ext.extend(Ext.grid.GridPanel, {
	  id:'com.cce.companyinno.CompanyInnoStatusMaster',
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
		    com.cce.companyinno.CompanyInnoStatusMaster.superclass.initComponent.call(this);
		    
		    this.addEvents(
		    	'doedit'
		    );
		},
		
		 /**
	   * buildTopToolbar
	   */
	  buildTopToolbar : function() {
	      return [		
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
		      Ext.Msg.confirm('确认删除', '你确定删除该条记录?', function(btn) {
					if (btn == 'yes') {
				        for(var i=0;i<rows.length;i++)
				        {
				        	Ext.getCmp('com.cce.companyinno.CompanyInnoStatusMaster').store.remove(rows[i]);
				        }
				        Ext.getCmp('com.cce.companyinno.CompanyInnoStatusMaster').store.save();
					}
		      });
	  }
});

//------------------------------------------------------------------------------
//Module的RecordExpertMore内容Panel定义..
//------------------------------------------------------------------------------

com.cce.companyinno.CompanyInnoStatusDetail=Ext.extend(Ext.grid.GridPanel ,{
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
	
	  initComponent : function() {
		    // typical viewConfig
		    this.viewConfig = {
		        forceFit: true
		    };
		    // super
		    com.cce.companyinno.CompanyInnoStatusDetail.superclass.initComponent.call(this);
		    
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
		this.master = new com.cce.companyinno.CompanyInnoStatusMaster({ store : this.store });
		this.detail= new com.cce.companyinno.CompanyInnoStatusDetail({ store : this.store });
		this.frame= new com.cce.companyinno.CompanyInnoStatus();		
		
		
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
