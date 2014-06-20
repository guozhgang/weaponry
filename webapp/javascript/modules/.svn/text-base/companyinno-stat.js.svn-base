Ext.ns("com.cce.companyinno");

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
	{header:'企业名称',dataIndex:'name'},
	{header:'信用级别',dataIndex:'education'},
	{header:'创建时间',dataIndex:'approval_dept'}
];

//------------------------------------------------------------------------------
//Module的company主Panel定义..
//------------------------------------------------------------------------------

com.cce.companyinno.CompanyInnoStat=Ext.extend(Ext.Panel,{
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
			    
			    
			    
			    // super
			    com.cce.companyinno.CompanyInnoStat.superclass.initComponent.call(this);
			    
			    this.addEvents(
			    	'doedit'
			    );
			},
			
			 /**
		   * buildTopToolbar
		   */
		  buildTopToolbar : function() {
			return [{
					text:"统计",
					iconCls:"company_record_add",
					scope: this,
					handler:this.onReport
	    	}];
		  },
		
		  /**
		   * onAdd
		   */
		  onReport : function() {
		      this.fireEvent('doedit', this, this.store, null);
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
		this.frame= new com.cce.companyinno.CompanyInnoStat();		
		
		
		//关联自定义事件
	    //this.relayEvents(this.store, ['destroy', 'save', 'update']);
		
		this.frame.on('doedit', this.showForm, this);
		
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
