/**
 * 省分告警统计 - 列表
 */
Ext.define('UnicomService.view.WarnStat.List', {
	extend : 'Ext.Container',
	xtype : 'warnStatList',

	config : {
		title : '省分告警统计分析',
		layout : 'vbox',
		scrollable : false,
		items : [ {
			scrollable : false,
			layout : 'hbox',
			height : "40px",
			defaults : {
				flex : 1,
				align : 'center',
			},
			items : [ {
				xtype : 'selectfield',
				name : 'statlevel',
				cls : "selectField",
				options : [ {
					text : '重要',
					value : '4'
				}, {
					text : '紧急',
					value : '5'
				} ],
				usePicker : false
			}]
		}, {
			id : "warnStatList",
			scrollable : 'vertical',
			flex : 1,
			xtype : "touchgridpanel",
			store : "WarnStatList",
			features : [ {
				ftype : 'Ext.ux.touch.grid.feature.Sorter',
				launchFn : 'initialize'
			} ],
			columns : [ {
				header : '所在省',
				dataIndex : 'PROVINCE',
				style : 'text-align: center;',
				width : '20%',
				sortable : false,
			}, {
				header : '上月',
				dataIndex : 'MONTH1',
				style : 'text-align: center;',
				width : '30%',
				sortable : false,
			}, {
				header : '上上月',
				dataIndex : 'MONTH2',
				style : 'text-align: center;',
				width : '30%',
				sortable : false,
			}, {
				header : '环比',
				dataIndex : 'RATIO',
				style : 'text-align: center;',
				width : '20%',
				sortable : false,
				renderer : function(value) {
					var cls = (value.indexOf('↑')!=-1) ? 'red' : 'green';
					return '<div class="' + cls + '_arrow">' + value + '</div>';
				}
			} ]
		} ]

	}
});