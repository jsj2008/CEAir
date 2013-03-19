Ext.define("CEAIR.controller.HandbookController", {
	extend : "Ext.app.Controller",

	config : {
		/**
		 * @private
		 */
		content : "",
		currentRecord : "",
		refs : {
			handbook : "handbookList",
			handbookContents : "handbookContents",
		},

		control : {

			handbook : {
				itemtap : "onSelectHandbookList",
			},

			handbookContents : {
				activate : "onHandbookContentsActivate",
				deactivate  :"onHandbookContentsDeActivate"
			}

		},
	},

	onSelectHandbookList : function(list, index, item, record) {
		console.log("aaaaaa");
		var app = this.getApplication();
		var handbookContents = Ext.create("CEAIR.view.Handbook.Contents");
		// this.handbookContents.setRecord(record);
		this.setContent(record.get("contents"));
		app.getController("MainController").getMainview()
				.push(handbookContents);
	},

	onHandbookContentsActivate : function() {
		var content  = this.getContent();
		this.getHandbookContents().setHtml(content);
	},
	
	onHandbookContentsDeActivate : function() {
		this.getHandbookContents().setHtml("");
//		this.getHandbookContents().setHtml(record.get("contents"));
//		this.getHandbookContents().setHtml("sssss");
	}

});