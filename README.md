# Project: BackEndProyect

## End-point: Register
### Method: POST
>```
>http://localhost:8088/auth/register
>```
### Body (**raw**)

```json
{
    "gmail": "user@gmail.com",
    "password": "password",
    "age": 10,
    "username": "Test",
    "phoneNumber": 99999999,
    "image": "RandomImage"
}
```

### Response: 200
```json
{
    "msg": "User creado: ",
    "user": {
        "gmail": "user@gmail.com",
        "password": "$2b$10$37TA9iWrGVmZYv3aTm8cUuyZgeLbUPBBi27BDditPDN6ErFHw5wjy",
        "age": "10",
        "username": "Test",
        "phoneNumber": "99999999",
        "image": "RandomImage",
        "_id": "640a41bdb7c9c4215357c7e9",
        "__v": 0
    }
}
```
### Response: 400
```json
{
    "Error": "Datos ingresados no validos o nulos"
}
```
⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Login
### Method: POST
>```
>http://localhost:8088/auth/login
>```
### Body (**raw**)

```json
{
    "username": "Test",
    "password": "password"
}
```

### Response: 200
```json
{
    "msg": "login OK"
}
```
### Response: 400
```json
{
    "Error": "Datos ingresados no validos o nulos."
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: MainPage
### Method: GET
>```
>http://localhost:8088/
>```
### Response: 200
```json
{
    "data": {
        "_id": "63e120d20d103ec3ae453e13",
        "gmail": "mariano.paporello@gmail.com",
        "password": "$2b$10$q5V4uBSeeQvaIDXjZQPaGO22fldFBsP/qu82OWaaodq40a8rquYGa",
        "age": "32",
        "username": "perengano",
        "phoneNumber": "5491165551861",
        "image": "randomImage",
        "__v": 0
    },
    "productosDisponibles": [
        {
            "_id": "639879b18557f55e96e749d7",
            "title": "Mochila",
            "price": 800,
            "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPTV7LVsKrZowJoTIn5SadPs_qQ1YjtHykgYChLb1GZ4C8TpU94pQ13gQuwNZz6v399iA&usqp=CAU",
            "createdAt": "2022-12-13T13:10:09.386Z",
            "updatedAt": "2022-12-13T13:10:09.386Z",
            "__v": 0,
            "category": "school",
            "stock": 4
        },
        {
            "_id": "63ddae228da2e37041195d4a",
            "title": "Remera de Boca",
            "price": 2000,
            "thumbnail": "ImagenRandom",
            "category": "sport",
            "stock": 7
        },
        {
            "_id": "6407aa019d552a6e826fa998",
            "title": "bolsa de cemento",
            "price": 300,
            "thumbnail": "null",
            "stock": 200,
            "category": "albañileria",
            "createdAt": "2023-03-07T21:17:53.848Z",
            "updatedAt": "2023-03-07T21:17:53.848Z",
            "__v": 0
        }
    ]
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: AllProducts
### Method: GET
>```
>http://localhost:8088/products/
>```
### Response: 200
```json
{
    "productos": [
        {
            "_id": "639879b18557f55e96e749d7",
            "title": "Mochila",
            "price": 800,
            "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPTV7LVsKrZowJoTIn5SadPs_qQ1YjtHykgYChLb1GZ4C8TpU94pQ13gQuwNZz6v399iA&usqp=CAU",
            "createdAt": "2022-12-13T13:10:09.386Z",
            "updatedAt": "2022-12-13T13:10:09.386Z",
            "__v": 0,
            "category": "school",
            "stock": 4
        },
        {
            "_id": "63ddae228da2e37041195d4a",
            "title": "Remera de Boca",
            "price": 2000,
            "thumbnail": "ImagenRandom",
            "category": "sport",
            "stock": 7
        },
        {
            "_id": "6407aa019d552a6e826fa998",
            "title": "bolsa de cemento",
            "price": 300,
            "thumbnail": "null",
            "stock": 200,
            "category": "albañileria",
            "createdAt": "2023-03-07T21:17:53.848Z",
            "updatedAt": "2023-03-07T21:17:53.848Z",
            "__v": 0
        }
    ]
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: ProductToCart
### Method: POST
>```
>http://localhost:8088/products/639879b18557f55e96e749d7
>```
### Response: 200
```json
{
    "msg": "👍 👍 👍 👍 TODO BIENN "
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: CartOfUser
### Method: GET
>```
>http://localhost:8088/cart/
>```
### Response: 200
```json
{
    "productsInCart": [
        {
            "title": "Mochila",
            "price": 800,
            "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPTV7LVsKrZowJoTIn5SadPs_qQ1YjtHykgYChLb1GZ4C8TpU94pQ13gQuwNZz6v399iA&usqp=CAU",
            "amount": 1
        }
    ]
}
```
### Response: 200
```json
{
    "productsInCart": []
}
```
### Response: 400
```json
{
    "Error": "Not Logged"
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: SendEmailOfTheCart
### Method: POST
>```
>http://localhost:8088/cart/
>```
### Response: 200
```json
{
    "msg": "TODO PERFECTO EMAIL ENVIADO"
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Profile
### Method: GET
>```
>http://localhost:8088/profile/
>```
### Response: 200
```json
{
    "data": {
        "_id": "640a41bdb7c9c4215357c7e9",
        "gmail": "user@gmail.com",
        "password": "$2b$10$37TA9iWrGVmZYv3aTm8cUuyZgeLbUPBBi27BDditPDN6ErFHw5wjy",
        "age": "10",
        "username": "Test",
        "phoneNumber": "99999999",
        "image": "RandomImage",
        "__v": 0
    }
}
```
### Response: 400
```json
{
    "Error": "Not Logged"
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Logout
### Method: GET
>```
>http://localhost:8088/auth/logout
>```
### Response: 200
```json
{
    "logoutFromThisUser": "Test"
}
```
### Response: 400
```json
{
    "err": "No hay data del usuario"
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃
_________________________________________________
Powered By: [postman-to-markdown](https://github.com/bautistaj/postman-to-markdown/)
