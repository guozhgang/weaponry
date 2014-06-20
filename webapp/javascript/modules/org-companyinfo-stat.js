Ext.ns("com.cce.companyinfo");


//载入布局文件
ScriptMgr.load({ scripts: ['javascript/utils/FormTableLayout.js']});



//------------------------------------------------------------------------------
//Module的proxy定义..
//------------------------------------------------------------------------------
var proxy = new Ext.data.HttpProxy({
	api: {
		    read : 'record/approval4Register!statistics.action'		    
		}
}); 
 
//------------------------------------------------------------------------------
//Module的reader定义..
//------------------------------------------------------------------------------
var reader = new Ext.data.JsonReader(
		{root:'data'},
		[ 
		     //企业备案统计的
		  	{name: 'statcompany_count',mapping:'count'},//总共几家企业
			{name: 'statcompany_date',mapping:'date'}, //统计时间
			{name: 'statcompany_city',mapping:'city'}, //所属区域		  
			{name: 'startdate',mapping:'startdate'},//开始时间
			{name: 'enddate',mappng:'enddate'},
			{name: 'scale',mapping:'scale'}, //屠宰规模
			{name: 'scalefrom',mapping:'scalefrom'}, //屠宰规模开始
			{name: 'scaleto',mapping:'scaleto'}, //屠宰规模结束
			{name: 'degree',mapping:'degree'}, //机械化程度
			{name: 'region_id',mapping:'region_id'}
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
//企业备案的的columns定义..
//------------------------------------------------------------------------------
var company_columns = [
     //new Ext.grid.CheckboxSelectionModel(), 
     {header:'所属区域',dataIndex:'statcompany_city'},
     {header:'企业数量',dataIndex:'statcompany_count'}
      
]; 
//------------------------------------------------------------------------------
//Module的company主Panel定义..
//------------------------------------------------------------------------------
com.cce.companyinfo.OrgCompanyInfoStat=Ext.extend(Ext.Panel,{
	id:'OrgCompanyInfoStat-stat-main',
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
			
			
			
			com.cce.companyinfo.OrgCompanyInfoStat.superclass.initComponent.call(this);
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



//统计企业备案表格

com.cce.companyinfo.OrgCompanyInfoStatCompany = Ext.extend(Ext.grid.GridPanel, {
	  title:'企业备案表格',
	  stripeRows: true,
	  loadMask: true,
	  border: false,
	  enableHdMenu: false,
	  header:true,
	  region:'center',
	  closable:true,
	  columns:company_columns,
	  frame:true,
	  initComponent : function() {

		    this.viewConfig = {
		        forceFit: true
		    };

//		    this.bbar = this.buildBottomToolbar();	    

		    com.cce.companyinfo.OrgCompanyInfoStatCompany.superclass.initComponent.call(this);

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

//定义企业统计窗口

com.cce.companyinfo.OrgCompanyInfoStatCompanyForm = Ext.extend(Ext.form.FormPanel, {
	
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
		
	    var degree_data=[[1,'自动化屠宰'],[2,'半自动化屠宰'],[3,'手工屠宰']];
		
		var degree_store = new Ext.data.SimpleStore({
            fields: ['type', 'typeChs'],
            data : degree_data
        });
		
		this.degree_combo = new Ext.form.ComboBox({
	        store: degree_store,
	        id:"degree",
	        name:"degree",
	        fieldLabel:'机械化程度',
	        displayField:'typeChs',
	        triggerAction:'all',
	        valueField:'type',
	        mode: 'local',
	        anchor: '100%',
	        emptyText:'请选择机械化程度',
	        editable:false
	        
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
	    com.cce.companyinfo.OrgCompanyInfoStatCompanyForm.superclass.initComponent.call(this);
	    
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
				},
				{
                    xtype: 'compositefield',
					   id:'scalefield',
                       name : 'scalefield',
                    fieldLabel: '年屠宰规模',
                    combineErrors: false,
                    items: [
                            {
                                xtype: 'displayfield',
                                value: '从'
                            },
                       {
                           xtype: 'numberfield',
       					   id:'scalefrom',
                           name : 'scalefrom',
                           width: 48
                       },
                       {
                           xtype: 'displayfield',
                           value: '到'
                       },
                       {
                           xtype: 'numberfield',
       					   id:'scaleto',
                           name : 'scaleto',
                           width: 48
                       }
                    ]
                },
//				{
//				     xtype: 'textfield',
//				     fieldLabel: '年屠宰规模',
//				     anchor: '100%',
//                     id:'scale',
//				     name:'scale'
//				},
				this.degree_combo,
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

//------------------------------------------------------------------------------
//Module的定义放在最后,eval(xxx.js)后返回Module的类定义..
//------------------------------------------------------------------------------
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
		 
		this.frame= new com.cce.companyinfo.OrgCompanyInfoStat();	
		
		
		// extra extra simple
	    var panel1=new Ext.Panel({
	        title: '企业备案统计', 
	        layout:'fit',
	        region:'south',
	        url:'js/ext/resources/charts.swf',
	        split:true,
	        height : 260,
	        items: {
	            xtype: 'columnchart',
	            store: this.store,
	            xField: 'statcompany_city',
	            yField: 'statcompany_count',
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
		
	    
	    
	    var company_panel = new com.cce.companyinfo.OrgCompanyInfoStatCompany({ store : this.store });
	    
	    
	    
	    this.frame.add(company_panel);
		//关联自定义事件
	    //this.relayEvents(this.store, ['destroy', 'save', 'update']);
		//this.master.on('doStat', this.showForm, this);
		
		//this.frame.add(this.master);
		this.frame.on('doStat', this.showStatForm, this);
		//this.frame.add(this.detail);
		//定义store   
		
		 

		    


		
		this.main.add(this.frame);
		this.main.doLayout();
		//this.store.load({params:{start:0,limit:20}}); 
		
		 
	},

	showStatForm : function(g){
 
		var form = new com.cce.companyinfo.OrgCompanyInfoStatCompanyForm();
		this.win = new Ext.Window({
		    title: '备案企业统计',
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
		
		//fp.getForm().updateRecord(record);
		
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
		var scalefrom = Ext.getCmp('scalefrom').getValue();
		
		if(scalefrom!=""){
			data.push("scalefrom",scalefrom);
		}
		var scaleto = Ext.getCmp('scaleto').getValue();
		if(scaleto!=""){
			data.push("scaleto",scaleto);
		}
		var degree = fp.get('degree').getValue();
		
		if(degree!=""){
			data.push("degree",degree);
		}
		      
		
        //统计
		this.store.load({
			params:{
			   data:Ext.encode({
				   'beginDate':startdate,
				   'endDate':enddate,
				   'regionId':region_id,
				   'degree':degree,
				   'scalefrom':scalefrom,
				   'scaleto':scaleto
			   })
			},
			scope:this,
			callback:function(records,options,succees){				 
					 
				// extra extra simple
			    var panel1=new Ext.Panel({
			        title: '企业备案统计', 
			        layout:'fit',
			        region:'south',
			        url:'js/ext/resources/charts.swf',
			        split:true,
			        height : 260,
			        items: {
			            xtype: 'columnchart',
			            store: this.store,
			            xField: 'statcompany_city',
			            yField: 'statcompany_count',
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
			 
			    
			    var company_panel = new com.cce.companyinfo.OrgCompanyInfoStatCompany({ store : this.store });
			    
			          
			    
			    this.frame.add(panel1); 
			    this.frame.add(company_panel); 
			    this.frame.doLayout();
			}
		});
		
		
		

         

		
		this.win.close();
	}
	
});
