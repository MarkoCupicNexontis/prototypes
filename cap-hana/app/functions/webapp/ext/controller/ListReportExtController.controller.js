sap.ui.define(["sap/ui/core/mvc/ControllerExtension", "sap/m/MessageToast", "sap/m/MessageBox", "sap/ui/core/Fragment"], function (
    ControllerExtension,
    MessageToast,
    MessageBox,
    Fragment
) {



    return ControllerExtension.extend("prot.functions.ext.controller.ListReportExtController", {
        // var oData = {
        //     productNameState: ValueState.Error,
        //     productWeightState: ValueState.Error,
        //     productType: "Mobile",
        //     reviewButton: false,
        //     backButtonVisible: false,
        //     availabilityType: "In store",
        //     productVAT: false,
        //     measurement: "",
        //     productManufacturer: "N/A",
        //     productDescription: "N/A",
        //     size: "N/A",
        //     productPrice: "N/A",
        //     manufacturingDate: "N/A",
        //     discountGroup: ""
        // }

        // this section allows to extend lifecycle hooks or override public methods of the base controller
        override: {
            onInit: function () {




            },
            onBeforeRendering: function () {
                var that = this;
                this.oAppModel = this.getView().getModel("appModel");
                this.oDataModel = this.getView().getModel();
                this.oAppModel.setProperty("/reviewButton", false);
                this.oAppModel.setProperty("/backButtonVisible", false);

            },
            onAfterRendering: function () {
                var that = this
                // var oContextBinding = that.oDataModel.bindContext("/Functions(ID='1',IsActiveEntity=true)");
                // oContextBinding.requestObject("description").then(function (sNote) {
                //         oContextBinding.getBoundContext().setProperty("description", "asdasdasda");


                // });
                that.getFunctionType()
                sap.ui.getCore().byId("prot.functions::FunctionsList--fe::table::Functions::LineItem::StandardAction::Create").setVisible(false);

            },
            onExit: function () {

            }


        },
        getFunctionType: function () {
            var that = this;
            var functionTypeArr = []
            var functions = that.oDataModel.bindList("/FunctionsType");
            functions.requestContexts().then(function (aContexts) {
                aContexts.forEach(function (oContext) {
                   
                    // As we have fetched the data already, we can access "Note" through getProperty
                    var type = oContext.getProperty("functiontype");
                    functionTypeArr.push(type)


                });
            });
            that.oAppModel.setProperty("/functionType", functionTypeArr);

        },

        onCreateBtnPress: function () {
            var oView = this.getView();

            // create Dialog
            if (!this._pDialog) {
                this._pDialog = Fragment.load({
                    id: oView.getId(),
                    name: "prot.functions.ext.fragment.createFragment",
                    controller: this
                }).then(function (oDialog) {
                    oDialog.attachAfterOpen(this.onDialogAfterOpen, this);
                    oView.addDependent(oDialog);
                    oDialog.setModel(this.oDataModel, "oDataModel");
                    return oDialog;
                }.bind(this));
            }
            this._pDialog.then(function (oDialog) {
                oDialog.open();
            });
        },
        onDialogAfterOpen: function () {
            this._oWizard = this.getView().byId("CreateProductWizard");
            this._iSelectedStepIndex = 0;
            this._oSelectedStep = this._oWizard.getSteps()[this._iSelectedStepIndex];

            this.handleButtonsVisibility();
        },
        handleButtonsVisibility: function () {
            var that = this;
            switch (this._iSelectedStepIndex) {
                case 0:
                    that.oAppModel.setProperty("/nextButtonVisible", true);
                    that.oAppModel.setProperty("/nextButtonEnabled", true);
                    that.oAppModel.setProperty("/backButtonVisible", false);
                    that.oAppModel.setProperty("/reviewButtonVisible", false);
                    that.oAppModel.setProperty("/finishButtonVisible", false);
                    break;
                case 1:
                    that.oAppModel.setProperty("/backButtonVisible", true);
                    that.oAppModel.setProperty("/nextButtonVisible", false);
                    that.oAppModel.setProperty("/reviewButtonVisible", true);
                    that.oAppModel.setProperty("/finishButtonVisible", false);
                    break;
                case 2:
                    that.oAppModel.setProperty("/nextButtonVisible", false);
                    that.oAppModel.setProperty("/finishButtonVisible", true);
                    that.oAppModel.setProperty("/backButtonVisible", false);
                    that.oAppModel.setProperty("/reviewButtonVisible", false);
                    break;

                default: break;
            }

        },
        editStepOne: function () {
            this._iSelectedStepIndex = 0
            this._handleNavigationToStep(0);

        },
        editStepTwo: function () {
            this._iSelectedStepIndex = 1
            this._handleNavigationToStep(1);

        },

        handleWizardCancel: function () {
            this._handleMessageBoxOpen("Are you sure you want to cancel your report?", "warning");
        },
        _handleMessageBoxOpen: function (sMessage, sMessageBoxType) {
            MessageBox[sMessageBoxType](sMessage, {
                actions: [MessageBox.Action.YES, MessageBox.Action.NO],
                onClose: function (oAction) {
                    if (oAction === MessageBox.Action.YES) {
                        //this._oWizard.discardProgress(this._oWizard.getSteps()[0]);
                        this.getView().byId("wizardDialog").close();
                        //sap.ui.getCore().byId("prot.functions::FunctionsList--wizardDialog").close();
                        //this.getView().getModel().setData(Object.assign({}, oData));
                    }
                }.bind(this)
            });
        },
        handleNavigationChange: function (oEvent) {
            this._oSelectedStep = oEvent.getParameter("step");
            this._iSelectedStepIndex = this._oWizard.getSteps().indexOf(this._oSelectedStep);
            this.handleButtonsVisibility();
        },
        _handleNavigationToStep: function (iStepNumber) {
            this._pDialog.then(function (oDialog) {
                oDialog.open();
                this._oWizard.goToStep(this._oWizard.getSteps()[iStepNumber], true);
            }.bind(this));
            this.handleButtonsVisibility();
        },

        onDialogNextButton: function () {
            this._iSelectedStepIndex = this._oWizard.getSteps().indexOf(this._oSelectedStep);
            var oNextStep = this._oWizard.getSteps()[this._iSelectedStepIndex + 1];

            if (this._oSelectedStep && !this._oSelectedStep.bLast) {
                this._oWizard.goToStep(oNextStep, true);
            } else {
                this._oWizard.nextStep();
            }

            this._iSelectedStepIndex++;
            this._oSelectedStep = oNextStep;

            this.handleButtonsVisibility();
        },
        handleWizardSubmit: function (oEvent) {
            var that = this;
            var oContext = that.oDataModel.bindList("/Functions");
                oContext.create({
                    "type": that.oAppModel.getProperty("/type"),
                    "description":that.oAppModel.getProperty("/description") ,
                    "documentation": "Test File"
                });
               
              
                
                oContext.attachCreateCompleted(function () {
                    that.oDataModel.refresh();
                    
                })
                
                 
                this._pDialog.then(function (oDialog) {
                    oDialog.close();
                }.bind(this));
               
                
                
               
           
        },
        onChooseType: function (oEvent) {
         this.oAppModel.setProperty("/type", oEvent.getSource().getSelectedKey()); 
        },
        onDialogBackButton: function () {
            this._iSelectedStepIndex = this._oWizard.getSteps().indexOf(this._oSelectedStep);
            var oPreviousStep = this._oWizard.getSteps()[this._iSelectedStepIndex - 1];

            if (this._oSelectedStep) {
                this._oWizard.goToStep(oPreviousStep, true);
            } else {
                this._oWizard.previousStep();
            }

            this._iSelectedStepIndex--;
            this._oSelectedStep = oPreviousStep;

            this.handleButtonsVisibility();
        },
    });
});