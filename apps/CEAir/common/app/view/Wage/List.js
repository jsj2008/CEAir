/**
 * 航班动态 - 查询结果列表
 */
Ext.define('CEAIR.view.Wage.List', {

	extend : 'Ext.Container',
	xtype : 'wageList',
	config : {
		title : '员工工资',
		layout : 'vbox',
		scrollable : false,
		items : [{
			id : "systemColList",
			scrollable : 'vertical',
			flex : 1,
			xtype : "touchgridpanel",
			store:"Wage",
			features : [ {
				ftype : 'Ext.ux.touch.grid.feature.Sorter',
				launchFn : 'initialize'
			} ],
			columns : [ {
				header : '员工号',
				dataIndex : 'number',
				style : 'text-align: center;',
				width : '20%',
				sortable:false,
			}, {
				header : '姓名',
				dataIndex : 'name',
				style : 'text-align: center;',
				width : '20%',
				sortable:false,
			}, {
				header : '工资',
				dataIndex : 'wages',
				style : 'text-align: center;',
				width : '20%',
				sortable:false,
			}, {
				header : '补贴',
				dataIndex : 'subsidy',
				style : 'text-align: center;',
				width : '20%',
				sortable:false,
			} , {
				header : '保险',
				dataIndex : 'insure',
				style : 'text-align: center;',
				width : '20%',
				sortable:false,
			}]
		} ]

	
	}
});