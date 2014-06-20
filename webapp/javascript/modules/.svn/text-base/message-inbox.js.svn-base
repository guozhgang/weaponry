
Ext.ns("com.cce.message");

ScriptMgr.load({ scripts: ['fckeditor/fckeditor.js']}); //载入编辑器

ScriptMgr.load({ scripts: ['javascript/utils/Ext.ux.grid.Search.js']}); //载入查询插件

//------------------------------------------------------------------------------
//Module的proxy定义..
//------------------------------------------------------------------------------
var proxy = new Ext.data.HttpProxy({
  api: {
	    read : 'message/inner-message!myInbox.action',
	    create : 'message/inner-message!save.action',
	    destroy: 'message/inner-message!deleteFromInbox.action'
	}
});
//------------------------------------------------------------------------------
//Module的reader定义..
//------------------------------------------------------------------------------
var reader = new Ext.data.JsonReader(
	  {
			root:'data',
			successProperty: 'success',
			messageProperty: 'message' //必须定义messageProperty,才能使event handler拿到message消息
	  },
      [ 
          	{name: 'id',mapping:"id"},
          	{name: 'sender',mapping:'sender'},
          	{name: 'topic',mapping:'topic'},
          	{name: 'content',mapping:"content"},
          	{name: 'createTime',mapping:'createTime',type:'date',dateFormat:'time'},
          	{name: 'duetime',mapping:'dueTime',type:'date',dateFormat:'time'},
          	{name: 'receiver',mapping:'receiver'},
          	{name: 'fileId',mapping:'fileId'}, //文件id
          	{name: 'fileName',mapping:'fileName'}, //文件名称 一定要有
          	{name: 'groups',mapping:'groups'}
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

function bold(val, meta, record) { 
    if(record.data.duetime==null||record.data.duetime=='')
    	return "<b>"+val+"</b>";
    else return val;
} 
function datebold(val, meta, record) { 
	val=Ext.util.Format.date(val,'Y年m月d日 H时i分s秒');
    return bold(val, meta, record);
} 

var columns = [
     new Ext.grid.CheckboxSelectionModel(),
	{header:'发件人',dataIndex:'sender',renderer:bold},
    {header:'标题', dataIndex:'topic',renderer:bold},
	{header:'接收时间',dataIndex:'createTime',renderer:datebold}
];

//------------------------------------------------------------------------------
//form-roleCombox的store定义
//------------------------------------------------------------------------------
var roleStore=new Ext.data.Store({
  url:"security/role!listBox.action",
  reader: new Ext.data.JsonReader({
  	totalProperty:"total",
  	root:'data',
  	fields:['roleid','rolename']
  })
});

//------------------------------------------------------------------------------
//Module的message主Panel定义..
//------------------------------------------------------------------------------


com.cce.message.MessageInboxMain=Ext.extend(Ext.Panel,{
	id:'message-main-inbox',
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
//Module的MessageGrid定义..
//------------------------------------------------------------------------------

com.cce.message.MessageInboxGrid = Ext.extend(Ext.grid.GridPanel, {
	  id:'com.cce.message.MessageInboxGrid',
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
		    com.cce.message.MessageInboxGrid.superclass.initComponent.call(this);
		    
		    this.addEvents(
		    	'doedit'
		    );
		 
		    
		  
		    
		},
		
		 /**
	   * buildTopToolbar
	   */
	  buildTopToolbar : function() {
 	      return [
	        {
					text:"新邮件",
					iconCls:"email_send",
					scope: this,
					handler:this.onAdd
	    	},
	    	{
					text:"删除邮件",
					iconCls:"email_delete",
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
	  plugins: [new Ext.ux.grid.Search({

          		iconCls: false

              , showSelectAll: false

              , dateFormat: 'm/d/Y'

              , position: 'top'

              , searchText: '搜索'

              , disableIndexes: ['id','createTime']//不参与查询的列名


      })],
	  /**
	   * onAdd
	   */
	  onAdd : function() {
	      this.fireEvent('doedit', this, this.store, null);
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
				        	 Ext.getCmp('com.cce.message.MessageInboxGrid').store.remove(rows[i]);
				        }
				        Ext.getCmp('com.cce.message.MessageInboxGrid').store.save();
				        Ext.getCmp('preview-inbox').body.update('');
					}
		      });
	  }
});

//------------------------------------------------------------------------------
//Module的Message内容Panel定义..
//------------------------------------------------------------------------------

com.cce.message.MessageInboxContent=Ext.extend(Ext.Panel ,{
   id:'preview-inbox',
   region:'south',
   height:260,
   title:'邮件内容',
   split:true,
   autoScroll:true,
   frame:true,
   bodyStyle: 'padding: 10px; font-family: Arial; font-size: 12px;',
	initComponent: function(store){
	
		this.tbar = this.buildTopToolbar();
		this.stroe = store;
		com.cce.message.MessageInboxContent.superclass.initComponent.call(this);
		
		this.addEvents(
		    	'doSend'
		);
	},
	
	buildTopToolbar : function() {
	      return [{
					text:"回复邮件",
					iconCls:"email_send",
					scope: this,
					handler:this.doSend
	    	}];
	},
	
	doSend : function() {	
		
		
		this.fireEvent('doSend', this, this.store, null);
	       
	}
	  
	
});



//------------------------------------------------------------------------------
//Module的MessageForm定义..
//------------------------------------------------------------------------------
com.cce.message.MessageInboxForm = Ext.extend(Ext.form.FormPanel, {
	title: '发送邮件',
	modal:true,
	iconCls: 'silk-user',
	labelAlign: 'right',
	labelWidth: 60,
	header: false,
	frame: true,
	region:'center',
	defaultType:'textfield',
	defaults: {
	      anchor: '100%'
   },
  
  // private A pointer to the currently loaded record
  record : null,
  fileUpload : true,
  initComponent : function() {
	   
	  
  
	   this.hiddenGroup= new Ext.form.Hidden({
           name:"groups",
           id:'message-inbox-group',
           hiddenName:'groups'
	    });
	   
	   this.hiddenAreaid= new Ext.form.Hidden({
           name:"areaid",
           id:'message-inbox-areaid',
           hiddenName:'areaid'
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
	        drafts: true,
	        afterSave : true
	    }); 
	    
	    
	
	    // super
	    com.cce.message.MessageInboxForm.superclass.initComponent.call(this);
	},
	

  /**
   * buildform
   * @private
   */
  buildForm : function() {	
		
		
      return [
						{
							xtype:"checkbox",
							id:'send_type-inbox',
							fieldLabel:"是否群发",
							boxLabel:"群发信息",
							anchor:"100%",
							checked:false					
						
						},
						{
							xtype:"textfield",
							id:'receiver',
							hiddenName:'receiver',
							fieldLabel:'收件人',
							allowBlank:false,
							blankText: '请输入收件人',
							anchor:"100%"
						},
						{
							xtype:"textfield",							
							id:'topic',
							hiddenName:'topic',
							fieldLabel:"标题",							 
							blankText: '请输入标题',
							maxLength:20,
							anchor:"100%"
						},
						{
							xtype : 'fileuploadfield',
							id : 'file', 
							emptyText : '选择文件',
							fieldLabel : '选择附件',
							name : 'upload',
							buttonText : '选择附件',
							anchor: '100%'
							 
						},
						{
							xtype : 'htmleditor',
							fieldLabel:'内容',
							labelSeparator:'：',
							id:'content',
							name:'content',
							hiddenName:'content',				 
							anchor : '100%'
							 
						},
						new Ext.form.Hidden({
				            name:"fileId",
			      			colspan:4,
				            id:'fileId',
				            hiddenName:'fileId'
				 	    }),
						this.hiddenGroup,
						this.hiddenAreaid
              ];
  },
	
  buildUI : function(){
      return [{
			text:"发送邮件",
			scope: this,
			handler:this.onSave
	  	}, {
			text:"保存草稿",
			scope: this,
			handler:this.onDrafts
	  	},{
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
//Module的OnlyReadMessageForm定义..
//------------------------------------------------------------------------------
com.cce.message.OnlyReadMessageInboxForm = Ext.extend(Ext.form.FormPanel, {
	
	title: '回复邮件',
	modal:true,
	iconCls: 'silk-user',
	labelAlign: 'right',
	labelWidth: 60,
	header: false,
	frame: true,
	region:'center',
	defaultType:'textfield',
	defaults: {
	      anchor: '100%'	 
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
	    // super
	    com.cce.message.OnlyReadMessageInboxForm.superclass.initComponent.call(this);
	    
	    this.addEvents({ save : true,afterSave : true});
	},

	/**
	 * buildform
	 * @private
	 */
	buildForm : function() {	
	    return [
	            			
	            			{
								xtype:"textfield",
								id:'receiver',
								hiddenName:'receiver',
								fieldLabel:'收件人',
								allowBlank:false,
								blankText: '请输入收件人',
								anchor:"100%",
								readOnly:true
							},
							{
								xtype:"textfield",								 
								id:'topic',
								hiddenName:'topic',
								fieldLabel:"标题",
								allowBlank:false,
								blankText: '请输入标题',
								anchor:"100%"
								
							},
							{
								xtype : 'fileuploadfield',
				      			id : 'file', 
				      			emptyText : '选择文件',
				      			fieldLabel : '选择附件',
				      			name : 'upload',
				      			buttonText : '选择附件',
				      			anchor: '100%'
				      		 
							},
							{
								xtype : 'htmleditor',
								fieldLabel:'内容',
								labelSeparator:'：',
								id:'content',
								name:'content',
								hiddenName:'content',
								anchor:"100%" 
								
							},
							new Ext.form.Hidden({
					            name:"fileId",
				      			colspan:4,
					            id:'fileId',
					            hiddenName:'fileId'
					 	    })
	            ];
	},
	
	
	/**
	 * loadRecord
	 * @param {Record} rec
	 */
	loadRecord : function(rec) {
	    this.record = rec;
	    this.getForm().loadRecord(this.record);
	},
	
	buildUI : function(){
	      return [{
				text:"回复",
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

var message_inbox_store = new Ext.data.Store({
    id: 'id',
    message: 'message',
    proxy: proxy,
    reader: reader,
    writer: writer,  // <-- plug a DataWriter into the store just as you would a Reader
    autoSave: false
});
var  RegionTreeList=Ext.tree;
var regionTree;
Ext.extend(com.cce.Module, {
	win: null,
	init: function(){
		
		this.grid = new com.cce.message.MessageInboxGrid({ store : message_inbox_store });
		this.content= new com.cce.message.MessageInboxContent({ store : message_inbox_store });
		this.mainPanel= new com.cce.message.MessageInboxMain();		
		
		
		
		this.editorInstance=null;
		
		//关联自定义事件
	    //this.relayEvents(this.store, ['destroy', 'save', 'update']);
		
		this.grid.on('doedit', this.showForm, this);
		this.content.on('doSend',this.showReForm,this);
	    this.grid.on('rowclick', function(g, index, ev){
			this.record =g.store.getAt(index);
			
			var ContentHtml=//"<div class='MessageContentHread'><p>"+
							//"  <strong>收件人：</strong>"+this.record.get('sender')+"<br />"+
							//"  <strong>发件人：</strong>"+this.record.get('sender')+"<br />"+
							//"  <strong>标题： </strong>"+this.record.get('topic')+""+
							//"</p></div>"+
							"<div class='MessageContent'>附件：<a href='upload/download.action?id="+this.record.get('fileId')+"'>"+this.record.get('fileName')+"</a></div><br>"+
							"<div class='MessageContent'>"+this.record.get('content')+"</div>";
			
			Ext.getCmp('preview-inbox').setTitle("标题:"+this.record.get('topic')+"  发件人:"+this.record.get('sender'));
			Ext.getCmp('preview-inbox').body.update(ContentHtml);
			
				if(this.record.get('duetime')==null||this.record.get('duetime')=='')
				{
					g.loadMask=false;
					Ext.Ajax.request({
		    			async:false,
		    			url : 'message/inner-message!readMessage.action',
		    			scope:this,
		    			params : {
		    				data:this.record.get('id')
		    			},
		    			success: function(response, opts) {
		    				
		    				if (response.responseText == 'true') {
		    					
		    					message_inbox_store.load({params:{start:0,limit:20}});
//			    				g.getView().getCell(index,1).style.fontWeight='';
//			    	        	g.getView().getCell(index,2).style.fontWeight='';
//			    	        	g.getView().getCell(index,3).style.fontWeight='';
		    				}
		    			},
		    			failure : function(response, opts) {
		    				App.setAlert(false, "服务器通信错误,请重试.");
		    				return false;
		    			}
		    		});
					g.loadMask=true;
				}
		  }, this);
	    
	    
		this.mainPanel.add(this.grid);
		this.mainPanel.add(this.content);
		
	  	this.main.add(this.mainPanel);
	  	this.main.doLayout();	  	

	    message_inbox_store.on('save',function(s,b,d){
	    	message_inbox_store.load({ params:{start:0,limit:20}}); 
	    },this); 
	  	
 
	   
	},

	showForm : function(g, store, record){
		
		//创建分组Combo
		
		this.rolelistCombo = new Ext.form.ComboBox({
			id:'roleList-message-inbox',
			fieldLabel:"分组列表",
			hiddenName:'role_id',
			emptyText : '请选择用户组', 
			triggerAction:'all',
			editable:false,
			store:roleStore,
			displayField:'rolename',
			valueField:'roleid',
			allowBlank:false,
			listeners:{
		 			"select":function(cmb,res,index){
	 					Ext.getCmp('message-inbox-group').setValue(res.get('roleid'));
	 				}
	 		}
			
		}); 
		
		//创建区域选择树
		
		  regionTree = new RegionTreeList.TreePanel({
			root:  new RegionTreeList.AsyncTreeNode(),
			loader: new RegionTreeList.TreeLoader({
						dataUrl : 'security/region!treelist.action'
				}),
			hiddenRegionId : new Ext.form.Hidden({ name:"region_id" }),
			id : 'cce_regionTree_message_inbox',
			title:"地区列表",
		    region:"west",
		    width:"168",
		    split:true,
		    autoScroll:true,
		    animate:true,
		    enableDD:true,
		    containerScroll: true,
		    frame: false,
		    rootVisible: false,
//		    items:[this.rolelistCombo],
			listeners: {
			    "click": function( node){
			     	this.setTitle('所属地区: ' + node.text);
			     	this.hiddenRegionId.setValue(node.id);
			     	
			     	var tmps = node.id;			     	
			       
			     	var tmps_text = node.text;
			     	Ext.getCmp('receiver').setValue(tmps_text);
			     	
			     	Ext.getCmp('message-inbox-areaid').setValue(tmps);
			     	
		    	},
		    	"load":function(node){
		    		if(node.id == this.hiddenRegionId.value)
		    			this.getSelectionModel().select(node);
		    	}
		    }
		});
		
//		 regionTree.on('checkchange',function(node,checked){
//			if(checked){
//				if(node.isLeaf()){
//					node.getUI().checkbox.checked=true;
//					node.attributes.checked=true;	
//					var parent=regionTree.getRootNode();
//					var grdChilds=parent.childNodes;
// 
// 					grdChilds.getUI().checkbox.checked=false;
// 					grdChilds.attributes.checked=false;
//					for(j=0;j<grdChilds.length;j++){
//						var grdChild=grdChilds[j];
//						Ext.Msg.alert(grdChild.id);
//						grdChild.getUI().checkbox.checked=false;
//						grdChild.attributes.checked=false;
//						var sunCheckeds=grdChild.childNodes;
//						if(grdChild.id!=node.parentNode.id){
//						for(k=0;k<sunCheckeds.length;k++){
//							var sunChecked=sunCheckeds[k];
//							
//							sunChecked.getUI().checkbox.checked=false;
//							sunChecked.attributes.checked=false;}
//						}
//					}
//				}else{
//					
//					var checkedNodes=node.childNodes;
//					for(i=0;i<checkedNodes.length;i++){
//						var checkeNode=checkedNodes[i];
//						checkeNode.getUI().checkbox.checked=true;
//						checkeNode.attributes.checked=true;
//					}
//				}
//			}else{
//				if(node.isLeaf()){
//	                    var parent=node.parentNode;
//                    parent.getUI().checkbox.checked=false;
//					node.parentNode.attributes.checked=false;
//					node.getUI().checkbox.checked=false;
//					node.attributes.checked=false;
//				}else{
//					var checkedNodes=node.childNodes;
//					for(i=0;i<checkedNodes.length;i++){
//						var checkeNode=checkedNodes[i];
//						checkeNode.getUI().checkbox.checked=false;
//						checkeNode.attributes.checked=false;
//					}
//				}
//			}
//		},regionTree);
		if(!record){
	        record = new store.recordType({
	        	
	        });
		}
		
		var form = new com.cce.message.MessageInboxForm();		
		
		 regionTree.hide();
 
		this.win = new Ext.Window({
		    title: '发送邮件',
		    closable:true,
		    width:950,
		    height:450,
		    modal:true,
		    constrain:true, 
		    plain:true,
		    layout: 'border',
		    items: [regionTree,form]
		});
		
		Ext.getCmp('send_type-inbox').on('check',this.checkType,this);
		
		form.on('save', this.onSave, this);
		
		form.on('drafts', this.onDrafts, this);
		
		form.on('afterSave', this.afterSave, this);

	    form.loadRecord(record);
    	if (_USER_ROLE_ != '省级用户'&&_USER_ROLE_ != '管理员') {
    		Ext.getCmp('send_type-inbox').hidden=true;
    		Ext.getCmp('send_type-inbox').hideLabel=true;
    		Ext.getCmp('send_type-inbox').disabled=true;
    	}
		
		this.win.show();
		
	    
		
	},

	showReForm : function(g, store, record){
		record =   this.grid.getSelectionModel().getSelected();
		
		if(record){
			var reRecord = new store.recordType({
	        	id:null,
	        	name:'',
	        	receiver:record.get('sender')
	        });
		 
			var form = new com.cce.message.OnlyReadMessageInboxForm();
			
			this.win = new Ext.Window({
			    title: '回复邮件',
			    closable:true,
			    width:950,
			    height:450,
			    modal:true,
			    constrain:true, 
			    plain:true,
			    layout: 'border',
			    items: [form]
			});
			
			form.on('save', this.onSave, this);
			
			form.on('afterSave', this.afterSave, this);
			
			form.loadRecord(reRecord);		
			
			this.win.show();
			
 
			
		}
	},
	checkType:function(obj,isChecked){
		
		if(isChecked){			

			  regionTree.show();	
			// Ext.getCmp('receiver').setDisabled=true;
//			  Ext.getCmp('receiver').disabled =true;
 		 
		}
		else{
			
			 regionTree.hide();
			Ext.getCmp('receiver').setValue('');
//			  Ext.getCmp('receiver').disabled =true;
//			  Ext.getCmp('receiver').readOnly=false;
		}
		
		this.win.doLayout();
		
	},
	//发送邮件
	onSave : function(fp, record){
		
	    fp.getForm().updateRecord(record);
		
		if(this.isFileOk(Ext.getCmp('file').getValue())){
			if(Ext.getCmp('file').getValue()=='')
			{
				 if(Ext.getCmp('send_type-inbox')!=null)
		  		 {
					if(Ext.getCmp('send_type-inbox').getValue())
				    {
				    	record.data.receiver=Ext.getCmp('message-inbox-areaid').getValue();
				    }
		  		 }
					
				 record.data.fileId='';
					
				 if(record.data.id == null){
					  message_inbox_store.add(record);
				 }
				    						    
				 message_inbox_store.save();
				 this.win.close();
				  message_inbox_store.on('save',function(s,b,d){
				    	message_inbox_store.load({ params:{start:0,limit:20}}); 
				    },this); 
			}
			else
			{
				fp.getForm().submit( {
					url : 'upload/upload!upload.action',
					waitMsg : '正在上传文件...',
					scope : this,
					success : function(f,o){ 
							
				  		  if(Ext.getCmp('send_type-inbox')!=null)
				  		  {
							if(Ext.getCmp('send_type-inbox').getValue())
						    {
						    	record.data.receiver=Ext.getCmp('message-inbox-areaid').getValue();
						    }
				  		  }
							
				  		  if(o.result.success)
				  		  {
							record.data.fileId=o.result.message;
							
						    if(record.data.id == null){
						    	message_inbox_store.add(record);
						    }
						    						    
						    message_inbox_store.save();
						    this.win.close();
						    message_inbox_store.on('save',function(s,b,d){
						    	message_inbox_store.load({ params:{start:0,limit:20}}); 
						    },this);
						  	
						    
				  		  }
			  		},
		            failure: function(f,o){
		                App.setAlert(false, "上传失败." + o.result.message );
		                return false;
		            }
			  });
			}
	    }
	    else
	    {
	    	App.setAlert(false, "请不要上传exe格式文件" );
	    }
		
		
	}, 
	//保存草稿
	onDrafts : function(fp, record){
		
		fp.getForm().updateRecord(record);
		
		if(this.isFileOk(Ext.getCmp('file').getValue())){
		    
			if(Ext.getCmp('file').getValue()=='')
			{
				if(Ext.getCmp('send_type-inbox').getValue())
			    {
			    	record.data.receiver=Ext.getCmp('message-inbox-areaid').getValue();
			    }
				record.data.fileId='';
				Ext.Ajax.request({ 
					url : 'message/draft-box!save.action',
					scope: this,
					params : { 
					 data:Ext.encode(record.data)
					}, 
					success : function(response) { 
					   App.setAlert(true,Ext.util.JSON.decode(response.responseText).message); 

					   this.win.close();
					}, 
					failure : function(response) { 
						 
					   App.setAlert(false,"保存草稿失败！"); 
			
				    } 
			   }); 
			}
			else
			{
			  fp.getForm().submit( {
					url : 'upload/upload!upload.action',
					waitMsg : '正在上传文件...',
					scope : this,
					success : function(f,o){
						    if(Ext.getCmp('send_type-inbox').getValue())
						    {
						    	record.data.receiver=Ext.getCmp('message-inbox-areaid').getValue();
						    }
						    
						    if(o.result.success)
					  		{
						    
							    record.data.fileId=o.result.message;
								Ext.Ajax.request({ 
									url : 'message/draft-box!save.action',
									scope: this,
									params : { 
									 data:Ext.encode(record.data)
									}, 
									success : function(response) { 
									   App.setAlert(true,Ext.util.JSON.decode(response.responseText).message); 
			
									   this.win.close();
									}, 
									failure : function(response) { 
										 
									   App.setAlert(false,"保存草稿失败！"); 
							
								    } 
							   }); 
					  		}
			  		},
			  		 failure: function(f,o){
		                App.setAlert(false, "上传失败." + o.result.message );
		                return false;
		            }
			  });
			}
			  
		}
	    else
	    {
	      App.setAlert(false, "请不要上传exe格式文件" );
	    }
		
		
		
		
	},
	isFileOk:function(s){
		
		var patrn = /[.](exe|bat)$/;
		
		if(s!='')
		{
		
		    s=s.toLocaleLowerCase(); //全部转换成小写
		    
			if (patrn.exec(s)) {
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
	FCKeditor_OnComplete : function ( instance ){
		this.editorInstance=instance;  
	},
	afterSave : function(fp, record){
	    this.win.close();
	}
});

 


