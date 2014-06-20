Ext.ns("com.cce.cert");
ScriptMgr.load({ scripts: ['javascript/utils/FormTableLayout.js']});

//------------------------------------------------------------------------------
//Module的proxy定义..
//------------------------------------------------------------------------------
var proxy = new Ext.data.HttpProxy({
api: {
    read : 'record/companyBadge!searchCompanyBadgeInfo.action',
    create : 'record/companyBadge!saveCompanyBadge.action',
    update : 'record/companyBadge!saveCompanyBadge.action',
    destroy: 'record/companyBadge!delete.action'}
});

//------------------------------------------------------------------------------
//Module的reader定义..
//------------------------------------------------------------------------------
var reader = new Ext.data.JsonReader(
	{root:'data'},
	[ 
	    	{name: 'id',mapping:"id"},
			{name: 'fileId',mapping:'fileId'},
			{name: 'entName',mapping:'entName'},
			{name: 'entNo',mapping:'entNo'},
	    	{name: 'regionName',mapping:'regionName'}
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
    new Ext.grid.CheckboxSelectionModel(), 
    {header:'所属地区',dataIndex:'regionName'},
    {header:'企业名称',dataIndex:'entName'},
    {header:'税务登记号',dataIndex:'entNo'},
    {header:'证章证书',dataIndex:'fileId',renderer:linker}
    
];


//------------------------------------------------------------------------------
//Module的company主Panel定义..
//------------------------------------------------------------------------------

com.cce.cert.CompanyCert=Ext.extend(Ext.Panel,{
	id:'OrgEnforceOfficer',
	loadMask: true,
	border: false,
	enableHdMenu: false,
	header:false,
	region:'center',
	closable:true,
	layout:"border"
});


//------------------------------------------------------------------------------
//Module的CompanyRecordGrid定义..
//------------------------------------------------------------------------------

com.cce.cert.CompanyCertMaster = Ext.extend(Ext.grid.GridPanel, {
	  id:'com.cce.cert.CompanyCertMaster',
	  stripeRows: true,
	  loadMask: true,
	  border: false,
	  enableHdMenu: false,
	  header:false,
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
		    com.cce.cert.CompanyCertMaster.superclass.initComponent.call(this);
		    
		    this.addEvents(
		    	'doedit'
		    );
		},
		
		 /**
	   * buildTopToolbar
	   */
	  buildTopToolbar : function() {
			return [{
				text:"查询",
				iconCls:"company_record_update",
				scope: this,
				handler:this.onSearch
			},
			{
					text:"证章证书颁发",
					iconCls:"company_record_edit",
					scope: this,
					handler:this.onEdit
			},
			{
					text:"删除证章证书",
					iconCls:"company_record_delete",
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
	
	  /**
	   * onAdd
	   */
	  onAdd : function() {
	      this.fireEvent('doedit', this, this.store, null);
	  },
	  onSearch : function() {
	      this.fireEvent('doSearch', this, this.store, null);
	  },
	  onEdit : function(){
		  var record = this.getSelectionModel().getSelected();
	      if (!record) {
	            return false;
	      }
	      this.fireEvent('doedit', this, this.store, record);
	  },
	  onUpdate:function() {
		  
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
				        	Ext.getCmp('com.cce.cert.CompanyCertMaster').store.remove(rows[i]);
				        }
				        Ext.getCmp('com.cce.cert.CompanyCertMaster').store.save();
					}
		      });
	  }
});

var orgStore=new Ext.data.Store({
	url:"info/enforceOrg!listBox4Org.action",
	reader: new Ext.data.JsonReader({ 
		root:'data',
		fields:['id','name']
	})

});

com.cce.cert.CompanyCertForm = Ext.extend(Ext.form.FormPanel, {
	title: '执法人员分级管理',
	modal:true,
	iconCls: 'silk-user',
	labelWidth: 100,
	width: 300,
	fileUpload : true,    
	method: 'POST',   
    fileType : null,
	height: 529,
	padding: 10,
	header: false,
	frame: true,
	region:'center',
	layout: 'form',
	autoScroll: true,
  // private A pointer to the currently loaded record
	record : null,

	initComponent : function() {
		// build the form-fields.  Always a good idea to defer form-building to a method so that this class can
	    // be over-ridden to provide different form-fields
	    this.items = this.buildForm();
	
	    // build form-buttons
	    this.buttons = this.buildUI();

	    this.addEvents({
	        afterSave : true
	    });	
	    // super
	    com.cce.cert.CompanyCertForm.superclass.initComponent.call(this);
	},
    scope:this,	
	
	/**
	 * buildform
	 * @private
	 */
	buildForm : function() {	
	    return [
					{
				            xtype: 'textfield',
				            fieldLabel: '企业名称',
						    anchor: '100%',
						    readOnly:true, 
				            id:'entName',
				            name:'entName'
				    },
                    {
                    	xtype : 'fileuploadfield',
                    	id: 'file',
            			name : 'upload',
            			emptyText : '请选择文件',
            			fieldLabel : '上传文件',
            			colspan:2,
            			buttonText : '浏 览',
            			width:400
                    },new Ext.form.Hidden({
			            name:"id",
			            id:'id',
			            hiddenName:'id'
			 	    }),new Ext.form.Hidden({
			            name:"fileId",
			            id:'fileId',
			            hiddenName:'id'
			 	    })
			    ]
	},  
	
	buildUI : function(){
	    return [{
				text:"提交",
				scope: this,
				handler:this.onSubmit
		  	}, {
		        text: '关闭',
		        handler: function(btn, ev){
		  			this.fireEvent('afterSave', this, null);
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
	},
	
	onUploadOk: function(f,o)
	{
		var thestore=Ext.getCmp('com.cce.cert.CompanyCertMaster').store;
		Ext.getCmp('fileId').setValue(o.result.message);
    	if(Ext.getCmp('id').getValue()==""){
    		thestore.add(new thestore.recordType(this.getForm().getValues()));
    	}else{
    		this.getForm().updateRecord(this.record);
    	}
    	thestore.save();
		thestore.reload();
        this.fireEvent('afterSave', this, null);
	},
	onSubmit : function(btn, ev) {
        if (!this.getForm().isValid()) {
            App.setAlert(false, "表单数据有错误.");
            return false;
        }
        if(Ext.getCmp('file').getValue()==""){
        	var thestore=Ext.getCmp('com.cce.cert.CompanyCertMaster').store;
        	if(Ext.getCmp('id').getValue()==""){
        		thestore.add(new thestore.recordType(this.getForm().getValues()));
        	}else{
        		this.getForm().updateRecord(this.record);
        	}
        	thestore.save();
    		thestore.reload();
            this.fireEvent('afterSave', this, null);
        }else{
        	this.getForm().submit( {
				url : 'upload/upload!upload.action',
				waitMsg : '正在上传文件...',
				scope : this,
				success : this.onUploadOk, 
	            failure: function(f,o){
	                App.setAlert(false, "上传失败." + o.result.message );
	                return false;
	            }
			});
        }
    }

});

var searchCompanyCertInfo = function() {
    if (!this.getForm().isValid()) {
        App.setAlert(false, "表单数据有错误.");
        return false;
    }
	Ext.getCmp('com.cce.cert.CompanyCertMaster').store.load({
		params : { 
			 	data:Ext.encode(this.getForm().getValues()),
			 	start:0,limit:20
		}
	}); 
	this.fireEvent('afterSearch', this, null);
}

com.cce.cert.CompanyCertSearchForm = Ext.extend(Ext.form.FormPanel, {
	title: '档案分级查询',
	modal:true,
	iconCls: 'silk-user',
	labelWidth: 100,
	width: 500,
	height: 1729,
	header: false,
	frame: true,
	region:'center',
	layout: 'tableform',
	layoutConfig:{
			columns:2,
			columnWidths: [0.5,0.5]
	},
	autoScroll: true,
    // private A pointer to the currently loaded record
	record : null,
  
	initComponent : function() {
	
		
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
			colspan:2,
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
	    com.cce.cert.CompanyCertSearchForm.superclass.initComponent.call(this);
	},
	

  /**
   * buildform
   * @private
   */
  buildForm : function() {	
		
      return [
				        {
				            xtype: 'textfield',
				            fieldLabel: '企业名称',
						    anchor: '100%',
						    colspan:2,
				            id:'entName',
				            name:'entName'
				        },
				        {
					    	   xtype:"datefield",
					            fieldLabel: '开始日期',
					    	   id:'beginDate',
					    	   allowBlank:false,
					           name:'beginDate',
					            format:'m/d/Y',
								anchor:"100%",
					           align:'left'
					    },
				        {
					    	   xtype:"datefield",
					            fieldLabel: '结束日期',
					    	   id:'endDate',
					    	   allowBlank:false,
					            name:'endDate',
					            format:'m/d/Y',
								anchor:"100%",
					           align:'left'
					    },
						this.regionTree,
						this.regionTree.hiddenRegionId
				    ]
  },  
 
  buildUI : function(){
      return [{
			text:"查询",
			scope: this,
			handler:searchCompanyCertInfo
	  	}, {
	        text: '关闭',
	        handler: function(btn, ev){
	  			this.fireEvent('afterSearch', this, null);
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
		this.master = new com.cce.cert.CompanyCertMaster({ store : this.store });
//		this.detail= new com.cce.cert.CompanyCertDetail({ store : this.store });
		this.frame= new com.cce.cert.CompanyCert();		
		
		
		//关联自定义事件
	    //this.relayEvents(this.store, ['destroy', 'save', 'update']);
		
		this.master.on('doedit', this.showForm, this);
		this.master.on('doSearch', this.showSearchForm, this);
		
		this.frame.add(this.master);
//		this.frame.add(this.detail);
		
  	this.main.add(this.frame);
  	this.main.doLayout();
  	this.store.load({params:{start:0,limit:20}}); 
	},
	showSearchForm : function(g, store, record){
		if(!record){
	        record = new store.recordType();
		}
		var form = new com.cce.cert.CompanyCertSearchForm();
		form.on('afterSearch', this.afterSave, this);
		this.newWin = new Ext.Window({
		    title: '企业信息查询',
		    closable:true,
		    width:480,
		    height:300,
		    constrain:true,
		    //border:false,
		    plain:true,
		    layout: 'border',
		    resizable:false,
		    autoScroll: true,
		    items: [form]
		});
		
		form.loadRecord(record);		
		this.newWin.show();
	},
	showForm : function(g, store, record){
		if(!record){
	        record = new store.recordType();
		}
		var form = new com.cce.cert.CompanyCertForm();
		this.newWin = new Ext.Window({
		    title: '企业管理',
		    closable:true,
		    width:600,
		    height:160,
		    constrain:true,
		    plain:true,
		    layout: 'border',
		    resizable:false,
		    autoScroll: true,
		    items: [form]
		});
		form.on('afterSave', this.afterSave, this);
		form.loadRecord(record);		
		this.newWin.show();
	},
	
	onSave : function(fp, record){		

		
	},

	afterSave : function(fp, record){
        this.newWin.close();
	}
});
