const SyncLocalesModule = {};

jQuery(document).ready(($) => {
  $('#dr-sync-locales-btn').click(() => {
    $.ajax({
      type: 'POST',
      url: drgc_admin_params.ajax_url,
      data: {
        action: 'drgc_sync_locales',
        nonce: drgc_admin_params.ajax_nonce,
      },
      success: () => {
        window.location.reload();
      }
    });
  });
});

export default SyncLocalesModule;
