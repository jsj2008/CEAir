
/* JavaScript content from app/controller/MarketController.js in folder common */
Ext
		.define(
				"CEAIR.controller.MarketController",
				{
					extend : "Ext.app.Controller",
					config : {
						refs : {
							marketMapView : "marketMapView",
							marketDetail : "marketDetail"
						},

						control : {
							marketMapView : {
								activate : "onMapActivate",
							},
							marketDetail : {
//								initialize : "onMarketDetailInit"
							}
						}
					},

					onMapActivate : function() {
						var mainController = this.getApplication()
								.getController("MainController");
						var googleMapView = this.getMarketMapView();
						var map = googleMapView.add({
							xtype : 'map',
							mapOptions : {
								zoom : 1,
								mapTypeId : google.maps.MapTypeId.ROADMAP
							}
						});

						var americaLayer = new google.maps.KmlLayer(
								'http://www.baidupcs.com/file/7f07b6b69acb92b462f5cec3e6d97885?fid=823309601-250528-999273863&time=1362563914&sign=FDTA-DCb740ccc5511e5e8fedcff06b081203-xsJ7VueDjFQvyTUchrrTX9ExVbk%3D&expires=8h&sh=1&response-cache-control=private');
						americaLayer.setMap(map.getMap());

						var chinaNorthEastLayer = new google.maps.KmlLayer(
								'http://www.baidupcs.com/file/e36cb50159323b3a29f691b383b942c1?fid=823309601-250528-3468488399&time=1362564126&sign=FDTA-DCb740ccc5511e5e8fedcff06b081203-%2Fjv%2BvMH7Tv%2B3xPS6qYjcvGU9tOk%3D&expires=8h&sh=1&response-cache-control=private');
						chinaNorthEastLayer.setMap(map.getMap());

						var europeLayer = new google.maps.KmlLayer(
								'http://www.baidupcs.com/file/e6ab77a970a358fe308206a2731e481b?fid=823309601-250528-4234905800&time=1362563974&sign=FDTA-DCb740ccc5511e5e8fedcff06b081203-tc3aeiNLfpo8R4c9i%2BAzh5ipJ4E%3D&expires=8h&sh=1&response-cache-control=private');
						europeLayer.setMap(map.getMap());

						google.maps.event.addListener(americaLayer, 'click',
								function() {
									mainController.showView("Market.Detail");
								});
						google.maps.event.addListener(chinaNorthEastLayer,
								'click', function() {
									mainController.showView("Market.Detail");
								});
						google.maps.event.addListener(europeLayer, 'click',
								function() {
									mainController.showView("Market.Detail");
								});

					},
					
					onMarketDetailInit:function() {
						/**
						 * Dark blue theme for Highcharts JS
						 * @author Torstein Hønsi
						 */

						Highcharts.theme = {
						   colors: ["#DDDF0D", "#55BF3B", "#DF5353", "#7798BF", "#aaeeee", "#ff0066", "#eeaaee",
						      "#55BF3B", "#DF5353", "#7798BF", "#aaeeee"],
						   chart: {
						      backgroundColor: {
						         linearGradient: [0, 0, 250, 500],
						         stops: [
						            [0, 'rgb(48, 96, 48)'],
						            [1, 'rgb(0, 0, 0)']
						         ]
						      },
						      borderColor: '#000000',
						      borderWidth: 2,
						      className: 'dark-container',
						      plotBackgroundColor: 'rgba(255, 255, 255, .1)',
						      plotBorderColor: '#CCCCCC',
						      plotBorderWidth: 1
						   },
						   title: {
						      style: {
						         color: '#C0C0C0',
						         font: 'bold 16px "Trebuchet MS", Verdana, sans-serif'
						      }
						   },
						   subtitle: {
						      style: {
						         color: '#666666',
						         font: 'bold 12px "Trebuchet MS", Verdana, sans-serif'
						      }
						   },
						   xAxis: {
						      gridLineColor: '#333333',
						      gridLineWidth: 1,
						      labels: {
						         style: {
						            color: '#A0A0A0'
						         }
						      },
						      lineColor: '#A0A0A0',
						      tickColor: '#A0A0A0',
						      title: {
						         style: {
						            color: '#CCC',
						            fontWeight: 'bold',
						            fontSize: '12px',
						            fontFamily: 'Trebuchet MS, Verdana, sans-serif'

						         }
						      }
						   },
						   yAxis: {
						      gridLineColor: '#333333',
						      labels: {
						         style: {
						            color: '#A0A0A0'
						         }
						      },
						      lineColor: '#A0A0A0',
						      minorTickInterval: null,
						      tickColor: '#A0A0A0',
						      tickWidth: 1,
						      title: {
						         style: {
						            color: '#CCC',
						            fontWeight: 'bold',
						            fontSize: '12px',
						            fontFamily: 'Trebuchet MS, Verdana, sans-serif'
						         }
						      }
						   },
						   tooltip: {
						      backgroundColor: 'rgba(0, 0, 0, 0.75)',
						      style: {
						         color: '#F0F0F0'
						      }
						   },
						   toolbar: {
						      itemStyle: {
						         color: 'silver'
						      }
						   },
						   plotOptions: {
						      line: {
						         dataLabels: {
						            color: '#CCC'
						         },
						         marker: {
						            lineColor: '#333'
						         }
						      },
						      spline: {
						         marker: {
						            lineColor: '#333'
						         }
						      },
						      scatter: {
						         marker: {
						            lineColor: '#333'
						         }
						      },
						      candlestick: {
						         lineColor: 'white'
						      }
						   },
						   legend: {
						      itemStyle: {
						         font: '9pt Trebuchet MS, Verdana, sans-serif',
						         color: '#A0A0A0'
						      },
						      itemHoverStyle: {
						         color: '#FFF'
						      },
						      itemHiddenStyle: {
						         color: '#444'
						      }
						   },
						   credits: {
						      style: {
						         color: '#666'
						      }
						   },
						   labels: {
						      style: {
						         color: '#CCC'
						      }
						   },

						   navigation: {
						      buttonOptions: {
						         backgroundColor: {
						            linearGradient: [0, 0, 0, 20],
						            stops: [
						               [0.4, '#606060'],
						               [0.6, '#333333']
						            ]
						         },
						         borderColor: '#000000',
						         symbolStroke: '#C0C0C0',
						         hoverSymbolStroke: '#FFFFFF'
						      }
						   },

						   exporting: {
						      buttons: {
						         exportButton: {
						            symbolFill: '#55BE3B'
						         },
						         printButton: {
						            symbolFill: '#7797BE'
						         }
						      }
						   },

						   // scroll charts
						   rangeSelector: {
						      buttonTheme: {
						         fill: {
						            linearGradient: [0, 0, 0, 20],
						            stops: [
						               [0.4, '#888'],
						               [0.6, '#555']
						            ]
						         },
						         stroke: '#000000',
						         style: {
						            color: '#CCC',
						            fontWeight: 'bold'
						         },
						         states: {
						            hover: {
						               fill: {
						                  linearGradient: [0, 0, 0, 20],
						                  stops: [
						                     [0.4, '#BBB'],
						                     [0.6, '#888']
						                  ]
						               },
						               stroke: '#000000',
						               style: {
						                  color: 'white'
						               }
						            },
						            select: {
						               fill: {
						                  linearGradient: [0, 0, 0, 20],
						                  stops: [
						                     [0.1, '#000'],
						                     [0.3, '#333']
						                  ]
						               },
						               stroke: '#000000',
						               style: {
						                  color: 'yellow'
						               }
						            }
						         }
						      },
						      inputStyle: {
						         backgroundColor: '#333',
						         color: 'silver'
						      },
						      labelStyle: {
						         color: 'silver'
						      }
						   },

						   navigator: {
						      handles: {
						         backgroundColor: '#666',
						         borderColor: '#AAA'
						      },
						      outlineColor: '#CCC',
						      maskFill: 'rgba(16, 16, 16, 0.5)',
						      series: {
						         color: '#7798BF',
						         lineColor: '#A6C7ED'
						      }
						   },

						   scrollbar: {
						      barBackgroundColor: {
						            linearGradient: [0, 0, 0, 20],
						            stops: [
						               [0.4, '#888'],
						               [0.6, '#555']
						            ]
						         },
						      barBorderColor: '#CCC',
						      buttonArrowColor: '#CCC',
						      buttonBackgroundColor: {
						            linearGradient: [0, 0, 0, 20],
						            stops: [
						               [0.4, '#888'],
						               [0.6, '#555']
						            ]
						         },
						      buttonBorderColor: '#CCC',
						      rifleColor: '#FFF',
						      trackBackgroundColor: {
						         linearGradient: [0, 0, 0, 10],
						         stops: [
						            [0, '#000'],
						            [1, '#333']
						         ]
						      },
						      trackBorderColor: '#666'
						   },

						   // special colors for some of the
						   legendBackgroundColor: 'rgba(0, 0, 0, 0.5)',
						   legendBackgroundColorSolid: 'rgb(35, 35, 70)',
						   dataLabelsColor: '#444',
						   textColor: '#C0C0C0',
						   maskColor: 'rgba(255,255,255,0.3)'
						};

						// Apply the theme
						var highchartsOptions = Highcharts.setOptions(Highcharts.theme);
					}

				});