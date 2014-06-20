Ext.ns("com.cce");
//------------------------------------------------------------------------------
//	Module定义..
//------------------------------------------------------------------------------
com.cce.Module = function(container){
	com.cce.Module.superclass.constructor.call(this);
	this.main = container;
    this.init();
};

Ext.extend(com.cce.Module, Ext.util.Observable, {
	init: Ext.emptyFn
});

Ext.form.TextField.override({   
    initComponent: Ext.form.TextField.prototype.initComponent.createInterceptor(function(){   
        if (this.allowBlank === false && this.fieldLabel) {   
            this.fieldLabel += '<font color=red>*</font>';   
        }   
    })   
});  

//------------------------------------------------------------------------------
//	App定义..
//------------------------------------------------------------------------------
com.cce.App = function(config) {
	Ext.BLANK_IMAGE_URL = 'images/blank.gif';
	Ext.state.Manager.setProvider(new Ext.state.CookieProvider());
	Ext.QuickTips.init();
	Ext.apply(this, config);
    Ext.onReady(this.onReady, this);
    
	//com.cce.App.superclass.constructor.apply(this, config);
	this.loadMask = null;
};

Ext.extend(com.cce.App, Ext.util.Observable, {
	 /**
     * response status codes.
     */
    STATUS_EXCEPTION :          'exception',
    STATUS_VALIDATION_ERROR :   "validation",
    STATUS_ERROR:               "失败",
    STATUS_NOTICE:              "notice",
    STATUS_OK:                  "成功",
    STATUS_HELP:                "help",
    
    // private, ref to message-box Element.
    msgCt : null,

    // @protected, onReady, executes when Ext.onReady fires.
    onReady : function() {
        // create the msgBox container.  used for App.setAlert
        this.msgCt = Ext.DomHelper.insertFirst(document.body, {id:'msg-div'}, true);
        this.msgCt.setStyle('position', 'absolute');
        this.msgCt.setStyle('z-index', 9999);
        this.msgCt.setWidth(300);
        
        this.buildView();
        this.initListeners();
    },
    
    showMask : function() {
		if (!this.loadMask) {
			this.loadMask = new Ext.LoadMask(Ext.getBody());
			this.loadMask.show();
		}
	},

    hideMask : function() {
		if (this.loadMask) {
			this.loadMask.hide();
			this.loadMask = null;
		}
	},
    
    /***************************************************************************
	 * setAlert show the message box. Aliased to addMessage
	 * 
	 * @param {String}
	 *            msg
	 * @param {Bool}
	 *            status
	 */
    setAlert : function(status, msg) {
        this.addMessage(status, msg);
    },

    /***
     * adds a message to queue.
     * @param {String} msg
     * @param {Bool} status
     */
    addMessage : function(status, msg) {
    	
    	 
    	
        var delay = 3;    // <-- default delay of msg box is 1 second.
        if (status == false) {
            delay = 5;    // <-- when status is error, msg box delay is 3 seconds.
        }
        // add some smarts to msg's duration (div by 13.3 between 3 & 9 seconds)
        delay = msg.length / 13.3;
        if (delay < 3) {
            delay = 3;
        }
        else if (delay > 9) {
            delay = 9;
        }

        this.msgCt.alignTo(document, 't-t');
        Ext.DomHelper.append(this.msgCt, {html:this.buildMessageBox(status, String.format.apply(String, Array.prototype.slice.call(arguments, 1)))}, true).slideIn('t').pause(delay).ghost("t", {remove:true});
    },

    /***
     * buildMessageBox
     */
    buildMessageBox : function(title, msg) {
        switch (title) {
            case true:
                title = this.STATUS_OK;
                break;
            case false:
                title = this.STATUS_ERROR;
                break;
        }
        return [
            '<div class="app-msg">',
            '<div class="x-box-tl"><div class="x-box-tr"><div class="x-box-tc"></div></div></div>',
            '<div class="x-box-ml"><div class="x-box-mr"><div class="x-box-mc"><h3 class="x-icon-text icon-status-' + title + '">', title, '</h3>', msg, '</div></div></div>',
            '<div class="x-box-bl"><div class="x-box-br"><div class="x-box-bc"></div></div></div>',
            '</div>'
        ].join('');
    },

    /**
     * decodeStatusIcon
     * @param {Object} status
     */
    decodeStatusIcon : function(status) {
        iconCls = '';
        switch (status) {
            case true:
            case this.STATUS_OK:
                iconCls = this.ICON_OK;
                break;
            case this.STATUS_NOTICE:
                iconCls = this.ICON_NOTICE;
                break;
            case false:
            case this.STATUS_ERROR:
                iconCls = this.ICON_ERROR;
                break;
            case this.STATUS_HELP:
                iconCls = this.ICON_HELP;
                break;
        }
        return iconCls;
    },

    /**
     * t
     * translation function.  needs to be implemented.  simply echos supplied word back currently.
     * @param {String} to translate
     * @return {String} translated.
     */
    t : function(words) {
        return words;
    },

    handleResponse : function(res) {
        if (res.type == this.STATUS_EXCEPTION) {
            return this.handleException(res);
        }
        if (res.message.length > 0) {
            this.setAlert(res.status, res.message);
        }
    },

    handleException : function(res) {
        Ext.MessageBox.alert(res.type.toUpperCase(), res.message);
    }
});

//------------------------------------------------------------------------------
//	系统组件定义..
//------------------------------------------------------------------------------


//com.cce.component.RegionTreeCombo = Ext.extend(Ext.form.ComboBox, {
//	initComponent : function() {
//		this.tree = new Ext.tree.TreePanel({   
//	        loader: new Ext.tree.TreeLoader({ dataUrl : 'security/region!treelist.action' }),
//	        border:false,
//	        height : 200,
//	        frame : true,
//	        rootVisible : false,
//	        root : new Ext.tree.AsyncTreeNode()
//    	});
//    	this.tree.on('click', function(node){
//    		this.setValue(node.text);
//    		//this.collapse();
//    	}, this);
//    	
//    	//Ext.apply(this, { tpl:"<tpl for='.'><div style='height:200px'><div id='tree'></div></div></tpl>"});
//		com.cce.component.RegionTreeCombo.superclass.initComponent.call(this);
//	},
//	hiddenName:'region_id',
//	store:new Ext.data.SimpleStore({fields:[],data:[[]]}),   
//    editable:false,   
//    mode: 'local',   
//    triggerAction:'all',
//    maxHeight: 200,
//    selectedClass:'',
//    fieldLabel:"所属地区",
//    onSelect:Ext.emptyFn,
//    tpl: "<tpl for='.'><div style='height:200px'><div id='tree'></div></div></tpl>",
//    onSelect:function(record, index){
//    	this.tree.render('tree');
//        if(this.fireEvent('beforeselect', this, record, index) !== false){
//            //this.fireEvent('select', this, record, index);
//        }
//    }
//})

		
		