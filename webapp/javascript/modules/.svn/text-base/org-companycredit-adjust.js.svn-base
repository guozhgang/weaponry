Ext.ns("com.cce.companycredit");

ScriptMgr.load({ scripts: ['javascript/utils/FormTableLayout.js']});
//------------------------------------------------------------------------------
//Module的proxy定义..
//------------------------------------------------------------------------------
var proxy = new Ext.data.HttpProxy({
api: {
    read : 'credit/approval4Credit!search.action',
    create : 'credit/approval4Credit!adjust.action',
    update: 'credit/approval4Credit!adjust.action',
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
			{name: 'entCredit',mapping:'entCredit'},
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

var searchCreditInfo = function() {
    if (!this.getForm().isValid()) {
        App.setAlert(false, "表单数据有错误.");
        return false;
    }
	Ext.getCmp('OrgCompanyCreditAdjustMaster').store.load({
		params : { 
			 	data:Ext.encode(this.getForm().getValues()),
			 	start:0,limit:20
			}
	}); 
	this.fireEvent('afterSearch', this, null);
};
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
                
               new Ext.grid.CheckboxSelectionModel(), 
               {header:'企业名',dataIndex:'entName'},
               {header:'税务登记号',dataIndex:'entNo'},
               {header:'档案级别',dataIndex:'entCredit',
            	   editor: new Ext.form.ComboBox({     
                       mode:           'local',
                       triggerAction:  'all',
                       forceSelection: true,
                       editable:       false,
                       fieldLabel:     '档案级别',
                       name:           'entCredit',
                       hiddenName:     'entCredit',
                       displayField:   'name',
                       valueField:     'name',
                       store:          new Ext.data.JsonStore({
                           fields : ['name', 'value'],
                           data   : [
                               {name : 'A级',   value: 'A'},
                                {name : 'B级',  value: 'B'},
                                {name : 'C级', value: 'C'},
                                {name : 'D级', value: 'D'}
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

com.cce.companycredit.OrgCompanyCreditAdjust=Ext.extend(Ext.Panel,{
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

com.cce.companycredit.OrgCompanyCreditAdjustMaster = Ext.extend(Ext.grid.EditorGridPanel, {
	  id:'OrgCompanyCreditAdjustMaster',
	  stripeRows: true,
	  loadMask: true,
	  border: false,
	  enableHdMenu: false,
	  header:false,
	  region:'center',
	  closable:true,
	  columns:columns,
	  sm : new Ext.grid.CheckboxSelectionModel(),
	  initComponent : function() {
		    // typical viewConfig
		    this.viewConfig = {
		        forceFit: true
		    };
		
		    // build toolbars and buttons.
		    this.tbar = this.buildTopToolbar();
		    this.bbar = this.buildBottomToolbar();
		    
		    
		    
		    // super
		    com.cce.companycredit.OrgCompanyCreditAdjustMaster.superclass.initComponent.call(this);
		    
		    this.addEvents(
		    	'doedit',
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
	    	},	    	
			{
					text:"信用调整",
					iconCls:"change_credit",
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
	  onAll : function(){
		  this.fireEvent('doAll', this, this.store, null);
	  },
	  onSearch : function() {
	      this.fireEvent('doSearch', this, this.store, null);
	  },
	  onAdjust : function(){
  	    var theStore=Ext.getCmp('OrgCompanyCreditAdjustMaster').store;
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
	    				url : 'credit/approval4Credit!adjust.action',
	    				scope: this,
	    				params : { 
	    				 	data:Ext.encode(rowsData),
	    				 	cause:Ext.encode(text)
	    				}, 
	    				success : function(response) { 
	    					App.setAlert(Ext.util.JSON.decode(response.responseText).success,Ext.util.JSON.decode(response.responseText).message);
	    					adjust_store.load({
	  						   scope: this,
	  						   params:{start:0,limit:20}	  						    
	  					    }); 
	    				}, 
	    				failure : function(response) { 
	    				   App.setAlert(false,"档案分级调整失败！"); 
	    			    }
	    		   }); 
	            }
	        });
//		  Ext.getCmp('OrgCompanyCreditAdjustMaster').store.save();
	  }
	  
});

com.cce.companycredit.CreditSearchForm = Ext.extend(Ext.form.FormPanel, {
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
	    com.cce.companycredit.CreditSearchForm.superclass.initComponent.call(this);
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

var adjust_store = new Ext.data.Store({
    id: 'id',
    message: 'message',
    proxy: proxy,
    reader: reader,
    writer: writer,  // <-- plug a DataWriter into the store just as you would a Reader
    autoSave: false
  });
//------------------------------------------------------------------------------
//Module的定义放在最后,eval(xxx.js)后返回Module的类定义..
//------------------------------------------------------------------------------
Ext.extend(com.cce.Module, {
	win: null,
	init: function(){

		this.master = new com.cce.companycredit.OrgCompanyCreditAdjustMaster({ store : adjust_store });
		this.frame= new com.cce.companycredit.OrgCompanyCreditAdjust();		
		adjust_store.on("beforeload", function(thiz, options) {
	 		thiz.baseParams["data"] = searchParams;
		});
		
		//关联自定义事件
	    //this.relayEvents(this.store, ['destroy', 'save', 'update']);

		this.master.on('doSearch', this.showSearchForm, this);
		this.master.on('doAll', this.onAllData, this);
		
		this.frame.add(this.master);
		
  	this.main.add(this.frame);
  	this.main.doLayout();
  	 adjust_store.load({params:{start:0,limit:20}}); 
	},

	showSearchForm : function(g, store, record){
		if(!record){
	        record = new store.recordType();
		}
		var form = new com.cce.companycredit.CreditSearchForm();
		
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
	
	showForm : function(g, store, record){
		
	},

	showReForm : function(g, store, record){
		
		
	},
	
	onSave : function(fp, record){		

		
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
		adjust_store.load({
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
		adjust_store.load({
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
