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
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
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
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(3);

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
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(4)(module)))

/***/ }),
/* 4 */
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
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/typeof.js
var helpers_typeof = __webpack_require__(0);
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
// CONCATENATED MODULE: ./assets/js/public/checkout-utils.js
var CheckoutUtils = function ($, params) {
  var createDisplayItems = function createDisplayItems(cartData) {
    var displayItems = [{
      label: params.translations.subtotal_label,
      amount: cartData.pricing.subtotal.value
    }, {
      label: params.translations.tax_label,
      amount: cartData.pricing.tax.value
    }];

    if (cartData.shippingOptions.shippingOption) {
      displayItems.push({
        label: params.translations.shipping_and_handling_label,
        amount: cartData.pricing.shippingAndHandling.value
      });
    }

    if (cartData.pricing.discount) {
      if (parseFloat(cartData.pricing.discount.value) > 0) {
        displayItems.push({
          label: params.translations.discount_label,
          amount: cartData.pricing.discount.value
        });
      }
    }

    return displayItems;
  };

  var createShippingOptions = function createShippingOptions(cartData) {
    var isFreeShipping = cartData.pricing.shippingAndHandling.value === 0;
    var shippingOptions = [];
    cartData.shippingOptions.shippingOption.forEach(function (option) {
      var shippingOption = {
        id: option.id.toString(),
        label: option.description,
        amount: isFreeShipping ? 0 : option.cost.value,
        detail: ''
      };
      shippingOptions.push(shippingOption);
    });
    return shippingOptions;
  };

  var updateShippingOptions = function updateShippingOptions(shippingOptions, selectedId) {
    shippingOptions.forEach(function (option, index) {
      if (option.id === selectedId.toString()) {
        shippingOptions[index].selected = true;
      } else {
        if (shippingOptions[index].selected) {
          delete shippingOptions[index].selected;
        }
      }
    });
  };

  var getBaseRequestData = function getBaseRequestData(cartData, requestShipping, buttonStyle) {
    var displayItems = createDisplayItems(cartData);
    var shippingOptions = [];

    if (requestShipping) {
      shippingOptions = createShippingOptions(cartData);
      updateShippingOptions(shippingOptions, cartData.shippingMethod.code);
    }

    var requestData = {
      country: params.drLocale.split('_')[1],
      currency: cartData.pricing.orderTotal.currency,
      total: {
        label: params.translations.order_total_label,
        amount: cartData.pricing.orderTotal.value
      },
      displayItems: displayItems,
      shippingOptions: shippingOptions,
      requestShipping: requestShipping,
      style: buttonStyle,
      waitOnClick: false
    };
    return requestData;
  };

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

  var updateSummaryPricing = function updateSummaryPricing(cart) {
    var _cart$pricing = cart.pricing,
        formattedOrderTotal = _cart$pricing.formattedOrderTotal,
        formattedTax = _cart$pricing.formattedTax;

    if (Object.keys(cart.shippingMethod).length) {
      var formattedShippingAndHandling = cart.pricing.shippingAndHandling.value === 0 ? params.translations.free_label : cart.pricing.formattedShippingAndHandling;
      $('div.dr-summary__shipping > .item-value').text(formattedShippingAndHandling);
    }

    $('div.dr-summary__tax > .item-value').text(formattedTax);
    $('div.dr-summary__total > .total-value').text(formattedOrderTotal);
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
    if (jqXHR && jqXHR.responseJSON && jqXHR.responseJSON.errors) {
      var currentError = jqXHR.responseJSON.errors.error[0];
      drToast.displayMessage(currentError.description, 'error');
    }
  };

  var resetBodyOpacity = function resetBodyOpacity() {
    $('body').css({
      'pointer-events': 'auto',
      'opacity': 1
    });
  };

  return {
    createDisplayItems: createDisplayItems,
    createShippingOptions: createShippingOptions,
    updateShippingOptions: updateShippingOptions,
    getBaseRequestData: getBaseRequestData,
    updateDeliverySection: updateDeliverySection,
    updateAddressSection: updateAddressSection,
    updateSummaryPricing: updateSummaryPricing,
    applyLegalLinks: applyLegalLinks,
    displayPreTAndC: displayPreTAndC,
    displayAlertMessage: displayAlertMessage,
    apiErrorHandler: apiErrorHandler,
    resetBodyOpacity: resetBodyOpacity,
    getEntityCode: getEntityCode,
    getCompliance: getCompliance
  };
}(jQuery, drgc_params);

/* harmony default export */ var checkout_utils = (CheckoutUtils);
// CONCATENATED MODULE: ./assets/js/public/commerce-api.js
var DRCommerceApi = function ($, params) {
  var apiBaseUrl = "https://".concat(params.domain, "/v1/shoppers");

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

  var submitCart = function submitCart() {
    $.ajax({
      type: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: "Bearer ".concat(params.accessToken)
      },
      url: "".concat(apiBaseUrl, "/me/carts/active/submit-cart?expand=all"),
      success: function success(data) {
        $('#checkout-confirmation-form input[name="order_id"]').val(data.submitCart.order.id);
        $('#checkout-confirmation-form').submit();
      },
      error: function error(jqXHR) {
        $('form#checkout-confirmation-form').find('button[type="submit"]').removeClass('sending').blur();
        $('#dr-checkout-err-field').text(jqXHR.responseJSON.errors.error[0].description).show();
        $('body').css({
          'pointer-events': 'auto',
          'opacity': 1
        });
      }
    });
  };

  var applyPaymentAndSubmitCart = function applyPaymentAndSubmitCart(sourceId) {
    if (!sourceId) return;
    var postData = {
      'paymentMethod': {
        'sourceId': sourceId
      }
    };
    $.ajax({
      type: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: "Bearer ".concat(params.accessToken)
      },
      url: "".concat(apiBaseUrl, "/me/carts/active/apply-payment-method?expand=all"),
      data: JSON.stringify(postData),
      success: function success() {
        submitCart();
      },
      error: function error(jqXHR) {
        $('form#checkout-confirmation-form').find('button[type="submit"]').removeClass('sending').blur();
        $('#dr-checkout-err-field').text(jqXHR.responseJSON.errors.error[0].description).show();
        $('body').css({
          'pointer-events': 'auto',
          'opacity': 1
        });
      }
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

  return {
    apiBaseUrl: apiBaseUrl,
    getCart: getCart,
    updateCart: updateCart,
    submitCart: submitCart,
    removeLineItem: removeLineItem,
    applyShippingOption: applyShippingOption,
    applyPaymentAndSubmitCart: applyPaymentAndSubmitCart,
    getProduct: getProduct,
    getProductPricing: getProductPricing,
    getProductInventoryStatus: getProductInventoryStatus
  };
}(jQuery, drgc_params);

/* harmony default export */ var commerce_api = (DRCommerceApi);
// CONCATENATED MODULE: ./assets/js/public/public-cart.js
/* global drgc_params, iFrameResize */

/* eslint-disable no-alert, no-console */



var CartModule = function ($) {
  var initAutoRenewalTerms = function initAutoRenewalTerms(digitalriverjs) {
    var $checkoutBtn = $('a.dr-summary__proceed-checkout');
    var $termsCheckbox = $('#autoRenewOptedInOnCheckout');

    if (sessionStorage.getItem('isTermsChecked')) {
      var isTermsChecked = sessionStorage.getItem('isTermsChecked') === 'true' ? true : false;
      $termsCheckbox.prop('checked', isTermsChecked);
    }

    $termsCheckbox.change(function (e) {
      if ($(e.target).is(':checked')) {
        $('#dr-TAndC-err-msg').text('').hide();
        $checkoutBtn.prop('href', drgc_params.checkoutUrl);
        sessionStorage.setItem('isTermsChecked', 'true');
      } else {
        $checkoutBtn.prop('href', '#dr-autoRenewTermsContainer');
        sessionStorage.setItem('isTermsChecked', 'false');
      }
    });
    $checkoutBtn.click(function () {
      if (!$termsCheckbox.is(':checked')) {
        $('#dr-TAndC-err-msg').text(drgc_params.translations.required_tandc_msg).show();
      }
    });
    $termsCheckbox.trigger('change');
    appendAutoRenewalTerms(digitalriverjs);
  };

  var appendAutoRenewalTerms = function appendAutoRenewalTerms(digitalriverjs) {
    var entityCode = checkout_utils.getEntityCode();
    var locale = drgc_params.drLocale || 'en_US';
    var compliance = checkout_utils.getCompliance(digitalriverjs, entityCode, locale);

    if (Object.keys(compliance).length) {
      var terms = compliance.autorenewalPlanTerms.localizedText;
      $('#dr-optInAutoRenew > .dr-optInAutoRenewTerms > p').append(terms);
      $('#dr-autoRenewTermsContainer').show();
    }
  };

  return {
    initAutoRenewalTerms: initAutoRenewalTerms,
    appendAutoRenewalTerms: appendAutoRenewalTerms
  };
}(jQuery);

jQuery(document).ready(function ($) {
  var apiBaseUrl = 'https://' + drgc_params.domain + '/v1/shoppers';
  var productLabel = $("#dr-cart-page-wrapper div.product-sku span:first-child").html(); // Very basic throttle function,
  // does not store calls white in limit period

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

  $('body').on('click', '.dr-prd-del', function (e) {
    e.preventDefault();
    var $this = $(e.target);
    var lineItemID = $this.closest('.dr-product').data('line-item-id');
    commerce_api.removeLineItem(lineItemID).then(function () {
      $(".dr-product[data-line-item-id=\"".concat(lineItemID, "\"]")).remove();
      fetchFreshCart();
    })["catch"](function (jqXHR) {
      return checkout_utils.apiErrorHandler(jqXHR);
    });
  });
  $('body').on('click', 'span.dr-pd-cart-qty-plus, span.dr-pd-cart-qty-minus', throttle(setProductQty, 200));

  function setProductQty(e) {
    // Get current quantity values
    var $this = $(e.target);
    var lineItemId = $this.closest('.dr-product').data('line-item-id');
    var $qty = $this.siblings('.product-qty-number:first');
    var val = parseInt($qty.val(), 10);
    var max = parseInt($qty.attr('max'), 10);
    var min = parseInt($qty.attr('min'), 10);
    var step = parseInt($qty.attr('step'), 10);
    var initialVal = $qty.val();
    if ($this.hasClass('disabled')) return;

    if (val) {
      // Change the value if plus or minus
      if ($(e.currentTarget).is('.dr-pd-cart-qty-plus')) {
        if (max && max <= val) {
          $qty.val(max);
        } else {
          $qty.val(val + step);
        }
      } else if ($(e.currentTarget).is('.dr-pd-cart-qty-minus')) {
        if (min && min >= val) {
          $qty.val(min);
        } else if (val > 1) {
          $qty.val(val - step);
        }
      }
    } else {
      $qty.val('1');
    }

    var params = {
      'action': 'update',
      'quantity': $qty.val(),
      'expand': 'all',
      'fields': null
    };
    $.ajax({
      type: 'POST',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": "Bearer ".concat(drgc_params.accessToken)
      },
      url: "".concat(apiBaseUrl, "/me/carts/active/line-items/").concat(lineItemId, "?").concat($.param(params)),
      success: function success(data, textStatus, xhr) {
        if (xhr.status === 200) {
          var _data$lineItem$pricin = data.lineItem.pricing,
              formattedListPriceWithQuantity = _data$lineItem$pricin.formattedListPriceWithQuantity,
              formattedSalePriceWithQuantity = _data$lineItem$pricin.formattedSalePriceWithQuantity;
          $("span#".concat(lineItemId, ".sale-price")).text(formattedSalePriceWithQuantity);
          $("span#".concat(lineItemId, ".regular-price")).text(formattedListPriceWithQuantity);
          fetchFreshCart();
        }
      },
      error: function error(jqXHR) {
        checkout_utils.apiErrorHandler(jqXHR);
        $qty.val(val); // reset to original qty
      }
    });
  }

  function beforeAjax() {
    if ($('.dr-cart__products').length > 0) $('body').css({
      'pointer-events': 'none',
      'opacity': 0.5
    });
  }

  function afterAjax() {
    if ($('.dr-cart__products').length > 0) $('body').css({
      'pointer-events': 'auto',
      'opacity': 1
    });
  }

  $(document).ajaxSend(function () {
    beforeAjax();
  });
  $(document).ajaxStop(function () {
    afterAjax();
  });

  function fetchFreshCart() {
    $.ajax({
      type: 'GET',
      headers: {
        "Accept": "application/json",
        "Authorization": "Bearer ".concat(drgc_params.accessToken)
      },
      url: "".concat(apiBaseUrl, "/me/carts/active?expand=all"),
      success: function success(data) {
        renderCartProduct(data);
      },
      error: function error(jqXHR) {
        checkout_utils.apiErrorHandler(jqXHR);
      }
    });
  }

  function shoppingCartBannerAndOutputLineItems() {
    $.ajax({
      type: 'GET',
      headers: {
        "Content-Type": 'application/json',
        "Authorization": "Bearer ".concat(drgc_params.accessToken)
      },
      url: "".concat(apiBaseUrl, "/me/point-of-promotions/Banner_ShoppingCartLocal/offers?format=json&expand=all"),
      success: function success(shoppingCartOfferData, textStatus, xhr) {
        $.each(shoppingCartOfferData.offers.offer, function (index, offer) {
          var shoppingCartHTML = "\n            <div class=\"dr-banner\">\n              <div class=\"dr-banner__content\">".concat(offer.salesPitch[0], "</div>\n              <div class=\"dr-banner__img\"><img src=\"").concat(offer.image, "\"></div>\n            </div>\n            ");
          $("#tempCartProducts").append(shoppingCartHTML);
          $(".dr-cart__products").html($("#tempCartProducts").html());
        });
      },
      error: function error(jqXHR) {
        reject(jqXHR);
      }
    });
  }

  function tightBundleRemoveElements(productID) {
    $.ajax({
      type: 'GET',
      headers: {
        "Content-Type": 'application/json',
        "Authorization": "Bearer ".concat(drgc_params.accessToken)
      },
      url: "".concat(apiBaseUrl, "/me/products/").concat(productID, "/offers?format=json&expand=all"),
      success: function success(tightData, textStatus, xhr) {
        $.each(tightData.offers.offer, function (index, offer) {
          if (offer.type == "Bundling" && offer.policyName == "Tight Bundle Policy") {
            $.each(offer.productOffers.productOffer, function (index, productOffer) {
              /*if product have  tight policy and it is not tight itself, remove the action button*/
              if (productOffer.product.id != productID) {
                $('div.dr-product[data-product-id="' + productOffer.product.id + '"]').find('.remove-icon,.value-button-increase,.value-button-decrease').remove();
              }
            });
          }
        });
      },
      error: function error(jqXHR) {
        reject(jqXHR);
      }
    });
  }

  function candyRackCheckAndRender(productID) {
    $.ajax({
      type: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer ".concat(drgc_params.accessToken)
      },
      url: "".concat(apiBaseUrl, "/me/products/").concat(productID, "/point-of-promotions/CandyRack_ShoppingCart/offers?format=json&expand=all"),
      success: function success(candyRackData, textStatus, xhr) {
        $.each(candyRackData.offers.offer, function (index, offer) {
          var promoText = offer.salesPitch[0].length > 0 ? offer.salesPitch[0] : "";
          $.each(offer.productOffers.productOffer, function (index, productOffer) {
            var salePrice = productOffer.pricing.formattedSalePriceWithQuantity;
            var listPrice = productOffer.pricing.formattedListPriceWithQuantity;
            var purchasable = productOffer.product.inventoryStatus.productIsInStock === 'true';
            var buyButtonText = '';

            if (purchasable) {
              buyButtonText = offer.type === 'Up-sell' ? drgc_params.translations.upgrade_label : drgc_params.translations.add_label;
            } else {
              buyButtonText = drgc_params.translations.out_of_stock;
            }

            var candyRackProductHTML = "\n              <div  class=\"dr-product dr-candyRackProduct\" data-product-id=\"".concat(productOffer.product.id, "\" data-parent-product-id=\"").concat(productID, "\">\n                <div class=\"dr-product-content\">\n                    <img src=\"").concat(productOffer.product.thumbnailImage, "\" class=\"dr-candyRackProduct__img\"/>\n                    <div class=\"dr-product__info\">\n                      <div class=\"product-color\">\n                        <span style=\"background-color: yellow;\">").concat(promoText, "</span>\n                      </div>\n                      ").concat(productOffer.product.displayName, "\n                      <div class=\"product-sku\">\n                        <span>").concat(productLabel, "  </span>\n                        <span>#").concat(productOffer.product.id, "</span>\n                      </div>\n                    </div>\n                </div>\n                <div class=\"dr-product__price\">\n                    <button type=\"button\" class=\"dr-btn dr-buy-candyRack\"\n                      data-buy-uri=\"").concat(productOffer.addProductToCart.uri, "\"\n                      ").concat(purchasable ? '' : 'disabled="disabled"', ">").concat(buyButtonText, "</button>\n                    <span class=\"sale-price\">").concat(salePrice, "</span>\n                    <span class=\"regular-price dr-strike-price ").concat(salePrice === listPrice ? 'd-none' : '', "\">").concat(listPrice, "</span>\n                </div>\n              </div>\n              ");
            if ($('div.dr-product[data-product-id="' + productOffer.product.id + '"]:not(.dr-candyRackProduct)').length == 0) $('div[data-product-id="' + productID + '"]').after(candyRackProductHTML);
          });
        });
      },
      error: function error(jqXHR) {
        reject(jqXHR);
      }
    });
  }

  $('body').on('click', '.dr-buy-candyRack', function (e) {
    e.preventDefault();
    var $this = $(e.target);
    var buyUri = $this.attr('data-buy-uri');
    $.ajax({
      type: 'POST',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": "Bearer ".concat(drgc_params.accessToken)
      },
      url: function () {
        var url = buyUri;
        if (drgc_params.testOrder == "true") url += '&testOrder=true';
        return url;
      }(),
      success: function success(data, textStatus, xhr) {
        fetchFreshCart();
      },
      error: function error(jqXHR) {
        checkout_utils.apiErrorHandler(jqXHR);
      }
    });
  });

  function getpermalink(permalinkProductId) {
    return new Promise(function (resolve, reject) {
      $.ajax({
        type: 'POST',
        url: drgc_params.ajaxUrl,
        data: {
          action: 'get_permalink',
          productID: permalinkProductId
        },
        success: function success(data) {
          resolve(data);
        },
        error: function error(jqXHR) {
          reject(jqXHR);
        }
      });
    });
  }

  function updateSummary(data, hasPhysicalProduct) {
    var pricing = data.cart.pricing;

    if (hasPhysicalProduct) {
      $('.dr-summary__shipping').show();
    } else {
      $('.dr-summary__shipping').hide();
    }

    $('div.dr-summary__shipping .shipping-value').text(pricing.formattedShippingAndHandling); //overwrite $0.00 to FREE

    if (pricing.shippingAndHandling.value === 0) $('div.dr-summary__shipping .shipping-value').text(drgc_params.translations.free_label);
    $('div.dr-summary__discount .discount-value').text("-".concat(pricing.formattedDiscount));
    $('div.dr-summary__discounted-subtotal .discounted-subtotal-value').text(pricing.formattedSubtotalWithDiscount);

    if (pricing.discount.value) {
      $('.dr-summary__discount').show();
    } else {
      $('.dr-summary__discount').hide();
    }
  }

  function renderLineItemsAndSummary(data, hasPhysicalProductinLineItem) {
    var min = 1;
    var max = 999;
    var lineItemCount = 0;
    $.each(data.cart.lineItems.lineItem, function (index, lineitem) {
      if (lineitem.product.productType == "PHYSICAL") hasPhysicalProductinLineItem = true;
      var permalinkProductId = lineitem.product.id;
      if (lineitem.product.parentProduct) permalinkProductId = lineitem.product.parentProduct.id;
      var salePrice = lineitem.pricing.formattedSalePriceWithQuantity;
      var listPrice = lineitem.pricing.formattedListPriceWithQuantity;
      getpermalink(permalinkProductId).then(function (response) {
        var permalink = response;
        var lineItemHTML = "\n          <div data-line-item-id=\"".concat(lineitem.id, "\" class=\"dr-product dr-product-lineitem\" data-product-id=\"").concat(lineitem.product.id, "\" data-sort=\"").concat(index, "\">\n            <div class=\"dr-product-content\">\n                <div class=\"dr-product__img\" style=\"background-image: url(").concat(lineitem.product.thumbnailImage, ")\"></div>\n                <div class=\"dr-product__info\">\n                    <a class=\"product-name\" href=\"").concat(permalink, "\">").concat(lineitem.product.displayName, "</a>\n                    <div class=\"product-sku\">\n                        <span>").concat(productLabel, " </span>\n                        <span>#").concat(lineitem.product.id, "</span>\n                    </div>\n                    <div class=\"product-qty\">\n                        <span class=\"qty-text\">Qty ").concat(lineitem.quantity, "</span>\n                        <span class=\"dr-pd-cart-qty-minus value-button-decrease ").concat(lineitem.quantity <= min ? 'disabled' : '', "\"></span>\n                        <input type=\"number\" class=\"product-qty-number\" step=\"1\" min=\"").concat(min, "\" max=\"").concat(max, "\" value=\"").concat(lineitem.quantity, "\" maxlength=\"5\" size=\"2\" pattern=\"[0-9]*\" inputmode=\"numeric\" readonly=\"true\">\n                        <span class=\"dr-pd-cart-qty-plus value-button-increase ").concat(lineitem.quantity >= max ? 'disabled' : '', "\"></span>\n                    </div>\n                </div>\n            </div>\n            <div class=\"dr-product__price\">\n                <button class=\"dr-prd-del remove-icon\"></button>\n                <span class=\"sale-price\">").concat(salePrice, "</span>\n                <span class=\"regular-price ").concat(salePrice === listPrice ? 'd-none' : '', "\">").concat(listPrice, "</span>\n            </div>\n          </div>\n          ");
        $('#tempCartProducts').append(lineItemHTML);
        $(".dr-cart__products").html($("#tempCartProducts").html());
      }).then(function () {
        lineItemCount++;

        if (lineItemCount === data.cart.lineItems.lineItem.length) {
          updateSummary(data, hasPhysicalProductinLineItem);
          reOrderCartAndMerchandising(data);
        }
      })["catch"](function (jqXHR) {
        checkout_utils.apiErrorHandler(jqXHR);
      });
    });
  }

  function reOrderCartAndMerchandising(data) {
    //1.Order dr-product-lineitem in temp area
    var $wrapper = $('#tempCartProducts');
    $wrapper.find('.dr-product-lineitem').sort(function (a, b) {
      return +a.dataset.sort - +b.dataset.sort;
    }).appendTo($wrapper); //2. Add banner at last and output lineitems

    shoppingCartBannerAndOutputLineItems(); //3. Main cart item displayed, Finish loading icon

    $('body').css({
      'pointer-events': 'auto',
      'opacity': 1
    }); //4. Execute candyRackCheckAndRender and tightBundleRemoveElements

    $.each(data.cart.lineItems.lineItem, function (index, lineitem) {
      candyRackCheckAndRender(lineitem.product.id);
      tightBundleRemoveElements(lineitem.product.id);
    });
  }

  function renderCartProduct(data) {
    var hasPhysicalProduct = false;
    $("#tempCartProducts").remove();
    $("<div id='tempCartProducts' style='display:none;'></div>").appendTo('body');

    if (data.cart.lineItems.lineItem) {
      renderLineItemsAndSummary(data, hasPhysicalProduct);
    } else {
      $('.dr-cart__products').text(drgc_params.translations.empty_cart_msg);
      $('#cart-estimate').hide();
    }
  }

  $('body').on('change', '.dr-currency-select', function (e) {
    e.preventDefault();
    $('body').css({
      'pointer-events': 'none',
      'opacity': 0.5
    });
    var data = {
      currency: e.target.value,
      locale: $(this).find('option:selected').attr('data-locale')
    };
    $.ajax({
      type: 'POST',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": "Bearer ".concat(drgc_params.accessToken)
      },
      url: "".concat(apiBaseUrl, "/me?currency=").concat(data.currency, "&locale=").concat(data.locale),
      success: function success(data, textStatus, xhr) {
        if (xhr.status === 204) {
          location.reload(true);
        }
      },
      error: function error(jqXHR) {
        reject(jqXHR);
      }
    });
  });
  $('.promo-code-toggle').click(function () {
    $('.promo-code-wrapper').toggle();
  });
  $('#apply-promo-code-btn').click(function (e) {
    var promoCode = $('#promo-code').val();

    if (!$.trim(promoCode)) {
      $('#dr-promo-code-err-field').text(drgc_params.translations.invalid_promo_code_msg).show();
      return;
    }

    $(e.target).addClass('sending').blur();
    commerce_api.updateCart({
      promoCode: promoCode
    }).then(function () {
      $(e.target).removeClass('sending');
      $('#dr-promo-code-err-field').text('').hide();
      fetchFreshCart();
    })["catch"](function (jqXHR) {
      $(e.target).removeClass('sending');

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
  /*init cart via JS*/

  if ($('#dr-cart-page-wrapper').length) {
    fetchFreshCart();
    var digitalriverjs = new DigitalRiver(drgc_params.digitalRiverKey);
    checkout_utils.applyLegalLinks(digitalriverjs);

    if ($('#dr-autoRenewTermsContainer').length) {
      CartModule.initAutoRenewalTerms(digitalriverjs);
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
    floatField.addEventListener('focus', handleFocus);
    floatField.addEventListener('blur', handleBlur);
  }; // get DOM elements


  var init = function init() {
    var floatContainers = document.querySelectorAll('.float-container');

    for (var i = 0; i < floatContainers.length; i++) {
      var element = floatContainers[i];

      if (element.querySelector('input').value) {
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
// EXTERNAL MODULE: ./node_modules/@babel/runtime/regenerator/index.js
var regenerator = __webpack_require__(1);
var regenerator_default = /*#__PURE__*/__webpack_require__.n(regenerator);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/asyncToGenerator.js
var asyncToGenerator = __webpack_require__(2);
var asyncToGenerator_default = /*#__PURE__*/__webpack_require__.n(asyncToGenerator);

// CONCATENATED MODULE: ./assets/js/public/payment-googlepay.js






var DRGooglePay = function ($, translations) {
  var isConnectionSecure =
  /*#__PURE__*/
  function () {
    var _ref = asyncToGenerator_default()(
    /*#__PURE__*/
    regenerator_default.a.mark(function _callee() {
      var canPay, details;
      return regenerator_default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              canPay = false;
              details = {
                total: {
                  label: 'Total',
                  amount: {
                    currency: 'USD',
                    value: '0.00'
                  }
                }
              };

              if (!window.PaymentRequest) {
                _context.next = 6;
                break;
              }

              _context.next = 5;
              return new PaymentRequest([{
                supportedMethods: 'basic-card'
              }], details).canMakePayment();

            case 5:
              canPay = _context.sent;

            case 6:
              ;
              return _context.abrupt("return", canPay);

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function isConnectionSecure() {
      return _ref.apply(this, arguments);
    };
  }();

  var initGooglePayEvents = function initGooglePayEvents(googlepay, requestShipping) {
    googlepay.on('ready', function () {
      drgc_params.googlePayBtnStatus = 'READY';
      checkout_utils.displayPreTAndC();
    });
    googlepay.on('shippingaddresschange', function (event) {
      var shippingAddress = event.shippingAddress;

      if (shippingAddress.address.country === 'US') {
        var cartRequest = {
          shippingAddress: {
            id: 'shippingAddress',
            city: shippingAddress.address.city,
            countrySubdivision: shippingAddress.address.state,
            postalCode: shippingAddress.address.postalCode,
            country: shippingAddress.address.country
          }
        };
        commerce_api.updateCart({
          expand: 'all'
        }, cartRequest).then(function (data) {
          var displayItems = checkout_utils.createDisplayItems(data.cart);
          var shippingOptions = checkout_utils.createShippingOptions(data.cart);
          checkout_utils.updateShippingOptions(shippingOptions, data.cart.shippingMethod.code);
          var requestUpdateObject = {
            total: {
              label: translations.order_total_label,
              amount: data.cart.pricing.orderTotal.value
            },
            displayItems: displayItems,
            shippingOptions: shippingOptions
          };
          requestUpdateObject.status = 'success';
          event.updateWith(requestUpdateObject);
        })["catch"](function (jqXHR) {
          event.updateWith({
            status: 'failure',
            error: {
              message: jqXHR.responseJSON.errors.error[0].description
            }
          });
        });
      } else {
        event.updateWith({
          status: 'failure',
          error: {
            message: 'We can only ship to the US.'
          }
        });
      }
    });
    googlepay.on('shippingoptionchange', function (event) {
      var shippingOption = event.shippingOption;
      commerce_api.applyShippingOption(shippingOption.id).then(function (data) {
        var displayItems = checkout_utils.createDisplayItems(data.cart);
        var shippingOptions = checkout_utils.createShippingOptions(data.cart);
        checkout_utils.updateShippingOptions(shippingOptions, shippingOption.id);
        var requestUpdateObject = {
          status: 'success',
          total: {
            label: translations.order_total_label,
            amount: data.cart.pricing.orderTotal.value
          },
          displayItems: displayItems,
          shippingOptions: shippingOptions
        };
        event.updateWith(requestUpdateObject);
        checkout_utils.updateSummaryPricing(data.cart);
      })["catch"](function (jqXHR) {
        event.updateWith({
          status: 'failure',
          error: {
            message: jqXHR.responseJSON.errors.error[0].description
          }
        });
      });
    });
    googlepay.on('source', function (event) {
      var cartRequest = {
        cart: {}
      };
      var sourceId = event.source.id;
      var billingAddressObj = {
        id: 'billingAddress',
        firstName: event.billingAddress.firstName,
        lastName: event.billingAddress.lastName,
        line1: event.billingAddress.address.line1,
        line2: event.billingAddress.address.line2,
        city: event.billingAddress.address.city,
        countrySubdivision: event.billingAddress.address.state,
        postalCode: event.billingAddress.address.postalCode,
        country: event.billingAddress.address.country,
        phoneNumber: event.billingAddress.phone,
        emailAddress: event.billingAddress.email
      };
      cartRequest.cart.billingAddress = billingAddressObj;

      if (requestShipping) {
        var shippingAddressObj = {
          id: 'shippingAddress',
          firstName: event.shippingAddress.firstName,
          lastName: event.shippingAddress.lastName,
          line1: event.shippingAddress.address.line1,
          line2: event.shippingAddress.address.line2,
          city: event.shippingAddress.address.city,
          countrySubdivision: event.shippingAddress.address.state,
          postalCode: event.shippingAddress.address.postalCode,
          country: event.shippingAddress.address.country,
          phoneNumber: event.shippingAddress.phone,
          emailAddress: event.shippingAddress.email
        };
        cartRequest.cart.shippingAddress = shippingAddressObj;
      }

      sessionStorage.setItem('paymentSourceId', sourceId);
      $('body').css({
        'pointer-events': 'none',
        'opacity': 0.5
      });
      commerce_api.updateCart({
        expand: 'all'
      }, cartRequest).then(function () {
        commerce_api.applyPaymentAndSubmitCart(sourceId);
      })["catch"](function (jqXHR) {
        checkout_utils.displayAlertMessage(jqXHR.responseJSON.errors.error[0].description);
        checkout_utils.resetBodyOpacity();
      });
      event.complete('success');
    });
  };

  var init = function init(params) {
    var _ref2 = params || {},
        digitalriverJs = _ref2.digitalriverJs,
        paymentDataRequest = _ref2.paymentDataRequest,
        _ref2$requestShipping = _ref2.requestShipping,
        requestShipping = _ref2$requestShipping === void 0 ? false : _ref2$requestShipping;

    if (typeof_default()(digitalriverJs) !== 'object') {
      throw new Error('Please pass an instance of the DigitalRiver object.');
    }

    if (typeof_default()(paymentDataRequest) !== 'object') {
      throw new Error('Please pass a PaymentDataRequest object.');
    }

    var googlepay = digitalriverJs.createElement('googlepay', paymentDataRequest);

    if (googlepay.canMakePayment() && isConnectionSecure()) {
      drgc_params.googlePayBtnStatus = 'LOADING';
      initGooglePayEvents(googlepay, requestShipping);
      googlepay.mount('dr-googlepay-button');
      document.getElementById('dr-googlepay-button').style.border = 'none';
      return googlepay;
    } else {
      drgc_params.googlePayBtnStatus = 'UNAVAILABLE';
      $('.dr-checkout__googlepay').hide();
      return false;
    }
  };

  return {
    init: init
  };
}(jQuery, drgc_params.translations);

/* harmony default export */ var payment_googlepay = (DRGooglePay);
// CONCATENATED MODULE: ./assets/js/public/payment-applepay.js




var DRApplePay = function ($, translations) {
  var initApplePayEvents = function initApplePayEvents(applepay, requestShipping) {
    applepay.on('ready', function () {
      drgc_params.applePayBtnStatus = 'READY';
      checkout_utils.displayPreTAndC();
    });
    applepay.on('shippingaddresschange', function (event) {
      var shippingAddress = event.shippingAddress;

      if (shippingAddress.address.postalCode === '') {
        event.updateWith({
          status: 'failure',
          error: {
            fields: {
              postalCode: 'Your postal code is invalid.'
            }
          }
        });
      } else if (shippingAddress.address.city === '') {
        event.updateWith({
          status: 'failure',
          error: {
            fields: {
              city: 'Your city is invalid.'
            }
          }
        });
      } else if (shippingAddress.address.state === '') {
        event.updateWith({
          status: 'failure',
          error: {
            fields: {
              region: 'Your region value is invalid. Please supply a different one.'
            }
          }
        });
      } else if (shippingAddress.address.country !== 'US') {
        event.updateWith({
          status: 'failure',
          error: {
            message: 'We can only ship to the US.'
          }
        });
      } else {
        if (requestShipping) {
          var cartRequest = {
            cart: {
              shippingAddress: {
                id: 'shippingAddress',
                city: shippingAddress.address.city,
                countrySubdivision: shippingAddress.address.state,
                postalCode: shippingAddress.address.postalCode,
                country: shippingAddress.address.country
              }
            }
          };
          commerce_api.updateCart({
            expand: 'all'
          }, cartRequest).then(function (data) {
            var displayItems = checkout_utils.createDisplayItems(data.cart);
            var shippingOptions = checkout_utils.createShippingOptions(data.cart);
            checkout_utils.updateShippingOptions(shippingOptions, data.cart.shippingMethod.code);
            var requestUpdateObject = {
              total: {
                label: translations.order_total_label,
                amount: data.cart.pricing.orderTotal.value
              },
              displayItems: displayItems,
              shippingOptions: shippingOptions
            };
            requestUpdateObject.status = 'success';
            event.updateWith(requestUpdateObject);
          })["catch"](function (jqXHR) {
            event.updateWith({
              status: 'failure',
              error: {
                message: jqXHR.responseJSON.errors.error[0].description
              }
            });
          });
        } else {
          commerce_api.getCart({
            expand: 'all'
          }).then(function (data) {
            var displayItems = checkout_utils.createDisplayItems(data.cart);
            var requestUpdateObject = {
              total: {
                label: translations.order_total_label,
                amount: data.cart.pricing.orderTotal.value
              },
              displayItems: displayItems
            };
            requestUpdateObject.status = 'success';
            event.updateWith(requestUpdateObject);
          })["catch"](function (jqXHR) {
            event.updateWith({
              status: 'failure',
              error: {
                message: jqXHR.responseJSON.errors.error[0].description
              }
            });
          });
        }
      }
    });
    applepay.on('shippingoptionchange', function (event) {
      var shippingOption = event.shippingOption;
      commerce_api.applyShippingOption(shippingOption.id).then(function (data) {
        var displayItems = checkout_utils.createDisplayItems(data.cart);
        var shippingOptions = checkout_utils.createShippingOptions(data.cart);
        checkout_utils.updateShippingOptions(shippingOptions, shippingOption.id);
        var requestUpdateObject = {
          status: 'success',
          total: {
            label: translations.order_total_label,
            amount: data.cart.pricing.orderTotal.value
          },
          displayItems: displayItems,
          shippingOptions: shippingOptions
        };
        event.updateWith(requestUpdateObject);
        checkout_utils.updateSummaryPricing(data.cart);
      })["catch"](function (jqXHR) {
        event.updateWith({
          status: 'failure',
          error: {
            message: jqXHR.responseJSON.errors.error[0].description
          }
        });
      });
    });
    applepay.on('source', function (event) {
      var cartRequest = {
        cart: {}
      };
      var sourceId = event.source.id;
      var billingAddressObj = {
        id: 'billingAddress',
        firstName: event.billingAddress.firstName,
        lastName: event.billingAddress.lastName,
        line1: event.billingAddress.address.line1,
        line2: event.billingAddress.address.line2,
        city: event.billingAddress.address.city,
        countrySubdivision: event.billingAddress.address.state,
        postalCode: event.billingAddress.address.postalCode,
        country: event.billingAddress.address.country,
        phoneNumber: event.billingAddress.phone,
        emailAddress: event.billingAddress.email
      };
      cartRequest.cart.billingAddress = billingAddressObj;

      if (requestShipping) {
        var shippingAddressObj = {
          id: 'shippingAddress',
          firstName: event.shippingAddress.firstName,
          lastName: event.shippingAddress.lastName,
          line1: event.shippingAddress.address.line1,
          line2: event.shippingAddress.address.line2,
          city: event.shippingAddress.address.city,
          countrySubdivision: event.shippingAddress.address.state,
          postalCode: event.shippingAddress.address.postalCode,
          country: event.shippingAddress.address.country,
          phoneNumber: event.shippingAddress.phone,
          emailAddress: event.shippingAddress.email
        };
        cartRequest.cart.shippingAddress = shippingAddressObj;
      }

      sessionStorage.setItem('paymentSourceId', sourceId);
      $('body').css({
        'pointer-events': 'none',
        'opacity': 0.5
      });
      commerce_api.updateCart({
        expand: 'all'
      }, cartRequest).then(function () {
        commerce_api.applyPaymentAndSubmitCart(sourceId);
      })["catch"](function (jqXHR) {
        checkout_utils.displayAlertMessage(jqXHR.responseJSON.errors.error[0].description);
        checkout_utils.resetBodyOpacity();
      });
      event.complete('success');
    });
  };

  var init = function init(params) {
    var _ref = params || {},
        digitalriverJs = _ref.digitalriverJs,
        paymentDataRequest = _ref.paymentDataRequest,
        _ref$requestShipping = _ref.requestShipping,
        requestShipping = _ref$requestShipping === void 0 ? false : _ref$requestShipping;

    if (typeof_default()(digitalriverJs) !== 'object') {
      throw new Error('Please pass an instance of the DigitalRiver object.');
    }

    if (typeof_default()(paymentDataRequest) !== 'object') {
      throw new Error('Please pass a PaymentDataRequest object.');
    }

    var applepay = digitalriverJs.createElement('applepay', paymentDataRequest);

    if (applepay.canMakePayment()) {
      drgc_params.applePayBtnStatus = 'LOADING';
      initApplePayEvents(applepay, requestShipping);
      applepay.mount('dr-applepay-button');
      document.getElementById('dr-applepay-button').style.border = 'none';
      return applepay;
    } else {
      drgc_params.applePayBtnStatus = 'UNAVAILABLE';
      $('.dr-checkout__applepay').hide();
      return false;
    }
  };

  return {
    init: init
  };
}(jQuery, drgc_params.translations);

/* harmony default export */ var payment_applepay = (DRApplePay);
// CONCATENATED MODULE: ./assets/js/public/public-checkout.js
 // 3rd-party plugin






var CheckoutModule = function ($) {
  var initPreTAndC = function initPreTAndC() {
    $('#dr-preTAndC').change(function (e) {
      if ($(e.target).is(':checked')) {
        $('#dr-preTAndC-err-msg').text('').hide();
        $('.dr-cloudpay-btn').css({
          'pointer-events': 'auto'
        });
      } else {
        $('.dr-cloudpay-btn').css({
          'pointer-events': 'none'
        });
      }
    });
    $('.dr-cloudpay-btn-wrapper').click(function () {
      if (!$('#dr-preTAndC').is(':checked')) {
        $('#dr-preTAndC-err-msg').text(drgc_params.translations.required_tandc_msg).show();
      }
    });
    $('#dr-preTAndC').trigger('change');
  };

  var shouldDisplayVat = function shouldDisplayVat() {
    var currency = $('.dr-currency-select').val();
    return currency === 'GBP' || currency === 'EUR';
  };

  var updateSummaryLabels = function updateSummaryLabels() {
    if ($('.dr-checkout__payment').hasClass('active') || $('.dr-checkout__confirmation').hasClass('active')) {
      $('.dr-summary__tax .item-label').text(shouldDisplayVat() ? drgc_params.translations.vat_label : drgc_params.translations.tax_label);
      $('.dr-summary__shipping .item-label').text(drgc_params.translations.shipping_label);
    } else {
      $('.dr-summary__tax .item-label').text(shouldDisplayVat() ? drgc_params.translations.estimated_vat_label : drgc_params.translations.estimated_tax_label);
      $('.dr-summary__shipping .item-label').text(drgc_params.translations.estimated_shipping_label);
    }
  };

  var getCountryOptionsFromGC = function getCountryOptionsFromGC() {
    var selectedLocale = $('.dr-currency-select option:selected').data('locale') || drgc_params.drLocale;
    return new Promise(function (resolve, reject) {
      $.ajax({
        type: 'GET',
        url: "https://drh-fonts.img.digitalrivercontent.net/store/".concat(drgc_params.siteID, "/").concat(selectedLocale, "/DisplayPage/id.SimpleRegistrationPage"),
        success: function success(response) {
          var addressTypes = drgc_params.cart.cart.hasPhysicalProduct ? ['shipping', 'billing'] : ['billing'];
          addressTypes.forEach(function (type) {
            var savedCountryCode = $("#".concat(type, "-field-country")).val();
            var $options = $(response).find("select[name=".concat(type.toUpperCase(), "country] option")).not(':first');
            var optionArr = $.map($options, function (option) {
              return option.value;
            });
            $("#".concat(type, "-field-country option")).not(':first').remove();
            $("#".concat(type, "-field-country")).append($options).val(savedCountryCode.indexOf(optionArr) > -1 ? savedCountryCode : '');
          });
          resolve();
        },
        error: function error(jqXHR) {
          reject(jqXHR);
        }
      });
    });
  };

  return {
    initPreTAndC: initPreTAndC,
    updateSummaryLabels: updateSummaryLabels,
    getCountryOptionsFromGC: getCountryOptionsFromGC
  };
}(jQuery);

jQuery(document).ready(function ($) {
  if ($('#checkout-payment-form').length) {
    var getAddress = function getAddress(addressType) {
      var address = {
        address: {
          nickName: $('#' + addressType + '-field-address1').val(),
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
      return address;
    };

    var saveShippingAddress = function saveShippingAddress() {
      var address = getAddress('shipping');
      address.address.isDefault = true;
      saveShopperAddress(JSON.stringify(address));
    };

    var saveBillingAddress = function saveBillingAddress() {
      var address = getAddress('billing');
      address.address.isDefault = false;
      saveShopperAddress(JSON.stringify(address));
    };

    var saveShopperAddress = function saveShopperAddress(address) {
      $.ajax({
        type: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: "Bearer ".concat(drgc_params.accessToken)
        },
        data: address,
        url: "".concat(apiBaseUrl, "/me/addresses"),
        success: function success() {
          console.log('address update success.');
        },
        error: function error(jqXHR) {
          checkout_utils.apiErrorHandler(jqXHR);
        }
      });
    }; //floating labels


    var prepareAddress = function prepareAddress($form) {
      var addressType = $form.attr('id') === 'checkout-shipping-form' ? 'shipping' : 'billing'; // Validate form

      $form.addClass('was-validated');
      $form.find('.dr-err-field').hide();
      var validateItems = document.querySelectorAll("[name^=".concat(addressType, "-]"));

      for (var i = 0, len = validateItems.length; i < len; i++) {
        if ($(validateItems[i]).is(':visible') && validateItems[i].checkValidity() === false) {
          return false;
        }
      } // Build payload


      $.each($form.serializeArray(), function (index, obj) {
        var key = obj.name.split('-')[1];
        payload[addressType][key] = obj.value;
      });
      payload[addressType].emailAddress = emailPayload;

      if (payload[addressType].country !== 'US') {
        payload[addressType].countrySubdivision = '';
      }

      return true;
    };

    var displaySavedAddress = function displaySavedAddress(addressObj, $target) {
      var addressArr = ["".concat(addressObj.firstName, " ").concat(addressObj.lastName), addressObj.line1, addressObj.city, addressObj.country];
      $target.text(addressArr.join(', '));
    };

    var displayAddressErrMsg = function displayAddressErrMsg(jqXHR, $target) {
      if (jqXHR.status === 409) {
        if (jqXHR.responseJSON.errors.error[0].code === 'restricted-bill-to-country') {
          $target.text(drgc_params.translations.address_error_msg).show();
        } else if (jqXHR.responseJSON.errors.error[0].code === 'restricted-ship-to-country') {
          $target.text(drgc_params.translations.address_error_msg).show();
        } else {
          $target.text(drgc_params.translations.undefined_error_msg).show();
        }
      } else {
        $target.text(jqXHR.responseJSON.errors.error[0].description).show();
      }
    };

    var moveToNextSection = function moveToNextSection($section) {
      var $prevSection = $section.prev();
      var $nextSection = $section.next();

      if ($('.dr-checkout__el').index($section) > finishedSectionIdx) {
        finishedSectionIdx = $('.dr-checkout__el').index($section);
      }

      $section.removeClass('active').addClass('closed');
      $nextSection.addClass('active').removeClass('closed');

      if ($nextSection.hasClass('small-closed-left')) {
        $nextSection.removeClass('small-closed-left');
        $nextSection.next().removeClass('small-closed-right');
      }

      adjustColumns($section);
      CheckoutModule.updateSummaryLabels();
      $('html, body').animate({
        scrollTop: $nextSection.first().offset().top - 80
      }, 500);
    };

    var updateSummaryPricing = function updateSummaryPricing(cart) {
      var _cart$pricing = cart.pricing,
          formattedOrderTotal = _cart$pricing.formattedOrderTotal,
          formattedTax = _cart$pricing.formattedTax;

      if (Object.keys(cart.shippingMethod).length > 0) {
        var formattedShippingAndHandling = cart.pricing.shippingAndHandling.value === 0 ? drgc_params.translations.free_label : cart.pricing.formattedShippingAndHandling;
        $('div.dr-summary__shipping > .item-value').text(formattedShippingAndHandling);
      }

      $('div.dr-summary__tax > .item-value').text(formattedTax);
      $('div.dr-summary__total > .total-value').text(formattedOrderTotal);
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

    var setShippingOptions = function setShippingOptions(cart) {
      var freeShipping = cart.pricing.shippingAndHandling.value === 0;
      var shippingOptionId = cart.shippingMethod.code;
      $.each(cart.shippingOptions.shippingOption, function (index, option) {
        if ($('#shipping-option-' + option.id).length) return;
        var html = "\n                    <div class=\"field-radio\">\n                        <input type=\"radio\"\n                            name=\"selector\"\n                            id=\"shipping-option-".concat(option.id, "\"\n                            data-cost=\"").concat(option.formattedCost, "\"\n                            data-id=\"").concat(option.id, "\"\n                            data-desc=\"").concat(option.description, "\"\n                            >\n                        <label for=\"shipping-option-").concat(option.id, "\">\n                            <span>\n                                ").concat(option.description, "\n                            </span>\n                            <span class=\"black\">\n                                ").concat(freeShipping ? drgc_params.translations.free_label : option.formattedCost, "\n                            </span>\n                        </label>\n                    </div>\n                ");
        $('form#checkout-delivery-form .dr-panel-edit__el').append(html);
      });
      $('form#checkout-delivery-form').children().find('input:radio[data-id="' + shippingOptionId + '"]').prop("checked", true);
    };

    var applyShippingOption = function applyShippingOption() {
      var shippingOptionId = $('form#checkout-delivery-form').children().find('input:radio:checked').first().data('id');
      applyShippingAndUpdateCart(shippingOptionId);
    }; // Submit delivery form


    var makeSureShippingOptionPreSelected = function makeSureShippingOptionPreSelected(data) {
      // If default shipping option is not in the list, then pre-select the 1st one
      var defaultShippingOption = data.cart.shippingMethod.code;
      var shippingOptions = data.cart.shippingOptions.shippingOption || [];
      shippingOptions = shippingOptions.map(function (option) {
        return option.id;
      });

      if (shippingOptions.length && shippingOptions.indexOf(defaultShippingOption) === -1) {
        return applyShippingAndUpdateCart(shippingOptions[0]);
      } else {
        return new Promise(function (resolve) {
          return resolve(data);
        });
      }
    };

    var applyShippingAndUpdateCart = function applyShippingAndUpdateCart(shippingOptionId) {
      var data = {
        expand: 'all',
        shippingOptionId: shippingOptionId
      };
      return new Promise(function (resolve, reject) {
        $.ajax({
          type: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: "Bearer ".concat(drgc_params.accessToken)
          },
          url: "".concat(apiBaseUrl, "/me/carts/active/apply-shipping-option?").concat($.param(data)),
          success: function success(data) {
            updateSummaryPricing(data.cart);
            resolve(data);
          },
          error: function error(jqXHR) {
            reject(jqXHR);
          }
        });
      });
    }; // Initial state for payPal


    var applyPaymentToCart = function applyPaymentToCart(id) {
      if (!id) return;
      var data = {
        'paymentMethod': {
          'sourceId': id
        }
      };
      $.ajax({
        type: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: "Bearer ".concat(drgc_params.accessToken)
        },
        url: "".concat(apiBaseUrl, "/me/carts/active/apply-payment-method?expand=all"),
        data: JSON.stringify(data),
        success: function success() {
          submitCart();
        },
        error: function error(jqXHR) {
          $('form#checkout-confirmation-form').find('button[type="submit"]').removeClass('sending').blur();
          $('#dr-checkout-err-field').text(jqXHR.responseJSON.errors.error[0].description).show();
          $('body').css({
            'pointer-events': 'auto',
            'opacity': 1
          });
        }
      });
    };

    var submitCart = function submitCart() {
      $.ajax({
        type: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: "Bearer ".concat(drgc_params.accessToken)
        },
        url: "".concat(apiBaseUrl, "/me/carts/active/submit-cart?expand=all"),
        success: function success(data) {
          $('#checkout-confirmation-form input[name="order_id"]').val(data.submitCart.order.id);
          $('#checkout-confirmation-form').submit();
        },
        error: function error(jqXHR) {
          $('form#checkout-confirmation-form').find('button[type="submit"]').removeClass('sending').blur();
          $('#dr-checkout-err-field').text(jqXHR.responseJSON.errors.error[0].description).show();
          $('body').css({
            'pointer-events': 'auto',
            'opacity': 1
          });
        }
      });
    }; // check billing info


    var domain = drgc_params.domain;
    var isLogin = drgc_params.isLogin;
    var apiBaseUrl = 'https://' + domain + '/v1/shoppers';
    var drLocale = drgc_params.drLocale || 'en_US';
    var cartData = drgc_params.cart.cart;
    var requestShipping = cartData.shippingOptions.shippingOption ? true : false;
    var isGooglePayEnabled = drgc_params.isGooglePayEnabled === 'true';
    var isApplePayEnabled = drgc_params.isApplePayEnabled === 'true';
    float_label.init(); // Globals

    var digitalriverjs = new DigitalRiver(drgc_params.digitalRiverKey);
    var payload = {
      shipping: {},
      billing: {}
    };
    var paymentPayload = {};
    var paymentSourceId = null; // Section progress

    var finishedSectionIdx = -1; // Submit first (email) form

    var emailPayload;

    if (cartData.totalItemsInCart) {
      CheckoutModule.getCountryOptionsFromGC().then(function () {
        $('#shipping-field-country, #billing-field-country').trigger('change');
      });
    }

    checkout_utils.applyLegalLinks(digitalriverjs);
    CheckoutModule.initPreTAndC(); // Create elements through DR.js

    if ($('.credit-card-section').length) {
      var getStyleOptionsFromClass = function getStyleOptionsFromClass(className) {
        var tempDiv = document.createElement('div');
        tempDiv.setAttribute('id', 'tempDiv' + className);
        tempDiv.className = className;
        document.body.appendChild(tempDiv);
        var tempDivEl = document.getElementById('tempDiv' + className);
        var tempStyle = window.getComputedStyle(tempDivEl);
        var styles = {
          color: tempStyle.color,
          fontFamily: tempStyle.fontFamily.replace(new RegExp('"', 'g'), ''),
          fontSize: tempStyle.fontSize,
          height: tempStyle.height
        };
        document.body.removeChild(tempDivEl);
        return styles;
      };

      var activeCardLogo = function activeCardLogo(evt) {
        $('.cards .active').removeClass('active');

        if (evt.brand && evt.brand !== 'unknown') {
          $(".cards .".concat(evt.brand, "-icon")).addClass('active');
        }
      };

      var displayDRElementError = function displayDRElementError(evt, $target) {
        if (evt.error) {
          $target.text(evt.error.message).show();
        } else {
          $target.text('').hide();
        }
      };

      var options = {
        classes: {
          base: 'DRElement',
          complete: 'DRElement--complete',
          empty: 'DRElement--empty',
          invalid: 'DRElement--invalid'
        },
        style: {
          base: getStyleOptionsFromClass('DRElement'),
          complete: getStyleOptionsFromClass('DRElement--complete'),
          empty: getStyleOptionsFromClass('DRElement--empty'),
          invalid: getStyleOptionsFromClass('DRElement--invalid')
        }
      };
      var cardNumber = digitalriverjs.createElement('cardnumber', options);
      var cardExpiration = digitalriverjs.createElement('cardexpiration', Object.assign({}, options, {
        placeholderText: 'MM/YY'
      }));
      var cardCVV = digitalriverjs.createElement('cardcvv', Object.assign({}, options, {
        placeholderText: 'CVV'
      }));
      cardNumber.mount('card-number');
      cardExpiration.mount('card-expiration');
      cardCVV.mount('card-cvv');
      cardNumber.on('change', function (evt) {
        activeCardLogo(evt);
        displayDRElementError(evt, $('#card-number-error'));
      });
      cardExpiration.on('change', function (evt) {
        displayDRElementError(evt, $('#card-expiration-error'));
      });
      cardCVV.on('change', function (evt) {
        displayDRElementError(evt, $('#card-cvv-error'));
      });
    }

    $('#checkout-email-form').on('submit', function (e) {
      e.preventDefault(); // If no items are in cart, do not even continue, maybe give feedback

      if (!drgc_params.cart.cart.lineItems.hasOwnProperty('lineItem')) return;
      var $form = $('#checkout-email-form');
      var email = $form.find('input[name=email]').val().trim();
      $form.addClass('was-validated');

      if ($form[0].checkValidity() === false) {
        return false;
      }

      emailPayload = email;
      var $section = $('.dr-checkout__email');
      $section.find('.dr-panel-result__text').text(emailPayload);
      moveToNextSection($section);
    });

    if ($('input[name=email]').val() && $('#checkout-email-form').length) {
      $('#checkout-email-form').submit();
    } // Submit shipping info form


    $('#checkout-shipping-form').on('submit', function (e) {
      e.preventDefault();
      var $form = $(e.target);
      var $button = $form.find('button[type="submit"]');
      var isFormValid = prepareAddress($form);
      if (!isFormValid) return;
      var cartRequest = {
        cart: {
          shippingAddress: payload.shipping
        }
      };
      $button.addClass('sending').blur();
      commerce_api.updateCart({
        expand: 'all'
      }, cartRequest).then(function (data) {
        if (isLogin === 'true') saveShippingAddress();
        return makeSureShippingOptionPreSelected(data);
      }).then(function (data) {
        $button.removeClass('sending').blur();
        setShippingOptions(data.cart);
        var $section = $('.dr-checkout__shipping');
        displaySavedAddress(data.cart.shippingAddress, $section.find('.dr-panel-result__text'));
        moveToNextSection($section);
        updateSummaryPricing(data.cart);
      })["catch"](function (jqXHR) {
        $button.removeClass('sending').blur();
        displayAddressErrMsg(jqXHR, $form.find('.dr-err-field'));
      });
    });
    $('#checkout-billing-form').on('submit', function (e) {
      e.preventDefault();
      var $form = $(e.target);
      var $button = $form.find('button[type="submit"]');
      var billingSameAsShipping = $('[name="checkbox-billing"]').is(':visible:checked');
      var isFormValid = prepareAddress($form);
      if (!isFormValid) return;
      if (billingSameAsShipping) payload.billing = Object.assign({}, payload.shipping);
      var cartRequest = {
        cart: {
          billingAddress: payload.billing
        }
      };
      $button.addClass('sending').blur();
      commerce_api.updateCart({
        expand: 'all'
      }, cartRequest).then(function (data) {
        if (isLogin == 'true') {
          if (requestShipping && !billingSameAsShipping || !requestShipping) {
            saveBillingAddress();
          }
        } // Still needs to apply shipping option once again or the value will be rolled back after updateCart (API's bug)


        return drgc_params.cart.cart.hasPhysicalProduct ? makeSureShippingOptionPreSelected(data) : new Promise(function (resolve) {
          return resolve(data);
        });
      }).then(function (data) {
        $button.removeClass('sending').blur();
        setShippingOptions(data.cart);
        var $section = $('.dr-checkout__billing');
        displaySavedAddress(data.cart.billingAddress, $section.find('.dr-panel-result__text'));
        moveToNextSection($section);
        updateSummaryPricing(data.cart);
      })["catch"](function (jqXHR) {
        $button.removeClass('sending').blur();
        displayAddressErrMsg(jqXHR, $form.find('.dr-err-field'));
      });
    });
    $('form#checkout-delivery-form').on('submit', function (e) {
      e.preventDefault();
      var $form = $(e.target);
      var $input = $(this).children().find('input:radio:checked').first();
      var $button = $(this).find('button[type="submit"]').toggleClass('sending').blur(); // Validate shipping option

      var data = {
        expand: 'all',
        shippingOptionId: $input.data('id')
      };
      $form.find('.dr-err-field').hide();
      $.ajax({
        type: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: "Bearer ".concat(drgc_params.accessToken)
        },
        url: "".concat(apiBaseUrl, "/me/carts/active/apply-shipping-option?").concat($.param(data)),
        success: function success(data) {
          $button.removeClass('sending').blur();
          var $section = $('.dr-checkout__delivery');
          var freeShipping = data.cart.pricing.shippingAndHandling.value === 0;
          var resultText = "".concat($input.data('desc'), " ").concat(freeShipping ? drgc_params.translations.free_label : $input.data('cost'));
          $section.find('.dr-panel-result__text').text(resultText);
          moveToNextSection($section);
          updateSummaryPricing(data.cart);
        },
        error: function error(jqXHR) {
          $button.removeClass('sending').blur();
          displayAddressErrMsg(jqXHR, $form.find('.dr-err-field'));
        }
      });
    });
    $('form#checkout-delivery-form').on('change', 'input[type="radio"]', function () {
      applyShippingOption();
    });
    $('form#checkout-payment-form').on('submit', function (e) {
      e.preventDefault();
      var $form = $('form#checkout-payment-form');
      var $button = $form.find('button[type="submit"]');
      $form.addClass('was-validated');

      if ($form[0].checkValidity() === false) {
        return false;
      }

      var formdata = $(this).serializeArray();
      paymentPayload = {};
      $(formdata).each(function (index, obj) {
        paymentPayload[obj.name] = obj.value;
      });
      $('#dr-payment-failed-msg, #dr-checkout-err-field').text('').hide();
      var $section = $('.dr-checkout__payment');

      if (paymentPayload.selector === 'credit-card') {
        var cart = drgc_params.cart.cart;
        var creditCardPayload = {
          type: 'creditCard',
          owner: {
            firstName: payload.billing.firstName,
            lastName: payload.billing.lastName,
            email: payload.billing.emailAddress,
            address: {
              line1: payload.billing.line1,
              city: payload.billing.city,
              state: payload.billing.countrySubdivision,
              country: payload.billing.country,
              postalCode: payload.billing.postalCode
            }
          },
          amount: cart.pricing.orderTotal.value,
          currency: cart.pricing.orderTotal.currency
        };
        $button.addClass('sending').blur();
        digitalriverjs.createSource(cardNumber, creditCardPayload).then(function (result) {
          $button.removeClass('sending').blur();

          if (result.error) {
            if (result.error.state === 'failed') {
              $('#dr-payment-failed-msg').text(drgc_params.translations.credit_card_error_msg).show();
            }

            if (result.error.errors) {
              $('#dr-payment-failed-msg').text(result.error.errors[0].message).show();
            }
          } else {
            if (result.source.state === 'chargeable') {
              paymentSourceId = result.source.id;
              $section.find('.dr-panel-result__text').text("".concat(drgc_params.translations.credit_card_ending_label, " ").concat(result.source.creditCard.lastFourDigits));
              moveToNextSection($section);
            }
          }
        });
      }
    });
    $('#checkout-confirmation-form button[type="submit"]').on('click', function (e) {
      e.preventDefault();

      if (!$('#dr-tAndC').prop('checked')) {
        $('#dr-checkout-err-field').text(drgc_params.translations.required_tandc_msg).show();
      } else {
        $('#dr-checkout-err-field').text('').hide();
        $(e.target).toggleClass('sending').blur();
        $('#dr-payment-failed-msg').hide();
        applyPaymentToCart(paymentSourceId);
      }
    });

    if (drgc_params.payPal.sourceId) {
      $('.dr-checkout').children().addClass('closed');
      $('.dr-checkout').children().removeClass('active');
      $('.dr-checkout__payment').removeClass('closed').addClass('active');

      if (drgc_params.payPal.failure == 'true') {// TODO: Display Error on paypal form maybe
      }

      if (drgc_params.payPal.success == 'true') {
        applyPaymentToCart(drgc_params.payPal.sourceId);
      }
    }

    $('[name="checkbox-billing"]').on('click', function (ev) {
      var $this = $(this);

      if (!$this.is(':checked')) {
        $('.billing-section').css('display', 'block');
      } else {
        $('.billing-section').css('display', 'none');
      }
    }); // show and hide sections

    $('.dr-accordion__edit').on('click', function (e) {
      e.preventDefault();
      var $section = $(e.target).parent().parent();
      var $allSections = $section.siblings().andSelf();
      var $finishedSections = $allSections.eq(finishedSectionIdx).prevAll().andSelf();
      var $activeSection = $allSections.filter($('.active'));
      var $nextSection = $section.next();
      var $prevSection = $section.prev();

      if ($allSections.index($section) > $allSections.index($activeSection)) {
        return;
      }

      $finishedSections.addClass('closed');
      $activeSection.removeClass('active');
      $section.removeClass('closed').addClass('active');
      adjustColumns();
      CheckoutModule.updateSummaryLabels();
    });

    if ($('#radio-credit-card').is(':checked')) {
      $('.credit-card-info').show();
    }

    $('input:radio[name="selector"]').on('change', function () {
      switch ($(this).val()) {
        case 'credit-card':
          $('#dr-paypal-button').hide();
          $('.credit-card-info').show();
          $('#dr-submit-payment').text(drgc_params.translations.pay_with_card_label.toUpperCase()).show();
          break;

        case 'paypal':
          $('#dr-submit-payment').hide();
          $('.credit-card-info').hide();
          $('#dr-paypal-button').show();
          $('#dr-submit-payment').text(drgc_params.translations.pay_with_paypal_label.toUpperCase());
          break;
      }
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

    if ($('#dr-paypal-button').length) {
      // need to get the actual height of the wrapper for rendering the PayPal button
      $('#checkout-payment-form').removeClass('dr-panel-edit').css('visibility', 'hidden');
      paypal.Button.render({
        env: domain.indexOf('test') === -1 ? 'production' : 'sandbox',
        locale: drLocale,
        style: {
          label: 'checkout',
          size: 'responsive',
          height: 40,
          color: 'gold',
          shape: 'rect',
          layout: 'horizontal',
          fundingicons: 'false',
          tagline: 'false'
        },
        onEnter: function onEnter() {
          $('#checkout-payment-form').addClass('dr-panel-edit').css('visibility', 'visible');
          $('#dr-paypal-button').hide();
        },
        payment: function payment() {
          var cart = drgc_params.cart.cart;
          var payPalItems = [];
          $.each(cart.lineItems.lineItem, function (index, item) {
            payPalItems.push({
              'name': item.product.name,
              'quantity': item.quantity,
              'unitAmount': item.pricing.listPrice.value
            });
          });
          var payPalPayload = {
            'type': 'payPal',
            'amount': cart.pricing.orderTotal.value,
            'currency': 'USD',
            'payPal': {
              'returnUrl': window.location.href + '?ppsuccess=true',
              'cancelUrl': window.location.href + '?ppcancel=true',
              'items': payPalItems,
              'taxAmount': cart.pricing.tax.value,
              'requestShipping': requestShipping
            }
          };

          if (requestShipping) {
            payPalPayload['shipping'] = {
              'recipient': "".concat(cart.shippingAddress.firstName, " ").concat(cart.shippingAddress.lastName, " "),
              'phoneNumber': cart.shippingAddress.phoneNumber,
              'address': {
                'line1': cart.shippingAddress.line1,
                'line2': cart.shippingAddress.line2,
                'city': cart.shippingAddress.city,
                'state': cart.shippingAddress.countrySubdivision,
                'country': cart.shippingAddress.country,
                'postalCode': cart.shippingAddress.postalCode
              }
            };
          }

          return digitalriverjs.createSource(payPalPayload).then(function (result) {
            if (result.error) {
              $('#dr-payment-failed-msg').text(result.error.errors[0].message).show();
            } else {
              sessionStorage.setItem('paymentSourceId', result.source.id);
              return result.source.payPal.token;
            }
          });
        },
        onAuthorize: function onAuthorize() {
          var sourceId = sessionStorage.getItem('paymentSourceId');
          $('body').css({
            'pointer-events': 'none',
            'opacity': 0.5
          });
          applyPaymentToCart(sourceId);
        }
      }, '#dr-paypal-button');
    }

    var buttonStyle = {
      buttonType: 'long',
      buttonColor: 'dark',
      buttonLanguage: drLocale.split('_')[0]
    };
    var baseRequest = checkout_utils.getBaseRequestData(cartData, requestShipping, buttonStyle);
    var paymentDataRequest = digitalriverjs.paymentRequest(baseRequest);

    if ($('#dr-googlepay-button').length && isGooglePayEnabled) {
      payment_googlepay.init({
        digitalriverJs: digitalriverjs,
        paymentDataRequest: paymentDataRequest,
        requestShipping: requestShipping
      });
    }

    if ($('#dr-applepay-button').length && isApplePayEnabled) {
      payment_applepay.init({
        digitalriverJs: digitalriverjs,
        paymentDataRequest: paymentDataRequest,
        requestShipping: requestShipping
      });
    }
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
        LoginModule.redirectAfterAuth();
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
    $('body').css({
      'pointer-events': 'none',
      'opacity': 0.5
    });
    $.post(drgc_params.ajaxUrl, data, function (response) {
      location.reload();
    });
  };

  var redirectAfterAuth = function redirectAfterAuth() {
    if (!document.referrer) {
      window.location.href = drgc_params.homeUrl;
    } else if (document.referrer === drgc_params.cartUrl) {
      window.location.href = drgc_params.checkoutUrl;
    } else {
      window.location.href = document.referrer;
    }
  };

  return {
    validatePassword: validatePassword,
    checkoutAsGuest: checkoutAsGuest,
    logout: logout,
    redirectAfterAuth: redirectAfterAuth
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
    var data = {
      action: 'drgc_login',
      nonce: drgc_params.ajaxNonce,
      username: $('.dr-login-form input[name=username]').val(),
      password: $('.dr-login-form input[name=password]').val()
    };
    $.post(ajaxUrl, data, function (response) {
      if (response.success) {
        LoginModule.redirectAfterAuth();
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
        LoginModule.redirectAfterAuth();
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
// CONCATENATED MODULE: ./assets/js/public/public-pdp.js
/* global drgc_params, iFrameResize */

/* eslint-disable no-alert, no-console */



var PdpModule = function ($) {
  var bindVariationPrice = function bindVariationPrice(pricing, $target) {
    if (!pricing.listPrice || !pricing.salePriceWithQuantity) return;

    if (pricing.listPrice.value > pricing.salePriceWithQuantity.value) {
      $target.data('old-price', pricing.listPrice.value);
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
      $target.html("\n                <".concat(option.listPriceDiv, " class=\"").concat(option.listPriceClass(), "\">").concat(pricing.listPrice.value, "</").concat(option.listPriceDiv, ">\n                <").concat(option.salePriceDiv, " class=\"").concat(option.salePriceClass(), "\">").concat(pricing.formattedSalePriceWithQuantity, "</").concat(option.salePriceDiv, ">\n            "));
    } else {
      $target.html("\n                <".concat(option.priceDiv, " class=\"").concat(option.priceClass(), "\">").concat(pricing.formattedSalePriceWithQuantity, "</").concat(option.priceDiv, ">\n            "));
    }
  };

  var displayRealTimeBuyBtn = function displayRealTimeBuyBtn(purchasable, isRedirectBuyBtn, $target) {
    if (isRedirectBuyBtn) {
      $target.text(drgc_params.translations.buy_now).addClass('dr-redirect-buy-btn').prop('disabled', false);
    } else {
      purchasable = purchasable === 'true';
      $target.text(purchasable ? drgc_params.translations.add_to_cart : drgc_params.translations.out_of_stock).prop('disabled', !purchasable);
    }
  };

  return {
    bindVariationPrice: bindVariationPrice,
    bindVariationInventoryStatus: bindVariationInventoryStatus,
    selectVariation: selectVariation,
    displayRealTimePricing: displayRealTimePricing,
    displayRealTimeBuyBtn: displayRealTimeBuyBtn
  };
}(jQuery);

jQuery(document).ready(function ($) {
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
      var emptyMsg = "<p class=\"dr-minicart-empty-msg\">".concat(drgc_params.translations.empty_cart_msg, "</p>");
      $body.append(emptyMsg);
      $display.append($body);
    } else {
      var miniCartLineItems = '<ul class="dr-minicart-list">';
      var miniCartSubtotal = "<p class=\"dr-minicart-subtotal\"><label>".concat(drgc_params.translations.subtotal_label, "</label><span>").concat(cart.pricing.formattedSubtotal, "</span></p>");
      var miniCartViewCartBtn = "<a class=\"dr-btn\" id=\"dr-minicart-view-cart-btn\" href=\"".concat(drgc_params.cartUrl, "\">").concat(drgc_params.translations.view_cart_label, "</a>");
      lineItems.forEach(function (li) {
        var productId = li.product.uri.replace("".concat(commerce_api.apiBaseUrl, "/me/products/"), '');
        var listPrice = Number(li.pricing.listPriceWithQuantity.value);
        var salePrice = Number(li.pricing.salePriceWithQuantity.value);
        var formattedSalePrice = li.pricing.formattedSalePriceWithQuantity;
        var priceContent = '';

        if (listPrice > salePrice) {
          priceContent = "<del class=\"dr-strike-price\">".concat(listPrice, "</del><span class=\"dr-sale-price\">").concat(formattedSalePrice, "</span>");
        } else {
          priceContent = formattedSalePrice;
        }

        var miniCartLineItem = "\n                <li class=\"dr-minicart-item clearfix\">\n                    <div class=\"dr-minicart-item-thumbnail\">\n                        <img src=\"".concat(li.product.thumbnailImage, "\" alt=\"").concat(li.product.displayName, "\" />\n                    </div>\n                    <div class=\"dr-minicart-item-info\" data-product-id=\"").concat(productId, "\">\n                        <span class=\"dr-minicart-item-title\">").concat(li.product.displayName, "</span>\n                        <span class=\"dr-minicart-item-qty\">").concat(drgc_params.translations.qty_label, ".").concat(li.quantity, "</span>\n                        <p class=\"dr-pd-price dr-minicart-item-price\">").concat(priceContent, "</p>\n                    </div>\n                    <a href=\"#\" class=\"dr-minicart-item-remove-btn\" aria-label=\"Remove\" data-line-item-id=\"").concat(li.id, "\">").concat(drgc_params.translations.remove_label, "</a>\n                </li>");
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
    commerce_api.removeLineItem(lineItemID).then(function () {
      return commerce_api.getCart();
    }).then(function (res) {
      return displayMiniCart(res.cart);
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


  if ($('.single-dr_product').length) {
    isPdCard = false;
    $(pdDisplayOption.priceDivSelector()).text(drgc_params.translations.loading_msg);
    pdDisplayOption.$singlePDBuyBtn.text(drgc_params.translations.loading_msg).prop('disabled', true);

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
      var $priceDiv = $(pdDisplayOption.priceDivSelector()).text(drgc_params.translations.loading_msg);
      if (!productID) return;
      commerce_api.getProduct(productID, {
        expand: 'inventoryStatus'
      }).then(function (res) {
        var purchasable = res.product.inventoryStatus.productIsInStock;
        isPdCard = false; // to avoid being overwritten by concurrency

        PdpModule.displayRealTimePricing(res.product.pricing, pdDisplayOption, $priceDiv);
        PdpModule.displayRealTimeBuyBtn(purchasable, false, pdDisplayOption.$singlePDBuyBtn);
      });
    }
  } // Real-time pricing & inventory status for PD card (category page & recommended products)


  if (pdDisplayOption.$card && pdDisplayOption.$card.length) {
    isPdCard = true;
    pdDisplayOption.$card.each(function (idx, elem) {
      var $priceDiv = $(elem).find(pdDisplayOption.priceDivSelector()).text(drgc_params.translations.loading_msg);
      var $buyBtn = $(elem).find('.dr-buy-btn').text(drgc_params.translations.loading_msg).prop('disabled', true);
      var productID = $buyBtn.data('product-id');
      if (!productID) return;
      commerce_api.getProduct(productID, {
        expand: 'inventoryStatus'
      }).then(function (res) {
        var purchasable = res.product.inventoryStatus.productIsInStock;
        var isVariation = res.product.parentProduct ? true : false;
        isPdCard = true; // to avoid being overwritten by concurrency

        PdpModule.displayRealTimePricing(res.product.pricing, pdDisplayOption, $priceDiv);
        PdpModule.displayRealTimeBuyBtn(purchasable, isVariation, $buyBtn);
      });
    });
  }
});
/* harmony default export */ var public_pdp = (PdpModule);
// CONCATENATED MODULE: ./assets/js/public/public-thank-you.js

var ThankYouModule = {};
jQuery(document).ready(function ($) {
  if ($('.dr-thank-you-wrapper').length) {
    $(document).on('click', '#print-button', function () {
      var printContents = $('.dr-thank-you-wrapper').html();
      var originalContents = document.body.innerHTML;
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
    });
    var digitalriverjs = new DigitalRiver(drgc_params.digitalRiverKey);
    checkout_utils.applyLegalLinks(digitalriverjs);
    $(document).on('click', '#my-subs-btn', function () {
      window.location.href = drgc_params.mySubsUrl;
    });
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
        checkout_utils.displayAlertMessage(jqXHR.responseJSON.errors.error[0].description);
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
        checkout_utils.displayAlertMessage(jqXHR.responseJSON.errors.error[0].description);
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
// CONCATENATED MODULE: ./assets/js/public/public.js
// 3rd-party plugins
 // maintained by DR


window.drToast = dr_toast;








/***/ })
/******/ ]);