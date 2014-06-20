Ext.ns("com.cce.members");
ScriptMgr.load({ scripts: ['javascript/utils/SearchField.js']});
ScriptMgr.load({ scripts: ['javascript/utils/FormTableLayout.js']});

//------------------------------------------------------------------------------
//Module的proxy定义..
//------------------------------------------------------------------------------
var proxy = new Ext.data.HttpProxy({
api: {
    read : 'info/checkMember!list.action',
    create : 'info/checkMember!save.action',
    update: 'info/checkMember!save.action',
    destroy: 'info/checkMember!delete.action'
}
});

//------------------------------------------------------------------------------
//Module的reader定义..
//------------------------------------------------------------------------------
var reader = new Ext.data.JsonReader(
	{root:'data'},
	[ 
	 	{name: 'id',mapping:"id"},
		{name: 'address',mapping:'address'},
		{name: 'certificate',mapping:'certificate'},
	    {name: 'createDate',mapping:"createDate",type:'date',dateFormat:'time'},
		{name: 'duty',mapping:'duty'},
		{name: 'mail',mapping:'mail'},
		{name: 'mobile',mapping:'mobile'},
		{name: 'name',mapping:'name'},
		{name: 'zipcode',mapping:'zipcode'},
		{name: 'resumeInfo',mapping:'resumeInfo'},
		{name: 'regionName',mapping:'regionName'}
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
    {header:'姓名',dataIndex:'name'},
    {header:'地址',dataIndex:'address'},
    {header:'联系电话',dataIndex:'mobile'},
    {header:'职务',dataIndex:'duty'},
    {header:'创建日期',dataIndex:'createDate',renderer:Ext.util.Format.dateRenderer('Y年m月d日 H时i分s秒'),sortable:true}
];


//------------------------------------------------------------------------------
//Module的company主Panel定义..
//------------------------------------------------------------------------------

com.cce.members.OrgCheckMember=Ext.extend(Ext.Panel,{
	id:'OrgCheckMember',
	loadMask: true,
	border: false,
	enableHdMenu: false,
	header:false,
	region:'center',
	closable:true,
	layout:"border"
});


com.cce.members.CheckMemberForm = Ext.extend(Ext.form.FormPanel, {
	title: '管理机构基本信息',
	modal:true,
	iconCls: 'silk-user',
	header: false,
	frame: true,
	region:'center',
	layout: 'tableform',
	layoutConfig:{
			columns:2,
			columnWidths: [0.5,0.5]
	},
    // private A pointer to the currently loaded record
    record : null,
    
    initComponent : function() {
		// build the form-fields.  Always a good idea to defer form-building to a method so that this class can
	    // be over-ridden to provide different form-fields
	    this.items = this.buildForm();
	
	    // build form-buttons
	    this.buttons = this.buildUI();
	
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
	    com.cce.members.CheckMemberForm.superclass.initComponent.call(this);
	},
	
    /**
     * buildform
     * @private
     */
    buildForm : function() {
		return [
		        {
		            xtype: 'textfield',
		            fieldLabel: '姓名 ',
			    	allowBlank:false,
		            anchor: '100%',
		            id:'name',
		            name:'name'
		        },
		        {
		            xtype: 'textfield',
		            fieldLabel: '邮箱',
			    	allowBlank:false,
		            anchor: '100%',
		            id:'mail',
		            name:'mail'
		        },
		        {
		            xtype: 'textfield',
		            fieldLabel: '手机',
		            anchor: '100%',
			    	allowBlank:false,
		            id:'mobile',
		            name:'mobile'
		        },
		        {
		            xtype: 'textfield',
		            fieldLabel: '邮编',
		            anchor: '100%',
			    	allowBlank:false,
		            id:'zipcode',
		            name:'zipcode'
		        },
		        {
		            xtype: 'textfield',
		            fieldLabel: '职务',
		            anchor: '100%',
			    	allowBlank:false,
		            id:'duty',
		            name:'duty'
		        },
		        {
		            xtype: 'textfield',
		            fieldLabel: '证书',
		            anchor: '100%',
			    	allowBlank:false,
		            id:'certificate',
		            name:'certificate'
		        },
		        {
		            xtype: 'textfield',
		            fieldLabel: '地址',
		            anchor: '100%',
			    	allowBlank:false,
			    	colspan:2,
		            id:'address',
		            name:'address'
		        },
		        {
		            xtype: 'textfield',
		            fieldLabel: '简历',
		            anchor: '100%',
			    	colspan:2,
			    	allowBlank:false,
		            id:'resumeInfo',
		            name:'resumeInfo'
		        }
		   ]
    },
	
    buildUI : function(){
        return [{
			text:"保存",
			scope: this,
			handler:this.onSave
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
//------------------------------------------------------------------------------
//Module的CompanyRecordGrid定义..
//------------------------------------------------------------------------------

com.cce.members.OrgCheckMemberMaster = Ext.extend(Ext.grid.GridPanel, {
	  id:'com.cce.members.OrgCheckMemberMaster',
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
		    com.cce.members.OrgCheckMemberMaster.superclass.initComponent.call(this);
		    
		    this.addEvents(
		    	'doedit'
		    );
		},
		
		 /**
	   * buildTopToolbar
	   */
	  buildTopToolbar : function() {
			return [{
				text:"新增",
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
		},			
		new Ext.Toolbar.Fill(),
		'过滤: ', ' ', 					
		new Ext.ux.form.SearchField({
	                	store: this.store,
	                	width:150
	    })];
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
				        	Ext.getCmp('com.cce.members.OrgCheckMemberMaster').store.remove(rows[i]);
				        }
				        Ext.getCmp('com.cce.members.OrgCheckMemberMaster').store.save();
					}
		      });
	  }
});

//------------------------------------------------------------------------------
//Module的RecordExpertMore内容Panel定义..
//------------------------------------------------------------------------------

//com.cce.members.OrgCheckMemberDetail=Ext.extend(Ext.Panel ,{
//	 id:'OrgCheckMemberDetail',
//	 region:'south',
//	 height:260,
//	 title:'详细信息',
//	 split:true,
//	 bodyStyle: 'padding: 10px; font-family: Arial; font-size: 12px;',
//	 
//	initComponent: function(store){
//	
//
//		this.stroe = store;
//		com.cce.members.OrgCheckMemberDetail.superclass.initComponent.call(this);
//		
//		 
//	}	  
//	
//});


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
		this.master = new com.cce.members.OrgCheckMemberMaster({ store : this.store });
//		this.detail= new com.cce.members.OrgCheckMemberDetail({ store : this.store });
		this.frame= new com.cce.members.OrgCheckMember();		
		
		
		//关联自定义事件
	    //this.relayEvents(this.store, ['destroy', 'save', 'update']);
		
		this.master.on('doedit', this.showForm, this);
		
		this.frame.add(this.master);
//		this.frame.add(this.detail);
		
  	this.main.add(this.frame);
  	this.main.doLayout();
  	this.store.load({params:{start:0,limit:20}}); 
	},

	showForm : function(g, store, record){
		if(!record){
	        record = new store.recordType();
		}
		var form = new com.cce.members.CheckMemberForm();
		this.win = new Ext.Window({
		    title: '执法机构信息',
		    closable:true,
		    width:510,
		    height:230,
		    constrain:true,
		    //border:false,
		    plain:true,
		    layout: 'border',
		    items: [form]
		});
		
		form.on('save', this.onSave, this);
		
		form.loadRecord(record);		
		
		this.win.show();
	},

	showReForm : function(g, store, record){
		
		
	},

	onSave : function(fp, record){
		fp.getForm().updateRecord(record);
        if(record.data.id == null){
        	this.store.add(record);
        }
        this.store.save();
        this.win.close();
        //this.store.reload();
	}
});
