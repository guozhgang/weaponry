Ext.ns("com.cce.training");


var fileSelectReader = new Ext.data.JsonReader(
        {
            totalProperty: 'total',
            root:'data',
            id :'id'
        },
        [
         { name : 'id'}, 
         { name : 'uploadName'},
         { name : 'title'},
         { name : 'typeName'}
         
        ]
  );

var fileSelectStore = new Ext.data.Store( {
	id : 1,
	fields : [ 'id', 'uploadName', 'title', 'typeName' ],
	url : 'training/filemgr!list.action',
	reader : fileSelectReader
	});



com.cce.training.SelectFileForm = Ext.extend(Ext.grid.GridPanel, {
	title: '文件信息',
	width: 600,
	header: false,
	frame: true,
	region:'center',
    defaults: {
        anchor: '100%'
    },

    win : null,
    
    selectId : '*',
    
    store: fileSelectStore,
    
    setWin : function(w)
    {
    	this.win = w;
    },
    
    sm : new Ext.grid.RowSelectionModel(),
    columns : [
      new Ext.grid.RowSelectionModel(),
  	  {	header : '原文件名',	width : 150, dataIndex : 'uploadName',	sortable : true	},
  	  {	header : '标题',	 width : 150, dataIndex : 'title',	sortable : true	},
  	  {	header : '类型',  width : 60,	dataIndex : 'typeName',	sortable : true	}
    ],
    
    initComponent : function() {
    
	   	
	    this.buttons = this.buildUI();
	    this.bbar = this.buildBottomToolbar();
	


	    this.addEvents('selectFileOk');	    
	    
	    this.ds = this.store;
	    
	    // super
	    com.cce.training.SelectFileForm.superclass.initComponent.call(this);

	    this.getFileList();	    

	},
	
	getFileList:function()	{
		
        this.store.load( {
        	scope : this,
        	callback: function()
        	{
        	    
        	}
        	});
	},
	

    buildUI : function(){
        return [
//          { xtype: 'textfield' },
//          { text:'搜索',	 scope: this,handler:this.onSearch},
          {	text:'确定',	 scope: this,handler:this.onSelectFile},
          { text:'取消', scope: this,handler:this.onClose }
        ];
	},
	
    buildBottomToolbar : function() {
    	return new Ext.PagingToolbar({
            pageSize: 20,
            store: this.store,
            displayInfo: true
        });
    },
    
    /**
     * onUpdate
     */
	onClose: function(btn, ev)
	{
		this.win.close();
	},
	
	
    onSelectFile : function(btn, ev) {
        if ( this.sm.getCount() > 0 )
        {
	        this.selectId = this.sm.getSelected().id;
	 	    this.fireEvent( 'selectFileOk', this, this.sm.getSelected() );
        }
		this.win.close();
    }
});