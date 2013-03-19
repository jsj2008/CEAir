/**
 * 业务确认单购物车模型
 */
Ext.define('CEAIR.model.Contact', {
	extend : 'Ext.data.Model',
	config : {
		fields : [ {
			name : "itemId",
			type : "string"
		}, {
			name : "name",
			type : "string"
		}, {
			name : "phone",
			type : "string"
		}, {
			name : "email",
			type : "string"
		}, {
			name : "title",
			type : "string"
		}, {
			name : "url",
			type : "string"
		}, {
			name : "adr",
			type : "string"
		}, {
			name : "org",
			type : "string"
		} ]
	}
});
