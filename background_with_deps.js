var goog = goog || {};
goog.global = this;
goog.DEBUG = !0;
goog.LOCALE = "en";
goog.provide = function(name) {
  var namespace;
  goog.exportPath_(name)
};
goog.setTestOnly = function(opt_message) {
  if(!goog.DEBUG) {
    throw opt_message = opt_message || "", Error("Importing test-only code into non-debug environment" + opt_message ? ": " + opt_message : ".");
  }
};
goog.exportPath_ = function(name, opt_object, opt_objectToExportTo) {
  var parts = name.split(".");
  var cur = opt_objectToExportTo || goog.global;
  !(parts[0] in cur) && cur.execScript && cur.execScript("var " + parts[0]);
  for(var part;parts.length && (part = parts.shift());) {
    !parts.length && goog.isDef(opt_object) ? cur[part] = opt_object : cur = cur[part] ? cur[part] : cur[part] = {}
  }
};
goog.getObjectByName = function(name, opt_obj) {
  var parts = name.split(".");
  var cur = opt_obj || goog.global;
  for(var part;part = parts.shift();) {
    if(goog.isDefAndNotNull(cur[part])) {
      cur = cur[part]
    }else {
      return null
    }
  }
  return cur
};
goog.globalize = function(obj, opt_global) {
  var global = opt_global || goog.global;
  for(var x in obj) {
    global[x] = obj[x]
  }
};
goog.addDependency = function(relPath, provides, requires) {
  var j;
  var i;
  var deps;
  var path;
  var require;
  var provide
};
goog.useStrictRequires = !1;
goog.ENABLE_DEBUG_LOADER = !0;
goog.require = function(name) {
  var errorMessage;
  var path
};
goog.basePath = "";
goog.nullFunction = function() {
};
goog.identityFunction = function(var_args) {
  return var_args
};
goog.abstractMethod = function() {
  throw Error("unimplemented abstract method");
};
goog.addSingletonGetter = function(ctor) {
  ctor.getInstance = function() {
    return ctor.instance_ || (ctor.instance_ = new ctor)
  }
};
goog.typeOf = function(value) {
  var s = typeof value;
  if(s == "object") {
    if(value) {
      if(value instanceof Array) {
        return"array"
      }else {
        if(value instanceof Object) {
          return s
        }
      }
      var className = Object.prototype.toString.call(value);
      if(className == "[object Window]") {
        return"object"
      }
      if(className == "[object Array]" || typeof value.length == "number" && typeof value.splice != "undefined" && typeof value.propertyIsEnumerable != "undefined" && !value.propertyIsEnumerable("splice")) {
        return"array"
      }
      if(className == "[object Function]" || typeof value.call != "undefined" && typeof value.propertyIsEnumerable != "undefined" && !value.propertyIsEnumerable("call")) {
        return"function"
      }
    }else {
      return"null"
    }
  }else {
    if(s == "function" && typeof value.call == "undefined") {
      return"object"
    }
  }
  return s
};
goog.propertyIsEnumerableCustom_ = function(object, propName) {
  if(propName in object) {
    for(var key in object) {
      if(key == propName && Object.prototype.hasOwnProperty.call(object, propName)) {
        return!0
      }
    }
  }
  return!1
};
goog.propertyIsEnumerable_ = function(object, propName) {
  return object instanceof Object ? Object.prototype.propertyIsEnumerable.call(object, propName) : goog.propertyIsEnumerableCustom_(object, propName)
};
goog.isDef = function(val) {
  return val !== void 0
};
goog.isNull = function(val) {
  return val === null
};
goog.isDefAndNotNull = function(val) {
  return val != null
};
goog.isArray = function(val) {
  return goog.typeOf(val) == "array"
};
goog.isArrayLike = function(val) {
  var type = goog.typeOf(val);
  return type == "array" || type == "object" && typeof val.length == "number"
};
goog.isDateLike = function(val) {
  return goog.isObject(val) && typeof val.getFullYear == "function"
};
goog.isString = function(val) {
  return typeof val == "string"
};
goog.isBoolean = function(val) {
  return typeof val == "boolean"
};
goog.isNumber = function(val) {
  return typeof val == "number"
};
goog.isFunction = function(val) {
  return goog.typeOf(val) == "function"
};
goog.isObject = function(val) {
  var type = goog.typeOf(val);
  return type == "object" || type == "array" || type == "function"
};
goog.getUid = function(obj) {
  return obj[goog.UID_PROPERTY_] || (obj[goog.UID_PROPERTY_] = ++goog.uidCounter_)
};
goog.removeUid = function(obj) {
  "removeAttribute" in obj && obj.removeAttribute(goog.UID_PROPERTY_);
  try {
    delete obj[goog.UID_PROPERTY_]
  }catch(ex) {
  }
};
goog.UID_PROPERTY_ = "closure_uid_" + Math.floor(Math.random() * 2147483648).toString(36);
goog.uidCounter_ = 0;
goog.getHashCode = goog.getUid;
goog.removeHashCode = goog.removeUid;
goog.cloneObject = function(obj) {
  var type = goog.typeOf(obj);
  if(type == "object" || type == "array") {
    if(obj.clone) {
      return obj.clone()
    }
    var clone = type == "array" ? [] : {};
    for(var key in obj) {
      clone[key] = goog.cloneObject(obj[key])
    }
    return clone
  }
  return obj
};
goog.bindNative_ = function(fn, selfObj, var_args) {
  return fn.call.apply(fn.bind, arguments)
};
goog.bindJs_ = function(fn, selfObj, var_args) {
  if(!fn) {
    throw Error();
  }
  if(arguments.length > 2) {
    var boundArgs = Array.prototype.slice.call(arguments, 2);
    return function() {
      var newArgs = Array.prototype.slice.call(arguments);
      Array.prototype.unshift.apply(newArgs, boundArgs);
      return fn.apply(selfObj, newArgs)
    }
  }else {
    return function() {
      return fn.apply(selfObj, arguments)
    }
  }
};
goog.bind = function(fn, selfObj, var_args) {
  goog.bind = Function.prototype.bind && Function.prototype.bind.toString().indexOf("native code") != -1 ? goog.bindNative_ : goog.bindJs_;
  return goog.bind.apply(null, arguments)
};
goog.partial = function(fn, var_args) {
  var args = Array.prototype.slice.call(arguments, 1);
  return function() {
    var newArgs = Array.prototype.slice.call(arguments);
    newArgs.unshift.apply(newArgs, args);
    return fn.apply(this, newArgs)
  }
};
goog.mixin = function(target, source) {
  for(var x in source) {
    target[x] = source[x]
  }
};
goog.now = Date.now || function() {
  return+new Date
};
goog.globalEval = function(script) {
  if(goog.global.execScript) {
    goog.global.execScript(script, "JavaScript")
  }else {
    if(goog.global.eval) {
      if(goog.evalWorksForGlobals_ == null) {
        goog.global.eval("var _et_ = 1;"), typeof goog.global._et_ != "undefined" ? (delete goog.global._et_, goog.evalWorksForGlobals_ = !0) : goog.evalWorksForGlobals_ = !1
      }
      if(goog.evalWorksForGlobals_) {
        goog.global.eval(script)
      }else {
        var doc = goog.global.document;
        var scriptElt = doc.createElement("script");
        scriptElt.type = "text/javascript";
        scriptElt.defer = !1;
        scriptElt.appendChild(doc.createTextNode(script));
        doc.body.appendChild(scriptElt);
        doc.body.removeChild(scriptElt)
      }
    }else {
      throw Error("goog.globalEval not available");
    }
  }
};
goog.evalWorksForGlobals_ = null;
goog.getCssName = function(className, opt_modifier) {
  var getMapping = function(cssName) {
    return goog.cssNameMapping_[cssName] || cssName
  };
  var renameByParts = function(cssName) {
    var parts = cssName.split("-");
    var mapped = [];
    for(var i = 0;i < parts.length;i++) {
      mapped.push(getMapping(parts[i]))
    }
    return mapped.join("-")
  };
  var rename;
  rename = goog.cssNameMapping_ ? goog.cssNameMappingStyle_ == "BY_WHOLE" ? getMapping : renameByParts : function(a) {
    return a
  };
  return opt_modifier ? className + "-" + rename(opt_modifier) : rename(className)
};
goog.setCssNameMapping = function(mapping, style) {
  goog.cssNameMapping_ = mapping;
  goog.cssNameMappingStyle_ = style
};
goog.getMsg = function(str, opt_values) {
  var values = opt_values || {};
  for(var key in values) {
    var value = ("" + values[key]).replace(/\$/g, "$$$$");
    str = str.replace(RegExp("\\{\\$" + key + "\\}", "gi"), value)
  }
  return str
};
goog.exportSymbol = function(publicPath, object, opt_objectToExportTo) {
  goog.exportPath_(publicPath, object, opt_objectToExportTo)
};
goog.exportProperty = function(object, publicName, symbol) {
  object[publicName] = symbol
};
goog.inherits = function(childCtor, parentCtor) {
  function tempCtor() {
  }
  tempCtor.prototype = parentCtor.prototype;
  childCtor.superClass_ = parentCtor.prototype;
  childCtor.prototype = new tempCtor;
  childCtor.prototype.constructor = childCtor
};
goog.base = function(me, opt_methodName, var_args) {
  var caller = arguments.callee.caller;
  if(caller.superClass_) {
    return caller.superClass_.constructor.apply(me, Array.prototype.slice.call(arguments, 1))
  }
  var args = Array.prototype.slice.call(arguments, 2);
  var foundCaller = !1;
  for(var ctor = me.constructor;ctor;ctor = ctor.superClass_ && ctor.superClass_.constructor) {
    if(ctor.prototype[opt_methodName] === caller) {
      foundCaller = !0
    }else {
      if(foundCaller) {
        return ctor.prototype[opt_methodName].apply(me, args)
      }
    }
  }
  if(me[opt_methodName] === caller) {
    return me.constructor.prototype[opt_methodName].apply(me, args)
  }else {
    throw Error("goog.base called from a method of one name to a method of a different name");
  }
};
goog.scope = function(fn) {
  fn.call(goog.global)
};
goog.MODIFY_FUNCTION_PROTOTYPES = !0;
if(goog.MODIFY_FUNCTION_PROTOTYPES) {
  Function.prototype.bind = Function.prototype.bind || function(selfObj, var_args) {
    if(arguments.length > 1) {
      var args = Array.prototype.slice.call(arguments, 1);
      args.unshift(this, selfObj);
      return goog.bind.apply(null, args)
    }else {
      return goog.bind(this, selfObj)
    }
  }, Function.prototype.partial = function(var_args) {
    var args = Array.prototype.slice.call(arguments);
    args.unshift(this, null);
    return goog.bind.apply(null, args)
  }, Function.prototype.inherits = function(parentCtor) {
    goog.inherits(this, parentCtor)
  }, Function.prototype.mixin = function(source) {
    goog.mixin(this.prototype, source)
  }
}
;var ProviderDataIndex = {ENABLE_STATUS:0, USED_COUNT:1, VISITED_COUNT:2};
var ProviderEnableStatus = {DEFAULT:0, ENABLED:1, DISABLED:2};
var googleShareButton = {ProviderShowStatus:{NO_SHOW:0, ON_MENU:1, PINNED:2}};
goog.exportSymbol("googleShareButton.ProviderShowStatus", googleShareButton.ProviderShowStatus);
googleShareButton.userLanguage_ = window.navigator.language;
googleShareButton.providerInformation_ = null;
googleShareButton.getProviderInformation = function() {
  if(googleShareButton.providerInformation_) {
    return googleShareButton.providerInformation_
  }
  try {
    var req = new XMLHttpRequest;
    var url = chrome.extension.getURL("/share_providers.json");
    req.open("GET", url, !1);
    req.send(null);
    googleShareButton.providerInformation_ = JSON.parse(req.responseText)
  }catch(e) {
    console.log("Cannot access share_providers.json file: " + e), googleShareButton.providerInformation_ = {providers:{}, defaults:[]}
  }
  return googleShareButton.providerInformation_
};
goog.exportSymbol("googleShareButton.getProviderInformation", googleShareButton.getProviderInformation);
googleShareButton.getProvidersStats = function() {
  var providersStat = {};
  var oldValue = window.localStorage.shareButtonProvidersInfo;
  oldValue && (providersStat = JSON.parse(oldValue));
  return providersStat
};
goog.exportSymbol("googleShareButton.getProvidersStats", googleShareButton.getProvidersStats);
function isProviderPinnedAutomatically_(providerStat) {
  return!providerStat ? !1 : providerStat[ProviderDataIndex.ENABLE_STATUS] == ProviderEnableStatus.DEFAULT && providerStat[ProviderDataIndex.USED_COUNT] >= 3
}
function isProviderPinnedManually_(providerStat) {
  return!providerStat ? !1 : providerStat[ProviderDataIndex.ENABLE_STATUS] == ProviderEnableStatus.ENABLED
}
function isProviderPinned_(providerStat) {
  return isProviderPinnedAutomatically_(providerStat) || isProviderPinnedManually_(providerStat)
}
function isProviderOnMenu_(providerStat, providerId, defaultProviders) {
  if(isProviderPinned_(providerStat)) {
    return!0
  }
  if(providerStat && providerStat[ProviderDataIndex.ENABLE_STATUS] == ProviderEnableStatus.DISABLED) {
    return!1
  }
  if(providerStat && (providerStat[ProviderDataIndex.USED_COUNT] > 0 || providerStat[ProviderDataIndex.VISITED_COUNT] > 0)) {
    return!0
  }
  for(var i = 0;i < defaultProviders.length;i++) {
    if(defaultProviders[i] == providerId) {
      return!0
    }
  }
  return!1
}
googleShareButton.getProvidersShowStatus = function(defaultProviders) {
  var providersStat = googleShareButton.getProvidersStats();
  var result = {};
  var providers = googleShareButton.getProviderInformation();
  for(var provider in providers.providers) {
    var providerStat = providersStat[provider];
    result[provider] = isProviderPinned_(providerStat) ? googleShareButton.ProviderShowStatus.PINNED : isProviderOnMenu_(providerStat, provider, defaultProviders) ? googleShareButton.ProviderShowStatus.ON_MENU : googleShareButton.ProviderShowStatus.NO_SHOW
  }
  return result
};
goog.exportSymbol("googleShareButton.getProvidersShowStatus", googleShareButton.getProvidersShowStatus);
googleShareButton.changeProviderInfo = function(providerId, changeFunction) {
  if(!(typeof providerId != "string" || providerId === "")) {
    var providersInfo = googleShareButton.getProvidersStats();
    providersInfo[providerId] == void 0 && (providersInfo[providerId] = [0, 0, 0]);
    changeFunction(providersInfo[providerId]);
    window.localStorage.shareButtonProvidersInfo = JSON.stringify(providersInfo)
  }
};
goog.exportSymbol("googleShareButton.changeProviderInfo", googleShareButton.changeProviderInfo);
function getPopulatedUrl_(providerUrlTemplate, title, sharedUrl) {
  var encodedUrl = encodeURIComponent(sharedUrl);
  var encodedTitle = encodeURIComponent(title);
  var populatedUrl = providerUrlTemplate.replace(/%\(t\)/g, encodedTitle);
  populatedUrl = populatedUrl.replace("%(u)", encodedUrl);
  populatedUrl = populatedUrl.replace("%(n)", encodeURIComponent(chrome.i18n.getMessage("sharebutton_shared_with")));
  return populatedUrl
}
function urlCanBeShared_(url) {
  if(typeof url != "string" || url === "") {
    return!1
  }
  var prefix = "http://";
  var prefix2 = "https://";
  return url.indexOf(prefix) == 0 || url.indexOf(prefix2) == 0;
}
googleShareButton.onProviderShared = function(providerId, title, sharedUrl) {
  if(urlCanBeShared_(sharedUrl)) {
    googleShareButton.changeProviderInfo(providerId, function(providerData) {
      providerData[ProviderDataIndex.USED_COUNT]++
    });
    var provider = googleShareButton.getProviderInformation().providers[providerId];
    if(provider.url.indexOf("mailto:") == 0) {
      chrome.tabs.getSelected(null, function(tab) {
        chrome.tabs.update(tab.id, {url:getPopulatedUrl_(provider.url, title, sharedUrl)})
      })
    }else {
      if(provider.url_limit && sharedUrl.length > provider.url_limit) {
        var newWindow = window.open("about:blank", "", "menubar=1,resizable=1,width=800,height=570");
        newWindow.setTimeout(function() {
          var text = newWindow.document.createElement("DIV");
          text.innerText = chrome.i18n.getMessage("sharebutton_loading");
          newWindow.document.body.appendChild(text)
        }, 500);
        getShortUrl_(sharedUrl, function(shortUrl) {
          var providerUrl = getPopulatedUrl_(provider.url, title, shortUrl);
          newWindow.location.replace(providerUrl)
        })
      }else {
        window.open(getPopulatedUrl_(provider.url, title, sharedUrl), "", "menubar=1,resizable=1,width=800,height=570")
      }
    }
  }else {
    window.alert(chrome.i18n.getMessage("sharebutton_cant_share"))
  }
};
goog.exportSymbol("googleShareButton.onProviderShared", googleShareButton.onProviderShared);
googleShareButton.onProviderVisited = function(providerId) {
  googleShareButton.changeProviderInfo(providerId, function(providerData) {
    providerData[ProviderDataIndex.VISITED_COUNT] >= 10 ? providerData[ProviderDataIndex.VISITED_COUNT] = 999999 : providerData[ProviderDataIndex.VISITED_COUNT]++
  })
};
goog.exportSymbol("googleShareButton.onProviderVisited", googleShareButton.onProviderVisited);
googleShareButton.enableDisableProvider = function(providerId, enable) {
  googleShareButton.changeProviderInfo(providerId, function(providerData) {
    providerData[ProviderDataIndex.ENABLE_STATUS] = enable ? ProviderEnableStatus.ENABLED : ProviderEnableStatus.DISABLED
  })
};
goog.exportSymbol("googleShareButton.enableDisableProvider", googleShareButton.enableDisableProvider);
function getLastTwoPartsOfHost_(host) {
  if(typeof host != "string" || host === "") {
    return""
  }
  var parts = host.split(".");
  return parts.length < 1 ? "" : parts.length == 1 ? host : parts[parts.length - 2] + "." + parts[parts.length - 1]
}
function addPatternToMap_(map, pattern, providerId) {
  if(!(typeof pattern != "string" || pattern === "")) {
    var host = pattern;
    var path = "";
    var splitPattern = pattern.split("/", 2);
    splitPattern.length == 2 && (host = splitPattern[0], path = splitPattern[1]);
    var lastTwoParts = getLastTwoPartsOfHost_(host);
    var mapElement = map[lastTwoParts];
    mapElement || (map[lastTwoParts] = [], mapElement = map[lastTwoParts]);
    mapElement.push({host:host, path:path, id:providerId})
  }
}
function splitUrl_(url) {
  if(typeof url != "string" || url === "") {
    return null
  }
  var prefixes = ["http://", "https://"];
  var currentPrefix;
  for(var i = 0;i < prefixes.length;i++) {
    if(url.indexOf(prefixes[i]) == 0) {
      currentPrefix = prefixes[i];
      break
    }
  }
  if(!currentPrefix) {
    return null
  }
  var slashPos = url.indexOf("/", currentPrefix.length);
  if(slashPos < 0) {
    slashPos = url.length
  }
  var host = url.substr(currentPrefix.length, slashPos - currentPrefix.length);
  var path = "";
  slashPos < url.length - 1 && (path = url.substr(slashPos + 1));
  return[host, path]
}
googleShareButton.getPatternsMap_ = function() {
  if(!googleShareButton.patternsMap) {
    googleShareButton.patternsMap = {};
    var providersInfo = googleShareButton.getProviderInformation();
    if(providersInfo && providersInfo.providers) {
      for(var provider in providersInfo.providers) {
        var currentProvider = providersInfo.providers[provider];
        if(currentProvider.pattern) {
          for(var i = 0;i < currentProvider.pattern.length;i++) {
            addPatternToMap_(googleShareButton.patternsMap, currentProvider.pattern[i], provider)
          }
        }else {
          var hostPath = splitUrl_(currentProvider.url);
          hostPath && addPatternToMap_(googleShareButton.patternsMap, getLastTwoPartsOfHost_(hostPath[0]), provider)
        }
      }
    }
  }
  return googleShareButton.patternsMap
};
function startsWith_(str, prefix) {
  return str.indexOf(prefix) == 0
}
function endsWith_(str, suffix) {
  return str.length >= suffix.length && str.substr(str.length - suffix.length) == suffix
}
googleShareButton.findProviderFromUrl_ = function(url) {
  var map = googleShareButton.getPatternsMap_();
  if(!map) {
    return""
  }
  var hostPath = splitUrl_(url);
  if(!hostPath) {
    return""
  }
  var lastTwoParts = getLastTwoPartsOfHost_(hostPath[0]);
  var mapElement = map[lastTwoParts];
  if(!mapElement) {
    return""
  }
  for(var i = 0;i < mapElement.length;i++) {
    if(endsWith_(hostPath[0], mapElement[i].host) && startsWith_(hostPath[1], mapElement[i].path)) {
      return mapElement[i].id
    }
  }
  return""
};
function getShortUrl_(longUrl, onComplete) {
  function handleSuccess(shortUrl) {
    window.clearTimeout(abortTimerId);
    onComplete(shortUrl)
  }
  function handleError() {
    window.clearTimeout(abortTimerId);
    onComplete(longUrl)
  }
  var xhr = new XMLHttpRequest;
  var abortTimerId = window.setTimeout(function() {
    xhr.abort();
    onComplete(longUrl)
  }, 5E3);
  try {
    xhr.onreadystatechange = function() {
      if(xhr.readyState == 4) {
        if(xhr.responseText) {
          var response = JSON.parse(xhr.responseText);
          handleSuccess(response.short_url)
        }else {
          handleError()
        }
      }
    }, xhr.onerror = function(error) {
      handleError()
    }, xhr.open("POST", "http://goo.gl/api/url", !0), xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), xhr.send(getUrlShorteningRequestParams(longUrl))
  }catch(e) {
    handleError()
  }
}
googleShareButton.getProviderDisplayName = function(id, provider) {
  if(id == "Gmail") {
    var language = googleShareButton.userLanguage_;
    if(language == "en-GB" || language.search(/^de/) == 0) {
      return"Google Mail"
    }
  }
  return!provider.name ? id : provider.name
};
goog.exportSymbol("googleShareButton.getProviderDisplayName", googleShareButton.getProviderDisplayName);
function findDefaultProviders_(language, searchDomain) {
  var defaults = googleShareButton.getProviderInformation().defaults;
  var pairs = [];
  var numPairs = 0;
  pairs[numPairs++] = [language.toLowerCase(), searchDomain.toLowerCase()];
  language.toLowerCase() == "en-gb" && (pairs[numPairs++] = ["en", "uk"]);
  var langParts = language.toLowerCase().split("-");
  langParts.length == 2 && (pairs[numPairs++] = [langParts[0], langParts[1]], pairs[numPairs++] = [langParts[0], ""]);
  pairs[numPairs++] = ["", ""];
  for(var pair = 0;pair < numPairs;pair++) {
    var currentPair = pairs[pair];
    for(var i = 0;i < defaults.length;i++) {
      var def = defaults[i];
      if(def[0].toLowerCase() == currentPair[0]) {
        var domainsMatch = currentPair[1] === "" ? def[1] === "" : def[1].toLowerCase().indexOf(currentPair[1]) >= 0;
        if(domainsMatch) {
          return def[2]
        }
      }
    }
  }
  return[]
}
function displayRanking_(id1, id2, providers) {
  var name1 = googleShareButton.getProviderDisplayName(id1, providers[id1]);
  var name2 = googleShareButton.getProviderDisplayName(id2, providers[id2]);
  return name1.localeCompare(name2)
}
googleShareButton.getSortedProviderListForMenu = function() {
  var searchDomain = "";
  var language = googleShareButton.userLanguage_;
  var providers = googleShareButton.getProviderInformation().providers;
  var defaultProviders = findDefaultProviders_(language, searchDomain);
  var providersShowStatus = googleShareButton.getProvidersShowStatus(defaultProviders);
  var pinned = [];
  var onMenu = [];
  var secondaryMenu = [];
  for(var id in providersShowStatus) {
    switch(providersShowStatus[id]) {
      case googleShareButton.ProviderShowStatus.PINNED:
        pinned[pinned.length] = id;
        break;
      case googleShareButton.ProviderShowStatus.ON_MENU:
        onMenu[onMenu.length] = id;
        break
    }
  }
  pinned.sort(function(id1, id2) {
    return displayRanking_(id1, id2, providers)
  });
  onMenu.sort(function(id1, id2) {
    return displayRanking_(id1, id2, providers)
  });
  if(pinned.length + onMenu.length > 13) {
    var leaveOnMenu = Math.max(0, 12 - pinned.length);
    secondaryMenu = onMenu.splice(leaveOnMenu, onMenu.length - leaveOnMenu)
  }
  return[pinned, onMenu, secondaryMenu]
};
goog.exportSymbol("googleShareButton.getSortedProviderListForMenu", googleShareButton.getSortedProviderListForMenu);
googleShareButton.isLanguageRtl = function() {
  return window.navigator.language == "ar" || window.navigator.language == "he" ? !0 : !1
};
goog.exportSymbol("googleShareButton.isLanguageRtl", googleShareButton.isLanguageRtl);
function initializeUserLanguage_(acceptLanguage, uiLanguage) {
  googleShareButton.userLanguage_ = uiLanguage;
  if(!(uiLanguage == "en-GB" && (acceptLanguage == "en" || acceptLanguage == "en-US"))) {
    var acceptLanguageParts = acceptLanguage.split("-");
    var uiLanguageParts = uiLanguage.split("-");
    if(acceptLanguageParts[0] == uiLanguageParts[0]) {
      googleShareButton.userLanguage_ = acceptLanguage
    }
  }
}
chrome.tabs.onUpdated.addListener(function(tab$$0, info) {
  info.status == "complete" && chrome.tabs.getSelected(null, function(tab) {
    googleShareButton.onProviderVisited(googleShareButton.findProviderFromUrl_(tab.url))
  })
});
chrome.i18n.getAcceptLanguages(function(acceptLanguages) {
  initializeUserLanguage_(acceptLanguages[0], window.navigator.language)
});
function getUrlShorteningRequestParams(url) {
  function sum(var_args) {
    var s = 0;
    for(var i = 0;i < arguments.length;i++) {
      s = s + arguments[i] & 4294967295
    }
    return s
  }
  function SeedHash7WithString(data) {
    return djb2(data)
  }
  function TweakDjb2Hash_Step1of4(djb2_hash) {
    return djb2_hash >> 2 & 1073741823
  }
  function TweakDjb2Hash_Step2of4(djb2_hash) {
    return djb2_hash >> 4 & 67108800 | djb2_hash & 63
  }
  function TweakDjb2Hash_Step3of4(djb2_hash) {
    return djb2_hash >> 4 & 4193280 | djb2_hash & 1023
  }
  function TweakDjb2Hash_Step4of4(djb2_hash) {
    return djb2_hash >> 4 & 245760 | djb2_hash & 16383
  }
  function CalculateHash7_Step1of7() {
    return"7"
  }
  function CalculateHash7_Step2of7(data) {
    return sdbm(data)
  }
  function CalculateHash7_Step3of7(djb2_hash, sdbm_hash) {
    return(djb2_hash >> 2 & 15) << 4 | sdbm_hash & 15
  }
  function CalculateHash7_Step4of7(djb2_hash, sdbm_hash) {
    return(djb2_hash >> 6 & 15) << 12 | (sdbm_hash >> 8 & 15) << 8
  }
  function CalculateHash7_Step5of7(djb2_hash, sdbm_hash) {
    return(djb2_hash >> 10 & 15) << 20 | (sdbm_hash >> 16 & 15) << 16
  }
  function CalculateHash7_Step6of7(djb2_hash, sdbm_hash) {
    return(djb2_hash >> 14 & 15) << 28 | (sdbm_hash >> 24 & 15) << 24
  }
  function CalculateHash7_Step7of7(final_hash) {
    var s = String(final_hash > 0 ? final_hash : final_hash + 4294967296);
    return LuhnifyNumberString(s)
  }
  function mix(a, b, c) {
    a = sum(a, -b);
    a = sum(a, -c);
    a ^= c >> 13;
    b = sum(b, -c);
    b = sum(b, -a);
    b ^= a << 8;
    c = sum(c, -a);
    c = sum(c, -b);
    c ^= b >> 13;
    a = sum(a, -b);
    a = sum(a, -c);
    a ^= c >> 12;
    b = sum(b, -c);
    b = sum(b, -a);
    b ^= a << 16;
    c = sum(c, -a);
    c = sum(c, -b);
    c ^= b >> 5;
    a = sum(a, -b);
    a = sum(a, -c);
    a ^= c >> 3;
    b = sum(b, -c);
    b = sum(b, -a);
    b ^= a << 10;
    c = sum(c, -a);
    c = sum(c, -b);
    c ^= b >> 15
  }
  function gwshash(key, c) {
    function wordAt(i) {
      return key.charCodeAt(i + 0) | key.charCodeAt(i + 1) << 8 | key.charCodeAt(i + 2) << 16 | key.charCodeAt(i + 3) << 24
    }
    var a;
    var b;
    var keylen;
    a = b = 2654435769;
    for(var i$$0 = 0;i$$0 <= key.length - 12;i$$0 += 12) {
      a += wordAt(i$$0), b += wordAt(i$$0 + 4), c += wordAt(i$$0 + 8), mix(a, b, c)
    }
    c += key.length;
    switch(key.length - i$$0) {
      case 11:
        c += key.charCodeAt(i$$0 + 10) << 24;
      case 10:
        c += key.charCodeAt(i$$0 + 9) << 16;
      case 9:
        c += key.charCodeAt(i$$0 + 8) << 8;
      case 8:
        b += wordAt(i$$0 + 4);
        a += wordAt(i$$0);
        break;
      case 7:
        b += key.charCodeAt(i$$0 + 6) << 16;
      case 6:
        b += key.charCodeAt(i$$0 + 5) << 8;
      case 5:
        b += key.charCodeAt(i$$0 + 4);
      case 4:
        a += wordAt(i$$0);
        break;
      case 3:
        a += key.charCodeAt(i$$0 + 2) << 16;
      case 2:
        a += key.charCodeAt(i$$0 + 1) << 8;
      case 1:
        a += key.charCodeAt(0)
    }
    mix(a, b, c);
    return c
  }
  function djb2(data) {
    var hash = 5381;
    var c;
    for(var i = 0;i < data.length;i++) {
      hash = sum(hash << 5, hash, data.charCodeAt(i))
    }
    return hash
  }
  function sdbm(data) {
    var hash = 0;
    for(var i = 0;i < data.length;i++) {
      hash = sum(data.charCodeAt(i), hash << 6, hash << 16, -hash)
    }
    return hash
  }
  function CalculateLuhnRemainder(numberStr) {
    var sum = 0;
    var odd = !1;
    for(var i = numberStr.length - 1;i >= 0;--i) {
      var d = Number(numberStr.charAt(i));
      odd ? (d *= 2, sum += Math.floor(d / 10) + d % 10) : sum += d;
      odd = !odd
    }
    var mod = sum % 10;
    return mod
  }
  function LuhnifyNumberString(numberStr) {
    var mod = CalculateLuhnRemainder(numberStr);
    var luhn_number = 0;
    mod != 0 && (luhn_number = 10 - mod, numberStr.length % 2 == 1 && (luhn_number % 2 == 1 && (luhn_number += 9), luhn_number /= 2));
    var result = String(luhn_number);
    result += numberStr;
    return result
  }
  var utf8url = unescape(encodeURIComponent(url));
  var authToken = "au";
  var djb2Hash = SeedHash7WithString(utf8url);
  authToken += "th";
  djb2Hash = TweakDjb2Hash_Step1of4(djb2Hash);
  var hash7Str = CalculateHash7_Step1of7();
  authToken += "_";
  djb2Hash = TweakDjb2Hash_Step2of4(djb2Hash);
  authToken += "to";
  djb2Hash = TweakDjb2Hash_Step3of4(djb2Hash);
  authToken += "k";
  djb2Hash = TweakDjb2Hash_Step4of4(djb2Hash);
  authToken += "en";
  var sdbmHash = CalculateHash7_Step2of7(utf8url);
  var request = "user=";
  var finalHash = CalculateHash7_Step3of7(djb2Hash, sdbmHash);
  request += "share-extension@google.com";
  finalHash |= CalculateHash7_Step4of7(djb2Hash, sdbmHash);
  request += "&url=";
  finalHash |= CalculateHash7_Step5of7(djb2Hash, sdbmHash);
  request += encodeURIComponent(url);
  finalHash |= CalculateHash7_Step6of7(djb2Hash, sdbmHash);
  request += "&";
  hash7Str += CalculateHash7_Step7of7(finalHash);
  request += authToken;
  request += "=";
  request += hash7Str;
  return request
}
;
