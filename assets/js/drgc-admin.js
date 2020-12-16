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
var ImportModule = function ($) {
  var currentIdx = 0;
  var total = 0;
  var $importNotice;
  var $importBtn;
  var $importMsg;
  var $progress;
  var $progressBar;
  var $progressCount;
  var $progressTotal;
  $(function () {
    $importNotice = $('.products-import-notice');
    $importBtn = $('#products-import-btn');
    $importMsg = $('#products-import-msg');
    $progress = $('#products-import-progress');
    $progressBar = $('#products-import-progress-bar');
    $progressCount = $('#products-import-progress-count');
    $progressTotal = $('#products-import-progress-total');
  });

  var importCategories = function importCategories() {
    $importBtn.prop('disabled', true);
    $importNotice.hide();
    $importMsg.text('Fetching and importing categories...').show();
    $.ajax({
      type: 'POST',
      url: drgc_admin_params.ajax_url,
      data: {
        action: 'drgc_ajx_action',
        nonce: drgc_admin_params.ajax_nonce,
        step: 'import_categories'
      },
      success: function success(res) {
        colorLog('[Import Categories]', res.success ? 'success' : 'error', res);

        if (res.success) {
          $importMsg.text('All categories have been imported. Fetching products...');
          fetchAndCacheProducts();
        } else {
          if (res.data && res.data.error) displayImportNotice('error', res.data.error);
        }
      }
    });
  };

  var fetchAndCacheProducts = function fetchAndCacheProducts() {
    $.ajax({
      type: 'POST',
      url: drgc_admin_params.ajax_url,
      data: {
        action: 'drgc_ajx_action',
        nonce: drgc_admin_params.ajax_nonce,
        step: 'fetch_and_cache_products'
      },
      success: function success(res) {
        colorLog('[Fetch and Cache Products]', res.success ? 'success' : 'error', res);

        if (res.success) {
          total = res.data ? Object.keys(res.data).length : 0;

          if (total) {
            $importMsg.text('Importing products...');
            initProgressBar(currentIdx, total);
            importEachProduct(currentIdx);
          }
        } else {
          if (res.data && res.data.error) displayImportNotice('error', res.data.error);
        }
      }
    });
  };

  var importEachProduct = function importEachProduct(idx) {
    $.ajax({
      type: 'POST',
      url: drgc_admin_params.ajax_url,
      data: {
        action: 'drgc_ajx_action',
        nonce: drgc_admin_params.ajax_nonce,
        step: 'import_each_product',
        idx: idx
      },
      success: function success(res) {
        colorLog('[Import Each Product]', res.success ? 'success' : 'error', res);

        if (res.success) {
          currentIdx++;
          updateProgressBar(currentIdx, total);

          if (currentIdx < total) {
            importEachProduct(currentIdx);
          } else if (currentIdx === total) {
            setTimeout(function () {
              var params = new URLSearchParams(location.search);
              $importMsg.text('All products have been imported. Cleaning up...');
              $progress.hide();
              params.set('import_complete', true);
              params["delete"]('post_status'); // Make sure it will be redirected to "All" instead of "Trash" tab

              window.location.search = params.toString();
            }, 3000);
          }
        } else {
          if (res.data && res.data.error) displayImportNotice('error', res.data.error);
        }
      }
    });
  };

  var initProgressBar = function initProgressBar(count, total) {
    $progress.show();
    $progressTotal.text(total);
    updateProgressBar(count, total);
  };

  var updateProgressBar = function updateProgressBar(count, total) {
    var percent = (count / total).toFixed(2) * 100;
    $progressBar.css('width', "".concat(percent, "%"));
    $progressCount.text(count);
  };

  var displayImportNotice = function displayImportNotice() {
    var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'success';
    var msg = arguments.length > 1 ? arguments[1] : undefined;
    $importNotice.remove();
    var $notice = $("<div class=\"notice notice-".concat(type, " is-dismissible products-import-notice\"><p>").concat(msg, "</p></div>"));
    $notice.insertBefore('.products-import-wrapper');
  };

  var colorLog = function colorLog(msg, color, anotherMsg) {
    color = color || 'black';

    switch (color) {
      case 'success':
        color = 'Green';
        break;

      case 'info':
        color = 'DodgerBlue';
        break;

      case 'error':
        color = 'Red';
        break;

      case 'warning':
        color = 'Orange';
        break;

      default:
        color = color;
    }

    console.log('%c' + msg, 'color:' + color, anotherMsg);
  };

  return {
    importCategories: importCategories,
    fetchAndCacheProducts: fetchAndCacheProducts,
    importEachProduct: importEachProduct,
    initProgressBar: initProgressBar,
    updateProgressBar: updateProgressBar,
    displayImportNotice: displayImportNotice,
    colorLog: colorLog
  };
}(jQuery);

jQuery(document).ready(function ($) {
  $('#products-import-btn').click(function (e) {
    if (!drgc_admin_params.site_id || !drgc_admin_params.api_key) {
      return alert('Please provide siteID & apiKey!');
    }

    ImportModule.importCategories();
  });
});
/* harmony default export */ var admin_import = (ImportModule);
// CONCATENATED MODULE: ./assets/js/admin/admin-sync-locales.js
var SyncLocalesModule = {};
jQuery(document).ready(function ($) {
  $('#dr-sync-locales-btn').click(function (e) {
    var $btn = $(e.target);
    $btn.addClass('sending');
    $.ajax({
      type: 'POST',
      url: drgc_admin_params.ajax_url,
      data: {
        action: 'drgc_sync_locales',
        nonce: drgc_admin_params.ajax_nonce
      },
      success: function success() {
        window.location.reload();
      },
      error: function error() {
        $btn.removeClass('sending');
      }
    });
  });
});
/* harmony default export */ var admin_sync_locales = (SyncLocalesModule);
// CONCATENATED MODULE: ./assets/js/admin/admin-code-editor.js
var dropinConfigModule = {};

(function ($) {
  $(function () {
    if ($('#drgc_drop_in_config').length) {
      var editorSettings = wp.codeEditor.defaultSettings ? _.clone(wp.codeEditor.defaultSettings) : {};
      editorSettings.codemirror = _.extend({}, editorSettings.codemirror, {
        indentUnit: 2,
        tabSize: 2
      });
      wp.codeEditor.initialize($('#drgc_drop_in_config'), editorSettings);
    }
  });
})(jQuery);

/* harmony default export */ var admin_code_editor = (dropinConfigModule);
// CONCATENATED MODULE: ./assets/js/admin/admin-settings.js
var SettingsModule = function ($) {
  var convertToLocalHours = function convertToLocalHours(utcHours) {
    var utcDate = new Date("2020-01-01 ".concat(utcHours, ":00:00 UTC"));
    var localHours = utcDate.getHours();
    localHours = localHours === 0 ? 12 : localHours > 12 ? localHours - 12 : localHours;
    return (localHours < 10 ? '0' : '') + localHours;
  };

  var convertToUTCHours = function convertToUTCHours(localHours) {
    var localDate = new Date("2020-01-01 ".concat(localHours, ":00:00"));
    var utcHours = localDate.getUTCHours();
    utcHours = utcHours === 0 ? 12 : utcHours > 12 ? utcHours - 12 : utcHours;
    return (utcHours < 10 ? '0' : '') + utcHours;
  };

  return {
    convertToLocalHours: convertToLocalHours,
    convertToUTCHours: convertToUTCHours
  };
}(jQuery);

jQuery(document).ready(function ($) {
  var utcTime = $('#drgc_cron_utc_time').val() || '12:00';
  var utcTimeArr = utcTime.split(':');
  var utcHours = utcTimeArr[0];
  var utcMinutes = utcTimeArr[1];
  $('#drgc_cron_handler').change(function (e) {
    var isCronEnabled = $(e.target).is(':checked');
    $('#drgc_cron_schedule').toggle(isCronEnabled);
  });
  $('#drgc_cron_local_hours').change(function (e) {
    var localHours = $(e.target).val();
    utcHours = SettingsModule.convertToUTCHours(localHours);
    $('#drgc_cron_utc_time').val("".concat(utcHours, ":").concat(utcMinutes));
    $('#drgc_cron_utc_label').text("".concat(utcHours, ":").concat(utcMinutes));
  });
  $('#drgc_cron_local_minutes').change(function (e) {
    utcMinutes = $(e.target).val();
    $('#drgc_cron_utc_time').val("".concat(utcHours, ":").concat(utcMinutes));
    $('#drgc_cron_utc_label').text("".concat(utcHours, ":").concat(utcMinutes));
  });
  $('#drgc_cron_local_hours').val(SettingsModule.convertToLocalHours(utcHours));
  $('#drgc_cron_handler').trigger('change');
  $('.visible-toggle').click(function (e) {
    var $this = $(e.target);

    if ($this.hasClass('dashicons-hidden')) {
      $this.prev('input').attr('type', 'text');
    } else {
      $this.prev('input').attr('type', 'password');
    }

    $this.toggleClass('dashicons-hidden dashicons-visibility');
  });
});
/* harmony default export */ var admin_settings = (SettingsModule);
// CONCATENATED MODULE: ./assets/js/admin/admin.js





/***/ })
/******/ ]);