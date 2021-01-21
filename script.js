const likeButtons = document.querySelectorAll('.like-button')

for (const button of likeButtons) {
    button.addEventListener('click', () => {
        button.classList.toggle('like-button_active')
    })
}