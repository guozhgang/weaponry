Ext.ns('com.cce');

/**
 * 检验人员 ---------------------------------------------
 */
var Inspectors_Store=new Ext.data.Store({
	url:"record/technician!getInspectors.action",
	reader: new Ext.data.JsonReader({ 
		root:'data',
		fields:['id','name']
	}),
	autoLoad:true
});

com.cce.Inspectors_Combo = Ext.extend(Ext.form.ComboBox, {
	
	id:'Inspectors_Combo_butch',
	fieldLabel:"检验人员",
	hiddenName:'qcSign',
	triggerAction:'all',
	editable:false,
	store:Inspectors_Store,
	displayField:'name',
	valueField:'name', 
	anchor : '100%',
	
	initComponent:function() {
			
	
	
		com.cce.Inspectors_Combo.superclass.initComponent.apply(this, arguments);
	}
	
});
/**
 * 检验人员 END=====================================================
 */



/**
 * 无害化处理人员 combox -Start
 */
var Handlers_Store=new Ext.data.Store({
	url:"record/technician!getHandlers.action",
	reader: new Ext.data.JsonReader({ 
		root:'data',
		fields:['id','name']
	}),
	autoLoad:true
});
com.cce.Handlers_Combo = Ext.extend(Ext.form.ComboBox, {
	
	id:'Handlers_Combo_butch',
	fieldLabel:"无害化处理人员",
	hiddenName:'pcSign',
	triggerAction:'all',
	editable:false,
	store:Handlers_Store,
	displayField:'name',
	valueField:'name', 
	anchor : '100%',
	
	initComponent:function() {
			
	
	
		com.cce.Handlers_Combo.superclass.initComponent.apply(this, arguments);
	}
	
});
/**
	无害化处理人员 EDN============================================
**/
var h_type_store = new Ext.data.SimpleStore({
    fields: ['id', 'code', 'value'],
    data : DICT_APPROACH
});

com.cce.h_type_combo = Ext.extend(Ext.form.ComboBox, {
	 store: h_type_store,
	 id:"Approach_butch",
	 hiddenName:'Approach',
	 fieldLabel:'处理方式',
	 displayField:'value',
	 triggerAction:'all',
	 valueField:'id',	
	 allowBlank:false, 
	 editable:false,
	 scope: this,
	 mode: 'local',
	 anchor: '100%',
	initComponent:function() {

		com.cce.h_type_combo.superclass.initComponent.apply(this, arguments);
	}
	
});

/**
 * 企业分级combo
 */
var compay_level_Store = new Ext.data.SimpleStore({
    fields: ['id', 'code', 'value'],
    data : DICT_COMPANY_LEVEL
});

com.cce.compay_level_combo = Ext.extend(Ext.form.ComboBox, {
	
	 store: compay_level_Store,
	 id:"compay_level_combo",
	 name:"title",
	 fieldLabel:'请选择级别',
	 displayField:'value',
	 triggerAction:'all',
	 valueField:'code',
	 mode: 'local',
	 anchor: '100%',
	 emptyText:'请选择级别',
	 allowBlank:false,
	 editable : false,
	 scope: this,
	 
	initComponent:function() {

		com.cce.compay_level_combo.superclass.initComponent.apply(this, arguments);
	}
	
});

/**
 * _______________________________________________
 */


/**
 * 企业信用档案
 */
var compay_credit_Store = new Ext.data.SimpleStore({
    fields: ['id', 'code', 'value'],
    data : DICT_COMPANY_CREDIT
});

com.cce.compay_credit_combo = Ext.extend(Ext.form.ComboBox, {
	
	 store: compay_credit_Store,
	 id:"compay_credit_combo",
	 name:"entCredit",
	 fieldLabel:'请选择级别',
	 displayField:'value',
	 triggerAction:'all',
	 valueField:'code',
	 mode: 'local',
	 anchor: '100%',
	 emptyText:'请选择级别',
	 allowBlank:false,
	 editable : false,
	 scope: this,
	 
	initComponent:function() {

		com.cce.compay_credit_combo.superclass.initComponent.apply(this, arguments);
	}
	
});

/**
 * ------------------------------------------------------
 */
 