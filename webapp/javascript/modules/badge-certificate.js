Ext.ns("com.cce.record");

ScriptMgr.load({ scripts: ['javascript/utils/Ext.ux.grid.Search.js']}); //查询插件

//------------------------------------------------------------------------------
//Module的proxy定义..
//------------------------------------------------------------------------------
var proxy = new Ext.data.HttpProxy({
api: {
	    read : 'record/companyBadge!list.action',
	    create : 'record/companyBadge!saveCompanyBadge.action',
	    update: 'record/companyBadge!saveCompanyBadge.action',
	    destroy: 'record/companyBadge!delete.action'
	}
});

//------------------------------------------------------------------------------
//Module的reader定义..
//------------------------------------------------------------------------------
var reader = new Ext.data.JsonReader(
  {
	  root:'data'
	  
  },
  [ 
      	{name: 'id',mapping:"id"},
      	{name: 'name',mapping:'name'},
      	{name: 'type',mapping:'type'},
      	{name: 'fileId',mapping:'fileId'},
      	{name: 'createDate',mapping:'createDate',type:'date',dateFormat:'time'},
      	{name: 'description',mapping:'description'},
      	{name: 'nameCN',mapping:"nameCN"} 
      	
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
    {header:'编号',dataIndex:'id'},
	{header:'证章证件',dataIndex:'name'},
//	{header:'证件类型',dataIndex:'type'},
	{header:'创建时间',dataIndex:'createDate',renderer:Ext.util.Format.dateRenderer('Y年m月d日 H时i分s秒'), sortable:true},
	{header:'说明',dataIndex:'description'}
//	{header:'提交者',dataIndex:'nameCN'}
	
];



//------------------------------------------------------------------------------
//Module的company主Panel定义..
//------------------------------------------------------------------------------

com.cce.record.BadgeCertificateMain=Ext.extend(Ext.Panel,{
	id:'badge-certificate-main',
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

com.cce.record.BadgeCertificateGrid = Ext.extend(Ext.grid.GridPanel, {
	  id:'BadgeCertificateGrid', 
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
		    com.cce.record.BadgeCertificateGrid.superclass.initComponent.call(this);
		    
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
			' '];
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
				        	Ext.getCmp('BadgeCertificateGrid').store.remove(rows[i]);
				        }
				        Ext.getCmp('BadgeCertificateGrid').store.save();
				        Ext.getCmp('preview-BadgeCertificate').body.update("");
					}
		      });
	  }
});

//------------------------------------------------------------------------------
//Module的Message内容Panel定义..
//------------------------------------------------------------------------------

com.cce.record.BadgeCertificateMore=Ext.extend(Ext.Panel ,{
	 id:'preview-BadgeCertificate',
	 region:'south',
	 height:260,
	 title:'浏览证书',
	 split:true,
	 bodyStyle: 'padding: 10px; font-family: Arial; font-size: 12px;',
	 frame:true,
	 autoScroll: true,
	initComponent: function(store){
	

		this.stroe = store;
		com.cce.record.BadgeCertificateMore.superclass.initComponent.call(this);
		
		 
	}	  
	
});


//定义证章上传的 form

com.cce.record.CompanyBadgeForm = Ext.extend(Ext.form.FormPanel, {
	
	title: '证章上传',
	modal:true,
	iconCls: 'silk-user',
	labelWidth: 100,
	width: 350,
	height: 200,
	padding: 10,
	header: false,
	frame: true,
	region:'center',
	layout: 'form',
	autoScroll: true,
	fileUpload : true,
    // private A pointer to the currently loaded record
	record : null,
  
	initComponent : function() {
		
//		var data=[['1','企业证章'],['2','企业证书'],['3','企业技术人员证书']];
//		
//		var store = new Ext.data.SimpleStore({
//            fields: ['type', 'typeChs'],
//            data : data
//        });
//		
//		this.combo = new Ext.form.ComboBox({
//		        store: store,
//		        id:"type",
//		        name:"type",
//		        fieldLabel:'证件类型',
//		        displayField:'typeChs',
//		        triggerAction:'all',
//		        valueField:'type',
//		        mode: 'local',
//		        anchor: '100%',
//		        emptyText:'请选择证件类型'
//		        
//		});

		

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
	    com.cce.record.CompanyBadgeForm.superclass.initComponent.call(this);
	
	},
	
	/**
	   * buildform
	   * @private
	   */
	buildForm : function() {
		
		return [
		        
				{
				    xtype: 'textfield',
				    fieldLabel: '证件名称',
				    anchor: '100%',
				    id:'name',
				    name:'name',
				    allowBlank:false
				},
				{
				    xtype: 'textfield',
				    fieldLabel: '备注',
				    anchor: '100%',
				    id:'description',
				    name:'description'
				},
//				this.combo,
				{
					xtype : 'fileuploadfield',
                	id: 'file',
				    anchor: '100%',
        			name : 'upload',
        			emptyText : '请选择文件',
        			fieldLabel : '上传文件',
        			buttonText : '浏 览', 
         			colspan:2,
        			allowBlank:false
				},new Ext.form.Hidden({
		            name:"id",
		            id:'id',
		            hiddenName:'id'
		 	    }),new Ext.form.Hidden({
		            name:"fileId",
		            id:'fileId',
		            hiddenName:'fileId'
		 	    })
 
		
		
		
		
	   ]
	  
	},
	buildUI : function(){
	      return [{
				text:"保存",
				scope: this,
				handler:this.onSubmit
		  	}, {
	          text: '重置',
	          handler: function(btn, ev){
	              this.getForm().reset();
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
		var thestore=Ext.getCmp('BadgeCertificateGrid').store;
		Ext.getCmp('fileId').setValue(o.result.message);
    	if(Ext.getCmp('id').getValue()==""){
    		thestore.add(new thestore.recordType(this.getForm().getValues()));
    	}else{
    		this.getForm().updateRecord(this.record);
    	}
    	thestore.save();
      
    	thestore.reload();
		var ContentHtml="<img src='upload/download.action?id="+o.result.message+"'>";
		Ext.getCmp('preview-BadgeCertificate').body.update(ContentHtml);
        this.fireEvent('afterSave', this, null);
	},
	onSubmit : function(btn, ev) {
        if (!this.getForm().isValid()) {
            App.setAlert(false, "表单数据有错误.");
            return false;
        }
        if(Ext.getCmp('file').getValue()==""){
        	var thestore=Ext.getCmp('BadgeCertificateGrid').store;
        	if(Ext.getCmp('id').getValue()==""){
        		thestore.add(new thestore.recordType(this.getForm().getValues()));
        	}else{
        		this.getForm().updateRecord(this.record);
        	}
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
//	
//	
//	
//	
//	
//	
//	onUploadOk:function(f,o){
//		var thestore=Ext.getCmp('BadgeCertificateGrid').store;
//		thestore.insert(0,new thestore.recordType({'fileId':o.result.message,'name':Ext.getCmp('name').getValue(),'type':Ext.getCmp('type').getValue()}));
//		thestore.save();
//		thestore.reload();
//        this.fireEvent('save', this, null);
//		
//	},
//	  /**
//	   * onUpdate
//	   */
//    onSave : function(btn, ev) {
//	      if (this.record == null) {
//	          return;
//	      }
//	      if (!this.getForm().isValid()) {
//	          App.setAlert(false, "表单数据有错误.");
//	          return false;
//	      }
//	      
//	      this.getForm().submit( {
//				url : 'upload/upload!upload.action',
//				waitMsg : '正在上传文件...',
//				scope : this,
//				success : this.onUploadOk, 
//	            failure: function(f,o){
//	                App.setAlert(false, "上传失败." + o.result.message );
//	                return false;
//	            }
//		  });
//	      
//	      //this.fireEvent('save', this, this.record);
//	}
	
	
});

//------------------------------------------------------------------------------
//Module的定义放在最后,eval(xxx.js)后返回Module的类定义..
//------------------------------------------------------------------------------
var store_badge_company = new Ext.data.Store({
	id: 'id_badge',
    message: 'message',
    proxy: proxy,
    reader: reader,
    writer: writer,  // <-- plug a DataWriter into the store just as you would a Reader
    autoSave: false
});
Ext.extend(com.cce.Module, {
	win: null,
	init: function(){
		
		this.grid = new com.cce.record.BadgeCertificateGrid({ store : store_badge_company });
		this.content= new com.cce.record.BadgeCertificateMore({ store : store_badge_company });
		this.mainPanel= new com.cce.record.BadgeCertificateMain();		
		
		
		//关联自定义事件
	    //this.relayEvents(this.store, ['destroy', 'save', 'update']);
		
				this.grid.on('doedit', this.showForm, this);
			    this.grid.on('rowclick', function(g, index, ev){
					this.record =g.store.getAt(index);
					var ContentHtml="<img src='upload/download.action?id="+this.record.get('fileId')+"'>";

					
					Ext.getCmp('preview-BadgeCertificate').body.update(ContentHtml);
					
				}, this);
	    
		
		this.mainPanel.add(this.grid);
		this.mainPanel.add(this.content);
		
	  	this.main.add(this.mainPanel);
	  	this.main.doLayout();
	  	store_badge_company.load({params:{start:0,limit:20}}); 
	  	
	  	store_badge_company.on('save',this.reload,this);
	},

	showForm : function(g, store, record){
		
		if(!record){
	        record = new store.recordType();
		}
		var form = new com.cce.record.CompanyBadgeForm();
		this.win = new Ext.Window({
		    title: '证件上传',
		    closable:true,
		    width:480,
		    height:180,
		    constrain:true,
		    //border:false,
		    plain:true,
		    layout: 'border',
		    resizable:false,
		    autoScroll: true,
		    model:true,
		    items: [form]
		});
		
		form.on('save', this.onSave, this);
		form.on('afterSave', this.afterSave, this);
		
		form.loadRecord(record);		
		
		this.win.show();
		
	},

	showReForm : function(g, store, record){
		
		
	},
	
	onSave : function(fp, record){		
		this.win.close();
		
	},

	afterSave : function(fp, record){
        this.win.close();
	},
	reload:function(){
		store_badge_company.reload();
	}
});