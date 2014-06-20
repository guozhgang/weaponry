

Ext.ns("com.cce.content");

ScriptMgr.load({ scripts: ['fckeditor/fckeditor.js']}); //载入编辑器
ScriptMgr.load({ scripts: ['javascript/utils/Ext.ux.grid.Search.js']}); //载入查询插件
ScriptMgr.load({ scripts: [ 'javascript/utils/LovCombo.js']});

//------------------------------------------------------------------------------
//Module的proxy定义..
//------------------------------------------------------------------------------
var proxy = new Ext.data.HttpProxy({
    api: {
	    read : 'message/news-page!list.action',
	    create : 'message/news-page!save.action',
	    update: 'message/news-page!save.action',
	    destroy: 'message/news-page!delete.action'
	}
});

//------------------------------------------------------------------------------
//Module的reader定义..
//------------------------------------------------------------------------------
var reader = new Ext.data.JsonReader(
        {root:'data'},
        [
            {name: 'id',mapping:"id"},
            {name: 'content',mapping:"content"},
	        {name: 'title',mapping:"title"},
	        {name: 'update_time',mapping:"updateTime",type:'date',dateFormat:'time'},
	        {name: 'create_time',mapping:"createTime",type:'date',dateFormat:'time'},
	        {name: 'content_value',mapping:'contentValue'},
	        {name: 'category_name',mapping:'categoryName'},
	        {name: 'category_id',mapping:"category"},
	        {name: 'roleNames',mapping:'roleNames'},
          	{name: 'roleList',mapping:'roleList'},
          	{name: 'roleIDs',mapping:'roleIDs'}
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
      {header:'标题', dataIndex:'title'},
      {header:'所属类别', dataIndex:'category_name'},
      {header:'发布时间',dataIndex:'create_time',renderer:Ext.util.Format.dateRenderer('Y年m月d日 H时i分s秒'),sortable:true},
      {header:'允许查看的角色', dataIndex:'roleNames'}
];

//------------------------------------------------------------------------------
//form-autCombox的store定义
//------------------------------------------------------------------------------
var autStore=new Ext.data.Store({
	url:"security/role!listBox.action",//?checked=true
	reader: new Ext.data.JsonReader({ 
		root:'data',
		fields:['roleid','rolename']//,'checked'
	})

});

//------------------------------------------------------------------------------
//Module的分类信息store定义
//------------------------------------------------------------------------------


var categoryStore=new Ext.data.Store({
	url:"message/news-category!listBox.action",
	reader: new Ext.data.JsonReader({ 
		root:'data',
		fields:['id','shorthand']
	})

});

com.cce.content.CmsContentMain=Ext.extend(Ext.Panel,{
	id:'com.cce.content.CmsContentMain',
	loadMask: true,
	border: false,
	enableHdMenu: false,
	header:false,
	region:'center',
	closable:true,
	layout:"border"
});

//------------------------------------------------------------------------------
//Module的CmsContentGrid定义..
//------------------------------------------------------------------------------
com.cce.content.CmsContentGrid = Ext.extend(Ext.grid.GridPanel, {
	id:'com.cce.content.CmsContentGrid', 
    stripeRows: true,
    loadMask: true,
    border: false,
    enableHdMenu: false,
    header:false,
    frame:true,
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
	    com.cce.content.CmsContentGrid.superclass.initComponent.call(this);
	    
	    this.addEvents(
	    	'doedit',
	    	'doview'
	    );
	},
	
	 /**
     * buildTopToolbar
     */
    buildTopToolbar : function() {
        return [{
				text:"添加文章",
				iconCls:"cms_add_news",
				scope: this,
				handler:this.onAdd
      	},
      	{
				text:"修改文章",
				iconCls:"cms_delete_news",
				scope: this,
				handler:this.onEdit
      	},
		{
				text:"删除文章",
				iconCls:"cms_edit_news",
				scope: this,
				handler:this.onDelete
		},
		{
			    text:"预览文章",
			    iconCls:"cms_view_news_class",
			    scope:this,
			    handler:this.onView
		},			
		new Ext.Toolbar.Fill(),' '];
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
	   *  查询插件载入
	   */
//	  plugins: [new Ext.ux.grid.Search({
//
//        		iconCls: false
//
//            , showSelectAll: false
//
//            , dateFormat: 'm/d/Y'
//
//            , position: 'top'
//
//            , searchText: '搜索'
//
//            , disableIndexes: ['id','create_time']//不参与查询的列名
//
//            , minLength: 1
//
//    })],
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
			        	Ext.getCmp('com.cce.content.CmsContentGrid').store.remove(rows[i]);
			        }
			        Ext.getCmp('com.cce.content.CmsContentGrid').store.save();
				}
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

com.cce.content.CmsContentView=Ext.extend(Ext.Panel ,{
   id:'com.cce.content.CmsContentView',
   region:'south',
   height:260,
   title:'编排内容',
   split:true,
   autoScroll:true,
   frame:true,
   bodyStyle: 'padding: 10px; font-family: Arial; font-size: 12px;',
	initComponent: function(store){
	
		this.stroe = store;
		com.cce.content.CmsContentView.superclass.initComponent.call(this);
		
		this.addEvents(
		    	'doSend'
		);
	},
	
	doSend : function() {	
		
		
		this.fireEvent('doSend', this, this.store, null);
	       
	}
	  
	
});
//------------------------------------------------------------------------------
//Module的CmsContentForm定义..
//------------------------------------------------------------------------------
com.cce.content.CmsContentForm = Ext.extend(Ext.form.FormPanel, {
	title: '分类信息',
	modal:true,
	iconCls: 'silk-user',
	labelAlign: 'right',
	labelWidth: 60, 
	header: false,
	frame: true,
	region:'center',    
	autoScroll:true,
	defaultType:'textfield',
    defaults: {
        anchor: '100%'
    },
    
    // private A pointer to the currently loaded record
    record : null,
    
    initComponent : function() {
    	
    	this.lc = new Ext.ux.form.LovCombo({
 		   id:"roleList",
 	   	   name:"roleList",
 	   	   fieldLabel:"选择角色",
 	   	   store:autStore,
 	   	   mode:'local',
 	   	   triggerAction:'all',
 	   	   hideTrigger:false,
 	   	   allowBlank:false,
 	   	   displayField:'rolename',
 	   	   valueField:'roleid',
 	   	   emptyText:'请选择角色',
 	   	   editable:false
 	    });
    	
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
	    com.cce.content.CmsContentForm.superclass.initComponent.call(this);
	},
	

    /**
     * buildform
     * @private
     */
    buildForm : function() {
		
		
		
        return [
                	this.lc,
					{
					    xtype:"combo",
					    id:'categoryid',
					    fieldLabel:"类型",
					    hiddenName:'category_id',
					    triggerAction:'all',
					    editable:false,
					    store: categoryStore,
					    displayField:'shorthand', //显示的字段
					    valueField:'id', //数据字段
					    allowBlank:false, //必须选择
					    blankText: '请选择类型',
					    width:130
					},
					{
					    xtype: 'textfield',
					    fieldLabel: '内容标题',
					    id:'title',
					    hiddenName:'title',
					    regexText:"请不要输入非法字符",
					    allowBlank:false,
					    blankText: '标题不能为空',
					    anchor: '100%'
					},
					{
						xtype:'textarea',
						fieldLabel:'内容',
						labelSeparator:'：',
						id:'content',
						name:'content',
						hiddenName:'content',
						autoHeight:true,
						anchor : '100%'
						
					}
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
        
        Ext.Ajax.request({
            url:'message/news-page!get.action',
            scope:this,
            params:{data:this.record.get("id")},
            callback: function(o,s,r) {
            	var resText = Ext.util.JSON.decode(r.responseText).data;
            	if(resText){
            		var content = resText.content;
                	//this.record.set("content",content);
        			Ext.getCmp('content').setValue(content);
            	}
            }
		});
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
		this.grid = new com.cce.content.CmsContentGrid({ store : this.store });
		this.content= new com.cce.content.CmsContentView({ store : this.store });
		this.mainPanel= new com.cce.content.CmsContentMain();		
		//关联自定义事件
	    //this.relayEvents(this.store, ['destroy', 'save', 'update']);
		
		this.grid.on('doedit', this.showForm, this);
		this.grid.on('doview', this.showWin, this);
		this.grid.on('rowclick', function(g, index, ev){
			this.record =g.store.getAt(index);
			//if(!this.record.get("content"))
			Ext.Ajax.request({
	            url:'message/news-page!get.action',
	            scope:this,
	            params:{data:this.record.get("id")},
	            callback: function(o,s,r) {
	            	var resText = Ext.util.JSON.decode(r.responseText).data;
	            	if(resText){
	            		var content = resText.content;
	            		//this.record.set("content",content);
	            		Ext.getCmp('com.cce.content.CmsContentView').body.update(content);
	            	}
	            }
			});
			//else
				//Ext.getCmp('com.cce.content.CmsContentView').body.update(this.record.get("content"));
		}, this);
		
		this.mainPanel.add(this.grid);
		this.mainPanel.add(this.content);
		
	  	this.main.add(this.mainPanel);
	  	this.main.doLayout();
	  	this.store.load({params:{start:0,limit:20}}); 
	},
	
	showForm : function(g, store, record){
		autStore.load({
			 scope:this,
			 callback : function(r, options, success) {  
					
				  var roleIDs=record.get("roleIDs");
				  
				  if(roleIDs!=null&&roleIDs!="") {				  
					    
					     
						Ext.getCmp("roleList").setValue(roleIDs.replace(/(^\s*)|(\s*)|(\s*$)/g,''));
					   
				  }
					 				 
		     }
		});
		if(!record){
	        record = new store.recordType();
		}
		var form = new com.cce.content.CmsContentForm();
		this.win = new Ext.Window({
		    title: '文章信息',
		    closable:true,
		    width:950,
		    height:503,
		    constrain:true,
		    //border:false,
		    plain:true,
		    layout: 'border',
		    resizable:true,
		    modal:true,
		    items: [form]
		});
		
		form.on('save', this.onSave, this);
		
		form.loadRecord(record);		
		
		this.win.show();
		
		var oFCKeditor = new FCKeditor('content','100%',300) ; 
		oFCKeditor.BasePath = "fckeditor/" ; 
		oFCKeditor.ToolbarSet = 'Default';
		oFCKeditor.ReplaceTextarea() ;
	},
	showWin:function(g, store, record){	
	    
		//var html=record.get('content');
		
		this.win = new Ext.Window({
		    title: record.get('title'),
		    width:866,
		    height:541,
		    constrain:true,
		    autoScroll:true,
		    resizable:true,
		    modal:true
 
		});
		
		
		this.win.show();
		Ext.Ajax.request({
            url:'message/news-page!get.action',
            scope:this,
            params:{data:record.get("id")},
            callback: function(o,s,r) {
            	var resText = Ext.util.JSON.decode(r.responseText).data;
            	if(resText){
            		var content = resText.content;
            		//this.record.set("content",content);
            		this.win.update(content);
            	}
            }
		});
		
		
		
		
	},
	onSave : function(fp, record){
		
		fp.get('content').setValue(FCKeditorAPI.GetInstance('content').GetXHTML( true ));
		
		fp.getForm().updateRecord(record);
        if(record.data.id == null){
        	this.store.add(record);
        }
        this.store.save();
        
        this.win.close();
        Ext.Ajax.request({
            url:'message/news-page!get.action',
            scope:this,
            params:{data:record.get("id")},
            callback: function(o,s,r) {
            	var resText = Ext.util.JSON.decode(r.responseText).data;
            	if(resText){
            		var content = resText.content;
            		//this.record.set("content",content);
            		Ext.getCmp('com.cce.content.CmsContentView').body.update(content);
            	}
            }
		});
        //this.store.reload();
	}
});
