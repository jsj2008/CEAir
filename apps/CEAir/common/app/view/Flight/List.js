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
									store : "Flight",
									flex : 1,
									plugins : [ {
										xclass : 'Ext.plugin.PullRefresh',
										pullRefreshText : '下拉获取最新航班信息',
										releaseRefreshText : '松开开始更新',
										loadingText : '正在刷新……',
									}, {
										xclass : 'Ext.plugin.ListPaging',
										autoPaging : true,
										loadMoreText : "加载更多...",
										noMoreRecordsText : '没有更多条记录了',
									} ],
									itemTpl : new Ext.XTemplate(
											"<div style='overflow:hidden'><div style='float:left;margin: 25px 0;'><img src='images/Flight/donghang.png' width='16' height='16' /></div>"
													+ "<div class='flightNo' style='float:left;margin: 25px 5px;'><span>{flightnodisp}</span></div>"
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