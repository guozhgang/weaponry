Ext.ns("com.cce.training");
com.cce.training.UploadForm = Ext.extend(Ext.form.FormPanel, {
	title: '文件上传',
	modal:true,
	//iconCls: 'silk-user',
	labelAlign: 'right',
	labelWidth: 60,
	width: 300,
	header: false,
	frame: true,
	fileUpload : true,
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
    	//this.win.show();
    },
    initComponent : function() {
		// build the form-fields.  Always a good idea to defer form-building to a method so that this class can
	    // be over-ridden to provide different form-fields
	    this.buildFileType();
	    
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
	        closewin : true
	    });

	    // super
	    com.cce.training.UploadForm.superclass.initComponent.call(this);
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
			id : 'fileType1',
			hiddenName : 'fileType',
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
	
	
    /**
     * buildform
     * @private
     */
    buildForm : function() {
        return [
                
                {fieldLabel: '文件标题', name: 'title', allowBlank: false,
                	regex: /^(?:[\u4e00-\u9fa5]*\w*\s*){6}$/ },
                this.fileType,
        		{
                	xtype : 'fileuploadfield',
        			id : 'file',
        			emptyText : '选择文件',
        			fieldLabel : '文件',
        			name : 'upload',
        			buttonText : '选择文件',
        			allowBank : false
        		}
            ];
    },
	
    buildUI : function(){
        return [
          {	text:'上传',	 scope: this, handler:this.onUpload},
          { text:'重置', scope: this, handler:this.onReset},
          { text:'关闭', scope: this, handler:this.onClose}
        ];
	},
	
    onReset: function(f,o)
    {
        this.getForm().reset();
		
    },

    onClose: function(f,o)
    {
        this.fireEvent( "aftersave" );
        this.win.close();		
    },
    
    /**
     * onUpdate
     */
    
	onUploadOk: function(f,o)
	{
   	    App.setAlert(true, "上传成功。");
   	    this.getForm().reset();
   	    this.fireEvent( "afterSave" );
   	    this.win.close();
   	    //this.fireEvent('closewin', this, null);
   		
	},
    onUpload : function(btn, ev) {
        //if (this.record == null) {
        //    return;
        //}
        if (!this.getForm().isValid()) {
            App.setAlert(false, "表单数据有错误.");
            return false;
        }
        var isOk=true;
        
        if(Ext.getCmp('fileType1').getValue()=='1')
        {
        	if(this.isDownFile(Ext.getCmp('file').getValue()))
        	{
        		isOk=true;
        	}
        	else
        	{
        		isOk=false;
        	}
        }
        else 
        {
        	if(this.isVidoFile(Ext.getCmp('file').getValue()))
        	{
        		isOk=true;
        	}
        	else
        	{
        		isOk=false;
        	}
        }
        if(isOk)
        {
	        this.getForm().submit( {
				url : 'training/upload.action',
				waitMsg : '正在上传文件...',
				scope : this,
				success : this.onUploadOk, 
	            failure: function(f,o){
	                 App.setAlert(false, "上传失败." + o.result.message );
	                return false;                	
	                }
					//fp.getForm().reset();
				});
        }
        //return false;        
        //this.fireEvent('save', this, this.record);
    },
    isDownFile:function(s){
    	
    	var patrn = /[.](doc|docx|txt|xls|rar|zip|pdf)$/;
		
		if(s!='')
		{
		
		    s=s.toLocaleLowerCase(); //全部转换成小写
		    
		    
			if (!patrn.exec(s)) {
				
			   Ext.getCmp('file').markInvalid('请上传正确的文件格式(doc|docx|txt|xls|rar|zip)');
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
    isVidoFile:function(s){
    	var patrn = /[.](flv)$/;
		
		if(s!='')
		{
		
		    s=s.toLocaleLowerCase(); //全部转换成小写
		    
			if (!patrn.exec(s)) {
			   
				Ext.getCmp('file').markInvalid('请上传正确的文件格式(flv)');
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