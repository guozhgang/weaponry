Ext.ns("com.cce.companyinno");
ScriptMgr.load({ scripts: ['javascript/utils/FormTableLayout.js']})
//------------------------------------------------------------------------------
//Module的proxy定义..
//------------------------------------------------------------------------------
var proxy = new Ext.data.HttpProxy({
api: {
	    read : 'companyinno/AppButch!stat.action'
 
	}
});

//------------------------------------------------------------------------------
//Module的reader定义..
//------------------------------------------------------------------------------
//图标统计的reader
var reader = new Ext.data.JsonReader(
		{root:'data'},
		[ 
		     //分级统计
		  	{name: 'statinno_count',mapping:'count'},//无害化处理数量
			{name: 'statinno_date',mapping:'date'}, //统计时间
			{name: 'statinno_ent',mapping:'ent'}, //所属企业  	 
			{name: 'startdate',mapping:'startdate'},//开始时间
			{name: 'enddate',mappng:'enddate'}
			 
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
     
	{header:'企业名称',dataIndex:'statinno_ent'},
	{header:'无害化处理数量',dataIndex:'statinno_count'}
	 
];

//------------------------------------------------------------------------------
//Module的company主Panel定义..
//------------------------------------------------------------------------------

com.cce.companyinno.OrgCompanyInnoStat=Ext.extend(Ext.Panel,{
		  id:'OrgCompanyInnoStat',
		  loadMask: true,
		  border: false,
		  enableHdMenu: false,
		  header:false,
		  region:'center',
		  layout:"border",
		  
		  frame:true,
		  closable:true, 
		  initComponent : function() {
			    // typical viewConfig
			    this.viewConfig = {
			        forceFit: true
			    };
			
			    // build toolbars and buttons.
			    this.tbar = this.buildTopToolbar();
			    
			    
			    
			    // super
			    com.cce.companyinno.OrgCompanyInnoStat.superclass.initComponent.call(this);
			    
			    this.addEvents(
			    	'doStat'
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
					handler:this.onStat
	    	}];
		  },
		
		  /**
		   * onAdd
		   */
		  onStat : function() {
			  this.fireEvent('doStat',this,null);
		  }
	});


//统计企业无害化处理表格

com.cce.companyinno.OrgCompanyInnoStatInno = Ext.extend(Ext.grid.GridPanel, {
	  stripeRows: true,
	  loadMask: true,
	  border: false,
	  enableHdMenu: false,
	  header:false,
	  region:'center',
	  closable:true,
	  frame: true,
	  columns:columns,
	  height:254,
	  initComponent : function() {

		    this.viewConfig = {
		        forceFit: true
		    };

//		    this.bbar = this.buildBottomToolbar();	    

		    com.cce.companyinno.OrgCompanyInnoStatInno.superclass.initComponent.call(this);

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

//统计企业无害化处理form

com.cce.companyinno.OrgCompanyInnoStatForm = Ext.extend(Ext.form.FormPanel, {
	title: '企业无害化统计',
	modal:true,
	iconCls: 'silk-user',
	labelWidth: 100,
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
	
		
		
		// build the form-fields.  Always a good idea to defer form-building to a method so that this class can
	    // be over-ridden to provide different form-fields
	    this.items = this.buildForm();
	
	    // build form-buttons
	    this.buttons = this.buildUI();
	
	    this.addEvents(
		    	'doStatForm',
		    	'afterStat'
	    );
	
	    // super
	    com.cce.companyinno.OrgCompanyInnoStatForm.superclass.initComponent.call(this);
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
	            if(beginDate <= endDate){   
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
			    }
		       
		    ]
  },  
 
  buildUI : function(){
      return [{
			text:"统计",
			scope: this,
			handler:this.onStat
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
   * onStat
   */
  onStat : function(btn, ev) {
	  
      
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
		this.frame= new com.cce.companyinno.OrgCompanyInnoStat();		
		
		
		// extra extra simple
	    var panel1=new Ext.Panel({
	        title: '企业无害化处理统计',			        
	        width:550,
	        height:280,
	        layout:'fit',
	        region:'south',
	        split:true,
	        url:'js/ext/resources/charts.swf',
	        items: {
	            xtype: 'columnchart',
	            store: this.store,
	            xField: 'statinno_ent',
	            yField: 'statinno_count',
	            xAxis: new Ext.chart.CategoryAxis({
	                title: '企业/区域'
	            }),
	            yAxis: new Ext.chart.NumericAxis({
	                title: '无害化处理数量'
	            }),
				listeners: {
					itemclick: function(o){
						
					}
				}
	        }
	    });	
		
	    this.frame.add(panel1);
	    
	    var inno_panel = new  com.cce.companyinno.OrgCompanyInnoStatInno({ store : this.store });
	 
	    
	    this.frame.add(inno_panel);
	    
		this.frame.on('doStat', this.showStatForm, this);
		
	  	this.main.add(this.frame);
	  	this.main.doLayout();
	  	this.store.load({params:{start:0,limit:20}}); 
	},

	showStatForm : function(g, store, record){
		
		
		var form = new com.cce.companyinno.OrgCompanyInnoStatForm();
		
		this.win = new Ext.Window({
		    title: '无害化处理统计',
		    closable:true,
		    width:480,
		    height:120,
		    constrain:true,
		    //border:false,
		    plain:true,
		    layout: 'border',
		    resizable:true,
		    autoScroll: true,
		    modal:true,
		    items: [form]
		});
		
		form.on('doStatForm', this.onSelect, this);
		form.on('afterStat', this.afterStat, this);
		
		this.win.show();
	},

	afterStat : function(fp, record){
        this.win.close();
	},
	
	onSelect:function(fp, record){
		var startdate="";
		var enddate="";
		
		if(fp.get('startdate').getValue()!=null&&fp.get('startdate').getValue()!=""){
			startdate  = fp.get('startdate').getValue().format('m/d/Y').toString();
			 
		}
		if(fp.get('enddate').getValue()!=null&&fp.get('enddate').getValue()!=""){
			enddate = fp.get('enddate').getValue().format('m/d/Y').toString();
			 
		}
		
		
		this.store.load({
			params:{
			   data:Ext.encode({
				   'beginDate':startdate,
				   'endDate':enddate			 
			   })
			},
			scope:this,
			callback:function(records,options,succees){		
				
				// extra extra simple
			    var panel1=new Ext.Panel({
			        title: '企业无害化处理统计',				     
			        layout:'fit',
			        split:true,
			        frame: true,
			        url:'js/ext/resources/charts.swf',
			        items: {
			            xtype: 'columnchart',
			            store: this.store,
			            xField: 'statinno_ent',
			            yField: 'statinno_count',
			            xAxis: new Ext.chart.CategoryAxis({
			                title: '企业/区域'
			            }),
			            yAxis: new Ext.chart.NumericAxis({
			                title: '无害化处理数量'
			            }),
						listeners: {
							itemclick: function(o){
								
							}
						}
			        }
			    });	
			     
			    
						 
			    var inno_panel = new  com.cce.companyinno.OrgCompanyInnoStatInno({ store : this.store });
			    
			    
			    this.frame.add(panel1);
			    this.frame.add(inno_panel);
		 
			    this.frame.doLayout();
			    
				
			}
		});
		
		this.win.close();
	}
	
	 
	
});
