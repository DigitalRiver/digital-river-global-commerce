const dropinConfigModule = {};

(($) => {
  $(() => {
    if ($('#drgc_drop_in_config').length) {
      const editorSettings = wp.codeEditor.defaultSettings ? _.clone( wp.codeEditor.defaultSettings ) : {};

      editorSettings.codemirror = _.extend(
        {},
        editorSettings.codemirror,
        {
          indentUnit: 2,
          tabSize: 2
        }
      );

      wp.codeEditor.initialize($('#drgc_drop_in_config'), editorSettings);
    }
  });
})(jQuery);

export default dropinConfigModule;