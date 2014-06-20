Ext.ns("com.cce.training");

//------------------------------------------------------------------------------
//Module的proxy定义..
//------------------------------------------------------------------------------
var proxy = new Ext.data.HttpProxy({
    api: {
	    read : 'training/entrymgr!list.action?filter_EQL_projectId=1',
	    //create : 'training/entrymgr!save.action',
	    //update: 'training/entrymgr!save.action',
	    destroy: 'training/entrymgr!delete.action'
	}
});

var currentProjectId = 1;
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
         { name : 'title'}, 
         { name : 'refFile'}, 
         { name : 'publishType'}, 
         { name : 'url'}
         
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
	  {	header : '编号',	width : 25,	dataIndex : 'id',sortable : true},
	  {	header : '标题',	 width : 150, dataIndex : 'title',	sortable : true	},
	  {	header : '地址',  width : 60,	dataIndex : 'url',	sortable : true	}
];

//------------------------------------------------------------------------------
//Module的store定义..
//------------------------------------------------------------------------------
var store = new Ext.data.Store({
    id: 'id',
    proxy: proxy,
    reader: reader,
    writer: writer,  // <-- plug a DataWriter into the store just as you would a Reader
    autoSave: false,
    params : {start:0,limit:20,projectId:currentProjectId}
  });
//------------------------------------------------------------------------------
//project-list 定义
//------------------------------------------------------------------------------
var projectReader = new Ext.data.JsonReader(
        {
            totalProperty: 'total',
            root:'data',
            id :'id'
        },
        [
         { name : 'id'}, 
         { name : 'title'}
        ]
  );


var projectStore = new Ext.data.Store( {
	id : 1,
	fields : [ 'id', 'name' ],
	url : 'training/entrymgr!getProjectList.action',
	reader : projectReader,
	scope : this
});


var projectList = new Ext.form.ComboBox( {
	store : projectStore,
	typeAhead : true,
	triggerAction : 'all',
	lazyRender : true,
	fieldLabel : '项目',
	mode : 'local',
	name : 'projectId1',
	hiddenName : 'projectId',
	valueField : 'id',
	displayField : 'title',
	editable:false,
	allowBlank:false,
	forceSelection: true,
    listeners:{
        'select': function()    {
	        currentProjectId = projectList.getValue(); 
	        proxy.setApi( "read", "training/entrymgr!list.action?filter_EQL_projectId=" + currentProjectId  );
	        //proxy.setApi( "create", "training/entrymgr!save.action?filter_EQS_projectId=" + currentProjectId  );
	        store.reload();
	        //proxy.setApi( "destroy", "training/entrymgr!delete.action?projectId=" + currentProjectId  );
	        //proxy.setApi( "update", "training/entrymgr!save.action?projectId=" + currentProjectId  );
        }  
   }
});




//------------------------------------------------------------------------------
//Module的EntryGrid定义..
//------------------------------------------------------------------------------
com.cce.training.EntryGrid = Ext.extend(Ext.grid.GridPanel, {
	id:'com.cce.training.EntryGrid',
    stripeRows: true,
    loadMask: true,
    border: false,
    enableHdMenu: false,
    header:false,
    region:'center',
    closable:true,
    store: store,
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
	    this.relayEvents(this.store, ['destroy','save']);
	    // build toolbars and buttons.
	    this.tbar = this.buildTopToolbar();
	    this.bbar = this.buildBottomToolbar();
	    this.ds = this.store;
	
	    // super
	    com.cce.training.EntryGrid.superclass.initComponent.call(this);	    

	    projectStore.load( {
	    	callback: function()
	    	{
	    	   projectList.setValue('1');
	    	}
	    	});
	},
	
	 /**
     * buildTopToolbar
     */
    buildTopToolbar : function() {
        return [ 
                { xtype:'displayfield', fieldLabel : '项目' }, 
                 projectList,
                { text:"新建", scope: this,	handler:this.onAdd },
      	        //{ text:"修改", scope: this,	handler:this.onEdit },
		        {text:"删除", scope: this, handler:this.onDelete	}
      	        ];
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
    	    height:400,
    	    constrain:true,
    	    plain:true,
    	    layout: 'border',
    	    items: [form]
    	    });    	
    },    
    
    onAdd : function() {
    	
		var form = new com.cce.training.EntryInfoForm();//SelectFileForm();
		form.on('aftersave', this.onAfterSave, this );
		this.win = this.newWindow( "创建链接", form );
		form.setWin( this.win, currentProjectId );
		this.win.show();    	

    },
    
    onAfterSave: function()
    {
    	//this.win.close();
		this.store.reload();
    },
    
    /**
     * onEdit
     */
    onEdit : function(){
    	var record = this.getSelectionModel().getSelected();
        if (!record) {
            return false;
        }
   
        
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
		  var rows=this.getSelectionModel().getSelections();
	      Ext.Msg.confirm('确认删除', '你确定删除该条记录?', function(btn) {
				if (btn == 'yes') {
			        for(var i=0;i<rows.length;i++)
			        {
			        	 Ext.getCmp('com.cce.training.EntryGrid').store.remove(rows[i]);
			        }
			        Ext.getCmp('com.cce.training.EntryGrid').store.save();
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
	    
		this.grid = new com.cce.training.EntryGrid();		
		store.load({
				params:{start:0,limit:20}
		}); 
	  	this.main.add(this.grid);
	  	this.main.doLayout();
	  	//加载需要的子窗口
        ScriptMgr.load({
			  scripts: [
			            'javascript/modules/training-entryinfo.js',
			            'javascript/modules/training-selectfile.js'
			           ],
			  callback: function()
			  {			  
			  }
		     });
	}
});
