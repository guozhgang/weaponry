Ext.ns("com.cce.enforce");

//------------------------------------------------------------------------------
//Module的proxy定义..
//------------------------------------------------------------------------------
var proxy = new Ext.data.HttpProxy({
api: {
	    read : 'info/enforceOrg!list.action',
	    create : 'info/enforceOrg!save.action',
	    update: 'info/enforceOrg!save.action',
	    destroy: 'info/enforceOrg!delete.action'
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
	    	{name: 'zipCode',mapping:'zipCode'},
	    	{name: 'address',mapping:'address'},
	    	{name: 'tel',mapping:'tel'},
	    	{name: 'leader',mapping:'leader'},
	    	{name: 'leaderTel',mapping:'leaderTel'},
	    	{name: 'leaderMobile',mapping:'leaderMobile'},
	    	{name: 'master',mapping:'master'},
	    	{name: 'masterTel',mapping:'masterTel'},
	    	{name: 'masterFax',mapping:'masterFax'},
	    	{name: 'regionName',mapping:'regionName'},
		    {name: 'createDate',mapping:"createDate",type:'date',dateFormat:'time'}
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
    {header:'单位名称',dataIndex:'name'},
    {header:'所属地区',dataIndex:'regionName'},
    {header:'分管领导',dataIndex:'leader'},
    {header:'主管科室',dataIndex:'master'},
    {header:'联系电话',dataIndex:'tel'},
   	{header:'创建日期',dataIndex:'createDate',renderer:Ext.util.Format.dateRenderer('Y年m月d日 H时i分s秒'),sortable:true}
];


//------------------------------------------------------------------------------
//Module的company主Panel定义..
//------------------------------------------------------------------------------

com.cce.enforce.OrgEnforceOrg=Ext.extend(Ext.Panel,{
	id:'companylevel-input-main',
	loadMask: true,
	border: false,
	enableHdMenu: false,
	header:false,
	region:'center',
	closable:true,
	layout:"border"
});

com.cce.enforce.EnforceOrgForm = Ext.extend(Ext.form.FormPanel, {
	title: '管理机构基本信息',
	modal:true,
	iconCls: 'silk-user',
	labelAlign: 'right',
	labelWidth: 60,
	width: 480,
	height: 400,
	header: false,
	frame: true,
	region:'center',
	defaultType:'textfield',
    defaults: {
        anchor: '100%'
    },
    // private A pointer to the currently loaded record
    record : null,
    
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
	    com.cce.enforce.EnforceOrgForm.superclass.initComponent.call(this);
	},
	
    /**
     * buildform
     * @private
     */
    buildForm : function() {
        return [
			{
			    xtype: 'fieldset',
			    layout: 'form',
			    collapsible: false,
			    width: 480,
			    items: [
			        {
			            xtype: 'textfield',
			            fieldLabel: '单位名称',
				    	allowBlank:false,
			            anchor: '100%',
			            id:'name',
			            name:'name'
			        },
			        {
			            xtype: 'textfield',
			            fieldLabel: '邮编',
			            anchor: '100%',
				    	allowBlank:false,
			            id:'zipCode',
			            name:'zipCode'
			        },
			        {
			            xtype: 'textfield',
			            fieldLabel: '地址',
				    	allowBlank:false,
			            anchor: '100%',
			            id:'address',
			            name:'address'
			        },
			        {
			            xtype: 'textfield',
			            fieldLabel: '电话',
			            anchor: '100%',
				    	allowBlank:false,
			            id:'tel',
			            name:'tel'
			        }
			   ]
			},{
			    xtype: 'fieldset',
			    layout: 'form',
			    width: 480,
			    collapsible: false,
			    items: [
			        {
			            xtype: 'textfield',
			            fieldLabel: '分管领导',
			            anchor: '100%',
			            id:'leader',
			            name:'leader'
			        },
			        {
			            xtype: 'textfield',
			            fieldLabel: '固定电话',
			            anchor: '100%',
			            id:'leaderTel',
			            name:'leaderTel'
			        },
			        {
			            xtype: 'textfield',
			            fieldLabel: '手机',
			            anchor: '100%',
			            id:'leaderMobile',
			            name:'leaderMobile'
			        }
			   ]
			},{
			    xtype: 'fieldset',
			    layout: 'form',
			    width: 480,
			    collapsible: false,
			    items: [
			        {
			            xtype: 'textfield',
			            fieldLabel: '主管科室',
			            id:'master',
			            anchor: '100%',
			            name:'master'
			        },
			        {
			            xtype: 'textfield',
			            fieldLabel: '电话',
			            id:'masterTel',
			            anchor: '100%',
			            name:'masterTel'
			        },
			        {
			            xtype: 'textfield',
			            fieldLabel: '传真',
			            id:'masterFax',
			            anchor: '100%',
			            name:'masterFax'
			        }
			   ]
			}
        ];
    },
	
    buildUI : function(){
        return [{
			text:"保存",
			scope: this,
			handler:this.onSave
	  	}, {
            text: '取消',
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

com.cce.enforce.OrgEnforceOrgMaster = Ext.extend(Ext.grid.GridPanel, {
	  id:'com.cce.enforce.OrgEnforceOrgMaster',
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
		    com.cce.enforce.OrgEnforceOrgMaster.superclass.initComponent.call(this);
		    
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
			iconCls:"enforce_add",
			scope: this,
			handler:this.onAdd
	},
	{
			text:"修改",
			iconCls:"enforce_edit",
			scope: this,
			handler:this.onEdit
	},
	{
			text:"删除",
			iconCls:"enforce_delete",
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
				        	Ext.getCmp('com.cce.enforce.OrgEnforceOrgMaster').store.remove(rows[i]);
				        }
				        Ext.getCmp('com.cce.enforce.OrgEnforceOrgMaster').store.save();
					}
		      });
	  }
});


var store = new Ext.data.Store({
    id: 'id',
    message: 'message',
    proxy: proxy,
    reader: reader,
    writer: writer,  // <-- plug a DataWriter into the store just as you would a Reader
    autoSave: false
});

//------------------------------------------------------------------------------
//Module的定义放在最后,eval(xxx.js)后返回Module的类定义..
//------------------------------------------------------------------------------
Ext.extend(com.cce.Module, {
	win: null,
	init: function(){
		
		this.master = new com.cce.enforce.OrgEnforceOrgMaster({ store : store });
		this.frame= new com.cce.enforce.OrgEnforceOrg();		
		
		
		//关联自定义事件
	    //this.relayEvents(this.store, ['destroy', 'save', 'update']);
		
		this.master.on('doedit', this.showForm, this);
		this.master.on('rowclick', function(g, index, ev){
			this.record =g.store.getAt(index);
		}, this);
		
		this.frame.add(this.master);
		
  	this.main.add(this.master);
  	this.main.doLayout();
    store.load({params:{start:0,limit:20}}); 
	},

	showForm : function(g, store, record){
		if(!record){
	        record = new store.recordType();
		}
		var form = new com.cce.enforce.EnforceOrgForm();
		this.win = new Ext.Window({
		    title: '执法机构信息',
		    closable:true,
		    width:510,
		    height:430,
		    constrain:true,
		    //border:false,
		    plain:true,
		    modal:true,
		    layout: 'border',
		    items: [form]
		});
		
		form.on('save', this.onSave, this);
		form.on('afterSave', this.afterSave, this);
		form.loadRecord(record);		
		
		this.win.show();
	},
	
	onSave : function(fp, record){
		var isTel=false;
		var isLeaderTel=false;
		var isLeaderMobile=false;
		var isMasterTel=false;
		var isMasterFax=false;
	
		if(this.isPhone(Ext.getCmp('tel').getValue())){
			isTel=true;
		}else{
			isTel=false;
			Ext.getCmp('tel').markInvalid( "电话号码不正确 (0531-XXXXXXX)");
		}
		if(this.isPhone(Ext.getCmp('leaderTel').getValue())){
			isLeaderTel=true;
		}else{
			isLeaderTel=false;
			Ext.getCmp('leaderTel').markInvalid( "电话号码不正确 (0531-XXXXXXX)");
		}
		if(this.isMobilePhone(Ext.getCmp('leaderMobile').getValue())){
			isLeaderMobile=true;
		}else{
			isLeaderMobile=false;
			Ext.getCmp('leaderMobile').markInvalid( "手机号码不正确");
		}
		if(this.isPhone(Ext.getCmp('masterTel').getValue())){
			isMasterTel=true;
		}else{
			isMasterTel=false;
			Ext.getCmp('masterTel').markInvalid( "电话号码不正确 (0531-XXXXXXX)");
		}
		if(this.isPhone(Ext.getCmp('masterFax').getValue())){
			isMasterFax=true;
		}else{
			isMasterFax=false;
			Ext.getCmp('masterFax').markInvalid( "传真号码不正确 (0531-XXXXXXX)");
		}
		if(isTel&&isLeaderTel&&isLeaderMobile&&isMasterTel&&isMasterFax)
		{
			fp.getForm().updateRecord(record);
	        if(record.data.id == null){
	        	 store.add(record);
	        }        
	        store.save();
	        var i=0;
    		store.on('save',function(store,batch,data){
    			i++;
    			if(i==1)
    			{
    				
    				store.load({params:{start:0,limit:20}});
    			}
    			
    		});
	        this.win.close();
		}
        //this.store.reload();
	},
	isMobilePhone:function(s){
    	var regex = /^(13[0-9]|15[0|1|3|6|7|8|9]|18[8|9])\d{8}$/;
    	
    	if(s=='')
    	{
    		return true;
    	}
    	else
    	{
    	
	    	if (!regex.exec(s)){	    	 
	    		return false;
	    	}else{
	    		return true ;
	    	}
    	}
    			
    },
    isPhone:function(s){
    	var regex = /^(\d{3,4}-)?\d{7,8}$/ ;
    	if(s=='')
    	{
    		return true;
    	}
    	else
    	{
    	    
	    	if (!regex.exec(s)){	    		
	    		return false;
	    	}else{
	    		return true ;
	    	}
    	}
    	
    },
    afterSave:function(fp, record){
    	this.win.close();
    }
    
});
