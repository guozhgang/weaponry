Ext.ns("com.cce.members");
ScriptMgr.load({ scripts: ['javascript/utils/SearchField.js']});
ScriptMgr.load({ scripts: ['javascript/utils/FormTableLayout.js']});
//------------------------------------------------------------------------------
//Module的proxy定义..
//------------------------------------------------------------------------------
var proxy = new Ext.data.HttpProxy({
api: {
    read : 'info/checkExpert!list.action',
    create : 'info/checkExpert!save.action',
    update: 'info/checkExpert!save.action',
    destroy: 'info/checkExpert!delete.action'
}
});

//------------------------------------------------------------------------------
//Module的reader定义..
//------------------------------------------------------------------------------
var reader = new Ext.data.JsonReader(
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
		{name: 'regionName',mapping:'regionName'},
		{name: 'fileId',mapping:'fileId'}
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
               {header:'联系电话',dataIndex:'mobile'},
               {header:'职务',dataIndex:'duty'},
               {header:'创建日期',dataIndex:'createDate',renderer:Ext.util.Format.dateRenderer('Y年m月d日 H时i分s秒'),sortable:true}
           ];


//------------------------------------------------------------------------------
//Module的company主Panel定义..
//------------------------------------------------------------------------------

com.cce.members.OrgCheckExpert=Ext.extend(Ext.Panel,{
	id:'OrgCheckExpert',
	loadMask: true,
	border: false,
	enableHdMenu: false,
	header:false,
	region:'center',
	closable:true,
	layout:"border",
	frame:true
});


com.cce.members.CheckExpertForm = Ext.extend(Ext.form.FormPanel, {
	title: '审查专家',
	modal:true,
	iconCls: 'silk-user',
	header: false,
	frame: true,
	region:'center',
	layout: 'tableform',
	layoutConfig:{
		columns:4,
		columnWidths: [0.25,0.25,0.25,0.25]
	},	
    // private A pointer to the currently loaded record
    record : null,
    fileUpload : true,
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
	    },'afterSave');
	
	    // super
	    com.cce.members.CheckExpertForm.superclass.initComponent.call(this);
	},
	
    /**
     * buildform
     * @private
     */
    buildForm : function() {
        return [
			        {
			            xtype: 'textfield',
			            fieldLabel: '姓名 ',
				    	allowBlank:false,
			            anchor: '100%',
			            id:'name',
			            name:'name',
			            colspan:3
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
			            fieldLabel: '邮箱',
				    	allowBlank:false,
			            anchor: '100%',
			            id:'mail',
			            name:'mail',
			            vtype:'email',
			            colspan:3
			        },
			        {
			            xtype: 'textfield',
			            fieldLabel: '手机',
			            anchor: '100%',
				    	allowBlank:false,
			            id:'mobile',
			            name:'mobile',
			            regex:/^(13[0-9]|15[0|3|6|8|9|1]|189|186)\d{8}$/,
			            regexText:'请输入正确的手机号',
			            colspan:3
			        },
			        {
			            xtype: 'textfield',
			            fieldLabel: '邮编',
			            anchor: '100%',
				    	allowBlank:false,
			            id:'zipcode',
			            name:'zipcode',
			            regex: /[1-9]\d{5}(?!\d)/,
			            regexText:'请输入6位邮政编码',
			            colspan:3
			        },
			        {
			            xtype: 'textfield',
			            fieldLabel: '职务',
			            anchor: '100%',
				    	allowBlank:false,
			            id:'duty',
			            name:'duty',
			            colspan:4
			        },
//			        {
//			            xtype: 'textfield',
//			            fieldLabel: '证书',
//			            anchor: '100%',
//				    	allowBlank:false,
//			            id:'certificate',
//			            name:'certificate',
//			            colspan:4
//			        },
			        {
			            xtype: 'textfield',
			            fieldLabel: '地址',
			            anchor: '100%',
				    	allowBlank:false,
				    	colspan:2,
			            id:'address',
			            name:'address',
			            colspan:4
			        },
			        {
			            xtype: 'textfield',
			            fieldLabel: '简历',
			            anchor: '100%',
				    	colspan:2,
				    	allowBlank:false,
			            id:'resumeInfo',
			            name:'resumeInfo',
			            colspan:4
			        },
			        {
						xtype : 'fileuploadfield',
		      			id : 'file',
		      			colspan:4,
		      			emptyText : '选择文件',
		      			fieldLabel : '人员照片',
		      			name : 'upload',
		      			buttonText : '选择文件',
		      			anchor: '100%',
		      			allowBlank : false
					},new Ext.form.Hidden({
			            name:"id",
			            id:'id',
		      			colspan:4,
			            hiddenName:'id'
			 	    }),new Ext.form.Hidden({
			            name:"fileId",
		      			colspan:4,
			            id:'fileId',
			            hiddenName:'fileId'
			 	    })
			   ]
    },
	
    buildUI : function(){
        return [{
			text:"保存",
			scope: this,
			handler:this.onSave
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
	    	  Ext.getCmp('file').allowBlank=false;
	    }
	    else{
	    	  Ext.getCmp('file').allowBlank=false;
	    }
	   this.getForm().loadRecord(this.record);
    },
    onUploadOk:function (f,o){
    	var thestore=Ext.getCmp('com.cce.members.OrgCheckExpertMaster').store;
    	Ext.getCmp('fileId').setValue(o.result.message);
    	thestore.add(new thestore.recordType(this.getForm().getValues()));
    	thestore.save();
		thestore.reload();
        this.fireEvent('afterSave', this, null);
    	
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
//------------------------------------------------------------------------------
//Module的CompanyRecordGrid定义..
//------------------------------------------------------------------------------

com.cce.members.OrgCheckExpertMaster = Ext.extend(Ext.grid.GridPanel, {
	  id:'com.cce.members.OrgCheckExpertMaster',
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
		    com.cce.members.OrgCheckExpertMaster.superclass.initComponent.call(this);
		    
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
				text:"删除",
				iconCls:"expert_delete",
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
				        	Ext.getCmp('com.cce.members.OrgCheckExpertMaster').store.remove(rows[i]);
				        }
				        Ext.getCmp('com.cce.members.OrgCheckExpertMaster').store.save();
					}
		      });
	  }
});

//------------------------------------------------------------------------------
//Module的RecordExpertMore内容Panel定义..
//------------------------------------------------------------------------------

//com.cce.members.OrgCheckExpertDetail=Ext.extend(Ext.Panel ,{
//	 id:'OrgCheckExpertDetail',
//	 region:'south',
//	 height:260,
//	 title:'详细信息',
//	 split:true,
//	 bodyStyle: 'padding: 10px; font-family: Arial; font-size: 12px;',
//	 
//	initComponent: function(store){
//	
//
//		this.stroe = store;
//		com.cce.members.OrgCheckExpertDetail.superclass.initComponent.call(this);
//		
//		 
//	}	  
//	
//});


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
		this.master = new com.cce.members.OrgCheckExpertMaster({ store : this.store });
//		this.detail= new com.cce.members.OrgCheckExpertDetail({ store : this.store });
		this.frame= new com.cce.members.OrgCheckExpert();		
		
		
		//关联自定义事件
	    //this.relayEvents(this.store, ['destroy', 'save', 'update']);
		
		this.master.on('doedit', this.showForm, this);
		
		this.frame.add(this.master);
//		this.frame.add(this.detail);
		
  	this.main.add(this.frame);
  	this.main.doLayout();
  	this.store.load({params:{start:0,limit:20}}); 
	},

	showForm : function(g, store, record){
		if(!record){
	        record = new store.recordType();
		}
		var form = new com.cce.members.CheckExpertForm();
		this.win = new Ext.Window({
		    title: '审查专家信息',
		    closable:true,
		    width:510,
		    height:340,
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

	showReForm : function(g, store, record){
		
		
	},
	afterSave : function(fp, record){
        this.win.close();
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
