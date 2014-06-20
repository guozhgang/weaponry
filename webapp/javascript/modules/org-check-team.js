Ext.ns("com.cce.members");
ScriptMgr.load({ scripts: ['javascript/utils/SearchField.js',
                           'javascript/utils/MultiSelect.js',
                           'javascript/utils/ItemSelector.js']});

//------------------------------------------------------------------------------
//Module的proxy定义..
//------------------------------------------------------------------------------
var proxy = new Ext.data.HttpProxy({
api: {
    read : 'info/checkTeam!list.action',
    create : 'info/checkTeam!save.action',
    update: 'info/checkTeam!save.action',
    destroy: 'info/checkTeam!delete.action'
}
});

var proxy_detail = new Ext.data.HttpProxy({
	api: {
		    read : 'info/checkTeam!findExpertByTeamId.action',
		    create : 'info/checkTeam!save.action',
		    update: 'info/checkTeam!save.action',
		    destroy: 'info/checkTeam!delete.action'
		}
	});

//------------------------------------------------------------------------------
//Module的reader定义..
//------------------------------------------------------------------------------
var reader = new Ext.data.JsonReader(
	{root:'data'},
	[ 
	    	{name: 'id',mapping:"id"},
	    	{name: 'name',mapping:'name'},
	    	{name: 'count',mapping:'count'},
	    	{name: 'members',mapping:'members'},
		    {name: 'createDate',mapping:"createDate",type:'date',dateFormat:'time'},
	    	{name: 'createBy',mapping:'createBy'},
	    	{name: 'regionName',mapping:'regionName'}
	]
);

var reader_detail = new Ext.data.JsonReader(
		{root:'data'},
		[ 
		 	{name: 'id',mapping:"id"},
			{name: 'address',mapping:'address'},
			{name: 'certificate',mapping:'certificate'},
		    {name: 'createDate',mapping:"createDate",type:'date',dateFormat:'time'},
			{name: 'duty',mapping:'duty'},
			{name: 'mail',mapping:'mail'},
			{name: 'mobile',mapping:'mobile'},
			{name: 'name',mapping:'name'},
			{name: 'zipcode',mapping:'zipcode'},
			{name: 'resumeInfo',mapping:'resumeInfo'},
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

//------------------------------------------------------------------------------
//Module的columns定义..
//------------------------------------------------------------------------------
var columns = [
    new Ext.grid.CheckboxSelectionModel(), 
    {header:'组名',dataIndex:'name'},
    {header:'成员数',dataIndex:'count'},
    {header:'创建日期',dataIndex:'createDate',renderer:Ext.util.Format.dateRenderer('Y年m月d日 H时i分s秒'),sortable:true}
];

var columns_detail = [
                      new Ext.grid.CheckboxSelectionModel(), 
                      {header:'姓名',dataIndex:'name'},
                      {header:'证书',dataIndex:'certificate'},
                      {header:'联系电话',dataIndex:'mobile'},
                      {header:'职务',dataIndex:'duty'},
                      {header:'创建日期',dataIndex:'createDate',renderer:Ext.util.Format.dateRenderer('Y年m月d日 H时i分s秒'),sortable:true}
                     ];

//------------------------------------------------------------------------------
//Module的company主Panel定义..
//------------------------------------------------------------------------------

com.cce.members.OrgCheckTeam=Ext.extend(Ext.Panel,{
	id:'OrgCheckTeam',
	loadMask: true,
	border: false,
	enableHdMenu: false,
	header:false,
	region:'center',
	closable:true,
	layout:"border",
	frame: true
});


com.cce.members.CheckTeamForm = Ext.extend(Ext.form.FormPanel, {
	title: '审核专家基本信息',
	modal:true,
	iconCls: 'silk-user',
	header: false,
	frame: true,
	region:'center',
	layout: 'form',
    // private A pointer to the currently loaded record
    record : null,
    available : null,
    obtained : null,
    
    initComponent : function() {
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
	    com.cce.members.CheckTeamForm.superclass.initComponent.call(this);
	},
	
    /**
     * buildform
     * @private
     */
	  buildForm : function() {
	  		var hiddenId = new Ext.form.Hidden({name:"id"});
	      	return [
				{
		            xtype: 'textfield',
		            fieldLabel: '组     名 ',
			    	allowBlank:false,
		            anchor: '100%',
		            id:'name',
		            name:'name'
		        },
//				{
//		            xtype: 'numberfield',
//					decimalPrecision : 1,
//		            fieldLabel: '成员数 ',
//			    	allowBlank:false,
//					maxLength : 1,
//		            anchor: '100%',
//		            id:'count',
//		            name:'count'
//		        },
				{
					xtype: 'itemselector',
					name: 'members',
					fieldLabel: '组成员',
					imagePath: 'js/ext/ux/images',
					multiselects: [{
						legend:"未选成员",
						store: this.available,
						width: 200,
						height: 200,
						valueField: 'id',
						displayField: 'value'
					},{
						legend:"组成员",
						store: this.obtained,
						width: 200,
						height: 200,
						valueField: 'id',
						displayField: 'value'
					}]
				}
			];
	  },
	
    buildUI : function(){
        return [{
			text:"保存",
			scope: this,
			handler:this.onSave
	  	}, {
            text: '关闭',
            handler: function(btn, ev){
	  		//this.win.close();
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
//Module的CompanyRecordGrid定义..
//------------------------------------------------------------------------------

com.cce.members.OrgCheckTeamMaster = Ext.extend(Ext.grid.GridPanel, {
	  id:'com.cce.members.OrgCheckTeamMaster',
	  stripeRows: true,
	  loadMask: true,
	  border: false,
	  enableHdMenu: false,
	  header:false,
	  region:'center',
	  closable:true,
	  frame: true,
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
		    com.cce.members.OrgCheckTeamMaster.superclass.initComponent.call(this);
		    
		    this.addEvents(
		    	'doedit'
		    );
		},
		
		 /**
	   * buildTopToolbar
	   */
	  buildTopToolbar : function() {
			return [{
				text:"新增",
				iconCls:"team_add",
				scope: this,
				handler:this.onAdd
		},
		{
				text:"修改",
				iconCls:"team_edit",
				scope: this,
				handler:this.onEdit
		},
		{
				text:"删除",
				iconCls:"team_delete",
				scope: this,
				handler:this.onDelete
		},			
		new Ext.Toolbar.Fill(),
		'过滤: ', ' ', 					
		new Ext.ux.form.SearchField({
	                	store: this.store,
	                	width:150
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
	
	  /**
	   * onAdd
	   */
	  onAdd : function() {
	      this.fireEvent('doedit', this, this.store, null);
	  },
	  onEdit : function(){
		  var record = this.getSelectionModel().getSelected();
	      if (!record) {
	            return false;
	      }
	      this.fireEvent('doedit', this, this.store, record);
	  },
	  onUpdate:function() {
		  fp.getForm().updateRecord(record);
	        if(record.data.id == null){
	        	this.store.add(record);
	        }
	        this.store.save();
	        this.store.on('save',function(s,b,d){
		    	this.store.load({params:{start:0,limit:20}});
		    },this);
	        this.win.close();
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
				        	Ext.getCmp('com.cce.members.OrgCheckTeamMaster').store.remove(rows[i]);
				        }
				        Ext.getCmp('com.cce.members.OrgCheckTeamMaster').store.save();
					}
		      });
	  }
});

//------------------------------------------------------------------------------
//Module的RecordExpertMore内容Panel定义..
//------------------------------------------------------------------------------

com.cce.members.OrgCheckTeamDetail=Ext.extend(Ext.grid.GridPanel ,{
	  stripeRows: true,
	  loadMask: true,
	  border: false,
	  enableHdMenu: false,
	  header:false,
	  region:'south',
	  closable:true,
	  height:260,
	  split:true,
	  frame: true,
	  columns:columns_detail,
	
	  initComponent : function() {
		    // typical viewConfig
		    this.viewConfig = {
		        forceFit: true
		    };
		    this.addEvents(
		      'afterSave'		
		    );
		    // super
		    com.cce.members.OrgCheckTeamDetail.superclass.initComponent.call(this);
		    
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
		this.store_detail = new Ext.data.Store({
		    id: 'id',
		    message: 'message',
		    proxy: proxy_detail,
		    reader: reader_detail,
		    writer: writer,  // <-- plug a DataWriter into the store just as you would a Reader
		    autoSave: false
		  });
		this.master = new com.cce.members.OrgCheckTeamMaster({ store : this.store });
		this.detail= new com.cce.members.OrgCheckTeamDetail({ store : this.store_detail });
		this.frame= new com.cce.members.OrgCheckTeam();		
		
		
		//关联自定义事件
	    //this.relayEvents(this.store, ['destroy', 'save', 'update']);
		
		this.master.on('doedit', this.showForm, this);
		this.master.on('rowclick', function(g, index, ev){
			this.record =g.store.getAt(index);
			this.store_detail.load({
    			params : { 
     			 	data:this.record.get("id")
     			}
    		}); 
		}, this);
		this.frame.add(this.master);
		this.frame.add(this.detail);
		
  	this.main.add(this.frame);
  	this.main.doLayout();
  	this.store.load({params:{start:0,limit:20}}); 
	},

	showForm : function(g, store, record){
		if(!record){
	        record = new store.recordType();
		}//同步调用取得json数据
  		Ext.Ajax.request({
			async:false,
			url : 'info/checkTeam!getMemberChoice.action',
			scope:this,
			params : { data : record.id?record.id: null },
			success: function(response, opts) {
				var json = Ext.util.JSON.decode(response.responseText);
		  		this.available = new Ext.data.ArrayStore({ data: json.available, fields: ['id', 'value'] });
		  		this.obtained = new Ext.data.ArrayStore({ data: json.obtained, fields: ['id', 'value'] });
			},
			failure : function(response, opts) {
				App.setAlert(false, "服务器通信错误,请重试.");
				return false;
			}
		});
		var form = new com.cce.members.CheckTeamForm({
			record:record,
			available: this.available,
			obtained: this.obtained
		});
		this.win = new Ext.Window({
		    title: '审核专家信息',
		    closable:true,
		    width:580,
		    height:350,
		    constrain:true,
		    //border:false,
		    plain:true,
		    modal:true,
		    layout: 'border',
		    items: [form]
		});
		
		form.on('save', this.onSave, this);
		
		form.loadRecord(record);		
		
		this.win.show();
		form.on('afterSave', this.afterSave, this);
	},
	afterSave:function(fp, record){
		this.win.close();
	},
	showReForm : function(g, store, record){
		
		
	},

	onSave : function(fp, record){
		fp.getForm().updateRecord(record);
        if(record.data.id == null){
        	this.store.add(record);
        }
        this.store.save();
        this.store.on('save',function(s,b,d){
	    	this.store.load({params:{start:0,limit:20}});
	    },this);
        this.win.close();
        //this.store.reload();
	}
});
