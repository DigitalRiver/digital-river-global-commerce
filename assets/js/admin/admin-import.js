const ImportModule = (($) => {
  let currentIdx = 0;
  let total = 0;
  let $importBtn;
  let $importNotice;
  let $importMsg;
  let $progressBar;
  let $process;
  let $processCounter;
  let $processTotal;

  $(() => {
    $importBtn = $('#products-import-btn');
    $importNotice = $('.products-import-notice');
    $importMsg = $('#products-import-msg');
    $progressBar = $('#products-import-progressbar');
    $process = $('#products-import-process');
    $processCounter = $('#products-import-process-counter');
    $processTotal = $('#products-import-process-total');
  });

  const importCategories = () => {
    $importBtn.prop('disabled', true);
    $importNotice.hide();
    $importMsg.text('Fetching and importing categories...').show();

    $.ajax({
      type: 'POST',
      url: drgc_admin_params.ajax_url,
      data: {
        action: 'drgc_ajx_action',
        nonce: drgc_admin_params.ajax_nonce,
        step: 'import_categories',
      },
      success: (res) => {
        colorLog('[Import Categories]', res.success ? 'success' : 'error', res);
        if (res.success) {
          $importMsg.text('All categories have been imported. Fetching products...');
          fetchAndCacheProducts();
        } else {
          if (res.data.error) displayImportNotice('error', res.data.error);
        }
      }
    });
  };

  const fetchAndCacheProducts = () => {
    $.ajax({
      type: 'POST',
      url: drgc_admin_params.ajax_url,
      data: {
        action: 'drgc_ajx_action',
        nonce: drgc_admin_params.ajax_nonce,
        step: 'fetch_and_cache_products',
      },
      success: (res) => {
        colorLog('[Fetch and Cache Products]', res.success ? 'success' : 'error', res);
        if (res.success) {
          total = res.data ? Object.keys(res.data).length : 0;
          if (total) {
            $importMsg.text('Importing products...');
            initProgressBar(currentIdx, total);
            importEachProduct(currentIdx);
          }
        } else {
          if (res.data.error) displayImportNotice('error', res.data.error);
        }
      }
    });
  };

  const importEachProduct = (idx) => {
    $.ajax({
      type: 'POST',
      url: drgc_admin_params.ajax_url,
      data: {
        action: 'drgc_ajx_action',
        nonce: drgc_admin_params.ajax_nonce,
        step: 'import_each_product',
        idx
      },
      success: (res) => {
        colorLog('[Import Each Product]', res.success ? 'success' : 'error', res);
        if (res.success) {
          currentIdx++;
          updateProgressBar();
          if (currentIdx < total) {
            importEachProduct(currentIdx);
          } else if (currentIdx === total) {
            const params = new URLSearchParams(location.search);
            $importMsg.text('All products have been imported. Cleaning up...');
            params.set('import-complete', true);
            window.location.search = params.toString();
          }
        } else {
          if (res.data.error) displayImportNotice('error', res.data.error);
        }
      }
    });
  };

  const initProgressBar = (count, total) => {
    $progressBar.show();
    $process.show();
    $progressBar.progressbar({ value: count, max: total });
    $processCounter.text(count);
    $processTotal.text(total);
  };

  const updateProgressBar = () => {
    $progressBar.progressbar('option', 'value', currentIdx);
    $processCounter.text(currentIdx);
  };

  const displayImportNotice = (type = 'success', msg) => {
    $importNotice.remove();
    const $notice = $(`<div class="notice notice-${type} is-dismissible products-import-notice"><p>${msg}</p></div>`);
    $notice.insertBefore('.products-import-wrapper');
  };

  const colorLog = (msg, color, anotherMsg) => {
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
    importCategories,
    fetchAndCacheProducts,
    importEachProduct,
    initProgressBar,
    updateProgressBar,
    displayImportNotice,
    colorLog
  };
})(jQuery);

jQuery(document).ready(($) => {
  $('#products-import-btn').click((e) => {
    if (!drgc_admin_params.site_id || !drgc_admin_params.api_key) {
      return alert('Please provide siteID & apiKey!');
    }
    ImportModule.importCategories();
  });
});

export default ImportModule;
