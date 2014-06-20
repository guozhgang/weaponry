Ext.ns("com.cce.companylevel");
ScriptMgr.load({ scripts: ['javascript/utils/GroupSummary.js']});
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
var proxy_detail = new Ext.data.HttpProxy({
	api: {
		    read : 'companylevel/approvallevel!getDetailsByApprovalId.action'
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
	    	{name: 'fileId',mapping:'fileId'},
	        {name: 'createDate',mapping:"createDate",type:'date',dateFormat:'time'},
	    	{name: 'levelItems',mapping:'levelItems'}
	    	
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
	{header:'企业等级',dataIndex:'entLevel'},
	{header:'创建时间',dataIndex:'createDate',renderer:Ext.util.Format.dateRenderer('Y年m月d日 H时i分s秒'),sortable:true}
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
				iconCls:"company_record_add",
				scope: this,
				handler:this.onAdd
    	},
    	{
				text:"提交",
				iconCls:"company_record_update",
				scope: this,
				handler:this.onSubmit
		},
		{
				text:"修改",
				iconCls:"company_record_edit",
				scope: this,
				handler:this.onEdit
		},
		{
				text:"删除",
				iconCls:"company_record_delete",
				scope: this,
				handler:this.onDelete
		},			
		new Ext.Toolbar.Fill(),
		' '
//		'过滤: ', ' ', 					
//		new Ext.ux.form.SearchField({
//	                	store: this.store,
//	                	width:150
//	    })
		];
	  },
	  /**
	   *  查询插件载入
	   */
//	  plugins: [new Ext.ux.grid.Search({
//
//          		iconCls: false
//
//              , showSelectAll: false
//
//              , dateFormat: 'm/d/Y'
//
//              , position: 'top'
//
//              , searchText: '搜索'
//
//              , disableIndexes: ['id','createDate']//不参与查询的列名
//      })],
	
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
				   store_main_level.reload();
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
				        	Ext.getCmp('com.cce.companylevel.CompanyLevelInputMaster').store.remove(rows[i]);
				        }
				        Ext.getCmp('com.cce.companylevel.CompanyLevelInputMaster').store.save();
					}
		      });
	  }
});


//------------------------------------------------------------------------------
//Module的RecordExpertMore内容Panel定义..
//------------------------------------------------------------------------------
com.cce.companylevel.CompanyLevelInputDetail=Ext.extend(Ext.grid.GridPanel ,{
	  id:'CompanyLevelInputDetail',
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
		    com.cce.companylevel.CompanyLevelInputDetail.superclass.initComponent.call(this);
		    
		}
		
});

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
        {name: 'remark', type: 'string'}
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
					        {
	            				scope: this,
	                            xtype:          'combo',
	                            mode:           'local',
	                            value:          '请选择级别',
	                            triggerAction:  'all',
	                            forceSelection: true,
	                            editable:       false,
	                            fieldLabel:     '企业级别',
	                            name:           'title',
	                            hiddenName:     'title',
	                            id: 'title-level',
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
	                            }),
	                            listeners:{select:{fn:function(combo, value) {
					        		Ext.getCmp('GroupGrid').store.load({
					        			params : { 
						       			 	data:combo.getValue()
						       			}
					        		}); 
			                    }}}
	                        }
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
	                              	if(v==''||v=='false') return '';
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
					      			anchor: '100%',		      		 
					      			allowBank : false
		                       }
			      		]
					}
	            ];
	},  
	
	buildUI : function(){
	    return [{
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
		
		var thestore=Ext.getCmp('com.cce.companylevel.CompanyLevelInputMaster').store;
		thestore.insert(0,new thestore.recordType({
			'fileId':o.result.message,
			'entLevel':Ext.getCmp('title-level').getValue(),
			'levelItems':Ext.encode(rowsData)
		}));
		thestore.save();
		//store_main_level.reload();				
		 
		this.fireEvent('afterSave', this, null);
		 
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
	                              	if(v==''||v=='false') return '';
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
	
	buildUI : function(){
	    return [{
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
	},
	onUploadOk:function (f,o){
		var thestore=Ext.getCmp('om.cce.companylevel.CompanyLevelInputMaster').store;
		thestore.insert(0,new thestore.recordType({
			'fileid':o.result.message
			 			 
			
		}));
		thestore.save();
		//store_main_level.reload();
		var theStore1=Ext.getCmp('EditGroupGrid').store;
		theStore1.save();
		this.fireEvent('afterSave', this, null);
		 
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

});


var store_main_level = new Ext.data.Store({
    id: 'id',
    message: 'message',
    proxy: proxy,
    reader: reader,
    writer: writer,  // <-- plug a DataWriter into the store just as you would a Reader
    autoSave: false
});
var store_detail_level=new Ext.data.Store({
	id:'detail_store',
	name:'detail_store',
	proxy:proxy_detail,
	reader:reader_detail, 
	autoSave: false
});

//------------------------------------------------------------------------------
//Module的定义放在最后,eval(xxx.js)后返回Module的类定义..
//------------------------------------------------------------------------------
Ext.extend(com.cce.Module, {
	win: null,
	init: function(){
		
		
		this.master = new com.cce.companylevel.CompanyLevelInputMaster({ store : store_main_level });
 		this.detail= new com.cce.companylevel.CompanyLevelInputDetail({store:store_detail_level});
		this.frame= new com.cce.companylevel.CompanyLevelInput();		
		
		
		//关联自定义事件
	    //this.relayEvents(this.store, ['destroy', 'save', 'update']);
		
		
		
		this.master.on('doAddNew', this.AddNewForm, this);
		this.master.on('doEdit', this.EditForm, this);
		
		this.master.on('rowclick', function(g, index, ev){
			this.record =g.store.getAt(index);
			
			store_detail_level.load({
				params:{data:this.record.get('id')}
			});
			
		}, this);
		this.frame.add(this.master);
		this.frame.add(this.detail);
	  	this.main.add(this.frame);
	  	this.main.doLayout();
	  	store_main_level.load({params:{start:0,limit:20}}); 
	  	
	  	store_main_level.on('save',this.reload,this);
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
	},
	reload:function(){
		store_main_level.reload();
	}
});
