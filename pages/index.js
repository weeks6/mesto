const pageElement = document.querySelector('.page')
const cardList = document.querySelector('.elements')

// очистка полей формы
const clearFormFields = (...fields) => {
  for (let field of fields) {
    field.value = ''
  }
}

const openPopup = (popup) => {
  popup.classList.add('popup_opened')
  pageElement.classList.add('page_no-overflow')
}

const closePopup = (popup) => {
  popup.classList.remove('popup_opened')
  pageElement.classList.remove('page_no-overflow')
}

// редактирование профиля
const editButton = document.querySelector('.button_type_edit')
const editForm = document.querySelector('.edit-form')
const editPopup = document.querySelector('.edit-popup')
const closeEditPopupBtn = editPopup.querySelector('.button_type_close')
const nameEl = document.querySelector('.profile-info__name')
const aboutEl = document.querySelector('.profile-info__about')
const nameFormField = editForm.querySelector('#edit-form__field_type_name')
const aboutFormField = editForm.querySelector('#edit-form__field_type_about')

const fillEditForm = () => {
  nameFormField.value = nameEl.textContent
  aboutFormField.value = aboutEl.textContent
}

const openEditPopup = () => {
  fillEditForm()
  openPopup(editPopup)
}

const submitEditForm = (evt) => {
  evt.preventDefault()
  nameEl.textContent = nameFormField.value
  aboutEl.textContent = aboutFormField.value
  closePopup(editPopup)
}

const closeEditPopup = () => {
  clearFormFields(nameFormField, aboutFormField)
  closePopup(editPopup)
}

editButton.addEventListener('click', openEditPopup)
closeEditPopupBtn.addEventListener('click', closeEditPopup)
editForm.addEventListener('submit', submitEditForm)

// создание карточки

const cardTemplate = document.querySelector('#card-template').content

const createCardElement = (template, title, link, imageAlt = title) => {
  const cardElement = template.querySelector('.card').cloneNode(true)
  const cardImage = cardElement.querySelector('.card__image')
  const cardTitle = cardElement.querySelector('.card__title')

  cardTitle.textContent = title
  cardImage.src = link
  cardImage.alt = imageAlt

  // открытие попапа картинки
  cardImage.addEventListener('click', () => openImagePopup(title, link))

  // лайк карточки
  const likeButton = cardElement.querySelector('.button_type_like')
  likeButton.addEventListener('click', () => {
    likeButton.classList.toggle('button_type_like_active')
  })

  // удаление карточки
  const deleteButton = cardElement.querySelector('.button_type_delete')
  deleteButton.addEventListener('click', deleteCard)

  return cardElement
}

const imagePopup = document.querySelector('.image-popup')
const imagePopupCloseBtn = imagePopup.querySelector('.button_type_close')
const imagePopupImg = imagePopup.querySelector('.image-popup__image')
const imagePopupTitle = imagePopup.querySelector('.image-popup__title')

// открытие попапа с картинкой
const openImagePopup = (title, link, imageAlt = title) => {
  imagePopupImg.src = link
  imagePopupImg.alt = imageAlt

  imagePopupTitle.textContent = title

  openPopup(imagePopup)
}

// закрытие попапа с картинкой
imagePopupCloseBtn.addEventListener('click', () => closePopup(imagePopup))

// удаление карточки
const deleteCard = (evt) => {
  const cardToDelete = evt.target.closest('li.card') // элемент карточки
  cardToDelete.remove()
}

// создание новой карточки

const addPopup = document.querySelector('.add-popup')
const addForm = document.querySelector('.add-form')

const closeAddPopupBtn = addPopup.querySelector('.button_type_close')
const addButton = document.querySelector('.button_type_add')

const titleField = addForm.querySelector('#add-form__field_type_title')
const linkField = addForm.querySelector('#add-form__field_type_link')

const openAddPopup = () => {
  openPopup(addPopup)
}

const closeAddPopup = () => {
  closePopup(addPopup)
  clearFormFields(titleField, linkField)
}

const submitAddForm = (evt) => {
  evt.preventDefault()
  cardList.prepend(
    createCardElement(cardTemplate, titleField.value, linkField.value)
  )
  closeAddPopup()
}

addButton.addEventListener('click', openAddPopup)
closeAddPopupBtn.addEventListener('click', closeAddPopup)
addForm.addEventListener('submit', submitAddForm)

// начальный набор карточек
const initialCards = [
  {
    name: 'Архыз',
    link:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
]

initialCards.forEach((cardContent) =>
  cardList.append(
    createCardElement(cardTemplate, cardContent.name, cardContent.link)
  )
)
