
/* JavaScript content from app/model/Login.js in folder common */
/**
 * 登录
 */
Ext.define('CEAIR.model.Login', {
	extend : 'Ext.data.Model',
	config : {
		fields : [ 'username', 'password', 'checked',],
		proxy : {
			type : 'localstorage',
			id : 'login'
		}
	}
});
