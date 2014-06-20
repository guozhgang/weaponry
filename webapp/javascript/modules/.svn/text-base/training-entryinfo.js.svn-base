Ext.ns("com.cce.training");
var projectReader = new Ext.data.JsonReader(
        {
            totalProperty: 'total',
            root:'data',
            id :'id'
        },
        [
         { name : 'id'}, 
         { name : 'title'}
        ]
);

var projectStore = new Ext.data.Store( {
	id : 1,
	fields : [ 'id', 'name' ],
	url : 'training/entrymgr!getProjectList.action',
	reader : projectReader,
	scope : this
});

var projectList = new Ext.form.ComboBox( {
	store : projectStore,
	typeAhead : true,
	triggerAction : 'all',
	lazyRender : true,
	fieldLabel : '发布类型',
	mode : 'local',
	name : 'projectId1',
	hiddenName : 'projectId',
	valueField : 'id',
	displayField : 'title',
	editable:false,
	allowBlank:false,
	mode : 'local',
	forceSelection: true  
});	

com.cce.training.EntryInfoForm = Ext.extend(Ext.form.FormPanel, {
	title: '链接信息',
	modal:true,
	//iconCls: 'silk-user',
	labelAlign: 'Left',
	labelWidth: 130,
	width: 300,
	header: false,
	frame: true,
	region:'center',
	defaultType:'textfield',
    defaults: {
        anchor: '100%'
    },
    //record : null,
    win : null,
    parentWin : null,
    publishType : null, 
    hiddenFileId : null,
    titleField : null,
    fileTitleField : null,
    projectIdField : null,
    setWin: function(w, projectId)
    {
    	this.parentWin = w;
    	 
    },
    
    initComponent : function() {
		// build the form-fields.  Always a good idea to defer form-building to a method so that this class can
	    // be over-ridden to provide different form-fields
    	
        this.hiddenFileId = new Ext.form.Hidden({name:'fileId'});
        
        this.titleField = new Ext.form.TextField({
        	name:'title',
        	fieldLabel: '标题(不得少于6个字)', 
        	allowBlank: false,
        	regex: /^(?:[\u4e00-\u9fa5]*\w*\s*){6}$/ 
        	});
        this.fileTitleField = new Ext.form.DisplayField({
        	fieldLabel: '文件标题',
        	name:"fileTitle"
        });
        //this.buildPublishType();        
        
        
	    this.items = this.buildForm();	
	    // build form-buttons
	    this.buttons = this.buildUI();	
	    // add a create event for convenience in our application-code.
	
	    // super
	    com.cce.training.EntryInfoForm.superclass.initComponent.call(this);
	    
	    projectStore.load();
	    
	},

	
    /**
     * buildform
     * @private
     */
	
	buildDateTimeField : function(t, label,name,d)
	{
		if ( t )
		{
	 	    return new Ext.form.TimeField({
			 	  fieldLabel: label, 
	        	  value : d, 
	        	  name: name, 
	        	  format:'H:i:s'
	            });
		}
		else
		{
	 	    return new Ext.form.DateField({
		 	  fieldLabel: label, 
        	  value : d, 
        	  name: name, 
        	  format:'m/d/Y'
            });
		}
	},
	
    buildForm : function() {
        return [
                
                this.hiddenFileId,   
                {fieldLabel: '文件名', xtype:'displayfield', name: 'uploadName'},
                this.fileTitleField,
                this.titleField,
                projectList,
//                this.publishType,
                this.buildDateTimeField(false, '开始日期', 'startDate', new Date() ),
                this.buildDateTimeField(true, '开始时间', 'startTime', new Date() ),
                this.buildDateTimeField(false, '结束日期', 'endDate', new Date() ),
                this.buildDateTimeField(true, '结束时间', 'endTime', new Date().add(Date.MINUTE, 60) )
//                { fieldLabel: '开始日期', xtype:'datefield', value : new Date(), name:'startDate', format:'m/d/Y'},
//                { fieldLabel: '开始时间', xtype:'timefield', value : new Date(), name:'startTime', format:'H:i:s'},
//                { fieldLabel: '结束日期', xtype:'datefield', name:'endDate'},
//                { fieldLabel: '结束时间', xtype:'timefield', name:'endTime'} 
            ];
    },
    
    buildPublishType : function()
    {

		var reader = new Ext.data.JsonReader(
		        {
		            totalProperty: 'total',
		            root:'data',
		            id :'id'
		        },
		        [
		         { name : 'id'}, 
		         { name : 'name'},
		        ]
		  );
        var store = new Ext.data.Store( {
			id : 1,
			fields : [ 'id', 'name' ],
			url : 'training/entrymgr!getPublishTypeList.action',
			reader : reader,
			scope : this
			});

		this.publishType = new Ext.form.ComboBox( {
			store : store,
			typeAhead : true,
			triggerAction : 'all',
			lazyRender : true,
			//value : '1',
			fieldLabel : '类型',
			mode : 'local',
			name : 'publishType1',
			hiddenName : 'publishType',
			valueField : 'id',
			displayField : 'name',
			editable:false,
			allowBlank:false,
			forceSelection: true
		});		
        store.load( {
        	scope : this,
        	callback: function()
        	{
        	    this.publishType.setValue('1');
        	}
        	});    	
    	
    },
	
    buildUI : function(){
        return [
           
          {	text:'保存',	 scope: this,handler:this.onSave},
          { text:'取消', scope: this,handler:this.onClose }
        ];
	},
	

    newWindow : function( title, form )
    {
    	return new Ext.Window({
    	    title: title,
    	    closable:true,
    	    width:650,
    	    height:300,
    	    constrain:true,
    	    plain:true,
    	    layout: 'border',
    	    items: [form]
    	    });    	
    },	
    
    /**
     * onUpdate
     */
	onClose: function(btn, ev)
	{
    	 this.fireEvent( "afterSave" );
	},
	
	saveOk : function(f,o)
	{
 	     App.setAlert(true, "保存成功。");
   	     this.fireEvent( "afterSave" );
 	     
	},
	
	saveError : function(f,o)
	{
	     App.setAlert(false, "网络出现错误。");
	},
	
	onSelectFileOk : function(f,rec)
	{
		this.getForm().loadRecord(rec);
		this.hiddenFileId.setValue(rec.get('id'));
		this.fileTitleField.setValue(rec.get('title'));	
		//alert(rec.get('title'));
	},
	
	onSelectFile : function(f,o)
	{
		var form = new com.cce.training.SelectFileForm();
		this.win = this.newWindow( "选择文件", form );
		form.on('selectFileOk', this.onSelectFileOk, this);
		form.setWin( this.win );
		this.win.show();
	},	

	
    onSave : function(btn, ev) {
        //if (this.record == null) {
        //    return;
        //}
        if (!this.getForm().isValid()) {
            App.setAlert(false, "表单数据有错误.");
            return false;
        }        
        
        this.getForm().submit( {
			url : 'training/entrymgr!saveFunc.action',
			waitMsg : '正在保存数据...',
			scope : this,
			success : this.saveOk,
            failure: this.saveError                
		});          

    }
});