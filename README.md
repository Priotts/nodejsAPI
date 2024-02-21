## Node js API


## Live Version

The live version of this API is hosted at `https://nodejsapi-07ba.onrender.com`. You can use this URL if you want to test it.

For example, to retrieve a list of users, you would send a GET request to `https://nodejsapi-07ba.onrender.com/api/user`.
## Project features
- The application is developed with node, express, mongoose
- User, product and order creation
- Editing users, products and orders
- Deleting users, products and order
- Search by date and product name
## Installation
- Clone the repository

```bash
    git clone https://github.com/Priotts/nodejsAPI.git
```

- Install dependencies 

```bash
    npm install
```


- Start the application
```bash
    npm start
```
The application should now be running at http://localhost:3000/api/

## Documentation

| Endpoint | Method | Description | Body Parameters |
| -------- | ------ | ----------- | --------------- |
| /user    | GET    | Retrieves a list of users. | - |
| /user    | POST   | Creates a new user. | `name:`string (required), `email:`string (required), `password:`string (required) |
| /user/:id | GET    | Retrieves a specific user by their unique ID. | - |
| /user/:id | PATCH  | Updates a specific user by their unique ID. | `email`: string (required) |
| /user/:id | DELETE | Deletes a specific user by their unique ID. | - |

| Endpoint | Method | Description | Body Parameters |
| -------- | ------ | ----------- | --------------- |
| /product    | GET    | Retrieves a list of products. | - |
| /product/:id | GET    | Retrieves a specific product by their unique ID. | - |
| /product    | POST   | Creates a new product. | `name`: string (required), `description`: string (optional) |
| /product/:id | PATCH  | Updates a specific product by their unique ID. | `name`: string (required), `description`: string (optional) |
| /product/:id | DELETE | Deletes a specific product by their unique ID. |- |

| Endpoint | Method | Description | Body Parameters |
| -------- | ------ | ----------- | --------------- |
| /order    | GET    | Retrieves a list of orders. | - |
| /order/:id | GET    | Retrieves a specific order by their unique ID. | - |
| /order    | POST   | Creates a new order. | `productId:`string (required), `userId:`string (required) |
| /order/:id | PATCH  | Updates a specific order by their unique ID. | `productId:`string (required), `userId:` string (required) |
| /order/:id | DELETE | Deletes a specific order by their unique ID. | - |
| /order/product/:name | GET | Retrieves orders by product name. | -|
| /order/date/:date | GET | Retrieves orders by date. | - |


## Database Configuration

This application uses MongoDB as its database. It connects to the database using the following environment variables:

- `DB_USERNAME`: Your MongoDB username.
- `DB_PASSWORD`: Your MongoDB password.

You need to set these environment variables in your own development environment to connect to your MongoDB instance. 

You can do this by creating a `.env` file in the root directory:

```bash
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

## Running Tests

To run tests, run the following command

```bash
  npx jest --watchAll```
