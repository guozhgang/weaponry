Ext.ns("com.cce.companyinno");
ScriptMgr.load({ scripts: ['javascript/utils/SearchField.js']});

//------------------------------------------------------------------------------
//Module的proxy定义..
//------------------------------------------------------------------------------
var proxy = new Ext.data.HttpProxy({
api: {
	    read : 'record/companyRecord!list.action',
	    create : 'record/companyRecord!save.action',
	    destroy: 'record/companyRecord!delete.action'
	}
});

//------------------------------------------------------------------------------
//Module的reader定义..
//------------------------------------------------------------------------------
var reader = new Ext.data.JsonReader(
	{root:'data'},
	[ 
	    	{name: 'id',mapping:"id"},
	    	{name: 'approval_dept ',mapping:'approval_dept'},
	    	{name: 'education',mapping:'education'},
	    	{name: 'name',mapping:'name'}
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
	{header:'无害化编号',dataIndex:'id'},
	{header:'企业名称',dataIndex:'name'},
	{header:'无害化类型',dataIndex:'education'},
	{header:'创建时间',dataIndex:'approval_dept'}
];

//------------------------------------------------------------------------------
//Module的company主Panel定义..
//------------------------------------------------------------------------------

com.cce.companyinno.CompanyInnoInput=Ext.extend(Ext.Panel,{
	id:'CompanyInnoInput',
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

com.cce.companyinno.CompanyInnoInputMaster = Ext.extend(Ext.grid.GridPanel, {
	  id:'com.cce.companyinno.CompanyInnoInputMaster',
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
		    com.cce.companyinno.CompanyInnoInputMaster.superclass.initComponent.call(this);
		    
		    this.addEvents(
		    	'doedit'
		    );
		},
		
		 /**
	   * buildTopToolbar
	   */
	  buildTopToolbar : function() {
		return [{
				text:"新建",
				iconCls:"company_record_add",
				scope: this,
				handler:this.onAdd
    	},
    	{
				text:"提交",
				iconCls:"company_record_update",
				scope: this,
				handler:this.onUpdate
		},
		{
				text:"修改",
				iconCls:"company_record_edit",
				scope: this,
				handler:this.onEdit
		},
		{
				text:"删除",
				iconCls:"company_record_delete",
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
				        	Ext.getCmp('com.cce.companyinno.CompanyInnoInputMaster').store.remove(rows[i]);
				        }
				        Ext.getCmp('com.cce.companyinno.CompanyInnoInputMaster').store.save();
					}
		      });
	  }
});

//------------------------------------------------------------------------------
//Module的RecordExpertMore内容Panel定义..
//------------------------------------------------------------------------------

com.cce.companyinno.CompanyInnoInputDetail=Ext.extend(Ext.Panel ,{
	 id:'CompanyInnoInputDetail',
	 region:'south',
	 height:260,
	 title:'详细信息',
	 split:true,
	 bodyStyle: 'padding: 10px; font-family: Arial; font-size: 12px;',
	 
	initComponent: function(store){
	

		this.stroe = store;
		com.cce.companyinno.CompanyInnoInputDetail.superclass.initComponent.call(this);
		
		 
	}	  
	
});
//Module无害化类型加载panel定义
com.cce.companyinno.CompanyInnoType=Ext.extend(Ext.Panel,{
	id:'CompanyInnoType',
	region:'center',
	header:false,
	frame:true,
	defaultType:'textfield',
	defaults:{anchor:'100%'
		},
		record:null,
		initComponect:function(){
			this.items=this.buildForm();
			this.buttons=this.buildUI();
			com.cce.companyinno.CompanyInnoType.superclass.initComponent.call(this);
		},
		buildForm:function(){
			xtype:"textfield"
			 
		}
});
//----------------------新增无害化处理
com.cce.companyinno.CompanyInnoForm = Ext.extend(Ext.form.FormPanel,{
	title: '申请无害化',
	modal:true,
	labelAlign:'right',
	labelWidth:90,
	header:false,
	frame:true,
	region:'center',
	layout:"absolute",
//	defaults:{anchor:'100%'
//		},
		record:null,
		initComponent : function(){
			this.hiddenGroup=new Ext.form.Hidden({
			name:"groups",
			id:'companyinno-group',
			hiddenName:'groups'
				
		});
		this.hiddenAreaid=new Ext.form.Hidden({
			name:"areaid",
			id:'companyinno-areaid',
			hiddenName:'areaid'
		});
		this.items=this.buildForm();
		this.buttons=this.buildUI();
this.addEvents({
	save:true,
	drafts:true
});
com.cce.companyinno.CompanyInnoForm.superclass.initComponent.call(this);
},
buildForm:function(){
	return[
	          {
					xtype:"label",
					text:"企业名称:",
					x:10,
					y:10,
					width:60
		       },
		       {
		    	   xtype:"textfield",
		    	   id:'companyname',
		    	   regex:/^(?:[\u4e00-\u9fa5]*\w*\s*)+$/,
		    	   regxeText:"请不要输入非法字符",
		    	   width:180,
		           align:'left',
		           x:80,
		           y:8
		       },
		       {
					xtype:"label",
					text:"类型:",
					x:300,
					y:10,
					width:60
		       },
		       {
		    	   xtype:'combo',
		    	   mode:'local',
		    	   width:150,
                   emptyText:'请选择无害化类型',
                   displayField:'wuhaihua',
                   valueField:'type',
                   store:new Ext.data.SimpleStore({
             fields:['wuhaihua','type'],
             data:[[[''],'待宰前无害化处理'],['病害猪产品无害化'],['病害猪无害化处理'],['病害猪月统计报表'],['病害猪损失补贴']]
             }),

		    	   x:360,
		    	   y:8,
		    	   align:'right',
		    	   
		    	   triggerAction:'all',

		    		   selectOnFocus:'true'
		       },
		       {
					xtype:"panel",
					title:"病害猪损失补贴申请",
					x:0,
					y:50,
					anchor:'100%',
					width:'100%',
					height:300,
					layout:"absolute",
					items:[
						{
							xtype:"label",
							text:"姓名:",
							x:40,
							y:30
						},
						{
					    	   xtype:"textfield",
					    	   id:'name',
					    	   regex:/^(?:[\u4e00-\u9fa5]*\w*\s*)+$/,
					    	   regxeText:"请不要输入非法字符",
					    	   width:90,
					           align:'left',
					           x:120,
					           y:25
					    },
						{
							xtype:"label",
							text:"联系电话:",
							x:280,
							y:30
						},
						{
					    	   xtype:"textfield",
					    	   id:'tel',
					    	   regex:/^(?:[\u4e00-\u9fa5]*\w*\s*)+$/,
					    	   regxeText:"请不要输入非法字符",
					    	   width:90,
					           align:'left',
					           x:350,
					           y:25
					    },
						{
							xtype:"label",
							text:"手机:",
							x:40,
							y:60
						},
						{
					    	   xtype:"textfield",
					    	   id:'molible',
					    	   regex:/^(?:[\u4e00-\u9fa5]*\w*\s*)+$/,
					    	   regxeText:"请不要输入非法字符",
					    	   width:90,
					           align:'left',
					           x:120,
					           y:55
					    },
						{
							xtype:"label",
							text:"户名:",
							x:280,
							y:60
						},
						{
					    	   xtype:"textfield",
					    	   id:'bankname',
					    	   regex:/^(?:[\u4e00-\u9fa5]*\w*\s*)+$/,
					    	   regxeText:"请不要输入非法字符",
					    	   width:90,
					           align:'left',
					           x:350,
					           y:55
					    },
						{
							xtype:"label",
							text:"开户行:",
							x:40,
							y:90
						},
						{
					    	   xtype:"textfield",
					    	   id:'bank',
					    	   regex:/^(?:[\u4e00-\u9fa5]*\w*\s*)+$/,
					    	   regxeText:"请不要输入非法字符",
					    	   width:90,
					           align:'left',
					           x:120,
					           y:85
					    },
						{
							xtype:"label",
							text:"帐号:",
							x:280,
							y:90
						},
						{
					    	   xtype:"textfield",
					    	   id:'num',
					    	   regex:/^(?:[\u4e00-\u9fa5]*\w*\s*)+$/,
					    	   regxeText:"请不要输入非法字符",
					    	   width:90,
					           align:'left',
					           x:350,
					           y:85
					    },
						{
							xtype:"label",
							text:"补贴时间:",
							x:40,
							y:120
						},
						{
					    	   xtype:"datefield",
					    	   id:'startdate',
					    	   regex:/^(?:[\u4e00-\u9fa5]*\w*\s*)+$/,
					    	   regxeText:"请不要输入非法字符",
					    	   width:90,
					           align:'left',
					           x:120,
					           y:115
					    },
						{
							xtype:"label",
							text:"补贴头数:",
							x:280,
							y:120
						},
						{
					    	   xtype:"textfield",
					    	   id:'count',
					    	   regex:/^(?:[\u4e00-\u9fa5]*\w*\s*)+$/,
					    	   regxeText:"请不要输入非法字符",
					    	   width:90,
					           align:'left',
					           x:350,
					           y:115
					    },
						{
							xtype:"label",
							text:"补贴金额:",
							x:40,
							y:150
						},
						{
					    	   xtype:"textfield",
					    	   id:'money',
					    	   regex:/^(?:[\u4e00-\u9fa5]*\w*\s*)+$/,
					    	   regxeText:"请不要输入非法字符",
					    	   width:90,
					           align:'left',
					           x:120,
					           y:145
					    },
						{
							xtype:"label",
							text:"商务主管部门:",
							x:40,
							y:180
						},
						{
					    	   xtype:"textfield",
					    	   id:'manager',
					    	   regex:/^(?:[\u4e00-\u9fa5]*\w*\s*)+$/,
					    	   regxeText:"请不要输入非法字符",
					    	   width:90,
					           align:'left',
					           x:120,
					           y:178
					    },
						{
							xtype:"label",
							text:"财务主管部门:",
							x:40,
							y:210
						},
						{
					    	   xtype:"textfield",
					    	   id:'moneymag',
					    	   fieldLabel:'财务',
					    	   regex:/^(?:[\u4e00-\u9fa5]*\w*\s*)+$/,
					    	   regxeText:"请不要输入非法字符",
					    	   width:90,
					           align:'left',
					           x:120,
					           y:205
					    }
					]
				}

          ];
},
 
 loadRecord : function(rec) {
    this.record = rec;
    this.getForm().loadRecord(this.record);
}, 
 
buildUI:function(){
	return[{
		text:"保存",
		scope:this,
		handler:this.onSave
	},
	{
		text:'重置',
		handler:function(btn,ev){
		this.getForm().reset();
	},
	scope:this
	}
	];
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
},
onDrafts : function(btn, ev){
	  if (this.record == null) {
        return;
    }
    if (!this.getForm().isValid()) {
        App.setAlert(false, "表单数据有错误.");
        return false;
    }
    this.fireEvent('drafts', this, this.record);
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
		this.master = new com.cce.companyinno.CompanyInnoInputMaster({ store : this.store });
		this.detail= new com.cce.companyinno.CompanyInnoInputDetail({ store : this.store });
		this.frame= new com.cce.companyinno.CompanyInnoInput();		
		
		
		//关联自定义事件
	    //this.relayEvents(this.store, ['destroy', 'save', 'update']);
		
		this.master.on('doedit', this.showForm, this);
		
		this.frame.add(this.master);
		this.frame.add(this.detail);
		
  	this.main.add(this.frame);
  	this.main.doLayout();
  	this.store.load({params:{start:0,limit:20}}); 
	},
	
	showForm : function(g, store, record){
		if(!record){
			record=new store.recordType({});
		}
		var form=new com.cce.companyinno.CompanyInnoForm();
		this.win=new Ext.Window({
			title:'申请无害化处理',
			closable:true,
		    width:614,
		    height:440,
		    modal:true,
		    constrain:true,
		    plain:true,
		    layout: 'border', 
		    items:[form]
		});
		this.win.show(); 
	},

 
	
	showReForm : function(g, store, record){
		
		
	},
	
	onSave : function(fp, record){		

		
	}
	
});
