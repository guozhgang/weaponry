/*ScriptMgr.load({ scripts: [ 'javascript/utils/LovCombo.js']});*/

Ext.ns("com.cce.role");
//------------------------------------------------------------------------------
//Module的proxy定义..
//------------------------------------------------------------------------------
var proxy = new Ext.data.HttpProxy({
  api: {
	    read : 'security/role!list.action',
	    create : 'security/role!save.action',
	    update: 'security/role!save.action',
	    destroy: 'security/role!delete.action'
	}
});

//------------------------------------------------------------------------------
//Module的reader定义..
//------------------------------------------------------------------------------
var reader = new Ext.data.JsonReader(
      {root:'data'},
      [ 
          	{name: 'id',mapping:"id"},
          	{name: 'name',mapping:"name"},
          	{name: 'authority',mapping:"authority"},
          	{name: 'authNames',mapping:'authNames'},
          	{name: 'aut_id',mapping:'aut_id'},
          	{name: 'menuNames',mapping:'menuNames'},
          	{name: 'menuList',mapping:'menuList'},
          	{name: 'menuIDs',mapping:'menuIDs'}
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
    {header:'分组名称', dataIndex:'name', sortable:true},
	{header:'权限名称',dataIndex:'menuNames'}
];

//------------------------------------------------------------------------------
//form-autCombox的store定义
//------------------------------------------------------------------------------
var autStore=new Ext.data.Store({
	url:"security/menu!rootMenus.action",
	reader: new Ext.data.JsonReader({ 
		root:'data',
		fields:['id','text','checked']
	})

});
//------------------------------------------------------------------------------
//Module的RoleGrid定义..
//------------------------------------------------------------------------------
com.cce.role.RoleGrid = Ext.extend(Ext.grid.GridPanel, {
  id:'com.cce.role.RoleGrid',
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
	    com.cce.role.RoleGrid.superclass.initComponent.call(this);
	    
	    this.addEvents(
	    	'doedit'
	    );
	    
	    
	},
	
	 /**
   * buildTopToolbar
   */
  buildTopToolbar : function() {
      return [{
				text:"添加分组",
				iconCls:"group_add",
				scope: this,
				handler:this.onAdd
    	},
    	{
				text:"修改分组",
				iconCls:"group_edit",
				scope: this,
				handler:this.onEdit
    	},
		{
				text:"删除分组",
				iconCls:"group_delete",
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
      Ext.Msg.confirm('确认删除', '你确定删除该条记录?', function(btn) {
			if (btn == 'yes') {
				Ext.getCmp('com.cce.role.RoleGrid').store.remove(selected);
				Ext.getCmp('com.cce.role.RoleGrid').store.save();
			}
      });
  }
});





//------------------------------------------------------------------------------
//Module的RoleForm定义..
//------------------------------------------------------------------------------
com.cce.role.RoleForm = Ext.extend(Ext.form.FormPanel, {
	title: '分组信息',
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
	   
	   

	   //带Checkbox的Combobox

	   this.lc = new Ext.ux.form.LovCombo({
		   id:"menuList",
	   	   name:"menuList",
	   	   fieldLabel:"选择权限",
	   	   store:autStore,
	   	   mode:'local',
	   	   triggerAction:'all',
	   	   hideTrigger:false,
	   	   allowBlank:false,
	   	   displayField:'text',
	   	   valueField:'id',
	   	   emptyText:'请选择权限',
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
	        save : true,
	        afterSave : true
	    });
	
	    // super
	    com.cce.role.RoleForm.superclass.initComponent.call(this);
	    
	    
	    
	},
	

  /**
   * buildform
   * @private
   */
  buildForm : function() {	

      return [
              {fieldLabel: '分组名称', name: 'name', allowBlank: false},               
              this.lc
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
	this.grid = new com.cce.role.RoleGrid({ store : this.store });
	
	//关联自定义事件
    //this.relayEvents(this.store, ['destroy', 'save', 'update']);
	
	this.grid.on('doedit', this.showForm, this);
	this.grid.on('rowclick', function(g, index, ev){
		this.record =g.store.getAt(index);
	}, this);
	
  	this.main.add(this.grid);
  	this.main.doLayout();
  	this.store.load({params:{start:0,limit:20}}); 
},

showForm : function(g, store, record){
	autStore.load({
		 scope:this,
		 callback : function(r, options, success) {  
				
			  var menuIDs=record.get("menuIDs");
			  
			  if(menuIDs!=null&&menuIDs!="") {				  
				    
				     
					Ext.getCmp("menuList").setValue(menuIDs.replace(/(^\s*)|(\s*)|(\s*$)/g,''));
				   
			  }
				 				 
	     }
	});
	
	if(!record){
        record = new store.recordType({
        	 
        });
	}
	
	
	
	var form = new com.cce.role.RoleForm();
	this.win = new Ext.Window({
	    title: '分组信息',
	    closable:true,
	    width:300,
	    height:150,
	    constrain:true,
	    //border:false,
	    plain:true,
	    layout: 'border',
	    modal:true,
	    items: [form]
	});
	
	form.on('save', this.onSave, this);
	form.on('afterSave', this.afterSave, this);
	form.loadRecord(record);		
	
	this.win.show();
},

onSave : function(fp, record){
	fp.getForm().updateRecord(record);
    if(record.data.id == null){
    	this.store.add(record);
    }
    this.store.save();
    this.win.close();
    //this.store.reload();
},
afterSave : function(fp, record){
    this.win.close();
}

});
 