
/* JavaScript content from app/view/Flight/List.js in folder common */
/**
 * 航班动态 - 查询结果列表
 */
Ext
		.define(
				'CEAIR.view.Flight.List',
				{

					extend : 'Ext.Container',
					xtype : 'flightList',
					requires : [ 'Ext.SegmentedButton', 'Ext.List', 'Ext.field.Select', 'Ext.field.Search', ],
					config : {
						title : '查询结果',
						layout : {
							type : 'vbox',
						// align : 'stretch'
						},
						disableSelection : 'false',
						items : [
								{
									xtype : 'toolbar',
									docked : 'top',
									cls : 'title-secend',
									defaults : {
										flex : 1,
										align : 'center',
									},
									items : [
											{
												html : "<img src='images/Flight/arrows-left.png' height='15' width='9'/>"
											},
											{
												html : "<div class='title-secend-font' >2013-02-27</div><div class='title-secend-font2'> 上海 - 北京 </div>"
											},
											{
												html : "<img src='images/Flight/arrows-right.png' height='15' width='9'/>"
											} ]
								},
								{
									scrollable : false,
									layout : 'hbox',
									height : "40px",
									defaults : {
										flex : 1,
										align : 'center',
									},
									items : [ {
										xtype : 'searchfield',
										placeHolder : '搜索航班号',
										cls : 'searchFlight',
										name : 'searchfield',
										value : '',
										width : '38%',
									}, {
										xtype : 'selectfield',
										cls : 'selectField',
										prependText : 'Sector:',
										width : '31%',
										name : 'sector',
										prependText : 'Sector',
										options : [
										// {text: '排序', value: ''},
										{
											text : '起飞时间↑',
											value : 'ASC'
										}, {
											text : '起飞时间↓',
											value : 'DESC'
										}, ]
									}, {
										xtype : 'selectfield',
										cls : 'selectField',
										readOnly : true,
										labelWidth : '100%',
										width : '31%',
										options : [ {
											text : '到达时间',
										} ],
									} ]
								},
								{
									scrollable : 'vertical',
									id : "flightListContent",
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
									onItemDisclosure : true,
								} ]

					}
				});