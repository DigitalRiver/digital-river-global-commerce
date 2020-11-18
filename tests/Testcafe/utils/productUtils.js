export default class ProductUtils {
  constructor() {
  }

  getTestingPhysicalProduct() {
    const product = {
      productID: '5431962100',
      productName: 'TESTCAFE PHYSICAL PRODUCT',
      permalink: 'testcafe-physical-product'
    };

    return product;
  }

  getTestingDigitalProduct() {
    const product = {
      productID: '5431962200',
      productName: 'TESTCAFE DIGIITAL PRODUCT',
      permalink: 'testcafe-digiital-product'
    };

    return product;
  }

  getOnSaleProduct() {
    const product = {
      productID: '5432070800',
      productName: 'TESTCAFE ON SALE PRODUCT',
      permalink: 'testcafe-on-sale-product'
    };

    return product;
  }

  getLocalTestProduct() {
    const product = {
      productID: '5432232500',
      productName: 'Testcafe Locale Testing Product',
      shortDesc: 'This is the locale short description for default(English) language',
      longDesc: 'This is the locale long description for default(English) language',
      permalink: 'testcafe-locale-testing-product',
      productNameTW: 'Testcafe 測試商品',
      shortDescTW: '這是測試商品的短敘述。',
      longDescTW: '這是測試商品的長敘述。'
    };

    return product;
  }

  getVariationProduct() {
    const product = {
      productID: '5458441600',
      productName: 'Pallidium Collection(Variation)',
      permalink: 'pallidium-collectionvariation'
    };

    return product;
  }
}
