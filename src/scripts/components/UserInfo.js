export class UserInfo {
  constructor({ titleSelector, aboutSelector }) {
    this._titleElement = document.querySelector(titleSelector);
    this._aboutElement = document.querySelector(aboutSelector);
  }

  getUserInfo() {
    return {
      title: this._titleElement.textConten,
      about: this._aboutElement.textContent,
    };
  }

  setUserInfo({ title, about }) {
    this._titleElement.textContent = title;
    this._aboutElement.textContent = about;
  }
}
