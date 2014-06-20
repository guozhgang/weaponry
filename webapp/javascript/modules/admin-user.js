Ext.ns("com.cce.user");
ScriptMgr.load( {
	scripts : [ 'javascript/utils/FormTableLayout.js' ]
});

//ScriptMgr.load({ scripts: [
//        'javascript/components/security/UserGrid.ui.js',
//        'javascript/components/security/UserGrid.js',
//        'javascript/components/security/UserListStore.js'
//]});

//------------------------------------------------------------------------------
//Module的proxy定义..
//------------------------------------------------------------------------------
/**
 * create : 'security/user!save.action',
 * 后台必须返回保存后的带有id字段的Record,这样做的两个好处:
 * 1.创建或保存后,不必再调用store.reload()方法刷新数据,后台和页面已经保持同步了.
 * 2.只有这样,才能使Ext.data.DataProxy.addListener('write',function(){...})捕获到write事件,弹出提示窗口.
 */
var userListProxy = new Ext.data.HttpProxy( {
	api : {
		read : 'security/user!list.action',
		create : 'security/user!save.action',//后台必须返回保存后的Record,并带有id字段.
		update : 'security/user!save.action',
		destroy : 'security/user!delete.action'
	}
});

//------------------------------------------------------------------------------
//Module的reader定义..
//------------------------------------------------------------------------------
var userListReader = new Ext.data.JsonReader( {
	root : 'data',
	idProperty : 'id',
	totalProperty : 'total',
	successProperty : 'success',
	messageProperty : 'message' //必须定义messageProperty,才能使event handler拿到message消息
}, [ {
	name : 'id',
	mapping : "id"
}, {
	name : 'login_name',
	mapping : "loginName"
}, {
	name : 'name',
	mapping : "name"
}, {
	name : 'password',
	mapping : "password"
}, {
	name : 'email',
	mapping : "email"
}, {
	name : 'area',
	mapping : "regionName"
}, {
	name : 'role_name',
	mapping : "roleNames"
}, {
	name : 'role_id',
	mapping : "role"
}, {
	name : 'region_id',
	mapping : "region"
},
//详细信息
		{
			name : 'address',
			mapping : 'address'
		}, {
			name : 'mobilephone',
			mapping : 'mobilePhone'
		}, {
			name : 'telphone',
			mapping : 'telPhone'
		}, {
			name : 'companyName',
			mapping : 'companyName'
		}, {
			name : 'age',
			mapping : 'age',
			type : 'int'
		}, {
			name : 'sex',
			mapping : 'sex'
		}

]);

//------------------------------------------------------------------------------
//Module的writer定义..
//------------------------------------------------------------------------------
var writer = new Ext.data.JsonWriter( {
	encode : true,
	writeAllFields : false
//必须回传所有字段?
		});

//------------------------------------------------------------------------------
//Module的columns定义..
//------------------------------------------------------------------------------
var columns = [ new Ext.grid.CheckboxSelectionModel(), {
	header : '编号',
	dataIndex : 'id',
	sortable : true
}, {
	header : '登录名',
	dataIndex : 'login_name',
	sortable : true
}, {
	header : '姓名',
	dataIndex : 'name',
	sortable : true
}, {
	header : '角色',
	dataIndex : 'role_name',
	sortable : true
}, {
	header : '电子邮箱',
	dataIndex : 'email',
	sortable : true
}, {
	header : '所属区域',
	dataIndex : 'area',
	sortable : true
} ];

var store = new Ext.data.Store( {
	id : 'user',
	proxy : userListProxy,
	reader : userListReader,
	writer : writer, // <-- plug a DataWriter into the store just as you would a Reader
	autoSave : false
});

//------------------------------------------------------------------------------
//form-roleCombox的store定义
//------------------------------------------------------------------------------
var roleStore = new Ext.data.Store( {
	url : "security/role!listBox.action",
	reader : new Ext.data.JsonReader( {
		totalProperty : "total",
		root : 'data',
		fields : [ 'roleid', 'rolename' ]
	})
});

//------------------------------------------------------------------------------
//Module的user主Panel定义..
//------------------------------------------------------------------------------

com.cce.user.UserMain = Ext.extend(Ext.Panel, {
	id : 'user-main',
	loadMask : true,
	border : false,
	enableHdMenu : false,
	header : false,
	region : 'center',
	closable : true,
	layout : "border",
	frame : true
});

//------------------------------------------------------------------------------
//Module的UserGrid定义..
//------------------------------------------------------------------------------
com.cce.user.UserGrid = Ext.extend(Ext.grid.GridPanel, {
	id : 'com.cce.user.UserGrid',
	stripeRows : true,
	loadMask : true,
	border : false,
	enableHdMenu : false,
	header : false,
	region : 'center',
	closable : true,
	columns : columns,
	frame : true,
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
	com.cce.user.UserGrid.superclass.initComponent.call(this);

	this.addEvents('doedit', 'doSelect', 'doSelectAll');

	roleStore.load();
},

onRender : function() {
	// call parent
	com.cce.user.UserGrid.superclass.onRender.apply(this, arguments);
	// load store
	this.store.load( {
		params : {
			start : 0,
			limit : 20
		}
	});
}, // eo function onRender

	/**
	 * buildTopToolbar
	 */
	buildTopToolbar : function() {
		return [ {
			text : "添加用户",
			iconCls : "user_add",
			scope : this,
			handler : this.onAdd
		}, {
			text : "修改用户",
			iconCls : "user_edit",
			scope : this,
			handler : this.onEdit
		}, {
			text : "删除用户",
			iconCls : "user_delete",
			scope : this,
			handler : this.onDelete
		}, {
			text : "查询全部",
			iconCls : "select",
			scope : this,
			handler : this.onSelectAll
		}, {
			text : "条件查询",
			iconCls : "selectby",
			scope : this,
			handler : this.onSelect
		}

		];
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
					Ext.getCmp('com.cce.user.UserGrid').store.remove(rows[i]);
				}
				Ext.getCmp('com.cce.user.UserGrid').store.save();
			}
		});
	},
	onSelect : function(btn, ev) {
		this.fireEvent('doSelect', this, this.store, null);
	},
	onSelectAll : function(btn, ev) {
		this.fireEvent('doSelectAll', this, this.store, null);
	}
});

//------------------------------------------------------------------------------
//Module的UserForm定义..
//------------------------------------------------------------------------------
com.cce.user.UserForm = Ext.extend(Ext.form.FormPanel, {
	title : '用户信息',
	modal : true,
	iconCls : 'silk-user',
	labelWidth : 60,
	width : 300,
	height : 300,
	header : false,
	frame : true,
	region : 'center',
	layout : 'tableform',
	layoutConfig : {
		columns : 2,
		columnWidths : [ 0.5, 0.5 ]
	},
	autoScroll : true,
	// private A pointer to the currently loaded record
	record : null,

	initComponent : function() {
		this.rolelistCombo = new Ext.form.ComboBox( {
			id : 'roleList',
			fieldLabel : "分组列表",
			hiddenName : 'role_id',
			triggerAction : 'all',
			editable : false,
			store : roleStore,
			displayField : 'rolename',
			valueField : 'roleid',
			allowBlank : false,
			anchor : '100%'
		});

		//地区树
		this.regionTree = new Ext.tree.TreePanel( {
			root : new Ext.tree.AsyncTreeNode(),
			loader : new Ext.tree.TreeLoader( {
				dataUrl : 'security/region!treelist.action'
			}),
			hiddenRegionId : new Ext.form.Hidden( {
				name : "region_id",
				allowBlank : false
			}),
			id : 'cce_regionTree',
			title : '所属地区: ',
			anchor : '100%',
			colspan : 2,
			autoScroll : true,
			height : 130,
			header : true,
			rootVisible : false,
			allowBlank : false,
			frame : true,
			scope : this,
			listeners : {
				"click" : function(node) {
					this.setTitle('所属地区: ' + node.text);
					this.hiddenRegionId.setValue(node.id);
				},
				"load" : function(node) {

				}
			}
		});

		// build the form-fields.  Always a good idea to defer form-building to a method so that this class can
		// be over-ridden to provide different form-fields
		this.items = this.buildForm();

		// build form-buttons
		this.buttons = this.buildUI();

		this.addEvents( {
			afterSave : true
		});

		// super
		com.cce.user.UserForm.superclass.initComponent.call(this);
	},

	/**
	 * buildform
	 * @private
	 */
	buildForm : function() {

		//隐藏字段,需要修改的user id
		var hiddenId = new Ext.form.Hidden( {
			name : "id",
			anchor : '100%'
		});

		return [ {
			xtype : 'textfield',
			fieldLabel : '登录名',
			name : 'login_name',
			allowBlank : false,
			anchor : '100%',
			id : '_userform_login_name'
		}, {
			xtype : 'textfield',
			fieldLabel : '姓名',
			name : 'name',
			anchor : '100%',
			allowBlank : false
		}, {
			xtype : 'combo',
			fieldLabel : '性别',
			mode : 'local',
			id : 'sex',
			anchor : '100%',
			name : 'sex',
			editable : false,
			store : new Ext.data.SimpleStore( {
				data : [ [ '男', 'm' ], [ '女', 'f' ] ],
				fields : [ 'text', 'value' ]
			}),
			displayField : 'text',
			valueField : 'value',
			triggerAction : 'all',
			emptyText : '请选择性别',
			allowBlank : false
		}, this.rolelistCombo, {
			xtype : 'numberfield',
			decimalPrecision : 1,
			fieldLabel : '年龄',
			width : 36,
			maxLength : 3,
			maxLengthText : '年龄不符合实际',
			minValue : 1,
			maxValue : 120,
			maxText : '最大允许年龄为120岁',
			id : 'age',
			name : 'age',
			allowBlank : true

		}, {
			xtype : 'textfield',
			fieldLabel : '电子邮件',
			name : 'email',
			id : 'email',
			allowBlank : false,
			anchor : '100%',
			vtype : 'email'
		}, {
			xtype : 'textfield',
			fieldLabel : '密码',
			name : 'password',
			allowBlank : false,
			id : 'pass',
			anchor : '100%',
			inputType : 'password'
		}, {
			xtype : 'textfield',
			fieldLabel : '重复密码',
			name : 'pass-cfrm',
			allowBlank : false,
			id : 'passcfrm',
			vtype : 'password',
			initialPassField : 'pass',
			anchor : '100%',
			inputType : 'password'
		}, {
			xtype : 'textfield',
			fieldLabel : '固定电话',
			name : 'telphone',
			id : 'telphone',
			anchor : '100%',
			maxLength : 20
		}, {
			xtype : 'textfield',
			fieldLabel : '手机号',
			name : 'mobilephone',
			id : 'mobilephone',
			anchor : '100%',
			maxLength : 11
		}, {
			xtype : 'textfield',
			colspan : 2,
			fieldLabel : '家庭住址',
			name : 'address',
			anchor : '100%',
			id : 'address'
		}, this.regionTree, this.regionTree.hiddenRegionId ];
	},

	buildUI : function() {
		return [ {
			text : "保存",
			scope : this,
			handler : this.onSave
		}, {
			text : '关闭',
			handler : function(btn, ev) {
				this.fireEvent('afterSave', this, this.record);
			},
			scope : this
		} ];
	},

	/**
	 * loadRecord
	 * @param {Record} rec
	 */
	loadRecord : function(rec) {
		this.record = rec;
		this.getForm().loadRecord(this.record);
		Ext.getCmp('passcfrm').setValue(Ext.getCmp('pass').getValue());
		if (this.record.get('id') != '') {
			Ext.getCmp('_userform_login_name').readOnly = true;
		} else {
			Ext.getCmp('_userform_login_name').readOnly = false;
		}

		this.regionTree.setTitle('所属地区: ' + this.record.get('area'))

		if (this.record.get('region_id') != '') {

		}
		var age = this.record.get('age');

		if (age == 0) {
			Ext.getCmp('age').setValue('');
		}
	},

	/**
	 * onUpdate
	 */
	onSave : function(btn, ev) {
		if (!this.getForm().isValid()) {
			App.setAlert(false, "表单数据有错误.");
			return false;
		}

		//        if(!this.regionTree.hiddenRegionId.getValue()){
		//        	App.setAlert(false, "表单数据有错误: 请选择所属区域!");
		//            return false;
		//        }

		var loginName = Ext.getCmp('_userform_login_name').getValue();
		var oldLoginName = null;
		if (this.record != null)
			var oldLoginName = this.record.data.login_name;

		//使用同步Ajax调用做登录名称检查
		if (loginName != oldLoginName) {
			Ext.Ajax.request( {
				async : false,
				url : 'security/user!checkLoginName.action',
				scope : this,
				params : {
					loginName : loginName,
					oldLoginName : oldLoginName
				},
				success : function(response, opts) {
					if (response.responseText == 'true') {
						this.doSaveUser();
					} else {
						Ext.getCmp('_userform_login_name').markInvalid(
								"登录名[" + loginName + "]已被占用,请更换!");
						App.setAlert(false, "表单数据有错误: 登录名[" + loginName
								+ "]已被占用,请更换!");
						return false;
					}
				},
				failure : function(response, opts) {
					App.setAlert(false, "服务器通信错误,请重试.");
					return false;
				}
			});
		} else {
			this.doSaveUser();
		}
	},

	doSaveUser : function() {
		if (!Ext.getCmp('cce_regionTree').hiddenRegionId.getValue()) {
			App.setAlert(false, "请选择所属地区");
			return false;
		}

		if (this.isMobilePhone(Ext.getCmp('mobilephone').getValue())
				&& this.isPhone(Ext.getCmp('telphone').getValue())
				&& this.isLoginName(Ext.getCmp('_userform_login_name')
						.getValue())) {
			var isRegion;
			Ext.Ajax.request( {
				async : false,
				url : 'security/user!checkRegion.action',
				scope : this,
				params : {
					regionId : Ext.getCmp('cce_regionTree').hiddenRegionId
							.getValue(),
					roleId : Ext.getCmp("roleList").getValue()
				},
				success : function(response, opts) {
					var data = Ext.util.JSON.decode(response.responseText);
					if (data.success == false) {
						App.setAlert(false, data.message);
					} else {
						isRegion = 'true';
					}
				},
				failure : function(response, opts) {
					App.setAlert(false, "服务器通信错误,请重试.");
					return false;
				}
			});

			if (isRegion == 'true') {
				//新建记录
				if (this.record == null) {
					//以getForm().getValues()作为参数,可以直接创建一个Record!
					this.record = new store.recordType(this.getForm()
							.getValues());
					store.add(this.record);
					store.save();
					var i = 0;
					store.on('save', function(store, batch, data) {
						i++;
						if (i == 1) {
							store.load( {
								params : {
									start : 0,
									limit : 20
								}
							});
							store.sort('id', 'DESC');
						}
					}, this);
				}
				//更新记录
				else {
					this.getForm().updateRecord(this.record);
					store.save();
					updateDetailInfo(this.record);
					var i = 0;
					store.on('save', function(store, batch, data) {
						i++;
						if (i == 1) {
							store.load( {
								params : {
									start : 0,
									limit : 20
								}
							});
							store.sort('id', 'DESC');
						}
					}, this);
				}

				this.fireEvent('afterSave', this, this.record);
			}

		}
	},
	isMobilePhone : function(s) {
		var regex = /^(13[0-9]|15[0|1|3|6|7|8|9]|18[8|9])\d{8}/;

		if (s == '') {
			return true;
		} else {

			if (!regex.exec(s)) {
				Ext.getCmp('mobilephone').markInvalid("手机号码不正确");
				return false;
			} else {
				return true;
			}
		}

	},
	isLoginName : function(s) {
		var patrn = /^[a-zA-Z][a-zA-Z0-9]+$/;
		if (s == '') {
			return true;
		} else {

			if (!patrn.exec(s)) {
				Ext.getCmp('_userform_login_name').markInvalid(
						"请输入以英文字母开头最少2位的登录名，可以有数字");
				return false;
			} else {
				return true;
			}
		}

	},
	isPhone : function(s) {
		var regex = /^(\d{3,4}-)?\d{7,8}/;
		if (s == '') {
			return true;
		} else {
			if (!regex.exec(s)) {
				Ext.getCmp('telphone').markInvalid("固定电话格式不正确应为0531-12345678");
				return false;
			} else {
				return true;
			}
		}

	},
	isEmail : function(s) {
		Ext.Ajax.request( {
			async : true,
			url : 'security/user!checkEmail.action',
			scope : this,
			params : {
				email : s
			},
			success : function(response, opts) {
				if (response.responseText == 'true') {
					return true;

				} else {
					Ext.getCmp('email').markInvalid("邮箱[" + s + "]已被占用,请更换!");
					return false;
				}
			},
			failure : function(response, opts) {
				App.setAlert(false, "服务器通信错误,请重试.");
				return false;
			}
		});
	}
});

com.cce.user.UserSearchForm = Ext.extend(Ext.form.FormPanel, {
	title : '用户查询',
	modal : true,
	iconCls : 'silk-user',
	labelWidth : 100,
	width : 500,
	height : 1729,
	header : false,
	frame : true,
	region : 'center',
	layout : 'tableform',
	layoutConfig : {
		columns : 2,
		columnWidths : [ 0.5, 0.5 ]
	},
	autoScroll : true,
	// private A pointer to the currently loaded record
	record : null,

	initComponent : function() {

		//地区树
	this.regionTree = new Ext.tree.TreePanel( {
		root : new Ext.tree.AsyncTreeNode(),
		loader : new Ext.tree.TreeLoader( {
			dataUrl : 'security/region!treelist.action'
		}),
		hiddenRegionId : new Ext.form.Hidden( {
			name : "regionId"
		}),
		id : 'cce_regionTree',
		title : '所属地区: ',
		anchor : '100%',
		autoScroll : true,
		height : 130,
		header : true,
		rootVisible : false,
		frame : true,
		colspan : 2,
		scope : this,
		listeners : {
			"click" : function(node) {
				region_name = node.text;
				this.setTitle('所属地区: ' + node.text);
				this.hiddenRegionId.setValue(node.id);
			},
			"load" : function(node) {
				if (node.id == this.hiddenRegionId.value)
					this.getSelectionModel().select(node);
			}
		}
	});

	this.rolelistCombo = new Ext.form.ComboBox( {
		id : 'roleList',
		fieldLabel : "角色",
		hiddenName : 'role_id',
		triggerAction : 'all',
		editable : false,
		store : roleStore,
		displayField : 'rolename',
		valueField : 'roleid',
		anchor : '100%',
		colspan : 2
	});

	// build the form-fields.  Always a good idea to defer form-building to a method so that this class can
	// be over-ridden to provide different form-fields
	this.items = this.buildForm();

	// build form-buttons
	this.buttons = this.buildUI();

	// add a create event for convenience in our application-code.
	this.addEvents( {
		/**
		 * @event create
		 * Fires when user clicks [create] button
		 * @param {FormPanel} this
		 * @param {Record} values, the Form's record object
		 */
		save : true
	}, 'doSearchForm');

	// super
	com.cce.user.UserSearchForm.superclass.initComponent.call(this);
},

/**
 * buildform
 * @private
 */
buildForm : function() {

	return [ {
		xtype : 'textfield',
		fieldLabel : '登录名',
		anchor : '100%',
		colspan : 2,
		id : 'login_name',
		name : 'login_name'
	}, {
		xtype : 'textfield',
		fieldLabel : '用户名',
		anchor : '100%',
		colspan : 2,
		id : 'name',
		name : 'name'
	}, this.rolelistCombo, this.regionTree, this.regionTree.hiddenRegionId ]
},

buildUI : function() {
	return [ {
		text : "查询",
		scope : this,
		handler : this.search
	}, {
		text : '关闭',
		handler : function(btn, ev) {
			this.fireEvent('afterSearch', this, null);
		},
		scope : this
	} ];
},

/**
 * loadRecord
 * @param {Record} rec
 */
loadRecord : function(rec) {
	this.record = rec;
	this.getForm().loadRecord(this.record);
},
search : function() {
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

//------------------------------------------------------------------------------
//Module的user内容Panel定义..
//------------------------------------------------------------------------------

com.cce.user.UserInfoMore = Ext.extend(Ext.Panel, {
	id : 'preview-user-more',
	region : 'south',
	height : 260,
	title : '详细信息',
	split : true,
	autoScroll : true,
	frame : true,
	bodyStyle : 'padding: 10px; font-family: Arial; font-size: 12px;',
	initComponent : function(store) {

		com.cce.user.UserInfoMore.superclass.initComponent.call(this);

	}

});
updateDetailInfo = function(record) {
	var login_name = "&nbsp;";
	var name = "&nbsp;";
	var telphone = "&nbsp;";
	var mobilephone = "&nbsp;";
	var sex = "&nbsp;";
	var age = "&nbsp;";
	var address = "&nbsp;";
	var companyName = "&nbsp;";
	var role_name = "&nbsp;";
	var email = "&nbsp;";
	var area = "&nbsp;";

	if (record.get('login_name') != null && record.get('login_name') != "") {
		login_name = record.get('login_name');
	}

	if (record.get('name') != null && record.get('name') != "") {
		name = record.get('name');
	}

	if (record.get('telphone') != null && record.get('telphone') != "") {
		telphone = record.get('telphone');
	}

	if (record.get('mobilephone') != null && record.get('mobilephone') != "") {
		mobilephone = record.get('mobilephone');
	}

	if (record.get('sex') != null && record.get('sex') != "") {
		sex = record.get('sex');
		if (sex == 'm')
			sex = '男';
		else
			sex = '女';
	}

	if (record.get('age') != null && record.get('age') != "") {
		age = record.get('age');
	}

	if (record.get('address') != null && record.get('address') != "") {
		address = record.get('address');
	}

	if (record.get('companyName') != null && record.get('companyName') != "") {
		companyName = record.get('companyName');
	}

	if (record.get('role_name') != null && record.get('role_name') != "") {
		role_name = record.get('role_name');
	}

	if (record.get('email') != null && record.get('email') != "") {
		email = record.get('email');
	}

	if (record.get('area') != null && record.get('area') != "") {
		area = record.get('area');
	}
	var UserInfoMoreHtml = '<table width="519" border="0" cellpadding="1" cellspacing="1"   class="datalist" >'
			+ '<tr>'
			+ '<td width="100" height="30" align="center"    >登录名:</td>'
			+ '<td >'
			+ login_name
			+ '</td>'
			+ '</tr>'
			+ '<tr>'
			+ '<td height="30" align="center">姓名:</td>'
			+ '<td>'
			+ name
			+ '</td>'
			+ '</tr>'
			+ '<tr>'
			+ '<td height="30" align="center">固定电话:</td>'
			+ '<td >'
			+ telphone
			+ '</td>'
			+ '</tr>'
			+ '<tr>'
			+ '<td height="30" align="center"     >手机号:</td>'
			+ '<td     >'
			+ mobilephone
			+ '</td>'
			+ '</tr>'
			+ '<tr>'
			+ '<td height="30" align="center"   >性别:</td>'
			+ '<td    >'
			+ sex
			+ '</td>'
			+ '</tr>'
			+ '<tr>'
			+ '<td height="30" align="center"   >年龄:</td>'
			+ '<td    >'
			+ age
			+ '</td>'
			+ '</tr>'
			+ '<tr>'
			+ '<td height="30" align="center"   >家庭住址:</td>'
			+ '<td >'
			+ address
			+ '</td>'
			+ '</tr>'
			+ '<tr>'
			+ '<td height="30" align="center"   >单位名称:</td>'
			+ '<td  >'
			+ companyName
			+ '</td>'
			+ '</tr>'
			+ '<tr>'
			+ '<td height="30" align="center"  >角色:</td>'
			+ '<td  >'
			+ role_name
			+ '</td>'
			+ '</tr>'
			+ '<tr>'
			+ '<td height="30" align="center"   >电子邮箱:</td>'
			+ '<td    >'
			+ email
			+ '</td>'
			+ '</tr>'
			+ '<tr>'
			+ '<td height="30" align="center"   >所属区域:</td>'
			+ '<td  >'
			+ area
			+ '</td>' + '</tr>' + '</table>';

	Ext.getCmp('preview-user-more').body.update(UserInfoMoreHtml);
}
//------------------------------------------------------------------------------
//	Module的定义放在最后,eval(xxx.js)后返回Module的类定义..
//------------------------------------------------------------------------------
Ext.extend(com.cce.Module, {
	win : null,
	init : function() {

		this.grid = new com.cce.user.UserGrid( {
			store : store
		});
		this.content = new com.cce.user.UserInfoMore( {
			store : this.store
		});
		this.mainPanel = new com.cce.user.UserMain();
		store.on("beforeload", function(thiz, options) {
			thiz.baseParams["data"] = searchParams;
		});

		//关联自定义事件
	//this.relayEvents(this.store, ['destroy', 'save', 'update']);

	this.grid.on('doedit', this.showForm, this);
	this.grid.on('doSelect', this.showSearchForm, this);
	this.grid.on('doSelectAll', this.onSelectAll, this);
	this.grid.on('rowclick', function(g, index, ev) {
		this.record = g.store.getAt(index);
		updateDetailInfo(this.record);

	}, this);

	this.mainPanel.add(this.grid);
	this.mainPanel.add(this.content);

	this.main.add(this.mainPanel);
	this.main.doLayout();

	//	  	    var userGrid = new UserGrid();
	//	  	    this.main.add(userGrid);
	//	  	    this.main.doLayout();
},

showForm : function(g, store, record) {
	var form = new com.cce.user.UserForm();

	this.win = new Ext.Window( {
		title : '用户信息',
		closable : true,
		width : 600,
		height : 400,
		constrain : true,
		modal : true,
		plain : true,
		layout : 'border',
		items : [ form ]
	});

	form.on('afterSave', this.afterSave, this);

	if (record) {
		form.loadRecord(record);
	} else {

		//form.getForm().reset();
}
this.win.show();
},
showSearchForm : function(g, store, record) {
if (!record) {
	record = new store.recordType();
}
var form = new com.cce.user.UserSearchForm();
form.on('afterSearch', this.afterSave, this);
form.on('afterSave', this.afterSave, this);
form.on('doSearchForm', this.onSelect, this);
this.win = new Ext.Window( {
	title : '用户查询',
	closable : true,
	width : 480,
	height : 340,
	constrain : true,
	modal : true,
	plain : true,
	layout : 'border',
	resizable : true,
	autoScroll : true,
	items : [ form ]
});

form.loadRecord(record);
form.get('login_name').setValue(login_name);
form.get('name').setValue(name);
form.get('cce_regionTree').hiddenRegionId.setValue(region_id);
form.get('roleList').setValue(role_id);
form.get('cce_regionTree').setTitle('所属地区: ' + region_name);
this.win.show();
},
onSelect : function(fp) {

login_name = fp.get('login_name').getValue();
name = fp.get('name').getValue();
region_id = fp.get('cce_regionTree').hiddenRegionId.getValue();
role_id = fp.get('roleList').getValue();
searchParams = Ext.encode( {
	'loginName' : login_name,
	'roleId' : role_id,
	'name' : name,
	'regionId' : region_id
}), store.load( {
	params : {
		start : 0,
		limit : 20
	}
})

this.win.close();

},
onSelectAll : function(fp) {
searchParams = Ext.encode( {
	'loginName' : '',
	'roleId' : '',
	'name' : '',
	'regionId' : ''
}), store.load( {
	params : {
		start : 0,
		limit : 20
	}
})
},
afterSave : function(fp, record) {

this.win.close();
}
});

var login_name = '';
var name = '';
var region_id = '';
var region_name = '';
var role_id = '';
var searchParams = Ext.encode( {
	'loginName' : '',
	'roleId' : '',
	'name' : '',
	'regionId' : ''
});