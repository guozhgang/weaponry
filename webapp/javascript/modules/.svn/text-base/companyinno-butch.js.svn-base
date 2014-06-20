Ext.ns("com.cce.companyinno");

ScriptMgr.load({ scripts: ['javascript/utils/FormTableLayout.js']});
//ScriptMgr.load({ scripts: ['javascript/utils/RowEditor.js']}); //载入插件
ScriptMgr.load({ scripts: ['javascript/utils/ComboBox.js','javascript/utils/DateTimeField.js']}); //载入插件

var proxy = new Ext.data.HttpProxy({
	api: {
		    read : 'companyinno/InnoButch!list.action',
		    create : 'companyinno/InnoButch!save.action',
		    update : 'companyinno/InnoButch!save.action',
		    destroy: 'companyinno/InnoButch!delete.action'
		}
}); 
var proxy_detail = new Ext.data.HttpProxy({
	api: {
		    read : 'companyinno/AppButch!getDetails.action'
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
		{name: 'cause',mapping:'cause'}, //死亡原因 
		{name: 'quantity',mapping:'quantity',type:'int'}, //处理头数
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
//	id:'Inspectors_Combo_butch'
//}); 
//
//var Handlers_Combo =  new com.cce.Handlers_Combo({
//	id:'Handlers_Combo_butch'
//});
//
//var h_type_comb = new com.cce.h_type_combo({
//	id:'Approach_butch'
//});

var fm = Ext.form; 


//var columns = [
//   new Ext.grid.CheckboxSelectionModel(), 
//   {header:'货主',dataIndex:'owner',editor: new fm.TextField({id:'owner'})}, 
//   {header:'死亡原因',dataIndex:'cause',editor: new fm.TextField({id:'cause'})}, 
//   {header:'处理头数',dataIndex:'quantity',editor:new fm.NumberField({id:'quantity'})},
//   {header:'处理方式',dataIndex:'Approach',editor:h_type_comb},
//   {header:'检验人员',dataIndex:'qcSign',editor:Inspectors_Combo},
//   {header:'无害化处理人员',dataIndex:'pcSign',editor:Handlers_Combo},
//   {header:'状态',dataIndex:'status'}
// 
//];
var columns = [
               new Ext.grid.CheckboxSelectionModel(), 
           	   {header:'无害化编号',dataIndex:'id'},
               {header:'货主',dataIndex:'owner'}, 
               {header:'死亡原因',dataIndex:'cause'}, 
               {header:'处理头数',dataIndex:'quantity'},
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
com.cce.companyinno.companyinnoButch=Ext.extend(Ext.Panel,{
	id:'companyinno-Butch-main',
	loadMask: true,
	border: false,
	enableHdMenu: false,
	header:false,
	region:'center',
	closable:true,
	layout:"border",
	frame:true
});

//无害化处理-待宰前-表格1

com.cce.companyinno.companyinnoButchMaster = Ext.extend(Ext.grid.GridPanel, {
	  id:'companyinnoButchMaster',
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
				url : 'companyinno/InnoButch!getNewStatus.action',
				scope : this,
				params : { },
				callback : function(o, s, r) {
					var butchStates = Ext.util.JSON.decode(r.responseText).message;

					document.getElementById("butchStates").innerHTML="当前状态: " + butchStates;

				}
			});
		    
		    // super
		    com.cce.companyinno.companyinnoButchMaster.superclass.initComponent.call(this);
		    
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
							id:'addBtn_butch',
							scope: this,
							handler:this.onAdd
			    	},	    	
					{
							text:"提交",
							iconCls:"submit_inno",
							id:'subBtn_butch',
							scope: this,
							handler:this.onSubmit
					},
					{
							text:"修改",
							iconCls:"company_inno_edit",
							id:'edtBtn_butch',
							scope: this,
							handler:this.onEdit
					},
					{
							text:"删除",
							id:'delBtn_butch',
							iconCls:"company_inno_delete",
							scope: this,
							handler:this.onDelete
					},
					new Ext.Toolbar.Fill(),	
					{
						xtype:"label",
						id:'butchStates'
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
//		  butch_store.insert(0, res);
//		  this.getView().refresh();
//		  this.getSelectionModel().selectRow(0);		
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
				        	butch_store.remove(rows[i]);
				        }
				        butch_store.save();
				        butch_store.on('save',function(s,b,d){
					    	butch_store.load({params:{start:0,limit:20}});
					    },this);
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
				url : 'companyinno/InnoButch!submit.action',
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
						url : 'companyinno/InnoButch!getNewStatus.action',
						scope : this,
						params : { },
						callback : function(o, s, r) {
							var butchStates = Ext.util.JSON.decode(r.responseText).message;

							document.getElementById("butchStates").innerHTML="  申请状态: " + butchStates;

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
//Module的companyinnoButchtDetail内容Panel定义..
//------------------------------------------------------------------------------

com.cce.companyinno.companyinnoButchDetail=Ext.extend(Ext.grid.GridPanel ,{
	  id:'companyinnoButchDetail',
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
		    com.cce.companyinno.companyinnoButchDetail.superclass.initComponent.call(this);
		    
	  }
		
});

//定义无害化处理-待宰前死亡-窗口输入

com.cce.companyinno.companyinnoButchForm=Ext.extend(Ext.form.FormPanel, {
	title: '待宰前死亡',
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
	record : null,
	initComponent : function() {
		
		
		this.Inspectors_Combo = new Ext.form.ComboBox({
			id:'Inspectors_Combo',
			fieldLabel:"检验人员",
			hiddenName:'qcSign',
			triggerAction:'all',
			editable:false,
			store:Inspectors_Store,
			displayField:'name',
			 mode: 'local',
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
			displayField:'name',
			 mode: 'local',
			valueField:'id',
			allowBlank:false,
			anchor : '100%'
		});

		this.h_type_comb = new com.cce.h_type_combo({
			id:'Approach_butch'
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
	    com.cce.companyinno.companyinnoButchForm.superclass.initComponent.call(this);
	    
	     

	},
	buildForm : function() {
		var hiddenId = new Ext.form.Hidden({name:"id"});
		return [
				{
				    xtype: 'textfield',
				    fieldLabel: '货主',
					allowBlank:false,
				    anchor: '100%',					 
				    id:'owner',
				    name:'owner',
					colspan:2
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
				this.h_type_comb,
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
				{
				    xtype: 'textarea',
				    fieldLabel: '死亡原因',
					allowBlank:false,
				    anchor: '100%',					 
				    id:'cause',
				    name:'cause',
				    colspan:2
				}
//				{
//				    xtype: 'textarea',
//				    fieldLabel: '处理方式',
//					allowBlank:false,
//				    anchor: '100%',					 
//				    id:'Approach',
//				    name:'Approach',
//				    colspan:2
//				}
				,
				
				hiddenId
		]
	},
	loadRecord : function(rec) {
	      this.record = rec;	      
	      this.getForm().loadRecord(this.record);
	      Ext.getCmp('Approach_butch').setValue(this.record.get('approachId'));
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
			url : 'companyinno/InnoButch!saveNSubmit.action',
			scope: this,
			params : { 
			 	data:Ext.encode(this.getForm().getValues())
			}, 
			success : function(response) { 
			   var data=Ext.util.JSON.decode(response.responseText);
			   App.setAlert(data.success,data.message);
			   butch_store.reload();
			   store_detail.reload();
			   Ext.Ajax.request( {
					url : 'companyinno/InnoButch!getNewStatus.action',
					scope : this,
					params : { },
					callback : function(o, s, r) {
						var butchStates = Ext.util.JSON.decode(r.responseText).message;

						document.getElementById("butchStates").innerHTML="  申请状态: " + butchStates;

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
	    butch_store.add(new butch_store.recordType(this.getForm().getValues()));
	    butch_store.save();
        butch_store.on('save',function(s,b,d){
	    	butch_store.load({params:{start:0,limit:20}});
	    },this);
	    store_detail.reload();
        this.fireEvent('afterSave', this, null);
	    
	}
});


//------------------------------------------------------------------------------
//Module的定义放在最后,eval(xxx.js)后返回Module的类定义..
//------------------------------------------------------------------------------

var butch_store = new Ext.data.Store({
    id: 'butch_store',
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
		this.master = new com.cce.companyinno.companyinnoButchMaster({ store : butch_store });
		this.detail= new com.cce.companyinno.companyinnoButchDetail({ store : store_detail });
		this.frame= new com.cce.companyinno.companyinnoButch();		
		butch_store.on('load',function(store,records,options){
			Ext.Ajax.request({
	            url:'companyinno/InnoButch!newBtnEnabled.action',//1、判断企业备案是否通过；2、判断是否有审批中的记录
	            scope:this,
	            callback: function(o,s,r) {
		  			if(!Ext.util.JSON.decode(r.responseText).success){
	            		Ext.getCmp('addBtn_butch').setDisabled(true);
	            		Ext.getCmp('subBtn_butch').setDisabled(true);
	            		Ext.getCmp('edtBtn_butch').setDisabled(true);
	            		Ext.getCmp('delBtn_butch').setDisabled(true);
	    				CAN_DO_ADD=false;
		  			}else{
	            		Ext.getCmp('addBtn_butch').setDisabled(false);
	            		var selected = Ext.getCmp('companyinnoButchMaster').getSelectionModel().getSelected();
	            		if(!selected){
		            		Ext.getCmp('subBtn_butch').setDisabled(false);
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
				Ext.getCmp('edtBtn_butch').setDisabled(true);
				Ext.getCmp('delBtn_butch').setDisabled(true);
				if(CAN_DO_ADD)Ext.getCmp('subBtn_butch').setDisabled(true);
			}else{
				Ext.getCmp('edtBtn_butch').setDisabled(false);
				Ext.getCmp('delBtn_butch').setDisabled(false);
				if(CAN_DO_ADD)Ext.getCmp('subBtn_butch').setDisabled(false);
			};
			store_detail.load({
	  			params : { 
	   			 	data:this.record.get("id")
	   			}
	  		}); 
		}, this);
		
//		editor.on('canceledit',function(editr,b,r){
//						 		 
//			 if(r.get('id')==null||r.get('id')=="")
//			 {
//				 this.master.getSelectionModel().selectRow(0);
//				 var selected = this.master.getSelectionModel().getSelected();
//			     if (!selected) {
//			            return false;
//			     }
//			     var rows=this.master.getSelectionModel().getSelections();
//				 
//			     for(var i=0;i<rows.length;i++)
//			     {
//			        butch_store.remove(rows[i]);
//			     }
//			     butch_store.save();
//			     store_detail.reload();
//			 }
//			 Ext.getCmp('addBtn_butch').setDisabled(false);
//			 Ext.getCmp('subBtn_butch').setDisabled(false);
//			 Ext.getCmp('delBtn_butch').setDisabled(false);
//		        
//		},this);
//		
//		editor.on('beforeedit',function(editor,number){
//			 Ext.getCmp('addBtn_butch').setDisabled(true);
//			 Ext.getCmp('subBtn_butch').setDisabled(true);
//			 Ext.getCmp('delBtn_butch').setDisabled(true);
//		 },this);
//		
//		editor.on('validateedit',function(editor,o,r,number){
//			 
//			 var owner = Ext.getCmp('owner').getValue();
//			 var cause = Ext.getCmp('cause').getValue();
//			 var quantity = Ext.getCmp('quantity').getValue();
//			 var Inspectors = Ext.getCmp('Inspectors_Combo_butch').getValue();
//			 var Handlers = Ext.getCmp('Handlers_Combo_butch').getValue();
//			 var Approach = Ext.getCmp('Approach_butch').getValue();
//			 
//			 
//			 if(this.isOwner(owner)&&this.isCause(cause)&&this.isQuantity(quantity)&&this.isApproach(Approach)&&this.isInspectors(Inspectors)&&this.isHandlers(Handlers))
//			 {
//				 Ext.getCmp('addBtn_butch').setDisabled(false);
//				 Ext.getCmp('subBtn_butch').setDisabled(false);
//				 Ext.getCmp('delBtn_butch').setDisabled(false);
//			 }
//			 else
//			 {
//				 return false;
//			 }
//			 
//		 },this);
		
		butch_store.on('beforesave',function(store, data){
			 
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
	  	butch_store.load({params:{start:0,limit:20}});

//		butch_store.load({
//			params:{start:0,limit:20},
//			callback:function(records,options,succees){
//				if(!succees){
//					Ext.getCmp('addBtn_butch').setDisabled(true);
//				}					
//			}
//		}); 
	
	},
	showSaveForm : function(g, store, record){
		
		if(!record){
	        record = new store.recordType();
		}
		
		var form = new com.cce.companyinno.companyinnoButchForm();
		
		this.win = new Ext.Window({
		    title: '无害化处理-待宰前死亡登记',
		    closable:true,
		    width:580,
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
			Ext.getCmp('Inspectors_Combo_butch').markInvalid('检验人员不能为空');
			
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
			Ext.getCmp('Handlers_Combo_butch').markInvalid('无害化处理人员不能为空');
			
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
			Ext.getCmp('Approach_butch').markInvalid('处理方式不能为空');
			
			return false;
		}
	}
}
);
var CAN_DO_ADD=false;
