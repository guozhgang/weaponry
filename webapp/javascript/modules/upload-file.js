Ext.ns("com.cce.upload");

//------------------------------------------------------------------------------
//Module的proxy定义..
//------------------------------------------------------------------------------
var proxy = new Ext.data.HttpProxy({
    api: {
	    read : 'upload/upload!list.action',
	    //create : 'security/user!save.action',
	    //update: 'training/filemgr!save.action',
	    destroy: 'upload/upload!delete.action'
	}
});

//------------------------------------------------------------------------------
//Module的reader定义..
//------------------------------------------------------------------------------
var reader = new Ext.data.JsonReader(
        {
            totalProperty: 'total',
            root:'data'
        },
        [
         { name : 'id',mapping : 'id'}, 
         { name : 'fileType'}, 
         { name : 'createBy'},
         { name : 'createDate'}, 
         { name : 'fileURI'	}
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
	  {	header : '编号',	width : 25,	dataIndex : 'id',sortable : true},
	  //{	header : '文件名',	width : 300, dataIndex : 'name',sortable : true},
	  {	header : '文件类型',	width : 150, dataIndex : 'fileType',	sortable : true	},
	  {	header : '创建人',	 width : 150, dataIndex : 'createBy',	sortable : true	},
	  {	header : '上传时间', width : 150, dataIndex : 'createDate',	sortable : true	},
	  {	header : '文件路径',  width : 60,	dataIndex : 'fileURI',	sortable : true	}
];

//------------------------------------------------------------------------------
//Module的store定义..
//------------------------------------------------------------------------------
var store = new Ext.data.Store({
    id: 'id',
    proxy: proxy,
    reader: reader,
    writer: writer,  // <-- plug a DataWriter into the store just as you would a Reader
    autoSave: false
  });

//------------------------------------------------------------------------------
//Module的UserGrid定义..
//------------------------------------------------------------------------------
com.cce.upload.FileGrid = Ext.extend(Ext.grid.GridPanel, {
	id:'com.cce.upload.FileGrid',
    stripeRows: true,
    loadMask: true,
    border: false,
    enableHdMenu: false,
    header:false,
    region:'center',
    closable:true,
    store: store,
	width: 480,
	height: 400,
    win:null,
    columns:columns,
    sm : new Ext.grid.CheckboxSelectionModel(),

    initComponent : function() {
	    // typical viewConfig
	    this.viewConfig = {
	        forceFit: true
	    };
	
	    //关联自定义事件
	    //this.relayEvents(this.store, ['destroy', 'save', 'update']);
	    this.relayEvents(this.store, ['destroy']);
	    // build toolbars and buttons.
	    this.tbar = this.buildTopToolbar();
	    this.bbar = this.buildBottomToolbar();
	    this.ds = this.store;
	
	    // super
	    com.cce.upload.FileGrid.superclass.initComponent.call(this);	    

	},
	
	 /**
     * buildTopToolbar
     */
    buildTopToolbar : function() {
        return [{
				text:"上传文件",
				//iconCls:"user_add",
				scope: this,
				handler:this.onUpload
      	}, 
		{
				text:"删除文件",
				//iconCls:"user_delete",
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

    
    newWindow : function( title, form )
    {
    	return new Ext.Window({
    	    title: title,
    	    closable:true,
    	    width:600,
    	    height:200,
    	    constrain:true,
    	    plain:true,
    	    layout: 'border',
    	    items: [form]
    	    });    	
    },
    
    /**
     * onAdd
     */  
    
    
    onUpload : function() {
    	
		var form = new com.cce.upload.UploadForm();
		this.win = this.newWindow( '上传文件', form  );
        form.setWin(this.win);
		this.win.show();    	
    },
    
    onAfterSave: function()
    {
		this.store.reload();
    },
    
    onCopyFile : function()
    {
    	
    },
    /**
     * onEdit
     */
    onEdit : function(){
    	var record = this.getSelectionModel().getSelected();
        if (!record) {
            return false;
        }
		var form = new com.cce.upload.FileInfoForm();
		form.on('afterSave', this.onAfterSave, this);
		
		this.win = this.newWindow( '修改文件', form  );		

		form.setWin(this.win); 
		form.loadRecord(record);
		this.win.show();            
        
        //this.fireEvent('doedit', this, this.store, record);
    },
    
    /**
     * onDelete
     */
    onDelete : function(btn, ev) {
    	//alert("delete");
        var selected = this.getSelectionModel().getSelected();
        if (!selected) {
            return false;
        }
	      Ext.Msg.confirm('确认删除', '你确定删除该条记录?', function(btn) {
				if (btn == 'yes') {
					Ext.getCmp('com.cce.upload.FileGrid').store.remove(selected);
					Ext.getCmp('com.cce.upload.FileGrid').store.save();
					Ext.getCmp('com.cce.upload.FileGrid').store.reload();
				}
	      });
    }
});


//------------------------------------------------------------------------------
//	Module的定义放在最后,eval(xxx.js)后返回Module的类定义..
//------------------------------------------------------------------------------
Ext.extend(com.cce.Module, {
	win: null,
    init: function(){
	    
		this.grid = new com.cce.upload.FileGrid();		
		store.load({params:{start:0,limit:20}}); 
	  	this.main.add(this.grid);
	  	this.main.doLayout();
	  	//加载需要的子窗口
        ScriptMgr.load({
			  scripts: [
			            'javascript/modules/upload.js'
			           ],
			  callback: function()
			  {			  
			  }
		     });
	}
});
