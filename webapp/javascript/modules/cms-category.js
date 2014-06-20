Ext.ns("com.cce.category");

//------------------------------------------------------------------------------
//Module的proxy定义..
//------------------------------------------------------------------------------
var proxy = new Ext.data.HttpProxy({
    api: {
	    read : 'message/news-category!list.action',
	    create : 'message/news-category!save.action',
	    update: 'message/news-category!save.action',
	    destroy: 'message/news-category!delete.action'
	}
});

//------------------------------------------------------------------------------
//Module的reader定义..
//------------------------------------------------------------------------------
var reader = new Ext.data.JsonReader(
        {root:'data'},
        [
            {name: 'id',mapping:"id"},
            {name: 'create_time',mapping:"createTime",type:'date',dateFormat:'time'},
            {name: 'shorthand',mapping:"shorthand"},		        
	        {name: 'update_time',mapping:"updateTime",type:'date',dateFormat:'time'},
	        {name: 'value',mapping:"value"}
	        
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
      {header:'类别名称', dataIndex:'shorthand'},
      {header:'描述', dataIndex:'value'},
      {header:'创建时间',dataIndex:'create_time',renderer:Ext.util.Format.dateRenderer('Y年m月d日 H时i分s秒'),sortable:true}
];



//------------------------------------------------------------------------------
//Module的Category定义..
//------------------------------------------------------------------------------
com.cce.category.CategoryGrid = Ext.extend(Ext.grid.GridPanel, {
	id:'com.cce.category.CategoryGrid', 
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
	    com.cce.category.CategoryGrid.superclass.initComponent.call(this);
	    
	    this.addEvents(
	    	'doedit'
	    );
	},
	
	 /**
     * buildTopToolbar
     */
    buildTopToolbar : function() {
        return [{
				text:"添加分类",
				iconCls:"cms_category_add",
				scope: this,
				handler:this.onAdd
      	},
      	{
				text:"修改分类",
				iconCls:"cms_category_edit",
				scope: this,
				handler:this.onEdit
      	},
		{
				text:"删除分类",
				iconCls:"cms_category_delete",
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
				        	Ext.getCmp('com.cce.category.CategoryGrid').store.remove(rows[i]);
				        }
				        Ext.getCmp('com.cce.category.CategoryGrid').store.save();
					}
		      });
	  }
});

//------------------------------------------------------------------------------
//Module的categoryForm定义..
//------------------------------------------------------------------------------
com.cce.category.CategoryForm = Ext.extend(Ext.form.FormPanel, {
	title: '分类信息',
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
	    com.cce.category.CategoryForm.superclass.initComponent.call(this);
	},
	

    /**
     * buildform
     * @private
     */
    buildForm : function() {
		
		
		
        return [
                {fieldLabel: '分类名称', name: 'shorthand', allowBlank: false},
                {fieldLabel: '描述', name: 'value', allowBlank: false}                
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
		this.grid = new com.cce.category.CategoryGrid({ store : this.store });
		
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
		var form = new com.cce.category.CategoryForm();
		this.win = new Ext.Window({
		    title: '分类信息',
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
