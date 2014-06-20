Ext.ns("com.cce.traceinfo");

ScriptMgr.load({ scripts: ['javascript/utils/FormTableLayout.js']});
//------------------------------------------------------------------------------
//Module的proxy定义..
//------------------------------------------------------------------------------
var proxy = new Ext.data.HttpProxy({
api: {
    read : 'trace/traceinfo!list.action',
    create : 'trace/traceinfo!save.action',
    update: 'trace/traceinfo!save.action',
    destroy: 'trace/traceinfo!delete.action'
	}
});

var proxy_transport_detail = new Ext.data.HttpProxy({
	api: {
		    read : 'trace/traceinfo!listTransport.action',
		    create : 'trace/traceinfo!save.action',
		    destroy: 'trace/traceinfo!delete.action'
		}
	});

var proxy_butcher_detail = new Ext.data.HttpProxy({
	api: {
		    read : 'trace/traceinfo!listButcher.action',
		    create : 'trace/traceinfo!save.action',
		    destroy: 'trace/traceinfo!delete.action'
		}
	});

var proxy_inventory_detail = new Ext.data.HttpProxy({
	api: {
		    read : 'trace/traceinfo!listInventory.action',
		    create : 'trace/traceinfo!save.action',
		    destroy: 'trace/traceinfo!delete.action'
		}
	});

var proxy_sale_detail = new Ext.data.HttpProxy({
	api: {
		    read : 'trace/traceinfo!listSale.action',
		    create : 'trace/traceinfo!save.action',
		    destroy: 'trace/traceinfo!delete.action'
		}
	});

//------------------------------------------------------------------------------
//Module的reader定义..
//------------------------------------------------------------------------------
var reader = new Ext.data.JsonReader(
		{root:'data'},
		[ 
		 	{name: 'id',mapping:"id"},
			{name: 'traceCode',mapping:'traceCode'},
			{name: 'productName',mapping:'productName'},
			{name: 'weight',mapping:'weight'},
			{name: 'unitPrice',mapping:'unitPrice'},
		    {name: 'butCompany',mapping:"butCompany"},
		    {name: 'intoTime',mapping:"intoTime",type:'date',dateFormat:'time'},
		    {name: 'butTime',mapping:"butTime",type:'date',dateFormat:'time'},
			{name: 'outTime',mapping:'outTime',type:'date',dateFormat:'time'},
			{name: 'saleTime',mapping:'saleTime',type:'date',dateFormat:'time'}
		]
	);

var reader_transport_detail = new Ext.data.JsonReader(
		{root:'data'},
		[ 
		    	{name: 'id',mapping:"id"},
		    	{name: 'companyName',mapping:'companyName'},
		    	{name: 'orgCode',mapping:'orgCode'},
		    	{name: 'stock',mapping:'stock',type:'date',dateFormat:'time'},
		    	{name: 'shipment',mapping:'shipment',type:'date',dateFormat:'time'}
		]
	);

var reader_butcher_detail = new Ext.data.JsonReader(
		{root:'data'},
		[ 
		    	{name: 'id',mapping:"id"},
		    	{name: 'companyName',mapping:"companyName"},
		    	{name: 'orgCode',mapping:'orgCode'},
		    	{name: 'pigStockTime',mapping:'pigStockTime',dateFormat:'time'},
		    	{name: 'pigOrigin',mapping:'pigOrigin'},
		    	{name: 'farm',mapping:'farm'},
		    	{name: 'originCheckNo',mapping:'originCheckNo'},
		    	{name: 'originGovAgency',mapping:'originGovAgency'},
		    	{name: 'autoCheckTime',mapping:'autoCheckTime',dateFormat:'time'},
		    	{name: 'autoCheckOrg',mapping:'autoCheckOrg'},
		    	{name: 'butcherTime',mapping:'butcherTime',dateFormat:'time'},
		    	{name: 'inspectionTime',mapping:'inspectionTime',dateFormat:'time'},
		    	{name: 'shipmentTime',mapping:'shipmentTime',dateFormat:'time'},
		    	{name: 'qualityCheckNo',mapping:'qualityCheckNo'},
		    	{name: 'qualityCheckDepart',mapping:'qualityCheckDepart'},
		    	{name: 'animalCertificateNo',mapping:'animalCertificateNo'},
		    	{name: 'animalCheckDepart',mapping:'animalCheckDepart'},
		    	{name: 'listerizeNo',mapping:'listerizeNo'},
		    	{name: 'listerizeCheckDepart',mapping:'listerizeCheckDepart'},
		    	{name: 'extenalCheckNo',mapping:'extenalCheckNo'},
		    	{name: 'extenalCheckDepart',mapping:'extenalCheckDepart'},
		    	{name: 'nonEpizootieTime',mapping:'nonEpizootieTime',dateFormat:'time'},
		    	{name: 'nonEpizootieDepart',mapping:'nonEpizootieDepart'}
		]
	);

var reader_inventory_detail = new Ext.data.JsonReader(
		{root:'data'},
		[ 
		    	{name: 'id',mapping:"id"},
		    	{name: 'checkTime',mapping:'checkTime',type:'date',dateFormat:'time'},
		    	{name: 'checkNo',mapping:'checkNo'},
		    	{name: 'checkPlace',mapping:'checkPlace'},
		    	{name: 'govAgency',mapping:'govAgency'}
		]
	);

var reader_sale_detail = new Ext.data.JsonReader(
		{root:'data'},
		[ 
		    	{name: 'id',mapping:"id"},
		    	{name: 'traceCode',mapping:'traceCode'},
		    	{name: 'productName',mapping:'productName'},
		    	{name: 'weight',mapping:'weight'},
		    	{name: 'unitPrice',mapping:'unitPrice'}
		]
	);



var searchtraceInfo = function() {
    if (!this.getForm().isValid()) {
        App.setAlert(false, "表单数据有错误.");
        return false;
    }
	Ext.getCmp('OrgtraceinfoSearchMaster').store.load({
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
               {header:'追溯码',dataIndex:'traceCode'},
               {header:'品名',dataIndex:'productName'},
               {header:'重量',dataIndex:'weight'},
               {header:'单价',dataIndex:'unitPrice'},
               {header:'屠宰企业',dataIndex:'butCompany'},
	           {header:'进厂时间',dataIndex:'intoTime',renderer:Ext.util.Format.dateRenderer('Y年m月d日 H时i分s秒')},
	           {header:'屠宰时间',dataIndex:'butTime',renderer:Ext.util.Format.dateRenderer('Y年m月d日 H时i分s秒')},
	           {header:'出厂时间',dataIndex:'outTime',renderer:Ext.util.Format.dateRenderer('Y年m月d日 H时i分s秒')},
               {header:'销售时间',dataIndex:'saleTime',renderer:Ext.util.Format.dateRenderer('Y年m月d日 H时i分s秒')}
           ];

var columns_transport_detail = [
      {header:'企业名称',dataIndex:'companyName'},
      {header:'组织机构代码',dataIndex:'orgCode'},
      {header:'进货时间',dataIndex:'stock',renderer:Ext.util.Format.dateRenderer('Y年m月d日 H时i分s秒'),sortable:true},
      {header:'出货时间',dataIndex:'shipment',renderer:Ext.util.Format.dateRenderer('Y年m月d日 H时i分s秒'),sortable:true}
];

var columns_butcher_detail = [
                                {header:'企业名称',dataIndex:'companyName'},
                                {header:'组织机构代码证号',dataIndex:'orgCode'},
                                {header:'活猪进厂（场）时间',dataIndex:'pigStockTime'},
                                {header:'活猪来源地区',dataIndex:'pigOrigin'},
                                {header:'养殖场',dataIndex:'farm'},
                                {header:'产地检疫证号码',dataIndex:'originCheckNo'},
                                {header:'产地检疫证发证单位名称',dataIndex:'originGovAgency'},
                                {header:'动检时间',dataIndex:'autoCheckTime'},
                                {header:'动检检疫机构名称',dataIndex:'autoCheckOrg'},
                                {header:'屠宰时间',dataIndex:'butcherTime'},
                                {header:'商检时间',dataIndex:'inspectionTime'},
                                {header:'出厂（场）时间',dataIndex:'shipmentTime'},
                                {header:'肉品品质检验检疫证号',dataIndex:'qualityCheckNo'},
                                {header:'肉品品质检验检疫单位名称',dataIndex:'qualityCheckDepart'},
                                {header:'动物产品检疫合格证号',dataIndex:'animalCertificateNo'},
                                {header:'动物产品检疫单位名称',dataIndex:'animalCheckDepart'},
                                {header:'动物及动物产品运载工具消毒证明号',dataIndex:'listerizeNo'},
                                {header:'动物及动物产品运载工具消毒证明检疫单位名称',dataIndex:'listerizeCheckDepart'},
                                {header:'出县境动物产品检疫合格证号',dataIndex:'extenalCheckNo'},
                                {header:'出县境动物产品检疫证单位名称',dataIndex:'extenalCheckDepart'},
                                {header:'五号病非疫区证明书时间',dataIndex:'nonEpizootieTime'},
                                {header:'五号病非疫区证明书发证单位名称',dataIndex:'nonEpizootieDepart'}
                          ];

var columns_inventory_detail = [
                                {header:'查验时间',dataIndex:'checkTime',renderer:Ext.util.Format.dateRenderer('Y年m月d日 H时i分s秒'),sortable:true},
                                {header:'动检证号',dataIndex:'checkNo'},
                                {header:'动检地点',dataIndex:'checkPlace'},
                                {header:'动检证发证机关',dataIndex:'govAgency'}
                          ];

var columns_sale_detail = [
                                {header:'追溯码',dataIndex:'traceCode'},
                                {header:'品名',dataIndex:'productName'},
                                {header:'重量',dataIndex:'weight'},
                                {header:'单价',dataIndex:'unitPrice'}
                          ];

var typeStore=new Ext.data.Store({
    url:'trace/traceinfo!listTypeBox.action',
    reader: new Ext.data.JsonReader({
    	totalProperty:"total",
    	root:'data',
    	fields:['typeId','typeName']
    })
});

//------------------------------------------------------------------------------
//Module的company主Panel定义..
//------------------------------------------------------------------------------

com.cce.traceinfo.OrgtraceinfoSearch=Ext.extend(Ext.Panel,{
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

com.cce.traceinfo.OrgtraceinfoSearchMaster = Ext.extend(Ext.grid.GridPanel, {
	  id:'OrgtraceinfoSearchMaster',
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
		    com.cce.traceinfo.OrgtraceinfoSearchMaster.superclass.initComponent.call(this);
		    
		    this.addEvents(
		    	'doedit',
		    	'doSearch',
		    	'doAll'
		    );
		    typeStore.load();
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

com.cce.traceinfo.traceinfoForm = Ext.extend(Ext.form.FormPanel, {
	title: '溯源查询',
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
		
		this.typelistCombo = new Ext.form.ComboBox({
			id:'typeList',
			fieldLabel:"统计类型",
			hiddenName:'typeId',
			triggerAction:'all',
			editable:false,
			store:typeStore,
			displayField:'typeName',
			valueField:'typeId',
			anchor : '100%',
			colspan : 2  
		});
	
		
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
	    this.addEvents({
	        /**
	         * @event create
	         * Fires when user clicks [create] button
	         * @param {FormPanel} this
	         * @param {Record} values, the Form's record object
	         */
	        save : true
	    },'doSearchForm','doResetForm');
	
	    // super
	    com.cce.traceinfo.traceinfoForm.superclass.initComponent.call(this);
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
				            fieldLabel: '追溯码',
						    anchor: '100%',
						    colspan:2,
				            id:'traceCode',
				            name:'traceCode'
				        },
				        {
				            xtype: 'textfield',
				            fieldLabel: '企业名称',
						    anchor: '100%',
						    colspan:2,
				            id:'companyName',
				            name:'companyName'
				        },
				        this.typelistCombo,
				        {
					    	   xtype:"datefield",
					           fieldLabel: '开始日期',
					    	   id:'beginDate',					    	 
					           name:'beginDate',
					           format:'m/d/Y',
							   anchor:"100%",
					           align:'left'  
					    },
				        {
					    	   xtype:"datefield",
					           fieldLabel: '结束日期',
					    	   id:'endDate',					 
					           name:'endDate',
					           format:'m/d/Y',
							   anchor:"100%",
					           align:'left' 
					    },
						this.regionTree,
						this.regionTree.hiddenRegionId
				    ];
  },  
 
  buildUI : function(){
      return [{
			text:"查询",
			scope: this,
			handler:this.searchtraceInfo
	  	},
	  	{
			text:"重置",
			scope: this,
			handler:this.resetTraceInfo
	  	},{
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
  searchtraceInfo : function(btn, ev) {
      
	  if (this.record == null) {
          return;
      }
      if (!this.getForm().isValid()) {
          App.setAlert(false, "表单数据有错误.");
          return false;
      }
      this.fireEvent('doSearchForm', this, this.record);
      
  },
  resetTraceInfo : function(btn,ev){
	  this.fireEvent('doResetForm', this, this.record);
  }
 
});

com.cce.traceinfo.ViewtraceInfoForm = Ext.extend(Ext.form.FormPanel, {
	title: '溯源',
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
	    com.cce.traceinfo.ViewtraceInfoForm.superclass.initComponent.call(this);
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

com.cce.traceinfo.OrgTraceTransportDetail=Ext.extend(Ext.grid.GridPanel ,{
	  title : '流通环节',
	  stripeRows: true,
	  loadMask: true,
	  border: false,
	  enableHdMenu: false,
	  header:true,
	  region:'south',
	  closable:true,
	  height:260,
	  split:true,
	  columns:columns_transport_detail,
	  frame:true,
	  initComponent : function() {
		    // typical viewConfig
		    this.viewConfig = {
		        forceFit: true
		    };
		    // super
		    com.cce.traceinfo.OrgTraceTransportDetail.superclass.initComponent.call(this);
		    
		}
		
});

com.cce.traceinfo.OrgTraceButcherDetail=Ext.extend(Ext.Panel ,{
	  id:'preview-butcher-more',
	   region:'south',
	   height:260,
	   title:'屠宰阶段',
	   split:true,
	   closable:true,
	   autoScroll: true,
	   frame:true,
	   bodyStyle: 'padding: 10px; font-family: Arial; font-size: 12px;',
	   initComponent: function(store){
		    // super
		    com.cce.traceinfo.OrgTraceButcherDetail.superclass.initComponent.call(this);
		    
		}
		
});

updateButcherDetailInfo = function(record){ 
	
	var companyName = "&nbsp;" ;
	var orgCode = "&nbsp;" ;
	var pigStockTime = "&nbsp;" ;
	var pigOrigin = "&nbsp;" ;
	var farm = "&nbsp;" ;
	var originCheckNo = "&nbsp;" ;
	var originGovAgency = "&nbsp;" ;
	var autoCheckTime = "&nbsp;" ;
	var autoCheckOrg = "&nbsp" ;
	var butcherTime = "&nbsp" ;
	var inspectionTime = "&nbsp" ;
	var shipmentTime = "&nbsp" ;
	var qualityCheckNo = "&nbsp" ;
	var qualityCheckDepart = "&nbsp" ;
	var animalCertificateNo = "&nbsp" ;
	var animalCheckDepart = "&nbsp" ;
	var listerizeNo = "&nbsp" ;
	var listerizeCheckDepart = "&nbsp" ;
	var extenalCheckNo = "&nbsp" ;
	var extenalCheckDepart = "&nbsp" ;
	var nonEpizootieTime = "&nbsp" ;
	var nonEpizootieDepart = "&nbsp" ; 
	
	// Ext.util.Format.date(new Date(record.get("nonEpizootieTime")),'Y年m月d日 ');
	
	if(null!=record.get("companyName") && ""!=record.get("companyName")){
		companyName = record.get("companyName") ;
	}
	
	if(null!=record.get("orgCode") && ""!=record.get("orgCode")){
		orgCode = record.get("orgCode") ;
	}
	
	if(null!=record.get("pigStockTime") && ""!=record.get("pigStockTime")){
		pigStockTime = Ext.util.Format.date(new Date(record.get("pigStockTime")),'Y年m月d日 ');
	}
	
	if(null!=record.get("pigOrigin") && ""!=record.get("pigOrigin")){
		pigOrigin = record.get("pigOrigin") ;
	}
	
	if(null!=record.get("farm") && ""!=record.get("farm")){
		farm = record.get("farm") ;
	}
	
	if(null!=record.get("originCheckNo") && ""!=record.get("originCheckNo")){
		originCheckNo = record.get("originCheckNo") ;
	}
	
	if(null!=record.get("originGovAgency") && ""!=record.get("originGovAgency")){
		originGovAgency = record.get("originGovAgency") ;
	}
	
	if(null!=record.get("autoCheckTime") && ""!=record.get("autoCheckTime")){
		autoCheckTime = Ext.util.Format.date(new Date(record.get("autoCheckTime")),'Y年m月d日 ');
	}
	
	if(null!=record.get("autoCheckOrg") && ""!=record.get("autoCheckOrg")){
		autoCheckOrg = record.get("autoCheckOrg") ;
	}
	
	if(null!=record.get("butcherTime") && ""!=record.get("butcherTime")){
		butcherTime = Ext.util.Format.date(new Date( record.get("butcherTime")),'Y年m月d日 ') ;
	}
	
	if(null!=record.get("inspectionTime") && ""!=record.get("inspectionTime")){
		inspectionTime = Ext.util.Format.date(new Date(record.get("inspectionTime")),'Y年m月d日 ') ;
	}
	
	if(null!=record.get("shipmentTime") && ""!=record.get("shipmentTime")){
		shipmentTime = Ext.util.Format.date(new Date(record.get("shipmentTime")),'Y年m月d日 ') ;
	}
	
	if(null!=record.get("qualityCheckNo") && ""!=record.get("qualityCheckNo")){
		qualityCheckNo = record.get("qualityCheckNo") ;
	}
	
	if(null!=record.get("qualityCheckDepart") && ""!=record.get("qualityCheckDepart")){
		qualityCheckDepart = record.get("qualityCheckDepart") ;
	}
	
	if(null!=record.get("animalCertificateNo") && ""!=record.get("animalCertificateNo")){
		animalCertificateNo = record.get("animalCertificateNo") ;
	}
	
	if(null!=record.get("animalCheckDepart") && ""!=record.get("animalCheckDepart")){
		animalCheckDepart = record.get("animalCheckDepart") ;
	}
	
	if(null!=record.get("listerizeNo") && ""!=record.get("listerizeNo")){
		listerizeNo = record.get("listerizeNo") ;
	}
	
	if(null!=record.get("listerizeCheckDepart") && ""!=record.get("listerizeCheckDepart")){
		listerizeCheckDepart = record.get("listerizeCheckDepart") ;
	}
	
	if(null!=record.get("extenalCheckNo") && ""!=record.get("extenalCheckNo")){
		extenalCheckNo = record.get("extenalCheckNo") ;
	}
	
	if(null!=record.get("extenalCheckDepart") && ""!=record.get("extenalCheckDepart")){
		extenalCheckDepart = record.get("extenalCheckDepart") ;
	}
	
	if(null != record.get("nonEpizootieTime") && ""!= record.get("nonEpizootieTime")){
		nonEpizootieTime = Ext.util.Format.date(new Date(record.get("nonEpizootieTime")),'Y年m月d日 ');
	}
	
	if(null!=record.get("nonEpizootieDepart") &&""!=record.get("nonEpizootieDepart")){
		nonEpizootieDepart = record.get("nonEpizootieDepart");
	}
	
	var butcherDetailInfo='<table width="920" border="0" cellpadding="1" cellspacing="1"   class="datalist" >'+
								'<tr>'+
									'<td width="200" height="30" align="center"    >企业名称:</td>'+
									'<td >'+companyName+'</td>'+
									'<td width="200" height="30" align="center"    >组织机构代码证号:</td>'+
									'<td >'+orgCode+'</td>'+
								'</tr>'+
								'<tr>'+
								'<td width="150" height="30" align="center"    >活猪进厂（场）时间:</td>'+
								'<td >'+pigStockTime+'</td>'+
								'<td height="30" align="center">产地检疫证号码:</td>'+
								'<td>'+originCheckNo+'</td>'+
								'<tr>'+
									'<td height="30" align="center">活猪来源地区:</td>'+
									'<td>'+pigOrigin+'</td>'+
									'<td height="30" align="center">养殖场:</td>'+
									'<td>'+farm+'</td>'+
								'</tr>'+
								'<tr>'+
									'<td height="30" align="center">动检检疫机构名称:</td>'+
									'<td>'+autoCheckOrg+'</td>'+
									'<td height="30" align="center">出厂（场）时间:</td>'+
									'<td>'+shipmentTime+'</td>'+
								'</tr>'+
								'<tr>'+
									'<td height="30" align="center">产地检疫证发证单位名称:</td>'+
									'<td>'+originGovAgency+'</td>'+
									'<td height="30" align="center">动检时间:</td>'+
									'<td>'+autoCheckTime+'</td>'+
								'</tr>'+
								'<tr>'+
								'<td height="30" align="center">屠宰时间:</td>'+
								'<td>'+butcherTime+'</td>'+
								'<td height="30" align="center">商检时间:</td>'+
								'<td>'+inspectionTime+'</td>'+
								'</tr>'+
								'<tr>'+
									'<td height="30" align="center">动物产品检疫合格证号:</td>'+
									'<td>'+animalCertificateNo+'</td>'+
									'<td height="30" align="center">动物产品检疫单位名称:</td>'+
									'<td>'+animalCheckDepart+'</td>'+
								'</tr>'+
								'<tr>'+
								'<td height="30" align="center">肉品品质检验检疫证号:</td>'+
								'<td>'+qualityCheckNo+'</td>'+
								'<td height="30" align="center">肉品品质检验检疫单位名称:</td>'+
								'<td>'+qualityCheckDepart+'</td>'+
								'</tr>'+ 
								'<tr>'+
									'<td height="30" align="center">五号病非疫区证明书时间:</td>'+
									'<td>'+nonEpizootieTime+'</td>'+
									'<td height="30" align="center">五号病非疫区证明书发证单位名称:</td>'+
									'<td>'+nonEpizootieDepart+'</td>'+ 
								'</tr>'+
								'<tr>'+
								'<td height="30" align="center">出县境动物产品检疫合格证号:</td>'+
								'<td>'+extenalCheckNo+'</td>'+
								'<td height="30" align="center">出县境动物产品检疫证单位名称:</td>'+
								'<td>'+extenalCheckDepart+'</td>'+
								'</tr>'+
								'<tr>' + 
									'<td colspan="2" height="30" align="center">动物及动物产品运载工具消毒证明号:</td>'+
									'<td colspan="2">'+listerizeNo+'</td>'+
								'</tr>' +
								'<tr>' +
									'<td height="30" align="center" colspan="2">动物及动物产品运载工具消毒证明检疫单位名称:</td>'+
									'<td colspan="2">'+listerizeCheckDepart+'</td>'+
								'</tr>' +
						'</table>';
	
	Ext.getCmp('preview-butcher-more').body.update(butcherDetailInfo) ;
};



com.cce.traceinfo.OrgTraceInventoryDetail=Ext.extend(Ext.grid.GridPanel ,{
	  title : '查验点',
	  stripeRows: true,
	  loadMask: true,
	  border: false,
	  enableHdMenu: false,
	  header:true,
	  region:'south',
	  closable:true,
	  height:260,
	  split:true,
	  columns:columns_inventory_detail,
	  frame:true,
	  initComponent : function() {
		    // typical viewConfig
		    this.viewConfig = {
		        forceFit: true
		    };
		    // super
		    com.cce.traceinfo.OrgTraceInventoryDetail.superclass.initComponent.call(this);
		    
		}
		
});

com.cce.traceinfo.OrgTraceSaleDetail=Ext.extend(Ext.Panel ,{
	   id:'preview-traceInfo-more',
	   region:'south',
	   height:260,
	   title:'终端销售',
	   closable:true,
	   split:true,
	   autoScroll: true,
	   frame:true,
	   bodyStyle: 'padding: 10px; font-family: Arial; font-size: 12px;',
	   initComponent: function(store){
	
			com.cce.traceinfo.OrgTraceSaleDetail.superclass.initComponent.call(this);
		    
		}
});

updateSaleDetailInfo = function(record){
	var traceCode = "&nbsp;" ;
	var productName = "&nbsp;" ;
	var weight = "&nbsp;";
	var unitPrice = "&nbsp;" ;
	
	if(null!=record.get("traceCode") &&""!=record.get("traceCode")){
		traceCode = record.get("traceCode");
	}
	if(null!=record.get("productName") && ""!= record.get("productName")){
		productName = record.get("productName");
	}
	if(null!=record.get("weight") && ""!=record.get("weight")){
		weight = record.get("weight");
	}
	if(null!=record.get("unitPrice") && ""!= record.get("unitPrice")){
		unitPrice = record.get("unitPrice");
	}
	
	var saleDetailHtmlInfo='<table width="519" border="0" cellpadding="1" cellspacing="1"   class="datalist" >'+
								'<tr>'+
									'<td width="100" height="30" align="center"    >追溯码:</td>'+
									'<td >'+traceCode+'</td>'+
								'</tr>'+
								'<tr>'+
									'<td height="30" align="center">品名:</td>'+
									'<td>'+productName+'</td>'+
								'</tr>'+
								'<tr>'+
									'<td height="30" align="center">重量:</td>'+
									'<td >'+weight+'</td>'+
								'</tr>'+
								'<tr>'+
									'<td height="30" align="center"     >单价:</td>'+
									'<td >'+unitPrice+'</td>'+
								'</tr>'+
						'</table>';
	
	Ext.getCmp('preview-traceInfo-more').body.update(saleDetailHtmlInfo) ;
};

//------------------------------------------------------------------------------
//Module的定义放在最后,eval(xxx.js)后返回Module的类定义..
//------------------------------------------------------------------------------
Ext.extend(com.cce.Module, {
	win: null,
	init: function(){
		this.tabPanel = new Ext.TabPanel( {
			loadMask : true,
			autoScroll : false,
			border : false,
			enableHdMenu : false,
			header : false,
			region : 'south',
			closable : true,
			height : 260,
			split : true,
			activeTab : 0,
			frame : true,
			enableTabScroll : true
		});
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
		this.store_transport_detail = new Ext.data.Store({
		    id: 'id',
		    message: 'message',
		    proxy: proxy_transport_detail,
		    reader: reader_transport_detail,
		    writer: writer,  // <-- plug a DataWriter into the store just as you would a Reader
		    autoSave: false
		  });
		
		this.store_butcher_detail = new Ext.data.Store({
		    id: 'id',
		    message: 'message',
		    proxy: proxy_butcher_detail,
		    reader: reader_butcher_detail,
		    writer: writer,  // <-- plug a DataWriter into the store just as you would a Reader
		    autoSave: false
		  });
		
		this.store_inventory_detail = new Ext.data.Store({
		    id: 'id',
		    message: 'message',
		    proxy: proxy_inventory_detail,
		    reader: reader_inventory_detail,
		    writer: writer,  // <-- plug a DataWriter into the store just as you would a Reader
		    autoSave: false
		  });
		
		this.store_sale_detail = new Ext.data.Store({
		    id: 'id',
		    message: 'message',
		    proxy: proxy_sale_detail,
		    reader: reader_sale_detail,
		    writer: writer,  // <-- plug a DataWriter into the store just as you would a Reader
		    autoSave: false
		  });
		
		this.master = new com.cce.traceinfo.OrgtraceinfoSearchMaster({ store : this.store });
		
		this.transportDetail= new com.cce.traceinfo.OrgTraceTransportDetail({ store : this.store_transport_detail });
		this.butcherDetail= new com.cce.traceinfo.OrgTraceButcherDetail({ store : this.store_butcher_detail });
		this.inventoryDetail= new com.cce.traceinfo.OrgTraceInventoryDetail({ store : this.store_inventory_detail });
		this.saleDetail= new com.cce.traceinfo.OrgTraceSaleDetail({ store : this.store_sale_detail });
		
		this.frame= new com.cce.traceinfo.OrgtraceinfoSearch();		
		
		
		//关联自定义事件
	    //this.relayEvents(this.store, ['destroy', 'save', 'update']);

		this.master.on('doSearch', this.showSearchForm, this);
		this.master.on('doAll', this.onAllData, this);
		this.master.on('doView', this.viewtraceForm, this);
		this.master.on('rowclick', function(g, index, ev){
			this.record =g.store.getAt(index);
			this.store_transport_detail.load({
    			params : { 
     			 	data:this.record.get("id")
     			}
    		});
			this.store_butcher_detail.load({
    			params : { 
     			 	data:this.record.get("id")
     			},
     			callback:function(records,options,success){
     				if(success){
     					updateButcherDetailInfo(records[0]) ;
     				}
     			}
    		});
			this.store_inventory_detail.load({
    			params : { 
     			 	data:this.record.get("id")
     			}
    		});
			this.store_sale_detail.load({
    			params : { 
     			 	data:this.record.get("id")
     			},
     			callback:function(records,options,success){
     				if(success){
//     					alert(records[0].get("productName"));
     					updateSaleDetailInfo(records[0]);
     				}
     			}
    		});
			
		}, this);
		this.frame.add(this.master);
		this.frame.add(this.tabPanel);
		
		this.tabPanel.add(this.transportDetail) ;
		this.tabPanel.add(this.butcherDetail) ;
		this.tabPanel.add(this.inventoryDetail) ;
		this.tabPanel.add(this.saleDetail) ;
		
		this.tabPanel.setActiveTab(this.transportDetail);
		
  	this.main.add(this.frame);
  	this.main.doLayout();
  	
  	this.store.load({params:{start:0,limit:20}}); 
	},
	viewtraceForm : function(g, store, record){
		if(!record){
	        record = new store.recordType();
		}
		var form = new com.cce.traceinfo.ViewtraceInfoForm();
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
		var form = new com.cce.traceinfo.traceinfoForm();
		form.on('afterSearch', this.afterSearch, this);
		form.on('doSearchForm',this.onSelect,this);
		form.on('doResetForm',this.onReset,this);
		this.win = new Ext.Window({
		    title: '溯源查询',
		    closable:true,
		    width:480,
		    height:340,
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
		if(beginDate==''){
			//form.get('beginDate').setValue(new Date());
		}else{
			form.get('beginDate').setValue(beginDate);
		}
		if(endDate==''){
			//form.get('endDate').setValue(new Date());
		}else{
			form.get('endDate').setValue(endDate);
		}
		form.get('cce_regionTree').setTitle('所属地区: ' + region_name);
		form.get('cce_regionTree').hiddenRegionId.setValue(region_id);
		form.get('traceCode').setValue(traceCode);
		form.get('companyName').setValue(companyName) ;
		form.get('typeList').setValue(typeId) ;
		
		this.win.show();
	},
	
	onReset:function(fp){
		fp.get('beginDate').setValue('');
		fp.get('endDate').setValue('');
		fp.get('cce_regionTree').setTitle('所属地区: ');
		fp.get('cce_regionTree').hiddenRegionId.setValue('');
		fp.get('traceCode').setValue('');
		fp.get('companyName').setValue('') ;
		fp.get('typeList').setValue('') ;
	  
	  	beginDate="";
		endDate="";
		region_id="";
		region_name="";
		traceCode="";
		companyName = "" ;
		typeId = "" ;
	},
	
    onSelect:function(fp){
		var data = new Array();
 
		
		if(fp.get('beginDate').getValue()!=null&&fp.get('beginDate').getValue()!=""){
			beginDate  = fp.get('beginDate').getValue().format('m/d/Y').toString();
			data.push("beginDate", beginDate);
		}
		if(fp.get('endDate').getValue()!=null&&fp.get('endDate').getValue()!=""){
			endDate = fp.get('endDate').getValue().format('m/d/Y').toString();
			data.push("endDate", endDate);
		}
		 
		
		region_id = fp.get('cce_regionTree').hiddenRegionId.getValue();
		
		if(region_id!=""){
			data.push('region_id',region_id);
		}
		traceCode= fp.get('traceCode').getValue(); 
		
		companyName= fp.get('companyName').getValue(); 
		
		typeId=fp.get('typeList').getValue();
		 
		searchParams=Ext.encode({
			'beginDate':beginDate,
			'endDate':endDate,
			'regionId':region_id,
			'traceCode':traceCode,
			'companyName':companyName,
			'typeId' : typeId
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
			'traceCode':'',
			'companyName':'',
			'typeId' : ''
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
var beginDate="";
var endDate="";
var region_id="";
var region_name="";
var traceCode="";
var companyName = "" ;
var typeId = "" ;
var searchParams=Ext.encode({
	'beginDate':'',
	'endDate':'',
	'regionId':'',
	'traceCode':''
});