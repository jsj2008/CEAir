/**
 * 企业通讯录
 */
Ext.define('CEAIR.store.Flight', {
	extend : 'Ext.data.Store',
	config : {
		model : 'CEAIR.model.Flight',
		pageSize : 15,
	}
});