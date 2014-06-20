Ext.ns("com.cce.companycredit");

ScriptMgr.load({ scripts: ['javascript/utils/FormTableLayout.js']});
//------------------------------------------------------------------------------
//Module的proxy定义..
//------------------------------------------------------------------------------
var proxy = new Ext.data.HttpProxy({
api: {
    read : 'credit/approval4Credit!search.action',
    create : 'credit/approval4Credit!save.action',
    update: 'credit/approval4Credit!save.action',
    destroy: 'credit/approval4Credit!delete.action'
	}
});

var proxy_detail = new Ext.data.HttpProxy({
	api: {
		    read : 'credit/approval4Credit!getDetailsByApprovalId.action',
		    create : 'credit/approval4Credit!save.action',
		    destroy: 'credit/approval4Credit!delete.action'
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
			{name: 'entCredit',mapping:'entCredit'},
			{name: 'fileId',mapping:'fileId'},
			{name: 'remark',mapping:'remark'},
			{name: 'entNo',mapping:'entNo'},
		    {name: 'createDate',mapping:"createDate",type:'date',dateFormat:'time'},
		    {name: 'updateDate',mapping:"updateDate",type:'date',dateFormat:'time'},
			{name: 'status',mapping:'status'}
		]
	);

var reader_detail = new Ext.data.JsonReader(
		{root:'data'},
		[ 
		    	{name: 'id',mapping:"id"},
		    	{name: 'createBy',mapping:'createBy'},
		    	{name: 'role',mapping:'role'},
		    	{name: 'operate',mapping:'operate'},
		    	{name: 'comment',mapping:'comment'},
		    	{name: 'createDate',mapping:'createDate',type:'date',dateFormat:'time'}
		]
	);

function status(val){
	if(val&&val!="")
	for(var i=0;i<DICT_APPROVE_STATUS.length;i++)
	{
		if(val==DICT_APPROVE_STATUS[i][1]) return DICT_APPROVE_STATUS[i][2];
	}
	return ""; 
} 

var searchCreditInfo = function() {
    if (!this.getForm().isValid()) {
        App.setAlert(false, "表单数据有错误.");
        return false;
    }
	Ext.getCmp('OrgCompanyCreditSearchMaster').store.load({
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
function linker(val){
	if(val&&val!="")
	return "<a title='点击下载' target='_blank' href='upload/download.action?id="+val+"'>↓下载</a>";  
	else return "";
}    
//------------------------------------------------------------------------------
//Module的columns定义..
//------------------------------------------------------------------------------
var columns = [
               {header:'企业名',dataIndex:'entName'},
               {header:'税务登记号',dataIndex:'entNo'},
               {header:'信用等级',dataIndex:'entCredit'},
               {header:'档案文件',dataIndex:'fileId',renderer:linker},
               {header:'说明',dataIndex:'remark'},
	           	{header:'创建日期',dataIndex:'createDate',renderer:Ext.util.Format.dateRenderer('Y年m月d日 H时i分s秒'),sortable:true},
	        	{header:'更新日期',dataIndex:'updateDate',renderer:Ext.util.Format.dateRenderer('Y年m月d日 H时i分s秒'),sortable:true},
               {header:'状态',dataIndex:'status'}
           ];

var columns_detail = [
      {header:'操作人',dataIndex:'createBy'},
      {header:'角色',dataIndex:'role'},
      {header:'操作',dataIndex:'operate'},
      {header:'日期',dataIndex:'createDate',renderer:Ext.util.Format.dateRenderer('Y年m月d日 H时i分s秒'),sortable:true},
      {header:'备注',dataIndex:'comment'}
];

//------------------------------------------------------------------------------
//Module的company主Panel定义..
//------------------------------------------------------------------------------

com.cce.companycredit.OrgCompanyCreditSearch=Ext.extend(Ext.Panel,{
	loadMask: true,
	border: false,
	enableHdMenu: false,
	header:false,
	region:'center',
	closable:true,
	layout:"border",
	frame:true
});


//------------------------------------------------------------------------------
//Module的CompanyRecordGrid定义..
//------------------------------------------------------------------------------

com.cce.companycredit.OrgCompanyCreditSearchMaster = Ext.extend(Ext.grid.GridPanel, {
	  id:'OrgCompanyCreditSearchMaster',
	  stripeRows: true,
	  loadMask: true,
	  border: false,
	  enableHdMenu: false,
	  header:false,
	  region:'center',
	  closable:true,
	  columns:columns,
	  frame:true,
	  initComponent : function() {
		    // typical viewConfig
		    this.viewConfig = {
		        forceFit: true
		    };
		
		    // build toolbars and buttons.
		    this.tbar = this.buildTopToolbar();
		    this.bbar = this.buildBottomToolbar();
		    
		    
		    
		    // super
		    com.cce.companycredit.OrgCompanyCreditSearchMaster.superclass.initComponent.call(this);
		    
		    this.addEvents(
		    	'doedit',
		    	'doSearch',
		    	'doAll'
		    );
		},
		
		 /**
	   * buildTopToolbar
	   */
	  buildTopToolbar : function() {
		return [
				{
						text:"查询全部",
						iconCls:"select",
						scope: this,
						handler:this.onAll
				},
		    	{
						text:"条件查询",
						iconCls:"selectby",
						scope: this,
						handler:this.onSearch
				} 
    	];
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
	  onAll : function(){
		  this.fireEvent('doAll', this, this.store, null);
	  },
	  onSearch : function() {
	      this.fireEvent('doSearch', this, this.store, null);
	  },
	  onView : function(){
		  var record = this.getSelectionModel().getSelected();
	      if (!record) {
	            return false;
	      }
	      this.fireEvent('doView', this, this.store, record);
	  }
});

com.cce.companycredit.CompanyCreditForm = Ext.extend(Ext.form.FormPanel, {
	title: '信用查询',
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
		
		var status_store = new Ext.data.SimpleStore({
			fields: ['id', 'code', 'value'],
            data : DICT_APPROVE_STATUS
//            fields: [{name:'id',type:'int'},{name:'code'},{name:'value'}],//['id', 'code', 'value'],
//            data : [[3,'PROCESSING','审批中'],[4,'PASSED','审批通过'],[5,'REJECTED','退回']]//DICT_APPROVE_STATUS
        });
		
		this.status_combo = new Ext.form.ComboBox({
	        store: status_store,
	        id:"status",
	        name:"status",
	        fieldLabel:'状态',
	        displayField:'value',
	        triggerAction:'all',
	        valueField:'id',
	        mode: 'local',
	        anchor: '100%',
	        editable:false,
	        colspan:2
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
	    },'doSearchForm');
	
	    // super
	    com.cce.companycredit.CompanyCreditForm.superclass.initComponent.call(this);
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
	            if(!endDate)
	            	return true;
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
                            emptyText:'请选择档案级别',
						    colspan:2,
                            triggerAction:  'all',
                            forceSelection: true,
                            editable:       false,
                            fieldLabel:     '档案级别',
                            id:'entCredit-1',
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
						this.status_combo,
						{
							 xtype: 'textfield',
						     fieldLabel: '企业备案登记号',
							 anchor: '100%',
							 colspan:2,
							 id:'CompanyNo',
							 name:'CompanyNo'
						},
						this.regionTree,
						this.regionTree.hiddenRegionId
				    ];
  },  
 
  buildUI : function(){
      return [{
			text:"查询",
			scope: this,
			handler:this.searchCreditInfo
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
  searchCreditInfo : function(btn, ev) {
      
	  if (this.record == null) {
          return;
      }
      if (!this.getForm().isValid()) {
          App.setAlert(false, "表单数据有错误.");
          return false;
      }
      this.fireEvent('doSearchForm', this, this.record);
      
  }
 
});

com.cce.companycredit.ViewCreditInfoForm = Ext.extend(Ext.form.FormPanel, {
	title: '企业分级',
	modal:true,
	iconCls: 'silk-user',
	labelWidth: 100,
	width: 500,
	height: 529,
	padding: 10,
	header: false,
	frame: true,
	region:'center',
	layout: 'form',
	autoScroll: true,
  // private A pointer to the currently loaded record
	record : null,

	initComponent : function() {
		// build the form-fields.  Always a good idea to defer form-building to a method so that this class can
	    // be over-ridden to provide different form-fields
	    this.items = [];
	
	    // build form-buttons
	    this.buttons = this.buildUI();

	    this.addEvents({
	        afterSave : true
	    });
	
	    // super
	    com.cce.companycredit.ViewCreditInfoForm.superclass.initComponent.call(this);
	},
	
	
	buildUI : function(){
	    return [{
	        text: '关闭',
	        handler: function(btn, ev){
	  			this.fireEvent('afterSave', this, null);
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
	    var theStore=Ext.getCmp('ViewGroupGrid').store;
		theStore.save();
		this.fireEvent('afterSave', this, null);
	}

});

//------------------------------------------------------------------------------
//Module的RecordExpertMore内容Panel定义..
//------------------------------------------------------------------------------

com.cce.companycredit.OrgCompanyCreditSearchDetail=Ext.extend(Ext.grid.GridPanel ,{
	  stripeRows: true,
	  loadMask: true,
	  border: false,
	  enableHdMenu: false,
	  header:false,
	  region:'south',
	  closable:true,
	  height:260,
	  split:true,
	  columns:columns_detail,
	  frame:true,
	  initComponent : function() {
		    // typical viewConfig
		    this.viewConfig = {
		        forceFit: true
		    };
		    // super
		    com.cce.companycredit.OrgCompanyCreditSearchDetail.superclass.initComponent.call(this);
		    
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
		this.store.on("beforeload", function(thiz, options) {
	 		thiz.baseParams["data"] = searchParams;
		});
		this.store_detail = new Ext.data.Store({
		    id: 'id',
		    message: 'message',
		    proxy: proxy_detail,
		    reader: reader_detail,
		    writer: writer,  // <-- plug a DataWriter into the store just as you would a Reader
		    autoSave: false
		  });
		this.master = new com.cce.companycredit.OrgCompanyCreditSearchMaster({ store : this.store });
		this.detail= new com.cce.companycredit.OrgCompanyCreditSearchDetail({ store : this.store_detail });
		this.frame= new com.cce.companycredit.OrgCompanyCreditSearch();		
		
		
		//关联自定义事件
	    //this.relayEvents(this.store, ['destroy', 'save', 'update']);

		this.master.on('doSearch', this.showSearchForm, this);
		this.master.on('doAll', this.onAllData, this);
		this.master.on('doView', this.viewCreditForm, this);
		this.master.on('rowclick', function(g, index, ev){
			this.record =g.store.getAt(index);
			this.store_detail.load({
    			params : { 
     			 	data:this.record.get("id")
     			}
    		}); 
		}, this);
		this.frame.add(this.master);
		this.frame.add(this.detail);
		
  	this.main.add(this.frame);
  	this.main.doLayout();
  	this.store.load({params:{start:0,limit:20}}); 
	},
	viewCreditForm : function(g, store, record){
		if(!record){
	        record = new store.recordType();
		}
		var form = new com.cce.companycredit.ViewCreditInfoForm();
		this.editWin = new Ext.Window({
		    title: '查看信用信息',
		    closable:true,
		    width:580,
		    height:505,
		    constrain:true,
		    plain:true,
		    layout: 'border',
		    resizable:true,
		    autoScroll: true,
		    modal:true,
		    items: [form]
		});
		form.on('afterSearch', this.afterSearch, this);
		form.loadRecord(record);		
		this.editWin.show();
	},

	showSearchForm : function(g, store, record){
		if(!record){
	        record = new store.recordType();
		}
		var form = new com.cce.companycredit.CompanyCreditForm();
		form.on('afterSearch', this.afterSearch, this);
		form.on('doSearchForm',this.onSelect,this);
		this.win = new Ext.Window({
		    title: '信用查询',
		    closable:true,
		    width:480,
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
		if(startdate==''){
			//form.get('startdate').setValue(new Date());
		}else{
			form.get('startdate').setValue(startdate);
		}
		if(enddate==''){
			//form.get('enddate').setValue(new Date());
		}else{
			form.get('enddate').setValue(enddate);
		}
		
		form.get('cce_regionTree').hiddenRegionId.setValue(region_id);
		form.get('entName').setValue(entname);
		form.get('entCredit-1').setValue(entCredit);
		form.get('status').setValue(status);
		
		this.win.show();
	},
	
    onSelect:function(fp){
		var data = new Array();
 
		
		if(fp.get('startdate').getValue()!=null&&fp.get('startdate').getValue()!=""){
			startdate  = fp.get('startdate').getValue().format('m/d/Y').toString();
			data.push("startdate", startdate);
		}
		if(fp.get('enddate').getValue()!=null&&fp.get('enddate').getValue()!=""){
			enddate = fp.get('enddate').getValue().format('m/d/Y').toString();
			data.push("enddate", enddate);
		}
		 
		
		region_id = fp.get('cce_regionTree').hiddenRegionId.getValue();
		
		if(region_id!=""){
			data.push('region_id',region_id);
		}
		entname= fp.get('entName').getValue();
		
		if(entname!=""){
			data.push('entname',entname);
		}
		
	    entCredit=fp.get('entCredit-1').getValue();
		
		if(entCredit!=""){
			data.push('entCredit',entCredit);
		}
		
		status= fp.get('status').getValue();
		
		if(status!=""){
			data.push('status',status);
		}	

		searchParams=Ext.encode({
			'beginDate':startdate,
			'endDate':enddate,
			'regionId':region_id,
			'entName':entname,
			'entCredit':entCredit,
			'status':status
		});	 
		//查询
		 this.store.load({
				params:{
					start:0,
				    limit:20
				}
		 });
			
		 this.win.close();
		
	},
	onAllData:function(fp,record){
		searchParams=Ext.encode({
			'beginDate':'',
			'endDate':'',
			'regionId':'',
			'entName':'',
			'entCredit':'',
			'status':''
		});
		//查询
		 this.store.load({
				params:{
				start:0,
			    limit:20
			 }
		 });
	},
	afterSearch : function(fp, record){
        this.win.close();
	}
});
var startdate="";
var enddate="";
var region_id="";
var entname="";
var entCredit="";
var status="";
var searchParams=Ext.encode({
	'beginDate':'',
	'endDate':'',
	'regionId':'',
	'entName':'',
	'entCredit':'',
	'status':''
});