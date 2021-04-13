export default class UserInfo {
  constructor({ nameSelector, aboutSelector, imageSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._aboutElement = document.querySelector(aboutSelector);
    this._imageElement = document.querySelector(imageSelector);
  }

  getUserId() {
    return this._id;
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      about: this._aboutElement.textContent,
      src: this._imageElement.src,
    };
  }

  setUserInfo({ _id, name, about, avatar }) {
    if (_id) {
      this._id = _id;
    }

    if (avatar) {
      this._imageElement.src = avatar;
    }

    this._nameElement.textContent = name;
    this._aboutElement.textContent = about;
    this._imageElement.alt = `${name}; ${about}`;
  }
}
