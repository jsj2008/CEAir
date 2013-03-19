
/* JavaScript content from app/view/Contact/List.js in folder common */
/**
 * 市场活动-客户列表
 */
Ext.define('CEAIR.view.Contact.List', {
	extend : 'Ext.Container',
	xtype : 'contactList',

	config : {
		title : '员工名片',
		layout : {
			type : 'vbox',
			align : 'stretch'
		},
		items : [
				{
					xtype : 'toolbar',
					cls : 'searchContact-toolbar',
					docked : 'top',
					defaults : {
						flex : 1,
						align : 'center',
					},
					items : [ {
						id : 'searchContact',
						cls : 'searchContact',
						xtype : 'searchfield',
						flex : 10,
					}, 

					// {
					// id : 'voiceBtn',
					// cls : 'voiceBtn',
					// xtype : 'button',
					// flex : 1,
					//					},
					{
						id : 'qrcodeBtn',
						cls : 'qrcodeBtn',
						xtype : 'button',
						flex : 1,
					} ]
				},
				{
					scrollable : 'vertical',
					flex : 1,
					id : 'contactList',
					xtype : 'list',
					store : 'Contacts',
					cls : 'clientList',
					itemTpl : new Ext.XTemplate("<div class='c_list_title'>{name}</div>",
							"<div class='c_list_body'><span>手机：{phone}</span><span>邮箱：{email}</span></div>"),
				// onItemDisclosure : true,
				} ]
	}
});