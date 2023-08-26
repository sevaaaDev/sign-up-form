const form = document.querySelector('form')
const firstName = document.getElementById('firstName')
const email = document.getElementById('email')
const password = document.getElementById('password')
const confirmPw = document.getElementById('confirmPw')
const firstNameError = document.querySelector('#firstName + .error')
const emailError = document.querySelector('#email + .error')
const passwordError = document.querySelector('#password + .error')
const confirmPwError = document.querySelector('#confirmPw + .error')

let removeError = {
  password: () => {
    passwordError.innerText = ``
    password.classList.remove('error')
  },
  confirmPw: () => {
    confirmPwError.innerText = ``
    confirmPw.classList.remove('error')
  },
  email: () => {
    emailError.innerText = ``
    email.classList.remove('error')
  },
  firstName: () => {
    firstNameError.innerText = ``
    firstName.classList.remove('error')
  },
}

let error = {
  password: (errorType) => {
    passwordError.innerText = `* Password ${errorType}`
    password.classList.add('error')
  },
  confirmPw: (errorType) => {
    confirmPwError.innerText = `* password ${errorType}`
    confirmPw.classList.add('error')
  },
  email: (errorType) => {
    emailError.innerText = `* Email ${errorType}`
    email.classList.add('error')
  },
  firstName: (errorType) => {
    firstNameError.innerText = `* First Name ${errorType}`
    firstName.classList.add('error')
  }
}

firstName.addEventListener('input', () => {
  if (firstName.validity.valid) {
    removeError[firstName.id]()
  } else {
    showError(firstName)
  }
})

email.addEventListener('input', () => {
  if (email.validity.valid) {
    removeError[email.id]()
  } else {
    showError(email)
  }
})

password.addEventListener('input', () => {
  if (password.validity.valid) {
    removeError[password.id]()
  } else if (isMatched(password.value, confirmPw.value)) {
    removeError[confirmPw.id]()
  } 
  
  if (!password.validity.valid && !isMatched(password.value, confirmPw.value)) {
    error['confirmPw']('do not match')
  } else if (!password.validity.valid) {
    showError(password)
  }

})

confirmPw.addEventListener('input', () => {
  if (isMatched(password.value, confirmPw.value)) {
    removeError[confirmPw.id]()
  } else {
    error['confirmPw']('do not match')
  }
})

form.addEventListener('submit', (e) => {
  if (isValid() === false) {
    showError(password, confirmPw, email, firstName)
    e.preventDefault()
  }
})

function isMatched(pw, confirmPw) {
  console.log({ pw })
  console.log({ confirmPw })
  if (pw !== confirmPw && confirmPw  !== '') {
    console.log('no match')
    valid = false
    return false
  } 
  return true
}

function showError(...element) {
  for (const input of element) {   
    if (input.validity.tooShort) {
      error[input.id]('must be 12 char or more')
      console.log('short')
    } else if (input.validity.valueMissing) {
      error[input.id]('is REQUIRED')
      console.log('required')
    } else if (input.validity.typeMismatch) {
      error[input.id]('should be in the right format')
    }
  }
}

function isValid() {
  if (password.validity.valid &&
      email.validity.valid &&
      firstName.validity.valid &&
      confirmPw.validity.valid) 
    {
      return true
    }
  return false
}

