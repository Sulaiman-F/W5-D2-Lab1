
let username = document.getElementById('username')
let textarea = document.getElementById('textarea')
let img = document.getElementById('img')
let userPosts = document.getElementById('user-posts')
function submitForm() {
    if (username.value.length <= 4) {
        alert('The username should be longer than 4 characters')
        return
    } else if (textarea.value.length <= 6) {
        alert('The textarea should be longer than 6 characters')
        return
    } else if (!img.value.length) {
        alert('The image should be a valid URL')
        return
    } else if (uniqueUser(username.value) == true) {
        alert('The username already exists')
        return
    }
    else {
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
        return
    }
}
function uniqueUser(unUsername) {
    fetch('https://68219a00259dad2655afc151.mockapi.io/Post')
        .then((response) => response.json())
        .then((data) => {
            data.forEach((data) => {
                if (unUsername === data.username) {
                    console.log('The username already exists');
                    return true
                } else {
                    return false
                }
            })
        })
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