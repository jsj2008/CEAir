/**
 * 数据统计
 */
Ext
		.define(
				'CEAIR.view.Market.Detail',
				{
					extend : 'Ext.Carousel',
					
					xtype : 'marketDetail',

					// Require the components we will be using in this example

					config : {
						title : '数据统计',
						items : [
								{
									html : '<div id="pie-chart-container" style="height:80%"></div>',
									cls : 'card',
									listeners : {
										painted : function() {

											new Highcharts.Chart(
													{
														chart : {
															renderTo : 'pie-chart-container',
															plotBackgroundColor : null,
															plotBorderWidth : null,
															plotShadow : false,
															marginBottom : 30
														},
														title : {
															text : '2013年新增航线时间段统计'
														},
														tooltip : {
															pointFormat : '{series.name}: <b>{point.percentage}%</b>',
															percentageDecimals : 1
														},
														plotOptions : {
															pie : {
																allowPointSelect : true,
																cursor : 'pointer',
																dataLabels : {
																	enabled : true,
																	color : '#000000',
																	connectorColor : '#000000',
																	formatter : function() {
																		return '<b>'
																				+ this.point.name
																				+ '</b>: '
																				+ this.percentage
																				+ ' %';
																	}
																}
															}
														},
														series : [ {
															type : 'pie',
															name : '百分比',
															data : [
																	[ '上午', 30 ],
																	[ '下午', 50 ],

																	{
																		name : '晚上',
																		y : 20,
																		sliced : true,
																		selected : true
																	} ]
														} ]
													});

										}
									}
								},
								{
									html : '<div id="chart-container" style="height:80%"></div>',
									cls : 'card',
									listeners : {
										painted : function() {
											new Highcharts.Chart(
													{
														chart : {
															renderTo : 'chart-container',
															type : 'column',
														},
														title : {
															text : '2013年各月各时间段航班数'
														},
														xAxis : {
															categories : [
																	'1月', '2月',
																	'3月', '4月',
																	'5月', '6月',
																	'7月', '8月',
																	'9月',
																	'10月',
																	'11月',
																	'12月', ]
														},
														yAxis : {
															title : {
																text : '航班数'
															}
														},
														series : [
																{
																	name : '上午',
																	data : [
																			20,
																			18,
																			16,
																			10,
																			17,
																			20,
																			18,
																			16,
																			10,
																			17,
																			23,
																			33 ]
																},
																{
																	name : '下午',
																	data : [
																			24,
																			13,
																			12,
																			16,
																			13,
																			26,
																			11,
																			12,
																			19,
																			10,
																			20,
																			22 ]
																},
																{
																	name : '晚上',
																	data : [
																			10,
																			28,
																			36,
																			20,
																			37,
																			40,
																			28,
																			6,
																			20,
																			27,
																			33,
																			13 ]
																} ]
													});

										}
									}
								} ]
					}
				});
