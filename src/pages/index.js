import "./index.css";

import Card from "../scripts/components/Card.js";
import FormValidator from "../scripts/utils/FormValidator.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import Section from "../scripts/components/Section.js";
import UserInfo from "../scripts/components/UserInfo.js";
import Api from "../scripts/utils/Api.js";
import {
  validationConfig,
  formElements,
  aboutField,
  addButton,
  editButton,
  editForm,
  avatarField,
  editAvatarButton,
  linkField,
  nameField,
  titleField,
  baseUrl,
  authToken,
} from "../scripts/utils/constants.js";

/* валидация форм */
formElements.forEach((formElement) => {
  const formValidator = new FormValidator(validationConfig, formElement);
  formValidator.enableValidation();
});
const api = new Api({
  baseUrl,
  headers: {
    authorization: authToken,
    "Content-Type": "application/json",
  },
});

const imagePopup = new PopupWithImage(".image-popup");

const confirmDeletePopup = new PopupWithForm(".confirm-delete-popup", (evt) => {
  const cardId = confirmDeletePopup._form.querySelector(".button_type_save")
    .dataset.cardId;
  api.deleteCard(cardId).then(() => {
    cardList.removeElementById(cardId);
    confirmDeletePopup.close();
  });
});

const openConfirmDeletePopup = (payload) => {
  confirmDeletePopup._form.querySelector(".button_type_save").dataset.cardId =
    payload._id;
  confirmDeletePopup.open();
};

const createCard = (data, userId) => {
  return new Card(
    data,
    userId,
    "#card-template",
    imagePopup.open,
    () => openConfirmDeletePopup(data),
    function () {
      if (this.isLikedBy(userInfo.getUserId())) {
        return api.dislikeCard(data._id).then((res) => res);
      } else {
        return api.likeCard(data._id).then((res) => res);
      }
    }
  );
};

const cardList = new Section(
  {
    items: [],
    renderer: (card) => card.generateCard(),
  },
  ".elements"
);

const submitAddForm = () => {
  return api
    .createCard({ name: titleField.value, link: linkField.value })
    .then((card) => {
      cardList.addItem(createCard(card, userInfo.getUserId()));
    });
};
const addFormPopup = new PopupWithForm(".add-popup", () => {
  const initialButtonText = addFormPopup.submitButton.textContent;
  addFormPopup.submitButton.textContent = "Сохранение...";
  submitAddForm().then(() => {
    addFormPopup.submitButton.textContent = initialButtonText;
    addFormPopup.close();
  });
});
addButton.addEventListener("click", addFormPopup.open);

// setup user info
const userInfo = new UserInfo({
  nameSelector: ".profile-info__name",
  aboutSelector: ".profile-info__about",
  imageSelector: ".avatar__image",
});

api.getUserInfo().then((user) => {
  userInfo.setUserInfo(user);

  api.fetchCards().then((cards) => {
    cards
      .sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);

        if (dateB > dateA) {
          return -1;
        }

        if (dateB < dateA) {
          return 1;
        }

        return 0;
      })
      .forEach((card) => cardList.addItem(createCard(card, user._id)));
  });
});

const submitEditForm = () => {
  return api.updateUserInfo(nameField.value, aboutField.value).then((user) => {
    userInfo.setUserInfo({
      name: user.name,
      about: user.about,
    });
  });
};

const openEditPopup = () => {
  const userInfoData = userInfo.getUserInfo();
  editFormPopup.open();
  // ивенты диспатчатся чтобы затригерить начальную валидацию пустой формы
  nameField.value = userInfoData.name;
  nameField.dispatchEvent(new InputEvent("input"));
  aboutField.value = userInfoData.about;
  aboutField.dispatchEvent(new InputEvent("input"));
};

const editFormPopup = new PopupWithForm(".edit-popup", () => {
  const initialButtonText = editFormPopup.submitButton.textContent;
  editFormPopup.submitButton.textContent = "Сохранение...";
  submitEditForm().then(() => {
    editFormPopup.submitButton.textContent = initialButtonText;
  });
  editFormPopup.close();
});
editButton.addEventListener("click", openEditPopup);

const editAvatarPopup = new PopupWithForm(".edit-avatar-popup", () => {
  const initialButtonText = editAvatarPopup.submitButton.textContent;
  editAvatarPopup.submitButton.textContent = "Сохранение...";
  api.updateUserAvatar(avatarField.value).then((res) => {
    userInfo.setUserInfo(res);
    editAvatarPopup.close();
    editAvatarPopup.submitButton.textContent = initialButtonText;
  });
});

const openEditAvatarPopup = () => {
  const userInfoData = userInfo.getUserInfo();
  avatarField.value = userInfoData.src;
  avatarField.dispatchEvent(new InputEvent("input"));
  editAvatarPopup.open();
};

editAvatarButton.addEventListener("click", openEditAvatarPopup);
