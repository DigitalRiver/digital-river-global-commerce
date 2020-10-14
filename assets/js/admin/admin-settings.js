const SettingsModule = (($) => {
  const convertToLocalHours = (utcHours) => {
    const utcDate = new Date(`2020-01-01 ${utcHours}:00:00 UTC`);
    let localHours = utcDate.getHours();
    localHours = (localHours === 0) ? 12 : ((localHours > 12) ? localHours - 12 : localHours);
    return (localHours < 10 ? '0' : '') + localHours;
  };

  const convertToUTCHours = (localHours) => {
    const localDate = new Date(`2020-01-01 ${localHours}:00:00`);
    let utcHours = localDate.getUTCHours();
    utcHours = (utcHours === 0) ? 12 : ((utcHours > 12) ? utcHours - 12 : utcHours);
    return (utcHours < 10 ? '0' : '') + utcHours;
  };

  return {
    convertToLocalHours,
    convertToUTCHours
  }
})(jQuery);

jQuery(document).ready(($) => {
  const utcTime = $('#drgc_cron_utc_time').val() || '12:00';
  const utcTimeArr = utcTime.split(':');
  let utcHours = utcTimeArr[0];
  let utcMinutes = utcTimeArr[1];

  $('#drgc_cron_local_hours').val(SettingsModule.convertToLocalHours(utcHours));
  $('#drgc_cron_handler').trigger('change');

  $('#drgc_cron_handler').change((e) => {
    const isCronEnabled = $(e.target).is(':checked');
    $('#drgc_cron_schedule').toggle(isCronEnabled);
  });

  $('#drgc_cron_local_hours').change((e) => {
    const localHours = $(e.target).val();
    utcHours = SettingsModule.convertToUTCHours(localHours);
    $('#drgc_cron_utc_time').val(`${utcHours}:${utcMinutes}`);
    $('#drgc_cron_utc_label').text(`${utcHours}:${utcMinutes}`);
  });

  $('#drgc_cron_local_minutes').change((e) => {
    utcMinutes = $(e.target).val();
    $('#drgc_cron_utc_time').val(`${utcHours}:${utcMinutes}`);
    $('#drgc_cron_utc_label').text(`${utcHours}:${utcMinutes}`);
  });
});

export default SettingsModule;
