
/* JavaScript content from app/controller/MapController.js in folder common */
Ext
		.define(
				"CEAIR.controller.MapController",
				{
					extend : "Ext.app.Controller",
					mapMarkers : [],
					count : 60,
					isLooping : true,
					currentTask : null,
					cloudLayer : null,
					config : {
						isFirstLoad : true,
						refs : {
							baiduMapView : "baiduMapView",
							googleMapView : "googleMapView"
						},

						control : {
							baiduMapView : {
								initialize : "onBaiduMapInitialize",
								activate : "onBaiduMapActivate",
								deactivate : "onBaiduMapDeActivate"
							},
							googleMapView : {
								initialize : "onGoogleMapInitialize",
								activate : "onGoogleMapActivate",
								deactivate : "onGoogleMapDeActivate"
							},
						}
					},

					onGoogleMapInitialize : function() {
					},

					/**
					 * 清除所有标记
					 */
					clearAllMarker : function() {
						for ( var i = 0; i < this.mapMarkers.length; i++) {
							this.mapMarkers[i].setMap(null);
						}
					},

					/**
					 * 循环标记
					 */
					loopMarker : function(i, k, latArray, lngArray, map,
							onMarkerClick) {
						this.clearAllMarker();
						var latLength = latArray[i + 1] - latArray[i];
						var lngLength = lngArray[i + 1] - lngArray[i];

						if (this.mapMarkers.length < 400) {
							var marker = new google.maps.Marker({
								map : map.getMap(),
								position : new google.maps.LatLng(latArray[i]
										+ (latLength * k) / 20, lngArray[i]
										+ (lngLength * k) / 20),
								icon : "images/huiji.png"
							});

							google.maps.event.addListener(marker, 'click',
									onMarkerClick);

							this.mapMarkers.push(marker);
						} else {
							this.mapMarkers[i].setMap(map.getMap());
						}

					},

					onGoogleMapDeActivate : function() {
						this.mapMarkers = new Array();
						Ext.TaskMgr.stopAll();
					},

					onGoogleMapActivate : function() {
						this.isLooping = true;
						var centerPosition = new google.maps.LatLng(35.043,
								117.611);
						var googleMapView = this.getGoogleMapView();
						var map = googleMapView.add({
							xtype : 'map',
							mapOptions : {
								center : centerPosition,
								zoom : 5,
								mapTypeId : google.maps.MapTypeId.ROADMAP
							}
						});

						// var weatherLayer = new
						// google.maps.weather.WeatherLayer();
						// weatherLayer.setMap(map.getMap());

						// // 添加云图
						// var cloudLayer = new
						// google.maps.weather.CloudLayer();
						// cloudLayer.setMap(map.getMap());

						var infoWindow = new google.maps.InfoWindow;

						var onMarkerClick = function() {
							var marker = this;
							var latLng = marker.getPosition();
							infoWindow.setContent('<h3>当前经纬度分别为:</h3>'
									+ (latLng.lat() + "").substring(0, 6)
									+ ', '
									+ (latLng.lng() + "").substring(0, 6));

							infoWindow.open(map, marker);
						};

						google.maps.event.addListener(map.getMap(), 'click',
								function() {
									infoWindow.close();
								});

						var latArray = [ 32.649, 35.043, 37.756, 39.817 ];
						var lngArray = [ 119.467, 117.611, 116.617, 116.643 ];

						//
						// for ( var i = 0; i < 4; i++) {
						// var marker = new google.maps.Marker({
						// map : map.getMap(),
						// animation : google.maps.Animation.DROP,
						// position : new google.maps.LatLng(latArray[i],
						// lngArray[i]),
						// icon : "images/thumbnail.png"
						// });
						//
						// google.maps.event.addListener(marker, 'click',
						// onMarkerClick);
						// }

						var mapController = this;
						var i = 0;
						var k = 0;

						var updateMap = function() {
							if (i >= 3) {
								i = 0;
								k = 0;
							}

							if (k >= 20) {
								k = 0;
								i++;
							}

							mapController.loopMarker(i, k, latArray, lngArray,
									map, onMarkerClick);
							mapController.updateCloudLayer(map);
							k++;
						};

						this.currentTask = {
							run : updateMap,
							interval : 3000
						};

						Ext.TaskMgr.start(this.currentTask);
					},

					updateCloudLayer : function(map) {
						if (null != this.cloudLayer) {
							this.cloudLayer.setMap(null);
						}

						this.cloudLayer = new google.maps.weather.CloudLayer();
						this.cloudLayer.setMap(map.getMap());
					},

					onBaiduMapInitialize : function() {
						// var mapView = this.getMapView();
						// Ext.Ajax.request({
						// url: 'map.html', // place into same dir with app.js
						// method: 'GET',
						// callback: function(options, success, response) {
						// mapView.setHtml( response.responseText );
						// }
						// });
						// var map = new BMap.Map("allmap"); // 创建Map实例
						// var point = new BMap.Point(116.404, 39.915); // 创建点坐标
						// map.centerAndZoom(point, 15); // 初始化地图,设置中心点坐标和地图级别。
						// map.enableScrollWheelZoom(); // 启用滚轮放大缩小
					},

					onBaiduMapActivate : function() {
						this.setBaiduMapView();
					},

					onBaiduMapDeActivate : function() {
					},

					setBaiduMapView : function() {
						// this.getBaiduMapView().destroy();

						var map = new BMap.Map("baiduMap"); // 创建Map实例
						// map.centerAndZoom(new BMap.Point(116.304, 39.915),
						// 11); // 初始化地图,设置中心点坐标和地图级别
						map.centerAndZoom("北京"); // 初始化地图,设置中心点坐标和地图级别
						map.addControl(new BMap.NavigationControl()); // 添加平移缩放控件
						map.addControl(new BMap.ScaleControl()); // 添加比例尺控件
						map.addControl(new BMap.OverviewMapControl()); // 添加缩略地图控件
						map.enableScrollWheelZoom(); // 启用滚轮放大缩小
						map.addControl(new BMap.MapTypeControl()); // 添加地图类型控件
						map.setCurrentCity("北京"); // 设置地图显示的城市 此项是必须设置的
					},

				});