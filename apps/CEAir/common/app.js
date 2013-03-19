//<debug>
Ext.Loader.setPath({
	'Ext.ux.touch.grid' : 'app/Ext.ux.touch.grid',

});
// </debug>

Ext.application({
	name : 'CEAIR',

	platform : typeof WL === 'undefined' ? "" : WL.Client.getEnvironment(),
	// platform : "",

	listData : [],

	requires : [ 'Ext.MessageBox', 'Ext.ux.touch.grid.List', 'Ext.ux.touch.grid.feature.Feature',
			'Ext.ux.touch.grid.feature.Sorter', 'Ext.device.Connection' ],

	views : [ 'Login', 'Main', 'MainList',
	// Thierry
	// Geo
	'Flight.List', 'Flight.Query', 'Handbook.Contents', ],

	stores : [ 'Flight',
	// Thierry

	"Contacts", "MyContacts",

	"Charts",
	// Geo
	// "Collect",
	"Handbook", "Wage", ],

	models : [
	// Thierry
	"Contact",
	// Geo
	'Flight', "Collect", "Login", "Chart" ],

	controllers : [
	//
	"MainController", "LoginController", "MoreController",

	// Thierry
	"ContactController", "MapController",

	// Geo
	"FlightController", "MarketController", "HandbookController" ],

	launch : function() {
		// 去除Msg动画
		Ext.Msg.defaultAllowedConfig.showAnimation = false;
		Ext.Msg.defaultAllowedConfig.hideAnimation = false;
		Ext.fly('appLoadingIndicator').destroy();

		var store = Ext.create('Ext.data.Store', {
			model : "CEAIR.model.Login"
		});
		store.load();
		console.log("Ext.os.is.iOS:"+Ext.os.is.iOS);

		// if (Ext.device.Connection.isOnline()) {
		Ext.Viewport.add(Ext.create('CEAIR.view.Login'));
		// } else {
		// Ext.Viewport.add(Ext.create('CEAIR.view.Main'));
		// }

		// console.log(Ext.device.Connection.isOnline());

		// Ext.Viewport.setActiveItem(login);
		// 处理一下android返回按钮
		document.addEventListener("deviceready", onDeviceReady, false);

		function onDeviceReady() {
			document.addEventListener("backbutton", onBackKeyDown, false);
		}

		function onBackKeyDown() {
			var canPop = false;
			var id = Ext.Viewport.getActiveItem().id;
			if (id.indexOf("login") != -1) {
			} else if (id.indexOf("mainview") != -1) {
				var mainview = Ext.Viewport.getActiveItem();
				var length = mainview.getItems().length;
				if (length > 2) {
					canPop = true;
				}
			}
			if (canPop) {
				console.log("canPop");
				CEAIR.app.getController("MainController").pop(1);
			} else {
				if (typeof WL === 'undefined') {
					Ext.Msg.confirm("提示", "您确定要退出应用吗?", function(e) {
						if (e == "yes") {
							navigator.app.exitApp();
						}
					}, this);
				} else {
					WL.SimpleDialog.show("提示", "您确定要退出应用吗?", [ {
						text : "确定",
						handler : function() {
							navigator.app.exitApp();
						}
					}, {
						text : "取消",
						handler : function() {
						}
					} ]);
				}
			}

		}
	},

	currentUser : {
		id : "5997",
		username : "",
		password : "",
	},

	isOffline : false,

	removeRightBtn : function() {
		var button = Ext.getCmp('rightButton');
		if (button) {
			Ext.getCmp('mainview').getNavigationBar().remove(button);
		}
	},

	getRequest : function(storeName, listEntity, url, showNullMessage, showView, callback) {
		var me = this;
		var store = null;
		if (storeName != "") {
			store = Ext.getStore(storeName).load();
		}

		Ext.Viewport.setMasked({
			xtype : 'loadmask',
			message : '数据加载中，请稍候...'
		});

		Ext.Ajax.request({
			url : url,
			method : "POST",
			success : function(response, options) {

				var resp = Ext.JSON.decode(response.responseText);
				console.log(resp);
				me.listData = resp.array;
				store.setData(me.listData.slice(0, 15));
				Ext.Viewport.setMasked(false);
			},

			failure : function(response, options) {
				console.log("failure" + response);
				if (typeof WL === 'undefined') {
					Ext.Msg.alert('提示', '获取数据超时，请重试');
				} else {
					WL.SimpleDialog.show("提示", "获取数据超时，请重试", [ {
						text : "确定"
					} ]);
				}
				Ext.Viewport.setMasked(false);
			}
		});
	},

});
