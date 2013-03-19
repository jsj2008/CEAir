Ext.define('CEAIR.view.Main', {
	extend : 'Ext.NavigationView',
	xtype : 'mainview',
	id : "mainview",

	config : {
		layout : {
			animation : Ext.os.is.iOS ? {duration: 300, easing: 'ease-out',type: 'slide', direction: 'left'} : false
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
