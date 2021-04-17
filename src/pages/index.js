import "./index.css";

import Card from "../scripts/components/Card.js";
import FormValidator from "../scripts/components/FormValidator.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import Section from "../scripts/components/Section.js";
import UserInfo from "../scripts/components/UserInfo.js";
import Api from "../scripts/components/Api.js";
import {
  validationConfig,
  formElements,
  confirmDeleteForm,
  aboutField,
  addButton,
  editButton,
  editAvatarButton,
  nameField,
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

const confirmDeletePopup = new PopupWithForm(
  ".confirm-delete-popup",
  (evt) => {
    console.log(evt);
    const cardId = confirmDeletePopup.cardId;
    api
      .deleteCard(cardId)
      .then(() => {
        cardList.removeElementById(cardId);
        confirmDeletePopup.close();
      })
      .catch((err) => console.log(err));
  },
  { resetOnClose: false }
);

const openConfirmDeletePopup = (payload) => {
  confirmDeletePopup.cardId = payload._id;
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

const submitAddForm = (formValues) => {
  return api
    .createCard({
      name: formValues.fieldTitle.value,
      link: formValues.fieldLink.value,
    })
    .then((card) => {
      cardList.addItem(createCard(card, userInfo.getUserId()));
    })
    .catch((err) => console.log(err));
};
const addFormPopup = new PopupWithForm(".add-popup", (formValues) => {
  const initialButtonText = addFormPopup.submitButton.textContent;
  addFormPopup.submitButton.textContent = "Сохранение...";
  submitAddForm(formValues)
    .then(() => {
      addFormPopup.close();
      addFormPopup.submitButton.textContent = initialButtonText;
    })
    .catch((err) => console.log(err));
});
addButton.addEventListener("click", addFormPopup.open);

// setup user info
const userInfo = new UserInfo({
  nameSelector: ".profile-info__name",
  aboutSelector: ".profile-info__about",
  imageSelector: ".avatar__image",
});

api
  .getUserInfo()
  .then((user) => {
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
  })
  .catch((err) => console.log(err));

const submitEditForm = (formValues) => {
  console.log(formValues);
  return api
    .updateUserInfo(formValues.fieldName.value, formValues.fieldAbout.value)
    .then((user) => {
      userInfo.setUserInfo({
        name: user.name,
        about: user.about,
      });
    })
    .catch((err) => console.log(err));
};

const openEditPopup = () => {
  const userInfoData = userInfo.getUserInfo();
  editFormPopup.open();

  /**
   * диспатч ивентов здесь для того,
   * чтобы при заполнение данных через свойство value проходила
   * валидация этих полей и вследствие этого кнопка становилась активной
   * иначе кнопка остается неактивной после того, как в поля
   * записаны новые данные через value
   * потому что нет нативного ивента изменения свойства value,
   * на которй можно вешать валидацию
   */

  nameField.value = userInfoData.name;
  nameField.dispatchEvent(new InputEvent("input"));
  aboutField.value = userInfoData.about;
  aboutField.dispatchEvent(new InputEvent("input"));
};

const editFormPopup = new PopupWithForm(".edit-popup", (formValues) => {
  const initialButtonText = editFormPopup.submitButton.textContent;
  editFormPopup.submitButton.textContent = "Сохранение...";
  submitEditForm(formValues)
    .then(() => {
      editFormPopup.close();
      editFormPopup.submitButton.textContent = initialButtonText;
    })
    .catch((err) => console.log(err));
});
editButton.addEventListener("click", openEditPopup);

const editAvatarPopup = new PopupWithForm(
  ".edit-avatar-popup",
  (formValues) => {
    const initialButtonText = editAvatarPopup.submitButton.textContent;
    editAvatarPopup.submitButton.textContent = "Сохранение...";
    api
      .updateUserAvatar(formValues.fieldAvatar.value)
      .then((res) => {
        userInfo.setUserInfo(res);
        editAvatarPopup.close();
        editAvatarPopup.submitButton.textContent = initialButtonText;
      })
      .catch((err) => console.log(err));
  }
);

const openEditAvatarPopup = () => {
  editAvatarPopup.open();
};

editAvatarButton.addEventListener("click", openEditAvatarPopup);
