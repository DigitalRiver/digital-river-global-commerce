(function(wp, drgc_admin_params, $) {
  var defaultLocale = drgc_admin_params.default_locale;
  var localeOptions = drgc_admin_params.locale_options;
  if (!localeOptions || !localeOptions.length) return;

  var registerPlugin = wp.plugins.registerPlugin;
  var PluginSidebar = wp.editPost.PluginSidebar;
  var PluginSidebarMoreMenuItem = wp.editPost.PluginSidebarMoreMenuItem;
  var MenuGroup = wp.components.MenuGroup;
  var MenuItemsChoice = wp.components.MenuItemsChoice;
  var compose = wp.compose.compose;
  var withState = wp.compose.withState;
  var withSelect = wp.data.withSelect;
  var domReady = wp.domReady;

  var Fragment = wp.element.Fragment;
  var el = wp.element.createElement;
  var Text = wp.components.TextControl;
  var Textarea = wp.components.TextareaControl;

  var localeChoices = localeOptions.map(function(localeOption) {
    var isDefault = localeOption.dr_locale === defaultLocale;
    return {
      isDefault: isDefault,
      value: localeOption.dr_locale,
      label: isDefault ? localeOption.dr_locale + ' (Default)' : localeOption.dr_locale
    };
  });
  var selectedLocale = defaultLocale;
  var defaultPostTitle;
  var defaultPostContent;

  localeChoices.sort(function(a, b) {
    if (!a.isDefault && b.isDefault) {
      return 1;
    }
    if (a.isDefault && !b.isDefault) {
      return -1;
    }
    return 0;
  });

  // For listening title's change event to update localized meta data
  var ClonePostTitle = compose(
    withSelect(function(select, props) {
      return {
        titleValue: select('core/editor').getEditedPostAttribute('title')
      }
    })
  )(function(props) {
    wp.data.dispatch('core/editor').editPost({
      meta: { ['drgc_title_' + selectedLocale]: props.titleValue }
    });
    if (selectedLocale === defaultLocale) {
      defaultPostTitle = props.titleValue;
    }

    return el(Text, {
      value: props.titleValue
    });
  });

  // For listening content's change event to update localized meta data
  var ClonePostContent = compose(
    withSelect(function(select, props) {
      return {
        contentValue: select('core/editor').getEditedPostAttribute('content')
      }
    })
  )(function(props) {
    wp.data.dispatch('core/editor').editPost({
      meta: { ['drgc_content_' + selectedLocale]: props.contentValue }
    });
    if (selectedLocale === defaultLocale) {
      defaultPostContent = props.contentValue;
    }

    return el(Textarea, {
      value: props.contentValue
    });
  });

  var DRLocaleChoices = withState({
    selectedLocale: defaultLocale,
    choices: localeChoices
  })(function(_ref) {
    return el(MenuGroup,
      {
        label: 'Locales'
      },
      el(MenuItemsChoice,
        {
          choices: _ref.choices,
          value: _ref.selectedLocale,
          onSelect: function (_selectedLocale) {
            selectedLocale = _selectedLocale;
            _ref.setState({ selectedLocale: selectedLocale });
            var meta = wp.data.select('core/editor').getEditedPostAttribute('meta');
            wp.data.dispatch('core/editor').editPost({
              title: meta['drgc_title_' + selectedLocale] || defaultPostTitle,
              blocks: meta['drgc_content_' + selectedLocale] ?
                wp.blocks.parse(meta['drgc_content_' + selectedLocale]) :
                wp.blocks.parse(defaultPostContent)
            });
          }
        }
      )
    );
  });

  registerPlugin('drgc-sidebar', {
    render: function() {
      return el(Fragment,
        {},
        el(PluginSidebarMoreMenuItem,
          {
            target: 'drgc-sidebar',
            icon: 'admin-site'
          },
          'Digital River Global Commerce'
        ),
        el(PluginSidebar,
          {
            name: 'drgc-sidebar',
            icon: 'admin-site',
            title: 'Digital River Global Commerce'
          },
          el('div',
            { className: 'hidden' },
            el(ClonePostTitle),
            el(ClonePostContent)
          ),
          el('div',
            {
              id: 'dr-locale-choices-wrapper',
              className: 'plugin-sidebar-content'
            },
            el(DRLocaleChoices)
          )
        )
      );
    }
  });

  domReady(function() {
    var currentPost = wp.data.select('core/editor').getCurrentPost();
    defaultPostTitle = currentPost.title;
    defaultPostContent = currentPost.content;

    // Make sure default post title/content is synced with default locale's meta data on form submitted
    $('.editor-post-publish-button__button').click(function(e) {
      if ($(e.target).attr('aria-disabled') === 'true') return;
      $('#dr-locale-choices-wrapper button.components-menu-items-choice').eq(0).trigger('click');
    });
  });

})(window.wp, drgc_admin_params, jQuery);
