
var DICT_APPROVE_STATUS = new Array();// [[1,'等待审批'],[2,'审批中'],[3,'审批通过'],[4,'退回']];
var DICT_COMPANY_CREDIT = new Array();
var DICT_COMPANY_LEVEL = new Array();
var DICT_AUTO_MATION = new Array();
var DICT_APPROACH = new Array();
var DICT_CHECK_STEP = new Array();
var DICT_COMPANY_CHARACTER = new Array();
var DICT_INNO_TYPE = new Array();
var DICT_TECH_TYPE = new Array();
var _USER_NAME_;
var _USER_ROLE_;
var _USER_REGION_;
var SESSION_CONTINUE_THREAD = {
	run : function() {
		Ext.Ajax
				.request( {
					url : 'security/user!getCurrentUser.action',
					scope : this,
					success : function(resp, opts) {
						var respText = Ext.util.JSON.decode(resp.responseText);
						if (!respText.data
								|| "anonymousUser" == respText.data.username){
							location = "./login.action";
						}else {
							_USER_NAME_ = respText.data.username;
							_USER_ROLE_ = respText.data.roleName;
							_USER_REGION_ = respText.data.regionName;
						}
					},
					failure : function(resp, opts) {
						Ext.Msg.alert("服务器通信错误", "请与管理员联系 或 稍后重试 ");
						Ext.TaskMgr.stop(SESSION_CONTINUE_THREAD);
						return false;
					}
				});
	},
	interval : 600000
}
Ext.TaskMgr.start(SESSION_CONTINUE_THREAD);
Ext.Ajax.request( {
	url : 'dict/dict.action',
	scope : this,
	params : {
		data : Ext.encode( {
			'name' : 'DictApprovalStatus'
		})
	},
	success : function(resp, opts) {
		var rsp = Ext.util.JSON.decode(resp.responseText);
		var j = 0;
		for ( var i = 0; i < rsp.length; i++) {
			if (rsp[i].code != 'CREATED')
				DICT_APPROVE_STATUS[j++] = [ rsp[i].id, rsp[i].code,
						rsp[i].value ];
		}
	}
});
Ext.Ajax.request( {
	url : 'dict/dict.action',
	scope : this,
	params : {
		data : Ext.encode( {
			'name' : 'DictCompanyCredit'
		})
	},
	success : function(resp, opts) {
		var rsp = Ext.util.JSON.decode(resp.responseText);
		for ( var i = 0; i < rsp.length; i++) {
			DICT_COMPANY_CREDIT[i] = [ rsp[i].id, rsp[i].code, rsp[i].value ];
		}
	}
});
Ext.Ajax.request( {
	url : 'dict/dict.action',
	scope : this,
	params : {
		data : Ext.encode( {
			'name' : 'DictCompanyLevel'
		})
	},
	success : function(resp, opts) {
		var rsp = Ext.util.JSON.decode(resp.responseText);
		for ( var i = 0; i < rsp.length; i++) {
			DICT_COMPANY_LEVEL[i] = [ rsp[i].id, rsp[i].code, rsp[i].value ];
		}
	}
});
Ext.Ajax.request( {
	url : 'dict/dict.action',
	scope : this,
	params : {
		data : Ext.encode( {
			'name' : 'DictAutoMation'
		})
	},
	success : function(resp, opts) {
		var rsp = Ext.util.JSON.decode(resp.responseText);
		for ( var i = 0; i < rsp.length; i++) {
			DICT_AUTO_MATION[i] = [ rsp[i].id, rsp[i].code, rsp[i].value ];
		}
	}
});
Ext.Ajax.request( {
	url : 'dict/dict.action',
	scope : this,
	params : {
		data : Ext.encode( {
			'name' : 'DictApproach'
		})
	},
	success : function(resp, opts) {
		var rsp = Ext.util.JSON.decode(resp.responseText);
		for ( var i = 0; i < rsp.length; i++) {
			DICT_APPROACH[i] = [ rsp[i].id, rsp[i].code, rsp[i].value ];
		}
	}
});
Ext.Ajax.request( {
	url : 'dict/dict.action',
	scope : this,
	params : {
		data : Ext.encode( {
			'name' : 'DictCheckStep'
		})
	},
	success : function(resp, opts) {
		var rsp = Ext.util.JSON.decode(resp.responseText);
		for ( var i = 0; i < rsp.length; i++) {
			DICT_CHECK_STEP[i] = [ rsp[i].id, rsp[i].code, rsp[i].value ];
		}
	}
});
Ext.Ajax
		.request( {
			url : 'dict/dict.action',
			scope : this,
			params : {
				data : Ext.encode( {
					'name' : 'DictCompanyCharacter'
				})
			},
			success : function(resp, opts) {
				var rsp = Ext.util.JSON.decode(resp.responseText);
				for ( var i = 0; i < rsp.length; i++) {
					DICT_COMPANY_CHARACTER[i] = [ rsp[i].id, rsp[i].code,
							rsp[i].value ];
				}
			}
		});
Ext.Ajax.request( {
	url : 'dict/dict.action',
	scope : this,
	params : {
		data : Ext.encode( {
			'name' : 'DictInnocuousType'
		})
	},
	success : function(resp, opts) {
		var rsp = Ext.util.JSON.decode(resp.responseText);
		for ( var i = 0; i < rsp.length; i++) {
			if (rsp[i].code != 'FINANCE')
				DICT_INNO_TYPE[i] = [ rsp[i].id, rsp[i].code, rsp[i].value ];
		}
	}
});
Ext.Ajax.request( {
	url : 'dict/dict.action',
	scope : this,
	params : {
		data : Ext.encode( {
			'name' : 'DictTechType'
		})
	},
	success : function(resp, opts) {
		var rsp = Ext.util.JSON.decode(resp.responseText);
		for ( var i = 0; i < rsp.length; i++) {
			DICT_TECH_TYPE[i] = [ rsp[i].id, rsp[i].code, rsp[i].value ];
		}
	}
});