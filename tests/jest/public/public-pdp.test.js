import PdpModule from '../../../assets/js/public/public-pdp';

describe('Test bindVariationPrice', () => {

  test('Each variation option should be applied with sale price and list price data when there is discount', () => {
    const pricing = {
      formattedListPrice: '100.00USD',
      formattedSalePriceWithQuantity: '87.00USD',
      listPrice: { currency: 'USD', value: 100 },
      salePriceWithQuantity: { currency: 'USD', value: 87 }
    };
    const $target = $('<option value="123456">My Variation</option>');

    PdpModule.bindVariationPrice(pricing, $target);
    expect($target.data('old-price')).toEqual(100);
    expect($target.data('price')).toEqual('87.00USD');
  });

  test('Each variation option should be applied with sale price data when there is NO discount', () => {
    const pricing = {
      formattedListPrice: '100.00USD',
      formattedSalePriceWithQuantity: '100.00USD',
      listPrice: { currency: 'USD', value: 100 },
      salePriceWithQuantity: { currency: 'USD', value: 100 }
    };
    const $target = $('<option value="123456">My Variation</option>');

    PdpModule.bindVariationPrice(pricing, $target);
    expect($target.data('old-price')).toBeUndefined();
    expect($target.data('price')).toEqual('100.00USD');
  });

});

describe('Test bindVariationInventoryStatus', () => {

  test('Each variation option should be applied with purchasable data', () => {
    const purchasable = 'true';
    const $target = $('<option value="123456">My Variation</option>');

    PdpModule.bindVariationInventoryStatus(purchasable, $target);
    expect($target.data('purchasable')).toEqual('true');
  });

});

describe('Test selectVariation', () => {

  test('The targeted variation option should be selected to trigger displaying pricing & buy button event', () => {
    const $inputRadio = $('<input type="radio" value="123456">');
    const $selectOption = $('<option value="123456">My Variation</option>');
    $inputRadio.trigger = jest.fn();
    $selectOption.trigger = jest.fn();

    PdpModule.selectVariation($inputRadio);
    expect($inputRadio.prop('checked')).toBe(true);
    expect($inputRadio.trigger).toBeCalledWith('click');

    PdpModule.selectVariation($selectOption);
    expect($selectOption.prop('selected')).toBe(true);
    expect($selectOption.trigger).toBeCalledWith('change');
  });

});

describe('Test displayRealTimePricing', () => {

  test('It should display price with strikethrough when there is discount', () => {
    const pricing = {
      formattedListPrice: '100.00USD',
      formattedSalePriceWithQuantity: '87.00USD',
      listPrice: { currency: 'USD', value: 100 },
      salePriceWithQuantity: { currency: 'USD', value: 87 }
    };
    const isPdCard = true;
    const pdPriceOption = { // non-DR theme
      $card: $('.dr-pd-item'),
      $variationOption: $('select[name=dr-variation] option'),
      priceDivSelector: () => { return isPdCard ? '.dr-pd-item-price' : '.dr-pd-price'; },
      listPriceDiv: 'del',
      listPriceClass: () => { return 'dr-strike-price'; },
      salePriceDiv: 'strong',
      salePriceClass: () => { return 'dr-sale-price'; },
      priceDiv: 'strong',
      priceClass: () => { return 'dr-sale-price'; }
    };
    const $target = $('<p class="dr-pd-price dr-pd-item-price"></p>');

    PdpModule.displayRealTimePricing(pricing, pdPriceOption, $target);
    const received = $target.html().replace(/\s\s+/g, '');
    const expected = '<del class="dr-strike-price">100</del><strong class="dr-sale-price">87.00USD</strong>';
    expect(received).toEqual(expected);
  });

  test('It should display only one price when there is NO discount', () => {
    const pricing = {
      formattedListPrice: '100.00USD',
      formattedSalePriceWithQuantity: '100.00USD',
      listPrice: { currency: 'USD', value: 100 },
      salePriceWithQuantity: { currency: 'USD', value: 100 }
    };
    const isPdCard = false;
    const pdPriceOption = { // DR theme
      $card: $('.c-product-card'),
      $variationOption: $('input[type=radio][name=variation]'),
      priceDivSelector: () => { return isPdCard ? '.c-product-card__bottom__price' : '.product-pricing'; },
      listPriceDiv: 'span',
      listPriceClass: () => { return isPdCard ? 'old-price' : 'product-price-old'; },
      salePriceDiv: 'span',
      salePriceClass: () => { return isPdCard ? 'new-price' : 'product-price'; },
      priceDiv: 'span',
      priceClass: () => { return isPdCard ? 'price' : 'product-price'; }
    };
    const $target = $('<div class="product-pricing"></div>');

    PdpModule.displayRealTimePricing(pricing, pdPriceOption, $target);
    const received = $target.html().replace(/\s\s+/g, '');
    const expected = '<span class="product-price">100.00USD</span>';
    expect(received).toEqual(expected);
  });

  test('It should display empty string when there is no pricing data', () => {
    const pricing = {};
    const pdPriceOption = {};
    const $target = $('<div></div>');

    PdpModule.displayRealTimePricing(pricing, pdPriceOption, $target);
    expect($target.html()).toEqual('');
  });

});

describe('Test displayRealTimeBuyBtn', () => {

  const $buyBtn = $('<button type="button">Add to Cart</button>');

  test('For non-redirect buy button, when the product is purchasable, its buy button should be available and display "Add to Cart"', () => {
    PdpModule.displayRealTimeBuyBtn('true', false, $buyBtn);
    expect($buyBtn.text()).toEqual('Add to Cart');
    expect($buyBtn.prop('disabled')).toBe(false);
  });

  test('For non-redirect buy button, when the product is unpurchasable, its buy button should be unavailable and display "Out of Stock"', () => {
    PdpModule.displayRealTimeBuyBtn('false', false, $buyBtn);
    expect($buyBtn.text()).toEqual('Out of Stock');
    expect($buyBtn.prop('disabled')).toBe(true);
  });

  test('For redirect buy button, when the product is purchasable, its buy button should be available and display "Buy Now"', () => {
    PdpModule.displayRealTimeBuyBtn('true', true, $buyBtn);
    expect($buyBtn.text()).toEqual('Buy Now');
    expect($buyBtn.prop('disabled')).toBe(false);
  });

  test('For redirect buy button, when the product is unpurchasable, its buy button should be unavailable and display "Out of Stock"', () => {
    PdpModule.displayRealTimeBuyBtn('false', true, $buyBtn);
    expect($buyBtn.text()).toEqual('Out of Stock');
    expect($buyBtn.prop('disabled')).toBe(true);
  });

});

