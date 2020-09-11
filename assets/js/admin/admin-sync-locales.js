const SyncLocalesModule = {};

jQuery(document).ready(($) => {
  $('#dr-sync-locales-btn').click((e) => {
    const $btn = $(e.target);

    $btn.addClass('sending');
    $.ajax({
      type: 'POST',
      url: drgc_admin_params.ajax_url,
      data: {
        action: 'drgc_sync_locales',
        nonce: drgc_admin_params.ajax_nonce,
      },
      success: () => {
        window.location.reload();
      },
      error: () => {
        $btn.removeClass('sending');
      }
    });
  });
});

export default SyncLocalesModule;
