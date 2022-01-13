const express = require('express')
const bcrypt = require('bcryptjs')
const cors = require('cors')
const app = express()
const PORT = 3001 // Puerto en el que corre.

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', function(req, res) {
  res.send('Hello').status(200).end()
})

/**
 * Esta seria la "base de datos" con los usuarios registrados.
 */
const usersRegistered = [
  {
    id: 1,
    email: "test@test.com",
    password: '$2a$10$AmcRlZOG.bbq06e6uVQqHOhx52.j.I0xI7sOg7OpJHTpm3br4AYaW' // qweQWE123!@#
  },
]

const regex = {
  symbol: /[!-/:-@[`{-~]/g, // símbolo
  lowerCase: /[a-z]/g, // minúscula
  upperCase: /[A-Z]/g, // mayúscula
  number: /[0-9]/g, // número
}


app.post('/login', async function(req, res) {
  const response = { statusCode: 200, message: "Ok" }
  const { email, password } = req.body

  for (let i = 0; i < usersRegistered.length; i++) {
    /**
     * Si no encuentra el email ingresado en la "base de datos" lanza error.
     */
    if (email != usersRegistered[i].email) {
      response.statusCode = 404
      response.message = "EMAIL_NOT_FOUND"
      continue
    }

    /**
     * bcrypt compara la contraseña ingresada con la guardada en la "base de datos".
     * Si no coinciden lanza error.
     */
    let isPassMatch = await bcrypt.compare(password, usersRegistered[i].password)
    if (!isPassMatch) {
      response.statusCode = 401
      response.message = "PASSWORD_WRONG"
      continue
    }

    break
  }

  res.status(response.statusCode).send(response).end()
})


app.post('/register', async function(req, res) {
  const response = { statusCode: 201, message: "Created" }
  const { email, password, passwordConfirmation } = req.body
  let isEmailUsed = false

  for (let i = 0; i < usersRegistered.length; i++) {
    if (email === usersRegistered[i].email) {
      isEmailUsed = true
      break
    }
  }

  /**
   * Si el email ya esta siendo usado lanza error.
   */
  if (isEmailUsed) {
    response.statusCode = 422
    response.message = "EMAIL_ALREADY_USED"
    return res.status(response.statusCode).send(response).end()
  }

  /**
   * Si las dos contraseñas no coinciden da error.
   */
  if (password != passwordConfirmation) {
    response.statusCode = 422
    response.message = "PASSWORDS_NOT_MATCH"
    return res.status(response.statusCode).send(response).end()
  }

  /**
   * Si la contraseña es menor a 8 caracteres lanza error.
   */
  if (password.lenght < 8) {
    response.statusCode = 422
    response.message = "PASSWORDS_MIN_LENGHT:8"
    return res.status(response.statusCode).send(response).end()
  }

  /**
   * Si la contraseña es mayor a 16 caracteres lanza error.
   */
  if (password.lenght > 16) {
    response.statusCode = 422
    response.message = "PASSWORDS_MAX_LENGHT:16"
    return res.status(response.statusCode).send(response).end()
  }

  /**
   * Si la contraseña no contiene símbolo lanza error.
   */
  if (!password.match(regex.symbol)) {
    response.statusCode = 422
    response.message = "PASSWORDS_MISSING_SYMBOL"
    return res.status(response.statusCode).send(response).end()
  }

  /**
   * Si la contraseña no contiene minúscula lanza error.
   */
  if (!password.match(regex.lowerCase)) {
    response.statusCode = 422
    response.message = "PASSWORDS_MISSING_LOWER_CASE"
    return res.status(response.statusCode).send(response).end()
  }

  /**
   * Si la contraseña no contiene mayúscula lanza error.
   */
  if (!password.match(regex.upperCase)) {
    response.statusCode = 422
    response.message = "PASSWORDS_MISSING_UPPER_CASE"
    return res.status(response.statusCode).send(response).end()
  }

  /**
   * Si la contraseña no contiene número lanza error.
   */
  if (!password.match(regex.number)) {
    response.statusCode = 422
    response.message = "PASSWORDS_MISSING_NUMBER"
    return res.status(response.statusCode).send(response).end()
  }

  /**
   * Si todo fue bien aqui se lanza un "Created" con estado 200
   */
  return res.status(response.statusCode).send(response).end()
})


app.listen(PORT)
console.log(`Escuchando en el puerto: ${PORT}`)
