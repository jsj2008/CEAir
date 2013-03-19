Ext.define("CEAIR.controller.ContactController", {
	extend : "Ext.app.Controller",

	config : {

		app : null,
		refs : {
			contactList : "contactList",
			searchContact : "searchfield[id=searchContact]",
			qrcodeBtn : "button[id=qrcodeBtn]",
			contactNew : "contactNew",
			clientContactForm : "formpanel[id=clientContactForm]"
		},

		control : {
			contactList : {
				activate : "onContactListActivate",
				deactivate : "onContactListDeactivate"
			},
			searchContact : {
				change : "onSearchContactChanged"
			},
			qrcodeBtn : {
				tap : "qrcodeBtnTap"
			},
			contactNew : {
				activate : "onContactNewActivate",
			}
		}

	},

	onContactNewActivate : function() {
		var store = Ext.getStore("MyContacts").load();
		this.getClientContactForm().load(store);
	},

	/**
	 * 界面初始化
	 */
	onContactListActivate : function() {
		var me = this;
		document.addEventListener("deviceready", this.onContactReady(me), false);
	},

	/**
	 * 二维码扫描按钮点击
	 */
	qrcodeBtnTap : function() {
		var app = this.getApplication();
		var nativePage = "";
		var me = this;
		if (app.platform == WL.Environment.ANDROID)
			nativePage = "com.CEAir.scan.CaptureActivity";
		else if (app.platform == WL.Environment.IPHONE || app.platform == WL.Environment.IPAD) {
			nativePage = "CameraController";
		}
		WL.NativePage.show(nativePage, this.codeCallback, null);
	},

	/**
	 * 界面失效
	 */
	onContactListDeactivate : function() {
		this.getApplication().removeRightBtn();
	},

	codeCallback : function(data) {
		console.log(data.str);
		// var s = VCARD.parse(data.st);
		// console.log(s.N);
		// var a = data.str.split(",");
		// var item = "";
		// for ( var i = 0; i < a.length; i++) {
		// var c = a[i].split(":");
		// console.log(a[i]);
		// if (c[0] == "N") {
		// item += "姓名：" + c[1];
		// }
		// }
		WL.SimpleDialog.show("名片信息", data.str, [ {
			text : "确定",
		} ]);
	},

	onContactReady : function(current) {
		if (!(typeof WL === 'undefined')) {
			var options = new ContactFindOptions();
			options.filter = "";
			current.loadContacts(options);
		}
	},

	// 搜索框
	onSearchContactChanged : function(field, newValue, oldValue, opt) {
		console.log(newValue);
		if (!(typeof WL === 'undefined')) {
			var options = new ContactFindOptions();
			options.filter = newValue;
			this.loadContacts(options);
		}

	},

	loadContacts : function(options) {
		Ext.Viewport.setMasked({
			xtype : 'loadmask',
			message : '联系人加载中...'
		});
		options.multiple = true;
		var fields = [ "displayName", "phoneNumbers", "emails" ];
		navigator.contacts.find(fields, function(contacts) {
			var store = Ext.getStore("Contacts").load();
			var items = [];
			for ( var i = 0; i < contacts.length; i++) {
				if (contacts[i].displayName) {
					console.log(contacts[i].displayName);
					var data = {
						"itemId" : contacts[i].id,
						"name" : contacts[i].displayName == null ? "" : contacts[i].displayName,
						"phone" : contacts[i].phoneNumbers == null ? "" : contacts[i].phoneNumbers[0].value,
						"email" : contacts[i].emails == null ? "" : contacts[i].emails[0].value
					};
					items.push(data);
				}
			}
			store.setData(items);
			Ext.Viewport.setMasked(false);
		}, function(error) {
			console.log(error);
			if (typeof WL === 'undefined') {
				Ext.Msg.alert('获取联系人信息失败');
			} else {
				WL.SimpleDialog.show("提示", "获取联系人信息失败", [ {
					text : "确定"
				} ]);
			}
			Ext.Viewport.setMasked(false);
		}, options);
	}

});