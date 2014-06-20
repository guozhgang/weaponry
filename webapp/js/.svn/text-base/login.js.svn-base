var loginForm=null;

Ext.onReady(function(){
	
	
	 var keyLogin = new Ext.KeyMap("loginForm", [
	      
	         {
	             key: [10,13],
	             fn: function(){ login(); }
	         }
	 ]);


}); 
function login()
{

	var j_username=document.getElementById("j_username").value;
	var j_password=document.getElementById("j_password").value;
	
 
		Ext.Ajax.request({
		    	url: 'j_spring_security_check',
		    	success: function(response,opts) {
				var data=Ext.util.JSON.decode(response.responseText);
				if(data.success){
					window.location = data.targetUrl;
					 window.location.href='main.action';
				}
				else{
					Ext.Msg.alert('登陆失败', data.reason);
				}
		    },
	
		    failure: function(response,opts) {
		    	var data=Ext.util.JSON.decode(response.responseText);
		        Ext.Msg.alert('登陆失败','服务器内部错误');
		    },
	
		    params: { j_username: j_username, j_password:j_password}
		});
 
	
 }
 