Ext.ns("com.cce.companyinno");

ScriptMgr.load({ scripts: ['javascript/utils/FormTableLayout.js']});
//ScriptMgr.load({ scripts: ['javascript/utils/RowEditor.js']}); //载入插件
ScriptMgr.load({ scripts: ['javascript/utils/ComboBox.js','javascript/utils/DateTimeField.js']}); //载入插件
var proxy = new Ext.data.HttpProxy({
	api: {
		    read : 'companyinno/InnoProduct!list.action',
		    create : 'companyinno/InnoProduct!save.action',
		    update : 'companyinno/InnoProduct!save.action',
		    destroy: 'companyinno/InnoProduct!delete.action'
		}
});
var proxy_detail = new Ext.data.HttpProxy({
	api: {
		    read : 'companyinno/AppProduct!getDetails.action'
		}
});
//------------------------------------------------------------------------------
//Module的reader定义..
//------------------------------------------------------------------------------



var reader = new Ext.data.JsonReader(
	{root:'data'},
	[ 
	 	{name: 'id',mapping:"id"},
		{name: 'owner',mapping:'owner'}, //货主
		{name: 'partName',mapping:'partName'},//产品名称
		{name: 'cause',mapping:'cause'}, //处理原因
		{name: 'weight',mapping:'weight'}, //处理数量
		{name: 'quantity',mapping:'quantity',type:'int'}, //折合头数
		{name: 'Approach',mapping:'approachValue'},//处理方式
		{name: 'qcSign',mapping:'qcSign'},//检验人员
		{name: 'pcSign',mapping:'pcSign'},//无害化处理人员
		{name: 'approachId',mapping:'approachId'},
		{name: 'qcSignId',mapping:'qcSignId'},
		{name: 'pcSignId',mapping:'pcSignId'},
		{name: 'status',mapping:'status'},//状态
		{name: 'recFile',mapping:'recFile'},//视频文件
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
var writer = new Ext.data.JsonWriter({
	encode: true,
	writeAllFields: false
});
//------------------------------------------------------------------------------
//Module的columns定义..
//------------------------------------------------------------------------------

//var Inspectors_Combo = new com.cce.Inspectors_Combo({
//	id:'Inspectors_Combo_product'
//}); 
//
//var Handlers_Combo =  new com.cce.Handlers_Combo({
//	id:'Handlers_Combo_product'
//});
//
//var h_type_comb = new com.cce.h_type_combo({
//	id:'Approach_product'
//});

var fm = Ext.form; 

//var columns = [
//    new Ext.grid.CheckboxSelectionModel(),  
//   {header:'货主',dataIndex:'owner',editor: new fm.TextField({id:'owner'})},
//   {header:'产品名称',dataIndex:'partName',editor: new fm.TextField({id:'partName'})},
//   {header:'处理原因',dataIndex:'cause',editor: new fm.TextField({id:'cause'})},
//   {header:'处理数量(公斤)',dataIndex:'weight',editor:new fm.NumberField({id:'weight'})},
//   {header:'折合头数',dataIndex:'quantity',editor:new fm.NumberField({id:'quantity'})},
//   {header:'处理方式',dataIndex:'Approach',editor:h_type_comb},
//   {header:'检验人员',dataIndex:'qcSign' ,editor:Inspectors_Combo},
//   {header:'无害化处理人员',dataIndex:'pcSign',editor:Handlers_Combo},
//   {header:'状态',dataIndex:'status'}
// 
//];

var columns = [
    new Ext.grid.CheckboxSelectionModel(),  
   {header:'无害化编号',dataIndex:'id'},
   {header:'货主',dataIndex:'owner'},
   {header:'产品名称',dataIndex:'partName'},
   {header:'处理原因',dataIndex:'cause'},
   {header:'处理数量(公斤)',dataIndex:'weight'},
   {header:'折合头数',dataIndex:'quantity'},
   {header:'处理方式',dataIndex:'Approach'},
   {header:'检验人员',dataIndex:'qcSign'},
   {header:'无害化处理人员',dataIndex:'pcSign'},
   {header:'状态',dataIndex:'status'}
 
];
var columns_detail = [
   {header:'操作人',dataIndex:'createBy'},
   {header:'角色',dataIndex:'role'},
   {header:'操作',dataIndex:'operate'},
   {header:'日期',dataIndex:'createDate',renderer:Ext.util.Format.dateRenderer('Y年m月d日 H时i分s秒'),sortable:true},
   {header:'备注',dataIndex:'comment'}
];

//var editor = new Ext.ux.grid.RowEditor({
//    saveText: '保存',
//    cancelText:'取消'
//});
//主panel 
com.cce.companyinno.companyinnoProduct=Ext.extend(Ext.Panel,{
	id:'companyinno-Product-main',
	loadMask: true,
	border: false,
	enableHdMenu: false,
	header:false,
	region:'center',
	closable:true,
	layout:"border",
	frame:true
});

//无害化处理-产品-表格1

com.cce.companyinno.companyinnoProductMaster = Ext.extend(Ext.grid.GridPanel, {
	  id:'companyinnoProductMaster',
	  stripeRows: true,
	  loadMask: true,
	  border: false,
	  enableHdMenu: false,
	  header:false,
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
		    
		    Ext.Ajax.request( {
				url : 'companyinno/InnoProduct!getNewStatus.action',
				scope : this,
				params : { },
				callback : function(o, s, r) {
					var productStates = Ext.util.JSON.decode(r.responseText).message;

					document.getElementById("productStates").innerHTML="当前状态: " + productStates;

				}
			});
		    
		    // super
		    com.cce.companyinno.companyinnoProductMaster.superclass.initComponent.call(this);
		    
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
							id:'addBtn_product',
							scope: this,
							handler:this.onAdd
			    	},	    	
					{
							text:"提交",
							iconCls:"submit_inno",
							id:'subBtn_product',
							scope: this,
							handler:this.onSubmit
					},
					{
							text:"修改",
							iconCls:"company_inno_edit",
							id:'edtBtn_product',
							scope: this,
							handler:this.onEdit
					},
					{
							text:"删除",
							id:'delBtn_product',
							iconCls:"company_inno_delete",
							scope: this,
							handler:this.onDelete
					},
					new Ext.Toolbar.Fill(),	
					{
						xtype:"label",
						id:'productStates'
					}
		  ]

	  },
	   
//	  plugins: [editor],
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
	      this.fireEvent('doedit', this, this.store, null);
//		  var Resource = this.getStore().recordType;
//		  var res = new Resource({
//			  
//		  });
//		  editor.stopEditing();
//		  product_store.insert(0, res);
//		  this.getView().refresh();
//		  this.getSelectionModel().selectRow(0);	  
//		 
//		  editor.startEditing(0);
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
		      Ext.Msg.confirm('确认删除', '你确定删除该条记录?', function(btn) {
					if (btn == 'yes') {
					 
				        for(var i=0;i<rows.length;i++)
				        {
				        	product_store.remove(rows[i]);
				        }
				        product_store.save();
				        product_store.on('save',function(s,b,d){
				        	product_store.reload({params:{start:0,limit:20}});
				        });
				        store_detail.reload();
				        
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
				url : 'companyinno/InnoProduct!submit.action',
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
				   Ext.Ajax.request( {
						url : 'companyinno/InnoProduct!getNewStatus.action',
						scope : this,
						params : { },
						callback : function(o, s, r) {
							var productStates = Ext.util.JSON.decode(r.responseText).message;

							document.getElementById("productStates").innerHTML="  申请状态: " + productStates;

						}
					});
				   
				}, 
				failure : function(response) { 
				   App.setAlert(false,"提交失败！"); 
			    }
		   }); 
	  }
	  
});
//------------------------------------------------------------------------------
//Module的RecordExpertMore内容Panel定义..
//------------------------------------------------------------------------------

com.cce.companyinno.companyinnoProductDetail=Ext.extend(Ext.grid.GridPanel ,{
	  id:'companyinnoProductDetail',
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
		    com.cce.companyinno.companyinnoProductDetail.superclass.initComponent.call(this);
		    
	  }
		
});

//定义无害化处理-病害猪-窗口输入

com.cce.companyinno.companyinnoProductForm=Ext.extend(Ext.form.FormPanel, {
	title: '产品登记',
	modal:true,
	iconCls: 'silk-user',
	labelWidth: 100,
	width: 560,
	height: 340,
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
	record : null,
	initComponent : function() {
		Inspectors_Store.reload();
		Handlers_Store.reload();
		this.Inspectors_Combo = new Ext.form.ComboBox({
			id:'Inspectors_Combo',
			fieldLabel:"检验人员",
			hiddenName:'qcSign',
			triggerAction:'all',
			editable:false,
			store:Inspectors_Store,
			mode: 'local',
			displayField:'name',
			valueField:'id',
			allowBlank:false,
			anchor : '100%'
		});
		
		this.Handlers_Combo = new Ext.form.ComboBox({
			id:'Handlers_Combo',
			fieldLabel:"无害化处理人员",
			hiddenName:'pcSign',
			triggerAction:'all',
			editable:false,
			store:Handlers_Store,
			mode: 'local',
			displayField:'name',
			valueField:'id',
			allowBlank:false,
			anchor : '100%'
		});
		
		this.h_type_comb = new com.cce.h_type_combo({
			id:'Approach_product'
		});
			
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
	    com.cce.companyinno.companyinnoProductForm.superclass.initComponent.call(this);
	    
	     

	},
	buildForm : function() {
		var hiddenId = new Ext.form.Hidden({name:"id"});
		return [
				{
				    xtype: 'textfield',
				    fieldLabel: '产品名称',
					allowBlank:false,
				    anchor: '100%',					 
				    id:'partName',
				    name:'partName',
					colspan:2
				},
				{
				    xtype: 'textfield',
				    fieldLabel: '货主',
					allowBlank:false,
				    anchor: '100%',					 
				    id:'owner',
				    name:'owner'
				},
				this.h_type_comb,
				{
				    xtype: 'numberfield',
				    fieldLabel: '处理数量',
					allowBlank:false,
				    anchor: '100%',					 
				    id:'weight',
				    name:'weight'
				},
				{
					 xtype: 'numberfield',
 				    decimalPrecision : 0,
				    fieldLabel: '处理头数',
				    minValue : 1,
					maxValue : 999999,
					allowBlank:false,
				    anchor: '100%',					 
				    id:'quantity',
				    name:'quantity'
				},
				this.Inspectors_Combo,
				this.Handlers_Combo,
				{
			    	   xtype:"datetimefield",
			           fieldLabel: '视频开始日期',
			    	   id:'beginDate',					    	 
			           name:'beginDate',
					   editable:false,
					   anchor:"100%",
			           align:'left'
			    },
		        {
			    	   xtype:"datetimefield",
			           fieldLabel: '视频结束日期',
			    	   id:'dueDate',					 
			           name:'dueDate',
					   editable:false,
					   anchor:"100%",
			           align:'left'
			    },
			    {
		            xtype: 'textfield',
		            fieldLabel: '视频文件',
				    anchor: '100%',
				    colspan:2,
		            id:'recFile',
		            name:'recFile'
		        },
//				{
//				    xtype: 'textarea',
//				    fieldLabel: '处理方式',
//					allowBlank:false,
//				    anchor: '100%',					 
//				    id:'Approach',
//				    name:'Approach',
//				    colspan:2
//				}
//				,
				{
				    xtype: 'textarea',
				    fieldLabel: '处理原因',
					allowBlank:false,
				    anchor: '100%',					 
				    id:'cause',
				    name:'cause',
				    colspan:2
				},
				hiddenId
		]
	},
	loadRecord : function(rec) {
	      this.record = rec;	      
	      this.getForm().loadRecord(this.record);
	      Ext.getCmp('Approach_product').setValue(this.record.get('approachId'));
	      Ext.getCmp('Handlers_Combo').setValue(this.record.get('pcSignId'));
	      Ext.getCmp('Inspectors_Combo').setValue(this.record.get('qcSignId'));
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
		        this.fireEvent('afterSave', this, null);
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
        Ext.Ajax.request({ 
			url : 'companyinno/InnoProduct!saveNSubmit.action',
			scope: this,
			params : { 
			 	data:Ext.encode(this.getForm().getValues())
			}, 
			success : function(response) { 
			   var data=Ext.util.JSON.decode(response.responseText);
			   App.setAlert(data.success,data.message);
			   product_store.reload();
			   store_detail.reload();
			   Ext.Ajax.request( {
					url : 'companyinno/InnoProduct!getNewStatus.action',
					scope : this,
					params : { },
					callback : function(o, s, r) {
						var productStates = Ext.util.JSON.decode(r.responseText).message;

						document.getElementById("productStates").innerHTML="  申请状态: " + productStates;

					}
				});
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
	    product_store.add(new product_store.recordType(this.getForm().getValues()));
	    product_store.save();
        product_store.on('save',function(s,b,d){
        	product_store.reload({params:{start:0,limit:20}});
        });
        store_detail.reload();
        this.fireEvent('afterSave', this, null);
	}
});


//------------------------------------------------------------------------------
//Module的定义放在最后,eval(xxx.js)后返回Module的类定义..
//------------------------------------------------------------------------------

var product_store = new Ext.data.Store({
    id: 'product_store',
    message: 'message',
    proxy: proxy,
    reader: reader,
    writer: writer, // <-- plug a DataWriter into the store just as you would a Reader
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

Ext.extend(com.cce.Module, {
	win: null,
	init: function(){
		
		
		this.master = new com.cce.companyinno.companyinnoProductMaster({ store : product_store });
		this.detail= new com.cce.companyinno.companyinnoProductDetail({ store : store_detail });
		this.frame= new com.cce.companyinno.companyinnoProduct();		
		product_store.on('load',function(store,records,options){
		  	Ext.Ajax.request({
	            url:'companyinno/InnoProduct!newBtnEnabled.action',//1、判断企业备案是否通过；2、判断是否有审批中的记录
	            scope:this,
	            callback: function(o,s,r) {
		  			if(!Ext.util.JSON.decode(r.responseText).success){
	            		Ext.getCmp('addBtn_product').setDisabled(true);
	            		Ext.getCmp('subBtn_product').setDisabled(true);
	            		Ext.getCmp('edtBtn_product').setDisabled(true);
	            		Ext.getCmp('delBtn_product').setDisabled(true);
	    				CAN_DO_ADD=false;
		  			}else{
	            		Ext.getCmp('addBtn_product').setDisabled(false);
	            		var selected = Ext.getCmp('companyinnoProductMaster').getSelectionModel().getSelected();
	            		if(!selected){
		            		Ext.getCmp('subBtn_product').setDisabled(false);
	            		}
	    				CAN_DO_ADD=true;
		  			}
	            }
			});
		})
		//关联自定义事件
	    //this.relayEvents(this.store, ['destroy', 'save', 'update']);
		
		this.master.on('doedit', this.showSaveForm, this);		 
		this.master.on('rowclick', function(g, index, ev){
			this.record =g.store.getAt(index);
			if(this.record.get('status')=='等待审批'||this.record.get('status')=='审批中'||this.record.get('status')=='审批通过'){
				Ext.getCmp('edtBtn_product').setDisabled(true);
				Ext.getCmp('delBtn_product').setDisabled(true);
				if(CAN_DO_ADD)Ext.getCmp('subBtn_product').setDisabled(true);
			}else{
				Ext.getCmp('edtBtn_product').setDisabled(false);
				Ext.getCmp('delBtn_product').setDisabled(false);
				if(CAN_DO_ADD)Ext.getCmp('subBtn_product').setDisabled(false);
			};
			store_detail.load({
	  			params : { 
	   			 	data:this.record.get("id")
	   			}
	  		}); 
		}, this);
		
//		editor.on('canceledit',function(editr,b,r){
//	 		 
//		     
//			 if(r.get('id')==null||r.get('id')=="")
//			 {
//				 this.master.getSelectionModel().selectRow(0);
//				 var selected = this.master.getSelectionModel().getSelected();
//				 
//			     if (!selected) {
//			            return false;
//			     }
//			     var rows=this.master.getSelectionModel().getSelections();
//				 
//			     for(var i=0;i<rows.length;i++)
//			     {
//			    	 product_store.remove(rows[i]);
//			     }
//			     product_store.save();
//			     store_detail.reload();
//			 }
//		     
//			 Ext.getCmp('addBtn_product').setDisabled(false);
//			 Ext.getCmp('subBtn_product').setDisabled(false);
//			 Ext.getCmp('delBtn_product').setDisabled(false);
//			 
//			 
//		},this);
//		
//		editor.on('beforeedit',function(editor,number){
//			Ext.getCmp('addBtn_product').setDisabled(true);
//			 Ext.getCmp('subBtn_product').setDisabled(true);
//			 Ext.getCmp('delBtn_product').setDisabled(true);
//		 },this);
//		
//		editor.on('validateedit',function(editor,o,r,number){
//			 
//			 var owner = Ext.getCmp('owner').getValue();
//			 var cause = Ext.getCmp('cause').getValue(); 
//			 var partName = Ext.getCmp('partName').getValue();weight
//			 var weight = Ext.getCmp('weight').getValue();
//			 var quantity = Ext.getCmp('quantity').getValue();
//			 var Inspectors = Ext.getCmp('Inspectors_Combo_product').getValue();
//			 var Handlers = Ext.getCmp('Handlers_Combo_product').getValue();
//			 var Approach = Ext.getCmp('Approach_product').getValue();
//			 
//			 
//			 if(this.isOwner(owner)&&this.isPartName(partName)&&this.isCause(cause)&&this.isWeight(weight)&&this.isQuantity(quantity)&&this.isApproach(Approach)&&this.isInspectors(Inspectors)&&this.isHandlers(Handlers))
//			 {
//				 Ext.getCmp('addBtn_product').setDisabled(false);
//				 Ext.getCmp('subBtn_product').setDisabled(false);
//				 Ext.getCmp('delBtn_product').setDisabled(false);
//			 }
//			 else
//			 {
//				 return false;
//			 }
//			 
//		 },this);
		
		product_store.on('beforesave',function(store, data){
			 
			 if(data['create']){
				
				 var rec=data['create'];		 
				 
				 if(rec[0].get('owner')==null||rec[0].get('owner')=='')
				 {
					 return false;
				 }
				 
			 }else if(data['update']){
				 
				 var rec=data['update'];
				 
				 if(rec[0].get('owner')==null||rec[0].get('owner')=='')
				 {
					 return false;
				 }
			 }
			 
		 },this);
		
		this.frame.add(this.master);
		this.frame.add(this.detail);
		
		this.main.add(this.frame);
		this.main.doLayout();
	  	product_store.load({params:{start:0,limit:20}});
//		product_store.load({
//			params:{start:0,limit:20},
//			callback:function(records,options,succees){
//				if(!succees){
//					Ext.getCmp('addBtn_product').setDisabled(true);
//				}					
//			}
//		}); 
	
	
	},
	showSaveForm : function(g, store, record){
		
		if(!record){
	        record = new store.recordType();
		}
		
		var form = new com.cce.companyinno.companyinnoProductForm();
		
		this.win = new Ext.Window({
		    title: '无害化处理-产品登记',
		    closable:true,
		    width:590,
		    height:350,
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
	},
	isOwner:function(s){
		
		if(s!='')
		{
			return true;
		}
		else
		{
			Ext.getCmp('owner').markInvalid('货主不能为空');
			
			return false;
		}
		
	},
	isPartName:function(s){
		
		if(s!='')
		{
			return true;
		}
		else
		{
			Ext.getCmp('partName').markInvalid('产品名称不能为空');
			
			return false;
		}
	},
	isCause:function(s){
	
		if(s!='')
		{
			return true;
		}
		else
		{
			Ext.getCmp('cause').markInvalid('处理原因不能为空');
			
			return false;
		}
				
	},
	isWeight:function(s){
		
		if(s!='')
		{
			return true;
		}
		else
		{
			Ext.getCmp('weight').markInvalid('处理数量不能为空');
			
			return false;
		}
		
	},
	isQuantity:function(s){
		
		if(s!='')
		{
			return true;
		}
		else
		{
			Ext.getCmp('quantity').markInvalid('处理头数不能为空');
			
			return false;
		}
	},
	isInspectors:function(s){
		if(s!='')
		{
			return true;
		}
		else
		{
			Ext.getCmp('Inspectors_Combo_product').markInvalid('检验人员不能为空');
			
			return false;
		}
	},
	isHandlers:function(s){
		if(s!='')
		{
			return true;
		}
		else
		{
			Ext.getCmp('Handlers_Combo_product').markInvalid('无害化处理人员不能为空');
			
			return false;
		}
	},
	isApproach:function(s){
		if(s!='')
		{
			return true;
		}
		else
		{
			Ext.getCmp('Approach_product').markInvalid('处理方式不能为空');
			
			return false;
		}
	}
});
var CAN_DO_ADD=false;
