Ext.ns("com.cce.training");
com.cce.training.FileInfoForm = Ext.extend(Ext.form.FormPanel, {
	title: '文件信息',
	modal:true,
	//iconCls: 'silk-user',
	labelAlign: 'right',
	labelWidth: 60,
	width: 300,
	header: false,
	frame: true,
	fileUpload : false,
	region:'center',
	defaultType:'textfield',
    defaults: {
        anchor: '100%'
    },
    fileType : null,
    // private A pointer to the currently loaded record
    record : null,
    win : null,
    
    setWin : function(w)
    {
    	this.win = w;
    },
    
    initComponent : function() {
		// build the form-fields.  Always a good idea to defer form-building to a method so that this class can
	    // be over-ridden to provide different form-fields
	    this.buildFileType();
	    
	    this.items = this.buildForm();
	
	    // build form-buttons
	    this.buttons = this.buildUI();
	
	    // add a create event for convenience in our application-code.
	
	    // super
	    com.cce.training.FileInfoForm.superclass.initComponent.call(this);
	},
	
	buildFileType:function()	{
		
		var reader = new Ext.data.JsonReader(
		        {
		            totalProperty: 'total',
		            root:'data',
		            id :'id'
		        },
		        [
		         { name : 'id'}, 
		         { name : 'name'},
		         { name : 'baseDir'},
		         { name : 'baseUrl'}
		        ]
		  );
        var store = new Ext.data.Store( {
			id : 1,
			fields : [ 'id', 'name' ],
			url : 'training/filemgr!getTypeInfoList.action',
			reader : reader,
			scope : this
			});

		this.fileType = new Ext.form.ComboBox( {
			store : store,
			typeAhead : true,
			triggerAction : 'all',
			lazyRender : true,
			//value : '1',
			fieldLabel : '类型',
			mode : 'local',
			name : 'fileType1',
			hiddenName : 'type',
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
        	    this.fileType.setValue('1');
        	}
        	});
	},
	
    loadRecord : function(rec) {
        this.record = rec;     
        this.getForm().loadRecord(this.record);

    },
	
    /**
     * buildform
     * @private
     */
    buildForm : function() {
        return [
                {xtype:'hidden', name : 'id'},    
                {fieldLabel: '原文件名', xtype:'displayfield', name: 'uploadName'},
                {fieldLabel: '文件标题(不得少于6个字)', name: 'title', allowBlank: false,
                	regex: /^(?:[\u4e00-\u9fa5]*\w*\s*){6}$/               	},
                this.fileType
            ];
    },
	
    buildUI : function(){
        return [
          {	text:'发布',	 scope: this,handler:this.onSave},
          { text:'退出', scope: this,handler:this.onClose }
        ];
	},
	

    
    /**
     * onUpdate
     */
	onClose: function(btn, ev)
	{
		//this.fireEvent( "abc" );
		this.win.close();
	},
	
	saveOk : function(f,o)
	{
 	      App.setAlert(true, "保存成功.");
   	      this.fireEvent( "afterSave" );
 	      this.win.close();
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
			url : 'training/filemgr!updateInfo.action',
			waitMsg : '正在保存数据...',
			scope : this,
			success : this.saveOk,
            failure: function(f,o){
                 
                }
			});          

    }
});