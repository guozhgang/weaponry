Ext.ns("com.cce.operatorstat");
ScriptMgr.load({ scripts: ['javascript/utils/FormTableLayout.js']});
ScriptMgr.load({ scripts: ['javascript/utils/GroupHeaderPlugin.js']});
ScriptMgr.load({ scripts: ['javascript/utils/RowExpander.js']});
//------------------------------------------------------------------------------
//Module的proxy定义..
//------------------------------------------------------------------------------
var proxy = new Ext.data.HttpProxy({
	api: {
	        read : 'record/business-case!collect.action'	    
		}
});
 
//------------------------------------------------------------------------------
//Module的reader定义..
//------------------------------------------------------------------------------
var reader = new Ext.data.JsonReader(
		{root:'data'},
		[ 
		 	 //企业经营状况
		  	{name: 'representing',mapping:'representing'},// 
			{name: 'minButcherQuantity',mapping:'minButcherQuantity'}, //统计时间
			{name: 'maxButcherQuantity',mapping:'maxButcherQuantity'}, //所属区域	
			{name: 'minTaking',mapping:'minTaking'},//开始时间
			{name: 'maxTaking',mappng:'maxTaking'},
			{name: 'minProfitTax',mapping:'minProfitTax'},
			{name: 'maxProfitTax',mapping:'maxProfitTax'},
			{name: 'minTotalAssets',mapping:'minTotalAssets'},
			{name: 'maxTotalAssets',mapping:'maxTotalAssets'},
			{name: 'minTotalliabilities',mapping:'minTotalliabilities'},
			{name: 'maxTotalliabilities',mapping:'maxTotalliabilities'},
			{name: 'minEmployeeNumbers',mapping:'minEmployeeNumbers'},
			{name: 'maxEmployeeNumbers',mapping:'maxEmployeeNumbers'}
	]
	);

//------------------------------------------------------------------------------
//Module的writer定义..
//------------------------------------------------------------------------------
var writer = new Ext.data.JsonWriter({
	encode: true,
	writeAllFields: false
});
var expander=new Ext.ux.grid.RowExpander(); 
//------------------------------------------------------------------------------
//Module的columns定义..
//------------------------------------------------------------------------------
var columns = [
      expander,
	{header:'所属单位',dataIndex:'representing',align: 'center'},
	{header:'本期',dataIndex:'maxButcherQuantity',align: 'center'},
	{header:'同比',dataIndex:'minButcherQuantity',align: 'center'},
	{header:'本期',dataIndex:'maxTaking',align: 'center'},
	{header:'同比',dataIndex:'minTaking',align: 'center'},
	{header:'本期',dataIndex:'maxProfitTax',align: 'center'},
	{header:'同比',dataIndex:'minProfitTax',align: 'center'},
	{header:'本期',dataIndex:'maxTotalAssets',align: 'center'},
	{header:'同比',dataIndex:'minTotalAssets',align: 'center'},
	{header:'本期',dataIndex:'maxTotalliabilities',align: 'center'},
	{header:'同比',dataIndex:'minTotalliabilities',align: 'center'},
	{header:'本期',dataIndex:'maxEmployeeNumbers',align: 'center'},
	{header:'同比',dataIndex:'minEmployeeNumbers',align: 'center'}

];

//------------------------------------------------------------------------------
//Module的company主Panel定义..
//------------------------------------------------------------------------------

com.cce.operatorstat.OperatorStat=Ext.extend(Ext.Panel,{
		  id:'OperatorStat',
		  stripeRows: true,
		  loadMask: true,
		  border: false,
		  enableHdMenu: false,
		  header:false,
		  region:'center',
		  closable:true,
		  layout:"border",
		  frame:true,
 
		
		  initComponent : function() {
			    // typical viewConfig
			    this.viewConfig = {
			        forceFit: true
			    };
			
			    // build toolbars and buttons.
			    this.tbar = this.buildTopToolbar();
			    
			    
			    
			    // super
			    com.cce.operatorstat.OperatorStat.superclass.initComponent.call(this);
			    
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
					iconCls:"stat",
					scope: this,
					handler:this.onReport
	    	}];
		  },
		  
		  /**
		   * onAdd
		   */
		  onReport : function() {
		      this.fireEvent('doReport', this, this.store, null);
		  }
	});

//统计企业信用档案表格

com.cce.operatorstat.OperatorStatGrid = Ext.extend(Ext.grid.GridPanel, {
	  title:'企业经营状况统计表单',
	  stripeRows: true,
	  loadMask: true,
	  border: false,
	  enableHdMenu: false,
	  header:true,
	  region:'center',
	  closable:true,
	  columns:columns,
	  frame:true,
	  initComponent : function() {

		    this.viewConfig = {
		        forceFit: true
		    };

 		    this.bbar = this.buildBottomToolbar();	    

		    com.cce.operatorstat.OperatorStatGrid.superclass.initComponent.call(this);

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
	  plugins: [new Ext.ux.plugins.GroupHeaderGrid({
			rows: [
				 [
				    
				  	{},
				  	{},
					{header: '实际屠宰量', colspan: 2, align: 'center'},
					{header: '营业收入',colspan:2, align: 'center'},
					{header: '实现利税',colspan:2, align: 'center'},
					{header: '资产总额',colspan:2, align: 'center'},
					{header: '负债总额',colspan:2, align: 'center'},
					{header: '职工人数',colspan:2, align: 'center'}
					 
					 
				]
			],
			hierarchicalColMenu: true
	  })]

});

var statOperatorInfo = function() {
    if (!this.getForm().isValid()) {
        App.setAlert(false, "表单数据有错误.");
        return false;
    }
	Ext.getCmp('OperatorStat').store.load({
		params : { 
			 	data:Ext.encode(this.getForm().getValues())
			}
	}); 
	this.fireEvent('afterStat', this, null);
}

com.cce.operatorstat.OperatorStatForm = Ext.extend(Ext.form.FormPanel, {
	title: '企业经营状况统计',
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
			colspan:2,
			autoScroll : true,
			height : 130,
			header : true,
			rootVisible : false,
			frame : true,
			scope: this,
			listeners: {
			    "click": function( node){
			    	region_name=node.text;
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
	
	    // add a create event for convenience in our application-code.
	    this.addEvents('doStatForm');
	
	    // super
	    com.cce.operatorstat.OperatorStatForm.superclass.initComponent.call(this);
	    
	    Ext.apply(Ext.form.VTypes, {   
	        dateRange: function(val, field){   
	            if(field.dateRange){   
	                var beginId = field.dateRange.begin;   
	                this.beginField = Ext.getCmp(beginId);   
	                var endId = field.dateRange.end;   
	                this.endField = Ext.getCmp(endId);   
	                var startDate = this.beginField.getValue();   
	                var endDate = this.endField.getValue();  
	            }   
	            if(!endDate){
	            	return true;
	            }else if(startDate <= endDate){   
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
				            id:'representing',
				            name:'representing'
				        },
				        {
					    	   xtype:"datefield",
					           fieldLabel: '开始日期',
					    	   id:'startDate',					    	   
					           name:'startDate',
					           format:'m/d/Y',
							   anchor:"100%",
					           align:'left',
					           
							   dateRange: {begin: 'startDate', end: 'endDate' },   
			                   vtype: 'dateRange'
					    },
				        {
					    	   xtype:"datefield",
					           fieldLabel: '结束日期',
					    	   id:'endDate',					    	 
					           name:'endDate',
					           format:'m/d/Y',
							   anchor:"100%",
					           align:'left',
					          
							   dateRange: {begin: 'startDate', end: 'endDate' },   
			                   vtype: 'dateRange'
					    },
						this.regionTree,
						this.regionTree.hiddenRegionId
				    ]
  },  
 
  buildUI : function(){
      return [{
			text:"统计",
			scope: this,
			handler:this.statOperatorInfo
	  	}, {
	        text: '关闭',
	        handler: function(btn, ev){
	  			this.fireEvent('afterStat', this, null);
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
  statOperatorInfo : function(btn, ev) {
      
      if (!this.getForm().isValid()) {
          App.setAlert(false, "表单数据有错误.");
          return false;
      }
      this.fireEvent('doStatForm', this);
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
		this.frame= new com.cce.operatorstat.OperatorStat();
		this.store.on("beforeload", function(thiz, options) {
	 		thiz.baseParams["data"] = searchParams;
		});
		this.frame.on('doReport', this.showSearchForm, this);	
		
		// extra extra simple
	    var panel1=new Ext.Panel({
	        title: '企业经营状况统计', 
	        layout:'fit',
	        region:'south',
	        url:'js/ext/resources/charts.swf',
	        split:true,
	        height : 260,
	        items: {
	            xtype: 'columnchart',
	            store: this.store,
	            xField: 'statcredit_city',
	            yField: 'statcredit_count',
	            xAxis: new Ext.chart.CategoryAxis({
	                title: '城市'
	            }),
	            yAxis: new Ext.chart.NumericAxis({
	                title: '企业数量'
	            }),
				listeners: {
					itemclick: function(o){
						
					}
				}
	        }
	    });	
	    
	  //  this.frame.add(panel1);
	    
	    var credit_panel = new com.cce.operatorstat.OperatorStatGrid({ store : this.store });
	    
	    this.frame.add(credit_panel);
	    
	  	this.main.add(this.frame);
	  	this.main.doLayout();
	    
	},

	showSearchForm : function(g,store,record){
		 
		
		var form = new com.cce.operatorstat.OperatorStatForm();
		form.on('doStatForm', this.onSelect, this);	
		form.on('afterStat', this.afterStat, this);
		this.win = new Ext.Window({
		    title: '经营统计查询',
		    closable:true,
		    width:480,
		    height:300,
		    constrain:true,
		    //border:false,
		    plain:true,
		    layout: 'border',
		    resizable:true,
		    modal:true,
		    autoScroll: true,
		    items: [form]
		});
 		//this.getForm().loadRecord(this.record);
 	    form.get('representing').setValue(representing);
 		form.get('startDate').setValue(startDate);
 		form.get('endDate').setValue(endDate);
 		form.get('cce_regionTree').hiddenRegionId.setValue(regionId);
 		form.get('cce_regionTree').setTitle('所属地区: ' + region_name);
		this.win.show();
	},
	
	onSelect : function(fp, record){
		
		var data = new Array();
		
		
		if(fp.get('startDate').getValue()!=null&&fp.get('startDate').getValue()!=""){
			startDate  = fp.get('startDate').getValue().format('m/d/Y').toString();
			data.push("startDate", startDate);
		}
		if(fp.get('endDate').getValue()!=null&&fp.get('endDate').getValue()!=""){
			endDate = fp.get('endDate').getValue().format('m/d/Y').toString();
			data.push("endDate", endDate);
		}
		 
		
		  region_id = fp.get('cce_regionTree').hiddenRegionId.getValue();
		
		if(region_id!=""){
			data.push('region_id',region_id);
		}
		  representing= fp.get('representing').getValue();
		
		if(representing!=""){
			data.push('representing',representing);
		} 
		searchParams=Ext.encode({
			'startDate':startDate,
			'endDate':endDate,
			'regionId':region_id,
			'representing':representing
		});
		 
	 //统计
		this.store.load({
			params:{
 			start:0,limit:20
			},
			scope:this,
			callback:function(records,options,succees){				 
				// extra extra simple
			    var panel1=new Ext.Panel({
			        title: '企业经营状况统计', 
			        layout:'fit',
			        region:'south',
			        url:'js/ext/resources/charts.swf',
			        split:true,
			        height : 260,
			        items: {
			            xtype: 'columnchart',
			            store: this.store,
			            xField: 'statcredit_city',
			            yField: 'statcredit_count',
			            xAxis: new Ext.chart.CategoryAxis({
			                title: '城市'
			            }),
			            yAxis: new Ext.chart.NumericAxis({
			                title: '企业数量'
			            }),
						listeners: {
							itemclick: function(o){
								
							}
						}
			        }
			    });	 
			 
			    
			    var credit_panel = new com.cce.operatorstat.OperatorStatGrid({ store : this.store });
			    
			          
			    
			    this.frame.add(panel1); 
			    this.frame.add(credit_panel); 
			    this.frame.doLayout();
			}
		});
		
		
		

         

		
		this.win.close();
		
	},
	afterStat : function(fp, record){
        this.win.close();
	}
	
});
var startDate='';
var endDate='';
var representing='';
var regionId='';
var region_name='';
var searchParams=Ext.encode({
	'startDate':'',
	'endDate':'',
	'regionId':'',
	'representing':''
});
