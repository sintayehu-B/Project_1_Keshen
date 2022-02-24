// Selectors

const signInEmail = document.querySelector('#signInEmail')
const signInPassword = document.querySelector('#signInPassword')

const signInButton = document.querySelector('#signInButton')

const log = console.log

var db = new Dexie("Users");
db.version(1).stores({
    Users: 'Email, fullName, Password'
})

signInButton.addEventListener('click', signIn)

function signIn(e) {
    e.preventDefault()
    if (signInEmail.value == 'admin' && signInPassword.value == 'admin') {
        window.location.href = 'admin.html'
    } else {
        db.Users.where('Email').equals(signInEmail.value).toArray((result) => {
            // log(result)

            if (result.length == 0) {

                signInEmail.style.transition = 'all .6s ease-in-out'
                signInPassword.style.transition = 'all .6s ease-in-out'
                signInEmail.style.borderBottom = '1px solid red'
                signInPassword.style.borderBottom = '1px solid red'
                setTimeout(() => {
                    signInEmail.style.borderBottom = '1px solid black'
                    signInPassword.style.borderBottom = '1px solid black'
                }, 3000)
                // alert('Email doesn\'t exist.')
                log('Sign In Failed')

            } else {

                for (x of result) {
                    // log(x)
                    if (signInPassword.value == x.Password) {
                        log('Sign In Successful')
                        window.location.href = 'main.html'
                    } else {
                        signInPassword.style.transition = 'all .6s ease-in-out'
                        signInPassword.style.borderBottom = '1px solid red'
                        setTimeout(() => {
                            signInPassword.style.borderBottom = '1px solid black'
                        }, 3000)
                        // alert('Incorrect Password')
                        log('Incorrect Password')
                    }
                }

            }

        }).catch((err) => {
            log(err.message)
        })

    }
}