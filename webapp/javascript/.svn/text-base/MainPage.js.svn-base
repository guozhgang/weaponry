Ext.onReady(function() { 
			var nbsp=" &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ";
			nbsp+=nbsp+nbsp+nbsp+nbsp+nbsp+nbsp+nbsp;
	
			var mainPage=new Ext.Panel({
						renderTo:"start-div",		
						id: 'table-panel',
					    layout: 'table',
					    layoutConfig: {
					        columns: 1
					    },
					    defaults: {
					        bodyStyle:'padding:15px 20px'
					    },
					    items: [{
							id:'task',
							name:'task',
					        title: '•&nbsp任务栏',
					        colspan: 2
					    }
						]	
			});
			Ext.Ajax.request({ 
				url : 'mainpage/task!getMyTask.action',
				scope: this,
				success : function(response) { 
				   var data=Ext.util.JSON.decode(response.responseText);					
//					Ext.getCmp('task').body.update('<table width="700" border="0"><tr><td width="380" valign="top">您有新邮件 <span style="color:#0099FF"><strong>XX</strong></span> 封</td><td width="426">待处理任务 <span style="color:#0099FF"><strong>XX</strong></span> 条<br />&nbsp;&nbsp;1.	企业备案 <span style="color:#0099FF"><strong>XX</strong></span> 条<br />&nbsp;&nbsp;2.	企业分级 <span style="color:#0099FF"><strong>XX</strong></span> 条<br />&nbsp;&nbsp;3.	信用档案 <span style="color:#0099FF"><strong>XX</strong></span> 条<br />&nbsp;&nbsp;4.	无害化 <span style="color:#0099FF"><strong>XX</strong></span> 条</td></tr></table>');
				   Ext.getCmp('task').body.update(data.message+nbsp);
				}
			});
//			var news=[
//			    {
//					id:'1',
//			        title: '分类1',
//			        html: '<p><a href="javascript:showNews(1,\'Row spanning\')">Row spanning.</a></p><p><a href="javascript:showNews(2,\'Row spanning.1\')">Row spanning.1</a></p>',
//			        width: 380
//			    },{
//					id:'2',
//			        title: '分类2',
//			        html: '<p><a href="javascript:showNews(3,\'Row spanning\')">Row spanning.</a></p><p><a href="javascript:showNews(4,\'Row spanning.1\')">Row spanning.1</a></p>',
//			        width: 380
//			    },{
//					id:'3',
//			        title: '分类3',
//			        html: '<p><a href="javascript:showNews(3,\'Row spanning\')">Row spanning.</a></p><p><a href="javascript:showNews(4,\'Row spanning.1\')">Row spanning.1</a></p>',
//			        width: 380
//			    }];
//			var news=[
//					    {
//							id:'1',
//					        title: '信息专栏',
//					        html: '<p>【分类一】&nbsp;<a href="javascript:showNews(1,\'Row spanning\')">Row spanning.</a></p><p>【分类二】&nbsp;<a href="javascript:showNews(2,\'Row spanning.1\')">Row spanning.1</a></p><p>【分类一】&nbsp;<a href="javascript:showNews(1,\'Row spanning\')">Row spanning.</a></p><p>【分类二】&nbsp;<a href="javascript:showNews(2,\'Row spanning.1\')">Row spanning.1</a></p>',
//					        colspan: 2
//					    },{
//							id:'2',
//					        title: '培训通知',
//					        html: '<p><a href="javascript:showNews(3,\'Row spanning\')">Row spanning.</a></p><p><a href="javascript:showNews(4,\'Row spanning.1\')">Row spanning.1</a></p>',
//					        colspan: 2
//					    }];
//			var news={"html":"<p>【分类名称一】&nbsp;<a href=\"javascript:showNews(3,'自订新闻、财经、天气以及更多常用小工具到你的谷歌个性化首页')\">自订新闻、财经、天气以及更多常用小工具到你的谷歌个性化首页</a></p><p>【分类名称一】&nbsp;<a href=\"javascript:showNews(4,'商业信息、财经新闻、实时股价和动态图表')\">商业信息、财经新闻、实时股价和动态图表</a></p><p>【分类名称一】&nbsp;<a href=\"javascript:showNews(5,'实用网址大全，便捷直达常用网站')\">实用网址大全，便捷直达常用网站</a></p><p>【分类名称二】&nbsp;<a href=\"javascript:showNews(6,'为您的浏览器配置搜索框，随时 Google 一下 ')\">为您的浏览器配置搜索框，随时 Google 一下 </a></p>","id":1,"title":"信息专栏"};
//			mainPage.add(news);
//			mainPage.doLayout();
			
				Ext.Ajax.request({ 
					url : 'mainpage/news!getMainpageNews.action',
					scope: this,
					success : function(response) { 
					   var data=Ext.util.JSON.decode(response.responseText);
						mainPage.add(data.data);
						mainPage.doLayout();
					}
				});
	 }); 

	function showNews(id,topic){
		
		var panel = new Ext.Panel({
			title : "面板",
			id : "contentPanel", 
	        border : true,//边框
	        header: false
		
		});
		
		var platpopup = new Ext.Window({
		    title: '平台内容',
		    closable:true,
		    width:600,
		    height:500,
		    constrain:true, 
		    plain:true,
		    maximizable:true,
		    resizable:true,
		    autoScroll: true,
 		    modal:true,
 		    items:[panel]
		});
		
		
		
		Ext.Ajax.request({ 
			url : 'message/news-page!get.action',
			scope: this,
			params : { 
			 data:Ext.encode(id)
			}, 
			success : function(response) { 
			   var data=Ext.util.JSON.decode(response.responseText);					
				platpopup.show();
				platpopup.setTitle("【"+data.data.categoryName+"】"+topic);
				var html = '<table width="100%" border="0" align="center" cellpadding="1" cellspacing="1">'+
						    '<tr>'+
						      '<td height="30" colspan="3" align="center"><h1>'+topic+'</h1></td>'+
						    '</tr>'+
						    '<tr>'+
						      '<td width="31%" height="30" align="center" class="winodw-t-f">分类: '+data.data.categoryName+'</td>'+
						      '<td width="35%" align="center" class="winodw-t-f" >发布时间: '+Ext.util.Format.date(new Date(data.data.createTime),'Y年m月d日')+'</td>'+
						    '</tr>'+
						    '<tr>'+
						      '<td height="510" colspan="3" class="winodw-t-f" >'+data.data.content+'</td>'+
						    '</tr>'+
						    '</table>';
				panel.body.update(html);
			}
		});
	}