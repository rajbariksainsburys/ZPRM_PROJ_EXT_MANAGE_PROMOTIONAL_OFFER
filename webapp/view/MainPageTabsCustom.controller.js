sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"retail/pmr/promotionaloffers/utils/Models",
	"retail/pmr/promotionaloffers/utils/Utils",
	"retail/pmr/promotionaloffers/utils/OfferOperations",
	"retail/pmr/promotionaloffers/utils/Formatter",
	"sap/ui/model/json/JSONModel",
	"retail/pmr/promotionaloffers/view/CommunicationProcessor",
	"retail/pmr/promotionaloffers/view/CommunicationProcessorWrapper",
	"retail/pmr/promotionaloffers/view/CommunicationServices",
	"sap/ui/core/routing/History",
	"retail/pmr/promotionaloffers/utils/ForecastDialog",
	"sap/ui/util/Storage"
], function (C, M, U, O, F, J, a, W, b, H, c, S) {
	"use strict";
	var E = U.getErrorHandler().createMessagePopover();
	var p, d, f;
	var g = false;
	var h = function () {
		var e = false;
		return {
			changes: e
		};
	}();

	function k(e) {
		this.getOfferData = function () {
			if (!e) {
				return {};
			}
			var i = e.generalController.getOfferData();
			var v = e.vendorFundsController.getOfferData();
			var t = e.termsController.getOfferData();
			var j = e.attributesController.getOfferData();
			var r = e.versionsController.getOfferData();
			var u = {};
			jQuery.extend(u, i, t, v, j, r);
			u = e.cleanPaylodForSave(u);
			u.Financials = [{
				Id: ""
			}];
			if (e.extHookOngetOfferData) {
				u = e.extHookOngetOfferData(u);
			}
			return u;
		};
		this.getOfferWithFinancials = function () {
			if (!e) {
				return {};
			}
			var i = {};
			var j = this.getOfferData();
			var r = e.termsController.getFinancials();
			var t = e.termsController.getTermsProductsFinancials();
			jQuery.extend(i, j, {
				Financials: r
			}, t);
			return i;
		};
	}

	function s(e, i) {
		if (i && e) {
			return false;
		}
		return true;
	}

	function l(e) {
		var i = U.getErrorHandler();
		if (i.numOfErrors() > 0) {
			i.showError(e);
		}
	}

	function m(e) {
		var i = e.loader;
		var j = i.getOfferData();
		e.controller.isForSave = true;
		e.controller.removeFinancial = true;
		e.state = "Warning";
		e.controller.isForSave = false;
		var r = i.hasChanges();
		if (h.changes) {
			r = true;
		}
		if (j && s(r, !j.Readonly)) {
			return Promise.resolve();
		}

		function t(v) {
			v();
		}

		function u(v, w) {
			e.controller.cleanIdsFromTerms = true;
			w();
		}
		return U.createDialogUtil(jQuery.extend(e, {
			onOk: t,
			onCancel: u
		}));
	}

	function n(e) {
		function i(r) {
			r();
		}

		function j(r, t) {
			t();
		}
		return U.createDialogUtil(jQuery.extend(e, {
			onOk: i,
			onCancel: j
		}));
	}

	function o(v, i) {
		return v.byId(i).getController();
	}
	var q = sap.ui.controller("customer.zprmprojextmanagepromotionaloffer.view.MainPageTabsCustom", {
		//    extHookOndataLoaded: null,
		//    extHookOngetOfferData: null,
		//    extHookOnvalidate: null,
		//    constructor: function () {
		//        this.dataModel = new J();
		//        this.featuresAvailable = new J();
		//        this.contentModel = new J({ CollisionEnabled: false });
		//    },
		//    routeMatched: function (e) {
		//        if (!this.state) {
		//            return;
		//        }
		//        var i = H.getInstance();
		//        var j = i.aHistory[i.aHistory.length - 1];
		//        this.getEventBus().unsubscribe("retail.pmr.promotionaloffers", "onMasterDataSystemChange", this.masterDataSystemChange, this);
		//        this.pathName = e.getParameter("name");
		//        if (this.pathName === "manage") {
		//            g = false;
		//        }
		//        M.setMainPageTabsCurrentNavState(this.pathName);
		//        this.state.validate();
		//        this.cleanIdsFromTerms = false;
		//        if ([
		//                "create",
		//                "edit",
		//                "copy",
		//                "vendorFundsCreate",
		//                "display"
		//            ].indexOf(this.pathName) === -1) {
		//            return;
		//        }
		//        if (j.indexOf("productGroup") !== -1) {
		//            this.generalController.validateForm();
		//            this.termsController.validateForm();
		//            this.attributesController.validateForm();
		//            return;
		//        }
		//        if (j.indexOf("locationGroups") !== -1) {
		//            this.isBackFromLocationGroups = true;
		//        }
		//        this.isBackFromVersions = false;
		//        if (this.pathName === "create" || this.pathName === "vendorFundsCreate") {
		//            this.resetViewsContent();
		//            this.state.invalidate();
		//            this.getEventBus().subscribe("retail.pmr.promotionaloffers", "onMasterDataSystemChange", this.masterDataSystemChange, this);
		//            var r = this.getView().byId("ObjectPageLayout");
		//            var t = r.getSections()[0];
		//            this.getView().byId("ObjectPageLayout").scrollToSection(t.getId());
		//        } else {
		//        }
		//        if ([
		//                "create",
		//                "edit",
		//                "copy",
		//                "vendorFundsCreate"
		//            ].indexOf(this.pathName) === -1) {
		//            this.toggleCollisionBtnListener(false);
		//        } else {
		//            this.toggleCollisionBtnListener(true);
		//        }
		//        var u = i.getPreviousHash() || "";
		//        if (this.pathName === "edit" && u === "create") {
		//            u = "";
		//        }
		//        var v = false;
		//        if (this.pathName === "display" || this.pathName === "edit" || this.pathName === "create" || this.pathName === "vendorFundsCreate" || this.pathName === "copy" || this.pathName === "locationGroups") {
		//            v = true;
		//        }
		//        if (u.indexOf("version") < 0 && u.indexOf("locationGroups") < 0) {
		//            if (this.pathName === "edit" || this.pathName === "copy" || this.pathName === "display") {
		//                this.state.invalidate();
		//            }
		//        } else {
		//            v = u.indexOf("locationGroups") >= 0;
		//            this.isBackFromVersions = true;
		//            if (!v && this.pathName === "display") {
		//                this.state.invalidate();
		//            }
		//        }
		//        var w = u.indexOf("create") > -1 || u.indexOf("copy") > -1;
		//        if (w && this.pathName === "edit") {
		//            this.state.storeValid();
		//            this.state.validate();
		//        }
		//        this.startLoading(this.state, v);
		//        this.state.restoreValid();
		//    },
		//    toggleCollisionBtnListener: function (e) {
		//        if (e) {
		//            if (!this.toggleCollisionBtnListenerOn) {
		//                this.getEventBus().subscribe("retail.pmr.promotionaloffers", "toggleCollisionBtn", this.toggleCollisionBtn, this);
		//                this.toggleCollisionBtnListenerOn = true;
		//            }
		//        } else {
		//            this.getEventBus().unsubscribe("retail.pmr.promotionaloffers", "toggleCollisionBtn", this.toggleCollisionBtn, this);
		//            this.toggleCollisionBtnListenerOn = false;
		//        }
		//    },
		//    onInit: function () {
		//        this.generalController = o(this, "generalView");
		//        this.termsController = o(this, "termsView");
		//        this.vendorFundsController = o(this, "vendorFundsView");
		//        this.attributesController = o(this, "attributesView");
		//        this.versionsController = o(this, "versionsView");
		//        var t = this;
		//        this.versionsController.setSaveCallback(function () {
		//            U.manageVersionsSaveDialog(t.getView()).then(function () {
		//                t.onSave(null, true).then(function (e) {
		//                    if (e) {
		//                        t.getEventBus().publish("retail.pmr.promotionaloffers", "launchVersionPage", { oData: t.state.getOfferData() });
		//                    }
		//                });
		//            }, jQuery.noop);
		//        });
		//        this.termsController.setGeneralDataModel({
		//            getDataModel: function () {
		//                return this.generalController.dataModel;
		//            }.bind(this)
		//        });
		//        this.oMessageManager = U.getMessageManager();
		//        E.setModel(this.oMessageManager.getMessageModel());
		//        this.getView().setModel(this.dataModel);
		//        this.getView().setModel(this.featuresAvailable, "featuresAvailable");
		//        this.getView().setModel(this.contentModel, "Content");
		//        this.getEventBus().subscribe("retail.pmr.promotionaloffers", "validateOfferForVersion", this.validateOfferForVersion, this);
		//        this.getEventBus().subscribe("retail.pmr.promotionaloffers", "resetTermsTab", this.resetTermsTab, this);
		//        this.getEventBus().subscribe("retail.pmr.promotionaloffers", "setLocationSelection", this.setLocationSelection, this);
		//        this.getEventBus().subscribe("retail.pmr.promotionaloffers", "onVersionDataChange", this.versionDataChange, this);
		//        this.getEventBus().subscribe("retail.pmr.promotionaloffers", "onDateChangeforProdGroup", this.promptProdGroupChange, this);
		//        this.getEventBus().subscribe("retail.pmr.promotionaloffers", "validateVersions", this.changeFlagValue, this);
		//        this.getEventBus().subscribe("retail.pmr.promotionaloffers", "onLocationChangeForProductSearch", this.promptLocChange, this);
		//        this.state = this.getOwnerComponent().getState();
		//        this.toggleCollisionBtnListenerOn = false;
		//        this.getRouter().attachRouteMatched(this.routeMatched, this);
		//        U.addMasterdataSystemButton(this.getEventBus());
		//        this.aFinHeaderFields = [
		//            "marginField",
		//            "unitField",
		//            "salesField",
		//            "profitField",
		//            "fundField",
		//            "forecastField"
		//        ].map(function (x) {
		//            return this.getView().byId(x);
		//        }, this);
		//        this.aForecastHeaderFields = ["forecastField"].map(function (x) {
		//            return this.getView().byId(x);
		//        }, this);
		//        this.offerOperations = new O(this.state);
		//    },
		//    resetTermsTab: function () {
		//        this.termsController.resetOfferData();
		//        var e = this.termsController.getSelectedTermStyle();
		//        var i = this.generalController.isPackageOffer();
		//        this.versionsController.resetTermsTab(e, i);
		//    },
		//    onExit: function () {
		//        this.getEventBus().unsubscribe("retail.pmr.promotionaloffers", "onMasterDataSystemChange", this.masterDataSystemChange, this);
		//        this.toggleCollisionBtnListener(false);
		//        this.getEventBus().unsubscribe("retail.pmr.promotionaloffers", "validateOfferForVersion", this.validateOfferForVersion, this);
		//        this.getEventBus().unsubscribe("retail.pmr.promotionaloffers", "resetTermsTab", this.resetTermsTab, this);
		//        this.getEventBus().unsubscribe("retail.pmr.promotionaloffers", "setLocationSelection", this.setLocationSelection, this);
		//        this.getEventBus().unsubscribe("retail.pmr.promotionaloffers", "onVersionDataChange", this.versionDataChange, this);
		//        this.getEventBus().unsubscribe("retail.pmr.promotionaloffers", "onDateChangeforProdGroup", this.promptProdGroupChange, this);
		//        this.getEventBus().unsubscribe("retail.pmr.promotionaloffers", "validateVersions", this.changeFlagValue, this);
		//        this.getEventBus().unsubscribe("retail.pmr.promotionaloffers", "onLocationChangeForProductSearch", this.promptLocChange, this);
		//    },
		//    cleanPaylodForSave: function (e) {
		//        var j = jQuery.extend(true, {}, e);
		//        if (!this.isForSave) {
		//            return j;
		//        }
		//        if (j.Versions) {
		//            for (var i = 0; i < j.Versions.length; i++) {
		//                var v = j.Versions[i];
		//                delete v.LocalNodes;
		//                delete v.locationPath;
		//                if (this.removeFinancial) {
		//                    U.cleanFinancialsForVersion(v);
		//                } else {
		//                    U.cleanFinancialsForVersion(v, true);
		//                }
		//            }
		//        }
		//        if (this.removeFinancial) {
		//            U.cleanFinancialsForVersion(j);
		//            delete j.PurchasingGroupName;
		//        } else {
		//            U.cleanFinancialsForVersion(j, true);
		//        }
		//        this.removeFinancial = false;
		//        if (this.cleanIdsFromTerms) {
		//            this.removeAfterFinancialCalc(j);
		//            this.cleanIdsFromTerms = false;
		//        }
		//        if (!j.PackageOffer) {
		//            delete j.PackageValue;
		//        }
		//        this.storeLocationHierarchy = j.LocationHierarchy;
		//        j.LocationHierarchy = [{ Locations: [{}] }];
		//        this.isForSave = false;
		//        return j;
		//    },
		//    showForecast: function (e) {
		//        var i = this.getView().getModel().getProperty("/OfferId");
		//        var K = { OfferId: i };
		//        c.show(c.Level.Offer, K, M.getServiceModel(), U.getResourceModel(), i);
		//    },
		//    openCancelDialog: function (e) {
		//        var i = {
		//            loader: this.state,
		//            controller: this,
		//            view: this.getView(),
		//            title: "{i18n>CreateOffer.OfferCancelDialogTitle}",
		//            message: "{i18n>CreateOffer.OfferCancelDialogDescription}",
		//            btnOk: "{i18n>CreateOffer.CreateOfferDialog.Accept}",
		//            btnCancel: "{i18n>CreateOffer.CreateOfferDialog.Reject}"
		//        };
		//        var t = this;
		//        t.bCancelButtonClick = e;
		//        return m(i, this.getView().getModel("i18n").getResourceBundle()).then(function () {
		//            var j = H.getInstance().getPreviousHash();
		//            if (j) {
		//                window.history.go(-1);
		//            } else {
		//                if (t.bCancelButtonClick && t.state.offerData.OfferId) {
		//                    t.getRouter().navTo("display", { path: U.base64ToHex(t.state.offerData.OfferId) }, true);
		//                } else {
		//                    t.getRouter().navTo("manage", true);
		//                }
		//            }
		//            t.oMessageManager.removeAllMessages();
		//            t.state.storeLocationSubgroups([]);
		//            h.changes = false;
		//        }, U.identity);
		//    },
		//    onCollisionDetection: function () {
		//        var e = jQuery.extend(true, {}, this.state.getSavePayload());
		//        this.isForSave = true;
		//        this.removeFinancial = true;
		//        e = this.cleanPaylodForSave(e);
		//        this.oMessageManager.removeAllMessages();
		//        U.getErrorHandler().showBusy();
		//        var v = this.getView();
		//        var i = this.getView().getModel("i18n").getResourceBundle().getText("CreateOffer.ErrorMessage.Collision");
		//        this.offerOperations.detectCollision(this.featuresAvailable.getData()).then(function (j) {
		//            this.offerOperations.populateCollisionDetection(j, e, v).then(function () {
		//                U.getErrorHandler().hideBusy();
		//                l(i);
		//                this.contentModel.setProperty("/CollisionEnabled", true);
		//            }.bind(this));
		//        }.bind(this));
		//    },
		//    onOfferContent: function () {
		//        var i = this.state.getOfferData().OfferId;
		//        U.toOfferContent(i, this.getOwnerComponent().getMetadata().getConfig());
		//    },
		//    validateProjOfBuyTermsExceedTargetGroup: function (T, e, w) {
		//        if (T !== null && e !== null) {
		//            if (T.results.length !== 0 && T.results.length !== 0) {
		//                var r = [{
		//                        message: w,
		//                        description: "",
		//                        type: "Warning",
		//                        target: "/ProjOfBuyTermsExceedTargetGroup",
		//                        processor: this.dataModel
		//                    }];
		//                var t = 0;
		//                for (var i = 0; i < T.results.length; i++) {
		//                    var u = T.results[i].Members;
		//                    var v = T.results[i].RedeemPercent;
		//                    var P = Math.round(v / 100 * u);
		//                    t = parseInt(t) + parseInt(P);
		//                }
		//                var x = parseInt(e.results[0].UserProjection) * parseInt(e.results[0].Quantity);
		//                for (var j = 1; j < e.results.length; j++) {
		//                    if (e.results[j].Operation === "1") {
		//                        x = parseInt(x) + parseInt(e.results[j].UserProjection) * parseInt(e.results[j].Quantity);
		//                    } else if (e.results[j].Operation === "2") {
		//                        if (parseInt(e.results[j].UserProjection) * parseInt(e.results[j].Quantity) > x) {
		//                            x = parseInt(e.results[j].UserProjection) * parseInt(e.results[j].Quantity);
		//                        }
		//                    }
		//                }
		//                if (t < x) {
		//                    U.setErrorMessages(this.oMessageManager, r);
		//                }
		//            }
		//        }
		//    },
		//    forecastDisable: function () {
		//        U.removeMessagesByPath("/DisableForecast");
		//        var w = this.getView().getModel("i18n").getResourceBundle().getText("CreateOffer.ForecastWithTargetGroupWarning");
		//        var e = this.getView().getModel("ActionsAllowed").getData().ActionAllowed;
		//        var i = [{
		//                message: w,
		//                description: "",
		//                type: "Warning",
		//                target: "/DisableForecast",
		//                processor: this.dataModel
		//            }];
		//        if (this.dataModel.getProperty("/TargetGroups").length === 0 && e === true) {
		//            this.getView().byId("forecastButton").setEnabled(true);
		//        } else {
		//            this.getView().byId("forecastButton").setEnabled(false);
		//            U.setErrorMessages(this.oMessageManager, i);
		//        }
		//    },
		//    promptLocChange: function (e, j, r) {
		//        var t = false;
		//        var u = r.aTerms.length;
		//        var v = this.getView().getModel().getData().ExtLocationNodeId;
		//        if (r.aTerms && u > 0 && f !== v) {
		//            for (var i = 0; i < u; i++) {
		//                if (r.aTerms[i].DimensionType === "01") {
		//                    t = true;
		//                    break;
		//                }
		//            }
		//            if (t) {
		//                var w = "/ProductGroup/Messages";
		//                U.removeMessagesByPath(w);
		//                var x = [{
		//                        message: r.msg,
		//                        description: "",
		//                        type: "Warning",
		//                        target: w
		//                    }];
		//                U.setErrorMessages(r.oMessageManager, x);
		//            }
		//        }
		//        f = v;
		//    },
		//    promptProdGroupChange: function (e, j, r) {
		//        if (U.getSchemaVersion() < 9) {
		//            return;
		//        }
		//        g = false;
		//        if (r.aTerms && r.aTerms.length > 0 && (p !== r.updatedStartDate || d !== r.updatedEndDate)) {
		//            var t = false;
		//            var u = r.aTerms.length;
		//            for (var i = 0; i < u; i++) {
		//                if (r.aTerms[i].DimensionType === "02") {
		//                    t = true;
		//                    break;
		//                }
		//            }
		//            if (t) {
		//                var v = "/ProductGroup/Messages";
		//                U.removeMessagesByPath(v);
		//                var w = [{
		//                        message: r.msg,
		//                        description: "",
		//                        type: "Warning",
		//                        target: v
		//                    }];
		//                U.setErrorMessages(r.oMessageManager, w);
		//            }
		//        }
		//        p = r.updatedStartDate;
		//        d = r.updatedEndDate;
		//    },
		//    changeFlagValue: function (e, i, j) {
		//        g = true;
		//    },
		//    onSave: function (i, u) {
		//        var j = true;
		//        if (!this.verifyValidation("{i18n>CreateOffer.SaveOffer.Title}", j)) {
		//            return;
		//        }
		//        this.oMessageManager.removeAllMessages();
		//        this.isForSave = true;
		//        this.removeFinancial = true;
		//        M.setRefreshCalendar(true);
		//        var B = this.getView().getModel("i18n").getResourceBundle();
		//        var t = this;
		//        return this.state.save().then(function (r) {
		//            U.getErrorHandler().showToast(B.getText("CreateOffer.ToastMessage.SaveCompleted"));
		//            var e = {
		//                updatedStartDate: t.getView().getModel().getData().StartOfOffer.getTime(),
		//                updatedEndDate: t.getView().getModel().getData().EndOfOffer.getTime(),
		//                aTerms: t.getView().getModel().getData().Terms,
		//                msg: t.getView().getModel("i18n").getResourceBundle().getText("CreateOffer.ProdGroup.ReloadMsg"),
		//                oMessageManager: t.oMessageManager
		//            };
		//            t.getEventBus().publish("retail.pmr.promotionaloffers", "onDateChangeforProdGroup", e);
		//            var v = {
		//                aTerms: t.getView().getModel().getData().Terms,
		//                msg: t.getView().getModel("i18n").getResourceBundle().getText("CreateOffer.LocationChange.ReloadMsg"),
		//                oMessageManager: t.oMessageManager
		//            };
		//            t.getEventBus().publish("retail.pmr.promotionaloffers", "onLocationChangeForProductSearch", v);
		//            var w = false;
		//            var e = r.data;
		//            var x = B.getText("CreateOffer.General.TargetGroup.ProjOfBuyTermsExceedTargetGroup");
		//            h.changes = false;
		//            t.validateProjOfBuyTermsExceedTargetGroup(r.data.TargetGroups, r.data.Terms, x);
		//            t.forecastDisable();
		//            if (!u) {
		//                t.startLoading(t.state, true).then(function () {
		//                    t.isForSave = false;
		//                    t.state.processor.storeSnapshot(t.state.processor.createSavePayload());
		//                });
		//            } else {
		//                t.dataRoute = e;
		//            }
		//            if (U.isReadOnly({
		//                    Status: e.Status,
		//                    UIState: e.UIState
		//                })) {
		//                t.getRouter().navTo("display", { path: U.base64ToHex(r.data.OfferId) }, true);
		//                w = true;
		//            } else if (!t.dataModel.getProperty("/ExtOfferId")) {
		//                t.state.storeBack(true);
		//                U.navToEditOffer(t.getRouter(), t.state.getOfferData(), true);
		//                w = true;
		//            }
		//            return {
		//                data: e,
		//                navigate: w
		//            };
		//        }, function (e) {
		//            if (e.responseText.indexOf("Marketing area ID") >= 0) {
		//                t.generalController.resetMarketingArea();
		//            }
		//            U.getErrorHandler().showError(B.getText("CreateOffer.ErrorMessage.Save"));
		//        }).then(null, function (e) {
		//            jQuery.sap.log.error(e);
		//        });
		//    },
		//    verifyValidation: function (t, i) {
		//        var e = [];
		//        var j = this.getView().getModel("i18n").getResourceBundle();
		//        if (this.generalController.validateForm()) {
		//            e.push(j.getText("CreateOffer.Properties.Title"));
		//        }
		//        if (this.termsController.validateForm()) {
		//            e.push(j.getText("CreateOffer.Terms.Title"));
		//        }
		//        if (this.attributesController.validateForm()) {
		//            e.push(j.getText("CreateOffer.Attributes.Title"));
		//        }
		//        if (this.extHookOnvalidate) {
		//            e = e.concat(this.extHookOnvalidate());
		//        }
		//        var r = i ? U.getMessageManager().getMessageModel().getData().filter(function (v) {
		//            return v.getType() === "Error" && !v.persistent;
		//        }) : [];
		//        if (e.length || r.length > 0) {
		//            var u = e.length ? j.getText("CreateOffer.SaveOffer.Validate", e.join(", ")) : j.getText("Offer.Save.UserAction.Needed");
		//            U.getErrorHandler().showError(u);
		//            return false;
		//        }
		//        return true;
		//    },
		//    onCancel: function () {
		//        this.state.storeBack(true);
		//        this.openCancelDialog(true).then(function () {
		//            this.state.storeBack(false);
		//        }.bind(this));
		//    },
		//    onNavButtonPress: function () {
		//        this.openCancelDialog(false);
		//    },
		//    onMessagesIndicatorPress: function (e) {
		//        E.openBy(e.getSource());
		//    },
		//    dialogOptions: function (e) {
		//        return {
		//            view: this.getView(),
		//            loader: e,
		//            title: "{i18n>EditOffer.EditOfferDialog.Title}",
		//            message: "{i18n>EditOffer.EditOfferDialog.Message}",
		//            btnOk: "{i18n>CreateOffer.CreateOfferDialog.Accept}",
		//            btnCancel: "{i18n>CreateOffer.CreateOfferDialog.Reject}"
		//        };
		//    },
		//    masterDataSystemChange: function (e, j, r) {
		//        var t = this;
		//        var u = r.MasterdataSystemId;
		//        var v = this.dataModel.getProperty("/MasterdataSystem");
		//        var w = function w() {
		//            var i, L;
		//            var y = t.state.getSavePayload();
		//            var z = [
		//                "LocationNodeId",
		//                "PromotionType",
		//                "LeadingCategory",
		//                "PurchasingGroup"
		//            ];
		//            for (i = 0, L = z.length; i < L; i++) {
		//                if (y.hasOwnProperty(z[i])) {
		//                    return true;
		//                }
		//            }
		//            var A = y.Terms;
		//            for (i = 0, L = A.length; i < L; i++) {
		//                if (A[i].ProductId) {
		//                    return true;
		//                }
		//            }
		//            return false;
		//        };
		//        var x = function x() {
		//            return U.promptUserForMasterDataSystemChange(u, v, t.getView().getModel("i18n"));
		//        };
		//        if (w()) {
		//            return x().then(function () {
		//                t.generalController.setSystem(u);
		//                M.setMasterDataSystemPersonalization(u);
		//                t.state.offerData.MasterdataSystem = u;
		//            }, function () {
		//                t.generalController.resetSystem(v);
		//            });
		//        } else {
		//            setTimeout(function () {
		//                t.generalController.setSystem(u);
		//                M.setMasterDataSystemPersonalization(u);
		//                t.state.offerData.MasterdataSystem = u;
		//            });
		//        }
		//    },
		//    toggleCollisionBtn: function () {
		//        var G = this.generalController.getOfferData();
		//        var t = this.termsController.getOfferData();
		//        var e = [
		//            "LocationNodeId",
		//            "StartOfOffer",
		//            "EndOfOffer"
		//        ].every(function (P) {
		//            return !!G[P];
		//        }) && t.Terms.some(function (i) {
		//            return i.ProductId || i.HierarchyNodeId || i.DimensionType === "20";
		//        });
		//        this.contentModel.setProperty("/CollisionEnabled", e);
		//    },
		//    versionDataChange: function (e, i, j) {
		//        this.keepSnapshot = true;
		//    },
		//    loadDataComingFromVersion: function (e) {
		//        var i = {};
		//        jQuery.extend(true, i, this.state.getOfferData(), e);
		//        i.Versions = e.Versions;
		//        i.LocalNodes = e.LocalNodes;
		//        this.isBackFromVersions = true;
		//        this.setOfferData(i, this.state);
		//    },
		//    startLoading: function (e, i) {
		//        return e.load(function () {
		//            this.state.storeBack(false);
		//            this.dataLoaded(e, i);
		//            this.toggleCollisionBtn();
		//        }.bind(this)).then(null, function (j) {
		//            jQuery.sap.log.error(j.stack);
		//            var r = this.contentModel.getProperty("/NavButtonsEnabled");
		//            this.contentModel.setProperty("/ShowFooter", r || U.errorMessagesExists());
		//        }.bind(this));
		//    },
		//    dataLoaded: function (e, i) {
		//        var j = e.getOfferData();
		//        if (this.keepSnapshot) {
		//            this.state.store(j, !!j.Readonly);
		//            this.state.store(j, { Editable: true });
		//        } else if (this.pathName === "display") {
		//            this.state.store(j, { Readonly: true });
		//        } else {
		//            this.state.store(j, { Readonly: false });
		//        }
		//        var r = e.getOfferData();
		//        r = this.cleanPaylodForSave(r);
		//        this.setOfferData(r, e, i);
		//    },
		//    onLoadingPage: function (i, e, j) {
		//        if (j) {
		//            return;
		//        }
		//        var r = U.getErrorHandler();
		//        if (i) {
		//            if (e) {
		//                var t = U.getResourceModel().getResourceBundle().getText("CreateOffer.LoadingForecast.Message");
		//                r.showBusy(t);
		//            } else {
		//                r.showBusy();
		//            }
		//        } else {
		//            if (e) {
		//                r.hideBusy();
		//            } else {
		//                jQuery.sap.delayedCall(300, this, function () {
		//                    r.hideBusy();
		//                });
		//            }
		//        }
		//    },
		//    isPrimitive: function (e) {
		//        return typeof e === "string" || typeof e === "number" || typeof e === "boolean" || typeof e === "undefined" || e === null;
		//    },
		//    replaceInitialWithNull: function (e) {
		//        var t = this;
		//        if (this.isPrimitive(e)) {
		//            return e || {};
		//        }
		//        if (e instanceof Date) {
		//            return e;
		//        }
		//        var j = {};
		//        Object.keys(e || {}).forEach(function (r) {
		//            if (r === "Name") {
		//                j[r] = e[r];
		//                return;
		//            }
		//            if (r === "EnforceMultiple") {
		//                j[r] = e[r];
		//                return;
		//            }
		//            if (U.isInitial(e[r])) {
		//                j[r] = null;
		//                return;
		//            } else if (U.isInitial(e[r])) {
		//                j[r] = null;
		//            } else if (jQuery.isArray(e[r])) {
		//                j[r] = [];
		//                for (var i = 0; i < e[r].length; i++) {
		//                    j[r][i] = t.replaceInitialWithNull(e[r][i]);
		//                }
		//            } else if (typeof e[r] === "object") {
		//                j[r] = t.replaceInitialWithNull(e[r]);
		//            } else {
		//                j[r] = e[r];
		//            }
		//        });
		//        return j;
		//    },
		//    setOfferData: function (e, j, r) {
		//        var t = [], u = [{}], v = e.ExtLocationNodeId || e.ExtHierarchyId;
		//        if (v !== S.get("currentOfferLocId")) {
		//            S.put("currentOfferLocId", v);
		//        }
		//        if (S.get(v) !== null) {
		//            var L = JSON.parse(S.get(v)).length;
		//            for (var i = 0; i < L; i++) {
		//                t[i] = JSON.parse(S.get(v))[i];
		//                t[i].Locations = t[i].Locations.results;
		//            }
		//            t = this.replaceInitialWithNull(t);
		//            for (var i = 0; i < L; i++) {
		//                u[i] = t[i];
		//            }
		//            e.LocationHierarchy = u;
		//        }
		//        if (g === false) {
		//            p = e.StartOfOffer.getTime();
		//            d = e.EndOfOffer.getTime();
		//            f = e.ExtLocationNodeId;
		//            g = true;
		//        }
		//        var w = this.state.hasChanges();
		//        this.onLoadingPage(true, false, r);
		//        var x = j.getStaticData();
		//        this.staticData = x;
		//        if (e.MasterdataSystem && x.MasterDataSystemSet.length === 0) {
		//            U.criticalError(U.getI18NModel(), "Missing Masterdata System", "Check that user can get a list of masterdata systems from backend.", "Call '/MasterdataSystems' and check it has values");
		//        }
		//        this.contentModel.setData({
		//            Editable: !e.Readonly && !U.isEditableHeader({
		//                Status: e.Status,
		//                UIState: e.UIState
		//            }),
		//            CollisionEnabled: false,
		//            NavButtonsEnabled: !e.Readonly,
		//            ShowFooter: !e.Readonly || U.errorMessagesExists()
		//        });
		//        this.dataModel.setData(e);
		//        var y = U.setupFeatures(x.FeaturesAvailable);
		//        this.featuresAvailable.setData(y);
		//        this.featuresAvailable.refresh(true);
		//        var z = this.featuresAvailable.getData();
		//        this.generalController.setOfferData(e, x, z);
		//        this.generalController.setDataProvider(j);
		//        this.termsController.setRouter(this.getRouter());
		//        this.termsController.setOfferData(e, x);
		//        this.attributesController.setOfferData(e, x);
		//        M.setLanguageSet(x.LanguageSet);
		//        this.vendorFundsController.setDataProvider(j);
		//        this.vendorFundsController.setOfferData(e, x);
		//        this.versionsController.setDataProvider(j);
		//        this.versionsController.setOfferData(e);
		//        if (this.extHookOndataLoaded) {
		//            this.extHookOndataLoaded(j, e);
		//        }
		//        this.onLoadingPage(false, false, r);
		//        var A = {
		//            Status: e.Status,
		//            UIState: e.UIState
		//        };
		//        if ((!e.Editable || U.isStatusApprovedSaved(!this.isBackFromVersions, A)) && this.pathName === "edit") {
		//            var B = "{i18n>ManageOffers.offerNotEditable}";
		//            if (U.isStatusApprovedSaved(!this.isBackFromVersions, A)) {
		//                B = "{i18n>ManageOffers.offerNotEditableIsApproved}";
		//            }
		//            var D = this;
		//            U.createDialogUtil({
		//                title: "{i18n>ManageOffers.OfferFunctionsErrorDialog.Title}",
		//                btnOk: "{i18n>Offer.OK}",
		//                message: B,
		//                state: "Error",
		//                view: this.getView(),
		//                onOk: function (G) {
		//                    G();
		//                }
		//            }).then(function () {
		//                D.getRouter().navTo("display", { path: U.base64ToHex(e.OfferId || e.RefOfferId) }, true);
		//            });
		//        }
		//        if (r && this.keepSnapshot) {
		//            this.keepSnapshot = false;
		//        }
		//        if (this.pathName === "edit") {
		//            if (this.isBackFromLocationGroups && w) {
		//                this.isBackFromLocationGroups = false;
		//            } else {
		//                this.isBackFromLocationGroups = false;
		//                this.state.createSnapshot();
		//            }
		//        }
		//        this.forecastDisable();
		//    },
		//    getIndexOfTerm: function (t, e) {
		//        var j = -1;
		//        if (e && e.length > 0) {
		//            for (var i = 0; i < e.length; i++) {
		//                if (e.TermId && e.TermId === t) {
		//                    j = i;
		//                }
		//            }
		//        }
		//        return j;
		//    },
		//    updateSnapshotTermProducts: function (e, i) {
		//        var t = this;
		//        for (var j in e) {
		//            if (j !== "Terms") {
		//                e[j] = i[j];
		//            } else if (j === "Terms") {
		//                var r = e[j];
		//                var u = i[j];
		//                if (u && r && u.length !== r.length) {
		//                    continue;
		//                }
		//                (r || []).forEach(function (v) {
		//                    var w = t.getIndexOfTerm(v.TermId, u);
		//                    if (w !== -1) {
		//                        var x = u[w];
		//                        for (var y in v) {
		//                            if (y !== "TermProducts") {
		//                                v[y] = x[y];
		//                            }
		//                        }
		//                    }
		//                });
		//            }
		//        }
		//    },
		//    removeAfterFinancialCalc: function (e) {
		//        if (e) {
		//            (e.Terms || []).forEach(function (t) {
		//                delete t.OfferId;
		//                delete t.TermId;
		//            });
		//        }
		//    },
		//    getEventBus: function () {
		//        return sap.ui.getCore().getEventBus();
		//    },
		//    getRouter: function () {
		//        return sap.ui.core.UIComponent.getRouterFor(this);
		//    },
		//    resetViewsContent: function () {
		//        this.generalController.resetOfferData();
		//        this.vendorFundsController.resetView();
		//        this.versionsController.resetData();
		//        this.attributesController.resetAttributes();
		//        this.featuresAvailable.setData({});
		//        this.storeLocationHierarchy = null;
		//    },
		//    setServiceErrors: function (e) {
		//        var N = e.filter(function (i) {
		//            if (i.type === "Info") {
		//                i.type = "Information";
		//            }
		//            return !i.target;
		//        });
		//        var G = e.filter(function (i) {
		//            return i.target && i.target.indexOf("OfferTerm") === -1 && i.target.indexOf("Attributes") === -1;
		//        });
		//        var t = e.filter(function (i) {
		//            return i.target && i.target.indexOf("OfferTerm") >= 0;
		//        });
		//        var A = e.filter(function (i) {
		//            return i.target && i.target.indexOf("Attributes") >= 0;
		//        });
		//        this.generalController.processServerErrors(G);
		//        this.termsController.processServerErrors(t);
		//        this.attributesController.processServerErrors(A);
		//        this.setErrorMessages(N);
		//        this.oMessageManager.getMessageModel().refresh();
		//    },
		//    setErrorMessages: function (e) {
		//        var i = new J();
		//        var j = e.map(function (I) {
		//            I.processor = i;
		//            if (I.type === "Info") {
		//                I.type = "Information";
		//            }
		//            return new sap.ui.core.message.Message(I);
		//        });
		//        this.oMessageManager.addMessages(j);
		//    },
		//    handleCalcFinancialsPress: function () {
		//        h.changes = this.state.hasChanges();
		//        if (!this.verifyValidation("{i18n>CreateOffer.SaveOffer.Title}", false)) {
		//            return;
		//        }
		//        var e = this.getView().getModel("i18n").getResourceBundle().getText("CreateOffer.ErrorMessage.Calculate");
		//        var i = jQuery.extend(true, {}, this.state.getSavePayload());
		//        this.isForSave = true;
		//        this.removeFinancial = true;
		//        i = this.cleanPaylodForSave(i);
		//        this.oMessageManager.removeAllMessages();
		//        this.offerOperations.calculateFinancials(this.aFinHeaderFields, i).then(function (r) {
		//            l(e);
		//            if (r) {
		//                if (!this.dataModel.getProperty("/ExtOfferId")) {
		//                    r.OfferId = "";
		//                }
		//                r.ChangedOn = this.dataModel.getProperty("/ChangedOn");
		//                this.dataModel.setData(this.restoreLocationAfterForecast(r));
		//                (r.Versions || []).forEach(function (v) {
		//                    if (!v.ExtOfferId) {
		//                        v.OfferId = "";
		//                    }
		//                });
		//                this.setOfferData(r, this.state);
		//            }
		//        }.bind(this));
		//    },
		//    onForecastPress: function () {
		//        var B = this.getView().getModel("i18n").getResourceBundle();
		//        var i = {
		//            loader: this.state,
		//            view: this.getView(),
		//            title: "{i18n>CreateOffer.ForecastTitle}",
		//            message: "{i18n>CreateOffer.OfferForecastDialogDescription}",
		//            state: "Warning",
		//            btnOk: "{i18n>CreateOffer.CreateOfferDialog.Accept}",
		//            btnCancel: "{i18n>CreateOffer.CreateOfferDialog.Reject}"
		//        };
		//        var j = function (e) {
		//            this.onLoadingPage(false);
		//            this.offerOperations.setHeaderFieldsBusyState(false, this.aForecastHeaderFields);
		//            U.identity(e);
		//        }.bind(this);
		//        n(i).then(function () {
		//            var e = true;
		//            if (!this.verifyValidation("{i18n>CreateOffer.SaveOffer.Title}", e)) {
		//                return;
		//            }
		//            this.isForSave = true;
		//            this.removeFinancial = true;
		//            this.oMessageManager.removeAllMessages();
		//            this.onLoadingPage(true, true);
		//            this.offerOperations.getForecast(this.aForecastHeaderFields).then(function (r) {
		//                l(B.getText("CreateOffer.ErrorMessage.Forecast"));
		//                if (r) {
		//                    this.state.store(this.restoreLocationAfterForecast(r));
		//                    this.state.storeBack(true);
		//                    this.startLoading(this.state, true);
		//                    if (!this.dataModel.getProperty("/ExtOfferId") || this.pathName !== "edit") {
		//                        this.state.storeBack(true);
		//                        U.navToEditOffer(this.getRouter(), this.state.getOfferData(), true);
		//                    }
		//                }
		//                this.onLoadingPage(false, true);
		//            }.bind(this));
		//        }.bind(this), j);
		//    },
		//    setLocationSelection: function (e, i, j) {
		//        if (j.hierarchy) {
		//            this.selectedLocationHierarchy = U.buildLocationHierarchyFromVH(j.hierarchy);
		//        }
		//    },
		//    restoreLocationAfterForecast: function (r) {
		//        if (!r.LocationHierarchy || r.LocationHierarchy && r.LocationHierarchy.length < 1 || r.LocationHierarchy && r.LocationHierarchy.length > 0 && !r.LocationHierarchy[0].Cardinality && r.LocationHierarchy[0].Locations && r.LocationHierarchy[0].Locations.length < 1) {
		//            var e = this.selectedLocationHierarchy;
		//            if (this.storeLocationHierarchy && this.storeLocationHierarchy.length > 0 && this.storeLocationHierarchy[0].Cardinality) {
		//                e = this.storeLocationHierarchy;
		//            }
		//            r.LocationHierarchy = e;
		//        }
		//        return r;
		//    },
		//    onOfferFunctionPress: function (e) {
		//        this.oMessageManager.removeAllMessages();
		//        var A = e.getSource().data("area");
		//        var i = this.state.getOfferData();
		//        if (!this.oSelectDialog) {
		//            this.oSelectDialog = sap.ui.xmlfragment("retail.pmr.promotionaloffers.fragments.OfferFunctionsDialog", this);
		//            this.oSelectDialog.setModel(new J());
		//            this.oSelectDialog.setContentHeight("30%");
		//            this.getView().addDependent(this.oSelectDialog);
		//        }
		//        var t = e.getSource().getProperty("text");
		//        this.oSelectDialog.getModel().setData({
		//            Title: t,
		//            Items: []
		//        });
		//        M.getOffersActions([i], A).then(function (D) {
		//            this.oSelectDialog.getModel().setData({
		//                Title: t,
		//                Items: D.data[0]
		//            });
		//            this.oSelectDialog.open();
		//        }.bind(this), U.handleErrors);
		//    },
		//    handleOfferFunctionsDialogSearch: function (e) {
		//        var v = e.getParameter("value");
		//        var i = new sap.ui.model.Filter("ActionName", sap.ui.model.FilterOperator.Contains, v);
		//        var B = e.getSource().getBinding("items");
		//        B.filter([i]);
		//    },
		//    handleCloseOutPress: function (i) {
		//        var j = U.getErrorHandler();
		//        var B = this.getView().getModel("i18n").getResourceBundle();
		//        var r = this.state.getOfferData();
		//        var t = this.contentModel.getProperty("/NavButtonsEnabled");
		//        var u = function (e) {
		//            j.hideBusy();
		//            this.contentModel.setProperty("/ShowFooter", t || U.errorMessagesExists());
		//            U.handleErrors(e);
		//        }.bind(this);
		//        var v = function (D) {
		//            var R = new Date(0);
		//            R.setHours(D.getHours());
		//            R.setMinutes(D.getMinutes());
		//            R.setSeconds(D.getSeconds());
		//            return R;
		//        };
		//        j.showBusy();
		//        j.removeAllMessages();
		//        M.executeCloseOutOffers([r]).then(function () {
		//            j.hideBusy();
		//            if (j.numOfErrors() > 0) {
		//                j.showError(B.getText("CreateOffer.ErrorMessage.Function"));
		//                this.contentModel.setProperty("/ShowFooter", t || U.errorMessagesExists());
		//                return;
		//            }
		//            var e = U.base64ToHex(this.dataModel.getProperty("/OfferId"));
		//            M.updateOffer("Tactics", "/Offers(binary'" + e + "')").then(function (w) {
		//                var x = U.getFormatedDateForRead(w.data.StartOfOffer);
		//                var y = U.getFormatedDateForRead(w.data.EndOfOffer);
		//                this.dataModel.setProperty("/StartOfOffer", x);
		//                this.dataModel.setProperty("/EndOfOffer", y);
		//                this.generalController.setWeekForStartOfOffer(x);
		//                this.generalController.setWeekForEndOfOffer(y);
		//                var z = w.data.Tactics.results || [];
		//                var A = {};
		//                z.forEach(function (G) {
		//                    A[[
		//                        G.TacticType,
		//                        G.TacticId
		//                    ]] = G;
		//                });
		//                var D = this.dataModel.getProperty("/Tactics") || [];
		//                D.forEach(function (G) {
		//                    var I = A[[
		//                        G.TacticType,
		//                        G.TacticId
		//                    ]];
		//                    G.StartOfTactic = U.getFormatedDateForRead(I.StartOfTactic);
		//                    G.EndOfTactic = U.getFormatedDateForRead(I.EndOfTactic);
		//                    G.StartTimeOfTactic = v(G.StartOfTactic);
		//                    G.EndTimeOfTactic = v(G.EndOfTactic);
		//                    G.StartTimeOfTacticValue = this.generalController.dateHandler.getFormatTimePiker(G.StartTimeOfTactic);
		//                    G.EndTimeOfTacticValue = this.generalController.dateHandler.getFormatTimePiker(G.EndTimeOfTactic);
		//                }.bind(this));
		//                this.generalController.getView().getModel().refresh(true);
		//                this.onLoadingPage(false, true);
		//            }.bind(this), u);
		//            M.getServiceModel().refresh(true);
		//            this.contentModel.setProperty("/ShowFooter", t || U.errorMessagesExists());
		//        }.bind(this), u);
		//    },
		//    handlePinHeader: function (e) {
		//        var A = this.getView().byId("ObjectPageLayout").getAlwaysShowContentHeader();
		//        var i = this.getView().byId("ObjectPagePinAction");
		//        if (A) {
		//            i.setType("Default");
		//            i.setTooltip(this.getView().getModel("i18n").getResourceBundle().getText("Offer.PinHeaderContent"));
		//        } else {
		//            i.setType("Emphasized");
		//            i.setTooltip(this.getView().getModel("i18n").getResourceBundle().getText("Offer.UnpinHeaderContent"));
		//        }
		//        this.getView().byId("ObjectPageLayout").setAlwaysShowContentHeader(!A);
		//    },
		//    offerFunctionsConfirmSelectDialog: function (i) {
		//        var j = U.getErrorHandler();
		//        var B = this.getView().getModel("i18n").getResourceBundle();
		//        var r = this.state.getOfferData();
		//        var t = i.getParameter("selectedItem").getBindingContext().getObject();
		//        var u = this.contentModel.getProperty("/NavButtonsEnabled");
		//        var v = function (e) {
		//            j.hideBusy();
		//            this.contentModel.setProperty("/ShowFooter", u || U.errorMessagesExists());
		//            U.handleErrors(e);
		//        }.bind(this);
		//        if (this.featuresAvailable.getData().OfferTransfer === "" && t.Action === "04" && (r.PromotionType === "" || r.PromotionType === null)) {
		//            j.showError(B.getText("ManageOffers.Transfer.Error"));
		//            return;
		//        }
		//        j.showBusy();
		//        M.getExecuteOffersActions([r], t.Action, t.Area).then(function () {
		//            j.hideBusy();
		//            if (j.numOfErrors() > 0) {
		//                j.showError(B.getText("CreateOffer.ErrorMessage.Function"));
		//                this.contentModel.setProperty("/ShowFooter", u || U.errorMessagesExists());
		//                return;
		//            }
		//            var e = U.base64ToHex(this.dataModel.getProperty("/OfferId"));
		//            M.updateOffer("", "/Offers(binary'" + e + "')").then(function (w) {
		//                if (t.Area === "S") {
		//                    var x = U.getStatusForStore(w.data);
		//                    if (x.hasOwnProperty("UIState")) {
		//                        var y = U.get(w, [
		//                            "data",
		//                            "UIState"
		//                        ]);
		//                        this.dataModel.setProperty("/UIState", y);
		//                    }
		//                    this.dataModel.setProperty("/Status", t.Status);
		//                    this.dataModel.setProperty("/StatusName", t.StatusName);
		//                    this.state.store(this.state.getOfferData(), {
		//                        StatusName: t.StatusName,
		//                        ChangedOn: w.data.ChangedOn,
		//                        ChangedBy: w.data.ChangedBy,
		//                        ChangedByName: w.data.ChangedByName
		//                    }, x);
		//                }
		//                if (t.Area === "T") {
		//                    this.dataModel.setProperty("/TransferStatusDesc", w.data.TransferStatusDesc);
		//                    this.dataModel.setProperty("/TransferredOn", w.data.TransferredOn);
		//                    this.dataModel.setProperty("/ERPPromotionId", w.data.ERPPromotionId);
		//                    this.state.store(this.state.getOfferData(), {
		//                        TransferStatusDesc: w.data.TransferStatusDesc,
		//                        TransferredOn: w.data.TransferredOn,
		//                        ERPPromotionId: w.data.ERPPromotionId
		//                    });
		//                }
		//                this.startLoading(this.state, true);
		//                this.onLoadingPage(false, true);
		//            }.bind(this), v);
		//            M.getServiceModel().refresh(true);
		//            this.contentModel.setProperty("/ShowFooter", u || U.errorMessagesExists());
		//            M.setRefreshCalendar(true);
		//        }.bind(this), v);
		//    },
		//    onDeleteOfferPress: function () {
		//        U.openDeleteConfirmDiaog(true).then(function () {
		//            var e = this.state.getOfferData();
		//            var i = U.base64ToHex(e.OfferId);
		//            var j = U.getErrorHandler();
		//            j.showBusy();
		//            M.deleteOffers([i]).then(function (D) {
		//                j.hideBusy();
		//                if (j.numOfErrors() > 0) {
		//                    var r = U.getFirstMessage();
		//                    this.oMessageManager.removeAllMessages();
		//                    j.showError(r.message);
		//                } else {
		//                    M.setRefreshCalendar(true);
		//                    this.getRouter().navTo("manage");
		//                }
		//            }.bind(this), function (r) {
		//                j.hideBusy();
		//                U.handleErrors(r);
		//            });
		//        }.bind(this));
		//    },
		//    onEditOfferPress: function () {
		//        var e = this.state.getOfferData();
		//        U.navToEditOffer(this.getRouter(), e);
		//    },
		//    onCopyOfferPress: function () {
		//        this.oMessageManager.removeAllMessages();
		//        var e = this.state.getOfferData();
		//        this.parentOfferData = e;
		//        U.navTocopyOffer(this.getRouter(), e);
		//    },
		//    canBeEdited: function (e, u, i) {
		//        return e === false && !U.isReadOnly({
		//            Status: i,
		//            UIState: u
		//        });
		//    },
		//    validateOfferForVersion: function (e, i, j) {
		//        var r = false;
		//        if (!this.verifyValidation("{i18n>ManageVersions.ManageVersionsButton}", r)) {
		//            return;
		//        }
		//        this.getEventBus().publish("retail.pmr.promotionaloffers", "launchVersionPage");
		//    },
		//    getOfferDataProvider: function () {
		//        return new k(this);
		//    },
		//    routeForOfferContent: function (e) {
		//        var i = this.dataRoute.OfferId;
		//        var j = this.getOwnerComponent().getMetadata().getConfig();
		//        U.toOfferContent(i, j);
		//    },
		//    onOfferContentSave: function () {
		//        var v = this.getView();
		//        U.offerContentSaveDialog(v).then(function () {
		//            var e = this.getOwnerComponent().getMetadata().getConfig();
		//            this.getRouter().detachRouteMatched(this.routeMatched, this, this);
		//            this.getRouter().attachRouteMatched(this.routeForOfferContent, this);
		//            this.onSave(null, true).then(function (r) {
		//                if (r && r.data && !r.navigate) {
		//                    var i = this.dataRoute.OfferId;
		//                    U.toOfferContent(i, e);
		//                }
		//                this.getRouter().detachRouteMatched(this.routeForOfferContent, this, this);
		//                this.getRouter().attachRouteMatched(this.routeMatched, this);
		//            }.bind(this));
		//        }.bind(this), function () {
		//            this.getRouter().detachRouteMatched(this.routeForOfferContent, this);
		//            this.getRouter().attachRouteMatched(this.routeMatched, this);
		//        }.bind(this));
		//    }
	});
	return q;
});