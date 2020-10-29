import { Selector, t } from 'testcafe';
import ProductUtils from '../../utils/productUtils';

const dataUtils = new ProductUtils();
const physicalProdID = dataUtils.getTestingPhysicalProduct().productID;
const digitalProdID = dataUtils.getTestingDigitalProduct().productID;
const onSaleProdID = dataUtils.getOnSaleProduct().productID;
const localeProdID = dataUtils.getLocalTestProduct().productID;

export default class HomePage {
  constructor() {
    this.productsMenu = Selector('a').withText('Products');
    this.addPhyProduct = Selector('.dr-buy-btn[data-product-id="' + physicalProdID + '"]');
    this.addDigiProduct = Selector('.dr-buy-btn[data-product-id="' + digitalProdID + '"]');
    this.addOnSaleProduct = Selector('button[data-product-id="' + onSaleProdID + '"]');
    this.addLocaleProduct = Selector('.dr-buy-btn[data-product-id="' + localeProdID + '"]');
    this.categoryRegularPrice = this.addOnSaleProduct.parent('div').find('.dr-strike-price');
    this.categorySalePrice = this.addOnSaleProduct.parent('div').find('.dr-sale-price');
    this.minicartItem = Selector('li.dr-minicart-item > div[data-product-id="' + onSaleProdID + '"]');
    this.minicartRegularPrice = this.minicartItem.find('p.dr-minicart-item-price > .dr-strike-price');
    this.minicartSalePrice = this.minicartItem.find('p.dr-minicart-item-price > .dr-sale-price');

    this.paginationPrevBtn = Selector('.prev.page-numbers');
    this.paginationNextBtn = Selector('.next.page-numbers');
    this.cartBtn = Selector('.dr-btn').withText('CART');
    this.checkoutBtn = Selector('.dr-btn').withText('CHECKOUT');
  }
}
