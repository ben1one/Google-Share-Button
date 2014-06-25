var ViewMoreAction = {OPEN:0, CLOSE:1, HIDE:2};
var googleShareButton = chrome.extension.getBackgroundPage().googleShareButton;
function populateTables_() {
  var primary = document.getElementById("primary_providers").tBodies[0];
  var secondary = document.getElementById("secondary_providers").tBodies[0];
  var ids = googleShareButton.getSortedProviderListForMenu();
  var idsString = "," + ids.join() + ",";
  var providers = googleShareButton.getProviderInformation().providers;
  var sectionEmpty = [!0, !0];
  for(var provider in providers) {
    var inMenu = idsString.indexOf("," + provider + ",") >= 0;
    addProvider_(providers[provider], provider, inMenu, inMenu ? primary : secondary);
    sectionEmpty[inMenu ? 0 : 1] = !1
  }
  handleViewMoreSection_(sectionEmpty[1] ? ViewMoreAction.HIDE : sectionEmpty[0] ? ViewMoreAction.OPEN : ViewMoreAction.CLOSE)
}
function addProvider_(provider, providerId, checked, table) {
  var name = googleShareButton.getProviderDisplayName(providerId, provider);
  var icon = provider.icon;
  var row = document.createElement("tr");
  var providerCell = document.createElement("td");
  providerCell.className = "providerCell";
  var inputElement = document.createElement("input");
  inputElement.type = "checkbox";
  inputElement.id = "input_element_" + providerId;
  if(checked) {
    inputElement.checked = 1
  }
  inputElement.onclick = function() {
    onProviderClicked_(inputElement, providerId)
  };
  providerCell.appendChild(inputElement);
  var imgElement = document.createElement("img");
  imgElement.className = "providerImg";
  imgElement.setAttribute("src", "data:image/vnd.microsoft.icon;base64," + icon);
  imgElement.setAttribute("alt", name);
  imgElement.setAttribute("height", "16px");
  imgElement.setAttribute("width", "16px");
  var labelElement = document.createElement("label");
  labelElement.setAttribute("for", inputElement.id);
  labelElement.appendChild(imgElement);
  var textElement = document.createElement("span");
  textElement.innerHTML = name;
  labelElement.appendChild(textElement);
  providerCell.appendChild(labelElement);
  row.appendChild(providerCell);
  table.appendChild(row)
}
function onProviderClicked_(inputElement, providerId) {
  googleShareButton.enableDisableProvider(providerId, inputElement.checked)
}
function handleViewMoreSection_(action) {
  var viewMoreSection = document.getElementById("view_more_section");
  viewMoreSection.style.display = action == ViewMoreAction.HIDE ? "none" : "";
  if(action != ViewMoreAction.HIDE) {
    var textElement = document.getElementById("view_more_text");
    var tableSection = document.getElementById("secondary_providers_section");
    var linkElement = document.getElementById("view_more_link");
    var imgElement = document.getElementById("view_more_img");
    var open = action == ViewMoreAction.OPEN;
    textElement.innerHTML = chrome.i18n.getMessage(open ? "sharebutton_options_view_more_close" : "sharebutton_options_view_more_text");
    imgElement.className = open ? "zippyMinus" : "zippyPlus";
    tableSection.style.display = open ? "" : "none";
    var newAction = open ? ViewMoreAction.CLOSE : ViewMoreAction.OPEN;
    linkElement.onclick = function() {
      handleViewMoreSection_(newAction)
    }
  }
}
function _initialize() {
  var link = document.createElement("link");
  link.setAttribute("rel", "stylesheet");
  link.type = "text/css";
  var cssFile = "options_ltr.css";
  var dir = "ltr";
  googleShareButton.isLanguageRtl() && (cssFile = "options_rtl.css", dir = "rtl");
  link.href = chrome.extension.getURL(cssFile);
  document.getElementsByTagName("head")[0].appendChild(link);
  document.getElementsByTagName("body")[0].dir = dir;
  var title = chrome.i18n.getMessage("sharebutton_options_title");
  document.title = title;
  document.getElementById("header").innerHTML = title;
  document.getElementById("choose_text").innerHTML = chrome.i18n.getMessage("sharebutton_options_choose_text");
  document.getElementById("attribution").innerHTML = chrome.i18n.getMessage("sharebutton_options_attribution");
  document.getElementById("clear_history").value = chrome.i18n.getMessage("sharebutton_options_clear");
  document.getElementById("clear_history").disabled = window.localStorage.shareButtonProvidersInfo === "";
  populateTables_()
}
function _clearHistory() {
  window.localStorage.shareButtonProvidersInfo = "";
  window.location.reload()
}
;

window.onload=function(){_initialize()};
window.oncontextmenu=function(){return false;};
window.onselectstart=function(){return false;};