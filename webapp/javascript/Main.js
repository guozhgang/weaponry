Ext.ns("com.cce");

/**
 * 扩展主程序,创建页面布局
 */
com.cce.WeaponryApp = Ext.extend(com.cce.App, {
	/*
	 * 创建页面布局
	 */
	buildView : function() {
	
		/*
		 * 1.创建head部分
		 */
		var head = new Ext.BoxComponent({region:'north', el:'header', height:45});	 

		/*
		 * 2.创建foot部分
		 */
		var foot = new Ext.BoxComponent({region:'south', el:'footer', height:24});
	
		/*
		 * 3.创建左侧栏树状菜单, 从dataUrl位置获取Json数据.
		 */
		var leftMenu = new Ext.tree.TreePanel({
	    	id: 'tree-panel',
	    	title: '功能菜单',
	        region:'west',
	        margins:'1 0 0 1',
	        split: true,
	        width: 200,
	        minSize: 150,
	        maxSize: 250,
	        autoScroll: true,
	        border: true,
	    	collapsible: true,
	        rootVisible: false,
	        lines: false,
	        singleExpand: true,
	        useArrows: true,
	        root: new Ext.tree.AsyncTreeNode(),
	        loader: new Ext.tree.TreeLoader({
	            dataUrl:'security/menu!tree.action',
	            root:'data'
	        }),
	        
	        /*
			 * 切换TabPanel标签方法:右侧切换tab时,同步更新左侧菜单树的选中节点.
			 * 如果存在相应树节点，就选中,否则就清空选择状态
			 */
			updateNodeStatus : function(nodeId){
			    var node = this.getNodeById(nodeId);
			    if(node && node.parentNode){
			    	if(!node.parentNode.isExpanded()){
			    		var path = node.parentNode.getPath("id");
			            this.expandPath(path);
			    	}
			    	this.getSelectionModel().select(node);
			    }else{
			        this.getSelectionModel().clearSelections();
			    }   
			}
	    });
	
		/*
		 * 4.创建主窗口
		 */
		var mainPanel = new Ext.TabPanel( {
			jsFilePath : 'javascript/modules/',
			style : 'padding:1 0 0 0',
			autoScroll : true,
			region : 'center',
			activeTab : 0,
			resizeTabs : false,
			inTabWidth : 100,
			tabWidth : 90,
			enableTabScroll : true,
			_cache : {},
			items : [{title: '首 页 ', layout: 'fit', bodyStyle: 'padding:0px;MARGIN: 0px;', contentEl: 'start-div',scrolling:'yes'}],
			
			loadTab : function(node) {
				var id = 'tab-' + node.id;
				var tab = this.getComponent(id);
				var panel = null;
				if (tab) {
					this.setActiveTab(tab);
				} else {
					panel = new Ext.Panel({id: id, title: node.text, layout: 'fit', closable: true});
					this.loadModule(node, panel);
					this.setActiveTab(this.add(panel));
					panel.on('close',function(p){					    
						var id=p.getId().substring(4,p.getId().length);						
						if(this._cache[id]){
							delete this._cache[id];
						}
					},this);
					
//					panel.on('show',function(c){
//						
//						var id=c.getId().substring(4,c.getId().length);				
//						 
//						new this._cache[id](panel);
//					},this);
				}
			},
//			loadInbox : function() {
//				var id = 'tab-message-inbox';
//				var tab = this.getComponent(id);
//				var panel = null;
//				if (tab) {
//					this.setActiveTab(tab);
//				} else {
//					panel = new Ext.Panel({id: id, title: '收件箱', layout: 'fit', closable: true});
//					this.loadModule('message-inbox', panel);
//					this.setActiveTab(this.add(panel));
//				}
//			},
			loadModule : function(node, tb) {
				//如果模块类已存在，就直接实例化
			   
				if(this._cache[node.id]){
					new this._cache[node.id](tb);
				}
				//如果缓存中未找到Panel,则加载js文件
				else{
		            Ext.Ajax.request({
		                method:'GET',
		                url: this.jsFilePath + node.attributes.nodeId + '.js',
		                scope: this,
		                success: function(response){
		                    this._cache[node.id] = eval(response.responseText);
		                    new this._cache[node.id](tb);
		                }
		            });
				}
			}
		});
	
		/*
		 * 5.建立leftMenu和mainTab两者之间的关系
		 * 
		 * 命名约定: node.id = javascript文件名(不含.js后缀) 
		 * 使用javascript文件名(不含.js后缀)作为菜单节点(Node)的node.id,
		 * 后台开发人员需要遵照此规定命名Menu类的nodeId字段.
		 * MainPanel将在处理菜单节点(Node)的点击事件时,根据node.id动态加载js文件,创建TabPanel.
		 */
		leftMenu.on("click", function(node) {
			if(node.isLeaf()){ 
				com.cce.WeaponryApp.superclass.showMask();
				mainPanel.loadTab(node);
				com.cce.WeaponryApp.superclass.hideMask();
			}
		});
		mainPanel.on("tabchange", function(pl,tab){
			var nodeId = tab.id.replace('tab-','');
			leftMenu.updateNodeStatus(nodeId);
		});
		 
//		var el=Ext.get('inboxNew');
//		
//		Ext.Ajax.request({
//            method:'GET',
//            url: 'message/inner-message!newMsgNumber.action',
//            scope: this,
//            success: function(response){
//				 var count=response.responseText;
//				 //var count=10;
//				 if(count>0)
//				 {
//					 el.dom.innerHTML ='新邮件('+count+')';
//					 el.addClass('inbox_new');
//				 }
//				 else
//				 {
//					 el.dom.innerHTML='收件箱';
//				 }
//            }
//        });
//		
//		el.on('click',function(e,t){
//			mainPanel.loadInbox();
//			el.dom.innerHTML='收件箱';
//			el.removeClass('inbox_new');
//		});
		
		/*
		 * 6.创建布局
		 */
		var viewport = new Ext.Viewport( {
			layout : 'border',
			style : 'border:#024459 1px solid;',
			items : [head, foot, leftMenu, mainPanel]
		});

	},
	
	initListeners : function(){
		
		//centralized listening of DataProxy events "beforewrite", "write" and "writeexception"
		//upon Ext.data.DataProxy class.  This is handy for centralizing user-feedback messaging into one place rather than
		//attaching listenrs to EACH Store.
		
		/**
		 * Listen to all DataProxy beforewrite events
		 */
		Ext.data.DataProxy.addListener('beforewrite', function(proxy, action) {
			//TODO:在此处加入弹出对话框, 如果action是delete, 请用户确认是否执行...
			//App.setAlert(App.STATUS_NOTICE, "Before " + action);
		});
		
		/**
		 * Listen to all DataProxy write events
		 */
		Ext.data.DataProxy.addListener('write', function(proxy, action, data, response, records, options) {
		 	var msg = response.message ? response.message : response.raw.message;
//			App.setAlert(true, action + ':' + msg);
		 	App.setAlert(true,  msg);
		});
 
		
		/**
		 * Listen to all DataProxy exception events
		 */
		Ext.data.DataProxy.addListener('exception', function(proxy, type, action, options, response) {
			if (type === 'remote'||type ==='response') {
				if(response.responseText!=null&&response.responseText!='')
				{
					var msg = Ext.util.JSON.decode(response.responseText).message
					var success = Ext.util.JSON.decode(response.responseText).success
					App.setAlert(success,msg);
				} else if(response.success==false){
					var msg = response.message ? response.message : response.raw.message;
					App.setAlert(response.success,msg);
					
				}
			}
		});
	},
	
	/*
	 * 转换系统消息
	 */
	t : function(words){
		//TODO: switch words, return differten message...
		return words;
	}
	
});



//创建主程序
App = new com.cce.WeaponryApp();

