/**
 * 客户-新建联系人
 */
Ext.define('CEAIR.view.Contact.New', {

	extend : 'Ext.Panel',
	xtype : 'contactNew',

	config : {
		title : '添加联系人',
		iconCls : 'user',
		layout : {
			type : 'card',
		},
		items : {
			id : "clientContactForm",
			xtype : "formpanel",
			layout : "vbox",
			items : [ {
				xtype : "fieldset",
				title : "联系人信息",
				defaults : {
					labelAlign : "left",
					labelWidth : "40%"
				},
				items : [ {
					required : true,
					xtype : "textfield",
					name : "name",
					label : "姓名"
				}, {
					xtype : "textfield",
					name : "title",
					label : "电子邮箱"
				}, {
					xtype : "textfield",
					name : "email",
					label : "电子邮箱"
				}, {
					xtype : 'textfield',
					name : 'org',
					label : '个性化信息',
				}, {
					xtype : 'textfield',
					name : 'adr',
					label : '个性化信息',
				} ]
			}, {
				xtype : "container",
				layout : {
					type : "hbox",
					align : "middle"
				},
				cls : "buttonArea",
				items : [ {
					xtype : "button",
					id : "createContactBtn",
					flex : 1,
					margin : 30,
					cls : "button",
					ui : "confirm",
					text : "提交"
				}, {
					xtype : "button",
					name : "resetBtn",
					flex : 1,
					margin : 30,
					cls : "button",
					ui : "cancel",
					text : "重置"
				} ]
			}

			]
		}
	}
});
