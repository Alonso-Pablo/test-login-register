## Test Login & Register

> Este no es un caso real de backend, solo es para probar una aplicación de front-end con peticiones POST y recibir una respuesta lo mas real posible a lo que un backend real daría.

## Tecnologías:
- [cors](https://www.npmjs.com/package/cors)
- [nodemon](https://www.npmjs.com/package/nodemon)
- [express](https://www.npmjs.com/package/express)
- [bcrypt](https://www.npmjs.com/package/bcryptjs)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)

## Comandos:
- `npm i` : Instala todas las dependencias que se necesitan.
- `npm run start` : Inicia el servidor con node.
- `npm run start:dev` : Inicia el servidor con nodemon.

---
## Login:
### POST /login

#### Request:
```json
{
  "email": "test@test.com",
  "password": "qweQWE123!@#"
}
```
#### Response: 200
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImVtYWlsIjoidGVzc3RAdGVzdC5jb20iLCJpYXQiOjE2NDIwODM4NDZ9.5TIpA6HO2YkyFte4GCIpXpyd2LQJLSINp9NGg9Q4RrQ"
}
```
---

### POST /register

#### Request:
```json
{
  "email": "foo@bar.com",
  "password": "qweQWE123!@#",
  "password": "qweQWE123!@#"
}
```
#### Response: 201
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImVtYWlsIjoidGVzc3RAdGVzdC5jb20iLCJpYXQiOjE2NDIwODM4NDZ9.5TIpA6HO2YkyFte4GCIpXpyd2LQJLSINp9NGg9Q4CrW"
}
```
