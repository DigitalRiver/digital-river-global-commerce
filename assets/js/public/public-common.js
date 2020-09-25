import CheckoutUtils from './checkout-utils';
import DRCommerceApi from './commerce-api';

const CommonModule = {};

(function(w) {
  w.URLSearchParams = w.URLSearchParams || function (searchString) {
    var self = this;
    self.searchString = searchString;
    self.get = function (name) {
      var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(self.searchString);
      if (results == null) {
        return null;
      }
      else {
        return decodeURI(results[1]) || 0;
      }
    };
  }
})(window);

window.onpageshow = function(event) {
  if (event.persisted || window.performance && window.performance.navigation.type === 2) {
    window.location.reload();
  }
};

jQuery(document).ready(($) => {
  $('input[type=text]:required').on('input', (e) => {
    const elem = e.target;

    elem.setCustomValidity((elem.value && !$.trim(elem.value)) ? drgc_params.translations.required_field_msg : '');
    if (elem.validity.valueMissing) {
      $(elem).next('.invalid-feedback').text(drgc_params.translations.required_field_msg);
    } else if (elem.validity.customError) {
      $(elem).next('.invalid-feedback').text(elem.validationMessage);
    }
  });

  $('#dr-locale-selector .dr-current-locale, #dr-currency-selector, .dr-selected-currency').click((e) => {
    e.preventDefault();
  });

  $('#dr-locale-selector .dr-other-locales a').click((e) => {
    e.preventDefault();
    const $this = $(e.target);
    const targetLocale = $this.data('dr-locale');
    const params = new URLSearchParams(location.search);

    $('body').addClass('dr-loading');
    $('ul.dr-other-locales').hide();
    params.set('locale', targetLocale);
    window.location.search = params.toString();
  });

  $('#dr-currency-selector .dr-other-currencies a').click((e) => {
    e.preventDefault();
    const $this = $(e.target);
    const targetCurrency = $this.data('dr-currency');

    if ($('.dr-cart__content').length) $('.dr-cart__content').addClass('dr-loading');
    else $('body').addClass('dr-loading');
    
    $('ul.dr-other-currencies').hide();

    DRCommerceApi.updateShopper({ currency: targetCurrency })
      .then(() => {
        window.location.reload(true);
      })
      .catch((jqXHR) => {
        CheckoutUtils.apiErrorHandler(jqXHR);
      });
  });

  if ($('.dr-widget-wrapper > #dr-mobile-mini-cart').length) {
    const $mobileMiniCart = $('#dr-mobile-mini-cart');
    const selectors = ['body > header', 'div > header', 'div > div > header'];
    const targetSelector = selectors.find(element => $(element).length > 0);

    if (targetSelector !== undefined) {
      $(targetSelector).after($mobileMiniCart);
    } else {
      $('#dr-minicart').show();
    }
  }
});

export default CommonModule;
