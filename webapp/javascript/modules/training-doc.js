Ext.ns("com.cce.training");

//------------------------------------------------------------------------------
//Module的proxy定义..
//------------------------------------------------------------------------------
var proxy = new Ext.data.HttpProxy({
    api: {
	    read : 'training/entrymgr!getTraingByRole.action?filter_EQL_projectId=2'
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
         { name : 'title',mapping:'title'}, 
         { name : 'refFile',mapping:'refFile'}, 
         { name : 'url',mapping:'url'	}
        ]
  );


//------------------------------------------------------------------------------
//Module的columns定义..
//------------------------------------------------------------------------------
var columns = [
	  {	header : '编号',	width : 10,	dataIndex : 'id',sortable : true},
	  {	header : '标题',	width : 60, dataIndex : 'title',sortable : true},
	  {	header : '培训资料',	 
			xtype:'templatecolumn',
			width : 10,
//			tpl : '<a href="{url}" target="_blank">下载</a>',
			tpl : "<a title='点击下载' target='_blank' href='upload/download.action?fileId={refFile}'>↓下载</a>",
			dataIndex : 'refFile',
			sortable : false}
];

//------------------------------------------------------------------------------
//Module的store定义..
//------------------------------------------------------------------------------
var store = new Ext.data.Store({
    id: 'id',
    reader: reader,
    proxy : proxy,
    autoSave: false
  });
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------


//------------------------------------------------------------------------------
//Module的VodList定义..
//------------------------------------------------------------------------------
com.cce.training.VodPanel = Ext.extend(Ext.grid.GridPanel, {
    stripeRows: true,
    loadMask: true,
    border: false,
    region:'center',
    closable:true,
    layout: 'fit',
    win:null,
    vodList:null,
    record :null,
    store : store,
    sm : new Ext.grid.RowSelectionModel(),
    columns : columns,
    initComponent : function() {
	    // typical viewConfig
	    this.viewConfig = {
	        forceFit: true
	    };
	
	    this.bbar = this.buildBottomToolbar();
	    this.ds = this.store;
	    
	
	    //this.on("click", this.doClick, this );
	    // super
	    com.cce.training.VodPanel.superclass.initComponent.call(this);	    
        this.store.load();
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

 
    doClick : function()
    {
        //this.onPlay();   	
    },
    

    
    onPlay : function() {    	
   	
        if ( this.sm.getCount() > 0 )
        {
        	this.record = this.sm.getSelected()    	
    	    var url = this.record.get("url");
        	var title = this.record.get("title");
        	
        	var t = new Ext.Template('点击下载 <a href="{0}" target="_blank">{1}</a>');
        	var html = t.apply( [url,title]);
		this.win = new Ext.Window({
	      title: '下载-' + url,
	      closable:true,
	      width:500,
	      height:70,
	      constrain:true,
	      plain:true,
	      region: 'center',
	      html: html
	    });
		this.win.show();	
        }
    },
    
    onclosewin: function()
    {
    	this.win.close();
    }   
    

});


//------------------------------------------------------------------------------
//	Module的定义放在最后,eval(xxx.js)后返回Module的类定义..
//------------------------------------------------------------------------------
Ext.extend(com.cce.Module, {
	win: null,
    init: function(){
	    
		this.panel = new com.cce.training.VodPanel();		
		store.load({params:{start:0,limit:20}}); 
	  	this.main.add(this.panel);
	  	this.main.doLayout();
	}
});
