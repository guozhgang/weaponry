Ext.ns("com.cce.companycredit");
ScriptMgr.load({ scripts: ['javascript/utils/FormTableLayout.js']});

//------------------------------------------------------------------------------
//Module的proxy定义..
//------------------------------------------------------------------------------
var proxy = new Ext.data.HttpProxy({
	api: {
	        read : 'credit/approval4Credit!statByCriterial.action'	    
		}
});
//企业分级列表的proxy
var credit_proxy = new Ext.data.HttpProxy({
	api: {
		    read : 'credit/approval4Credit!statisticsCompanylevel.action'		    
		}
});
//------------------------------------------------------------------------------
//Module的reader定义..
//------------------------------------------------------------------------------
var reader = new Ext.data.JsonReader(
		{root:'data'},
		[ 
		 	 //企业信用档案
		  	{name: 'statcredit_count',mapping:'count'},//总共几家企业
			{name: 'statcredit_date',mapping:'date'}, //统计时间
			{name: 'statcredit_city',mapping:'city'}, //所属区域	
			{name: 'startdate',mapping:'startdate'},//开始时间
			{name: 'enddate',mappng:'enddate'},
			{name: 'region_id',mapping:'region_id'},
			{name: 'entCredit',mapping:'entCredit'}
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
    //new Ext.grid.CheckboxSelectionModel(), 
	{header:'所属区域',dataIndex:'statcredit_city'},
	{header:'信用档案审批通过企业数',dataIndex:'statcredit_count'}
];

//------------------------------------------------------------------------------
//Module的company主Panel定义..
//------------------------------------------------------------------------------

com.cce.companycredit.OrgCompanyCreditStat=Ext.extend(Ext.Panel,{
		  id:'OrgCompanyCreditStat',
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
			    com.cce.companycredit.OrgCompanyCreditStat.superclass.initComponent.call(this);
			    
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

com.cce.companycredit.OrgCompanyCreditStatGrid = Ext.extend(Ext.grid.GridPanel, {
	  title:'企业信用档案表格',
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

//		    this.bbar = this.buildBottomToolbar();	    

		    com.cce.companycredit.OrgCompanyCreditStatGrid.superclass.initComponent.call(this);

		}//,
	 
	
	  /**
	   * buildBottomToolbar
	   */
//	  buildBottomToolbar : function() {
//	  	return new Ext.PagingToolbar({
//	          pageSize: 20,
//	          store: this.store,
//	          displayInfo: true
//	      });
//	  }

});

var statCreditInfo = function() {
    if (!this.getForm().isValid()) {
        App.setAlert(false, "表单数据有错误.");
        return false;
    }
	Ext.getCmp('OrgCompanyCreditStat').store.load({
		params : { 
			 	data:Ext.encode(this.getForm().getValues())
			}
	}); 
	this.fireEvent('afterStat', this, null);
}

com.cce.companycredit.CompanyCreditStatForm = Ext.extend(Ext.form.FormPanel, {
	title: '档案分级统计',
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
	    com.cce.companycredit.CompanyCreditStatForm.superclass.initComponent.call(this);
	    
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
	            if(!endDate){
	            	return true;
	            }else if(beginDate <= endDate){   
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
                            emptyText:'请选择档案级别',
						    colspan:2,
                            triggerAction:  'all',
                            forceSelection: true,
                            editable:       false,
                            fieldLabel:     '档案级别',
                            id:'entCredit-stat',
                            name:           'entCredit',
                            hiddenName:     'entCredit',
                            displayField:   'name',
                            valueField:     'value',
                            store:          new Ext.data.JsonStore({
                                fields : ['name', 'value'],
                                data   : [
                                      {name : 'A级',   value: 'A'},
                                      {name : 'B级',  value: 'B'},
                                      {name : 'C级', value: 'C'},
                                      {name : 'D级', value: 'D'}
                                ]
                            })
				        },
						this.regionTree,
						this.regionTree.hiddenRegionId
				    ]
  },  
 
  buildUI : function(){
      return [{
			text:"统计",
			scope: this,
			handler:this.statCreditInfo
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
  statCreditInfo : function(btn, ev) {
      
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
		this.frame= new com.cce.companycredit.OrgCompanyCreditStat();
		
		this.frame.on('doReport', this.showSearchForm, this);	
		
		// extra extra simple
	    var panel1=new Ext.Panel({
	        title: '企业信用档案统计', 
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
	    
	    this.frame.add(panel1);
	    
	    var credit_panel = new com.cce.companycredit.OrgCompanyCreditStatGrid({ store : this.store });
	    
	    this.frame.add(credit_panel);
	    
	  	this.main.add(this.frame);
	  	this.main.doLayout();
	    
	},

	showSearchForm : function(g){
		 
		
		var form = new com.cce.companycredit.CompanyCreditStatForm();
		form.on('doStatForm', this.onSelect, this);	
		form.on('afterStat', this.afterStat, this);
		this.win = new Ext.Window({
		    title: '信用统计',
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
		
		 
		
		this.win.show();
	},
	
	onSelect : function(fp, record){
		
		var data = new Array();
		var startdate="";
		var enddate="";
		
		if(fp.get('startdate').getValue()!=null&&fp.get('startdate').getValue()!=""){
			startdate  = fp.get('startdate').getValue().format('m/d/Y').toString();
			data.push("startdate", startdate);
		}
		if(fp.get('enddate').getValue()!=null&&fp.get('enddate').getValue()!=""){
			enddate = fp.get('enddate').getValue().format('m/d/Y').toString();
			data.push("enddate", enddate);
		}
		 
		
		var region_id = fp.get('cce_regionTree').hiddenRegionId.getValue();
		
		if(region_id!=""){
			data.push('region_id',region_id);
		}
		var entname= fp.get('entName').getValue();
		
		if(entname!=""){
			data.push('entname',entname);
		}
		
		var entCredit=fp.get('entCredit-stat').getValue();
		
		if(entCredit!=""){
			data.push('entCredit',entCredit);
		}
		
		 //统计
		this.store.load({
			params:{
//			   data:Ext.encode(data)
			data:Ext.encode({
				'beginDate':startdate,
				'endDate':enddate,
				'regionId':region_id,
				'entName':entname,
				'entCredit':entCredit
			})
			},
			scope:this,
			callback:function(records,options,succees){				 
				// extra extra simple
			    var panel1=new Ext.Panel({
			        title: '企业信用档案统计', 
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
			 
			    
			    var credit_panel = new com.cce.companycredit.OrgCompanyCreditStatGrid({ store : this.store });
			    
			          
			    
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
