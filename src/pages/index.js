import "./index.css";

import Card from "../scripts/components/Card.js";
import FormValidator from "../scripts/utils/FormValidator.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import Section from "../scripts/components/Section.js";
import UserInfo from "../scripts/components/UserInfo.js";
import {
  initialCards,
  validationConfig,
  formElements,
  aboutField,
  addButton,
  editButton,
  editForm,
  linkField,
  nameField,
  titleField,
} from "../scripts/utils/constants.js";

/* валидация форм */
formElements.forEach((formElement) => {
  const formValidator = new FormValidator(validationConfig, formElement);
  formValidator.enableValidation();
});

const imagePopup = new PopupWithImage(".image-popup");

const createCard = (cardContent) => {
  const cardData = {
    title: cardContent.name,
    src: cardContent.link,
  };

  return new Card(cardData, "#card-template", () => {
    imagePopup.open(cardData);
  }).generateCard();
};

const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => cardList.addItem(createCard(item)),
  },
  ".elements"
);

cardList.renderItems();

/* инициализация попапов классами */

const submitAddForm = () => {
  cardList.addItem(
    createCard({ name: titleField.value, link: linkField.value })
  );
};
const addFormPopup = new PopupWithForm(".add-popup", submitAddForm);
addButton.addEventListener("click", addFormPopup.open);

const userInfo = new UserInfo({
  titleSelector: ".profile-info__name",
  aboutSelector: ".profile-info__about",
});

const submitEditForm = () => {
  const titleField = editForm.elements["field__name"];
  const aboutField = editForm.elements["field__about"];
  userInfo.setUserInfo({
    title: titleField.value,
    about: aboutField.value,
  });
};

const openEditPopup = () => {
  const editFormData = userInfo.getUserInfo();
  editFormPopup.open();
  nameField.value = editFormData.title;
  nameField.dispatchEvent(new InputEvent("input"));
  aboutField.value = editFormData.about;
  aboutField.dispatchEvent(new InputEvent("input"));
};
const editFormPopup = new PopupWithForm(".edit-popup", submitEditForm);
editButton.addEventListener("click", openEditPopup);
