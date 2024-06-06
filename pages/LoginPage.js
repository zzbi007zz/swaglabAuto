const I = actor();

module.exports = {
  url: 'https://www.saucedemo.com/',
  usernameField: '#user-name',
  passwordField: '#password',
  loginButton: '#login-button',

  login(username, password) {
    I.fillField(this.usernameField, username);
    I.fillField(this.passwordField, password);
    I.click(this.loginButton);
  }
};