
/* JavaScript content from app/view/MyFlight/List.js in folder common */
/**
 * 航班动态 - 查询结果列表
 */
Ext
		.define(
				'CEAIR.view.MyFlight.List',
				{
					extend : 'Ext.Container',
					xtype : 'myflightList',
					config : {
						title : '我的航班',
						layout : {
							type : 'vbox',
						},
						disableSelection : 'false',
						items : [
//								{
//									xtype : 'toolbar',
//									docked : 'top',
//									cls : 'title-secend',
//									defaults : {
//										flex : 1,
//										align : 'center',
//									},
//									items : [
//											{
//												html : "<img src='images/Flight/arrows-left.png' height='15' width='9'/>"
//											},
//											{
//												html : "<div class='title-secend-font' >2013-02-27</div><div class='title-secend-font2'> 上海 - 北京 </div>"
//											},
//											{
//												html : "<img src='images/Flight/arrows-right.png' height='15' width='9'/>"
//											} ]
//								},
								{
									scrollable : 'vertical',
									id : "myflightListContent",
									xtype : 'list',
									flex : 1,
									itemTpl : new Ext.XTemplate(
											"<div style='overflow:hidden'><div style='float:left'><div><img src='images/Flight/flightImg.png' width='138' height='76' />"
													+ "<div class='flightNo'><span>{flightnodisp}</span></div></div></div>"
													+ "<div style='float:right;width:50%'><span class='time' style='border-right:1px #bcbcbc dashed'>{[this.subOnTime(values.plandepttimedisp)]}</span><span class='time' style='color:#aaabab'>{[this.subOnTime(values.planarrtimedisp)]}</span></div></div>",
											{
												subOnTime : function(t) {
													return t.substring(11, t.length);
												},
												subOffTime : function(t) {
													return t.substring(11, t.length);
												},
											}),
								} ]

					}
				});