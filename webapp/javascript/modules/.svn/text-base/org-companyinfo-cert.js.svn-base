Ext.ns("com.cce.companyinfo");


//载入布局文件
ScriptMgr.load({ scripts: ['javascript/utils/FormTableLayout.js']});

//------------------------------------------------------------------------------
//Module的proxy定义..
//------------------------------------------------------------------------------
var proxy = new Ext.data.HttpProxy({
api: {
	    read : 'record/companyRecord!list.action',
	    create : 'record/companyRecord!save.action',
	    destroy: 'record/companyRecord!delete.action'
	}
});

//------------------------------------------------------------------------------
//Module的reader定义..
//------------------------------------------------------------------------------
var reader = new Ext.data.JsonReader(
	{root:'data'},
	[ 
	    	{name: 'id',mapping:"id"},
	    	{name: 'nameCN ',mapping:'nameCN'},
	    	{name: 'taxCert',mapping:'taxCert'},
	    	{name: 'name',mapping:'name'},
	    	{name: 'createDate',mapping:'createDate',renderer:Ext.util.Format.dateRenderer('Y年m月d日 H时i分s秒'), sortable:true},
	    	{name: 'description',mapping:'description'}
	    	 
	]
);

//------------------------------------------------------------------------------
//Module的writer定义..
//------------------------------------------------------------------------------
var writer = new Ext.data.JsonWriter({
	encode: true,
	writeAllFields: false
});

//------------------------------------------------------------------------------
//Module的columns定义..
//------------------------------------------------------------------------------
var columns = [
               new Ext.grid.CheckboxSelectionModel(), 
               {header:'企业名',dataIndex:'nameCN'},
               {header:'税务登记号',dataIndex:'taxCert'},
               {header:'证书',dataIndex:'name'},
               {header:'日期',dataIndex:'createDate'},
               {header:'备注',dataIndex:'description'}
           ];

//------------------------------------------------------------------------------
//Module的company主Panel定义..
//------------------------------------------------------------------------------

com.cce.companyinfo.OrgCompanyInfoCert=Ext.extend(Ext.Panel,{
	id:'companylevel-status-main',
	loadMask: true,
	border: false,
	enableHdMenu: false,
	header:false,
	region:'center',
	closable:true,
	layout:"border"
});


//------------------------------------------------------------------------------
//Module的CompanyRecordGrid定义..
//------------------------------------------------------------------------------

com.cce.companyinfo.OrgCompanyInfoCertMaster = Ext.extend(Ext.grid.GridPanel, {
	id:'com.cce.companyinfo.OrgCompanyInfoCertMaster',
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
		    com.cce.companyinfo.OrgCompanyInfoCertMaster.superclass.initComponent.call(this);
		    
		    this.addEvents(
		    	'doedit'
		    );
		},
		
		 /**
	   * buildTopToolbar
	   */
	  buildTopToolbar : function() {
	      return [{
					text:"颁发",
					iconCls:"company_record_add",
					scope: this,
					handler:this.onAdd
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
	  onEdit : function(){
		  var record = this.getSelectionModel().getSelected();
	      if (!record) {
	            return false;
	      }
	      this.fireEvent('doedit', this, this.store, record);
	  },
	  onUpdate:function() {
		  
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
				        	Ext.getCmp('com.cce.companyinfo.OrgCompanyInfoCertMaster').store.remove(rows[i]);
				        }
				        Ext.getCmp('com.cce.companyinfo.OrgCompanyInfoCertMaster').store.save();
					}
		      });
	  }
});

//------------------------------------------------------------------------------
//Module的RecordExpertMore内容Panel定义..
//------------------------------------------------------------------------------

com.cce.companyinfo.OrgCompanyInfoCertDetail=Ext.extend(Ext.Panel ,{
	 id:'OrgCompanyInfoCertDetail',
	 region:'south',
	 height:260,
	 title:'详细信息',
	 split:true,
	 bodyStyle: 'padding: 10px; font-family: Arial; font-size: 12px;',
	 
	initComponent: function(store){
	

		this.stroe = store;
		com.cce.companyinfo.OrgCompanyInfoCertDetail.superclass.initComponent.call(this);
		
		 
	}	  
	
});

//证书颁发

com.cce.companyinfo.OrgCompanyInfoCertForm = Ext.extend(Ext.form.FormPanel, {
	
	title: '颁发证书',
	modal:true,
	iconCls: 'silk-user', 
	labelWidth: 75,
	width: 450,
	height: 300,
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
    // private A pointer to the currently loaded record
	record : null,
  
	initComponent : function() {	 
		
		var data=[['1','企业证章'],['2','企业证书'],['3','企业技术人员证书']];
		
		var store = new Ext.data.SimpleStore({
            fields: ['type', 'typeChs'],
            data : data
        });
		
		this.combo = new Ext.form.ComboBox({
		        store: store,
		        name:"type",
		        fieldLabel:'证件类型',
		        displayField:'typeChs',
		        triggerAction:'all',
		        valueField:'type',
		        mode: 'local',
		        anchor: '100%',
		        emptyText:'请选择证件类型'
		        
		});

		// build the form-fields.  Always a good idea to defer form-building to a method so that this class can
	    // be over-ridden to provide different form-fields
	    this.items = this.buildForm();
	
	    // build form-buttons
	    this.buttons = this.buildUI();
	
 
	
	    // super
	    com.cce.companyinfo.CompanyInfoTaskNetBackForm.superclass.initComponent.call(this);
	
	},
	
	/**
	   * buildform
	   * @private
	   */
	buildForm : function() {
		
		return [
		        
				{
				    xtype: 'textfield',
				    fieldLabel: '企业名称',
				    anchor: '100%',
				    id:'nameCN',
				    name:'nameCN'
				},
				{
				    xtype: 'textfield',
				    fieldLabel: '税务登记证号',
				    anchor: '100%',
				    id:'taxCert',
				    name:'taxCert'
				},
				{
				    xtype: 'textfield',
				    fieldLabel: '证件名称',
				    anchor: '100%',
				    id:'name',
				    name:'name'
				},
				this.combo,
				{
					xtype : 'fileuploadfield',
        			id : 'file',
        			emptyText : '选择文件',
        			fieldLabel : '证件上传',
        			name : 'upload',
        			buttonText : '选择文件',
        			allowBank : false,
        			colspan:2
				},
				{
				    xtype: 'textfield',
				    fieldLabel: '备注',
				    anchor: '100%',
				    colspan:2,
				    id:'description',
				    name:'description'
				},
		
		
		
	   ]
	  
	},
	buildUI : function(){
	      return [{
				text:"确认",
				scope: this,
				handler:this.update
		  	}, {
	          text: '重置',
	          handler: function(btn, ev){
	              this.getForm().reset();
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
    update : function(btn, ev) {
	      if (this.record == null) {
	          return;
	      }
	      if (!this.getForm().isValid()) {
	          App.setAlert(false, "表单数据有错误.");
	          return false;
	      }
	      App.setAlert(false,"颁发证书");
	}
	
	
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
		this.master = new com.cce.companyinfo.OrgCompanyInfoCertMaster({ store : this.store });
		this.detail = new com.cce.companyinfo.OrgCompanyInfoCertDetail({ store : this.store });
		this.frame  = new com.cce.companyinfo.OrgCompanyInfoCert();		
		
		
		//关联自定义事件
	    //this.relayEvents(this.store, ['destroy', 'save', 'update']);
		
		this.master.on('doedit', this.showForm, this);
		
		this.frame.add(this.master);
		this.frame.add(this.detail);
		
  	this.main.add(this.frame);
  	this.main.doLayout();
  	this.store.load({params:{start:0,limit:20}}); 
	},

	showForm : function(g, store, record){
		
		if(!record){
	        record = new store.recordType();
		}
		var form = new com.cce.companyinfo.CompanyInfoTaskNetBackForm();
		this.win = new Ext.Window({
		    title: '颁发证书',
		    closable:true,
		    width:450,
		    height:300,
		    constrain:true,		   
		    plain:true,
		    layout: 'border',
		    resizable:false,
		    autoScroll: true,
		    modal:true,
		    items: [form]
		});	
		
		 
		
		form.loadRecord(record);		
		
		this.win.show();
		
	},

	showReForm : function(g, store, record){
		
		
	},
	
	onSave : function(fp, record){		

		
	}
	
});
