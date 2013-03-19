
/* JavaScript content from app/view/More/List.js in folder common */
/**
 * 航班动态 - 查询结果列表
 */
Ext.define('CEAIR.view.More.List', {

	extend : 'Ext.List',
	xtype : 'moreList',
	config : {
		title : '更多',
		id : "setList",
		xtype : 'list',
		// title : '保单查询',
		ui : 'round',
		disableSelection : 'false',
		data : [ {
			id : "aboutus",
			name : "关于我们"
		}, {
			id : "logOff",
			name : "注销"
		} ],
		itemTpl : [ '<div>{name}</div>' ]
	}
});