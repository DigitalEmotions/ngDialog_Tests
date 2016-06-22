(function(module) {
try { app = angular.module("templates"); }
catch(err) { app = angular.module("templates", []); }
app.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("js/modal/tall-template.html",
    "<div class=\"tall\">\n" +
    "	<button ng-click=\"closeThisDialog()\">Close</button>\n" +
    "	TALL MODAL\n" +
    "</div>");
}]);
})();
