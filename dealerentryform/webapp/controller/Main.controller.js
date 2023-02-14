sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageToast",
  ],
  function (
    Controller,
    JSONModel,
    Fragment,
    Filter,
    FilterOperator,
    MessageToast
  ) {
    "use strict";

    return Controller.extend("vol1.dealerentryform.controller.Main", {
      _aProducts: [
        { ProductCode: "001", ProductName: "Product 1" },
        { ProductCode: "002", ProductName: "Product 2" },
        { ProductCode: "003", ProductName: "Product 3" },
      ],
      _Rc: [
        { RC_Code: "001", RCName: "RC01" },
        { RC_Code: "002", RCName: "RC02" },
      ],

      onInit: function () {
        var oMainModel = this.getOwnerComponent().getModel("main");
        oMainModel.setProperty("/Products", this._aProducts);
      },

      onValueHelpRequest: function (oEvent) {
        var sInputValue = oEvent.getSource().getValue(),
          oView = this.getView();

        if (!this._pValueHelpDialog) {
          console.log(!this._pValueHelpDialog);
          this._pValueHelpDialog = Fragment.load({
            id: oView.getId(),
            name: "vol1.dealerentryform.fragments.ValueHelpDialog",
            controller: this,
          }).then(function (oDialog) {
            oView.addDependent(oDialog);
            return oDialog;
          });
        }
        var _this = this;
        this._pValueHelpDialog.then(function (oDialog) {
          // Create a filter for the binding
          oDialog
            .getBinding("items")
            .filter([
              new Filter("ProductName", FilterOperator.Contains, sInputValue),
            ]);
          // Open ValueHelpDialog filtered by the input's value
          oDialog.setModel("main", _this.getView().getModel("main"));
          oDialog.setModel("i18n", _this.getView().getModel("i18n"));
          oDialog.open(sInputValue);
        });
      },

      onValueHelpSearch: function (oEvent) {
        var sValue = oEvent.getParameter("value");
        var oFilter = new Filter("Name", FilterOperator.Contains, sValue);

        oEvent.getSource().getBinding("items").filter([oFilter]);
      },

      onValueHelpClose: function (oEvent) {
        var oSelectedItem = oEvent.getParameter("selectedItem");
        oEvent.getSource().getBinding("items").filter([]);

        if (!oSelectedItem) {
          return;
        }
        var oMainModel = this.getView().getModel("main");
        oMainModel.setProperty("/DealerCode", oSelectedItem.getTitle());
      },
      onButtonPress: function (oEvent) {
        var oMainModel = this.getView().getModel("main");
        var sDealerCode = oMainModel.getProperty("/DealerCode");
        if (sDealerCode) {
          sap.m.MessageToast.show(
            "Dealer Code" + sDealerCode + "Has Been Sent"
          );
        }
      },
    });
  }
);
