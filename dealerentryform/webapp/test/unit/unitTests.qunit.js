/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"vol1/dealerentryform/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
