import LoginModule from './public-login';

const DrgcUserWatcher = ((w, d, p, $) => {
  const watcher = {
    interval: 900,
    debug: false,
    eventTypes: ['mousedown', 'mousemove', 'click', 'keydown', 'scroll', 'touchstart'],
    pathname: null,
    redirectUrl: p.loginUrl,
    escapeUrls: [],
    timerId: null,
    callback: null,
    closeModalInterval: 30,
    countDowninterval: null,
    init() {
      const isLoggedin = (p.isLogin === 'true');

      if (!isLoggedin) {
        this.log('Watcher is disabled for the anonymous user.');
        return false;
      }

      this.initPathname();

      if (!this.callback) {
        if (!this.redirectUrl) {
          this.log('The redirect url is undefined.');
          return false;
        }

        const redirectPath = new URL(this.redirectUrl).pathname;
        const loginPath = new URL(drgc_params.loginUrl).pathname;
        if ((this.pathname === redirectPath) && (this.pathname !== loginPath)) {
          this.log('The redirect page is the same as the current page and it is not the login page.');
          return false;
        }

        this.callback = this.redirect;
      }

      if (this.escapeUrls.indexOf(this.pathname) > -1) {
        this.log('Watcher is disabled for this page.');
        return false;
      }

      this.eventTypes.forEach(this.listen);
      this.tick();
    },
    listen(eventType) {
      d.addEventListener(eventType, watcher.tick);
    },
    unlisten(eventType) {
      d.removeEventListener(eventType, watcher.tick);
    },
    tick() {
      w.clearTimeout(watcher.timerId);
      watcher.timerId = w.setTimeout(watcher.act, watcher.interval * 1000);
      watcher.log('Watcher is restarted.');
    },
    act() {
      let closeInterval = watcher.closeModalInterval;
      let $currentSec = $('#dr-autoLogoutModalBody > p > strong');

      $('#dr-autoLogoutModal').modal('show');
      $currentSec.html(closeInterval);

      watcher.countDowninterval = w.setInterval(() => {
        $currentSec.html(closeInterval);
        closeInterval--;

        if (closeInterval < 0) {
          $('#dr-autoLogoutModal').on('shown').modal('hide');
          watcher.callback();
        }
      }, 1000);

      watcher.log('Timeout!');
      w.clearTimeout(watcher.timerId);
      watcher.eventTypes.forEach(watcher.unlisten);
      watcher.log('Watcher is disarmed.');
    },
    redirect() {
      w.clearInterval(this.countDowninterval);
      LoginModule.autoLogout(this.redirectUrl);
    },
    initPathname() {
      const parser = d.createElement('a');
      
      parser.href = '';
      this.pathname = parser.pathname;
      this.log('Pathname: ' + this.pathname);
    },
    closeModal() {
      w.clearInterval(this.countDowninterval);
      $('#dr-autoLogoutModal').modal('hide');
    },
    log(msg) {
      if (this.debug) w.console.log(msg);
    }
  };

  w.DrgcUserWatcherConfig = function() {
    const args = (arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments));

    if (!args[0]) return false;

    if (['url', 'escapeUrls', 'interval', 'callback', 'debug', 'closeModalInterval'].indexOf(args[0]) > -1) {
      watcher[args[0]] = args[1];
      watcher.init();
    } else {
      throw new Error('Unsupported parameter: ' + args[0]);
    }
  };

  $(function() {
    watcher.init();

    $('#dr-modalContinueBtn, #dr-modalLogoutBtn').on('click', (event) => {
      const target = event.target || event.srcElement;

      switch (target.id) {
        case 'dr-modalContinueBtn':
          watcher.closeModal();
          watcher.eventTypes.forEach(watcher.listen);
          watcher.tick();
          LoginModule.resetCookie();
          break;
        case 'dr-modalLogoutBtn':
          watcher.closeModal();
          watcher.callback();
          break;
      }
    });
  });

  return {
    watcher
  };
})(window, document, drgc_params, jQuery);

export default DrgcUserWatcher;
