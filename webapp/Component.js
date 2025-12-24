jQuery.sap.declare("customer.zprmprojextmanagepromotionaloffer.Component");

// use the load function for getting the optimized preload file if present
sap.ui.component.load({
	name: "retail.pmr.promotionaloffers",
	// Use the below URL to run the extended application when SAP-delivered application is deployed on SAPUI5 ABAP Repository
	url: "/sap/bc/ui5_ui5/sap/PMROFFERS"

	// we use a URL relative to our own component
	// extension application is deployed with customer namespace
});

retail.pmr.promotionaloffers.Component.extend("customer.zprmprojextmanagepromotionaloffer.Component", {
	metadata: {
		manifest: "json"
	}	
});
