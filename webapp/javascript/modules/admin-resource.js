Ext.ns("com.cce.resource");

ScriptMgr.load({ scripts: ['javascript/utils/RowEditor.js']}); //载入插件

var proxy = new Ext.data.HttpProxy({
    api: {
	    read : 'security/resource!list.action',
	    create : 'security/resource!save.action',
	    update : 'security/resource!save.action',
	    destroy: 'security/resource!delete.action'
	}
});

var reader = new Ext.data.JsonReader({
	    totalProperty: 'total',
	    successProperty: 'success',
	    idProperty: 'id',
	    root: 'data',
	    messageProperty: 'message'  // <-- New "messageProperty" meta-data
	}, [
	    {name: 'id',mapping:"id"},
	    {name: 'module',mapping:"module"},	
	    {name: 'auth_names',mapping:"authDisplayNames"},	
	    {name: 'res_type',mapping:"resourceType"},
	    {name: 'res_value',mapping:"value"},
	    {name: 'res_position',mapping:"position",type : 'int'}
]);

var writer = new Ext.data.JsonWriter({
    encode: true,
    writeAllFields: false //必须回传所有字段?
});

var store = new Ext.data.Store({
    id: 'id',
    proxy: proxy,
    reader: reader,
    writer: writer,  // <-- plug a DataWriter into the store just as you would a Reader
    autoSave: false
});
var editor = new Ext.ux.grid.RowEditor({
    saveText: '提交',
    cancelText:'取消'
});

//------------------------------------------------------------------------------
//form-autCombox的store定义
//------------------------------------------------------------------------------
var authStore=new Ext.data.Store({
	url:"security/resource!authorities.action",
	reader: new Ext.data.JsonReader({ 
		root:'data',
		fields:['authId','authName','checked']
	})
});
authStore.load();

// shorthand alias
var fm = Ext.form; 
//var lovcb = new Ext.ux.form.LovCombo({
//		   name:"auth_ids",
//		   store:authStore,
//		   mode:'local',
//		   triggerAction:'all',
//		   hideTrigger:false,
//		   allowBlank:true,
//		   displayField:'authName',
//		   valueField:'authId',
//		   emptyText:'请选择菜单',
//		   editable:false
//});

var cm = new Ext.grid.ColumnModel([
      new Ext.grid.RowNumberer(),
      {header:'资源类型', dataIndex:'res_type', sortable:true},
      {header:'访问权限', dataIndex:'auth_names', sortable:true},
      {header:'模块', dataIndex:'module', sortable:true, editor: new fm.TextField({allowBlank: true})},
      {header:'值', dataIndex:'res_value', sortable:true, editor: new fm.TextField({allowBlank: false})},
      {header:'位置',dataIndex:'res_position',sortable:true, editor: new fm.NumberField({allowBlank: false})}
]);

Ext.extend(com.cce.Module, {
    init: function(){
	
	this.grid = new Ext.grid.GridPanel({
        enableHdMenu: false,
	    header:false,
	    region:'center',
	    closable:true,
        title:'资源管理',
        store: store,
        cm: cm, 
        plugins: [editor],
        autoExpandColumn:"res_value",
        viewConfig: {
            forceFit:true
        },
        tbar:[
	  			{
	  			 	text:"添加资源",
	  				iconCls:"res_add",
	  				scope:this,
	  				handler:function(){
						var Resource = this.grid.getStore().recordType;
						var res = new Resource({
							res_type:'url',
							module:'',
							auth_names:'',
							res_value:'1',
							res_position:1
						});
						editor.stopEditing();
						this.grid.getView().refresh();
						this.grid.getSelectionModel().selectRow(0);
						store.insert(0, res);
						editor.startEditing(0);
						//this.grid.startEditing(0, 1);
	  			    }
	  			},
	  			{
	  			 	text:"删除资源",
	  				iconCls:"res_delete",
	  				scope:this,
	  				handler:function(){
	  				 	editor.stopEditing();
		  				var selected = this.grid.getSelectionModel().getSelected();
		  		        if (!selected) {
		  		            return false;
		  		        }
		  				  var rows=this.grid.getSelectionModel().getSelections();
		  			      Ext.Msg.confirm('确认删除', '你确定删除该条记录?', function(btn) {
		  						if (btn == 'yes') {
		  					        for(var i=0;i<rows.length;i++)
		  					        {
		  					        	store.remove(rows[i]);
		  					        }
		  					            store.save();
		  						}
		  			      });
							 
		  			    }
	  			}
	  			
	  		],
		    bbar: new Ext.PagingToolbar({ pageSize: 20, store: store, displayInfo: true })
    });
	
	editor.on('canceledit',function(editr,b,r){
		if(r.get('id')==null||r.get('id')=="")
		{
			this.grid.getSelectionModel().selectRow(0);
			var selected = this.grid.getSelectionModel().getSelected();
			if (!selected) {
	            return false;
		     }
				 var rows=this.grid.getSelectionModel().getSelections();
			 
			     for(var i=0;i<rows.length;i++)
			     {
			    	 store.remove(rows[i]);
			     }
			     store.save();
			     store.reload();
			}
		
	});
	
    this.main.add(this.grid);
    this.main.doLayout();
	
    store.load({params:{start:0,limit:20}});    // 初始时显示第 1 页，每页显示 10 条数据    
    }//end of init
});