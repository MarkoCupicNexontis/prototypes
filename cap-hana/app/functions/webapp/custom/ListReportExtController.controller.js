// sap.ui.define([],
// function (){
//     "use strict";
//     return {

//         onDown: function(oEvent) {
//             alert('onDown');
//         },
//         onUp: function(oEvent) {
//             alert('onUp');
//         }
//     };
// });

sap.ui.define(["sap/ui/core/mvc/ControllerExtension", "sap/m/MessageToast","sap/ui/core/Fragment"], function (
    ControllerExtension,
    MessageToast,
    Fragment
) {


    return ControllerExtension.extend("prot.functions.custom.ListReportExtController", {

        getUserCount: function () {
            var that = this
            $.ajax({
                method: "GET",
                url: "/service/functions/incrementUserCount()",
                success: function (oResponse) {
                     that.userCountBTN.setText(`User's online: ${oResponse.value.toString()}`);

                },
                error: function (oResponse, res) {

                    console.log(oResponse, res)
                }
            });
        },

        onUpload: function (oEvent) {
            this._pDialogFileUpload = undefined;
            if (!this._pDialogFileUpload) {
                this._pDialogFileUpload = sap.ui.xmlfragment(
                    "functions.custom.fragment.UploadDialog",
                    this);
                this.getView().addDependent(this._pDialogFileUpload);
            }
            this._pDialogFileUpload.open();



        },
        closeFileUploadDialog: function () {
            this._pDialogFileUpload.close();
            this._pDialogFileUpload.destroy();
            this._pDialogFileUpload = null;
        },
        onPressUploadBtn: function () {
            var oFileUploader = sap.ui.getCore().byId("BulkImportUploader");
            if (!oFileUploader.getValue()) {
                MessageToast.show("Choose a file first");
                return;
            }
            oFileUploader.checkFileReadable().then(function () {
                oFileUploader.upload();
                this.getView().getModel().refresh();
            }, function (error) {
                MessageToast.show("The file cannot be read. It may have changed.");
            }).then(function () {
                oFileUploader.clear();
            });

        },
        intervalService: function () {
            // var that = this;
            // this.intervalHandle = setInterval(function () {
            //     that.getUserCount();
            // }, 5000);
        },
        onUserCount: function() {
            if (!this.testPopover) {
                Fragment.load({
                    name: "functions.custom.fragment.testFragment",
                    controller: this
                }).then(function (pPopover) {
                    this.testPopover = pPopover;
                    this.getView().addDependent(this.testPopover);
                    this.testPopover.open();
                   sap.ui.getCore().byId("saveBtn").setEnabled(false);
                }.bind(this));
            } else {

                this.testPopover.open();
               
                 sap.ui.getCore().byId("saveBtn").setEnabled(false);
            }
        },
        onChoose: function () {
            sap.ui.getCore().byId("saveBtn").setEnabled(true);
        },
        closeFragment: function() {
            this.testPopover.close();
        },
        onSave: function() {
            var that=this;
            this.testPopover.close();
            that.userCountBTN.setText(that.oAppModel.getProperty("/pickedItem"));

            
        },


        // this section allows to extend lifecycle hooks or override public methods of the base controller
        override: {
            onInit: function () {
                this.getUserCount();
                this.intervalService();
                this.objItems = [{
                    "ITEM" : "Item1"
                },{
                    "ITEM" : "Item2"
                }]


            },
            onBeforeRendering: function () {

                this.oAppModel = this.getView().getModel("appModel");
                this.oDataModel = this.getView().getModel();
                this.oAppModel.setProperty("/items", jQuery.extend(true, [], this.objItems));

            },
            onAfterRendering: function () {
                this.userCountBTN = this.getView().byId("functions::FunctionsList--fe::CustomAction::userCountID");
                this.userCountBTN.setEnabled(true);
                console.log(this.oAppModel.getProperty("/items"))
            }


        }
    });
});

