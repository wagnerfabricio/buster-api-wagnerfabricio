# Readme

# Buster API

---

Buster api is a small API for a DVD store based on NodeJS.

<td valign="top" width="33%">

## Techs:

<div align="center">  
<img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/javascript-original.svg" alt="JavaScript" height="50" />  
<img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/typescript-original.svg" alt="TypeScript" height="50" />  
<img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/nodejs-original-wordmark.svg" alt="Node.js" height="50" />  
<img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/express-original-wordmark.svg" alt="Express.js" height="50" />  
<img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/postgresql-original-wordmark.svg" alt="PostgreSQL" height="50" />  
<img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/docker-original-wordmark.svg" alt="Docker" height="50" />  
</div>

</td>

<!-- <div align="center">
<div style="display: flex">
<img src="./readme/javascript.png" alt="JavaScript Logo" />
<img src="./readme/typescript.png" alt="TypeScript Logo" />
<img src="./readme/nodejs.png" alt="NodeJS Logo" />
<img src="./readme/postgresql.png" alt="Postgre SQL Logo" />
<img src="./readme/express.png" alt="Express Logo" />
</div>
</div> -->

---

## Database tables:

![Untitled](readme/Untitled%205.png)

---

## Endpoints:

### Signup:

- **POST /api/users/register:**
  Create a new user.
  In order to create a new user class admin, its necessary send a admin Athentication token on header. For regular users, it's not necessary.
  body:

  ```bash
  {
      "email": "eduardo@mail.com.br",
      "name": "Eduardo",
      "password": "1234"
  }
  ```

  Reponse:

  - Status 201 - CREATED

    ```tsx
    {
        "isAdm": false,
        "name": "Eduardo",
        "email": "eduardo@mail.com.br",
        "id": "6e314059-0259-46a9-a6b0-318e8f0392ec"
    }
    ```

  - Error responses examples:

    - **Status 400 BAD REQUEST**

      In case of missing same required information

      ```tsx
      {
          "error": [
              "email is a required field",
              "password is a required field"
          ]
      }
      ```

    - **Status 409 CONFLICT**

      if user is already registered.

      ```tsx
      {
          "error": "Key (email)=(eduardo@mail.com.br) already exists."
      }
      ```

    - **Status 401 UNAUTHORIZED**

      Creating a new user class admin with regular user Authentication token.

      body:

      ```tsx
      {
          "email": "eduardo@mail.com.br",
          "name": "Eduardo",
          "password": "1234",
          "isAdm": true
      }
      ```

      Response:

      ```tsx
      {
          "error": "missing admin permision"
      }
      ```

    - Status 201 CREATED

      With admin access Token:

      body:

      ```tsx
      {
          "email": "lucira@mail.com.br",
          "name": "Lucira",
          "password": "1234",
          "isAdm": true
      }
      ```

      Response:

      ```tsx
      {
          "isAdm": true,
          "id": "0c275733-7bc6-4119-9d26-79467b3206a7",
          "email": "lucira@mail.com.br",
          "name": "Lucira"
      }
      ```

    - Status 401 UNAUTHORIZED
      Creating new user class Admin without Access Token:
      body:
      ```tsx
      {
          "email": "lucira@mail.com.br",
          "name": "Lucira",
          "password": "1234",
          "isAdm": true
      }
      ```
      Response:
      ```tsx
      {
          "error": "missing authorization token"
      }
      ```

- **POST /api/users/login:**
  Login route.
  body:
  ```tsx
  {
      "email": "jhon@doe.com",
      "password": "strongPassword!"
  }
  ```
  Response:
  Status 200 OK
  ```tsx
  {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6Ikp..."
  }
  ```
  - Error response examples:
    - Status 401 UNAUTHORIZED
      Response:
      ```bash
      {
      		"message": "Invalid credentials."
      }
      ```
    - **Status 400 BAD REQUEST**
      Missing required fields:
      body:
      ```tsx
      {
          "email": "kenzie@mail.com"
      }
      ```
      Response:
      ```tsx
      {
          "error": [
              "password is a required field"
          ]
      }
      ```
- **POST /api/dvds/register**
  Register new dvds, only users class admin are abble to add new dvds.
  Necessary send Admin authentication token on Header
  body:
  With authentication token:
  ```tsx
  {
      "dvds": [
          {
              "name": "duro de matar",
              "duration": "2h12min",
              "quantity": 30,
              "price": 10.99
          },
          ...
      ]
  }
  ```
  Response:
  ```tsx
  {
      "dvds": [
      {
          "duration": "2h12min",
          "name": "duro de matar",
          "stock": {
              "price": 10.99,
              "quantity": 30,
              "id": "abbc73a5-3249-44ed-9c90-e6f22033a09a"
          },
          "id": "7e9615fb-c5ef-4d16-94ac-5fbac1211814"
      },
      ...
  }
  ```
  - Error response examples:
    - Status 401 UNAUTHORIZED
      Without authentication token:
      body:
      ```tsx
      {
          "dvds": [
              {
                  "name": "duro de matar",
                  "duration": "2h12min",
                  "quantity": 30,
                  "price": 10.99
              },
              ...
          ]
      }
      ```
      Response:
      ```tsx
      {
          "error": "missing authorization token"
      }
      ```
      With a invalid Token:
      Body:
      ```tsx
      {
          "dvds": [
              {
                  "name": "duro de matar",
                  "duration": "2h12min",
                  "quantity": 30,
                  "price": 10.99
              },
              ...
          ]
      }
      ```
      Response:
      ```tsx
      {
          "error": {
              "name": "JsonWebTokenError",
              "message": "jwt malformed"
          }
      }
      ```
      With a not class admin user token:
      Body:
      ```tsx
      {
          "dvds": [
              {
                  "name": "duro de matar",
                  "duration": "2h12min",
                  "quantity": 30,
                  "price": 10.99
              },
              ...
          ]
      }
      ```
      Response:
      ```tsx
      {
          "error": "missing admin permission"
      }
      ```
- **GET /api/dvds**
  Return all dvds on database.
  Body:
  ```tsx
  //sem body
  ```
  Response:
  Status 200 OK
  ```tsx
  [
      {
          "id": "12015d05-8b2c-4f6b-917b-06f4e7e70637",
          "name": "duro de matar",
          "duration": "2h12min",
          "stock": {
              "id": "d0474b14-6f35-43ee-8f6b-e44edb7af5dc",
              "quantity": 30,
              "price": 10.99
          }
      },
      ...
  ]
  ```
- **POST /api/dvds/buy/:dvdId**
  Buy a dvd by id
  Necessery user authentication token on headers
  Necessary param: /dvdId
  Necessary "quantity" in the body of the requisition.
  Body:
  ```tsx
  {
      "quantity": 4
  }
  ```
  Response:
  **Status 201 CREATED**
  ```tsx
  {
      "id": "e9e45b5e-b6e8-4852-91e5-b4738b3cd01f",
      "total": 43.96,
      "paid": false,
      "newUser": {
          "id": "9a9106f4-221d-4043-9d06-dd8cddb9de95",
          "name": "Eduardo",
          "email": "eduardo@mail.com.br",
          "isAdm": false
      },
      "dvd": {
          "id": "efe6a881-e855-4b7c-a7ba-b0f284e4aa88",
          "name": "duro de matar 2",
          "duration": "2h4min",
          "stock": {
              "id": "f30a184c-eaa0-4553-9f73-9df9233116e6",
              "quantity": 30,
              "price": 10.99
          }
      }
  }
  ```
  - Error response examples:
    - Status 401 UNAUTHORIZED
      - Missing authentication token:
        Body:
        ```tsx
        {
            "quantity": 4
        }
        ```
        Response:
        ```tsx
        {
            "error": "missing authorization token"
        }
        ```
      - Invalid authentication token:
        Body:
        ```tsx
        {
            "quantity": 4
        }
        ```
        Response:
        ```tsx
        {
            "error": {
                "name": "JsonWebTokenError",
                "message": "jwt malformed"
            }
        }
        ```
    - Status 404 NOT FOUND
      Invalid dvd id in parameters.
      Body:
      ```tsx
      {
          "quantity": 4
      }
      ```
      Response:
      ```tsx
      {
          "error": "dvd not found"
      }
      ```
    - Status 422 UNPROCESSABLE ENTITY
      Buyind a dvd quantity higher then current stock quantity.
      Body:
      ```tsx
      {
          "quantity": 400
      }
      ```
      Response:
      ```tsx
      {
          "error": "current stock: 22, received demand 400"
      }
      ```
- **PUT /api/carts/pay**
  Pay acctual user cart, transform into a order.
  Body:
  ```tsx
  //sem body
  ```
  Response:
  Status 200 OK
  ```tsx
  {
      "cart": [
          {
              "id": "b585c045-3082-4cdc-bc62-39368bbff4a3",
              "paid": true,
              "total": 43.96,
              "dvd": {
                  "id": "a63c1eb7-5201-49fa-a7cf-55d13e7f2a64",
                  "name": "duro de matar 2",
                  "duration": "2h4min"
              }
          }
      ]
  }
  ```
  - Error responses examples:
    - Status 401 UNAUTHORIZED
      - Missing user token authentication on Authentication Header
        Body:
        ```tsx
        //sem body
        ```
        Response:
        ```tsx
        {
            "error": "missing authorization token"
        }
        ```
      - Invalid JWT Token:
        Body:
        ```tsx
        //sem body
        ```
        Response:
        ```tsx
        {
            "error": {
                "name": "JsonWebTokenError",
                "message": "jwt malformed"
            }
        }
        ```
