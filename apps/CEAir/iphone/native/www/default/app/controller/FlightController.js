
/* JavaScript content from app/controller/FlightController.js in folder common */
Ext.define("CEAIR.controller.FlightController", {
	extend : "Ext.app.Controller",

	config : {
		/**
		 * @private
		 */
		currentType : "",
		currentLevel : "",

		refs : {
			flightList : "flightList",
			myflightList : 'myflightList',
			queryBtn : "button[id=queryBtn]",
			// timeFilter : "selectfield[name=time]",
			timeSort : "selectfield[name=sector]",
			search : "searchfield[name=searchfield]",
			flightListContent : "list[id=flightListContent]",
			myFlightListContent : "list[id=myflightListContent]",
		},

		control : {
			flightList : {
				activate : "onFlightListActivate"
			},

			// timeFilter : {
			// change : "onTimeFilterChange",
			// },

			timeSort : {
				change : "onTimeSortChange",
			},

			search : {
				change : "onSearchChange",
			},

			flightListContent : {
				disclose : "onFlightListDisclosure"
			},

			myflightList : {
				activate : "onMyFlightListActivate"
			},

			queryBtn : {
				tap : "onQueryBtnTap"
			},
		}
	},

	onFlightListActivate : function() {
		var app = this.getApplication();
		var content = this.getFlightListContent();

		// if (Ext.device.Connection.isOnline()) {
		content.setStore(Ext.getStore("Flight"));
		var FlightStore = Ext.getStore("Flight").load();
		if (FlightStore.getData().length < 1) {
			var url = "http://mt.ceair.com:7001/DynamicFlightJson/service/flightService/querydemo";
			app.getRequest("Flight", null, url, true, "", "");
			FlightStore.clearFilter(true);
		}
		// } else {
		// var store = Ext.create('Ext.data.Store', {
		// model : "CEAIR.model.Collect",
		// });
		// store.load();
		// content.setStore(store);
		// }
	},

	onMyFlightListActivate : function() {
		var content = this.getMyFlightListContent();
		var store = Ext.create('Ext.data.Store', {
			model : "CEAIR.model.Collect",
		});
		store.load();
		content.setStore(store);
	},

	// onTimeFilterChange : function(field, newValue, oldValue,
	// eOpts) {
	// // var time =
	// // Ext.getStore("Flight").array[0].plandepttimedisp;
	// // console.log(time);
	// var FlightStore = Ext.getStore("Flight").load();
	// FlightStore.clearFilter(true);
	// // FlightStore.filter("plandepttimedisp", newValue);
	//
	// var myFilter = new Ext.util.Filter({
	// filterFn : function(item) {
	// var time = item.get("plandepttimedisp")
	// .substring(11, 13);
	//
	// if (newValue == 1) {
	// return time <= 10;
	// } else if (newValue == 2) {
	// return (time > 10) && (time < 13);
	// } else if (newValue == 3) {
	// return time >= 13;
	// } else if (newValue == 0) {
	// return true;
	// }
	//
	// }
	// });
	//
	// FlightStore.filter(myFilter);
	// },

	onTimeSortChange : function(field, newValue, oldValue, eOpts) {
		// Ext.Msg.alert('asdfasf');

		var FlightStore = Ext.getStore("Flight").load();
		console.log(FlightStore);
		FlightStore.sort('plandepttimedisp', newValue);

	},

	onSearchChange : function(field, newValue, oldValue, eOpts) {
		var FlightStore = Ext.getStore("Flight").load();
		FlightStore.filter('flightnodisp', newValue);
		console.log(newValue);
	},

	onFlightListDisclosure : function(list, record, item, index, e) {
		var store = Ext.create('Ext.data.Store', {
			model : "CEAIR.model.Collect"
		});
		store.load();
		store.filter('flightnodisp', record.get("flightnodisp"));
		console.log(store.getCount());
		if (store.getCount() != 0) {
			if (typeof WL === 'undefined') {
				Ext.Msg.alert('提示', '已经收藏过该航班');
			} else {
				WL.SimpleDialog.show("提示", "已经收藏过该航班", [ {
					text : "确定"
				} ]);
			}
		} else {
			var conference = Ext.create('CEAIR.model.Collect', {
				flightnodisp : record.get("flightnodisp"),
				arrairportdisp : record.get("arrairportdisp"),
				deptairportdisp : record.get("deptairportdisp"),
				plandepttimedisp : record.get("plandepttimedisp"),
				planarrtimedisp : record.get("planarrtimedisp"),
			});
			conference.save();
			store.load();
			store.insert(0, conference);
			store.sync();
			if (typeof WL === 'undefined') {
				Ext.Msg.alert('提示', '收藏成功！');
			} else {
				WL.SimpleDialog.show("提示", "收藏成功！", [ {
					text : "确定"
				} ]);
			}
		}
	},

	onQueryBtnTap : function() {
		this.getApplication().getController("MainController").showView("Flight.List");
	}

});