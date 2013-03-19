/**
 * 员工手册-内容
 */
Ext.define('CEAIR.view.Handbook.Contents', {

	extend : 'Ext.Panel',
	xtype : 'handbookContents',
	config : {
		id : 'handbookContents',
		title : '员工手册',
		scrollable : {
			direction : 'vertical'
		},
		data : 'Handbook',
		html : "<div>{contents}</div>",
	}
});