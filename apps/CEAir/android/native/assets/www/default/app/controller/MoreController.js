
/* JavaScript content from app/controller/MoreController.js in folder common */
Ext.define("CEAIR.controller.MoreController", {
	extend : "Ext.app.Controller",
	config : {
		/**
		 * @private
		 */

		currentSelect : "",
		refs : {
			// modifyPasswordView :"modifyPasswordView",
			setList : "list[id=setList]",
			modifyPassword : "modifyPasswordView",
			modifyPasswordForm : "formpanel[id=modifyPasswordForm]",
			confirmPasswordBtn : "button[id=confirmPasswordBtn]",
		},

		control : {

			setList : {
				itemtap : "onSelectSetList",
			},

			modifyPassword : {
				activate : "onModifyPasswordActivate"
			},

			confirmPasswordBtn : {
				tap : "onConfirmPasswordBtnTap"
			},

		}
	},

	// 修改密码提交
	onConfirmPasswordBtnTap : function() {
		var app = this.getApplication();
		var username = app.currentUser.username;
		var password = app.currentUser.password;
		var modifyPasswordForm = this.getModifyPasswordForm();
		var values = modifyPasswordForm.getValues();
		console.log("app.currentUser.username = " + app.currentUser.username);
		var oldPassword = values.oldPassword;
		var newPassword = values.newPassword;
		var confirmNewPassword = values.confirmNewPassword;
		if (password == oldPassword && newPassword == confirmNewPassword) {
			console.log("新旧密码均相同");

			var app = this.getApplication();
			var url = MODIFYURL + "&userName=" + username + "&oldPassword=" + oldPassword + "&newPassword="
					+ newPassword;
			app.getRequest("", null, url, true, "", function(store) {
				Ext.Msg.alert('提示', '密码修改成功！');
				this.modifyPasswordForm.reset();
			});

		} else if (password != oldPassword) {
			Ext.Msg.alert('提示', '原密码错误，请重新输入！');
		} else if (password == oldPassword && newPassword == confirmNewPassword && password == newPassword) {
			Ext.Msg.alert('提示', '新密码与原密码相同，请重新输入！');
		} else if (password == oldPassword && newPassword != confirmNewPassword) {
			Ext.Msg.alert('提示', '新密码不一致，请重新输入！');
		} else if (password == oldPassword && newPassword == "") {
			Ext.Msg.alert('提示', '密码不能为空!');
		}
	},

	onSelectSetList : function(list, index, item, record) {
		var name = record.get("id");
		var app = this.getApplication();
		console.log(name);
		this.setCurrentSelect(record);
		if (name == "aboutus") {
			var visitCheck = Ext.create("CEAIR.view.More.Aboutus");
			app.getController("MainController").getMainview().push(visitCheck);
		} else if (name == "logOff") {
			WL.SimpleDialog.show("提示", "您确定要注销吗?", [ {
				text : "确定",
				handler : function() {
					var login = Ext.create("CEAIR.view.Login");
					login.on("deactivate", function(oldActiveItem, container, newActiveItem, eOpts) {
						if (oldActiveItem) {
							Ext.Viewport.remove(oldActiveItem, true);
						}
					});
					Ext.Viewport.setActiveItem(login);
				}
			}, {
				text : "取消",
				handler : function() {
				}
			} ]);
		}

	},

	onModifyPasswordActivate : function() {
		var record = this.getCurrentSelect();
		// console.log(record);
		this.getModifyPasswordForm().setRecord(record);
	},

});