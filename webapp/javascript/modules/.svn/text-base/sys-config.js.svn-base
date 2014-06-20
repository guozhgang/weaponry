Ext.ns("com.cce.sysconfig");

// ------------------------------------------------------------------------------
// Module的proxy定义..
// ------------------------------------------------------------------------------
var proxy = new Ext.data.HttpProxy( {
	api : {
		read : 'config/sys-config!search.action',
		create : 'config/sys-config!save.action',
		update : 'config/sys-config!save.action',
		destroy : 'config/sys-config!delete.action'
	}
});

// ------------------------------------------------------------------------------
// Module的reader定义..
// ------------------------------------------------------------------------------
var reader = new Ext.data.JsonReader( {
	root : 'data'
}, [ {
	name : 'id',
	mapping : "id"
}, {
	name : 'conf_code',
	mapping : "confCode"
}, {
	name : 'conf_value',
	mapping : "confValue"
}, {
	name : 'conf_name',
	mapping : "confName"
}, {
	name : 'conf_desc',
	mapping : "confDesc"
}, {
	name : 'module_name',
	mapping : "moduleName"
} ]);

// ------------------------------------------------------------------------------
// Module的writer定义..
// ------------------------------------------------------------------------------
var writer = new Ext.data.JsonWriter( {
	encode : true,
	writeAllFields : true
// 必须回传所有字段
		});

// ------------------------------------------------------------------------------
// Module的columns定义..
// ------------------------------------------------------------------------------
var columns = [ new Ext.grid.CheckboxSelectionModel(), {
	header : '编号',
	dataIndex : 'id',
	sortable : true
}, {
	header : '配置代码',
	dataIndex : 'conf_code'
}, {
	header : '配置值',
	dataIndex : 'conf_value'
}, {
	header : '配置名称',
	dataIndex : 'conf_name'
}, {
	header : '配置描述',
	dataIndex : 'conf_desc'
}, {
	header : '所属模块',
	dataIndex : 'module_name'
} ];

// ------------------------------------------------------------------------------
// Module的Category定义..
// ------------------------------------------------------------------------------
com.cce.sysconfig.SysConfigGrid = Ext.extend(Ext.grid.GridPanel, {
	id : 'com.cce.sysconfig.SysConfigGrid',
	stripeRows : true,
	loadMask : true,
	border : false,
	enableHdMenu : false,
	header : false,
	region : 'center',
	closable : true,
	columns : columns,
	sm : new Ext.grid.CheckboxSelectionModel(),

	initComponent : function() {
		// typical viewConfig
		this.viewConfig = {
			forceFit : true
		};

		// build toolbars and buttons.
		this.tbar = this.buildTopToolbar();
		this.bbar = this.buildBottomToolbar();

		// super
		com.cce.sysconfig.SysConfigGrid.superclass.initComponent.call(this);

		this.addEvents('doedit');
	},

	/**
	 * buildTopToolbar
	 */
	buildTopToolbar : function() {
		return [
//		{
//			text : "添加系统配置",
//			iconCls : "add_new_class",
//			scope : this,
//			handler : this.onAdd
//		}, 
		{
			text : "修改系统配置",
			iconCls : "edit_new_class",
			scope : this,
			handler : this.onEdit
		},
//		{
//			text : "删除系统配置",
//			iconCls : "delete_new_class",
//			scope : this,
//			handler : this.onDelete
//		},
		{
			text : "条件查询",
			iconCls : "selectby",
			scope : this,
			handler : this.onSearch
		} ];
	},

	/**
	 * buildBottomToolbar
	 */
	buildBottomToolbar : function() {
		return new Ext.PagingToolbar( {
			pageSize : 20,
			store : this.store,
			displayInfo : true
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
	onEdit : function() {
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
		var rows = this.getSelectionModel().getSelections();
		Ext.Msg.confirm('确认删除', '你确定删除该条记录?', function(btn) {
			if (btn == 'yes') {
				for ( var i = 0; i < rows.length; i++) {
					Ext.getCmp('com.cce.sysconfig.SysConfigGrid').store
							.remove(rows[i]);
				}
				Ext.getCmp('com.cce.sysconfig.SysConfigGrid').store.save();
			}
		});
	},
	/**
	 * onSearch
	 */
	onSearch : function() {
		var fnSearch = function(btn,text){
			if('ok'==btn){
				searchParams=Ext.encode({
					'moduleName':text.trim()
				});	
				Ext.getCmp('com.cce.sysconfig.SysConfigGrid').store.load({
					   scope: this,
					   params:{start:0,limit:20}	  						    
				    }); 
			}
			msgBox.hide();
		};
		var msgBox = Ext.Msg.prompt("系统配置查询","请输入配置模块名称：(不输入则查询全部)",fnSearch);
	}
});

// ------------------------------------------------------------------------------
// Module的SysConfigForm定义..
// ------------------------------------------------------------------------------
var moduleStore = new Ext.data.Store( {
	url : "config/sys-module!simpleModules.action",
	reader : new Ext.data.JsonReader( {
		root : 'data',
		fields : [ 'id', 'name' ]
	})

});

com.cce.sysconfig.SysConfigForm = Ext.extend(Ext.form.FormPanel, {
	title : '系统配置信息',
	modal : true,
	iconCls : 'silk-user',
	labelAlign : 'right',
	labelWidth : 80,
	width : 480,
	height : 400,
	header : false,
	frame : true,
	region : 'center',
	defaultType : 'textfield',
	defaults : {
		anchor : '100%'
	},

	// private A pointer to the currently loaded record
	record : null,

	initComponent : function() {
		// build the form-fields. Always a good idea to defer form-building to a
	// method so that this class can
	// be over-ridden to provide different form-fields
	this.items = this.buildForm();

	// build form-buttons
	this.buttons = this.buildUI();

	// add a create event for convenience in our application-code.
	this.addEvents( {
		/**
		 * @event create Fires when user clicks [create] button
		 * @param {FormPanel}
		 *            this
		 * @param {Record}
		 *            values, the Form's record object
		 */
		save : true
	});

	// super
	com.cce.sysconfig.SysConfigForm.superclass.initComponent.call(this);
},

/**
 * buildform
 * 
 * @private
 */
buildForm : function() {

	return [ {
		xtype : "combo",
		id : 'module_name',
		name : 'module_name',
		fieldLabel : "所属模块",
		triggerAction : 'all',
		editable : false,
		colspan : 3,
		store : moduleStore,
		displayField : 'name', // 显示的字段
		valueField : 'name', // 数据字段
		allowBlank : false, // 必须选择
		blankText : '请选择..'
	}, {
		fieldLabel : '系统配置代码',
		name : 'conf_code',
		allowBlank : false
	}, {
		fieldLabel : '系统配置值',
		name : 'conf_value',
		allowBlank : false
	}, {
		fieldLabel : '系统配置名称',
		name : 'conf_name',
		allowBlank : false
	}, {
		fieldLabel : '系统配置描述',
		name : 'conf_desc',
		allowBlank : false
	} ];
},

buildUI : function() {
	return [ {
		text : "保存",
		scope : this,
		handler : this.onSave
	}, {
		text : '重置',
		handler : function(btn, ev) {
			this.getForm().reset();
		},
		scope : this
	} ];
},

/**
 * loadRecord
 * 
 * @param {Record}
 *            rec
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
	this.fireEvent('save', this, this.record);
}

});

// ------------------------------------------------------------------------------
// Module的定义放在最后,eval(xxx.js)后返回Module的类定义..
// ------------------------------------------------------------------------------
Ext.extend(com.cce.Module, {
	win : null,
	init : function() {
		this.store = new Ext.data.Store( {
			id : 'id',
			message : 'message',
			proxy : proxy,
			reader : reader,
			writer : writer, // <-- plug a DataWriter into the store just as
			// you would a Reader
			autoSave : false
		});
		this.store.on("beforeload", function(thiz, options) {
	 		thiz.baseParams["data"] = searchParams;
		});
		this.grid = new com.cce.sysconfig.SysConfigGrid( {
			store : this.store
		});

		// 关联自定义事件
	// this.relayEvents(this.store, ['destroy', 'save', 'update']);

	this.grid.on('doedit', this.showForm, this);
	this.grid.on('rowclick', function(g, index, ev) {
		this.record = g.store.getAt(index);
	}, this);

	this.main.add(this.grid);
	this.main.doLayout();
	this.store.load( {
		params : {
			start : 0,
			limit : 20
		}
	});
},

showForm : function(g, store, record) {
	if (!record) {
		record = new store.recordType();
	}
	var form = new com.cce.sysconfig.SysConfigForm();
	this.win = new Ext.Window( {
		title : '系统配置信息',
		closable : true,
		width : 450,
		height : 205,
		constrain : true,
		// border:false,
		plain : true,
		layout : 'border',
		modal : true,
		items : [ form ]
	});

	form.on('save', this.onSave, this);

	form.loadRecord(record);

	this.win.show();
},

onSave : function(fp, record) {
	fp.getForm().updateRecord(record);
	if (record.data.id == null) {
		this.store.add(record);
	}
	this.store.save();
	this.win.close();
	this.store.reload();
}
});
var moduleName = "";
var searchParams=Ext.encode({
	'moduleName':''
});
