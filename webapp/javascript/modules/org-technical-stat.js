Ext.ns("com.cce.record");

//载入布局文件
ScriptMgr.load({ scripts: ['javascript/utils/FormTableLayout.js']});
//载入查询插件
ScriptMgr.load({ scripts: ['javascript/utils/Ext.ux.grid.Search.js']}); 


//------------------------------------------------------------------------------
//Module的proxy定义..
//------------------------------------------------------------------------------
var proxy = new Ext.data.HttpProxy({
	api: {
		    read : 'record/technician!statistics.action'
		}
}); 
//------------------------------------------------------------------------------
//Module的reader定义..
//------------------------------------------------------------------------------
var reader = new Ext.data.JsonReader(
		{root:'data'},
		[ 
		     
			{name: 'technician_count',mapping:'count'},//总共多少技术人员 
			{name: 'technician_companynameCN',mapping:'companynameCN'},//城市
			{name: 'technician_city',mapping:'city'}//所属区域			
			 
		]
); 
//------------------------------------------------------------------------------
//Module的writer定义..
//------------------------------------------------------------------------------
var writer = new Ext.data.JsonWriter({
	encode: true,
	writeAllFields: false
});

var columns = [
    // new Ext.grid.CheckboxSelectionModel(), 
    {header:'城市',dataIndex:'technician_companynameCN'},   
    {header:'技术人员数',dataIndex:'technician_count'}
                            	
];

com.cce.record.OrgTechnicalStat=Ext.extend(Ext.Panel,{
	id:'OrgTechnicalStat-stat-main',
	loadMask: true,
	border: false,
	enableHdMenu: false,
	header:false,
	region:'center',
	closable:true,
	layout:"border",
	frame:true,
	initComponent:function(){
		
		// typical viewConfig
	    this.viewConfig = {
	        forceFit: true
	    };
    
		this.tbar = this.buildTopToolbar();
		
		this.addEvents(
		    	'doStat'
	    );
		
		
		
		com.cce.record.OrgTechnicalStat.superclass.initComponent.call(this);
	},
	 /**
	   * buildTopToolbar
	   */
	  buildTopToolbar : function() {
		return [
		       {
					text:"统计",
					iconCls:"stat",
					scope: this,
					handler:this.onStat
		       }
		       ];
	  },
	  onStat:function(){
		  
		  this.fireEvent('doStat',this,null);
	  }
	  
	  
});

//------------------------------------------------------------------------------
//Module的CompanyRecordGrid定义..
//------------------------------------------------------------------------------

com.cce.record.OrgTechnicalStatGrid = Ext.extend(Ext.grid.GridPanel, {
	  id:'OrgTechnicalStatGrid',
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
		    
		    // super
		    com.cce.record.OrgTechnicalStatGrid.superclass.initComponent.call(this);
		     
		} 
	 
});

//定义企业统计窗口

com.cce.record.OrgTechnicalStatForm = Ext.extend(Ext.form.FormPanel, {
	
	title: '统计', 
	iconCls: 'silk-user', 
	labelWidth: 75,
	height: 300,
	padding: 10,
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
			hiddenRegionId : new Ext.form.Hidden({ id:'region_id',name:"region_id",anchor:"100%" }),
			id : 'cce_regionTree',
			title : '所属地区: ',
			anchor:"100%",
			autoScroll : true,
			height : 150,
			header : true,
			rootVisible : false,
			frame : true,
			scope: this,
			colspan:2,
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
		
	    
		// build the form-fields.  Always a good idea to defer form-building to a method so that this class can
	    // be over-ridden to provide different form-fields
	    this.items = this.buildForm();
	
	    // build form-buttons
	    this.buttons = this.buildUI();
	
	    this.addEvents(
		    	'doStatForm' 
	    );
	
	    // super
	    com.cce.record.OrgTechnicalStatForm.superclass.initComponent.call(this);
	
	},
	
	/**
	   * buildform
	   * @private
	   */
	buildForm : function() {
		
		return [      
				 
				
				this.regionTree,
				this.regionTree.hiddenRegionId		
		
				]
	  
	},
	buildUI : function(){
	      return [{
					text:"统计",
					scope: this,
					handler:this.onStat
		  }];
	},
	  /**
	   * onUpdate
	   */
	onStat : function(btn, ev) {
 
	       
	      if (!this.getForm().isValid()) {
	          App.setAlert(false, "表单数据有错误.");
	          return false;
	      }
	      this.fireEvent('doStatForm', this);
	      
	}
	
	
});

Ext.extend(com.cce.Module, {
	win: null,
	init: function(){
		this.store = new Ext.data.Store({
		    id: 'stat',
		    message: 'message',
		    proxy: proxy,
		    reader: reader,
		    writer: writer,  // <-- plug a DataWriter into the store just as you would a Reader
		    autoSave: false
		  });
		
		this.frame= new com.cce.record.OrgTechnicalStat();	
		
		var panel1=new Ext.Panel({
			title: '技术人员统计', 
	        layout:'fit',
	        region:'south',
	        url:'js/ext/resources/charts.swf',
	        split:true,
	        height : 260,
	        items: {
	            xtype: 'columnchart',
	            store: this.store,
	            xField: 'technician_companynameCN',
	            yField: 'technician_count',
	            xAxis: new Ext.chart.CategoryAxis({
	                title: '城市'
	            }),
	            yAxis: new Ext.chart.NumericAxis({
	                title: '技术人员数量'
	            }),
				listeners: {
					itemclick: function(o){
						
					}
				}
	        }
		});
		
		this.frame.add(panel1);
	 
		var StatGrid_panel = new com.cce.record.OrgTechnicalStatGrid({ store : this.store });
		
		this.frame.add(StatGrid_panel);
		
		this.frame.on('doStat', this.showStatForm, this);
		
		this.main.add(this.frame);
		this.main.doLayout();	
		 
	},
	showStatForm:function(){
		var form = new com.cce.record.OrgTechnicalStatForm();
		this.win = new Ext.Window({
		    title: '技术人员统计',
		    closable:true,
		    width:550,
		    height:310,
		    constrain:true,		   
		    plain:true,
		    layout: 'border',
		    resizable:true,
		    autoScroll: true,
		    modal:true,
		    items: [form]
		});	
		
		form.on('doStatForm', this.onSelect, this);		
		
		this.win.show();
	},
	onSelect : function(fp, record){
		
		var region_id = fp.get('cce_regionTree').hiddenRegionId.getValue();
		
//		var date={       		  
//       		 'region_id':region_id
//        };
		
		 //统计
		this.store.load({
			params:{
			   data:region_id
			},
			scope:this,
			callback:function(records,options,succees){
				 
				
				var panel1=new Ext.Panel({
					title: '技术人员统计', 
			        layout:'fit',
			        region:'south',
			        url:'js/ext/resources/charts.swf',
			        split:true,
			        height : 260,
			        items: {
			            xtype: 'columnchart',
			            store: this.store,
			            xField: 'technician_companynameCN',
			            yField: 'technician_count',
			            xAxis: new Ext.chart.CategoryAxis({
			                title: '城市'
			            }),
			            yAxis: new Ext.chart.NumericAxis({
			                title: '技术人员数量'
			            }),
						listeners: {
							itemclick: function(o){
								
							}
						}
			        }
				});
				
			 
				var StatGrid_panel = new com.cce.record.OrgTechnicalStatGrid({ store : this.store });
				
				this.frame.add(StatGrid_panel);
			    this.frame.add(panel1);
 
			    this.frame.doLayout();
				
			}
			
			
		});
		
		this.win.close();
	}
	
});
