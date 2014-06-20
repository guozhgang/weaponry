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
	    read : 'record/technician!list.action',
	    create : 'record/technician!save.action',
	    update : 'record/technician!save.action',
	    destroy: 'record/technician!deleteTechnician.action'
	}
});

var proxy_badge_de = new Ext.data.HttpProxy({
	api: {
		    read : 'record/technician!listBadge.action',
		    create : 'record/technician!saveBadge.action',
		    destroy: 'record/technician!deleteBadge.action'
		 }
});

var reader_badge_de = new Ext.data.JsonReader(
		{root:'data'},
		[ 
		    	{name: 'id',mapping:"id"},
		    	{name: 'bagdname',mapping:'bagdname'},
		    	{name: 'dNumber',mapping:'certNo '}, //证件编号
		    	{name: 'bagdpath',mapping:'bagdpath'},
		    	{name: 'fileId',mapping:'fileId'},
		    	{name: 'createDate',mapping:'createDate',type:'date',dateFormat:'time'}
		    	
		]
);
var columns_badge_de = [
            new Ext.grid.CheckboxSelectionModel(), 
           	{header:'证书名称',dataIndex:'bagdname'},  
           	{header:'创建时间',dataIndex:'createDate',renderer:Ext.util.Format.dateRenderer('Y年m月d日 H时i分s秒'),sortable:true} 
           	
];
var writer_badge_de = new Ext.data.JsonWriter({
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
	    	{name: 'entName',mapping:'entName'}, //所属企业
	    	{name: 'approvalDept',mapping:'approvalDept'},
	    	{name: 'certNo',mapping:'certNo'},
	    	{name: 'education',mapping:'education'},
	    	{name: 'pic',mapping:'pic'}, //技术人员照片地址
	    	{name: 'picId',mapping:'picId'}, //技术人员照片地址
	    	{name: 'bagdpath',mapping:'bagdpath'}, //证书地址
	    	{name: 'name',mapping:'name'},
	    	{name: 'fileId',mapping:'fileId'},
	    	{name: 'tel',mapping:'tel'},
	    	{name: 'type',mapping:'type'},//技术人员类别id
	    	{name: 'categoryName',mapping:'categoryName'}//技术人员类别文字
	    	
	    	
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
    {header:'技术人员类别',dataIndex:'type'},
    {header:'所属企业',dataIndex:'entName'},
	{header:'姓名',dataIndex:'name'}, //姓名
	{header:'学历',dataIndex:'education'}, //学历
	{header:'发证机关',dataIndex:'approvalDept'}, //发证机关
	{header:'联系电话',dataIndex:'tel'}
 
	
];

//------------------------------------------------------------------------------
//Module的company主Panel定义..
//------------------------------------------------------------------------------

com.cce.record.RecordExpertMain=Ext.extend(Ext.Panel,{
	id:'record-expert-main',
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

com.cce.record.RecordExpertGrid = Ext.extend(Ext.grid.GridPanel, {
	  id:'RecordExpertGrid',
	  title:'技术人员',
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
		    com.cce.record.RecordExpertGrid.superclass.initComponent.call(this);
		    
		    this.addEvents(
		    	'doedit',
		    	'doBadge'
		    );
		},
		
		 /**
	   * buildTopToolbar
	   */
	  buildTopToolbar : function() {
	      return [{
					text:"新增",
					iconCls:"company_expert_add",
					id:'addBtn_expert',
					scope: this,
					handler:this.onAdd
	    	},	    	
			{
					text:"修改",
					iconCls:"company_expert_edit",
					id:'edtBtn_expert',
					scope: this,
					handler:this.onEdit
			},
			{
					text:"删除",
					iconCls:"company_expert_delete",
					id:'delBtn_expert',
					scope: this,
					handler:this.onDelete
			},
			{
					text:"证书管理",
					iconCls:"company_expert_adds",
					id:'crtBtn_expert',
					scope: this,
					handler:this.onBadge
			}
			 
//			,
//			new Ext.Toolbar.Fill(),
//			  ' '
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
	   *  查询插件载入
	   */
//	  plugins: [new Ext.ux.grid.Search({
//
//  		iconCls: false
//
//      , showSelectAll: false
//
//      , dateFormat: 'm/d/Y'
//
//      , position: 'top'
//
//      , searchText: '搜索'
//
//      , disableIndexes: ['id','expireDate']//不参与查询的列名
//
//      , minLength: 1
//
//	  })],
 
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
				        	Ext.getCmp('RecordExpertGrid').store.remove(rows[i]);
				        }
				        Ext.getCmp('RecordExpertGrid').store.save();
				        Ext.getCmp('RecordExpertMore').store.reload();
					}
		      });
	  },
	  onBadge : function(btn,ev){  //证书管理
		  var record = this.getSelectionModel().getSelected();
	      if (!record) {
	            return false;
	      }
		  this.fireEvent('doBadge', this, this.store, record);
	  }
	  
});


var tpl = new Ext.XTemplate(
		'<tpl for=".">',
            '<div class="thumb-wrap" id="{fileId}">',
		    '<div class="thumb"><img src="upload/download.action?id={fileId}" title="{fileId}"  width="300" height="300"></div>',
		    '<span>{name}</span><span>{description}</span></div>',
 		'</tpl>',
        '<div class="x-clear"></div>'
);

//------------------------------------------------------------------------------
//Module的RecordExpertMore内容Panel定义..
//------------------------------------------------------------------------------

com.cce.record.RecordExpertMore=Ext.extend(Ext.Panel, {
	  id:'RecordExpertMore',
	  loadMask: true,
	  border: false,
	  enableHdMenu: false,	 
	  region:'south',
	  closable:true,
	  autoScroll:true,
	  height:260,
	  frame:true,
	  split:true,
	  //html:'暂时没有上传证书信息',
	  initComponent : function() {
		    
		    // super
		    
		    this.items=  new Ext.DataView({
		         id:'images-view',
	           	 tpl: tpl,
	           	 store: this.store,
	           	 overClass:'x-view-over',
	           	 multiSelect: true,
	           	 autoHeight:true,
	           	 itemSelector: 'div.thumb-wrap'
           	 
	        }),
		    
		    com.cce.record.RecordExpertMore.superclass.initComponent.call(this);
		    
	 }
	 
	
});

//定义技术人员备案的form

//com.cce.record.ImagePanel=Ext.extend(Ext.Panel ,{
//	 id:'tecImg',
//	 bodyStyle: 'padding: 10px; font-family: Arial; font-size: 12px;',
//	 frame:true,
//	 autoScroll: true,
//	 name:'tecImg',
//	initComponent: function(store){
//		this.stroe = store;
//		com.cce.record.ImagePanel.superclass.initComponent.call(this);
//	}	  
//	
//});
com.cce.record.RecordExpertForm=Ext.extend(Ext.form.FormPanel, {
	title: '技术人员备案',
	modal:true,
	iconCls: 'silk-user',
	labelWidth: 80,
	width: 550,
	height: 310,
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
	fileUpload : true,
	initComponent : function() {
			
			var category_store = new Ext.data.SimpleStore({
			    fields: ['id', 'code', 'value'],
			    data : DICT_TECH_TYPE
			});
			
			this.category_combo = new Ext.form.ComboBox({
		        store: category_store,
				typeValue : new Ext.form.Hidden({ id:"type",name:"type",allowBlank:false }),
		        id:"typecombo",
		        name:"typecombo",
		        fieldLabel:'技术人员类别',
		        displayField:'value',
		        triggerAction:'all',
		        valueField:'id',
      			colspan:3,
		        mode: 'local',
		        anchor: '100%',
		        emptyText:'请选择技术人员类别',
		        editable:false,
		        allowBlank:false,
		        listeners:{ 
		            select:{ 
		                fn:function(combo,record,index) { 
							this.typeValue.setValue(record.get("value"));
						}
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
		    		'save',
		    		'afterSave'
		    );
		    
		    // super
		    com.cce.record.RecordExpertForm.superclass.initComponent.call(this);
		    
		    Ext.Ajax.request({ 
				url : 'record/companyInfo!getEntNameAndRegion.action',
				scope: this,
				async:false,
				success : function(response) { 
						var EntNameAndRegion = Ext.util.JSON.decode(response.responseText);
						
						this.getForm().setValues({
							'entName':EntNameAndRegion.entName,
							'region':EntNameAndRegion.region
						});
						
						
				}, 
				failure : function(response) { 
				   App.setAlert(false,"执行失败！"); 
			    }
		    }); 
	
	},
	/**
	   * buildform
	   * @private
	   */
	buildForm : function() {
		
		return [
				
				{
				    xtype: 'textfield',
				    fieldLabel: '姓名',
			    	allowBlank:false,
				    anchor: '100%',
	      			colspan:3,
				    id:'name',
				    name:'name'
				},
//				new com.cce.record.ImagePanel(),
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
				    fieldLabel: '联系电话',
			    	allowBlank:false,
				    anchor: '100%',
	      			colspan:3,
				    id:'tel',
				    name:'tel'
				},
				{
				    xtype: 'textfield',
				    fieldLabel: '发证机关',
			    	allowBlank:false,
				    anchor: '100%',
	      			colspan:3,
				    id:'approvalDept',
				    name:'approvalDept'
				},
				{
				    xtype: 'textfield',
				    fieldLabel: '所属区域',
				    anchor: '100%',
	      			colspan:3,
				    id:'region',
				    name:'region',
				    readOnly:true
				   
				},
				{
				    xtype: 'textfield',
				    fieldLabel: '所属企业',
				    anchor: '100%',
	      			colspan:4,
				    id:'entName',
				    name:'entName',
				    readOnly:true
				   
				},
//				{
//				    xtype: 'textfield',
//				    fieldLabel: '检验检疫号',
//				    anchor: '100%',
//				    id:'certNo',
//	      			colspan:2,
//				    name:'certNo'
//				},
				{
				    xtype: 'textfield',
				    fieldLabel: '学历',
				    anchor: '100%',
	      			colspan:4,
				    id:'education',
				    name:'education'
				   
				},				
				{
					xtype : 'fileuploadfield',
	      			id : 'file',
	      			colspan:4,
	      			emptyText : '选择文件',
	      			fieldLabel : '人员照片',
	      			name : 'upload',
	      			buttonText : '选择文件',
	      			anchor: '100%'
	 
				},
				this.category_combo,
				this.category_combo.typeValue,
				new Ext.form.Hidden({
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
	      Ext.getCmp('typecombo').setValue(rec.get("type"))
	      Ext.getCmp('type').setValue(rec.get("type"))
	      if(rec.get("fileId")!=null){
	    	  Ext.getCmp('tecImg').html="<img src='upload/download.action?id="+rec.get("fileId")+"' width='100' height='120'>";
	      }else{
	    	  Ext.getCmp('tecImg').html="";
	      }
	      this.getForm().loadRecord(this.record);
	},
	onUploadOk:function (f,o){
		var thestore=Ext.getCmp('RecordExpertGrid').store;
		Ext.getCmp('fileId').setValue(o.result.message);
		thestore.add(new thestore.recordType(this.getForm().getValues())); 
		thestore.save(); 
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
	      
	      if(this.isFileOk(Ext.getCmp('file').getValue())&&this.isMobilePhone(Ext.getCmp('tel').getValue())){
	    	  if(Ext.getCmp('file').getValue()==""){
	    		  
	    		  var thestore=Ext.getCmp('RecordExpertGrid').store;
		        	if(Ext.getCmp('id').getValue()==""){
		        		thestore.add(new thestore.recordType(this.getForm().getValues()));
		        	}else{
		        		this.getForm().updateRecord(this.record);
		        	}
		        	thestore.save();		    		 
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
 
	},
	isFileOk:function(s){
		
		var patrn = /[.](jpg|gif|bmp)$/;
		
		if(s!='')
		{
		
		    s=s.toLocaleLowerCase(); //全部转换成小写
		    
			if (!patrn.exec(s)) {
				 Ext.getCmp('file').markInvalid('请上传正确的文件格式(jpg gif bmp)');
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
	    		Ext.getCmp('tel').markInvalid( "手机号码不正确");
	    		return false;
	    	}else{
	    		return true ;
	    	}
    	}
    			
    }
});

//定义证书管理

var proxy_badge = new Ext.data.HttpProxy({
	api: {
		    read : 'record/technician!listBadge.action',
		    create : 'record/technician!saveBadge.action',
		    destroy : 'record/technician!deleteBadge.action'
		}
});

var reader_badge = new Ext.data.JsonReader(
		{root:'data'},
		[ 
		    	{name: 'id',mapping:"id"},
		    	{name: 'tid',mapping:'tid'},
		    	{name: 'fileId',mapping:'fileId'},
		    	{name: 'tname',mapping:'tname'},
		    	{name: 'dNumber',mapping:'certNo'}, //证件编号
		    	{name: 'name',mapping:'name'},
		    	{name: 'description',mapping:'description'},
		    	{name: 'expireDate',mapping:'expireDate',type:'date',dateFormat:'time'},
		    	{name: 'createDate',mapping:'createDate',type:'date',dateFormat:'time'}
		    	
		]
);
var columns_badge = [
            new Ext.grid.CheckboxSelectionModel(),  
           	{header:'证书名称',dataIndex:'tname',width:200},
           	{header:'证件编号',dataIndex:'dNumber',width:100},
           	{header:'有效期至',dataIndex:'expireDate',renderer:Ext.util.Format.dateRenderer('Y年m月d日'),sortable:true,width:100},  
           	{header:'创建日期',dataIndex:'createDate',renderer:Ext.util.Format.dateRenderer('Y年m月d日'),sortable:true,width:100} 
           	
];
var writer_badge = new Ext.data.JsonWriter({
	encode: true,
	writeAllFields: false
});
var store_badge = new Ext.data.Store({
    id: 'badge_store',
    message: 'message',
    proxy: proxy_badge,
    reader: reader_badge,
    writer: writer_badge,  // <-- plug a DataWriter into the store just as you would a Reader
    autoSave: false
});

//定义证书管理-表单


com.cce.record.RecordExpertCertificateForm=Ext.extend(Ext.form.FormPanel, {
	
	title: '技术人员证书',
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
	    store_badge.load({params:{data:this.tid}});
	    
	    store_badge.on('save',this.reload,this);
	    
	   
	    // super
	    com.cce.record.RecordExpertCertificateForm.superclass.initComponent.call(this);
	    
	    Ext.getCmp('badgeGrid').on('rowclick',function(g, index, ev){
	    	this.record =g.store.getAt(index);
	    	
	        Ext.getCmp('name').setValue(this.record.get('name'));
	        Ext.getCmp('tname').setValue(this.record.get('tname'));
	        Ext.getCmp('dNumber').setValue(this.record.get('dNumber'));
	        Ext.getCmp('expireDate').setValue(this.record.get('expireDate'));
	        Ext.getCmp('description').setValue(this.record.get('description'));
	        Ext.getCmp('fileId').setValue(this.record.get('fileId'));
	        
	    	
	    },this);
	    
	},
	buildForm : function() {
		return [
				{
					xtype:"textfield",
					fieldLabel:"技术人员",
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
					xtype:"textfield",
					fieldLabel:"证件编号",
					name:'dNumber',
					id:'dNumber',
					anchor:"100%", 
	      			allowBlank : false
				},
		        {
		            xtype: 'datefield',
		            fieldLabel: '有效期至',
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
		            name:"id",
		            id:'id',
		            hiddenName:'id'
		 	    }),new Ext.form.Hidden({
		            name:"fileId",
		            id:'fileId',
		            hiddenName:'fileId'
		 	    }), 
				{
					xtype:"grid",
					id:'badgeGrid',
					title:"证书管理",
					store:store_badge,
					sm: new Ext.grid.CheckboxSelectionModel(),
					columns:columns_badge,
					frame:true,
					height: 200,
					stripeRows: true,
					loadMask: true,
					border: false,
					enableHdMenu: false	 
					
				}
				
		]
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
			            
			        	store_badge.remove(rows[i]);
			        }
			        
			        store_badge.save();	            
			      
			        
				}
	      });
		
		
	},
	onUploadOk:function (f,o){
		var thestore=Ext.getCmp('badgeGrid').store; 
		Ext.getCmp('fileId').setValue(o.result.message);
    	thestore.add(new thestore.recordType(this.getForm().getValues()));
    	
 
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

	},
	reload:function(){
		store_badge.reload();
	}
});
var store_main_expert = new Ext.data.Store({
    id: 'id-1',
    message: 'message',
    proxy: proxy,
    reader: reader,
    writer: writer,  // <-- plug a DataWriter into the store just as you would a Reader
    autoSave: false
});

var store_badge_more = new Ext.data.Store({
    id: 'id',
    message: 'message',
    proxy: proxy_badge_de,
    reader: reader_badge_de,
    writer: writer_badge_de,  // <-- plug a DataWriter into the store just as you would a Reader
    autoSave: false
  });
//------------------------------------------------------------------------------
//Module的定义放在最后,eval(xxx.js)后返回Module的类定义..
//------------------------------------------------------------------------------
Ext.extend(com.cce.Module, {
	win: null,
	init: function(){
		
		
		
		this.grid = new com.cce.record.RecordExpertGrid({ store : store_main_expert });
		this.content= new com.cce.record.RecordExpertMore({ store : store_badge_more });
		this.mainPanel= new com.cce.record.RecordExpertMain();		
		store_main_expert.on('load',function(Store,records,options){
		  	Ext.Ajax.request({
	            url:'record/technician!newBtnEnabled.action',//1、判断企业备案是否通过；2、判断企业备案是否有审批中的记录
	            scope:this,
	            callback: function(o,s,r) {
		  			if(!Ext.util.JSON.decode(r.responseText).success){
	            		Ext.getCmp('addBtn_expert').setDisabled(true);
	            		Ext.getCmp('edtBtn_expert').setDisabled(true);
	            		Ext.getCmp('delBtn_expert').setDisabled(true);
	            		Ext.getCmp('crtBtn_expert').setDisabled(true);
		  			}else{
	            		Ext.getCmp('addBtn_expert').setDisabled(false);
	            		Ext.getCmp('edtBtn_expert').setDisabled(false);
	            		Ext.getCmp('delBtn_expert').setDisabled(false);
	            		Ext.getCmp('crtBtn_expert').setDisabled(false);
		  			}
	            }
			});
		})
		
		//关联自定义事件
	    //this.relayEvents(this.store, ['destroy', 'save', 'update']);
		
				this.grid.on('doedit', this.showForm, this);
				this.grid.on('doBadge',this.showBadgeForm,this);
			    this.grid.on('rowclick', function(g, index, ev){
					this.record =g.store.getAt(index);
					
					store_badge_more.load({
							params:{
								data:this.record.get('id')
							},
							scope:this,
							callback:function(records,options,succees){
								var count=records.length;
																
								if(count==0)
								{
									 
									Ext.getCmp('images-view').update("<br/><br/><div align='center'>暂时没有相关证书信息。</div>");
								
								}
							}
					});
					
					this.content.doLayout();
					
				}, this);
	    
		
		this.mainPanel.add(this.grid);
		this.mainPanel.add(this.content);
		
	  	this.main.add(this.mainPanel);
	  	this.main.doLayout();
	  	store_main_expert.on('save',this.reload,this);
	  	store_main_expert.load({params:{start:0,limit:20}}); 
	},

	showForm : function(g, store, record){
		if(!record){
	        record = new store.recordType();
		}
		
		
		
		var form = new com.cce.record.RecordExpertForm();
		this.win = new Ext.Window({
		    title: '技术人员备案',
		    closable:true,
		    width:520,
		    height:340,
		    constrain:true,
		    //border:false,
		    plain:true,
		    layout: 'border',
		    resizable:true,
		    autoScroll: true,
		    modal:true,
		    items: [form]
		});
		
		 
		form.on('afterSave',this.afterSave,this);
//		Ext.getCmp('tecImg').body.update("tttt")
//		document.getElementsByName('tecImg').innerHTML("ttttt");
		form.loadRecord(record);		
		
		this.win.show();
	},

	showBadgeForm : function(g, store, record){
		
		if(!record){
	        record = new store.recordType();
		}
		var form = new com.cce.record.RecordExpertCertificateForm({tid:record.get('id')});
		this.win = new Ext.Window({
		    title: '技术人员证书',
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
		
		this.win.show();
		
	},
	
	afterSave : function(fp, record){
        this.win.close();
	},
    reload:function(){
		store_main_expert.reload();
	}
});
