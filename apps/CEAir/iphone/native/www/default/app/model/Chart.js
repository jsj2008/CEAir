
/* JavaScript content from app/model/Chart.js in folder common */
Ext.define('CEAIR.model.Chart', {
	extend : 'Ext.data.Model',
	config : {
		fields : [{
			name : "TIMEORDER",
			type : "int"
		}, {
			name : "CM",
			type : "int"
		}, {
			name : "LM",
			type : "int"
		}, {	
			name : "LCM",
			type : "int"
		}]
	}
});