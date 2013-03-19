
/* JavaScript content from app/controller/MainController.js in folder common */
Ext.define("CEAIR.controller.MainController", {
	extend : "Ext.app.Controller",

	config : {
		/**
		 * @private
		 */
		viewList : [ "Flight.Query", "Contact.List", "Radar.GoogleMap", "Market.Map", "MyFlight.List", "MainList",
				"More.List" ],

		refs : {
			mainview : "mainview",
			mainCube : "maincube",
			mainList : "mainlist",
			frontBtn : "mainlist panel button",

		},

		control : {
			mainCube : {
				activate : "onMainCubeActivate",
			// deactivate : "onMainListDeactivate",
			},

			mainview : {
				activate : "onMainviewActivate",
			},
			mainList : {
				activate : "onMainListActivate",
			},
			frontBtn : {
				tap : "onMainListTap"
			}
		}
	},

	// /**
	// * 首页列表点击处理
	// */
	onMainListTap : function(btn) {
		var view = btn.getId();
		view = view.replace("front_", "").replace(new RegExp("_", "gm"), ".");
		console.log("view:" + view);
		this.showView(view);
	},

	/**
	 * 控制所有页面的创建显示
	 */
	showView : function(name) {
		console.log(name);
		// CEAIR.app.removeRightBtn();
		var view = Ext.create("CEAIR.view." + name);
		this.getMainview().push(view);
	},

	// 消除页面
	 pop : function() {
		var count = arguments[0] ? arguments[0] : 0;
		this.getMainview().pop(count);
	},

	/**
	 * 首页 活动
	 */
	onMainviewActivate : function() {
		this.showView("MainCube");
	},

	onMainListActivate : function() {
		var app = this.getApplication();
		// Ext.getCmp('mainview').getNavigationBar().add({
		// id : "rightButton",
		// xtype : 'button',
		// align : 'right',
		// text : "注销",
		// handler : function() {
		// Ext.Msg.confirm("提示", "您确定要注销吗?", function(e) {
		// if (e == "yes") {
		// app.removeRightBtn();
		// var login = Ext.create("CEAIR.view.Login");
		// login.on("deactivate", function(oldActiveItem, container,
		// newActiveItem, eOpts) {
		// if (oldActiveItem) {
		// Ext.Viewport.remove(oldActiveItem, true);
		// }
		// });
		// Ext.Viewport.setActiveItem(login);
		// console.log("111111111");
		// }
		// }, this);
		// }
		// });
		// Ext.getCmp('mainview').getNavigationBar().add({
		// id : "userNameLable",
		// xtype : 'label',
		// align : 'left',
		// cls : "top_lable",
		// html : "欢迎 " + app.currentUser.username,
		// });
		console.log("nuername = " + app.currentUser.username);
	},

	onMainCubeActivate : function() {
		var app = this.getApplication();
		var me = this;
		if (!(typeof WL === 'undefined')) {
			if (app.platform == WL.Environment.ANDROID)
				nativePage = "com.thierry.cube.CubeViewActivity";
			else if (app.platform == WL.Environment.IPHONE || app.platform == WL.Environment.IPAD) {
				nativePage = "CubeViewController";
			}
			WL.NativePage.show(nativePage, function(data) {
				console.log(data);
				me.showView(me.getViewList()[parseInt(data.index)]);
			}, null);
		}
	}

});