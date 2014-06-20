Ext.ns("com.cce.map");
ScriptMgr.load({ scripts: ['javascript/utils/GMapPanel.js']});
//------------------------------------------------------------------------------
//Module的proxy定义..
//------------------------------------------------------------------------------
var proxy = new Ext.data.HttpProxy({
	api: {
		    read : 'map/map!list.action'   
		}
});
//------------------------------------------------------------------------------
//Module的reader定义..
//------------------------------------------------------------------------------
var rt = new Ext.data.Record.create(
    [ 
        	{name: 'city',mapping:"regionName"},
        	{name: 'baqyfb_num',mapping:"entDistNum"},
        	{name: 'whhclfb_num',mapping:"innoDistNum"},
        	{name: 'jsryfb_num',mapping:"techDistNum"}
    ]
);

Ext.extend(com.cce.Module, {
	win: null,
	init: function(){
		
	   this.store = new Ext.data.Store({
		    proxy: proxy,
		    reader: new Ext.data.JsonReader({root:'data'},rt)

		});
	   this.mappanel = new Ext.ux.GMapPanel({
				zoomLevel: 4,
	            gmapType: 'map',
	            mapConfOpts: ['enableScrollWheelZoom','enableDoubleClickZoom','enableDragging','enableContinuousZoom'],
	            mapControls: ['GMapTypeControl','NonExistantControl'],
	            setCenter: {
	                geoCodeAddr: '山东省',
	                marker: {title: '山东省'}
	            },
	            tbar:[
	                  	{
	                  		text:'放大',
	                  		iconCls:"zoom_in",
	        				scope: this,
	        				handler:function(){
	                  			this.mappanel.zoomIn();
	                  		}
	                  	},
	                  	{
	                  		text:'缩小',
	                  		iconCls:"zoom_out",
	        				scope: this,
	        				handler:function(){
	                  			this.mappanel.zoomOut();
	                  		}
	                  	},
	                  	"-",
						{
							xtype:"checkbox",
							id:'baqyfb',
							fieldLabel:"标签",
							boxLabel:"备案企业分布"
							
						},
						"-",
						{
							xtype:"checkbox",
							id:'whhclfb',
							fieldLabel:"标签",
							boxLabel:"无害化处理分布"
						},
						"-",
						{
							xtype:"checkbox",
							id:'jsryfb',
							fieldLabel:"标签",
							boxLabel:"技术人员分布"
							 
						}
	            
	            ]
	    });
		
		Ext.getCmp('baqyfb').on('check',this.checkType,this);
		Ext.getCmp('whhclfb').on('check',this.checkType,this);
		Ext.getCmp('jsryfb').on('check',this.checkType,this);
		
		
		
	  	this.main.add(this.mappanel);
	  	this.main.doLayout();
		this.store.load({
			scope:this,
            callback:function(records,options,succees){
				
				
				var count=records.length;

				for(i=0;i<count;i++)
				{
					this.mappanel.addMarkersForAddress(records[i].get('city'),records[i].get('baqyfb_num'),records[i].get('whhclfb_num'),records[i].get('jsryfb_num'));
				}
            }
        });
	},
	checkType:function(obj,isChecked){
		
		this.mappanel.clearMap();
		
		var baqyfb_be=Ext.getCmp('baqyfb').getValue();
		
		var whhclfb_be=Ext.getCmp('whhclfb').getValue();
		
		var jsryfb_be=Ext.getCmp('jsryfb').getValue();
		
		var record = new this.store.recordType({
					fetchEnt:Ext.getCmp('baqyfb').getValue(),
					fetchInno:Ext.getCmp('whhclfb').getValue(),
					fetchTech:Ext.getCmp('jsryfb').getValue()
					
        });
		
		this.store.load({
			scope:this,
			params : { 
	        	data:Ext.encode(record.data)
        	},
        	callback:function(records,options,succees){
				
				var count=records.length;
 
				for(i=0;i<count;i++)
				{
					this.mappanel.addMarkersForAddress(records[i].get('city'),records[i].get('baqyfb_num'),records[i].get('whhclfb_num'),records[i].get('jsryfb_num'));
				}
            }
            
        });
		
	}
});
