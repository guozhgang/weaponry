ScriptMgr.load({ scripts: [
        'javascript/utils/MultiSelect.js',
        'javascript/utils/ItemSelector.js'
]});

Ext.ns("com.cce.authority");
//------------------------------------------------------------------------------
//Module的proxy定义..
//------------------------------------------------------------------------------
var proxy = new Ext.data.HttpProxy({
  api: {
	    read : 'security/authority!list.action',
	    create : 'security/authority!save.action',
	    update: 'security/authority!save.action',
	    destroy: 'security/authority!delete.action'
	}
});

//------------------------------------------------------------------------------
//Module的reader定义..
//------------------------------------------------------------------------------
var reader = new Ext.data.JsonReader(
      {root:'data'},
      [ 
          	{name: 'id',mapping:"id"},
          	{name: 'display_name',mapping:"displayName"},
          	{name: 'auth_name',mapping:"name"},
          	{name: 'resourceNames',mapping:"resourceNames"},
          	{name: 'resources', mapping:'resources'}
      ]
);

//------------------------------------------------------------------------------
//Module的writer定义..
//------------------------------------------------------------------------------
var writer = new Ext.data.JsonWriter({
  encode: true,
  writeAllFields: false //必须回传所有字段
});

//------------------------------------------------------------------------------
//Module的columns定义..
//------------------------------------------------------------------------------
var columns = [
     new Ext.grid.CheckboxSelectionModel(),
	{header:'编号', dataIndex:'id', sortable:true},
    {header:'权限名称', dataIndex:'display_name', sortable:true},
	{header:'权限代码',dataIndex:'auth_name'},
	{header:'可访问资源',dataIndex:'resourceNames'}
];

var store = new Ext.data.Store({
    id: 'id',
    message: 'message',
    proxy: proxy,
    reader: reader,
    writer: writer,  // <-- plug a DataWriter into the store just as you would a Reader
    autoSave: false
});

//------------------------------------------------------------------------------
//Module的AuthorityGrid定义..
//------------------------------------------------------------------------------
com.cce.authority.AuthorityGrid = Ext.extend(Ext.grid.GridPanel, {
  id:'com.cce.authority.AuthorityGrid',
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
	    com.cce.authority.AuthorityGrid.superclass.initComponent.call(this);
	    
	    this.addEvents(
	    	'doedit'
	    );
	},
	
	 /**
   * buildTopToolbar
   */
  buildTopToolbar : function() {
      return [{
				text:"添加权限",
				iconCls:"aut_add",
				scope: this,
				handler:this.onAdd
    	},
    	{
				text:"修改权限",
				iconCls:"aut_edit",
				scope: this,
				handler:this.onEdit
    	},
		{
				text:"删除权限",
				iconCls:"aut_delete",
				scope: this,
				handler:this.onDelete
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

  /**
   * onAdd
   */
  onAdd : function() {
      this.fireEvent('doedit', this, this.store, null);
  },
  
  /**
   * onEdit
   */
  onEdit : function(){
  	var record = this.getSelectionModel().getSelected();
      if (!record) {
          return false;
      }
      this.fireEvent('doedit', this, this.store, record);
  },
  
  /**
   * onDelete
   */
  onDelete : function(btn, ev) {
      var selected = this.getSelectionModel().getSelected();
      if (!selected) {
          return false;
      }
      Ext.Msg.confirm('确认删除', '你确定删除该条记录?', function(btn) {
			if (btn == 'yes') {
				Ext.getCmp('com.cce.authority.AuthorityGrid').store.remove(selected);
				Ext.getCmp('com.cce.authority.AuthorityGrid').store.save();
			}
      });
  }
});
//------------------------------------------------------------------------------
//Module的AuthorityForm定义..
//------------------------------------------------------------------------------
com.cce.authority.AuthorityForm = Ext.extend(Ext.form.FormPanel, {
	title: '权限信息',
	record : null,
	dsAvailable: null,
	dsObtained: null,
	modal:true,
	iconCls: 'silk-user',
	labelAlign: 'right',
	labelWidth: 60,
	header: false,
	frame: true,
	region:'center',
	defaultType:'textfield',
	defaults: {
	      anchor: '100%'
	   },
  
  initComponent : function() {
		// build the form-fields.  Always a good idea to defer form-building to a method so that this class can
	    // be over-ridden to provide different form-fields
	    this.items = this.buildForm();
	    // build form-buttons
	    this.buttons = this.buildUI();
	    // add a create event for convenience in our application-code.
	    this.addEvents({ save : true,afterSave : true});
	    // super
	    com.cce.authority.AuthorityForm.superclass.initComponent.call(this);
	},

  /**
   * buildform
   * @private
   */
  buildForm : function() {
  		var hiddenId = new Ext.form.Hidden({name:"id"});
      	return [
			{fieldLabel: '权限名称', name: 'display_name', allowBlank: false},
			{fieldLabel: '权限代码', name: 'auth_name', allowBlank: false},
			{
				xtype: 'itemselector',
				name: 'resources',
				fieldLabel: '资源定义',
				imagePath: 'js/ext/ux/images',
				multiselects: [{
					legend:"可用资源",
					store: this.dsAvailable,
					width: 200,
					height: 200,
					valueField: 'id',
					displayField: 'value'
				},{
					legend:"已有资源",
					store: this.dsObtained,
					width: 200,
					height: 200,
					valueField: 'id',
					displayField: 'value'
				}]
			}
		];
  },
	
  buildUI : function(){
      return [{
			text:"保存",
			scope: this,
			handler:this.onSave
	  	}, {
          text: '取消',
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
  	//Ext.Msg.alert('Submitted Values', this.getForm().getValues(true));

	  if (this.record == null) {
	      return;
	  }
	  if (!this.getForm().isValid()) {
	      App.setAlert(false, "表单数据有错误.");
	      return false;
	  }
      
	this.getForm().updateRecord(this.record);
	if(this.record.data.id == null){
		store.add(this.record);
	}
	store.save();
	this.fireEvent('save', this, this.record);
  }
});

//------------------------------------------------------------------------------
//Module的定义放在最后,eval(xxx.js)后返回Module的类定义..
//------------------------------------------------------------------------------
Ext.extend(com.cce.Module, {
	win: null,
	init: function(){
		this.grid = new com.cce.authority.AuthorityGrid({ store : store });
		
		//关联自定义事件
	    //this.relayEvents(this.store, ['destroy', 'save', 'update']);
		
		this.grid.on('doedit', this.showForm, this);
		this.grid.on('rowclick', function(g, index, ev){
			this.record =g.store.getAt(index);
		}, this);
		
	  	this.main.add(this.grid);
	  	this.main.doLayout();
	  	store.load({params:{start:0,limit:20}}); 
	},
	
	showForm : function(g, store, record){
		if(!record){
	        record = new store.recordType({
	        	id:null,
	        	name:''
	        });
		}

		//同步调用取得json数据
  		Ext.Ajax.request({
    			async:false,
    			url : 'security/authority!resourceStore.action',
    			scope:this,
    			params : { auth_id : record.id?record.id: null },
    			success: function(response, opts) {
    				var json = Ext.util.JSON.decode(response.responseText);
			  		this.dsAvailable = new Ext.data.ArrayStore({ data: json.available, fields: ['id', 'value'] });
			  		this.dsObtained = new Ext.data.ArrayStore({ data: json.obtained, fields: ['id', 'value'] });
    			},
    			failure : function(response, opts) {
    				App.setAlert(false, "服务器通信错误,请重试.");
    				return false;
    			}
    		});
		
		var form = new com.cce.authority.AuthorityForm({
			record:record,
			dsAvailable: this.dsAvailable,
			dsObtained: this.dsObtained
		});
		form.on('save', this.onSave, this);
		form.loadRecord(record);		
		
		this.win = new Ext.Window({
		    title: '权限信息',
		    closable:true,
		    width:520,
		    height:360,
		    constrain:true,
		    plain:true,
		    layout: 'border',
		    modal:true,
		    items: [form]
		});
		form.on('afterSave', this.afterSave, this);
		this.win.show();
	},
	
	onSave : function(fp, record){
	    this.win.close();
	    //this.store.reload();
	},
	afterSave : function(fp, record){
	    this.win.close();
	}
});
