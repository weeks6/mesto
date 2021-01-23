const likeButtons = document.querySelectorAll('.like-button')

for (const button of likeButtons) {
    button.addEventListener('click', () => {
        button.classList.toggle('like-button_active')
    })
}

const editButton = document.querySelector('.edit-button')
const closeButton = document.querySelector('.close-button')

const editForm = document.querySelector('.edit-form')

const popup = document.querySelector('.popup')

const nameEl = document.querySelector('.profile-info__name')
const aboutEl = document.querySelector('.profile-info__about')

const nameFormField = editForm.querySelector('.edit-form__field_name')
const aboutFormField = editForm.querySelector('.edit-form__field_about')

editButton.addEventListener('click', () => {
    nameFormField.value = nameEl.textContent
    aboutFormField.value = aboutEl.textContent
    popup.classList.add('popup_opened')
})

closeButton.addEventListener('click', () => {
    popup.classList.remove('popup_opened')
})

editForm.addEventListener('submit', event => {
    event.preventDefault()

    nameEl.textContent = nameFormField.value
    aboutEl.textContent = aboutFormField.value

    popup.classList.remove('popup_opened')
})
