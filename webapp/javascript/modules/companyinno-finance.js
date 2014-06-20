Ext.ns("com.cce.companyinno");

ScriptMgr.load({ scripts: ['javascript/utils/FormTableLayout.js']});

ScriptMgr.load({ scripts: ['javascript/utils/RowEditor.js']}); //载入插件

var proxy = new Ext.data.HttpProxy({
	api: {
		    read : 'companyinno/InnoFinance!list.action',
		    create : 'companyinno/InnoFinance!save.action',
		    destroy: 'companyinno/InnoFinance!delete.action'
		}
});
var proxy_detail = new Ext.data.HttpProxy({
	api: {
		    read : 'companyinno/AppFinance!getDetails.action'
		}
});
//------------------------------------------------------------------------------
//Module的reader定义..
//------------------------------------------------------------------------------
var reader = new Ext.data.JsonReader(
	{root:'data'},
	[ 
	 	{name: 'id',mapping:"id"},
		{name: 'name',mapping:'name'}, //申请人资料
		{name: 'tel',mapping:'tel'}, //联系电话
		{name: 'mobile',mapping:'mobile'}, //手机
		{name: 'accountName',mapping:'accountName'},//开户名
		{name: 'bank',mapping:'bank'},//开户行
		{name: 'accountNo',mapping:'accountNo'},//银行账号 
		{name: 'beginDate',mapping:'beginDate',type:'date',dateFormat:'time'},//开始时间
		{name: 'endDate',mapping:'endDate',type:'date',dateFormat:'time'},//开始时间
		{name: 'quantity',mapping:'quantity'},//补贴头数
		{name: 'standard',mapping:'standard'},//补贴标准
		{name: 'amount',mapping:'amount'},//补贴金额
		{name: 'MView',mapping:'MView'},//商务部主管意见
		{name: 'FView',mapping:'FView'}, //上午部主管意见
		{name: 'status',mapping:'status'},//状态
		{name: 'selectedInno',mapping: 'selectedInno'},
		{name: 'createDate',mapping:'createDate',type:'date',dateFormat:'time'},
		{name: 'receiveDate',mapping:'receiveDate',type:'date',dateFormat:'time'}
	     
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
var writer = new Ext.data.JsonWriter({
	encode: true,
	writeAllFields: false
});

var fm = Ext.form; 

//------------------------------------------------------------------------------
//Module的columns定义..
//------------------------------------------------------------------------------
var columns = [
   new Ext.grid.CheckboxSelectionModel(), 
   {header:'申领人姓名',dataIndex:'name',editor: new fm.TextField({allowBlank: false})}, 
//   {header:'联系电话',dataIndex:'tel',editor: new fm.TextField({allowBlank: false})}, 
//   {header:'手机',dataIndex:'mobile',editor: new fm.TextField({allowBlank: false})},
//   {header:'开户名',dataIndex:'accountName',editor: new fm.TextField({allowBlank: false})},
//   {header:'开户行',dataIndex:'bank',editor: new fm.TextField({allowBlank: false})},
//   {header:'银行账号',dataIndex:'accountNo',editor: new fm.TextField({allowBlank: false})},
   {
	   header:'申领开始时间',
	   dataIndex:'beginDate',
	   editor: new fm.DateField({
			id:'beginDate',				 
		    name:'beginDate',
		    format:'m/d/Y',
			anchor:"100%",
		    align:'left'		 
	   }),
	   renderer:Ext.util.Format.dateRenderer('Y年m月d日 H时i分s秒')
   },
   {
	   header:'申领结束时间',
	   dataIndex:'endDate',
	   editor: new fm.DateField({
			id:'endDate',				 
		    name:'endDate',
		    format:'m/d/Y',
			anchor:"100%",
		    align:'left'		 
	   }),
	   renderer:Ext.util.Format.dateRenderer('Y年m月d日 H时i分s秒')
   },
   {header:'补贴头数',dataIndex:'quantity',editor: new fm.NumberField({allowBlank: false})},
   {header:'补贴标准(头/元)',dataIndex:'standard',editor: new fm.NumberField({allowBlank: false})},
   {header:'补贴金额',dataIndex:'amount',editor: new fm.NumberField({allowBlank: false})},
   {header:'状态',dataIndex:'status'},
   {header:'补贴金收到日期',dataIndex:'receiveDate',renderer:Ext.util.Format.dateRenderer('Y年m月d日 H时i分s秒')}
];
var columns_detail = [
   {header:'操作人',dataIndex:'createBy'},
   {header:'角色',dataIndex:'role'},
   {header:'操作',dataIndex:'operate'},
   {header:'日期',dataIndex:'createDate',renderer:Ext.util.Format.dateRenderer('Y年m月d日 H时i分s秒'),sortable:true},
   {header:'备注',dataIndex:'comment'}
];

var editor = new Ext.ux.grid.RowEditor({
    saveText: '保存',
    cancelText:'取消'
});
//主panel 
com.cce.companyinno.companyinnoFinance=Ext.extend(Ext.Panel,{
	id:'companyinno-Finance-main',
	loadMask: true,
	border: false,
	enableHdMenu: false,
	header:false,
	region:'center',
	closable:true,
	layout:"border",
	frame:true
});

//无害化处理-补贴申领-表格1

com.cce.companyinno.companyinnoFinanceMaster = Ext.extend(Ext.grid.GridPanel, {
	  id:'companyinnoFinanceMaster',
 	  stripeRows: true,
	  loadMask: true,
	  border: false,
	  enableHdMenu: false,	 
	  region:'center',
	  closable:true,
	  columns:columns,
	  sm : new Ext.grid.CheckboxSelectionModel(),
	  frame:true,
	  header:false,
	  initComponent : function() {
		    // typical viewConfig
		    this.viewConfig = {
		        forceFit: true
		    };
		
		    // build toolbars and buttons.
		    this.tbar = this.buildTopToolbar();
		    this.bbar = this.buildBottomToolbar();
		    
		    Ext.Ajax.request( {
				url : 'companyinno/InnoFinance!getNewStatus.action',
				scope : this,
				params : { },
				callback : function(o, s, r) {
					var financeStates = Ext.util.JSON.decode(r.responseText).message;

					document.getElementById("financeStates").innerHTML="当前状态: " + financeStates;

				}
			});
		    
		    // super
		    com.cce.companyinno.companyinnoFinanceMaster.superclass.initComponent.call(this);
		    
		    this.addEvents(
		    	'doedit'
		    );
		},
		
		 /**
	   * buildTopToolbar
	   */
	  buildTopToolbar : function() {
		 return [{
							text:"新建",
							iconCls:"company_inno_add",
							id:'addBtn_finance',
							scope: this,
							handler:this.onAdd
			    	},	    	
					{
							text:"提交",
							iconCls:"submit_inno",
							id:'subBtn_finance',
							scope: this,
							handler:this.onSubmit
					},
					{
							text:"修改",
							iconCls:"company_inno_edit",
							id:'edtBtn_finance',
							scope: this,
							handler:this.onEdit
					},
					{
							text:"删除",
							iconCls:"company_inno_delete",
							id:'delBtn_finance',
							scope: this,
							handler:this.onDelete
					},
					{
						text:"收到补贴",
						iconCls:"res_inno_add",
						id:'crmBtn_finance',
						scope: this,
						handler:this.onConfirm
					},
					{
						text:"基本信息",
						iconCls:"user_edit",
						id:'infBtn_finance',
						scope: this,
						handler:this.onInfo
					},
					new Ext.Toolbar.Fill(),	
					{
						xtype:"label",
						id:'financeStates'
					}
					
		  ]

	  },
	   
	  //plugins: [editor],
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
	  onAdd:function(){
//		  var Resource = this.getStore().recordType;
//		  var res = new Resource({
//			  			  
//		  });
//		  editor.stopEditing();
//		  this.getView().refresh();
//		  this.getSelectionModel().selectRow(0);		  
//		  finance_store.insert(0, res);
//		  editor.startEditing(0);
		  
		  
		  this.fireEvent('doedit', this, this.store, null);
	  },
	  onInfo:function(){
		  var record = this.getSelectionModel().getSelected();
	      this.fireEvent('doInfo', this, store_baseinfo, null);
	  },
	  onEdit:function(){
		  var record = this.getSelectionModel().getSelected();
	      if (!record) {
	            return false;
	      }
	      this.fireEvent('doedit', this, this.store, record);
	  },
	  onDelete:function(){
		  var selected = this.getSelectionModel().getSelected();
	        if (!selected) {
	            return false;
	        }
			  var rows=this.getSelectionModel().getSelections();
		      Ext.Msg.confirm('确认删除', '确定删除该条记录?', function(btn) {
					if (btn == 'yes') {
				        for(var i=0;i<rows.length;i++)
				        {
				        	finance_store.remove(rows[i]);
				        }
				        finance_store.save();
				        finance_store.on('save',function(s,b,d){
				        	finance_store.reload({params:{start:0,limit:20}});
				        });
				        store_detail.reload();
					}
		      });
	  },
	  onConfirm:function(){
		  var selected = this.getSelectionModel().getSelected();
	        if (!selected) {
	            return false;
	        }
			  var rows=this.getSelectionModel().getSelections();
		      Ext.Msg.confirm('确认补贴到账', '确定补贴金已经收到?', function(btn) {
					if (btn == 'yes') {
						var rowids = [];
				        for(var i=0;i<rows.length;i++)
				        {
				        	rowids.push(rows[i].get("id"));
				        }
				        Ext.Ajax.request({ 
							url : 'companyinno/InnoFinance!confirm.action',
							scope: this,
							params : { 
							 data:Ext.encode(rowids)
							}, 
							success : function(response) { 
								App.setAlert(Ext.util.JSON.decode(response.responseText).success,Ext.util.JSON.decode(response.responseText).message);
								finance_store.reload({params:{start:0,limit:20}});
							}
				        })
					}
		      });
	  },
	  onSubmit:function(){
		  var selected = this.getSelectionModel().getSelected();
	        if (!selected) {
	            return false;
	        }
	        var rows=this.getSelectionModel().getSelections();
	        var rowids = [];
	        for(var i=0;i<rows.length;i++)
	        {
	        	rowids.push(rows[i].get("id"));
	        }

	        Ext.Ajax.request({ 
				url : 'companyinno/InnoFinance!submit.action',
				scope: this,
				params : { 
				 data:Ext.encode(rowids)
				}, 
				success : function(response) { 
					
				   var data=Ext.util.JSON.decode(response.responseText);
				   
				   App.setAlert(data.success,data.message);
				   
				   this.store.load({params:{start:0,limit:20}}); 
				   
				   var record = this.getSelectionModel().getSelected();
				   
				   if (record) {
					   store_detail.load({
				  	         params : { 
				   			 	data:record.get("id")
				   			 }
					   });
			       }
				   else
				   {
					   store_detail.reload();
				   }
				   
				}, 
				failure : function(response) { 
				   App.setAlert(false,"提交失败！"); 
			    }
		   });
	  }
	  
});
//------------------------------------------------------------------------------
//Module的companyinnoButchtDetail内容Panel定义..
//------------------------------------------------------------------------------

com.cce.companyinno.companyinnoFinanceDetail=Ext.extend(Ext.grid.GridPanel ,{
	  title:'审批历史',
	  id:'companyinnoFinanceDetail',
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
		    com.cce.companyinno.companyinnoFinanceDetail.superclass.initComponent.call(this);
		    
	  }
		
});

var proxy_baseinfo = new Ext.data.HttpProxy({
	api: {
    		read : 'companyinno/InnoFinance!getInnoFUser.action',
		    create : 'companyinno/InnoFinance!saveInnoFUser.action',
			update : 'companyinno/InnoFinance!saveInnoFUser.action'
		}
});

var store_baseinfo = new Ext.data.Store({
    id: 'baseinfo_store',
    message: 'message',
    proxy: proxy_baseinfo,
    reader: reader,
    writer: writer,  // <-- plug a DataWriter into the store just as you would a Reader
    autoSave: false
});

com.cce.companyinno.companyinnoFinanceInfoForm=Ext.extend(Ext.form.FormPanel, {
	title: '基本信息',
	modal:true,
	iconCls: 'silk-user',
	labelWidth: 100,
	width: 540,
	height: 260,
	padding: 10,
	header: false,
	frame: true,
	region:'center',
	layout: 'form',
//	layout: 'tableform',
//	layoutConfig:{
//		columns:2,
//		columnWidths: [0.5,0.5]
//	},
	autoScroll: true,
	record : null,
	initComponent : function() {
		
		// build the form-fields.  Always a good idea to defer form-building to a method so that this class can
	    // be over-ridden to provide different form-fields
	    this.items = this.buildForm();
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
	    // build form-buttons
	    this.buttons = this.buildUI();
	
	    // add a create event for convenience in our application-code.
	    this.addEvents(
	    		'save',
	    		'afterSave'
	    );
	    
	    // super
	    com.cce.companyinno.companyinnoFinanceInfoForm.superclass.initComponent.call(this);

	},
	buildForm : function() {
		var date=new Date();
		var hiddenId = new Ext.form.Hidden({name:"id"});
		return [
				{
				    xtype: 'textfield',
				    fieldLabel: '姓名',
					allowBlank:false,
				    anchor: '90%',					 
				    id:'name',
				    name:'name'
				},
				{
				    xtype: 'textfield',
				    fieldLabel: '联系电话',
					allowBlank:false,
				    anchor: '90%',					 
				    id:'tel',
				    name:'tel'
				},
				{
				    xtype: 'textfield',
				    fieldLabel: '手机',
					allowBlank:false,
				    anchor: '90%',					 
				    id:'mobile',
				    name:'mobile'
				},
				{
				    xtype: 'textfield',
				    fieldLabel: '开户名',
					allowBlank:false,
				    anchor: '90%',					 
				    id:'accountName',
				    name:'accountName'
				}, 
				{
				    xtype: 'textfield',
				    fieldLabel: '开户行',
					allowBlank:false,
				    anchor: '90%',					 
				    id:'bank',
				    name:'bank'
				},
				{
				    xtype: 'textfield',
				    fieldLabel: '银行账号',
					allowBlank:false,
				    anchor: '90%',					 
				    id:'accountNo',
				    name:'accountNo'
				},
				hiddenId
		]
	},
	loadRecord : function(rec) {
		if(rec==null)
		    this.record = new store_baseinfo.recordType();
			else this.record = rec;
	        this.getForm().loadRecord(this.record);
	},
	buildUI : function(){
	      return [{
				text:"保存",
				scope: this,
				handler:this.onSave
		  	}, {
	          text: '关闭',
	          handler: function(btn, ev){
		  			this.fireEvent('afterSave', this);
	          },
	          scope: this
	      }];
	},
	onSave:function(){
	    if (!this.getForm().isValid()) {
	          App.setAlert(false, "表单数据有错误.");
	          return false;
	    }
	    
	    var tel=Ext.getCmp('tel').getValue();
	    var mobile=Ext.getCmp('mobile').getValue();
	    
	    if(this.isMobilePhone(mobile)&&this.isTelPhone(tel))
	    {
	    	store_baseinfo.add(new store_baseinfo.recordType(this.getForm().getValues()));
	    	store_baseinfo.save();		
		    this.fireEvent('afterSave', this);
	    }
	    
	},
	isMobilePhone:function(s){
    	var regex = /^(13[0-9]|15[0|1|3|6|7|8|9]|18[8|9])\d{8}/;
    	
    	if(s=='')
    	{
    		return true;
    	}
    	else
    	{
    	
	    	if (!regex.exec(s)){
	    		Ext.getCmp('mobile').markInvalid( "手机号码不正确");
	    		return false;
	    	}else{
	    		return true ;
	    	}
    	}
    			
    },
	isTelPhone:function(s){
		
		var regex = /^(\d{3,4}-)?\d{7,8}/ ;
    	if(s=='')
    	{
    		return true;
    	}
    	else
    	{
	    	if (!regex.exec(s)){
	    		Ext.getCmp('tel').markInvalid( "固定电话格式不正确应为0531-12345678");
	    		return false;
	    	}else{
	    		return true ;
	    	}
    	}
	}
});

var proxy_inno = new Ext.data.HttpProxy({
	api: {
		    read : 'companyinno/InnoFinance!findUnpaidInnoList.action'
		}
});

var reader_inno = new Ext.data.JsonReader(
		{root:'data'},
		[ 
		 	{name: 'id',mapping:"id"},
			{name: 'owner',mapping:'owner'}, //货主
			{name: 'partName',mapping:'partName'},//产品名称
			{name: 'cause',mapping:'cause'}, //处理原因
			{name: 'weight',mapping:'weight'}, //处理数量
			{name: 'quantity',mapping:'quantity'}, //折合头数
			{name: 'Approach',mapping:'approachValue'},//处理方式
			{name: 'qcSign',mapping:'qcSign'},//检验人员
			{name: 'pcSign',mapping:'pcSign'},//无害化处理人员
			{name: 'status',mapping:'status'},//状态
			{name: 'financeId',mapping:'financeId'},//视频文件
			{name: 'recFile',mapping:'recFile'},//视频文件
			{name: 'createDate',mapping:'createDate',type:'date',dateFormat:'time'},
			{name: 'beginDate',mapping:'beginDate',type:'date',dateFormat:'time'},//开始时间
			{name: 'dueDate',mapping:'dueDate',type:'date',dateFormat:'time'}//结束时间
		]
);
var columns_inno = [
            new Ext.grid.CheckboxSelectionModel(),
        	{header:'无害化编号',dataIndex:'id'},
            {header:'货主',dataIndex:'owner'},
//            {header:'产品名称',dataIndex:'partName'},
            {header:'折合头数',dataIndex:'quantity'},
            {header:'处理方式',dataIndex:'Approach'},
           	{header:'视频开始时间',dataIndex:'beginDate',renderer:Ext.util.Format.dateRenderer('Y年m月d日 H时i分s秒')},  
           	{header:'视频结束时间',dataIndex:'dueDate',renderer:Ext.util.Format.dateRenderer('Y年m月d日 H时i分s秒')} 
];
var writer_inno = new Ext.data.JsonWriter({
	encode: true,
	writeAllFields: false
});
var store_inno = new Ext.data.Store({
    id: 'inno_store',
    message: 'message',
    proxy: proxy_inno,
    reader: reader_inno,
    writer: writer_inno,  // <-- plug a DataWriter into the store just as you would a Reader
    autoSave: false
});

function innoGridCheckHandle(){
	var records=Ext.getCmp('innogrid').getSelectionModel().getSelections();
	var amt=0;
	for (var i = 0; i < records.length; i++) { 
		if(records[i].get("quantity")){
			amt+=parseInt(records[i].get("quantity"));
		}
	}
	Ext.getCmp('quantity').setValue(amt);
	Ext.getCmp('amount').setValue(amt*Ext.getCmp('standard').getValue());
}   

//定义无害化处理-补贴申领-窗口输入
com.cce.companyinno.companyinnoFinanceDetailForm=Ext.extend(Ext.form.FormPanel, {
	title: '补贴申领',
	modal:true,
	iconCls: 'silk-user',
	labelWidth: 100,
	width: 540,
	height: 260,
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
	fid:null,
	record : null,
	initComponent : function() {
		
		
		 		
			
		// build the form-fields.  Always a good idea to defer form-building to a method so that this class can
	    // be over-ridden to provide different form-fields
	    this.items = this.buildForm();
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
	    // build form-buttons
	    this.buttons = this.buildUI();
	
	    // add a create event for convenience in our application-code.
	    this.addEvents(
	    		'save',
	    		'afterSave'
	    );
	    
	    // super
	    com.cce.companyinno.companyinnoFinanceDetailForm.superclass.initComponent.call(this);
	    store_inno.load({
  			scope:this,
  			params : { 
   			 	data:this.fid
   			},
  			callback:function(r,o,s) {
	    		var count=r.length;
	    		for (var i = 0; i < count; i++) { 
	    			if(r[i].get("financeId")) Ext.getCmp('innogrid').getSelectionModel().selectRow(i,true);
	    		}
			}
		});
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
	buildForm : function() {
		var date=new Date();
		var hiddenId = new Ext.form.Hidden({name:"id"});
		var selectedInno = new Ext.form.Hidden({id:"selectedInno",name:"selectedInno"});
		return [
				{
				    xtype:"datefield",
				    fieldLabel: '申领开始日期',
					id:'beginDate',				 
				    name:'beginDate',
				    format:'m/d/Y',
					anchor:"100%",
				    align:'left',
				    value:new Date(),
				    dateRange: {begin: 'beginDate', end: 'endDate' },   
                    vtype: 'dateRange' 
				},
				{
				    xtype:"datefield",
				    fieldLabel: '申领结束日期',
					id:'endDate',				 
				    name:'endDate',
				    format:'m/d/Y',
					anchor:"100%",
				    align:'left',
				    value:new Date(date.getFullYear(),date.getMonth(),date.getDate()+1),
				    dateRange: {begin: 'beginDate', end: 'endDate' },   
                    vtype: 'dateRange' 
				},
				{
				    xtype: 'numberfield',
				    fieldLabel: '补贴头数',
					allowBlank:false,
				    anchor: '100%',					 
				    id:'quantity',
				    name:'quantity',
				    readOnly:true
				},
				{
				    xtype: 'numberfield',
				    fieldLabel: '补贴标准',
					allowBlank:false,
				    anchor: '100%',					 
				    id:'standard',
				    name:'standard',
				    value:500,
				    readOnly:true
				},
				{
				    xtype: 'numberfield',
				    fieldLabel: '申领金额',
					allowBlank:false,
				    anchor: '100%',					 
				    id:'amount',
				    name:'amount',
				    colspan:2,
				    readOnly:true
				}, 
				{
					xtype:"grid",
					id:'innogrid',
					title:"补贴项",
					store:store_inno,
					columns:columns_inno,
					sm: new Ext.grid.CheckboxSelectionModel({  
	                    singleSelect: false,  
	                    listeners: {  
	                        rowselect: function(sm, row, rec) {  
								innoGridCheckHandle();
	                        },
							rowdeselect: function(sm, row, rec) {  
	    						innoGridCheckHandle();
	                        }
	                    }  
	                }),  
					frame:true,
					height: 200,
				    colspan:2,
					stripeRows: true,
					loadMask: true,
					border: false,
					enableHdMenu: false	 
				},
//				{
//				    xtype: 'textfield',
//				    fieldLabel: '商务部主管意见', 
//				    anchor: '100%',					 
//				    id:'MView',
//				    name:'MView',
//				    colspan:2,
//				    readOnly:true
//				},
//				{
//				    xtype: 'textfield',
//				    fieldLabel: '财务部主管意见', 
//				    anchor: '100%',					 
//				    id:'FView',
//				    name:'FView',
//				    colspan:2,
//				    readOnly:true
//				},
				hiddenId,
				selectedInno
		]
	},
	loadRecord : function(rec) {
	      this.record = rec;	      
	      this.getForm().loadRecord(this.record);
	},
	buildUI : function(){
	      return [{
	    	  	text:"提交",
				scope: this,
				handler:this.onSubmit
		  	}, {
				text:"保存",
				scope: this,
				handler:this.onSave
		  	}, {
	          text: '关闭',
	          handler: function(btn, ev){
		  			this.fireEvent('afterSave', this);
	          },
	          scope: this
	      }];
	},
	onSubmit:function(){
		if (this.record == null) {
	          return;
	    }
	    if (!this.getForm().isValid()) {
	          App.setAlert(false, "表单数据有错误.");
	          return false;
	    }
	    var selected = Ext.getCmp('innogrid').getSelectionModel().getSelected();
        if (!selected) {
        	App.setAlert(false, "请选择补贴项");
            return false;
        }
        var rows=Ext.getCmp('innogrid').getSelectionModel().getSelections();
        var rowids = [];
        for(var i=0;i<rows.length;i++)
        {
        	rowids.push(rows[i].get("id"));
        }
        Ext.getCmp('selectedInno').setValue(rowids);
        Ext.Ajax.request({ 
			url : 'companyinno/InnoFinance!saveNSubmit.action',
			scope: this,
			
			params : { 
        	
			 	data:Ext.encode(this.getForm().getValues())
			}, 
			success : function(response) { 
			   var data=Ext.util.JSON.decode(response.responseText);
			   App.setAlert(data.success,data.message);
			   finance_store.reload();
			   store_detail.reload();
			}, 
			failure : function(response) { 
			   App.setAlert(false,"提交失败！"); 
		    }
	   }); 
      this.fireEvent('afterSave', this, null);
	},
	onSave:function(){
		if (this.record == null) {
	          return;
	    }
	    if (!this.getForm().isValid()) {
	          App.setAlert(false, "表单数据有错误.");
	          return false;
	    }
	    
	    	var selected = Ext.getCmp('innogrid').getSelectionModel().getSelected();
	        if (!selected) {
	            return false;
	        }
	        var rows=Ext.getCmp('innogrid').getSelectionModel().getSelections();
	        var rowids = [];
	        for(var i=0;i<rows.length;i++)
	        {
	        	rowids.push(rows[i].get("id"));
	        }
	        Ext.getCmp('selectedInno').setValue(rowids);
		    finance_store.add(new finance_store.recordType(this.getForm().getValues()));
		    finance_store.save();		    
		    finance_store.on('save',function(s,b,d){
		    	finance_store.reload({params:{start:0,limit:20}});
		    },this);
		    store_detail.reload();
		    this.fireEvent('afterSave', this);
	},
	isMobilePhone:function(s){
    	var regex = /^(13[0-9]|15[0|1|3|6|7|8|9]|18[8|9])\d{8}/;
    	
    	if(s=='')
    	{
    		return true;
    	}
    	else
    	{
    	
	    	if (!regex.exec(s)){
	    		Ext.getCmp('mobile').markInvalid( "手机号码不正确");
	    		return false;
	    	}else{
	    		return true ;
	    	}
    	}
    			
    },
	isTelPhone:function(s){
		
		var regex = /^(\d{3,4}-)?\d{7,8}/ ;
    	if(s=='')
    	{
    		return true;
    	}
    	else
    	{
	    	if (!regex.exec(s)){
	    		Ext.getCmp('tel').markInvalid( "固定电话格式不正确应为0531-12345678");
	    		return false;
	    	}else{
	    		return true ;
	    	}
    	}
	}
});


//------------------------------------------------------------------------------
//Module的定义放在最后,eval(xxx.js)后返回Module的类定义..
//------------------------------------------------------------------------------

var finance_store = new Ext.data.Store({
    id: 'finance_store',
    message: 'message',
    proxy: proxy,
    reader: reader,
    writer: writer,// <-- plug a DataWriter into the store just as you would a Reader
    autoSave: false
});

var store_detail = new Ext.data.Store({
    id: 'store_detail',
    message: 'message',
    proxy: proxy_detail,
    reader: reader_detail,
    writer: writer,  // <-- plug a DataWriter into the store just as you would a Reader
    autoSave: false
});

var proxy_inno_checked = new Ext.data.HttpProxy({
	api: {
		    read : 'companyinno/InnoFinance!findCheckedInnoList.action'
		}
});

var store_inno_checked = new Ext.data.Store({
    id: 'inno_store',
    message: 'message',
    proxy: proxy_inno_checked,
    reader: reader_inno,
    writer: writer_inno,  // <-- plug a DataWriter into the store just as you would a Reader
    autoSave: false
});

var columns_inno_checked = [
        	{header:'无害化编号',dataIndex:'id'},
            {header:'货主',dataIndex:'owner'},
//            {header:'产品名称',dataIndex:'partName'},
            {header:'折合头数',dataIndex:'quantity'},
            {header:'处理方式',dataIndex:'Approach'},
           	{header:'视频开始时间',dataIndex:'beginDate',renderer:Ext.util.Format.dateRenderer('Y年m月d日 H时i分s秒')},  
           	{header:'视频结束时间',dataIndex:'dueDate',renderer:Ext.util.Format.dateRenderer('Y年m月d日 H时i分s秒')} 
];

com.cce.companyinno.CompanyinnoFinanceContentPanel=Ext.extend(Ext.grid.GridPanel ,{
	  title:'无害化信息',
	  id:'CompanyinnoFinanceContentPanel',
	  stripeRows: true,
	  loadMask: true,
	  border: false,
	  enableHdMenu: false,
	  header:false,
	  region:'south',
	  closable:true,
	  height:260,
	  split:true,
	  columns:columns_inno_checked,
	  frame:true,
	  initComponent : function() {
		    this.viewConfig = {
		        forceFit: true
		    };
		    com.cce.companyinno.CompanyinnoFinanceContentPanel.superclass.initComponent.call(this);
	  }
});

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
		this.master = new com.cce.companyinno.companyinnoFinanceMaster({ store : finance_store });
		this.full = new com.cce.companyinno.CompanyinnoFinanceContentPanel({ store : store_inno_checked });
		this.detail= new com.cce.companyinno.companyinnoFinanceDetail({ store : store_detail });
		
		this.frame= new com.cce.companyinno.companyinnoFinance();		
		finance_store.on('load',function(store,records,options){
		  	Ext.Ajax.request({
	            url:'companyinno/InnoFinance!newBtnEnabled.action',//1、判断企业备案是否通过；2、判断是否有审批中的记录
	            scope:this,
	            callback: function(o,s,r) {
		  			Ext.getCmp('crmBtn_finance').setDisabled(true);
		  			if(!Ext.util.JSON.decode(r.responseText).success){
	            		Ext.getCmp('addBtn_finance').setDisabled(true);
	            		Ext.getCmp('subBtn_finance').setDisabled(true);
	            		Ext.getCmp('edtBtn_finance').setDisabled(true);
	            		Ext.getCmp('delBtn_finance').setDisabled(true);
	            		Ext.getCmp('infBtn_finance').setDisabled(true);
	    				CAN_DO_ADD=false;
		  			}else{
	            		Ext.getCmp('addBtn_finance').setDisabled(false);
	            		Ext.getCmp('infBtn_finance').setDisabled(false);
	            		var selected = Ext.getCmp('companyinnoFinanceMaster').getSelectionModel().getSelected();
	            		if(!selected){
		            		Ext.getCmp('subBtn_finance').setDisabled(false);
	            		}
	    				CAN_DO_ADD=true;
		  			}
	            }
			});
		})
		
		//关联自定义事件
	    //this.relayEvents(this.store, ['destroy', 'save', 'update']);
		
		this.master.on('doedit', this.showSaveForm, this);
		this.master.on('doInfo', this.showInfoForm, this);		 
		this.master.on('rowclick', function(g, index, ev){
			this.record =g.store.getAt(index);
			if(this.record.get('status')=='等待审批'||this.record.get('status')=='审批中'||this.record.get('status')=='审批通过'){
				Ext.getCmp('edtBtn_finance').setDisabled(true);
				Ext.getCmp('delBtn_finance').setDisabled(true);
				if(this.record.get('status')=='审批通过')Ext.getCmp('crmBtn_finance').setDisabled(false);
				if(CAN_DO_ADD)Ext.getCmp('subBtn_finance').setDisabled(true);
			}else{
				Ext.getCmp('edtBtn_finance').setDisabled(false);
				Ext.getCmp('delBtn_finance').setDisabled(false);
				if(CAN_DO_ADD)Ext.getCmp('subBtn_finance').setDisabled(false);
			};
			store_detail.load({
	  			params : { 
	   			 	data:this.record.get("id")
	   			}
	  		}); 
			
			store_inno_checked.load({
				params:{
					data:this.record.get('id')
				}
//				,scope:this,
//				callback:function(records,options,succees){
//					var spbeginDate="";
//					var spdueDate="";
//					if(this.record.get('beginDate'))spbeginDate=this.record.get('beginDate').format('Y年m月d日 H时i分s秒').toString();
//					if(this.record.get('dueDate'))spdueDate=this.record.get('dueDate').format('Y年m月d日 H时i分s秒').toString();
//					var html='<table width="600" border="0" cellpadding="1" cellspacing="1" class="datalist">'+
//			  		'<tr>'+
//				      '<td width="83" height="30" align="center" bgcolor="#FFFFFF" class="company_info_bold" >无害化编号</td>'+
//				      '<td width="176" align="left" bgcolor="#FFFFFF" class="company_info" >'+this.record.get('id')+'</td>'+
//				      '<td width="146" align="center" bgcolor="#FFFFFF" class="company_info_bold" >货主</td>'+
//				      '<td width="167" align="left" bgcolor="#FFFFFF" class="company_info" >'+this.record.get('owner')+'</td>'+
//				    '</tr>'+
//			  		'<tr>'+
//				      '<td width="83" height="30" align="center" bgcolor="#FFFFFF" class="company_info_bold" >折合头数</td>'+
//				      '<td width="176" align="left" bgcolor="#FFFFFF" class="company_info" >'+this.record.get('quantity')+'</td>'+
//				      '<td width="146" align="center" bgcolor="#FFFFFF" class="company_info_bold" >处理方式</td>'+
//				      '<td width="167" align="left" bgcolor="#FFFFFF" class="company_info" >'+this.record.get('Approach')+'</td>'+
//				    '</tr>'+
//					'<tr>'+
//					  '<td height="30" align="center" bgcolor="#FFFFFF"  class="company_info_bold" >处理数量</td>'+
//					  '<td align="left" bgcolor="#FFFFFF" class="company_info">'+this.record.get('weight')+'</td>'+
//					  '<td align="center" bgcolor="#FFFFFF"  class="company_info_bold" >折合头数</td>'+
//					  '<td align="left" bgcolor="#FFFFFF" class="company_info" >'+this.record.get('quantity')+'</td>'+
//					'</tr>'+
//					'<tr>'+
//					  '<td height="30" align="center" bgcolor="#FFFFFF" class="company_info_bold" >检验人员</td>'+
//					  '<td align="left" bgcolor="#FFFFFF" class="company_info" >'+this.record.get('qcSign')+'</td>'+
//					  '<td align="center" bgcolor="#FFFFFF"  class="company_info_bold" >无害化处理人员</td>'+
//					  '<td align="left" bgcolor="#FFFFFF" class="company_info" >'+this.record.get('pcSign')+'</td>'+
//					'</tr>'+
//					'<tr>'+
//					  '<td height="30" align="center" bgcolor="#FFFFFF" class="company_info_bold" >视频开始日期</td>'+
//					  '<td align="left" bgcolor="#FFFFFF" class="company_info" >'+spbeginDate+'</td>'+
//					  '<td align="center" bgcolor="#FFFFFF"  class="company_info_bold" >视频结束日期</td>'+
//					  '<td align="left" bgcolor="#FFFFFF" class="company_info" >'+spdueDate+'</td>'+
//					'</tr>'+
//					'</table>';
//					Ext.getCmp('CompanyinnoFinanceContentPanel').body.update(html);
//				}
		});
			
			
		}, this);
		this.frame.add(this.master);
		this.frame.add(this.tabPanel);
		this.tabPanel.add(this.full);
		
		this.main.add(this.frame);
		this.main.doLayout();
		this.tabPanel.add(this.detail);
	  	finance_store.load({params:{start:0,limit:20}});
//		finance_store.load({
//			params:{start:0,limit:20},
//			callback:function(records,options,succees){
//				if(!succees){
//					Ext.getCmp('addBtn_finance').setDisabled(true);
//				}					
//			}
//		}); 
	
	
	},
	showInfoForm : function(g, store, record){
		
		if(!record){
	        record = new store.recordType();
		}
		var form = new com.cce.companyinno.companyinnoFinanceInfoForm();
		
		this.win = new Ext.Window({
		    title: '补贴人基本信息',
		    closable:true,
		    width:320,
		    height:300,
		    constrain:true,
		    //border:false,
		    plain:true,	
		    layout: 'border',
		    resizable:true,
		    autoScroll: false,
		    modal:true,
		    items: [form]
		});
		store.load({
  			scope:this,
  			callback:function(r,o,s) {
				form.loadRecord(r[0]);  	
			}
		});
		form.loadRecord(record);
		form.on('afterSave',this.afterSave,this);
		this.win.show();
	},
	showSaveForm : function(g, store, record){
		
		if(!record){
	        record = new store.recordType();
		}
		
		var form = new com.cce.companyinno.companyinnoFinanceDetailForm({fid:record.get('id')});
		
		this.win = new Ext.Window({
		    title: '无害化处理-补贴申领',
		    closable:true,
		    width:800,
		    height:400,
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
		form.on('afterSave',this.afterSave,this);
		this.win.show();
		
		
	},
	afterSave:function(fp, record){
		this.win.close();
	}
});
var CAN_DO_ADD=false;
