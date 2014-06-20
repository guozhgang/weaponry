Ext.ns("com.cce.message");

ScriptMgr.load({ scripts: ['fckeditor/fckeditor.js']}); //载入编辑器
ScriptMgr.load({ scripts: ['javascript/utils/Ext.ux.grid.Search.js']}); //载入查询插件

//------------------------------------------------------------------------------
//Module的proxy定义..
//------------------------------------------------------------------------------
var proxy = new Ext.data.HttpProxy({
  api: {
	    read : 'message/draft-box!list.action',
	    create : 'message/draft-box!save.action',
	    update : 'message/draft-box!save.action',
	    destroy: 'message/draft-box!delete.action'
	}
});
//------------------------------------------------------------------------------
//Module的reader定义..
//------------------------------------------------------------------------------
var reader = new Ext.data.JsonReader(
      {root:'data'},
      [ 
          	{name: 'id',mapping:"id"},
          	{name: 'sender',mapping:'sender'},
          	{name: 'topic',mapping:'topic'},
          	{name: 'content',mapping:"content"},
         	{name: 'createTime',mapping:"createTime",type:'date',dateFormat:'time'},
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
var columns = [
     new Ext.grid.CheckboxSelectionModel(),
	{header:'收件人',dataIndex:'receiver'},
    {header:'标题', dataIndex:'topic'},
	{header:'创建时间',dataIndex:'createTime',renderer:Ext.util.Format.dateRenderer('Y年m月d日 H时i分s秒'), sortable:true}
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


com.cce.message.MessageDraftsMain=Ext.extend(Ext.Panel,{
	id:'message-main-drafts',
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

com.cce.message.MessageDraftsGrid = Ext.extend(Ext.grid.GridPanel, {
	  id:'com.cce.message.MessageDraftsGrid',
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
		    com.cce.message.MessageDraftsGrid.superclass.initComponent.call(this);
		    
		    this.addEvents(
		    	'doedit'
		    );
		},
		
		 /**
	   * buildTopToolbar
	   */
	  buildTopToolbar : function() {
	      return [{
					text:"新建草稿",
					iconCls:"email_send",
					scope: this,
					handler:this.onAdd
	    	},
	    	{
	    			text:"修改草稿",
	    			iconCls:"email_edit",
	    			scope: this,
	    			handler:this.onEdit
	    	},
	    	{
					text:"删除草稿",
					iconCls:"email_delete",
					scope: this,
					handler:this.onDelete
			},
//			{
//					text:"发送邮件",
//					iconCls:"email_send",
//					scope: this,
//					handler:this.onSend
//			},
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
				        	Ext.getCmp('com.cce.message.MessageDraftsGrid').store.remove(rows[i]);
				        }
				        Ext.getCmp('com.cce.message.MessageDraftsGrid').store.save();
				        Ext.getCmp('preview-drafts').setTitle('');
				        Ext.getCmp('preview-drafts').body.update('');
					}
		      });
	  },
	  onSend:function(btn,ev){
		  	var selected = this.getSelectionModel().getSelected();
	        if (!selected) {
	            return false;
	        }
	        var rows=this.getSelectionModel().getSelections();
	        var rowids = [];
	        for(var i=0;i<rows.length;i++)
	        {
	        	if(rows[i].get('receiver')!=null&&rows[i].get('receiver')!="")
	        	{
	        		rowids.push(rows[i].get("id"));
	        	}
	        }
	        
	        Ext.Ajax.request({ 
				url : 'message/draft-box!sendMessage.action',
				scope: this,
				params : { 
				 data:Ext.encode(rowids)
				}, 
				success : function(response) { 
					
				   var data=Ext.util.JSON.decode(response.responseText);					
				   App.setAlert(data.success,data.message);
				   
				   this.store.load({params:{start:0,limit:20}}); 				   
				   
				}, 
				failure : function(response) { 
				   App.setAlert(false,"提交失败！"); 
			    }
		   }); 
	  }
});

//------------------------------------------------------------------------------
//Module的Message内容Panel定义..
//------------------------------------------------------------------------------

com.cce.message.MessageDraftsContent=Ext.extend(Ext.Panel ,{
   id:'preview-drafts',
   region:'south',
   height:260,
   title:'邮件内容',
   split:true,
   frame:true,
   autoScroll:true,
   bodyStyle: 'padding: 10px; font-family: Arial; font-size: 12px;',
	initComponent: function(store){
	
		
		this.stroe = store;
		com.cce.message.MessageDraftsContent.superclass.initComponent.call(this);
		
		 
	}
	  
	
});



//------------------------------------------------------------------------------
//Module的MessageForm定义..
//------------------------------------------------------------------------------
com.cce.message.MessageDraftsForm = Ext.extend(Ext.form.FormPanel, {
	title: '邮件信息',
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
           id:'message-drafts-group',
           hiddenName:'groups'
	    });
	   
	   this.hiddenAreaid= new Ext.form.Hidden({
           name:"areaid",
           id:'message-drafts-areaid',
           hiddenName:'areaid'
	    });
	   
	   this.hiddenid= new Ext.form.Hidden({
           name:"id",
           id:'id',
           hiddenName:'id'
	   });
	   
		// build the form-fields.  Always a good idea to defer form-building to a method so that this class can
	    // be over-ridden to provide different form-fields
	    this.items = this.buildForm();
	
	    // build form-buttons
	    this.buttons = this.buildUI();
	
 
 
	    
	    this.addEvents(
	    		'save',
	    		'send',
	    		'onSaveDrafts',
	    		'afterSave'
	    );
	
	    // super
	    com.cce.message.MessageDraftsForm.superclass.initComponent.call(this);
	},
	

  /**
   * buildform
   * @private
   */
  buildForm : function() {	
      return [
						{
							xtype:"checkbox",
							id:'send_type-drafts',
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
							blankText: '请输入收件人',
							anchor:"100%"
						},
						{
							xtype:"textfield",							
							id:'topic',
							hiddenName:'topic',
							fieldLabel:"标题",	
							maxLength:20,
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
							xtype:'htmleditor',
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
						this.hiddenAreaid,
						this.hiddenid
              ];
  },
	
  buildUI : function(){
      return [{
				text:"保存草稿",
				id:'savedrafts',
				scope: this,
				handler:this.onSave
			  },
			  {
				text:"发送邮件",
				id:'senddrafts',
				scope: this,
				handler:this.onSend
			  },
			  {
		          text: '取消',
		          id:'exitdrafts',
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
//      附件显示的问题，这里可以显示上次上传的附件，但是有一点，下面的上传时有冲突，导致上传的时候本来不需要上传的回到了上传的地方，待解决。
//      if(this.record.get('fileName')!=null&&this.record.get('fileName')!='')
//      {
//    	  Ext.getCmp('file').setValue(this.record.get('fileName'));
//      }
      
  },

  /**
   * onUpdate
   */
  onSave : function(btn, ev) {
	  Ext.getCmp('savedrafts').setDisabled(true);
	  Ext.getCmp('exitdrafts').setDisabled(true);
	  Ext.getCmp('senddrafts').setDisabled(true);
      if (this.record == null) {
          return;
      }
      if (!this.getForm().isValid()) {
          App.setAlert(false, "表单数据有错误.");
          return false;
      }
      var receiver = Ext.getCmp('receiver').getValue();
      
      if(this.isReceiver(receiver))
      {
    	  //this.fireEvent('onSaveDrafts', this, this.record);
    	  if(this.isFileOk(Ext.getCmp('file').getValue())){
  			if(Ext.getCmp('file').getValue()=='')
  			{
  				
  				 var thestore=Ext.getCmp('com.cce.message.MessageDraftsGrid').store;
  				 
  				if(Ext.getCmp('send_type-drafts')!=null)
  		  		{
  					if(Ext.getCmp('send_type-drafts').getValue())
  				    {
  						Ext.getCmp('receiver').setValue(Ext.getCmp('message-drafts-areaid').getValue());
  				    }
  		  		}
  					
  					this.record.data.fileId='';
  					
  					if(Ext.getCmp('id').getValue()==""){
  						thestore.add(new thestore.recordType(this.getForm().getValues()));
  				    }else{
  				 
		        		this.getForm().updateRecord(this.record);
		         
  				    }
  				    						    
  					thestore.save();
  					thestore.on('save',function(s,b,d){
  				    thestore.load({
  							params:{start:0,limit:20},
  							callback:function(records,options,succees){
  								var selected = Ext.getCmp('com.cce.message.MessageDraftsGrid').getSelectionModel().getSelected();
  								 
  								if(selected!=null&&selected!='')
  								{
	  								var ContentHtml=//"<div class='MessageContentHread'><p>"+
	  									//"  <strong>收件人：</strong>"+this.record.get('receiver')+"<br />"+
	  									//"  <strong>发件人：</strong>"+this.record.get('sender')+"<br />"+
	  									//"  <strong>标题： </strong>"+this.record.get('topic')+""+
	  									//"</p></div>"+
	  									"<div class='MessageContent'>附件：<a href='upload/download.action?id="+selected.get('fileId')+"'>"+selected.get('fileName')+"</a></div><br>"+
	  									"<div class='MessageContent'>"+selected.get('content')+"</div>";
	  								Ext.getCmp('preview-drafts').setTitle("标题:"+selected.get('topic')+"  发件人:"+selected.get('sender'));
	  								Ext.getCmp('preview-drafts').body.update(ContentHtml);
  								}
  							}
  					});
  						
  						
  						
  					 },this);
  					
  					
  					this.fireEvent('afterSave', this, null);
  				    
  			}else{
  				  this.getForm().submit( {
  						url : 'upload/upload!upload.action',
  						waitMsg : '正在上传文件...',
  						scope : this,
  						success : this.onUpdateOk,
  			            failure: function(f,o){
  			                App.setAlert(false, "上传失败." + o.result.message );
  			                return false;
  			              Ext.getCmp('savedrafts').setDisabled(false);
  			  	    	  Ext.getCmp('exitdrafts').setDisabled(false);
  			  	    	  Ext.getCmp('senddrafts').setDisabled(false);
  			            }
  				  });
  			}
  			
  	    }
  	    else
  	    {
  	    	App.setAlert(false, "请不要上传exe格式文件" );
  	    	Ext.getCmp('savedrafts').setDisabled(false);
  	    	Ext.getCmp('exitdrafts').setDisabled(false);
  	    	Ext.getCmp('senddrafts').setDisabled(false);
  	    }
      }
      else
      {
    	  Ext.getCmp('savedrafts').setDisabled(false);
    	  Ext.getCmp('exitdrafts').setDisabled(false);
    	  Ext.getCmp('senddrafts').setDisabled(false);
      }
  },
  onUpdateOk:function(f,o){
	  	if(Ext.getCmp('send_type-drafts')!=null)
		  {
			if(Ext.getCmp('send_type-drafts').getValue())
		    {
				Ext.getCmp('receiver').setValue(Ext.getCmp('message-drafts-areaid').getValue());
		    }
		}
	    var thestore=Ext.getCmp('com.cce.message.MessageDraftsGrid').store;
 		Ext.getCmp('fileId').setValue(o.result.message); 
	    thestore.add(new thestore.recordType(this.getForm().getValues()));	    
	    thestore.save();							   
	    thestore.on('save',function(s,b,d){
		thestore.load({
					params:{start:0,limit:20},
					callback:function(records,options,succees){
						var selected = Ext.getCmp('com.cce.message.MessageDraftsGrid').getSelectionModel().getSelected();
					    
						if(selected!=null&&selected!='')
						{
							var ContentHtml=//"<div class='MessageContentHread'><p>"+
								//"  <strong>收件人：</strong>"+this.record.get('receiver')+"<br />"+
								//"  <strong>发件人：</strong>"+this.record.get('sender')+"<br />"+
								//"  <strong>标题： </strong>"+this.record.get('topic')+""+
								//"</p></div>"+
								"<div class='MessageContent'>附件：<a href='upload/download.action?id="+selected.get('fileId')+"'>"+selected.get('fileName')+"</a></div><br>"+
								"<div class='MessageContent'>"+selected.get('content')+"</div>";
							Ext.getCmp('preview-drafts').setTitle("标题:"+selected.get('topic')+"  发件人:"+selected.get('sender'));
							Ext.getCmp('preview-drafts').body.update(ContentHtml);
						}
					}
		 });
				
				
				
	    },this);
	    
	    
	    this.fireEvent('afterSave', this, null);
  },  
  onSend : function(btn, ev) {
      if (this.record == null) {
          return;
      }
      if (!this.getForm().isValid()) {
          App.setAlert(false, "表单数据有错误.");
          return false;
      }
      
      var receiver = Ext.getCmp('receiver').getValue();
      var topic = Ext.getCmp('topic').getValue();
      
      if(this.isReceiver(receiver)&&this.isTopic(topic))
      {
    	  this.fireEvent('send', this, this.record);
      }
 
    

  },
  isReceiver:function(s){
	  if(s!=null&&s!=''){
		  
		  return true;
	  }
	  else
	  {
		  Ext.getCmp('receiver').markInvalid( "收件人不能为空");
		  return false;
	  }
  },
  isTopic:function(s){
	  if(s!=null&&s!=''){
		  
		  return true;
	  }
	  else
	  {
		  Ext.getCmp('topic').markInvalid( "标题不能为空");
		  return false;
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

	}
 
});


//------------------------------------------------------------------------------
//Module的OnlyReadMessageForm定义..
//------------------------------------------------------------------------------
com.cce.message.OnlyReadMessageDraftsForm = Ext.extend(Ext.form.FormPanel, {
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

initComponent : function() {
		// build the form-fields.  Always a good idea to defer form-building to a method so that this class can
	    // be over-ridden to provide different form-fields
	    this.items = this.buildForm();
	    // build form-buttons
	    this.buttons = this.buildUI();
	    // super
	    com.cce.message.OnlyReadMessageDraftsForm.superclass.initComponent.call(this);
	    
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
								maxLength:20,
								anchor:"100%"
								
							},
							{
								xtype:'htmleditor',
								fieldLabel:'内容',
								labelSeparator:'：',
								id:'content',
								name:'content',
								hiddenName:'content',				 
								anchor : '100%'
								
							}
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


var store_drafts = new Ext.data.Store({
    id: 'id-1',
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

		this.grid = new com.cce.message.MessageDraftsGrid({ store : store_drafts });
		this.content= new com.cce.message.MessageDraftsContent({ store : store_drafts });
		this.mainPanel= new com.cce.message.MessageDraftsMain();
		
		
		
		
		//关联自定义事件
	    //this.relayEvents(this.store, ['destroy', 'save', 'update']);
		
		this.grid.on('doedit', this.showForm, this);
		this.content.on('doSend',this.showReForm,this);
	    this.grid.on('rowclick', function(g, index, ev){
			this.record =g.store.getAt(index);
			
			var ContentHtml=//"<div class='MessageContentHread'><p>"+
							//"  <strong>收件人：</strong>"+this.record.get('receiver')+"<br />"+
							//"  <strong>发件人：</strong>"+this.record.get('sender')+"<br />"+
							//"  <strong>标题： </strong>"+this.record.get('topic')+""+
							//"</p></div>"+
							"<div class='MessageContent'>附件：<a href='upload/download.action?id="+this.record.get('fileId')+"'>"+this.record.get('fileName')+"</a></div><br>"+
							"<div class='MessageContent'>"+this.record.get('content')+"</div>";
			Ext.getCmp('preview-drafts').setTitle("标题:"+this.record.get('topic')+"  发件人:"+this.record.get('sender'));
			Ext.getCmp('preview-drafts').body.update(ContentHtml);
			
		}, this);
		
		this.mainPanel.add(this.grid);
		this.mainPanel.add(this.content);
		
	  	this.main.add(this.mainPanel);
	  	this.main.doLayout();
	  	store_drafts.load({params:{start:0,limit:20}}); 
	},

	showForm : function(g, store, record){
		
		//创建分组 Combo
		
		this.rolelistCombo = new Ext.form.ComboBox({
			id:'roleList-message-drafts',
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
	 					Ext.getCmp('message-drafts-group').setValue(res.get('roleid'));
	 				}
	 		}
			
		}); 
		
		//创建区域选择树
		
		this.regionTree = new Ext.tree.TreePanel({
			root:  new Ext.tree.AsyncTreeNode(),
			loader: new Ext.tree.TreeLoader({
						dataUrl : 'security/region!treelist.action'
				}),
			hiddenRegionId : new Ext.form.Hidden({ name:"region_id" }),
			id : 'cce_regionTree_message_drafts',
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
			     	
			     	var tmps=node.id;
			     	
			     	var tmps_text=node.text;
			     	
//			     	if(!node.isLeaf())
//			     	{
//			     		tmps=node.id;
//			     		node.expand();
//			     		var Nodes = node.childNodes;
//			     		for(i=0;i<Nodes.length;i++){
//			                var childNode = Nodes[i];
//			                
//			                if(tmps==''||tmps==null)
//			                {
//			                	tmps=childNode.id;
//			                }
//			                else
//			                {
//			                	tmps=tmps+","+childNode.id;
//			                }
//			                if(tmps_text==''||tmps_text==null)
//			                {
//			                	tmps_text=childNode.text;
//			                }
//			                else
//			                {
//			                	tmps_text=tmps_text+','+childNode.text;
//			                }
//			                
//			            }
//			     		
//			     	}
//			     	else
//			     	{
//			     		if(tmps==''||tmps==null)
//		                {
//		                	tmps=node.id;
//		                }
//		                else
//		                {
//		                	tmps=tmps+","+node.id;
//		                }
//			     		if(tmps_text==''||tmps_text==null)
//		                {
//		                	tmps_text=node.text;
//		                }
//		                else
//		                {
//		                	tmps_text=tmps_text+','+node.text;
//		                }
//			     	}
			     	
			     	Ext.getCmp('receiver').setValue(tmps_text);
			     	
			     	Ext.getCmp('message-drafts-areaid').setValue(tmps);
			     	
		    	},
		    	"load":function(node){
		    		if(node.id == this.hiddenRegionId.value)
		    			this.getSelectionModel().select(node);
		    	}
		    }
		});
		
		if(!record){
	        record = new store.recordType({
	        	 
	        });
		}
		
		
		this.regionTree.hide();
		
		var form = new com.cce.message.MessageDraftsForm();
		
		
		
		this.win = new Ext.Window({
		    title: '草稿',
		    closable:true,
		    width:950,
		    height:450,
		    constrain:true,
		    modal:true,
		    //border:false,
		    plain:true,
		    layout: 'border',
		    items: [this.regionTree,form]
		});
		Ext.getCmp('send_type-drafts').on('check',this.checkType,this);
		
		form.on('onSaveDrafts', this.onSave, this);
		
		form.on('send', this.onSend, this);
		form.on('afterSave', this.afterSave, this);
		form.loadRecord(record);
		if (_USER_ROLE_ != '省级用户'&&_USER_ROLE_ != '管理员') {
    		Ext.getCmp('send_type-drafts').hidden=true;
    		Ext.getCmp('send_type-drafts').hideLabel=true;
    		Ext.getCmp('send_type-drafts').disabled=true;
    	}
//		Ext.Ajax.request({
//			async:false,
//			url : 'security/user!isCompany.action',			 
//			scope:this,    			 
//			success: function(response, opts) {
//			    	if (response.responseText == 'true') {
//			    		Ext.getCmp('send_type-drafts').hidden=true;
//			    		Ext.getCmp('send_type-drafts').hideLabel=true;
//			    		Ext.getCmp('send_type-drafts').disabled=true;
//			    	}
//			},
//			failure : function(response, opts) {
//				App.setAlert(false, "服务器通信错误,请重试.");
//				return false;
//			}
//		});
		
		this.win.show();
		
//		var oFCKeditor = new FCKeditor('content','100%',300) ; 
//		oFCKeditor.BasePath = "fckeditor/" ; 
//		oFCKeditor.ToolbarSet = 'Default';
//		oFCKeditor.ReplaceTextarea() ; 	
		
		 
	},
	
	
	showEditForm : function(g,store, record){
		
		//创建分组 Combo
		
		this.rolelistCombo = new Ext.form.ComboBox({
			id:'roleList-message-drafts',
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
	 					Ext.getCmp('message-drafts-group').setValue(res.get('roleid'));
	 				}
	 		}
			
		}); 
		
		//创建区域选择树
		
		this.regionTree = new Ext.tree.TreePanel({
			root:  new Ext.tree.AsyncTreeNode(),
			loader: new Ext.tree.TreeLoader({
						dataUrl : 'security/region!treelist.action'
				}),
			hiddenRegionId : new Ext.form.Hidden({ name:"region_id" }),
			id : 'cce_regionTree_message_drafts',
			title:"用户列表",
		    region:"west",
		    width:"168",
		    split:true,
		    autoScroll:true,
		    animate:true,
		    enableDD:true,
		    containerScroll: true,
		    frame: false,
		    rootVisible: false,
		    items:[this.rolelistCombo],
			listeners: {
			    "click": function( node){
			     	this.setTitle('所属地区: ' + node.text);
			     	this.hiddenRegionId.setValue(node.id);
			     	
			     	var tmps=node.id;
			     	
			     	
			     	
//			     	if(!node.isLeaf())
//			     	{
//			     		tmps=node.id;
//			     		node.expand();
//			     		var Nodes = node.childNodes;
//			     		for(i=0;i<Nodes.length;i++){
//			                var childNode = Nodes[i];
//			                
//			                if(tmps==''||tmps==null)
//			                {
//			                	tmps=childNode.id;
//			                }
//			                else
//			                {
//			                	tmps=tmps+","+childNode.id;
//			                }
//			                
//			            }
//			     		
//			     	}
//			     	else
//			     	{
//			     		if(tmps==''||tmps==null)
//		                {
//		                	tmps=node.id;
//		                }
//		                else
//		                {
//		                	tmps=tmps+","+node.id;
//		                }
//			     	}
			     	
			     	Ext.getCmp('receiver').setValue(tmps);
			     	
		    	},
		    	"load":function(node){
		    		if(node.id == this.hiddenRegionId.value)
		    			this.getSelectionModel().select(node);
		    	}
		    }
		});
		
		if(!record){
	        record = new store.recordType({
	        	 
	        });
		}
		
		
		this.regionTree.hide();
		
		var form = new com.cce.message.MessageDraftsForm();
		
		
		
		this.win = new Ext.Window({
		    title: '修改草稿',
		    closable:true,
		    width:950,
		    height:450,
		    constrain:true,
		    modal:true,
		    //border:false,
		    plain:true,
		    layout: 'border',
		    items: [this.regionTree,form]
		});
		Ext.getCmp('send_type-drafts').on('check',this.checkType,this);
		
		form.on('onSaveDrafts', this.onSave, this);
		
		form.on('send', this.onSend, this);
		form.on('afterSave', this.afterSave, this);
		
		form.loadRecord(record);
		
//		Ext.Ajax.request({
//			async:false,
//			url : 'security/user!isCompany.action',			 
//			scope:this,    			 
//			success: function(response, opts) {
//			    	if (response.responseText == 'true') {
//			    		Ext.getCmp('send_type-drafts').hidden=true;
//			    		Ext.getCmp('send_type-drafts').hideLabel=true;
//			    		Ext.getCmp('send_type-drafts').disabled=true;
//			    	}
//			},
//			failure : function(response, opts) {
//				App.setAlert(false, "服务器通信错误,请重试.");
//				return false;
//			}
//		});
		
		this.win.show();
 
		
		
	
	},
	
	showReForm : function(g, store, record){
		
		record =   this.grid.getSelectionModel().getSelected();
		
		if(record){
			
	        
			var reRecord = new store.recordType({
	        	id:null,
	        	name:'',
	        	receiver:record.get('receiver')
	        	//topic:'',
	        	//content:''
	        	
	        });
		 
		
			var form = new com.cce.message.OnlyReadMessageDraftsForm();
			this.win = new Ext.Window({
			    title: '回复邮件',
			    closable:true,
			    width:950,
			    height:450,
			    modal:true,
			    constrain:true,
			    //border:false,
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
			 this.regionTree.show();
 
		}
		else{
			
			this.regionTree.hide();
			Ext.getCmp('receiver').setValue('');
 
		}
		
		this.win.doLayout();
		
	},
	onSave : function(fp, record){
		
		
		fp.getForm().updateRecord(record);
		
		
		
		if(this.isFileOk(Ext.getCmp('file').getValue())){
			if(Ext.getCmp('file').getValue()=='')
			{
				if(Ext.getCmp('send_type-drafts')!=null)
		  		{
					if(Ext.getCmp('send_type-drafts').getValue())
				    {
				    	record.data.receiver=Ext.getCmp('message-drafts-areaid').getValue();
				    }
		  		}
					
					record.data.fileId='';
					
				    if(record.data.id == null || record.data.id==""){
				    	store_drafts.add(record);
				    }
				    						    
				    store_drafts.save();
				    this.win.close();
				    store_drafts.on('save',function(s,b,d){
				    	store_drafts.load({params:{start:0,limit:20}});
  					},this);
			}else{
				  fp.getForm().submit( {
						url : 'upload/upload!upload.action',
						waitMsg : '正在上传文件...',
						scope : this,
						success : function(f,o){ 
								
					  		  if(Ext.getCmp('send_type-drafts')!=null)
					  		  {
								if(Ext.getCmp('send_type-drafts').getValue())
							    {
							    	record.data.receiver=Ext.getCmp('message-drafts-areaid').getValue();
							    }
					  		  }
							  
					  		if(o.result.success)
					  		{
					  			var thestore=Ext.getCmp('com.cce.message.MessageDraftsGrid').store;
								record.data.fileId=o.result.message;   
								Ext.getCmp('fileId').setValue(o.result.message);
						 
							    if(record.data.id == null || record.data.id==""){
							    	thestore.add(new thestore.recordType(fp.getForm().getValues()));
							    }							    
							    
							    thestore.save();							    
							    this.win.close();
							    thestore.on('save',function(s,b,d){
							    	thestore.load({params:{start:0,limit:20}});
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
	onSend : function(fp,record){
		
		
		fp.getForm().updateRecord(record);
		
		Ext.getCmp('savedrafts').setDisabled(true);
		Ext.getCmp('exitdrafts').setDisabled(true);
		Ext.getCmp('senddrafts').setDisabled(true);
		
		if(this.isFileOk(Ext.getCmp('file').getValue())){
			if(Ext.getCmp('file').getValue()=='')
			{
				//record.data.id=null;
				
				if(Ext.getCmp('send_type-drafts').getValue())
				{
				   	record.data.receiver=Ext.getCmp('message-drafts-areaid').getValue();
				}
				
				 
 	//				record.data.fileId='';
					
					Ext.Ajax.request({ 
						url : 'message/draft-box!sendMsg.action',
						scope: this,
						params : { 
						 data:Ext.encode(record.data)
						}, 
						success : function(response) { 
						   var data=Ext.util.JSON.decode(response.responseText);					
						   App.setAlert(data.success,data.message);
						   Ext.getCmp('preview-drafts').setTitle('');
						   Ext.getCmp('preview-drafts').body.update('');
						   Ext.getCmp('savedrafts').setDisabled(false);
						   Ext.getCmp('exitdrafts').setDisabled(false);
						   Ext.getCmp('senddrafts').setDisabled(false);
						   this.win.close();
						  	store_drafts.load({params:{start:0,limit:20}});
		  					 
						}, 
						failure : function(response) { 
							 
						   var data=Ext.util.JSON.decode(response.responseText);					
					       App.setAlert(data.success,data.message);
						   Ext.getCmp('savedrafts').setDisabled(false);
						   Ext.getCmp('exitdrafts').setDisabled(false);
						   Ext.getCmp('senddrafts').setDisabled(false);
				
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
									//record.data.id=null;
									
									if(Ext.getCmp('send_type-drafts').getValue())
									{
									   	record.data.receiver=Ext.getCmp('message-drafts-areaid').getValue();
									}
									
									if(o.result.success)
							  		{
										record.data.fileId=o.result.message;
										
										Ext.Ajax.request({ 
											url : 'message/draft-box!sendMsg.action',
											scope: this,
											params : { 
											 data:Ext.encode(record.data)
											}, 
											success : function(response) { 
											   var data=Ext.util.JSON.decode(response.responseText);					
											   App.setAlert(data.success,data.message);
											   Ext.getCmp('preview-drafts').setTitle('');
											   Ext.getCmp('preview-drafts').body.update('');
										       store_drafts.load({params:{start:0,limit:20}});
							  				 
											   this.win.close();
											}, 
											failure : function(response) { 
												 
												var data=Ext.util.JSON.decode(response.responseText);					
											    App.setAlert(data.success,data.message);
									
										    } 
									   }); 
							  		}
						 },
				  		 failure: function(f,o){
			                App.setAlert(false, "上传失败." + o.result.message );
			                return false;
			                Ext.getCmp('savedrafts').setDisabled(false);
			      		    Ext.getCmp('exitdrafts').setDisabled(false);
			      		    Ext.getCmp('senddrafts').setDisabled(false);
			            }
				 });
			}
			
		}
	    else
	    {
	      App.setAlert(false, "请不要上传exe格式文件" );
	      Ext.getCmp('savedrafts').setDisabled(false);
		  Ext.getCmp('exitdrafts').setDisabled(false);
		  Ext.getCmp('senddrafts').setDisabled(false);
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
	afterSave : function(fp, record){
	    this.win.close();
	}
});
