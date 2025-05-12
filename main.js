
let username = document.getElementById('username')
let textarea = document.getElementById('textarea')
let img = document.getElementById('img')
let userPosts = document.getElementById('user-posts')
function submitForm() {
    fetch('https://68219a00259dad2655afc151.mockapi.io/Post', {
        method: 'POST',
        body: JSON.stringify({
            username: username.value,
            textarea: textarea.value,
            img: img.value
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
    username.value = ''
    textarea.value = ''
    img.value = ''

}


let loadpost = document.addEventListener('DOMContentLoaded', function () {
    fetch('https://68219a00259dad2655afc151.mockapi.io/Post')
        .then((response) => response.json())
        .then((data) => {
            data.forEach((data) => {
                let userCard = document.createElement('div')
                userCard.classList.add('user-card')
                let img = document.createElement('img')
                img.src = data.img
                img.classList.add('user-image')
                userCard.appendChild(img)
                let userText = document.createElement('div')
                userText.classList.add('user-text')
                userText.classList.add('user-text')
                let h4 = document.createElement('h4')
                h4.innerText = data.username
                userText.appendChild(h4)
                let p = document.createElement('p')
                p.innerText = data.textarea
                userText.appendChild(p)
                userCard.appendChild(userText)
                let containerBtn = document.createElement('div')
                containerBtn.classList.add('container-btn')
                userCard.appendChild(containerBtn)
                let btn = document.createElement('button')
                btn.innerText = 'Delete'
                btn.classList.add('delete-btn')
                containerBtn.appendChild(btn)
                btn.addEventListener('click', function () {
                    fetch(`https://68219a00259dad2655afc151.mockapi.io/Post/${data.id}`, {
                        method: 'DELETE',
                    })
                    userCard.remove()
                })
                userPosts.appendChild(userCard)
            })
        })
})