Ext.ns("com.cce.companylevel");
ScriptMgr.load({ scripts: ['javascript/utils/FormTableLayout.js']});

//------------------------------------------------------------------------------
//Module的proxy定义..
//------------------------------------------------------------------------------
var proxy = new Ext.data.HttpProxy({
	api: {
	        read : 'companylevel/approvallevel!statistics.action'	    
		}
	});
//企业分级列表的proxy
var level_proxy = new Ext.data.HttpProxy({
	api: {
		    read : 'companylevel/approvallevel!statisticsCompanylevel.action'		    
		}
});

//图标统计的reader
var reader = new Ext.data.JsonReader(
		{root:'data'},
		[ 
		     //分级统计
		  	{name: 'statlevel_count',mapping:'count'},//总共几家企业
			{name: 'statlevel_date',mapping:'date'}, //统计时间
			{name: 'statlevel_city',mapping:'city'}, //所属区域		  	 
			{name: 'startdate',mapping:'startdate'},//开始时间
			{name: 'enddate',mappng:'enddate'},
			{name: 'region_id',mapping:'region_id'}
		]
);
 

//------------------------------------------------------------------------------
//Module的columns定义..
//------------------------------------------------------------------------------
var  columns = [
    new Ext.grid.CheckboxSelectionModel(), 
	{header:'所属区域',dataIndex:'statlevel_city'},
	{header:'企业数量',dataIndex:'statlevel_count'}
	 
];


//------------------------------------------------------------------------------
//Module的companylevel主Panel定义..
//------------------------------------------------------------------------------

com.cce.companylevel.OrgCompanyLevelStat=Ext.extend(Ext.Panel,{
	id:'OrgCompanyLevelStat',
	loadMask: true,
	border: false,
	enableHdMenu: false,
	header:false,
	region:'center',
	layout:"border",
	frame:true,
	closable:true, 
	initComponent:function(){
		
		// typical viewConfig
	    this.viewConfig = {
	        forceFit: true
	    };
  
		this.tbar = this.buildTopToolbar();
		
		this.addEvents(
		    	'doStat'
	    );
		
		
		
		com.cce.companylevel.OrgCompanyLevelStat.superclass.initComponent.call(this);
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


//统计企业分级表格

com.cce.companylevel.OrgCompanyLevelStatLevel = Ext.extend(Ext.grid.GridPanel, {
	  stripeRows: true,
	  loadMask: true,
	  border: false,
	  enableHdMenu: false,
	  header:false,
	  region:'center',
	  closable:true,
	  columns:columns,
	  height:254,
	  initComponent : function() {

		    this.viewConfig = {
		        forceFit: true
		    };

//		    this.bbar = this.buildBottomToolbar();	    

		    com.cce.companylevel.OrgCompanyLevelStatLevel.superclass.initComponent.call(this);

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

com.cce.companylevel.CompanyLevelStatForm = Ext.extend(Ext.form.FormPanel, {
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
	
	    this.addEvents(
		    	'doStatForm',
		    	'afterStat'
	    );
	
	    // super
	    com.cce.companylevel.CompanyLevelStatForm.superclass.initComponent.call(this);
	    
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
                    emptyText:'请选择企业级别',
				    anchor: '100%',
				    colspan:2,
                    triggerAction:  'all',
                    forceSelection: true,
                    editable:       false,
                    fieldLabel:     '企业级别',
                    id:'entlevel',
                    name:'entLevel',
                    hiddenName:'entLevel',
                    displayField:   'name',
                    valueField:     'value',
                    store:          new Ext.data.JsonStore({
                        fields : ['name', 'value'],
                        data   : [
                            {name : '一级',   value: '1'},
                            {name : '二级',  value: '2'},
                            {name : '三级', value: '3'},
                            {name : '四级', value: '4'},
                            {name : '五级', value: '5'}
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
		    reader: reader
		     
		  });
		this.frame= new com.cce.companylevel.OrgCompanyLevelStat();	
		
		
		// extra extra simple
	    var panel1=new Ext.Panel({
	        title: '企业分级情况统计',			        
	        width:550,
	        height:280,
	        layout:'fit',
	        region:'south',
	        split:true,
	        url:'js/ext/resources/charts.swf',
	        items: {
	            xtype: 'columnchart',
	            store: this.store,
	            xField: 'statlevel_city',
	            yField: 'statlevel_count',
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
		
	    var level_panel = new  com.cce.companylevel.OrgCompanyLevelStatLevel({ store : this.store });
	    
	    this.frame.add(level_panel);
	    
		//关联自定义事件
	    //this.relayEvents(this.store, ['destroy', 'save', 'update']);
		
		this.frame.on('doStat', this.showSearchForm, this);
		
		this.main.add(this.frame);
		this.main.doLayout();
		
	},

	showSearchForm : function(g){
		 
		var form = new com.cce.companylevel.CompanyLevelStatForm();
		
		this.win = new Ext.Window({
		    title: '信用统计',
		    closable:true,
		    width:480,
		    height:300,
		    constrain:true,
		    //border:false,
		    plain:true,
		    layout: 'border',
		    resizable:false,
		    autoScroll: true,
		    items: [form]
		});
		
		form.on('doStatForm', this.onSelect, this);
		form.on('afterStat', this.afterStat, this);
		
		
		
		this.win.show();
	},
	afterStat : function(fp, record){
        this.win.close();
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
		
		var entLevel= fp.get('entlevel').getValue();
		
		if(entLevel!=""){
			data.push('entLevel',entLevel);
		}
		 
		 
		 
		 
		 
		 
		 
		 //统计
			this.store.load({
				params:{
				   data:Ext.encode({
					   'beginDate':startdate,
					   'endDate':enddate,
					   'regionId':region_id,
					   'entname':entname,
					   'entLevel':entLevel
				   })
				},
				scope:this,
				callback:function(records,options,succees){		
					
					// extra extra simple
				    var panel1=new Ext.Panel({
				        title: '企业分级情况统计',				     
				        layout:'fit',
				        split:true,
				        url:'js/ext/resources/charts.swf',
				        items: {
				            xtype: 'columnchart',
				            store: this.store,
				            xField: 'statlevel_city',
				            yField: 'statlevel_count',
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
				     
				    
							 
				    var level_panel = new  com.cce.companylevel.OrgCompanyLevelStatLevel({ store : this.store });
				    
				    
				    this.frame.add(panel1);
				    this.frame.add(level_panel);
			 
				    this.frame.doLayout();
				    
					
				}
			});
			
			this.win.close();
		 
	}
});
