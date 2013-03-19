
/* JavaScript content from app/view/MainList.js in folder common */
Ext
		.define(
				'CEAIR.view.MainList',
				{
					extend : 'Ext.Panel',
					xtype : 'mainlist',
					id : "mainlist",
					config : {
						title : '服务列表',
						layout : 'vbox',
						padding : '20 0 20 0',
						defaults : {
							flex : 1,
							align : 'center',
							defaults : {
								flex : 1,
								align : 'center',
							}
						},
						items : [
								{
									cls : "gridView",
									xtype : 'panel',
									layout : 'hbox',
									items : [
											{
												items : {
													xtype : "button",
													id : "front_Flight_Query",
													style : 'background:none;border:none',
													centered : true,
													html : "<img src='images/MainLogo/flight.png' width='80' height='80'/><div style='text-align:center'>航班动态</div>"
												}
											},
											{
												items : {
													xtype : "button",
													id : "front_Contact_List",
													style : 'background:none;border:none',
													centered : true,
													html : "<img src='images/MainLogo/card.png' width='80' height='80'/><div style='text-align:center'>员工名片</div>"
												}
											},
											{
												items : {
													xtype : "button",
													id : "front_Handbook_List",
													style : 'background:none;border:none',
													centered : true,
													html : "<img src='images/MainLogo/handbook.png' width='80' height='80'/><div style='text-align:center'>员工手册</div>"
												}
											}, ]
								},
								{
									xtype : 'panel',
									layout : 'hbox',
									items : [
											{
												items : {
													xtype : "button",
													id : "front_Market_Map",
													style : 'background:none;border:none',
													centered : true,
													html : "<img src='images/MainLogo/WarnTrend.png' width='80' height='80'/><div style='text-align:center'>营销地图</div>"
												}
											},
											{
												items : {
													xtype : "button",
													id : "front_Radar_GoogleMap",
													style : 'background:none;border:none',
													centered : true,
													html : "<img src='images/MainLogo/radar.png' width='80' height='80'/><div style='text-align:center'>航班地图</div>"
												}
											},
											{
												items : {
													xtype : "button",
													id : "front_Wage_List",
													style : 'background:none;border:none',
													centered : true,
													html : "<img src='images/MainLogo/wages.png' width='80' height='80'/><div style='text-align:center'>员工工资</div>"
												}
											} ]
								} ]
					}

				});
