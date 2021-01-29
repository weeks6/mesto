// очистка полей формы
const clearFormFields = (...fields) => {
    for (let field of fields) {
        field.value = ''
    }
}

const togglePopup = (popup) => {
    popup.classList.toggle('popup_opened')
}

// редактирование профиля
const editButton = document.querySelector('.button_type_edit')
const closeEditPopupBtn = document.querySelector('.button_popup_edit_close')
const editForm = document.querySelector('.edit-form')
const editPopup = document.querySelector('.edit-popup')
const nameEl = document.querySelector('.profile-info__name')
const aboutEl = document.querySelector('.profile-info__about')
const nameFormField = editForm.querySelector('.edit-form__field_type_name')
const aboutFormField = editForm.querySelector('.edit-form__field_type_about')

const fillEditForm = () => {
    nameFormField.value = nameEl.textContent
    aboutFormField.value = aboutEl.textContent
}

const openEditPopup = () => {
    fillEditForm()
    togglePopup(editPopup)
}

const submitEditForm = (evt) => {
    evt.preventDefault()
    nameEl.textContent = nameFormField.value
    aboutEl.textContent = aboutFormField.value
    togglePopup(editPopup)
}

const closeEditPopup = () => {
    clearFormFields(nameFormField, aboutFormField)
    togglePopup(editPopup)
}

editButton.addEventListener('click', openEditPopup)
closeEditPopupBtn.addEventListener('click', closeEditPopup)
editForm.addEventListener('submit', submitEditForm)

// создание карточки

const cardTemplate = document.querySelector('#card-template').content
const createCardElement = (template, title, link, imageAlt = title) => {
    const cardElement = template.querySelector('.card').cloneNode(true)

    cardElement.querySelector('.card__title').textContent = title
    cardElement.querySelector('.card__image').src = link
    cardElement.querySelector('.card__image').alt = imageAlt

    // лайк карточки
    const likeButton = cardElement.querySelector('.button_type_like')
    likeButton.addEventListener('click', () => {
        likeButton.classList.toggle('button_type_like_active')
    })

    return cardElement
}

// создание новой карточки 
const cardList = document.querySelector('.elements')

const addPopup = document.querySelector('.add-popup')
const addForm = document.querySelector('.add-form')

const closeAddPopupBtn = document.querySelector('.button_popup_add_close')
const addButton = document.querySelector('.button_type_add')

const titleField = addForm.querySelector('.add-form__field_type_title')
const linkField = addForm.querySelector('.add-form__field_type_image-link')

const openAddPopup = () => {
    togglePopup(addPopup)
}

const closeAddPopup = () => {
    togglePopup(addPopup)
    clearFormFields(titleField, linkField)
}

const submitAddForm = (evt) => {
    evt.preventDefault()
    cardList.prepend(createCardElement(cardTemplate, titleField.value, linkField.value))
    closeAddPopup()
}

addButton.addEventListener('click', openAddPopup)
closeAddPopupBtn.addEventListener('click', closeAddPopup)
addForm.addEventListener('submit', submitAddForm)

// начальный набор карточек
const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ]; 

initialCards.forEach(cardContent => cardList.append(createCardElement(cardTemplate, cardContent.name, cardContent.link)))

