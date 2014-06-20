Ext.ns("com.cce.enforce");
ScriptMgr.load({ scripts: ['javascript/utils/FormTableLayout.js']});

//------------------------------------------------------------------------------
//Module的proxy定义..
//------------------------------------------------------------------------------
var proxy = new Ext.data.HttpProxy({
api: {
    read : 'info/enforceOfficer!list.action',
    create : 'info/enforceOfficer!save.action',
    update: 'info/enforceOfficer!save.action',
    destroy: 'info/enforceOfficer!delete.action'
	}
});
var proxy_enf_badge_de = new Ext.data.HttpProxy({
	api: {
				read : 'info/enforceOfficer!listBadge.action'
		     
		}
});
var reader_enf_badge_de = new Ext.data.JsonReader(
		{root:'data'},
		[ 
		    	{name: 'id',mapping:"id"},
		    	{name: 'tid',mapping:'tid'},
		    	{name: 'fileId',mapping:'fileId'},
		    	{name: 'tname',mapping:'tname'},
		    	{name: 'name',mapping:'name'},
		    	{name: 'description',mapping:'description'},
		    	{name: 'expireDate',mapping:'expireDate',type:'date',dateFormat:'time'},
		    	{name: 'createDate',mapping:'createDate',type:'date',dateFormat:'time'}
		    	
		]
);
var columns_enf_badge_de = [
     new Ext.grid.CheckboxSelectionModel(), 
     {header:'证书名称',dataIndex:'tname'},  
     {header:'创建时间',dataIndex:'createDate',renderer:Ext.util.Format.dateRenderer('Y年m月d日 H时i分s秒'),sortable:true} 
                       	
];
//------------------------------------------------------------------------------
//Module的reader定义..
//------------------------------------------------------------------------------
var reader = new Ext.data.JsonReader(
	{root:'data'},
	[ 
	    	{name: 'id',mapping:"id"},
			{name: 'fileId',mapping:'fileId'},
	    	{name: 'duty',mapping:'duty'},
	    	{name: 'name',mapping:'name'},
	    	{name: 'issueAuth',mapping:'issueAuth'},
	    	{name: 'orgId',mapping:'orgId'},
	    	{name: 'orgName',mapping:'orgName'},
	    	{name: 'issueNo',mapping:'issueNo'},
	    	{name: 'mobile',mapping:'mobile'},
	    	{name: 'regionName',mapping:'regionName'},
		    {name: 'createDate',mapping:"createDate",type:'date',dateFormat:'time'},
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
    {header:'姓名',dataIndex:'name'},
    {header:'所属地区',dataIndex:'regionName'},
    {header:'机构名称',dataIndex:'orgName'},
    {header:'职务',dataIndex:'duty'},   
    {header:'发证机关',dataIndex:'issueAuth'},
    {header:'创建日期',dataIndex:'createDate',renderer:Ext.util.Format.dateRenderer('Y年m月d日 H时i分s秒'),sortable:true}
];


//------------------------------------------------------------------------------
//Module的company主Panel定义..
//------------------------------------------------------------------------------

com.cce.enforce.OrgEnforceOfficer=Ext.extend(Ext.Panel,{
	id:'OrgEnforceOfficer',
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

com.cce.enforce.OrgEnforceOfficerMaster = Ext.extend(Ext.grid.GridPanel, {
	  id:'com.cce.enforce.OrgEnforceOfficerMaster',
	  stripeRows: true,
	  loadMask: true,
	  border: false,
	  enableHdMenu: false,
	  header:false,
	  region:'center',
	  closable:true,
	  columns:columns,
	  sm : new Ext.grid.CheckboxSelectionModel(),
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
		    com.cce.enforce.OrgEnforceOfficerMaster.superclass.initComponent.call(this);
		    
		    this.addEvents(
		    	'doedit',
		    	'doBadge',
		    	'doAll'
		    );
		},
		
		 /**
	   * buildTopToolbar
	   */
	  buildTopToolbar : function() {
			return [{
				text:"新增",
				iconCls:"expert_add",
				scope: this,
				handler:this.onAdd
		},
		{
				text:"修改",
				iconCls:"expert_edit",
				scope: this,
				handler:this.onEdit
		},
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
		},
		{
				text:"证书管理",
				iconCls:"company_enforce_update",
				scope: this,
				handler:this.onBadge
		},
		{
				text:"删除",
				iconCls:"expert_delete",
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
	  onAll : function() {
	      this.fireEvent('doAll', this, this.store, null);
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
	  onBadge:function() {
		  var record = this.getSelectionModel().getSelected();
	      if (!record) {
	            return false;
	      }
	      this.fireEvent('doBadge', this, this.store, record);
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
				        	Ext.getCmp('com.cce.enforce.OrgEnforceOfficerMaster').store.remove(rows[i]);
				        }
				        Ext.getCmp('com.cce.enforce.OrgEnforceOfficerMaster').store.save();
				        
				        Ext.getCmp('OrgEnforceOfficerMore').store.reload();
					}
		      });
	  }
});
var tpl = new Ext.XTemplate(
		'<tpl for=".">',
            '<div class="thumb-wrap" id="{fileId}">',
		    '<div class="thumb"><img src="upload/download.action?id={fileId}" title="{fileId}"  width="140" height="120"></div>',
		    '<span>{tname}</span><span>{description}</span></div>',
        '</tpl>',
        '<div class="x-clear"></div>'
);

//------------------------------------------------------------------------------
//Module的RecordExpertMore内容Panel定义..
//------------------------------------------------------------------------------

com.cce.enforce.OrgEnforceOfficerMore=Ext.extend(Ext.Panel, {
	  id:'OrgEnforceOfficerMore',
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
		    
	        com.cce.enforce.OrgEnforceOfficerMore.superclass.initComponent.call(this);
		    
	 }
	 
	
});

var orgStore=new Ext.data.Store({
	url:"info/enforceOrg!listBox4Org.action",
	reader: new Ext.data.JsonReader({ 
		root:'data',
		fields:['id','name']
	})

});

com.cce.enforce.EnforceOfficerForm = Ext.extend(Ext.form.FormPanel, {
	title: '执法人员管理',
	modal:true,
	iconCls: 'silk-user',
	labelWidth: 100,
	width: 580,
	fileUpload : true,	
    fileType : null,
	height: 300,
	padding: 10,
	header: false,
	frame: true,
	region:'center',
	layout: 'tableform',
	layoutConfig:{
			columns:4,
			columnWidths: [0.25,0.25,0.25,0.25]
	},
	autoScroll: true,
  // private A pointer to the currently loaded record
	record : null,

	initComponent : function() {
		// build the form-fields.  Always a good idea to defer form-building to a method so that this class can
	    // be over-ridden to provide different form-fields
	    this.items = this.buildForm();
	
	    // build form-buttons
	    this.buttons = this.buildUI();

	    this.addEvents('afterSave');	
	    // super
	    com.cce.enforce.EnforceOfficerForm.superclass.initComponent.call(this);
	},
    scope:this,	
	
	/**
	 * buildform
	 * @private
	 */
	buildForm : function() {	
	    return [
					{
					    xtype:"combo",
					    id:'orgName',
					    name:'orgName',
					    fieldLabel:"所属机构",
					    triggerAction:'all',
					    editable:false,
            			colspan:3,
					    store: orgStore,
					    displayField:'name', //显示的字段
					    valueField:'name', //数据字段
					    allowBlank:false, //必须选择
					    blankText: '请选择..'
					},
					{
						xType: "panel",
						rowspan:4,
						scope: this,
					    id:'tecImg',
					    width:100,
					    height:120,
					    name:'tecImg'
					},
					{
			            xtype: 'textfield',
			            fieldLabel: '姓名',
			            anchor: '100%',
			            id:'name',
					    allowBlank:false,
			            name:'name',
			            colspan:3
			        },
			        {
			            xtype: 'textfield',
			            fieldLabel: '职务',
			            anchor: '100%',
					    allowBlank:false,
			            id:'duty',
			            name:'duty',
			            colspan:3
			        },
			        {
			            xtype: 'textfield',
			            fieldLabel: '证号',
			            anchor: '100%',
			            id:'issueNo',
					    allowBlank:false,
			            name:'issueNo',
			            colspan:3
			        },
			        {
			            xtype: 'textfield',
			            fieldLabel: '手机',
			            anchor: '100%',
			            id:'mobile',
			            name:'mobile',
			            colspan:4
			        },
			        {
			            xtype: 'textfield',
			            fieldLabel: '执法证发证机关',
			            anchor: '100%',
			            colspan:4,
			            id:'issueAuth',
			            name:'issueAuth'
			        },
	                {
			        	xtype : 'fileuploadfield',
		      			id : 'file',
		      			emptyText : '选择文件',
		      			fieldLabel : '上传照片',
		      			name : 'upload',
		      			buttonText : '选择文件',
		      			anchor: '100%',		    
		      			colspan:4
	                },
	                new Ext.form.Hidden({
	    			            name:"id",
	    			            id:'id',
	    			            hiddenName:'id'
	    			}),
	    			new Ext.form.Hidden({
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
	    if(rec.get("fileId")!=null){
	    	  Ext.getCmp('tecImg').html="<img src='upload/download.action?id="+rec.get("fileId")+"' width='100' height='120'>";
	    }else{
	    	  Ext.getCmp('tecImg').html="";
	    }
	    if(rec.get('id')!=null&&rec.get('id')!=''){
	    	  Ext.getCmp('file').allowBlank=true;
	    }
	    else{
	    	  Ext.getCmp('file').allowBlank=false;
	    }
	    this.getForm().loadRecord(this.record);
	},
	
	onUploadOk: function(f,o)
	{
		var thestore=Ext.getCmp('com.cce.enforce.OrgEnforceOfficerMaster').store;
		Ext.getCmp('fileId').setValue(o.result.message);
    	if(Ext.getCmp('id').getValue()==""){
    		thestore.add(new thestore.recordType(this.getForm().getValues()));
    	}else{
    		this.getForm().updateRecord(this.record);
    	}
    	
 
    	var i=0;
    	thestore.save();
    	thestore.on('save',function(s,b,d){
 			i++;
 			if(i==1)
 			{
 				
 				thestore.load({params:{start:0,limit:20}});
 			}
 			
 		},this);
    	
    	
    	 
        this.fireEvent('afterSave', this, null);
	},
	onSubmit : function(btn, ev) {
        if (!this.getForm().isValid()) {
            App.setAlert(false, "表单数据有错误.");
            return false;
        }
        if(this.isMobilePhone(Ext.getCmp('mobile').getValue()))
        {
	        if(Ext.getCmp('file').getValue()==""){
	        	var thestore=Ext.getCmp('com.cce.enforce.OrgEnforceOfficerMaster').store;
	        	if(Ext.getCmp('id').getValue()==""){
	        		thestore.add(new thestore.recordType(this.getForm().getValues()));
	        	}else{
	        		this.getForm().updateRecord(this.record);
	        	}
	        	
	        	 var i=0;
		    	 thestore.on('save',function(store,batch,data){
		 			i++;
		 			if(i==1)
		 			{
		 				// thestore.load({params:{data:this.tid}});
		 			}
		 			
		 		},this);
		    	 thestore.save();
	            this.fireEvent('afterSave', this, null);
	        }else{
	        	if(this.isFileOk(Ext.getCmp('file').getValue())){
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
	        	else
	        	{
	        		App.setAlert(false, "请上传正确的文件格式(jpg gif bmp)" );
	        	}
	        	
	        }
        }
        else
        {
        	Ext.getCmp('mobile').markInvalid( "手机号码不正确");
        }
    },
    isFileOk:function(s){
		
		var patrn = /[.](jpg|gif|bmp)$/;
		
		if(s!='')
		{
		
		    s=s.toLocaleLowerCase(); //全部转换成小写
		    
			if (!patrn.exec(s)) {
			   return false;	
			}
			else
			{
				return true ;
			}
		}
		else
		{
			return true;
		}

	},
	isMobilePhone:function(s){
    	var regex = /^(13[0-9]|15[0|1|3|6|7|8|9]|18[8|9])\d{8}/;
    	
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
    			
    }

});

//执法人员证书

var proxy_badge_officer = new Ext.data.HttpProxy({
	api: {
		    read : 'info/enforceOfficer!listBadge.action',
		    create : 'info/enforceOfficer!saveBadge.action',
		    destroy : 'info/enforceOfficer!deleteBadge.action'
		}
});

var reader_badge_officer = new Ext.data.JsonReader(
		{root:'data'},
		[ 
		    	{name: 'id',mapping:"id"},
		    	{name: 'tid',mapping:'tid'},
		    	{name: 'fileId',mapping:'fileId'},
		    	{name: 'tname',mapping:'tname'},
		    	{name: 'name',mapping:'name'},
		    	{name: 'description',mapping:'description'},
		    	{name: 'expireDate',mapping:'expireDate',type:'date',dateFormat:'time'},
		    	{name: 'createDate',mapping:'createDate',type:'date',dateFormat:'time'}
		    	
		]
);
var columns_badge_officer = [
            new Ext.grid.CheckboxSelectionModel(),  
           	{header:'证书名称',dataIndex:'tname',width:200},
           	{header:'有效期',dataIndex:'expireDate',renderer:Ext.util.Format.dateRenderer('Y年m月d日'),sortable:true,width:100},  
           	{header:'创建日期',dataIndex:'createDate',renderer:Ext.util.Format.dateRenderer('Y年m月d日'),sortable:true,width:100} 
           	
];
var writer_badge_officer = new Ext.data.JsonWriter({
	encode: true,
	writeAllFields: false
});
var store_badge_officer = new Ext.data.Store({
    id: 'enforce_badge_store',
    message: 'message',
    proxy: proxy_badge_officer,
    reader: reader_badge_officer,
    writer: writer_badge_officer,  // <-- plug a DataWriter into the store just as you would a Reader
    autoSave: false
  });

com.cce.enforce.EnforceOfficerbadgeForm=Ext.extend(Ext.form.FormPanel, {
	
	title: '执法人员证书',
	modal:true,
	iconCls: 'silk-user',
	labelWidth: 75,
	width: 550,
	height: 500,
	padding: 10,
	header: false,
	frame: true,
	region:'center',
	layout:"form",
	autoScroll: true,
    // private A pointer to the currently loaded record
	record : null,
	tid:null,
	fileUpload : true,
	initComponent : function() {
	
	 
			
			
			this.items = this.buildForm();
		    
		    // build form-buttons
		    this.buttons = this.buildUI();
		    
		    this.addEvents(
		       'onBadge'
		    );
		    store_badge_officer.load({params:{data:this.tid}});
		    // super
		    com.cce.enforce.EnforceOfficerbadgeForm.superclass.initComponent.call(this);
		    
		    Ext.getCmp('badgeGrid').on('rowclick',function(g, index, ev){
		    	this.record =g.store.getAt(index);
		    	
		        this.getForm().loadRecord(this.record);
		    	
		    },this);
		    
	 },
	 buildForm : function() {
			return [
					{
						xtype:"textfield",
						fieldLabel:"执法人员",
						name:'name',
						id:'name',
						anchor:"100%",
						readOnly:true
					},
					{
						xtype:"textfield",
						fieldLabel:"证书名称",
						name:'tname',
						id:'tname',
						anchor:"100%", 
		      			allowBlank : false
					},
			        {
			            xtype: 'datefield',
			            fieldLabel: '有效期',
			            anchor: '100%',
			            format: 'm/d/Y',
			            id:'expireDate',				            
			            name:'expireDate'
			        },
					{
						xtype : 'fileuploadfield',
		      			id : 'file',
		      			emptyText : '选择文件',
		      			fieldLabel : '上传证书',
		      			name : 'upload',
		      			buttonText : '选择文件',
		      			anchor: '100%', 
		      			allowBlank : false
					},
					{
						xtype:"textarea",
						fieldLabel:"说明",
						anchor:"100%",						 
						id:'description',
						name:'description'

						
					},new Ext.form.Hidden({
			            name:"tid",
			            id:'tid',
			            hiddenName:'tid'
			 	    }),new Ext.form.Hidden({
			            name:"fileId",
			            id:'fileId',
			            hiddenName:'fileId'
			 	    }), 
					{
						xtype:"grid",
						id:'badgeGrid',
						title:"证书管理",
						store:store_badge_officer,
						sm: new Ext.grid.CheckboxSelectionModel(),
						columns:columns_badge_officer,
						frame:true,
						height: 200,
						stripeRows: true,
						loadMask: true,
						border: false,
						enableHdMenu: false	 
						
					}
					
			];
		},
		buildUI : function(){
		      return [{
					text:"上传",
					scope: this,
					handler:this.onSave
			  	},
			  	{
			       text: '删除',
			       handler:this.onDelete,
			       scope: this
			    },
			  	{
		          text: '关闭',
		          handler: function(btn, ev){
			    	this.fireEvent('afterSave', this, null);
		          },
		          scope: this
		      }];
		},
		loadRecord : function(rec) {
		      this.record = rec;
		      this.getForm().loadRecord(this.record);
		},
		onDelete : function(btn,ev){
			
			var theSelect=Ext.getCmp('badgeGrid').getSelectionModel().getSelected(); 
			if (!theSelect) {
	            return false;
	        }
			
			
			var rows=Ext.getCmp('badgeGrid').getSelectionModel().getSelections();

			 
	        
			 Ext.Msg.confirm('确认删除', '你确定删除该条记录?', function(btn) {
					if (btn == 'yes') 
					{
						 
				        for(var i=0;i<rows.length;i++)
				        {
				            
				        	Ext.getCmp('badgeGrid').store.remove(rows[i]);
				        }
				        
				        Ext.getCmp('badgeGrid').store.save();
//				        var i=0;
//				        Ext.getCmp('badgeGrid').store.on('save',function(store,batch,data){
//			    			i++;
//			    			if(i==1)
//			    			{
//			    				
//			    				 Ext.getCmp('badgeGrid').store.load({params:{data:this.tid}});
//			    				 Ext.getCmp('OrgEnforceOfficerMore').store.load({params:{start:0,limit:20}});
//			    			}
//			    			
//			    		});
				        //Ext.getCmp('badgeGrid').store.reload();
				        
					}
		      });
			
			
		},
		onUploadOk:function (f,o){
			var thestore=Ext.getCmp('badgeGrid').store;
			Ext.getCmp('tid').setValue(this.tid);
			Ext.getCmp('fileId').setValue(o.result.message);
	    	thestore.add(new thestore.recordType(this.getForm().getValues()));
	    	
//			thestore.insert(0,new thestore.recordType({
//				'fileid':o.result.message,
//				'name':Ext.getCmp('name').getValue(),
//				'tid':this.tid
//				
//			}));
	    	var i=0;
	    	thestore.on('save',function(store,batch,data){
	 			i++;
	 			if(i==1)
	 			{
	 				thestore.load({params:{data:this.tid}});
	 			}
	 			
	 		},this);
			thestore.save();
 
	       
		},
		onSave : function(btn, ev) {
		      if (this.record == null) {
		          return;
		      }
		      if (!this.getForm().isValid()) {
		          App.setAlert(false, "表单数据有错误.");
		          return false;
		      }
		      if(this.isFileOk(Ext.getCmp('file').getValue())){
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
		      else
		      {
		    	  App.setAlert(false, "请上传正确的文件格式(jpg gif bmp)" );
		      }
		},
		isFileOk:function(s){
			
			var patrn = /[.](jpg|gif|bmp)$/;
			
			if(s!='')
			{
			
			    s=s.toLocaleLowerCase(); //全部转换成小写
			    
				if (!patrn.exec(s)) {
				   return false;	
				}
				else
				{
					return true ;
				}
			}
			else
			{
				return true;
			}

		}
});


var searchEnforceOfficerInfo = function() {
    if (!this.getForm().isValid()) {
        App.setAlert(false, "表单数据有错误.");
        return false;
    }
	Ext.getCmp('com.cce.enforce.OrgEnforceOfficerMaster').store.load({
		params : { 
			 	data:Ext.encode(this.getForm().getValues())
			}
	}); 
	this.fireEvent('afterSearch', this, null);
}

com.cce.enforce.EnforceOfficerSearchForm = Ext.extend(Ext.form.FormPanel, {
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
	        save : false
	    },'onSearch');
	
	    // super
	    com.cce.enforce.EnforceOfficerSearchForm.superclass.initComponent.call(this);
	    
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
	},
	

  /**
   * buildform
   * @private
   */
  buildForm : function() {	
		var date=new Date();
      return [
				        {
				            xtype: 'textfield',
				            fieldLabel: '执法人',
						    anchor: '100%',
						    colspan:2,
				            id:'name',
				            name:'name'
				        },
				        {
					    	   xtype:"datefield",
					           fieldLabel: '开始日期',
					    	   id:'startdate',
					           name:'startdate',
					           format:'m/d/Y',
							   anchor:"100%",
					           align:'left',		 
							   dateRange: {begin: 'startdate', end: 'enddate' },   
			                   vtype: 'dateRange' 
					    },
				        {
					    	   xtype:"datefield",
					           fieldLabel: '结束日期',
					    	   id:'enddate',					  
					           name:'enddate',
					           format:'m/d/Y',
							   anchor:"100%",
					           align:'left',					 
							   dateRange: {begin: 'startdate', end: 'enddate' },   
			                   vtype: 'dateRange' 
					    },
						this.regionTree,
						this.regionTree.hiddenRegionId
				    ]
  },  
 
  buildUI : function(){
      return [{
			text:"查询",
			scope: this,
			handler:this.onSelect
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
  onSelect:function(){
	  this.fireEvent('onSearch', this, null);
  }
 
});

var store_main_officer = new Ext.data.Store({
    id: 'id',
    message: 'message',
    proxy: proxy,
    reader: reader,
    writer: writer,  // <-- plug a DataWriter into the store just as you would a Reader
    autoSave: false
 });

var store_enf_badge = new Ext.data.Store({
    id: 'enf_id',
    message: 'message',
    proxy: proxy_enf_badge_de,
    reader: reader_enf_badge_de, 
    autoSave: false
});

//------------------------------------------------------------------------------
//Module的定义放在最后,eval(xxx.js)后返回Module的类定义..
//------------------------------------------------------------------------------
Ext.extend(com.cce.Module, {
	win: null,
	init: function(){
		
		
		this.master = new com.cce.enforce.OrgEnforceOfficerMaster({ store : store_main_officer });
 		this.detail= new com.cce.enforce.OrgEnforceOfficerMore({ store : store_enf_badge });
		this.frame= new com.cce.enforce.OrgEnforceOfficer();		

		store_main_officer.on("beforeload", function(thiz, options) {
	 		thiz.baseParams["data"] = searchParams;
		});
 
		//关联自定义事件
	    //this.relayEvents(this.store, ['destroy', 'save', 'update']);
 
		
		this.master.on('doedit', this.showForm, this);
		this.master.on('doSearch', this.showSearchForm, this);
		this.master.on('doAll', this.onAllData, this);
		this.master.on('doBadge', this.showBadgeForm, this);
		this.master.on('rowclick', function(g, index, ev){
			this.record =g.store.getAt(index);
			
			   store_enf_badge.load({params:{data:this.record.get('id')}});
			
			
		}, this);
		
		this.frame.add(this.master);
 		this.frame.add(this.detail);
		
 		this.main.add(this.frame);
 		this.main.doLayout();
 		store_main_officer.load({params:{start:0,limit:20}}); 
	},
	showSearchForm : function(g, store, record){
		if(!record){
	        record = new store.recordType();
		}
		var form = new com.cce.enforce.EnforceOfficerSearchForm();
		form.on('onSearch', this.onSearch, this);
		form.on('afterSearch', this.afterSave, this);
		this.newWin = new Ext.Window({
		    title: '执法人员信息查询',
		    closable:true,
		    width:480,
		    height:300,
		    constrain:true,
		    //border:false,
		    plain:true,
		    layout: 'border',
		    resizable:true,
		    autoScroll: true,
		    modal:true,
		    items: [form]
		});
		
		form.loadRecord(record);
		
		if(startdate==''){
			//form.get('startdate').setValue(new Date());
		}else{
			form.get('startdate').setValue(startdate);
		}
		if(enddate==''){
			//form.get('enddate').setValue(new Date());
		}else{
			form.get('enddate').setValue(enddate);
		}
		
		form.get('cce_regionTree').hiddenRegionId.setValue(region_id);
		form.get('name').setValue(name);
 
		
		this.newWin.show();
	},
	showForm : function(g, store, record){
		if(!record){
	        record = new store.recordType();
		}
		var form = new com.cce.enforce.EnforceOfficerForm();
		this.newWin = new Ext.Window({
		    title: '执法人员管理',
		    closable:true,
		    width:550,
		    height:320,
		    constrain:true,
		    plain:true,
		    layout: 'border',
		    resizable:true,
		    autoScroll: true,
		    modal:true,
		    items: [form]
		});
		form.on('afterSave', this.afterUpdate, this);
		form.loadRecord(record);
		this.newWin.show();
	},
	showBadgeForm : function(g, store, record){
		if(!record){
	        record = new store.recordType();
		}
		var form = new com.cce.enforce.EnforceOfficerbadgeForm({tid:record.get('id')});
		this.newWin = new Ext.Window({
		    title: '执法人员证书管理',
		    closable:true,
		    width:600,
		    height:500,
		    constrain:true,
		    //border:false,
		    plain:true,
		    layout: 'border',
		    resizable:true,
		    autoScroll: true,
		    modal:true,
		    items: [form]
		});
		
		//form.on('onBagde', this.onSave, this);
		
		form.loadRecord(record);		
		form.on('afterSave', this.afterSave, this);
		
		this.newWin.show();
	},
	onSearch : function(fp, record){		

		var data = new Array();
 
		
		if(fp.get('startdate').getValue()!=null&&fp.get('startdate').getValue()!=""){
			startdate  = fp.get('startdate').getValue().format('m/d/Y').toString();
			data.push("startdate", startdate);
		}
		if(fp.get('enddate').getValue()!=null&&fp.get('enddate').getValue()!=""){
			enddate = fp.get('enddate').getValue().format('m/d/Y').toString();
			data.push("enddate", enddate);
		}
		
		name = fp.get('name').getValue();
		region_id = fp.get('cce_regionTree').hiddenRegionId.getValue();

		searchParams=Ext.encode({
			'beginDate':startdate,
			'endDate':enddate,
			'regionId':region_id,
			'name':name
		}),
		//查询
		store_main_officer.load({
				params:{
					start:0,
				    limit:20
				}
		 });
			
		 this.newWin.close();
		
		 
	},
	onAllData:function(g, store, record){
		searchParams=Ext.encode({
			'beginDate':'',
			'endDate':'',
			'regionId':'',
			'name':''
		});
		//查询
		store_main_officer.load({
				params:{
					start:0,
				    limit:20
				}
	   });
	},
	afterSave : function(fp, record){
        this.newWin.close();
	},
	afterUpdate : function(fp,record){
		this.newWin.close();
		this.onAllData(null, null, null);
	}
});

var startdate="";
var enddate="";
var region_id="";
var name=""; 
var searchParams=Ext.encode({
	'beginDate':'',
	'endDate':'',
	'regionId':'',
	'name':''
});