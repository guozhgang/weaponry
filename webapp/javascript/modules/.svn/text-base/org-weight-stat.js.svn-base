Ext.ns("com.cce.weight");
ScriptMgr.load( {
	scripts : [ 'javascript/utils/FormTableLayout.js' ]
});

// ------------------------------------------------------------------------------
// Module的proxy定义..
// ------------------------------------------------------------------------------
var proxy = new Ext.data.HttpProxy( {
	api : {
		read : 'trace/trace!stat.action'

	}
});

// ------------------------------------------------------------------------------
// Module的reader定义..
// ------------------------------------------------------------------------------
var reader = new Ext.data.JsonReader( {
	root : 'data'
}, [
// 企业备案统计的
{name:'id',mapping:'id'},
		{
			name : 'trace_city',
			mapping : 'city'
		}, // 所属区
		{
			name : 'trace_count',
			mapping : 'count'
		} // 总重量
		// {name: 'trace_num',mapping:'num'}, //生产批数
//		{
//			name : 'trace_price',
//			mapping : 'price'
//		}, // 均价
// {name: 'trace_safenum',mapping:'safenum'}, //正常数
		// {name: 'trace_dangesnum',mapping:'dangesnum'}, //风险数
		// {name: 'trace_destroynum',mapping:'destroynum'} //不正常数
		]);
// ------------------------------------------------------------------------------
// Module的writer定义..
// ------------------------------------------------------------------------------
var writer = new Ext.data.JsonWriter( {
	encode : true,
	writeAllFields : false
});

// ------------------------------------------------------------------------------
// Module的columns定义..
// ------------------------------------------------------------------------------
var columns = [

{
	header : '区域/企业',
	dataIndex : 'trace_city'
}, {
	header : '总重量',
	dataIndex : 'trace_count'
} 
// {header:'生产批数',dataIndex:'trace_num'},
//		{
//			header : '均价',
//			dataIndex : 'trace_price'
//		},
// {header:'正常数',dataIndex:'trace_safenum'},
// {header:'风险数',dataIndex:'trace_dangesnum'},
// {header:'不正常数',dataIndex:'trace_destroynum'}

];

// ------------------------------------------------------------------------------
// Module的company主Panel定义..
// ------------------------------------------------------------------------------

com.cce.weight.OrgTraceWeightStat = Ext.extend(Ext.Panel, {
	id : 'OrgTraceWeightStat',
	stripeRows : true,
	loadMask : true,
	border : false,
	enableHdMenu : false,
	header : false,
	region : 'center',
	closable : true,
	columns : columns,
	layout : "border",
	sm : new Ext.grid.CheckboxSelectionModel(),
	frame : true,
	initComponent : function() {
		// typical viewConfig
	this.viewConfig = {
		forceFit : true
	};

	// build toolbars and buttons.
	this.tbar = this.buildTopToolbar();

	// super
	com.cce.weight.OrgTraceWeightStat.superclass.initComponent.call(this);

	this.addEvents('doedit');
},

/**
 * buildTopToolbar
 */
buildTopToolbar : function() {
	return [ {
		text : "统计",
		iconCls : "stat",
		scope : this,
		handler : this.onReport
	} ];
},

/**
 * onAdd
 */
onReport : function() {
	this.fireEvent('doReport', this, this.store, null);
}
});
//
//var statCreditInfo = function() {
//	if (!this.getForm().isValid()) {
//		App.setAlert(false, "表单数据有错误.");
//		return false;
//	}
//	Ext.getCmp('OrgCompanyCreditStat').store.load( {
//		params : {
//			data : Ext.encode(this.getForm().getValues())
//		}
//	});
//	this.fireEvent('afterStat', this, null);
//}

com.cce.weight.OrgTraceWeightStatGrid = Ext.extend(Ext.grid.GridPanel, {
	// title:'执法人员表格',
	stripeRows : true,
	loadMask : true,
	border : false,
	enableHdMenu : false,
	header : true,
	region : 'center',
	closable : true,
	columns : columns,
	frame : true,
	initComponent : function() {

		this.viewConfig = {
			forceFit : true
		};

		// this.bbar = this.buildBottomToolbar();

	com.cce.weight.OrgTraceWeightStatGrid.superclass.initComponent
			.call(this);

}

/**
 * buildBottomToolbar
 */
// buildBottomToolbar : function() {
		// return new Ext.PagingToolbar({
		// pageSize: 20,
		// store: this.store,
		// displayInfo: true
		// });
		// }
		});
var category_store = new Ext.data.Store( {
	url : "trace/trace!listbox.action",
	reader : new Ext.data.JsonReader( {
		root : 'data',
		fields : ['typeId','typeName']
	})

});

com.cce.weight.OrgTraceWeightStatForm = Ext.extend(Ext.form.FormPanel, {
	title : '溯源统计',
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
		 category_store.load();
		// 地区树
	this.regionTree = new Ext.tree.TreePanel( {
		root : new Ext.tree.AsyncTreeNode(),
		loader : new Ext.tree.TreeLoader( {
			dataUrl : 'security/region!treelist.action'
		}),
		hiddenRegionId : new Ext.form.Hidden( {
			name : "regionIdd"
		}),
		id : 'cce_regionTree',
		title : '所属地区: ',
		anchor : '100%',
		colspan : 2,
		autoScroll : true,
		height : 130,
		header : true,
		rootVisible : false,
		frame : true,
		scope : this,
		listeners : {
			"click" : function(node) {
				this.setTitle('所属地区: ' + node.text);
				this.hiddenRegionId.setValue(node.id);
			},
			"load" : function(node) {
				if (node.id == this.hiddenRegionId.value)
					this.getSelectionModel().select(node);
			}
		}
	});
	// build the form-fields. Always a good idea to defer form-building to a
	// method so that this class can
	// be over-ridden to provide different form-fields
	this.items = this.buildForm();

	// build form-buttons
	this.buttons = this.buildUI();

	// add a create event for convenience in our application-code.
	this.addEvents('doStatForm');

	// super
	com.cce.weight.OrgTraceWeightStatForm.superclass.initComponent
			.call(this);

	Ext.apply(Ext.form.VTypes, {
		dateRange : function(val, field) {
			if (field.dateRange) {
				var beginId = field.dateRange.begin;
				this.beginField = Ext.getCmp(beginId);
				var endId = field.dateRange.end;
				this.endField = Ext.getCmp(endId);
				var beginDate = this.beginField.getValue();
				var endDate = this.endField.getValue();
			}
			if (endDate == '' || beginDate <= endDate) {
				return true;
			} else {
				return false;
			}
		},
		// 验证失败信息
		dateRangeText : '开始日期不能大于结束日期'
	});
},

/**
 * buildform
 * 
 * @private
 */
buildForm : function() {
	var date = new Date();
	return [ {
		xtype : "datefield",
		fieldLabel : '开始日期',
		id : 'begindate',
		name : 'begindate',
		format : 'm/d/Y',
		anchor : "100%",
		align : 'left',
		dateRange : {
			begin : 'begindate',
			end : 'enddate'
		},
		vtype : 'dateRange'
	}, {
		xtype : "datefield",
		fieldLabel : '结束日期',
		id : 'enddate',
		name : 'enddate',
		format : 'm/d/Y',
		anchor : "100%",
		align : 'left',
		dateRange : {
			begin : 'begindate',
			end : 'enddate'
		},
		vtype : 'dateRange'
	}, {
		xtype : 'combo',
		store : category_store,
		id : "category",
		name : "category",
		fieldLabel : '统计类别',
		displayField : 'typeName',
		triggerAction : 'all',
		valueField : 'typeId',
		mode : 'local',
		anchor : '60%',
		labelWidth : 100,
		colspan : 2,
		allowBlank : false,
		editable : false
	},  this.regionTree, this.regionTree.hiddenRegionId ]
},

buildUI : function() {
	return [ {
		text : "统计",
		scope : this,
		handler : this.onStat
	}, {
		text : '关闭',
		handler : function(btn, ev) {
			this.fireEvent('afterStat', this, null);
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
onStat : function(btn, ev) {
	if (!this.getForm().isValid()) {
		App.setAlert(false, "表单数据有错误.");
		return false;
	}
	this.fireEvent('doStatForm', this);

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
		this.frame = new com.cce.weight.OrgTraceWeightStat();

		// extra extra simple
		var panel1 = new Ext.Panel( {
			title : '溯源统计',
			layout : 'fit',
			region : 'south',
			url : 'js/ext/resources/charts.swf',
			split : true,
			height : 260,
			items : {
				xtype : 'linechart',
				store : this.store,
				xField : 'trace_city',
				yField : 'trace_count',
				xAxis : new Ext.chart.CategoryAxis( {
					title : '区域/企业'
				}),
				yAxis : new Ext.chart.NumericAxis( {
					title : '溯源数量'
				}),
				listeners : {
					itemclick : function(o) {

					}
				}
			}
		});
		this.frame.add(panel1);
		var Officer_panel = new com.cce.weight.OrgTraceWeightStatGrid( {
			store : this.store
		});

		this.frame.add(Officer_panel);

		this.frame.on('doReport', this.showStatForm, this);

		this.main.add(this.frame);
		this.main.doLayout();

	},

	showStatForm : function(g) {

		var form = new com.cce.weight.OrgTraceWeightStatForm();
		form.on('afterStat', this.afterStat, this);
		form.on('doStatForm', this.onSelect, this);
		this.win = new Ext.Window( {
			title : '溯源统计',
			closable : true,
			width : 480,
			height : 300,
			constrain : true,
			// border:false,
			plain : true,
			layout : 'border',
			resizable : true,
			modal : true,
			autoScroll : true,
			items : [ form ]
		});

		this.win.show();

	},

	onSelect : function(fp, record) {

		var data = new Array();
		var begindate = "";
		var enddate = "";

		if (fp.get('begindate').getValue() != null
				&& fp.get('begindate').getValue() != "") {
			begindate = fp.get('begindate').getValue().format('m/d/Y')
					.toString();
			data.push("begindate", begindate);
		}
		if (fp.get('enddate').getValue() != null
				&& fp.get('enddate').getValue() != "") {
			enddate = fp.get('enddate').getValue().format('m/d/Y').toString();
			data.push("enddate", enddate);
		}

		var region_id = fp.get('cce_regionTree').hiddenRegionId.getValue();

		if (region_id != "") {
			data.push('region_id', region_id);
		}
        var category=fp.get("category").getValue();
		// 统计
		this.store.load( {
			params : {
				data : Ext.encode( {
					'beginDate' : begindate,
					'endDate' : enddate,
					'regionIdd' : region_id,
					'traceType':category
				})
			},
			scope : this,
			callback : function(records, options, succees) {
				// extra extra simple
			var panel1 = new Ext.Panel( {
				title : '溯源统计',
				layout : 'fit',
				region : 'south',
				url : 'js/ext/resources/charts.swf',
				split : true,
				height : 260,
				items : {
					xtype : 'linechart',
					store : this.store,
					xField : 'trace_city',
					yField : 'trace_count',
					xAxis : new Ext.chart.CategoryAxis( {
						title : '区域/企业'
					}),
					yAxis : new Ext.chart.NumericAxis( {
						title : '溯源数量'
					}),
					listeners : {
						itemclick : function(o) {

						}
					}
				}
			});

			var Officer_panel = new com.cce.weight.OrgTraceWeightStatGrid( {
				store : this.store
			});

			this.frame.add(panel1);
			this.frame.add(Officer_panel);
			this.frame.doLayout();
		}
		});

		this.win.close();

	},
	afterStat : function(fp, record) {
		this.win.close();
	}
});
