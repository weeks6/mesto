// const likeButtons = document.querySelectorAll('.button_type_like')

// for (const button of likeButtons) {
//     button.addEventListener('click', () => {
//         button.classList.toggle('like-button_active')
//     })
// }

const editButton = document.querySelector('.button_type_edit')
const closeButton = document.querySelector('.button_type_close')
const editForm = document.querySelector('.edit-form')
const editPopup = document.querySelector('.popup')
const nameEl = document.querySelector('.profile-info__name')
const aboutEl = document.querySelector('.profile-info__about')
const nameFormField = editForm.querySelector('.edit-form__field_type_name')
const aboutFormField = editForm.querySelector('.edit-form__field_type_about')

const togglePopup = (popup) => {
    popup.classList.toggle('popup_opened')
}

const fillEditForm = () => {
    nameFormField.value = nameEl.textContent
    aboutFormField.value = aboutEl.textContent
}

const openEditPopup = () => {
    fillEditForm()
    togglePopup(editPopup)
}

const submitEditForm = (event) => {
    event.preventDefault()
    nameEl.textContent = nameFormField.value
    aboutEl.textContent = aboutFormField.value
    togglePopup(editPopup)
}

const closeEditPopup = () => {
    fillEditForm()
    togglePopup(editPopup)
}

editButton.addEventListener('click', openEditPopup)
closeButton.addEventListener('click', closeEditPopup)
editForm.addEventListener('submit', submitEditForm)
