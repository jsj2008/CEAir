
/* JavaScript content from app/view/Handbook/List.js in folder common */
/**
 * 
 */
Ext.define('CEAIR.view.Handbook.List', {

	extend : 'Ext.List',
	xtype : 'handbookList',
	config : {
		title : '员工手册',
		id:'handbookList',
		layout : {
			type : 'vbox',
		},
		store: 'Handbook',
		disableSelection : 'false',
		itemTpl : [	
		           	"<div ><span>{list}</span></div>" 
		           	].join('')
	}
});