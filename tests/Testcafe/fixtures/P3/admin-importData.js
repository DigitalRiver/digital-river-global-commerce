import AdminUtils from '../../utils/adminUtils';
import AdminRole from '../../utils/adminRole';

const adminUtils = new AdminUtils();
fixture `===== DRGC P3 Automation Test - Admin: Import Data =====`
  .beforeEach(async t => {
    console.log('>> Logging in into admin panel...');
    await t
      .setTestSpeed(0.8)
      .useRole(AdminRole)
      .maximizeWindow();
    console.log('>> Login to admin panel successfully!');
  });

test('Move DR Products to Trash', async t => {
  console.log('Test Case: Move DR Products to Trash');
  console.log('>> Enter product import page and move all products into trash');
  await adminUtils.emptyProducts();
});

test('Import DR Products Again After Empty Products', async t => {
  console.log('Test Case: Import DR products');
  await adminUtils.importData();
});
