import AdminUtils from '../../utils/adminUtils';
import AdminRole from '../../utils/adminRole';

fixture `===== DRGC P3 Automation Test - Admin: Config DRGC Settings =====`;
const adminUtils = new AdminUtils();
const testSite = "siteDrdod15";

test('DR Site Settings - ', async t => {
  console.log('Test Case: Admin Page - DR Site Settings');
  console.log('>> Enter admin settings page');
  await t
    .setTestSpeed(0.8)
    .useRole(AdminRole)
    .maximizeWindow();
  await adminUtils.updateSiteSettings(testSite);
});
