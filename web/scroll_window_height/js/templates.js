(function(module) {
try { app = angular.module("templates"); }
catch(err) { app = angular.module("templates", []); }
app.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("js/blank/blank-template.html",
    "<div>\n" +
    "	<p>Main window scroll has reset to top of page</p>\n" +
    "	<button ng-click=\"closeThisDialog()\">Close</button>\n" +
    "</div>");
}]);
})();
