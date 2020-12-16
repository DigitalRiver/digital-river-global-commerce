import DrgcUserWatcher from '../../../assets/js/public/user-activity-watcher';

describe('DrgcUserWatcher', () => {
  test('anonymous user', () => {
    DrgcUserWatcher.watcher.tick = jest.fn();

    expect(DrgcUserWatcher.watcher.init()).not.toBeTruthy();
    expect(DrgcUserWatcher.watcher.callback).toBeNull();
    expect(DrgcUserWatcher.watcher.timerId).toBeNull();
    expect(DrgcUserWatcher.watcher.tick).not.toHaveBeenCalled();
  });

  test('without setting redirectUrl', () => {
    drgc_params.isLogin = 'true';
    DrgcUserWatcher.watcher.redirectUrl = null;
    DrgcUserWatcher.watcher.initPathname = jest.fn();
    DrgcUserWatcher.watcher.tick = jest.fn();

    const watcher = DrgcUserWatcher.watcher.init();

    expect(DrgcUserWatcher.watcher.initPathname).toHaveBeenCalled();
    expect(watcher).not.toBeTruthy();
    expect(DrgcUserWatcher.watcher.callback).toBeNull();
    expect(DrgcUserWatcher.watcher.timerId).toBeNull();
    expect(DrgcUserWatcher.watcher.tick).not.toHaveBeenCalled();
  });

  test('set redirectUrl same as the current page and it is not the login page', () => {
    DrgcUserWatcher.watcher.pathname = '/cart/';
    DrgcUserWatcher.watcher.redirectUrl = drgc_params.cartUrl;
    DrgcUserWatcher.watcher.tick = jest.fn();

    const watcher = DrgcUserWatcher.watcher.init();

    expect(watcher).not.toBeTruthy();
    expect(DrgcUserWatcher.watcher.tick).not.toHaveBeenCalled();
  });

  test('set escapeUrls to ["/login/"]', () => {
    DrgcUserWatcher.watcher.tick = jest.fn();
    DrgcUserWatcher.watcher.escapeUrls = ['/login/'];

    const watcher = DrgcUserWatcher.watcher.init();

    expect(watcher).not.toBeTruthy();
    expect(DrgcUserWatcher.watcher.tick).not.toHaveBeenCalled();
  });

  test('user events', () => {
    const map = {};
    document.addEventListener = jest.fn((event, cb) => {
      map[event] = cb;
    });
    DrgcUserWatcher.watcher.tick = jest.fn();
    DrgcUserWatcher.watcher.pathname = '/';
    DrgcUserWatcher.watcher.escapeUrls = [];

    DrgcUserWatcher.watcher.init();
    map.mousedown();
    map.mousemove();
    map.click();
    map.keydown();
    map.scroll();
    map.touchstart();

    expect(DrgcUserWatcher.watcher.tick).toHaveBeenCalledTimes(7);
  });

  test('configuration - without arguments', () => {
    expect(global.DrgcUserWatcherConfig()).not.toBeTruthy();
  });

  test('configuration - unsupported parameter', () => {
    expect(() => {
      global.DrgcUserWatcherConfig('error');
    }).toThrowError(new Error('Unsupported parameter: error'));
  });

  test('configuration - set debug to true', () => {
    DrgcUserWatcher.watcher.init = jest.fn();

    global.DrgcUserWatcherConfig('debug', true);

    expect(DrgcUserWatcher.watcher.debug).toBeTruthy();
    expect(DrgcUserWatcher.watcher.init).toHaveBeenCalled();
  });
});
