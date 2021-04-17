export const validationConfig = {
  inputSelector: ".form__text-field",
  submitButtonSelector: ".button_type_save",
  inactiveButtonClass: "button_type_save_disabled",
  inputErrorClass: "form__text-field_type_error",
};

export const authToken = "bedcf061-ec3c-4659-8ef2-ecacae078c05";
export const baseUrl = "https://mesto.nomoreparties.co/v1/cohort-22";

export const formElements = Array.from(document.forms);

export const editButton = document.querySelector(".button_type_edit");

export const editAvatarButton = document.querySelector(".avatar__edit");
export const editAvatarForm = document.forms["edit-avatar-form"];
export const avatarField = editAvatarForm.elements["field__avatar"];

export const editForm = document.forms["edit-form"];
export const nameField = editForm.elements["fieldName"];
export const aboutField = editForm.elements["fieldAbout"];

export const addButton = document.querySelector(".button_type_add");

export const addForm = document.forms["add-form"];
export const confirmDeleteForm = document.forms["confirm-delete-form"];
