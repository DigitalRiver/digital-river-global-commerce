/******/ (function(modules) { // webpackBootstrap
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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 20);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*!
 * jQuery JavaScript Library v3.5.1
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2020-05-04T22:49Z
 */
(function (global, factory) {
  "use strict";

  if (( false ? undefined : _typeof(module)) === "object" && _typeof(module.exports) === "object") {
    // For CommonJS and CommonJS-like environments where a proper `window`
    // is present, execute the factory and get jQuery.
    // For environments that do not have a `window` with a `document`
    // (such as Node.js), expose a factory as module.exports.
    // This accentuates the need for the creation of a real `window`.
    // e.g. var jQuery = require("jquery")(window);
    // See ticket #14549 for more info.
    module.exports = global.document ? factory(global, true) : function (w) {
      if (!w.document) {
        throw new Error("jQuery requires a window with a document");
      }

      return factory(w);
    };
  } else {
    factory(global);
  } // Pass this if window is not defined yet

})(typeof window !== "undefined" ? window : this, function (window, noGlobal) {
  // Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
  // throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
  // arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
  // enough that all such attempts are guarded in a try block.
  "use strict";

  var arr = [];
  var getProto = Object.getPrototypeOf;
  var _slice = arr.slice;
  var flat = arr.flat ? function (array) {
    return arr.flat.call(array);
  } : function (array) {
    return arr.concat.apply([], array);
  };
  var push = arr.push;
  var indexOf = arr.indexOf;
  var class2type = {};
  var toString = class2type.toString;
  var hasOwn = class2type.hasOwnProperty;
  var fnToString = hasOwn.toString;
  var ObjectFunctionString = fnToString.call(Object);
  var support = {};

  var isFunction = function isFunction(obj) {
    // Support: Chrome <=57, Firefox <=52
    // In some browsers, typeof returns "function" for HTML <object> elements
    // (i.e., `typeof document.createElement( "object" ) === "function"`).
    // We don't want to classify *any* DOM node as a function.
    return typeof obj === "function" && typeof obj.nodeType !== "number";
  };

  var isWindow = function isWindow(obj) {
    return obj != null && obj === obj.window;
  };

  var document = window.document;
  var preservedScriptAttributes = {
    type: true,
    src: true,
    nonce: true,
    noModule: true
  };

  function DOMEval(code, node, doc) {
    doc = doc || document;
    var i,
        val,
        script = doc.createElement("script");
    script.text = code;

    if (node) {
      for (i in preservedScriptAttributes) {
        // Support: Firefox 64+, Edge 18+
        // Some browsers don't support the "nonce" property on scripts.
        // On the other hand, just using `getAttribute` is not enough as
        // the `nonce` attribute is reset to an empty string whenever it
        // becomes browsing-context connected.
        // See https://github.com/whatwg/html/issues/2369
        // See https://html.spec.whatwg.org/#nonce-attributes
        // The `node.getAttribute` check was added for the sake of
        // `jQuery.globalEval` so that it can fake a nonce-containing node
        // via an object.
        val = node[i] || node.getAttribute && node.getAttribute(i);

        if (val) {
          script.setAttribute(i, val);
        }
      }
    }

    doc.head.appendChild(script).parentNode.removeChild(script);
  }

  function toType(obj) {
    if (obj == null) {
      return obj + "";
    } // Support: Android <=2.3 only (functionish RegExp)


    return _typeof(obj) === "object" || typeof obj === "function" ? class2type[toString.call(obj)] || "object" : _typeof(obj);
  }
  /* global Symbol */
  // Defining this global in .eslintrc.json would create a danger of using the global
  // unguarded in another place, it seems safer to define global only for this module


  var version = "3.5.1",
      // Define a local copy of jQuery
  jQuery = function jQuery(selector, context) {
    // The jQuery object is actually just the init constructor 'enhanced'
    // Need init if jQuery is called (just allow error to be thrown if not included)
    return new jQuery.fn.init(selector, context);
  };

  jQuery.fn = jQuery.prototype = {
    // The current version of jQuery being used
    jquery: version,
    constructor: jQuery,
    // The default length of a jQuery object is 0
    length: 0,
    toArray: function toArray() {
      return _slice.call(this);
    },
    // Get the Nth element in the matched element set OR
    // Get the whole matched element set as a clean array
    get: function get(num) {
      // Return all the elements in a clean array
      if (num == null) {
        return _slice.call(this);
      } // Return just the one element from the set


      return num < 0 ? this[num + this.length] : this[num];
    },
    // Take an array of elements and push it onto the stack
    // (returning the new matched element set)
    pushStack: function pushStack(elems) {
      // Build a new jQuery matched element set
      var ret = jQuery.merge(this.constructor(), elems); // Add the old object onto the stack (as a reference)

      ret.prevObject = this; // Return the newly-formed element set

      return ret;
    },
    // Execute a callback for every element in the matched set.
    each: function each(callback) {
      return jQuery.each(this, callback);
    },
    map: function map(callback) {
      return this.pushStack(jQuery.map(this, function (elem, i) {
        return callback.call(elem, i, elem);
      }));
    },
    slice: function slice() {
      return this.pushStack(_slice.apply(this, arguments));
    },
    first: function first() {
      return this.eq(0);
    },
    last: function last() {
      return this.eq(-1);
    },
    even: function even() {
      return this.pushStack(jQuery.grep(this, function (_elem, i) {
        return (i + 1) % 2;
      }));
    },
    odd: function odd() {
      return this.pushStack(jQuery.grep(this, function (_elem, i) {
        return i % 2;
      }));
    },
    eq: function eq(i) {
      var len = this.length,
          j = +i + (i < 0 ? len : 0);
      return this.pushStack(j >= 0 && j < len ? [this[j]] : []);
    },
    end: function end() {
      return this.prevObject || this.constructor();
    },
    // For internal use only.
    // Behaves like an Array's method, not like a jQuery method.
    push: push,
    sort: arr.sort,
    splice: arr.splice
  };

  jQuery.extend = jQuery.fn.extend = function () {
    var options,
        name,
        src,
        copy,
        copyIsArray,
        clone,
        target = arguments[0] || {},
        i = 1,
        length = arguments.length,
        deep = false; // Handle a deep copy situation

    if (typeof target === "boolean") {
      deep = target; // Skip the boolean and the target

      target = arguments[i] || {};
      i++;
    } // Handle case when target is a string or something (possible in deep copy)


    if (_typeof(target) !== "object" && !isFunction(target)) {
      target = {};
    } // Extend jQuery itself if only one argument is passed


    if (i === length) {
      target = this;
      i--;
    }

    for (; i < length; i++) {
      // Only deal with non-null/undefined values
      if ((options = arguments[i]) != null) {
        // Extend the base object
        for (name in options) {
          copy = options[name]; // Prevent Object.prototype pollution
          // Prevent never-ending loop

          if (name === "__proto__" || target === copy) {
            continue;
          } // Recurse if we're merging plain objects or arrays


          if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {
            src = target[name]; // Ensure proper type for the source value

            if (copyIsArray && !Array.isArray(src)) {
              clone = [];
            } else if (!copyIsArray && !jQuery.isPlainObject(src)) {
              clone = {};
            } else {
              clone = src;
            }

            copyIsArray = false; // Never move original objects, clone them

            target[name] = jQuery.extend(deep, clone, copy); // Don't bring in undefined values
          } else if (copy !== undefined) {
            target[name] = copy;
          }
        }
      }
    } // Return the modified object


    return target;
  };

  jQuery.extend({
    // Unique for each copy of jQuery on the page
    expando: "jQuery" + (version + Math.random()).replace(/\D/g, ""),
    // Assume jQuery is ready without the ready module
    isReady: true,
    error: function error(msg) {
      throw new Error(msg);
    },
    noop: function noop() {},
    isPlainObject: function isPlainObject(obj) {
      var proto, Ctor; // Detect obvious negatives
      // Use toString instead of jQuery.type to catch host objects

      if (!obj || toString.call(obj) !== "[object Object]") {
        return false;
      }

      proto = getProto(obj); // Objects with no prototype (e.g., `Object.create( null )`) are plain

      if (!proto) {
        return true;
      } // Objects with prototype are plain iff they were constructed by a global Object function


      Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
      return typeof Ctor === "function" && fnToString.call(Ctor) === ObjectFunctionString;
    },
    isEmptyObject: function isEmptyObject(obj) {
      var name;

      for (name in obj) {
        return false;
      }

      return true;
    },
    // Evaluates a script in a provided context; falls back to the global one
    // if not specified.
    globalEval: function globalEval(code, options, doc) {
      DOMEval(code, {
        nonce: options && options.nonce
      }, doc);
    },
    each: function each(obj, callback) {
      var length,
          i = 0;

      if (isArrayLike(obj)) {
        length = obj.length;

        for (; i < length; i++) {
          if (callback.call(obj[i], i, obj[i]) === false) {
            break;
          }
        }
      } else {
        for (i in obj) {
          if (callback.call(obj[i], i, obj[i]) === false) {
            break;
          }
        }
      }

      return obj;
    },
    // results is for internal usage only
    makeArray: function makeArray(arr, results) {
      var ret = results || [];

      if (arr != null) {
        if (isArrayLike(Object(arr))) {
          jQuery.merge(ret, typeof arr === "string" ? [arr] : arr);
        } else {
          push.call(ret, arr);
        }
      }

      return ret;
    },
    inArray: function inArray(elem, arr, i) {
      return arr == null ? -1 : indexOf.call(arr, elem, i);
    },
    // Support: Android <=4.0 only, PhantomJS 1 only
    // push.apply(_, arraylike) throws on ancient WebKit
    merge: function merge(first, second) {
      var len = +second.length,
          j = 0,
          i = first.length;

      for (; j < len; j++) {
        first[i++] = second[j];
      }

      first.length = i;
      return first;
    },
    grep: function grep(elems, callback, invert) {
      var callbackInverse,
          matches = [],
          i = 0,
          length = elems.length,
          callbackExpect = !invert; // Go through the array, only saving the items
      // that pass the validator function

      for (; i < length; i++) {
        callbackInverse = !callback(elems[i], i);

        if (callbackInverse !== callbackExpect) {
          matches.push(elems[i]);
        }
      }

      return matches;
    },
    // arg is for internal usage only
    map: function map(elems, callback, arg) {
      var length,
          value,
          i = 0,
          ret = []; // Go through the array, translating each of the items to their new values

      if (isArrayLike(elems)) {
        length = elems.length;

        for (; i < length; i++) {
          value = callback(elems[i], i, arg);

          if (value != null) {
            ret.push(value);
          }
        } // Go through every key on the object,

      } else {
        for (i in elems) {
          value = callback(elems[i], i, arg);

          if (value != null) {
            ret.push(value);
          }
        }
      } // Flatten any nested arrays


      return flat(ret);
    },
    // A global GUID counter for objects
    guid: 1,
    // jQuery.support is not used in Core but other projects attach their
    // properties to it so it needs to exist.
    support: support
  });

  if (typeof Symbol === "function") {
    jQuery.fn[Symbol.iterator] = arr[Symbol.iterator];
  } // Populate the class2type map


  jQuery.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function (_i, name) {
    class2type["[object " + name + "]"] = name.toLowerCase();
  });

  function isArrayLike(obj) {
    // Support: real iOS 8.2 only (not reproducible in simulator)
    // `in` check used to prevent JIT error (gh-2145)
    // hasOwn isn't used here due to false negatives
    // regarding Nodelist length in IE
    var length = !!obj && "length" in obj && obj.length,
        type = toType(obj);

    if (isFunction(obj) || isWindow(obj)) {
      return false;
    }

    return type === "array" || length === 0 || typeof length === "number" && length > 0 && length - 1 in obj;
  }

  var Sizzle =
  /*!
   * Sizzle CSS Selector Engine v2.3.5
   * https://sizzlejs.com/
   *
   * Copyright JS Foundation and other contributors
   * Released under the MIT license
   * https://js.foundation/
   *
   * Date: 2020-03-14
   */
  function (window) {
    var i,
        support,
        Expr,
        getText,
        isXML,
        tokenize,
        compile,
        select,
        outermostContext,
        sortInput,
        hasDuplicate,
        // Local document vars
    setDocument,
        document,
        docElem,
        documentIsHTML,
        rbuggyQSA,
        rbuggyMatches,
        matches,
        contains,
        // Instance-specific data
    expando = "sizzle" + 1 * new Date(),
        preferredDoc = window.document,
        dirruns = 0,
        done = 0,
        classCache = createCache(),
        tokenCache = createCache(),
        compilerCache = createCache(),
        nonnativeSelectorCache = createCache(),
        sortOrder = function sortOrder(a, b) {
      if (a === b) {
        hasDuplicate = true;
      }

      return 0;
    },
        // Instance methods
    hasOwn = {}.hasOwnProperty,
        arr = [],
        pop = arr.pop,
        pushNative = arr.push,
        push = arr.push,
        slice = arr.slice,
        // Use a stripped-down indexOf as it's faster than native
    // https://jsperf.com/thor-indexof-vs-for/5
    indexOf = function indexOf(list, elem) {
      var i = 0,
          len = list.length;

      for (; i < len; i++) {
        if (list[i] === elem) {
          return i;
        }
      }

      return -1;
    },
        booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|" + "ismap|loop|multiple|open|readonly|required|scoped",
        // Regular expressions
    // http://www.w3.org/TR/css3-selectors/#whitespace
    whitespace = "[\\x20\\t\\r\\n\\f]",
        // https://www.w3.org/TR/css-syntax-3/#ident-token-diagram
    identifier = "(?:\\\\[\\da-fA-F]{1,6}" + whitespace + "?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+",
        // Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
    attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace + // Operator (capture 2)
    "*([*^$|!~]?=)" + whitespace + // "Attribute values must be CSS identifiers [capture 5]
    // or strings [capture 3 or capture 4]"
    "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace + "*\\]",
        pseudos = ":(" + identifier + ")(?:\\((" + // To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
    // 1. quoted (capture 3; capture 4 or capture 5)
    "('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" + // 2. simple (capture 6)
    "((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" + // 3. anything else (capture 2)
    ".*" + ")\\)|)",
        // Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
    rwhitespace = new RegExp(whitespace + "+", "g"),
        rtrim = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g"),
        rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"),
        rcombinators = new RegExp("^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*"),
        rdescend = new RegExp(whitespace + "|>"),
        rpseudo = new RegExp(pseudos),
        ridentifier = new RegExp("^" + identifier + "$"),
        matchExpr = {
      "ID": new RegExp("^#(" + identifier + ")"),
      "CLASS": new RegExp("^\\.(" + identifier + ")"),
      "TAG": new RegExp("^(" + identifier + "|[*])"),
      "ATTR": new RegExp("^" + attributes),
      "PSEUDO": new RegExp("^" + pseudos),
      "CHILD": new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i"),
      "bool": new RegExp("^(?:" + booleans + ")$", "i"),
      // For use in libraries implementing .is()
      // We use this for POS matching in `select`
      "needsContext": new RegExp("^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i")
    },
        rhtml = /HTML$/i,
        rinputs = /^(?:input|select|textarea|button)$/i,
        rheader = /^h\d$/i,
        rnative = /^[^{]+\{\s*\[native \w/,
        // Easily-parseable/retrievable ID or TAG or CLASS selectors
    rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
        rsibling = /[+~]/,
        // CSS escapes
    // http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
    runescape = new RegExp("\\\\[\\da-fA-F]{1,6}" + whitespace + "?|\\\\([^\\r\\n\\f])", "g"),
        funescape = function funescape(escape, nonHex) {
      var high = "0x" + escape.slice(1) - 0x10000;
      return nonHex ? // Strip the backslash prefix from a non-hex escape sequence
      nonHex : // Replace a hexadecimal escape sequence with the encoded Unicode code point
      // Support: IE <=11+
      // For values outside the Basic Multilingual Plane (BMP), manually construct a
      // surrogate pair
      high < 0 ? String.fromCharCode(high + 0x10000) : String.fromCharCode(high >> 10 | 0xD800, high & 0x3FF | 0xDC00);
    },
        // CSS string/identifier serialization
    // https://drafts.csswg.org/cssom/#common-serializing-idioms
    rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
        fcssescape = function fcssescape(ch, asCodePoint) {
      if (asCodePoint) {
        // U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
        if (ch === "\0") {
          return "\uFFFD";
        } // Control characters and (dependent upon position) numbers get escaped as code points


        return ch.slice(0, -1) + "\\" + ch.charCodeAt(ch.length - 1).toString(16) + " ";
      } // Other potentially-special ASCII characters get backslash-escaped


      return "\\" + ch;
    },
        // Used for iframes
    // See setDocument()
    // Removing the function wrapper causes a "Permission Denied"
    // error in IE
    unloadHandler = function unloadHandler() {
      setDocument();
    },
        inDisabledFieldset = addCombinator(function (elem) {
      return elem.disabled === true && elem.nodeName.toLowerCase() === "fieldset";
    }, {
      dir: "parentNode",
      next: "legend"
    }); // Optimize for push.apply( _, NodeList )


    try {
      push.apply(arr = slice.call(preferredDoc.childNodes), preferredDoc.childNodes); // Support: Android<4.0
      // Detect silently failing push.apply
      // eslint-disable-next-line no-unused-expressions

      arr[preferredDoc.childNodes.length].nodeType;
    } catch (e) {
      push = {
        apply: arr.length ? // Leverage slice if possible
        function (target, els) {
          pushNative.apply(target, slice.call(els));
        } : // Support: IE<9
        // Otherwise append directly
        function (target, els) {
          var j = target.length,
              i = 0; // Can't trust NodeList.length

          while (target[j++] = els[i++]) {}

          target.length = j - 1;
        }
      };
    }

    function Sizzle(selector, context, results, seed) {
      var m,
          i,
          elem,
          nid,
          match,
          groups,
          newSelector,
          newContext = context && context.ownerDocument,
          // nodeType defaults to 9, since context defaults to document
      nodeType = context ? context.nodeType : 9;
      results = results || []; // Return early from calls with invalid selector or context

      if (typeof selector !== "string" || !selector || nodeType !== 1 && nodeType !== 9 && nodeType !== 11) {
        return results;
      } // Try to shortcut find operations (as opposed to filters) in HTML documents


      if (!seed) {
        setDocument(context);
        context = context || document;

        if (documentIsHTML) {
          // If the selector is sufficiently simple, try using a "get*By*" DOM method
          // (excepting DocumentFragment context, where the methods don't exist)
          if (nodeType !== 11 && (match = rquickExpr.exec(selector))) {
            // ID selector
            if (m = match[1]) {
              // Document context
              if (nodeType === 9) {
                if (elem = context.getElementById(m)) {
                  // Support: IE, Opera, Webkit
                  // TODO: identify versions
                  // getElementById can match elements by name instead of ID
                  if (elem.id === m) {
                    results.push(elem);
                    return results;
                  }
                } else {
                  return results;
                } // Element context

              } else {
                // Support: IE, Opera, Webkit
                // TODO: identify versions
                // getElementById can match elements by name instead of ID
                if (newContext && (elem = newContext.getElementById(m)) && contains(context, elem) && elem.id === m) {
                  results.push(elem);
                  return results;
                }
              } // Type selector

            } else if (match[2]) {
              push.apply(results, context.getElementsByTagName(selector));
              return results; // Class selector
            } else if ((m = match[3]) && support.getElementsByClassName && context.getElementsByClassName) {
              push.apply(results, context.getElementsByClassName(m));
              return results;
            }
          } // Take advantage of querySelectorAll


          if (support.qsa && !nonnativeSelectorCache[selector + " "] && (!rbuggyQSA || !rbuggyQSA.test(selector)) && ( // Support: IE 8 only
          // Exclude object elements
          nodeType !== 1 || context.nodeName.toLowerCase() !== "object")) {
            newSelector = selector;
            newContext = context; // qSA considers elements outside a scoping root when evaluating child or
            // descendant combinators, which is not what we want.
            // In such cases, we work around the behavior by prefixing every selector in the
            // list with an ID selector referencing the scope context.
            // The technique has to be used as well when a leading combinator is used
            // as such selectors are not recognized by querySelectorAll.
            // Thanks to Andrew Dupont for this technique.

            if (nodeType === 1 && (rdescend.test(selector) || rcombinators.test(selector))) {
              // Expand context for sibling selectors
              newContext = rsibling.test(selector) && testContext(context.parentNode) || context; // We can use :scope instead of the ID hack if the browser
              // supports it & if we're not changing the context.

              if (newContext !== context || !support.scope) {
                // Capture the context ID, setting it first if necessary
                if (nid = context.getAttribute("id")) {
                  nid = nid.replace(rcssescape, fcssescape);
                } else {
                  context.setAttribute("id", nid = expando);
                }
              } // Prefix every selector in the list


              groups = tokenize(selector);
              i = groups.length;

              while (i--) {
                groups[i] = (nid ? "#" + nid : ":scope") + " " + toSelector(groups[i]);
              }

              newSelector = groups.join(",");
            }

            try {
              push.apply(results, newContext.querySelectorAll(newSelector));
              return results;
            } catch (qsaError) {
              nonnativeSelectorCache(selector, true);
            } finally {
              if (nid === expando) {
                context.removeAttribute("id");
              }
            }
          }
        }
      } // All others


      return select(selector.replace(rtrim, "$1"), context, results, seed);
    }
    /**
     * Create key-value caches of limited size
     * @returns {function(string, object)} Returns the Object data after storing it on itself with
     *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
     *	deleting the oldest entry
     */


    function createCache() {
      var keys = [];

      function cache(key, value) {
        // Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
        if (keys.push(key + " ") > Expr.cacheLength) {
          // Only keep the most recent entries
          delete cache[keys.shift()];
        }

        return cache[key + " "] = value;
      }

      return cache;
    }
    /**
     * Mark a function for special use by Sizzle
     * @param {Function} fn The function to mark
     */


    function markFunction(fn) {
      fn[expando] = true;
      return fn;
    }
    /**
     * Support testing using an element
     * @param {Function} fn Passed the created element and returns a boolean result
     */


    function assert(fn) {
      var el = document.createElement("fieldset");

      try {
        return !!fn(el);
      } catch (e) {
        return false;
      } finally {
        // Remove from its parent by default
        if (el.parentNode) {
          el.parentNode.removeChild(el);
        } // release memory in IE


        el = null;
      }
    }
    /**
     * Adds the same handler for all of the specified attrs
     * @param {String} attrs Pipe-separated list of attributes
     * @param {Function} handler The method that will be applied
     */


    function addHandle(attrs, handler) {
      var arr = attrs.split("|"),
          i = arr.length;

      while (i--) {
        Expr.attrHandle[arr[i]] = handler;
      }
    }
    /**
     * Checks document order of two siblings
     * @param {Element} a
     * @param {Element} b
     * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
     */


    function siblingCheck(a, b) {
      var cur = b && a,
          diff = cur && a.nodeType === 1 && b.nodeType === 1 && a.sourceIndex - b.sourceIndex; // Use IE sourceIndex if available on both nodes

      if (diff) {
        return diff;
      } // Check if b follows a


      if (cur) {
        while (cur = cur.nextSibling) {
          if (cur === b) {
            return -1;
          }
        }
      }

      return a ? 1 : -1;
    }
    /**
     * Returns a function to use in pseudos for input types
     * @param {String} type
     */


    function createInputPseudo(type) {
      return function (elem) {
        var name = elem.nodeName.toLowerCase();
        return name === "input" && elem.type === type;
      };
    }
    /**
     * Returns a function to use in pseudos for buttons
     * @param {String} type
     */


    function createButtonPseudo(type) {
      return function (elem) {
        var name = elem.nodeName.toLowerCase();
        return (name === "input" || name === "button") && elem.type === type;
      };
    }
    /**
     * Returns a function to use in pseudos for :enabled/:disabled
     * @param {Boolean} disabled true for :disabled; false for :enabled
     */


    function createDisabledPseudo(disabled) {
      // Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
      return function (elem) {
        // Only certain elements can match :enabled or :disabled
        // https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
        // https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
        if ("form" in elem) {
          // Check for inherited disabledness on relevant non-disabled elements:
          // * listed form-associated elements in a disabled fieldset
          //   https://html.spec.whatwg.org/multipage/forms.html#category-listed
          //   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
          // * option elements in a disabled optgroup
          //   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
          // All such elements have a "form" property.
          if (elem.parentNode && elem.disabled === false) {
            // Option elements defer to a parent optgroup if present
            if ("label" in elem) {
              if ("label" in elem.parentNode) {
                return elem.parentNode.disabled === disabled;
              } else {
                return elem.disabled === disabled;
              }
            } // Support: IE 6 - 11
            // Use the isDisabled shortcut property to check for disabled fieldset ancestors


            return elem.isDisabled === disabled || // Where there is no isDisabled, check manually

            /* jshint -W018 */
            elem.isDisabled !== !disabled && inDisabledFieldset(elem) === disabled;
          }

          return elem.disabled === disabled; // Try to winnow out elements that can't be disabled before trusting the disabled property.
          // Some victims get caught in our net (label, legend, menu, track), but it shouldn't
          // even exist on them, let alone have a boolean value.
        } else if ("label" in elem) {
          return elem.disabled === disabled;
        } // Remaining elements are neither :enabled nor :disabled


        return false;
      };
    }
    /**
     * Returns a function to use in pseudos for positionals
     * @param {Function} fn
     */


    function createPositionalPseudo(fn) {
      return markFunction(function (argument) {
        argument = +argument;
        return markFunction(function (seed, matches) {
          var j,
              matchIndexes = fn([], seed.length, argument),
              i = matchIndexes.length; // Match elements found at the specified indexes

          while (i--) {
            if (seed[j = matchIndexes[i]]) {
              seed[j] = !(matches[j] = seed[j]);
            }
          }
        });
      });
    }
    /**
     * Checks a node for validity as a Sizzle context
     * @param {Element|Object=} context
     * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
     */


    function testContext(context) {
      return context && typeof context.getElementsByTagName !== "undefined" && context;
    } // Expose support vars for convenience


    support = Sizzle.support = {};
    /**
     * Detects XML nodes
     * @param {Element|Object} elem An element or a document
     * @returns {Boolean} True iff elem is a non-HTML XML node
     */

    isXML = Sizzle.isXML = function (elem) {
      var namespace = elem.namespaceURI,
          docElem = (elem.ownerDocument || elem).documentElement; // Support: IE <=8
      // Assume HTML when documentElement doesn't yet exist, such as inside loading iframes
      // https://bugs.jquery.com/ticket/4833

      return !rhtml.test(namespace || docElem && docElem.nodeName || "HTML");
    };
    /**
     * Sets document-related variables once based on the current document
     * @param {Element|Object} [doc] An element or document object to use to set the document
     * @returns {Object} Returns the current document
     */


    setDocument = Sizzle.setDocument = function (node) {
      var hasCompare,
          subWindow,
          doc = node ? node.ownerDocument || node : preferredDoc; // Return early if doc is invalid or already selected
      // Support: IE 11+, Edge 17 - 18+
      // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
      // two documents; shallow comparisons work.
      // eslint-disable-next-line eqeqeq

      if (doc == document || doc.nodeType !== 9 || !doc.documentElement) {
        return document;
      } // Update global variables


      document = doc;
      docElem = document.documentElement;
      documentIsHTML = !isXML(document); // Support: IE 9 - 11+, Edge 12 - 18+
      // Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
      // Support: IE 11+, Edge 17 - 18+
      // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
      // two documents; shallow comparisons work.
      // eslint-disable-next-line eqeqeq

      if (preferredDoc != document && (subWindow = document.defaultView) && subWindow.top !== subWindow) {
        // Support: IE 11, Edge
        if (subWindow.addEventListener) {
          subWindow.addEventListener("unload", unloadHandler, false); // Support: IE 9 - 10 only
        } else if (subWindow.attachEvent) {
          subWindow.attachEvent("onunload", unloadHandler);
        }
      } // Support: IE 8 - 11+, Edge 12 - 18+, Chrome <=16 - 25 only, Firefox <=3.6 - 31 only,
      // Safari 4 - 5 only, Opera <=11.6 - 12.x only
      // IE/Edge & older browsers don't support the :scope pseudo-class.
      // Support: Safari 6.0 only
      // Safari 6.0 supports :scope but it's an alias of :root there.


      support.scope = assert(function (el) {
        docElem.appendChild(el).appendChild(document.createElement("div"));
        return typeof el.querySelectorAll !== "undefined" && !el.querySelectorAll(":scope fieldset div").length;
      });
      /* Attributes
      ---------------------------------------------------------------------- */
      // Support: IE<8
      // Verify that getAttribute really returns attributes and not properties
      // (excepting IE8 booleans)

      support.attributes = assert(function (el) {
        el.className = "i";
        return !el.getAttribute("className");
      });
      /* getElement(s)By*
      ---------------------------------------------------------------------- */
      // Check if getElementsByTagName("*") returns only elements

      support.getElementsByTagName = assert(function (el) {
        el.appendChild(document.createComment(""));
        return !el.getElementsByTagName("*").length;
      }); // Support: IE<9

      support.getElementsByClassName = rnative.test(document.getElementsByClassName); // Support: IE<10
      // Check if getElementById returns elements by name
      // The broken getElementById methods don't pick up programmatically-set names,
      // so use a roundabout getElementsByName test

      support.getById = assert(function (el) {
        docElem.appendChild(el).id = expando;
        return !document.getElementsByName || !document.getElementsByName(expando).length;
      }); // ID filter and find

      if (support.getById) {
        Expr.filter["ID"] = function (id) {
          var attrId = id.replace(runescape, funescape);
          return function (elem) {
            return elem.getAttribute("id") === attrId;
          };
        };

        Expr.find["ID"] = function (id, context) {
          if (typeof context.getElementById !== "undefined" && documentIsHTML) {
            var elem = context.getElementById(id);
            return elem ? [elem] : [];
          }
        };
      } else {
        Expr.filter["ID"] = function (id) {
          var attrId = id.replace(runescape, funescape);
          return function (elem) {
            var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
            return node && node.value === attrId;
          };
        }; // Support: IE 6 - 7 only
        // getElementById is not reliable as a find shortcut


        Expr.find["ID"] = function (id, context) {
          if (typeof context.getElementById !== "undefined" && documentIsHTML) {
            var node,
                i,
                elems,
                elem = context.getElementById(id);

            if (elem) {
              // Verify the id attribute
              node = elem.getAttributeNode("id");

              if (node && node.value === id) {
                return [elem];
              } // Fall back on getElementsByName


              elems = context.getElementsByName(id);
              i = 0;

              while (elem = elems[i++]) {
                node = elem.getAttributeNode("id");

                if (node && node.value === id) {
                  return [elem];
                }
              }
            }

            return [];
          }
        };
      } // Tag


      Expr.find["TAG"] = support.getElementsByTagName ? function (tag, context) {
        if (typeof context.getElementsByTagName !== "undefined") {
          return context.getElementsByTagName(tag); // DocumentFragment nodes don't have gEBTN
        } else if (support.qsa) {
          return context.querySelectorAll(tag);
        }
      } : function (tag, context) {
        var elem,
            tmp = [],
            i = 0,
            // By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
        results = context.getElementsByTagName(tag); // Filter out possible comments

        if (tag === "*") {
          while (elem = results[i++]) {
            if (elem.nodeType === 1) {
              tmp.push(elem);
            }
          }

          return tmp;
        }

        return results;
      }; // Class

      Expr.find["CLASS"] = support.getElementsByClassName && function (className, context) {
        if (typeof context.getElementsByClassName !== "undefined" && documentIsHTML) {
          return context.getElementsByClassName(className);
        }
      };
      /* QSA/matchesSelector
      ---------------------------------------------------------------------- */
      // QSA and matchesSelector support
      // matchesSelector(:active) reports false when true (IE9/Opera 11.5)


      rbuggyMatches = []; // qSa(:focus) reports false when true (Chrome 21)
      // We allow this because of a bug in IE8/9 that throws an error
      // whenever `document.activeElement` is accessed on an iframe
      // So, we allow :focus to pass through QSA all the time to avoid the IE error
      // See https://bugs.jquery.com/ticket/13378

      rbuggyQSA = [];

      if (support.qsa = rnative.test(document.querySelectorAll)) {
        // Build QSA regex
        // Regex strategy adopted from Diego Perini
        assert(function (el) {
          var input; // Select is set to empty string on purpose
          // This is to test IE's treatment of not explicitly
          // setting a boolean content attribute,
          // since its presence should be enough
          // https://bugs.jquery.com/ticket/12359

          docElem.appendChild(el).innerHTML = "<a id='" + expando + "'></a>" + "<select id='" + expando + "-\r\\' msallowcapture=''>" + "<option selected=''></option></select>"; // Support: IE8, Opera 11-12.16
          // Nothing should be selected when empty strings follow ^= or $= or *=
          // The test attribute must be unknown in Opera but "safe" for WinRT
          // https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section

          if (el.querySelectorAll("[msallowcapture^='']").length) {
            rbuggyQSA.push("[*^$]=" + whitespace + "*(?:''|\"\")");
          } // Support: IE8
          // Boolean attributes and "value" are not treated correctly


          if (!el.querySelectorAll("[selected]").length) {
            rbuggyQSA.push("\\[" + whitespace + "*(?:value|" + booleans + ")");
          } // Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+


          if (!el.querySelectorAll("[id~=" + expando + "-]").length) {
            rbuggyQSA.push("~=");
          } // Support: IE 11+, Edge 15 - 18+
          // IE 11/Edge don't find elements on a `[name='']` query in some cases.
          // Adding a temporary attribute to the document before the selection works
          // around the issue.
          // Interestingly, IE 10 & older don't seem to have the issue.


          input = document.createElement("input");
          input.setAttribute("name", "");
          el.appendChild(input);

          if (!el.querySelectorAll("[name='']").length) {
            rbuggyQSA.push("\\[" + whitespace + "*name" + whitespace + "*=" + whitespace + "*(?:''|\"\")");
          } // Webkit/Opera - :checked should return selected option elements
          // http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
          // IE8 throws error here and will not see later tests


          if (!el.querySelectorAll(":checked").length) {
            rbuggyQSA.push(":checked");
          } // Support: Safari 8+, iOS 8+
          // https://bugs.webkit.org/show_bug.cgi?id=136851
          // In-page `selector#id sibling-combinator selector` fails


          if (!el.querySelectorAll("a#" + expando + "+*").length) {
            rbuggyQSA.push(".#.+[+~]");
          } // Support: Firefox <=3.6 - 5 only
          // Old Firefox doesn't throw on a badly-escaped identifier.


          el.querySelectorAll("\\\f");
          rbuggyQSA.push("[\\r\\n\\f]");
        });
        assert(function (el) {
          el.innerHTML = "<a href='' disabled='disabled'></a>" + "<select disabled='disabled'><option/></select>"; // Support: Windows 8 Native Apps
          // The type and name attributes are restricted during .innerHTML assignment

          var input = document.createElement("input");
          input.setAttribute("type", "hidden");
          el.appendChild(input).setAttribute("name", "D"); // Support: IE8
          // Enforce case-sensitivity of name attribute

          if (el.querySelectorAll("[name=d]").length) {
            rbuggyQSA.push("name" + whitespace + "*[*^$|!~]?=");
          } // FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
          // IE8 throws error here and will not see later tests


          if (el.querySelectorAll(":enabled").length !== 2) {
            rbuggyQSA.push(":enabled", ":disabled");
          } // Support: IE9-11+
          // IE's :disabled selector does not pick up the children of disabled fieldsets


          docElem.appendChild(el).disabled = true;

          if (el.querySelectorAll(":disabled").length !== 2) {
            rbuggyQSA.push(":enabled", ":disabled");
          } // Support: Opera 10 - 11 only
          // Opera 10-11 does not throw on post-comma invalid pseudos


          el.querySelectorAll("*,:x");
          rbuggyQSA.push(",.*:");
        });
      }

      if (support.matchesSelector = rnative.test(matches = docElem.matches || docElem.webkitMatchesSelector || docElem.mozMatchesSelector || docElem.oMatchesSelector || docElem.msMatchesSelector)) {
        assert(function (el) {
          // Check to see if it's possible to do matchesSelector
          // on a disconnected node (IE 9)
          support.disconnectedMatch = matches.call(el, "*"); // This should fail with an exception
          // Gecko does not error, returns false instead

          matches.call(el, "[s!='']:x");
          rbuggyMatches.push("!=", pseudos);
        });
      }

      rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|"));
      rbuggyMatches = rbuggyMatches.length && new RegExp(rbuggyMatches.join("|"));
      /* Contains
      ---------------------------------------------------------------------- */

      hasCompare = rnative.test(docElem.compareDocumentPosition); // Element contains another
      // Purposefully self-exclusive
      // As in, an element does not contain itself

      contains = hasCompare || rnative.test(docElem.contains) ? function (a, b) {
        var adown = a.nodeType === 9 ? a.documentElement : a,
            bup = b && b.parentNode;
        return a === bup || !!(bup && bup.nodeType === 1 && (adown.contains ? adown.contains(bup) : a.compareDocumentPosition && a.compareDocumentPosition(bup) & 16));
      } : function (a, b) {
        if (b) {
          while (b = b.parentNode) {
            if (b === a) {
              return true;
            }
          }
        }

        return false;
      };
      /* Sorting
      ---------------------------------------------------------------------- */
      // Document order sorting

      sortOrder = hasCompare ? function (a, b) {
        // Flag for duplicate removal
        if (a === b) {
          hasDuplicate = true;
          return 0;
        } // Sort on method existence if only one input has compareDocumentPosition


        var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;

        if (compare) {
          return compare;
        } // Calculate position if both inputs belong to the same document
        // Support: IE 11+, Edge 17 - 18+
        // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
        // two documents; shallow comparisons work.
        // eslint-disable-next-line eqeqeq


        compare = (a.ownerDocument || a) == (b.ownerDocument || b) ? a.compareDocumentPosition(b) : // Otherwise we know they are disconnected
        1; // Disconnected nodes

        if (compare & 1 || !support.sortDetached && b.compareDocumentPosition(a) === compare) {
          // Choose the first element that is related to our preferred document
          // Support: IE 11+, Edge 17 - 18+
          // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
          // two documents; shallow comparisons work.
          // eslint-disable-next-line eqeqeq
          if (a == document || a.ownerDocument == preferredDoc && contains(preferredDoc, a)) {
            return -1;
          } // Support: IE 11+, Edge 17 - 18+
          // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
          // two documents; shallow comparisons work.
          // eslint-disable-next-line eqeqeq


          if (b == document || b.ownerDocument == preferredDoc && contains(preferredDoc, b)) {
            return 1;
          } // Maintain original order


          return sortInput ? indexOf(sortInput, a) - indexOf(sortInput, b) : 0;
        }

        return compare & 4 ? -1 : 1;
      } : function (a, b) {
        // Exit early if the nodes are identical
        if (a === b) {
          hasDuplicate = true;
          return 0;
        }

        var cur,
            i = 0,
            aup = a.parentNode,
            bup = b.parentNode,
            ap = [a],
            bp = [b]; // Parentless nodes are either documents or disconnected

        if (!aup || !bup) {
          // Support: IE 11+, Edge 17 - 18+
          // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
          // two documents; shallow comparisons work.

          /* eslint-disable eqeqeq */
          return a == document ? -1 : b == document ? 1 :
          /* eslint-enable eqeqeq */
          aup ? -1 : bup ? 1 : sortInput ? indexOf(sortInput, a) - indexOf(sortInput, b) : 0; // If the nodes are siblings, we can do a quick check
        } else if (aup === bup) {
          return siblingCheck(a, b);
        } // Otherwise we need full lists of their ancestors for comparison


        cur = a;

        while (cur = cur.parentNode) {
          ap.unshift(cur);
        }

        cur = b;

        while (cur = cur.parentNode) {
          bp.unshift(cur);
        } // Walk down the tree looking for a discrepancy


        while (ap[i] === bp[i]) {
          i++;
        }

        return i ? // Do a sibling check if the nodes have a common ancestor
        siblingCheck(ap[i], bp[i]) : // Otherwise nodes in our document sort first
        // Support: IE 11+, Edge 17 - 18+
        // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
        // two documents; shallow comparisons work.

        /* eslint-disable eqeqeq */
        ap[i] == preferredDoc ? -1 : bp[i] == preferredDoc ? 1 :
        /* eslint-enable eqeqeq */
        0;
      };
      return document;
    };

    Sizzle.matches = function (expr, elements) {
      return Sizzle(expr, null, null, elements);
    };

    Sizzle.matchesSelector = function (elem, expr) {
      setDocument(elem);

      if (support.matchesSelector && documentIsHTML && !nonnativeSelectorCache[expr + " "] && (!rbuggyMatches || !rbuggyMatches.test(expr)) && (!rbuggyQSA || !rbuggyQSA.test(expr))) {
        try {
          var ret = matches.call(elem, expr); // IE 9's matchesSelector returns false on disconnected nodes

          if (ret || support.disconnectedMatch || // As well, disconnected nodes are said to be in a document
          // fragment in IE 9
          elem.document && elem.document.nodeType !== 11) {
            return ret;
          }
        } catch (e) {
          nonnativeSelectorCache(expr, true);
        }
      }

      return Sizzle(expr, document, null, [elem]).length > 0;
    };

    Sizzle.contains = function (context, elem) {
      // Set document vars if needed
      // Support: IE 11+, Edge 17 - 18+
      // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
      // two documents; shallow comparisons work.
      // eslint-disable-next-line eqeqeq
      if ((context.ownerDocument || context) != document) {
        setDocument(context);
      }

      return contains(context, elem);
    };

    Sizzle.attr = function (elem, name) {
      // Set document vars if needed
      // Support: IE 11+, Edge 17 - 18+
      // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
      // two documents; shallow comparisons work.
      // eslint-disable-next-line eqeqeq
      if ((elem.ownerDocument || elem) != document) {
        setDocument(elem);
      }

      var fn = Expr.attrHandle[name.toLowerCase()],
          // Don't get fooled by Object.prototype properties (jQuery #13807)
      val = fn && hasOwn.call(Expr.attrHandle, name.toLowerCase()) ? fn(elem, name, !documentIsHTML) : undefined;
      return val !== undefined ? val : support.attributes || !documentIsHTML ? elem.getAttribute(name) : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
    };

    Sizzle.escape = function (sel) {
      return (sel + "").replace(rcssescape, fcssescape);
    };

    Sizzle.error = function (msg) {
      throw new Error("Syntax error, unrecognized expression: " + msg);
    };
    /**
     * Document sorting and removing duplicates
     * @param {ArrayLike} results
     */


    Sizzle.uniqueSort = function (results) {
      var elem,
          duplicates = [],
          j = 0,
          i = 0; // Unless we *know* we can detect duplicates, assume their presence

      hasDuplicate = !support.detectDuplicates;
      sortInput = !support.sortStable && results.slice(0);
      results.sort(sortOrder);

      if (hasDuplicate) {
        while (elem = results[i++]) {
          if (elem === results[i]) {
            j = duplicates.push(i);
          }
        }

        while (j--) {
          results.splice(duplicates[j], 1);
        }
      } // Clear input after sorting to release objects
      // See https://github.com/jquery/sizzle/pull/225


      sortInput = null;
      return results;
    };
    /**
     * Utility function for retrieving the text value of an array of DOM nodes
     * @param {Array|Element} elem
     */


    getText = Sizzle.getText = function (elem) {
      var node,
          ret = "",
          i = 0,
          nodeType = elem.nodeType;

      if (!nodeType) {
        // If no nodeType, this is expected to be an array
        while (node = elem[i++]) {
          // Do not traverse comment nodes
          ret += getText(node);
        }
      } else if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
        // Use textContent for elements
        // innerText usage removed for consistency of new lines (jQuery #11153)
        if (typeof elem.textContent === "string") {
          return elem.textContent;
        } else {
          // Traverse its children
          for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
            ret += getText(elem);
          }
        }
      } else if (nodeType === 3 || nodeType === 4) {
        return elem.nodeValue;
      } // Do not include comment or processing instruction nodes


      return ret;
    };

    Expr = Sizzle.selectors = {
      // Can be adjusted by the user
      cacheLength: 50,
      createPseudo: markFunction,
      match: matchExpr,
      attrHandle: {},
      find: {},
      relative: {
        ">": {
          dir: "parentNode",
          first: true
        },
        " ": {
          dir: "parentNode"
        },
        "+": {
          dir: "previousSibling",
          first: true
        },
        "~": {
          dir: "previousSibling"
        }
      },
      preFilter: {
        "ATTR": function ATTR(match) {
          match[1] = match[1].replace(runescape, funescape); // Move the given value to match[3] whether quoted or unquoted

          match[3] = (match[3] || match[4] || match[5] || "").replace(runescape, funescape);

          if (match[2] === "~=") {
            match[3] = " " + match[3] + " ";
          }

          return match.slice(0, 4);
        },
        "CHILD": function CHILD(match) {
          /* matches from matchExpr["CHILD"]
          	1 type (only|nth|...)
          	2 what (child|of-type)
          	3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
          	4 xn-component of xn+y argument ([+-]?\d*n|)
          	5 sign of xn-component
          	6 x of xn-component
          	7 sign of y-component
          	8 y of y-component
          */
          match[1] = match[1].toLowerCase();

          if (match[1].slice(0, 3) === "nth") {
            // nth-* requires argument
            if (!match[3]) {
              Sizzle.error(match[0]);
            } // numeric x and y parameters for Expr.filter.CHILD
            // remember that false/true cast respectively to 0/1


            match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * (match[3] === "even" || match[3] === "odd"));
            match[5] = +(match[7] + match[8] || match[3] === "odd"); // other types prohibit arguments
          } else if (match[3]) {
            Sizzle.error(match[0]);
          }

          return match;
        },
        "PSEUDO": function PSEUDO(match) {
          var excess,
              unquoted = !match[6] && match[2];

          if (matchExpr["CHILD"].test(match[0])) {
            return null;
          } // Accept quoted arguments as-is


          if (match[3]) {
            match[2] = match[4] || match[5] || ""; // Strip excess characters from unquoted arguments
          } else if (unquoted && rpseudo.test(unquoted) && ( // Get excess from tokenize (recursively)
          excess = tokenize(unquoted, true)) && ( // advance to the next closing parenthesis
          excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length)) {
            // excess is a negative index
            match[0] = match[0].slice(0, excess);
            match[2] = unquoted.slice(0, excess);
          } // Return only captures needed by the pseudo filter method (type and argument)


          return match.slice(0, 3);
        }
      },
      filter: {
        "TAG": function TAG(nodeNameSelector) {
          var nodeName = nodeNameSelector.replace(runescape, funescape).toLowerCase();
          return nodeNameSelector === "*" ? function () {
            return true;
          } : function (elem) {
            return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
          };
        },
        "CLASS": function CLASS(className) {
          var pattern = classCache[className + " "];
          return pattern || (pattern = new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)")) && classCache(className, function (elem) {
            return pattern.test(typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "");
          });
        },
        "ATTR": function ATTR(name, operator, check) {
          return function (elem) {
            var result = Sizzle.attr(elem, name);

            if (result == null) {
              return operator === "!=";
            }

            if (!operator) {
              return true;
            }

            result += "";
            /* eslint-disable max-len */

            return operator === "=" ? result === check : operator === "!=" ? result !== check : operator === "^=" ? check && result.indexOf(check) === 0 : operator === "*=" ? check && result.indexOf(check) > -1 : operator === "$=" ? check && result.slice(-check.length) === check : operator === "~=" ? (" " + result.replace(rwhitespace, " ") + " ").indexOf(check) > -1 : operator === "|=" ? result === check || result.slice(0, check.length + 1) === check + "-" : false;
            /* eslint-enable max-len */
          };
        },
        "CHILD": function CHILD(type, what, _argument, first, last) {
          var simple = type.slice(0, 3) !== "nth",
              forward = type.slice(-4) !== "last",
              ofType = what === "of-type";
          return first === 1 && last === 0 ? // Shortcut for :nth-*(n)
          function (elem) {
            return !!elem.parentNode;
          } : function (elem, _context, xml) {
            var cache,
                uniqueCache,
                outerCache,
                node,
                nodeIndex,
                start,
                dir = simple !== forward ? "nextSibling" : "previousSibling",
                parent = elem.parentNode,
                name = ofType && elem.nodeName.toLowerCase(),
                useCache = !xml && !ofType,
                diff = false;

            if (parent) {
              // :(first|last|only)-(child|of-type)
              if (simple) {
                while (dir) {
                  node = elem;

                  while (node = node[dir]) {
                    if (ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) {
                      return false;
                    }
                  } // Reverse direction for :only-* (if we haven't yet done so)


                  start = dir = type === "only" && !start && "nextSibling";
                }

                return true;
              }

              start = [forward ? parent.firstChild : parent.lastChild]; // non-xml :nth-child(...) stores cache data on `parent`

              if (forward && useCache) {
                // Seek `elem` from a previously-cached index
                // ...in a gzip-friendly way
                node = parent;
                outerCache = node[expando] || (node[expando] = {}); // Support: IE <9 only
                // Defend against cloned attroperties (jQuery gh-1709)

                uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});
                cache = uniqueCache[type] || [];
                nodeIndex = cache[0] === dirruns && cache[1];
                diff = nodeIndex && cache[2];
                node = nodeIndex && parent.childNodes[nodeIndex];

                while (node = ++nodeIndex && node && node[dir] || ( // Fallback to seeking `elem` from the start
                diff = nodeIndex = 0) || start.pop()) {
                  // When found, cache indexes on `parent` and break
                  if (node.nodeType === 1 && ++diff && node === elem) {
                    uniqueCache[type] = [dirruns, nodeIndex, diff];
                    break;
                  }
                }
              } else {
                // Use previously-cached element index if available
                if (useCache) {
                  // ...in a gzip-friendly way
                  node = elem;
                  outerCache = node[expando] || (node[expando] = {}); // Support: IE <9 only
                  // Defend against cloned attroperties (jQuery gh-1709)

                  uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});
                  cache = uniqueCache[type] || [];
                  nodeIndex = cache[0] === dirruns && cache[1];
                  diff = nodeIndex;
                } // xml :nth-child(...)
                // or :nth-last-child(...) or :nth(-last)?-of-type(...)


                if (diff === false) {
                  // Use the same loop as above to seek `elem` from the start
                  while (node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop()) {
                    if ((ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) && ++diff) {
                      // Cache the index of each encountered element
                      if (useCache) {
                        outerCache = node[expando] || (node[expando] = {}); // Support: IE <9 only
                        // Defend against cloned attroperties (jQuery gh-1709)

                        uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});
                        uniqueCache[type] = [dirruns, diff];
                      }

                      if (node === elem) {
                        break;
                      }
                    }
                  }
                }
              } // Incorporate the offset, then check against cycle size


              diff -= last;
              return diff === first || diff % first === 0 && diff / first >= 0;
            }
          };
        },
        "PSEUDO": function PSEUDO(pseudo, argument) {
          // pseudo-class names are case-insensitive
          // http://www.w3.org/TR/selectors/#pseudo-classes
          // Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
          // Remember that setFilters inherits from pseudos
          var args,
              fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] || Sizzle.error("unsupported pseudo: " + pseudo); // The user may use createPseudo to indicate that
          // arguments are needed to create the filter function
          // just as Sizzle does

          if (fn[expando]) {
            return fn(argument);
          } // But maintain support for old signatures


          if (fn.length > 1) {
            args = [pseudo, pseudo, "", argument];
            return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ? markFunction(function (seed, matches) {
              var idx,
                  matched = fn(seed, argument),
                  i = matched.length;

              while (i--) {
                idx = indexOf(seed, matched[i]);
                seed[idx] = !(matches[idx] = matched[i]);
              }
            }) : function (elem) {
              return fn(elem, 0, args);
            };
          }

          return fn;
        }
      },
      pseudos: {
        // Potentially complex pseudos
        "not": markFunction(function (selector) {
          // Trim the selector passed to compile
          // to avoid treating leading and trailing
          // spaces as combinators
          var input = [],
              results = [],
              matcher = compile(selector.replace(rtrim, "$1"));
          return matcher[expando] ? markFunction(function (seed, matches, _context, xml) {
            var elem,
                unmatched = matcher(seed, null, xml, []),
                i = seed.length; // Match elements unmatched by `matcher`

            while (i--) {
              if (elem = unmatched[i]) {
                seed[i] = !(matches[i] = elem);
              }
            }
          }) : function (elem, _context, xml) {
            input[0] = elem;
            matcher(input, null, xml, results); // Don't keep the element (issue #299)

            input[0] = null;
            return !results.pop();
          };
        }),
        "has": markFunction(function (selector) {
          return function (elem) {
            return Sizzle(selector, elem).length > 0;
          };
        }),
        "contains": markFunction(function (text) {
          text = text.replace(runescape, funescape);
          return function (elem) {
            return (elem.textContent || getText(elem)).indexOf(text) > -1;
          };
        }),
        // "Whether an element is represented by a :lang() selector
        // is based solely on the element's language value
        // being equal to the identifier C,
        // or beginning with the identifier C immediately followed by "-".
        // The matching of C against the element's language value is performed case-insensitively.
        // The identifier C does not have to be a valid language name."
        // http://www.w3.org/TR/selectors/#lang-pseudo
        "lang": markFunction(function (lang) {
          // lang value must be a valid identifier
          if (!ridentifier.test(lang || "")) {
            Sizzle.error("unsupported lang: " + lang);
          }

          lang = lang.replace(runescape, funescape).toLowerCase();
          return function (elem) {
            var elemLang;

            do {
              if (elemLang = documentIsHTML ? elem.lang : elem.getAttribute("xml:lang") || elem.getAttribute("lang")) {
                elemLang = elemLang.toLowerCase();
                return elemLang === lang || elemLang.indexOf(lang + "-") === 0;
              }
            } while ((elem = elem.parentNode) && elem.nodeType === 1);

            return false;
          };
        }),
        // Miscellaneous
        "target": function target(elem) {
          var hash = window.location && window.location.hash;
          return hash && hash.slice(1) === elem.id;
        },
        "root": function root(elem) {
          return elem === docElem;
        },
        "focus": function focus(elem) {
          return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
        },
        // Boolean properties
        "enabled": createDisabledPseudo(false),
        "disabled": createDisabledPseudo(true),
        "checked": function checked(elem) {
          // In CSS3, :checked should return both checked and selected elements
          // http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
          var nodeName = elem.nodeName.toLowerCase();
          return nodeName === "input" && !!elem.checked || nodeName === "option" && !!elem.selected;
        },
        "selected": function selected(elem) {
          // Accessing this property makes selected-by-default
          // options in Safari work properly
          if (elem.parentNode) {
            // eslint-disable-next-line no-unused-expressions
            elem.parentNode.selectedIndex;
          }

          return elem.selected === true;
        },
        // Contents
        "empty": function empty(elem) {
          // http://www.w3.org/TR/selectors/#empty-pseudo
          // :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
          //   but not by others (comment: 8; processing instruction: 7; etc.)
          // nodeType < 6 works because attributes (2) do not appear as children
          for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
            if (elem.nodeType < 6) {
              return false;
            }
          }

          return true;
        },
        "parent": function parent(elem) {
          return !Expr.pseudos["empty"](elem);
        },
        // Element/input types
        "header": function header(elem) {
          return rheader.test(elem.nodeName);
        },
        "input": function input(elem) {
          return rinputs.test(elem.nodeName);
        },
        "button": function button(elem) {
          var name = elem.nodeName.toLowerCase();
          return name === "input" && elem.type === "button" || name === "button";
        },
        "text": function text(elem) {
          var attr;
          return elem.nodeName.toLowerCase() === "input" && elem.type === "text" && ( // Support: IE<8
          // New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
          (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text");
        },
        // Position-in-collection
        "first": createPositionalPseudo(function () {
          return [0];
        }),
        "last": createPositionalPseudo(function (_matchIndexes, length) {
          return [length - 1];
        }),
        "eq": createPositionalPseudo(function (_matchIndexes, length, argument) {
          return [argument < 0 ? argument + length : argument];
        }),
        "even": createPositionalPseudo(function (matchIndexes, length) {
          var i = 0;

          for (; i < length; i += 2) {
            matchIndexes.push(i);
          }

          return matchIndexes;
        }),
        "odd": createPositionalPseudo(function (matchIndexes, length) {
          var i = 1;

          for (; i < length; i += 2) {
            matchIndexes.push(i);
          }

          return matchIndexes;
        }),
        "lt": createPositionalPseudo(function (matchIndexes, length, argument) {
          var i = argument < 0 ? argument + length : argument > length ? length : argument;

          for (; --i >= 0;) {
            matchIndexes.push(i);
          }

          return matchIndexes;
        }),
        "gt": createPositionalPseudo(function (matchIndexes, length, argument) {
          var i = argument < 0 ? argument + length : argument;

          for (; ++i < length;) {
            matchIndexes.push(i);
          }

          return matchIndexes;
        })
      }
    };
    Expr.pseudos["nth"] = Expr.pseudos["eq"]; // Add button/input type pseudos

    for (i in {
      radio: true,
      checkbox: true,
      file: true,
      password: true,
      image: true
    }) {
      Expr.pseudos[i] = createInputPseudo(i);
    }

    for (i in {
      submit: true,
      reset: true
    }) {
      Expr.pseudos[i] = createButtonPseudo(i);
    } // Easy API for creating new setFilters


    function setFilters() {}

    setFilters.prototype = Expr.filters = Expr.pseudos;
    Expr.setFilters = new setFilters();

    tokenize = Sizzle.tokenize = function (selector, parseOnly) {
      var matched,
          match,
          tokens,
          type,
          soFar,
          groups,
          preFilters,
          cached = tokenCache[selector + " "];

      if (cached) {
        return parseOnly ? 0 : cached.slice(0);
      }

      soFar = selector;
      groups = [];
      preFilters = Expr.preFilter;

      while (soFar) {
        // Comma and first run
        if (!matched || (match = rcomma.exec(soFar))) {
          if (match) {
            // Don't consume trailing commas as valid
            soFar = soFar.slice(match[0].length) || soFar;
          }

          groups.push(tokens = []);
        }

        matched = false; // Combinators

        if (match = rcombinators.exec(soFar)) {
          matched = match.shift();
          tokens.push({
            value: matched,
            // Cast descendant combinators to space
            type: match[0].replace(rtrim, " ")
          });
          soFar = soFar.slice(matched.length);
        } // Filters


        for (type in Expr.filter) {
          if ((match = matchExpr[type].exec(soFar)) && (!preFilters[type] || (match = preFilters[type](match)))) {
            matched = match.shift();
            tokens.push({
              value: matched,
              type: type,
              matches: match
            });
            soFar = soFar.slice(matched.length);
          }
        }

        if (!matched) {
          break;
        }
      } // Return the length of the invalid excess
      // if we're just parsing
      // Otherwise, throw an error or return tokens


      return parseOnly ? soFar.length : soFar ? Sizzle.error(selector) : // Cache the tokens
      tokenCache(selector, groups).slice(0);
    };

    function toSelector(tokens) {
      var i = 0,
          len = tokens.length,
          selector = "";

      for (; i < len; i++) {
        selector += tokens[i].value;
      }

      return selector;
    }

    function addCombinator(matcher, combinator, base) {
      var dir = combinator.dir,
          skip = combinator.next,
          key = skip || dir,
          checkNonElements = base && key === "parentNode",
          doneName = done++;
      return combinator.first ? // Check against closest ancestor/preceding element
      function (elem, context, xml) {
        while (elem = elem[dir]) {
          if (elem.nodeType === 1 || checkNonElements) {
            return matcher(elem, context, xml);
          }
        }

        return false;
      } : // Check against all ancestor/preceding elements
      function (elem, context, xml) {
        var oldCache,
            uniqueCache,
            outerCache,
            newCache = [dirruns, doneName]; // We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching

        if (xml) {
          while (elem = elem[dir]) {
            if (elem.nodeType === 1 || checkNonElements) {
              if (matcher(elem, context, xml)) {
                return true;
              }
            }
          }
        } else {
          while (elem = elem[dir]) {
            if (elem.nodeType === 1 || checkNonElements) {
              outerCache = elem[expando] || (elem[expando] = {}); // Support: IE <9 only
              // Defend against cloned attroperties (jQuery gh-1709)

              uniqueCache = outerCache[elem.uniqueID] || (outerCache[elem.uniqueID] = {});

              if (skip && skip === elem.nodeName.toLowerCase()) {
                elem = elem[dir] || elem;
              } else if ((oldCache = uniqueCache[key]) && oldCache[0] === dirruns && oldCache[1] === doneName) {
                // Assign to newCache so results back-propagate to previous elements
                return newCache[2] = oldCache[2];
              } else {
                // Reuse newcache so results back-propagate to previous elements
                uniqueCache[key] = newCache; // A match means we're done; a fail means we have to keep checking

                if (newCache[2] = matcher(elem, context, xml)) {
                  return true;
                }
              }
            }
          }
        }

        return false;
      };
    }

    function elementMatcher(matchers) {
      return matchers.length > 1 ? function (elem, context, xml) {
        var i = matchers.length;

        while (i--) {
          if (!matchers[i](elem, context, xml)) {
            return false;
          }
        }

        return true;
      } : matchers[0];
    }

    function multipleContexts(selector, contexts, results) {
      var i = 0,
          len = contexts.length;

      for (; i < len; i++) {
        Sizzle(selector, contexts[i], results);
      }

      return results;
    }

    function condense(unmatched, map, filter, context, xml) {
      var elem,
          newUnmatched = [],
          i = 0,
          len = unmatched.length,
          mapped = map != null;

      for (; i < len; i++) {
        if (elem = unmatched[i]) {
          if (!filter || filter(elem, context, xml)) {
            newUnmatched.push(elem);

            if (mapped) {
              map.push(i);
            }
          }
        }
      }

      return newUnmatched;
    }

    function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
      if (postFilter && !postFilter[expando]) {
        postFilter = setMatcher(postFilter);
      }

      if (postFinder && !postFinder[expando]) {
        postFinder = setMatcher(postFinder, postSelector);
      }

      return markFunction(function (seed, results, context, xml) {
        var temp,
            i,
            elem,
            preMap = [],
            postMap = [],
            preexisting = results.length,
            // Get initial elements from seed or context
        elems = seed || multipleContexts(selector || "*", context.nodeType ? [context] : context, []),
            // Prefilter to get matcher input, preserving a map for seed-results synchronization
        matcherIn = preFilter && (seed || !selector) ? condense(elems, preMap, preFilter, context, xml) : elems,
            matcherOut = matcher ? // If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
        postFinder || (seed ? preFilter : preexisting || postFilter) ? // ...intermediate processing is necessary
        [] : // ...otherwise use results directly
        results : matcherIn; // Find primary matches

        if (matcher) {
          matcher(matcherIn, matcherOut, context, xml);
        } // Apply postFilter


        if (postFilter) {
          temp = condense(matcherOut, postMap);
          postFilter(temp, [], context, xml); // Un-match failing elements by moving them back to matcherIn

          i = temp.length;

          while (i--) {
            if (elem = temp[i]) {
              matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem);
            }
          }
        }

        if (seed) {
          if (postFinder || preFilter) {
            if (postFinder) {
              // Get the final matcherOut by condensing this intermediate into postFinder contexts
              temp = [];
              i = matcherOut.length;

              while (i--) {
                if (elem = matcherOut[i]) {
                  // Restore matcherIn since elem is not yet a final match
                  temp.push(matcherIn[i] = elem);
                }
              }

              postFinder(null, matcherOut = [], temp, xml);
            } // Move matched elements from seed to results to keep them synchronized


            i = matcherOut.length;

            while (i--) {
              if ((elem = matcherOut[i]) && (temp = postFinder ? indexOf(seed, elem) : preMap[i]) > -1) {
                seed[temp] = !(results[temp] = elem);
              }
            }
          } // Add elements to results, through postFinder if defined

        } else {
          matcherOut = condense(matcherOut === results ? matcherOut.splice(preexisting, matcherOut.length) : matcherOut);

          if (postFinder) {
            postFinder(null, results, matcherOut, xml);
          } else {
            push.apply(results, matcherOut);
          }
        }
      });
    }

    function matcherFromTokens(tokens) {
      var checkContext,
          matcher,
          j,
          len = tokens.length,
          leadingRelative = Expr.relative[tokens[0].type],
          implicitRelative = leadingRelative || Expr.relative[" "],
          i = leadingRelative ? 1 : 0,
          // The foundational matcher ensures that elements are reachable from top-level context(s)
      matchContext = addCombinator(function (elem) {
        return elem === checkContext;
      }, implicitRelative, true),
          matchAnyContext = addCombinator(function (elem) {
        return indexOf(checkContext, elem) > -1;
      }, implicitRelative, true),
          matchers = [function (elem, context, xml) {
        var ret = !leadingRelative && (xml || context !== outermostContext) || ((checkContext = context).nodeType ? matchContext(elem, context, xml) : matchAnyContext(elem, context, xml)); // Avoid hanging onto element (issue #299)

        checkContext = null;
        return ret;
      }];

      for (; i < len; i++) {
        if (matcher = Expr.relative[tokens[i].type]) {
          matchers = [addCombinator(elementMatcher(matchers), matcher)];
        } else {
          matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches); // Return special upon seeing a positional matcher

          if (matcher[expando]) {
            // Find the next relative operator (if any) for proper handling
            j = ++i;

            for (; j < len; j++) {
              if (Expr.relative[tokens[j].type]) {
                break;
              }
            }

            return setMatcher(i > 1 && elementMatcher(matchers), i > 1 && toSelector( // If the preceding token was a descendant combinator, insert an implicit any-element `*`
            tokens.slice(0, i - 1).concat({
              value: tokens[i - 2].type === " " ? "*" : ""
            })).replace(rtrim, "$1"), matcher, i < j && matcherFromTokens(tokens.slice(i, j)), j < len && matcherFromTokens(tokens = tokens.slice(j)), j < len && toSelector(tokens));
          }

          matchers.push(matcher);
        }
      }

      return elementMatcher(matchers);
    }

    function matcherFromGroupMatchers(elementMatchers, setMatchers) {
      var bySet = setMatchers.length > 0,
          byElement = elementMatchers.length > 0,
          superMatcher = function superMatcher(seed, context, xml, results, outermost) {
        var elem,
            j,
            matcher,
            matchedCount = 0,
            i = "0",
            unmatched = seed && [],
            setMatched = [],
            contextBackup = outermostContext,
            // We must always have either seed elements or outermost context
        elems = seed || byElement && Expr.find["TAG"]("*", outermost),
            // Use integer dirruns iff this is the outermost matcher
        dirrunsUnique = dirruns += contextBackup == null ? 1 : Math.random() || 0.1,
            len = elems.length;

        if (outermost) {
          // Support: IE 11+, Edge 17 - 18+
          // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
          // two documents; shallow comparisons work.
          // eslint-disable-next-line eqeqeq
          outermostContext = context == document || context || outermost;
        } // Add elements passing elementMatchers directly to results
        // Support: IE<9, Safari
        // Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id


        for (; i !== len && (elem = elems[i]) != null; i++) {
          if (byElement && elem) {
            j = 0; // Support: IE 11+, Edge 17 - 18+
            // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
            // two documents; shallow comparisons work.
            // eslint-disable-next-line eqeqeq

            if (!context && elem.ownerDocument != document) {
              setDocument(elem);
              xml = !documentIsHTML;
            }

            while (matcher = elementMatchers[j++]) {
              if (matcher(elem, context || document, xml)) {
                results.push(elem);
                break;
              }
            }

            if (outermost) {
              dirruns = dirrunsUnique;
            }
          } // Track unmatched elements for set filters


          if (bySet) {
            // They will have gone through all possible matchers
            if (elem = !matcher && elem) {
              matchedCount--;
            } // Lengthen the array for every element, matched or not


            if (seed) {
              unmatched.push(elem);
            }
          }
        } // `i` is now the count of elements visited above, and adding it to `matchedCount`
        // makes the latter nonnegative.


        matchedCount += i; // Apply set filters to unmatched elements
        // NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
        // equals `i`), unless we didn't visit _any_ elements in the above loop because we have
        // no element matchers and no seed.
        // Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
        // case, which will result in a "00" `matchedCount` that differs from `i` but is also
        // numerically zero.

        if (bySet && i !== matchedCount) {
          j = 0;

          while (matcher = setMatchers[j++]) {
            matcher(unmatched, setMatched, context, xml);
          }

          if (seed) {
            // Reintegrate element matches to eliminate the need for sorting
            if (matchedCount > 0) {
              while (i--) {
                if (!(unmatched[i] || setMatched[i])) {
                  setMatched[i] = pop.call(results);
                }
              }
            } // Discard index placeholder values to get only actual matches


            setMatched = condense(setMatched);
          } // Add matches to results


          push.apply(results, setMatched); // Seedless set matches succeeding multiple successful matchers stipulate sorting

          if (outermost && !seed && setMatched.length > 0 && matchedCount + setMatchers.length > 1) {
            Sizzle.uniqueSort(results);
          }
        } // Override manipulation of globals by nested matchers


        if (outermost) {
          dirruns = dirrunsUnique;
          outermostContext = contextBackup;
        }

        return unmatched;
      };

      return bySet ? markFunction(superMatcher) : superMatcher;
    }

    compile = Sizzle.compile = function (selector, match
    /* Internal Use Only */
    ) {
      var i,
          setMatchers = [],
          elementMatchers = [],
          cached = compilerCache[selector + " "];

      if (!cached) {
        // Generate a function of recursive functions that can be used to check each element
        if (!match) {
          match = tokenize(selector);
        }

        i = match.length;

        while (i--) {
          cached = matcherFromTokens(match[i]);

          if (cached[expando]) {
            setMatchers.push(cached);
          } else {
            elementMatchers.push(cached);
          }
        } // Cache the compiled function


        cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers)); // Save selector and tokenization

        cached.selector = selector;
      }

      return cached;
    };
    /**
     * A low-level selection function that works with Sizzle's compiled
     *  selector functions
     * @param {String|Function} selector A selector or a pre-compiled
     *  selector function built with Sizzle.compile
     * @param {Element} context
     * @param {Array} [results]
     * @param {Array} [seed] A set of elements to match against
     */


    select = Sizzle.select = function (selector, context, results, seed) {
      var i,
          tokens,
          token,
          type,
          find,
          compiled = typeof selector === "function" && selector,
          match = !seed && tokenize(selector = compiled.selector || selector);
      results = results || []; // Try to minimize operations if there is only one selector in the list and no seed
      // (the latter of which guarantees us context)

      if (match.length === 1) {
        // Reduce context if the leading compound selector is an ID
        tokens = match[0] = match[0].slice(0);

        if (tokens.length > 2 && (token = tokens[0]).type === "ID" && context.nodeType === 9 && documentIsHTML && Expr.relative[tokens[1].type]) {
          context = (Expr.find["ID"](token.matches[0].replace(runescape, funescape), context) || [])[0];

          if (!context) {
            return results; // Precompiled matchers will still verify ancestry, so step up a level
          } else if (compiled) {
            context = context.parentNode;
          }

          selector = selector.slice(tokens.shift().value.length);
        } // Fetch a seed set for right-to-left matching


        i = matchExpr["needsContext"].test(selector) ? 0 : tokens.length;

        while (i--) {
          token = tokens[i]; // Abort if we hit a combinator

          if (Expr.relative[type = token.type]) {
            break;
          }

          if (find = Expr.find[type]) {
            // Search, expanding context for leading sibling combinators
            if (seed = find(token.matches[0].replace(runescape, funescape), rsibling.test(tokens[0].type) && testContext(context.parentNode) || context)) {
              // If seed is empty or no tokens remain, we can return early
              tokens.splice(i, 1);
              selector = seed.length && toSelector(tokens);

              if (!selector) {
                push.apply(results, seed);
                return results;
              }

              break;
            }
          }
        }
      } // Compile and execute a filtering function if one is not provided
      // Provide `match` to avoid retokenization if we modified the selector above


      (compiled || compile(selector, match))(seed, context, !documentIsHTML, results, !context || rsibling.test(selector) && testContext(context.parentNode) || context);
      return results;
    }; // One-time assignments
    // Sort stability


    support.sortStable = expando.split("").sort(sortOrder).join("") === expando; // Support: Chrome 14-35+
    // Always assume duplicates if they aren't passed to the comparison function

    support.detectDuplicates = !!hasDuplicate; // Initialize against the default document

    setDocument(); // Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
    // Detached nodes confoundingly follow *each other*

    support.sortDetached = assert(function (el) {
      // Should return 1, but returns 4 (following)
      return el.compareDocumentPosition(document.createElement("fieldset")) & 1;
    }); // Support: IE<8
    // Prevent attribute/property "interpolation"
    // https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx

    if (!assert(function (el) {
      el.innerHTML = "<a href='#'></a>";
      return el.firstChild.getAttribute("href") === "#";
    })) {
      addHandle("type|href|height|width", function (elem, name, isXML) {
        if (!isXML) {
          return elem.getAttribute(name, name.toLowerCase() === "type" ? 1 : 2);
        }
      });
    } // Support: IE<9
    // Use defaultValue in place of getAttribute("value")


    if (!support.attributes || !assert(function (el) {
      el.innerHTML = "<input/>";
      el.firstChild.setAttribute("value", "");
      return el.firstChild.getAttribute("value") === "";
    })) {
      addHandle("value", function (elem, _name, isXML) {
        if (!isXML && elem.nodeName.toLowerCase() === "input") {
          return elem.defaultValue;
        }
      });
    } // Support: IE<9
    // Use getAttributeNode to fetch booleans when getAttribute lies


    if (!assert(function (el) {
      return el.getAttribute("disabled") == null;
    })) {
      addHandle(booleans, function (elem, name, isXML) {
        var val;

        if (!isXML) {
          return elem[name] === true ? name.toLowerCase() : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
        }
      });
    }

    return Sizzle;
  }(window);

  jQuery.find = Sizzle;
  jQuery.expr = Sizzle.selectors; // Deprecated

  jQuery.expr[":"] = jQuery.expr.pseudos;
  jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
  jQuery.text = Sizzle.getText;
  jQuery.isXMLDoc = Sizzle.isXML;
  jQuery.contains = Sizzle.contains;
  jQuery.escapeSelector = Sizzle.escape;

  var dir = function dir(elem, _dir, until) {
    var matched = [],
        truncate = until !== undefined;

    while ((elem = elem[_dir]) && elem.nodeType !== 9) {
      if (elem.nodeType === 1) {
        if (truncate && jQuery(elem).is(until)) {
          break;
        }

        matched.push(elem);
      }
    }

    return matched;
  };

  var _siblings = function siblings(n, elem) {
    var matched = [];

    for (; n; n = n.nextSibling) {
      if (n.nodeType === 1 && n !== elem) {
        matched.push(n);
      }
    }

    return matched;
  };

  var rneedsContext = jQuery.expr.match.needsContext;

  function nodeName(elem, name) {
    return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
  }

  ;
  var rsingleTag = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i; // Implement the identical functionality for filter and not

  function winnow(elements, qualifier, not) {
    if (isFunction(qualifier)) {
      return jQuery.grep(elements, function (elem, i) {
        return !!qualifier.call(elem, i, elem) !== not;
      });
    } // Single element


    if (qualifier.nodeType) {
      return jQuery.grep(elements, function (elem) {
        return elem === qualifier !== not;
      });
    } // Arraylike of elements (jQuery, arguments, Array)


    if (typeof qualifier !== "string") {
      return jQuery.grep(elements, function (elem) {
        return indexOf.call(qualifier, elem) > -1 !== not;
      });
    } // Filtered directly for both simple and complex selectors


    return jQuery.filter(qualifier, elements, not);
  }

  jQuery.filter = function (expr, elems, not) {
    var elem = elems[0];

    if (not) {
      expr = ":not(" + expr + ")";
    }

    if (elems.length === 1 && elem.nodeType === 1) {
      return jQuery.find.matchesSelector(elem, expr) ? [elem] : [];
    }

    return jQuery.find.matches(expr, jQuery.grep(elems, function (elem) {
      return elem.nodeType === 1;
    }));
  };

  jQuery.fn.extend({
    find: function find(selector) {
      var i,
          ret,
          len = this.length,
          self = this;

      if (typeof selector !== "string") {
        return this.pushStack(jQuery(selector).filter(function () {
          for (i = 0; i < len; i++) {
            if (jQuery.contains(self[i], this)) {
              return true;
            }
          }
        }));
      }

      ret = this.pushStack([]);

      for (i = 0; i < len; i++) {
        jQuery.find(selector, self[i], ret);
      }

      return len > 1 ? jQuery.uniqueSort(ret) : ret;
    },
    filter: function filter(selector) {
      return this.pushStack(winnow(this, selector || [], false));
    },
    not: function not(selector) {
      return this.pushStack(winnow(this, selector || [], true));
    },
    is: function is(selector) {
      return !!winnow(this, // If this is a positional/relative selector, check membership in the returned set
      // so $("p:first").is("p:last") won't return true for a doc with two "p".
      typeof selector === "string" && rneedsContext.test(selector) ? jQuery(selector) : selector || [], false).length;
    }
  }); // Initialize a jQuery object
  // A central reference to the root jQuery(document)

  var rootjQuery,
      // A simple way to check for HTML strings
  // Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
  // Strict HTML recognition (#11290: must start with <)
  // Shortcut simple #id case for speed
  rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,
      init = jQuery.fn.init = function (selector, context, root) {
    var match, elem; // HANDLE: $(""), $(null), $(undefined), $(false)

    if (!selector) {
      return this;
    } // Method init() accepts an alternate rootjQuery
    // so migrate can support jQuery.sub (gh-2101)


    root = root || rootjQuery; // Handle HTML strings

    if (typeof selector === "string") {
      if (selector[0] === "<" && selector[selector.length - 1] === ">" && selector.length >= 3) {
        // Assume that strings that start and end with <> are HTML and skip the regex check
        match = [null, selector, null];
      } else {
        match = rquickExpr.exec(selector);
      } // Match html or make sure no context is specified for #id


      if (match && (match[1] || !context)) {
        // HANDLE: $(html) -> $(array)
        if (match[1]) {
          context = context instanceof jQuery ? context[0] : context; // Option to run scripts is true for back-compat
          // Intentionally let the error be thrown if parseHTML is not present

          jQuery.merge(this, jQuery.parseHTML(match[1], context && context.nodeType ? context.ownerDocument || context : document, true)); // HANDLE: $(html, props)

          if (rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) {
            for (match in context) {
              // Properties of context are called as methods if possible
              if (isFunction(this[match])) {
                this[match](context[match]); // ...and otherwise set as attributes
              } else {
                this.attr(match, context[match]);
              }
            }
          }

          return this; // HANDLE: $(#id)
        } else {
          elem = document.getElementById(match[2]);

          if (elem) {
            // Inject the element directly into the jQuery object
            this[0] = elem;
            this.length = 1;
          }

          return this;
        } // HANDLE: $(expr, $(...))

      } else if (!context || context.jquery) {
        return (context || root).find(selector); // HANDLE: $(expr, context)
        // (which is just equivalent to: $(context).find(expr)
      } else {
        return this.constructor(context).find(selector);
      } // HANDLE: $(DOMElement)

    } else if (selector.nodeType) {
      this[0] = selector;
      this.length = 1;
      return this; // HANDLE: $(function)
      // Shortcut for document ready
    } else if (isFunction(selector)) {
      return root.ready !== undefined ? root.ready(selector) : // Execute immediately if ready is not present
      selector(jQuery);
    }

    return jQuery.makeArray(selector, this);
  }; // Give the init function the jQuery prototype for later instantiation


  init.prototype = jQuery.fn; // Initialize central reference

  rootjQuery = jQuery(document);
  var rparentsprev = /^(?:parents|prev(?:Until|All))/,
      // Methods guaranteed to produce a unique set when starting from a unique set
  guaranteedUnique = {
    children: true,
    contents: true,
    next: true,
    prev: true
  };
  jQuery.fn.extend({
    has: function has(target) {
      var targets = jQuery(target, this),
          l = targets.length;
      return this.filter(function () {
        var i = 0;

        for (; i < l; i++) {
          if (jQuery.contains(this, targets[i])) {
            return true;
          }
        }
      });
    },
    closest: function closest(selectors, context) {
      var cur,
          i = 0,
          l = this.length,
          matched = [],
          targets = typeof selectors !== "string" && jQuery(selectors); // Positional selectors never match, since there's no _selection_ context

      if (!rneedsContext.test(selectors)) {
        for (; i < l; i++) {
          for (cur = this[i]; cur && cur !== context; cur = cur.parentNode) {
            // Always skip document fragments
            if (cur.nodeType < 11 && (targets ? targets.index(cur) > -1 : // Don't pass non-elements to Sizzle
            cur.nodeType === 1 && jQuery.find.matchesSelector(cur, selectors))) {
              matched.push(cur);
              break;
            }
          }
        }
      }

      return this.pushStack(matched.length > 1 ? jQuery.uniqueSort(matched) : matched);
    },
    // Determine the position of an element within the set
    index: function index(elem) {
      // No argument, return index in parent
      if (!elem) {
        return this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
      } // Index in selector


      if (typeof elem === "string") {
        return indexOf.call(jQuery(elem), this[0]);
      } // Locate the position of the desired element


      return indexOf.call(this, // If it receives a jQuery object, the first element is used
      elem.jquery ? elem[0] : elem);
    },
    add: function add(selector, context) {
      return this.pushStack(jQuery.uniqueSort(jQuery.merge(this.get(), jQuery(selector, context))));
    },
    addBack: function addBack(selector) {
      return this.add(selector == null ? this.prevObject : this.prevObject.filter(selector));
    }
  });

  function sibling(cur, dir) {
    while ((cur = cur[dir]) && cur.nodeType !== 1) {}

    return cur;
  }

  jQuery.each({
    parent: function parent(elem) {
      var parent = elem.parentNode;
      return parent && parent.nodeType !== 11 ? parent : null;
    },
    parents: function parents(elem) {
      return dir(elem, "parentNode");
    },
    parentsUntil: function parentsUntil(elem, _i, until) {
      return dir(elem, "parentNode", until);
    },
    next: function next(elem) {
      return sibling(elem, "nextSibling");
    },
    prev: function prev(elem) {
      return sibling(elem, "previousSibling");
    },
    nextAll: function nextAll(elem) {
      return dir(elem, "nextSibling");
    },
    prevAll: function prevAll(elem) {
      return dir(elem, "previousSibling");
    },
    nextUntil: function nextUntil(elem, _i, until) {
      return dir(elem, "nextSibling", until);
    },
    prevUntil: function prevUntil(elem, _i, until) {
      return dir(elem, "previousSibling", until);
    },
    siblings: function siblings(elem) {
      return _siblings((elem.parentNode || {}).firstChild, elem);
    },
    children: function children(elem) {
      return _siblings(elem.firstChild);
    },
    contents: function contents(elem) {
      if (elem.contentDocument != null && // Support: IE 11+
      // <object> elements with no `data` attribute has an object
      // `contentDocument` with a `null` prototype.
      getProto(elem.contentDocument)) {
        return elem.contentDocument;
      } // Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
      // Treat the template element as a regular one in browsers that
      // don't support it.


      if (nodeName(elem, "template")) {
        elem = elem.content || elem;
      }

      return jQuery.merge([], elem.childNodes);
    }
  }, function (name, fn) {
    jQuery.fn[name] = function (until, selector) {
      var matched = jQuery.map(this, fn, until);

      if (name.slice(-5) !== "Until") {
        selector = until;
      }

      if (selector && typeof selector === "string") {
        matched = jQuery.filter(selector, matched);
      }

      if (this.length > 1) {
        // Remove duplicates
        if (!guaranteedUnique[name]) {
          jQuery.uniqueSort(matched);
        } // Reverse order for parents* and prev-derivatives


        if (rparentsprev.test(name)) {
          matched.reverse();
        }
      }

      return this.pushStack(matched);
    };
  });
  var rnothtmlwhite = /[^\x20\t\r\n\f]+/g; // Convert String-formatted options into Object-formatted ones

  function createOptions(options) {
    var object = {};
    jQuery.each(options.match(rnothtmlwhite) || [], function (_, flag) {
      object[flag] = true;
    });
    return object;
  }
  /*
   * Create a callback list using the following parameters:
   *
   *	options: an optional list of space-separated options that will change how
   *			the callback list behaves or a more traditional option object
   *
   * By default a callback list will act like an event callback list and can be
   * "fired" multiple times.
   *
   * Possible options:
   *
   *	once:			will ensure the callback list can only be fired once (like a Deferred)
   *
   *	memory:			will keep track of previous values and will call any callback added
   *					after the list has been fired right away with the latest "memorized"
   *					values (like a Deferred)
   *
   *	unique:			will ensure a callback can only be added once (no duplicate in the list)
   *
   *	stopOnFalse:	interrupt callings when a callback returns false
   *
   */


  jQuery.Callbacks = function (options) {
    // Convert options from String-formatted to Object-formatted if needed
    // (we check in cache first)
    options = typeof options === "string" ? createOptions(options) : jQuery.extend({}, options);

    var // Flag to know if list is currently firing
    firing,
        // Last fire value for non-forgettable lists
    memory,
        // Flag to know if list was already fired
    _fired,
        // Flag to prevent firing
    _locked,
        // Actual callback list
    list = [],
        // Queue of execution data for repeatable lists
    queue = [],
        // Index of currently firing callback (modified by add/remove as needed)
    firingIndex = -1,
        // Fire callbacks
    fire = function fire() {
      // Enforce single-firing
      _locked = _locked || options.once; // Execute callbacks for all pending executions,
      // respecting firingIndex overrides and runtime changes

      _fired = firing = true;

      for (; queue.length; firingIndex = -1) {
        memory = queue.shift();

        while (++firingIndex < list.length) {
          // Run callback and check for early termination
          if (list[firingIndex].apply(memory[0], memory[1]) === false && options.stopOnFalse) {
            // Jump to end and forget the data so .add doesn't re-fire
            firingIndex = list.length;
            memory = false;
          }
        }
      } // Forget the data if we're done with it


      if (!options.memory) {
        memory = false;
      }

      firing = false; // Clean up if we're done firing for good

      if (_locked) {
        // Keep an empty list if we have data for future add calls
        if (memory) {
          list = []; // Otherwise, this object is spent
        } else {
          list = "";
        }
      }
    },
        // Actual Callbacks object
    self = {
      // Add a callback or a collection of callbacks to the list
      add: function add() {
        if (list) {
          // If we have memory from a past run, we should fire after adding
          if (memory && !firing) {
            firingIndex = list.length - 1;
            queue.push(memory);
          }

          (function add(args) {
            jQuery.each(args, function (_, arg) {
              if (isFunction(arg)) {
                if (!options.unique || !self.has(arg)) {
                  list.push(arg);
                }
              } else if (arg && arg.length && toType(arg) !== "string") {
                // Inspect recursively
                add(arg);
              }
            });
          })(arguments);

          if (memory && !firing) {
            fire();
          }
        }

        return this;
      },
      // Remove a callback from the list
      remove: function remove() {
        jQuery.each(arguments, function (_, arg) {
          var index;

          while ((index = jQuery.inArray(arg, list, index)) > -1) {
            list.splice(index, 1); // Handle firing indexes

            if (index <= firingIndex) {
              firingIndex--;
            }
          }
        });
        return this;
      },
      // Check if a given callback is in the list.
      // If no argument is given, return whether or not list has callbacks attached.
      has: function has(fn) {
        return fn ? jQuery.inArray(fn, list) > -1 : list.length > 0;
      },
      // Remove all callbacks from the list
      empty: function empty() {
        if (list) {
          list = [];
        }

        return this;
      },
      // Disable .fire and .add
      // Abort any current/pending executions
      // Clear all callbacks and values
      disable: function disable() {
        _locked = queue = [];
        list = memory = "";
        return this;
      },
      disabled: function disabled() {
        return !list;
      },
      // Disable .fire
      // Also disable .add unless we have memory (since it would have no effect)
      // Abort any pending executions
      lock: function lock() {
        _locked = queue = [];

        if (!memory && !firing) {
          list = memory = "";
        }

        return this;
      },
      locked: function locked() {
        return !!_locked;
      },
      // Call all callbacks with the given context and arguments
      fireWith: function fireWith(context, args) {
        if (!_locked) {
          args = args || [];
          args = [context, args.slice ? args.slice() : args];
          queue.push(args);

          if (!firing) {
            fire();
          }
        }

        return this;
      },
      // Call all the callbacks with the given arguments
      fire: function fire() {
        self.fireWith(this, arguments);
        return this;
      },
      // To know if the callbacks have already been called at least once
      fired: function fired() {
        return !!_fired;
      }
    };

    return self;
  };

  function Identity(v) {
    return v;
  }

  function Thrower(ex) {
    throw ex;
  }

  function adoptValue(value, resolve, reject, noValue) {
    var method;

    try {
      // Check for promise aspect first to privilege synchronous behavior
      if (value && isFunction(method = value.promise)) {
        method.call(value).done(resolve).fail(reject); // Other thenables
      } else if (value && isFunction(method = value.then)) {
        method.call(value, resolve, reject); // Other non-thenables
      } else {
        // Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
        // * false: [ value ].slice( 0 ) => resolve( value )
        // * true: [ value ].slice( 1 ) => resolve()
        resolve.apply(undefined, [value].slice(noValue));
      } // For Promises/A+, convert exceptions into rejections
      // Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
      // Deferred#then to conditionally suppress rejection.

    } catch (value) {
      // Support: Android 4.0 only
      // Strict mode functions invoked without .call/.apply get global-object context
      reject.apply(undefined, [value]);
    }
  }

  jQuery.extend({
    Deferred: function Deferred(func) {
      var tuples = [// action, add listener, callbacks,
      // ... .then handlers, argument index, [final state]
      ["notify", "progress", jQuery.Callbacks("memory"), jQuery.Callbacks("memory"), 2], ["resolve", "done", jQuery.Callbacks("once memory"), jQuery.Callbacks("once memory"), 0, "resolved"], ["reject", "fail", jQuery.Callbacks("once memory"), jQuery.Callbacks("once memory"), 1, "rejected"]],
          _state = "pending",
          _promise = {
        state: function state() {
          return _state;
        },
        always: function always() {
          deferred.done(arguments).fail(arguments);
          return this;
        },
        "catch": function _catch(fn) {
          return _promise.then(null, fn);
        },
        // Keep pipe for back-compat
        pipe: function pipe()
        /* fnDone, fnFail, fnProgress */
        {
          var fns = arguments;
          return jQuery.Deferred(function (newDefer) {
            jQuery.each(tuples, function (_i, tuple) {
              // Map tuples (progress, done, fail) to arguments (done, fail, progress)
              var fn = isFunction(fns[tuple[4]]) && fns[tuple[4]]; // deferred.progress(function() { bind to newDefer or newDefer.notify })
              // deferred.done(function() { bind to newDefer or newDefer.resolve })
              // deferred.fail(function() { bind to newDefer or newDefer.reject })

              deferred[tuple[1]](function () {
                var returned = fn && fn.apply(this, arguments);

                if (returned && isFunction(returned.promise)) {
                  returned.promise().progress(newDefer.notify).done(newDefer.resolve).fail(newDefer.reject);
                } else {
                  newDefer[tuple[0] + "With"](this, fn ? [returned] : arguments);
                }
              });
            });
            fns = null;
          }).promise();
        },
        then: function then(onFulfilled, onRejected, onProgress) {
          var maxDepth = 0;

          function resolve(depth, deferred, handler, special) {
            return function () {
              var that = this,
                  args = arguments,
                  mightThrow = function mightThrow() {
                var returned, then; // Support: Promises/A+ section 2.3.3.3.3
                // https://promisesaplus.com/#point-59
                // Ignore double-resolution attempts

                if (depth < maxDepth) {
                  return;
                }

                returned = handler.apply(that, args); // Support: Promises/A+ section 2.3.1
                // https://promisesaplus.com/#point-48

                if (returned === deferred.promise()) {
                  throw new TypeError("Thenable self-resolution");
                } // Support: Promises/A+ sections 2.3.3.1, 3.5
                // https://promisesaplus.com/#point-54
                // https://promisesaplus.com/#point-75
                // Retrieve `then` only once


                then = returned && ( // Support: Promises/A+ section 2.3.4
                // https://promisesaplus.com/#point-64
                // Only check objects and functions for thenability
                _typeof(returned) === "object" || typeof returned === "function") && returned.then; // Handle a returned thenable

                if (isFunction(then)) {
                  // Special processors (notify) just wait for resolution
                  if (special) {
                    then.call(returned, resolve(maxDepth, deferred, Identity, special), resolve(maxDepth, deferred, Thrower, special)); // Normal processors (resolve) also hook into progress
                  } else {
                    // ...and disregard older resolution values
                    maxDepth++;
                    then.call(returned, resolve(maxDepth, deferred, Identity, special), resolve(maxDepth, deferred, Thrower, special), resolve(maxDepth, deferred, Identity, deferred.notifyWith));
                  } // Handle all other returned values

                } else {
                  // Only substitute handlers pass on context
                  // and multiple values (non-spec behavior)
                  if (handler !== Identity) {
                    that = undefined;
                    args = [returned];
                  } // Process the value(s)
                  // Default process is resolve


                  (special || deferred.resolveWith)(that, args);
                }
              },
                  // Only normal processors (resolve) catch and reject exceptions
              process = special ? mightThrow : function () {
                try {
                  mightThrow();
                } catch (e) {
                  if (jQuery.Deferred.exceptionHook) {
                    jQuery.Deferred.exceptionHook(e, process.stackTrace);
                  } // Support: Promises/A+ section 2.3.3.3.4.1
                  // https://promisesaplus.com/#point-61
                  // Ignore post-resolution exceptions


                  if (depth + 1 >= maxDepth) {
                    // Only substitute handlers pass on context
                    // and multiple values (non-spec behavior)
                    if (handler !== Thrower) {
                      that = undefined;
                      args = [e];
                    }

                    deferred.rejectWith(that, args);
                  }
                }
              }; // Support: Promises/A+ section 2.3.3.3.1
              // https://promisesaplus.com/#point-57
              // Re-resolve promises immediately to dodge false rejection from
              // subsequent errors


              if (depth) {
                process();
              } else {
                // Call an optional hook to record the stack, in case of exception
                // since it's otherwise lost when execution goes async
                if (jQuery.Deferred.getStackHook) {
                  process.stackTrace = jQuery.Deferred.getStackHook();
                }

                window.setTimeout(process);
              }
            };
          }

          return jQuery.Deferred(function (newDefer) {
            // progress_handlers.add( ... )
            tuples[0][3].add(resolve(0, newDefer, isFunction(onProgress) ? onProgress : Identity, newDefer.notifyWith)); // fulfilled_handlers.add( ... )

            tuples[1][3].add(resolve(0, newDefer, isFunction(onFulfilled) ? onFulfilled : Identity)); // rejected_handlers.add( ... )

            tuples[2][3].add(resolve(0, newDefer, isFunction(onRejected) ? onRejected : Thrower));
          }).promise();
        },
        // Get a promise for this deferred
        // If obj is provided, the promise aspect is added to the object
        promise: function promise(obj) {
          return obj != null ? jQuery.extend(obj, _promise) : _promise;
        }
      },
          deferred = {}; // Add list-specific methods

      jQuery.each(tuples, function (i, tuple) {
        var list = tuple[2],
            stateString = tuple[5]; // promise.progress = list.add
        // promise.done = list.add
        // promise.fail = list.add

        _promise[tuple[1]] = list.add; // Handle state

        if (stateString) {
          list.add(function () {
            // state = "resolved" (i.e., fulfilled)
            // state = "rejected"
            _state = stateString;
          }, // rejected_callbacks.disable
          // fulfilled_callbacks.disable
          tuples[3 - i][2].disable, // rejected_handlers.disable
          // fulfilled_handlers.disable
          tuples[3 - i][3].disable, // progress_callbacks.lock
          tuples[0][2].lock, // progress_handlers.lock
          tuples[0][3].lock);
        } // progress_handlers.fire
        // fulfilled_handlers.fire
        // rejected_handlers.fire


        list.add(tuple[3].fire); // deferred.notify = function() { deferred.notifyWith(...) }
        // deferred.resolve = function() { deferred.resolveWith(...) }
        // deferred.reject = function() { deferred.rejectWith(...) }

        deferred[tuple[0]] = function () {
          deferred[tuple[0] + "With"](this === deferred ? undefined : this, arguments);
          return this;
        }; // deferred.notifyWith = list.fireWith
        // deferred.resolveWith = list.fireWith
        // deferred.rejectWith = list.fireWith


        deferred[tuple[0] + "With"] = list.fireWith;
      }); // Make the deferred a promise

      _promise.promise(deferred); // Call given func if any


      if (func) {
        func.call(deferred, deferred);
      } // All done!


      return deferred;
    },
    // Deferred helper
    when: function when(singleValue) {
      var // count of uncompleted subordinates
      remaining = arguments.length,
          // count of unprocessed arguments
      i = remaining,
          // subordinate fulfillment data
      resolveContexts = Array(i),
          resolveValues = _slice.call(arguments),
          // the master Deferred
      master = jQuery.Deferred(),
          // subordinate callback factory
      updateFunc = function updateFunc(i) {
        return function (value) {
          resolveContexts[i] = this;
          resolveValues[i] = arguments.length > 1 ? _slice.call(arguments) : value;

          if (! --remaining) {
            master.resolveWith(resolveContexts, resolveValues);
          }
        };
      }; // Single- and empty arguments are adopted like Promise.resolve


      if (remaining <= 1) {
        adoptValue(singleValue, master.done(updateFunc(i)).resolve, master.reject, !remaining); // Use .then() to unwrap secondary thenables (cf. gh-3000)

        if (master.state() === "pending" || isFunction(resolveValues[i] && resolveValues[i].then)) {
          return master.then();
        }
      } // Multiple arguments are aggregated like Promise.all array elements


      while (i--) {
        adoptValue(resolveValues[i], updateFunc(i), master.reject);
      }

      return master.promise();
    }
  }); // These usually indicate a programmer mistake during development,
  // warn about them ASAP rather than swallowing them by default.

  var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

  jQuery.Deferred.exceptionHook = function (error, stack) {
    // Support: IE 8 - 9 only
    // Console exists when dev tools are open, which can happen at any time
    if (window.console && window.console.warn && error && rerrorNames.test(error.name)) {
      window.console.warn("jQuery.Deferred exception: " + error.message, error.stack, stack);
    }
  };

  jQuery.readyException = function (error) {
    window.setTimeout(function () {
      throw error;
    });
  }; // The deferred used on DOM ready


  var readyList = jQuery.Deferred();

  jQuery.fn.ready = function (fn) {
    readyList.then(fn) // Wrap jQuery.readyException in a function so that the lookup
    // happens at the time of error handling instead of callback
    // registration.
    ["catch"](function (error) {
      jQuery.readyException(error);
    });
    return this;
  };

  jQuery.extend({
    // Is the DOM ready to be used? Set to true once it occurs.
    isReady: false,
    // A counter to track how many items to wait for before
    // the ready event fires. See #6781
    readyWait: 1,
    // Handle when the DOM is ready
    ready: function ready(wait) {
      // Abort if there are pending holds or we're already ready
      if (wait === true ? --jQuery.readyWait : jQuery.isReady) {
        return;
      } // Remember that the DOM is ready


      jQuery.isReady = true; // If a normal DOM Ready event fired, decrement, and wait if need be

      if (wait !== true && --jQuery.readyWait > 0) {
        return;
      } // If there are functions bound, to execute


      readyList.resolveWith(document, [jQuery]);
    }
  });
  jQuery.ready.then = readyList.then; // The ready event handler and self cleanup method

  function completed() {
    document.removeEventListener("DOMContentLoaded", completed);
    window.removeEventListener("load", completed);
    jQuery.ready();
  } // Catch cases where $(document).ready() is called
  // after the browser event has already occurred.
  // Support: IE <=9 - 10 only
  // Older IE sometimes signals "interactive" too soon


  if (document.readyState === "complete" || document.readyState !== "loading" && !document.documentElement.doScroll) {
    // Handle it asynchronously to allow scripts the opportunity to delay ready
    window.setTimeout(jQuery.ready);
  } else {
    // Use the handy event callback
    document.addEventListener("DOMContentLoaded", completed); // A fallback to window.onload, that will always work

    window.addEventListener("load", completed);
  } // Multifunctional method to get and set values of a collection
  // The value/s can optionally be executed if it's a function


  var access = function access(elems, fn, key, value, chainable, emptyGet, raw) {
    var i = 0,
        len = elems.length,
        bulk = key == null; // Sets many values

    if (toType(key) === "object") {
      chainable = true;

      for (i in key) {
        access(elems, fn, i, key[i], true, emptyGet, raw);
      } // Sets one value

    } else if (value !== undefined) {
      chainable = true;

      if (!isFunction(value)) {
        raw = true;
      }

      if (bulk) {
        // Bulk operations run against the entire set
        if (raw) {
          fn.call(elems, value);
          fn = null; // ...except when executing function values
        } else {
          bulk = fn;

          fn = function fn(elem, _key, value) {
            return bulk.call(jQuery(elem), value);
          };
        }
      }

      if (fn) {
        for (; i < len; i++) {
          fn(elems[i], key, raw ? value : value.call(elems[i], i, fn(elems[i], key)));
        }
      }
    }

    if (chainable) {
      return elems;
    } // Gets


    if (bulk) {
      return fn.call(elems);
    }

    return len ? fn(elems[0], key) : emptyGet;
  }; // Matches dashed string for camelizing


  var rmsPrefix = /^-ms-/,
      rdashAlpha = /-([a-z])/g; // Used by camelCase as callback to replace()

  function fcamelCase(_all, letter) {
    return letter.toUpperCase();
  } // Convert dashed to camelCase; used by the css and data modules
  // Support: IE <=9 - 11, Edge 12 - 15
  // Microsoft forgot to hump their vendor prefix (#9572)


  function camelCase(string) {
    return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
  }

  var acceptData = function acceptData(owner) {
    // Accepts only:
    //  - Node
    //    - Node.ELEMENT_NODE
    //    - Node.DOCUMENT_NODE
    //  - Object
    //    - Any
    return owner.nodeType === 1 || owner.nodeType === 9 || !+owner.nodeType;
  };

  function Data() {
    this.expando = jQuery.expando + Data.uid++;
  }

  Data.uid = 1;
  Data.prototype = {
    cache: function cache(owner) {
      // Check if the owner object already has a cache
      var value = owner[this.expando]; // If not, create one

      if (!value) {
        value = {}; // We can accept data for non-element nodes in modern browsers,
        // but we should not, see #8335.
        // Always return an empty object.

        if (acceptData(owner)) {
          // If it is a node unlikely to be stringify-ed or looped over
          // use plain assignment
          if (owner.nodeType) {
            owner[this.expando] = value; // Otherwise secure it in a non-enumerable property
            // configurable must be true to allow the property to be
            // deleted when data is removed
          } else {
            Object.defineProperty(owner, this.expando, {
              value: value,
              configurable: true
            });
          }
        }
      }

      return value;
    },
    set: function set(owner, data, value) {
      var prop,
          cache = this.cache(owner); // Handle: [ owner, key, value ] args
      // Always use camelCase key (gh-2257)

      if (typeof data === "string") {
        cache[camelCase(data)] = value; // Handle: [ owner, { properties } ] args
      } else {
        // Copy the properties one-by-one to the cache object
        for (prop in data) {
          cache[camelCase(prop)] = data[prop];
        }
      }

      return cache;
    },
    get: function get(owner, key) {
      return key === undefined ? this.cache(owner) : // Always use camelCase key (gh-2257)
      owner[this.expando] && owner[this.expando][camelCase(key)];
    },
    access: function access(owner, key, value) {
      // In cases where either:
      //
      //   1. No key was specified
      //   2. A string key was specified, but no value provided
      //
      // Take the "read" path and allow the get method to determine
      // which value to return, respectively either:
      //
      //   1. The entire cache object
      //   2. The data stored at the key
      //
      if (key === undefined || key && typeof key === "string" && value === undefined) {
        return this.get(owner, key);
      } // When the key is not a string, or both a key and value
      // are specified, set or extend (existing objects) with either:
      //
      //   1. An object of properties
      //   2. A key and value
      //


      this.set(owner, key, value); // Since the "set" path can have two possible entry points
      // return the expected data based on which path was taken[*]

      return value !== undefined ? value : key;
    },
    remove: function remove(owner, key) {
      var i,
          cache = owner[this.expando];

      if (cache === undefined) {
        return;
      }

      if (key !== undefined) {
        // Support array or space separated string of keys
        if (Array.isArray(key)) {
          // If key is an array of keys...
          // We always set camelCase keys, so remove that.
          key = key.map(camelCase);
        } else {
          key = camelCase(key); // If a key with the spaces exists, use it.
          // Otherwise, create an array by matching non-whitespace

          key = key in cache ? [key] : key.match(rnothtmlwhite) || [];
        }

        i = key.length;

        while (i--) {
          delete cache[key[i]];
        }
      } // Remove the expando if there's no more data


      if (key === undefined || jQuery.isEmptyObject(cache)) {
        // Support: Chrome <=35 - 45
        // Webkit & Blink performance suffers when deleting properties
        // from DOM nodes, so set to undefined instead
        // https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
        if (owner.nodeType) {
          owner[this.expando] = undefined;
        } else {
          delete owner[this.expando];
        }
      }
    },
    hasData: function hasData(owner) {
      var cache = owner[this.expando];
      return cache !== undefined && !jQuery.isEmptyObject(cache);
    }
  };
  var dataPriv = new Data();
  var dataUser = new Data(); //	Implementation Summary
  //
  //	1. Enforce API surface and semantic compatibility with 1.9.x branch
  //	2. Improve the module's maintainability by reducing the storage
  //		paths to a single mechanism.
  //	3. Use the same single mechanism to support "private" and "user" data.
  //	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
  //	5. Avoid exposing implementation details on user objects (eg. expando properties)
  //	6. Provide a clear path for implementation upgrade to WeakMap in 2014

  var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
      rmultiDash = /[A-Z]/g;

  function getData(data) {
    if (data === "true") {
      return true;
    }

    if (data === "false") {
      return false;
    }

    if (data === "null") {
      return null;
    } // Only convert to a number if it doesn't change the string


    if (data === +data + "") {
      return +data;
    }

    if (rbrace.test(data)) {
      return JSON.parse(data);
    }

    return data;
  }

  function dataAttr(elem, key, data) {
    var name; // If nothing was found internally, try to fetch any
    // data from the HTML5 data-* attribute

    if (data === undefined && elem.nodeType === 1) {
      name = "data-" + key.replace(rmultiDash, "-$&").toLowerCase();
      data = elem.getAttribute(name);

      if (typeof data === "string") {
        try {
          data = getData(data);
        } catch (e) {} // Make sure we set the data so it isn't changed later


        dataUser.set(elem, key, data);
      } else {
        data = undefined;
      }
    }

    return data;
  }

  jQuery.extend({
    hasData: function hasData(elem) {
      return dataUser.hasData(elem) || dataPriv.hasData(elem);
    },
    data: function data(elem, name, _data) {
      return dataUser.access(elem, name, _data);
    },
    removeData: function removeData(elem, name) {
      dataUser.remove(elem, name);
    },
    // TODO: Now that all calls to _data and _removeData have been replaced
    // with direct calls to dataPriv methods, these can be deprecated.
    _data: function _data(elem, name, data) {
      return dataPriv.access(elem, name, data);
    },
    _removeData: function _removeData(elem, name) {
      dataPriv.remove(elem, name);
    }
  });
  jQuery.fn.extend({
    data: function data(key, value) {
      var i,
          name,
          data,
          elem = this[0],
          attrs = elem && elem.attributes; // Gets all values

      if (key === undefined) {
        if (this.length) {
          data = dataUser.get(elem);

          if (elem.nodeType === 1 && !dataPriv.get(elem, "hasDataAttrs")) {
            i = attrs.length;

            while (i--) {
              // Support: IE 11 only
              // The attrs elements can be null (#14894)
              if (attrs[i]) {
                name = attrs[i].name;

                if (name.indexOf("data-") === 0) {
                  name = camelCase(name.slice(5));
                  dataAttr(elem, name, data[name]);
                }
              }
            }

            dataPriv.set(elem, "hasDataAttrs", true);
          }
        }

        return data;
      } // Sets multiple values


      if (_typeof(key) === "object") {
        return this.each(function () {
          dataUser.set(this, key);
        });
      }

      return access(this, function (value) {
        var data; // The calling jQuery object (element matches) is not empty
        // (and therefore has an element appears at this[ 0 ]) and the
        // `value` parameter was not undefined. An empty jQuery object
        // will result in `undefined` for elem = this[ 0 ] which will
        // throw an exception if an attempt to read a data cache is made.

        if (elem && value === undefined) {
          // Attempt to get data from the cache
          // The key will always be camelCased in Data
          data = dataUser.get(elem, key);

          if (data !== undefined) {
            return data;
          } // Attempt to "discover" the data in
          // HTML5 custom data-* attrs


          data = dataAttr(elem, key);

          if (data !== undefined) {
            return data;
          } // We tried really hard, but the data doesn't exist.


          return;
        } // Set the data...


        this.each(function () {
          // We always store the camelCased key
          dataUser.set(this, key, value);
        });
      }, null, value, arguments.length > 1, null, true);
    },
    removeData: function removeData(key) {
      return this.each(function () {
        dataUser.remove(this, key);
      });
    }
  });
  jQuery.extend({
    queue: function queue(elem, type, data) {
      var queue;

      if (elem) {
        type = (type || "fx") + "queue";
        queue = dataPriv.get(elem, type); // Speed up dequeue by getting out quickly if this is just a lookup

        if (data) {
          if (!queue || Array.isArray(data)) {
            queue = dataPriv.access(elem, type, jQuery.makeArray(data));
          } else {
            queue.push(data);
          }
        }

        return queue || [];
      }
    },
    dequeue: function dequeue(elem, type) {
      type = type || "fx";

      var queue = jQuery.queue(elem, type),
          startLength = queue.length,
          fn = queue.shift(),
          hooks = jQuery._queueHooks(elem, type),
          next = function next() {
        jQuery.dequeue(elem, type);
      }; // If the fx queue is dequeued, always remove the progress sentinel


      if (fn === "inprogress") {
        fn = queue.shift();
        startLength--;
      }

      if (fn) {
        // Add a progress sentinel to prevent the fx queue from being
        // automatically dequeued
        if (type === "fx") {
          queue.unshift("inprogress");
        } // Clear up the last queue stop function


        delete hooks.stop;
        fn.call(elem, next, hooks);
      }

      if (!startLength && hooks) {
        hooks.empty.fire();
      }
    },
    // Not public - generate a queueHooks object, or return the current one
    _queueHooks: function _queueHooks(elem, type) {
      var key = type + "queueHooks";
      return dataPriv.get(elem, key) || dataPriv.access(elem, key, {
        empty: jQuery.Callbacks("once memory").add(function () {
          dataPriv.remove(elem, [type + "queue", key]);
        })
      });
    }
  });
  jQuery.fn.extend({
    queue: function queue(type, data) {
      var setter = 2;

      if (typeof type !== "string") {
        data = type;
        type = "fx";
        setter--;
      }

      if (arguments.length < setter) {
        return jQuery.queue(this[0], type);
      }

      return data === undefined ? this : this.each(function () {
        var queue = jQuery.queue(this, type, data); // Ensure a hooks for this queue

        jQuery._queueHooks(this, type);

        if (type === "fx" && queue[0] !== "inprogress") {
          jQuery.dequeue(this, type);
        }
      });
    },
    dequeue: function dequeue(type) {
      return this.each(function () {
        jQuery.dequeue(this, type);
      });
    },
    clearQueue: function clearQueue(type) {
      return this.queue(type || "fx", []);
    },
    // Get a promise resolved when queues of a certain type
    // are emptied (fx is the type by default)
    promise: function promise(type, obj) {
      var tmp,
          count = 1,
          defer = jQuery.Deferred(),
          elements = this,
          i = this.length,
          resolve = function resolve() {
        if (! --count) {
          defer.resolveWith(elements, [elements]);
        }
      };

      if (typeof type !== "string") {
        obj = type;
        type = undefined;
      }

      type = type || "fx";

      while (i--) {
        tmp = dataPriv.get(elements[i], type + "queueHooks");

        if (tmp && tmp.empty) {
          count++;
          tmp.empty.add(resolve);
        }
      }

      resolve();
      return defer.promise(obj);
    }
  });
  var pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source;
  var rcssNum = new RegExp("^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i");
  var cssExpand = ["Top", "Right", "Bottom", "Left"];
  var documentElement = document.documentElement;

  var isAttached = function isAttached(elem) {
    return jQuery.contains(elem.ownerDocument, elem);
  },
      composed = {
    composed: true
  }; // Support: IE 9 - 11+, Edge 12 - 18+, iOS 10.0 - 10.2 only
  // Check attachment across shadow DOM boundaries when possible (gh-3504)
  // Support: iOS 10.0-10.2 only
  // Early iOS 10 versions support `attachShadow` but not `getRootNode`,
  // leading to errors. We need to check for `getRootNode`.


  if (documentElement.getRootNode) {
    isAttached = function isAttached(elem) {
      return jQuery.contains(elem.ownerDocument, elem) || elem.getRootNode(composed) === elem.ownerDocument;
    };
  }

  var isHiddenWithinTree = function isHiddenWithinTree(elem, el) {
    // isHiddenWithinTree might be called from jQuery#filter function;
    // in that case, element will be second argument
    elem = el || elem; // Inline style trumps all

    return elem.style.display === "none" || elem.style.display === "" && // Otherwise, check computed style
    // Support: Firefox <=43 - 45
    // Disconnected elements can have computed display: none, so first confirm that elem is
    // in the document.
    isAttached(elem) && jQuery.css(elem, "display") === "none";
  };

  function adjustCSS(elem, prop, valueParts, tween) {
    var adjusted,
        scale,
        maxIterations = 20,
        currentValue = tween ? function () {
      return tween.cur();
    } : function () {
      return jQuery.css(elem, prop, "");
    },
        initial = currentValue(),
        unit = valueParts && valueParts[3] || (jQuery.cssNumber[prop] ? "" : "px"),
        // Starting value computation is required for potential unit mismatches
    initialInUnit = elem.nodeType && (jQuery.cssNumber[prop] || unit !== "px" && +initial) && rcssNum.exec(jQuery.css(elem, prop));

    if (initialInUnit && initialInUnit[3] !== unit) {
      // Support: Firefox <=54
      // Halve the iteration target value to prevent interference from CSS upper bounds (gh-2144)
      initial = initial / 2; // Trust units reported by jQuery.css

      unit = unit || initialInUnit[3]; // Iteratively approximate from a nonzero starting point

      initialInUnit = +initial || 1;

      while (maxIterations--) {
        // Evaluate and update our best guess (doubling guesses that zero out).
        // Finish if the scale equals or crosses 1 (making the old*new product non-positive).
        jQuery.style(elem, prop, initialInUnit + unit);

        if ((1 - scale) * (1 - (scale = currentValue() / initial || 0.5)) <= 0) {
          maxIterations = 0;
        }

        initialInUnit = initialInUnit / scale;
      }

      initialInUnit = initialInUnit * 2;
      jQuery.style(elem, prop, initialInUnit + unit); // Make sure we update the tween properties later on

      valueParts = valueParts || [];
    }

    if (valueParts) {
      initialInUnit = +initialInUnit || +initial || 0; // Apply relative offset (+=/-=) if specified

      adjusted = valueParts[1] ? initialInUnit + (valueParts[1] + 1) * valueParts[2] : +valueParts[2];

      if (tween) {
        tween.unit = unit;
        tween.start = initialInUnit;
        tween.end = adjusted;
      }
    }

    return adjusted;
  }

  var defaultDisplayMap = {};

  function getDefaultDisplay(elem) {
    var temp,
        doc = elem.ownerDocument,
        nodeName = elem.nodeName,
        display = defaultDisplayMap[nodeName];

    if (display) {
      return display;
    }

    temp = doc.body.appendChild(doc.createElement(nodeName));
    display = jQuery.css(temp, "display");
    temp.parentNode.removeChild(temp);

    if (display === "none") {
      display = "block";
    }

    defaultDisplayMap[nodeName] = display;
    return display;
  }

  function showHide(elements, show) {
    var display,
        elem,
        values = [],
        index = 0,
        length = elements.length; // Determine new display value for elements that need to change

    for (; index < length; index++) {
      elem = elements[index];

      if (!elem.style) {
        continue;
      }

      display = elem.style.display;

      if (show) {
        // Since we force visibility upon cascade-hidden elements, an immediate (and slow)
        // check is required in this first loop unless we have a nonempty display value (either
        // inline or about-to-be-restored)
        if (display === "none") {
          values[index] = dataPriv.get(elem, "display") || null;

          if (!values[index]) {
            elem.style.display = "";
          }
        }

        if (elem.style.display === "" && isHiddenWithinTree(elem)) {
          values[index] = getDefaultDisplay(elem);
        }
      } else {
        if (display !== "none") {
          values[index] = "none"; // Remember what we're overwriting

          dataPriv.set(elem, "display", display);
        }
      }
    } // Set the display of the elements in a second loop to avoid constant reflow


    for (index = 0; index < length; index++) {
      if (values[index] != null) {
        elements[index].style.display = values[index];
      }
    }

    return elements;
  }

  jQuery.fn.extend({
    show: function show() {
      return showHide(this, true);
    },
    hide: function hide() {
      return showHide(this);
    },
    toggle: function toggle(state) {
      if (typeof state === "boolean") {
        return state ? this.show() : this.hide();
      }

      return this.each(function () {
        if (isHiddenWithinTree(this)) {
          jQuery(this).show();
        } else {
          jQuery(this).hide();
        }
      });
    }
  });
  var rcheckableType = /^(?:checkbox|radio)$/i;
  var rtagName = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i;
  var rscriptType = /^$|^module$|\/(?:java|ecma)script/i;

  (function () {
    var fragment = document.createDocumentFragment(),
        div = fragment.appendChild(document.createElement("div")),
        input = document.createElement("input"); // Support: Android 4.0 - 4.3 only
    // Check state lost if the name is set (#11217)
    // Support: Windows Web Apps (WWA)
    // `name` and `type` must use .setAttribute for WWA (#14901)

    input.setAttribute("type", "radio");
    input.setAttribute("checked", "checked");
    input.setAttribute("name", "t");
    div.appendChild(input); // Support: Android <=4.1 only
    // Older WebKit doesn't clone checked state correctly in fragments

    support.checkClone = div.cloneNode(true).cloneNode(true).lastChild.checked; // Support: IE <=11 only
    // Make sure textarea (and checkbox) defaultValue is properly cloned

    div.innerHTML = "<textarea>x</textarea>";
    support.noCloneChecked = !!div.cloneNode(true).lastChild.defaultValue; // Support: IE <=9 only
    // IE <=9 replaces <option> tags with their contents when inserted outside of
    // the select element.

    div.innerHTML = "<option></option>";
    support.option = !!div.lastChild;
  })(); // We have to close these tags to support XHTML (#13200)


  var wrapMap = {
    // XHTML parsers do not magically insert elements in the
    // same way that tag soup parsers do. So we cannot shorten
    // this by omitting <tbody> or other required elements.
    thead: [1, "<table>", "</table>"],
    col: [2, "<table><colgroup>", "</colgroup></table>"],
    tr: [2, "<table><tbody>", "</tbody></table>"],
    td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
    _default: [0, "", ""]
  };
  wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
  wrapMap.th = wrapMap.td; // Support: IE <=9 only

  if (!support.option) {
    wrapMap.optgroup = wrapMap.option = [1, "<select multiple='multiple'>", "</select>"];
  }

  function getAll(context, tag) {
    // Support: IE <=9 - 11 only
    // Use typeof to avoid zero-argument method invocation on host objects (#15151)
    var ret;

    if (typeof context.getElementsByTagName !== "undefined") {
      ret = context.getElementsByTagName(tag || "*");
    } else if (typeof context.querySelectorAll !== "undefined") {
      ret = context.querySelectorAll(tag || "*");
    } else {
      ret = [];
    }

    if (tag === undefined || tag && nodeName(context, tag)) {
      return jQuery.merge([context], ret);
    }

    return ret;
  } // Mark scripts as having already been evaluated


  function setGlobalEval(elems, refElements) {
    var i = 0,
        l = elems.length;

    for (; i < l; i++) {
      dataPriv.set(elems[i], "globalEval", !refElements || dataPriv.get(refElements[i], "globalEval"));
    }
  }

  var rhtml = /<|&#?\w+;/;

  function buildFragment(elems, context, scripts, selection, ignored) {
    var elem,
        tmp,
        tag,
        wrap,
        attached,
        j,
        fragment = context.createDocumentFragment(),
        nodes = [],
        i = 0,
        l = elems.length;

    for (; i < l; i++) {
      elem = elems[i];

      if (elem || elem === 0) {
        // Add nodes directly
        if (toType(elem) === "object") {
          // Support: Android <=4.0 only, PhantomJS 1 only
          // push.apply(_, arraylike) throws on ancient WebKit
          jQuery.merge(nodes, elem.nodeType ? [elem] : elem); // Convert non-html into a text node
        } else if (!rhtml.test(elem)) {
          nodes.push(context.createTextNode(elem)); // Convert html into DOM nodes
        } else {
          tmp = tmp || fragment.appendChild(context.createElement("div")); // Deserialize a standard representation

          tag = (rtagName.exec(elem) || ["", ""])[1].toLowerCase();
          wrap = wrapMap[tag] || wrapMap._default;
          tmp.innerHTML = wrap[1] + jQuery.htmlPrefilter(elem) + wrap[2]; // Descend through wrappers to the right content

          j = wrap[0];

          while (j--) {
            tmp = tmp.lastChild;
          } // Support: Android <=4.0 only, PhantomJS 1 only
          // push.apply(_, arraylike) throws on ancient WebKit


          jQuery.merge(nodes, tmp.childNodes); // Remember the top-level container

          tmp = fragment.firstChild; // Ensure the created nodes are orphaned (#12392)

          tmp.textContent = "";
        }
      }
    } // Remove wrapper from fragment


    fragment.textContent = "";
    i = 0;

    while (elem = nodes[i++]) {
      // Skip elements already in the context collection (trac-4087)
      if (selection && jQuery.inArray(elem, selection) > -1) {
        if (ignored) {
          ignored.push(elem);
        }

        continue;
      }

      attached = isAttached(elem); // Append to fragment

      tmp = getAll(fragment.appendChild(elem), "script"); // Preserve script evaluation history

      if (attached) {
        setGlobalEval(tmp);
      } // Capture executables


      if (scripts) {
        j = 0;

        while (elem = tmp[j++]) {
          if (rscriptType.test(elem.type || "")) {
            scripts.push(elem);
          }
        }
      }
    }

    return fragment;
  }

  var rkeyEvent = /^key/,
      rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
      rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

  function returnTrue() {
    return true;
  }

  function returnFalse() {
    return false;
  } // Support: IE <=9 - 11+
  // focus() and blur() are asynchronous, except when they are no-op.
  // So expect focus to be synchronous when the element is already active,
  // and blur to be synchronous when the element is not already active.
  // (focus and blur are always synchronous in other supported browsers,
  // this just defines when we can count on it).


  function expectSync(elem, type) {
    return elem === safeActiveElement() === (type === "focus");
  } // Support: IE <=9 only
  // Accessing document.activeElement can throw unexpectedly
  // https://bugs.jquery.com/ticket/13393


  function safeActiveElement() {
    try {
      return document.activeElement;
    } catch (err) {}
  }

  function _on(elem, types, selector, data, fn, one) {
    var origFn, type; // Types can be a map of types/handlers

    if (_typeof(types) === "object") {
      // ( types-Object, selector, data )
      if (typeof selector !== "string") {
        // ( types-Object, data )
        data = data || selector;
        selector = undefined;
      }

      for (type in types) {
        _on(elem, type, selector, data, types[type], one);
      }

      return elem;
    }

    if (data == null && fn == null) {
      // ( types, fn )
      fn = selector;
      data = selector = undefined;
    } else if (fn == null) {
      if (typeof selector === "string") {
        // ( types, selector, fn )
        fn = data;
        data = undefined;
      } else {
        // ( types, data, fn )
        fn = data;
        data = selector;
        selector = undefined;
      }
    }

    if (fn === false) {
      fn = returnFalse;
    } else if (!fn) {
      return elem;
    }

    if (one === 1) {
      origFn = fn;

      fn = function fn(event) {
        // Can use an empty set, since event contains the info
        jQuery().off(event);
        return origFn.apply(this, arguments);
      }; // Use same guid so caller can remove using origFn


      fn.guid = origFn.guid || (origFn.guid = jQuery.guid++);
    }

    return elem.each(function () {
      jQuery.event.add(this, types, fn, data, selector);
    });
  }
  /*
   * Helper functions for managing events -- not part of the public interface.
   * Props to Dean Edwards' addEvent library for many of the ideas.
   */


  jQuery.event = {
    global: {},
    add: function add(elem, types, handler, data, selector) {
      var handleObjIn,
          eventHandle,
          tmp,
          events,
          t,
          handleObj,
          special,
          handlers,
          type,
          namespaces,
          origType,
          elemData = dataPriv.get(elem); // Only attach events to objects that accept data

      if (!acceptData(elem)) {
        return;
      } // Caller can pass in an object of custom data in lieu of the handler


      if (handler.handler) {
        handleObjIn = handler;
        handler = handleObjIn.handler;
        selector = handleObjIn.selector;
      } // Ensure that invalid selectors throw exceptions at attach time
      // Evaluate against documentElement in case elem is a non-element node (e.g., document)


      if (selector) {
        jQuery.find.matchesSelector(documentElement, selector);
      } // Make sure that the handler has a unique ID, used to find/remove it later


      if (!handler.guid) {
        handler.guid = jQuery.guid++;
      } // Init the element's event structure and main handler, if this is the first


      if (!(events = elemData.events)) {
        events = elemData.events = Object.create(null);
      }

      if (!(eventHandle = elemData.handle)) {
        eventHandle = elemData.handle = function (e) {
          // Discard the second event of a jQuery.event.trigger() and
          // when an event is called after a page has unloaded
          return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ? jQuery.event.dispatch.apply(elem, arguments) : undefined;
        };
      } // Handle multiple events separated by a space


      types = (types || "").match(rnothtmlwhite) || [""];
      t = types.length;

      while (t--) {
        tmp = rtypenamespace.exec(types[t]) || [];
        type = origType = tmp[1];
        namespaces = (tmp[2] || "").split(".").sort(); // There *must* be a type, no attaching namespace-only handlers

        if (!type) {
          continue;
        } // If event changes its type, use the special event handlers for the changed type


        special = jQuery.event.special[type] || {}; // If selector defined, determine special event api type, otherwise given type

        type = (selector ? special.delegateType : special.bindType) || type; // Update special based on newly reset type

        special = jQuery.event.special[type] || {}; // handleObj is passed to all event handlers

        handleObj = jQuery.extend({
          type: type,
          origType: origType,
          data: data,
          handler: handler,
          guid: handler.guid,
          selector: selector,
          needsContext: selector && jQuery.expr.match.needsContext.test(selector),
          namespace: namespaces.join(".")
        }, handleObjIn); // Init the event handler queue if we're the first

        if (!(handlers = events[type])) {
          handlers = events[type] = [];
          handlers.delegateCount = 0; // Only use addEventListener if the special events handler returns false

          if (!special.setup || special.setup.call(elem, data, namespaces, eventHandle) === false) {
            if (elem.addEventListener) {
              elem.addEventListener(type, eventHandle);
            }
          }
        }

        if (special.add) {
          special.add.call(elem, handleObj);

          if (!handleObj.handler.guid) {
            handleObj.handler.guid = handler.guid;
          }
        } // Add to the element's handler list, delegates in front


        if (selector) {
          handlers.splice(handlers.delegateCount++, 0, handleObj);
        } else {
          handlers.push(handleObj);
        } // Keep track of which events have ever been used, for event optimization


        jQuery.event.global[type] = true;
      }
    },
    // Detach an event or set of events from an element
    remove: function remove(elem, types, handler, selector, mappedTypes) {
      var j,
          origCount,
          tmp,
          events,
          t,
          handleObj,
          special,
          handlers,
          type,
          namespaces,
          origType,
          elemData = dataPriv.hasData(elem) && dataPriv.get(elem);

      if (!elemData || !(events = elemData.events)) {
        return;
      } // Once for each type.namespace in types; type may be omitted


      types = (types || "").match(rnothtmlwhite) || [""];
      t = types.length;

      while (t--) {
        tmp = rtypenamespace.exec(types[t]) || [];
        type = origType = tmp[1];
        namespaces = (tmp[2] || "").split(".").sort(); // Unbind all events (on this namespace, if provided) for the element

        if (!type) {
          for (type in events) {
            jQuery.event.remove(elem, type + types[t], handler, selector, true);
          }

          continue;
        }

        special = jQuery.event.special[type] || {};
        type = (selector ? special.delegateType : special.bindType) || type;
        handlers = events[type] || [];
        tmp = tmp[2] && new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)"); // Remove matching events

        origCount = j = handlers.length;

        while (j--) {
          handleObj = handlers[j];

          if ((mappedTypes || origType === handleObj.origType) && (!handler || handler.guid === handleObj.guid) && (!tmp || tmp.test(handleObj.namespace)) && (!selector || selector === handleObj.selector || selector === "**" && handleObj.selector)) {
            handlers.splice(j, 1);

            if (handleObj.selector) {
              handlers.delegateCount--;
            }

            if (special.remove) {
              special.remove.call(elem, handleObj);
            }
          }
        } // Remove generic event handler if we removed something and no more handlers exist
        // (avoids potential for endless recursion during removal of special event handlers)


        if (origCount && !handlers.length) {
          if (!special.teardown || special.teardown.call(elem, namespaces, elemData.handle) === false) {
            jQuery.removeEvent(elem, type, elemData.handle);
          }

          delete events[type];
        }
      } // Remove data and the expando if it's no longer used


      if (jQuery.isEmptyObject(events)) {
        dataPriv.remove(elem, "handle events");
      }
    },
    dispatch: function dispatch(nativeEvent) {
      var i,
          j,
          ret,
          matched,
          handleObj,
          handlerQueue,
          args = new Array(arguments.length),
          // Make a writable jQuery.Event from the native event object
      event = jQuery.event.fix(nativeEvent),
          handlers = (dataPriv.get(this, "events") || Object.create(null))[event.type] || [],
          special = jQuery.event.special[event.type] || {}; // Use the fix-ed jQuery.Event rather than the (read-only) native event

      args[0] = event;

      for (i = 1; i < arguments.length; i++) {
        args[i] = arguments[i];
      }

      event.delegateTarget = this; // Call the preDispatch hook for the mapped type, and let it bail if desired

      if (special.preDispatch && special.preDispatch.call(this, event) === false) {
        return;
      } // Determine handlers


      handlerQueue = jQuery.event.handlers.call(this, event, handlers); // Run delegates first; they may want to stop propagation beneath us

      i = 0;

      while ((matched = handlerQueue[i++]) && !event.isPropagationStopped()) {
        event.currentTarget = matched.elem;
        j = 0;

        while ((handleObj = matched.handlers[j++]) && !event.isImmediatePropagationStopped()) {
          // If the event is namespaced, then each handler is only invoked if it is
          // specially universal or its namespaces are a superset of the event's.
          if (!event.rnamespace || handleObj.namespace === false || event.rnamespace.test(handleObj.namespace)) {
            event.handleObj = handleObj;
            event.data = handleObj.data;
            ret = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler).apply(matched.elem, args);

            if (ret !== undefined) {
              if ((event.result = ret) === false) {
                event.preventDefault();
                event.stopPropagation();
              }
            }
          }
        }
      } // Call the postDispatch hook for the mapped type


      if (special.postDispatch) {
        special.postDispatch.call(this, event);
      }

      return event.result;
    },
    handlers: function handlers(event, _handlers) {
      var i,
          handleObj,
          sel,
          matchedHandlers,
          matchedSelectors,
          handlerQueue = [],
          delegateCount = _handlers.delegateCount,
          cur = event.target; // Find delegate handlers

      if (delegateCount && // Support: IE <=9
      // Black-hole SVG <use> instance trees (trac-13180)
      cur.nodeType && // Support: Firefox <=42
      // Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
      // https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
      // Support: IE 11 only
      // ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
      !(event.type === "click" && event.button >= 1)) {
        for (; cur !== this; cur = cur.parentNode || this) {
          // Don't check non-elements (#13208)
          // Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
          if (cur.nodeType === 1 && !(event.type === "click" && cur.disabled === true)) {
            matchedHandlers = [];
            matchedSelectors = {};

            for (i = 0; i < delegateCount; i++) {
              handleObj = _handlers[i]; // Don't conflict with Object.prototype properties (#13203)

              sel = handleObj.selector + " ";

              if (matchedSelectors[sel] === undefined) {
                matchedSelectors[sel] = handleObj.needsContext ? jQuery(sel, this).index(cur) > -1 : jQuery.find(sel, this, null, [cur]).length;
              }

              if (matchedSelectors[sel]) {
                matchedHandlers.push(handleObj);
              }
            }

            if (matchedHandlers.length) {
              handlerQueue.push({
                elem: cur,
                handlers: matchedHandlers
              });
            }
          }
        }
      } // Add the remaining (directly-bound) handlers


      cur = this;

      if (delegateCount < _handlers.length) {
        handlerQueue.push({
          elem: cur,
          handlers: _handlers.slice(delegateCount)
        });
      }

      return handlerQueue;
    },
    addProp: function addProp(name, hook) {
      Object.defineProperty(jQuery.Event.prototype, name, {
        enumerable: true,
        configurable: true,
        get: isFunction(hook) ? function () {
          if (this.originalEvent) {
            return hook(this.originalEvent);
          }
        } : function () {
          if (this.originalEvent) {
            return this.originalEvent[name];
          }
        },
        set: function set(value) {
          Object.defineProperty(this, name, {
            enumerable: true,
            configurable: true,
            writable: true,
            value: value
          });
        }
      });
    },
    fix: function fix(originalEvent) {
      return originalEvent[jQuery.expando] ? originalEvent : new jQuery.Event(originalEvent);
    },
    special: {
      load: {
        // Prevent triggered image.load events from bubbling to window.load
        noBubble: true
      },
      click: {
        // Utilize native event to ensure correct state for checkable inputs
        setup: function setup(data) {
          // For mutual compressibility with _default, replace `this` access with a local var.
          // `|| data` is dead code meant only to preserve the variable through minification.
          var el = this || data; // Claim the first handler

          if (rcheckableType.test(el.type) && el.click && nodeName(el, "input")) {
            // dataPriv.set( el, "click", ... )
            leverageNative(el, "click", returnTrue);
          } // Return false to allow normal processing in the caller


          return false;
        },
        trigger: function trigger(data) {
          // For mutual compressibility with _default, replace `this` access with a local var.
          // `|| data` is dead code meant only to preserve the variable through minification.
          var el = this || data; // Force setup before triggering a click

          if (rcheckableType.test(el.type) && el.click && nodeName(el, "input")) {
            leverageNative(el, "click");
          } // Return non-false to allow normal event-path propagation


          return true;
        },
        // For cross-browser consistency, suppress native .click() on links
        // Also prevent it if we're currently inside a leveraged native-event stack
        _default: function _default(event) {
          var target = event.target;
          return rcheckableType.test(target.type) && target.click && nodeName(target, "input") && dataPriv.get(target, "click") || nodeName(target, "a");
        }
      },
      beforeunload: {
        postDispatch: function postDispatch(event) {
          // Support: Firefox 20+
          // Firefox doesn't alert if the returnValue field is not set.
          if (event.result !== undefined && event.originalEvent) {
            event.originalEvent.returnValue = event.result;
          }
        }
      }
    }
  }; // Ensure the presence of an event listener that handles manually-triggered
  // synthetic events by interrupting progress until reinvoked in response to
  // *native* events that it fires directly, ensuring that state changes have
  // already occurred before other listeners are invoked.

  function leverageNative(el, type, expectSync) {
    // Missing expectSync indicates a trigger call, which must force setup through jQuery.event.add
    if (!expectSync) {
      if (dataPriv.get(el, type) === undefined) {
        jQuery.event.add(el, type, returnTrue);
      }

      return;
    } // Register the controller as a special universal handler for all event namespaces


    dataPriv.set(el, type, false);
    jQuery.event.add(el, type, {
      namespace: false,
      handler: function handler(event) {
        var notAsync,
            result,
            saved = dataPriv.get(this, type);

        if (event.isTrigger & 1 && this[type]) {
          // Interrupt processing of the outer synthetic .trigger()ed event
          // Saved data should be false in such cases, but might be a leftover capture object
          // from an async native handler (gh-4350)
          if (!saved.length) {
            // Store arguments for use when handling the inner native event
            // There will always be at least one argument (an event object), so this array
            // will not be confused with a leftover capture object.
            saved = _slice.call(arguments);
            dataPriv.set(this, type, saved); // Trigger the native event and capture its result
            // Support: IE <=9 - 11+
            // focus() and blur() are asynchronous

            notAsync = expectSync(this, type);
            this[type]();
            result = dataPriv.get(this, type);

            if (saved !== result || notAsync) {
              dataPriv.set(this, type, false);
            } else {
              result = {};
            }

            if (saved !== result) {
              // Cancel the outer synthetic event
              event.stopImmediatePropagation();
              event.preventDefault();
              return result.value;
            } // If this is an inner synthetic event for an event with a bubbling surrogate
            // (focus or blur), assume that the surrogate already propagated from triggering the
            // native event and prevent that from happening again here.
            // This technically gets the ordering wrong w.r.t. to `.trigger()` (in which the
            // bubbling surrogate propagates *after* the non-bubbling base), but that seems
            // less bad than duplication.

          } else if ((jQuery.event.special[type] || {}).delegateType) {
            event.stopPropagation();
          } // If this is a native event triggered above, everything is now in order
          // Fire an inner synthetic event with the original arguments

        } else if (saved.length) {
          // ...and capture the result
          dataPriv.set(this, type, {
            value: jQuery.event.trigger( // Support: IE <=9 - 11+
            // Extend with the prototype to reset the above stopImmediatePropagation()
            jQuery.extend(saved[0], jQuery.Event.prototype), saved.slice(1), this)
          }); // Abort handling of the native event

          event.stopImmediatePropagation();
        }
      }
    });
  }

  jQuery.removeEvent = function (elem, type, handle) {
    // This "if" is needed for plain objects
    if (elem.removeEventListener) {
      elem.removeEventListener(type, handle);
    }
  };

  jQuery.Event = function (src, props) {
    // Allow instantiation without the 'new' keyword
    if (!(this instanceof jQuery.Event)) {
      return new jQuery.Event(src, props);
    } // Event object


    if (src && src.type) {
      this.originalEvent = src;
      this.type = src.type; // Events bubbling up the document may have been marked as prevented
      // by a handler lower down the tree; reflect the correct value.

      this.isDefaultPrevented = src.defaultPrevented || src.defaultPrevented === undefined && // Support: Android <=2.3 only
      src.returnValue === false ? returnTrue : returnFalse; // Create target properties
      // Support: Safari <=6 - 7 only
      // Target should not be a text node (#504, #13143)

      this.target = src.target && src.target.nodeType === 3 ? src.target.parentNode : src.target;
      this.currentTarget = src.currentTarget;
      this.relatedTarget = src.relatedTarget; // Event type
    } else {
      this.type = src;
    } // Put explicitly provided properties onto the event object


    if (props) {
      jQuery.extend(this, props);
    } // Create a timestamp if incoming event doesn't have one


    this.timeStamp = src && src.timeStamp || Date.now(); // Mark it as fixed

    this[jQuery.expando] = true;
  }; // jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
  // https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html


  jQuery.Event.prototype = {
    constructor: jQuery.Event,
    isDefaultPrevented: returnFalse,
    isPropagationStopped: returnFalse,
    isImmediatePropagationStopped: returnFalse,
    isSimulated: false,
    preventDefault: function preventDefault() {
      var e = this.originalEvent;
      this.isDefaultPrevented = returnTrue;

      if (e && !this.isSimulated) {
        e.preventDefault();
      }
    },
    stopPropagation: function stopPropagation() {
      var e = this.originalEvent;
      this.isPropagationStopped = returnTrue;

      if (e && !this.isSimulated) {
        e.stopPropagation();
      }
    },
    stopImmediatePropagation: function stopImmediatePropagation() {
      var e = this.originalEvent;
      this.isImmediatePropagationStopped = returnTrue;

      if (e && !this.isSimulated) {
        e.stopImmediatePropagation();
      }

      this.stopPropagation();
    }
  }; // Includes all common event props including KeyEvent and MouseEvent specific props

  jQuery.each({
    altKey: true,
    bubbles: true,
    cancelable: true,
    changedTouches: true,
    ctrlKey: true,
    detail: true,
    eventPhase: true,
    metaKey: true,
    pageX: true,
    pageY: true,
    shiftKey: true,
    view: true,
    "char": true,
    code: true,
    charCode: true,
    key: true,
    keyCode: true,
    button: true,
    buttons: true,
    clientX: true,
    clientY: true,
    offsetX: true,
    offsetY: true,
    pointerId: true,
    pointerType: true,
    screenX: true,
    screenY: true,
    targetTouches: true,
    toElement: true,
    touches: true,
    which: function which(event) {
      var button = event.button; // Add which for key events

      if (event.which == null && rkeyEvent.test(event.type)) {
        return event.charCode != null ? event.charCode : event.keyCode;
      } // Add which for click: 1 === left; 2 === middle; 3 === right


      if (!event.which && button !== undefined && rmouseEvent.test(event.type)) {
        if (button & 1) {
          return 1;
        }

        if (button & 2) {
          return 3;
        }

        if (button & 4) {
          return 2;
        }

        return 0;
      }

      return event.which;
    }
  }, jQuery.event.addProp);
  jQuery.each({
    focus: "focusin",
    blur: "focusout"
  }, function (type, delegateType) {
    jQuery.event.special[type] = {
      // Utilize native event if possible so blur/focus sequence is correct
      setup: function setup() {
        // Claim the first handler
        // dataPriv.set( this, "focus", ... )
        // dataPriv.set( this, "blur", ... )
        leverageNative(this, type, expectSync); // Return false to allow normal processing in the caller

        return false;
      },
      trigger: function trigger() {
        // Force setup before trigger
        leverageNative(this, type); // Return non-false to allow normal event-path propagation

        return true;
      },
      delegateType: delegateType
    };
  }); // Create mouseenter/leave events using mouseover/out and event-time checks
  // so that event delegation works in jQuery.
  // Do the same for pointerenter/pointerleave and pointerover/pointerout
  //
  // Support: Safari 7 only
  // Safari sends mouseenter too often; see:
  // https://bugs.chromium.org/p/chromium/issues/detail?id=470258
  // for the description of the bug (it existed in older Chrome versions as well).

  jQuery.each({
    mouseenter: "mouseover",
    mouseleave: "mouseout",
    pointerenter: "pointerover",
    pointerleave: "pointerout"
  }, function (orig, fix) {
    jQuery.event.special[orig] = {
      delegateType: fix,
      bindType: fix,
      handle: function handle(event) {
        var ret,
            target = this,
            related = event.relatedTarget,
            handleObj = event.handleObj; // For mouseenter/leave call the handler if related is outside the target.
        // NB: No relatedTarget if the mouse left/entered the browser window

        if (!related || related !== target && !jQuery.contains(target, related)) {
          event.type = handleObj.origType;
          ret = handleObj.handler.apply(this, arguments);
          event.type = fix;
        }

        return ret;
      }
    };
  });
  jQuery.fn.extend({
    on: function on(types, selector, data, fn) {
      return _on(this, types, selector, data, fn);
    },
    one: function one(types, selector, data, fn) {
      return _on(this, types, selector, data, fn, 1);
    },
    off: function off(types, selector, fn) {
      var handleObj, type;

      if (types && types.preventDefault && types.handleObj) {
        // ( event )  dispatched jQuery.Event
        handleObj = types.handleObj;
        jQuery(types.delegateTarget).off(handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType, handleObj.selector, handleObj.handler);
        return this;
      }

      if (_typeof(types) === "object") {
        // ( types-object [, selector] )
        for (type in types) {
          this.off(type, selector, types[type]);
        }

        return this;
      }

      if (selector === false || typeof selector === "function") {
        // ( types [, fn] )
        fn = selector;
        selector = undefined;
      }

      if (fn === false) {
        fn = returnFalse;
      }

      return this.each(function () {
        jQuery.event.remove(this, types, fn, selector);
      });
    }
  });
  var // Support: IE <=10 - 11, Edge 12 - 13 only
  // In IE/Edge using regex groups here causes severe slowdowns.
  // See https://connect.microsoft.com/IE/feedback/details/1736512/
  rnoInnerhtml = /<script|<style|<link/i,
      // checked="checked" or checked
  rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
      rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g; // Prefer a tbody over its parent table for containing new rows

  function manipulationTarget(elem, content) {
    if (nodeName(elem, "table") && nodeName(content.nodeType !== 11 ? content : content.firstChild, "tr")) {
      return jQuery(elem).children("tbody")[0] || elem;
    }

    return elem;
  } // Replace/restore the type attribute of script elements for safe DOM manipulation


  function disableScript(elem) {
    elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
    return elem;
  }

  function restoreScript(elem) {
    if ((elem.type || "").slice(0, 5) === "true/") {
      elem.type = elem.type.slice(5);
    } else {
      elem.removeAttribute("type");
    }

    return elem;
  }

  function cloneCopyEvent(src, dest) {
    var i, l, type, pdataOld, udataOld, udataCur, events;

    if (dest.nodeType !== 1) {
      return;
    } // 1. Copy private data: events, handlers, etc.


    if (dataPriv.hasData(src)) {
      pdataOld = dataPriv.get(src);
      events = pdataOld.events;

      if (events) {
        dataPriv.remove(dest, "handle events");

        for (type in events) {
          for (i = 0, l = events[type].length; i < l; i++) {
            jQuery.event.add(dest, type, events[type][i]);
          }
        }
      }
    } // 2. Copy user data


    if (dataUser.hasData(src)) {
      udataOld = dataUser.access(src);
      udataCur = jQuery.extend({}, udataOld);
      dataUser.set(dest, udataCur);
    }
  } // Fix IE bugs, see support tests


  function fixInput(src, dest) {
    var nodeName = dest.nodeName.toLowerCase(); // Fails to persist the checked state of a cloned checkbox or radio button.

    if (nodeName === "input" && rcheckableType.test(src.type)) {
      dest.checked = src.checked; // Fails to return the selected option to the default selected state when cloning options
    } else if (nodeName === "input" || nodeName === "textarea") {
      dest.defaultValue = src.defaultValue;
    }
  }

  function domManip(collection, args, callback, ignored) {
    // Flatten any nested arrays
    args = flat(args);
    var fragment,
        first,
        scripts,
        hasScripts,
        node,
        doc,
        i = 0,
        l = collection.length,
        iNoClone = l - 1,
        value = args[0],
        valueIsFunction = isFunction(value); // We can't cloneNode fragments that contain checked, in WebKit

    if (valueIsFunction || l > 1 && typeof value === "string" && !support.checkClone && rchecked.test(value)) {
      return collection.each(function (index) {
        var self = collection.eq(index);

        if (valueIsFunction) {
          args[0] = value.call(this, index, self.html());
        }

        domManip(self, args, callback, ignored);
      });
    }

    if (l) {
      fragment = buildFragment(args, collection[0].ownerDocument, false, collection, ignored);
      first = fragment.firstChild;

      if (fragment.childNodes.length === 1) {
        fragment = first;
      } // Require either new content or an interest in ignored elements to invoke the callback


      if (first || ignored) {
        scripts = jQuery.map(getAll(fragment, "script"), disableScript);
        hasScripts = scripts.length; // Use the original fragment for the last item
        // instead of the first because it can end up
        // being emptied incorrectly in certain situations (#8070).

        for (; i < l; i++) {
          node = fragment;

          if (i !== iNoClone) {
            node = jQuery.clone(node, true, true); // Keep references to cloned scripts for later restoration

            if (hasScripts) {
              // Support: Android <=4.0 only, PhantomJS 1 only
              // push.apply(_, arraylike) throws on ancient WebKit
              jQuery.merge(scripts, getAll(node, "script"));
            }
          }

          callback.call(collection[i], node, i);
        }

        if (hasScripts) {
          doc = scripts[scripts.length - 1].ownerDocument; // Reenable scripts

          jQuery.map(scripts, restoreScript); // Evaluate executable scripts on first document insertion

          for (i = 0; i < hasScripts; i++) {
            node = scripts[i];

            if (rscriptType.test(node.type || "") && !dataPriv.access(node, "globalEval") && jQuery.contains(doc, node)) {
              if (node.src && (node.type || "").toLowerCase() !== "module") {
                // Optional AJAX dependency, but won't run scripts if not present
                if (jQuery._evalUrl && !node.noModule) {
                  jQuery._evalUrl(node.src, {
                    nonce: node.nonce || node.getAttribute("nonce")
                  }, doc);
                }
              } else {
                DOMEval(node.textContent.replace(rcleanScript, ""), node, doc);
              }
            }
          }
        }
      }
    }

    return collection;
  }

  function _remove(elem, selector, keepData) {
    var node,
        nodes = selector ? jQuery.filter(selector, elem) : elem,
        i = 0;

    for (; (node = nodes[i]) != null; i++) {
      if (!keepData && node.nodeType === 1) {
        jQuery.cleanData(getAll(node));
      }

      if (node.parentNode) {
        if (keepData && isAttached(node)) {
          setGlobalEval(getAll(node, "script"));
        }

        node.parentNode.removeChild(node);
      }
    }

    return elem;
  }

  jQuery.extend({
    htmlPrefilter: function htmlPrefilter(html) {
      return html;
    },
    clone: function clone(elem, dataAndEvents, deepDataAndEvents) {
      var i,
          l,
          srcElements,
          destElements,
          clone = elem.cloneNode(true),
          inPage = isAttached(elem); // Fix IE cloning issues

      if (!support.noCloneChecked && (elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem)) {
        // We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
        destElements = getAll(clone);
        srcElements = getAll(elem);

        for (i = 0, l = srcElements.length; i < l; i++) {
          fixInput(srcElements[i], destElements[i]);
        }
      } // Copy the events from the original to the clone


      if (dataAndEvents) {
        if (deepDataAndEvents) {
          srcElements = srcElements || getAll(elem);
          destElements = destElements || getAll(clone);

          for (i = 0, l = srcElements.length; i < l; i++) {
            cloneCopyEvent(srcElements[i], destElements[i]);
          }
        } else {
          cloneCopyEvent(elem, clone);
        }
      } // Preserve script evaluation history


      destElements = getAll(clone, "script");

      if (destElements.length > 0) {
        setGlobalEval(destElements, !inPage && getAll(elem, "script"));
      } // Return the cloned set


      return clone;
    },
    cleanData: function cleanData(elems) {
      var data,
          elem,
          type,
          special = jQuery.event.special,
          i = 0;

      for (; (elem = elems[i]) !== undefined; i++) {
        if (acceptData(elem)) {
          if (data = elem[dataPriv.expando]) {
            if (data.events) {
              for (type in data.events) {
                if (special[type]) {
                  jQuery.event.remove(elem, type); // This is a shortcut to avoid jQuery.event.remove's overhead
                } else {
                  jQuery.removeEvent(elem, type, data.handle);
                }
              }
            } // Support: Chrome <=35 - 45+
            // Assign undefined instead of using delete, see Data#remove


            elem[dataPriv.expando] = undefined;
          }

          if (elem[dataUser.expando]) {
            // Support: Chrome <=35 - 45+
            // Assign undefined instead of using delete, see Data#remove
            elem[dataUser.expando] = undefined;
          }
        }
      }
    }
  });
  jQuery.fn.extend({
    detach: function detach(selector) {
      return _remove(this, selector, true);
    },
    remove: function remove(selector) {
      return _remove(this, selector);
    },
    text: function text(value) {
      return access(this, function (value) {
        return value === undefined ? jQuery.text(this) : this.empty().each(function () {
          if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
            this.textContent = value;
          }
        });
      }, null, value, arguments.length);
    },
    append: function append() {
      return domManip(this, arguments, function (elem) {
        if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
          var target = manipulationTarget(this, elem);
          target.appendChild(elem);
        }
      });
    },
    prepend: function prepend() {
      return domManip(this, arguments, function (elem) {
        if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
          var target = manipulationTarget(this, elem);
          target.insertBefore(elem, target.firstChild);
        }
      });
    },
    before: function before() {
      return domManip(this, arguments, function (elem) {
        if (this.parentNode) {
          this.parentNode.insertBefore(elem, this);
        }
      });
    },
    after: function after() {
      return domManip(this, arguments, function (elem) {
        if (this.parentNode) {
          this.parentNode.insertBefore(elem, this.nextSibling);
        }
      });
    },
    empty: function empty() {
      var elem,
          i = 0;

      for (; (elem = this[i]) != null; i++) {
        if (elem.nodeType === 1) {
          // Prevent memory leaks
          jQuery.cleanData(getAll(elem, false)); // Remove any remaining nodes

          elem.textContent = "";
        }
      }

      return this;
    },
    clone: function clone(dataAndEvents, deepDataAndEvents) {
      dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
      deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;
      return this.map(function () {
        return jQuery.clone(this, dataAndEvents, deepDataAndEvents);
      });
    },
    html: function html(value) {
      return access(this, function (value) {
        var elem = this[0] || {},
            i = 0,
            l = this.length;

        if (value === undefined && elem.nodeType === 1) {
          return elem.innerHTML;
        } // See if we can take a shortcut and just use innerHTML


        if (typeof value === "string" && !rnoInnerhtml.test(value) && !wrapMap[(rtagName.exec(value) || ["", ""])[1].toLowerCase()]) {
          value = jQuery.htmlPrefilter(value);

          try {
            for (; i < l; i++) {
              elem = this[i] || {}; // Remove element nodes and prevent memory leaks

              if (elem.nodeType === 1) {
                jQuery.cleanData(getAll(elem, false));
                elem.innerHTML = value;
              }
            }

            elem = 0; // If using innerHTML throws an exception, use the fallback method
          } catch (e) {}
        }

        if (elem) {
          this.empty().append(value);
        }
      }, null, value, arguments.length);
    },
    replaceWith: function replaceWith() {
      var ignored = []; // Make the changes, replacing each non-ignored context element with the new content

      return domManip(this, arguments, function (elem) {
        var parent = this.parentNode;

        if (jQuery.inArray(this, ignored) < 0) {
          jQuery.cleanData(getAll(this));

          if (parent) {
            parent.replaceChild(elem, this);
          }
        } // Force callback invocation

      }, ignored);
    }
  });
  jQuery.each({
    appendTo: "append",
    prependTo: "prepend",
    insertBefore: "before",
    insertAfter: "after",
    replaceAll: "replaceWith"
  }, function (name, original) {
    jQuery.fn[name] = function (selector) {
      var elems,
          ret = [],
          insert = jQuery(selector),
          last = insert.length - 1,
          i = 0;

      for (; i <= last; i++) {
        elems = i === last ? this : this.clone(true);
        jQuery(insert[i])[original](elems); // Support: Android <=4.0 only, PhantomJS 1 only
        // .get() because push.apply(_, arraylike) throws on ancient WebKit

        push.apply(ret, elems.get());
      }

      return this.pushStack(ret);
    };
  });
  var rnumnonpx = new RegExp("^(" + pnum + ")(?!px)[a-z%]+$", "i");

  var getStyles = function getStyles(elem) {
    // Support: IE <=11 only, Firefox <=30 (#15098, #14150)
    // IE throws on elements created in popups
    // FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
    var view = elem.ownerDocument.defaultView;

    if (!view || !view.opener) {
      view = window;
    }

    return view.getComputedStyle(elem);
  };

  var swap = function swap(elem, options, callback) {
    var ret,
        name,
        old = {}; // Remember the old values, and insert the new ones

    for (name in options) {
      old[name] = elem.style[name];
      elem.style[name] = options[name];
    }

    ret = callback.call(elem); // Revert the old values

    for (name in options) {
      elem.style[name] = old[name];
    }

    return ret;
  };

  var rboxStyle = new RegExp(cssExpand.join("|"), "i");

  (function () {
    // Executing both pixelPosition & boxSizingReliable tests require only one layout
    // so they're executed at the same time to save the second computation.
    function computeStyleTests() {
      // This is a singleton, we need to execute it only once
      if (!div) {
        return;
      }

      container.style.cssText = "position:absolute;left:-11111px;width:60px;" + "margin-top:1px;padding:0;border:0";
      div.style.cssText = "position:relative;display:block;box-sizing:border-box;overflow:scroll;" + "margin:auto;border:1px;padding:1px;" + "width:60%;top:1%";
      documentElement.appendChild(container).appendChild(div);
      var divStyle = window.getComputedStyle(div);
      pixelPositionVal = divStyle.top !== "1%"; // Support: Android 4.0 - 4.3 only, Firefox <=3 - 44

      reliableMarginLeftVal = roundPixelMeasures(divStyle.marginLeft) === 12; // Support: Android 4.0 - 4.3 only, Safari <=9.1 - 10.1, iOS <=7.0 - 9.3
      // Some styles come back with percentage values, even though they shouldn't

      div.style.right = "60%";
      pixelBoxStylesVal = roundPixelMeasures(divStyle.right) === 36; // Support: IE 9 - 11 only
      // Detect misreporting of content dimensions for box-sizing:border-box elements

      boxSizingReliableVal = roundPixelMeasures(divStyle.width) === 36; // Support: IE 9 only
      // Detect overflow:scroll screwiness (gh-3699)
      // Support: Chrome <=64
      // Don't get tricked when zoom affects offsetWidth (gh-4029)

      div.style.position = "absolute";
      scrollboxSizeVal = roundPixelMeasures(div.offsetWidth / 3) === 12;
      documentElement.removeChild(container); // Nullify the div so it wouldn't be stored in the memory and
      // it will also be a sign that checks already performed

      div = null;
    }

    function roundPixelMeasures(measure) {
      return Math.round(parseFloat(measure));
    }

    var pixelPositionVal,
        boxSizingReliableVal,
        scrollboxSizeVal,
        pixelBoxStylesVal,
        reliableTrDimensionsVal,
        reliableMarginLeftVal,
        container = document.createElement("div"),
        div = document.createElement("div"); // Finish early in limited (non-browser) environments

    if (!div.style) {
      return;
    } // Support: IE <=9 - 11 only
    // Style of cloned element affects source element cloned (#8908)


    div.style.backgroundClip = "content-box";
    div.cloneNode(true).style.backgroundClip = "";
    support.clearCloneStyle = div.style.backgroundClip === "content-box";
    jQuery.extend(support, {
      boxSizingReliable: function boxSizingReliable() {
        computeStyleTests();
        return boxSizingReliableVal;
      },
      pixelBoxStyles: function pixelBoxStyles() {
        computeStyleTests();
        return pixelBoxStylesVal;
      },
      pixelPosition: function pixelPosition() {
        computeStyleTests();
        return pixelPositionVal;
      },
      reliableMarginLeft: function reliableMarginLeft() {
        computeStyleTests();
        return reliableMarginLeftVal;
      },
      scrollboxSize: function scrollboxSize() {
        computeStyleTests();
        return scrollboxSizeVal;
      },
      // Support: IE 9 - 11+, Edge 15 - 18+
      // IE/Edge misreport `getComputedStyle` of table rows with width/height
      // set in CSS while `offset*` properties report correct values.
      // Behavior in IE 9 is more subtle than in newer versions & it passes
      // some versions of this test; make sure not to make it pass there!
      reliableTrDimensions: function reliableTrDimensions() {
        var table, tr, trChild, trStyle;

        if (reliableTrDimensionsVal == null) {
          table = document.createElement("table");
          tr = document.createElement("tr");
          trChild = document.createElement("div");
          table.style.cssText = "position:absolute;left:-11111px";
          tr.style.height = "1px";
          trChild.style.height = "9px";
          documentElement.appendChild(table).appendChild(tr).appendChild(trChild);
          trStyle = window.getComputedStyle(tr);
          reliableTrDimensionsVal = parseInt(trStyle.height) > 3;
          documentElement.removeChild(table);
        }

        return reliableTrDimensionsVal;
      }
    });
  })();

  function curCSS(elem, name, computed) {
    var width,
        minWidth,
        maxWidth,
        ret,
        // Support: Firefox 51+
    // Retrieving style before computed somehow
    // fixes an issue with getting wrong values
    // on detached elements
    style = elem.style;
    computed = computed || getStyles(elem); // getPropertyValue is needed for:
    //   .css('filter') (IE 9 only, #12537)
    //   .css('--customProperty) (#3144)

    if (computed) {
      ret = computed.getPropertyValue(name) || computed[name];

      if (ret === "" && !isAttached(elem)) {
        ret = jQuery.style(elem, name);
      } // A tribute to the "awesome hack by Dean Edwards"
      // Android Browser returns percentage for some values,
      // but width seems to be reliably pixels.
      // This is against the CSSOM draft spec:
      // https://drafts.csswg.org/cssom/#resolved-values


      if (!support.pixelBoxStyles() && rnumnonpx.test(ret) && rboxStyle.test(name)) {
        // Remember the original values
        width = style.width;
        minWidth = style.minWidth;
        maxWidth = style.maxWidth; // Put in the new values to get a computed value out

        style.minWidth = style.maxWidth = style.width = ret;
        ret = computed.width; // Revert the changed values

        style.width = width;
        style.minWidth = minWidth;
        style.maxWidth = maxWidth;
      }
    }

    return ret !== undefined ? // Support: IE <=9 - 11 only
    // IE returns zIndex value as an integer.
    ret + "" : ret;
  }

  function addGetHookIf(conditionFn, hookFn) {
    // Define the hook, we'll check on the first run if it's really needed.
    return {
      get: function get() {
        if (conditionFn()) {
          // Hook not needed (or it's not possible to use it due
          // to missing dependency), remove it.
          delete this.get;
          return;
        } // Hook needed; redefine it so that the support test is not executed again.


        return (this.get = hookFn).apply(this, arguments);
      }
    };
  }

  var cssPrefixes = ["Webkit", "Moz", "ms"],
      emptyStyle = document.createElement("div").style,
      vendorProps = {}; // Return a vendor-prefixed property or undefined

  function vendorPropName(name) {
    // Check for vendor prefixed names
    var capName = name[0].toUpperCase() + name.slice(1),
        i = cssPrefixes.length;

    while (i--) {
      name = cssPrefixes[i] + capName;

      if (name in emptyStyle) {
        return name;
      }
    }
  } // Return a potentially-mapped jQuery.cssProps or vendor prefixed property


  function finalPropName(name) {
    var _final = jQuery.cssProps[name] || vendorProps[name];

    if (_final) {
      return _final;
    }

    if (name in emptyStyle) {
      return name;
    }

    return vendorProps[name] = vendorPropName(name) || name;
  }

  var // Swappable if display is none or starts with table
  // except "table", "table-cell", or "table-caption"
  // See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
  rdisplayswap = /^(none|table(?!-c[ea]).+)/,
      rcustomProp = /^--/,
      cssShow = {
    position: "absolute",
    visibility: "hidden",
    display: "block"
  },
      cssNormalTransform = {
    letterSpacing: "0",
    fontWeight: "400"
  };

  function setPositiveNumber(_elem, value, subtract) {
    // Any relative (+/-) values have already been
    // normalized at this point
    var matches = rcssNum.exec(value);
    return matches ? // Guard against undefined "subtract", e.g., when used as in cssHooks
    Math.max(0, matches[2] - (subtract || 0)) + (matches[3] || "px") : value;
  }

  function boxModelAdjustment(elem, dimension, box, isBorderBox, styles, computedVal) {
    var i = dimension === "width" ? 1 : 0,
        extra = 0,
        delta = 0; // Adjustment may not be necessary

    if (box === (isBorderBox ? "border" : "content")) {
      return 0;
    }

    for (; i < 4; i += 2) {
      // Both box models exclude margin
      if (box === "margin") {
        delta += jQuery.css(elem, box + cssExpand[i], true, styles);
      } // If we get here with a content-box, we're seeking "padding" or "border" or "margin"


      if (!isBorderBox) {
        // Add padding
        delta += jQuery.css(elem, "padding" + cssExpand[i], true, styles); // For "border" or "margin", add border

        if (box !== "padding") {
          delta += jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles); // But still keep track of it otherwise
        } else {
          extra += jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
        } // If we get here with a border-box (content + padding + border), we're seeking "content" or
        // "padding" or "margin"

      } else {
        // For "content", subtract padding
        if (box === "content") {
          delta -= jQuery.css(elem, "padding" + cssExpand[i], true, styles);
        } // For "content" or "padding", subtract border


        if (box !== "margin") {
          delta -= jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
        }
      }
    } // Account for positive content-box scroll gutter when requested by providing computedVal


    if (!isBorderBox && computedVal >= 0) {
      // offsetWidth/offsetHeight is a rounded sum of content, padding, scroll gutter, and border
      // Assuming integer scroll gutter, subtract the rest and round down
      delta += Math.max(0, Math.ceil(elem["offset" + dimension[0].toUpperCase() + dimension.slice(1)] - computedVal - delta - extra - 0.5 // If offsetWidth/offsetHeight is unknown, then we can't determine content-box scroll gutter
      // Use an explicit zero to avoid NaN (gh-3964)
      )) || 0;
    }

    return delta;
  }

  function getWidthOrHeight(elem, dimension, extra) {
    // Start with computed style
    var styles = getStyles(elem),
        // To avoid forcing a reflow, only fetch boxSizing if we need it (gh-4322).
    // Fake content-box until we know it's needed to know the true value.
    boxSizingNeeded = !support.boxSizingReliable() || extra,
        isBorderBox = boxSizingNeeded && jQuery.css(elem, "boxSizing", false, styles) === "border-box",
        valueIsBorderBox = isBorderBox,
        val = curCSS(elem, dimension, styles),
        offsetProp = "offset" + dimension[0].toUpperCase() + dimension.slice(1); // Support: Firefox <=54
    // Return a confounding non-pixel value or feign ignorance, as appropriate.

    if (rnumnonpx.test(val)) {
      if (!extra) {
        return val;
      }

      val = "auto";
    } // Support: IE 9 - 11 only
    // Use offsetWidth/offsetHeight for when box sizing is unreliable.
    // In those cases, the computed value can be trusted to be border-box.


    if ((!support.boxSizingReliable() && isBorderBox || // Support: IE 10 - 11+, Edge 15 - 18+
    // IE/Edge misreport `getComputedStyle` of table rows with width/height
    // set in CSS while `offset*` properties report correct values.
    // Interestingly, in some cases IE 9 doesn't suffer from this issue.
    !support.reliableTrDimensions() && nodeName(elem, "tr") || // Fall back to offsetWidth/offsetHeight when value is "auto"
    // This happens for inline elements with no explicit setting (gh-3571)
    val === "auto" || // Support: Android <=4.1 - 4.3 only
    // Also use offsetWidth/offsetHeight for misreported inline dimensions (gh-3602)
    !parseFloat(val) && jQuery.css(elem, "display", false, styles) === "inline") && // Make sure the element is visible & connected
    elem.getClientRects().length) {
      isBorderBox = jQuery.css(elem, "boxSizing", false, styles) === "border-box"; // Where available, offsetWidth/offsetHeight approximate border box dimensions.
      // Where not available (e.g., SVG), assume unreliable box-sizing and interpret the
      // retrieved value as a content box dimension.

      valueIsBorderBox = offsetProp in elem;

      if (valueIsBorderBox) {
        val = elem[offsetProp];
      }
    } // Normalize "" and auto


    val = parseFloat(val) || 0; // Adjust for the element's box model

    return val + boxModelAdjustment(elem, dimension, extra || (isBorderBox ? "border" : "content"), valueIsBorderBox, styles, // Provide the current computed size to request scroll gutter calculation (gh-3589)
    val) + "px";
  }

  jQuery.extend({
    // Add in style property hooks for overriding the default
    // behavior of getting and setting a style property
    cssHooks: {
      opacity: {
        get: function get(elem, computed) {
          if (computed) {
            // We should always get a number back from opacity
            var ret = curCSS(elem, "opacity");
            return ret === "" ? "1" : ret;
          }
        }
      }
    },
    // Don't automatically add "px" to these possibly-unitless properties
    cssNumber: {
      "animationIterationCount": true,
      "columnCount": true,
      "fillOpacity": true,
      "flexGrow": true,
      "flexShrink": true,
      "fontWeight": true,
      "gridArea": true,
      "gridColumn": true,
      "gridColumnEnd": true,
      "gridColumnStart": true,
      "gridRow": true,
      "gridRowEnd": true,
      "gridRowStart": true,
      "lineHeight": true,
      "opacity": true,
      "order": true,
      "orphans": true,
      "widows": true,
      "zIndex": true,
      "zoom": true
    },
    // Add in properties whose names you wish to fix before
    // setting or getting the value
    cssProps: {},
    // Get and set the style property on a DOM Node
    style: function style(elem, name, value, extra) {
      // Don't set styles on text and comment nodes
      if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) {
        return;
      } // Make sure that we're working with the right name


      var ret,
          type,
          hooks,
          origName = camelCase(name),
          isCustomProp = rcustomProp.test(name),
          style = elem.style; // Make sure that we're working with the right name. We don't
      // want to query the value if it is a CSS custom property
      // since they are user-defined.

      if (!isCustomProp) {
        name = finalPropName(origName);
      } // Gets hook for the prefixed version, then unprefixed version


      hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName]; // Check if we're setting a value

      if (value !== undefined) {
        type = _typeof(value); // Convert "+=" or "-=" to relative numbers (#7345)

        if (type === "string" && (ret = rcssNum.exec(value)) && ret[1]) {
          value = adjustCSS(elem, name, ret); // Fixes bug #9237

          type = "number";
        } // Make sure that null and NaN values aren't set (#7116)


        if (value == null || value !== value) {
          return;
        } // If a number was passed in, add the unit (except for certain CSS properties)
        // The isCustomProp check can be removed in jQuery 4.0 when we only auto-append
        // "px" to a few hardcoded values.


        if (type === "number" && !isCustomProp) {
          value += ret && ret[3] || (jQuery.cssNumber[origName] ? "" : "px");
        } // background-* props affect original clone's values


        if (!support.clearCloneStyle && value === "" && name.indexOf("background") === 0) {
          style[name] = "inherit";
        } // If a hook was provided, use that value, otherwise just set the specified value


        if (!hooks || !("set" in hooks) || (value = hooks.set(elem, value, extra)) !== undefined) {
          if (isCustomProp) {
            style.setProperty(name, value);
          } else {
            style[name] = value;
          }
        }
      } else {
        // If a hook was provided get the non-computed value from there
        if (hooks && "get" in hooks && (ret = hooks.get(elem, false, extra)) !== undefined) {
          return ret;
        } // Otherwise just get the value from the style object


        return style[name];
      }
    },
    css: function css(elem, name, extra, styles) {
      var val,
          num,
          hooks,
          origName = camelCase(name),
          isCustomProp = rcustomProp.test(name); // Make sure that we're working with the right name. We don't
      // want to modify the value if it is a CSS custom property
      // since they are user-defined.

      if (!isCustomProp) {
        name = finalPropName(origName);
      } // Try prefixed name followed by the unprefixed name


      hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName]; // If a hook was provided get the computed value from there

      if (hooks && "get" in hooks) {
        val = hooks.get(elem, true, extra);
      } // Otherwise, if a way to get the computed value exists, use that


      if (val === undefined) {
        val = curCSS(elem, name, styles);
      } // Convert "normal" to computed value


      if (val === "normal" && name in cssNormalTransform) {
        val = cssNormalTransform[name];
      } // Make numeric if forced or a qualifier was provided and val looks numeric


      if (extra === "" || extra) {
        num = parseFloat(val);
        return extra === true || isFinite(num) ? num || 0 : val;
      }

      return val;
    }
  });
  jQuery.each(["height", "width"], function (_i, dimension) {
    jQuery.cssHooks[dimension] = {
      get: function get(elem, computed, extra) {
        if (computed) {
          // Certain elements can have dimension info if we invisibly show them
          // but it must have a current display style that would benefit
          return rdisplayswap.test(jQuery.css(elem, "display")) && ( // Support: Safari 8+
          // Table columns in Safari have non-zero offsetWidth & zero
          // getBoundingClientRect().width unless display is changed.
          // Support: IE <=11 only
          // Running getBoundingClientRect on a disconnected node
          // in IE throws an error.
          !elem.getClientRects().length || !elem.getBoundingClientRect().width) ? swap(elem, cssShow, function () {
            return getWidthOrHeight(elem, dimension, extra);
          }) : getWidthOrHeight(elem, dimension, extra);
        }
      },
      set: function set(elem, value, extra) {
        var matches,
            styles = getStyles(elem),
            // Only read styles.position if the test has a chance to fail
        // to avoid forcing a reflow.
        scrollboxSizeBuggy = !support.scrollboxSize() && styles.position === "absolute",
            // To avoid forcing a reflow, only fetch boxSizing if we need it (gh-3991)
        boxSizingNeeded = scrollboxSizeBuggy || extra,
            isBorderBox = boxSizingNeeded && jQuery.css(elem, "boxSizing", false, styles) === "border-box",
            subtract = extra ? boxModelAdjustment(elem, dimension, extra, isBorderBox, styles) : 0; // Account for unreliable border-box dimensions by comparing offset* to computed and
        // faking a content-box to get border and padding (gh-3699)

        if (isBorderBox && scrollboxSizeBuggy) {
          subtract -= Math.ceil(elem["offset" + dimension[0].toUpperCase() + dimension.slice(1)] - parseFloat(styles[dimension]) - boxModelAdjustment(elem, dimension, "border", false, styles) - 0.5);
        } // Convert to pixels if value adjustment is needed


        if (subtract && (matches = rcssNum.exec(value)) && (matches[3] || "px") !== "px") {
          elem.style[dimension] = value;
          value = jQuery.css(elem, dimension);
        }

        return setPositiveNumber(elem, value, subtract);
      }
    };
  });
  jQuery.cssHooks.marginLeft = addGetHookIf(support.reliableMarginLeft, function (elem, computed) {
    if (computed) {
      return (parseFloat(curCSS(elem, "marginLeft")) || elem.getBoundingClientRect().left - swap(elem, {
        marginLeft: 0
      }, function () {
        return elem.getBoundingClientRect().left;
      })) + "px";
    }
  }); // These hooks are used by animate to expand properties

  jQuery.each({
    margin: "",
    padding: "",
    border: "Width"
  }, function (prefix, suffix) {
    jQuery.cssHooks[prefix + suffix] = {
      expand: function expand(value) {
        var i = 0,
            expanded = {},
            // Assumes a single number if not a string
        parts = typeof value === "string" ? value.split(" ") : [value];

        for (; i < 4; i++) {
          expanded[prefix + cssExpand[i] + suffix] = parts[i] || parts[i - 2] || parts[0];
        }

        return expanded;
      }
    };

    if (prefix !== "margin") {
      jQuery.cssHooks[prefix + suffix].set = setPositiveNumber;
    }
  });
  jQuery.fn.extend({
    css: function css(name, value) {
      return access(this, function (elem, name, value) {
        var styles,
            len,
            map = {},
            i = 0;

        if (Array.isArray(name)) {
          styles = getStyles(elem);
          len = name.length;

          for (; i < len; i++) {
            map[name[i]] = jQuery.css(elem, name[i], false, styles);
          }

          return map;
        }

        return value !== undefined ? jQuery.style(elem, name, value) : jQuery.css(elem, name);
      }, name, value, arguments.length > 1);
    }
  });

  function Tween(elem, options, prop, end, easing) {
    return new Tween.prototype.init(elem, options, prop, end, easing);
  }

  jQuery.Tween = Tween;
  Tween.prototype = {
    constructor: Tween,
    init: function init(elem, options, prop, end, easing, unit) {
      this.elem = elem;
      this.prop = prop;
      this.easing = easing || jQuery.easing._default;
      this.options = options;
      this.start = this.now = this.cur();
      this.end = end;
      this.unit = unit || (jQuery.cssNumber[prop] ? "" : "px");
    },
    cur: function cur() {
      var hooks = Tween.propHooks[this.prop];
      return hooks && hooks.get ? hooks.get(this) : Tween.propHooks._default.get(this);
    },
    run: function run(percent) {
      var eased,
          hooks = Tween.propHooks[this.prop];

      if (this.options.duration) {
        this.pos = eased = jQuery.easing[this.easing](percent, this.options.duration * percent, 0, 1, this.options.duration);
      } else {
        this.pos = eased = percent;
      }

      this.now = (this.end - this.start) * eased + this.start;

      if (this.options.step) {
        this.options.step.call(this.elem, this.now, this);
      }

      if (hooks && hooks.set) {
        hooks.set(this);
      } else {
        Tween.propHooks._default.set(this);
      }

      return this;
    }
  };
  Tween.prototype.init.prototype = Tween.prototype;
  Tween.propHooks = {
    _default: {
      get: function get(tween) {
        var result; // Use a property on the element directly when it is not a DOM element,
        // or when there is no matching style property that exists.

        if (tween.elem.nodeType !== 1 || tween.elem[tween.prop] != null && tween.elem.style[tween.prop] == null) {
          return tween.elem[tween.prop];
        } // Passing an empty string as a 3rd parameter to .css will automatically
        // attempt a parseFloat and fallback to a string if the parse fails.
        // Simple values such as "10px" are parsed to Float;
        // complex values such as "rotate(1rad)" are returned as-is.


        result = jQuery.css(tween.elem, tween.prop, ""); // Empty strings, null, undefined and "auto" are converted to 0.

        return !result || result === "auto" ? 0 : result;
      },
      set: function set(tween) {
        // Use step hook for back compat.
        // Use cssHook if its there.
        // Use .style if available and use plain properties where available.
        if (jQuery.fx.step[tween.prop]) {
          jQuery.fx.step[tween.prop](tween);
        } else if (tween.elem.nodeType === 1 && (jQuery.cssHooks[tween.prop] || tween.elem.style[finalPropName(tween.prop)] != null)) {
          jQuery.style(tween.elem, tween.prop, tween.now + tween.unit);
        } else {
          tween.elem[tween.prop] = tween.now;
        }
      }
    }
  }; // Support: IE <=9 only
  // Panic based approach to setting things on disconnected nodes

  Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
    set: function set(tween) {
      if (tween.elem.nodeType && tween.elem.parentNode) {
        tween.elem[tween.prop] = tween.now;
      }
    }
  };
  jQuery.easing = {
    linear: function linear(p) {
      return p;
    },
    swing: function swing(p) {
      return 0.5 - Math.cos(p * Math.PI) / 2;
    },
    _default: "swing"
  };
  jQuery.fx = Tween.prototype.init; // Back compat <1.8 extension point

  jQuery.fx.step = {};
  var fxNow,
      inProgress,
      rfxtypes = /^(?:toggle|show|hide)$/,
      rrun = /queueHooks$/;

  function schedule() {
    if (inProgress) {
      if (document.hidden === false && window.requestAnimationFrame) {
        window.requestAnimationFrame(schedule);
      } else {
        window.setTimeout(schedule, jQuery.fx.interval);
      }

      jQuery.fx.tick();
    }
  } // Animations created synchronously will run synchronously


  function createFxNow() {
    window.setTimeout(function () {
      fxNow = undefined;
    });
    return fxNow = Date.now();
  } // Generate parameters to create a standard animation


  function genFx(type, includeWidth) {
    var which,
        i = 0,
        attrs = {
      height: type
    }; // If we include width, step value is 1 to do all cssExpand values,
    // otherwise step value is 2 to skip over Left and Right

    includeWidth = includeWidth ? 1 : 0;

    for (; i < 4; i += 2 - includeWidth) {
      which = cssExpand[i];
      attrs["margin" + which] = attrs["padding" + which] = type;
    }

    if (includeWidth) {
      attrs.opacity = attrs.width = type;
    }

    return attrs;
  }

  function createTween(value, prop, animation) {
    var tween,
        collection = (Animation.tweeners[prop] || []).concat(Animation.tweeners["*"]),
        index = 0,
        length = collection.length;

    for (; index < length; index++) {
      if (tween = collection[index].call(animation, prop, value)) {
        // We're done with this property
        return tween;
      }
    }
  }

  function defaultPrefilter(elem, props, opts) {
    var prop,
        value,
        toggle,
        hooks,
        oldfire,
        propTween,
        restoreDisplay,
        display,
        isBox = "width" in props || "height" in props,
        anim = this,
        orig = {},
        style = elem.style,
        hidden = elem.nodeType && isHiddenWithinTree(elem),
        dataShow = dataPriv.get(elem, "fxshow"); // Queue-skipping animations hijack the fx hooks

    if (!opts.queue) {
      hooks = jQuery._queueHooks(elem, "fx");

      if (hooks.unqueued == null) {
        hooks.unqueued = 0;
        oldfire = hooks.empty.fire;

        hooks.empty.fire = function () {
          if (!hooks.unqueued) {
            oldfire();
          }
        };
      }

      hooks.unqueued++;
      anim.always(function () {
        // Ensure the complete handler is called before this completes
        anim.always(function () {
          hooks.unqueued--;

          if (!jQuery.queue(elem, "fx").length) {
            hooks.empty.fire();
          }
        });
      });
    } // Detect show/hide animations


    for (prop in props) {
      value = props[prop];

      if (rfxtypes.test(value)) {
        delete props[prop];
        toggle = toggle || value === "toggle";

        if (value === (hidden ? "hide" : "show")) {
          // Pretend to be hidden if this is a "show" and
          // there is still data from a stopped show/hide
          if (value === "show" && dataShow && dataShow[prop] !== undefined) {
            hidden = true; // Ignore all other no-op show/hide data
          } else {
            continue;
          }
        }

        orig[prop] = dataShow && dataShow[prop] || jQuery.style(elem, prop);
      }
    } // Bail out if this is a no-op like .hide().hide()


    propTween = !jQuery.isEmptyObject(props);

    if (!propTween && jQuery.isEmptyObject(orig)) {
      return;
    } // Restrict "overflow" and "display" styles during box animations


    if (isBox && elem.nodeType === 1) {
      // Support: IE <=9 - 11, Edge 12 - 15
      // Record all 3 overflow attributes because IE does not infer the shorthand
      // from identically-valued overflowX and overflowY and Edge just mirrors
      // the overflowX value there.
      opts.overflow = [style.overflow, style.overflowX, style.overflowY]; // Identify a display type, preferring old show/hide data over the CSS cascade

      restoreDisplay = dataShow && dataShow.display;

      if (restoreDisplay == null) {
        restoreDisplay = dataPriv.get(elem, "display");
      }

      display = jQuery.css(elem, "display");

      if (display === "none") {
        if (restoreDisplay) {
          display = restoreDisplay;
        } else {
          // Get nonempty value(s) by temporarily forcing visibility
          showHide([elem], true);
          restoreDisplay = elem.style.display || restoreDisplay;
          display = jQuery.css(elem, "display");
          showHide([elem]);
        }
      } // Animate inline elements as inline-block


      if (display === "inline" || display === "inline-block" && restoreDisplay != null) {
        if (jQuery.css(elem, "float") === "none") {
          // Restore the original display value at the end of pure show/hide animations
          if (!propTween) {
            anim.done(function () {
              style.display = restoreDisplay;
            });

            if (restoreDisplay == null) {
              display = style.display;
              restoreDisplay = display === "none" ? "" : display;
            }
          }

          style.display = "inline-block";
        }
      }
    }

    if (opts.overflow) {
      style.overflow = "hidden";
      anim.always(function () {
        style.overflow = opts.overflow[0];
        style.overflowX = opts.overflow[1];
        style.overflowY = opts.overflow[2];
      });
    } // Implement show/hide animations


    propTween = false;

    for (prop in orig) {
      // General show/hide setup for this element animation
      if (!propTween) {
        if (dataShow) {
          if ("hidden" in dataShow) {
            hidden = dataShow.hidden;
          }
        } else {
          dataShow = dataPriv.access(elem, "fxshow", {
            display: restoreDisplay
          });
        } // Store hidden/visible for toggle so `.stop().toggle()` "reverses"


        if (toggle) {
          dataShow.hidden = !hidden;
        } // Show elements before animating them


        if (hidden) {
          showHide([elem], true);
        }
        /* eslint-disable no-loop-func */


        anim.done(function () {
          /* eslint-enable no-loop-func */
          // The final step of a "hide" animation is actually hiding the element
          if (!hidden) {
            showHide([elem]);
          }

          dataPriv.remove(elem, "fxshow");

          for (prop in orig) {
            jQuery.style(elem, prop, orig[prop]);
          }
        });
      } // Per-property setup


      propTween = createTween(hidden ? dataShow[prop] : 0, prop, anim);

      if (!(prop in dataShow)) {
        dataShow[prop] = propTween.start;

        if (hidden) {
          propTween.end = propTween.start;
          propTween.start = 0;
        }
      }
    }
  }

  function propFilter(props, specialEasing) {
    var index, name, easing, value, hooks; // camelCase, specialEasing and expand cssHook pass

    for (index in props) {
      name = camelCase(index);
      easing = specialEasing[name];
      value = props[index];

      if (Array.isArray(value)) {
        easing = value[1];
        value = props[index] = value[0];
      }

      if (index !== name) {
        props[name] = value;
        delete props[index];
      }

      hooks = jQuery.cssHooks[name];

      if (hooks && "expand" in hooks) {
        value = hooks.expand(value);
        delete props[name]; // Not quite $.extend, this won't overwrite existing keys.
        // Reusing 'index' because we have the correct "name"

        for (index in value) {
          if (!(index in props)) {
            props[index] = value[index];
            specialEasing[index] = easing;
          }
        }
      } else {
        specialEasing[name] = easing;
      }
    }
  }

  function Animation(elem, properties, options) {
    var result,
        stopped,
        index = 0,
        length = Animation.prefilters.length,
        deferred = jQuery.Deferred().always(function () {
      // Don't match elem in the :animated selector
      delete tick.elem;
    }),
        tick = function tick() {
      if (stopped) {
        return false;
      }

      var currentTime = fxNow || createFxNow(),
          remaining = Math.max(0, animation.startTime + animation.duration - currentTime),
          // Support: Android 2.3 only
      // Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
      temp = remaining / animation.duration || 0,
          percent = 1 - temp,
          index = 0,
          length = animation.tweens.length;

      for (; index < length; index++) {
        animation.tweens[index].run(percent);
      }

      deferred.notifyWith(elem, [animation, percent, remaining]); // If there's more to do, yield

      if (percent < 1 && length) {
        return remaining;
      } // If this was an empty animation, synthesize a final progress notification


      if (!length) {
        deferred.notifyWith(elem, [animation, 1, 0]);
      } // Resolve the animation and report its conclusion


      deferred.resolveWith(elem, [animation]);
      return false;
    },
        animation = deferred.promise({
      elem: elem,
      props: jQuery.extend({}, properties),
      opts: jQuery.extend(true, {
        specialEasing: {},
        easing: jQuery.easing._default
      }, options),
      originalProperties: properties,
      originalOptions: options,
      startTime: fxNow || createFxNow(),
      duration: options.duration,
      tweens: [],
      createTween: function createTween(prop, end) {
        var tween = jQuery.Tween(elem, animation.opts, prop, end, animation.opts.specialEasing[prop] || animation.opts.easing);
        animation.tweens.push(tween);
        return tween;
      },
      stop: function stop(gotoEnd) {
        var index = 0,
            // If we are going to the end, we want to run all the tweens
        // otherwise we skip this part
        length = gotoEnd ? animation.tweens.length : 0;

        if (stopped) {
          return this;
        }

        stopped = true;

        for (; index < length; index++) {
          animation.tweens[index].run(1);
        } // Resolve when we played the last frame; otherwise, reject


        if (gotoEnd) {
          deferred.notifyWith(elem, [animation, 1, 0]);
          deferred.resolveWith(elem, [animation, gotoEnd]);
        } else {
          deferred.rejectWith(elem, [animation, gotoEnd]);
        }

        return this;
      }
    }),
        props = animation.props;

    propFilter(props, animation.opts.specialEasing);

    for (; index < length; index++) {
      result = Animation.prefilters[index].call(animation, elem, props, animation.opts);

      if (result) {
        if (isFunction(result.stop)) {
          jQuery._queueHooks(animation.elem, animation.opts.queue).stop = result.stop.bind(result);
        }

        return result;
      }
    }

    jQuery.map(props, createTween, animation);

    if (isFunction(animation.opts.start)) {
      animation.opts.start.call(elem, animation);
    } // Attach callbacks from options


    animation.progress(animation.opts.progress).done(animation.opts.done, animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always);
    jQuery.fx.timer(jQuery.extend(tick, {
      elem: elem,
      anim: animation,
      queue: animation.opts.queue
    }));
    return animation;
  }

  jQuery.Animation = jQuery.extend(Animation, {
    tweeners: {
      "*": [function (prop, value) {
        var tween = this.createTween(prop, value);
        adjustCSS(tween.elem, prop, rcssNum.exec(value), tween);
        return tween;
      }]
    },
    tweener: function tweener(props, callback) {
      if (isFunction(props)) {
        callback = props;
        props = ["*"];
      } else {
        props = props.match(rnothtmlwhite);
      }

      var prop,
          index = 0,
          length = props.length;

      for (; index < length; index++) {
        prop = props[index];
        Animation.tweeners[prop] = Animation.tweeners[prop] || [];
        Animation.tweeners[prop].unshift(callback);
      }
    },
    prefilters: [defaultPrefilter],
    prefilter: function prefilter(callback, prepend) {
      if (prepend) {
        Animation.prefilters.unshift(callback);
      } else {
        Animation.prefilters.push(callback);
      }
    }
  });

  jQuery.speed = function (speed, easing, fn) {
    var opt = speed && _typeof(speed) === "object" ? jQuery.extend({}, speed) : {
      complete: fn || !fn && easing || isFunction(speed) && speed,
      duration: speed,
      easing: fn && easing || easing && !isFunction(easing) && easing
    }; // Go to the end state if fx are off

    if (jQuery.fx.off) {
      opt.duration = 0;
    } else {
      if (typeof opt.duration !== "number") {
        if (opt.duration in jQuery.fx.speeds) {
          opt.duration = jQuery.fx.speeds[opt.duration];
        } else {
          opt.duration = jQuery.fx.speeds._default;
        }
      }
    } // Normalize opt.queue - true/undefined/null -> "fx"


    if (opt.queue == null || opt.queue === true) {
      opt.queue = "fx";
    } // Queueing


    opt.old = opt.complete;

    opt.complete = function () {
      if (isFunction(opt.old)) {
        opt.old.call(this);
      }

      if (opt.queue) {
        jQuery.dequeue(this, opt.queue);
      }
    };

    return opt;
  };

  jQuery.fn.extend({
    fadeTo: function fadeTo(speed, to, easing, callback) {
      // Show any hidden elements after setting opacity to 0
      return this.filter(isHiddenWithinTree).css("opacity", 0).show() // Animate to the value specified
      .end().animate({
        opacity: to
      }, speed, easing, callback);
    },
    animate: function animate(prop, speed, easing, callback) {
      var empty = jQuery.isEmptyObject(prop),
          optall = jQuery.speed(speed, easing, callback),
          doAnimation = function doAnimation() {
        // Operate on a copy of prop so per-property easing won't be lost
        var anim = Animation(this, jQuery.extend({}, prop), optall); // Empty animations, or finishing resolves immediately

        if (empty || dataPriv.get(this, "finish")) {
          anim.stop(true);
        }
      };

      doAnimation.finish = doAnimation;
      return empty || optall.queue === false ? this.each(doAnimation) : this.queue(optall.queue, doAnimation);
    },
    stop: function stop(type, clearQueue, gotoEnd) {
      var stopQueue = function stopQueue(hooks) {
        var stop = hooks.stop;
        delete hooks.stop;
        stop(gotoEnd);
      };

      if (typeof type !== "string") {
        gotoEnd = clearQueue;
        clearQueue = type;
        type = undefined;
      }

      if (clearQueue) {
        this.queue(type || "fx", []);
      }

      return this.each(function () {
        var dequeue = true,
            index = type != null && type + "queueHooks",
            timers = jQuery.timers,
            data = dataPriv.get(this);

        if (index) {
          if (data[index] && data[index].stop) {
            stopQueue(data[index]);
          }
        } else {
          for (index in data) {
            if (data[index] && data[index].stop && rrun.test(index)) {
              stopQueue(data[index]);
            }
          }
        }

        for (index = timers.length; index--;) {
          if (timers[index].elem === this && (type == null || timers[index].queue === type)) {
            timers[index].anim.stop(gotoEnd);
            dequeue = false;
            timers.splice(index, 1);
          }
        } // Start the next in the queue if the last step wasn't forced.
        // Timers currently will call their complete callbacks, which
        // will dequeue but only if they were gotoEnd.


        if (dequeue || !gotoEnd) {
          jQuery.dequeue(this, type);
        }
      });
    },
    finish: function finish(type) {
      if (type !== false) {
        type = type || "fx";
      }

      return this.each(function () {
        var index,
            data = dataPriv.get(this),
            queue = data[type + "queue"],
            hooks = data[type + "queueHooks"],
            timers = jQuery.timers,
            length = queue ? queue.length : 0; // Enable finishing flag on private data

        data.finish = true; // Empty the queue first

        jQuery.queue(this, type, []);

        if (hooks && hooks.stop) {
          hooks.stop.call(this, true);
        } // Look for any active animations, and finish them


        for (index = timers.length; index--;) {
          if (timers[index].elem === this && timers[index].queue === type) {
            timers[index].anim.stop(true);
            timers.splice(index, 1);
          }
        } // Look for any animations in the old queue and finish them


        for (index = 0; index < length; index++) {
          if (queue[index] && queue[index].finish) {
            queue[index].finish.call(this);
          }
        } // Turn off finishing flag


        delete data.finish;
      });
    }
  });
  jQuery.each(["toggle", "show", "hide"], function (_i, name) {
    var cssFn = jQuery.fn[name];

    jQuery.fn[name] = function (speed, easing, callback) {
      return speed == null || typeof speed === "boolean" ? cssFn.apply(this, arguments) : this.animate(genFx(name, true), speed, easing, callback);
    };
  }); // Generate shortcuts for custom animations

  jQuery.each({
    slideDown: genFx("show"),
    slideUp: genFx("hide"),
    slideToggle: genFx("toggle"),
    fadeIn: {
      opacity: "show"
    },
    fadeOut: {
      opacity: "hide"
    },
    fadeToggle: {
      opacity: "toggle"
    }
  }, function (name, props) {
    jQuery.fn[name] = function (speed, easing, callback) {
      return this.animate(props, speed, easing, callback);
    };
  });
  jQuery.timers = [];

  jQuery.fx.tick = function () {
    var timer,
        i = 0,
        timers = jQuery.timers;
    fxNow = Date.now();

    for (; i < timers.length; i++) {
      timer = timers[i]; // Run the timer and safely remove it when done (allowing for external removal)

      if (!timer() && timers[i] === timer) {
        timers.splice(i--, 1);
      }
    }

    if (!timers.length) {
      jQuery.fx.stop();
    }

    fxNow = undefined;
  };

  jQuery.fx.timer = function (timer) {
    jQuery.timers.push(timer);
    jQuery.fx.start();
  };

  jQuery.fx.interval = 13;

  jQuery.fx.start = function () {
    if (inProgress) {
      return;
    }

    inProgress = true;
    schedule();
  };

  jQuery.fx.stop = function () {
    inProgress = null;
  };

  jQuery.fx.speeds = {
    slow: 600,
    fast: 200,
    // Default speed
    _default: 400
  }; // Based off of the plugin by Clint Helfers, with permission.
  // https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/

  jQuery.fn.delay = function (time, type) {
    time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;
    type = type || "fx";
    return this.queue(type, function (next, hooks) {
      var timeout = window.setTimeout(next, time);

      hooks.stop = function () {
        window.clearTimeout(timeout);
      };
    });
  };

  (function () {
    var input = document.createElement("input"),
        select = document.createElement("select"),
        opt = select.appendChild(document.createElement("option"));
    input.type = "checkbox"; // Support: Android <=4.3 only
    // Default value for a checkbox should be "on"

    support.checkOn = input.value !== ""; // Support: IE <=11 only
    // Must access selectedIndex to make default options select

    support.optSelected = opt.selected; // Support: IE <=11 only
    // An input loses its value after becoming a radio

    input = document.createElement("input");
    input.value = "t";
    input.type = "radio";
    support.radioValue = input.value === "t";
  })();

  var boolHook,
      attrHandle = jQuery.expr.attrHandle;
  jQuery.fn.extend({
    attr: function attr(name, value) {
      return access(this, jQuery.attr, name, value, arguments.length > 1);
    },
    removeAttr: function removeAttr(name) {
      return this.each(function () {
        jQuery.removeAttr(this, name);
      });
    }
  });
  jQuery.extend({
    attr: function attr(elem, name, value) {
      var ret,
          hooks,
          nType = elem.nodeType; // Don't get/set attributes on text, comment and attribute nodes

      if (nType === 3 || nType === 8 || nType === 2) {
        return;
      } // Fallback to prop when attributes are not supported


      if (typeof elem.getAttribute === "undefined") {
        return jQuery.prop(elem, name, value);
      } // Attribute hooks are determined by the lowercase version
      // Grab necessary hook if one is defined


      if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
        hooks = jQuery.attrHooks[name.toLowerCase()] || (jQuery.expr.match.bool.test(name) ? boolHook : undefined);
      }

      if (value !== undefined) {
        if (value === null) {
          jQuery.removeAttr(elem, name);
          return;
        }

        if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
          return ret;
        }

        elem.setAttribute(name, value + "");
        return value;
      }

      if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
        return ret;
      }

      ret = jQuery.find.attr(elem, name); // Non-existent attributes return null, we normalize to undefined

      return ret == null ? undefined : ret;
    },
    attrHooks: {
      type: {
        set: function set(elem, value) {
          if (!support.radioValue && value === "radio" && nodeName(elem, "input")) {
            var val = elem.value;
            elem.setAttribute("type", value);

            if (val) {
              elem.value = val;
            }

            return value;
          }
        }
      }
    },
    removeAttr: function removeAttr(elem, value) {
      var name,
          i = 0,
          // Attribute names can contain non-HTML whitespace characters
      // https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
      attrNames = value && value.match(rnothtmlwhite);

      if (attrNames && elem.nodeType === 1) {
        while (name = attrNames[i++]) {
          elem.removeAttribute(name);
        }
      }
    }
  }); // Hooks for boolean attributes

  boolHook = {
    set: function set(elem, value, name) {
      if (value === false) {
        // Remove boolean attributes when set to false
        jQuery.removeAttr(elem, name);
      } else {
        elem.setAttribute(name, name);
      }

      return name;
    }
  };
  jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), function (_i, name) {
    var getter = attrHandle[name] || jQuery.find.attr;

    attrHandle[name] = function (elem, name, isXML) {
      var ret,
          handle,
          lowercaseName = name.toLowerCase();

      if (!isXML) {
        // Avoid an infinite loop by temporarily removing this function from the getter
        handle = attrHandle[lowercaseName];
        attrHandle[lowercaseName] = ret;
        ret = getter(elem, name, isXML) != null ? lowercaseName : null;
        attrHandle[lowercaseName] = handle;
      }

      return ret;
    };
  });
  var rfocusable = /^(?:input|select|textarea|button)$/i,
      rclickable = /^(?:a|area)$/i;
  jQuery.fn.extend({
    prop: function prop(name, value) {
      return access(this, jQuery.prop, name, value, arguments.length > 1);
    },
    removeProp: function removeProp(name) {
      return this.each(function () {
        delete this[jQuery.propFix[name] || name];
      });
    }
  });
  jQuery.extend({
    prop: function prop(elem, name, value) {
      var ret,
          hooks,
          nType = elem.nodeType; // Don't get/set properties on text, comment and attribute nodes

      if (nType === 3 || nType === 8 || nType === 2) {
        return;
      }

      if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
        // Fix name and attach hooks
        name = jQuery.propFix[name] || name;
        hooks = jQuery.propHooks[name];
      }

      if (value !== undefined) {
        if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
          return ret;
        }

        return elem[name] = value;
      }

      if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
        return ret;
      }

      return elem[name];
    },
    propHooks: {
      tabIndex: {
        get: function get(elem) {
          // Support: IE <=9 - 11 only
          // elem.tabIndex doesn't always return the
          // correct value when it hasn't been explicitly set
          // https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
          // Use proper attribute retrieval(#12072)
          var tabindex = jQuery.find.attr(elem, "tabindex");

          if (tabindex) {
            return parseInt(tabindex, 10);
          }

          if (rfocusable.test(elem.nodeName) || rclickable.test(elem.nodeName) && elem.href) {
            return 0;
          }

          return -1;
        }
      }
    },
    propFix: {
      "for": "htmlFor",
      "class": "className"
    }
  }); // Support: IE <=11 only
  // Accessing the selectedIndex property
  // forces the browser to respect setting selected
  // on the option
  // The getter ensures a default option is selected
  // when in an optgroup
  // eslint rule "no-unused-expressions" is disabled for this code
  // since it considers such accessions noop

  if (!support.optSelected) {
    jQuery.propHooks.selected = {
      get: function get(elem) {
        /* eslint no-unused-expressions: "off" */
        var parent = elem.parentNode;

        if (parent && parent.parentNode) {
          parent.parentNode.selectedIndex;
        }

        return null;
      },
      set: function set(elem) {
        /* eslint no-unused-expressions: "off" */
        var parent = elem.parentNode;

        if (parent) {
          parent.selectedIndex;

          if (parent.parentNode) {
            parent.parentNode.selectedIndex;
          }
        }
      }
    };
  }

  jQuery.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
    jQuery.propFix[this.toLowerCase()] = this;
  }); // Strip and collapse whitespace according to HTML spec
  // https://infra.spec.whatwg.org/#strip-and-collapse-ascii-whitespace

  function stripAndCollapse(value) {
    var tokens = value.match(rnothtmlwhite) || [];
    return tokens.join(" ");
  }

  function getClass(elem) {
    return elem.getAttribute && elem.getAttribute("class") || "";
  }

  function classesToArray(value) {
    if (Array.isArray(value)) {
      return value;
    }

    if (typeof value === "string") {
      return value.match(rnothtmlwhite) || [];
    }

    return [];
  }

  jQuery.fn.extend({
    addClass: function addClass(value) {
      var classes,
          elem,
          cur,
          curValue,
          clazz,
          j,
          finalValue,
          i = 0;

      if (isFunction(value)) {
        return this.each(function (j) {
          jQuery(this).addClass(value.call(this, j, getClass(this)));
        });
      }

      classes = classesToArray(value);

      if (classes.length) {
        while (elem = this[i++]) {
          curValue = getClass(elem);
          cur = elem.nodeType === 1 && " " + stripAndCollapse(curValue) + " ";

          if (cur) {
            j = 0;

            while (clazz = classes[j++]) {
              if (cur.indexOf(" " + clazz + " ") < 0) {
                cur += clazz + " ";
              }
            } // Only assign if different to avoid unneeded rendering.


            finalValue = stripAndCollapse(cur);

            if (curValue !== finalValue) {
              elem.setAttribute("class", finalValue);
            }
          }
        }
      }

      return this;
    },
    removeClass: function removeClass(value) {
      var classes,
          elem,
          cur,
          curValue,
          clazz,
          j,
          finalValue,
          i = 0;

      if (isFunction(value)) {
        return this.each(function (j) {
          jQuery(this).removeClass(value.call(this, j, getClass(this)));
        });
      }

      if (!arguments.length) {
        return this.attr("class", "");
      }

      classes = classesToArray(value);

      if (classes.length) {
        while (elem = this[i++]) {
          curValue = getClass(elem); // This expression is here for better compressibility (see addClass)

          cur = elem.nodeType === 1 && " " + stripAndCollapse(curValue) + " ";

          if (cur) {
            j = 0;

            while (clazz = classes[j++]) {
              // Remove *all* instances
              while (cur.indexOf(" " + clazz + " ") > -1) {
                cur = cur.replace(" " + clazz + " ", " ");
              }
            } // Only assign if different to avoid unneeded rendering.


            finalValue = stripAndCollapse(cur);

            if (curValue !== finalValue) {
              elem.setAttribute("class", finalValue);
            }
          }
        }
      }

      return this;
    },
    toggleClass: function toggleClass(value, stateVal) {
      var type = _typeof(value),
          isValidValue = type === "string" || Array.isArray(value);

      if (typeof stateVal === "boolean" && isValidValue) {
        return stateVal ? this.addClass(value) : this.removeClass(value);
      }

      if (isFunction(value)) {
        return this.each(function (i) {
          jQuery(this).toggleClass(value.call(this, i, getClass(this), stateVal), stateVal);
        });
      }

      return this.each(function () {
        var className, i, self, classNames;

        if (isValidValue) {
          // Toggle individual class names
          i = 0;
          self = jQuery(this);
          classNames = classesToArray(value);

          while (className = classNames[i++]) {
            // Check each className given, space separated list
            if (self.hasClass(className)) {
              self.removeClass(className);
            } else {
              self.addClass(className);
            }
          } // Toggle whole class name

        } else if (value === undefined || type === "boolean") {
          className = getClass(this);

          if (className) {
            // Store className if set
            dataPriv.set(this, "__className__", className);
          } // If the element has a class name or if we're passed `false`,
          // then remove the whole classname (if there was one, the above saved it).
          // Otherwise bring back whatever was previously saved (if anything),
          // falling back to the empty string if nothing was stored.


          if (this.setAttribute) {
            this.setAttribute("class", className || value === false ? "" : dataPriv.get(this, "__className__") || "");
          }
        }
      });
    },
    hasClass: function hasClass(selector) {
      var className,
          elem,
          i = 0;
      className = " " + selector + " ";

      while (elem = this[i++]) {
        if (elem.nodeType === 1 && (" " + stripAndCollapse(getClass(elem)) + " ").indexOf(className) > -1) {
          return true;
        }
      }

      return false;
    }
  });
  var rreturn = /\r/g;
  jQuery.fn.extend({
    val: function val(value) {
      var hooks,
          ret,
          valueIsFunction,
          elem = this[0];

      if (!arguments.length) {
        if (elem) {
          hooks = jQuery.valHooks[elem.type] || jQuery.valHooks[elem.nodeName.toLowerCase()];

          if (hooks && "get" in hooks && (ret = hooks.get(elem, "value")) !== undefined) {
            return ret;
          }

          ret = elem.value; // Handle most common string cases

          if (typeof ret === "string") {
            return ret.replace(rreturn, "");
          } // Handle cases where value is null/undef or number


          return ret == null ? "" : ret;
        }

        return;
      }

      valueIsFunction = isFunction(value);
      return this.each(function (i) {
        var val;

        if (this.nodeType !== 1) {
          return;
        }

        if (valueIsFunction) {
          val = value.call(this, i, jQuery(this).val());
        } else {
          val = value;
        } // Treat null/undefined as ""; convert numbers to string


        if (val == null) {
          val = "";
        } else if (typeof val === "number") {
          val += "";
        } else if (Array.isArray(val)) {
          val = jQuery.map(val, function (value) {
            return value == null ? "" : value + "";
          });
        }

        hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()]; // If set returns undefined, fall back to normal setting

        if (!hooks || !("set" in hooks) || hooks.set(this, val, "value") === undefined) {
          this.value = val;
        }
      });
    }
  });
  jQuery.extend({
    valHooks: {
      option: {
        get: function get(elem) {
          var val = jQuery.find.attr(elem, "value");
          return val != null ? val : // Support: IE <=10 - 11 only
          // option.text throws exceptions (#14686, #14858)
          // Strip and collapse whitespace
          // https://html.spec.whatwg.org/#strip-and-collapse-whitespace
          stripAndCollapse(jQuery.text(elem));
        }
      },
      select: {
        get: function get(elem) {
          var value,
              option,
              i,
              options = elem.options,
              index = elem.selectedIndex,
              one = elem.type === "select-one",
              values = one ? null : [],
              max = one ? index + 1 : options.length;

          if (index < 0) {
            i = max;
          } else {
            i = one ? index : 0;
          } // Loop through all the selected options


          for (; i < max; i++) {
            option = options[i]; // Support: IE <=9 only
            // IE8-9 doesn't update selected after form reset (#2551)

            if ((option.selected || i === index) && // Don't return options that are disabled or in a disabled optgroup
            !option.disabled && (!option.parentNode.disabled || !nodeName(option.parentNode, "optgroup"))) {
              // Get the specific value for the option
              value = jQuery(option).val(); // We don't need an array for one selects

              if (one) {
                return value;
              } // Multi-Selects return an array


              values.push(value);
            }
          }

          return values;
        },
        set: function set(elem, value) {
          var optionSet,
              option,
              options = elem.options,
              values = jQuery.makeArray(value),
              i = options.length;

          while (i--) {
            option = options[i];
            /* eslint-disable no-cond-assign */

            if (option.selected = jQuery.inArray(jQuery.valHooks.option.get(option), values) > -1) {
              optionSet = true;
            }
            /* eslint-enable no-cond-assign */

          } // Force browsers to behave consistently when non-matching value is set


          if (!optionSet) {
            elem.selectedIndex = -1;
          }

          return values;
        }
      }
    }
  }); // Radios and checkboxes getter/setter

  jQuery.each(["radio", "checkbox"], function () {
    jQuery.valHooks[this] = {
      set: function set(elem, value) {
        if (Array.isArray(value)) {
          return elem.checked = jQuery.inArray(jQuery(elem).val(), value) > -1;
        }
      }
    };

    if (!support.checkOn) {
      jQuery.valHooks[this].get = function (elem) {
        return elem.getAttribute("value") === null ? "on" : elem.value;
      };
    }
  }); // Return jQuery for attributes-only inclusion

  support.focusin = "onfocusin" in window;

  var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
      stopPropagationCallback = function stopPropagationCallback(e) {
    e.stopPropagation();
  };

  jQuery.extend(jQuery.event, {
    trigger: function trigger(event, data, elem, onlyHandlers) {
      var i,
          cur,
          tmp,
          bubbleType,
          ontype,
          handle,
          special,
          lastElement,
          eventPath = [elem || document],
          type = hasOwn.call(event, "type") ? event.type : event,
          namespaces = hasOwn.call(event, "namespace") ? event.namespace.split(".") : [];
      cur = lastElement = tmp = elem = elem || document; // Don't do events on text and comment nodes

      if (elem.nodeType === 3 || elem.nodeType === 8) {
        return;
      } // focus/blur morphs to focusin/out; ensure we're not firing them right now


      if (rfocusMorph.test(type + jQuery.event.triggered)) {
        return;
      }

      if (type.indexOf(".") > -1) {
        // Namespaced trigger; create a regexp to match event type in handle()
        namespaces = type.split(".");
        type = namespaces.shift();
        namespaces.sort();
      }

      ontype = type.indexOf(":") < 0 && "on" + type; // Caller can pass in a jQuery.Event object, Object, or just an event type string

      event = event[jQuery.expando] ? event : new jQuery.Event(type, _typeof(event) === "object" && event); // Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)

      event.isTrigger = onlyHandlers ? 2 : 3;
      event.namespace = namespaces.join(".");
      event.rnamespace = event.namespace ? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") : null; // Clean up the event in case it is being reused

      event.result = undefined;

      if (!event.target) {
        event.target = elem;
      } // Clone any incoming data and prepend the event, creating the handler arg list


      data = data == null ? [event] : jQuery.makeArray(data, [event]); // Allow special events to draw outside the lines

      special = jQuery.event.special[type] || {};

      if (!onlyHandlers && special.trigger && special.trigger.apply(elem, data) === false) {
        return;
      } // Determine event propagation path in advance, per W3C events spec (#9951)
      // Bubble up to document, then to window; watch for a global ownerDocument var (#9724)


      if (!onlyHandlers && !special.noBubble && !isWindow(elem)) {
        bubbleType = special.delegateType || type;

        if (!rfocusMorph.test(bubbleType + type)) {
          cur = cur.parentNode;
        }

        for (; cur; cur = cur.parentNode) {
          eventPath.push(cur);
          tmp = cur;
        } // Only add window if we got to document (e.g., not plain obj or detached DOM)


        if (tmp === (elem.ownerDocument || document)) {
          eventPath.push(tmp.defaultView || tmp.parentWindow || window);
        }
      } // Fire handlers on the event path


      i = 0;

      while ((cur = eventPath[i++]) && !event.isPropagationStopped()) {
        lastElement = cur;
        event.type = i > 1 ? bubbleType : special.bindType || type; // jQuery handler

        handle = (dataPriv.get(cur, "events") || Object.create(null))[event.type] && dataPriv.get(cur, "handle");

        if (handle) {
          handle.apply(cur, data);
        } // Native handler


        handle = ontype && cur[ontype];

        if (handle && handle.apply && acceptData(cur)) {
          event.result = handle.apply(cur, data);

          if (event.result === false) {
            event.preventDefault();
          }
        }
      }

      event.type = type; // If nobody prevented the default action, do it now

      if (!onlyHandlers && !event.isDefaultPrevented()) {
        if ((!special._default || special._default.apply(eventPath.pop(), data) === false) && acceptData(elem)) {
          // Call a native DOM method on the target with the same name as the event.
          // Don't do default actions on window, that's where global variables be (#6170)
          if (ontype && isFunction(elem[type]) && !isWindow(elem)) {
            // Don't re-trigger an onFOO event when we call its FOO() method
            tmp = elem[ontype];

            if (tmp) {
              elem[ontype] = null;
            } // Prevent re-triggering of the same event, since we already bubbled it above


            jQuery.event.triggered = type;

            if (event.isPropagationStopped()) {
              lastElement.addEventListener(type, stopPropagationCallback);
            }

            elem[type]();

            if (event.isPropagationStopped()) {
              lastElement.removeEventListener(type, stopPropagationCallback);
            }

            jQuery.event.triggered = undefined;

            if (tmp) {
              elem[ontype] = tmp;
            }
          }
        }
      }

      return event.result;
    },
    // Piggyback on a donor event to simulate a different one
    // Used only for `focus(in | out)` events
    simulate: function simulate(type, elem, event) {
      var e = jQuery.extend(new jQuery.Event(), event, {
        type: type,
        isSimulated: true
      });
      jQuery.event.trigger(e, null, elem);
    }
  });
  jQuery.fn.extend({
    trigger: function trigger(type, data) {
      return this.each(function () {
        jQuery.event.trigger(type, data, this);
      });
    },
    triggerHandler: function triggerHandler(type, data) {
      var elem = this[0];

      if (elem) {
        return jQuery.event.trigger(type, data, elem, true);
      }
    }
  }); // Support: Firefox <=44
  // Firefox doesn't have focus(in | out) events
  // Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
  //
  // Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
  // focus(in | out) events fire after focus & blur events,
  // which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
  // Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857

  if (!support.focusin) {
    jQuery.each({
      focus: "focusin",
      blur: "focusout"
    }, function (orig, fix) {
      // Attach a single capturing handler on the document while someone wants focusin/focusout
      var handler = function handler(event) {
        jQuery.event.simulate(fix, event.target, jQuery.event.fix(event));
      };

      jQuery.event.special[fix] = {
        setup: function setup() {
          // Handle: regular nodes (via `this.ownerDocument`), window
          // (via `this.document`) & document (via `this`).
          var doc = this.ownerDocument || this.document || this,
              attaches = dataPriv.access(doc, fix);

          if (!attaches) {
            doc.addEventListener(orig, handler, true);
          }

          dataPriv.access(doc, fix, (attaches || 0) + 1);
        },
        teardown: function teardown() {
          var doc = this.ownerDocument || this.document || this,
              attaches = dataPriv.access(doc, fix) - 1;

          if (!attaches) {
            doc.removeEventListener(orig, handler, true);
            dataPriv.remove(doc, fix);
          } else {
            dataPriv.access(doc, fix, attaches);
          }
        }
      };
    });
  }

  var location = window.location;
  var nonce = {
    guid: Date.now()
  };
  var rquery = /\?/; // Cross-browser xml parsing

  jQuery.parseXML = function (data) {
    var xml;

    if (!data || typeof data !== "string") {
      return null;
    } // Support: IE 9 - 11 only
    // IE throws on parseFromString with invalid input.


    try {
      xml = new window.DOMParser().parseFromString(data, "text/xml");
    } catch (e) {
      xml = undefined;
    }

    if (!xml || xml.getElementsByTagName("parsererror").length) {
      jQuery.error("Invalid XML: " + data);
    }

    return xml;
  };

  var rbracket = /\[\]$/,
      rCRLF = /\r?\n/g,
      rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
      rsubmittable = /^(?:input|select|textarea|keygen)/i;

  function buildParams(prefix, obj, traditional, add) {
    var name;

    if (Array.isArray(obj)) {
      // Serialize array item.
      jQuery.each(obj, function (i, v) {
        if (traditional || rbracket.test(prefix)) {
          // Treat each array item as a scalar.
          add(prefix, v);
        } else {
          // Item is non-scalar (array or object), encode its numeric index.
          buildParams(prefix + "[" + (_typeof(v) === "object" && v != null ? i : "") + "]", v, traditional, add);
        }
      });
    } else if (!traditional && toType(obj) === "object") {
      // Serialize object item.
      for (name in obj) {
        buildParams(prefix + "[" + name + "]", obj[name], traditional, add);
      }
    } else {
      // Serialize scalar item.
      add(prefix, obj);
    }
  } // Serialize an array of form elements or a set of
  // key/values into a query string


  jQuery.param = function (a, traditional) {
    var prefix,
        s = [],
        add = function add(key, valueOrFunction) {
      // If value is a function, invoke it and use its return value
      var value = isFunction(valueOrFunction) ? valueOrFunction() : valueOrFunction;
      s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value == null ? "" : value);
    };

    if (a == null) {
      return "";
    } // If an array was passed in, assume that it is an array of form elements.


    if (Array.isArray(a) || a.jquery && !jQuery.isPlainObject(a)) {
      // Serialize the form elements
      jQuery.each(a, function () {
        add(this.name, this.value);
      });
    } else {
      // If traditional, encode the "old" way (the way 1.3.2 or older
      // did it), otherwise encode params recursively.
      for (prefix in a) {
        buildParams(prefix, a[prefix], traditional, add);
      }
    } // Return the resulting serialization


    return s.join("&");
  };

  jQuery.fn.extend({
    serialize: function serialize() {
      return jQuery.param(this.serializeArray());
    },
    serializeArray: function serializeArray() {
      return this.map(function () {
        // Can add propHook for "elements" to filter or add form elements
        var elements = jQuery.prop(this, "elements");
        return elements ? jQuery.makeArray(elements) : this;
      }).filter(function () {
        var type = this.type; // Use .is( ":disabled" ) so that fieldset[disabled] works

        return this.name && !jQuery(this).is(":disabled") && rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) && (this.checked || !rcheckableType.test(type));
      }).map(function (_i, elem) {
        var val = jQuery(this).val();

        if (val == null) {
          return null;
        }

        if (Array.isArray(val)) {
          return jQuery.map(val, function (val) {
            return {
              name: elem.name,
              value: val.replace(rCRLF, "\r\n")
            };
          });
        }

        return {
          name: elem.name,
          value: val.replace(rCRLF, "\r\n")
        };
      }).get();
    }
  });
  var r20 = /%20/g,
      rhash = /#.*$/,
      rantiCache = /([?&])_=[^&]*/,
      rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,
      // #7653, #8125, #8152: local protocol detection
  rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
      rnoContent = /^(?:GET|HEAD)$/,
      rprotocol = /^\/\//,

  /* Prefilters
   * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
   * 2) These are called:
   *    - BEFORE asking for a transport
   *    - AFTER param serialization (s.data is a string if s.processData is true)
   * 3) key is the dataType
   * 4) the catchall symbol "*" can be used
   * 5) execution will start with transport dataType and THEN continue down to "*" if needed
   */
  prefilters = {},

  /* Transports bindings
   * 1) key is the dataType
   * 2) the catchall symbol "*" can be used
   * 3) selection will start with transport dataType and THEN go to "*" if needed
   */
  transports = {},
      // Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
  allTypes = "*/".concat("*"),
      // Anchor tag for parsing the document origin
  originAnchor = document.createElement("a");
  originAnchor.href = location.href; // Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport

  function addToPrefiltersOrTransports(structure) {
    // dataTypeExpression is optional and defaults to "*"
    return function (dataTypeExpression, func) {
      if (typeof dataTypeExpression !== "string") {
        func = dataTypeExpression;
        dataTypeExpression = "*";
      }

      var dataType,
          i = 0,
          dataTypes = dataTypeExpression.toLowerCase().match(rnothtmlwhite) || [];

      if (isFunction(func)) {
        // For each dataType in the dataTypeExpression
        while (dataType = dataTypes[i++]) {
          // Prepend if requested
          if (dataType[0] === "+") {
            dataType = dataType.slice(1) || "*";
            (structure[dataType] = structure[dataType] || []).unshift(func); // Otherwise append
          } else {
            (structure[dataType] = structure[dataType] || []).push(func);
          }
        }
      }
    };
  } // Base inspection function for prefilters and transports


  function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {
    var inspected = {},
        seekingTransport = structure === transports;

    function inspect(dataType) {
      var selected;
      inspected[dataType] = true;
      jQuery.each(structure[dataType] || [], function (_, prefilterOrFactory) {
        var dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR);

        if (typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[dataTypeOrTransport]) {
          options.dataTypes.unshift(dataTypeOrTransport);
          inspect(dataTypeOrTransport);
          return false;
        } else if (seekingTransport) {
          return !(selected = dataTypeOrTransport);
        }
      });
      return selected;
    }

    return inspect(options.dataTypes[0]) || !inspected["*"] && inspect("*");
  } // A special extend for ajax options
  // that takes "flat" options (not to be deep extended)
  // Fixes #9887


  function ajaxExtend(target, src) {
    var key,
        deep,
        flatOptions = jQuery.ajaxSettings.flatOptions || {};

    for (key in src) {
      if (src[key] !== undefined) {
        (flatOptions[key] ? target : deep || (deep = {}))[key] = src[key];
      }
    }

    if (deep) {
      jQuery.extend(true, target, deep);
    }

    return target;
  }
  /* Handles responses to an ajax request:
   * - finds the right dataType (mediates between content-type and expected dataType)
   * - returns the corresponding response
   */


  function ajaxHandleResponses(s, jqXHR, responses) {
    var ct,
        type,
        finalDataType,
        firstDataType,
        contents = s.contents,
        dataTypes = s.dataTypes; // Remove auto dataType and get content-type in the process

    while (dataTypes[0] === "*") {
      dataTypes.shift();

      if (ct === undefined) {
        ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
      }
    } // Check if we're dealing with a known content-type


    if (ct) {
      for (type in contents) {
        if (contents[type] && contents[type].test(ct)) {
          dataTypes.unshift(type);
          break;
        }
      }
    } // Check to see if we have a response for the expected dataType


    if (dataTypes[0] in responses) {
      finalDataType = dataTypes[0];
    } else {
      // Try convertible dataTypes
      for (type in responses) {
        if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
          finalDataType = type;
          break;
        }

        if (!firstDataType) {
          firstDataType = type;
        }
      } // Or just use first one


      finalDataType = finalDataType || firstDataType;
    } // If we found a dataType
    // We add the dataType to the list if needed
    // and return the corresponding response


    if (finalDataType) {
      if (finalDataType !== dataTypes[0]) {
        dataTypes.unshift(finalDataType);
      }

      return responses[finalDataType];
    }
  }
  /* Chain conversions given the request and the original response
   * Also sets the responseXXX fields on the jqXHR instance
   */


  function ajaxConvert(s, response, jqXHR, isSuccess) {
    var conv2,
        current,
        conv,
        tmp,
        prev,
        converters = {},
        // Work with a copy of dataTypes in case we need to modify it for conversion
    dataTypes = s.dataTypes.slice(); // Create converters map with lowercased keys

    if (dataTypes[1]) {
      for (conv in s.converters) {
        converters[conv.toLowerCase()] = s.converters[conv];
      }
    }

    current = dataTypes.shift(); // Convert to each sequential dataType

    while (current) {
      if (s.responseFields[current]) {
        jqXHR[s.responseFields[current]] = response;
      } // Apply the dataFilter if provided


      if (!prev && isSuccess && s.dataFilter) {
        response = s.dataFilter(response, s.dataType);
      }

      prev = current;
      current = dataTypes.shift();

      if (current) {
        // There's only work to do if current dataType is non-auto
        if (current === "*") {
          current = prev; // Convert response if prev dataType is non-auto and differs from current
        } else if (prev !== "*" && prev !== current) {
          // Seek a direct converter
          conv = converters[prev + " " + current] || converters["* " + current]; // If none found, seek a pair

          if (!conv) {
            for (conv2 in converters) {
              // If conv2 outputs current
              tmp = conv2.split(" ");

              if (tmp[1] === current) {
                // If prev can be converted to accepted input
                conv = converters[prev + " " + tmp[0]] || converters["* " + tmp[0]];

                if (conv) {
                  // Condense equivalence converters
                  if (conv === true) {
                    conv = converters[conv2]; // Otherwise, insert the intermediate dataType
                  } else if (converters[conv2] !== true) {
                    current = tmp[0];
                    dataTypes.unshift(tmp[1]);
                  }

                  break;
                }
              }
            }
          } // Apply converter (if not an equivalence)


          if (conv !== true) {
            // Unless errors are allowed to bubble, catch and return them
            if (conv && s["throws"]) {
              response = conv(response);
            } else {
              try {
                response = conv(response);
              } catch (e) {
                return {
                  state: "parsererror",
                  error: conv ? e : "No conversion from " + prev + " to " + current
                };
              }
            }
          }
        }
      }
    }

    return {
      state: "success",
      data: response
    };
  }

  jQuery.extend({
    // Counter for holding the number of active queries
    active: 0,
    // Last-Modified header cache for next request
    lastModified: {},
    etag: {},
    ajaxSettings: {
      url: location.href,
      type: "GET",
      isLocal: rlocalProtocol.test(location.protocol),
      global: true,
      processData: true,
      async: true,
      contentType: "application/x-www-form-urlencoded; charset=UTF-8",

      /*
      timeout: 0,
      data: null,
      dataType: null,
      username: null,
      password: null,
      cache: null,
      throws: false,
      traditional: false,
      headers: {},
      */
      accepts: {
        "*": allTypes,
        text: "text/plain",
        html: "text/html",
        xml: "application/xml, text/xml",
        json: "application/json, text/javascript"
      },
      contents: {
        xml: /\bxml\b/,
        html: /\bhtml/,
        json: /\bjson\b/
      },
      responseFields: {
        xml: "responseXML",
        text: "responseText",
        json: "responseJSON"
      },
      // Data converters
      // Keys separate source (or catchall "*") and destination types with a single space
      converters: {
        // Convert anything to text
        "* text": String,
        // Text to html (true = no transformation)
        "text html": true,
        // Evaluate text as a json expression
        "text json": JSON.parse,
        // Parse text as xml
        "text xml": jQuery.parseXML
      },
      // For options that shouldn't be deep extended:
      // you can add your own custom options here if
      // and when you create one that shouldn't be
      // deep extended (see ajaxExtend)
      flatOptions: {
        url: true,
        context: true
      }
    },
    // Creates a full fledged settings object into target
    // with both ajaxSettings and settings fields.
    // If target is omitted, writes into ajaxSettings.
    ajaxSetup: function ajaxSetup(target, settings) {
      return settings ? // Building a settings object
      ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings) : // Extending ajaxSettings
      ajaxExtend(jQuery.ajaxSettings, target);
    },
    ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
    ajaxTransport: addToPrefiltersOrTransports(transports),
    // Main method
    ajax: function ajax(url, options) {
      // If url is an object, simulate pre-1.5 signature
      if (_typeof(url) === "object") {
        options = url;
        url = undefined;
      } // Force options to be an object


      options = options || {};

      var transport,
          // URL without anti-cache param
      cacheURL,
          // Response headers
      responseHeadersString,
          responseHeaders,
          // timeout handle
      timeoutTimer,
          // Url cleanup var
      urlAnchor,
          // Request state (becomes false upon send and true upon completion)
      completed,
          // To know if global events are to be dispatched
      fireGlobals,
          // Loop variable
      i,
          // uncached part of the url
      uncached,
          // Create the final options object
      s = jQuery.ajaxSetup({}, options),
          // Callbacks context
      callbackContext = s.context || s,
          // Context for global events is callbackContext if it is a DOM node or jQuery collection
      globalEventContext = s.context && (callbackContext.nodeType || callbackContext.jquery) ? jQuery(callbackContext) : jQuery.event,
          // Deferreds
      deferred = jQuery.Deferred(),
          completeDeferred = jQuery.Callbacks("once memory"),
          // Status-dependent callbacks
      _statusCode = s.statusCode || {},
          // Headers (they are sent all at once)
      requestHeaders = {},
          requestHeadersNames = {},
          // Default abort message
      strAbort = "canceled",
          // Fake xhr
      jqXHR = {
        readyState: 0,
        // Builds headers hashtable if needed
        getResponseHeader: function getResponseHeader(key) {
          var match;

          if (completed) {
            if (!responseHeaders) {
              responseHeaders = {};

              while (match = rheaders.exec(responseHeadersString)) {
                responseHeaders[match[1].toLowerCase() + " "] = (responseHeaders[match[1].toLowerCase() + " "] || []).concat(match[2]);
              }
            }

            match = responseHeaders[key.toLowerCase() + " "];
          }

          return match == null ? null : match.join(", ");
        },
        // Raw string
        getAllResponseHeaders: function getAllResponseHeaders() {
          return completed ? responseHeadersString : null;
        },
        // Caches the header
        setRequestHeader: function setRequestHeader(name, value) {
          if (completed == null) {
            name = requestHeadersNames[name.toLowerCase()] = requestHeadersNames[name.toLowerCase()] || name;
            requestHeaders[name] = value;
          }

          return this;
        },
        // Overrides response content-type header
        overrideMimeType: function overrideMimeType(type) {
          if (completed == null) {
            s.mimeType = type;
          }

          return this;
        },
        // Status-dependent callbacks
        statusCode: function statusCode(map) {
          var code;

          if (map) {
            if (completed) {
              // Execute the appropriate callbacks
              jqXHR.always(map[jqXHR.status]);
            } else {
              // Lazy-add the new callbacks in a way that preserves old ones
              for (code in map) {
                _statusCode[code] = [_statusCode[code], map[code]];
              }
            }
          }

          return this;
        },
        // Cancel the request
        abort: function abort(statusText) {
          var finalText = statusText || strAbort;

          if (transport) {
            transport.abort(finalText);
          }

          done(0, finalText);
          return this;
        }
      }; // Attach deferreds


      deferred.promise(jqXHR); // Add protocol if not provided (prefilters might expect it)
      // Handle falsy url in the settings object (#10093: consistency with old signature)
      // We also use the url parameter if available

      s.url = ((url || s.url || location.href) + "").replace(rprotocol, location.protocol + "//"); // Alias method option to type as per ticket #12004

      s.type = options.method || options.type || s.method || s.type; // Extract dataTypes list

      s.dataTypes = (s.dataType || "*").toLowerCase().match(rnothtmlwhite) || [""]; // A cross-domain request is in order when the origin doesn't match the current origin.

      if (s.crossDomain == null) {
        urlAnchor = document.createElement("a"); // Support: IE <=8 - 11, Edge 12 - 15
        // IE throws exception on accessing the href property if url is malformed,
        // e.g. http://example.com:80x/

        try {
          urlAnchor.href = s.url; // Support: IE <=8 - 11 only
          // Anchor's host property isn't correctly set when s.url is relative

          urlAnchor.href = urlAnchor.href;
          s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !== urlAnchor.protocol + "//" + urlAnchor.host;
        } catch (e) {
          // If there is an error parsing the URL, assume it is crossDomain,
          // it can be rejected by the transport if it is invalid
          s.crossDomain = true;
        }
      } // Convert data if not already a string


      if (s.data && s.processData && typeof s.data !== "string") {
        s.data = jQuery.param(s.data, s.traditional);
      } // Apply prefilters


      inspectPrefiltersOrTransports(prefilters, s, options, jqXHR); // If request was aborted inside a prefilter, stop there

      if (completed) {
        return jqXHR;
      } // We can fire global events as of now if asked to
      // Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)


      fireGlobals = jQuery.event && s.global; // Watch for a new set of requests

      if (fireGlobals && jQuery.active++ === 0) {
        jQuery.event.trigger("ajaxStart");
      } // Uppercase the type


      s.type = s.type.toUpperCase(); // Determine if request has content

      s.hasContent = !rnoContent.test(s.type); // Save the URL in case we're toying with the If-Modified-Since
      // and/or If-None-Match header later on
      // Remove hash to simplify url manipulation

      cacheURL = s.url.replace(rhash, ""); // More options handling for requests with no content

      if (!s.hasContent) {
        // Remember the hash so we can put it back
        uncached = s.url.slice(cacheURL.length); // If data is available and should be processed, append data to url

        if (s.data && (s.processData || typeof s.data === "string")) {
          cacheURL += (rquery.test(cacheURL) ? "&" : "?") + s.data; // #9682: remove data so that it's not used in an eventual retry

          delete s.data;
        } // Add or update anti-cache param if needed


        if (s.cache === false) {
          cacheURL = cacheURL.replace(rantiCache, "$1");
          uncached = (rquery.test(cacheURL) ? "&" : "?") + "_=" + nonce.guid++ + uncached;
        } // Put hash and anti-cache on the URL that will be requested (gh-1732)


        s.url = cacheURL + uncached; // Change '%20' to '+' if this is encoded form body content (gh-2658)
      } else if (s.data && s.processData && (s.contentType || "").indexOf("application/x-www-form-urlencoded") === 0) {
        s.data = s.data.replace(r20, "+");
      } // Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.


      if (s.ifModified) {
        if (jQuery.lastModified[cacheURL]) {
          jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[cacheURL]);
        }

        if (jQuery.etag[cacheURL]) {
          jqXHR.setRequestHeader("If-None-Match", jQuery.etag[cacheURL]);
        }
      } // Set the correct header, if data is being sent


      if (s.data && s.hasContent && s.contentType !== false || options.contentType) {
        jqXHR.setRequestHeader("Content-Type", s.contentType);
      } // Set the Accepts header for the server, depending on the dataType


      jqXHR.setRequestHeader("Accept", s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + (s.dataTypes[0] !== "*" ? ", " + allTypes + "; q=0.01" : "") : s.accepts["*"]); // Check for headers option

      for (i in s.headers) {
        jqXHR.setRequestHeader(i, s.headers[i]);
      } // Allow custom headers/mimetypes and early abort


      if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === false || completed)) {
        // Abort if not done already and return
        return jqXHR.abort();
      } // Aborting is no longer a cancellation


      strAbort = "abort"; // Install callbacks on deferreds

      completeDeferred.add(s.complete);
      jqXHR.done(s.success);
      jqXHR.fail(s.error); // Get transport

      transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR); // If no transport, we auto-abort

      if (!transport) {
        done(-1, "No Transport");
      } else {
        jqXHR.readyState = 1; // Send global event

        if (fireGlobals) {
          globalEventContext.trigger("ajaxSend", [jqXHR, s]);
        } // If request was aborted inside ajaxSend, stop there


        if (completed) {
          return jqXHR;
        } // Timeout


        if (s.async && s.timeout > 0) {
          timeoutTimer = window.setTimeout(function () {
            jqXHR.abort("timeout");
          }, s.timeout);
        }

        try {
          completed = false;
          transport.send(requestHeaders, done);
        } catch (e) {
          // Rethrow post-completion exceptions
          if (completed) {
            throw e;
          } // Propagate others as results


          done(-1, e);
        }
      } // Callback for when everything is done


      function done(status, nativeStatusText, responses, headers) {
        var isSuccess,
            success,
            error,
            response,
            modified,
            statusText = nativeStatusText; // Ignore repeat invocations

        if (completed) {
          return;
        }

        completed = true; // Clear timeout if it exists

        if (timeoutTimer) {
          window.clearTimeout(timeoutTimer);
        } // Dereference transport for early garbage collection
        // (no matter how long the jqXHR object will be used)


        transport = undefined; // Cache response headers

        responseHeadersString = headers || ""; // Set readyState

        jqXHR.readyState = status > 0 ? 4 : 0; // Determine if successful

        isSuccess = status >= 200 && status < 300 || status === 304; // Get response data

        if (responses) {
          response = ajaxHandleResponses(s, jqXHR, responses);
        } // Use a noop converter for missing script


        if (!isSuccess && jQuery.inArray("script", s.dataTypes) > -1) {
          s.converters["text script"] = function () {};
        } // Convert no matter what (that way responseXXX fields are always set)


        response = ajaxConvert(s, response, jqXHR, isSuccess); // If successful, handle type chaining

        if (isSuccess) {
          // Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
          if (s.ifModified) {
            modified = jqXHR.getResponseHeader("Last-Modified");

            if (modified) {
              jQuery.lastModified[cacheURL] = modified;
            }

            modified = jqXHR.getResponseHeader("etag");

            if (modified) {
              jQuery.etag[cacheURL] = modified;
            }
          } // if no content


          if (status === 204 || s.type === "HEAD") {
            statusText = "nocontent"; // if not modified
          } else if (status === 304) {
            statusText = "notmodified"; // If we have data, let's convert it
          } else {
            statusText = response.state;
            success = response.data;
            error = response.error;
            isSuccess = !error;
          }
        } else {
          // Extract error from statusText and normalize for non-aborts
          error = statusText;

          if (status || !statusText) {
            statusText = "error";

            if (status < 0) {
              status = 0;
            }
          }
        } // Set data for the fake xhr object


        jqXHR.status = status;
        jqXHR.statusText = (nativeStatusText || statusText) + ""; // Success/Error

        if (isSuccess) {
          deferred.resolveWith(callbackContext, [success, statusText, jqXHR]);
        } else {
          deferred.rejectWith(callbackContext, [jqXHR, statusText, error]);
        } // Status-dependent callbacks


        jqXHR.statusCode(_statusCode);
        _statusCode = undefined;

        if (fireGlobals) {
          globalEventContext.trigger(isSuccess ? "ajaxSuccess" : "ajaxError", [jqXHR, s, isSuccess ? success : error]);
        } // Complete


        completeDeferred.fireWith(callbackContext, [jqXHR, statusText]);

        if (fireGlobals) {
          globalEventContext.trigger("ajaxComplete", [jqXHR, s]); // Handle the global AJAX counter

          if (! --jQuery.active) {
            jQuery.event.trigger("ajaxStop");
          }
        }
      }

      return jqXHR;
    },
    getJSON: function getJSON(url, data, callback) {
      return jQuery.get(url, data, callback, "json");
    },
    getScript: function getScript(url, callback) {
      return jQuery.get(url, undefined, callback, "script");
    }
  });
  jQuery.each(["get", "post"], function (_i, method) {
    jQuery[method] = function (url, data, callback, type) {
      // Shift arguments if data argument was omitted
      if (isFunction(data)) {
        type = type || callback;
        callback = data;
        data = undefined;
      } // The url can be an options object (which then must have .url)


      return jQuery.ajax(jQuery.extend({
        url: url,
        type: method,
        dataType: type,
        data: data,
        success: callback
      }, jQuery.isPlainObject(url) && url));
    };
  });
  jQuery.ajaxPrefilter(function (s) {
    var i;

    for (i in s.headers) {
      if (i.toLowerCase() === "content-type") {
        s.contentType = s.headers[i] || "";
      }
    }
  });

  jQuery._evalUrl = function (url, options, doc) {
    return jQuery.ajax({
      url: url,
      // Make this explicit, since user can override this through ajaxSetup (#11264)
      type: "GET",
      dataType: "script",
      cache: true,
      async: false,
      global: false,
      // Only evaluate the response if it is successful (gh-4126)
      // dataFilter is not invoked for failure responses, so using it instead
      // of the default converter is kludgy but it works.
      converters: {
        "text script": function textScript() {}
      },
      dataFilter: function dataFilter(response) {
        jQuery.globalEval(response, options, doc);
      }
    });
  };

  jQuery.fn.extend({
    wrapAll: function wrapAll(html) {
      var wrap;

      if (this[0]) {
        if (isFunction(html)) {
          html = html.call(this[0]);
        } // The elements to wrap the target around


        wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(true);

        if (this[0].parentNode) {
          wrap.insertBefore(this[0]);
        }

        wrap.map(function () {
          var elem = this;

          while (elem.firstElementChild) {
            elem = elem.firstElementChild;
          }

          return elem;
        }).append(this);
      }

      return this;
    },
    wrapInner: function wrapInner(html) {
      if (isFunction(html)) {
        return this.each(function (i) {
          jQuery(this).wrapInner(html.call(this, i));
        });
      }

      return this.each(function () {
        var self = jQuery(this),
            contents = self.contents();

        if (contents.length) {
          contents.wrapAll(html);
        } else {
          self.append(html);
        }
      });
    },
    wrap: function wrap(html) {
      var htmlIsFunction = isFunction(html);
      return this.each(function (i) {
        jQuery(this).wrapAll(htmlIsFunction ? html.call(this, i) : html);
      });
    },
    unwrap: function unwrap(selector) {
      this.parent(selector).not("body").each(function () {
        jQuery(this).replaceWith(this.childNodes);
      });
      return this;
    }
  });

  jQuery.expr.pseudos.hidden = function (elem) {
    return !jQuery.expr.pseudos.visible(elem);
  };

  jQuery.expr.pseudos.visible = function (elem) {
    return !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
  };

  jQuery.ajaxSettings.xhr = function () {
    try {
      return new window.XMLHttpRequest();
    } catch (e) {}
  };

  var xhrSuccessStatus = {
    // File protocol always yields status code 0, assume 200
    0: 200,
    // Support: IE <=9 only
    // #1450: sometimes IE returns 1223 when it should be 204
    1223: 204
  },
      xhrSupported = jQuery.ajaxSettings.xhr();
  support.cors = !!xhrSupported && "withCredentials" in xhrSupported;
  support.ajax = xhrSupported = !!xhrSupported;
  jQuery.ajaxTransport(function (options) {
    var _callback, errorCallback; // Cross domain only allowed if supported through XMLHttpRequest


    if (support.cors || xhrSupported && !options.crossDomain) {
      return {
        send: function send(headers, complete) {
          var i,
              xhr = options.xhr();
          xhr.open(options.type, options.url, options.async, options.username, options.password); // Apply custom fields if provided

          if (options.xhrFields) {
            for (i in options.xhrFields) {
              xhr[i] = options.xhrFields[i];
            }
          } // Override mime type if needed


          if (options.mimeType && xhr.overrideMimeType) {
            xhr.overrideMimeType(options.mimeType);
          } // X-Requested-With header
          // For cross-domain requests, seeing as conditions for a preflight are
          // akin to a jigsaw puzzle, we simply never set it to be sure.
          // (it can always be set on a per-request basis or even using ajaxSetup)
          // For same-domain requests, won't change header if already provided.


          if (!options.crossDomain && !headers["X-Requested-With"]) {
            headers["X-Requested-With"] = "XMLHttpRequest";
          } // Set headers


          for (i in headers) {
            xhr.setRequestHeader(i, headers[i]);
          } // Callback


          _callback = function callback(type) {
            return function () {
              if (_callback) {
                _callback = errorCallback = xhr.onload = xhr.onerror = xhr.onabort = xhr.ontimeout = xhr.onreadystatechange = null;

                if (type === "abort") {
                  xhr.abort();
                } else if (type === "error") {
                  // Support: IE <=9 only
                  // On a manual native abort, IE9 throws
                  // errors on any property access that is not readyState
                  if (typeof xhr.status !== "number") {
                    complete(0, "error");
                  } else {
                    complete( // File: protocol always yields status 0; see #8605, #14207
                    xhr.status, xhr.statusText);
                  }
                } else {
                  complete(xhrSuccessStatus[xhr.status] || xhr.status, xhr.statusText, // Support: IE <=9 only
                  // IE9 has no XHR2 but throws on binary (trac-11426)
                  // For XHR2 non-text, let the caller handle it (gh-2498)
                  (xhr.responseType || "text") !== "text" || typeof xhr.responseText !== "string" ? {
                    binary: xhr.response
                  } : {
                    text: xhr.responseText
                  }, xhr.getAllResponseHeaders());
                }
              }
            };
          }; // Listen to events


          xhr.onload = _callback();
          errorCallback = xhr.onerror = xhr.ontimeout = _callback("error"); // Support: IE 9 only
          // Use onreadystatechange to replace onabort
          // to handle uncaught aborts

          if (xhr.onabort !== undefined) {
            xhr.onabort = errorCallback;
          } else {
            xhr.onreadystatechange = function () {
              // Check readyState before timeout as it changes
              if (xhr.readyState === 4) {
                // Allow onerror to be called first,
                // but that will not handle a native abort
                // Also, save errorCallback to a variable
                // as xhr.onerror cannot be accessed
                window.setTimeout(function () {
                  if (_callback) {
                    errorCallback();
                  }
                });
              }
            };
          } // Create the abort callback


          _callback = _callback("abort");

          try {
            // Do send the request (this may raise an exception)
            xhr.send(options.hasContent && options.data || null);
          } catch (e) {
            // #14683: Only rethrow if this hasn't been notified as an error yet
            if (_callback) {
              throw e;
            }
          }
        },
        abort: function abort() {
          if (_callback) {
            _callback();
          }
        }
      };
    }
  }); // Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)

  jQuery.ajaxPrefilter(function (s) {
    if (s.crossDomain) {
      s.contents.script = false;
    }
  }); // Install script dataType

  jQuery.ajaxSetup({
    accepts: {
      script: "text/javascript, application/javascript, " + "application/ecmascript, application/x-ecmascript"
    },
    contents: {
      script: /\b(?:java|ecma)script\b/
    },
    converters: {
      "text script": function textScript(text) {
        jQuery.globalEval(text);
        return text;
      }
    }
  }); // Handle cache's special case and crossDomain

  jQuery.ajaxPrefilter("script", function (s) {
    if (s.cache === undefined) {
      s.cache = false;
    }

    if (s.crossDomain) {
      s.type = "GET";
    }
  }); // Bind script tag hack transport

  jQuery.ajaxTransport("script", function (s) {
    // This transport only deals with cross domain or forced-by-attrs requests
    if (s.crossDomain || s.scriptAttrs) {
      var script, _callback2;

      return {
        send: function send(_, complete) {
          script = jQuery("<script>").attr(s.scriptAttrs || {}).prop({
            charset: s.scriptCharset,
            src: s.url
          }).on("load error", _callback2 = function callback(evt) {
            script.remove();
            _callback2 = null;

            if (evt) {
              complete(evt.type === "error" ? 404 : 200, evt.type);
            }
          }); // Use native DOM manipulation to avoid our domManip AJAX trickery

          document.head.appendChild(script[0]);
        },
        abort: function abort() {
          if (_callback2) {
            _callback2();
          }
        }
      };
    }
  });
  var oldCallbacks = [],
      rjsonp = /(=)\?(?=&|$)|\?\?/; // Default jsonp settings

  jQuery.ajaxSetup({
    jsonp: "callback",
    jsonpCallback: function jsonpCallback() {
      var callback = oldCallbacks.pop() || jQuery.expando + "_" + nonce.guid++;
      this[callback] = true;
      return callback;
    }
  }); // Detect, normalize options and install callbacks for jsonp requests

  jQuery.ajaxPrefilter("json jsonp", function (s, originalSettings, jqXHR) {
    var callbackName,
        overwritten,
        responseContainer,
        jsonProp = s.jsonp !== false && (rjsonp.test(s.url) ? "url" : typeof s.data === "string" && (s.contentType || "").indexOf("application/x-www-form-urlencoded") === 0 && rjsonp.test(s.data) && "data"); // Handle iff the expected data type is "jsonp" or we have a parameter to set

    if (jsonProp || s.dataTypes[0] === "jsonp") {
      // Get callback name, remembering preexisting value associated with it
      callbackName = s.jsonpCallback = isFunction(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback; // Insert callback into url or form data

      if (jsonProp) {
        s[jsonProp] = s[jsonProp].replace(rjsonp, "$1" + callbackName);
      } else if (s.jsonp !== false) {
        s.url += (rquery.test(s.url) ? "&" : "?") + s.jsonp + "=" + callbackName;
      } // Use data converter to retrieve json after script execution


      s.converters["script json"] = function () {
        if (!responseContainer) {
          jQuery.error(callbackName + " was not called");
        }

        return responseContainer[0];
      }; // Force json dataType


      s.dataTypes[0] = "json"; // Install callback

      overwritten = window[callbackName];

      window[callbackName] = function () {
        responseContainer = arguments;
      }; // Clean-up function (fires after converters)


      jqXHR.always(function () {
        // If previous value didn't exist - remove it
        if (overwritten === undefined) {
          jQuery(window).removeProp(callbackName); // Otherwise restore preexisting value
        } else {
          window[callbackName] = overwritten;
        } // Save back as free


        if (s[callbackName]) {
          // Make sure that re-using the options doesn't screw things around
          s.jsonpCallback = originalSettings.jsonpCallback; // Save the callback name for future use

          oldCallbacks.push(callbackName);
        } // Call if it was a function and we have a response


        if (responseContainer && isFunction(overwritten)) {
          overwritten(responseContainer[0]);
        }

        responseContainer = overwritten = undefined;
      }); // Delegate to script

      return "script";
    }
  }); // Support: Safari 8 only
  // In Safari 8 documents created via document.implementation.createHTMLDocument
  // collapse sibling forms: the second one becomes a child of the first one.
  // Because of that, this security measure has to be disabled in Safari 8.
  // https://bugs.webkit.org/show_bug.cgi?id=137337

  support.createHTMLDocument = function () {
    var body = document.implementation.createHTMLDocument("").body;
    body.innerHTML = "<form></form><form></form>";
    return body.childNodes.length === 2;
  }(); // Argument "data" should be string of html
  // context (optional): If specified, the fragment will be created in this context,
  // defaults to document
  // keepScripts (optional): If true, will include scripts passed in the html string


  jQuery.parseHTML = function (data, context, keepScripts) {
    if (typeof data !== "string") {
      return [];
    }

    if (typeof context === "boolean") {
      keepScripts = context;
      context = false;
    }

    var base, parsed, scripts;

    if (!context) {
      // Stop scripts or inline event handlers from being executed immediately
      // by using document.implementation
      if (support.createHTMLDocument) {
        context = document.implementation.createHTMLDocument(""); // Set the base href for the created document
        // so any parsed elements with URLs
        // are based on the document's URL (gh-2965)

        base = context.createElement("base");
        base.href = document.location.href;
        context.head.appendChild(base);
      } else {
        context = document;
      }
    }

    parsed = rsingleTag.exec(data);
    scripts = !keepScripts && []; // Single tag

    if (parsed) {
      return [context.createElement(parsed[1])];
    }

    parsed = buildFragment([data], context, scripts);

    if (scripts && scripts.length) {
      jQuery(scripts).remove();
    }

    return jQuery.merge([], parsed.childNodes);
  };
  /**
   * Load a url into a page
   */


  jQuery.fn.load = function (url, params, callback) {
    var selector,
        type,
        response,
        self = this,
        off = url.indexOf(" ");

    if (off > -1) {
      selector = stripAndCollapse(url.slice(off));
      url = url.slice(0, off);
    } // If it's a function


    if (isFunction(params)) {
      // We assume that it's the callback
      callback = params;
      params = undefined; // Otherwise, build a param string
    } else if (params && _typeof(params) === "object") {
      type = "POST";
    } // If we have elements to modify, make the request


    if (self.length > 0) {
      jQuery.ajax({
        url: url,
        // If "type" variable is undefined, then "GET" method will be used.
        // Make value of this field explicit since
        // user can override it through ajaxSetup method
        type: type || "GET",
        dataType: "html",
        data: params
      }).done(function (responseText) {
        // Save response for use in complete callback
        response = arguments;
        self.html(selector ? // If a selector was specified, locate the right elements in a dummy div
        // Exclude scripts to avoid IE 'Permission Denied' errors
        jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector) : // Otherwise use the full result
        responseText); // If the request succeeds, this function gets "data", "status", "jqXHR"
        // but they are ignored because response was set above.
        // If it fails, this function gets "jqXHR", "status", "error"
      }).always(callback && function (jqXHR, status) {
        self.each(function () {
          callback.apply(this, response || [jqXHR.responseText, status, jqXHR]);
        });
      });
    }

    return this;
  };

  jQuery.expr.pseudos.animated = function (elem) {
    return jQuery.grep(jQuery.timers, function (fn) {
      return elem === fn.elem;
    }).length;
  };

  jQuery.offset = {
    setOffset: function setOffset(elem, options, i) {
      var curPosition,
          curLeft,
          curCSSTop,
          curTop,
          curOffset,
          curCSSLeft,
          calculatePosition,
          position = jQuery.css(elem, "position"),
          curElem = jQuery(elem),
          props = {}; // Set position first, in-case top/left are set even on static elem

      if (position === "static") {
        elem.style.position = "relative";
      }

      curOffset = curElem.offset();
      curCSSTop = jQuery.css(elem, "top");
      curCSSLeft = jQuery.css(elem, "left");
      calculatePosition = (position === "absolute" || position === "fixed") && (curCSSTop + curCSSLeft).indexOf("auto") > -1; // Need to be able to calculate position if either
      // top or left is auto and position is either absolute or fixed

      if (calculatePosition) {
        curPosition = curElem.position();
        curTop = curPosition.top;
        curLeft = curPosition.left;
      } else {
        curTop = parseFloat(curCSSTop) || 0;
        curLeft = parseFloat(curCSSLeft) || 0;
      }

      if (isFunction(options)) {
        // Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
        options = options.call(elem, i, jQuery.extend({}, curOffset));
      }

      if (options.top != null) {
        props.top = options.top - curOffset.top + curTop;
      }

      if (options.left != null) {
        props.left = options.left - curOffset.left + curLeft;
      }

      if ("using" in options) {
        options.using.call(elem, props);
      } else {
        if (typeof props.top === "number") {
          props.top += "px";
        }

        if (typeof props.left === "number") {
          props.left += "px";
        }

        curElem.css(props);
      }
    }
  };
  jQuery.fn.extend({
    // offset() relates an element's border box to the document origin
    offset: function offset(options) {
      // Preserve chaining for setter
      if (arguments.length) {
        return options === undefined ? this : this.each(function (i) {
          jQuery.offset.setOffset(this, options, i);
        });
      }

      var rect,
          win,
          elem = this[0];

      if (!elem) {
        return;
      } // Return zeros for disconnected and hidden (display: none) elements (gh-2310)
      // Support: IE <=11 only
      // Running getBoundingClientRect on a
      // disconnected node in IE throws an error


      if (!elem.getClientRects().length) {
        return {
          top: 0,
          left: 0
        };
      } // Get document-relative position by adding viewport scroll to viewport-relative gBCR


      rect = elem.getBoundingClientRect();
      win = elem.ownerDocument.defaultView;
      return {
        top: rect.top + win.pageYOffset,
        left: rect.left + win.pageXOffset
      };
    },
    // position() relates an element's margin box to its offset parent's padding box
    // This corresponds to the behavior of CSS absolute positioning
    position: function position() {
      if (!this[0]) {
        return;
      }

      var offsetParent,
          offset,
          doc,
          elem = this[0],
          parentOffset = {
        top: 0,
        left: 0
      }; // position:fixed elements are offset from the viewport, which itself always has zero offset

      if (jQuery.css(elem, "position") === "fixed") {
        // Assume position:fixed implies availability of getBoundingClientRect
        offset = elem.getBoundingClientRect();
      } else {
        offset = this.offset(); // Account for the *real* offset parent, which can be the document or its root element
        // when a statically positioned element is identified

        doc = elem.ownerDocument;
        offsetParent = elem.offsetParent || doc.documentElement;

        while (offsetParent && (offsetParent === doc.body || offsetParent === doc.documentElement) && jQuery.css(offsetParent, "position") === "static") {
          offsetParent = offsetParent.parentNode;
        }

        if (offsetParent && offsetParent !== elem && offsetParent.nodeType === 1) {
          // Incorporate borders into its offset, since they are outside its content origin
          parentOffset = jQuery(offsetParent).offset();
          parentOffset.top += jQuery.css(offsetParent, "borderTopWidth", true);
          parentOffset.left += jQuery.css(offsetParent, "borderLeftWidth", true);
        }
      } // Subtract parent offsets and element margins


      return {
        top: offset.top - parentOffset.top - jQuery.css(elem, "marginTop", true),
        left: offset.left - parentOffset.left - jQuery.css(elem, "marginLeft", true)
      };
    },
    // This method will return documentElement in the following cases:
    // 1) For the element inside the iframe without offsetParent, this method will return
    //    documentElement of the parent window
    // 2) For the hidden or detached element
    // 3) For body or html element, i.e. in case of the html node - it will return itself
    //
    // but those exceptions were never presented as a real life use-cases
    // and might be considered as more preferable results.
    //
    // This logic, however, is not guaranteed and can change at any point in the future
    offsetParent: function offsetParent() {
      return this.map(function () {
        var offsetParent = this.offsetParent;

        while (offsetParent && jQuery.css(offsetParent, "position") === "static") {
          offsetParent = offsetParent.offsetParent;
        }

        return offsetParent || documentElement;
      });
    }
  }); // Create scrollLeft and scrollTop methods

  jQuery.each({
    scrollLeft: "pageXOffset",
    scrollTop: "pageYOffset"
  }, function (method, prop) {
    var top = "pageYOffset" === prop;

    jQuery.fn[method] = function (val) {
      return access(this, function (elem, method, val) {
        // Coalesce documents and windows
        var win;

        if (isWindow(elem)) {
          win = elem;
        } else if (elem.nodeType === 9) {
          win = elem.defaultView;
        }

        if (val === undefined) {
          return win ? win[prop] : elem[method];
        }

        if (win) {
          win.scrollTo(!top ? val : win.pageXOffset, top ? val : win.pageYOffset);
        } else {
          elem[method] = val;
        }
      }, method, val, arguments.length);
    };
  }); // Support: Safari <=7 - 9.1, Chrome <=37 - 49
  // Add the top/left cssHooks using jQuery.fn.position
  // Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
  // Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
  // getComputedStyle returns percent when specified for top/left/bottom/right;
  // rather than make the css module depend on the offset module, just check for it here

  jQuery.each(["top", "left"], function (_i, prop) {
    jQuery.cssHooks[prop] = addGetHookIf(support.pixelPosition, function (elem, computed) {
      if (computed) {
        computed = curCSS(elem, prop); // If curCSS returns percentage, fallback to offset

        return rnumnonpx.test(computed) ? jQuery(elem).position()[prop] + "px" : computed;
      }
    });
  }); // Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods

  jQuery.each({
    Height: "height",
    Width: "width"
  }, function (name, type) {
    jQuery.each({
      padding: "inner" + name,
      content: type,
      "": "outer" + name
    }, function (defaultExtra, funcName) {
      // Margin is only for outerHeight, outerWidth
      jQuery.fn[funcName] = function (margin, value) {
        var chainable = arguments.length && (defaultExtra || typeof margin !== "boolean"),
            extra = defaultExtra || (margin === true || value === true ? "margin" : "border");
        return access(this, function (elem, type, value) {
          var doc;

          if (isWindow(elem)) {
            // $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
            return funcName.indexOf("outer") === 0 ? elem["inner" + name] : elem.document.documentElement["client" + name];
          } // Get document width or height


          if (elem.nodeType === 9) {
            doc = elem.documentElement; // Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
            // whichever is greatest

            return Math.max(elem.body["scroll" + name], doc["scroll" + name], elem.body["offset" + name], doc["offset" + name], doc["client" + name]);
          }

          return value === undefined ? // Get width or height on the element, requesting but not forcing parseFloat
          jQuery.css(elem, type, extra) : // Set width or height on the element
          jQuery.style(elem, type, value, extra);
        }, type, chainable ? margin : undefined, chainable);
      };
    });
  });
  jQuery.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (_i, type) {
    jQuery.fn[type] = function (fn) {
      return this.on(type, fn);
    };
  });
  jQuery.fn.extend({
    bind: function bind(types, data, fn) {
      return this.on(types, null, data, fn);
    },
    unbind: function unbind(types, fn) {
      return this.off(types, null, fn);
    },
    delegate: function delegate(selector, types, data, fn) {
      return this.on(types, selector, data, fn);
    },
    undelegate: function undelegate(selector, types, fn) {
      // ( namespace ) or ( selector, types [, fn] )
      return arguments.length === 1 ? this.off(selector, "**") : this.off(types, selector || "**", fn);
    },
    hover: function hover(fnOver, fnOut) {
      return this.mouseenter(fnOver).mouseleave(fnOut || fnOver);
    }
  });
  jQuery.each(("blur focus focusin focusout resize scroll click dblclick " + "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " + "change select submit keydown keypress keyup contextmenu").split(" "), function (_i, name) {
    // Handle event binding
    jQuery.fn[name] = function (data, fn) {
      return arguments.length > 0 ? this.on(name, null, data, fn) : this.trigger(name);
    };
  }); // Support: Android <=4.0 only
  // Make sure we trim BOM and NBSP

  var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g; // Bind a function to a context, optionally partially applying any
  // arguments.
  // jQuery.proxy is deprecated to promote standards (specifically Function#bind)
  // However, it is not slated for removal any time soon

  jQuery.proxy = function (fn, context) {
    var tmp, args, proxy;

    if (typeof context === "string") {
      tmp = fn[context];
      context = fn;
      fn = tmp;
    } // Quick check to determine if target is callable, in the spec
    // this throws a TypeError, but we will just return undefined.


    if (!isFunction(fn)) {
      return undefined;
    } // Simulated bind


    args = _slice.call(arguments, 2);

    proxy = function proxy() {
      return fn.apply(context || this, args.concat(_slice.call(arguments)));
    }; // Set the guid of unique handler to the same of original handler, so it can be removed


    proxy.guid = fn.guid = fn.guid || jQuery.guid++;
    return proxy;
  };

  jQuery.holdReady = function (hold) {
    if (hold) {
      jQuery.readyWait++;
    } else {
      jQuery.ready(true);
    }
  };

  jQuery.isArray = Array.isArray;
  jQuery.parseJSON = JSON.parse;
  jQuery.nodeName = nodeName;
  jQuery.isFunction = isFunction;
  jQuery.isWindow = isWindow;
  jQuery.camelCase = camelCase;
  jQuery.type = toType;
  jQuery.now = Date.now;

  jQuery.isNumeric = function (obj) {
    // As of jQuery 3.0, isNumeric is limited to
    // strings and numbers (primitives or objects)
    // that can be coerced to finite numbers (gh-2662)
    var type = jQuery.type(obj);
    return (type === "number" || type === "string") && // parseFloat NaNs numeric-cast false positives ("")
    // ...but misinterprets leading-number strings, particularly hex literals ("0x...")
    // subtraction forces infinities to NaN
    !isNaN(obj - parseFloat(obj));
  };

  jQuery.trim = function (text) {
    return text == null ? "" : (text + "").replace(rtrim, "");
  }; // Register as a named AMD module, since jQuery can be concatenated with other
  // files that may use define, but not via a proper concatenation script that
  // understands anonymous AMD modules. A named AMD is safest and most robust
  // way to register. Lowercase jquery is used because AMD module names are
  // derived from file names, and jQuery is normally delivered in a lowercase
  // file name. Do this after creating the global so that if an AMD module wants
  // to call noConflict to hide this version of jQuery, it will work.
  // Note that for maximum portability, libraries that are not jQuery should
  // declare themselves as anonymous modules, and avoid setting a global if an
  // AMD loader is present. jQuery is a special case. For more information, see
  // https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon


  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
      return jQuery;
    }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  }

  var // Map over jQuery in case of overwrite
  _jQuery = window.jQuery,
      // Map over the $ in case of overwrite
  _$ = window.$;

  jQuery.noConflict = function (deep) {
    if (window.$ === jQuery) {
      window.$ = _$;
    }

    if (deep && window.jQuery === jQuery) {
      window.jQuery = _jQuery;
    }

    return jQuery;
  }; // Expose jQuery and $ identifiers, even in AMD
  // (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
  // and CommonJS for browser emulators (#13566)


  if (typeof noGlobal === "undefined") {
    window.jQuery = window.$ = jQuery;
  }

  return jQuery;
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(7)(module)))

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(13);

/***/ }),
/* 2 */
/***/ (function(module, exports) {

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

module.exports = _asyncToGenerator;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

module.exports = _defineProperty;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

function _typeof2(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

function _typeof(obj) {
  if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return _typeof2(obj);
    };
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
    };
  }

  return _typeof(obj);
}

module.exports = _typeof;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

module.exports = _classCallCheck;

/***/ }),
/* 6 */
/***/ (function(module, exports) {

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

module.exports = _createClass;

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = function (module) {
  if (!module.webpackPolyfill) {
    module.deprecate = function () {};

    module.paths = []; // module.parent = undefined by default

    if (!module.children) module.children = [];
    Object.defineProperty(module, "loaded", {
      enumerable: true,
      get: function get() {
        return module.l;
      }
    });
    Object.defineProperty(module, "id", {
      enumerable: true,
      get: function get() {
        return module.i;
      }
    });
    module.webpackPolyfill = 1;
  }

  return module;
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var arrayWithHoles = __webpack_require__(14);

var iterableToArrayLimit = __webpack_require__(15);

var nonIterableRest = __webpack_require__(16);

function _slicedToArray(arr, i) {
  return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || nonIterableRest();
}

module.exports = _slicedToArray;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var arrayWithoutHoles = __webpack_require__(17);

var iterableToArray = __webpack_require__(18);

var nonIterableSpread = __webpack_require__(19);

function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || nonIterableSpread();
}

module.exports = _toConsumableArray;

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__);


/*!
 * jQuery Cookie Plugin v1.4.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2006, 2014 Klaus Hartl
 * Released under the MIT license
 */
(function (factory) {
  if (typeof define === 'function' && __webpack_require__(12)) {
    // AMD (Register as an anonymous module)
    define(['jquery'], factory);
  } else if ((typeof exports === "undefined" ? "undefined" : _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default()(exports)) === 'object') {
    // Node/CommonJS
    module.exports = factory(__webpack_require__(0));
  } else {
    // Browser globals
    factory(jQuery);
  }
})(function ($) {
  var pluses = /\+/g;

  function encode(s) {
    return config.raw ? s : encodeURIComponent(s);
  }

  function decode(s) {
    return config.raw ? s : decodeURIComponent(s);
  }

  function stringifyCookieValue(value) {
    return encode(config.json ? JSON.stringify(value) : String(value));
  }

  function parseCookieValue(s) {
    if (s.indexOf('"') === 0) {
      // This is a quoted cookie as according to RFC2068, unescape...
      s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
    }

    try {
      // Replace server-side written pluses with spaces.
      // If we can't decode the cookie, ignore it, it's unusable.
      // If we can't parse the cookie, ignore it, it's unusable.
      s = decodeURIComponent(s.replace(pluses, ' '));
      return config.json ? JSON.parse(s) : s;
    } catch (e) {}
  }

  function read(s, converter) {
    var value = config.raw ? s : parseCookieValue(s);
    return $.isFunction(converter) ? converter(value) : value;
  }

  var config = $.cookie = function (key, value, options) {
    // Write
    if (arguments.length > 1 && !$.isFunction(value)) {
      options = $.extend({}, config.defaults, options);

      if (typeof options.expires === 'number') {
        var days = options.expires,
            t = options.expires = new Date();
        t.setMilliseconds(t.getMilliseconds() + days * 864e+5);
      }

      return document.cookie = [encode(key), '=', stringifyCookieValue(value), options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
      options.path ? '; path=' + options.path : '', options.domain ? '; domain=' + options.domain : '', options.secure ? '; secure' : ''].join('');
    } // Read


    var result = key ? undefined : {},
        // To prevent the for loop in the first place assign an empty array
    // in case there are no cookies at all. Also prevents odd result when
    // calling $.cookie().
    cookies = document.cookie ? document.cookie.split('; ') : [],
        i = 0,
        l = cookies.length;

    for (; i < l; i++) {
      var parts = cookies[i].split('='),
          name = decode(parts.shift()),
          cookie = parts.join('=');

      if (key === name) {
        // If second argument (value) is a function it's a converter...
        result = read(cookie, value);
        break;
      } // Prevent storing a cookie that we couldn't decode.


      if (!key && (cookie = read(cookie)) !== undefined) {
        result[name] = cookie;
      }
    }

    return result;
  };

  config.defaults = {};

  $.removeCookie = function (key, options) {
    // Must not alter options, thus extending a fresh object...
    $.cookie(key, '', $.extend({}, options, {
      expires: -1
    }));
    return !$.cookie(key);
  };
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(11)(module)))

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = function (originalModule) {
  if (!originalModule.webpackPolyfill) {
    var module = Object.create(originalModule); // module.parent = undefined by default

    if (!module.children) module.children = [];
    Object.defineProperty(module, "loaded", {
      enumerable: true,
      get: function get() {
        return module.l;
      }
    });
    Object.defineProperty(module, "id", {
      enumerable: true,
      get: function get() {
        return module.i;
      }
    });
    Object.defineProperty(module, "exports", {
      enumerable: true
    });
    module.webpackPolyfill = 1;
  }

  return module;
};

/***/ }),
/* 12 */
/***/ (function(module, exports) {

/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {/* globals __webpack_amd_options__ */
module.exports = __webpack_amd_options__;

/* WEBPACK VAR INJECTION */}.call(this, {}))

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var runtime = function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.

  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []); // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.

    generator._invoke = makeInvokeMethod(innerFn, self, context);
    return generator;
  }

  exports.wrap = wrap; // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.

  function tryCatch(fn, obj, arg) {
    try {
      return {
        type: "normal",
        arg: fn.call(obj, arg)
      };
    } catch (err) {
      return {
        type: "throw",
        arg: err
      };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed"; // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.

  var ContinueSentinel = {}; // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.

  function Generator() {}

  function GeneratorFunction() {}

  function GeneratorFunctionPrototype() {} // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.


  var IteratorPrototype = {};

  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));

  if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] = GeneratorFunction.displayName = "GeneratorFunction"; // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.

  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      prototype[method] = function (arg) {
        return this._invoke(method, arg);
      };
    });
  }

  exports.isGeneratorFunction = function (genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor ? ctor === GeneratorFunction || // For the native GeneratorFunction constructor, the best we can
    // do is to check its .name property.
    (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
  };

  exports.mark = function (genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;

      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }

    genFun.prototype = Object.create(Gp);
    return genFun;
  }; // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.


  exports.awrap = function (arg) {
    return {
      __await: arg
    };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);

      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;

        if (value && _typeof(value) === "object" && hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function (value) {
            invoke("next", value, resolve, reject);
          }, function (err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function (unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function (error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function (resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise = // If enqueue has been called before, then we want to wait until
      // all previous Promises have been resolved before calling invoke,
      // so that results are always delivered in the correct order. If
      // enqueue has not been called before, then it is important to
      // call invoke immediately, without waiting on a callback to fire,
      // so that the async generator function has the opportunity to do
      // any necessary setup in a predictable way. This predictability
      // is why the Promise constructor synchronously invokes its
      // executor callback, and why async functions synchronously
      // execute code before the first await. Since we implement simple
      // async functions in terms of async generators, it is especially
      // important to get this right, even though it requires care.
      previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, // Avoid propagating failures to Promises returned by later
      // invocations of the iterator.
      callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
    } // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).


    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);

  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };

  exports.AsyncIterator = AsyncIterator; // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.

  exports.async = function (innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList));
    return exports.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
    : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;
    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        } // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume


        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;

        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);

          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;
        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);
        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;
        var record = tryCatch(innerFn, self, context);

        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done ? GenStateCompleted : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };
        } else if (record.type === "throw") {
          state = GenStateCompleted; // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.

          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  } // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.


  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];

    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError("The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (!info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value; // Resume execution at the desired location (see delegateYield).

      context.next = delegate.nextLoc; // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.

      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }
    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    } // The delegate iterator is finished, so forget it and continue with
    // the outer generator.


    context.delegate = null;
    return ContinueSentinel;
  } // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.


  defineIteratorMethods(Gp);
  Gp[toStringTagSymbol] = "Generator"; // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.

  Gp[iteratorSymbol] = function () {
    return this;
  };

  Gp.toString = function () {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = {
      tryLoc: locs[0]
    };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{
      tryLoc: "root"
    }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function (object) {
    var keys = [];

    for (var key in object) {
      keys.push(key);
    }

    keys.reverse(); // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.

    return function next() {
      while (keys.length) {
        var key = keys.pop();

        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      } // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.


      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];

      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1,
            next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;
          return next;
        };

        return next.next = next;
      }
    } // Return an iterator with no values.


    return {
      next: doneResult
    };
  }

  exports.values = values;

  function doneResult() {
    return {
      value: undefined,
      done: true
    };
  }

  Context.prototype = {
    constructor: Context,
    reset: function reset(skipTempReset) {
      this.prev = 0;
      this.next = 0; // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.

      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;
      this.method = "next";
      this.arg = undefined;
      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },
    stop: function stop() {
      this.done = true;
      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;

      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },
    dispatchException: function dispatchException(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;

      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !!caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }
          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }
          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },
    abrupt: function abrupt(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },
    complete: function complete(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" || record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },
    finish: function finish(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },
    "catch": function _catch(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;

          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }

          return thrown;
        }
      } // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.


      throw new Error("illegal catch attempt");
    },
    delegateYield: function delegateYield(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  }; // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.

  return exports;
}( // If this script is executing as a CommonJS module, use module.exports
// as the regeneratorRuntime namespace. Otherwise create a new empty
// object. Either way, the resulting object will be used to initialize
// the regeneratorRuntime variable at the top of this file.
( false ? undefined : _typeof(module)) === "object" ? module.exports : {});

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(7)(module)))

/***/ }),
/* 14 */
/***/ (function(module, exports) {

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

module.exports = _arrayWithHoles;

/***/ }),
/* 15 */
/***/ (function(module, exports) {

function _iterableToArrayLimit(arr, i) {
  if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) {
    return;
  }

  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

module.exports = _iterableToArrayLimit;

/***/ }),
/* 16 */
/***/ (function(module, exports) {

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

module.exports = _nonIterableRest;

/***/ }),
/* 17 */
/***/ (function(module, exports) {

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }
}

module.exports = _arrayWithoutHoles;

/***/ }),
/* 18 */
/***/ (function(module, exports) {

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

module.exports = _iterableToArray;

/***/ }),
/* 19 */
/***/ (function(module, exports) {

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

module.exports = _nonIterableSpread;

/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/typeof.js
var helpers_typeof = __webpack_require__(4);
var typeof_default = /*#__PURE__*/__webpack_require__.n(helpers_typeof);

// CONCATENATED MODULE: ./assets/js/public/modal.js


/*
 * modal.js by Bootstrap
 * https://github.com/twbs/bootstrap
 */
jQuery(document).ready(function ($) {
  if (typeof $().modal !== "function") {
    'use strict'; // MODAL CLASS DEFINITION
    // ======================


    var Modal = function Modal(element, options) {
      this.options = options;
      this.$element = $(element);
      this.$backdrop = this.isShown = null;

      if (this.options.remote) {
        this.$element.find('.modal-content').load(this.options.remote, $.proxy(function () {
          this.$element.trigger('loaded.bs.modal');
        }, this));
      }
    };

    Modal.DEFAULTS = {
      backdrop: true,
      keyboard: true,
      show: true
    };

    Modal.prototype.toggle = function (_relatedTarget) {
      return this[!this.isShown ? 'show' : 'hide'](_relatedTarget);
    };

    Modal.prototype.show = function (_relatedTarget) {
      var that = this;
      var e = $.Event('show.bs.modal', {
        relatedTarget: _relatedTarget
      });
      this.$element.trigger(e);

      if (this.isShown || e.isDefaultPrevented()) {
        return;
      }

      this.isShown = true;
      this.escape();
      this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this));
      this.backdrop(function () {
        var transition = $.support.transition && that.$element.hasClass('fade');

        if (!that.$element.parent().length) {
          that.$element.appendTo(document.body); // don't move modals dom position
        }

        that.$element.show().scrollTop(0);

        if (transition) {
          that.$element[0].offsetWidth; // force reflow
        }

        that.$element.addClass('in').attr('aria-hidden', false);
        that.enforceFocus();
        var e = $.Event('shown.bs.modal', {
          relatedTarget: _relatedTarget
        });
        transition ? that.$element.find('.modal-dialog') // wait for modal to slide in
        .one($.support.transition.end, function () {
          that.$element.focus().trigger(e);
        }).emulateTransitionEnd(300) : that.$element.focus().trigger(e);
      });
    };

    Modal.prototype.hide = function (e) {
      if (e) {
        e.preventDefault();
      }

      e = $.Event('hide.bs.modal');
      this.$element.trigger(e);

      if (!this.isShown || e.isDefaultPrevented()) {
        return;
      }

      this.isShown = false;
      this.escape();
      $(document).off('focusin.bs.modal');
      this.$element.removeClass('in').attr('aria-hidden', true).off('click.dismiss.bs.modal');
      $.support.transition && this.$element.hasClass('fade') ? this.$element.one($.support.transition.end, $.proxy(this.hideModal, this)).emulateTransitionEnd(300) : this.hideModal();
    };

    Modal.prototype.enforceFocus = function () {
      $(document).off('focusin.bs.modal') // guard against infinite focus loop
      .on('focusin.bs.modal', $.proxy(function (e) {
        if (this.$element[0] !== e.target && !this.$element.has(e.target).length) {
          this.$element.focus();
        }
      }, this));
    };

    Modal.prototype.escape = function () {
      if (this.isShown && this.options.keyboard) {
        this.$element.on('keyup.dismiss.bs.modal', $.proxy(function (e) {
          e.which === 27 && this.hide();
        }, this));
      } else if (!this.isShown) {
        this.$element.off('keyup.dismiss.bs.modal');
      }
    };

    Modal.prototype.hideModal = function () {
      var that = this;
      this.$element.hide();
      this.backdrop(function () {
        that.removeBackdrop();
        that.$element.trigger('hidden.bs.modal');
      });
    };

    Modal.prototype.removeBackdrop = function () {
      this.$backdrop && this.$backdrop.remove();
      this.$backdrop = null;
    };

    Modal.prototype.backdrop = function (callback) {
      var animate = this.$element.hasClass('fade') ? 'fade' : '';

      if (this.isShown && this.options.backdrop) {
        var doAnimate = $.support.transition && animate;
        this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />').appendTo(document.body);
        this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
          if (e.target !== e.currentTarget) {
            return;
          }

          this.options.backdrop === 'static' ? this.$element[0].focus.call(this.$element[0]) : this.hide.call(this);
        }, this));

        if (doAnimate) {
          this.$backdrop[0].offsetWidth;
        } // force reflow


        this.$backdrop.addClass('in');

        if (!callback) {
          return;
        }

        doAnimate ? this.$backdrop.one($.support.transition.end, callback).emulateTransitionEnd(150) : callback();
      } else if (!this.isShown && this.$backdrop) {
        this.$backdrop.removeClass('in');
        $.support.transition && this.$element.hasClass('fade') ? this.$backdrop.one($.support.transition.end, callback).emulateTransitionEnd(150) : callback();
      } else if (callback) {
        callback();
      }
    }; // MODAL PLUGIN DEFINITION
    // =======================


    var old = $.fn.modal;

    $.fn.modal = function (option, _relatedTarget) {
      return this.each(function () {
        var $this = $(this);
        var data = $this.data('bs.modal');
        var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof_default()(option) === 'object' && option);

        if (!data) {
          $this.data('bs.modal', data = new Modal(this, options));
        }

        if (typeof option === 'string') {
          data[option](_relatedTarget);
        } else if (options.show) {
          data.show(_relatedTarget);
        }
      });
    };

    $.fn.modal.Constructor = Modal; // MODAL NO CONFLICT
    // =================

    $.fn.modal.noConflict = function () {
      $.fn.modal = old;
      return this;
    }; // MODAL DATA-API
    // ==============


    $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
      var $this = $(this);
      var href = $this.attr('href');
      var $target = $($this.attr('data-target') || href && href.replace(/.*(?=#[^\s]+$)/, '')); //strip for ie7

      var option = $target.data('bs.modal') ? 'toggle' : $.extend({
        remote: !/#/.test(href) && href
      }, $target.data(), $this.data());

      if ($this.is('a')) {
        e.preventDefault();
      }

      $target.modal(option, this).one('hide', function () {
        $this.is(':visible') && $this.focus();
      });
    });
    $(document).on('body', '.modal', function () {
      $(document.body).addClass('modal-open');
    }).on('body', '.modal', function () {
      $(document.body).removeClass('modal-open');
    });
  }
});
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/defineProperty.js
var defineProperty = __webpack_require__(3);
var defineProperty_default = /*#__PURE__*/__webpack_require__.n(defineProperty);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/classCallCheck.js
var classCallCheck = __webpack_require__(5);
var classCallCheck_default = /*#__PURE__*/__webpack_require__.n(classCallCheck);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/createClass.js
var createClass = __webpack_require__(6);
var createClass_default = /*#__PURE__*/__webpack_require__.n(createClass);

// EXTERNAL MODULE: ./node_modules/jquery/dist/jquery.js
var jquery = __webpack_require__(0);
var jquery_default = /*#__PURE__*/__webpack_require__.n(jquery);

// CONCATENATED MODULE: ./assets/js/public/util.js
/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.3.1): util.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

/**
 * ------------------------------------------------------------------------
 * Private TransitionEnd Helpers
 * ------------------------------------------------------------------------
 */

var TRANSITION_END = 'transitionend';
var MAX_UID = 1000000;
var MILLISECONDS_MULTIPLIER = 1000; // Shoutout AngusCroll (https://goo.gl/pxwQGp)

function toType(obj) {
  return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
}

function getSpecialTransitionEndEvent() {
  return {
    bindType: TRANSITION_END,
    delegateType: TRANSITION_END,
    handle: function handle(event) {
      if (jquery_default()(event.target).is(this)) {
        return event.handleObj.handler.apply(this, arguments); // eslint-disable-line prefer-rest-params
      }

      return undefined; // eslint-disable-line no-undefined
    }
  };
}

function transitionEndEmulator(duration) {
  var _this = this;

  var called = false;
  jquery_default()(this).one(Util.TRANSITION_END, function () {
    called = true;
  });
  setTimeout(function () {
    if (!called) {
      Util.triggerTransitionEnd(_this);
    }
  }, duration);
  return this;
}

function setTransitionEndSupport() {
  jquery_default.a.fn.emulateTransitionEnd = transitionEndEmulator;
  jquery_default.a.event.special[Util.TRANSITION_END] = getSpecialTransitionEndEvent();
}
/**
 * --------------------------------------------------------------------------
 * Public Util Api
 * --------------------------------------------------------------------------
 */


var Util = {
  TRANSITION_END: 'bsTransitionEnd',
  getUID: function getUID(prefix) {
    do {
      // eslint-disable-next-line no-bitwise
      prefix += ~~(Math.random() * MAX_UID); // "~~" acts like a faster Math.floor() here
    } while (document.getElementById(prefix));

    return prefix;
  },
  getSelectorFromElement: function getSelectorFromElement(element) {
    var selector = element.getAttribute('data-target');

    if (!selector || selector === '#') {
      var hrefAttr = element.getAttribute('href');
      selector = hrefAttr && hrefAttr !== '#' ? hrefAttr.trim() : '';
    }

    try {
      return document.querySelector(selector) ? selector : null;
    } catch (err) {
      return null;
    }
  },
  getTransitionDurationFromElement: function getTransitionDurationFromElement(element) {
    if (!element) {
      return 0;
    } // Get transition-duration of the element


    var transitionDuration = jquery_default()(element).css('transition-duration');
    var transitionDelay = jquery_default()(element).css('transition-delay');
    var floatTransitionDuration = parseFloat(transitionDuration);
    var floatTransitionDelay = parseFloat(transitionDelay); // Return 0 if element or transition duration is not found

    if (!floatTransitionDuration && !floatTransitionDelay) {
      return 0;
    } // If multiple durations are defined, take the first


    transitionDuration = transitionDuration.split(',')[0];
    transitionDelay = transitionDelay.split(',')[0];
    return (parseFloat(transitionDuration) + parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
  },
  reflow: function reflow(element) {
    return element.offsetHeight;
  },
  triggerTransitionEnd: function triggerTransitionEnd(element) {
    jquery_default()(element).trigger(TRANSITION_END);
  },
  // TODO: Remove in v5
  supportsTransitionEnd: function supportsTransitionEnd() {
    return Boolean(TRANSITION_END);
  },
  isElement: function isElement(obj) {
    return (obj[0] || obj).nodeType;
  },
  typeCheckConfig: function typeCheckConfig(componentName, config, configTypes) {
    for (var property in configTypes) {
      if (Object.prototype.hasOwnProperty.call(configTypes, property)) {
        var expectedTypes = configTypes[property];
        var value = config[property];
        var valueType = value && Util.isElement(value) ? 'element' : toType(value);

        if (!new RegExp(expectedTypes).test(valueType)) {
          throw new Error("".concat(componentName.toUpperCase(), ": ") + "Option \"".concat(property, "\" provided type \"").concat(valueType, "\" ") + "but expected type \"".concat(expectedTypes, "\"."));
        }
      }
    }
  },
  findShadowRoot: function findShadowRoot(element) {
    if (!document.documentElement.attachShadow) {
      return null;
    } // Can find the shadow root otherwise it'll return the document


    if (typeof element.getRootNode === 'function') {
      var root = element.getRootNode();
      return root instanceof ShadowRoot ? root : null;
    }

    if (element instanceof ShadowRoot) {
      return element;
    } // when we don't find a shadow root


    if (!element.parentNode) {
      return null;
    }

    return Util.findShadowRoot(element.parentNode);
  }
};
setTransitionEndSupport();
/* harmony default export */ var util = (Util);
// CONCATENATED MODULE: ./assets/js/public/dr-modal.js





function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { defineProperty_default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.3.1): modal.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */


/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

var NAME = 'drModal';
var VERSION = '4.3.1';
var DATA_KEY = 'dr.bs.modal';
var EVENT_KEY = ".".concat(DATA_KEY);
var DATA_API_KEY = '.data-api';
var JQUERY_NO_CONFLICT = jquery_default.a.fn[NAME];
var ESCAPE_KEYCODE = 27; // KeyboardEvent.which value for Escape (Esc) key

var Default = {
  backdrop: true,
  keyboard: true,
  focus: true,
  show: true
};
var DefaultType = {
  backdrop: '(boolean|string)',
  keyboard: 'boolean',
  focus: 'boolean',
  show: 'boolean'
};
var Event = {
  HIDE: "hide".concat(EVENT_KEY),
  HIDDEN: "hidden".concat(EVENT_KEY),
  SHOW: "show".concat(EVENT_KEY),
  SHOWN: "shown".concat(EVENT_KEY),
  FOCUSIN: "focusin".concat(EVENT_KEY),
  RESIZE: "resize".concat(EVENT_KEY),
  CLICK_DISMISS: "click.dismiss".concat(EVENT_KEY),
  KEYDOWN_DISMISS: "keydown.dismiss".concat(EVENT_KEY),
  MOUSEUP_DISMISS: "mouseup.dismiss".concat(EVENT_KEY),
  MOUSEDOWN_DISMISS: "mousedown.dismiss".concat(EVENT_KEY),
  CLICK_DATA_API: "click".concat(EVENT_KEY).concat(DATA_API_KEY)
};
var ClassName = {
  SCROLLABLE: 'dr-modal-dialog-scrollable',
  SCROLLBAR_MEASURER: 'dr-modal-scrollbar-measure',
  BACKDROP: 'dr-modal-backdrop',
  OPEN: 'dr-modal-open',
  FADE: 'fade',
  SHOW: 'show'
};
var Selector = {
  DIALOG: '.dr-modal-dialog',
  MODAL_BODY: '.dr-modal-body',
  DATA_TOGGLE: '[data-toggle="dr-modal"]',
  DATA_DISMISS: '[data-dismiss="dr-modal"]',
  FIXED_CONTENT: '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top',
  STICKY_CONTENT: '.sticky-top'
};
/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

var dr_modal_Modal =
/*#__PURE__*/
function () {
  function Modal(element, config) {
    classCallCheck_default()(this, Modal);

    this._config = this._getConfig(config);
    this._element = element;
    this._dialog = element.querySelector(Selector.DIALOG);
    this._backdrop = null;
    this._isShown = false;
    this._isBodyOverflowing = false;
    this._ignoreBackdropClick = false;
    this._isTransitioning = false;
    this._scrollbarWidth = 0;
  } // Getters


  createClass_default()(Modal, [{
    key: "toggle",
    // Public
    value: function toggle(relatedTarget) {
      return this._isShown ? this.hide() : this.show(relatedTarget);
    }
  }, {
    key: "show",
    value: function show(relatedTarget) {
      var _this = this;

      if (this._isShown || this._isTransitioning) {
        return;
      }

      if (jquery_default()(this._element).hasClass(ClassName.FADE)) {
        this._isTransitioning = true;
      }

      var showEvent = jquery_default.a.Event(Event.SHOW, {
        relatedTarget: relatedTarget
      });
      jquery_default()(this._element).trigger(showEvent);

      if (this._isShown || showEvent.isDefaultPrevented()) {
        return;
      }

      this._isShown = true;

      this._checkScrollbar();

      this._setScrollbar();

      this._adjustDialog();

      this._setEscapeEvent();

      this._setResizeEvent();

      jquery_default()(this._element).on(Event.CLICK_DISMISS, Selector.DATA_DISMISS, function (event) {
        return _this.hide(event);
      });
      jquery_default()(this._dialog).on(Event.MOUSEDOWN_DISMISS, function () {
        jquery_default()(_this._element).one(Event.MOUSEUP_DISMISS, function (event) {
          if (jquery_default()(event.target).is(_this._element)) {
            _this._ignoreBackdropClick = true;
          }
        });
      });

      this._showBackdrop(function () {
        return _this._showElement(relatedTarget);
      });
    }
  }, {
    key: "hide",
    value: function hide(event) {
      var _this2 = this;

      if (event) {
        event.preventDefault();
      }

      if (!this._isShown || this._isTransitioning) {
        return;
      }

      var hideEvent = jquery_default.a.Event(Event.HIDE);
      jquery_default()(this._element).trigger(hideEvent);

      if (!this._isShown || hideEvent.isDefaultPrevented()) {
        return;
      }

      this._isShown = false;
      var transition = jquery_default()(this._element).hasClass(ClassName.FADE);

      if (transition) {
        this._isTransitioning = true;
      }

      this._setEscapeEvent();

      this._setResizeEvent();

      jquery_default()(document).off(Event.FOCUSIN);
      jquery_default()(this._element).removeClass(ClassName.SHOW);
      jquery_default()(this._element).off(Event.CLICK_DISMISS);
      jquery_default()(this._dialog).off(Event.MOUSEDOWN_DISMISS);

      if (transition) {
        var transitionDuration = util.getTransitionDurationFromElement(this._element);
        jquery_default()(this._element).one(util.TRANSITION_END, function (event) {
          return _this2._hideModal(event);
        }).emulateTransitionEnd(transitionDuration);
      } else {
        this._hideModal();
      }
    }
  }, {
    key: "dispose",
    value: function dispose() {
      [window, this._element, this._dialog].forEach(function (htmlElement) {
        return jquery_default()(htmlElement).off(EVENT_KEY);
      });
      /**
       * `document` has 2 events `Event.FOCUSIN` and `Event.CLICK_DATA_API`
       * Do not move `document` in `htmlElements` array
       * It will remove `Event.CLICK_DATA_API` event that should remain
       */

      jquery_default()(document).off(Event.FOCUSIN);
      jquery_default.a.removeData(this._element, DATA_KEY);
      this._config = null;
      this._element = null;
      this._dialog = null;
      this._backdrop = null;
      this._isShown = null;
      this._isBodyOverflowing = null;
      this._ignoreBackdropClick = null;
      this._isTransitioning = null;
      this._scrollbarWidth = null;
    }
  }, {
    key: "handleUpdate",
    value: function handleUpdate() {
      this._adjustDialog();
    } // Private

  }, {
    key: "_getConfig",
    value: function _getConfig(config) {
      config = _objectSpread({}, Default, {}, config);
      util.typeCheckConfig(NAME, config, DefaultType);
      return config;
    }
  }, {
    key: "_showElement",
    value: function _showElement(relatedTarget) {
      var _this3 = this;

      var transition = jquery_default()(this._element).hasClass(ClassName.FADE);

      if (!this._element.parentNode || this._element.parentNode.nodeType !== Node.ELEMENT_NODE) {
        // Don't move modal's DOM position
        document.body.appendChild(this._element);
      }

      this._element.style.display = 'block';

      this._element.removeAttribute('aria-hidden');

      this._element.setAttribute('aria-modal', true);

      if (jquery_default()(this._dialog).hasClass(ClassName.SCROLLABLE)) {
        this._dialog.querySelector(Selector.MODAL_BODY).scrollTop = 0;
      } else {
        this._element.scrollTop = 0;
      }

      if (transition) {
        util.reflow(this._element);
      }

      jquery_default()(this._element).addClass(ClassName.SHOW);

      if (this._config.focus) {
        this._enforceFocus();
      }

      var shownEvent = jquery_default.a.Event(Event.SHOWN, {
        relatedTarget: relatedTarget
      });

      var transitionComplete = function transitionComplete() {
        if (_this3._config.focus) {
          _this3._element.focus();
        }

        _this3._isTransitioning = false;
        jquery_default()(_this3._element).trigger(shownEvent);
      };

      if (transition) {
        var transitionDuration = util.getTransitionDurationFromElement(this._dialog);
        jquery_default()(this._dialog).one(util.TRANSITION_END, transitionComplete).emulateTransitionEnd(transitionDuration);
      } else {
        transitionComplete();
      }
    }
  }, {
    key: "_enforceFocus",
    value: function _enforceFocus() {
      var _this4 = this;

      jquery_default()(document).off(Event.FOCUSIN) // Guard against infinite focus loop
      .on(Event.FOCUSIN, function (event) {
        if (document !== event.target && _this4._element !== event.target && jquery_default()(_this4._element).has(event.target).length === 0) {
          _this4._element.focus();
        }
      });
    }
  }, {
    key: "_setEscapeEvent",
    value: function _setEscapeEvent() {
      var _this5 = this;

      if (this._isShown && this._config.keyboard) {
        jquery_default()(this._element).on(Event.KEYDOWN_DISMISS, function (event) {
          if (event.which === ESCAPE_KEYCODE) {
            event.preventDefault();

            _this5.hide();
          }
        });
      } else if (!this._isShown) {
        jquery_default()(this._element).off(Event.KEYDOWN_DISMISS);
      }
    }
  }, {
    key: "_setResizeEvent",
    value: function _setResizeEvent() {
      var _this6 = this;

      if (this._isShown) {
        jquery_default()(window).on(Event.RESIZE, function (event) {
          return _this6.handleUpdate(event);
        });
      } else {
        jquery_default()(window).off(Event.RESIZE);
      }
    }
  }, {
    key: "_hideModal",
    value: function _hideModal() {
      var _this7 = this;

      this._element.style.display = 'none';

      this._element.setAttribute('aria-hidden', true);

      this._element.removeAttribute('aria-modal');

      this._isTransitioning = false;

      this._showBackdrop(function () {
        jquery_default()(document.body).removeClass(ClassName.OPEN);

        _this7._resetAdjustments();

        _this7._resetScrollbar();

        jquery_default()(_this7._element).trigger(Event.HIDDEN);
      });
    }
  }, {
    key: "_removeBackdrop",
    value: function _removeBackdrop() {
      if (this._backdrop) {
        jquery_default()(this._backdrop).remove();
        this._backdrop = null;
      }
    }
  }, {
    key: "_showBackdrop",
    value: function _showBackdrop(callback) {
      var _this8 = this;

      var animate = jquery_default()(this._element).hasClass(ClassName.FADE) ? ClassName.FADE : '';

      if (this._isShown && this._config.backdrop) {
        this._backdrop = document.createElement('div');
        this._backdrop.className = ClassName.BACKDROP;

        if (animate) {
          this._backdrop.classList.add(animate);
        }

        jquery_default()(this._backdrop).appendTo(document.body);
        jquery_default()(this._element).on(Event.CLICK_DISMISS, function (event) {
          if (_this8._ignoreBackdropClick) {
            _this8._ignoreBackdropClick = false;
            return;
          }

          if (event.target !== event.currentTarget) {
            return;
          }

          if (_this8._config.backdrop === 'static') {
            _this8._element.focus();
          } else {
            _this8.hide();
          }
        });

        if (animate) {
          util.reflow(this._backdrop);
        }

        jquery_default()(this._backdrop).addClass(ClassName.SHOW);

        if (!callback) {
          return;
        }

        if (!animate) {
          callback();
          return;
        }

        var backdropTransitionDuration = util.getTransitionDurationFromElement(this._backdrop);
        jquery_default()(this._backdrop).one(util.TRANSITION_END, callback).emulateTransitionEnd(backdropTransitionDuration);
      } else if (!this._isShown && this._backdrop) {
        jquery_default()(this._backdrop).removeClass(ClassName.SHOW);

        var callbackRemove = function callbackRemove() {
          _this8._removeBackdrop();

          if (callback) {
            callback();
          }
        };

        if (jquery_default()(this._element).hasClass(ClassName.FADE)) {
          var _backdropTransitionDuration = util.getTransitionDurationFromElement(this._backdrop);

          jquery_default()(this._backdrop).one(util.TRANSITION_END, callbackRemove).emulateTransitionEnd(_backdropTransitionDuration);
        } else {
          callbackRemove();
        }
      } else if (callback) {
        callback();
      }
    } // ----------------------------------------------------------------------
    // the following methods are used to handle overflowing modals
    // todo (fat): these should probably be refactored out of modal.js
    // ----------------------------------------------------------------------

  }, {
    key: "_adjustDialog",
    value: function _adjustDialog() {
      var isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;

      if (!this._isBodyOverflowing && isModalOverflowing) {
        this._element.style.paddingLeft = "".concat(this._scrollbarWidth, "px");
      }

      if (this._isBodyOverflowing && !isModalOverflowing) {
        this._element.style.paddingRight = "".concat(this._scrollbarWidth, "px");
      }
    }
  }, {
    key: "_resetAdjustments",
    value: function _resetAdjustments() {
      this._element.style.paddingLeft = '';
      this._element.style.paddingRight = '';
    }
  }, {
    key: "_checkScrollbar",
    value: function _checkScrollbar() {
      var rect = document.body.getBoundingClientRect();
      this._isBodyOverflowing = rect.left + rect.right < window.innerWidth;
      this._scrollbarWidth = this._getScrollbarWidth();
    }
  }, {
    key: "_setScrollbar",
    value: function _setScrollbar() {
      var _this9 = this;

      if (this._isBodyOverflowing) {
        // Note: DOMNode.style.paddingRight returns the actual value or '' if not set
        //   while $(DOMNode).css('padding-right') returns the calculated value or 0 if not set
        var fixedContent = [].slice.call(document.querySelectorAll(Selector.FIXED_CONTENT));
        var stickyContent = [].slice.call(document.querySelectorAll(Selector.STICKY_CONTENT)); // Adjust fixed content padding

        jquery_default()(fixedContent).each(function (index, element) {
          var actualPadding = element.style.paddingRight;
          var calculatedPadding = jquery_default()(element).css('padding-right');
          jquery_default()(element).data('padding-right', actualPadding).css('padding-right', "".concat(parseFloat(calculatedPadding) + _this9._scrollbarWidth, "px"));
        }); // Adjust sticky content margin

        jquery_default()(stickyContent).each(function (index, element) {
          var actualMargin = element.style.marginRight;
          var calculatedMargin = jquery_default()(element).css('margin-right');
          jquery_default()(element).data('margin-right', actualMargin).css('margin-right', "".concat(parseFloat(calculatedMargin) - _this9._scrollbarWidth, "px"));
        }); // Adjust body padding

        var actualPadding = document.body.style.paddingRight;
        var calculatedPadding = jquery_default()(document.body).css('padding-right');
        jquery_default()(document.body).data('padding-right', actualPadding).css('padding-right', "".concat(parseFloat(calculatedPadding) + this._scrollbarWidth, "px"));
      }

      jquery_default()(document.body).addClass(ClassName.OPEN);
    }
  }, {
    key: "_resetScrollbar",
    value: function _resetScrollbar() {
      // Restore fixed content padding
      var fixedContent = [].slice.call(document.querySelectorAll(Selector.FIXED_CONTENT));
      jquery_default()(fixedContent).each(function (index, element) {
        var padding = jquery_default()(element).data('padding-right');
        jquery_default()(element).removeData('padding-right');
        element.style.paddingRight = padding ? padding : '';
      }); // Restore sticky content

      var elements = [].slice.call(document.querySelectorAll("".concat(Selector.STICKY_CONTENT)));
      jquery_default()(elements).each(function (index, element) {
        var margin = jquery_default()(element).data('margin-right');

        if (typeof margin !== 'undefined') {
          jquery_default()(element).css('margin-right', margin).removeData('margin-right');
        }
      }); // Restore body padding

      var padding = jquery_default()(document.body).data('padding-right');
      jquery_default()(document.body).removeData('padding-right');
      document.body.style.paddingRight = padding ? padding : '';
    }
  }, {
    key: "_getScrollbarWidth",
    value: function _getScrollbarWidth() {
      // thx d.walsh
      var scrollDiv = document.createElement('div');
      scrollDiv.className = ClassName.SCROLLBAR_MEASURER;
      document.body.appendChild(scrollDiv);
      var scrollbarWidth = scrollDiv.getBoundingClientRect().width - scrollDiv.clientWidth;
      document.body.removeChild(scrollDiv);
      return scrollbarWidth;
    } // Static

  }], [{
    key: "_jQueryInterface",
    value: function _jQueryInterface(config, relatedTarget) {
      return this.each(function () {
        var data = jquery_default()(this).data(DATA_KEY);

        var _config = _objectSpread({}, Default, {}, jquery_default()(this).data(), {}, typeof_default()(config) === 'object' && config ? config : {});

        if (!data) {
          data = new Modal(this, _config);
          jquery_default()(this).data(DATA_KEY, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"".concat(config, "\""));
          }

          data[config](relatedTarget);
        } else if (_config.show) {
          data.show(relatedTarget);
        }
      });
    }
  }, {
    key: "VERSION",
    get: function get() {
      return VERSION;
    }
  }, {
    key: "Default",
    get: function get() {
      return Default;
    }
  }]);

  return Modal;
}();
/**
 * ------------------------------------------------------------------------
 * Data Api implementation
 * ------------------------------------------------------------------------
 */


jquery_default()(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
  var _this10 = this;

  var target;
  var selector = util.getSelectorFromElement(this);

  if (selector) {
    target = document.querySelector(selector);
  }

  var config = jquery_default()(target).data(DATA_KEY) ? 'toggle' : _objectSpread({}, jquery_default()(target).data(), {}, jquery_default()(this).data());

  if (this.tagName === 'A' || this.tagName === 'AREA') {
    event.preventDefault();
  }

  var $target = jquery_default()(target).one(Event.SHOW, function (showEvent) {
    if (showEvent.isDefaultPrevented()) {
      // Only register focus restorer if modal will actually get shown
      return;
    }

    $target.one(Event.HIDDEN, function () {
      if (jquery_default()(_this10).is(':visible')) {
        _this10.focus();
      }
    });
  });

  dr_modal_Modal._jQueryInterface.call(jquery_default()(target), config, this);
});
/**
 * ------------------------------------------------------------------------
 * jQuery
 * ------------------------------------------------------------------------
 */

jquery_default.a.fn[NAME] = dr_modal_Modal._jQueryInterface;
jquery_default.a.fn[NAME].Constructor = dr_modal_Modal;

jquery_default.a.fn[NAME].noConflict = function () {
  jquery_default.a.fn[NAME] = JQUERY_NO_CONFLICT;
  return dr_modal_Modal._jQueryInterface;
};

/* harmony default export */ var dr_modal = (dr_modal_Modal);
// CONCATENATED MODULE: ./assets/js/public/dr-tab.js



/** 
 * --------------------------------------------------------------------------
 * Bootstrap (v4.3.1): tab.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */


/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

var dr_tab_NAME = 'drTab';
var dr_tab_VERSION = '4.3.1';
var dr_tab_DATA_KEY = 'dr.bs.tab';
var dr_tab_EVENT_KEY = ".".concat(dr_tab_DATA_KEY);
var dr_tab_DATA_API_KEY = '.data-api';
var dr_tab_JQUERY_NO_CONFLICT = jquery_default.a.fn[dr_tab_NAME];
var dr_tab_Event = {
  HIDE: "hide".concat(dr_tab_EVENT_KEY),
  HIDDEN: "hidden".concat(dr_tab_EVENT_KEY),
  SHOW: "show".concat(dr_tab_EVENT_KEY),
  SHOWN: "shown".concat(dr_tab_EVENT_KEY),
  CLICK_DATA_API: "click".concat(dr_tab_EVENT_KEY).concat(dr_tab_DATA_API_KEY)
};
var dr_tab_ClassName = {
  DROPDOWN_MENU: 'dr-dropdown-menu',
  ACTIVE: 'active',
  DISABLED: 'disabled',
  FADE: 'fade',
  SHOW: 'show'
};
var dr_tab_Selector = {
  DROPDOWN: '.dr-dropdown',
  NAV_LIST_GROUP: '.dr-nav, .dr-list-group',
  ACTIVE: '.active',
  ACTIVE_UL: '> li > .active',
  DATA_TOGGLE: '[data-toggle="dr-tab"], [data-toggle="dr-pill"], [data-toggle="dr-list"]',
  DROPDOWN_TOGGLE: '.dr-dropdown-toggle',
  DROPDOWN_ACTIVE_CHILD: '> .dr-dropdown-menu .active'
};
/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

var dr_tab_Tab =
/*#__PURE__*/
function () {
  function Tab(element) {
    classCallCheck_default()(this, Tab);

    this._element = element;
  } // Getters


  createClass_default()(Tab, [{
    key: "show",
    // Public
    value: function show() {
      var _this = this;

      if (this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && jquery_default()(this._element).hasClass(dr_tab_ClassName.ACTIVE) || jquery_default()(this._element).hasClass(dr_tab_ClassName.DISABLED)) {
        return;
      }

      var target;
      var previous;
      var listElement = jquery_default()(this._element).closest(dr_tab_Selector.NAV_LIST_GROUP)[0];
      var selector = util.getSelectorFromElement(this._element);

      if (listElement) {
        var itemSelector = listElement.nodeName === 'UL' || listElement.nodeName === 'OL' ? dr_tab_Selector.ACTIVE_UL : dr_tab_Selector.ACTIVE;
        previous = jquery_default.a.makeArray(jquery_default()(listElement).find(itemSelector));
        previous = previous[previous.length - 1];
      }

      var hideEvent = jquery_default.a.Event(dr_tab_Event.HIDE, {
        relatedTarget: this._element
      });
      var showEvent = jquery_default.a.Event(dr_tab_Event.SHOW, {
        relatedTarget: previous
      });

      if (previous) {
        jquery_default()(previous).trigger(hideEvent);
      }

      jquery_default()(this._element).trigger(showEvent);

      if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) {
        return;
      }

      if (selector) {
        target = document.querySelector(selector);
      }

      this._activate(this._element, listElement);

      var complete = function complete() {
        var hiddenEvent = jquery_default.a.Event(dr_tab_Event.HIDDEN, {
          relatedTarget: _this._element
        });
        var shownEvent = jquery_default.a.Event(dr_tab_Event.SHOWN, {
          relatedTarget: previous
        });
        jquery_default()(previous).trigger(hiddenEvent);
        jquery_default()(_this._element).trigger(shownEvent);
      };

      if (target) {
        this._activate(target, target.parentNode, complete);
      } else {
        complete();
      }
    }
  }, {
    key: "dispose",
    value: function dispose() {
      jquery_default.a.removeData(this._element, dr_tab_DATA_KEY);
      this._element = null;
    } // Private

  }, {
    key: "_activate",
    value: function _activate(element, container, callback) {
      var _this2 = this;

      var activeElements = container && (container.nodeName === 'UL' || container.nodeName === 'OL') ? jquery_default()(container).find(dr_tab_Selector.ACTIVE_UL) : jquery_default()(container).children(dr_tab_Selector.ACTIVE);
      var active = activeElements[0];
      var isTransitioning = callback && active && jquery_default()(active).hasClass(dr_tab_ClassName.FADE);

      var complete = function complete() {
        return _this2._transitionComplete(element, active, callback);
      };

      if (active && isTransitioning) {
        var transitionDuration = util.getTransitionDurationFromElement(active);
        jquery_default()(active).removeClass(dr_tab_ClassName.SHOW).one(util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
      } else {
        complete();
      }
    }
  }, {
    key: "_transitionComplete",
    value: function _transitionComplete(element, active, callback) {
      if (active) {
        jquery_default()(active).removeClass(dr_tab_ClassName.ACTIVE);
        var dropdownChild = jquery_default()(active.parentNode).find(dr_tab_Selector.DROPDOWN_ACTIVE_CHILD)[0];

        if (dropdownChild) {
          jquery_default()(dropdownChild).removeClass(dr_tab_ClassName.ACTIVE);
        }

        if (active.getAttribute('role') === 'tab') {
          active.setAttribute('aria-selected', false);
        }
      }

      jquery_default()(element).addClass(dr_tab_ClassName.ACTIVE);

      if (element.getAttribute('role') === 'tab') {
        element.setAttribute('aria-selected', true);
      }

      util.reflow(element);

      if (element.classList.contains(dr_tab_ClassName.FADE)) {
        element.classList.add(dr_tab_ClassName.SHOW);
      }

      if (element.parentNode && jquery_default()(element.parentNode).hasClass(dr_tab_ClassName.DROPDOWN_MENU)) {
        var dropdownElement = jquery_default()(element).closest(dr_tab_Selector.DROPDOWN)[0];

        if (dropdownElement) {
          var dropdownToggleList = [].slice.call(dropdownElement.querySelectorAll(dr_tab_Selector.DROPDOWN_TOGGLE));
          jquery_default()(dropdownToggleList).addClass(dr_tab_ClassName.ACTIVE);
        }

        element.setAttribute('aria-expanded', true);
      }

      if (callback) {
        callback();
      }
    } // Static

  }], [{
    key: "_jQueryInterface",
    value: function _jQueryInterface(config) {
      return this.each(function () {
        var $this = jquery_default()(this);
        var data = $this.data(dr_tab_DATA_KEY);

        if (!data) {
          data = new Tab(this);
          $this.data(dr_tab_DATA_KEY, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"".concat(config, "\""));
          }

          data[config]();
        }
      });
    }
  }, {
    key: "VERSION",
    get: function get() {
      return dr_tab_VERSION;
    }
  }]);

  return Tab;
}();
/**
 * ------------------------------------------------------------------------
 * Data Api implementation
 * ------------------------------------------------------------------------
 */


jquery_default()(document).on(dr_tab_Event.CLICK_DATA_API, dr_tab_Selector.DATA_TOGGLE, function (event) {
  event.preventDefault();

  dr_tab_Tab._jQueryInterface.call(jquery_default()(this), 'show');
});
/**
 * ------------------------------------------------------------------------
 * jQuery
 * ------------------------------------------------------------------------
 */

jquery_default.a.fn[dr_tab_NAME] = dr_tab_Tab._jQueryInterface;
jquery_default.a.fn[dr_tab_NAME].Constructor = dr_tab_Tab;

jquery_default.a.fn[dr_tab_NAME].noConflict = function () {
  jquery_default.a.fn[dr_tab_NAME] = dr_tab_JQUERY_NO_CONFLICT;
  return dr_tab_Tab._jQueryInterface;
};

/* harmony default export */ var dr_tab = (dr_tab_Tab);
// EXTERNAL MODULE: ./assets/js/public/jquery-cookie.js
var jquery_cookie = __webpack_require__(10);

// CONCATENATED MODULE: ./assets/js/public/dr-toast.js
// Reference: https://www.w3schools.com/howto/howto_js_snackbar.asp
var dr_toast_drToast = function ($) {
  return {
    displayMessage: function displayMessage(msg) {
      var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      var offsetLeft = 0;
      var $toast = $("<div class=\"dr-toast\">".concat(msg, "</div>"));
      $('body').append($toast);
      offsetLeft = ($('body').width() - $toast.innerWidth()) / 2;
      $toast.css('left', offsetLeft).addClass("show ".concat(type));
      setTimeout(function () {
        $toast.removeClass('show').remove();
      }, 8000);
    }
  };
}(jQuery);

/* harmony default export */ var dr_toast = (dr_toast_drToast);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/regenerator/index.js
var regenerator = __webpack_require__(1);
var regenerator_default = /*#__PURE__*/__webpack_require__.n(regenerator);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/asyncToGenerator.js
var asyncToGenerator = __webpack_require__(2);
var asyncToGenerator_default = /*#__PURE__*/__webpack_require__.n(asyncToGenerator);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/slicedToArray.js
var slicedToArray = __webpack_require__(8);
var slicedToArray_default = /*#__PURE__*/__webpack_require__.n(slicedToArray);

// CONCATENATED MODULE: ./assets/js/public/checkout-utils.js


var CheckoutUtils = function ($, params) {
  var localizedText = drgc_params.translations;

  var updateDeliverySection = function updateDeliverySection(shippingOption) {
    var $selectedOption = $('form#checkout-delivery-form').children().find('input:radio[data-id="' + shippingOption.id + '"]');
    var resultText = "".concat(shippingOption.label, " ").concat(shippingOption.amount === 0 ? params.translations.free_label : $selectedOption.attr('data-cost'));
    $selectedOption.prop('checked', true);
    $('.dr-checkout__delivery').find('.dr-panel-result__text').text(resultText);
  };

  var updateAddressSection = function updateAddressSection(addressObj, $target) {
    var addressArr = ["".concat(addressObj.firstName, " ").concat(addressObj.lastName), addressObj.line1, addressObj.city, addressObj.country];
    $target.text(addressArr.join(', '));
  };

  var updateSummaryLabels = function updateSummaryLabels() {
    var isTaxInclusive = drgc_params.isTaxInclusive === 'true';
    var forceExclTax = drgc_params.forceExclTax === 'true';
    var shouldDisplayVat = drgc_params.shouldDisplayVat === 'true';
    var taxSuffixLabel = isTaxInclusive ? forceExclTax ? ' ' + localizedText.excl_vat_label : ' ' + localizedText.incl_vat_label : '';

    if ($('.dr-checkout__payment').hasClass('active') || $('.dr-checkout__confirmation').hasClass('active')) {
      $('.dr-summary__tax .item-label').text(shouldDisplayVat ? localizedText.vat_label : localizedText.tax_label);
      $('.dr-summary__shipping .item-label').text(localizedText.shipping_label + taxSuffixLabel);
      $('.dr-summary__shipping-tax .item-label').text(shouldDisplayVat ? localizedText.shipping_vat_label : localizedText.shipping_tax_label);
    } else {
      $('.dr-summary__tax .item-label').text(shouldDisplayVat ? localizedText.estimated_vat_label : localizedText.estimated_tax_label);
      $('.dr-summary__shipping .item-label').text(localizedText.estimated_shipping_label + taxSuffixLabel);
      $('.dr-summary__shipping-tax .item-label').text(shouldDisplayVat ? localizedText.estimated_shipping_vat_label : localizedText.estimated_shipping_tax_label);
    }
  };

  var updateSummaryPricing = function updateSummaryPricing(order, isTaxInclusive) {
    var lineItems = order.lineItems ? order.lineItems.lineItem : order.products || [];
    var pricing = order.pricing;
    var newPricing = getSeparatedPricing(lineItems, pricing, isTaxInclusive);
    var shippingVal = pricing.shippingAndHandling ? pricing.shippingAndHandling.value : pricing.shipping ? pricing.shipping.value : 0; // cart is using shippingAndHandling, order is using shipping

    if (order.lineItems) {
      lineItems.forEach(function (item) {
        var $item = $('div.dr-summary__products > div[data-line-item-id=' + item.id + ']');
        var $salePrice = $item.find('span.sale-price');
        var $regularPrice = $item.find('span.regular-price');
        $salePrice.text(item.pricing.formattedSalePriceWithQuantity);
        $regularPrice.text(item.pricing.formattedListPriceWithQuantity);
      });
    }

    $('div.dr-summary__shipping > .item-value').text(shippingVal === 0 ? params.translations.free_label : newPricing.formattedShippingAndHandling);
    $('div.dr-summary__tax > .item-value').text(newPricing.formattedProductTax);
    $('div.dr-summary__shipping-tax > .item-value').text(newPricing.formattedShippingTax);
    $('div.dr-summary__subtotal > .subtotal-value').text(newPricing.formattedSubtotal);
    $('div.dr-summary__total > .total-value').text(pricing.formattedOrderTotal);
    $('.dr-summary').removeClass('dr-loading');
  };

  var getEntityCode = function getEntityCode() {
    return drgc_params.order && drgc_params.order.order ? drgc_params.order.order.businessEntityCode : drgc_params.cart && drgc_params.cart.cart ? drgc_params.cart.cart.businessEntityCode : '';
  };

  var getCompliance = function getCompliance(digitalriverjs, entityCode, locale) {
    return entityCode && locale ? digitalriverjs.Compliance.getDetails(entityCode, locale).disclosure : {};
  };

  var applyLegalLinks = function applyLegalLinks(digitalriverjs) {
    var entityCode = getEntityCode();
    var locale = drgc_params.drLocale;
    var complianceData = getCompliance(digitalriverjs, entityCode, locale);

    if (Object.keys(complianceData).length) {
      $('.dr-resellerDisclosure').prop('href', complianceData.resellerDisclosure.url);
      $('.dr-termsOfSale').prop('href', complianceData.termsOfSale.url);
      $('.dr-privacyPolicy').prop('href', complianceData.privacyPolicy.url);
      $('.dr-cookiePolicy').prop('href', complianceData.cookiePolicy.url);
      $('.dr-cancellationRights').prop('href', complianceData.cancellationRights.url);
      $('.dr-legalNotice').prop('href', complianceData.legalNotice.url);
    }
  };

  var displayPreTAndC = function displayPreTAndC() {
    if (drgc_params.googlePayBtnStatus && drgc_params.googlePayBtnStatus === 'LOADING') return;
    if (drgc_params.applePayBtnStatus && drgc_params.applePayBtnStatus === 'LOADING') return;
    $('.dr-preTAndC-wrapper').show();
  };

  var displayAlertMessage = function displayAlertMessage(message) {
    alert('ERROR! ' + message);
  };

  var apiErrorHandler = function apiErrorHandler(jqXHR) {
    $('.dr-loading').removeClass('dr-loading');
    drToast.displayMessage(getAjaxErrorMessage(jqXHR), 'error');
  };

  var resetBodyOpacity = function resetBodyOpacity() {
    $('body').css({
      'pointer-events': 'auto',
      'opacity': 1
    });
  };

  var getPermalink = function getPermalink(productID) {
    return new Promise(function (resolve, reject) {
      $.ajax({
        type: 'POST',
        url: drgc_params.ajaxUrl,
        data: {
          action: 'get_permalink',
          productID: productID
        },
        success: function success(data) {
          resolve(data);
        },
        error: function error(jqXHR) {
          reject(jqXHR);
        }
      });
    });
  };

  var resetFormSubmitButton = function resetFormSubmitButton($form) {
    $form.find('button[type="submit"]').removeClass('sending').blur();
  };

  var getAjaxErrorMessage = function getAjaxErrorMessage(jqXHR) {
    var errMsg = localizedText.undefined_error_msg;

    if (jqXHR && jqXHR.responseJSON && jqXHR.responseJSON.errors) {
      var err = jqXHR.responseJSON.errors.error[0];

      switch (err.code) {
        case 'restricted-bill-to-country':
        case 'restricted-ship-to-country':
          errMsg = localizedText.address_error_msg;
          break;

        case 'cart-fraud-failure':
        case 'order-fraud-failure':
          errMsg = localizedText.unable_place_order_msg;
          break;

        default:
          errMsg = err.description;
      }
    }

    return errMsg;
  };

  var setShippingOption = function setShippingOption(option, freeShipping) {
    var html = "\n      <div class=\"field-radio\">\n        <input type=\"radio\"\n          name=\"selector\"\n          id=\"shipping-option-".concat(option.id, "\"\n          data-cost=\"").concat(option.formattedCost, "\"\n          data-id=\"").concat(option.id, "\"\n          data-desc=\"").concat(option.description, "\"\n          data-free=\"").concat(freeShipping, "\"\n        >\n        <label for=\"shipping-option-").concat(option.id, "\">\n          <span>").concat(option.description, "</span>\n        </label>\n      </div>\n    ");
    $('#checkout-delivery-form .dr-panel-edit__el').append(html);
  };

  var getSupportedCountries = function getSupportedCountries(addressType) {
    var countryCodes = $('#' + addressType + '-field-country > option').map(function (index, element) {
      return element.value;
    }).get();
    countryCodes.shift();
    return countryCodes;
  };

  var isSubsAddedToCart = function isSubsAddedToCart(lineItems) {
    if (!lineItems.length) return false;

    for (var i = 0; i < lineItems.length; i++) {
      var lineItem = lineItems[i];
      var customAttributes = lineItem.product.customAttributes.attribute || [];
      if (customAttributes.some(function (attr) {
        return attr.name === 'subscriptionType';
      })) return true;
    }

    return false;
  };

  var getLocalizedAutoRenewalTerms = function getLocalizedAutoRenewalTerms(digitalriverjs, entityCode, locale) {
    var compliance = getCompliance(digitalriverjs, entityCode, locale);
    return Object.keys(compliance).length ? compliance.autorenewalPlanTerms.localizedText : '';
  };

  var formatPrice = function formatPrice(val, pricing) {
    var localeCode = drgc_params.drLocale.replace('_', '-');
    var currencySymbol = pricing.formattedSubtotal.replace(/\d+/g, '').replace(/[,.]/g, '');
    var symbolAsPrefix = pricing.formattedSubtotal.indexOf(currencySymbol) === 0;
    var formattedPriceWithoutSymbol = pricing.formattedSubtotal.replace(currencySymbol, '');
    var decimalSymbol = 0 .toLocaleString(localeCode, {
      minimumFractionDigits: 1
    })[1];
    var digits = formattedPriceWithoutSymbol.indexOf(decimalSymbol) > -1 ? formattedPriceWithoutSymbol.split(decimalSymbol).pop().length : 0;
    val = val.toLocaleString(localeCode, {
      minimumFractionDigits: digits
    });
    val = symbolAsPrefix ? currencySymbol + val : val + currencySymbol;
    return val;
  };

  var getCorrectSubtotalWithDiscount = function getCorrectSubtotalWithDiscount(pricing) {
    var val = pricing.subtotal.value - pricing.discount.value;
    return formatPrice(val, pricing);
  };

  var getSeparatedPricing = function getSeparatedPricing(lineItems, pricing, isTaxInclusive) {
    var productTax = 0;
    var shippingTax = 0;
    var forceExclTax = drgc_params.forceExclTax === 'true';
    var shippingVal = pricing.shippingAndHandling ? pricing.shippingAndHandling.value : pricing.shipping ? pricing.shipping.value : 0; // cart is using shippingAndHandling, order is using shipping

    lineItems.forEach(function (lineItem) {
      productTax += lineItem.pricing.productTax.value;
      shippingTax += lineItem.pricing.shippingTax.value;
    });
    return {
      formattedProductTax: formatPrice(productTax, pricing),
      formattedShippingTax: formatPrice(shippingTax, pricing),
      formattedSubtotal: isTaxInclusive && forceExclTax ? formatPrice(pricing.subtotal.value - productTax, pricing) : pricing.formattedSubtotal,
      formattedShippingAndHandling: isTaxInclusive && forceExclTax ? formatPrice(shippingVal - shippingTax, pricing) : pricing.formattedShippingAndHandling || pricing.formattedShipping
    };
  };

  var getCountryOptionsFromGC = function getCountryOptionsFromGC(requestShipping) {
    return new Promise(function (resolve, reject) {
      $.ajax({
        type: 'GET',
        url: "https://drh-fonts.img.digitalrivercontent.net/store/".concat(drgc_params.siteID, "/").concat(drgc_params.drLocale, "/DisplayPage/id.SimpleRegistrationPage"),
        cache: false,
        success: function success(response) {
          var addressTypes = requestShipping ? ['shipping', 'billing'] : ['billing'];
          addressTypes.forEach(function (type) {
            var savedCountryCode = $("#".concat(type, "-field-country")).val();
            var $options = $(response).find("select[name=".concat(type.toUpperCase(), "country] option")).not(':first');
            var optionArr = $.map($options, function (option) {
              return option.value;
            });
            $("#".concat(type, "-field-country option")).not(':first').remove();
            $("#".concat(type, "-field-country")).append($options).val(optionArr.indexOf(savedCountryCode) > -1 ? savedCountryCode : '');
          });
          resolve();
        },
        error: function error(jqXHR) {
          reject(jqXHR);
        }
      });
    });
  };

  var getAddress = function getAddress(addressType, isDefault) {
    return {
      address: {
        nickName: $('#' + addressType + '-field-address1').val(),
        isDefault: isDefault,
        firstName: $('#' + addressType + '-field-first-name').val(),
        lastName: $('#' + addressType + '-field-last-name').val(),
        line1: $('#' + addressType + '-field-address1').val(),
        line2: $('#' + addressType + '-field-address2').val(),
        city: $('#' + addressType + '-field-city').val(),
        countrySubdivision: $('#' + addressType + '-field-state').val(),
        postalCode: $('#' + addressType + '-field-zip').val(),
        countryName: $('#' + addressType + '-field-country :selected').text(),
        country: $('#' + addressType + '-field-country :selected').val(),
        phoneNumber: $('#' + addressType + '-field-phone').val()
      }
    };
  };

  var getDropinBillingAddress = function getDropinBillingAddress(addressPayload) {
    return {
      firstName: addressPayload.billing.firstName,
      lastName: addressPayload.billing.lastName,
      email: addressPayload.billing.emailAddress,
      phoneNumber: addressPayload.billing.phoneNumber,
      address: {
        line1: addressPayload.billing.line1,
        line2: addressPayload.billing.line2,
        city: addressPayload.billing.city,
        state: addressPayload.billing.countrySubdivision,
        postalCode: addressPayload.billing.postalCode,
        country: addressPayload.billing.country
      }
    };
  };

  var getTaxSchema = function getTaxSchema(address) {
    var data = {
      action: 'drgc_get_tax_schema',
      nonce: drgc_params.ajaxNonce,
      address: address
    };
    return new Promise(function (resolve, reject) {
      $.post(drgc_params.ajaxUrl, data, function (response) {
        if (!response.success) {
          var error = '';

          if (response.data && response.data.errors && response.data.errors[0].hasOwnProperty('message')) {
            error = response.data.errors[0].message;
          } else if (Object.prototype.toString.call(response.data) === '[object String]') {
            error = response.data;
          } else {
            error = localizedText.undefined_error_msg;
          }

          reject(error);
        } else {
          $('.shopper-type-radio, .tax-id-field').remove();
          var taxSchema = response.data;

          for (var _i = 0, _Object$entries = Object.entries(taxSchema); _i < _Object$entries.length; _i++) {
            var _Object$entries$_i = slicedToArray_default()(_Object$entries[_i], 2),
                key = _Object$entries$_i[0],
                value = _Object$entries$_i[1];

            createTaxIdElement(key, value);
          }

          $('.shopper-type-radio').appendTo('.tax-id-shopper-type');
          $('input[name="shopper-type"]:first').prop('checked', true).trigger('click');
          resolve(taxSchema);
        }
      });
    });
  };

  var validateVatNumber = function validateVatNumber(e) {
    var elem = e.target;
    var value = elem.value;
    var pattern = elem.dataset.pattern;
    if (pattern.indexOf('$,') > 0) pattern = pattern.split('$,').join('$|');
    var re = new RegExp(pattern);
    var customErrorMsg = re.test(value) || value.trim() === '' ? '' : 'Invalid ' + elem.dataset.title;
    elem.setCustomValidity(customErrorMsg);

    if (elem.validity.customError) {
      $(elem).nextAll('.invalid-feedback').text(elem.validationMessage);
    } else {
      $(elem).nextAll('.invalid-feedback').text('');
    }

    $('#checkout-tax-id-form').addClass('was-validated');
  };

  var createTaxIdElement = function createTaxIdElement(shopperType, taxRegs) {
    var typeText = shopperType === 'Individual' ? localizedText.personal_shopper_type : localizedText.business_shopper_type;
    var radiosHtml = "\n      <div class=\"form-check form-check-inline shopper-type-radio\">      \n        <input class=\"form-check-input\" type=\"radio\" name=\"shopper-type\" id=\"shopper-type-".concat(shopperType, "\" value=\"").concat(taxRegs.customerType, "\">\n        <label class=\"form-check-label\" for=\"shopper-type-").concat(shopperType, "\">").concat(typeText, "</label>\n      </div>\n    ");
    var fieldsHtml = '';

    if (taxRegs.taxRegistrations.length) {
      var taxFields = taxRegs.taxRegistrations;
      taxFields.forEach(function (element) {
        var key = Object.keys(element)[0];
        var taxReg = element[key];
        fieldsHtml = "\n          ".concat(fieldsHtml, "\n          <div class=\"form-group dr-panel-edit__el tax-id-field ").concat(shopperType, "\">\n            <div class=\"float-container float-container--").concat(key, "\">\n              <label for=\"tax-id-field-").concat(key, "\" class=\"float-label\">").concat(taxReg.title, "</label>\n              <input id=\"tax-id-field-").concat(key, "\" type=\"text\" name=\"tax-id-").concat(key, "\" value=\"\" class=\"form-control float-field float-field--").concat(key, "\" data-key=\"").concat(key, "\" data-title=\"").concat(taxReg.title, "\" data-description=\"").concat(taxReg.description, "\" data-pattern=\"").concat(taxReg.pattern, "\">\n              <span class=\"tax-id-field-info\">*").concat(taxReg.description, "</span>\n              <div class=\"invalid-feedback\"></div>\n            </div>\n          </div>\n        ");
      });
    }

    $('#checkout-tax-id-form > button[type="submit"]').before("".concat(radiosHtml).concat(fieldsHtml));
  };

  var applyTaxRegistration = function applyTaxRegistration(customerType, taxRegs) {
    var data = {
      action: 'drgc_apply_tax_registration',
      nonce: drgc_params.ajaxNonce,
      customerType: customerType,
      taxRegs: taxRegs
    };
    return new Promise(function (resolve, reject) {
      $.post(drgc_params.ajaxUrl, data, function (response) {
        if (!response.success) {
          var error = '';

          if (response.data && response.data.errors && response.data.errors[0].hasOwnProperty('message')) {
            error = response.data.errors[0].message;
          } else if (Object.prototype.toString.call(response.data) === '[object String]') {
            error = response.data;
          } else {
            error = localizedText.undefined_error_msg;
          }

          reject(error);
        } else {
          resolve(response.data);
        }
      });
    });
  };

  var getTaxRegistration = function getTaxRegistration() {
    var data = {
      action: 'drgc_get_tax_registration',
      nonce: drgc_params.ajaxNonce
    };
    return new Promise(function (resolve, reject) {
      $.post(drgc_params.ajaxUrl, data, function (response) {
        if (!response.success) {
          var error = '';

          if (response.data && response.data.errors && response.data.errors[0].hasOwnProperty('message')) {
            error = response.data.errors[0].message;
          } else if (Object.prototype.toString.call(response.data) === '[object String]') {
            error = response.data;
          } else {
            error = localizedText.undefined_error_msg;
          }

          reject(error);
        } else {
          resolve(response.data);
        }
      });
    });
  };

  return {
    updateDeliverySection: updateDeliverySection,
    updateAddressSection: updateAddressSection,
    updateSummaryLabels: updateSummaryLabels,
    updateSummaryPricing: updateSummaryPricing,
    applyLegalLinks: applyLegalLinks,
    displayPreTAndC: displayPreTAndC,
    displayAlertMessage: displayAlertMessage,
    apiErrorHandler: apiErrorHandler,
    resetBodyOpacity: resetBodyOpacity,
    getPermalink: getPermalink,
    getEntityCode: getEntityCode,
    getCompliance: getCompliance,
    resetFormSubmitButton: resetFormSubmitButton,
    getAjaxErrorMessage: getAjaxErrorMessage,
    setShippingOption: setShippingOption,
    getSupportedCountries: getSupportedCountries,
    isSubsAddedToCart: isSubsAddedToCart,
    getLocalizedAutoRenewalTerms: getLocalizedAutoRenewalTerms,
    formatPrice: formatPrice,
    getCorrectSubtotalWithDiscount: getCorrectSubtotalWithDiscount,
    getSeparatedPricing: getSeparatedPricing,
    getCountryOptionsFromGC: getCountryOptionsFromGC,
    getAddress: getAddress,
    getDropinBillingAddress: getDropinBillingAddress,
    getTaxSchema: getTaxSchema,
    validateVatNumber: validateVatNumber,
    createTaxIdElement: createTaxIdElement,
    applyTaxRegistration: applyTaxRegistration,
    getTaxRegistration: getTaxRegistration
  };
}(jQuery, drgc_params);

/* harmony default export */ var checkout_utils = (CheckoutUtils);
// CONCATENATED MODULE: ./assets/js/public/commerce-api.js


var DRCommerceApi = function ($, params) {
  var _ref;

  var apiBaseUrl = "https://".concat(params.domain, "/v1/shoppers");

  var updateShopper = function updateShopper() {
    var queryStrings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var queryStr = $.param(queryStrings);
    return new Promise(function (resolve, reject) {
      $.ajax({
        type: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: "Bearer ".concat(params.accessToken)
        },
        url: "".concat(apiBaseUrl, "/me?").concat(queryStr),
        success: function success(data) {
          resolve(data);
        },
        error: function error(jqXHR) {
          reject(jqXHR);
        }
      });
    });
  };

  var saveShopperAddress = function saveShopperAddress(address) {
    if (!address) return;
    return new Promise(function (resolve, reject) {
      $.ajax({
        type: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: "Bearer ".concat(params.accessToken)
        },
        url: "".concat(apiBaseUrl, "/me/addresses"),
        data: JSON.stringify(address),
        success: function success() {
          resolve();
        },
        error: function error(jqXHR) {
          reject(jqXHR);
        }
      });
    });
  };

  var updateShopperAddress = function updateShopperAddress() {
    var requestPayload = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var queryStrings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var queryStr = $.param(queryStrings);
    return new Promise(function (resolve, reject) {
      $.ajax({
        type: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: "Bearer ".concat(params.accessToken)
        },
        url: "".concat(apiBaseUrl, "/me/addresses/").concat(requestPayload.address.id, "?").concat(queryStr),
        data: !$.isEmptyObject(requestPayload) ? JSON.stringify(requestPayload) : null,
        success: function success(data) {
          resolve(data);
        },
        error: function error(jqXHR) {
          reject(jqXHR);
        }
      });
    });
  };

  var deleteShopperAddress = function deleteShopperAddress(addressId) {
    return new Promise(function (resolve, reject) {
      $.ajax({
        type: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: "Bearer ".concat(params.accessToken)
        },
        url: "".concat(apiBaseUrl, "/me/addresses/").concat(addressId),
        success: function success(data) {
          resolve(data);
        },
        error: function error(jqXHR) {
          reject(jqXHR);
        }
      });
    });
  };

  var getCart = function getCart() {
    var queryStrings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var queryStr = $.param(queryStrings);
    return new Promise(function (resolve, reject) {
      $.ajax({
        type: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: "Bearer ".concat(params.accessToken)
        },
        url: "".concat(apiBaseUrl, "/me/carts/active?").concat(queryStr),
        success: function success(data) {
          resolve(data);
        },
        error: function error(jqXHR) {
          reject(jqXHR);
        }
      });
    });
  };

  var updateCart = function updateCart() {
    var queryStrings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var requestPayload = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var queryStr = $.param(queryStrings);
    return new Promise(function (resolve, reject) {
      $.ajax({
        type: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: "Bearer ".concat(params.accessToken)
        },
        url: "".concat(apiBaseUrl, "/me/carts/active?").concat(queryStr),
        data: !$.isEmptyObject(requestPayload) ? JSON.stringify(requestPayload) : null,
        success: function success(data) {
          resolve(data);
        },
        error: function error(jqXHR) {
          reject(jqXHR);
        }
      });
    });
  };

  var updateCartShippingAddress = function updateCartShippingAddress() {
    var queryStrings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var requestPayload = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var queryStr = $.param(queryStrings);
    return new Promise(function (resolve, reject) {
      $.ajax({
        type: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: "Bearer ".concat(params.accessToken)
        },
        url: "".concat(apiBaseUrl, "/me/carts/active/shipping-address?").concat(queryStr),
        data: !$.isEmptyObject(requestPayload) ? JSON.stringify(requestPayload) : null,
        success: function success(data) {
          resolve(data);
        },
        error: function error(jqXHR) {
          reject(jqXHR);
        }
      });
    });
  };

  var updateCartBillingAddress = function updateCartBillingAddress() {
    var queryStrings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var requestPayload = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var queryStr = $.param(queryStrings);
    return new Promise(function (resolve, reject) {
      $.ajax({
        type: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: "Bearer ".concat(params.accessToken)
        },
        url: "".concat(apiBaseUrl, "/me/carts/active/billing-address?").concat(queryStr),
        data: !$.isEmptyObject(requestPayload) ? JSON.stringify(requestPayload) : null,
        success: function success(data) {
          resolve(data);
        },
        error: function error(jqXHR) {
          reject(jqXHR);
        }
      });
    });
  };

  var updateLineItem = function updateLineItem(lineItemID) {
    var queryStrings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var queryStr = $.param(queryStrings);
    return new Promise(function (resolve, reject) {
      $.ajax({
        type: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: "Bearer ".concat(params.accessToken)
        },
        url: "".concat(apiBaseUrl, "/me/carts/active/line-items/").concat(lineItemID, "?").concat(queryStr),
        success: function success(data) {
          resolve(data);
        },
        error: function error(jqXHR) {
          reject(jqXHR);
        }
      });
    });
  };

  var removeLineItem = function removeLineItem(lineItemID) {
    return new Promise(function (resolve, reject) {
      $.ajax({
        type: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: "Bearer ".concat(params.accessToken)
        },
        url: "".concat(apiBaseUrl, "/me/carts/active/line-items/").concat(lineItemID),
        success: function success() {
          resolve();
        },
        error: function error(jqXHR) {
          reject(jqXHR);
        }
      });
    });
  };

  var applyShippingOption = function applyShippingOption(shippingOptionId) {
    var queryStrings = {
      expand: 'all',
      shippingOptionId: shippingOptionId
    };
    return new Promise(function (resolve, reject) {
      $.ajax({
        type: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: "Bearer ".concat(params.accessToken)
        },
        url: "".concat(apiBaseUrl, "/me/carts/active/apply-shipping-option?").concat($.param(queryStrings)),
        success: function success(data) {
          resolve(data);
        },
        error: function error(jqXHR) {
          reject(jqXHR);
        }
      });
    });
  };

  var applyPaymentMethod = function applyPaymentMethod(sourceId) {
    if (!sourceId) return;
    var postData = {
      'paymentMethod': {
        'sourceId': sourceId
      }
    };
    return new Promise(function (resolve, reject) {
      $.ajax({
        type: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: "Bearer ".concat(params.accessToken)
        },
        url: "".concat(apiBaseUrl, "/me/carts/active/apply-payment-method?expand=all"),
        data: JSON.stringify(postData),
        success: function success(data) {
          resolve(data);
        },
        error: function error(jqXHR) {
          reject(jqXHR);
        }
      });
    });
  };

  var getProduct = function getProduct(productID) {
    var queryObj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return new Promise(function (resolve, reject) {
      $.ajax({
        type: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: "Bearer ".concat(params.accessToken)
        },
        url: "".concat(apiBaseUrl, "/me/products/").concat(productID, "?").concat($.param(queryObj)),
        success: function success(data) {
          resolve(data);
        },
        error: function error(jqXHR) {
          reject(jqXHR);
        }
      });
    });
  };

  var getProductPricing = function getProductPricing(productID) {
    return new Promise(function (resolve, reject) {
      $.ajax({
        type: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: "Bearer ".concat(params.accessToken)
        },
        url: "".concat(apiBaseUrl, "/me/products/").concat(productID, "/pricing"),
        success: function success(data) {
          resolve(data);
        },
        error: function error(jqXHR) {
          reject(jqXHR);
        }
      });
    });
  };

  var getProductInventoryStatus = function getProductInventoryStatus(productID) {
    return new Promise(function (resolve, reject) {
      $.ajax({
        type: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: "Bearer ".concat(params.accessToken)
        },
        url: "".concat(apiBaseUrl, "/me/products/").concat(productID, "/inventory-status"),
        success: function success(data) {
          resolve(data);
        },
        error: function error(jqXHR) {
          reject(jqXHR);
        }
      });
    });
  };

  var getOffersByProduct = function getOffersByProduct(productID) {
    var queryStrings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var queryStr = $.param(queryStrings);
    return new Promise(function (resolve, reject) {
      $.ajax({
        type: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: "Bearer ".concat(params.accessToken)
        },
        url: "".concat(apiBaseUrl, "/me/products/").concat(productID, "/offers?").concat(queryStr),
        success: function success(data) {
          resolve(data);
        },
        error: function error(jqXHR) {
          reject(jqXHR);
        }
      });
    });
  };

  var getOffersByPoP = function getOffersByPoP(popType) {
    var queryStrings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var productID = arguments.length > 2 ? arguments[2] : undefined;
    var queryStr = $.param(queryStrings);
    var productUri = productID ? "products/".concat(productID, "/") : '';
    return new Promise(function (resolve, reject) {
      $.ajax({
        type: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: "Bearer ".concat(params.accessToken)
        },
        url: "".concat(apiBaseUrl, "/me/").concat(productUri, "point-of-promotions/").concat(popType, "/offers?").concat(queryStr),
        success: function success(data) {
          resolve(data);
        },
        error: function error(jqXHR) {
          reject(jqXHR);
        }
      });
    });
  };

  var postByUrl = function postByUrl(requestUrl) {
    return new Promise(function (resolve, reject) {
      $.ajax({
        type: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: "Bearer ".concat(params.accessToken)
        },
        url: requestUrl,
        success: function success(data) {
          resolve(data);
        },
        error: function error(jqXHR) {
          reject(jqXHR);
        }
      });
    });
  };

  var submitCart = function submitCart() {
    var queryStrings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var queryStr = $.param(queryStrings);
    return new Promise(function (resolve, reject) {
      $.ajax({
        type: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: "Bearer ".concat(params.accessToken)
        },
        url: "".concat(apiBaseUrl, "/me/carts/active/submit-cart?").concat(queryStr),
        success: function success(data) {
          resolve(data);
        },
        error: function error(jqXHR) {
          reject(jqXHR);
        }
      });
    });
  };

  var getSubsDetails = function getSubsDetails(subsId) {
    var queryObj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return new Promise(function (resolve, reject) {
      $.ajax({
        type: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: "Bearer ".concat(params.accessToken)
        },
        url: "".concat(apiBaseUrl, "/me/subscriptions/").concat(subsId, "?").concat($.param(queryObj)),
        success: function success(data) {
          resolve(data);
        },
        error: function error(jqXHR) {
          reject(jqXHR);
        }
      });
    });
  };

  var getOrderDetails = function getOrderDetails(orderId) {
    var queryObj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return new Promise(function (resolve, reject) {
      $.ajax({
        type: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: "Bearer ".concat(params.accessToken)
        },
        url: "".concat(apiBaseUrl, "/me/orders/").concat(orderId, "?").concat($.param(queryObj)),
        success: function success(data) {
          resolve(data);
        },
        error: function error(jqXHR) {
          reject(jqXHR);
        }
      });
    });
  };

  var getOrders = function getOrders() {
    var queryObj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return new Promise(function (resolve, reject) {
      $.ajax({
        type: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: "Bearer ".concat(params.accessToken)
        },
        url: "".concat(apiBaseUrl, "/me/orders?").concat($.param(queryObj)),
        success: function success(data) {
          resolve(data);
        },
        error: function error(jqXHR) {
          reject(jqXHR);
        }
      });
    });
  };

  return _ref = {
    apiBaseUrl: apiBaseUrl,
    updateShopper: updateShopper,
    getCart: getCart,
    updateCart: updateCart,
    submitCart: submitCart,
    updateLineItem: updateLineItem,
    removeLineItem: removeLineItem,
    applyShippingOption: applyShippingOption,
    applyPaymentMethod: applyPaymentMethod,
    getProduct: getProduct,
    getProductPricing: getProductPricing,
    getProductInventoryStatus: getProductInventoryStatus,
    getOffersByProduct: getOffersByProduct,
    getOffersByPoP: getOffersByPoP,
    postByUrl: postByUrl,
    updateCartShippingAddress: updateCartShippingAddress,
    updateCartBillingAddress: updateCartBillingAddress,
    saveShopperAddress: saveShopperAddress,
    updateShopperAddress: updateShopperAddress,
    deleteShopperAddress: deleteShopperAddress
  }, defineProperty_default()(_ref, "submitCart", submitCart), defineProperty_default()(_ref, "getSubsDetails", getSubsDetails), defineProperty_default()(_ref, "getOrderDetails", getOrderDetails), defineProperty_default()(_ref, "getOrders", getOrders), _ref;
}(jQuery, drgc_params);

/* harmony default export */ var commerce_api = (DRCommerceApi);
// CONCATENATED MODULE: ./assets/js/public/public-cart.js



/* global drgc_params, iFrameResize */

/* eslint-disable no-alert, no-console */



var CartModule = function ($) {
  var localizedText = drgc_params.translations;
  var hasPhysicalProduct = false;

  var hasPhysicalProductInLineItems = function hasPhysicalProductInLineItems(lineItems) {
    return lineItems.some(function (lineItem) {
      return lineItem.product.productType === 'PHYSICAL';
    });
  };

  var initAutoRenewalTerms = function initAutoRenewalTerms(digitalriverjs, locale) {
    var $checkoutBtn = $('#dr-checkout-btn');
    var $termsCheckbox = $('#autoRenewOptedInOnCheckout');
    $termsCheckbox.change(function (e) {
      var isChecked = $(e.target).is(':checked');
      var href = isChecked ? drgc_params.checkoutUrl : '#dr-autoRenewTermsContainer';
      $checkoutBtn.prop('href', href);
      if (isChecked) $('#dr-TAndC-err-msg').text('').hide();
      var cartPayload = {
        cart: {
          customAttributes: {
            attribute: [{
              name: 'autoRenewOptedInOnCheckout',
              value: isChecked
            }]
          }
        }
      };
      commerce_api.updateCart({}, cartPayload)["catch"](function (jqXHR) {
        return checkout_utils.apiErrorHandler(jqXHR);
      });
    });
    $checkoutBtn.click(function (e) {
      if (!$termsCheckbox.is(':checked')) {
        $('#dr-TAndC-err-msg').text(localizedText.required_tandc_msg).show();
        $(e.target).removeClass('sending');
      }
    });
    appendAutoRenewalTerms(digitalriverjs, locale);
  };

  var appendAutoRenewalTerms = function appendAutoRenewalTerms(digitalriverjs, locale) {
    var entityCode = checkout_utils.getEntityCode();
    var terms = checkout_utils.getLocalizedAutoRenewalTerms(digitalriverjs, entityCode, locale);

    if (terms) {
      $('#dr-optInAutoRenew > .dr-optInAutoRenewTerms > p').append(terms);
      $('#dr-autoRenewTermsContainer').show();
    }
  };

  var setProductQty = function setProductQty(e) {
    var $this = $(e.target);
    var $lineItem = $this.closest('.dr-product');
    var lineItemID = $lineItem.data('line-item-id');
    var $qty = $this.siblings('.product-qty-number:first');
    var qty = parseInt($qty.val(), 10);
    var max = parseInt($qty.attr('max'), 10);
    var min = parseInt($qty.attr('min'), 10);
    var step = parseInt($qty.attr('step'), 10);
    if ($this.hasClass('disabled') || !lineItemID) return;

    if ($(e.currentTarget).is('.dr-pd-cart-qty-plus')) {
      if (qty < max) $qty.val(qty + step);
    } else if ($(e.currentTarget).is('.dr-pd-cart-qty-minus')) {
      if (qty > min) $qty.val(qty - step);
    }

    $('.dr-cart__content').addClass('dr-loading');
    commerce_api.updateLineItem(lineItemID, {
      quantity: $qty.val()
    }).then(function (res) {
      renderSingleLineItem(res.lineItem.pricing, $lineItem);
      CartModule.fetchFreshCart();
    })["catch"](function (jqXHR) {
      checkout_utils.apiErrorHandler(jqXHR);
      $('.dr-cart__content').removeClass('dr-loading');
    });
  };

  var getOffersByPoP = function getOffersByPoP(type) {
    var productId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var data = {
      action: 'drgc_get_offers_by_pop',
      nonce: drgc_params.ajaxNonce,
      popType: type,
      productId: productId
    };
    $.post(drgc_params.ajaxUrl, data, function (response) {
      var res = response.data;

      if (response.success) {
        if (res.offers) {
          var offers = res.offers.offer || '';

          if (offers && offers.length) {
            offers.forEach(function (offer) {
              switch (type) {
                case 'CandyRack_ShoppingCart':
                  renderCandyRackOffer(offer, productId);
                  break;

                case 'Banner_ShoppingCartLocal':
                  renderBannerOffer(offer);
                  break;
              }
            });
          }
        } else if (res.errors) {
          drToast.displayMessage(res.errors.error[0], 'error');
        }
      } else {
        drToast.displayMessage(localizedText.undefined_error_msg, 'error');
      }
    });
  };

  var renderOffers = function renderOffers(lineItems) {
    lineItems.forEach(function (lineItem) {
      // Candy Rack (should be inserted after specific line item)
      getOffersByPoP('CandyRack_ShoppingCart', lineItem.product.id); // Bundle Tight (should disable edit buttons of specific line item)

      commerce_api.getOffersByProduct(lineItem.product.id, {
        expand: 'all'
      }).then(function (res) {
        var offers = res.offers.offer;

        if (offers && offers.length) {
          offers.forEach(function (offer) {
            disableEditBtnsForBundle(offer, lineItem.product.id);
          });
        }
      })["catch"](function (jqXHR) {
        return checkout_utils.apiErrorHandler(jqXHR);
      });
    }); // Banner (should be appended after all the line items)

    getOffersByPoP('Banner_ShoppingCartLocal');
  };

  var renderCandyRackOffer = function renderCandyRackOffer(offer, driverProductID) {
    var offerType = offer.type;
    var productOffers = offer.productOffers.productOffer;
    var promoText = offer.salesPitch.length ? offer.salesPitch[0] : '';
    var declinedProductIds = sessionStorage.getItem('drgc_upsell_decline') ? sessionStorage.getItem('drgc_upsell_decline') : '';
    var upsellDeclineArr = declinedProductIds ? declinedProductIds.split(',') : [];

    if (productOffers && productOffers.length) {
      productOffers.forEach(function (productOffer) {
        var salePrice = productOffer.pricing.formattedSalePriceWithQuantity;
        var listPrice = productOffer.pricing.formattedListPriceWithQuantity;
        var purchasable = productOffer.product.inventoryStatus.productIsInStock === 'true';
        var buyBtnText = purchasable ? offerType === 'Up-sell' ? localizedText.upgrade_label : localizedText.add_label : localizedText.out_of_stock;
        var productSalesPitch = productOffer.salesPitch || '';
        var shortDiscription = productOffer.product.shortDiscription || '';

        if (offerType === 'Up-sell' && upsellDeclineArr.indexOf(driverProductID.toString()) === -1) {
          var declineText = localizedText.upsell_decline_label;
          var upsellProductHtml = "\n            <div class=\"modal dr-upsellProduct-modal\" data-product-id=\"".concat(productOffer.product.id, "\" data-parent-product-id=\"").concat(driverProductID, "\">\n              <div class=\" modal-dialog\">\n                <div class=\"dr-upsellProduct modal-content\">\n                  <button class=\"dr-modal-close dr-modal-decline\" data-parent-product-id=\"").concat(driverProductID, "\"></button>\n                  <div class=\"dr-product-content\">\n                    <div class=\"dr-product__info\">\n                      <div class=\"dr-offer-header\">").concat(promoText, "</div>\n                      <div class=\"dr-offer-content\">").concat(productSalesPitch, "</div>\n                      <button type=\"button\" class=\"dr-btn dr-buy-candyRack dr-buy-").concat(buyBtnText, "\" data-buy-uri=\"").concat(productOffer.addProductToCart.uri, "\">").concat(buyBtnText, "</button>\n                      <button type=\"button\" class=\"dr-nothanks dr-modal-decline\" data-parent-product-id=\"").concat(driverProductID, "\">").concat(declineText, "</button>\n                    </div>\n                  </div>\n                  <div class=\"dr-product__price\">\n                    <img src=\"").concat(productOffer.product.thumbnailImage, "\" class=\"dr-upsellProduct__img\"/>\n                    <div class=\"product-name\">").concat(productOffer.product.displayName, "</div>\n                    <div class=\"product-short-desc\">").concat(shortDiscription, "</div>\n                    <span class=\"sale-price\">").concat(salePrice, "</span>\n                    <span class=\"regular-price dr-strike-price ").concat(salePrice === listPrice ? 'd-none' : '', "\">").concat(listPrice, "</span>\n                  </div>\n                </div>\n              </div>\n            </div>");
          $('body').append(upsellProductHtml).addClass('modal-open').addClass('drgc-wrapper');
        } else if (offerType !== 'Up-sell') {
          var html = "\n            <div class=\"dr-product dr-candyRackProduct\" data-product-id=\"".concat(productOffer.product.id, "\" data-driver-product-id=\"").concat(driverProductID, "\">\n              <div class=\"dr-product-content\">\n                <img src=\"").concat(productOffer.product.thumbnailImage, "\" class=\"dr-candyRackProduct__img\"/>\n                <div class=\"dr-product__info\">\n                  <div class=\"product-color\">\n                    <span style=\"background-color: yellow;\">").concat(promoText, "</span>\n                  </div>\n                  ").concat(productOffer.product.displayName, "\n                  <div class=\"product-sku\">\n                    <span>").concat(localizedText.product_label, " </span>\n                    <span>#").concat(productOffer.product.id, "</span>\n                  </div>\n                </div>\n              </div>\n              <div class=\"dr-product__price\">\n                <button type=\"button\" class=\"dr-btn dr-buy-candyRack\"\n                  data-buy-uri=\"").concat(productOffer.addProductToCart.uri, "\"\n                  ").concat(purchasable ? '' : 'disabled="disabled"', ">").concat(buyBtnText, "</button>\n                <span class=\"sale-price\">").concat(salePrice, "</span>\n                <span class=\"regular-price dr-strike-price ").concat(salePrice === listPrice ? 'd-none' : '', "\">").concat(listPrice, "</span>\n              </div>\n            </div>");

          if (!$(".dr-product-line-item[data-product-id=".concat(productOffer.product.id, "]")).length) {
            $(html).insertAfter(".dr-product-line-item[data-product-id=".concat(driverProductID, "]"));
          }
        }
      });
    }
  };

  var renderBannerOffer = function renderBannerOffer(offer) {
    var html = "\n      <div class=\"dr-banner\">\n        <div class=\"dr-banner__content\">".concat(offer.salesPitch[0], "</div>\n        <div class=\"dr-banner__img\"><img src=\"").concat(offer.image, "\"></div>\n      </div>");
    $('.dr-cart__products').append(html);
  };

  var disableEditBtnsForBundle = function disableEditBtnsForBundle(offer, productID) {
    var hasBundleTight = offer.type === 'Bundling' && offer.policyName === 'Tight Bundle Policy';
    var productOffers = offer.productOffers.productOffer;

    if (hasBundleTight && productOffers && productOffers.length) {
      productOffers.forEach(function (productOffer) {
        if (productOffer.product.id !== productID) {
          // Hide action buttons only when it's triggered by parent product
          $(".dr-product-line-item[data-product-id=".concat(productOffer.product.id, "]")).find('.remove-icon, .dr-pd-cart-qty-minus, .dr-pd-cart-qty-plus').css({
            opacity: 0,
            'pointer-events': 'none'
          });
        }
      });
    }
  };

  var renderSingleLineItem = function renderSingleLineItem(pricing, $lineItem) {
    var formattedListPriceWithQuantity = pricing.formattedListPriceWithQuantity,
        formattedSalePriceWithQuantity = pricing.formattedSalePriceWithQuantity;
    var $qty = $lineItem.find('.product-qty-number');
    var qty = parseInt($qty.val(), 10);
    var max = parseInt($qty.attr('max'), 10);
    var min = parseInt($qty.attr('min'), 10);
    $lineItem.find('.sale-price').text(formattedSalePriceWithQuantity);
    $lineItem.find('.regular-price').text(formattedListPriceWithQuantity);
    $lineItem.find('.dr-pd-cart-qty-minus').toggleClass('disabled', qty <= min);
    $lineItem.find('.dr-pd-cart-qty-plus').toggleClass('disabled', qty >= max);
  };

  var renderLineItems =
  /*#__PURE__*/
  function () {
    var _ref = asyncToGenerator_default()(
    /*#__PURE__*/
    regenerator_default.a.mark(function _callee(lineItems) {
      var min, max, promises, lineItemHTMLArr, hasAutoRenewal;
      return regenerator_default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              min = 1;
              max = 999;
              promises = [];
              lineItemHTMLArr = [];
              hasAutoRenewal = false;
              lineItems.forEach(function (lineItem, idx) {
                var parentProductID = lineItem.product.parentProduct ? lineItem.product.parentProduct.id : lineItem.product.id;
                var salePrice = lineItem.pricing.formattedSalePriceWithQuantity;
                var listPrice = lineItem.pricing.formattedListPriceWithQuantity;
                var promise = checkout_utils.getPermalink(parentProductID).then(function (permalink) {
                  var lineItemHTML = "\n          <div data-line-item-id=\"".concat(lineItem.id, "\" class=\"dr-product dr-product-line-item\" data-product-id=\"").concat(lineItem.product.id, "\" data-sort=\"").concat(idx, "\">\n            <div class=\"dr-product-content\">\n              <div class=\"dr-product__img\" style=\"background-image: url(").concat(lineItem.product.thumbnailImage, ")\"></div>\n              <div class=\"dr-product__info\">\n                <a class=\"product-name\" href=\"").concat(permalink, "?locale=").concat(drgc_params.drLocale, "\">").concat(lineItem.product.displayName, "</a>\n                <div class=\"product-short-description\">\n                  <span>").concat(drgc_params.displayShortDescription === 'true' && lineItem.product.shortDescription ? lineItem.product.shortDescription : '', "</span>\n                </div>\n                <div class=\"product-sku\">\n                  <span>").concat(localizedText.product_label, " </span>\n                  <span>#").concat(lineItem.product.id, "</span>\n                </div>\n                <div class=\"product-qty\">\n                  <span class=\"qty-text\">Qty ").concat(lineItem.quantity, "</span>\n                  <span class=\"dr-pd-cart-qty-minus value-button-decrease ").concat(lineItem.quantity <= min ? 'disabled' : '', "\"></span>\n                  <input type=\"number\" class=\"product-qty-number\" step=\"1\" min=\"").concat(min, "\" max=\"").concat(max, "\" value=\"").concat(lineItem.quantity, "\" maxlength=\"5\" size=\"2\" pattern=\"[0-9]*\" inputmode=\"numeric\" readonly=\"true\">\n                  <span class=\"dr-pd-cart-qty-plus value-button-increase ").concat(lineItem.quantity >= max ? 'disabled' : '', "\"></span>\n                </div>\n              </div>\n            </div>\n            <div class=\"dr-product__price\">\n              <button class=\"dr-prd-del remove-icon\"></button>\n              <span class=\"sale-price\">").concat(salePrice, "</span>\n              <span class=\"regular-price ").concat(salePrice === listPrice ? 'd-none' : '', "\">").concat(listPrice, "</span>\n            </div>\n          </div>");
                  lineItemHTMLArr[idx] = lineItemHTML; // Insert item to specific index to keep sequence asynchronously
                });
                promises.push(promise);
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                  for (var _iterator = lineItem.product.customAttributes.attribute[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var attr = _step.value;

                    if (attr.name === 'isAutomatic' && attr.value === 'true') {
                      hasAutoRenewal = true;
                      break;
                    }
                  }
                } catch (err) {
                  _didIteratorError = true;
                  _iteratorError = err;
                } finally {
                  try {
                    if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                      _iterator["return"]();
                    }
                  } finally {
                    if (_didIteratorError) {
                      throw _iteratorError;
                    }
                  }
                }
              });
              if (!hasAutoRenewal) $('.dr-cart__auto-renewal-terms').remove();
              return _context.abrupt("return", Promise.all(promises).then(function () {
                $('.dr-cart__products').html(lineItemHTMLArr.join(''));
              }));

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function renderLineItems(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  var renderSummary = function renderSummary(cart, hasPhysicalProduct) {
    var lineItems = cart.lineItems.lineItem;
    var pricing = cart.pricing;
    var $taxRow = $('.dr-summary__tax');
    var $shippingTaxRow = $('.dr-summary__shipping-tax');
    var $discountRow = $('.dr-summary__discount');
    var $shippingRow = $('.dr-summary__shipping');
    var $subtotalRow = $('.dr-summary__subtotal');
    var $totalRow = $('.dr-summary__total');
    var newPricing = checkout_utils.getSeparatedPricing(lineItems, pricing, drgc_params.isTaxInclusive === 'true');
    $discountRow.find('.discount-value').text("-".concat(pricing.formattedDiscount));
    $taxRow.find('.tax-value').text(newPricing.formattedProductTax);
    $shippingTaxRow.find('.shipping-tax-value').text(newPricing.formattedShippingTax);
    $shippingRow.find('.shipping-value').text(pricing.shippingAndHandling.value === 0 ? drgc_params.translations.free_label : newPricing.formattedShippingAndHandling);
    $subtotalRow.find('.subtotal-value').text(newPricing.formattedSubtotal);
    $totalRow.find('.total-value').text(pricing.formattedOrderTotal);
    if (pricing.discount.value) $discountRow.show();else $discountRow.hide();

    if (hasPhysicalProduct) {
      $shippingRow.show();
      $shippingTaxRow.show();
    } else {
      $shippingRow.hide();
      $shippingTaxRow.hide();
    }

    return new Promise(function (resolve) {
      return resolve();
    });
  };

  var fetchFreshCart = function fetchFreshCart() {
    var lineItems = [];
    $('.dr-cart__content').addClass('dr-loading');
    commerce_api.getCart({
      expand: 'all'
    }).then(function (res) {
      lineItems = res.cart.lineItems.lineItem;

      if (lineItems && lineItems.length) {
        hasPhysicalProduct = hasPhysicalProductInLineItems(lineItems);
        return Promise.all([renderLineItems(lineItems), renderSummary(res.cart, hasPhysicalProduct)]);
      } else {
        if (sessionStorage.getItem('drgc_upsell_decline')) sessionStorage.removeItem('drgc_upsell_decline');
        $('.dr-cart__auto-renewal-terms').remove();
        $('.dr-cart__products').text(localizedText.empty_cart_msg);
        $('#dr-checkout-btn').remove();
        $('#cart-estimate').remove();
        $('.dr-cart-wrapper__content > .order-number').remove();
        return new Promise(function (resolve) {
          return resolve();
        });
      }
    }).then(function () {
      if (lineItems && lineItems.length) {
        if (checkout_utils.isSubsAddedToCart(lineItems)) {
          var $termsCheckbox = $('#autoRenewOptedInOnCheckout');
          var href = $termsCheckbox.length && !$termsCheckbox.prop('checked') ? '#dr-autoRenewTermsContainer' : drgc_params.isLogin !== 'true' ? drgc_params.loginUrl : drgc_params.checkoutUrl;
          $('#dr-checkout-btn').prop('href', href);
        }

        renderOffers(lineItems);
      }

      $('.dr-cart__content').removeClass('dr-loading'); // Main cart is ready, loading can be ended
    })["catch"](function (jqXHR) {
      checkout_utils.apiErrorHandler(jqXHR);
      $('.dr-cart__content').removeClass('dr-loading');
    });
  };

  var updateUpsellCookie = function updateUpsellCookie(id) {
    var isDeclined = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var productId = id.toString();
    var declinedProductIds = sessionStorage.getItem('drgc_upsell_decline') ? sessionStorage.getItem('drgc_upsell_decline') : '';
    var upsellDeclineArr = declinedProductIds ? declinedProductIds.split(',') : [];

    if (upsellDeclineArr.indexOf(productId) === -1 && isDeclined) {
      upsellDeclineArr.push(productId);
    } else {
      upsellDeclineArr = upsellDeclineArr.filter(function (item) {
        return item !== productId;
      });
    }

    sessionStorage.setItem('drgc_upsell_decline', upsellDeclineArr.join(','));
  };

  return {
    hasPhysicalProduct: hasPhysicalProduct,
    hasPhysicalProductInLineItems: hasPhysicalProductInLineItems,
    initAutoRenewalTerms: initAutoRenewalTerms,
    appendAutoRenewalTerms: appendAutoRenewalTerms,
    setProductQty: setProductQty,
    getOffersByPoP: getOffersByPoP,
    renderOffers: renderOffers,
    renderCandyRackOffer: renderCandyRackOffer,
    renderBannerOffer: renderBannerOffer,
    disableEditBtnsForBundle: disableEditBtnsForBundle,
    renderSingleLineItem: renderSingleLineItem,
    renderLineItems: renderLineItems,
    renderSummary: renderSummary,
    fetchFreshCart: fetchFreshCart,
    updateUpsellCookie: updateUpsellCookie
  };
}(jQuery);

jQuery(document).ready(function ($) {
  var drLocale = drgc_params.drLocale || 'en_US';
  var localizedText = drgc_params.translations; // Very basic throttle function, avoid too many calls within a short period

  var throttle = function throttle(func, limit) {
    var inThrottle;
    return function () {
      var args = arguments;
      var context = this;

      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(function () {
          return inThrottle = false;
        }, limit);
      }
    };
  };

  $('body').on('click', 'span.dr-pd-cart-qty-plus, span.dr-pd-cart-qty-minus', throttle(CartModule.setProductQty, 200));
  $('body').on('click', '.dr-prd-del', function (e) {
    e.preventDefault();
    var $this = $(e.target);
    var $lineItem = $this.closest('.dr-product');
    var lineItemID = $lineItem.data('line-item-id');
    var productId = $lineItem.data('product-id');
    CartModule.updateUpsellCookie(productId, false);
    $('.dr-cart__content').addClass('dr-loading');
    commerce_api.removeLineItem(lineItemID).then(function () {
      $lineItem.remove();
      CartModule.fetchFreshCart();
    })["catch"](function (jqXHR) {
      checkout_utils.apiErrorHandler(jqXHR);
      $('.dr-cart__content').removeClass('dr-loading');
    });
  });
  $('body').on('click', '.dr-modal-decline', function (e) {
    e.preventDefault();
    var $this = $(e.target);
    var productId = $this.data('parent-product-id');
    CartModule.updateUpsellCookie(productId, true);
    $('.dr-upsellProduct-modal[data-parent-product-id="' + productId + '"]').remove();
    $('body').removeClass('modal-open').removeClass('drgc-wrapper');
  });
  $('body').on('click', '.dr-buy-candyRack', function (e) {
    e.preventDefault();
    var $this = $(e.target);
    var buyUri = $this.attr('data-buy-uri');

    if ($this.hasClass('dr-buy-Upgrade')) {
      $('body').removeClass('modal-open').removeClass('drgc-wrapper');
    }

    $('.dr-cart__content').addClass('dr-loading');
    commerce_api.postByUrl("".concat(buyUri, "&testOrder=").concat(drgc_params.testOrder)).then(function () {
      return CartModule.fetchFreshCart();
    })["catch"](function (jqXHR) {
      checkout_utils.apiErrorHandler(jqXHR);
      $('.dr-cart__content').removeClass('dr-loading');
    });
  }); // Old currency selector, will be deprecated after it's not used by any theme

  $('body').on('change', '.dr-currency-select', function (e) {
    e.preventDefault();
    var $this = $(e.target);
    var queryParams = {
      currency: e.target.value,
      locale: $this.find('option:selected').data('locale')
    };
    if ($('.dr-cart__content').length) $('.dr-cart__content').addClass('dr-loading');else $('body').addClass('dr-loading');
    commerce_api.updateShopper(queryParams).then(function () {
      return location.reload(true);
    })["catch"](function (jqXHR) {
      checkout_utils.apiErrorHandler(jqXHR);
      $('.dr-cart__content, body').removeClass('dr-loading');
    });
  });
  $('.promo-code-toggle').click(function () {
    $('.promo-code-wrapper').toggle();
  });
  $('#apply-promo-code-btn').click(function (e) {
    var $this = $(e.target);
    var promoCode = $('#promo-code').val();

    if (!$.trim(promoCode)) {
      $('#dr-promo-code-err-field').text(localizedText.invalid_promo_code_msg).show();
      return;
    }

    $this.addClass('sending').blur();
    commerce_api.updateCart({
      promoCode: promoCode
    }).then(function () {
      $this.removeClass('sending');
      $('#dr-promo-code-err-field').text('').hide();
      CartModule.fetchFreshCart();
    })["catch"](function (jqXHR) {
      $this.removeClass('sending');

      if (jqXHR.responseJSON.errors) {
        var errMsgs = jqXHR.responseJSON.errors.error.map(function (err) {
          return err.description;
        });
        $('#dr-promo-code-err-field').html(errMsgs.join('<br/>')).show();
      }
    });
  });
  $('#promo-code').keypress(function (e) {
    if (e.which == 13) {
      e.preventDefault();
      $('#apply-promo-code-btn').trigger('click');
    }
  });
  $('.dr-summary__proceed-checkout').click(function (e) {
    $(e.target).addClass('sending');
  });

  if ($('#dr-cart-page-wrapper').length) {
    CartModule.fetchFreshCart();
    var digitalriverjs = new DigitalRiver(drgc_params.digitalRiverKey, {
      'locale': drLocale.split('_').join('-')
    });
    checkout_utils.applyLegalLinks(digitalriverjs);

    if ($('#dr-autoRenewTermsContainer').length) {
      CartModule.initAutoRenewalTerms(digitalriverjs, drLocale);
      $('#autoRenewOptedInOnCheckout').prop('checked', false).trigger('change');
    }
  }
});
/* harmony default export */ var public_cart = (CartModule);
// CONCATENATED MODULE: ./assets/js/public/float-label.js
/*
 * floating-label.js
 * https://gist.github.com/Steamforge/849e47be507ca0a9080a2b473b74f57e
 */
var FloatLabel = function () {
  // add active class
  var handleFocus = function handleFocus(e) {
    var target = e.target;
    target.parentNode.classList.add('active'); // target.setAttribute('placeholder', target.getAttribute('data-placeholder'));
  }; // remove active class


  var handleBlur = function handleBlur(e) {
    var target = e.target;

    if (!target.value) {
      target.parentNode.classList.remove('active');
    } // target.removeAttribute('placeholder');

  }; // register events


  var bindEvents = function bindEvents(element) {
    var floatField = element.querySelector('input');
    if (!floatField) return;
    floatField.addEventListener('focus', handleFocus);
    floatField.addEventListener('blur', handleBlur);
  }; // get DOM elements


  var init = function init() {
    var floatContainers = document.querySelectorAll('.float-container');

    for (var i = 0; i < floatContainers.length; i++) {
      var element = floatContainers[i];

      if (element.querySelector('input') && element.querySelector('input').value) {
        element.classList.add('active');
      }

      bindEvents(element);
    }
  };

  return {
    init: init
  };
}();

/* harmony default export */ var float_label = (FloatLabel);
// CONCATENATED MODULE: ./assets/js/public/public-checkout.js


 // 3rd-party plugin




var CheckoutModule = function ($) {
  var localizedText = drgc_params.translations;

  var moveToNextSection = function moveToNextSection($section) {
    var $nextSection = $section.next();
    $section.removeClass('active').addClass('closed');
    $nextSection.addClass('active').removeClass('closed');

    if ($nextSection.hasClass('small-closed-left')) {
      $nextSection.removeClass('small-closed-left');
      $nextSection.next().removeClass('small-closed-right');
    }

    if ($section.find('.dr-address-book').length) {
      $section.find('.dr-address-book-btn').removeClass('active');
      $section.find('.dr-address-book-btn, .dr-address-book').hide();
    }

    if ($nextSection.find('.dr-address-book').length) {
      if ($nextSection.hasClass('dr-checkout__billing') && $('#checkbox-billing').prop('checked')) {
        $nextSection.find('.dr-address-book-btn').hide();
      } else {
        $nextSection.find('.dr-address-book-btn').show();
      }
    }

    if ($section.hasClass('dr-checkout__billing') || $section.hasClass('dr-checkout__tax-id')) {
      $('.dr-accordion__edit').hide();
      $('.edit-link').show();
    }

    if ($nextSection.hasClass('dr-checkout__confirmation') || $section.hasClass('dr-checkout__delivery')) {
      $section.find('span.dr-accordion__edit').show();
    }

    if ($nextSection.hasClass('dr-checkout__tax-id') && sessionStorage.getItem('drgcTaxExempt') === 'true' && sessionStorage.getItem('drgcTaxRegs')) {
      $('#checkout-tax-id-form').trigger('submit');
    }

    if ($section.hasClass('dr-checkout__tax-id') && sessionStorage.getItem('drgcTaxExempt') !== 'true') {
      $section.find('span.dr-accordion__edit').show();
    }

    adjustColumns($section);
    checkout_utils.updateSummaryLabels();
    $('html, body').animate({
      scrollTop: $nextSection.first().offset().top - 80
    }, 500);
  };

  var adjustColumns = function adjustColumns($section) {
    var $shippingSection = $('.dr-checkout__shipping');
    var $billingSection = $('.dr-checkout__billing');
    var $paymentSection = $('.dr-checkout__payment');
    var $confirmSection = $('.dr-checkout__confirmation');

    if ($shippingSection.is(':visible') && $shippingSection.hasClass('closed') && $billingSection.hasClass('closed')) {
      $shippingSection.addClass('small-closed-left');
      $billingSection.addClass('small-closed-right');
    } else {
      $shippingSection.removeClass('small-closed-left');
      $billingSection.removeClass('small-closed-right');
    }

    if ($section && $section.hasClass('dr-checkout__payment')) {
      $paymentSection.addClass('small-closed-left');
      $confirmSection.addClass('small-closed-right').removeClass('d-none');
    } else {
      $paymentSection.removeClass('small-closed-left');
      $confirmSection.removeClass('small-closed-right').addClass('d-none');
    }
  };

  var validateAddress = function validateAddress($form) {
    var addressType = $form.attr('id') === 'checkout-shipping-form' ? 'shipping' : 'billing';
    var validateItems = document.querySelectorAll("[name^=".concat(addressType, "-]")); // Validate form

    $form.addClass('was-validated');
    $form.find('.dr-err-field').hide();

    for (var i = 0, len = validateItems.length; i < len; i++) {
      if ($(validateItems[i]).is(':visible') && validateItems[i].checkValidity() === false) {
        return false;
      }
    }

    return true;
  };

  var buildAddressPayload = function buildAddressPayload($form) {
    var addressType = $form.attr('id') === 'checkout-shipping-form' ? 'shipping' : 'billing';
    var email = $('#checkout-email-form > div.form-group > input[name=email]').val().trim();
    var payload = {
      shipping: {},
      billing: {}
    };
    $.each($form.serializeArray(), function (index, obj) {
      var key = obj.name.split('-')[1];
      payload[addressType][key] = obj.value;
    });
    payload[addressType].emailAddress = email;

    if (addressType === 'billing') {
      delete payload[addressType].business;
      delete payload[addressType].companyEIN;
      delete payload[addressType].no;
    }

    return payload[addressType];
  };

  var displayAddressErrMsg = function displayAddressErrMsg() {
    var jqXHR = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var $target = arguments.length > 1 ? arguments[1] : undefined;

    if (Object.keys(jqXHR).length) {
      $target.text(checkout_utils.getAjaxErrorMessage(jqXHR)).show();
    } else {
      $target.text(localizedText.shipping_options_error_msg).show();
    }
  };

  var preselectShippingOption =
  /*#__PURE__*/
  function () {
    var _ref = asyncToGenerator_default()(
    /*#__PURE__*/
    regenerator_default.a.mark(function _callee(data) {
      var $errorMsgElem, defaultShippingOption, shippingOptions, defaultExists, index, option, res, freeShipping;
      return regenerator_default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              $errorMsgElem = $('#checkout-delivery-form > div.dr-err-field');
              defaultShippingOption = data.cart.shippingMethod.code;
              shippingOptions = data.cart.shippingOptions.shippingOption || [];
              defaultExists = false;
              $('#checkout-delivery-form > button[type="submit"]').prop('disabled', shippingOptions.length === 0);

              if (!shippingOptions.length) {
                _context.next = 26;
                break;
              }

              $errorMsgElem.text('').hide();
              index = 0;

            case 8:
              if (!(index < shippingOptions.length)) {
                _context.next = 21;
                break;
              }

              option = shippingOptions[index];

              if (option.id === defaultShippingOption) {
                defaultExists = true;
              }

              if (!$('#shipping-option-' + option.id).length) {
                _context.next = 13;
                break;
              }

              return _context.abrupt("continue", 18);

            case 13:
              _context.next = 15;
              return commerce_api.applyShippingOption(option.id);

            case 15:
              res = _context.sent;
              freeShipping = res.cart.pricing.shippingAndHandling.value === 0;
              checkout_utils.setShippingOption(option, freeShipping);

            case 18:
              index++;
              _context.next = 8;
              break;

            case 21:
              // If default shipping option is not in the list, then pre-select the 1st one
              if (!defaultExists) {
                defaultShippingOption = shippingOptions[0].id;
              }

              $('#checkout-delivery-form').children().find('input:radio[data-id="' + defaultShippingOption + '"]').prop("checked", true);
              return _context.abrupt("return", commerce_api.applyShippingOption(defaultShippingOption));

            case 26:
              $('#checkout-delivery-form .dr-panel-edit__el').empty();
              displayAddressErrMsg({}, $errorMsgElem);
              return _context.abrupt("return", new Promise(function (resolve) {
                return resolve(data);
              }));

            case 29:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function preselectShippingOption(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  var applyPaymentAndSubmitCart = function applyPaymentAndSubmitCart(sourceId) {
    var isPaymentButton = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var $form = $('#checkout-confirmation-form');
    $('body').addClass('dr-loading');
    commerce_api.applyPaymentMethod(sourceId).then(function () {
      return commerce_api.submitCart({
        ipAddress: drgc_params.client_ip
      });
    }).then(function (data) {
      $('#checkout-confirmation-form > input[name="order_id"]').val(data.submitCart.order.id);
      $form.submit();
    })["catch"](function (jqXHR) {
      var $errorMsgElem = isPaymentButton ? $('#dr-payment-failed-msg') : $('#dr-checkout-err-field');
      checkout_utils.resetFormSubmitButton($form);
      $errorMsgElem.text(checkout_utils.getAjaxErrorMessage(jqXHR)).show();
      $('body').removeClass('dr-loading');
    });
  };

  var initShopperTypeRadio = function initShopperTypeRadio() {
    $('.shopper-type-radio').appendTo('.tax-id-shopper-type');

    if (sessionStorage.getItem('drgcTaxRegs')) {
      var taxRegs = JSON.parse(sessionStorage.getItem('drgcTaxRegs'));
      var shopperType = taxRegs.customerType;
      var $checkedRadio = $('input[name="shopper-type"][value="' + shopperType + '"]');

      if ($checkedRadio.length) {
        $checkedRadio.prop('checked', true).trigger('click');
      } else {
        $('input[name="shopper-type"]:first').prop('checked', true).trigger('click');
      }
    } else {
      $('input[name="shopper-type"]:first').prop('checked', true).trigger('click');
    }
  };

  var isTaxExempt = function isTaxExempt(lineItems) {
    var lineItemCustomAttrs = lineItems[0].customAttributes.attribute;
    var attr = lineItemCustomAttrs.find(function (item) {
      return item.name === 'isTaxExempt';
    });

    if (attr !== undefined) {
      return attr.value === 'true';
    } else {
      return false;
    }
  };

  return {
    moveToNextSection: moveToNextSection,
    adjustColumns: adjustColumns,
    validateAddress: validateAddress,
    buildAddressPayload: buildAddressPayload,
    displayAddressErrMsg: displayAddressErrMsg,
    preselectShippingOption: preselectShippingOption,
    applyPaymentAndSubmitCart: applyPaymentAndSubmitCart,
    initShopperTypeRadio: initShopperTypeRadio,
    isTaxExempt: isTaxExempt
  };
}(jQuery);

jQuery(document).ready(function ($) {
  if ($('#checkout-payment-form').length) {
    // Globals
    var localizedText = drgc_params.translations;
    var isLoggedIn = drgc_params.isLogin === 'true';
    var drLocale = drgc_params.drLocale || 'en_US';
    var selectedCountry = drLocale.split('_')[1];
    var cartData = drgc_params.cart.cart;
    var requestShipping = cartData.shippingOptions.shippingOption ? true : false;
    var digitalriverjs = new DigitalRiver(drgc_params.digitalRiverKey, {
      'locale': drLocale.split('_').join('-')
    });
    var addressPayload = {
      shipping: {},
      billing: {}
    };
    var paymentSourceId = null;
    var currency = drgc_params.cart.cart.pricing.orderTotal.currency;
    var dropInConfig = JSON.parse(drgc_params.dropInConfig);
    var paymentResponse = null; // Section progress

    var finishedSectionIdx = -1; // Break down tax and update summary on page load

    checkout_utils.updateSummaryPricing(cartData, drgc_params.isTaxInclusive === 'true');
    $('#checkout-email-form').on('submit', function (e) {
      e.preventDefault(); // If no items are in cart, do not even continue, maybe give feedback

      if (!drgc_params.cart.cart.lineItems.hasOwnProperty('lineItem')) return;
      var $form = $('#checkout-email-form');
      var email = $form.find('input[name=email]').val().trim();
      $form.addClass('was-validated');

      if ($form[0].checkValidity() === false) {
        return false;
      }

      var $section = $('.dr-checkout__email');
      $section.find('.dr-panel-result__text').text(email);

      if ($('.dr-checkout__el').index($section) > finishedSectionIdx) {
        finishedSectionIdx = $('.dr-checkout__el').index($section);
      }

      CheckoutModule.moveToNextSection($section);
    }); // Submit shipping info form

    $('#checkout-shipping-form').on('submit', function (e) {
      e.preventDefault();
      var $form = $(e.target);
      var $button = $form.find('button[type="submit"]');
      var isFormValid = CheckoutModule.validateAddress($form);
      if (!isFormValid) return;
      addressPayload.shipping = CheckoutModule.buildAddressPayload($form);
      var cartRequest = {
        address: addressPayload.shipping
      };
      $button.addClass('sending').blur();

      if (isLoggedIn && $('#checkbox-save-shipping').prop('checked')) {
        var setAsDefault = $('input:hidden[name="addresses-no-default"]').val() === 'true';
        var address = checkout_utils.getAddress('shipping', setAsDefault);
        commerce_api.saveShopperAddress(address)["catch"](function (jqXHR) {
          checkout_utils.apiErrorHandler(jqXHR);
        });
      }

      commerce_api.updateCartShippingAddress({
        expand: 'all'
      }, cartRequest).then(function () {
        return commerce_api.getCart({
          expand: 'all'
        });
      }).then(function (data) {
        return CheckoutModule.preselectShippingOption(data);
      }).then(function (data) {
        $button.removeClass('sending').blur();
        var $section = $('.dr-checkout__shipping');
        checkout_utils.updateAddressSection(data.cart.shippingAddress, $section.find('.dr-panel-result__text'));

        if ($('.dr-checkout__el').index($section) > finishedSectionIdx) {
          finishedSectionIdx = $('.dr-checkout__el').index($section);
        }

        CheckoutModule.moveToNextSection($section);
        checkout_utils.updateSummaryPricing(data.cart, drgc_params.isTaxInclusive === 'true');
      })["catch"](function (jqXHR) {
        $button.removeClass('sending').blur();
        CheckoutModule.displayAddressErrMsg(jqXHR, $form.find('.dr-err-field'));
      });
    });
    $('#checkbox-billing, #checkbox-business').on('change', function (e) {
      var id = $(e.target).attr('id');

      switch (id) {
        case 'checkbox-billing':
          if (!$(e.target).is(':checked')) {
            var billingMeta = {
              cart: {
                customAttributes: {
                  attribute: [{
                    name: 'SHIPPING_ADDRESS_SAME_AS_BILLING',
                    value: false
                  }]
                }
              }
            };
            commerce_api.updateCart({}, billingMeta);
            $('.dr-address-book-btn.billing').show();
            $('.billing-section').slideDown();
          } else {
            $('.billing-section').slideUp();
            $('#checkbox-business').prop('checked', false).change();
            $('.dr-address-book-btn.billing').hide();
          }

          break;

        case 'checkbox-business':
          if (!$(e.target).is(':checked')) {
            $('#billing-field-company-name, #billing-field-company-ein').val('');
            $('.form-group-business').slideUp();
          } else {
            $('#checkbox-billing').prop('checked', false).change();
            $('.form-group-business').slideDown();
          }

          break;
      }
    });
    $('#checkout-billing-form').on('submit',
    /*#__PURE__*/
    function () {
      var _ref2 = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee2(e) {
        var $form, $button, billingSameAsShipping, isFormValid, cartRequest, setAsDefault, address, updatedCart, lineItems, isTaxExempt, _address, taxRegs, taxIds, shopperType, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, element, $field, billingAddress, lang, config;

        return regenerator_default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                e.preventDefault();
                $form = $(e.target);
                $button = $form.find('button[type="submit"]');
                billingSameAsShipping = $('[name="checkbox-billing"]').is(':visible:checked');
                isFormValid = CheckoutModule.validateAddress($form);

                if (isFormValid) {
                  _context2.next = 7;
                  break;
                }

                return _context2.abrupt("return");

              case 7:
                addressPayload.billing = billingSameAsShipping ? Object.assign({}, addressPayload.shipping) : CheckoutModule.buildAddressPayload($form);
                if ($('#billing-field-company-name').length) addressPayload.billing.companyName = $('#billing-field-company-name').val();
                cartRequest = {
                  address: addressPayload.billing
                };
                $button.addClass('sending').blur();

                if (isLoggedIn && $('#checkbox-save-billing').prop('checked')) {
                  if (requestShipping && !billingSameAsShipping || !requestShipping) {
                    setAsDefault = $('input:hidden[name="addresses-no-default"]').val() === 'true' && !requestShipping;
                    address = checkout_utils.getAddress('billing', setAsDefault);
                    commerce_api.saveShopperAddress(address)["catch"](function (jqXHR) {
                      checkout_utils.apiErrorHandler(jqXHR);
                    });
                  }
                }

                _context2.next = 14;
                return commerce_api.updateCartBillingAddress({
                  expand: 'all'
                }, cartRequest).then(function () {
                  // Digital product still need to update some of shippingAddress attributes for tax calculating
                  if (requestShipping) return new Promise(function (resolve) {
                    return resolve();
                  });
                  var patchCartRequest = {
                    address: {
                      country: cartRequest.address.country,
                      countrySubdivision: cartRequest.address.countrySubdivision,
                      postalCode: cartRequest.address.postalCode
                    }
                  };
                  return commerce_api.updateCartShippingAddress({
                    expand: 'all'
                  }, patchCartRequest);
                }).then(function () {
                  var $companyEin = $('#billing-field-company-ein');
                  if (!$companyEin.length) return new Promise(function (resolve) {
                    return resolve();
                  });
                  var companyMeta = {
                    cart: {
                      customAttributes: {
                        attribute: [{
                          name: 'companyEIN',
                          value: $companyEin.val()
                        }]
                      }
                    }
                  };
                  return commerce_api.updateCart({}, companyMeta);
                }).then(function () {
                  return commerce_api.getCart({
                    expand: 'all'
                  });
                }).then(function (data) {
                  return requestShipping ? CheckoutModule.preselectShippingOption(data) : new Promise(function (resolve) {
                    return resolve(data);
                  });
                })["catch"](function (jqXHR) {
                  $button.removeClass('sending').blur();
                  CheckoutModule.displayAddressErrMsg(jqXHR, $form.find('.dr-err-field'));
                  console.error(jqXHR);
                });

              case 14:
                updatedCart = _context2.sent;

                if (!$('#checkout-tax-id-form').length) {
                  _context2.next = 79;
                  break;
                }

                lineItems = updatedCart.cart.lineItems.lineItem;
                isTaxExempt = CheckoutModule.isTaxExempt(lineItems);
                sessionStorage.setItem('drgcTaxExempt', isTaxExempt);

                if (isTaxExempt) {
                  _context2.next = 33;
                  break;
                }

                _address = requestShipping ? addressPayload.shipping : addressPayload.billing;
                _context2.prev = 21;
                _context2.next = 24;
                return checkout_utils.getTaxSchema(_address);

              case 24:
                float_label.init();
                _context2.next = 30;
                break;

              case 27:
                _context2.prev = 27;
                _context2.t0 = _context2["catch"](21);
                console.error(_context2.t0);

              case 30:
                if (sessionStorage.getItem('drgcTaxRegs')) sessionStorage.removeItem('drgcTaxRegs');
                _context2.next = 77;
                break;

              case 33:
                _context2.prev = 33;
                _context2.next = 36;
                return checkout_utils.getTaxRegistration();

              case 36:
                taxRegs = _context2.sent;

                if (!(Object.keys(taxRegs).length && taxRegs.customerType)) {
                  _context2.next = 72;
                  break;
                }

                taxIds = taxRegs.taxRegistrations;
                shopperType = taxRegs.customerType;
                $('input[name="shopper-type"][value="' + shopperType + '"]').prop('checked', true);
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context2.prev = 44;
                _iterator = taxIds[Symbol.iterator]();

              case 46:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context2.next = 57;
                  break;
                }

                element = _step.value;
                $field = $('#tax-id-field-' + element.key);

                if ($field.length) {
                  _context2.next = 53;
                  break;
                }

                return _context2.abrupt("break", 57);

              case 53:
                $field.val(element.value).parent().addClass('active');

              case 54:
                _iteratorNormalCompletion = true;
                _context2.next = 46;
                break;

              case 57:
                _context2.next = 63;
                break;

              case 59:
                _context2.prev = 59;
                _context2.t1 = _context2["catch"](44);
                _didIteratorError = true;
                _iteratorError = _context2.t1;

              case 63:
                _context2.prev = 63;
                _context2.prev = 64;

                if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                  _iterator["return"]();
                }

              case 66:
                _context2.prev = 66;

                if (!_didIteratorError) {
                  _context2.next = 69;
                  break;
                }

                throw _iteratorError;

              case 69:
                return _context2.finish(66);

              case 70:
                return _context2.finish(63);

              case 71:
                sessionStorage.setItem('drgcTaxRegs', JSON.stringify(taxRegs));

              case 72:
                _context2.next = 77;
                break;

              case 74:
                _context2.prev = 74;
                _context2.t2 = _context2["catch"](33);
                console.error(_context2.t2);

              case 77:
                _context2.next = 80;
                break;

              case 79:
                if (sessionStorage.getItem('drgcTaxRegs')) sessionStorage.removeItem('drgcTaxRegs');

              case 80:
                billingAddress = checkout_utils.getDropinBillingAddress(addressPayload);
                lang = drLocale.split('_')[0];

                if ('onlineBanking' in dropInConfig) {
                  dropInConfig.onlineBanking.onlineBanking = {
                    currency: currency,
                    country: billingAddress.address.country
                  };
                }

                if ('googlePay' in dropInConfig) {
                  dropInConfig.googlePay.style.buttonLanguage = lang;
                }

                if ('applePay' in dropInConfig) {
                  dropInConfig.applePay.style.buttonLanguage = lang;
                }

                config = {
                  sessionId: updatedCart.cart.paymentSession ? updatedCart.cart.paymentSession.id : '',
                  billingAddress: billingAddress,
                  paymentMethodConfiguration: dropInConfig,
                  onSuccess: function onSuccess(res) {
                    sessionStorage.setItem('drgcPaymentSource', JSON.stringify(res.source));
                    paymentResponse = res;
                    $('#checkout-payment-form').submit();
                  },
                  onError: function onError(res) {
                    console.error(res.errors);
                    paymentResponse = res;
                  },
                  onReady: function onReady(res) {
                    $button.removeClass('sending').blur();
                    var $section = $('.dr-checkout__billing');
                    checkout_utils.updateAddressSection(updatedCart.cart.billingAddress, $section.find('.dr-panel-result__text'));

                    if ($('.dr-checkout__el').index($section) > finishedSectionIdx) {
                      finishedSectionIdx = $('.dr-checkout__el').index($section);
                    }

                    CheckoutModule.moveToNextSection($section);
                    checkout_utils.updateSummaryPricing(updatedCart.cart, drgc_params.isTaxInclusive === 'true');
                    paymentResponse = res;

                    if (!res.paymentMethodTypes.length) {
                      $('#dr-payment-failed-msg').text(localizedText.payment_methods_error_msg).show();
                    }
                  },
                  onCancel: function onCancel(res) {
                    paymentResponse = res;
                  }
                };

                try {
                  digitalriverjs.createDropin(config).mount('dr-payment-info');
                } catch (error) {
                  $button.removeClass('sending').blur();
                  console.error(error.message);
                }

              case 87:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[21, 27], [33, 74], [44, 59, 63, 71], [64,, 66, 70]]);
      }));

      return function (_x2) {
        return _ref2.apply(this, arguments);
      };
    }());
    $(document).on('click', 'input[name="shopper-type"]', function () {
      var $taxIdFields = $('#checkout-tax-id-form .tax-id-field');
      $taxIdFields.each(function (index, element) {
        var $element = $(element);

        if ($('input[name="shopper-type"]:checked').val() === 'B') {
          if ($element.hasClass('Individual')) $element.addClass('d-none');
          if ($element.hasClass('Business')) $element.removeClass('d-none');
        } else {
          if ($element.hasClass('Individual')) $element.removeClass('d-none');
          if ($element.hasClass('Business')) $element.addClass('d-none');
        }
      });
    });
    $(document).on('input', '#checkout-tax-id-form > .tax-id-field input[type="text"]', function (e) {
      checkout_utils.validateVatNumber(e);
    });
    $('#checkout-tax-id-form').on('submit',
    /*#__PURE__*/
    function () {
      var _ref3 = asyncToGenerator_default()(
      /*#__PURE__*/
      regenerator_default.a.mark(function _callee3(e) {
        var $button, $section, $error, isTaxExempt, taxRegs, typeText, taxIds, regs, shopperType, $taxFields, _regs;

        return regenerator_default.a.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                e.preventDefault();
                $button = $(e.target).find('button[type="submit"]');
                $section = $('.dr-checkout__tax-id');
                $error = $section.find('.dr-err-field');
                isTaxExempt = sessionStorage.getItem('drgcTaxExempt') === 'true';
                taxRegs = sessionStorage.getItem('drgcTaxRegs') ? JSON.parse(sessionStorage.getItem('drgcTaxRegs')) : {};
                typeText = '';
                taxIds = '';

                if (!(isTaxExempt && Object.keys(taxRegs).length && taxRegs.customerType)) {
                  _context3.next = 15;
                  break;
                }

                regs = taxRegs.taxRegistrations;
                regs.forEach(function (element) {
                  taxIds = "".concat(taxIds, "<br>").concat(element.value);
                  ;
                });
                typeText = taxRegs.customerType === 'I' ? localizedText.personal_shopper_type : localizedText.business_shopper_type;
                $error.text('').hide();
                _context3.next = 28;
                break;

              case 15:
                $button.addClass('sending').blur();
                shopperType = $('input[name="shopper-type"]:checked').val();
                $taxFields = shopperType === 'I' ? $('.tax-id-field.Individual input[type="text"]') : $('.tax-id-field.Business input[type="text"]');
                _regs = [];

                if ($taxFields.length) {
                  $taxFields.each(function (index, element) {
                    var $element = $(element);

                    if (!$element.hasClass('d-none')) {
                      var key = $element.data('key');
                      var value = $element.val();
                      var taxRegObj = {};

                      if (value) {
                        taxRegObj['key'] = key;
                        taxRegObj['value'] = value;

                        _regs.push(taxRegObj);
                      }

                      taxIds = "".concat(taxIds, "<br>").concat(value);
                    }
                  });
                }

                typeText = $('input[name="shopper-type"]:checked').val() === 'I' ? localizedText.personal_shopper_type : localizedText.business_shopper_type;

                if (!_regs.length) {
                  _context3.next = 26;
                  break;
                }

                _context3.next = 24;
                return checkout_utils.applyTaxRegistration(shopperType, _regs).then(function (data) {
                  sessionStorage.setItem('drgcTaxRegs', JSON.stringify(data));
                  return commerce_api.getCart({
                    expand: 'all'
                  });
                }).then(function (data) {
                  var lineItems = data.cart.lineItems.lineItem;
                  var tax = data.cart.pricing.tax.value;
                  var isTaxExempt = CheckoutModule.isTaxExempt(lineItems);
                  sessionStorage.setItem('drgcTaxExempt', isTaxExempt);
                  checkout_utils.updateSummaryPricing(data.cart, drgc_params.isTaxInclusive === 'true');
                  $button.removeClass('sending').blur();

                  if (tax > 0) {
                    $error.text(localizedText.invalid_tax_id_error_msg).show();
                  } else {
                    $error.text('').hide();
                  }
                })["catch"](function (error) {
                  $error.text(localizedText.invalid_tax_id_error_msg).show();
                  $button.removeClass('sending').blur();
                  console.error(error);
                });

              case 24:
                _context3.next = 28;
                break;

              case 26:
                $button.removeClass('sending').blur();
                $error.text('').hide();

              case 28:
                $section.find('.dr-panel-result__text').html("".concat(typeText).concat(taxIds));

                if ($('.dr-checkout__el').index($section) > finishedSectionIdx) {
                  finishedSectionIdx = $('.dr-checkout__el').index($section);
                }

                CheckoutModule.moveToNextSection($section);

              case 31:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      return function (_x3) {
        return _ref3.apply(this, arguments);
      };
    }()); // Submit delivery form

    $('form#checkout-delivery-form').on('submit', function (e) {
      e.preventDefault();
      var $form = $(e.target);
      var $input = $(this).children().find('input:radio:checked').first();
      var $button = $(this).find('button[type="submit"]').toggleClass('sending').blur();
      var shippingOptionId = $input.data('id');
      $form.find('.dr-err-field').hide();
      commerce_api.applyShippingOption(shippingOptionId).then(function (data) {
        var $section = $('.dr-checkout__delivery');
        var resultText = "".concat($input.data('desc'));
        $button.removeClass('sending').blur();
        $section.find('.dr-panel-result__text').text(resultText);

        if ($('.dr-checkout__el').index($section) > finishedSectionIdx) {
          finishedSectionIdx = $('.dr-checkout__el').index($section);
        }

        CheckoutModule.moveToNextSection($section);
        checkout_utils.updateSummaryPricing(data.cart, drgc_params.isTaxInclusive === 'true');
      })["catch"](function (jqXHR) {
        $button.removeClass('sending').blur();
        CheckoutModule.displayAddressErrMsg(jqXHR, $form.find('.dr-err-field'));
      });
    });
    $('form#checkout-delivery-form').on('change', 'input[type="radio"]', function () {
      var $form = $('form#checkout-delivery-form');
      var shippingOptionId = $form.children().find('input:radio:checked').first().data('id');
      $('.dr-summary').addClass('dr-loading');
      commerce_api.applyShippingOption(shippingOptionId).then(function (data) {
        checkout_utils.updateSummaryPricing(data.cart, drgc_params.isTaxInclusive === 'true');
      })["catch"](function (jqXHR) {
        CheckoutModule.displayAddressErrMsg(jqXHR, $form.find('.dr-err-field'));
        $('.dr-summary').removeClass('dr-loading');
      });
    });
    $('form#checkout-payment-form').on('submit', function (e) {
      e.preventDefault();
      var $form = $('form#checkout-payment-form');
      $form.addClass('was-validated');

      if ($form[0].checkValidity() === false) {
        return false;
      }

      var formdata = $(this).serializeArray();
      var paymentPayload = {};
      $(formdata).each(function (index, obj) {
        paymentPayload[obj.name] = obj.value;
      });
      $('#dr-payment-failed-msg, #dr-checkout-err-field').text('').hide();

      if (paymentResponse.errors) {
        $('#dr-payment-failed-msg').text(paymentResponse.errors[0].message).show();
      } else {
        if (paymentResponse.source.state === 'chargeable' || paymentResponse.source.state === 'pending_funds') {
          var $section = $('.dr-checkout__payment');
          var label = paymentResponse.source.type === 'creditCard' ? "".concat(drgc_params.translations.credit_card_ending_label, " ").concat(paymentResponse.source.creditCard.lastFourDigits) : paymentResponse.source.type;
          paymentSourceId = paymentResponse.source.id;
          $section.find('.dr-panel-result__text').text(label);

          if ($('.dr-checkout__el').index($section) > finishedSectionIdx) {
            finishedSectionIdx = $('.dr-checkout__el').index($section);
          }

          CheckoutModule.moveToNextSection($section);
        }
      }
    });
    $('#checkout-confirmation-form button[type="submit"]').on('click', function (e) {
      e.preventDefault();

      if (!$('#dr-tAndC').prop('checked')) {
        $('#dr-checkout-err-field').text(localizedText.required_tandc_msg).show();
      } else {
        $('#dr-checkout-err-field').text('').hide();
        $('#dr-payment-failed-msg').hide();
        CheckoutModule.applyPaymentAndSubmitCart(paymentSourceId);
      }
    }); // show and hide sections

    $('.dr-accordion__edit').on('click', function (e) {
      e.preventDefault();
      var $section = $(e.target).parent().parent();
      var $allSections = $section.siblings().andSelf();
      var $finishedSections = $allSections.eq(finishedSectionIdx).prevAll().andSelf();
      var $activeSection = $allSections.filter($('.active'));

      if ($allSections.index($section) > $allSections.index($activeSection)) {
        return;
      }

      $finishedSections.addClass('closed');
      $activeSection.removeClass('active');
      $section.removeClass('closed').addClass('active');

      if ($section.find('.dr-address-book').length) {
        if ($section.hasClass('dr-checkout__billing') && $('#checkbox-billing').prop('checked')) {
          $section.find('.dr-address-book-btn').hide();
        } else {
          $section.find('.dr-address-book-btn').show();
        }
      }

      CheckoutModule.adjustColumns($section);
      checkout_utils.updateSummaryLabels();
    });
    $('#shipping-field-country').on('change', function () {
      if (this.value === 'US') {
        $('#shipping-field-state').parent('.form-group').removeClass('d-none');
      } else {
        $('#shipping-field-state').parent('.form-group').addClass('d-none');
      }
    });
    $('#billing-field-country').on('change', function () {
      if (this.value === 'US') {
        $('#billing-field-state').parent('.form-group').removeClass('d-none');
      } else {
        $('#billing-field-state').parent('.form-group').addClass('d-none');
      }
    });
    $('.dr-address-book-btn').on('click', function (e) {
      var addressType = $(e.target).hasClass('shipping') ? 'shipping' : 'billing';
      var $addressBook = $('.dr-address-book.' + addressType);

      if ($addressBook.is(':hidden')) {
        $(e.target).addClass('active');
        $addressBook.slideDown();
      } else {
        $(e.target).removeClass('active');
        $addressBook.slideUp();
      }
    });
    $(document).on('click', '.address', function (e) {
      var addressType = $('.dr-address-book-btn.shipping').hasClass('active') ? 'shipping' : 'billing';
      var $address = $(e.target).closest('.address');
      $('#' + addressType + '-field-first-name').val($address.data('firstName')).focus();
      $('#' + addressType + '-field-last-name').val($address.data('lastName')).focus();
      $('#' + addressType + '-field-address1').val($address.data('lineOne')).focus();
      $('#' + addressType + '-field-address2').val($address.data('lineTwo')).focus();
      $('#' + addressType + '-field-city').val($address.data('city')).focus();
      $('#' + addressType + '-field-state').val($address.data('state')).change();
      $('#' + addressType + '-field-zip').val($address.data('postalCode')).focus();
      $('#' + addressType + '-field-country').val($address.data('country')).change();
      $('#' + addressType + '-field-phone').val($address.data('phoneNumber')).focus().blur();
      $('.dr-address-book-btn.' + addressType).removeClass('active');
      $('.dr-address-book.' + addressType).slideUp();
      $('#checkbox-save-' + addressType).prop('checked', false);
    });
    $('.back-link a').click(function () {
      var loginUrl = new URL(drgc_params.loginUrl);
      var checkoutUrl = new URL(drgc_params.checkoutUrl);

      if (document.referrer && document.referrer.indexOf(loginUrl.pathname) === -1 && document.referrer.indexOf(checkoutUrl.pathname) === -1) {
        window.location.href = document.referrer;
      } else {
        window.location.href = drgc_params.cartUrl;
      }
    });
    $('.edit-link > span').on('click', function () {
      location.reload();
    });

    if (isLoggedIn && requestShipping) {
      $('.dr-address-book.billing > .overflowContainer').clone().appendTo('.dr-address-book.shipping');
    }

    if (!$('#checkbox-billing').prop('checked')) $('#checkbox-billing').prop('checked', false).change();

    if ($('input[name=email]').val() && $('#checkout-email-form').length && $('#dr-panel-email-result').is(':empty')) {
      $('#checkout-email-form').submit();
    }

    if (cartData.totalItemsInCart) {
      checkout_utils.getCountryOptionsFromGC(requestShipping).then(function () {
        $('#shipping-field-country, #billing-field-country').trigger('change');
      });
    } //floating labels


    float_label.init();
    checkout_utils.applyLegalLinks(digitalriverjs);
    $('#checkout-email-form button[type=submit]').prop('disabled', false);
    if ($('#checkout-tax-id-form').length) CheckoutModule.initShopperTypeRadio();
  }
});
/* harmony default export */ var public_checkout = (CheckoutModule);
// CONCATENATED MODULE: ./assets/js/public/public-common.js


var CommonModule = {};

(function (w) {
  w.URLSearchParams = w.URLSearchParams || function (searchString) {
    var self = this;
    self.searchString = searchString;

    self.get = function (name) {
      var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(self.searchString);

      if (results == null) {
        return null;
      } else {
        return decodeURI(results[1]) || 0;
      }
    };
  };
})(window);

window.onpageshow = function (event) {
  if (event.persisted || window.performance && window.performance.navigation.type === 2) {
    window.location.reload();
  }
};

jQuery(document).ready(function ($) {
  $('input[type=text]:required').on('input', function (e) {
    var elem = e.target;
    elem.setCustomValidity(elem.value && !$.trim(elem.value) ? drgc_params.translations.required_field_msg : '');

    if (elem.validity.valueMissing) {
      $(elem).next('.invalid-feedback').text(drgc_params.translations.required_field_msg);
    } else if (elem.validity.customError) {
      $(elem).next('.invalid-feedback').text(elem.validationMessage);
    }
  });
  $('#dr-locale-selector .dr-current-locale, #dr-currency-selector, .dr-selected-currency').click(function (e) {
    e.preventDefault();
  });
  $('#dr-locale-selector .dr-other-locales a').click(function (e) {
    e.preventDefault();
    var $this = $(e.target);
    var targetLocale = $this.data('dr-locale');
    var params = new URLSearchParams(location.search);
    $('body').addClass('dr-loading');
    $('ul.dr-other-locales').hide();
    params.set('locale', targetLocale);
    window.location.search = params.toString();
  });
  $('#dr-currency-selector .dr-other-currencies a').click(function (e) {
    e.preventDefault();
    var $this = $(e.target);
    var targetCurrency = $this.data('dr-currency');
    if ($('.dr-cart__content').length) $('.dr-cart__content').addClass('dr-loading');else $('body').addClass('dr-loading');
    $('ul.dr-other-currencies').hide();
    commerce_api.updateShopper({
      currency: targetCurrency
    }).then(function () {
      window.location.reload(true);
    })["catch"](function (jqXHR) {
      checkout_utils.apiErrorHandler(jqXHR);
    });
  });

  if ($('.dr-widget-wrapper > #dr-mobile-mini-cart').length) {
    var $mobileMiniCart = $('#dr-mobile-mini-cart');
    var selectors = ['body > header', 'div > header', 'div > div > header'];
    var targetSelector = selectors.find(function (element) {
      return $(element).length > 0;
    });

    if (targetSelector !== undefined) {
      $(targetSelector).after($mobileMiniCart);
    } else {
      $('#dr-minicart').show();
    }
  }

  if (!$('#dr-mobile-mini-cart').length) {
    $('#dr-minicart').show();
  }
});
/* harmony default export */ var public_common = (CommonModule);
// CONCATENATED MODULE: ./assets/js/public/public-login.js
/* global drgc_params, iFrameResize */

/* eslint-disable no-alert, no-console */
var LoginModule = function ($) {
  var validatePassword = function validatePassword(e) {
    var elem = e.target;
    var customMsgArr = [];
    var customMsg = '';

    if (elem.value.length < 8 || elem.value.length > 32) {
      customMsgArr.push(drgc_params.translations.password_length_error_msg);
    }

    if (!/[A-Z]/.test(elem.value)) {
      customMsgArr.push(drgc_params.translations.password_uppercase_error_msg);
    }

    if (!/[a-z]/.test(elem.value)) {
      customMsgArr.push(drgc_params.translations.password_lowercase_error_msg);
    }

    if (!/[0-9]/.test(elem.value)) {
      customMsgArr.push(drgc_params.translations.password_number_error_msg);
    }

    if (!/[!_@]/.test(elem.value)) {
      customMsgArr.push(drgc_params.translations.password_char_error_msg);
    }

    if (!/^[a-zA-Z0-9!_@]+$/.test(elem.value)) {
      customMsgArr.push(drgc_params.translations.password_banned_char_error_msg);
    }

    customMsg = customMsgArr.join(' ');
    elem.setCustomValidity(customMsg);

    if (elem.validity.valueMissing) {
      $(elem).next('.invalid-feedback').text(drgc_params.translations.required_field_msg);
    } else if (elem.validity.customError) {
      $(elem).next('.invalid-feedback').text(elem.validationMessage);
    } else {
      $(elem).next('.invalid-feedback').text('');
    }
  };

  var checkoutAsGuest = function checkoutAsGuest(e) {
    e.preventDefault();
    var $btn = $(e.target);
    if ($btn.hasClass('sending')) return;
    $btn.toggleClass('sending').blur();
    var data = {
      action: 'drgc_checkout_as_guest',
      nonce: drgc_params.ajaxNonce
    };
    $.ajax({
      type: 'POST',
      url: drgc_params.ajaxUrl,
      data: data,
      success: function success() {
        LoginModule.redirectAfterAuth(false);
      }
    });
  };

  var logout = function logout(e) {
    e.preventDefault();
    if ($(e.target).data('processing')) return;
    $(e.target).toggleClass('sending').data('processing', true).blur();
    var data = {
      action: 'drgc_logout',
      nonce: drgc_params.ajaxNonce
    };
    $('body').addClass('dr-loading');
    $.post(drgc_params.ajaxUrl, data, function (response) {
      if (sessionStorage.getItem('drgc_upsell_decline')) {
        sessionStorage.removeItem('drgc_upsell_decline');
      }

      location.reload();
    });
  };

  var redirectAfterAuth = function redirectAfterAuth(isLoggedIn, locale) {
    var cartUrl = new URL(drgc_params.cartUrl);
    var checkoutUrl = new URL(drgc_params.checkoutUrl);
    var targetHref = '';

    if (document.referrer.indexOf(cartUrl.pathname) > -1 || document.referrer.indexOf(checkoutUrl.pathname) > -1) {
      targetHref = drgc_params.checkoutUrl;
    } else if (isLoggedIn) {
      targetHref = drgc_params.accountUrl;
    } else if (!document.referrer) {
      targetHref = drgc_params.homeUrl;
    } else {
      targetHref = document.referrer;
    }

    var targetUrl = new URL(targetHref);
    if (locale) targetUrl.searchParams.set('locale', locale);
    window.location.href = targetUrl.toString();
  };

  var autoLogout = function autoLogout(url) {
    var data = {
      action: 'drgc_logout',
      nonce: drgc_params.ajaxNonce
    };
    $('body').addClass('dr-loading');
    $.post(drgc_params.ajaxUrl, data, function () {
      if (sessionStorage.getItem('drgc_upsell_decline')) {
        sessionStorage.removeItem('drgc_upsell_decline');
      }

      window.location.href = url;
    });
  };

  return {
    validatePassword: validatePassword,
    checkoutAsGuest: checkoutAsGuest,
    logout: logout,
    redirectAfterAuth: redirectAfterAuth,
    autoLogout: autoLogout
  };
}(jQuery);

jQuery(document).ready(function ($) {
  var ajaxUrl = drgc_params.ajaxUrl;
  $('#dr_login_form').on('submit', function (e) {
    e.preventDefault();
    var $form = $('#dr_login_form');
    $form.addClass('was-validated');

    if ($form.data('processing')) {
      return false;
    }

    if ($form[0].checkValidity() === false) {
      return false;
    }

    var but = $form.find('[type="submit"]').toggleClass('sending').blur();
    $form.data('processing', true);
    $('.dr-form-error-msg').text('');
    var params = new URL(window.location).searchParams;
    var locale = params.get('locale');
    var data = {
      action: 'drgc_login',
      nonce: drgc_params.ajaxNonce,
      username: $('.dr-login-form input[name=username]').val(),
      password: $('.dr-login-form input[name=password]').val(),
      locale: locale
    };
    $.post(ajaxUrl, data, function (response) {
      if (response.success) {
        LoginModule.redirectAfterAuth(true, response.data.locale);
      } else {
        $form.data('processing', false);
        but.removeClass('sending').blur();

        if (response.data.hasOwnProperty('error_description')) {
          $('.dr-form-error-msg').text(response.data.error_description);
        }

        if (Object.prototype.toString.call(response.data) == '[object String]') {
          $('.dr-form-error-msg').text(response.data);
        }

        $('.dr-form-error-msg').css('color', 'red');
      }
    });
  });
  $('.drgc-wrapper').on('click', '.dr-logout', function (e) {
    LoginModule.logout(e);
  });
  $('#menu-item-logout a').on('click', function (e) {
    LoginModule.logout(e);
  });
  $('#dr_login_form, #dr-signup-form, #dr-pass-reset-form, #checkout-email-form').find('input[type=email]').on('input', function (e) {
    var elem = e.target;

    if (elem.validity.valueMissing) {
      $(elem).next('.invalid-feedback').text(drgc_params.translations.required_field_msg);
    } else if (elem.validity.typeMismatch) {
      $(elem).next('.invalid-feedback').text(drgc_params.translations.invalid_email_msg);
    }
  });
  $('#dr-signup-form input[name=upw], #dr-confirm-password-reset-form input[name=password]').on('input', function (e) {
    LoginModule.validatePassword(e);
  });
  $('#dr-signup-form input[type=password], #dr-confirm-password-reset-form input[type=password]').on('input', function (e) {
    var $form = $(e.target).closest('form');
    var pw = $form.find('input[type=password]')[0];
    var cpw = $form.find('input[type=password]')[1];
    cpw.setCustomValidity(pw.value !== cpw.value ? drgc_params.translations.password_confirm_error_msg : '');

    if (cpw.validity.valueMissing) {
      $(cpw).next('.invalid-feedback').text(drgc_params.translations.required_field_msg);
    } else if (cpw.validity.customError) {
      $(cpw).next('.invalid-feedback').text(cpw.validationMessage);
    } else {
      $(cpw).next('.invalid-feedback').text('');
    }
  });
  $('.dr-signup-form').on('submit', function (e) {
    e.preventDefault();
    var $form = $(e.target);
    $form.addClass('was-validated');

    if ($form.data('processing')) {
      return false;
    }

    if ($form[0].checkValidity() === false) {
      return false;
    }

    var $button = $form.find('button[type=submit]').toggleClass('sending').blur();
    $form.data('processing', true);
    $('.dr-signin-form-error').text('');
    var data = {
      action: 'drgc_signup',
      nonce: drgc_params.ajaxNonce,
      first_name: $('.dr-signup-form input[name=first_name]').val(),
      last_name: $('.dr-signup-form input[name=last_name]').val(),
      username: $('.dr-signup-form input[name=uemail]').val(),
      password: $('.dr-signup-form input[name=upw]').val(),
      confirm_password: $('.dr-signup-form input[name=upw2]').val()
    };
    $.post(ajaxUrl, data, function (response) {
      if (response.success) {
        LoginModule.redirectAfterAuth(true);
      } else {
        $form.data('processing', false);
        $button.removeClass('sending').blur();

        if (response.data && response.data.errors && response.data.errors.error[0].hasOwnProperty('description')) {
          $('.dr-signin-form-error').text(response.data.errors.error[0].description);
        } else if (Object.prototype.toString.call(response.data) == '[object String]') {
          $('.dr-signin-form-error').text(response.data);
        } else {
          $('.dr-signin-form-error').text(drgc_params.translations.undefined_error_msg);
        }

        $('.dr-signin-form-error').css('color', 'red');
      }
    });
  });
  $('#dr-guest-btn').click(function (e) {
    LoginModule.checkoutAsGuest(e);
  });
  $('#dr-pass-reset-form').on('submit', function (e) {
    e.preventDefault();
    var $form = $(e.target);
    var $errMsg = $('#dr-reset-pass-error').text('').hide();
    $form.addClass('was-validated');

    if ($form[0].checkValidity() === false) {
      return false;
    }

    var $button = $form.find('button[type=submit]').addClass('sending').blur();
    var data = {
      action: 'drgc_pass_reset_request',
      nonce: drgc_params.ajaxNonce
    };
    $.each($form.serializeArray(), function (index, obj) {
      data[obj.name] = obj.value;
    });

    if (data['email'] !== data['email-confirm']) {
      $errMsg.text(drgc_params.translations.email_confirm_error_msg).show();
      $button.removeClass('sending').blur();
      return;
    }

    $.post(ajaxUrl, data, function (response) {
      if (!response.success) {
        $errMsg.text(response.data[0].message).show();
      } else {
        $('#drResetPasswordModalBody').html('').html("\n                    <h3>".concat(drgc_params.translations.password_reset_title, "</h3>\n                    <p>").concat(drgc_params.translations.password_reset_msg, "</p>\n                "));
        $button.hide();
      }

      $button.removeClass('sending').blur();
    });
  });
  $('form.dr-confirm-password-reset-form').on('submit', function (e) {
    e.preventDefault();
    var $form = $(this);
    var $errMsg = $form.find('.dr-form-error-msg').text('').hide();
    $form.addClass('was-validated');

    if ($form[0].checkValidity() === false) {
      return false;
    }

    var searchParams = new URLSearchParams(window.location.search);

    if (!searchParams.get('key') || !searchParams.get('login')) {
      $errMsg.text(drgc_params.translations.undefined_error_msg).show();
      return;
    }

    var data = {
      action: 'drgc_reset_password',
      nonce: drgc_params.ajaxNonce,
      key: searchParams.get('key'),
      login: searchParams.get('login')
    };
    $.each($form.serializeArray(), function (index, obj) {
      data[obj.name] = obj.value;
    });
    var $button = $form.find('button[type=submit]').addClass('sending').blur();
    $.post(ajaxUrl, data, function (response) {
      if (!response.success) {
        if (response.data) $errMsg.text(response.data).show();
      } else {
        $('section.reset-password').html('').html("\n                    <h3>".concat(drgc_params.translations.password_saved_title, "</h3>\n                    <p>").concat(drgc_params.translations.password_saved_msg, "</p>\n                ")).css('color', 'green');
        setTimeout(function () {
          return location.replace("".concat(location.origin).concat(location.pathname));
        }, 2000);
      }

      $button.removeClass('sending').blur();
    });
  });

  if ($('section.logged-in').length) {
    toggleCartBtns();
  }

  function toggleCartBtns() {
    if ($('section.dr-login-sections__section.logged-in').length && !drgc_params.cart.cart.lineItems.hasOwnProperty('lineItem')) {
      $('section.dr-login-sections__section.logged-in > div').hide();
    }
  }
});
/* harmony default export */ var public_login = (LoginModule);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/toConsumableArray.js
var toConsumableArray = __webpack_require__(9);
var toConsumableArray_default = /*#__PURE__*/__webpack_require__.n(toConsumableArray);

// CONCATENATED MODULE: ./assets/js/public/public-pdp.js


/* global drgc_params, iFrameResize */

/* eslint-disable no-alert, no-console */



var PdpModule = function ($) {
  var localizedText = drgc_params.translations;

  var bindVariationPrice = function bindVariationPrice(pricing, $target) {
    if (!pricing.listPrice || !pricing.salePriceWithQuantity) return;

    if (pricing.listPrice.value > pricing.salePriceWithQuantity.value) {
      $target.data('old-price', pricing.formattedListPrice);
      $target.data('price', pricing.formattedSalePriceWithQuantity);
    } else {
      $target.data('price', pricing.formattedSalePriceWithQuantity);
    }
  };

  var bindVariationInventoryStatus = function bindVariationInventoryStatus(purchasable, $target) {
    $target.data('purchasable', purchasable);
  };

  var selectVariation = function selectVariation($target) {
    if ($target.is('input[type=radio]')) $target.prop('checked', true).trigger('click');else $target.prop('selected', true).trigger('change');
  };

  var displayRealTimePricing = function displayRealTimePricing(pricing, option, $target) {
    if (!pricing.listPrice || !pricing.salePriceWithQuantity) {
      $target.text(''); // no pricing data

      return;
    }

    if (pricing.listPrice.value > pricing.salePriceWithQuantity.value) {
      $target.html("\n                <".concat(option.listPriceDiv, " class=\"").concat(option.listPriceClass(), "\">").concat(pricing.formattedListPrice, "</").concat(option.listPriceDiv, ">\n                <").concat(option.salePriceDiv, " class=\"").concat(option.salePriceClass(), "\">").concat(pricing.formattedSalePriceWithQuantity, "</").concat(option.salePriceDiv, ">\n            "));
    } else {
      $target.html("\n                <".concat(option.priceDiv, " class=\"").concat(option.priceClass(), "\">").concat(pricing.formattedSalePriceWithQuantity, "</").concat(option.priceDiv, ">\n            "));
    }
  };

  var displayRealTimeBuyBtn = function displayRealTimeBuyBtn(purchasable, isRedirectBuyBtn, $target) {
    var isOutOfStock = purchasable === 'false';
    $target.prop('disabled', isOutOfStock).text(isOutOfStock ? localizedText.out_of_stock : isRedirectBuyBtn ? localizedText.buy_now : localizedText.add_to_cart).addClass(isRedirectBuyBtn ? 'dr-redirect-buy-btn' : '');
  };

  var updateProductItem = function updateProductItem($target, product) {
    var $loadingIcon = $target.find('.dr-loading');
    var $productInfo = $target.find('.dr-pd-info');
    var $title = $target.find('.dr-pd-item-title');
    var $thumbnail = $target.find('.dr-pd-item-thumbnail > img');
    var thumbnail = product.thumbnailImage || '';
    $title.text(product.displayName);
    $thumbnail.attr('src', thumbnail).attr('alt', product.displayName);
    $loadingIcon.hide();
    $productInfo.show();
  };

  return {
    bindVariationPrice: bindVariationPrice,
    bindVariationInventoryStatus: bindVariationInventoryStatus,
    selectVariation: selectVariation,
    displayRealTimePricing: displayRealTimePricing,
    displayRealTimeBuyBtn: displayRealTimeBuyBtn,
    updateProductItem: updateProductItem
  };
}(jQuery);

jQuery(document).ready(function ($) {
  var localizedText = drgc_params.translations;
  var lineItems = [];

  function toggleMiniCartDisplay() {
    var $miniCartDisplay = $('.dr-minicart-display');

    if ($miniCartDisplay.is(':visible')) {
      $miniCartDisplay.fadeOut(200);
    } else {
      $miniCartDisplay.fadeIn(200);
    }
  }

  function openMiniCartDisplay() {
    var $miniCartDisplay = $('.dr-minicart-display');

    if (!$miniCartDisplay.is(':visible')) {
      $miniCartDisplay.fadeIn(200);
    }
  }

  function displayMiniCart(cart) {
    var $display = $('.dr-minicart-display');
    var $body = $('<div class="dr-minicart-body"></div>');
    var $footer = $('<div class="dr-minicart-footer"></div>');
    lineItems = cart.lineItems && cart.lineItems.lineItem ? cart.lineItems.lineItem : [];
    $('.dr-minicart-count').text(cart.totalItemsInCart);
    $('.dr-minicart-header').siblings().remove();

    if ($('section.dr-login-sections__section.logged-in').length && cart.totalItemsInCart == 0) {
      $('section.dr-login-sections__section.logged-in > div').hide();
    }

    if (!lineItems.length) {
      var emptyMsg = "<p class=\"dr-minicart-empty-msg\">".concat(localizedText.empty_cart_msg, "</p>");
      $body.append(emptyMsg);
      $display.append($body);
    } else {
      var params = new URL(window.location).searchParams;
      var locale = params.get('locale') || drgc_params.drLocale;
      var isTaxInclusive = locale !== 'en_US';
      var forceExclTax = drgc_params.forceExclTax === 'true';
      var taxSuffixLabel = isTaxInclusive ? forceExclTax ? ' ' + localizedText.excl_vat_label : ' ' + localizedText.incl_vat_label : '';
      var miniCartLineItems = '<ul class="dr-minicart-list">';
      var miniCartSubtotal = "<p class=\"dr-minicart-subtotal\"><label>".concat(localizedText.subtotal_label + taxSuffixLabel, "</label><span>").concat(cart.pricing.formattedSubtotal, "</span></p>");
      var miniCartViewCartBtn = "<a class=\"dr-btn\" id=\"dr-minicart-view-cart-btn\" href=\"".concat(drgc_params.cartUrl, "\">").concat(localizedText.view_cart_label, "</a>");
      lineItems.forEach(function (li) {
        var productId = li.product.uri.replace("".concat(commerce_api.apiBaseUrl, "/me/products/"), '');
        var listPrice = Number(li.pricing.listPriceWithQuantity.value);
        var salePrice = Number(li.pricing.salePriceWithQuantity.value);
        var formattedSalePrice = li.pricing.formattedSalePriceWithQuantity;
        var formattedListPrice = li.pricing.formattedListPriceWithQuantity;
        var priceContent = '';

        if (listPrice > salePrice) {
          priceContent = "<del class=\"dr-strike-price\">".concat(formattedListPrice, "</del><span class=\"dr-sale-price\">").concat(formattedSalePrice, "</span>");
        } else {
          priceContent = formattedSalePrice;
        }

        var miniCartLineItem = "\n                <li class=\"dr-minicart-item clearfix\">\n                    <div class=\"dr-minicart-item-thumbnail\">\n                        <img src=\"".concat(li.product.thumbnailImage, "\" alt=\"").concat(li.product.displayName, "\" />\n                    </div>\n                    <div class=\"dr-minicart-item-info\" data-product-id=\"").concat(productId, "\">\n                        <span class=\"dr-minicart-item-title\">").concat(li.product.displayName, "</span>\n                        <span class=\"dr-minicart-item-qty\">").concat(localizedText.qty_label, ".").concat(li.quantity, "</span>\n                        <p class=\"dr-pd-price dr-minicart-item-price\">").concat(priceContent, "</p>\n                    </div>\n                    <a href=\"#\" class=\"dr-minicart-item-remove-btn\" aria-label=\"Remove\" data-line-item-id=\"").concat(li.id, "\">").concat(localizedText.remove_label, "</a>\n                </li>");
        miniCartLineItems += miniCartLineItem;
      });
      miniCartLineItems += '</ul>';
      $body.append(miniCartLineItems, miniCartSubtotal);
      $footer.append(miniCartViewCartBtn);
      $display.append($body, $footer);
    }
  }

  (function () {
    if ($('#dr-minicart'.length)) {
      displayMiniCart(drgc_params.cart.cart);
    }
  })();

  $('.dr-minicart-toggle, .dr-minicart-close-btn').click(function (e) {
    e.preventDefault();
    toggleMiniCartDisplay();
  });
  $('body').on('click', '.dr-buy-btn', function (e) {
    e.preventDefault();
    var $this = $(e.target);

    if ($this.hasClass('dr-redirect-buy-btn')) {
      var pdLink = $this.closest('.dr-pd-item, .c-product-card').find('a').attr('href');
      window.location.href = pdLink;
    } else {
      var productID = $this.attr('data-product-id') ? $this.attr('data-product-id').toString() : '';
      var existingProducts = lineItems.map(function (li) {
        var uri = li.product.uri;
        var id = uri.replace("".concat(commerce_api.apiBaseUrl, "/me/products/"), '');
        return {
          id: id,
          quantity: li.quantity
        };
      });
      var quantity = 1; // PD page

      if ($('#dr-pd-offers').length) {
        quantity = parseInt($('#dr-pd-qty').val(), 10);
      }

      existingProducts.forEach(function (pd) {
        if (pd.id === productID) {
          quantity += pd.quantity;
        }
      });
      var queryObj = {
        productId: productID,
        quantity: quantity,
        testOrder: drgc_params.testOrder,
        expand: 'all'
      };
      commerce_api.updateCart(queryObj).then(function (res) {
        displayMiniCart(res.cart);
        openMiniCartDisplay();
      })["catch"](function (jqXHR) {
        return checkout_utils.apiErrorHandler(jqXHR);
      });
    }
  });
  $('.dr-minicart-display').on('click', '.dr-minicart-item-remove-btn', function (e) {
    e.preventDefault();
    var lineItemID = $(e.target).data('line-item-id');
    $('.dr-minicart-display').addClass('dr-loading');
    commerce_api.removeLineItem(lineItemID).then(function () {
      return commerce_api.getCart();
    }).then(function (res) {
      $('.dr-minicart-display').removeClass('dr-loading');
      displayMiniCart(res.cart);
    })["catch"](function (jqXHR) {
      return checkout_utils.apiErrorHandler(jqXHR);
    });
  });
  $('span.dr-pd-qty-plus, span.dr-pd-qty-minus').on('click', function (e) {
    // Get current quantity values
    var $qty = $('#dr-pd-qty');
    var val = parseInt($qty.val(), 10);
    var max = parseInt($qty.attr('max'), 10);
    var min = parseInt($qty.attr('min'), 10);
    var step = parseInt($qty.attr('step'), 10);

    if (val) {
      // Change the value if plus or minus
      if ($(e.currentTarget).is('.dr-pd-qty-plus')) {
        if (max && max <= val) {
          $qty.val(max);
        } else {
          $qty.val(val + step);
        }
      } else if ($(e.currentTarget).is('.dr-pd-qty-minus')) {
        if (min && min >= val) {
          $qty.val(min);
        } else if (val > 1) {
          $qty.val(val - step);
        }
      }
    } else {
      $qty.val('1');
    }
  });
  $('.dr_prod-variations select').on('change', function (e) {
    e.preventDefault();
    var $selectedOption = $(this).children('option:selected');
    var varId = $(this).val();
    var price = $selectedOption.data('price');
    var listPriceValue = $selectedOption.data('old-price');
    var purchasable = $selectedOption.data('purchasable');
    var $prodPrice = $('.single-dr_product .dr-pd-content .dr-pd-price');
    var $buyBtn = $('.dr-buy-btn');
    var prodPriceHtml = '';
    $buyBtn.attr('data-product-id', varId);
    if (listPriceValue) prodPriceHtml = '<del class="dr-strike-price">' + listPriceValue + '</del>';
    prodPriceHtml += '<strong class="dr-sale-price">' + price + '</strong>';
    $prodPrice.html(prodPriceHtml);
    PdpModule.displayRealTimeBuyBtn(purchasable, false, $buyBtn);
    $('.dr-pd-img').attr('src', $selectedOption.data('thumbnail-url'));
  });
  $('input[type=radio][name=variation]').on('click', function (e) {
    var purchasable = $(e.target).data('purchasable');
    var $buyBtn = $('form.product-detail .dr-buy-btn');
    PdpModule.displayRealTimeBuyBtn(purchasable, false, $buyBtn);
  });
  $("iframe[name^='controller-']").css('display', 'none'); // Real-time pricing & inventory status option (for DR child/non-DR child themes)

  var pdDisplayOption = {};
  var isPdCard = false;

  if ($('#digital-river-child-css').length) {
    // DR child theme
    pdDisplayOption = {
      $card: $('.c-product-card'),
      $variationOption: $('input[type=radio][name=variation]'),
      $singlePDBuyBtn: $('form.product-detail .dr-buy-btn'),
      priceDivSelector: function priceDivSelector() {
        return isPdCard ? '.c-product-card__bottom__price' : '.product-pricing';
      },
      listPriceDiv: 'span',
      listPriceClass: function listPriceClass() {
        return isPdCard ? 'old-price' : 'product-price-old';
      },
      salePriceDiv: 'span',
      salePriceClass: function salePriceClass() {
        return isPdCard ? 'new-price' : 'product-price';
      },
      priceDiv: 'span',
      priceClass: function priceClass() {
        return isPdCard ? 'price' : 'product-price';
      }
    };
  } else {
    // non-DR child theme
    pdDisplayOption = {
      $card: $('.dr-pd-item'),
      $variationOption: $('select[name=dr-variation] option'),
      $singlePDBuyBtn: $('form#dr-pd-form .dr-buy-btn'),
      priceDivSelector: function priceDivSelector() {
        return isPdCard ? '.dr-pd-item-price' : '.dr-pd-price';
      },
      listPriceDiv: 'del',
      listPriceClass: function listPriceClass() {
        return 'dr-strike-price';
      },
      salePriceDiv: 'strong',
      salePriceClass: function salePriceClass() {
        return 'dr-sale-price';
      },
      priceDiv: 'strong',
      priceClass: function priceClass() {
        return 'dr-sale-price';
      }
    };
  } // Real-time pricing & inventory status for single PD page (including variation/base products)


  if ($('.single-dr_product').length && !$('.dr-prod-variations select').length) {
    isPdCard = false;
    $(pdDisplayOption.priceDivSelector()).text(localizedText.loading_msg);
    pdDisplayOption.$singlePDBuyBtn.text(localizedText.loading_msg).prop('disabled', true);

    if (pdDisplayOption.$variationOption && pdDisplayOption.$variationOption.length) {
      // variation product
      pdDisplayOption.$variationOption.each(function (idx, elem) {
        var $option = $(elem);
        var productID = $option.val();
        if (!productID) return;
        commerce_api.getProduct(productID, {
          expand: 'inventoryStatus'
        }).then(function (res) {
          var purchasable = res.product.inventoryStatus.productIsInStock;
          isPdCard = false; // to avoid being overwritten by concurrency

          PdpModule.bindVariationPrice(res.product.pricing, $option);
          PdpModule.bindVariationInventoryStatus(purchasable, $option);
          if (idx === 0) PdpModule.selectVariation($option);
        });
      });
    } else {
      // base product
      var productID = pdDisplayOption.$singlePDBuyBtn.data('product-id');

      var _$priceDiv = $(pdDisplayOption.priceDivSelector()).text(localizedText.loading_msg);

      if (!productID) return;
      commerce_api.getProduct(productID, {
        expand: 'inventoryStatus'
      }).then(function (res) {
        var purchasable = res.product.inventoryStatus.productIsInStock;
        isPdCard = false; // to avoid being overwritten by concurrency

        PdpModule.displayRealTimePricing(res.product.pricing, pdDisplayOption, _$priceDiv);
        PdpModule.displayRealTimeBuyBtn(purchasable, false, pdDisplayOption.$singlePDBuyBtn);
      });
    }
  } // Real-time pricing & inventory status for PD card (category page & recommended products)


  if (pdDisplayOption.$card && pdDisplayOption.$card.length) {
    isPdCard = true;
    pdDisplayOption.$card.each(function (idx, elem) {
      var $currentElem = $(elem);
      var $priceDiv = $currentElem.find(pdDisplayOption.priceDivSelector()).text(localizedText.loading_msg);
      var $buyBtn = $currentElem.find('.dr-buy-btn').text(localizedText.loading_msg).prop('disabled', true);
      var productID = $buyBtn.data('product-id');
      var parentId = $buyBtn.data('parent-id');
      if (!productID) return;

      if (parentId) {
        commerce_api.getProduct(parentId, {
          fields: 'variations',
          expand: 'all'
        }).then(function (res) {
          var variations = res.product.variations.product;
          var isInStock = variations.some(function (elem) {
            return elem.inventoryStatus.availableQuantity > 0;
          });
          var currentProduct = variations[0];
          isPdCard = true; // to avoid being overwritten by concurrency

          PdpModule.displayRealTimePricing(currentProduct.pricing, pdDisplayOption, $priceDiv);
          PdpModule.displayRealTimeBuyBtn(isInStock.toString(), true, $buyBtn);
          PdpModule.updateProductItem($currentElem, currentProduct);
        });
      } else {
        commerce_api.getProduct(productID, {
          expand: 'inventoryStatus'
        }).then(function (res) {
          var currentProduct = res.product;
          var purchasable = currentProduct.inventoryStatus.productIsInStock;
          isPdCard = true; // to avoid being overwritten by concurrency

          PdpModule.displayRealTimePricing(currentProduct.pricing, pdDisplayOption, $priceDiv);
          PdpModule.displayRealTimeBuyBtn(purchasable, false, $buyBtn);
          PdpModule.updateProductItem($currentElem, currentProduct);
        });
      }
    });
  }

  var $varSelects = $('.dr-prod-variations select');
  var varSelectCount = $varSelects.length;
  var $priceDiv = $(pdDisplayOption.priceDivSelector());
  var $buyBtn = $('.dr-buy-btn');

  if (varSelectCount) {
    $varSelects.children('option:first').prop('selected', true);
    $varSelects.first().prop('disabled', false);
    $buyBtn.prop('disabled', true);
  }

  $('.dr-prod-variations select').on('change', function (e) {
    e.preventDefault();
    $priceDiv.text('');
    $buyBtn.prop('disabled', true);
    var selectedVal = $(e.target).val();
    var index = $(e.target).data('index');
    var selectedValues = [];
    var allSelectedVal = {};
    var filterObj = Object.assign({}, drgcVarAttrs);
    var i = index;
    var j = 0;

    while (i < varSelectCount) {
      var $next = $varSelects.eq(i + 1);

      if ($next.length) {
        $next.prop('disabled', true).children('option:first').prop('selected', true);
      }

      while (j < index) {
        selectedValues[j] = $varSelects.eq(j).val();
        j++;
      }

      selectedValues[index] = selectedVal;
      selectedValues.forEach(function (element, i) {
        var attr = $varSelects.eq(i).data('var-attribute');
        var deleteItems = Object.keys(filterObj).filter(function (key) {
          return filterObj[key][attr] !== element;
        });
        deleteItems.forEach(function (key) {
          delete filterObj[key];
        });
      });
      i++;
    }

    if (index < varSelectCount - 1 && selectedVal) {
      var $nextSelect = $varSelects.eq(index + 1);
      var nextAttr = $nextSelect.data('var-attribute');

      var options = toConsumableArray_default()(new Set(Object.keys(filterObj).map(function (key) {
        return filterObj[key][nextAttr];
      })));

      $nextSelect.children('option:not(:first-child)').remove();
      $.each(options, function (key, value) {
        $nextSelect.append($('<option></option>').attr('value', value).text(value));
      });
      $nextSelect.prop('disabled', false);
    }

    $varSelects.children('option:selected').each(function (index, element) {
      allSelectedVal[$(element).parent().data('var-attribute')] = $(element).val();
    });
    var productId = Object.keys(drgcVarAttrs).find(function (key) {
      return JSON.stringify(drgcVarAttrs[key]) === JSON.stringify(allSelectedVal);
    });

    if (productId) {
      $priceDiv.text(localizedText.loading_msg);
      commerce_api.getProduct(productId, {
        expand: 'inventoryStatus'
      }).then(function (res) {
        var currentProduct = res.product;
        var purchasable = currentProduct.inventoryStatus.productIsInStock;
        PdpModule.displayRealTimePricing(currentProduct.pricing, pdDisplayOption, $priceDiv);
        PdpModule.displayRealTimeBuyBtn(purchasable, false, $buyBtn);
      });
      $buyBtn.attr('data-product-id', productId).prop('disabled', false);
    }
  });
});
/* harmony default export */ var public_pdp = (PdpModule);
// CONCATENATED MODULE: ./assets/js/public/public-thank-you.js


var ThankYouModule = function ($) {}(jQuery);

jQuery(document).ready(function ($) {
  if ($('.dr-thank-you-wrapper:visible').length) {
    var localizedText = drgc_params.translations;
    $(document).on('click', '#print-button', function () {
      window.print();
    });
    $(document).on('click', '#my-subs-btn', function () {
      window.location.href = drgc_params.mySubsUrl;
    });
    var digitalriverjs = new DigitalRiver(drgc_params.digitalRiverKey);
    checkout_utils.applyLegalLinks(digitalriverjs);

    if (drgc_params.order && drgc_params.order.order) {
      checkout_utils.updateSummaryPricing(drgc_params.order.order, drgc_params.isTaxInclusive === 'true');
    }

    if ($('#dr-order-vat-info').length && sessionStorage.getItem('drgcTaxRegs')) {
      var taxRegs = JSON.parse(sessionStorage.getItem('drgcTaxRegs'));
      var shopperType = taxRegs.customerType === 'B' ? localizedText.business_shopper_type : localizedText.personal_shopper_type;
      var taxIds = taxRegs.taxRegistrations;
      var vatInfoHtml = '';
      taxIds.forEach(function (element) {
        vatInfoHtml = "".concat(vatInfoHtml, "<p>").concat(element.value, "</p>");
      });
      vatInfoHtml = "<p>".concat(shopperType, "</p>").concat(vatInfoHtml);
      $('#dr-order-vat-info').append(vatInfoHtml);
      sessionStorage.removeItem('drgcTaxRegs');
    }

    if (sessionStorage.getItem('drgcTaxExempt')) sessionStorage.removeItem('drgcTaxExempt');
    if (sessionStorage.getItem('drgcPaymentSource')) sessionStorage.removeItem('drgcPaymentSource');
    if (sessionStorage.getItem('drgc_upsell_decline')) sessionStorage.removeItem('drgc_upsell_decline');
  }
});
/* harmony default export */ var public_thank_you = (ThankYouModule);
// CONCATENATED MODULE: ./assets/js/public/public-subs.js



var SubsModule = function () {
  var createRenewalRequestData = function createRenewalRequestData(subsId, productId, qty) {
    return {
      cart: {
        lineItems: {
          lineItem: [{
            quantity: qty,
            product: {
              id: productId
            },
            customAttributes: {
              attribute: [{
                name: 'RenewingSubscriptionID',
                value: subsId
              }]
            }
          }]
        }
      }
    };
  };

  return {
    createRenewalRequestData: createRenewalRequestData
  };
}();

jQuery(document).ready(function ($) {
  var ajaxUrl = drgc_params.ajaxUrl;

  if ($('#dr-my-subs-page-wrapper').length) {
    $(document).on('click', '.subs-name', function (event) {
      $('#subscription-details-form input[name="subscription_id"]').val(event.target.dataset.id);
      $('#subscription-details-form').submit();
    });
    $(document).on('click', '.renew-cancalled', function (event) {
      var subsId = event.target.dataset.id;
      var productId = event.target.dataset.productId;
      var cartRequest = SubsModule.createRenewalRequestData(subsId, productId, 1);
      $('body').css({
        'pointer-events': 'none',
        'opacity': 0.5
      });
      commerce_api.updateCart({
        expand: 'all'
      }, cartRequest).then(function () {
        window.location.href = drgc_params.cartUrl;
      })["catch"](function (jqXHR) {
        checkout_utils.displayAlertMessage(checkout_utils.getAjaxErrorMessage(jqXHR));
        checkout_utils.resetBodyOpacity();
      });
    });
  }

  if ($('#dr-subs-details-page-wrapper').length) {
    $(document).on('click', '#subs-cancel-link', function () {
      if (confirm(drgc_params.translations.cancel_subs_confirm)) {
        $('body').css({
          'pointer-events': 'none',
          'opacity': 0.5
        });
        var subsId = $('#subs-cancel-link').attr('data-id');
        var data = {
          action: 'drgc_cancel_subscription',
          nonce: drgc_params.ajaxNonce,
          subscriptionId: subsId
        };
        $.post(ajaxUrl, data, function (response) {
          if (response.success) {
            console.log('The subscription has been unsubscribed.');
          } else {
            if (typeof response.data === 'string') {
              alert(response.data);
            } else {
              alert(response.data[0]);
            }
          }

          window.location.href = drgc_params.mySubsUrl;
        });
      }
    });
    $(document).on('change', '#auto-renewal-switch', function () {
      $('body').css({
        'pointer-events': 'none',
        'opacity': 0.5
      });
      var $switch = $('#auto-renewal-switch');
      var subsId = $switch.attr('data-id');
      var type = $switch.prop('checked') ? 'Auto' : 'Manual';
      var data = {
        action: 'drgc_switch_renewal_type',
        nonce: drgc_params.ajaxNonce,
        subscriptionId: subsId,
        renewalType: type
      };
      $.post(ajaxUrl, data, function (response) {
        if (response.success) {
          console.log('The renewal type has been updated.');
        } else {
          if (typeof response.data === 'string') {
            alert(response.data);
          } else {
            alert(response.data[0]);
          }
        }

        location.reload(true);
      });
    });
    $(document).on('click', '#subs-change-qty-btn', function () {
      var qtyInput = prompt(drgc_params.translations.change_renewal_qty_prompt, '');

      if (isNaN(Number(qtyInput)) || qtyInput === '') {
        alert('Please enter a number!');
      } else if (qtyInput === null) {
        return;
      } else {
        $('body').css({
          'pointer-events': 'none',
          'opacity': 0.5
        });
        var subsId = $('#subs-change-qty-btn').attr('data-id');
        var data = {
          action: 'drgc_change_renewal_qty',
          nonce: drgc_params.ajaxNonce,
          subscriptionId: subsId,
          renewalQty: qtyInput
        };
        $.post(ajaxUrl, data, function (response) {
          if (response.success) {
            console.log('The next renewal quantity has been updated.');
          } else {
            if (typeof response.data === 'string') {
              alert(response.data);
            } else {
              alert(response.data[0]);
            }
          }

          location.reload(true);
        });
      }
    });
    $(document).on('click', '#subs-renew-btn', function (event) {
      var subsId = event.target.dataset.id;
      var productId = event.target.dataset.productId;
      var qty = event.target.dataset.qty;
      var cartRequest = SubsModule.createRenewalRequestData(subsId, productId, qty);
      $('body').css({
        'pointer-events': 'none',
        'opacity': 0.5
      });
      commerce_api.updateCart({
        expand: 'all'
      }, cartRequest).then(function () {
        window.location.href = drgc_params.cartUrl;
      })["catch"](function (jqXHR) {
        checkout_utils.displayAlertMessage(checkout_utils.getAjaxErrorMessage(jqXHR));
        checkout_utils.resetBodyOpacity();
      });
    });
    $(document).on('click', '#view-order-history-link', function (event) {
      var content = event.target.nextElementSibling;
      event.target.classList.toggle('active');

      if (content.style.maxHeight) {
        content.style.maxHeight = null;
      } else {
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  }
});
/* harmony default export */ var public_subs = (SubsModule);
// CONCATENATED MODULE: ./assets/js/public/public-account.js








var AccountModule = function ($) {
  var localizedText = drgc_params.translations;

  var appendAutoRenewalTerms = function appendAutoRenewalTerms(digitalriverjs, entityCode, locale) {
    var terms = checkout_utils.getLocalizedAutoRenewalTerms(digitalriverjs, entityCode, locale);

    if (terms) {
      $('#dr-autoRenewalPlanTerms').find('.dr-modal-body > p').append(terms);
    }
  };

  var getRightOfWithdrawalLink = function getRightOfWithdrawalLink(locale) {
    var gcFontsDomain = 'drh-fonts.img.digitalrivercontent.net';
    return new Promise(function (resolve, reject) {
      $.ajax({
        type: 'GET',
        url: "https://".concat(gcFontsDomain, "/store/").concat(drgc_params.siteID, "/").concat(locale, "/DisplayHelpPage"),
        success: function success(response) {
          var $rightOfWithdrawal = $(response).find('#dr_rightOfWithdrawalFAQ');
          var url = '';

          if ($rightOfWithdrawal.length) {
            url = $rightOfWithdrawal.find('a.dr_rightOfWithdrawal').prop('href').split('?')[1];
            url = "https://gc.digitalriver.com/store?".concat(url);
          }

          resolve(url);
        },
        error: function error(jqXHR) {
          reject(jqXHR);
        }
      });
    });
  };

  var initRightOfWithdrawalLink =
  /*#__PURE__*/
  function () {
    var _ref = asyncToGenerator_default()(
    /*#__PURE__*/
    regenerator_default.a.mark(function _callee() {
      var rightOfWithdrawalLink;
      return regenerator_default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return AccountModule.getRightOfWithdrawalLink(drgc_params.drLocale);

            case 3:
              rightOfWithdrawalLink = _context.sent;

              if (rightOfWithdrawalLink) {
                $('a.right-of-withdrawal-link').prop('href', rightOfWithdrawalLink);
                $('.dr-right-of-withdrawal').show();
              } else {
                $('.dr-right-of-withdrawal').hide();
              }

              _context.next = 10;
              break;

            case 7:
              _context.prev = 7;
              _context.t0 = _context["catch"](0);
              console.error(_context.t0);

            case 10:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 7]]);
    }));

    return function initRightOfWithdrawalLink() {
      return _ref.apply(this, arguments);
    };
  }();

  var createOrderList = function createOrderList(orders) {
    var listHtml = '';
    orders.forEach(function (element) {
      var submissionDate = new Date(element.submissionDate).toLocaleDateString();
      var status = element.orderState.toLowerCase().split(' ').join('');
      listHtml = "\n                ".concat(listHtml, "\n                <div class=\"order\">\n                    <div class=\"order-id\" data-heading=\"").concat(localizedText.order_id_label, "\">").concat(element.id, "</div>\n                    <div class=\"order-date\" data-heading=\"").concat(localizedText.date_label, "\">").concat(submissionDate, "</div>\n                    <div class=\"order-amount\" data-heading=\"").concat(localizedText.amount_label, "\">").concat(element.pricing.formattedTotal, "</div>\n                    <div class=\"order-status ").concat(status, "\" data-heading=\"").concat(localizedText.status_label, "\">").concat(element.orderState, "</div>\n                    <div class=\"order-details\">\n                        <button type=\"button\" class=\"btn btn-transparent\" data-order=\"").concat(element.id, "\">").concat(localizedText.order_details_label, "</button>\n                    </div>\n                </div>\n            ");
    });
    return listHtml;
  };

  var updateListAndPagination = function updateListAndPagination(list, $selectedNum, orders) {
    $('#list-orders > .overflowContainer > .order:not(.order-headings)').remove();
    $('#list-orders > .overflowContainer > .order-headings').after(list);
    $('#list-orders > .overflowContainer > .dr-pagination > .page-link').not($selectedNum).removeClass('active');
    $selectedNum.addClass('active');
    $('#list-orders > .overflowContainer > .dr-pagination > .next > .btn').prop('disabled', !orders.hasOwnProperty('nextPage'));
    $('#list-orders > .overflowContainer > .dr-pagination > .prev > .btn').prop('disabled', !orders.hasOwnProperty('previousPage'));
  };

  return {
    appendAutoRenewalTerms: appendAutoRenewalTerms,
    getRightOfWithdrawalLink: getRightOfWithdrawalLink,
    initRightOfWithdrawalLink: initRightOfWithdrawalLink,
    createOrderList: createOrderList,
    updateListAndPagination: updateListAndPagination
  };
}(jQuery);

jquery_default()(function () {
  if (jquery_default()('#dr-account-page-wrapper').length < 1) return;
  window.drActiveOrderId = '';
  var localizedText = drgc_params.translations;
  var $body = jquery_default()('body');
  var $ordersModal = jquery_default()('#ordersModal');
  $body.append($ordersModal); // Order detail click

  function fillOrderModal(_x) {
    return _fillOrderModal.apply(this, arguments);
  }

  function _fillOrderModal() {
    _fillOrderModal = asyncToGenerator_default()(
    /*#__PURE__*/
    regenerator_default.a.mark(function _callee3(e) {
      var orderId, selectedOrder, orderDetails, requestShipping, isDiscount, billingAddress1, billingAddress2, shippingAddress1, shippingAddress2, isTaxInclusive, forceExclTax, orderCurrency, shouldDisplayVat, taxSuffixLabel, html, count, i, lineItem;
      return regenerator_default.a.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              orderId = jquery_default()(this).attr('data-order');
              jquery_default()('a.right-of-withdrawal-link').data('orderId', orderId);

              if (!(orderId === drActiveOrderId)) {
                _context3.next = 6;
                break;
              }

              $ordersModal.drModal('show');
              _context3.next = 65;
              break;

            case 6:
              selectedOrder = '';
              _context3.prev = 7;
              _context3.next = 10;
              return commerce_api.getOrderDetails(orderId, {
                expand: 'all'
              });

            case 10:
              orderDetails = _context3.sent;
              selectedOrder = orderDetails.order;
              _context3.next = 18;
              break;

            case 14:
              _context3.prev = 14;
              _context3.t0 = _context3["catch"](7);
              console.error(_context3.t0);
              return _context3.abrupt("return", false);

            case 18:
              if (selectedOrder) {
                _context3.next = 21;
                break;
              }

              drToast.displayMessage(localizedText.undefined_error_msg, 'error');
              return _context3.abrupt("return", false);

            case 21:
              requestShipping = 'code' in selectedOrder.shippingMethod; // orderID

              jquery_default()('.dr-modal-orderNumber').text(orderId); // Order Pricing

              jquery_default()('.dr-modal-subtotal').text(selectedOrder.pricing.formattedSubtotal);
              jquery_default()('.dr-modal-tax').text(selectedOrder.pricing.formattedTax);
              jquery_default()('.dr-modal-shipping').text(selectedOrder.pricing.formattedShipping);
              isDiscount = parseInt(selectedOrder.pricing.formattedIncentive.replace(/\D/g, ''));

              if (isDiscount) {
                jquery_default()('.dr-modal-discount').text(selectedOrder.pricing.formattedIncentive);
                jquery_default()('.dr-summary__discount').show();
              } else {
                jquery_default()('.dr-summary__discount').hide();
              }

              jquery_default()('.dr-modal-total').text(selectedOrder.pricing.formattedTotal); // Billing

              jquery_default()('.dr-modal-billingName').text(selectedOrder.billingAddress.firstName + ' ' + selectedOrder.billingAddress.lastName);
              billingAddress1 = selectedOrder.billingAddress.line1;
              billingAddress1 += selectedOrder.billingAddress.line2 ? '<br>' + selectedOrder.billingAddress.line2 : '';
              jquery_default()('.dr-modal-billingAddress1').html(billingAddress1);
              billingAddress2 = selectedOrder.billingAddress.city ? selectedOrder.billingAddress.city : '';
              billingAddress2 += selectedOrder.billingAddress.countrySubdivision ? ', ' + selectedOrder.billingAddress.countrySubdivision : '';
              billingAddress2 += selectedOrder.billingAddress.postalCode ? ' ' + selectedOrder.billingAddress.postalCode : '';
              jquery_default()('.dr-modal-billingAddress2').text(billingAddress2);
              jquery_default()('.dr-modal-billingCountry').text(selectedOrder.billingAddress.country); // Shipping

              jquery_default()('.dr-modal-shippingName').text(selectedOrder.shippingAddress.firstName + ' ' + selectedOrder.shippingAddress.lastName);
              shippingAddress1 = selectedOrder.shippingAddress.line1;
              shippingAddress1 += selectedOrder.shippingAddress.line2 ? '<br>' + selectedOrder.shippingAddress.line2 : '';
              jquery_default()('.dr-modal-shippingAddress1').html(shippingAddress1);
              shippingAddress2 = selectedOrder.shippingAddress.city ? selectedOrder.shippingAddress.city : '';
              shippingAddress2 += selectedOrder.shippingAddress.countrySubdivision ? ', ' + selectedOrder.shippingAddress.countrySubdivision : '';
              shippingAddress2 += selectedOrder.shippingAddress.postalCode ? ' ' + selectedOrder.shippingAddress.postalCode : '';
              jquery_default()('.dr-modal-shippingAddress2').text(shippingAddress2);
              jquery_default()('.dr-modal-shippingCountry').text(selectedOrder.shippingAddress.country); // Summary Labels

              isTaxInclusive = selectedOrder.locale !== 'en_US';
              forceExclTax = drgc_params.forceExclTax === 'true';
              orderCurrency = selectedOrder.pricing.total.currency;
              shouldDisplayVat = orderCurrency === 'GBP' || orderCurrency === 'EUR';
              taxSuffixLabel = isTaxInclusive ? forceExclTax ? ' ' + localizedText.excl_vat_label : ' ' + localizedText.incl_vat_label : '';
              jquery_default()('.dr-summary__subtotal .subtotal-label').text(localizedText.subtotal_label + taxSuffixLabel);
              jquery_default()('.dr-summary__tax .item-label').text(shouldDisplayVat ? localizedText.vat_label : localizedText.tax_label);
              jquery_default()('.dr-summary__shipping .item-label').text(localizedText.shipping_label + taxSuffixLabel);
              jquery_default()('.dr-summary__shipping-tax .item-label').text(shouldDisplayVat ? localizedText.shipping_vat_label : localizedText.shipping_tax_label);

              if (isTaxInclusive && !forceExclTax) {
                jquery_default()('.dr-summary__tax, .dr-summary__shipping-tax').addClass('tree-sub-item');
              } else {
                jquery_default()('.dr-summary__tax, .dr-summary__shipping-tax').removeClass('tree-sub-item');
              } // Products


              html = '';
              count = selectedOrder.lineItems.lineItem.length;

              for (i = 0; i < count; i++) {
                lineItem = selectedOrder.lineItems.lineItem[i];
                html += "<div class=\"dr-product\">\n                <div class=\"dr-product-content\">\n                    <div class=\"dr-product__img dr-modal-productImgBG\" style=\"background-image:url(".concat(lineItem.product.thumbnailImage, ");\"></div>\n                    <div class=\"dr-product__info\">\n                        <a class=\"product-name dr-modal-productName\">").concat(lineItem.product.displayName, "</a>\n                        <div class=\"product-sku\">\n                            <span>Product </span>\n                            <span class=\"dr-modal-productSku\">").concat(lineItem.product.sku, "</span>\n                        </div>\n                        <div class=\"product-qty\">\n                            <span class=\"qty-text\">Qty <span class=\"dr-modal-productQty\">").concat(lineItem.quantity, "</span></span>\n                            <span class=\"dr-pd-cart-qty-minus value-button-decrease\"></span>\n                            <input\n                                type=\"number\"\n                                class=\"product-qty-number\"\n                                step=\"1\"\n                                min=\"1\"\n                                max=\"999\"\n                                value=\"").concat(lineItem.quantity, "\"\n                                maxlength=\"5\"\n                                size=\"2\"\n                                pattern=\"[0-9]*\"\n                                inputmode=\"numeric\"\n                                readonly=\"true\"/>\n                            <span class=\"dr-pd-cart-qty-plus value-button-increase\"></span>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"dr-product__price\">\n                    <span class=\"sale-price dr-modal-salePrice\">").concat(lineItem.pricing.formattedSalePriceWithQuantity, "</span>\n                    <span class=\"regular-price dr-modal-strikePrice\" ").concat(lineItem.pricing.formattedSalePriceWithQuantity === lineItem.pricing.formattedListPriceWithQuantity ? 'style="display:none"' : '', ">").concat(lineItem.pricing.formattedListPriceWithQuantity, "</span>\n                </div>\n            </div>");
              }

              jquery_default()('.dr-summary__products').html(html);
              checkout_utils.updateSummaryPricing(selectedOrder, isTaxInclusive);

              if (!requestShipping) {
                jquery_default()('.dr-order-address__shipping, .dr-summary__shipping, .dr-summary__shipping-tax').hide();
              } else {
                jquery_default()('.dr-order-address__shipping, .dr-summary__shipping, .dr-summary__shipping-tax').show();
              } // set this last


              drActiveOrderId = orderId;
              $ordersModal.drModal('show');

            case 65:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this, [[7, 14]]);
    }));
    return _fillOrderModal.apply(this, arguments);
  }

  jquery_default()(document).on('click', '.order-details > .btn', fillOrderModal);
  jquery_default()('a.right-of-withdrawal-link').on('click', function (e) {
    e.preventDefault();
    var $link = jquery_default()(e.target);

    if (window.isSecureContext) {
      var id = $link.data('orderId');
      navigator.clipboard.writeText(id).then(function () {
        alert(localizedText.copied_order_id_msg + ': ' + id);
        window.open($link.prop('href'), '_blank');
      }, function () {
        console.error('Unable to write to clipboard.');
      });
    } else {
      window.open($link.prop('href'), '_blank');
    }
  });
  jquery_default()('#list-orders > .overflowContainer > .dr-pagination > .page-link').on('click',
  /*#__PURE__*/
  function () {
    var _ref2 = asyncToGenerator_default()(
    /*#__PURE__*/
    regenerator_default.a.mark(function _callee2(e) {
      var $list, $selectedNum, pageNumber, isNextBtn, currentNum, ordersByPage, list;
      return regenerator_default.a.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              $list = jquery_default()('#list-orders > .overflowContainer');
              $selectedNum = jquery_default()(e.target);
              pageNumber = $selectedNum.data('pageNumber');
              isNextBtn = false;

              if (!pageNumber) {
                currentNum = jquery_default()('#list-orders > .overflowContainer > .dr-pagination').find('.page-link.active').data('pageNumber');
                isNextBtn = $selectedNum.parent('a.page-link').hasClass('next');
                pageNumber = isNextBtn ? currentNum + 1 : currentNum - 1 < 1 ? 1 : currentNum - 1;
                $selectedNum = jquery_default()('#list-orders > .overflowContainer > .dr-pagination > .page-link[data-page-number=' + pageNumber + ']');
              }

              if (!$selectedNum.hasClass('active')) {
                _context2.next = 7;
                break;
              }

              return _context2.abrupt("return", false);

            case 7:
              $list.addClass('dr-loading');
              _context2.prev = 8;
              _context2.next = 11;
              return commerce_api.getOrders({
                pageNumber: pageNumber,
                expand: 'order.id,order.submissionDate,order.pricing.formattedTotal,order.orderState'
              });

            case 11:
              ordersByPage = _context2.sent;
              list = AccountModule.createOrderList(ordersByPage.orders.order);
              AccountModule.updateListAndPagination(list, $selectedNum, ordersByPage.orders);
              _context2.next = 19;
              break;

            case 16:
              _context2.prev = 16;
              _context2.t0 = _context2["catch"](8);
              console.error(_context2.t0);

            case 19:
              $list.removeClass('dr-loading');

            case 20:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[8, 16]]);
    }));

    return function (_x2) {
      return _ref2.apply(this, arguments);
    };
  }()); // modal print click

  $ordersModal.find('.dr-modal-footer .print-button').on('click', function () {
    var $dialog = $ordersModal.find('.dr-modal-dialog');
    $dialog.css('max-width', '100%');
    window.print();
    $dialog.css('max-width', '');
  }); // Address

  var $addresses = jquery_default()('#dr-account-page-wrapper .address');
  var $deleteAddressModal = jquery_default()('#dr-deleteAddressConfirm');
  var $deleteAcceptBtn = $deleteAddressModal.find('.dr-delete-confirm');
  $body.append($deleteAddressModal); // change primary address

  $addresses.on('click', function (e) {
    var $this = jquery_default()(this);

    if (jquery_default()(e.target).is('.address-edit-btn') || jquery_default()(e.target).is('.address-add-btn')) {
      if (jquery_default()(e.target).is('.address-add-btn')) {
        jquery_default()(e.target).hide();
        $this.find('.address-add-text').hide();
      }

      $this.parent().addClass('expand');
      setTimeout(function () {
        $this.find('.address-edit').slideDown(200, function () {
          jquery_default()('html, body').animate({
            scrollTop: $this.offset().top - 50
          }, 200);
        });
      }, 200);
    } else if (jquery_default()(e.target).is('.address-delete-btn')) {
      $deleteAddressModal.find('.dr-delete-confirm').data('id', jquery_default()(e.target).data('id'));
      $deleteAddressModal.find('p > strong').text(jquery_default()(e.target).data('nickname'));
      $deleteAddressModal.drModal({
        backdrop: 'static',
        keyboard: false
      });
    } else if (jquery_default()(e.target).is('.address-cancel-btn')) {
      $this.parent().removeClass('expand');
      $this.removeClass('ajax-error');
      setTimeout(function () {
        $this.find('.address-edit').slideUp(200, function () {
          jquery_default()('html, body').animate({
            scrollTop: $this.offset().top - 50
          }, 200);
          $this.find('.address-add-btn').show();
          $this.find('.address-add-text').show();
        });
      }, 200);
    } else if (jquery_default()(e.target).closest('.address-edit').length) {
      return; // handled by form submit callback
    } else {
      if ($this.attr('data-primary') || $this.hasClass('address-add-new')) return;
      $addresses.removeAttr('data-primary');
      $this.attr('data-primary', 'Primary');
      saveAddress($this.find('form.dr-panel-edit'));
    }
  });
  $deleteAcceptBtn.on('click', function (e) {
    jquery_default()('body').addClass('dr-loading');
    commerce_api.deleteShopperAddress(jquery_default()(e.target).data('id')).then(function () {
      location.reload();
    })["catch"](function (jqXHR) {
      jquery_default()('body').removeClass('dr-loading');
      checkout_utils.apiErrorHandler(jqXHR);
    });
  }); // Payment

  jquery_default()('#dr-account-page-wrapper .payment').on('click', function (e) {
    var $this = jquery_default()(this);

    if (jquery_default()(e.target).is('.payment-edit-btn')) {
      $this.parent().addClass('expand');
      setTimeout(function () {
        $this.find('.payment-edit').slideDown(200, function () {
          jquery_default()('html, body').animate({
            scrollTop: $this.offset().top - 50
          }, 200);
        });
      }, 200);
    } else {
      if ($this.attr('data-primary')) return;
      jquery_default()('#dr-account-page-wrapper .payment').removeAttr('data-primary');
      $this.attr('data-primary', 'Primary');
      var $form = $this.find('form');
      var payload = {
        'isDefault': true,
        'sourceId': $form.find('input[name="sourceId"]').val(),
        'id': $form.find('input[name="id"]').val()
      };
      updateShopperPayment(payload);
    }
  });
  jquery_default()('#dr-account-page-wrapper .payment').find('form.dr-panel-edit').on('submit', function (e) {
    e.preventDefault();
    var payload = {
      'nickName': jquery_default()(this).find('input[name="nickName"]').val(),
      'sourceId': jquery_default()(this).find('input[name="sourceId"]').val(),
      'id': jquery_default()(this).find('input[name="id"]').val()
    };
    jquery_default()(this).find('input[type="submit"]').attr('disabled');
    updateShopperPayment(payload);
  });
  jquery_default()('#paymentDeleteConfirm .dr-confirm-payment-off').on('click', function () {
    var payment = $body.data('currentPayment');
    deleteShopperPayment(payment.id);
  });
  jquery_default()('#dr-account-page-wrapper .payment').on('click', '.payment-delete-btn', function (e) {
    e.preventDefault();
    $body.data({
      currentPayment: {
        id: jquery_default()(this).closest('.payment').find('input[name="id"]').val()
      }
    });
    $body.append(jquery_default()('#paymentDeleteConfirm'));
    jquery_default()('#paymentDeleteConfirm').drModal({
      backdrop: 'static',
      keyboard: false
    });
  });

  function fillAddress() {
    var $this = jquery_default()(this);
    var target = $this.attr('name');
    $this.closest('.address').find('.' + target).text($this.val());
  }

  function updateShopperPayment(payload) {
    jquery_default.a.ajax({
      type: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: "Bearer ".concat(drgc_params.accessToken)
      },
      data: JSON.stringify({
        'paymentOption': payload
      }),
      url: 'https://' + drgc_params.domain + '/v1/shoppers/me/payment-options/',
      success: function success() {
        location.reload();
      },
      error: function error(jqXHR) {
        console.error(jqXHR);
        location.reload();
      }
    });
  }

  function deleteShopperPayment(id) {
    jquery_default.a.ajax({
      type: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: "Bearer ".concat(drgc_params.accessToken)
      },
      url: 'https://' + drgc_params.domain + '/v1/shoppers/me/payment-options/' + id,
      success: function success() {
        location.reload();
      },
      error: function error(jqXHR) {
        console.error(jqXHR);
        location.reload();
      }
    });
  }

  $addresses.find('input[name="firstName"], input[name="lastName"], input[name="companyName"], input[name="line1"], input[name="line2"], input[name="city"], select[name="countrySubdivision"], input[name="postalCode"], input[name="phoneNumber"]').on('change keyup', fillAddress);

  function saveAddress(form) {
    var $form = jquery_default()(form);
    var addressObj = {
      address: {
        nickName: $form.find('input[name="nickname"]').val(),
        firstName: $form.find('input[name="firstName"]').val(),
        lastName: $form.find('input[name="lastName"]').val(),
        companyName: $form.find('input[name="companyName"]').val(),
        line1: $form.find('input[name="line1"]').val(),
        line2: $form.find('input[name="line2"]').val(),
        city: $form.find('input[name="city"]').val(),
        countrySubdivision: $form.find('select[name="countrySubdivision"]').val(),
        postalCode: $form.find('input[name="postalCode"]').val(),
        countryName: $form.find('select[name="country"] :selected').text(),
        country: $form.find('select[name="country"]').val(),
        phoneNumber: $form.find('input[name="phoneNumber"]').val(),
        isDefault: false
      }
    };

    if (!$form.is('#dr-new-address-form')) {
      addressObj.address.id = $form.find('input[name="id"]').val();
      addressObj.address.isDefault = !!($form.closest('.address').length && $form.closest('.address').attr('data-primary'));

      if ($form.closest('.expand').length) {
        $form.addClass('dr-loading');
      } else {
        $form.closest('.address-col').addClass('dr-loading');
      }

      commerce_api.updateShopperAddress(addressObj).then(function () {
        location.reload();
      })["catch"](function (jqXHR) {
        $form.removeClass('dr-loading');
        $form.closest('.address-col').removeClass('dr-loading');
        $form.closest('.address').addClass('ajax-error');
        checkout_utils.apiErrorHandler(jqXHR);
      });
    } else {
      $form.addClass('dr-loading');
      commerce_api.saveShopperAddress(addressObj).then(function () {
        location.reload();
      })["catch"](function (jqXHR) {
        $form.removeClass('dr-loading');
        $form.closest('.address').addClass('ajax-error');
        checkout_utils.apiErrorHandler(jqXHR);
      });
    }
  }

  $addresses.find('form.dr-panel-edit').on('submit', function (e) {
    e.preventDefault();
    saveAddress(e.target);
  }); // Subscriptions

  var $subs = jquery_default()('#dr-account-page-wrapper .subscription');
  var $subscriptionError = jquery_default()('#subscriptionError');
  var $subscriptionConfirm = jquery_default()('#subscriptionConfirm');
  var $autoRenewalPlanTerms = jquery_default()('#dr-autoRenewalPlanTerms');

  function updateSubscription() {
    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var $toggle = arguments.length > 1 ? arguments[1] : undefined;
    jquery_default()('body').addClass('dr-loading');
    jquery_default.a.post(drgc_params.ajaxUrl, data, function (response) {
      if (response.success) {
        var $renewalDate = $toggle.closest('.subscription').find('.subscription-dates .nextRenewalDate');

        if ($renewalDate.length) {
          var renewalText = data.renewalType === 'Auto' ? $renewalDate.attr('data-on') : $renewalDate.attr('data-off');
          $renewalDate.find('strong').text(renewalText);
        }
      } else {
        $subscriptionError.drModal('show');
        $toggle.prop('checked', !(data.renewalType === 'Auto'));
      }

      jquery_default()('body').removeClass('dr-loading');
    });
  }

  $subs.find('.subscription-ar .switch input[type="checkbox"]').on('change', function () {
    var $this = jquery_default()(this);
    var subID = $this.closest('.subscription').length && $this.closest('.subscription').attr('data-id') ? $this.closest('.subscription').attr('data-id') : '';
    var ar = $this.is(':checked') ? 'Auto' : 'Manual';
    var modalId = {
      Auto: '#dr-autoRenewalPlanTerms',
      Manual: '#subscriptionConfirm'
    };
    $body.data({
      currentToggle: {
        selector: $this,
        subID: subID,
        ar: ar
      }
    });
    jquery_default()(modalId[ar]).drModal({
      backdrop: 'static',
      keyboard: false
    });
  }); // subscription confirm click events

  jquery_default()('button.dr-confirm-ar-off, button.dr-confirm-ar-on').on('click', function () {
    var toggle = $body.data('currentToggle');
    var data = {
      action: 'drgc_toggle_auto_renewal_ajax',
      nonce: drgc_params.ajaxNonce,
      subscriptionId: toggle.subID,
      renewalType: toggle.ar
    };
    updateSubscription(data, toggle.selector);
  }); // reset toggle if event is canceled

  jquery_default()('button.dr-confirm-cancel').on('click', function () {
    var toggle = $body.data('currentToggle');
    toggle.selector.prop('checked', !(toggle.ar === 'Auto'));
  });
  jquery_default()('#list-subscriptions .dr-renew-btn').on('click', function (e) {
    var payload = {
      cart: {
        lineItems: {
          lineItem: [{
            quantity: e.target.dataset.renewalQty,
            product: {
              id: e.target.dataset.productId
            },
            customAttributes: {
              attribute: [{
                name: 'RenewingSubscriptionID',
                value: e.target.dataset.subsId
              }]
            }
          }]
        }
      }
    };
    jquery_default()('body').addClass('dr-loading');
    commerce_api.updateCart({
      testOrder: drgc_params.testOrder
    }, payload).then(function () {
      window.location.href = drgc_params.cartUrl;
    })["catch"](function (jqXHR) {
      checkout_utils.apiErrorHandler(jqXHR);
      jquery_default()('body').removeClass('dr-loading');
    });
  });
  $body.append($subscriptionError).append($subscriptionConfirm).append($autoRenewalPlanTerms);

  if (jquery_default()('#list-subscriptions .subscription').length && $autoRenewalPlanTerms.length) {
    var locale = drgc_params.drLocale || 'en_US';
    var digitalriverjs = new DigitalRiver(drgc_params.digitalRiverKey, {
      'locale': locale.split('_').join('-')
    });
    var entityCode = checkout_utils.getEntityCode();

    if (entityCode) {
      AccountModule.appendAutoRenewalTerms(digitalriverjs, entityCode, locale);
    } else {
      var subsId = jquery_default()('#list-subscriptions .subscription').first().data('id');
      commerce_api.getSubsDetails(subsId).then(function (data) {
        var orderId = data.subscription.orders.order[0].uri.split('orders/')[1];
        return commerce_api.getOrderDetails(orderId);
      }).then(function (data) {
        entityCode = data.order.businessEntityCode;
        AccountModule.appendAutoRenewalTerms(digitalriverjs, entityCode, locale);
      })["catch"](function (jqXHR) {
        checkout_utils.apiErrorHandler(jqXHR);
      });
    }
  } // mobile back button


  jquery_default()('#dr-account-page-wrapper .back').on('click', function () {
    jquery_default()('.dr-tab-pane').removeClass('active show');
    jquery_default()('.dr-list-group-item').removeClass('active').attr('aria-selected', 'false');
  }); // Change Password

  jquery_default()('#pw-new').on('input', function (e) {
    public_login.validatePassword(e);
  });
  jquery_default()('#pw-current, #pw-new, #pw-confirm').on('input', function () {
    var $form = jquery_default()('#change-password-form');
    var pw = $form.find('input[type=password]')[0];
    var npw = $form.find('input[type=password]')[1];
    var cpw = $form.find('input[type=password]')[2];
    $form.find('.dr-err-field').text('');
    npw.setCustomValidity(pw.value === npw.value ? localizedText.new_password_error_msg : npw.validationMessage !== localizedText.new_password_error_msg ? npw.validationMessage : '');
    cpw.setCustomValidity(npw.value !== cpw.value ? localizedText.password_confirm_error_msg : '');

    if (npw.validity.valueMissing) {
      jquery_default()(npw).next('.invalid-feedback').text(localizedText.required_field_msg);
    } else if (npw.validity.customError) {
      jquery_default()(npw).next('.invalid-feedback').text(npw.validationMessage);
    } else {
      jquery_default()(npw).next('.invalid-feedback').text('');
    }

    if (cpw.validity.valueMissing) {
      jquery_default()(cpw).next('.invalid-feedback').text(localizedText.required_field_msg);
    } else if (cpw.validity.customError) {
      jquery_default()(cpw).next('.invalid-feedback').text(cpw.validationMessage);
    } else {
      jquery_default()(cpw).next('.invalid-feedback').text('');
    }

    $form.addClass('was-validated');
  });
  jquery_default()('#change-password-form').on('submit', function (e) {
    e.preventDefault();
    var $form = jquery_default()(e.target);
    var $error = $form.find('.dr-err-field');
    $form.addClass('was-validated');
    if ($form.data('processing')) return false;
    if (!$form[0].checkValidity()) return false;
    $form.data('processing', true);
    $error.text('');
    var data = {
      action: 'drgc_change_password',
      nonce: drgc_params.ajaxNonce,
      current_password: jquery_default()('#pw-current').val(),
      new_password: jquery_default()('#pw-new').val(),
      confirm_new_password: jquery_default()('#pw-confirm').val()
    };
    jquery_default()('body').addClass('dr-loading');
    jquery_default.a.post(drgc_params.ajaxUrl, data, function (response) {
      if (!response.success) {
        if (response.data && response.data.errors && response.data.errors.error[0].hasOwnProperty('description')) {
          $error.text(response.data.errors.error[0].description);
        } else if (Object.prototype.toString.call(response.data) === '[object String]') {
          $error.text(response.data);
        } else {
          $error.text(localizedText.undefined_error_msg);
        }

        $error.css('color', 'red');
        sessionStorage.setItem('drgcPwChanged', 'false');
        jquery_default()('body').removeClass('dr-loading');
      } else {
        sessionStorage.setItem('drgcPwChanged', 'true');
        location.reload();
      }

      jquery_default()('#pw-current, #pw-new, #pw-confirm').val('').removeClass('is-invalid').removeClass('is-valid');
      $form.data('processing', false).removeClass('was-validated');
    });
  }); // watch account page active tab to start on the same tab after reload

  jquery_default()('#dr-account-page-wrapper a[data-toggle="dr-list"]').on('shown.dr.bs.tab', function (e) {
    sessionStorage.drAccountTab = jquery_default()(e.target).attr('href');

    if (e.target.id === 'list-password-list' && sessionStorage.getItem('drgcPwChanged') === 'true') {
      sessionStorage.setItem('drgcPwChanged', 'false');
      var data = {
        action: 'drgc_logout',
        nonce: drgc_params.ajaxNonce
      };
      jquery_default()('body').addClass('dr-loading');
      jquery_default.a.post(drgc_params.ajaxUrl, data, function (response) {
        if (response.success) {
          jquery_default()('body').removeClass('dr-loading');
          jquery_default()('#dr-passwordUpdated').drModal({
            backdrop: 'static',
            keyboard: false
          });
        } else {
          location.reload();
        }
      });
    }
  });
  jquery_default()('#dr-passwordUpdated button').on('click', function () {
    jquery_default()('body').addClass('dr-loading');
    window.location.href = drgc_params.loginUrl;
  });

  if (sessionStorage.drAccountTab && jquery_default()('#dr-account-page-wrapper a[data-toggle="dr-list"][href="' + sessionStorage.drAccountTab + '"]').length) {
    jquery_default()('#dr-account-page-wrapper a[data-toggle="dr-list"][href="' + sessionStorage.drAccountTab + '"]').drTab('show');
    jquery_default()('#nav-tabContent').removeClass('dr-loading');
  } else if (window.matchMedia && window.matchMedia('(min-width:768px)').matches) {
    jquery_default()('#dr-account-page-wrapper a[data-toggle="dr-list"]').eq(0).drTab('show');
    jquery_default()('#nav-tabContent').removeClass('dr-loading');
  } //floating labels


  float_label.init();
  AccountModule.initRightOfWithdrawalLink();
});
/* harmony default export */ var public_account = (AccountModule);
// CONCATENATED MODULE: ./assets/js/public/user-activity-watcher.js


var DrgcUserWatcher = function (w, d, p, $) {
  var watcher = {
    interval: 900,
    debug: false,
    eventTypes: ['mousedown', 'mousemove', 'click', 'keydown', 'scroll', 'touchstart'],
    pathname: null,
    redirectUrl: p.loginUrl,
    escapeUrls: [],
    timerId: null,
    callback: null,
    closeModalInterval: 30,
    countDowninterval: null,
    init: function init() {
      var isLoggedin = p.isLogin === 'true';

      if (!isLoggedin) {
        this.log('Watcher is disabled for the anonymous user.');
        return false;
      }

      this.initPathname();

      if (!this.callback) {
        if (!this.redirectUrl) {
          this.log('The redirect url is undefined.');
          return false;
        }

        var redirectPath = new URL(this.redirectUrl).pathname;
        var loginPath = new URL(drgc_params.loginUrl).pathname;

        if (this.pathname === redirectPath && this.pathname !== loginPath) {
          this.log('The redirect page is the same as the current page and it is not the login page.');
          return false;
        }

        this.callback = this.redirect;
      }

      if (this.escapeUrls.indexOf(this.pathname) > -1) {
        this.log('Watcher is disabled for this page.');
        return false;
      }

      this.eventTypes.forEach(this.listen);
      this.tick();
    },
    listen: function listen(eventType) {
      d.addEventListener(eventType, watcher.tick);
    },
    unlisten: function unlisten(eventType) {
      d.removeEventListener(eventType, watcher.tick);
    },
    tick: function tick() {
      w.clearTimeout(watcher.timerId);
      watcher.timerId = w.setTimeout(watcher.act, watcher.interval * 1000);
      watcher.log('Watcher is restarted.');
    },
    act: function act() {
      var closeInterval = watcher.closeModalInterval;
      var $currentSec = $('#dr-autoLogoutModalBody > p > strong');
      $('#dr-autoLogoutModal').modal('show');
      $currentSec.html(closeInterval);
      watcher.countDowninterval = w.setInterval(function () {
        $currentSec.html(closeInterval);
        closeInterval--;

        if (closeInterval < 0) {
          $('#dr-autoLogoutModal').on('shown').modal('hide');
          watcher.callback();
        }
      }, 1000);
      watcher.log('Timeout!');
      w.clearTimeout(watcher.timerId);
      watcher.eventTypes.forEach(watcher.unlisten);
      watcher.log('Watcher is disarmed.');
    },
    redirect: function redirect() {
      w.clearInterval(this.countDowninterval);
      public_login.autoLogout(this.redirectUrl);
    },
    initPathname: function initPathname() {
      var parser = d.createElement('a');
      parser.href = '';
      this.pathname = parser.pathname;
      this.log('Pathname: ' + this.pathname);
    },
    closeModal: function closeModal() {
      w.clearInterval(this.countDowninterval);
      $('#dr-autoLogoutModal').modal('hide');
    },
    log: function log(msg) {
      if (this.debug) w.console.log(msg);
    }
  };

  w.DrgcUserWatcherConfig = function () {
    var args = arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments);
    if (!args[0]) return false;

    if (['url', 'escapeUrls', 'interval', 'callback', 'debug', 'closeModalInterval'].indexOf(args[0]) > -1) {
      watcher[args[0]] = args[1];
      watcher.init();
    } else {
      throw new Error('Unsupported parameter: ' + args[0]);
    }
  };

  $(function () {
    watcher.init();
    $('#dr-modalContinueBtn, #dr-modalLogoutBtn').on('click', function (event) {
      var target = event.target || event.srcElement;

      switch (target.id) {
        case 'dr-modalContinueBtn':
          watcher.closeModal();
          watcher.eventTypes.forEach(watcher.listen);
          watcher.tick();
          break;

        case 'dr-modalLogoutBtn':
          watcher.closeModal();
          watcher.callback();
          break;
      }
    });
  });
  return {
    watcher: watcher
  };
}(window, document, drgc_params, jQuery);

/* harmony default export */ var user_activity_watcher = (DrgcUserWatcher);
// CONCATENATED MODULE: ./assets/js/public/public.js
// 3rd-party plugins



 // maintained by DR


window.drToast = dr_toast;










/***/ })
/******/ ]);