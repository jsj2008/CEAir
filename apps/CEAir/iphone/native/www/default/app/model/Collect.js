
/* JavaScript content from app/model/Collect.js in folder common */
/**
 * 收藏
 */
Ext.define('CEAIR.model.Collect', {
	extend : 'Ext.data.Model',
	config : {
		fields : [ 'flightnodisp', 'arrairportdisp', 'deptairportdisp',
				'plandepttimedisp', 'planarrtimedisp', ],
		proxy : {
			type : 'localstorage',
			id : 'collect'
		}
	}
});
