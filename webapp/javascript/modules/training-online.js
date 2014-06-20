
Ext.ns("com.cce.training");

//在线培训视频
//------------------------------------------------------------------------------
//Module的proxy定义..
//------------------------------------------------------------------------------
var proxy = new Ext.data.HttpProxy({
    api: {
	    read : 'training/entrymgr!getTraingByRole.action?filter_EQL_projectId=3'
	}
});
var onlineEntryId = '';
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
         { name : 'url',mapping:'url'},
         { name : 'status',mapping:'status'	},
         { name : 'statusText',mapping:'statusText'},
         { name : 'startTimeString',mapping:'startTimeString'},
         { name : 'endTimeString' ,mapping:'endTimeString'}         
        ]
  );


//------------------------------------------------------------------------------
//Module的columns定义..
//------------------------------------------------------------------------------
var columns = [
	  {	header : '编号',	width : 10,	dataIndex : 'id',sortable : true},
	  {	header : '标题',	width : 50, dataIndex : 'title',sortable : true},
	  {	header : '状态',	width : 20, dataIndex : 'statusText',sortable : true},
	  { header:'开始时间',width:30,dataIndex:'startTimeString',sortable:true},
	  { header:'结束时间',width:30,dataIndex:'endTimeString',sortable:true}
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



var chatMsgProxy = new Ext.data.HttpProxy({
    api: {
	    read : 'training/chat!list.action?entryId=0'
	}
});

var chatMsgReader = new Ext.data.JsonReader(
        {
            totalProperty: 'total',
            root:'data'
        },
        [
         { name : 'id',mapping : 'id'}, 
         { name : 'timeString' },
         { name : 'userName'}, 
         { name : 'content'	}
        ]
  );


//------------------------------------------------------------------------------
//Module的store定义..
//------------------------------------------------------------------------------
var chatMsgStore = new Ext.data.Store({
    id: 'id',
    reader: chatMsgReader,
    autoSave: false,
    proxy : chatMsgProxy
  });
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
    msgText : null,
    msgUpdateStart : false,
    msgPanel : null,
    msgTask : null,
    msgUpdateFlag : false,
    sm : new Ext.grid.RowSelectionModel(),
    columns : columns,
    initComponent : function() {
	    // typical viewConfig
	    this.viewConfig = {
	        forceFit: true
	    };
	
	    this.bbar = this.buildBottomToolbar();
	    this.ds = this.store;
	    
	    this.msgTask =  {
	    	    run: this.updateMsg,
	    	    interval: 5000,
	    	    scope : this
	    	};
	    this.msgTaskRunner = new Ext.util.TaskRunner();
	    
	    
	
	    this.on("dblclick", this.doClick, this );
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
    
    onSumitOk : function()
    {
    	this.msgText.setValue('');
    	this.updateMsg();
    	//App.setAlert(true, "成功");
    },
    
    onSubmitMsg: function()
    {
    	var id = this.record.id;
    	var content = this.msgText.getValue();
    	
    	if(content!=null&&content!="")
    	{
	        Ext.Ajax.request({
	            method:'POST',
	            url: 'training/chat!submit.action',
	            scope: this,
	            params : { 'entryId': id,
	        	      'content' : content
	        	    },
	            success: this.onSumitOk, 
	        	failure: function(){
	        	    	App.setAlert(false, "失败");
	        	    }
	            	
	        });
    	}
    	else
    	{
    		App.setAlert(false, "请输入消息内容");
    	}
    },
    
    onViewAllMsg : function ()
    {
    	
    },
 
    doClick : function()
    {
        this.onPlay();   	
    },
    

    buildHtml: function()
    {
    	
    	var t = 
    		new Ext.Template('<div id="video-content"></div><div id="chat"></div>');
    	
    	
    },
    
    buildWindowBottomBar : function(w)
    {
    	this.msgText = new Ext.form.TextField({
    		 
    		 width: w - 100
    	});
         return [ this.msgText,
            { text:"提交消息", scope: this, handler:this.onSubmitMsg }
         ];
    	
    },
   

    collectData : function(records){
        var r = [];
        for(var i = 0, len = records.length; i < len; i++){
            r[r.length] = records[i].data;
        }
        return r;
    },
    
    loadMsgOk : function(recs, opt, succ)
    {
    	if ( !succ )
    		return;
    	
    	this.msgUpdateFlag = false;
    	//App.setAlert(true, "loadMsgOk");
    	var tpl = new Ext.XTemplate(
    	'<tpl for=".">',
    	'<div>{userName}&nbsp;{timeString}</div><div>{content}</div><div>--</div>',
    	'</tpl>'
    	);
    	var records = chatMsgStore.getRange();
    	var data = this.collectData(records);
    	this.msgPanel.update( tpl.apply(data) );
    	//tpl.overwrite( this.msgPanel.body,  );
    },
    
    updateMsg : function ()
    {
    	if ( this.msgUpdateFlag )
    		return;
    	
    	this.msgUpdateFlag = true;
    	var id = this.record.id;
    	//alert(this.record);
    	chatMsgProxy.setApi('read', 'training/chat!list.action?entryId='+ id);
    	chatMsgStore.load( {
        	scope : this,
        	callback: this.loadMsgOk
       	});
    },
    
    buildMsgPanel : function(h)
    {
    	return new Ext.Panel({
       	 html : '<div id="chat">testline</div>',
       	 region : 'south',
       	 height : h
        });    	
    	
    },
    
    onPlay : function() {    	
   	
        if ( this.sm.getCount() > 0 )
        {
        	this.record = this.sm.getSelected(); 	
        	if ( this.record.get('status') != '2' )
        	{
        		alert(this.record.get('statusText'));
        		return;
        	}
    	    var url = this.record.get("url");
    	    var title = this.record.get("title");
    	    var h = this.getHeight() + 20;
    	    var w =  h * 1.3;
    	    
    	    var flash_h = h * 0.75;
    	    var flash_w = flash_h * 1.5;
    	    var flash_x = (w - flash_w) /2;
    	    
    	    var msg_h = h - flash_h;
    	    
      	    var flash = new Ext.FlashComponent(
        			{
        			id: 'video-content',
        			flashVars : 
        			{
        	            videoFullName : url, 
        	            videoAutoPlay : '0',
        	            videoWidth : flash_w,
        	            videoHeight : flash_h,
        	            videoX : flash_x
        			},
        			flashParams :
        			{
        				allowscriptaccess:'sameDomain',
        				allowfullscreen:'true'
        			},
        			url : 'flash/simpleplayer.swf',
        			region : 'center'
        			});        	
   
             this.msgPanel = this.buildMsgPanel(msg_h); 
	   	     this.win = new Ext.Window({
	             title: '在线培训-' + title,
	             closable:true,
	             width: w,
	             height: h,
	             layout: 'border',
	             constrain:true,
	             plain:true,
	             region: 'center',
	             buttonAlign : 'left',
	             //html: '</div><div id="chat">testline</div>',
	             items : [ flash, this.msgPanel ],
	             fbar : this.buildWindowBottomBar(w)
	             
	          });
		      this.win.on('afterrender',this.onWinAfterRender, this);
		      this.win.on('close', this.onCloseWin, this );
		      this.win.show();	
        }
    },
    
    onWinAfterRender : function ()
    {
    	if ( this.msgUpdateStart )
    	{
    		return;
    	}	
    		
        this.msgUpdateStart = true;
        this.msgTaskRunner.start(this.msgTask);
//        
//    	Ext.TaskMgr.start({
//    	    run: this.updateMsg,
//    	    interval: 5000,
//    	    scope : this
//    	});    	

    },
    
    onCloseWin: function(panel)
    {
    	if ( this.win == panel )
    	{
    	    //App.setAlert(true, "close event");
    	    this.msgTaskRunner.stop(this.msgTask);
            this.msgUpdateStart = false;
    	}
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
