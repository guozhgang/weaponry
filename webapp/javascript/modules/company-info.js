Ext.ns("com.cce.record");

var proxy = new Ext.data.HttpProxy({
	api: {
	    read : 'record/companyInfo!companyInfoList.action',
	    create : 'record/companyInfo!saveCompanyInfo.action',
	    update : 'record/companyInfo!saveCompanyInfo.action',
	    destroy: 'record/companyInfo!delete.action'
		}
});


//------------------------------------------------------------------------------
//Module的reader定义..
//------------------------------------------------------------------------------
var reader = new Ext.data.JsonReader(
  	
  {
	  root:'data',
	  successProperty: 'success',
	  messageProperty: 'message'
  },
  [ 
      	{name: 'id',mapping:"id"},
      	{name: 'regionFullName',mapping:'regionFullName'},
      	{name: 'nameCN',mapping:'nameCN'},
      	{name: 'taxCert ',mapping:'taxCert'},
      	{name: 'orgCode',mapping:"orgCode"},
      	{name: 'legal',mapping:'legal'}, 
      	{name: 'address',mapping:'address'},
      	{name: 'bank',mapping:'bank'},
      	{name: 'bankAccount',mapping:'bankAccount'},
      	{name: 'certDept',mapping:'certDept'},
      	{name: 'companyType',mapping:'companyType'},
      	{name: 'createBy',mapping:'createBy'},
      	{name: 'credit',mapping:'credit'},
      	{name: 'creditRating',mapping:'creditRating'},
      	{name: 'fpNo',mapping:'fpNo'},
      	{name: 'fixedButchNo',mapping:'fixedButchNo'},
      	{name: 'legalFax',mapping:'legalFax'},
      	{name: 'legalMail',mapping:'legalMail'},
      	{name: 'legalMobile',mapping:'legalMobile'},
      	{name: 'legalTel',mapping:'legalTel'},
      	{name: 'level',mapping:'level'},
      	{name: 'licenseCertDate',mapping:'licenseCertDate',type:'date',dateFormat:'time'},
      	{name: 'licenseCertDept',mapping:'licenseCertDept'},
      	{name: 'licenseNo',mapping:'licenseNo'},
      	{name: 'nameEN',mapping:'nameEN'},
      	{name: 'nature',mapping:'nature'},
      	{name: 'organizationInfo',mapping:'organizationInfo'},
      	{name: 'parent',mapping:'parent'},
      	{name: 'qualityEstablished',mapping:'qualityEstablished'},
      	{name: 'qurCert',mapping:'qurCert'},
      	{name: 'relaFax',mapping:'relaFax'},
      	{name: 'relaMail',mapping:'relaMail'},
      	{name: 'relaMobile',mapping:'relaMobile'},
      	{name: 'relaName',mapping:'relaName'},
      	{name: 'relaTel',mapping:'relaTel'},
      	{name: 'simpleName',mapping:'simpleName'},
      	{name: 'status',mapping:'status'},
      	{name: 'taxCert',mapping:'taxCert'},
      	{name: 'updateDate',mapping:'updateDate',type:'date',dateFormat:'time'},
      	{name: 'validity',mapping:'validity',type:'date',dateFormat:'time'}, 
      	{name: 'version',mapping:'version'},
      	{name: 'zipcode',mapping:'zipcode'},
      	{name: 'createDate',mapping:'createDate',type:'date',dateFormat:'time'},
      	{name: 'mechanize',mapping:'mechanize'},
      	{name: 'butchPerYear',mapping:'butchPerYear',type:'double'},
      	{name: 'qualityEstablished',mapping:'qualityEstablished'},
      	{name: 'RegistrationNo',mapping:'RegistrationNo'},
      	{name: 'region',mapping:'region'},
      	{name: 'registerNo',mapping:'registerNo'},
      	{name: 'saveType',mapping:'saveType'} //提交类型
       
//      	,
//      	{name: 'status',mapping:'status'}//审核状态
  ]
);


//------------------------------------------------------------------------------
//Module的writer定义..
//------------------------------------------------------------------------------
var writer = new Ext.data.JsonWriter({
		encode: true,
		writeAllFields: false
});

//------------------------------------------------------------------------------
//Module的company主Panel定义..
//------------------------------------------------------------------------------

com.cce.record.CompanyRecordMain=Ext.extend(Ext.Panel,{
	id:'company-record-main',
	loadMask: true,
	border: false,
	enableHdMenu: false,
	header:false,
	region:'center',
	closable:true,
	layout:"border"
});


 
//------------------------------------------------------------------------------
//Module的CompanyRecordForm定义..
//------------------------------------------------------------------------------
com.cce.record.CompanyRecordForm = Ext.extend(Ext.form.FormPanel, {
	title: '企业备案',
	modal:true,
	iconCls: 'silk-user',
	labelWidth: 100,
	width: 500,
	height: 1729,
	header: false,
	frame: true,
	region:'center',
	layout: 'form',
	autoScroll: true,
	store:null,
  // private A pointer to the currently loaded record
	record : null,

	initComponent : function() {
	
		var nature_store = new Ext.data.SimpleStore({
		    fields: ['id', 'code', 'value'],
		    data : DICT_COMPANY_CHARACTER
		});
		
		this.nature_combo = new Ext.form.ComboBox({
	        store: nature_store,
	        id:"nature",
	        name:"nature",
	        fieldLabel:'企业性质',
	        displayField:'value',
	        triggerAction:'all',
	        valueField:'id',
	        mode: 'local',
	        anchor: '100%',
	        emptyText:'请选择企业性质',
	        editable : false,
	        allowBlank: false,
	        validateOnBlur:false
	        
		});
		
		var degree_store = new Ext.data.SimpleStore({
		    fields: ['id', 'code', 'value'],
		    data : DICT_AUTO_MATION
		});
		
		this.degree_combo = new Ext.form.ComboBox({
	        store: degree_store,
	        id:"mechanize",
	        name:"mechanize",
	        fieldLabel:'机械化程度',
	        displayField:'value',
	        triggerAction:'all',
	        valueField:'id',
	        mode: 'local',
	        anchor: '100%',
	        emptyText:'请选择机械化程度',
	        editable : false,
	        allowBlank: false,
	        validateOnBlur:false
	        
		});
		
		
		// build the form-fields.  Always a good idea to defer form-building to a method so that this class can
	    // be over-ridden to provide different form-fields
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
	        save : true
	    });
	    
	    this.store.load({
  			scope:this,
  			callback:function(r,o,s) {
  				if(r[0]) this.record=r[0];
  				else this.record = new this.store.recordType();  				
  				//this.getForm().loadRecord(this.record);  				

  				Ext.getCmp('id').setValue(this.record.get('id'));
  				
  				if(this.record.get('nameCN')!=null&&this.record.get('nameCN')!=""){ //中文
  					Ext.getCmp('nameCN').setValue(this.record.get('nameCN'));  
  				}
  				if(this.record.get('nameEN')!=null&&this.record.get('nameEN')!=""){ //英文
  					Ext.getCmp('nameEN').setValue(this.record.get('nameEN'));
  				}  			 
  				
  				Ext.getCmp('simpleName').setValue(this.record.get('simpleName')); //简称
  				Ext.getCmp('address').setValue(this.record.get('address')); //联系地址
  				Ext.getCmp('zipcode').setValue(this.record.get('zipcode')); //邮编
  				Ext.getCmp('butchPerYear').setValue(this.record.get('butchPerYear')); //年屠宰规模
  				Ext.getCmp('qualityEstablished').setValue(this.record.get('qualityEstablished')); //是否有相应加工设备
  				Ext.getCmp('taxCert').setValue(this.record.get('taxCert')); //税务登记证号
  				Ext.getCmp('bank').setValue(this.record.get('bank')); //开户银行
  				Ext.getCmp('bankAccount').setValue(this.record.get('bankAccount')); //银行账号
  				//Ext.getCmp('creditRating').setValue(this.record.get('creditRating'));
  				 
  				Ext.getCmp('regionFullName').setValue(this.record.get('regionFullName'));
  				Ext.getCmp('fixedButchNo').setValue(this.record.get('fixedButchNo'));
  				Ext.getCmp('certDept').setValue(this.record.get('certDept'));
  				Ext.getCmp('validity').setValue(this.record.get('validity'));
  				Ext.getCmp('RegistrationNo').setValue(this.record.get('RegistrationNo'));
  				Ext.getCmp('qurCert').setValue(this.record.get('qurCert'));
  				Ext.getCmp('licenseCertDept').setValue(this.record.get('licenseCertDept'));
  				Ext.getCmp('licenseCertDate').setValue(this.record.get('licenseCertDate'));
  				Ext.getCmp('licenseNo').setValue(this.record.get('licenseNo'));
  			    
  				Ext.getCmp('registerNo').setValue(this.record.get('registerNo'));
 
  				
  				if(this.record.get('legal')!=null&&this.record.get('legal')!=""){
  					Ext.getCmp('legal').setValue(this.record.get('legal'));
  				}
  				if(this.record.get('legalTel')!=null&&this.record.get('legalTel')!=""){
  					Ext.getCmp('legalTel').setValue(this.record.get('legalTel'));
  				}
  				if(this.record.get('legalMail')!=null&&this.record.get('legalMail')!=""){
  					Ext.getCmp('legalMail').setValue(this.record.get('legalMail'));
  				}
  				if(this.record.get('legalMobile')!=null&&this.record.get('legalMobile')!=""){
  					Ext.getCmp('legalMobile').setValue(this.record.get('legalMobile'));
  				}
  				if(this.record.get('legalFax')!=null&&this.record.get('legalFax')!=""){
  					Ext.getCmp('legalFax').setValue(this.record.get('legalFax'));
  				}
  				if(this.record.get('relaName')!=null&&this.record.get('relaName')!=""){
  					Ext.getCmp('relaName').setValue(this.record.get('relaName'));
  				}
  				if(this.record.get('relaTel')!=null&&this.record.get('relaTel')!=""){
  					Ext.getCmp('relaTel').setValue(this.record.get('relaTel'));
  				}
  				if(this.record.get('relaMail')!=null&&this.record.get('relaMail')!=""){
  					Ext.getCmp('relaMail').setValue(this.record.get('relaMail'));
  				}
  				if(this.record.get('relaMobile')!=null&&this.record.get('relaMobile')!=""){
  					Ext.getCmp('relaMobile').setValue(this.record.get('relaMobile'));
  				}
  				if(this.record.get('relaFax')!=null&&this.record.get('relaFax')!=""){
  					Ext.getCmp('relaFax').setValue(this.record.get('relaFax'));
  				}			
  				
  				if(this.record.get('nature')!=null&&this.record.get('nature')!=""){
  					Ext.getCmp('nature').setValue(this.record.get('nature'));
  				}
  				if(this.record.get('mechanize')!=null&&this.record.get('mechanize')!=""){
  					Ext.getCmp('mechanize').setValue(this.record.get('mechanize'));
  				}
  			 
  				
		  	}
		}); 
	    // super
	    com.cce.record.CompanyRecordForm.superclass.initComponent.call(this);
	},

    loadRecord : function(rec) {
		if(rec==null)
	    this.record = new this.store.recordType();
		else this.record = rec;
        this.getForm().loadRecord(this.record);
    },

	/**
	 * buildform
	 * @private
	 */
	buildForm : function() {	
		
		return [
             
				{
				    xtype: 'fieldset',
				    title: '企业名称',
				    layout: 'form',
				    collapsible: true,
				    maskDisabled: false,
				    animCollapse: false,
				    checkboxToggle: false,
				    width: 480,
				    items: [
				        new Ext.form.Hidden({ id:"id",name:"id"}),
				        {
				            xtype: 'textfield',
				            fieldLabel: '中文',
				            anchor: '100%',
                            allowBlank:false,
                            validateOnBlur:false,
				            id:'nameCN',
				            name:'nameCN'
				             
				        },
				        {
				            xtype: 'textfield',
				            fieldLabel: '英文',
				            anchor: '100%',
				            id:'nameEN',
				            name:'nameEN',
				            regex:/^[a-zA-Z][a-zA-Z0-9_ ]{0,49}$/,
				            regexText : '请输入以字母开头允许下划线最多50个字符', 
				            validateOnBlur:false
				        },
				        {
				            xtype: 'textfield',
				            fieldLabel: '简称',
				            anchor: '100%',
				            id:'simpleName', 
				            name:'simpleName'
				        }
				    ]
				},
				{
				    xtype: 'fieldset',
				    title: '单位信息',
				    layout: 'form',
				    collapsible: true,
				    width: 480,
				    items: [
//						{
//						    xtype: 'textfield',
//						    fieldLabel: '审核状态',
//						    allowBlank:false,
//						    anchor: '100%',
//						    id:'status',
//						    name:'status',
//						    readOnly:true
//						},
				        {
				            xtype: 'textfield',
				            fieldLabel: '单位地址',
				            anchor: '100%',
				            id:'address',
				            name:'address'
				        },
				        {
				            xtype: 'textfield',
				            fieldLabel: '邮编',
				            anchor: '100%',
				            id:'zipcode',
				            name:'zipcode'
				        },
				        this.nature_combo,
				        {
				            xtype: 'numberfield',
				            fieldLabel: '年屠宰规模/万头',
				            anchor: '100%', 
				            id:'butchPerYear',
				            name:'butchPerYear'				            
				            
				        },				        
				        {
							xtype:"checkbox",
							fieldLabel:"是否有相应屠宰加工设备",
							boxLabel:"有",
							checked:true,
							anchor:"100%",
							name:'qualityEstablished',
							id:'qualityEstablished',
							value:true
						},
				        this.degree_combo,
				        {
				            xtype: 'textfield',
				            fieldLabel: '税务登记证号',
				            anchor: '100%', 
				            id:'taxCert',
				            name:'taxCert'
				        },
				        {
				            xtype: 'textfield',
				            fieldLabel: '组织机构代码',
				            anchor: '100%', 
				            id:'orgCode',
				            name:'orgCode',
				            allowBlank:false
				        },				         
//				        {
//				            xtype: 'textfield',
//				            fieldLabel: '证章备案管理',
//				            anchor: '100%',
//				            id:'version',
//				            name:'version'
//				        },
				        {
				            xtype: 'textfield',
				            fieldLabel: '开户银行',
				            anchor: '100%',
				            id:'bank',
				            name:'bank'
				        },
				        {
				            xtype: 'textfield',
				            fieldLabel: '银行账号',
				            anchor: '100%',
				            id:'bankAccount',
				            name:'bankAccount'
				        },
				        {
				            xtype: 'textfield',
				            fieldLabel: '企业备案登记号',
				            anchor: '100%',
				            id:'registerNo',
				            name:'registerNo',
				            readOnly:true
				        },
				        {
				        	xtype: 'textfield',
				            fieldLabel: '所属区域',
				            anchor: '100%',
				            id:'regionFullName',
				            name:'regionFullName',
				            readOnly:true
				        }
				        
				    ]
				},
				{
				    xtype: 'fieldset',
				    title: '证书信息',
				    layout: 'form',
				    collapsible: true,
				    width: 480,
				    items: [
				        {
				            xtype: 'textfield',
				            fieldLabel: '生猪屠宰定点证号',
				            anchor: '100%', 
				            id:'fixedButchNo',
				            name:'fixedButchNo'
				        },
				        {
				            xtype: 'textfield',
				            fieldLabel: '发证部门',
				            anchor: '100%', 
				            id:'certDept',
				            name:'certDept'
				        },
				        {
				            xtype: 'datefield',
				            fieldLabel: '有效期至',
				            anchor: '100%',
				            format: 'm/d/Y',                       
				            emptyText: '请选择有效期 ...',
				            id:'validity',				            
				            name:'validity'
				        },
				        {
				            xtype: 'textfield',
				            fieldLabel: '屠宰企业备案登记号',
				            anchor: '100%',
				            id:'RegistrationNo',
				            name:'RegistrationNo',
				            readOnly:true
				        },
				        {
				            xtype: 'textfield',
				            fieldLabel: '卫生检验检疫证号',
				            anchor: '100%', 
				            id:'qurCert',
				            name:'qurCert'
				        },
				        {
				            xtype: 'fieldset',
				            title: '营业执照',
				            layout: 'form',
				            items: [
				                {
				                    xtype: 'textfield',
				                    fieldLabel: '签发机关',
				                    anchor: '100%',
				                    id:'licenseCertDept',
				                    name:'licenseCertDept'
				                },
				                {
				                	xtype: 'datefield',
						            fieldLabel: '签发日期',		                            
						            anchor: '100%',
						            format: 'm/d/Y',
						            emptyText: '请选择签发日期 ...',
				                    id:'licenseCertDate',
				                    name:'licenseCertDate'
				                },
				                {
				                    xtype: 'textfield',
				                    fieldLabel: '编号',
				                    anchor: '100%',
				                    id:'licenseNo',
				                    name:'licenseNo',
						            allowBlank:false
				                }
				            ]
				        }
				    ]
				},
				{
				    xtype: 'fieldset',
				    title: '企业法人',
				    layout: 'form',
				    collapsible: true,
				    width: 480,
				    items: [
				        {
				            xtype: 'textfield',
				            fieldLabel: '姓名',
				            anchor: '100%',
				            id:'legal',
				            name:'legal',
				            allowBlank: true
				            	
				        },
				        {
				            xtype: 'textfield',
				            fieldLabel: '固定电话',
				            anchor: '100%',
				            id:'legalTel',
				            name:'legalTel',
				            allowBlank: true
				            
				             
				        },
				        {
				            xtype: 'textfield',
				            fieldLabel: '邮箱',
				            anchor: '100%',
				            id:'legalMail',
				            name:'legalMail',
				            allowBlank: true
				        },
				        {
				            xtype: 'textfield',
				            fieldLabel: '手机',
				            anchor: '100%',
				            id:'legalMobile',
				            name:'legalMobile',
				            allowBlank: true
				        },
				        {
				            xtype: 'textfield',
				            fieldLabel: '传真',
				            anchor: '100%',
				            id:'legalFax',
				            name:'legalFax',
				            allowBlank: true
				        }
				    ]
				},
				{
				    xtype: 'fieldset',
				    title: '联系人',
				    layout: 'form',
				    collapsible: true,
				    width: 480,
				    items: [
				        {
				            xtype: 'textfield',
				            fieldLabel: '姓名',
				            anchor: '100%',
				            id:'relaName',
				            name:'relaName',
				            allowBlank: true
				            
				        },
				        {
				            xtype: 'textfield',
				            fieldLabel: '固定电话',
				            anchor: '100%',
				            id:'relaTel',
				            name:'relaTel',
				            allowBlank: true
				             

				        },
				        {
				            xtype: 'textfield',
				            fieldLabel: '邮箱',
				            anchor: '100%',
				            id:'relaMail',
				            name:'relaMail'
				             
				        },
				        {
				            xtype: 'textfield',
				            fieldLabel: '手机',
				            anchor: '100%',
				            id:'relaMobile',
				            name:'relaMobile'
				            

				        },
				        {
				            xtype: 'textfield',
				            fieldLabel: '传真',
				            anchor: '100%',
				            id:'relaFax',
				            name:'relaFax' 
				            
				        }
				    ]
				},
				new Ext.form.Hidden({
		            name:"saveType",
		            id:'saveType',	      		 
		            hiddenName:'saveType'
		 	    })

            ];
	},  

	buildUI : function(){
	    return [{
				text:"保存",
				scope: this,
				handler:this.onSave
		  	},
	    	{
				text:"提交",
				scope: this,
				handler:this.onUpdate
	    	}, {
	        text: '重置',
	        handler: function(btn, ev){
	            this.getForm().reset();
	        },
	        scope: this
	    }];
	},
	

	/**
	 * onUpdate
	 */
	onSave : function(btn, ev) {
	    
	    if (!this.getForm().isValid()) {
	        	App.setAlert(false, "表单数据有错误.");
	        	return false;
	    }
 
    	if(this.record.data.id == null){
    		var record = new this.store.recordType(this.getForm().getValues());
    		record.data.nature = Ext.getCmp('nature').getValue();
    		record.data.mechanize = Ext.getCmp('mechanize').getValue();
    		record.data.qualityEstablished = Ext.getCmp('qualityEstablished').getValue();
    		record.data.licenseCertDate = Ext.getCmp('licenseCertDate').getValue();
    		record.data.validity = Ext.getCmp('validity').getValue();
    		record.data.butchPerYear = Ext.getCmp('butchPerYear').getValue();
    		this.store.add(record);
    		this.store.save();
    	}else{    		
    		
    		this.getForm().updateRecord(this.record);
    		this.store.save();
    	}
        
	},
	onUpdate:function(btn, ev) {
	    if (!this.getForm().isValid()) {
	        	App.setAlert(false, "表单数据有错误.");
	        	return false;
	    }
	    
	    if(this.record.data.id == null){
    		var record = new this.store.recordType(this.getForm().getValues());
    		record.data.nature = Ext.getCmp('nature').getValue();
    		record.data.mechanize = Ext.getCmp('mechanize').getValue();
    		record.data.qualityEstablished = Ext.getCmp('qualityEstablished').getValue();
    		record.data.licenseCertDate = Ext.getCmp('licenseCertDate').getValue();
    		record.data.validity = Ext.getCmp('validity').getValue();
    		record.data.butchPerYear = Ext.getCmp('butchPerYear').getValue();
    		this.store.add(record);
    		this.store.save();
    	}else{    		
    		
    		this.getForm().updateRecord(this.record);
    		this.store.save();
    	}
	    var i=1;
	    this.store.on('save',function(store,data){
	    	
	    	
	    	
	    	if(i==1)
	    	{
		    	Ext.Ajax.request({ 
					url : 'record/companyInfo!submitCompanyInfo.action',
					scope: this,
					params : { 
		        	  data:store.data.id
					}, 
					success : function(response) { 
						App.setAlert(Ext.util.JSON.decode(response.responseText).success,Ext.util.JSON.decode(response.responseText).message);
					}, 
					failure : function(response) { 
					   App.setAlert(false,"执行失败！"); 
				    }
			   }); 
	    	}
	    	
	       i++;
	    },this);
	    
	        
	    
	  
	}
	

});


//------------------------------------------------------------------------------
//Module的定义放在最后,eval(xxx.js)后返回Module的类定义..
//------------------------------------------------------------------------------
Ext.extend(com.cce.Module, {
	win: null,
	init: function(){
		this.store = new Ext.data.Store({
		    id: 'id', 
		    proxy: proxy,
		    reader: reader,
		    writer: writer,  // <-- plug a DataWriter into the store just as you would a Reader
		    autoSave: false
		  });
	
	  	
	
		var form = new com.cce.record.CompanyRecordForm({store:this.store});
		
		
		this.mainPanel= new com.cce.record.CompanyRecordMain();		
		
		this.mainPanel.add(form);
	
	  	this.main.add(this.mainPanel);
	  	this.main.doLayout();
 
	} 
	
});
