Ext.ns("com.cce.companycredit");
ScriptMgr.load({ scripts: ['javascript/utils/ComboBox.js']});

var contents=["create_note_A","credit_note_B","credit_note_C","credit_note_D"];
//------------------------------------------------------------------------------
//Module的proxy定义..
//------------------------------------------------------------------------------
//分级信息
var proxy = new Ext.data.HttpProxy({
api: {
	    read : 'credit/companycredit!list.action',
	    create : 'credit/companycredit!save.action',
	    destroy: 'credit/companycredit!delete.action'
	}
});

//审批信息
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
	    	{name: 'entNo',mapping:'entNo'},
	    	{name: 'entCredit',mapping:'entCredit'},
	        {name: 'createDate',mapping:"createDate",type:'date',dateFormat:'time'},
	        {name: 'updateDate',mapping:"updateDate",type:'date',dateFormat:'time'},
	    	{name: 'fileId',mapping:'fileId',type:'int'},
	    	{name: 'fileName',mapping:'fileName'},
	    	{name: 'remark',mapping:'remark'},
	    	{name: 'status',mapping:'status'},
	    	{name: 'remark',mapping:'remark'}
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

function linker(val){
	if(val&&val!="")
	return "<a title='点击下载' target='_blank' href='upload/download.action?id="+val+"'>↓下载</a>";  
	else return "";
}    
//------------------------------------------------------------------------------
//Module的columns定义..
//------------------------------------------------------------------------------
var columns = [
    new Ext.grid.CheckboxSelectionModel(), 
	{header:'企业名称',dataIndex:'entName'},
	{header:'信用级别',dataIndex:'entCredit'},
	{header:'档案文件',dataIndex:'fileId',renderer:linker},
	{header:'创建时间',dataIndex:'createDate',renderer:Ext.util.Format.dateRenderer('Y年m月d日 H时i分s秒'),sortable:true},
	{header:'状态',dataIndex:'status'},
	{header:'说明',dataIndex:'remark'}
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

com.cce.companycredit.CompanyCreditInput=Ext.extend(Ext.Panel,{
	id:'CompanyCreditInput',
	loadMask: true,
	border: false,
	enableHdMenu: false,
	header:false,
	region:'center',
	closable:true,
	frame:true,
	layout:"border"
});


//------------------------------------------------------------------------------
//Module的CompanyRecordGrid定义..
//------------------------------------------------------------------------------

com.cce.companycredit.CompanyCreditInputMaster = Ext.extend(Ext.grid.GridPanel, {
	id:'com.cce.companycredit.CompanyCreditInputMaster',  
	stripeRows: true,
	  loadMask: true,
	  border: false,
	  enableHdMenu: false,
	  header:false,
	  region:'center',
	  closable:true,
	  columns:columns,
	  frame:true,
	  sm : new Ext.grid.CheckboxSelectionModel(),
	
	  initComponent : function() {
		    // typical viewConfig
		    this.viewConfig = {
		        forceFit: true
		    };
		
		    // build toolbars and buttons.
		    this.tbar = this.buildTopToolbar();
		    this.bbar = this.buildBottomToolbar();
		    
		    Ext.Ajax.request( {
				url : 'credit/companycredit!getSummitCredit.action',
				scope : this,
				params : { },
				callback : function(o, s, r) {
					var credit = Ext.util.JSON.decode(r.responseText).message;
					if(credit){
						document.getElementById("lblCredit").innerHTML="信用级别: " + credit;
					}
				}
			});
		    
		    // super
		    com.cce.companycredit.CompanyCreditInputMaster.superclass.initComponent.call(this);
		    
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
				iconCls:"company_credit_add",
				id:'addBtn_credit',
				scope: this,
				handler:this.onAdd
    	},
    	{
				text:"提交",
				iconCls:"company_credit_submit",
				id:'subBtn_credit',
				scope: this,
				handler:this.onSubmit
		},
//		{
//				text:"修改",
//				iconCls:"company_record_edit",
//				scope: this,
//				handler:this.onEdit
//		},
		{
				text:"删除",
				iconCls:"company_credit_delete",
				id:'delBtn_credit',
				scope: this,
				handler:this.onDelete
		},	
		new Ext.Toolbar.Fill(),	
		{
	        xtype: "label",id:"lblCredit"
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
		
	  /**
	   * onAdd
	   */
	  onAdd : function() {
	      this.fireEvent('doedit', this, this.store, null);
	  },
	  
	  onSubmit:function() {
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
				url : 'credit/companycredit!submit.action',
				scope: this,
				params : { 
				 data:Ext.encode(rowids)
				}, 
				success : function(response) {
					
				   var data=Ext.util.JSON.decode(response.responseText);
				   App.setAlert(data.success,data.message);
  
	 
				   
				   store_credit.load({
					   scope: this,
					   params:{start:0,limit:20},
					   callback:function(records,options,succees){
						   var record = this.getSelectionModel().getSelected();
						   
						   if (!record){
							   store_detail.load({params:{data:''}});
					       }
						   else
						   {
							   if(record!=null)
							   {
								   store_detail.load({
							  	         params : { 
							   			 	data:record.get("id")
							   			 }
								   });
							   }
							   
						   }
					   }
				   }); 
				}, 
				failure : function(response) { 
				   App.setAlert(false,"提交失败！"); 
			    }
		   }); 
	  },	  
	    
	  /**
	   * onDelete
	   */
	  onDelete : function(btn, ev) {
		  var selected = this.getSelectionModel().getSelected();
	        if (!selected) {
	            return false;
	        }
			  var rows=this.getSelectionModel().getSelections();
		      Ext.Msg.confirm('确认删除', '你确定删除该条记录?', function(btn) {
					if (btn == 'yes') {
				        for(var i=0;i<rows.length;i++)
				        {
				        	Ext.getCmp('com.cce.companycredit.CompanyCreditInputMaster').store.remove(rows[i]);
				        }
				        Ext.getCmp('com.cce.companycredit.CompanyCreditInputMaster').store.save();
				        
				        store_credit.load({
							   scope: this,
							   params:{start:0,limit:20},
							   callback:function(records,options,succees){
//								   var record = this.getSelectionModel().getSelected();
								   
								   if (!selected){
									   store_detail.load({params:{data:''}});
							       }
								   else
								   {
									   if(selected!=null)
									   {
										   store_detail.load({
									  	         params : { 
									   			 	data:selected.get("id")
									   			 }
										   });
									   }
									   
								   }
							   }
						   });
					}
		      });
	  }
});

//------------------------------------------------------------------------------
//Module的RecordExpertMore内容Panel定义..
//------------------------------------------------------------------------------
com.cce.companycredit.CompanyCreditInputDetail=Ext.extend(Ext.grid.GridPanel ,{
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
		    com.cce.companycredit.CompanyCreditInputDetail.superclass.initComponent.call(this);
		    
		}
		
});



com.cce.companycredit.CreditInfoForm = Ext.extend(Ext.form.FormPanel, {
	title: '信用档案分级管理',
	modal:true,
	iconCls: 'silk-user',
	labelWidth: 100,
	width: 500,
	fileUpload : true,    
	method: 'POST',   
    fileType : null,
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
	
		
		
		
		this.compay_credit_combo = new com.cce.compay_credit_combo({
			id:'compay_credit_combo',
			listeners:{select:{fn:function(combo, value,index) {
			    Ext.getCmp('notes').body.update(contents[index]);
		    }}}
		});		
		
		
		// build the form-fields.  Always a good idea to defer form-building to a method so that this class can
	    // be over-ridden to provide different form-fields
	    this.items = this.buildForm();
	
	    // build form-buttons
	    this.buttons = this.buildUI();

	    this.addEvents({
	        afterSave : true
	    });	
	    // super
	    com.cce.companycredit.CreditInfoForm.superclass.initComponent.call(this);
	},
    scope:this,	
	
	/**
	 * buildform
	 * @private
	 */
	buildForm : function() {	
	    return [
					        this.compay_credit_combo,
	                        {
	        				    xtype: 'fieldset',
	        				    title: '信用评级申请须知',
	        				    hidden:true,
	        				    layout: 'form',
	        				    checkboxToggle:true,
	        				    collapsed: true,
	        				    width: 530,
	        				    items: [
	        				        {
	  	                              	id: 'notes',
	        				            xtype: 'panel',
	        				            layout:'table',
	        				            defaults: {
	        				                bodyStyle:'padding:8px'
	        				            },
	        				            layoutConfig: {
	        				                columns: 1
	        				            },
	        				            items: [{
	        				                html: '请选择档案级别',
	        				                rowspan: 1
	        				            }]
	        				        }
	        				    ]
	                        },
	                        {
                            	xtype : 'fileuploadfield',
                            	id: 'file',
                    			name : 'upload',
                    			emptyText : '请选择文件',
                    			fieldLabel : '上传文件',
                    			buttonText : '浏 览',
                    			anchor : '100%',                    			 
                    			allowBlank:false
	                        },
	                        {
	                        	xtype: 'textfield',
	                        	fieldLabel: '说明', 
	                        	name: 'remark',
	                        	id:'remark',	                        	 
	                        	anchor : '100%'
	                        }
					    ]
	},  
	
	buildUI : function(){
	    return [{
			        text: '提交',
			        handler: function(btn, ev){
				    	if (!this.getForm().isValid()) {
				            App.setAlert(false, "表单数据有错误.");
				            return false;
				        }
				        if(this.isFileOk(Ext.getCmp('file').getValue())){
				        	
					        this.getForm().submit( {
								url : 'upload/upload!upload.action',
								waitMsg : '正在上传文件...',
								scope : this,
								success : function(f,o){
						        	var thestore=Ext.getCmp('com.cce.companycredit.CompanyCreditInputMaster').store;
//						    		thestore.insert(0,new thestore.recordType({'fileId':o.result.message,'entCredit':Ext.getCmp('compay_credit_combo').getValue(),'remark':Ext.getCmp('remark').getValue()}));
//						    		thestore.save();
							    	Ext.Ajax.request( {
										url : 'credit/companycredit!saveSubmit.action',
										scope : this,
										params : {data:	"{\"fileId\":" + o.result.message +",\"entCredit\":" + Ext.getCmp('compay_credit_combo').getValue() +",\"remark\":" + Ext.getCmp('remark').getValue() +"}"},
										callback : function(o,s,r) {
											 var data=Ext.util.JSON.decode(r.responseText);
											   App.setAlert(data.success,data.message);
											   this.fireEvent('afterSave', this, null);
											   store_credit.load({
												   scope: this,
												   params:{start:0,limit:20},
												   callback:function(records,options,succees){
//													   var record = this.getSelectionModel().getSelected();
//													   
//													   if (!record){
//														   store_detail.load({params:{data:''}});
//												       }
//													   else
//													   {
//														   if(record!=null)
//														   {
//															   store_detail.load({
//														  	         params : { 
//														   			 	data:record.get("id")
//														   			 }
//															   });
//														   }
//														   
//													   }
												   }
											   }); 
									}
									});
						        },
					            failure: function(f,o){
					                App.setAlert(false, "上传失败." + o.result.message );
					                return false;
					            }
							});
				        }
				        else
				        {
				        	App.setAlert(false, "请上传正确的文件格式(zip rar doc docx xls)" );
				        }
			        },
			        scope: this
			    },
			  	{
					text:"保存",
					scope: this,
					handler:this.onUpload
			  	}, {
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
	
	onUploadOk: function(f,o)
	{
		var thestore=Ext.getCmp('com.cce.companycredit.CompanyCreditInputMaster').store;
		thestore.insert(0,new thestore.recordType({'fileId':o.result.message,'entCredit':Ext.getCmp('compay_credit_combo').getValue(),'remark':Ext.getCmp('remark').getValue()}));
		thestore.save();
		
        this.fireEvent('afterSave', this, null);
        
 		//store_credit.reload();
//   	    App.setAlert(true, "档案文件创建成功");
	},
    onUpload : function(btn, ev) {
        if (!this.getForm().isValid()) {
            App.setAlert(false, "表单数据有错误.");
            return false;
        }
        if(this.isFileOk(Ext.getCmp('file').getValue())){
        	
	        this.getForm().submit( {
				url : 'upload/upload!upload.action',
				waitMsg : '正在上传文件...',
				scope : this,
				success : this.onUploadOk, 
	            failure: function(f,o){
	                App.setAlert(false, "上传失败." + o.result.message );
	                return false;
	            }
			});
        }
        else
        {
        	App.setAlert(false, "请上传正确的文件格式(zip rar doc docx xls)" );
        }
    },
    isFileOk:function(s){
		
		var patrn = /[.](zip|rar|doc|docx|xls)$/;
		
		if(s!='')
		{
		
		    s=s.toLocaleLowerCase(); //全部转换成小写
		    
			if (!patrn.exec(s)) {
			   return false;	
			}
			else
			{
				return true ;
			}
		}
		else
		{
			return true;
		}

	}

});

var store_credit = new Ext.data.Store({
    id: 'id',
    message: 'message',
    proxy: proxy,
    reader: reader,
    writer: writer,  // <-- plug a DataWriter into the store just as you would a Reader
    autoSave: false
});

var store_detail = new Ext.data.Store({
    id: 'id',
    message: 'message',
    proxy: proxy_detail,
    reader: reader_detail,
    writer: writer,  // <-- plug a DataWriter into the store just as you would a Reader
    autoSave: false
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
		this.master = new com.cce.companycredit.CompanyCreditInputMaster({ store : store_credit });
 		this.detail= new com.cce.companycredit.CompanyCreditInputDetail({ store : store_detail });
		this.frame= new com.cce.companycredit.CompanyCreditInput();		
		store_credit.on('load',function(Store,records,options){
		  	Ext.Ajax.request({
	            url:'credit/companycredit!newBtnEnabled.action',//1、判断企业备案是否通过；2、判断是否有审批中的记录
	            scope:this,
	            callback: function(o,s,r) {
		  			if(!Ext.util.JSON.decode(r.responseText).success){
	            		Ext.getCmp('addBtn_credit').setDisabled(true);
	            		Ext.getCmp('subBtn_credit').setDisabled(true);
	            		Ext.getCmp('delBtn_credit').setDisabled(true);
	    				CAN_DO_ADD=false;
		  			}else{
	            		Ext.getCmp('addBtn_credit').setDisabled(false);
	            		var selected = Ext.getCmp('com.cce.companycredit.CompanyCreditInputMaster').getSelectionModel().getSelected();
	            		if(!selected){
		            		Ext.getCmp('subBtn_credit').setDisabled(false);
	            		}
	    				CAN_DO_ADD=true;
		  			}
	            }
			});
		})
		//关联自定义事件
	    //this.relayEvents(this.store, ['destroy', 'save', 'update']);

		this.master.on('doedit', this.EditForm, this);
		this.master.on('rowclick', function(g, index, ev){
			this.record =g.store.getAt(index);
			if(this.record.get('status')=='等待审批'||this.record.get('status')=='审批中'||this.record.get('status')=='审批通过'){
				Ext.getCmp('delBtn_credit').setDisabled(true);
				if(CAN_DO_ADD)Ext.getCmp('subBtn_credit').setDisabled(true);
			}else{
				Ext.getCmp('delBtn_credit').setDisabled(false);
				if(CAN_DO_ADD)Ext.getCmp('subBtn_credit').setDisabled(false);
			};
			store_detail.load({
    			params : { 
     			 	data:this.record.get("id")
     			}
    		}); 
		}, this);
		
		this.frame.add(this.master);
 		this.frame.add(this.detail);
	  	this.main.add(this.frame);
	  	this.main.doLayout();
	  	store_credit.load({params:{start:0,limit:20}});
//	  	store_credit.load({
//	  		params:{start:0,limit:20},
//		  	callback:function(records,options,succees){
//				if(!succees){
//					Ext.getCmp('addBtn_credit').setDisabled(true);				 
//				}					
//			}
//	  	}); 
	  	
	  	store_credit.on('save',this.reload,this);
	},

	EditForm : function(g, store, record){
		if(!record){
	        record = new store.recordType();
		}
		var form = new com.cce.companycredit.CreditInfoForm();
		this.newWin = new Ext.Window({
		    title: '信用档案管理',
		    closable:true,
		    width:500,
		    height:200,
		    constrain:true,
		    plain:true,
		    layout: 'border',
		    resizable:true,
		    autoScroll: true,
		    modal:true,
		    items: [form]
		});
		form.on('afterSave', this.afterSave, this);
		form.loadRecord(record);		
		this.newWin.show();
	},
	afterSave : function(fp, record){
        this.newWin.close();
	},
	reload:function(store,batch,data){
 
		 store.reload();
		
	}
	
});
var CAN_DO_ADD=false;
