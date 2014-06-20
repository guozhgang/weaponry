Ext.ns("com.cce.companylevel");

ScriptMgr.load({ scripts: ['javascript/utils/FormTableLayout.js']});
//------------------------------------------------------------------------------
//Module的proxy定义..
//------------------------------------------------------------------------------
var proxy = new Ext.data.HttpProxy({
api: {
    read : 'companylevel/approvallevel!findApprovalByCriterial.action',
    create : 'companylevel/approvallevel!adjust.action',
    update: 'companylevel/approvallevel!adjust.action',
    destroy: 'companylevel/approvallevel!delete.action'
	}
});

//------------------------------------------------------------------------------
//Module的reader定义..
//------------------------------------------------------------------------------
var reader = new Ext.data.JsonReader(
	{root:'data'},
	[ 
	 	{name: 'id',mapping:"id"},
		{name: 'entName',mapping:'entName'},
		{name: 'entLevel',mapping:'entLevel'},
		{name: 'entNo',mapping:'entNo'},
	    {name: 'createDate',mapping:"createDate",type:'date',dateFormat:'time'},
	    {name: 'updateDate',mapping:"updateDate",type:'date',dateFormat:'time'},
		{name: 'status',mapping:'status'}
	]
);

var reader_search = new Ext.data.JsonReader(
		{root:'data'},
		[ 
			{name: 'entName',mapping:'entName'},
			{name: 'entLevel',mapping:'entLevel'},
			{name: 'entNo',mapping:'entNo'},
		    {name: 'beginDate',mapping:"beginDate",type:'date',dateFormat:'time'},
		    {name: 'endDate',mapping:"endDate",type:'date',dateFormat:'time'},
			{name: 'status',mapping:'status'}
		]
	);

var ds_search = new Ext.data.Store({
	proxy: proxy,
	reader : reader_search
});

var searchLevelInfo = function() {
    if (!this.getForm().isValid()) {
        App.setAlert(false, "表单数据有错误.");
        return false;
    }
	Ext.getCmp('OrgCompanyLevelAdjustMaster').store.load({
		params : { 
			 	data:Ext.encode(this.getForm().getValues()),
			 	start:0,limit:20
			}
	}); 
	this.fireEvent('afterSearch', this, null);
}
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
               {header:'企业名',dataIndex:'entName'},
               {header:'税务登记号',dataIndex:'entNo'},
               {header:'企业分级',dataIndex:'entLevel',
            	 
            	   editor: new Ext.form.ComboBox({     
                       mode:           'local',
                       triggerAction:  'all',
                       forceSelection: true,
                       editable:       false,
                       fieldLabel:     '企业级别',
                       name:           'entLevel',
                       hiddenName:     'entLevel',
                       displayField:   'name',
                       valueField:     'name',
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
            	   })
               },
	           	{header:'创建日期',dataIndex:'createDate',renderer:Ext.util.Format.dateRenderer('Y年m月d日 H时i分s秒'),sortable:true},
	        	{header:'最后更新日期',dataIndex:'updateDate',renderer:Ext.util.Format.dateRenderer('Y年m月d日 H时i分s秒'),sortable:true},
               {header:'状态',dataIndex:'status'}
           ];

//------------------------------------------------------------------------------
//Module的company主Panel定义..
//------------------------------------------------------------------------------

com.cce.companylevel.OrgCompanyLevelAdjust=Ext.extend(Ext.Panel,{
	id:'companylevel-status-main',
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

com.cce.companylevel.OrgCompanyLevelAdjustMaster = Ext.extend(Ext.grid.EditorGridPanel, {
	  id:'OrgCompanyLevelAdjustMaster',  
	  stripeRows: true,
	  loadMask: true,
	  border: false,
	  enableHdMenu: false,
	  header:false,
	  region:'center',
	  closable:true,
	  columns:columns,
	  initComponent : function() {
		    // typical viewConfig
		    this.viewConfig = {
		        forceFit: true
		    };
		
		    // build toolbars and buttons.
		    this.tbar = this.buildTopToolbar();
		    this.bbar = this.buildBottomToolbar();
		    
		    
		    
		    // super
		    com.cce.companylevel.OrgCompanyLevelAdjustMaster.superclass.initComponent.call(this);
		    
		    this.addEvents(
		    	'doedit'
		    );
		},
		
		 /**
	   * buildTopToolbar
	   */
	  buildTopToolbar : function() {
	      return [{
					text:"查询",
					iconCls:"company_record_update",
					scope: this,
					handler:this.onSearch
	    	},	    	
			{
					text:"保存",
					iconCls:"company_record_edit",
					scope: this,
					handler:this.onAdjust
			}];
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
	  onSearch : function() {
	      this.fireEvent('doSearch', this, this.store, null);
	  },
	  onAdjust : function(){
  	    var theStore=Ext.getCmp('OrgCompanyLevelAdjustMaster').store;
		var count=theStore.getCount();
	      if (count==0) {
	          return false;
	      }
		  Ext.Msg.prompt('原因', '请输入调整原因:', function(btn, text){
	            if (btn == 'ok'){
	            	var rowsData = [];
	        		var record;
	        		for (var i = 0; i < count; i++) {
	        			record = theStore.getAt(i);
	        			if (record.dirty) {
	        				rowsData.push(record.data);
	        			}
	        		}
	    	        Ext.Ajax.request({ 
	    				url : 'companylevel/approvallevel!adjust.action',
	    				scope: this,
	    				params : { 
	    				 	data:Ext.encode(rowsData),
	    				 	cause:Ext.encode(text)
	    				}, 
	    				success : function(response) { 
	    				   App.setAlert(true,"企业分级调整成功！"); 
	    				   
	    				}, 
	    				failure : function(response) { 
	    				   App.setAlert(false,"企业分级调整失败！"); 
	    			    }
	    		   }); 
	            }
	        });
//		  Ext.getCmp('OrgCompanyLevelAdjustMaster').store.save();
	  }
});

com.cce.companylevel.CompanyLevelForm = Ext.extend(Ext.form.FormPanel, {
	title: '分级查询',
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
			autoScroll : true,
			height : 130,
			header : true,
			colspan:2,
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
	    this.addEvents({
	        /**
	         * @event create
	         * Fires when user clicks [create] button
	         * @param {FormPanel} this
	         * @param {Record} values, the Form's record object
	         */
	        save : true
	    });
	
	    // super
	    com.cce.companylevel.CompanyLevelForm.superclass.initComponent.call(this);
	},
	

  /**
   * buildform
   * @private
   */
  buildForm : function() {	
		
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
					    	   id:'beginDate',
					    	   allowBlank:false,
					           name:'beginDate',
					            format:'m/d/Y',
					           align:'left'
					    },
				        {
					    	   xtype:"datefield",
					            fieldLabel: '结束日期',
					    	   id:'endDate',
					    	   allowBlank:false,
					            name:'endDate',
					            format:'m/d/Y',
					           align:'left'
					    },
				        {
            				scope: this,
                            xtype:          'combo',
                            mode:           'local',
                            value:          '请选择....',
                            triggerAction:  'all',
                            forceSelection: true,
                            editable:       false,
						    anchor: '100%',
						    colspan:2,
                            fieldLabel:     '企业级别',
                            name:           'entLevel',
                            hiddenName:     'entLevel',
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
			text:"查询",
			scope: this,
			handler:searchLevelInfo
	  	}, {
	        text: '关闭',
	        handler: function(btn, ev){
	  			this.fireEvent('afterSearch', this, null);
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
  onSave : function(btn, ev) {
      if (this.record == null) {
          return;
      }
      if (!this.getForm().isValid()) {
          App.setAlert(false, "表单数据有错误.");
          return false;
      }
      this.fireEvent('save', this, this.record);
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
		
		this.master = new com.cce.companylevel.OrgCompanyLevelAdjustMaster({ store : this.store });
		this.frame= new com.cce.companylevel.OrgCompanyLevelAdjust();		
		
		
		//关联自定义事件
	    //this.relayEvents(this.store, ['destroy', 'save', 'update']);
		
		this.master.on('doSearch', this.showSearchForm, this);
		this.frame.add(this.master);
		
  	this.main.add(this.frame);
  	this.main.doLayout();
//  	this.store.load({params:{start:0,limit:20}}); 
	},

	showSearchForm : function(g, store, record){
		if(!record){
	        record = new store.recordType();
		}
		var form = new com.cce.companylevel.CompanyLevelForm();
		form.on('afterSearch', this.afterSearch, this);
		this.win = new Ext.Window({
		    title: '分级查询',
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
		
		form.loadRecord(record);		
		this.win.show();
	},

	showAdjustForm : function(g, store, record){
		
	},

	onSave : function(fp, record){		
		
		
	},
	afterSearch : function(fp, record){
        this.win.close();
	}
});
