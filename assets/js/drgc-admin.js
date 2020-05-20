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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./assets/js/admin/admin-import.js
var ImportModule = {};
jQuery(document).ready(function ($) {
  var itemTotal,
      itemIndex = 0,
      batchSize = 1,
      persist,
      itemsBeingProcessed = [],
      itemsCompleted = [],
      itemsFailed = [],
      $domStatusCounter,
      ajaxUrl = drgc_admin_params.ajax_url,
      ajax_nonce = drgc_admin_params.ajax_nonce,
      instance_id = drgc_admin_params.drgc_ajx_instance_id,
      siteID = drgc_admin_params.site_id,
      apiKey = drgc_admin_params.api_key,
      $progressBar = $('#dr-data-process-progressbar'),
      $fecounter = $('.wrapImportControls p'),
      $importButton = $('#products-import-btn');
  $('#products-import-btn').on('click', function (e) {
    e.preventDefault();

    if (!siteID || !apiKey) {
      return alert('Please provide siteID & apiKey!');
    }

    $importButton.attr('disabled', 'disabled');

    if ($('.notice').is(':visible')) {
      $('.notice').hide();
    }

    $('.wrapImportControls').append("<h4> <b>Fetching products, locales and currencies...</b> </h4>");
    var data = {
      action: 'drgc_ajx_action',
      nonce: ajax_nonce,
      instance_id: instance_id,
      step: 'init'
    };
    $.ajax({
      dataType: 'json',
      data: data,
      type: 'post',
      url: ajaxUrl,
      context: this,
      nonce: ajax_nonce,
      success: ajaxInitSuccess
    });
  });

  function ajaxInitSuccess(data, textStatus, jqXHR) {
    itemTotal = data.entries_count;
    batchSize = data.batch_size;
    itemIndex = data.index_start;
    $('.wrapImportControls').find('h4').remove();
    $progressBar.show();
    $progressBar.progressbar({
      max: itemTotal,
      value: 0
    });
    $fecounter.show();
    $importButton.hide();
    updateTotal(itemTotal);
    processNext();
  }

  function processNext() {
    var counter = 0,
        data;

    while (counter < batchSize && itemIndex < itemTotal) {
      itemsBeingProcessed.push(itemIndex);
      itemIndex++;
      counter++;
    }

    if (!itemsBeingProcessed.length) {
      complete();
      return;
    }

    data = {
      action: 'drgc_ajx_action',
      step: 'batchprocess',
      persist: persist,
      nonce: ajax_nonce,
      instance_id: instance_id,
      itemsBeingProcessed: itemsBeingProcessed
    };
    $.ajax({
      dataType: 'json',
      data: data,
      type: 'post',
      url: ajaxUrl,
      context: this,
      nonce: ajax_nonce,
      success: ajaxBatchSuccess
    });
  }

  function ajaxBatchSuccess(data, textStatus, jqXHR) {
    var lastIndex;
    $.each(data.results, function (key, value) {
      if (value.success) {
        itemsCompleted.push(key);
      } else if ('failure' === value) {
        itemsFailed.push(key);
      }

      lastIndex = key;
    });
    updateStatus(itemIndex);
    itemsBeingProcessed = [];
    persist = data.results[lastIndex]['persist'];
    processNext();
  }

  function updateStatus(numberProcessed) {
    if (!$domStatusCounter) {
      $domStatusCounter = $('#dr-data-process-counter');
    }

    $progressBar.progressbar("option", "value", numberProcessed);
    $domStatusCounter.text(numberProcessed);
  }

  function updateTotal(numberTotal) {
    $('#dr-data-process-total').text(numberTotal);
  }

  function complete() {
    $progressBar.hide();
    $('.wrapImportControls').html("<h3><b>Cleaning up...</b></h3>");
    var data = {
      action: 'drgc_ajx_action',
      step: 'end',
      persist: persist,
      nonce: ajax_nonce,
      instance_id: instance_id
    };
    $.ajax({
      dataType: 'json',
      data: data,
      type: 'post',
      url: ajaxUrl,
      context: this,
      success: ajaxCompleteSuccess
    });
  }

  function ajaxCompleteSuccess(data, textStatus, jqXHR) {
    window.location.href = data.url;
  }
});
/* harmony default export */ var admin_import = (ImportModule);
// CONCATENATED MODULE: ./assets/js/admin/admin-sync-locales.js
var SyncLocalesModule = {};
jQuery(document).ready(function ($) {
  $('#dr-sync-locales-btn').click(function () {
    $.ajax({
      type: 'POST',
      url: drgc_admin_params.ajax_url,
      data: {
        action: 'drgc_sync_locales',
        nonce: drgc_admin_params.ajax_nonce
      },
      success: function success() {
        window.location.reload();
      }
    });
  });
});
/* harmony default export */ var admin_sync_locales = (SyncLocalesModule);
// CONCATENATED MODULE: ./assets/js/admin/admin.js



/***/ })
/******/ ]);