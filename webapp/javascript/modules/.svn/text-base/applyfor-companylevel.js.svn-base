Ext.ns("com.cce.companylevel");
ScriptMgr.load({ scripts: ['javascript/utils/GroupSummary.js']});
ScriptMgr.load({ scripts: ['javascript/utils/ComboBox.js']});
//------------------------------------------------------------------------------
//Module的proxy定义..
//------------------------------------------------------------------------------
var proxy = new Ext.data.HttpProxy({
api: {
	    read : 'companylevel/levelInfo!list.action',
	    create : 'companylevel/levelInfo!save.action',
	    destroy: 'companylevel/levelInfo!delete.action'
	}
});
var proxy_level=new Ext.data.HttpProxy({
	api:{
	read:'companylevel/levelInfo!get.action'
}
});
//------------------------------------------------------------------------------
//Module的reader定义..
//------------------------------------------------------------------------------
var reader = new Ext.data.JsonReader(
	{
		root:'data',
		successProperty: 'success',
		messageProperty: 'message' //必须定义messageProperty,才能使event handler拿到message消息
	},	
	[ 
	    	{name: 'id',mapping:"id"},
	    	{name: 'entName',mapping:'entName'},
	    	{name: 'entLevel',mapping:'entLevel'},
	    	{name: 'fileId',mapping:'fileId',type:'int'},
	        {name: 'createDate',mapping:"createDate",type:'date',dateFormat:'time'},
	    	{name: 'levelItems',mapping:'levelItems'},
			{name: 'status',mapping:'status'}
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
	{header:'企业等级',dataIndex:'entLevel'},
	{header:'审查资料',dataIndex:'fileId',renderer:linker},
	{header:'创建时间',dataIndex:'createDate',renderer:Ext.util.Format.dateRenderer('Y年m月d日 H时i分s秒'),sortable:true},
	{header:'状态',dataIndex:'status'}
];

var proxy_detail = new Ext.data.HttpProxy({
	api: {
		    read : 'companylevel/approvallevel!getDetailsByApprovalId.action',
		    create : 'companylevel/approvallevel!save.action',
		    destroy: 'companylevel/approvallevel!delete.action'
		}
	});

	//------------------------------------------------------------------------------
	//Module的reader定义..
	//------------------------------------------------------------------------------
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
var reader_level = new Ext.data.JsonReader(
		{root:'data'},
		[ 
	    	{name: 'itemid',mapping:'itemid'},
	    	{name: 'itemName',mapping:'itemName'},
	    	{name: 'description',mapping:'description' },
	        {name: 'isContained',mapping:"isContained" },
	    	{name: 'remark',mapping:'remark'} 
 
		]
	);
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

com.cce.companylevel.CompanyLevelInput=Ext.extend(Ext.Panel,{
	id:'companylevel-input-main',
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

com.cce.companylevel.CompanyLevelInputMaster = Ext.extend(Ext.grid.GridPanel, {
      id:'com.cce.companylevel.CompanyLevelInputMaster',
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
				url : 'companylevel/levelInfo!findCompanyLevel.action',
				scope : this,
				params : { },
				callback : function(o, s, r) {
					var levelStates = Ext.util.JSON.decode(r.responseText).message;

					document.getElementById("levelStates").innerHTML="企业等级: " + levelStates;

				}
			});
		    
		    // super
		    com.cce.companylevel.CompanyLevelInputMaster.superclass.initComponent.call(this);
		    
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
				iconCls:"company_level_add",
				id:'addBtn_level',
				scope: this,
				handler:this.onAdd
    	},
    	{
				text:"提交",
				iconCls:"company_level_submit",
				id:'subBtn_level',
				scope: this,
				handler:this.onSubmit
		},
		{
				text:"修改",
				iconCls:"company_level_edit",
				id:'edtBtn_level',
				scope: this,
				handler:this.onEdit
		},
		{
				text:"删除",
				iconCls:"company_level_delete",
				id:'delBtn_level',
				scope: this,
				handler:this.onDelete
		},	
		new Ext.Toolbar.Fill(),	
		{
			xtype:"label",
         	id:'levelStates'
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
	      this.fireEvent('doAddNew', this, this.store, null);
	  },
	  onEdit : function(){
		  var record = this.getSelectionModel().getSelected();
	      if (!record) {
	            return false;
	      }
	      this.fireEvent('doEdit', this, this.store, record);
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
				url : 'companylevel/levelInfo!submit.action',
				scope: this,
				params : { 
				 data:Ext.encode(rowids)
				}, 
				success : function(response) { 
				   App.setAlert(Ext.util.JSON.decode(response.responseText).success,Ext.util.JSON.decode(response.responseText).message); 
				   companylevel_store.reload();
				   
				   var record = this.getSelectionModel().getSelected();
				   if (record) {
					   companylevel_store_detail.load({
				  	         params : { 
				   			 	data:record.get("id")
				   			 }
					   });
			       }
				   else
				   {
					   companylevel_store_detail.reload();
				   }
				    
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
				        	companylevel_store.remove(rows[i]);
				        }
				        companylevel_store.save();
				        companylevel_store_detail.reload();
					}
		      });
	  }
});

//------------------------------------------------------------------------------
//Module的RecordExpertMore内容Panel定义..
//------------------------------------------------------------------------------

com.cce.companylevel.CompanyLevelStatusDetail=Ext.extend(Ext.grid.GridPanel ,{
	  id:'CompanyLevelStatusDetail',
	  title:'审批历史',
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
		    com.cce.companylevel.CompanyLevelStatusDetail.superclass.initComponent.call(this);
		}
});

//------------------------------------------------------------------------------
//Module的RecordExpertMore内容Panel定义..
//------------------------------------------------------------------------------


var GroupRemoteProxy_Create = new Ext.data.HttpProxy({
	 method: 'POST',
	prettyUrls: false,
	url: 'companylevel/companyLevelProcess!save.action',
	api: {
	    read : 'companylevel/companyLevelProcess!getTemplateInfo.action',
	    create : 'companylevel/companyLevelProcess!save.action',
	    destroy: 'companylevel/companyLevelProcess!delete.action'
	}
});
var GroupRemoteProxy_Update = new Ext.data.HttpProxy({
	method: 'POST',
	prettyUrls: false,
	url: 'companylevel/companyLevelProcess!save.action',
	api: {
	    read : 'companylevel/companyLevelProcess!getLevelItems.action',
	    create : 'companylevel/companyLevelProcess!save.action',
	    destroy: 'companylevel/companyLevelProcess!delete.action'
	}
});
var GroupRemoteWriter = new Ext.data.JsonWriter({
  encode: true,
  writeAllFields: false
});
var GroupRemoteReader = new Ext.data.JsonReader({
    idProperty: 'id',
    fields: [
        {name: 'itemid', type: 'string'},
        {name: 'itemName', type: 'string'},
        {name: 'id', type: 'int'},
        {name: 'description', type: 'string'},
        {name: 'isContained', type: 'string'},
        {name: 'remark', type: 'string'},
        {name: 'detailId', type: 'long'}
    ],
    root:'data',
    remoteGroup:true,
    remoteSort: true
});

com.cce.companylevel.NewLevelInfoForm = Ext.extend(Ext.form.FormPanel, {
	title: '企业分级',
	modal:true,
	iconCls: 'silk-user',
	labelWidth: 100,
	width: 500,
	height: 650,
	padding: 10,
	header: false,
	frame: true,
	region:'center',
	layout: 'form',
	autoScroll: true,
  // private A pointer to the currently loaded record
	record : null,
	fileUpload : true,
	initComponent : function() {
	
				
		this.compay_level_combo = new com.cce.compay_level_combo({
			    id:'compay_level_combo',
				listeners:{select:{fn:function(combo, value) {
				Ext.getCmp('GroupGrid').store.load({
					params : { 
		   			 	data:combo.getValue()
		   			}
				}); 
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
	    com.cce.companylevel.NewLevelInfoForm.superclass.initComponent.call(this);
	},
	
	
	/**
	 * buildform
	 * @private
	 */
	buildForm : function() {	
	    return [
					{
		                columnWidth:.5,
		                layout: 'form',
					    items: [
					            this.compay_level_combo
					    ]
					},{
		                xtype: 'editorgrid',
		                id:'GroupGrid',
		                ds: new Ext.data.GroupingStore({
		                	reader: GroupRemoteReader,
		        		    writer: GroupRemoteWriter,
//		                    proxy : new Ext.data.HttpProxy({
//		                        url: 'companylevel/companyLevelTemplate!getTemplateInfo.action',
//		                        method: 'POST'
//		                    }),
		                	proxy : GroupRemoteProxy_Create,
		                    sortInfo: {field: 'id', direction: 'ASC'},
		                    autoSave: false,
		                    groupField: 'itemName'
		                }),
		                columns: [
	                          {
	                              id: 'description',
	                              header: '说明',
	                              width: 80,
	                              sortable: true,
	                              dataIndex: 'description'
	                          },{
	                              header: '类别',
	                              width: 20,
	                              sortable: true,
	                              dataIndex: 'itemName'
	                          },{
	                              header: '是否符合',
	                              width: 25,
	                              dataIndex: 'isContained',
	                              renderer : function(v){
	                        		if(v==false||v=='false') return '否';
	                                return '是';
	                              },
	                              editor: new Ext.form.Checkbox({
	                            	  checked:true
	                              })
	                          },{
	                              header: '备注',
	                              width: 30,
	                              dataIndex: 'remark',
	                              editor: new Ext.form.TextField({
	                                 allowBlank: true
	                              })
	                          }
	                      ],

		                view: new Ext.grid.GroupingView({
		                    forceFit: true,
		                    showGroupName: false,
		                    enableNoGroups: false,
		        			enableGroupingMenu: false,
		                    hideGroupedColumn: true
		                }),
		                height: 380,
		                clicksToEdit: 1,
		                collapsible: false,
		                animCollapse: false,
		                trackMouseOver: false,
		                iconCls: 'icon-grid'
		            },
		            {
		            	columnWidth:.5,
		                layout: 'form',
		                items:[
		                       {
									xtype : 'fileuploadfield',
					      			id : 'file',
					      			emptyText : '选择文件',
					      			fieldLabel : '资料上传',
					      			name : 'upload',
					      			buttonText : '选择文件',
					      			anchor: '100%'    		 
					      			 
		   					},new Ext.form.Hidden({
		   			            name:"id",
		   			            id:'id',
		   			            hiddenName:'id'
		   			 	    }),new Ext.form.Hidden({
		   			            name:"fileId",
		   			            id:'fileId',
		   			            hiddenName:'fileId'
		   			 	    })
			      		]
					}
	            ];
	},  
	
	buildUI : function(){
	    return [{
				text:"提交",
				scope: this,
				handler:this.onSaveAndsubmit
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
		
	/**
	 * loadRecord
	 * @param {Record} rec
	 */
	loadRecord : function(rec) {
	    this.record = rec;
	    this.getForm().loadRecord(this.record);
	},
	onUploadOk:function (f,o){
		var theStore1=Ext.getCmp('GroupGrid').store;		
		var rowsData = []; 		
		var count = theStore1.getCount(); 		
		var record; 		
		for (var i = 0; i < count; i++) { 
			record = theStore1.getAt(i); 
			if (record.dirty) { 
				rowsData.push(record.data); 
			} 
		} 
		var data={
				'fileId':o.result.message,
				'levelNo':Ext.getCmp('compay_level_combo').getValue(),
				'items':Ext.encode(rowsData)	
		}
		Ext.Ajax.request({
			url: 'companylevel/companyLevelProcess!save.action',
            scope:this,
            params:{data:Ext.encode(data)},
            callback: function(o,s,response) {
            	App.setAlert(Ext.util.JSON.decode(response.responseText).success,Ext.util.JSON.decode(response.responseText).message); 
            	companylevel_store.reload();
        		this.fireEvent('afterSave', this, null);
            }
		});
	},
	onSubmitOk:function (f,o){
		var theStore1=Ext.getCmp('GroupGrid').store;		
		var rowsData = []; 		
		var count = theStore1.getCount(); 		
		var record; 		
		for (var i = 0; i < count; i++) { 
			record = theStore1.getAt(i); 
			if (record.dirty) { 
				rowsData.push(record.data); 
			} 
		} 
		var data={
				'fileId':o.result.message,
				'levelNo':Ext.getCmp('compay_level_combo').getValue(),
				'items':Ext.encode(rowsData)	
		}
		Ext.Ajax.request({
			url: 'companylevel/companyLevelProcess!saveAndSubmit.action',
            scope:this,
            params:{data:Ext.encode(data)},
            callback: function(o,s,response) {
            	App.setAlert(Ext.util.JSON.decode(response.responseText).success,Ext.util.JSON.decode(response.responseText).message); 
            	companylevel_store.reload();
        		this.fireEvent('afterSave', this, null);
            }
		});
	},
	/**
	 * 保存、修改并提交
	 */
	onSaveAndsubmit : function(btn, ev) {
	    if (this.record == null) {
	        return;
	    }
	    if (!this.getForm().isValid()) {
	        App.setAlert(false, "表单数据有错误.");
	        return false;
	    }
	    
	    if(this.isFileOk(Ext.getCmp('file').getValue())){
	    	if(Ext.getCmp('file').getValue()==""){
	    		
	    	 
	    		var theStore1=Ext.getCmp('GroupGrid').store;		
	    		var rowsData = []; 		
	    		var count = theStore1.getCount(); 		
	    		var record; 
	    		
	    		for (var i = 0; i < count; i++) { 
	    			record = theStore1.getAt(i); 
	    			if (record.dirty) { 
	    				rowsData.push(record.data); 
	    			} 
	    		}
	    		
	    		var data={
	    				'fileId':'',
	    				'levelNo':Ext.getCmp('compay_level_combo').getValue(),
	    				'items':Ext.encode(rowsData)	
	    		}
	    		
	    		Ext.Ajax.request({
	    			url: 'companylevel/companyLevelProcess!saveAndSubmit.action',
	                scope:this,
	                params:{data:Ext.encode(data)},
	                callback: function(o,s,response) {
	                	App.setAlert(Ext.util.JSON.decode(response.responseText).success,Ext.util.JSON.decode(response.responseText).message); 
	                	companylevel_store.reload();
	            		this.fireEvent('afterSave', this, null);
	                }
	    		});
	    		
	            
	    		
	    	}else{
	    		
			    this.getForm().submit( {
					url : 'upload/upload!upload.action',
					waitMsg : '正在上传文件...',
					scope : this,
					success : this.onSubmitOk, 
		            failure: function(f,o){
		                App.setAlert(false, "上传失败." + o.result.message );
		                return false;
		            }
			    });
	    	}
	    }else{
	    	App.setAlert(false, "请上传正确的文件格式(zip rar doc docx xls)" );
	    }
	    
	    

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
	    
	    if(this.isFileOk(Ext.getCmp('file').getValue())){
	    	if(Ext.getCmp('file').getValue()==""){
	    		
	    	 
	    		var theStore1=Ext.getCmp('GroupGrid').store;		
	    		var rowsData = []; 		
	    		var count = theStore1.getCount(); 		
	    		var record; 
	    		
	    		for (var i = 0; i < count; i++) { 
	    			record = theStore1.getAt(i); 
	    			if (record.dirty) { 
	    				rowsData.push(record.data); 
	    			} 
	    		}
	    		
	    		var data={
	    				'fileId':'',
	    				'levelNo':Ext.getCmp('compay_level_combo').getValue(),
	    				'items':Ext.encode(rowsData)	
	    		}
	    		
	    		Ext.Ajax.request({
	    			url: 'companylevel/companyLevelProcess!save.action',
	                scope:this,
	                params:{data:Ext.encode(data)},
	                callback: function(o,s,response) {
	                	App.setAlert(Ext.util.JSON.decode(response.responseText).success,Ext.util.JSON.decode(response.responseText).message); 
	                	companylevel_store.reload();
	            		this.fireEvent('afterSave', this, null);
	                }
	    		});
	    		
	            
	    		
	    	}else{
	    		
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
	    }else{
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

com.cce.companylevel.EditLevelInfoForm = Ext.extend(Ext.form.FormPanel, {
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
	fileUpload : true,
	initComponent : function() {
		// build the form-fields.  Always a good idea to defer form-building to a method so that this class can
	    // be over-ridden to provide different form-fields
	    this.items = this.buildForm();
	
	    // build form-buttons
	    this.buttons = this.buildUI();

	    this.addEvents({
	        afterSave : true
	    });
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
	    com.cce.companylevel.EditLevelInfoForm.superclass.initComponent.call(this);
	},
	
	
	/**
	 * buildform
	 * @private
	 */
	buildForm : function() {	
	    return [
					{
		                xtype: 'editorgrid',
		                id:'EditGroupGrid',
		                ds: new Ext.data.GroupingStore({
		                	reader: GroupRemoteReader,
		        		    writer: GroupRemoteWriter,
//		                    proxy : new Ext.data.HttpProxy({
//		                        url: 'companylevel/companyLevelTemplate!getTemplateInfo.action',
//		                        method: 'POST'
//		                    }),
		                	proxy : GroupRemoteProxy_Update,
		                    sortInfo: {field: 'id', direction: 'ASC'},
		                    autoSave: false,
		                    groupField: 'itemName'
		                }),
		                columns: [
	                          {
	                              id: 'description',
	                              header: '说明',
	                              width: 80,
	                              sortable: true,
	                              dataIndex: 'description'
	                          },{
	                              header: '类别',
	                              width: 20,
	                              sortable: true,
	                              dataIndex: 'itemName'
	                          },{
	                              header: '是否符合',
	                              width: 25,
	                              dataIndex: 'isContained',
	                              renderer : function(v){
	                              	if(v==false||v=='false') return '否';
	                                return '是';
	                              },
	                              editor: new Ext.form.Checkbox({
	                              })
	                          },{
	                              header: '备注',
	                              width: 30,
	                              dataIndex: 'remark',
	                              editor: new Ext.form.TextField({
	                                 allowBlank: true
	                              })
	                          }
	                      ],

		                view: new Ext.grid.GroupingView({
		                    forceFit: true,
		                    showGroupName: false,
		                    enableNoGroups: false,
		        			enableGroupingMenu: false,
		                    hideGroupedColumn: true
		                }),
		                height: 380,
		                clicksToEdit: 1,
		                collapsible: false,
		                animCollapse: false,
		                trackMouseOver: false,
		                iconCls: 'icon-grid'
		            },
		            {
						xtype : 'fileuploadfield',
		      			id : 'file',
		      			emptyText : '选择文件',
		      			fieldLabel : '资料上传',
		      			name : 'upload',
		      			buttonText : '选择文件',
		      			anchor: '100%' 		      		 
		      		 
					}
	            ];
	},  
	/**
	 * 修改分级项窗口按钮
	 */
	buildUI : function(){
	    return [{
			text:"提交",
			scope: this,
			handler:this.onSaveAndsubmit
	  	},{
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
		
	/**
	 * loadRecord
	 * @param {Record} rec
	 */
	loadRecord : function(rec) {
	    this.record = rec;
	    Ext.getCmp('EditGroupGrid').store.load({
			params : { 
 			 	data:this.record.get("id")
 			}
		});
	    if(rec.get('id')!=null&&rec.get('id')!=''){
	    	  Ext.getCmp('file').allowBlank=true;
	    }
	    else{
	    	  Ext.getCmp('file').allowBlank=false;
	    }
	},

	onUploadOk:function (f,o){
		var theStore1=Ext.getCmp('EditGroupGrid').store;		
		var rowsData = []; 		
		var count = theStore1.getCount(); 		
		var rec; 		
		for (var i = 0; i < count; i++) { 
			rec = theStore1.getAt(i); 
			if (rec.dirty) { 
				rowsData.push(rec.data); 
			} 
		} 
		var data={
				'fileId':o.result.message,
				'id':this.record.get("id"),
				'items':Ext.encode(rowsData)	
		}
		Ext.Ajax.request({
			url: 'companylevel/companyLevelProcess!save.action',
            scope:this,
            params:{data:Ext.encode(data)},
            callback: function(o,s,response) {
            	App.setAlert(Ext.util.JSON.decode(response.responseText).success,Ext.util.JSON.decode(response.responseText).message); 
            	companylevel_store.reload();
        		this.fireEvent('afterSave', this, null);
            }
		});
	},
	onSubmitOk:function (f,o){
		var theStore1=Ext.getCmp('EditGroupGrid').store;		
		var rowsData = []; 		
		var count = theStore1.getCount(); 		
		var rec; 		
		for (var i = 0; i < count; i++) { 
			rec = theStore1.getAt(i); 
			if (rec.dirty) { 
				rowsData.push(rec.data); 
			} 
		} 
		var data={
				'fileId':o.result.message,
				'id':this.record.get("id"),
				'items':Ext.encode(rowsData)	
		}
		Ext.Ajax.request({
			url: 'companylevel/companyLevelProcess!saveAndSubmit.action',
            scope:this,
            params:{data:Ext.encode(data)},
            callback: function(o,s,response) {
            	App.setAlert(Ext.util.JSON.decode(response.responseText).success,Ext.util.JSON.decode(response.responseText).message); 
            	companylevel_store.reload();
        		this.fireEvent('afterSave', this, null);
            }
		});
	},
	/**
	 * 修改并提交
	 */
	onSaveAndsubmit : function(btn, ev) {
	    if (this.record == null) {
	        return;
	    }
	    if (!this.getForm().isValid()) {
	        App.setAlert(false, "表单数据有错误.");
	        return false;
	    }
	    
	    if(this.isFileOk(Ext.getCmp('file').getValue())){
	    	if(Ext.getCmp('file').getValue()==""){
	    		
	    	 
	    		var theStore1=Ext.getCmp('EditGroupGrid').store;		
	    		var rowsData = []; 		
	    		var count = theStore1.getCount(); 		
	    		var rec; 		
	    		for (var i = 0; i < count; i++) { 
	    			rec = theStore1.getAt(i); 
	    			if (rec.dirty) { 
	    				rowsData.push(rec.data); 
	    			} 
	    		} 
	    		var data={
	    				'fileId':'',
	    				'id':this.record.get("id"),
	    				'items':Ext.encode(rowsData)	
	    		}
	    		Ext.Ajax.request({
	    			url: 'companylevel/companyLevelProcess!saveAndSubmit.action',
	                scope:this,
	                params:{data:Ext.encode(data)},
	                callback: function(o,s,response) {
	                	App.setAlert(Ext.util.JSON.decode(response.responseText).success,Ext.util.JSON.decode(response.responseText).message); 
	                	companylevel_store.reload();
	            		this.fireEvent('afterSave', this, null);
	                }
	    		});
	    		
	            
	    		
	    	}else{
	    		
			    this.getForm().submit( {
					url : 'upload/upload!upload.action',
					waitMsg : '正在上传文件...',
					scope : this,
					success : this.onSubmitOk, 
		            failure: function(f,o){
		                App.setAlert(false, "上传失败." + o.result.message );
		                return false;
		            }
			    });
	    	}
	    }else{
	    	App.setAlert(false, "请上传正确的文件格式(zip rar doc docx xls)" );
	    }
	    
	    

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
	    if(this.isFileOk(Ext.getCmp('file').getValue())){
	    	if(Ext.getCmp('file').getValue()==""){
	    		
		    	 
	    		var theStore1=Ext.getCmp('EditGroupGrid').store;		
	    		var rowsData = []; 		
	    		var count = theStore1.getCount(); 		
	    		var record; 
	    		
	    		for (var i = 0; i < count; i++) { 
	    			record = theStore1.getAt(i); 
	    			if (record.dirty) { 
	    				rowsData.push(record.data); 
	    			} 
	    		}
	    		
	    		var data={
	    				'fileId':'',
	    				'id':this.record.get("id"),
	    				'items':Ext.encode(rowsData)	
	    		}
	    		
	    		Ext.Ajax.request({
	    			url: 'companylevel/companyLevelProcess!save.action',
	                scope:this,
	                params:{data:Ext.encode(data)},
	                callback: function(o,s,response) {
	                	App.setAlert(Ext.util.JSON.decode(response.responseText).success,Ext.util.JSON.decode(response.responseText).message); 
	                	companylevel_store.reload();
	            		this.fireEvent('afterSave', this, null);
	                }
	    		});
	    		
	            
	    		
	    	}else{
	    		
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
var companylevel_store = new Ext.data.Store({
    id: 'id',
    message: 'message',
    proxy: proxy,
    reader: reader,
    writer: writer,  // <-- plug a DataWriter into the store just as you would a Reader
    autoSave: false
});
var companylevel_store_detail = new Ext.data.Store({
    id: 'id',
    message: 'message',
    proxy: proxy_detail,
    reader: reader_detail,
    writer: writer,  // <-- plug a DataWriter into the store just as you would a Reader
    autoSave: false
  });
var store_level_checked = new Ext.data.Store({
    id: 'id',
    message: 'message',
    proxy: proxy_level, //proxy_level
    reader: reader_level,
    writer: writer,  // <-- plug a DataWriter into the store just as you would a Reader
    autoSave: false
});
var columns_level_checked = [
{header: '编号',dataIndex:'itemid'},
{header: '名称',dataIndex:'itemName'},
{header: '说明',dataIndex:'description'} ,//{name: 'levelItems',mapping:'levelItems'},
{header: '是否符合',dataIndex: 'isContained',renderer : function(v){
	if(v==false||v=='false') return '否';
  return '是';
} },
{header:'描述',dataIndex:'remark'} 
  	                 ];
com.cce.companylevel.CompanylevelContentPanel=Ext.extend(Ext.grid.GridPanel ,{
	  title:'分级信息',
	  id:'CompanylevelContentPanel',
	  stripeRows: true,
	  loadMask: true,
	  border: false,
	  enableHdMenu: false,
	  header:false,
	  region:'south',
	  closable:true,
	  height:260,
	  split:true,
	  columns:columns_level_checked,
	  frame:true,
	  initComponent : function() {
		    this.viewConfig = {
		        forceFit: true
		    };
		    com.cce.companylevel.CompanylevelContentPanel.superclass.initComponent.call(this);
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
		autoScroll : false,
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
		this.master = new com.cce.companylevel.CompanyLevelInputMaster({ store : companylevel_store });
		this.detail= new com.cce.companylevel.CompanyLevelStatusDetail({ store : companylevel_store_detail });
 		this.full= new com.cce.companylevel.CompanylevelContentPanel({store:store_level_checked});
		this.frame= new com.cce.companylevel.CompanyLevelInput();		
		companylevel_store.on('load',function(Store,records,options){
			Ext.Ajax.request({
	            url:'companylevel/levelInfo!newBtnEnabled.action',//1、判断企业备案是否通过；2、判断是否有审批中的记录
	            scope:this,
	            callback: function(o,s,r) {
		  			if(!Ext.util.JSON.decode(r.responseText).success){
	            		Ext.getCmp('addBtn_level').setDisabled(true);
	            		Ext.getCmp('subBtn_level').setDisabled(true);
	            		Ext.getCmp('edtBtn_level').setDisabled(true);
	            		Ext.getCmp('delBtn_level').setDisabled(true);
	    				CAN_DO_ADD=false;
		  			}else{
	            		Ext.getCmp('addBtn_level').setDisabled(false);
	            		var selected = Ext.getCmp('com.cce.companylevel.CompanyLevelInputMaster').getSelectionModel().getSelected();
	            		if(!selected){
		            		Ext.getCmp('subBtn_level').setDisabled(false);
	            		}
	    				CAN_DO_ADD=true;
		  			}
	            }
			});
		})
		this.master.on('rowclick', function(g, index, ev){
			this.record =g.store.getAt(index);
			if(this.record.get('status')=='等待审批'||this.record.get('status')=='审批中'||this.record.get('status')=='审批通过'){
				Ext.getCmp('edtBtn_level').setDisabled(true);
				Ext.getCmp('delBtn_level').setDisabled(true);
				if(CAN_DO_ADD)Ext.getCmp('subBtn_level').setDisabled(true);
			}else{
				Ext.getCmp('edtBtn_level').setDisabled(false);
				Ext.getCmp('delBtn_level').setDisabled(false);
				if(CAN_DO_ADD)Ext.getCmp('subBtn_level').setDisabled(false);
			};
			companylevel_store_detail.load({
    			params : { 
     			 	data:this.record.get("id")
     			}
    		}); 
			store_level_checked.load({
    			params : { 
     			 	data:this.record.get("id")
     			}
    		}); 
		}, this);
		
		//关联自定义事件
	    //this.relayEvents(this.store, ['destroy', 'save', 'update']);
		
		this.master.on('doAddNew', this.AddNewForm, this);
		this.master.on('doEdit', this.EditForm, this);
		this.frame.add(this.master);
		this.frame.add(this.tabPanel);
		this.tabPanel.add(this.full);
     	this.main.add(this.frame);
	  	this.main.doLayout();
	  	this.tabPanel.add(this.detail);
	  	companylevel_store.load({params:{start:0,limit:20}}); 
//	  	companylevel_store.load({
//	  		params:{start:0,limit:20},
//		  	callback:function(records,options,succees){
//				if(!succees){
//					Ext.getCmp('addBtn_level').setDisabled(true);
//					 
//				}					
//			}
//	  	}); 
	},

	AddNewForm : function(g, store, record){
		if(!record){
	        record = new store.recordType();
		}
		var form = new com.cce.companylevel.NewLevelInfoForm();
		this.newWin = new Ext.Window({
		    title: '新建分级',
		    closable:true,
		    width:580,
		    height:560,
		    constrain:true,
		    plain:true,
		    layout: 'border',
		    resizable:true,
		    autoScroll: true,
		    modal:true,
		    items: [form]
		});
		form.on('save', this.onSave, this);
		form.on('afterSave', this.afterNewWin, this);
		form.loadRecord(record);		
		this.newWin.show();
	},
	EditForm : function(g, store, record){
		if(!record){
	        record = new store.recordType();
		}
		var form = new com.cce.companylevel.EditLevelInfoForm();
		this.editWin = new Ext.Window({
		    title: '修改分级信息',
		    closable:true,
		    width:580,
		    height:560,
		    constrain:true,
		    plain:true,
		    layout: 'border',
		    resizable:true,
		    autoScroll: true,
		    modal:true,
		    items: [form]
		});
		form.on('save', this.onSave, this);
		form.on('afterSave', this.afterEditWin, this);
		form.loadRecord(record);		
		this.master.on('rowclick', function(g, index, ev){
			this.record =g.store.getAt(index);
			Ext.getCmp('EditGroupGrid').store.load({
    			params : { 
     			 	data:this.record.get("id")
     			}
    		}); 
		}, this);
		this.editWin.show();
	},
	onSave : function(fp, record){	
	},

	afterNewWin : function(fp, record){
        this.newWin.close();
	},
	afterEditWin : function(fp, record){
        this.editWin.close();
	}
});
var CAN_DO_ADD=false;
