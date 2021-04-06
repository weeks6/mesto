export default class UserInfo {
  constructor({ nameSelector, aboutSelector, imageSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._aboutElement = document.querySelector(aboutSelector);
    this._imageElement = document.querySelector(imageSelector);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      about: this._aboutElement.textContent,
      src: this._imageElement.src,
    };
  }

  setUserInfo({ name, about, src }) {
    this._nameElement.textContent = name;
    this._aboutElement.textContent = about;
    this._imageElement.alt = `${name}; ${about}`;
    if (src) {
      this._imageElement.src = src;
    }
  }
}
