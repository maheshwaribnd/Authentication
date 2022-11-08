const encryptionRule = {
    'A': 'N', 'B': 'O', 'C': 'P', 'D': 'Q',
    'E': 'R', 'F': 'S', 'G': 'T', 'H': 'U',
    'I': 'V', 'J': 'W', 'K': 'X', 'L': 'Y',
    'M': 'Z', 'N': 'A', 'O': 'B', 'P': 'C',
    'Q': 'D', 'R': 'E', 'S': 'F', 'T': 'G',
    'U': 'H', 'V': 'I', 'W': 'J', 'X': 'K',
    'Y': 'L', 'Z': 'M',
    'a': 'n', 'b': 'o', 'c': 'p', 'd': 'q',
    'e': 'r', 'f': 's', 'g': 't', 'h': 'u',
    'i': 'v', 'j': 'w', 'k': 'x', 'l': 'y',
    'm': 'z', 'n': 'a', 'o': 'b', 'p': 'c',
    'q': 'd', 'r': 'e', 's': 'f', 't': 'g',
    'u': 'h', 'v': 'i', 'w': 'j', 'x': 'k',
    'y': 'l', 'z': 'm',
    '0': '5', '1': '6', '2': '7', '3': '8',
    '4': '9', '5': '0', '6': '1', '7': '2',
    '8': '3', '9': '4',
    '!': '#', '$': '%', '&': '+', '-': '@',
    '_': '~', '#': '!', '%': '$', '+': '&',
    '@': '-', '~': '_'
}

const encrypt = (inputString) => {
    let encryptedString = ' '
    for (let char of inputString) {
        encryptedString = encryptedString + encryptionRule[char]
    }
    return encryptedString
}

const decrypt = (encryptedString) => {
    let decryptedString = ''

    let keys = Object.keys(encryptionRule)
    let values = Object.values(encryptionRule)
    for (let char of encryptedString) {
        let requiredIndex = values.indexOf(char)
        decryptedString = decryptedString + keys[requiredIndex]
    }
    return decryptedString
}

let gobalSubmit = false
const USER_DB = []
let changeNavLinks

let signUp = (isSubmit = false) => {
    let firstName = document.getElementById('firstName').value
    let lastName = document.getElementById('lastName').value
    let email = document.getElementById('email').value
    let phoneNumber = document.getElementById('number').value
    let password = document.getElementById('password').value
    let encryptPassword = encrypt(password)

    let confirmPassword = document.getElementById('confirmPassword').value
    let encryptedConfirmPassword = encrypt(confirmPassword)
    let tnC = document.getElementById('t-and-c').checked
    let error = false

    let userDetails = {
        firstName,
        lastName,
        email,
        phoneNumber,
        password: encryptPassword,
        confirmPassword: encryptedConfirmPassword
    }
    // USER_DB.push(userDetails)

    console.log(USER_DB)

    if (isSubmit) {
        gobalSubmit = true
    }

    if (gobalSubmit) {
        if (firstName.length >= 3) {
            document.getElementById('firstname-valid').style.display = 'block'
            document.getElementById('firstname-invalid').style.display = 'none'
        }
        else {
            document.getElementById('firstname-valid').style.display = 'none'
            document.getElementById('firstname-invalid').style.display = 'block'
            error = true
        }

        if (lastName.length >= 3) {
            document.getElementById('lastname-valid').style.display = 'block'
            document.getElementById('lastname-invalid').style.display = 'none'
        }
        else {
            document.getElementById('lastname-valid').style.display = 'none'
            document.getElementById('lastname-invalid').style.display = 'block'
            error = true
        }

        if (email != ' ' &&
            email.includes('@') &&
            email.includes('.') &&
            email.indexOf('@') != 0 &&
            (email.length - email.lastIndexOf('.') >= 3)) {
            document.getElementById('email-valid').style.display = 'block'
            document.getElementById('email-invalid').style.display = 'none'
        }
        else {
            document.getElementById('email-valid').style.display = 'none'
            document.getElementById('email-invalid').style.display = 'block'
            error = true
        }

        if (phoneNumber.length == 10 && !isNaN(phoneNumber)) {
            document.getElementById('number-valid').style.display = 'block'
            document.getElementById('number-invalid').style.display = 'none'
        }
        else {
            document.getElementById('number-valid').style.display = 'none'
            document.getElementById('number-invalid').style.display = 'block'
            error = true;
        }

        if (password.length >= 6) {
            document.getElementById('password-invalid').style.display = 'none'
        }
        else {
            document.getElementById('password-invalid').innerText = 'password length should be 6 characters'
            document.getElementById('password-invalid').style.display = 'block'
            error = true;
        }
        if (password == confirmPassword) {
            document.getElementById('confirmPassword-invalid').style.display = 'none'
        }
        else {
            document.getElementById('confirmPassword-invalid').style.display = 'block'
            error = true;
        }

        if (tnC) {
            document.getElementById('t-and-c-invalid').style.display = 'none'
        } else {
            document.getElementById('t-and-c-invalid').style.display = 'block'
            error = true
        }
    }
    if (isSubmit && !error) {
        USER_DB.push(userDetails)
        alert('Sign Up Successfully!')
        document.getElementById('sign-up-form').reset()
        document.getElementById('sign-Up').style.display = 'none'
        document.getElementById('sign-In').style.display = 'block'
    }
}
let signIn = () => {
    let enteredEmail = document.getElementById('login-email').value
    let enteredPassword = document.getElementById('login-password').value

    console.log(USER_DB)
    if (enteredEmail != ' ' &&
        enteredEmail.includes('@') &&
        enteredEmail.includes('.') &&
        enteredEmail.indexOf('@') != 0 &&
        (enteredEmail.length - enteredEmail.lastIndexOf('.') >= 3)) {
        document.getElementById('enteredEmail-invalid').style.display = 'none'
    }
    else {
        document.getElementById('enteredEmail-invalid').style.display = 'block'
        error = true
    }

    let requiredUser = USER_DB.find(user => user.email === enteredEmail &&  (user.password) === encrypt(enteredPassword));
    // 'find method' - if element found return element, else return undefine

    if (requiredUser) {
        alert('Access Granted !')
        changeNavLinks(requiredUser)
    }
    else {
        alert('Access Denied !')
    }
    document.getElementById('sign-in-form').reset()

}

let goToHome = () => {
    document.getElementById('home').style.display = 'block'
    document.getElementById('sign-Up').style.display = 'none'
    document.getElementById('sign-In').style.display = 'none'
}
let goToSignup = () => {
    document.getElementById('sign-Up').style.display = 'block'
    document.getElementById('home').style.display = 'none'
    document.getElementById('sign-In').style.display = 'none'
}
let goToSignin = () => {
    document.getElementById('sign-In').style.display = 'block'
    document.getElementById('home').style.display = 'none'
    document.getElementById('sign-Up').style.display = 'none'
}
changeNavLinks = (currentUser) => {
    console.log(currentUser)
    let { firstName } = currentUser
    document.getElementById('sign-up-nav-link').style.display = 'none'
    document.getElementById('sign-in-nav-link').style.display = 'none'

    document.getElementById('profile-link').style.display = 'block'
    document.getElementById('sign-out-nav-link').style.display = 'block'

    document.getElementById('profile-link').innerText = `Hi, ${firstName}`
}
let goToSignOut = () => {
    document.getElementById('profile-link').innerText = ''

    document.getElementById('sign-up-nav-link').style.display = 'block'
    document.getElementById('sign-in-nav-link').style.display = 'block'
    document.getElementById('home').style.display = 'block'
    document.getElementById('sign-In').style.display = 'none'

    document.getElementById('profile-link').style.display = 'none'
    document.getElementById('sign-out-nav-link').style.display = 'none'
}