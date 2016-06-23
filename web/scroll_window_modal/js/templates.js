(function(module) {
try { app = angular.module("templates"); }
catch(err) { app = angular.module("templates", []); }
app.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("js/blank/blank-template.html",
    "<div style=\"height:1000px\">\n" +
    "	<p>Modal should scroll and bg should retain current scroll position</p>\n" +
    "	<button ng-click=\"closeThisDialog()\">Close</button>\n" +
    "</div>");
}]);
})();
