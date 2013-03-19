/**
 * 登录
 */
/* JavaScript content from app/view/Main.js in folder common */
Ext.define("CEAIR.view.Login", {
	extend : "Ext.Container",
	xtype : "login",

	config : {
		layout : {
			type : 'card',
			animation : {
				type : 'slide',
				direction : 'left',
				duration : 1000
			}
		},
		cls : "login",

		fullscreen : true,
		items : [ {
			cls : "loginForm",
			id : "loginForm",
			xtype : "formpanel",
			layout : "vbox",
			scrollable : false,
			items : {
				xtype : "fieldset",
				defaults : {
					required : true,
					labelAlign : "left",
					labelWidth : "40%"
				},
				items : [ {
					xtype : 'textfield',
					name : 'username',
					labelAlign : 'left',
					labelWidth : '35%',
					label : '用户名',
					value : 'mobile',
					autoCapitalize : false
				}, {
					xtype : 'passwordfield',
					labelAlign : 'left',
					labelWidth : '35%',
					name : 'password',
					value : 'esblq2q1',
					label : '密    码'
				}, {
					xtype : 'checkboxfield',
					labelAlign : 'left',
					labelWidth : '35%',
					name : 'automatic',
					label : '自动登录',
					checked : false,
				}, {
					xtype : "button",
					id : "loginButton",
					flex : 1,
					cls : "loginBtn",
					ui : 'confirm',
					text : "登录"
				} ]
			}
		} ]

	}
});