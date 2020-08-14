export default class ProductUtils {
  constructor() {
  }

  getTestingPhysicalProduct() {
    const product = {
      productID: '5431962100',
      productName: 'TESTCAFE PHYSICAL PRODUCT',
      permalink: 'testcafe-physical-product'
    }

    return product
  }

  getTestingDigitalProduct() {
    const product = {
      productID: '5431962200',
      productName: 'TESTCAFE DIGIITAL PRODUCT',
      permalink: 'testcafe-digiital-product'
    }

    return product
  }

  getOnSaleProduct(){
    const product = {
      productID: '5432070800',
      productName: 'TESTCAFE ON SALE PRODUCT',
      permalink: 'testcafe-on-sale-product'
    }

    return product
  }
}
