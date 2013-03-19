
/* JavaScript content from app/view/Main.js in folder common */
Ext.define('CEAIR.view.Main', {
	extend : 'Ext.NavigationView',
	xtype : 'mainview',
	id : "mainview",

	config : {
		layout : {
//			animation : !Ext.os.is.Android
		},
		navigationBar : {
			backButton : {
				align : 'left',
				iconCls : 'backBtn',
				iconMask : false
			}
		},

		defaultBackButtonText : "",
	},

});
