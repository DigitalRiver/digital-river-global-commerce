import LoginModule from '../../../assets/js/public/public-login';

describe('Test validatePassword', () => {

  test('It should display an error message below password field according to what user input', () => {
    document.body.innerHTML = '<div id="parent"></div>';

    const input = document.createElement('input');
    input.type = 'password';
    input.required = true;

    const errMsg = document.createElement('div');
    errMsg.setAttribute('class', 'invalid-feedback');

    const parent = document.getElementById('parent');
    parent.appendChild(input);
    parent.appendChild(errMsg);

    const mockEvent = new Event('input');
    input.dispatchEvent(mockEvent);

    input.value = '';
    LoginModule.validatePassword(mockEvent);
    expect(errMsg.innerHTML).toEqual('This field is required.');

    input.value = 'Ab12!';
    LoginModule.validatePassword(mockEvent);
    expect(errMsg.innerHTML).toEqual('Password must be between 8 - 32 characters.');

    input.value = 'abcd1234!';
    LoginModule.validatePassword(mockEvent);
    expect(errMsg.innerHTML).toEqual('Must use at least one upper case letter.');

    input.value = 'ABCD1234!';
    LoginModule.validatePassword(mockEvent);
    expect(errMsg.innerHTML).toEqual('Must use at least one lower case letter.');

    input.value = 'AbcdAbcd!';
    LoginModule.validatePassword(mockEvent);
    expect(errMsg.innerHTML).toEqual('Must use at least one number.');

    input.value = 'Abcd1234';
    LoginModule.validatePassword(mockEvent);
    expect(errMsg.innerHTML).toEqual('Must use at least one special character (! _ @).');

    input.value = 'Abcd1234!~';
    LoginModule.validatePassword(mockEvent);
    expect(errMsg.innerHTML).toEqual('Contains non-allowable special characters (only ! _ @ are allowed).');

    input.value = 'abc123';
    LoginModule.validatePassword(mockEvent);
    expect(errMsg.innerHTML).toEqual('Password must be between 8 - 32 characters. Must use at least one upper case letter. Must use at least one special character (! _ @).');

    input.value = 'Abcd1234!';
    LoginModule.validatePassword(mockEvent);
    expect(errMsg.innerHTML).toEqual('');
  });

});

describe('Test checkoutAsGuest', () => {
  test('It should call AJAX for updating guest flag', () => {
    const mockEvent = new Event('click');
    $.ajax = jest.fn().mockImplementation(() => {
      return Promise.resolve({ success: true });
    });
    LoginModule.checkoutAsGuest(mockEvent);

    expect($.ajax).toBeCalledWith({
      type: 'POST',
      url: drgc_params.ajaxUrl,
      data: {
        action: 'drgc_checkout_as_guest',
        nonce: drgc_params.ajaxNonce
      },
      success: expect.any(Function)
    });
  });
});

describe('Test logout', () => {
  test('It should call AJAX for cleaning up the session, the button and the page should be loading status', () => {
    const logoutBtn = document.createElement('a');
    const mockEvent = new Event('click');
    logoutBtn.text = 'Logout';
    logoutBtn.href = '#';
    logoutBtn.dispatchEvent(mockEvent);

    $.post = jest.fn().mockImplementation(() => {
      return Promise.resolve({ success: true });
    });
    LoginModule.logout(mockEvent);

    expect($.post).toBeCalledWith(
      drgc_params.ajaxUrl,
      {
        action: 'drgc_logout',
        nonce: drgc_params.ajaxNonce
      },
      expect.any(Function)
    );
    expect($(logoutBtn).hasClass('sending')).toBe(true);
    expect($('body').hasClass('dr-loading')).toBe(true);
  });
});
