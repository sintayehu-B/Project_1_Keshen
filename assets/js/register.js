// Selectors
const fullName = document.querySelector('#fullName')
const registerEmail = document.querySelector('#registerEmail')
const registerPassword = document.querySelector('#registerPassword')

const log = console.log

var db = new Dexie("Users");
db.version(1).stores({
    Users: 'Email, fullName, Password'
})

registerButton.addEventListener('click', register)

function register(e) {
    e.preventDefault()

    let user = {
        fullName: fullName.value,
        Email: registerEmail.value,
        Password: registerPassword.value
    }

    db.Users.add(user)
        .then(() => {
            log('New User Added')
            window.location.href = 'main.html'
        })
        .catch((err) => {
            log(err.message)
            alert('User already exists')
        })

}