Ext.ns("com.cce.training");
ScriptMgr.load({ scripts: [ 'javascript/utils/LovCombo.js']});
//------------------------------------------------------------------------------
//Module的proxy定义..
//------------------------------------------------------------------------------
var proxy = new Ext.data.HttpProxy({
    api: {
	    read : 'training/filemgr!list.action',
	    //create : 'security/user!save.action',
	    //update: 'training/filemgr!save.action',
	    destroy: 'training/filemgr!delete.action'
	}
});

var proxy_entrymgr = new Ext.data.HttpProxy({
    api: {
	    read : 'training/entrymgr!list.action',
	    //create : 'training/entrymgr!save.action',
	    //update: 'training/entrymgr!save.action',
	    destroy: 'training/entrymgr!delete.action'
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
         { name : 'name'}, 
         { name : 'uploadName'},
         { name : 'title'}, 
         { name : 'timeString'	},
         { name : 'typeName'},
         { name : 'typeId',mapping : 'type.id'},
         {name: 'roleNames',mapping:'roleNames'},
       	 {name: 'roleList',mapping:'roleList'},
         {name: 'roleIDs',mapping:'roleIDs'}
        ]
  );
var reader_entrymgr = new Ext.data.JsonReader(
        {
            totalProperty: 'total',
            root:'data'
        },
        [
         { name : 'id',mapping : 'id'}, 
         { name : 'title'}, 
         { name : 'refFile'}, 
         { name : 'publishType'},
         { name : 'statusText',mapping:'statusText'},
	     { name : 'startTime',mapping:'startTime',type:'date',dateFormat:'time'},
	     { name : 'endTime',mapping:'endTime',type:'date',dateFormat:'time'},
	     { name : 'publishTime',mapping:'publishTime',type:'date',dateFormat:'time'},
         { name : 'url'}
         
        ]
);



//------------------------------------------------------------------------------
//Module的writer定义..
//------------------------------------------------------------------------------
var writer = new Ext.data.JsonWriter({
    encode: true,
    writeAllFields: false //必须回传所有字段
});
var writer_entrymgr = new Ext.data.JsonWriter({
    encode: true,
    writeAllFields: true //必须回传所有字段
});
//------------------------------------------------------------------------------
//Module的columns定义..
//------------------------------------------------------------------------------
var columns = [
       new Ext.grid.CheckboxSelectionModel(),
	  {	header : '编号',	width : 25,	dataIndex : 'id',sortable : true}, 
	  {	header : '原文件名',	width : 150, dataIndex : 'uploadName',	sortable : true	},
	  {	header : '标题',	 width : 150, dataIndex : 'title',	sortable : true	},
	  {	header : '上传时间', width : 150, dataIndex : 'timeString',	sortable : true	},
	  {	header : '类型',  width : 60,	dataIndex : 'typeName',	sortable : true	}
];
var columns_entrymgr = [
      new Ext.grid.CheckboxSelectionModel(),
      {	header : '编号',	width : 35, dataIndex : 'id'},
      {	header : '标题',	width : 260, dataIndex : 'title'},
      {	header : '当前状态',	width : 50, dataIndex : 'statusText'},
  	  { header : '开始时间',	width : 150, dataIndex:'startTime',renderer:Ext.util.Format.dateRenderer('Y年m月d日 H时i分s秒'), sortable:true},
  	  { header : '结束时间',	width : 150, dataIndex:'endTime',renderer:Ext.util.Format.dateRenderer('Y年m月d日 H时i分s秒'), sortable:true},
	  { header : '发布时间',	width : 150, dataIndex:'publishTime',renderer:Ext.util.Format.dateRenderer('Y年m月d日 H时i分s秒'), sortable:true}
//      {	header : '地址',  width : 300,dataIndex : 'url'}
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

var store_entrymgr = new Ext.data.Store({
    id: 'store_entrymgr',
    proxy: proxy_entrymgr,
    reader: reader_entrymgr,
    writer: writer_entrymgr,  // <-- plug a DataWriter into the store just as you would a Reader
    autoSave: false
});
var roleStore=new Ext.data.Store({
	url:"security/role!listBox.action",//?checked=true
    reader: new Ext.data.JsonReader({
    	totalProperty:"total",
    	root:'data',
    	fields:['roleid','rolename']
    })
});

//主panel 
com.cce.training.FileMain=Ext.extend(Ext.Panel,{
	id:'com.cce.training.FileMain',
	loadMask: true,
	border: false,
	enableHdMenu: false,
	header:false,
	region:'center',
	closable:true,
	layout:"border",
	frame:true
});

//------------------------------------------------------------------------------
//Module的UserGrid定义..
//------------------------------------------------------------------------------
com.cce.training.FileGrid = Ext.extend(Ext.grid.GridPanel, {
	id:'com.cce.training.FileGrid',
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
    frame:true,
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
	    
	    this.addEvents(
		    	'doEntry'
	    );
	    
	    // super
	    com.cce.training.FileGrid.superclass.initComponent.call(this);	    

	},
	
	 /**
     * buildTopToolbar
     */
    buildTopToolbar : function() {
        return [{
				text:"上传文件",
				iconCls:"add_news",
				scope: this,
				handler:this.onUpload
      	},
//      	{
//				text:"修改文件",
//				iconCls:"company_record_edit",
//				scope: this,
//				handler:this.onEdit
//      	},      	
		{
				text:"删除文件",
				iconCls:"training_delete",
				scope: this,
				handler:this.onDelete
		},
      	{
				text:"发布文件",
				iconCls:"training_record_add",
				scope: this,
				handler:this.onEntry
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
    	    modal:true,
    	    items: [form]
    	    });    	
    },
    
    /**
     * onAdd
     */  
    
    
    onUpload : function() {
    	
		var form = new com.cce.training.UploadForm();
		form.on('aftersave', this.onAfterSave, this );
		this.win = this.newWindow( '上传文件', form  );
        form.setWin(this.win);
		this.win.show();    	
    },
    
    onAfterSave: function()
    {
    	 
		store.load({params:{start:0,limit:20}});
    },
    
    onEntry : function()
    {
    	
    	var record = this.getSelectionModel().getSelected();
        if (!record) {
            return false;
        }
        this.fireEvent('doEntry', this, this.store, record);
        
        
    	
    },
    onClose:function(){
    	this.win.close();
    },
    /**
     * onEdit
     */
    onEdit : function(){
    	var record = this.getSelectionModel().getSelected();
        if (!record) {
            return false;
        }
		var form = new com.cce.training.FileInfoForm();
		form.on('aftersave', this.onAfterSave, this);
		
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
		  var rows=this.getSelectionModel().getSelections();
	      Ext.Msg.confirm('确认删除', '你确定删除该条记录?', function(btn) {
				if (btn == 'yes') {
			        for(var i=0;i<rows.length;i++)
			        {
			        	store.remove(rows[i]);
			        }
					store.save();
					store.load({
				    	scope: this,
						params:{start:0,limit:20},
						callback:function(records,options,succees){
							  store_entrymgr.load({params:{data:''}});
						}
				    });
				}
	      });
    }
});


com.cce.training.EntryGrid = Ext.extend(Ext.grid.GridPanel, {
	id:'com.cce.training.EntryGrid',
    stripeRows: true,
    loadMask: true,
    border: false,
    enableHdMenu: false,
    header:false,
    region:'south',
    closable:true,
    win:null,
    frame:true,
    height:260,
    split:true,
    columns:columns_entrymgr,
    sm : new Ext.grid.CheckboxSelectionModel(),
    initComponent : function() {
 
		this.tbar = this.buildTopToolbar();
		this.bbar = this.buildBottomToolbar();
	    // super
	    com.cce.training.EntryGrid.superclass.initComponent.call(this);	    

 
	},
	buildTopToolbar : function() {
        return [                  
		            {
		        	  text:"删除发布", 
		        	  scope: this,
		        	  iconCls:"edit_news",
		        	  handler:this.onDelete	
		        	}
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
			        	store_entrymgr.remove(rows[i]);
			        }
			        store_entrymgr.save();
				}
	      });
    }
});

//数据获取-----------------------------------------
 


//---------------------------------------------------------





//文件发布表单定义
com.cce.training.EntryInfoForm = Ext.extend(Ext.form.FormPanel, {
	title: '连接信息',
	modal:true,
	iconCls: 'silk-user',
	labelWidth: 100, 
	header: false,
	frame: true,
	region:'center',
	autoScroll: true,
    // private A pointer to the currently loaded record
	record : null,
	typeId : null, //类型id
    initComponent : function() {
		// build the form-fields.  Always a good idea to defer form-building to a method so that this class can
	    // be over-ridden to provide different form-fields
    	
	this.rolelistCombo = new Ext.ux.form.LovCombo({
		id:'roleList',
		fieldLabel:"分组列表",
		hiddenName:'role_id',
		triggerAction:'all',
		editable:false,
		store:roleStore,
		displayField:'rolename',
		valueField:'roleid',
		allowBlank:false,
		anchor : '100%'
	});
		var projectStore=new Ext.data.Store({
			url:"training/entrymgr!getProjectList.action",
			reader: new Ext.data.JsonReader({ 
				root:'data',
				fields:['id','title']
			}),
			autoLoad:true
		});
	
		this.projectList = new Ext.form.ComboBox( {
	
			fieldLabel:"项目",
			name:'projectId1',
			hiddenName:'projectId',
			triggerAction:'all',
			editable:false,
			store:projectStore,
			displayField:'title',
			valueField:'id',
			allowBlank:false,
			anchor : '100%'
		});
	
	
//		var publishTypestore=new Ext.data.Store({
//			url:"training/entrymgr!getPublishTypeList.action",
//			reader: new Ext.data.JsonReader({ 
//				root:'data',
//				fields:['id','name']
//			}),
//			autoLoad:true
//		});
//	
//		this.publishType = new Ext.form.ComboBox( {
//			fieldLabel:"类别",
//			name:'publishType1',
//			hiddenName:'publishType',
//			triggerAction:'all',
//			editable:false,
//			store:publishTypestore,
//			displayField:'name',
//			valueField:'id',
//			allowBlank:false,
//			anchor : '100%'
//		 
//		});
	
	    this.items = this.buildForm();	
	    // build form-buttons
	    this.buttons = this.buildUI();	
	    // add a create event for convenience in our application-code.
	
	    // super
	    com.cce.training.EntryInfoForm.superclass.initComponent.call(this);
	    
	    projectStore.on('load',function(Store,records,options){
			
		   if(this.typeId=='1'){//文档资料
			   projectStore.removeAt(0);
			   projectStore.removeAt(1);
		   }else if(this.typeId=='2'){//视频文件
			   projectStore.removeAt(1);
			   projectStore.removeAt(2);
		   }
			
		},this);
	    
	    //载入项目下拉框
	    projectStore.load();
	    
	    
	    Ext.apply(Ext.form.VTypes, {   
	        dateRange: function(val, field){   
	            if(field.dateRange){   
	                var beginId = field.dateRange.begin;   
	                this.beginField = Ext.getCmp(beginId);   
	                var endId = field.dateRange.end;   
	                this.endField = Ext.getCmp(endId);   
	                var beginDate = this.beginField.getValue();   
	                var endDate = this.endField.getValue();   
	            }   
	            if(beginDate <= endDate){   
	                return true;   
	            }else{   
	                return false;   
	            }   
	        },   
	        //验证失败信息   
	        dateRangeText: '开始日期不能大于结束日期'  
	    }); 
	    
	    
	    //载入类型下拉框
//	    projectStore.load( {
//        	scope : this,
//        	callback: function()
//        	{
//        	    //this.publishType.setValue('1');
//        	    if(this.typeId=='1') //文档资料
//        	    {
//        	    	//删除视频点播
//        	    	projectStore.removeAt(1);
//        	    }
//        	    else if(this.typeId=='2')//视频文件
//        	    {
//        	    	//删除文件下载
//        	    	projectStore.removeAt(2);
//        	    	
//        	    }
//        	}
//        });
	    
	},	
    buildForm : function() {
		
	    
		this.date=new Date(); //现在时间
	    
 
	    
        return [
this.rolelistCombo,
                new Ext.form.Hidden({name:'fileId',id:'fileId'}),  
                {
                	fieldLabel: '文件名', 
                	xtype:'displayfield', 
                	name: 'uploadName',
                	id:'uploadName',
                	anchor: '100%'
                },
                {
                	xtype:'displayfield', 
                	fieldLabel: '文件标题',
                	name:"fileTitle",
                	id:'fileTitle',
                	anchor: '100%'
                },
                {
                	xtype:'textfield',
                	name:'title',
                	id:'title',
                	fieldLabel: '标题(不得少于6个字)', 
                	allowBlank: false,
                	regex: /^(?:[\u4e00-\u9fa5]*\w*\s*){6}$/,
                	anchor: '100%'
                },               
                this.projectList,
                //this.publishType,
                {
                	xtype:'datefield',
                	fieldLabel: '开始日期', 
                	value :new Date(), 
                	name: 'startDate',
                	id:'startDate',
                	format:'m/d/Y',
                	anchor: '100%',
                	dateRange: {begin: 'startDate', end: 'endDate' },   
                    vtype: 'dateRange' 
                },
                {
                	xtype:'timefield',
                	fieldLabel: '开始时间', 
     	        	value : new Date(), 
     	        	name: 'startTime', 
     	        	format:'H:i:s',
     	        	anchor: '100%',
     	        	editable:false
                },
 
                {
                	xtype:'datefield',
                	fieldLabel: '结束日期', 
                	value :new Date(this.date.getFullYear(),this.date.getMonth(),this.date.getDate()+1), 
                	name: 'endDate',
                	id:'endDate',
                	format:'m/d/Y',
                	anchor: '100%',
                	dateRange: {begin: 'startDate', end: 'endDate' },   
                    vtype: 'dateRange' 
                },
                {
                	xtype:'timefield',
                	fieldLabel: '结束时间', 
     	        	value : new Date(), 
     	        	name: 'endTime', 
     	        	format:'H:i:s',
     	        	anchor: '100%',
     	        	editable:false
                }
 
 
            ];
    },	
    buildUI : function(){
        return [
           
          {	
        	  text:'保存',	 
        	  scope: this,
        	  handler:this.onSave
          },
          { 
        	  text:'取消', 
        	  scope: this,
        	  handler:this.onClose 
          }
        ];
	},
    
    /**
     * onUpdate
     */
	onClose: function(btn, ev)
	{
		 store_entrymgr.load({
			 params : { 
			 	data:this.record.get("id"),
				start:0,
			    limit:20
			}
		 });
    	 this.fireEvent( "afterSave" );
	},
	
	saveOk : function(f,o)
	{
 	     App.setAlert(true, "保存成功。");
 	    store_entrymgr.load({
			 params : { 
			 	data:this.record.get("id"),
				start:0,
			    limit:20
			}
		 });
   	     this.fireEvent( "afterSave" );
 	     
	},
	
	saveError : function(f,o)
	{
	     App.setAlert(false, "网络出现错误。");
	},
	
	onSelectFileOk : function(f,rec)
	{   
		this.record=rec;
		this.getForm().loadRecord(rec);
		Ext.getCmp('fileId').setValue(rec.get('id'));
		Ext.getCmp('fileTitle').setValue(rec.get('title'));	
		
		

	},	
    onSave : function(btn, ev) {
 
        if (!this.getForm().isValid()) {
            App.setAlert(false, "表单数据有错误.");
            return false;
        }        
        
        this.getForm().submit( {
			url : 'training/entrymgr!saveFunc.action',
			waitMsg : '正在保存数据...',
			scope : this,
			success : this.saveOk,
            failure: this.saveError                
		});          

    }
});
//------------------------------------------------------------------------------
//	Module的定义放在最后,eval(xxx.js)后返回Module的类定义..
//------------------------------------------------------------------------------
Ext.extend(com.cce.Module, {
	win: null,
    init: function(){
	
		this.master = new com.cce.training.FileGrid({store:store});
		this.detail= new com.cce.training.EntryGrid({store:store_entrymgr}); 	
		this.frame= new com.cce.training.FileMain();
		
		this.master.on('doEntry', this.showEntryWindow, this);
		
		this.master.on('rowclick', function(g, index, ev){
			this.record =g.store.getAt(index);
			store_entrymgr.load({
  			params : { 
   			 	data:this.record.get("id"),
				start:0,
			    limit:20
   			}
  		}); 
		}, this);
		
		this.frame.add(this.master);
		this.frame.add(this.detail);
		
		
		store.load({params:{start:0,limit:20}}); 
	  	this.main.add(this.frame);
	  	this.main.doLayout();
	  	//加载需要的子窗口
        ScriptMgr.load({
			  scripts: [
			            'javascript/modules/training-upload.js', 
			            'javascript/modules/training-selectfile.js',
			            'javascript/modules/training-fileinfo.js'
			           ],
			  callback: function()
			  {			  
			  }
		     });
	},
	showEntryWindow:function(g, store, record){
		
		
        if (!record) {
            return false;
        }
    	
    	var form = new com.cce.training.EntryInfoForm({typeId:record.get('typeId')});
    	
    	form.on('aftersave', this.onClose, this );
    	
    	form.onSelectFileOk(null,record);
    	
    	this.win = new Ext.Window({
		    title: '发布文件',
		    closable:true,
		    width:600,
		    height:350,
		    constrain:true,
		    modal:true,
		    plain:true,
		    layout: 'border',
		    resizable:true,
		    autoScroll: true,
		    items: [form]
		});
 
		this.win.show(); 
	},
	onClose:function(){
		
		this.win.close();
	}
});
