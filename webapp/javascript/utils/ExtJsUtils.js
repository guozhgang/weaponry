/**
 * Add the additional 'advanced' VTypes
 * 日期验证, 重复密码验证
 */
Ext.apply(Ext.form.VTypes, {
    daterange : function(val, field) {
        var date = field.parseDate(val);

        if(!date){
            return false;
        }
        if (field.startDateField && (!this.dateRangeMax || (date.getTime() != this.dateRangeMax.getTime()))) {
            var start = Ext.getCmp(field.startDateField);
            start.setMaxValue(date);
            start.validate();
            this.dateRangeMax = date;
        }
        else if (field.endDateField && (!this.dateRangeMin || (date.getTime() != this.dateRangeMin.getTime()))) {
            var end = Ext.getCmp(field.endDateField);
            end.setMinValue(date);
            end.validate();
            this.dateRangeMin = date;
        }
        /*
         * Always return true since we're only using this vtype to set the
         * min/max allowed values (these are tested for after the vtype test)
         */
        return true;
    },

    passwordText : '两次输入的密码不匹配!',
    password : function(val, field) {
        if (field.initialPassField) {
            var pwd = Ext.getCmp(field.initialPassField);
            return (val == pwd.getValue());
        }
        return true;
    }
});

/**
 * Ext.ux.ComboBoxTree
 */
Ext.ux.ComboBoxTree = function(){
	this.treeId = Ext.id()+'-tree';
	this.maxHeight = arguments[0].maxHeight || arguments[0].height || this.maxHeight;
	this.tpl = new Ext.Template('<tpl for="."><div style="height:'+this.maxHeight+'px"><div id="'+this.treeId+'"></div></div></tpl>');
	this.store = new Ext.data.SimpleStore({fields:[],data:[[]]});
	this.selectedClass = '';
	this.mode = 'local';
	this.triggerAction = 'all';
	this.onSelect = Ext.emptyFn;
	this.editable = false;
	
	//all:所有结点都可选中
	//exceptRoot：除根结点，其它结点都可选（默认）
	//folder:只有目录（非叶子和非根结点）可选
	//leaf：只有叶子结点可选
	this.selectNodeModel = arguments[0].selectNodeModel || 'exceptRoot';
	
	this.addEvents('afterchange');

	Ext.ux.ComboBoxTree.superclass.constructor.apply(this, arguments);

}
//-----------------------------------------------------------------------------
//		ScriptLoaderMgr
//-----------------------------------------------------------------------------
ScriptLoader = function() {
	this.timeout = 30;
	this.scripts = [];
	this.disableCaching = false;
	this.loadMask = null;
	this.responseEval = null;
};

ScriptLoader.prototype = {
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

	processSuccess : function(response) {
		this.scripts[response.argument.url] = true;
		this.responseEval = window.execScript ? window.execScript(response.responseText) : window
				.eval(response.responseText);
		if (response.argument.options.scripts.length == 0) {
			this.hideMask();
		}
		if (typeof response.argument.callback == 'function') {
			response.argument.callback.call(response.argument.scope);
		}
	},

	processFailure : function(response) {
		this.hideMask();
		Ext.MessageBox.show({
					title : 'Application Error',
					msg : 'Script library could not be loaded.',
					closable : false,
					icon : Ext.MessageBox.ERROR,
					minWidth : 200
				});
		setTimeout(function() {
					Ext.MessageBox.hide();
				}, 3000);
	},

	load : function(url, callback) {
		var cfg, callerScope;
		if (typeof url == 'object') { // must be config object
			cfg = url;
			url = cfg.url;
			callback = callback || cfg.callback;
			callerScope = cfg.scope;
			if (typeof cfg.timeout != 'undefined') {
				this.timeout = cfg.timeout;
			}
			if (typeof cfg.disableCaching != 'undefined') {
				this.disableCaching = cfg.disableCaching;
			}
		}

		if (this.scripts[url]) {
			if (typeof callback == 'function') {
				callback.call(callerScope || window);
			}
			return null;
		}

		this.showMask();

		Ext.Ajax.request({
					url : url,
					async:false,
					success : this.processSuccess,
					failure : this.processFailure,
					scope : this,
					timeout : (this.timeout * 1000),
					disableCaching : this.disableCaching,
					argument : {
						'url' : url,
						'scope' : callerScope || window,
						'callback' : callback,
						'options' : cfg
					}
				});
	}
};

ScriptLoaderMgr = function() {
	this.loader = new ScriptLoader();
	this.load = function(o) {
		if (!Ext.isArray(o.scripts)) {
			o.scripts = [o.scripts];
		}
		o.url = o.scripts.shift();
		if (o.scripts.length == 0) {
			this.loader.load(o);
		} else {
			o.scope = this;
			this.loader.load(o, function() {
						this.load(o);
					});
		}
		return this.loader.responseEval;
	};
};

ScriptMgr = new ScriptLoaderMgr(); 

// ----- 用法示例 -----
//  ScriptMgr.load({
//	  scripts: ['/js/other-prerequisite.js', '/js/other.js'],
//	  callback: function() {
//	    var other = new OtherObject();
//	    alert(other); //just loaded
//	  }
//	}); 

//-----------------------------------------------------------------------------
//		End of ScriptLoaderMgr
//-----------------------------------------------------------------------------

