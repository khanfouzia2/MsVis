define(["@grafana/data","@grafana/ui","react"], function(__WEBPACK_EXTERNAL_MODULE__grafana_data__, __WEBPACK_EXTERNAL_MODULE__grafana_ui__, __WEBPACK_EXTERNAL_MODULE_react__) { return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./module.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../node_modules/css-loader/dist/cjs.js?!../node_modules/postcss-loader/src/index.js?!../node_modules/sass-loader/lib/loader.js!./tool-frontend/src/style/App.css":
/*!*********************************************************************************************************************************************************************************!*\
  !*** ../node_modules/css-loader/dist/cjs.js??ref--8-1!../node_modules/postcss-loader/src??ref--8-2!../node_modules/sass-loader/lib/loader.js!./tool-frontend/src/style/App.css ***!
  \*********************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "../node_modules/css-loader/dist/runtime/api.js")(true);
// Module
exports.push([module.i, ".App {\n  text-align: center; }\n\n.App-logo {\n  height: 40vmin; }\n\n.App-header {\n  background-color: #282c34;\n  min-height: 100vh;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  font-size: calc(10px + 2vmin);\n  color: white; }\n\n.App-link {\n  color: #09d3ac; }\n\n.Graph {\n  align: center;\n  width: 1100px;\n  height: 800px; }\n", "",{"version":3,"sources":["App.css"],"names":[],"mappings":"AAAA;EACE,kBAAkB,EAAE;;AAEtB;EACE,cAAc,EAAE;;AAElB;EACE,yBAAyB;EACzB,iBAAiB;EACjB,aAAa;EACb,sBAAsB;EACtB,mBAAmB;EACnB,uBAAuB;EACvB,6BAA6B;EAC7B,YAAY,EAAE;;AAEhB;EACE,cAAc,EAAE;;AAElB;EACE,aAAa;EACb,aAAa;EACb,aAAa,EAAE","file":"App.css","sourcesContent":[".App {\n  text-align: center; }\n\n.App-logo {\n  height: 40vmin; }\n\n.App-header {\n  background-color: #282c34;\n  min-height: 100vh;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  font-size: calc(10px + 2vmin);\n  color: white; }\n\n.App-link {\n  color: #09d3ac; }\n\n.Graph {\n  align: center;\n  width: 1100px;\n  height: 800px; }\n"]}]);


/***/ }),

/***/ "../node_modules/css-loader/dist/runtime/api.js":
/*!******************************************************!*\
  !*** ../node_modules/css-loader/dist/runtime/api.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return "@media ".concat(item[2], "{").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    for (var i = 0; i < this.length; i++) {
      // eslint-disable-next-line prefer-destructuring
      var id = this[i][0];

      if (id != null) {
        alreadyImportedModules[id] = true;
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = modules[_i]; // skip already imported module
      // this implementation is not 100% perfect for weird media query combinations
      // when a module is imported multiple times with different media queries.
      // I hope this will never occur (Hey this way we have smaller bundles)

      if (item[0] == null || !alreadyImportedModules[item[0]]) {
        if (mediaQuery && !item[2]) {
          item[2] = mediaQuery;
        } else if (mediaQuery) {
          item[2] = "(".concat(item[2], ") and (").concat(mediaQuery, ")");
        }

        list.push(item);
      }
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring

  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot).concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
  return "/*# ".concat(data, " */");
}

/***/ }),

/***/ "../node_modules/style-loader/lib/addStyles.js":
/*!*****************************************************!*\
  !*** ../node_modules/style-loader/lib/addStyles.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target, parent) {
  if (parent){
    return parent.querySelector(target);
  }
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target, parent) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target, parent);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(/*! ./urls */ "../node_modules/style-loader/lib/urls.js");

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertAt.before, target);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}

	if(options.attrs.nonce === undefined) {
		var nonce = getNonce();
		if (nonce) {
			options.attrs.nonce = nonce;
		}
	}

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function getNonce() {
	if (false) {}

	return __webpack_require__.nc;
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = typeof options.transform === 'function'
		 ? options.transform(obj.css) 
		 : options.transform.default(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ "../node_modules/style-loader/lib/urls.js":
/*!************************************************!*\
  !*** ../node_modules/style-loader/lib/urls.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),

/***/ "../node_modules/tslib/tslib.es6.js":
/*!******************************************!*\
  !*** ../node_modules/tslib/tslib.es6.js ***!
  \******************************************/
/*! exports provided: __extends, __assign, __rest, __decorate, __param, __metadata, __awaiter, __generator, __exportStar, __values, __read, __spread, __spreadArrays, __await, __asyncGenerator, __asyncDelegator, __asyncValues, __makeTemplateObject, __importStar, __importDefault */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__extends", function() { return __extends; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__assign", function() { return __assign; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__rest", function() { return __rest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__decorate", function() { return __decorate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__param", function() { return __param; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__metadata", function() { return __metadata; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__awaiter", function() { return __awaiter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__generator", function() { return __generator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__exportStar", function() { return __exportStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__values", function() { return __values; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__read", function() { return __read; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spread", function() { return __spread; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spreadArrays", function() { return __spreadArrays; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__await", function() { return __await; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncGenerator", function() { return __asyncGenerator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncDelegator", function() { return __asyncDelegator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncValues", function() { return __asyncValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__makeTemplateObject", function() { return __makeTemplateObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importStar", function() { return __importStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importDefault", function() { return __importDefault; });
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return __assign.apply(this, arguments);
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __exportStar(m, exports) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}

function __values(o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result.default = mod;
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}


/***/ }),

/***/ "./SimpleEditor.tsx":
/*!**************************!*\
  !*** ./SimpleEditor.tsx ***!
  \**************************/
/*! exports provided: SimpleEditor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SimpleEditor", function() { return SimpleEditor; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/ui */ "@grafana/ui");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__);




var SimpleEditor =
/** @class */
function (_super) {
  Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(SimpleEditor, _super);

  function SimpleEditor() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.onTextChanged = function (_a) {
      var target = _a.target;

      _this.props.onOptionsChange(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, _this.props.options), {
        text: target.value
      }));
    };

    return _this;
  }

  SimpleEditor.prototype.render = function () {
    var options = this.props.options;
    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: "section gf-form-group"
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h5", {
      className: "section-heading"
    }, "Display"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["FormField"], {
      label: "Text",
      labelWidth: 5,
      inputWidth: 20,
      type: "text",
      onChange: this.onTextChanged,
      value: options.text || ''
    }));
  };

  return SimpleEditor;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]);



/***/ }),

/***/ "./module.ts":
/*!*******************!*\
  !*** ./module.ts ***!
  \*******************/
/*! exports provided: plugin */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "plugin", function() { return plugin; });
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @grafana/data */ "@grafana/data");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_grafana_data__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./types */ "./types.ts");
/* harmony import */ var _SimpleEditor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SimpleEditor */ "./SimpleEditor.tsx");
/* harmony import */ var _tool_frontend_src_App__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./tool-frontend/src/App */ "./tool-frontend/src/App.tsx");

 //import { SimplePanel } from './SimplePanel';



var plugin = new _grafana_data__WEBPACK_IMPORTED_MODULE_0__["PanelPlugin"](_tool_frontend_src_App__WEBPACK_IMPORTED_MODULE_3__["App"]).setDefaults(_types__WEBPACK_IMPORTED_MODULE_1__["defaults"]).setEditor(_SimpleEditor__WEBPACK_IMPORTED_MODULE_2__["SimpleEditor"]);

/***/ }),

/***/ "./tool-frontend/src/App.tsx":
/*!***********************************!*\
  !*** ./tool-frontend/src/App.tsx ***!
  \***********************************/
/*! exports provided: App */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "App", function() { return App; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _style_App_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./style/App.css */ "./tool-frontend/src/style/App.css");
/* harmony import */ var _style_App_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_style_App_css__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _FormNetwork__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./FormNetwork */ "./tool-frontend/src/FormNetwork.tsx");



 //const s = require('./style/App.css');

var App =
/** @class */
function (_super) {
  Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(App, _super);

  function App(props) {
    return _super.call(this, props) || this;
  }

  App.prototype.drawGraph = function () {
    return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
      var data, metrics_data, result, vis, container, nodes_, edges_, graphData, outputNetwork;
      return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
        switch (_a.label) {
          case 0:
            data = this.props.data;
            console.log(data.series);
            if (!(data.series.length < 1)) return [3
            /*break*/
            , 1];
            return [3
            /*break*/
            , 4];

          case 1:
            return [4
            /*yield*/
            , this.getPrometheusMetrics()];

          case 2:
            metrics_data = _a.sent();
            console.log("metrics_data inside drawGraph");
            console.log(metrics_data);
            console.log(metrics_data.length);
            return [4
            /*yield*/
            , Object(_FormNetwork__WEBPACK_IMPORTED_MODULE_3__["getNetworkData"])(data.series, metrics_data)];

          case 3:
            result = _a.sent(); //console.log(data)

            console.log("Result from getNetworkData function");
            console.log(result); //result[0].length < 1

            vis = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module '../node_modules/vis/dist/vis.js'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
            container = document.getElementById("mynetwork");
            nodes_ = new vis.DataSet(result[0]);
            edges_ = new vis.DataSet(result[1]);
            console.log(nodes_);
            graphData = {
              nodes: nodes_,
              edges: edges_
            }; //console.log("graphData");
            //console.log(graphData);

            if (graphData.nodes.length > 0) {
              outputNetwork = new vis.Network(container, graphData, result[2]);
              console.log(outputNetwork);
            } //this.prometheusData();


            return [2
            /*return*/
            ];

          case 4:
            return [2
            /*return*/
            ];
        }
      });
    });
  };

  App.prototype.getDatasourceId = function (grafana_url, datasource_name) {
    return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
      var url, api_token, headers, response;
      return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
        switch (_a.label) {
          case 0:
            url = grafana_url + '/api/datasources/name/' + datasource_name;
            api_token = "Bearer eyJrIjoiMXQza2ZEaDVNWTFoZmZzd0xUNjZzOFNoSGt0RDRCNUEiLCJuIjoibXN2aXNfa2V5IiwiaWQiOjF9";
            headers = {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': api_token
            };
            return [4
            /*yield*/
            , fetch(url, {
              mode: 'no-cors',
              method: "GET",
              headers: headers
            })];

          case 1:
            response = _a.sent(); //const response = await fetch(url, {headers});

            console.log("New json response");

            if (response.status == 200 && response.statusText == "OK") {
              return [2
              /*return*/
              , response.json()];
            } else {
              return [2
              /*return*/
              , []];
            }

            return [2
            /*return*/
            ];
        }
      });
    });
  };

  App.prototype.runPrometheusQuery = function (url) {
    return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
      var response;
      return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4
            /*yield*/
            , fetch(url)];

          case 1:
            response = _a.sent();

            if (response.status == 200 && response.statusText == "OK") {
              return [2
              /*return*/
              , response.json()];
            } else {
              return [2
              /*return*/
              , []];
            }

            return [2
            /*return*/
            ];
        }
      });
    });
  };

  App.prototype.getPrometheusMetrics = function () {
    return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
      var grafana_url, datasource_name, metrics_data, response, DS_proxy_url, services_status, query, services_response_time, services_load_1m, i, arr;
      return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
        switch (_a.label) {
          case 0:
            grafana_url = 'http://130.230.52.202';
            datasource_name = 'Prometheus';
            metrics_data = [];
            return [4
            /*yield*/
            , this.getDatasourceId(grafana_url, datasource_name)];

          case 1:
            response = _a.sent();
            console.log(response);
            console.log("response aboveeeeeeeeee");
            DS_proxy_url = grafana_url + '/api/datasources/' + response.access + '/' + response.id.toString() + '/api/v1/query_range?query=up{job!="prometheus"}&start=' + Math.floor(Date.now() / 1000).toString() + '&end=' + Math.floor(Date.now() / 1000).toString() + '&step=30';
            return [4
            /*yield*/
            , this.runPrometheusQuery(DS_proxy_url)];

          case 2:
            services_status = _a.sent();
            if (!(services_status.status == "success")) return [3
            /*break*/
            , 5];
            query = 'scrape_duration_seconds{job!="prometheus"}';
            DS_proxy_url = grafana_url + '/api/datasources/' + response.access + '/' + response.id.toString() + '/api/v1/query_range?query=' + query + '&start=' + Math.floor(Date.now() / 1000).toString() + '&end=' + Math.floor(Date.now() / 1000).toString() + '&step=30';
            console.log(DS_proxy_url);
            return [4
            /*yield*/
            , this.runPrometheusQuery(DS_proxy_url)];

          case 3:
            services_response_time = _a.sent();
            if (!(services_response_time.status == "success")) return [3
            /*break*/
            , 5];
            query = 'scrape_samples_scraped{job!="prometheus"}';
            DS_proxy_url = grafana_url + '/api/datasources/' + response.access + '/' + response.id.toString() + '/api/v1/query_range?query=' + query + '&start=' + Math.floor(Date.now() / 1000).toString() + '&end=' + Math.floor(Date.now() / 1000).toString() + '&step=30';
            return [4
            /*yield*/
            , this.runPrometheusQuery(DS_proxy_url)];

          case 4:
            services_load_1m = _a.sent();

            if (services_load_1m.status == "success") {
              for (i = 0; i < services_status.data.result.length; ++i) {
                arr = [];
                arr.push(services_status.data.result[i].metric.job);
                arr.push(services_status.data.result[i].values[0][1]);
                if (i < services_response_time.data.result.length) arr.push(parseFloat(services_response_time.data.result[i].values[0][1].toString()).toFixed(2));else arr.push("");
                if (i < services_load_1m.data.result.length) arr.push(services_load_1m.data.result[i].values[0][1].toString());else arr.push(""); //console.log(arr);

                metrics_data.push(arr);
              }

              console.log("Printing metrics_data length INSIDE### ");
              console.log(metrics_data.length);

              if (metrics_data.length > 0) {
                console.log("Printing metrics_data array INSIDE### ");
                console.log(metrics_data);
                console.log(metrics_data.length);
              }
            }

            _a.label = 5;

          case 5:
            console.log("Printing metrics_data length OUTSIDE ### ");
            console.log(metrics_data.length);

            if (metrics_data.length > 0) {
              console.log("Printing metrics_data array OUTSIDE ### ");
              console.log(metrics_data);
              console.log(metrics_data.length);
            }
            /*END*/
            //});


            return [2
            /*return*/
            , metrics_data];
        }
      });
    });
  };

  App.prototype.componentDidMount = function () {
    //this.getPrometheusMetrics();
    this.drawGraph();
  };

  App.prototype.render = function () {
    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("p", null, "Microservices Call Dependency Graph"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      id: "mynetwork",
      className: "Graph"
    }));
  };

  return App;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]);



/***/ }),

/***/ "./tool-frontend/src/FormNetwork.tsx":
/*!*******************************************!*\
  !*** ./tool-frontend/src/FormNetwork.tsx ***!
  \*******************************************/
/*! exports provided: getNetworkData, FormNetwork */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getNetworkData", function() { return getNetworkData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormNetwork", function() { return FormNetwork; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
//import DataFrame from 'dataframe-js';
 //DO ADD THE CHECKS TO READ COLUMN VALUES FIRST/ also add checks before fetching parent, child or callCount data

function getNetworkData(data, data_) {
  console.log("Printing grafana DS response inside getNetworkData function");
  console.log(data);
  console.log("Printing prometheus Metrics data inside getNetworkData function");
  var prometheusData = data_;
  console.log(prometheusData); //list.sort((a, b) => (a.color > b.color) ? 1 : -1)
  //To create array of nodes, edges and options

  var responseArray = [];

  if (data[0].fields[0].values.length > 0 && data[0].fields[0]["name"] == "Parent" && data[0].fields[1]["name"] == "Child" && data[0].fields[2]["name"] == "CallCount") {
    var parentNodes = data[0].fields[0].values.toArray();
    var childNodes = data[0].fields[1].values.toArray();
    var callCountArr = data[0].fields[2].values.toArray();
    var min_scale = 1;
    var max_scale = 6;
    var min_val = arrayMin(callCountArr);
    var max_val = arrayMax(callCountArr); //console.log("Printing min and max values ");

    var dbs = ['mysql', 'postgre', 'postgresql', 'sql', 'oracle'];
    var msg_bus = ['redis', 'kafka', 'rabbitmq']; //console.log("printing simple arrays");
    //console.log(dbs);

    var array_of_nodes = [];
    var array_of_edges = [];
    var uniqueNodes = parentNodes.concat(childNodes).sort(); //added sort()
    //console.log(uniqueNodes);

    uniqueNodes = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"])(new Set(uniqueNodes)); //works

    console.log(uniqueNodes);
    var metricsData = [];

    for (var i = 0; i < uniqueNodes.length; ++i) {
      console.log("lengthhhhhhhhh");
      console.log(prometheusData);
      console.log(prometheusData[0]);
      console.log(len(prometheusData).toString());

      for (var j = 0; j < len(prometheusData); ++j) {
        console.log(prometheusData[j][0]);
        console.log(uniqueNodes[i]);

        if (prometheusData[j][0].toLowerCase() == uniqueNodes[i].toLowerCase()) {
          metricsData = prometheusData[j];
          console.log("metric is: ");
          console.log(metricsData);
          prometheusData = prometheusData.slice(0, j).concat(prometheusData.slice(j + 1, prometheusData.length));
          break;
        }
      }

      var label = uniqueNodes[i];
      if (metricsData.length > 0) label = uniqueNodes[i] + ", (" + metricsData[2] + "ms, " + metricsData[3] + "/m)";

      if (dbs.includes(uniqueNodes[i].toLowerCase())) {
        array_of_nodes.push({
          'id': uniqueNodes[i],
          'label': label,
          'shape': "database",
          'color': "gray",
          'size': '20'
        });
      } else if (msg_bus.includes(uniqueNodes[i].toLowerCase())) {
        array_of_nodes.push({
          'id': uniqueNodes[i],
          'label': label,
          'shape': "box",
          'color': "#964B00"
        });
      } else {
        array_of_nodes.push({
          'id': uniqueNodes[i],
          'label': label
        });
      }
    }

    console.log("Array of graph nodes");
    console.log(array_of_nodes);

    for (var i = 0; i < data[0].fields[0].values.length; ++i) {
      //const fontValuesDict : { [id: string]: fontValues} = { p1: {"align":"middle", "size":9, "face":"arial", "color":"black"}};
      array_of_edges.push({
        "from": parentNodes[i],
        "to": childNodes[i],
        "arrows": "to",
        'label': callCountArr[i].toString() + "calls",
        "font": {
          "align": "middle",
          "size": 9,
          "face": "arial",
          "color": "black"
        },
        "width": measureScalingFactorForEdge(callCountArr[i], min_scale, max_scale, min_val, max_val)
      });
    }

    console.log("PRINTING array_of_edges ");
    console.log(array_of_edges);
    responseArray.push(array_of_nodes);
    responseArray.push(array_of_edges);
    responseArray.push({
      interaction: {
        hover: true
      },
      nodes: {
        borderWidth: 0.5,
        borderWidthSelected: 0.5,
        chosen: true,
        color: {
          border: '#000000',
          background: '#6d9830',
          highlight: {
            border: '#2B7CE9',
            background: '#D2E5FF'
          },
          hover: {
            border: '#6ee883',
            background: '#6ee883'
          }
        },
        fixed: {
          x: true,
          y: true
        },
        font: {
          color: '#800080',
          size: 11,
          face: 'arial',
          background: 'none',
          strokeWidth: 0,
          strokeColor: '#ffffff',
          align: 'center',
          multi: false,
          vadjust: 0,
          bold: {
            color: '#800080',
            face: 'arial',
            vadjust: 0,
            mod: 'bold'
          }
        },
        heightConstraint: true,
        size: 25
      },
      edges: {
        arrows: {
          to: {
            enabled: false,
            scaleFactor: 0.4,
            type: "arrow"
          }
        },
        length: 130,
        hoverWidth: 0.5,
        selectionWidth: 0.5,
        color: {
          color: '#848484',
          highlight: '#848484',
          hover: '#000000',
          inherit: 'from',
          opacity: 1.0
        },
        labelHighlightBold: true,
        font: {
          size: 15,
          strokeWidth: 2,
          strokeColor: '#848484'
        }
      }
    });
    return responseArray;
  } else {
    if (data[0].fields[0].values.length < 1) console.log("No data found..");else console.log("Problem: Invalid column sequence detected");
    return [[], [], []];
  }
}
/*
interface myDictEdges {
    from: string;
    to: string;
    arrows: string;
    label: string;
    //font: { [key: string]: fontValues};
    font: fontValues;
    width: number;
}

interface fontValues {
    align: string;
    size: number;
    face: string;
    color: string;
}
*/

function len(arr) {
  var count = 0;

  for (var k in arr) {
    if (arr.hasOwnProperty(k)) {
      count++;
    }
  }

  return count;
}

function arrayMin(arr) {
  var len = arr.length,
      min = Infinity;

  while (len--) {
    if (arr[len] < min) {
      min = arr[len];
    }
  }

  return min;
}

;

function arrayMax(arr) {
  var len = arr.length,
      max = -Infinity;

  while (len--) {
    if (arr[len] > max) {
      max = arr[len];
    }
  }

  return max;
}

;

function measureScalingFactorForEdge(x, minScale, maxScale, minVal, maxVal) {
  return (maxScale - minScale) * (x - minVal) / (maxVal - minVal) + minScale;
}

var FormNetwork =
/** @class */
function () {
  function FormNetwork() {}

  return FormNetwork;
}();



/***/ }),

/***/ "./tool-frontend/src/style/App.css":
/*!*****************************************!*\
  !*** ./tool-frontend/src/style/App.css ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../../../node_modules/postcss-loader/src??ref--8-2!../../../../node_modules/sass-loader/lib/loader.js!./App.css */ "../node_modules/css-loader/dist/cjs.js?!../node_modules/postcss-loader/src/index.js?!../node_modules/sass-loader/lib/loader.js!./tool-frontend/src/style/App.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../node_modules/style-loader/lib/addStyles.js */ "../node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./types.ts":
/*!******************!*\
  !*** ./types.ts ***!
  \******************/
/*! exports provided: defaults */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaults", function() { return defaults; });
var defaults = {
  text: 'The default text!'
};

/***/ }),

/***/ "@grafana/data":
/*!********************************!*\
  !*** external "@grafana/data" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__grafana_data__;

/***/ }),

/***/ "@grafana/ui":
/*!******************************!*\
  !*** external "@grafana/ui" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__grafana_ui__;

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_react__;

/***/ })

/******/ })});;
//# sourceMappingURL=module.js.map