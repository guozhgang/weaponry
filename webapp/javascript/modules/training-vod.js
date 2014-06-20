Ext.ns("com.cce.training");

//------------------------------------------------------------------------------
//Module的proxy定义..
//------------------------------------------------------------------------------
var proxy = new Ext.data.HttpProxy({
    api: {
	    read : 'training/entrymgr!getTraingByRole.action?filter_EQL_projectId=1'
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
         { name : 'url',mapping: 'url'	}

        ]
  );


//------------------------------------------------------------------------------
//Module的columns定义..
//------------------------------------------------------------------------------
var columns = [
	  {	header : '编号',	width : 15,	dataIndex : 'id',sortable : true},
	  {	header : '标题',	width : 30, dataIndex : 'title',sortable : true}
	  //{	header : 'xx',	width : 20, dataIndex : 'statusText',sortable : true}
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
    buttonAlign : 'center',
    sm : new Ext.grid.RowSelectionModel(),
    columns : columns,
    initComponent : function() {
	    // typical viewConfig
	    this.viewConfig = {
	        forceFit: true
	    };
	
	    this.buttons = this.buildBottomToolbar();
	    this.ds = this.store;
	    
	
	    this.on("dblclick", this.doClick, this );
	    // super
	    com.cce.training.VodPanel.superclass.initComponent.call(this);	    
        this.store.load();
	},
	

	 /**
     * buildBottomToolbar
     */
	buildBottomToolbar : function() {
//        return [
//                {	text:"播放", 	scope: this,	handler:this.onPlay }
//		];
    	return new Ext.PagingToolbar({
            pageSize: 20,
            store: this.store,
            displayInfo: true
        });		
    },

 
    doClick : function()
    {
        this.onPlay();   	
    },
    

    
    onPlay : function() {    	
   	
        if ( this.sm.getCount() > 0 )
        {
        	this.record = this.sm.getSelected()    	
    	    var url = this.record.get("url");
    	
            var flash =
        	new Ext.FlashComponent(
        			{
        			id: 'video-content',
        			flashVars : 
        			{
        	            videoFullName : url, 
        	            videoAutoPlay : '0',
        	            videoWidth : '600',
        	            videoHeight : '400'    				
        			},
        			flashParams :
        			{
        				allowscriptaccess:'sameDomain',
        				allowfullscreen:'true'
        			},
        			url : 'flash/simpleplayer.swf'
        			});        	
        	
		this.win = new Ext.Window({
	      title: '播放-' + url,
	      closable:true,
	      width:620,
	      height:435,
	      constrain:true,
	      plain:true,
	      region: 'center',
	      html: '<div id="video-content"></div>',
	      items : [ flash ]
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
