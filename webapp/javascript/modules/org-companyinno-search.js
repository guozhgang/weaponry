Ext.ns("com.cce.companyinno");
ScriptMgr.load({ scripts: ['javascript/utils/FormTableLayout.js']});
 
//------------------------------------------------------------------------------
//Module的proxy定义..
//------------------------------------------------------------------------------
var proxy = new Ext.data.HttpProxy({
	api: {
		    read : 'companyinno/AppButch!search.action'
		   
		}
}); 
var proxy_detail = new Ext.data.HttpProxy({
	api: {
		    read : 'companyinno/AppButch!getDetailByType.action'
		}
}); 
//------------------------------------------------------------------------------
//Module的reader定义..
//------------------------------------------------------------------------------
var reader = new Ext.data.JsonReader(
	{root:'data'},
	[ 
	    	{name: 'id',mapping:"id"},
	    	{name: 'innId',mapping:'innId'},
	    	{name: 'finid',mapping:'finid'},//补贴申领的id
	    	{name: 'entName',mapping:'entName'},	    	
	    	{name: 'owner',mapping:'owner'}, //货主
	    	{name: 'partName',mapping:'partName'},//产品名称
	    	{name: 'cause',mapping:'cause'}, //处理原因
	    	{name: 'weight',mapping:'weight'}, //处理数量
	    	{name: 'quantity',mapping:'quantity'}, //折合头数
	    	{name: 'approach',mapping:'approachValue'},//处理方式
	    	{name: 'qcSign',mapping:'qcSign'},//检验人员
			{name: 'pcSign',mapping:'pcSign'},//无害化处理人员
			{name: 'type',mapping:'type'}, //类型
			{name: 'status',mapping:'status'},
			{name: 'recFile',mapping:'recFile'},//视频文件
			{name: 'regionFullName',mapping:'regionFullName'},			
			{name: 'createDate',mapping:'createDate',type:'date',dateFormat:'time'},
			{name: 'beginDate',mapping:'beginDate',type:'date',dateFormat:'time'},//开始时间
			{name: 'dueDate',mapping:'dueDate',type:'date',dateFormat:'time'}//结束时间
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
       {header:'编号',dataIndex:'id'},
       {header:'所属企业',dataIndex:'entName'},
       {header:'类型',dataIndex:'type'}, 
       {header:'创建时间',dataIndex:'createDate',renderer:Ext.util.Format.dateRenderer('Y年m月d日 H时i分s秒'),sortable:true},
       {header:'所属区域',dataIndex:'regionFullName'},
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

com.cce.companyinno.OrgCompanyInnoSearch=Ext.extend(Ext.Panel,{
	id:'companylevel-Search-main',
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

com.cce.companyinno.OrgCompanyInnoSearchMaster = Ext.extend(Ext.grid.GridPanel, {
	id:'com.cce.companyinno.OrgCompanyInnoSearchMaster',
	  stripeRows: true,
	  loadMask: true,
	  border: false,
	  enableHdMenu: false,
	  header:false,
	  autoScroll:true,
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
		
		    // build toolbars and buttons.
		    this.tbar = this.buildTopToolbar();
		    this.bbar = this.buildBottomToolbar();
		    
		    
		    
		    // super
		    com.cce.companyinno.OrgCompanyInnoSearchMaster.superclass.initComponent.call(this);
		    
		    this.addEvents(
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
				}//,
//				{
//						text:"查看",
//						iconCls:"info",
//						scope: this,
//						handler:this.onView
//				}
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
	  onAll:function(){
		  this.fireEvent('doAll', this, this.store, null);
	  },
	  onSearch:function(){
		  this.fireEvent('doSearch', this, this.store, null);
	  }//,
//	  onView:function(){
//		  var record = this.getSelectionModel().getSelected();
//	      if (!record) {
//	            return false;
//	      }
//
//	      this.fireEvent('doView', this, this.store, record);
//	  }
		  
	   
});

//------------------------------------------------------------------------------
//Module的OrgCompanyInnoSearchDetail内容Panel定义..
//------------------------------------------------------------------------------

//**
//审批历史 panel
com.cce.companyinno.OrgCompanyInnoSearchDetail=Ext.extend(Ext.grid.GridPanel ,{
	  id:'OrgCompanyInnoSearchDetail',
	  title:'审批历史',
	  stripeRows: true,
	  loadMask: true,
	  border: false,
	  enableHdMenu: false,
	  header:false,
	  closable:false,
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
		    com.cce.companyinno.OrgCompanyInnoSearchDetail.superclass.initComponent.call(this);
		    
		}
		
});

com.cce.companyinno.OrgCompanyInnoSearchForm = Ext.extend(Ext.form.FormPanel, {
	title: '无害化查询',
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
			rootVisible : false,
			frame : true,
			colspan:2,
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
	        editable:false,
	        anchor: '100%'
		});

		var type_store = new Ext.data.SimpleStore({
            fields: ['id', 'code', 'value'],
            data : DICT_INNO_TYPE
        });
		
		this.type_combo = new Ext.form.ComboBox({
	        store: type_store,
	        id:"type",
	        name:"type",
	        fieldLabel:'处理类型',
	        displayField:'value',
	        triggerAction:'all',
	        valueField:'id',
	        mode: 'local',
	        anchor: '100%',
	        editable:false
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
	    com.cce.companyinno.OrgCompanyInnoSearchForm.superclass.initComponent.call(this);
	    
//	    Ext.apply(Ext.form.VTypes, {   
//	        dateRange: function(val, field){   
//	            if(field.dateRange){   
//	                var beginId = field.dateRange.begin;   
//	                this.beginField = Ext.getCmp(beginId);   
//	                var endId = field.dateRange.end;   
//	                this.endField = Ext.getCmp(endId);   
//	                var beginDate = this.beginField.getValue();   
//	                var endDate = this.endField.getValue();   
//	            }   
//	            if(beginDate <= endDate){   
//	                return true;   
//	            }else{   
//	                return false;   
//	            }   
//	        },   
//	        //验证失败信息   
//	        dateRangeText: '开始日期不能大于结束日期'  
//	    }); 
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
						    minValue:1,
						    maxValue:9999999999,
						    colspan:2,
				            id:'entName',
				            name:'entName'
				        },{
				            xtype: 'numberfield',
				            fieldLabel: '无害化编码',
						    anchor: '100%',
						    colspan:2,
				            id:'innoid',
				            name:'innoid'
				        },
				        this.status_combo,
				        this.type_combo,
				        {
					    	   xtype:"datefield",
					           fieldLabel: '开始日期',
					    	   id:'startdate',
					           name:'startdate',
					           format:'m/d/Y',
							   anchor:"100%",
					           align:'left'//,					         
//							   dateRange: {begin: 'startdate', end: 'enddate' }   
//			                  , vtype: 'dateRange' 
					    },
				        {
					    	   xtype:"datefield",
					           fieldLabel: '结束日期',
					    	   id:'enddate',
					           name:'enddate',
					           format:'m/d/Y',
							   anchor:"100%",
					           align:'left'//,					          
//							   dateRange: {begin: 'startdate', end: 'enddate' }   
//			                  , vtype: 'dateRange'
					    },				        
						this.regionTree,
						this.regionTree.hiddenRegionId
				    ]
  },  
 
  buildUI : function(){
      return [{
			text:"查询",
			scope: this,
			handler:this.search
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
  search : function(){
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

var Search_store = new Ext.data.Store({
    id: 'id',
    message: 'message',
    proxy: proxy,
    reader: reader,
    writer: writer,  // <-- plug a DataWriter into the store just as you would a Reader
    autoSave: false
});

var org_store_detail = new Ext.data.Store({
	  id: 'org_store_detail',
	  message: 'message',
	  proxy: proxy_detail,
	  reader: reader_detail,
	  writer: writer,  // <-- plug a DataWriter into the store just as you would a Reader
	  autoSave: false
});

com.cce.companyinno.OrgCompanyinnoContentPanel=Ext.extend(Ext.Panel ,{
   id:'OrgCompanyinnoContentPanel',
   region:'south',
   height:260,
   title:'详细信息',
   split:true,
   autoScroll:true,
   frame:true,
   bodyStyle: 'padding: 10px; font-family: Arial; font-size: 12px;',
	initComponent: function(store){
		this.stroe = store;
		com.cce.companyinno.OrgCompanyinnoContentPanel.superclass.initComponent.call(this);
	}
});

//------------------------------------------------------------------------------
//Module的定义放在最后,eval(xxx.js)后返回Module的类定义..
//------------------------------------------------------------------------------
Ext.extend(com.cce.Module, {
	win: null,
	init: function(){
		
		this.tabPanel = new Ext.TabPanel( {
			loadMask: true,
			autoScroll : true,
			border: false,
			enableHdMenu: false,
			header:false,
			region:'south',
			closable:true,
			height:260,
			split:true,
			activeTab : 0,
			frame:true,
			enableTabScroll : true
		});
		this.master = new com.cce.companyinno.OrgCompanyInnoSearchMaster({ store : Search_store });
		this.detail= new com.cce.companyinno.OrgCompanyInnoSearchDetail({ store : org_store_detail });
//		this.full= new com.cce.companyinno.OrgCompanyInnoSearchFull({ store : org_store_detail });
		this.full = new com.cce.companyinno.OrgCompanyinnoContentPanel();
		this.frame= new com.cce.companyinno.OrgCompanyInnoSearch();		
		Search_store.on("beforeload", function(thiz, options) {
	 		thiz.baseParams["data"] = searchParams;
		});
		
		//关联自定义事件
	    //this.relayEvents(this.store, ['destroy', 'save', 'update']);
		
		this.master.on('doSearch', this.showSearchForm, this);
		this.master.on('doAll', this.onAllData, this);	
		this.master.on('doView', this.showViewForm, this);	
		this.master.on('rowclick', function(g, index, ev){
			this.record =g.store.getAt(index);
			org_store_detail.load({
    			params : { 
					data:Ext.encode({
						id:this.record.get("innId"),
		     			type:this.record.get("type")
					})
     			}
    		}); 
			var spbeginDate="&nbsp;";
			var spdueDate="&nbsp;";
			var spfile="&nbsp;";
			var spowner="&nbsp;";
			var sppartName="&nbsp;";
			var spweight="&nbsp;";
			var spquantity="&nbsp;";
			var spqcSign="&nbsp;";
			var sppcSign="&nbsp;";
			var spapproach="&nbsp;";
			var spcause="&nbsp;";
			if(this.record.get('beginDate'))spbeginDate=this.record.get('beginDate').format('Y年m月d日 H时i分s秒').toString();
			if(this.record.get('dueDate'))spdueDate=this.record.get('dueDate').format('Y年m月d日 H时i分s秒').toString();
			if(this.record.get('recFile')) spfile=this.record.get('recFile');
			if(this.record.get('owner')) spowner=this.record.get('owner');
			if(this.record.get('partName')) sppartName=this.record.get('partName');
			if(this.record.get('weight')) spweight=this.record.get('weight');
			if(this.record.get('quantity')) spquantity=this.record.get('quantity');
			if(this.record.get('qcSign')) spqcSign=this.record.get('qcSign');
			if(this.record.get('pcSign')) sppcSign=this.record.get('pcSign');
			if(this.record.get('approach')) spapproach=this.record.get('approach');
			if(this.record.get('cause')) spcause=this.record.get('cause');
			if(this.record.get("type")=='产品猪登记'){
				var html='<table width="600" border="0" cellpadding="1" cellspacing="1" class="datalist">'+
				  		'<tr>'+
					      '<td width="83" height="30" align="center" bgcolor="#FFFFFF" class="company_info_bold" >货主</td>'+
					      '<td width="176" align="left" bgcolor="#FFFFFF" class="company_info" >'+spowner+'</td>'+
					      '<td width="146" align="center" bgcolor="#FFFFFF" class="company_info_bold" >产品名称</td>'+
					      '<td width="167" align="left" bgcolor="#FFFFFF" class="company_info" >'+sppartName+'</td>'+
					    '</tr>'+
						'<tr>'+
						  '<td height="30" align="center" bgcolor="#FFFFFF"  class="company_info_bold" >处理数量</td>'+
						  '<td align="left" bgcolor="#FFFFFF" class="company_info">'+spweight+'</td>'+
						  '<td align="center" bgcolor="#FFFFFF"  class="company_info_bold" >折合头数</td>'+
						  '<td align="left" bgcolor="#FFFFFF" class="company_info" >'+spquantity+'</td>'+
						'</tr>'+
						'<tr>'+
						  '<td height="30" align="center" bgcolor="#FFFFFF" class="company_info_bold" >检验人员</td>'+
						  '<td align="left" bgcolor="#FFFFFF" class="company_info" >'+spqcSign+'</td>'+
						  '<td align="center" bgcolor="#FFFFFF"  class="company_info_bold" >无害化处理人员</td>'+
						  '<td align="left" bgcolor="#FFFFFF" class="company_info" >'+sppcSign+'</td>'+
						'</tr>'+
						'<tr>'+
						  '<td height="30" align="center" bgcolor="#FFFFFF" class="company_info_bold" >视频开始日期</td>'+
						  '<td align="left" bgcolor="#FFFFFF" class="company_info" >'+spbeginDate+'</td>'+
						  '<td align="center" bgcolor="#FFFFFF"  class="company_info_bold" >视频结束日期</td>'+
						  '<td align="left" bgcolor="#FFFFFF" class="company_info" >'+spdueDate+'</td>'+
						'</tr>'+
						'<tr>'+
						  '<td height="30" align="center" bgcolor="#FFFFFF" class="company_info_bold" >视频文件</td>'+
						  '<td align="left" bgcolor="#FFFFFF" class="company_info" >'+spfile+'</td>'+
						  '<td align="center" bgcolor="#FFFFFF"  class="company_info_bold" >处理方式</td>'+
						  '<td align="left" bgcolor="#FFFFFF" class="company_info" >'+spapproach+'</td>'+
						'</tr>'+
						'<tr>'+
						  '<td height="100" align="center" bgcolor="#FFFFFF"  class="company_info_bold" >处理原因</td>'+
					      '<td colspan="3" valign="top" bgcolor="#FFFFFF" class="company_info" >'+spcause+'</td>'+
					    '</tr>'+
						'</table>';
				Ext.getCmp('OrgCompanyinnoContentPanel').body.update(html);
			}else{
				var html='<table width="600" border="0" cellpadding="1" cellspacing="1" class="datalist">'+
		  		'<tr>'+
			      '<td width="83" height="30" align="center" bgcolor="#FFFFFF" class="company_info_bold" >货主</td>'+
			      '<td width="176" align="left" bgcolor="#FFFFFF" class="company_info" >'+spowner+'</td>'+
			      '<td align="center" bgcolor="#FFFFFF"  class="company_info_bold" >折合头数</td>'+
				  '<td align="left" bgcolor="#FFFFFF" class="company_info" >'+spquantity+'</td>'+
			    '</tr>'+
				'<tr>'+
				  '<td height="30" align="center" bgcolor="#FFFFFF" class="company_info_bold" >检验人员</td>'+
				  '<td align="left" bgcolor="#FFFFFF" class="company_info" >'+spqcSign+'</td>'+
				  '<td align="center" bgcolor="#FFFFFF"  class="company_info_bold" >无害化处理人员</td>'+
				  '<td align="left" bgcolor="#FFFFFF" class="company_info" >'+sppcSign+'</td>'+
				'</tr>'+
				'<tr>'+
				  '<td height="30" align="center" bgcolor="#FFFFFF" class="company_info_bold" >视频开始日期</td>'+
				  '<td align="left" bgcolor="#FFFFFF" class="company_info" >'+spbeginDate+'</td>'+
				  '<td align="center" bgcolor="#FFFFFF"  class="company_info_bold" >视频结束日期</td>'+
				  '<td align="left" bgcolor="#FFFFFF" class="company_info" >'+spdueDate+'</td>'+
				'</tr>'+
				'<tr>'+
				  '<td height="30" align="center" bgcolor="#FFFFFF" class="company_info_bold" >视频文件</td>'+
				  '<td align="left" bgcolor="#FFFFFF" class="company_info" >'+spfile+'</td>'+
				  '<td align="center" bgcolor="#FFFFFF"  class="company_info_bold" >处理方式</td>'+
				  '<td align="left" bgcolor="#FFFFFF" class="company_info" >'+spapproach+'</td>'+
				'</tr>'+
				'<tr>'+
				  '<td height="100" align="center" bgcolor="#FFFFFF"  class="company_info_bold" >处理原因</td>'+
			      '<td colspan="3" valign="top" bgcolor="#FFFFFF" class="company_info" >'+spcause+'</td>'+
			    '</tr>'+
				'</table>';
				Ext.getCmp('OrgCompanyinnoContentPanel').body.update(html);
			}
		}, this);
		this.frame.add(this.master);
		//增加一个tabpanel
		this.frame.add(this.tabPanel);
		//向tabpanel里面增加2个panel。目前是gridpanel
		this.tabPanel.add(this.full);
	   
		this.main.add(this.frame);
		this.main.doLayout();
		
		//一定要写到这里，否则会出现一个tabpanel里面有2个gridpanel的问题。
		this.tabPanel.add(this.detail);
		Search_store.load({params:{start:0,limit:20}}); 
	},

	showSearchForm : function(g, store, record){
		if(!record){
	        record = new store.recordType();
		}
		var form = new com.cce.companyinno.OrgCompanyInnoSearchForm();
		form.on('afterSearch', this.afterSearch, this);
		form.on('doSearchForm',this.onSelect,this);
		this.win = new Ext.Window({
		    title: '无害化查询',
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
		form.get('status').setValue(status);
		form.get('type').setValue(type);
		form.get('innoid').setValue(innoid);
		
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
		
		innoid= fp.get('innoid').getValue();
		if(innoid!=""){
			data.push('id',innoid);
		}
		
		status = fp.get('status').getValue();
		
		if(status!=""){
			data.push('status',status);
		}
		
		type=fp.get('type').getValue();
		
		searchParams=Ext.encode({
			'beginDate':startdate,
			'endDate':enddate,
			'regionId':region_id,
			'entname':entname,					 
			'status':status,
			'type':type,
			'id':innoid	
		});	 
		
		//查询
		Search_store.load({
				params:{
					start:0,
				    limit:20
				}
		 });
			
		 this.win.close();
	},
	onAllData:function(fp){
		searchParams=Ext.encode({
			'beginDate':'',
			'endDate':'',
			'regionId':'',
			'entname':'',				 
			'status':'',
			'type':'',		
			'id':''		
		});
		//查询
		Search_store.load({
				params:{
					start:0,
				    limit:20
				}
		 });
	},
	afterSearch:function(fp, record){
		this.win.close();
	}

	 
	
});

var innoid="";
var startdate="";
var enddate="";
var region_id="";
var entname="";
var status="";
var type="";
var searchParams=Ext.encode({
	'beginDate':'',
	'endDate':'',
	'regionId':'',
	'entname':'',					 
	'status':'',
	'type':'',		
	'id':''
});