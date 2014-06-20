Ext.ns("com.cce.sysmodule");

//------------------------------------------------------------------------------
//Module的proxy定义..
//------------------------------------------------------------------------------
var proxy = new Ext.data.HttpProxy({
    api: {
	    read : 'config/sys-module!list.action',
	    create : 'config/sys-module!save.action',
	    update: 'config/sys-module!save.action',
	    destroy: 'config/sys-module!delete.action'
	}
});

//------------------------------------------------------------------------------
//Module的reader定义..
//------------------------------------------------------------------------------
var reader = new Ext.data.JsonReader(
        {root:'data'},
        [
            {name: 'id',mapping:"id"},
            {name: 'module_name',mapping:"moduleName"},
            {name: 'module_desc',mapping:"moduleDesc"}
        ]
  );

//------------------------------------------------------------------------------
//Module的writer定义..
//------------------------------------------------------------------------------
var writer = new Ext.data.JsonWriter({
    encode: true,
    writeAllFields: true //必须回传所有字段
});

//------------------------------------------------------------------------------
//Module的columns定义..
//------------------------------------------------------------------------------
var columns = [
       new Ext.grid.CheckboxSelectionModel(),
	  {header:'编号', dataIndex:'id', sortable:true},
      {header:'模块名称', dataIndex:'module_name'},
      {header:'描述', dataIndex:'module_desc'}
];



//------------------------------------------------------------------------------
//Module的Category定义..
//------------------------------------------------------------------------------
com.cce.sysmodule.SysModuleGrid = Ext.extend(Ext.grid.GridPanel, {
	id:'com.cce.sysmodule.SysModuleGrid', 
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
	    com.cce.sysmodule.SysModuleGrid.superclass.initComponent.call(this);
	    
	    this.addEvents(
	    	'doedit'
	    );
	},
	
	 /**
     * buildTopToolbar
     */
    buildTopToolbar : function() {
        return [{
				text:"添加模块",
				iconCls:"add_news_class",
				scope: this,
				handler:this.onAdd
      	},
      	{
				text:"修改模块",
				iconCls:"edit_news_class",
				scope: this,
				handler:this.onEdit
      	},
		{
				text:"删除模块",
				iconCls:"delete_news_class",
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
			  var rows=this.getSelectionModel().getSelections();
		      Ext.Msg.confirm('确认删除', '你确定删除该条记录?', function(btn) {
					if (btn == 'yes') {
				        for(var i=0;i<rows.length;i++)
				        {
				        	Ext.getCmp('com.cce.sysmodule.SysModuleGrid').store.remove(rows[i]);
				        }
				        Ext.getCmp('com.cce.sysmodule.SysModuleGrid').store.save();
					}
		      });
	  }
});

//------------------------------------------------------------------------------
//Module的SysModuleForm定义..
//------------------------------------------------------------------------------
com.cce.sysmodule.SysModuleForm = Ext.extend(Ext.form.FormPanel, {
	title: '模块信息',
	modal:true,
	iconCls: 'silk-user',
	labelAlign: 'right',
	labelWidth: 60,
	width: 480,
	height: 400,
	header: false,
	frame: true,
	region:'center',
	defaultType:'textfield',
    defaults: {
        anchor: '100%'
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
	    com.cce.sysmodule.SysModuleForm.superclass.initComponent.call(this);
	},
	

    /**
     * buildform
     * @private
     */
    buildForm : function() {
		
		
		
        return [
                {fieldLabel: '模块名称', name: 'module_name', allowBlank: false},
                {fieldLabel: '描述', name: 'module_desc', allowBlank: false}                
                ];
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
//	Module的定义放在最后,eval(xxx.js)后返回Module的类定义..
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
		this.grid = new com.cce.sysmodule.SysModuleGrid({ store : this.store });
		
		//关联自定义事件
	    //this.relayEvents(this.store, ['destroy', 'save', 'update']);
		
		this.grid.on('doedit', this.showForm, this);
		this.grid.on('rowclick', function(g, index, ev){
			this.record =g.store.getAt(index);
		}, this);
		
	  	this.main.add(this.grid);
	  	this.main.doLayout();
	  	this.store.load({params:{start:0,limit:20}}); 
	},
	
	showForm : function(g, store, record){
		if(!record){
	        record = new store.recordType();
		}
		var form = new com.cce.sysmodule.SysModuleForm();
		this.win = new Ext.Window({
		    title: '模块信息',
		    closable:true,
		    width:320,
		    height:140,
		    constrain:true,
		    //border:false,
		    plain:true,
		    layout: 'border',
		    modal:true,
		    items: [form]
		});
		
		form.on('save', this.onSave, this);
		
		form.loadRecord(record);		
		
		this.win.show();
	},
	
	onSave : function(fp, record){
		fp.getForm().updateRecord(record);
        if(record.data.id == null){
        	this.store.add(record);
        }
        this.store.save();
        this.win.close();
        this.store.reload();
	}
});
