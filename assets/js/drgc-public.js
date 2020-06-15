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
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

module.exports = _typeof;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(4);

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
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);

      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;

        if (value && _typeof(value) === "object" && hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function (value) {
            invoke("next", value, resolve, reject);
          }, function (err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function (unwrapped) {
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
        return new PromiseImpl(function (resolve, reject) {
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

  exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
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
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(5)(module)))

/***/ }),
/* 5 */
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
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
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
    $('.dr-loading').removeClass('dr-loading');

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
    return jqXHR && jqXHR.responseJSON && jqXHR.responseJSON.errors ? jqXHR.responseJSON.errors.error[0].description : '';
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
    getPermalink: getPermalink,
    getEntityCode: getEntityCode,
    getCompliance: getCompliance,
    resetFormSubmitButton: resetFormSubmitButton,
    getAjaxErrorMessage: getAjaxErrorMessage
  };
}(jQuery, drgc_params);

/* harmony default export */ var checkout_utils = (CheckoutUtils);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/defineProperty.js
var defineProperty = __webpack_require__(3);
var defineProperty_default = /*#__PURE__*/__webpack_require__.n(defineProperty);

// CONCATENATED MODULE: ./assets/js/public/commerce-api.js


var DRCommerceApi = function ($, params) {
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

  var updateShopperAddress = function updateShopperAddress(address) {
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

  return defineProperty_default()({
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
    updateShopperAddress: updateShopperAddress
  }, "submitCart", submitCart);
}(jQuery, drgc_params);

/* harmony default export */ var commerce_api = (DRCommerceApi);
// CONCATENATED MODULE: ./assets/js/public/public-cart.js
/* global drgc_params, iFrameResize */

/* eslint-disable no-alert, no-console */



var CartModule = function ($) {
  var hasPhysicalProduct = false;

  var hasPhysicalProductInLineItems = function hasPhysicalProductInLineItems(lineItems) {
    return lineItems.some(function (lineItem) {
      return lineItem.product.productType === 'PHYSICAL';
    });
  };

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

    $lineItem.addClass('dr-loading');
    $('.dr-summary').addClass('dr-loading');
    commerce_api.updateLineItem(lineItemID, {
      quantity: $qty.val()
    }).then(function (res) {
      renderSingleLineItem(res.lineItem.pricing, $lineItem);
      $lineItem.removeClass('dr-loading');
    }).then(function () {
      return commerce_api.getCart({
        expand: 'all'
      });
    }).then(function (res) {
      renderSummary(res.cart.pricing, hasPhysicalProduct);
      $('.dr-summary').removeClass('dr-loading');
    })["catch"](function (jqXHR) {
      checkout_utils.apiErrorHandler(jqXHR);
      $lineItem.removeClass('dr-loading');
      $('.dr-summary').removeClass('dr-loading');
    });
  };

  var renderOffers = function renderOffers(lineItems) {
    lineItems.forEach(function (lineItem, idx) {
      // Candy Rack (should be inserted after specific line item)
      commerce_api.getOffersByPoP('CandyRack_ShoppingCart', {
        expand: 'all'
      }, lineItem.product.id).then(function (res) {
        var offers = res.offers.offer;

        if (offers && offers.length) {
          offers.forEach(function (offer) {
            renderCandyRackOffer(offer, lineItems[idx].product.id);
          });
        }
      })["catch"](function (jqXHR) {
        return checkout_utils.apiErrorHandler(jqXHR);
      }); // Bundle Tight (should disable edit buttons of specific line item)

      commerce_api.getOffersByProduct(lineItem.product.id, {
        expand: 'all'
      }).then(function (res) {
        var offers = res.offers.offer;

        if (offers && offers.length) {
          offers.forEach(function (offer) {
            disableEditBtnsForBundle(offer);
          });
        }
      })["catch"](function (jqXHR) {
        return checkout_utils.apiErrorHandler(jqXHR);
      });
    }); // Banner (should be appended after all the line items)

    commerce_api.getOffersByPoP('Banner_ShoppingCartLocal', {
      expand: 'all'
    }).then(function (res) {
      var offers = res.offers.offer;

      if (offers && offers.length) {
        offers.forEach(function (offer) {
          renderBannerOffer(offer);
        });
      }
    })["catch"](function (jqXHR) {
      return checkout_utils.apiErrorHandler(jqXHR);
    });
  };

  var renderCandyRackOffer = function renderCandyRackOffer(offer, driverProductID) {
    var productOffers = offer.productOffers.productOffer;
    var promoText = offer.salesPitch.length ? offer.salesPitch[0] : '';

    if (productOffers && productOffers.length) {
      productOffers.forEach(function (productOffer) {
        var salePrice = productOffer.pricing.formattedSalePriceWithQuantity;
        var listPrice = productOffer.pricing.formattedListPriceWithQuantity;
        var purchasable = productOffer.product.inventoryStatus.productIsInStock === 'true';
        var buyBtnText = purchasable ? offer.type === 'Up-sell' ? drgc_params.translations.upgrade_label : drgc_params.translations.add_label : drgc_params.translations.out_of_stock;
        var html = "\n          <div class=\"dr-product dr-candyRackProduct\" data-product-id=\"".concat(productOffer.product.id, "\" data-driver-product-id=\"").concat(driverProductID, "\">\n            <div class=\"dr-product-content\">\n              <img src=\"").concat(productOffer.product.thumbnailImage, "\" class=\"dr-candyRackProduct__img\"/>\n              <div class=\"dr-product__info\">\n                <div class=\"product-color\">\n                  <span style=\"background-color: yellow;\">").concat(promoText, "</span>\n                </div>\n                ").concat(productOffer.product.displayName, "\n                <div class=\"product-sku\">\n                  <span>").concat(drgc_params.translations.product_label, " </span>\n                  <span>#").concat(productOffer.product.id, "</span>\n                </div>\n              </div>\n            </div>\n            <div class=\"dr-product__price\">\n              <button type=\"button\" class=\"dr-btn dr-buy-candyRack\"\n                data-buy-uri=\"").concat(productOffer.addProductToCart.uri, "\"\n                ").concat(purchasable ? '' : 'disabled="disabled"', ">").concat(buyBtnText, "</button>\n              <span class=\"sale-price\">").concat(salePrice, "</span>\n              <span class=\"regular-price dr-strike-price ").concat(salePrice === listPrice ? 'd-none' : '', "\">").concat(listPrice, "</span>\n            </div>\n          </div>");

        if (!$(".dr-product-line-item[data-product-id=".concat(productOffer.product.id, "]")).length) {
          $(html).insertAfter(".dr-product-line-item[data-product-id=".concat(driverProductID, "]"));
        }
      });
    }
  };

  var renderBannerOffer = function renderBannerOffer(offer) {
    var html = "\n      <div class=\"dr-banner\">\n        <div class=\"dr-banner__content\">".concat(offer.salesPitch[0], "</div>\n        <div class=\"dr-banner__img\"><img src=\"").concat(offer.image, "\"></div>\n      </div>");
    $('.dr-cart__products').append(html);
  };

  var disableEditBtnsForBundle = function disableEditBtnsForBundle(offer) {
    var hasBundleTight = offer.type === 'Bundling' && offer.policyName === 'Tight Bundle Policy';
    var productOffers = offer.productOffers.productOffer;

    if (hasBundleTight && productOffers && productOffers.length) {
      productOffers.forEach(function (productOffer) {
        $(".dr-product-line-item[data-product-id=".concat(productOffer.product.id, "]")).find('.remove-icon, .dr-pd-cart-qty-minus, .dr-pd-cart-qty-plus').css({
          opacity: 0,
          'pointer-events': 'none'
        });
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

  var renderLineItems = function renderLineItems(lineItems) {
    var min = 1;
    var max = 999;
    var promises = [];
    var lineItemHTMLArr = [];
    lineItems.forEach(function (lineItem, idx) {
      var parentProductID = lineItem.product.parentProduct ? lineItem.product.parentProduct.id : lineItem.product.id;
      var salePrice = lineItem.pricing.formattedSalePriceWithQuantity;
      var listPrice = lineItem.pricing.formattedListPriceWithQuantity;
      var promise = checkout_utils.getPermalink(parentProductID).then(function (permalink) {
        var lineItemHTML = "\n          <div data-line-item-id=\"".concat(lineItem.id, "\" class=\"dr-product dr-product-line-item\" data-product-id=\"").concat(lineItem.product.id, "\" data-sort=\"").concat(idx, "\">\n            <div class=\"dr-product-content\">\n              <div class=\"dr-product__img\" style=\"background-image: url(").concat(lineItem.product.thumbnailImage, ")\"></div>\n              <div class=\"dr-product__info\">\n                <a class=\"product-name\" href=\"").concat(permalink, "?locale=").concat(drgc_params.drLocale, "\">").concat(lineItem.product.displayName, "</a>\n                <div class=\"product-sku\">\n                  <span>").concat(drgc_params.translations.product_label, " </span>\n                  <span>#").concat(lineItem.product.id, "</span>\n                </div>\n                <div class=\"product-qty\">\n                  <span class=\"qty-text\">Qty ").concat(lineItem.quantity, "</span>\n                  <span class=\"dr-pd-cart-qty-minus value-button-decrease ").concat(lineItem.quantity <= min ? 'disabled' : '', "\"></span>\n                  <input type=\"number\" class=\"product-qty-number\" step=\"1\" min=\"").concat(min, "\" max=\"").concat(max, "\" value=\"").concat(lineItem.quantity, "\" maxlength=\"5\" size=\"2\" pattern=\"[0-9]*\" inputmode=\"numeric\" readonly=\"true\">\n                  <span class=\"dr-pd-cart-qty-plus value-button-increase ").concat(lineItem.quantity >= max ? 'disabled' : '', "\"></span>\n                </div>\n              </div>\n            </div>\n            <div class=\"dr-product__price\">\n              <button class=\"dr-prd-del remove-icon\"></button>\n              <span class=\"sale-price\">").concat(salePrice, "</span>\n              <span class=\"regular-price ").concat(salePrice === listPrice ? 'd-none' : '', "\">").concat(listPrice, "</span>\n            </div>\n          </div>");
        lineItemHTMLArr[idx] = lineItemHTML; // Insert item to specific index to keep sequence asynchronously
      });
      promises.push(promise);
    });
    return Promise.all(promises).then(function () {
      $('.dr-cart__products').html(lineItemHTMLArr.join(''));
    });
  };

  var renderSummary = function renderSummary(pricing, hasPhysicalProduct) {
    var $discountRow = $('.dr-summary__discount');
    var $shippingRow = $('.dr-summary__shipping');
    var $subtotalRow = $('.dr-summary__discounted-subtotal');
    $discountRow.find('.discount-value').text("-".concat(pricing.formattedDiscount));
    $shippingRow.find('.shipping-value').text(pricing.shippingAndHandling.value === 0 ? drgc_params.translations.free_label : pricing.formattedShippingAndHandling);
    $subtotalRow.find('.discounted-subtotal-value').text(pricing.formattedSubtotalWithDiscount);
    if (pricing.discount.value) $discountRow.show();else $discountRow.hide();
    if (hasPhysicalProduct) $shippingRow.show();else $shippingRow.hide();
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
        return Promise.all([renderLineItems(lineItems), renderSummary(res.cart.pricing, hasPhysicalProduct)]);
      } else {
        $('.dr-cart__products').text(drgc_params.translations.empty_cart_msg);
        $('#cart-estimate').remove();
        return new Promise(function (resolve) {
          return resolve();
        });
      }
    }).then(function () {
      if (lineItems && lineItems.length) renderOffers(lineItems);
      $('.dr-cart__content').removeClass('dr-loading'); // Main cart is ready, loading can be ended
    })["catch"](function (jqXHR) {
      checkout_utils.apiErrorHandler(jqXHR);
      $('.dr-cart__content').removeClass('dr-loading');
    });
  };

  return {
    hasPhysicalProduct: hasPhysicalProduct,
    hasPhysicalProductInLineItems: hasPhysicalProductInLineItems,
    initAutoRenewalTerms: initAutoRenewalTerms,
    appendAutoRenewalTerms: appendAutoRenewalTerms,
    setProductQty: setProductQty,
    renderOffers: renderOffers,
    renderCandyRackOffer: renderCandyRackOffer,
    renderBannerOffer: renderBannerOffer,
    disableEditBtnsForBundle: disableEditBtnsForBundle,
    renderSingleLineItem: renderSingleLineItem,
    renderLineItems: renderLineItems,
    renderSummary: renderSummary,
    fetchFreshCart: fetchFreshCart
  };
}(jQuery);

jQuery(document).ready(function ($) {
  // Very basic throttle function, avoid too many calls within a short period
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
    $('.dr-cart__content').addClass('dr-loading');
    commerce_api.removeLineItem(lineItemID).then(function () {
      $lineItem.remove();
      CartModule.fetchFreshCart();
    })["catch"](function (jqXHR) {
      checkout_utils.apiErrorHandler(jqXHR);
      $('.dr-cart__content').removeClass('dr-loading');
    });
  });
  $('body').on('click', '.dr-buy-candyRack', function (e) {
    e.preventDefault();
    var $this = $(e.target);
    var buyUri = $this.attr('data-buy-uri');
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
      $('#dr-promo-code-err-field').text(drgc_params.translations.invalid_promo_code_msg).show();
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
    var digitalriverjs = new DigitalRiver(drgc_params.digitalRiverKey);
    checkout_utils.applyLegalLinks(digitalriverjs);

    if ($('#dr-autoRenewTermsContainer').length) {
      CartModule.initAutoRenewalTerms(digitalriverjs);
    }
  }
});
/* harmony default export */ var public_cart = (CartModule);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/regenerator/index.js
var regenerator = __webpack_require__(1);
var regenerator_default = /*#__PURE__*/__webpack_require__.n(regenerator);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/asyncToGenerator.js
var asyncToGenerator = __webpack_require__(2);
var asyncToGenerator_default = /*#__PURE__*/__webpack_require__.n(asyncToGenerator);

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
// CONCATENATED MODULE: ./assets/js/public/payment-googlepay.js






var DRGooglePay = function ($, translations) {
  var isConnectionSecure = /*#__PURE__*/function () {
    var _ref = asyncToGenerator_default()( /*#__PURE__*/regenerator_default.a.mark(function _callee() {
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
  var localizedText = drgc_params.translations;

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
        $('#dr-preTAndC-err-msg').text(localizedText.required_tandc_msg).show();
      }
    });
    $('#dr-preTAndC').trigger('change');
  };

  var shouldDisplayVat = function shouldDisplayVat() {
    var currency = drgc_params.selectedCurrency;
    return currency === 'GBP' || currency === 'EUR';
  };

  var updateSummaryLabels = function updateSummaryLabels() {
    if ($('.dr-checkout__payment').hasClass('active') || $('.dr-checkout__confirmation').hasClass('active')) {
      $('.dr-summary__tax .item-label').text(shouldDisplayVat() ? localizedText.vat_label : localizedText.tax_label);
      $('.dr-summary__shipping .item-label').text(localizedText.shipping_label);
      $('.dr-summary__total .total-label').text(shouldDisplayVat() ? localizedText.order_total_vat_label : localizedText.order_total_label);
    } else {
      $('.dr-summary__tax .item-label').text(shouldDisplayVat() ? localizedText.estimated_vat_label : localizedText.estimated_tax_label);
      $('.dr-summary__shipping .item-label').text(localizedText.estimated_shipping_label);
    }
  };

  var getCountryOptionsFromGC = function getCountryOptionsFromGC() {
    return new Promise(function (resolve, reject) {
      $.ajax({
        type: 'GET',
        url: "https://drh-fonts.img.digitalrivercontent.net/store/".concat(drgc_params.siteID, "/").concat(drgc_params.drLocale, "/DisplayPage/id.SimpleRegistrationPage"),
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

  var moveToNextSection = function moveToNextSection($section) {
    var $nextSection = $section.next();
    $section.removeClass('active').addClass('closed');
    $nextSection.addClass('active').removeClass('closed');

    if ($nextSection.hasClass('small-closed-left')) {
      $nextSection.removeClass('small-closed-left');
      $nextSection.next().removeClass('small-closed-right');
    }

    adjustColumns($section);
    updateSummaryLabels();
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

    if (payload[addressType].country !== 'US') {
      payload[addressType].countrySubdivision = '';
    }

    return payload[addressType];
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

  var displayAddressErrMsg = function displayAddressErrMsg() {
    var jqXHR = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var $target = arguments.length > 1 ? arguments[1] : undefined;

    if (Object.keys(jqXHR).length) {
      if (jqXHR.status === 409) {
        var errorCode = jqXHR.responseJSON.errors.error[0].code;

        if (errorCode === 'restricted-bill-to-country') {
          $target.text(localizedText.address_error_msg).show();
        } else if (errorCode === 'restricted-ship-to-country') {
          $target.text(localizedText.address_error_msg).show();
        } else {
          $target.text(localizedText.undefined_error_msg).show();
        }
      } else {
        $target.text(jqXHR.responseJSON.errors.error[0].description).show();
      }
    } else {
      $target.text(localizedText.shipping_options_error_msg).show();
    }
  };

  var displayCartAddress = function displayCartAddress(addressObj, $target) {
    var addressArr = ["".concat(addressObj.firstName, " ").concat(addressObj.lastName), addressObj.line1, addressObj.city, addressObj.country];
    $target.text(addressArr.join(', '));
  };

  var setShippingOptions = function setShippingOptions(cart) {
    var freeShipping = cart.pricing.shippingAndHandling.value === 0;
    var shippingOptionId = cart.shippingMethod.code;
    var shippingOptions = cart.shippingOptions.shippingOption || [];

    if (shippingOptions.length) {
      $.each(shippingOptions, function (index, option) {
        if ($('#shipping-option-' + option.id).length) return;
        var html = "\n                    <div class=\"field-radio\">\n                        <input type=\"radio\"\n                            name=\"selector\"\n                            id=\"shipping-option-".concat(option.id, "\"\n                            data-cost=\"").concat(option.formattedCost, "\"\n                            data-id=\"").concat(option.id, "\"\n                            data-desc=\"").concat(option.description, "\"\n                            >\n                        <label for=\"shipping-option-").concat(option.id, "\">\n                            <span>\n                                ").concat(option.description, "\n                            </span>\n                            <span class=\"black\">\n                                ").concat(freeShipping ? localizedText.free_label : option.formattedCost, "\n                            </span>\n                        </label>\n                    </div>\n                ");
        $('form#checkout-delivery-form .dr-panel-edit__el').append(html);
      });
      $('form#checkout-delivery-form').children().find('input:radio[data-id="' + shippingOptionId + '"]').prop("checked", true);
    } else {
      $('form#checkout-delivery-form .dr-panel-edit__el').empty();
    }
  };

  var preselectShippingOption = /*#__PURE__*/function () {
    var _ref = asyncToGenerator_default()( /*#__PURE__*/regenerator_default.a.mark(function _callee(data) {
      var $errorMsgElem, defaultShippingOption, shippingOptions, res;
      return regenerator_default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              $errorMsgElem = $('#checkout-delivery-form > div.dr-err-field');
              defaultShippingOption = data.cart.shippingMethod.code;
              shippingOptions = data.cart.shippingOptions.shippingOption || [];
              $('#checkout-delivery-form > button[type="submit"]').prop('disabled', shippingOptions.length === 0);

              if (!shippingOptions.length) {
                _context.next = 18;
                break;
              }

              $errorMsgElem.text('').hide();
              shippingOptions = shippingOptions.map(function (option) {
                return option.id;
              }); // If default shipping option is not in the list, then pre-select the 1st one

              if (!(shippingOptions.indexOf(defaultShippingOption) === -1)) {
                _context.next = 15;
                break;
              }

              _context.next = 10;
              return commerce_api.applyShippingOption(shippingOptions[0]);

            case 10:
              res = _context.sent;
              checkout_utils.updateSummaryPricing(res.cart);
              return _context.abrupt("return", res);

            case 15:
              return _context.abrupt("return", new Promise(function (resolve) {
                return resolve(data);
              }));

            case 16:
              _context.next = 20;
              break;

            case 18:
              displayAddressErrMsg({}, $errorMsgElem);
              return _context.abrupt("return", new Promise(function (resolve) {
                return resolve(data);
              }));

            case 20:
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
    var $form = $('#checkout-confirmation-form');
    var $errorMsgElem = $('#dr-checkout-err-field');
    commerce_api.applyPaymentMethod(sourceId).then(function () {
      return commerce_api.submitCart({
        ipAddress: drgc_params.client_ip
      });
    }).then(function (data) {
      $('#checkout-confirmation-form > input[name="order_id"]').val(data.submitCart.order.id);
      $form.submit();
    })["catch"](function (jqXHR) {
      checkout_utils.resetFormSubmitButton($form);
      checkout_utils.resetBodyOpacity();
      $errorMsgElem.text(checkout_utils.getAjaxErrorMessage(jqXHR)).show();
    });
  };

  return {
    initPreTAndC: initPreTAndC,
    updateSummaryLabels: updateSummaryLabels,
    getCountryOptionsFromGC: getCountryOptionsFromGC,
    moveToNextSection: moveToNextSection,
    adjustColumns: adjustColumns,
    validateAddress: validateAddress,
    buildAddressPayload: buildAddressPayload,
    getAddress: getAddress,
    displayAddressErrMsg: displayAddressErrMsg,
    displayCartAddress: displayCartAddress,
    setShippingOptions: setShippingOptions,
    preselectShippingOption: preselectShippingOption,
    applyPaymentAndSubmitCart: applyPaymentAndSubmitCart
  };
}(jQuery);

jQuery(document).ready(function ($) {
  if ($('#checkout-payment-form').length) {
    // Globals
    var localizedText = drgc_params.translations;
    var domain = drgc_params.domain;
    var isLogin = drgc_params.isLogin;
    var drLocale = drgc_params.drLocale || 'en_US';
    var cartData = drgc_params.cart.cart;
    var requestShipping = cartData.shippingOptions.shippingOption ? true : false;
    var isGooglePayEnabled = drgc_params.isGooglePayEnabled === 'true';
    var isApplePayEnabled = drgc_params.isApplePayEnabled === 'true';
    var digitalriverjs = new DigitalRiver(drgc_params.digitalRiverKey, {
      'locale': drLocale.split('_').join('-')
    });
    var addressPayload = {
      shipping: {},
      billing: {}
    };
    var paymentSourceId = null; // Section progress

    var finishedSectionIdx = -1; // Create elements through DR.js

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
        placeholderText: localizedText.card_expiration_placeholder
      }));
      var cardCVV = digitalriverjs.createElement('cardcvv', Object.assign({}, options, {
        placeholderText: localizedText.card_cvv_placeholder
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

      if (isLogin === 'true') {
        var address = CheckoutModule.getAddress('shipping', true);
        commerce_api.updateShopperAddress(address)["catch"](function (jqXHR) {
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
        CheckoutModule.setShippingOptions(data.cart);
        var $section = $('.dr-checkout__shipping');
        CheckoutModule.displayCartAddress(data.cart.shippingAddress, $section.find('.dr-panel-result__text'));

        if ($('.dr-checkout__el').index($section) > finishedSectionIdx) {
          finishedSectionIdx = $('.dr-checkout__el').index($section);
        }

        CheckoutModule.moveToNextSection($section);
        checkout_utils.updateSummaryPricing(data.cart);
      })["catch"](function (jqXHR) {
        $button.removeClass('sending').blur();
        CheckoutModule.displayAddressErrMsg(jqXHR, $form.find('.dr-err-field'));
      });
    });
    $('#checkout-billing-form').on('submit', function (e) {
      e.preventDefault();
      var $form = $(e.target);
      var $button = $form.find('button[type="submit"]');
      var billingSameAsShipping = $('[name="checkbox-billing"]').is(':visible:checked');
      var isFormValid = CheckoutModule.validateAddress($form);
      if (!isFormValid) return;
      addressPayload.billing = billingSameAsShipping ? Object.assign({}, addressPayload.shipping) : CheckoutModule.buildAddressPayload($form);
      var cartRequest = {
        address: addressPayload.billing
      };
      $button.addClass('sending').blur();

      if (isLogin === 'true') {
        if (requestShipping && !billingSameAsShipping || !requestShipping) {
          var address = CheckoutModule.getAddress('billing', false);
          commerce_api.updateShopperAddress(address)["catch"](function (jqXHR) {
            checkout_utils.apiErrorHandler(jqXHR);
          });
        }
      }

      commerce_api.updateCartBillingAddress({
        expand: 'all'
      }, cartRequest).then(function () {
        return commerce_api.getCart({
          expand: 'all'
        });
      }).then(function (data) {
        // Still needs to apply shipping option once again or the value will be rolled back after updateCart (API's bug)
        return drgc_params.cart.cart.hasPhysicalProduct ? CheckoutModule.preselectShippingOption(data) : new Promise(function (resolve) {
          return resolve(data);
        });
      }).then(function (data) {
        $button.removeClass('sending').blur();
        CheckoutModule.setShippingOptions(data.cart);
        var $section = $('.dr-checkout__billing');
        CheckoutModule.displayCartAddress(data.cart.billingAddress, $section.find('.dr-panel-result__text'));

        if ($('.dr-checkout__el').index($section) > finishedSectionIdx) {
          finishedSectionIdx = $('.dr-checkout__el').index($section);
        }

        CheckoutModule.moveToNextSection($section);
        checkout_utils.updateSummaryPricing(data.cart);
      })["catch"](function (jqXHR) {
        $button.removeClass('sending').blur();
        CheckoutModule.displayAddressErrMsg(jqXHR, $form.find('.dr-err-field'));
      });
    }); // Submit delivery form

    $('form#checkout-delivery-form').on('submit', function (e) {
      e.preventDefault();
      var $form = $(e.target);
      var $input = $(this).children().find('input:radio:checked').first();
      var $button = $(this).find('button[type="submit"]').toggleClass('sending').blur();
      var shippingOptionId = $input.data('id');
      $form.find('.dr-err-field').hide();
      commerce_api.applyShippingOption(shippingOptionId).then(function (data) {
        var $section = $('.dr-checkout__delivery');
        var freeShipping = data.cart.pricing.shippingAndHandling.value === 0;
        var resultText = "".concat($input.data('desc'), " ").concat(freeShipping ? localizedText.free_label : $input.data('cost'));
        $button.removeClass('sending').blur();
        $section.find('.dr-panel-result__text').text(resultText);

        if ($('.dr-checkout__el').index($section) > finishedSectionIdx) {
          finishedSectionIdx = $('.dr-checkout__el').index($section);
        }

        CheckoutModule.moveToNextSection($section);
        checkout_utils.updateSummaryPricing(data.cart);
      })["catch"](function (jqXHR) {
        $button.removeClass('sending').blur();
        CheckoutModule.displayAddressErrMsg(jqXHR, $form.find('.dr-err-field'));
      });
    });
    $('form#checkout-delivery-form').on('change', 'input[type="radio"]', function () {
      var $form = $('form#checkout-delivery-form');
      var shippingOptionId = $form.children().find('input:radio:checked').first().data('id');
      commerce_api.applyShippingOption(shippingOptionId).then(function (data) {
        checkout_utils.updateSummaryPricing(data.cart);
      })["catch"](function (jqXHR) {
        CheckoutModule.displayAddressErrMsg(jqXHR, $form.find('.dr-err-field'));
      });
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
      var paymentPayload = {};
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
            firstName: addressPayload.billing.firstName,
            lastName: addressPayload.billing.lastName,
            email: addressPayload.billing.emailAddress,
            address: {
              line1: addressPayload.billing.line1,
              city: addressPayload.billing.city,
              state: addressPayload.billing.countrySubdivision,
              country: addressPayload.billing.country,
              postalCode: addressPayload.billing.postalCode
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
              $('#dr-payment-failed-msg').text(localizedText.credit_card_error_msg).show();
            }

            if (result.error.errors) {
              $('#dr-payment-failed-msg').text(result.error.errors[0].message).show();
            }
          } else {
            if (result.source.state === 'chargeable') {
              paymentSourceId = result.source.id;
              $section.find('.dr-panel-result__text').text("".concat(localizedText.credit_card_ending_label, " ").concat(result.source.creditCard.lastFourDigits));

              if ($('.dr-checkout__el').index($section) > finishedSectionIdx) {
                finishedSectionIdx = $('.dr-checkout__el').index($section);
              }

              CheckoutModule.moveToNextSection($section);
            }
          }
        });
      }
    });
    $('#checkout-confirmation-form button[type="submit"]').on('click', function (e) {
      e.preventDefault();

      if (!$('#dr-tAndC').prop('checked')) {
        $('#dr-checkout-err-field').text(localizedText.required_tandc_msg).show();
      } else {
        $('#dr-checkout-err-field').text('').hide();
        $(e.target).toggleClass('sending').blur();
        $('#dr-payment-failed-msg').hide();
        CheckoutModule.applyPaymentAndSubmitCart(paymentSourceId);
      }
    }); // check billing info

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

      if ($allSections.index($section) > $allSections.index($activeSection)) {
        return;
      }

      $finishedSections.addClass('closed');
      $activeSection.removeClass('active');
      $section.removeClass('closed').addClass('active');
      CheckoutModule.adjustColumns($section);
      CheckoutModule.updateSummaryLabels();
    });
    $('input:radio[name="selector"]').on('change', function () {
      switch ($(this).val()) {
        case 'credit-card':
          $('#dr-paypal-button').hide();
          $('.credit-card-info').show();
          $('#dr-submit-payment').text(localizedText.pay_with_card_label.toUpperCase()).show();
          break;

        case 'paypal':
          $('#dr-submit-payment').hide();
          $('.credit-card-info').hide();
          $('#dr-paypal-button').show();
          $('#dr-submit-payment').text(localizedText.pay_with_paypal_label.toUpperCase());
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
    }); //floating labels

    float_label.init();

    if ($('input[name=email]').val() && $('#checkout-email-form').length && $('#dr-panel-email-result').is(':empty')) {
      $('#checkout-email-form').submit();
    }

    if (cartData.totalItemsInCart) {
      CheckoutModule.getCountryOptionsFromGC().then(function () {
        $('#shipping-field-country, #billing-field-country').trigger('change');
      });
    }

    checkout_utils.applyLegalLinks(digitalriverjs);
    CheckoutModule.initPreTAndC();

    if ($('#radio-credit-card').is(':checked')) {
      $('.credit-card-info').show();
    } // Initial state for payPal


    if (drgc_params.payPal.sourceId) {
      $('.dr-checkout').children().addClass('closed');
      $('.dr-checkout').children().removeClass('active');
      $('.dr-checkout__payment').removeClass('closed').addClass('active');

      if (drgc_params.payPal.failure == 'true') {// TODO: Display Error on paypal form maybe
      }

      if (drgc_params.payPal.success == 'true') {
        CheckoutModule.applyPaymentAndSubmitCart(drgc_params.payPal.sourceId);
      }
    }

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
          var url = window.location.href;
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
              'returnUrl': url + (url.indexOf('?') >= 0 ? '&' : '?') + 'ppsuccess=true',
              'cancelUrl': url + (url.indexOf('?') >= 0 ? '&' : '?') + 'ppcancel=true',
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
          CheckoutModule.applyPaymentAndSubmitCart(sourceId);
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
  $('#dr-locale-selector .dr-current-locale, #dr-currency-selector, .dr-selected-currency').click(function (e) {
    e.preventDefault();
  });
  $('#dr-locale-selector .dr-other-locales a').click(function (e) {
    e.preventDefault();
    var $this = $(e.target);
    var targetLocale = $this.data('dr-locale');
    if ($('.dr-cart__content').length) $('.dr-cart__content').addClass('dr-loading');else $('body').addClass('dr-loading');
    commerce_api.updateShopper({
      locale: targetLocale
    }).then(function () {
      var params = new URLSearchParams(location.search);
      params.set('locale', targetLocale);
      window.location.search = params.toString();
    })["catch"](function (jqXHR) {
      checkout_utils.apiErrorHandler(jqXHR);
    });
  });
  $('#dr-currency-selector .dr-other-currencies a').click(function (e) {
    e.preventDefault();
    var $this = $(e.target);
    var targetCurrency = $this.data('dr-currency');
    if ($('.dr-cart__content').length) $('.dr-cart__content').addClass('dr-loading');else $('body').addClass('dr-loading');
    commerce_api.updateShopper({
      locale: drgc_params.drLocale,
      currency: targetCurrency
    }).then(function () {
      document.cookie = "drgc_currency=".concat(targetCurrency, "; path=/");
      window.location.reload(true);
    })["catch"](function (jqXHR) {
      checkout_utils.apiErrorHandler(jqXHR);
    });
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

  var autoLogout = function autoLogout(url) {
    var data = {
      action: 'drgc_logout',
      nonce: drgc_params.ajaxNonce
    };
    $('body').css({
      'pointer-events': 'none',
      'opacity': 0.5
    });
    $.post(drgc_params.ajaxUrl, data, function () {
      window.location.href = url;
    });
  };

  var resetCookie = function resetCookie() {
    var data = {
      action: 'drgc_reset_cookie',
      nonce: drgc_params.ajaxNonce
    };
    $.post(drgc_params.ajaxUrl, data, function (res) {
      if (!res.success) throw new Error('Cookie reset failed.');
    });
  };

  return {
    validatePassword: validatePassword,
    checkoutAsGuest: checkoutAsGuest,
    logout: logout,
    redirectAfterAuth: redirectAfterAuth,
    autoLogout: autoLogout,
    resetCookie: resetCookie
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
      var $loadingIcon = $(elem).find('.dr-loading');
      var $productInfo = $(elem).find('.dr-pd-info');
      var $title = $(elem).find('.dr-pd-item-title');
      var $thumbnail = $(elem).find('.dr-pd-item-thumbnail > img');
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
        $title.text(res.product.displayName);
        $thumbnail.attr('alt', res.product.displayName);
        $loadingIcon.hide();
        $productInfo.show();
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
// CONCATENATED MODULE: ./assets/js/public/user-activity-watcher.js


var DrgcUserWatcher = function (w, d, p, $) {
  var watcher = {
    interval: 3510,
    debug: false,
    eventTypes: ['mousedown', 'mousemove', 'click', 'keydown', 'scroll', 'touchstart'],
    pathname: null,
    redirectPath: p.loginPath,
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
        if (!this.redirectPath) {
          this.log('The redirect url is undefined.');
          return false;
        }

        if (this.redirectPath === this.pathname && this.pathname !== p.loginPath) {
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
      public_login.autoLogout(this.redirectPath);
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
          public_login.resetCookie();
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