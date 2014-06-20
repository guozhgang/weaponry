Ext.ns("com.cce.record");

//载入布局文件
ScriptMgr.load({ scripts: ['javascript/utils/FormTableLayout.js']});
//载入查询插件
ScriptMgr.load({ scripts: ['javascript/utils/Ext.ux.grid.Search.js']}); 


//------------------------------------------------------------------------------
//Module的proxy定义..
//------------------------------------------------------------------------------
var proxy = new Ext.data.HttpProxy({
api: {
	    read : 'record/technician!search.action'
	}
});

var proxy_s_badge_de = new Ext.data.HttpProxy({
	api: {
		    read : 'record/technician!listBadge.action',
		    create : 'record/technician!saveBadge.action',
		    destroy: 'record/technician!deleteBadge.action'
		}
});
var reader_s_badge_de = new Ext.data.JsonReader(
		{root:'data'},
		[ 
		    	{name: 'id',mapping:"id"},
		    	{name: 'bagdname',mapping:'bagdname'},
		    	{name: 'bagdpath',mapping:'bagdpath'},
		    	{name: 'fileId',mapping:'fileId'},
		    	{name: 'createDate',mapping:'createDate',type:'date',dateFormat:'time'}
		    	
		]
);
var columns_s_badge_de = [
     new Ext.grid.CheckboxSelectionModel(), 
     {header:'证书名称',dataIndex:'bagdname'},  
     {header:'创建时间',dataIndex:'createDate',renderer:Ext.util.Format.dateRenderer('Y年m月d日 H时i分s秒'),sortable:true} 
                       	
];
var writer_s_badge_de = new Ext.data.JsonWriter({
	encode: true,
	writeAllFields: false
});
//------------------------------------------------------------------------------
//Module的reader定义..
//------------------------------------------------------------------------------
var reader = new Ext.data.JsonReader(
	{root:'data'},
	[ 
	    	{name: 'id',mapping:"id"},
	    	{name: 'approvalDept',mapping:'approvalDept'},
	    	{name: 'certNo',mapping:'certNo'},
	    	{name: 'education',mapping:'education'},
	    	
	    	{name: 'entName',mapping:'entName'},//企业名称
	    	{name: 'pic',mapping:'pic'}, //技术人员照片地址
	    	{name: 'picId',mapping:'picId'}, //技术人员照片地址
	    	{name: 'bagdpath',mapping:'bagdpath'}, //证书地址
	    	{name: 'name',mapping:'name'},
	    	{name: 'file',mapping:'file'},
	    	{name: 'fileId',mapping:'fileId'},
	    	{name: 'contact',mapping:'tel'},
	    	{name: 'category',mapping:'category'},//技术人员类别id
	    	{name: 'categoryName',mapping:'type'}//技术人员类别文字
	    	
	]
);


//------------------------------------------------------------------------------
//Module的writer定义..
//------------------------------------------------------------------------------
var writer = new Ext.data.JsonWriter({
	encode: true,
	writeAllFields: false
});

function linker(val){
	if(val&&val!="")
	return "<a title='点击下载' target='_blank' href='upload/download.action?id="+val+"'>↓下载</a>";  
	else return "";
}

//------------------------------------------------------------------------------
//Module的columns定义..
//------------------------------------------------------------------------------
var columns = [
	{header:'企业名称',dataIndex:'entName'}, //姓名
	{header:'姓名',dataIndex:'name'}, //姓名
	{header:'学历',dataIndex:'education'}, //学历
	{header:'发证机关',dataIndex:'approvalDept'}, //发证机关
//	{header:'证件编号',dataIndex:'certNo'},
//	{header:'证件',dataIndex:'fileId',renderer:linker}
	{header:'技术人员类别',dataIndex:'categoryName'},
	{header:'联系电话',dataIndex:'contact'}
	
];

//------------------------------------------------------------------------------
//Module的company主Panel定义..
//------------------------------------------------------------------------------

com.cce.record.RecordExpertSearchMain=Ext.extend(Ext.Panel,{
	id:'record-expert-search-main',
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
//Module的CompanyRecordGrid定义..
//------------------------------------------------------------------------------

com.cce.record.RecordExpertSearchGrid = Ext.extend(Ext.grid.GridPanel, {
	  id:'RecordExpertSearchGrid',
	  stripeRows: true,
	  loadMask: true,
	  border: false,
	  enableHdMenu: false,
	  header:false,
	  region:'center',
	  closable:true,
	  columns:columns,
	  frame:true,
	  initComponent : function() {
		    // typical viewConfig
		    this.viewConfig = {
		        forceFit: true
		    };
		
		    // build toolbars and buttons.
		    this.tbar = this.buildTopToolbar();
		    this.bbar = this.buildBottomToolbar();
		    
		    
		    
		    // super
		    com.cce.record.RecordExpertSearchGrid.superclass.initComponent.call(this);
		    
		    this.addEvents(
		    	'doSearch',
		    	'doAll'
		    );
		},
		
		 /**
	   * buildTopToolbar
	   */
	  buildTopToolbar : function() {
	      return [
			{
					text:"查询全部",
					iconCls:"select",
					scope: this,
					handler:this.onAll
			},        
	        {
					text:"条件查询",
					iconCls:"selectby",
					scope: this,
					handler:this.onSearch
	    	}]
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
//		iconCls: false
//
//    , showSelectAll: false
//
//    , dateFormat: 'm/d/Y'
//
//    , position: 'top'
//
//    , searchText: '搜索'
//
//    , disableIndexes: ['id','expireDate']//不参与查询的列名
//
//    , minLength: 1
//
//	  })],
	  /**
	   * onAdd
	   */
	  onAll : function() {
	      this.fireEvent('doAll', this, this.store, null);
	  },
	  onSearch : function() {
	      this.fireEvent('doSearch', this, this.store, null);
	  }
	 
});
var tpl = new Ext.XTemplate(
		'<tpl for=".">',
            '<div class="thumb-wrap" id="{fileId}">',
		    '<div class="thumb"><img src="upload/download.action?id={fileId}" title="{fileId}"  width="140" height="120"></div>',
		    '<span>{name}</span><span>{description}</span></div>',
        '</tpl>',
        '<div class="x-clear"></div>'
);

com.cce.record.RecordExpertSearchMore=Ext.extend(Ext.Panel ,{
	 id:'RecordExpertSearchMore',
	 loadMask: true,
	 border: false,
	 enableHdMenu: false,	 
	 region:'south',
	 closable:true,
	 autoScroll:true,
	 height:260,
	 frame:true,
	 split:true,
	 initComponent : function() {
		    
		    // super
		    
		    this.items=  new Ext.DataView({
		    	 id:'images-view',
	           	 tpl: tpl,
	           	 store: this.store,
	           	 overClass:'x-view-over',
	           	 multiSelect: true,
	           	 itemSelector: 'div.thumb-wrap'
          	 
	        }),
		    
	        com.cce.record.RecordExpertSearchMore.superclass.initComponent.call(this);
		    
	 }
	
});


//定义技术人员查询的form

com.cce.record.RecordExpertSearchForm=Ext.extend(Ext.form.FormPanel, {
	title: '技术人员查询',
	modal:true,
	iconCls: 'silk-user',
	labelWidth: 75,
	width: 550,
	height: 400,
	padding: 10,
	header: false,
	frame: true,
	region:'center',
	layout: 'form',	
	autoScroll: true,
    // private A pointer to the currently loaded record
	record : null,
	 
	initComponent : function() {
			var category_data=[['1','肉品品质检验人员'],['2','无害化处理人员'],['3','屠宰生产技术人员']];
			
			var category_store = new Ext.data.SimpleStore({
		        fields: ['type', 'typeChs'],
		        data : category_data
		    });
			
			this.category_combo = new Ext.form.ComboBox({
		        store: category_store,
		        id:"category",
		        name:"category",
		        fieldLabel:'技术人员类别',
		        displayField:'typeChs',
		        triggerAction:'all',
		        valueField:'type',
		        mode: 'local',
		        anchor: '100%',
		        editable:false
		        
		        
			});
			
			//地区树
			this.regionTree = new Ext.tree.TreePanel({
				root:  new Ext.tree.AsyncTreeNode(),
				loader: new Ext.tree.TreeLoader({
							dataUrl : 'security/region!treelist.action'
					}),
				hiddenRegionId : new Ext.form.Hidden({ name:"regionId" }),
				id : 'cce_regionTree',
				title : '所属地区: ',
				anchor : '100%',
				autoScroll : true,
				height : 130,
				header : true,
				rootVisible : false,
				frame : true,
				scope: this,
				listeners: {
				    "click": function( node){
				     	this.setTitle('所属地区: ' + node.text);
				     	this.hiddenRegionId.setValue(node.id);
			    	},
			    	"load":function(node){
			    		if(node.id == this.hiddenRegionId.value)
			    			this.getSelectionModel().select(node);
			    	}
			    }
			});
			
			// build the form-fields.  Always a good idea to defer form-building to a method so that this class can
		    // be over-ridden to provide different form-fields
		    this.items = this.buildForm();
		                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
		    // build form-buttons
		    this.buttons = this.buildUI();
		
		    // add a create event for convenience in our application-code.
		    this.addEvents(
		        'doSearchForm'
		    );
		
		    // super
		    com.cce.record.RecordExpertSearchForm.superclass.initComponent.call(this);
	},
	/**
	   * buildform
	   * @private
	   */
	buildForm : function() {
		
		return [
		        
		        this.category_combo,
		        {
		        	xtype: 'textfield',
				    fieldLabel: '企业名称',			    	 
				    anchor: '100%',
				    id:'entName',
				    name:'entName'
		        },
				{
				    xtype: 'textfield',
				    fieldLabel: '证件编号',			    	 
				    anchor: '100%',
				    id:'certNo',
				    name:'certNo'
				},
				{
				    xtype: 'textfield',
				    fieldLabel: '人员姓名',		     
				    anchor: '100%',
				    id:'name',
				    name:'name'
				},				
				this.regionTree,
		        this.regionTree.hiddenRegionId
	   ]
	  
	},
	buildUI : function(){
	      return [{
					text:"查询",
					scope: this,
					handler:this.onSearch
		  		 }];
	},
	loadRecord : function(rec) {
	      this.record = rec;
	      this.getForm().loadRecord(this.record);
	},
	  /**
	   * onUpdate
	   */
	onSearch : function(btn, ev) {
	      if (this.record == null) {
	          return;
	      }
	      if (!this.getForm().isValid()) {
	          App.setAlert(false, "表单数据有错误.");
	          return false;
	      }
	      this.fireEvent('doSearchForm', this, this.record);
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
		    reader: reader,
		    writer: writer,  // <-- plug a DataWriter into the store just as you would a Reader
		    autoSave: false
		});
		this.store.on("beforeload", function(thiz, options) {
	 		thiz.baseParams["data"] = searchParams;
		});
		
		this.store_s_badge = new Ext.data.Store({
		    id: 'store_s_badge',
		    message: 'message',
		    proxy: proxy_s_badge_de,
		    reader: reader_s_badge_de,
		    writer: writer_s_badge_de,  // <-- plug a DataWriter into the store just as you would a Reader
		    autoSave: false
		});
		this.grid = new com.cce.record.RecordExpertSearchGrid({ store : this.store });
		this.content= new com.cce.record.RecordExpertSearchMore({ store : this.store_s_badge });
		this.mainPanel= new com.cce.record.RecordExpertSearchMain();
		
		//关联自定义事件
	    //this.relayEvents(this.store, ['destroy', 'save', 'update']);
		
				this.grid.on('doSearch', this.showForm, this);
				this.grid.on('doAll', this.onAllData, this);
			    this.grid.on('rowclick', function(g, index, ev){
					this.record =g.store.getAt(index);
					
					this.store_s_badge.load({params:{data:this.record.get('id')}});
					
					this.content.doLayout();
				}, this);
	    
		
		this.mainPanel.add(this.grid);
		this.mainPanel.add(this.content);
		
	  	this.main.add(this.mainPanel);
	  	this.main.doLayout();
	  	this.store.load({params:{start:0,limit:20}}); 
	},
	showForm : function(g, store, record){		
		if(!record){
	        record = new store.recordType();
		}
		var form = new com.cce.record.RecordExpertSearchForm();
		this.win = new Ext.Window({
		    title: '查询',
		    closable:true,
		    width:550,
		    height:400,
		    constrain:true,		   
		    plain:true,
		    layout: 'border',
		    resizable:true,
		    autoScroll: true,
		    modal:true,
		    items: [form]
		});	
		
		form.on('doSearchForm', this.onSelect, this);
		
		
		form.loadRecord(record);	
		
		
		form.get('certNo').setValue(certNo);
		form.get('name').setValue(name);
		form.get('cce_regionTree').hiddenRegionId.setValue(region_id);
		form.get('category').setValue(category);
		form.get('entName').setValue(entName);
	 
		this.win.show();
		
	},
	onSelect : function(fp, record){
		
		fp.getForm().updateRecord(record);
		
		
		var data = new Array();
		certNo = fp.get('certNo').getValue();
		if(certNo!=null){
			data.push("certNo", certNo);
		}
	    name = fp.get('name').getValue();
		if(name!=""){
			data.push("name", name);
		}
	    category = fp.get('category').getValue();
		if(category!=""){
			data.push("category", category);
		}
		region_id = fp.get('cce_regionTree').hiddenRegionId.getValue();
		if(region_id!=""){
			data.push("region_id", region_id);
		}
	    entName = fp.get('entName').getValue();

		searchParams=Ext.encode({
			'certNo':certNo,
			'name':name,
			'category':category,
			'regionId':region_id,
			'entName':entName
		});	 
		//查询
		this.store.load({
			params:{
				start:0,
			    limit:20
			}
		});
		
		this.win.close();
	},
	onAllData:function(fp, record){
		searchParams=Ext.encode({
			'certNo':'',
			'name':'',
			'category':'',
			'regionId':'',
			'entName':''
		});
		//查询
		this.store.load({
			params:{
				start:0,
			    limit:20
			}
		});
	}
});

var certNo="";
var name="";
var category="";
var region_id="";
var entName="";
var searchParams=Ext.encode({
	'certNo':'',
	'name':'',
	'category':'',
	'regionId':'',
	'entName':''
});