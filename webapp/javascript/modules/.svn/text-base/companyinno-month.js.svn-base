Ext.ns("com.cce.companyinno");

ScriptMgr.load({ scripts: ['javascript/utils/GroupHeaderPlugin.js']});
ScriptMgr.load({ scripts: ['javascript/utils/RowExpander.js']});

var proxy = new Ext.data.HttpProxy({
	api: {
		    read : 'companyinno/InnoMonth!list.action',
		    create : 'companyinno/InnoMonth!save.action',
		    update : 'companyinno/InnoMonth!save.action',
		    destroy : 'companyinno/InnoMonth!delete.action'
		}
});
 
//------------------------------------------------------------------------------
//Module的reader定义..
//------------------------------------------------------------------------------
var reader = new Ext.data.JsonReader(
	{root:'data'},
	[ 
	 	{name: 'id',mapping:'id'}, //id
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
//        '<p><b>无害化处理人员:</b> {harmlessstaff}</p>'+
        '<p><b>总结:</b> {summary}</p>'
        
    )
});
var columns = [
        
        expander,
        {header: '统计年月', dataIndex: 'month',align: 'center',renderer:Ext.util.Format.dateRenderer('Y年m月')},     
		{header: '自营', dataIndex: 'selfcount',align: 'center'},
		{header: '代宰', dataIndex: 'Substitutecount',align: 'center'},		
		{header: '统计数量', dataIndex: 'losscount',align: 'center'},
		{header: '统计数量', dataIndex: 'productcount',align: 'center'},
		{header: '统计数量', dataIndex: 'butchcount',align: 'center'},
		{header: '统计数量', dataIndex: 'harmlesscount',align: 'center'}
		 
	 
];
 

//无害化处理-待宰前-表格1

com.cce.companyinno.companyinnoMonthMaster = Ext.extend(Ext.grid.GridPanel, {
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
//		    this.bbar = this.buildBottomToolbar();
		    
		    
		    
		    // super
		    com.cce.companyinno.companyinnoMonthMaster.superclass.initComponent.call(this);
		    
		    this.addEvents(
		    	'doedit',
		    	'onShowForm',
		    	'onShowSummaryForm'
		    );
		},
		
		 /**
	   * buildTopToolbar
	   */
	  buildTopToolbar : function() {
		  return [
		          	
					
//					{
//						text:"统计",
//						iconCls:"stat",
//						scope: this,
//						handler:this.onStat
//					},
					{
						text:"处理统计总结",
						iconCls:"info",
						scope: this,
						handler:this.onSummary
					}
		  
				]
	  },
//	  buildBottomToolbar : function() {
//			return new Ext.PagingToolbar({
//			    pageSize: 20,
//			    store: this.store,
//			    displayInfo: true
//			});
//	  },
	  plugins: [new Ext.ux.plugins.GroupHeaderGrid({
			rows: [
				 [
				    
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
		 
	  },
	  onSummary:function(){
		  
		  var record = this.getSelectionModel().getSelected();
		  
		 
		  
	      if (!record) {
	            return false;
	      }
	      this.fireEvent('onShowSummaryForm', this, this.store, record);
	  }
	 
	   
	  
}); 

var proxy_stat = new Ext.data.HttpProxy({
	api: {
		    read :'companyinno/InnoMonth!stat.action' 
		}
});



//定义无害化处理-月报表统计窗口

com.cce.companyinno.companyinnoMonthForm=Ext.extend(Ext.form.FormPanel, {
	title: '月报表',
	modal:true,
	iconCls: 'silk-user',
	labelWidth: 80, 
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
	    com.cce.companyinno.companyinnoMonthForm.superclass.initComponent.call(this);
	    
	     

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
					    align:'left',
					    allowBlank : false
					}					 
		 
		 ]
	},
	loadRecord : function(rec) {
	      this.record = rec;	      
	      this.getForm().loadRecord(this.record);
	},
	buildUI : function(){
	      return [{
				text:"统计",
				scope: this,
				handler:this.onSave
		  	}, {
	          text: '关闭',
	          handler: function(btn, ev){
		  		this.fireEvent('afterSave', this);
	          },
	          scope: this
	      }];
	},
	onSave:function(){
		if (this.record == null) {
	          return;
	    }
	    if (!this.getForm().isValid()) {
	          App.setAlert(false, "表单数据有错误.");
	          return false;
	    }
	    
	    month_store.add(new month_store.recordType(this.getForm().getValues()));
	    
	    month_store.save();
	    
	    this.fireEvent('afterSave', this);
	}
});

//定义无害化处理-月报表统计窗口

com.cce.companyinno.companyinnoMonthSummaryForm=Ext.extend(Ext.form.FormPanel, {
	title: '总结',
	modal:true,
	iconCls: 'silk-user',
	labelWidth: 80, 
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
	    com.cce.companyinno.companyinnoMonthSummaryForm.superclass.initComponent.call(this);
	    
	     

	},
 
	buildForm : function() {
		 return [
							
 					{
						xtype:"textarea",
						fieldLabel:"总结",
						anchor:"100%",
						height: 180,
						id:'summary',
						frame:true,
						name:'summary'
						
					},
					new Ext.form.Hidden({
			            name:"id",
			            id:'id',		      		 
			            hiddenName:'id'
			 	    })
		 
		 ]
	},
	loadRecord : function(rec) {
	      this.record = rec;	      
	      this.getForm().loadRecord(this.record);
	},
	buildUI : function(){
	      return [{
				text:"保存",
				scope: this,
				handler:this.onSave
		  	}, {
	          text: '关闭',
	          handler: function(btn, ev){
		  		this.fireEvent('afterSave', this);
	          },
	          scope: this
	      }];
	},
	onSave:function(){
		if (this.record == null) {
	          return;
	    }
	    if (!this.getForm().isValid()) {
	          App.setAlert(false, "表单数据有错误.");
	          return false;
	    }
	    this.getForm().updateRecord(this.record);
	    
	    //month_store.add(new month_store.recordType(this.getForm().getValues()));
	    
	    month_store.save();
	    
	    expander.res();
	    
	    this.fireEvent('afterSave', this);
	}
});

//------------------------------------------------------------------------------
//Module的定义放在最后,eval(xxx.js)后返回Module的类定义..
//------------------------------------------------------------------------------

var month_store = new Ext.data.Store({
    id: 'month_store',
    message: 'message',
    proxy: proxy,
    reader: reader,
    writer: writer,  // <-- plug a DataWriter into the store just as you would a Reader
    autoSave: false
});

 

Ext.extend(com.cce.Module, {
	win: null,
	init: function(){
		
		
		this.master = new com.cce.companyinno.companyinnoMonthMaster({ store : month_store });		 
		this.master.on('onShowForm',this.showStatForm,this);
		this.master.on('onShowSummaryForm',this.showSummaryForm,this);
		this.main.add(this.master);
		this.main.doLayout();
 
		month_store.load();
	
	},
	showStatForm:function(g, store, record){
		
		if(!record){
	        record = new store.recordType();
		}
		
		var form = new com.cce.companyinno.companyinnoMonthForm();
		
		this.win = new Ext.Window({
		    title: '月报表统计',
		    closable:true,
		    width:300,
		    height:140,
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
	showSummaryForm:function(g, store, record){
		if(!record){
	        record = new store.recordType();
		}
		
		var form = new com.cce.companyinno.companyinnoMonthSummaryForm();
		
		this.win = new Ext.Window({
		    title: '处理统计总结',
		    closable:true,
		    width:420,
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
	afterSave:function(){
		this.win.close();
	}
	
	
});
