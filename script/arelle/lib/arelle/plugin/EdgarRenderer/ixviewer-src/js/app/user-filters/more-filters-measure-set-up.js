/* Created by staff of the U.S. Securities and Exchange Commission.
 * Data and content created by government employees within the scope of their employment
 * are not subject to domestic copyright protection. 17 U.S.C. 105.
 */

"use strict";

var UserFiltersMoreFiltersMeasureSetUp = {
  filtersSet: false,

  measuresOptions: [],

  setMeasures: function (callback) {
    var foundMeasures = document
      .getElementById("dynamic-xbrl-form")
      .querySelectorAll("[unitRef]");
    var foundMeasuresArray = Array.prototype.slice.call(foundMeasures);
    UserFiltersMoreFiltersMeasureSetUp.measuresOptions = foundMeasuresArray
      .map(function (current) {
        return current.getAttribute("unitRef");
      })
      .filter(function (element, index, array) {
        return array.indexOf(element) === index;
      })
      .sort();

    document.getElementById("filters-measures-count").innerHTML =
      UserFiltersMoreFiltersMeasureSetUp.measuresOptions.length;

    UserFiltersMoreFiltersMeasureSetUp.populate();
    callback();
  },

  populate: function () {
    var innerHtml = "";
    UserFiltersMoreFiltersMeasureSetUp.measuresOptions.forEach(function (
      current,
      index
    ) {
      innerHtml +=
        '<div class="reboot d-flex justify-content-between align-items-center w-100 px-2">';
      innerHtml += '<div class="reboot form-check">';
      innerHtml +=
        '<input onclick="UserFiltersMoreFiltersMeasure.clickEvent(event, this, ' +
        index +
        ')" title="Select/Deselect this option." class="reboot form-check-input" type="checkbox" tabindex="9">';
      innerHtml +=
        '<label class="reboot form-check-label mb-0"">' +
        FiltersUnitref.getMeasure(current) +
        "</label>";
      innerHtml += "</div></div>";
    });
    var parser = new DOMParser();

    var xhtmlDoc = parser.parseFromString(innerHtml, "text/html");
    var nodeList = Array.prototype.slice.call(
      xhtmlDoc.querySelectorAll("body > *")
    );
    for (var i = 0; i < nodeList.length; i++) {
      document.getElementById("user-filters-measures").append(nodeList[i]);
    }
  }
};
