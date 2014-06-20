Ext.ns("com.cce.content");

ScriptMgr.load({ scripts: ['javascript/utils/SearchField.js']}); //载入查询插件



//------------------------------------------------------------------------------
//Module的proxy定义..
//------------------------------------------------------------------------------
var proxy = new Ext.data.HttpProxy({
  api: {
	    read : 'message/news-page!search.action'	    
	}
});

//------------------------------------------------------------------------------
//Module的reader定义..
//------------------------------------------------------------------------------
var reader = new Ext.data.JsonReader(
      {root:'data'},
      [
            {name: 'id',mapping:"id"}, //文章id
            {name: 'content',mapping:"content"}, //内容
            {name: 'excerpt',mapping:"contentBrief"}, //摘要
	        {name: 'title',mapping:"title"}, //标题
	        {name: 'create_time',mapping:"createTime",type:'date',dateFormat:'time'},//创建时间        
	        {name: 'category_name',mapping:'categoryName'}, //所属分类
	        {name: 'create_by',mapping:"createBy"} //创建人
      ]
);

//返回数据的模板

 
var resultTpl = new Ext.XTemplate(
    '<tpl for=".">',
    '<div class="search-item" id={id}>',
        '<h3><span>{create_time:date("Y年m月d日")}<br /></span>', 
        '{title}</h3>',
        '<p>{category_name}</p>',
        '<p>{excerpt}</p>',
    '</div></tpl>'
);

 

//------------------------------------------------------------------------------
//Module的CmsContentGrid定义..
//------------------------------------------------------------------------------
com.cce.content.CmsSearchPanel= Ext.extend(Ext.Panel, {
		  
	      id:'com.cce.content.CmsSearchPanel', 
	      title:'内容检索',
		  loadMask: true,
		  border: false,
		  enableHdMenu: false,
		  header:true,
		  region:'center',
		  closable:true,
		  autoScroll:true,
		  html: '&nbsp;',
		  initComponent : function() {
			     
			
			    // build toolbars and buttons.
			    this.tbar = this.buildTopToolbar();
			    this.bbar = this.buildBottomToolbar();
			    this.items=  new Ext.DataView({
			    				 id:'search',
				            	 tpl: resultTpl,
				            	 store: this.store,
				            	 overClass:'x-view-over',
				            	 multiSelect: true,
				            	 itemSelector: 'div.search-item',
				            	 listeners: {
			    						dblclick :function(dataview,index,node,e){ 
			    							var record = dataview.getStore().getAt(index);  
			    							//获取文章id alert("select:"+record.get('id'));   
				    						var win = new Ext.Window({
				    						    title: record.get('title'),
				    						    width:866,
				    						    height:541,
				    						    maximizable:true,
				    						    constrain:true,
				    						    resizable:true,
				    						    autoScroll:true
				    						});
			    							var html=record.get("content");
				    						if(!html)
				    							Ext.Ajax.request({
				    					            url:'message/news-page!get.action',
				    					            scope:this,
				    					            params:{data:record.get("id")},
				    					            callback: function(o,s,r) {
				    					            	var html = Ext.util.JSON.decode(r.responseText).data.content;
				    					            	record.set("content",html);
				    					            	win.show();
							    						win.update(html);
				    					            }
				    							});
			    							else{
		    					            	win.show();
					    						win.update(html);
			    							}
			    						}
			    				  }
					    	 }),
			    // super
			    com.cce.content.CmsSearchPanel.superclass.initComponent.call(this);
			    
			    this.addEvents(
				    'doview'
			    );
 
		  },
		  
	
			 /**
		   * buildTopToolbar
		   */
		  buildTopToolbar : function() {
		      return [ 
				'搜索: ', ' ',
	            new Ext.ux.form.SearchField({
	                store: this.store,
	                width:320
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
		 
		  onView:function(btn,ev){
		  	var record = this.getSelectionModel().getSelected();
		      if (!record) {
		          return false;
		      }
		      this.fireEvent('doview', this, this.store, record);
		      
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
			    reader: reader	     
 
			  });
			this.Panel = new com.cce.content.CmsSearchPanel({ store : this.store });
			
			 
			
		  	this.main.add(this.Panel);
		  	this.main.doLayout();
		  	
		  	this.store.load({params:{start:0,limit:20}}); 
		},
 
		showWin:function(g, store, record){	
		    
			var html=record.get('content');
			
			this.win = new Ext.Window({
			    title: record.get('title'),
			    width:866,
			    height:541,
			    constrain:true,
			    resizable:false
		
			});
			
			
			this.win.show();
			
			this.win.update(html);
			
			
			
		} 
});