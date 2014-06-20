Ext.ns("com.cce.companyinno");

ScriptMgr.load({ scripts: ['javascript/utils/GroupHeaderPlugin.js']});
ScriptMgr.load({ scripts: ['javascript/utils/RowExpander.js']});
 
var proxy = new Ext.data.HttpProxy({
	api: {
		    read : 'companyinno/InnoMonth!list.action'
		    
		}
});
 
//------------------------------------------------------------------------------
//Module的reader定义..
//------------------------------------------------------------------------------
var reader = new Ext.data.JsonReader(
	{root:'data'},
	[ 
	 	{name: 'id',mapping:'id'}, //id
	 	{name: 'entName',mapping:'entName'},//企业名称
	 	{name: 'month',mapping:'curDate',type:'date',dateFormat:'time'}, //统计月份
		{name: 'selfcount',mapping:'selfcount'}, //自营数量
		{name: 'Substitutecount',mapping:'substitutecount'}, //代宰
		{name: 'losscount',mapping:'losscount'}, //损失补贴头数
		{name: 'productcount',mapping:'productcount'},//处理产品折合头数
		{name: 'butchcount',mapping:'butchcount'},//待宰前生猪处理头数
		{name: 'harmlesscount',mapping:'harmlesscount'},//无害化处理头数合计 
		{name: 'harmlessstaff',mapping:'harmlessstaff'},//无害化处理人员
		{name: 'summary',mapping:'summary'} //总结
	     
	]
	
);
 
var writer = new Ext.data.JsonWriter({
	encode: true,
	writeAllFields: false
});
//------------------------------------------------------------------------------
//Module的columns定义..
//------------------------------------------------------------------------------
var expander = new Ext.ux.grid.RowExpander({
    tpl : new Ext.Template(
//    	'<p><b>无害化处理人员:</b> {harmlessstaff}</p>'+
        '<p><b>总结:</b> {summary}</p>'      
    )
});
var columns = [
        expander,
        {header: '所属企业', dataIndex: 'entName',align: 'center'},  
        {header: '统计年月', dataIndex: 'month',align: 'center',renderer:Ext.util.Format.dateRenderer('Y年m月')},
		{header: '自营', dataIndex: 'selfcount',align: 'center'},
		{header: '代宰', dataIndex: 'Substitutecount',align: 'center'},		
		{header: '统计数量', dataIndex: 'losscount',align: 'center'},
		{header: '统计数量', dataIndex: 'productcount',align: 'center'},
		{header: '统计数量', dataIndex: 'butchcount',align: 'center'},
		{header: '统计数量', dataIndex: 'harmlesscount',align: 'center'}
		 
	 
];
 

//无害化处理-月报表-表格1

com.cce.companyinno.OrgCompanyinnoMonthMaster = Ext.extend(Ext.grid.GridPanel, {
	  id:'companyinnoMonthMaster',
	  title:'无害化处理月统计表',
 	  stripeRows: true,
	  loadMask: true,
	  border: false,
	  enableHdMenu: false,	 
	  region:'center',
	  closable:true,
	  columns:columns,
	  sm : new Ext.grid.CheckboxSelectionModel(),
	  frame:true,
	  header:true,
	  initComponent : function() {
		    // typical viewConfig
		    this.viewConfig = {
		        forceFit: true
		    };
		
		    // build toolbars and buttons.
		    this.tbar = this.buildTopToolbar();
		    
		    
		    
		    // super
		    com.cce.companyinno.OrgCompanyinnoMonthMaster.superclass.initComponent.call(this);
		    
		    this.addEvents(
		    	'doedit',
		    	'onShowForm'
		    );
		},
		
		 /**
	   * buildTopToolbar
	   */
	  buildTopToolbar : function() {
		  return [
		          	
					
					{
						text:"查询",
						iconCls:"stat",
						scope: this,
						handler:this.onStat
					}
		  
				]
	  },
	  plugins: [new Ext.ux.plugins.GroupHeaderGrid({
			rows: [
				 [
				  	{},
				  	{},
				  	{},
					{header: '病害猪处理头数', colspan: 2, align: 'center'},
					{header: '损失补贴头数', align: 'center'},
					{header: '所处理生猪产品', align: 'center'},
					{header: '待宰前生猪处理头数', align: 'center'},
					{header: '无害化处理头数合计', align: 'center'}
				 
					 
				]
			],
			hierarchicalColMenu: true
	  }),expander],
	  onStat:function(){
		  
		  this.fireEvent('onShowForm', this, this.store, null);
		 
	  }
	 
	   
	  
}); 

 



//定义无害化处理-月报表统计窗口

com.cce.companyinno.OrgCompanyinnoMonthForm=Ext.extend(Ext.form.FormPanel, {
	title: '月报表',
	modal:true,
	iconCls: 'silk-user',
	labelWidth: 80,
	width: 410,
	height: 310,
	padding: 10,
	header: false,
	frame: true,
	region:'center',
	layout: 'form', 
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
	    com.cce.companyinno.OrgCompanyinnoMonthForm.superclass.initComponent.call(this);
	    
	     

	},
 
	buildForm : function() {
		 return [
					{
					    xtype:"datefield",
					    fieldLabel: '统计月份',
						id:'month',				 
					    name:'month',
					    format:'m/Y',
						anchor:"100%",
					    align:'left'
					    
					},
 
					{
					    xtype: 'textfield',
					    fieldLabel: '企业名称',
						allowBlank:false,
					    anchor: '100%',					 
					    id:'entName',
					    name:'entName'
					}
		 
		 ]
	},
	loadRecord : function(rec) {
	      this.record = rec;	      
	      this.getForm().loadRecord(this.record);
	},
	buildUI : function(){
	      return [{
				text:"查询",
				scope: this,
				handler:this.onSelect
		  	}, {
	          text: '关闭',
	          handler: function(btn, ev){
		  		this.fireEvent('afterSave', this);
	          },
	          scope: this
	      }];
	},
	onSelect:function(){
		 
		var month="";
		var entName="";
		if(this.get('month').getValue()!=null&&this.get('month').getValue()!=""){
			month  = this.get('month').getValue().format('m/Y').toString();
		  
		}
		if(this.get('entName').getValue()!=null&&this.get('entName').getValue()!=""){
			entName  = this.get('entName').getValue();
		  
		}
		
		org_month_store.load({
			params:{
				data:Ext.encode({
					'curDate':month,
					'entName':entName
					
				})
			}
		});
		
		this.fireEvent('afterSave', this);
	}
});

//------------------------------------------------------------------------------
//Module的定义放在最后,eval(xxx.js)后返回Module的类定义..
//------------------------------------------------------------------------------

var org_month_store = new Ext.data.Store({
    id: 'org_month_store',
    message: 'message',
    proxy: proxy,
    reader: reader,
    writer: writer,  // <-- plug a DataWriter into the store just as you would a Reader
    autoSave: false
});

 

Ext.extend(com.cce.Module, {
	win: null,
	init: function(){
		
		
		this.master = new com.cce.companyinno.OrgCompanyinnoMonthMaster({ store : org_month_store });		 
		this.master.on('onShowForm',this.showStatForm,this);
		this.main.add(this.master);
		this.main.doLayout();
 
		org_month_store.load();
	
	},
	showStatForm:function(g, store, record){
		
		if(!record){
	        record = new store.recordType();
		}
		
		var form = new com.cce.companyinno.OrgCompanyinnoMonthForm();
		
		this.win = new Ext.Window({
		    title: '查询',
		    closable:true,
		    width:320,
		    height:180,
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
	afterSave:function(){
		this.win.close();
	}
	
	
});
