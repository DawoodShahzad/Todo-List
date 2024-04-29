# Todo-List APIS

This is a simple Todo List application with user authentication and profile management functionalities.

## Prerequisites

Before running the application, make sure you have the following installed on your system:

- Node.js
- MongoDB
- npm (Node Package Manager)
- Cloudinary Account (for profile picture storage)

## Installation

1. Clone the repository to your local machine:
git clone https://github.com/DawoodShahzad/Todo-List.git

2. Navigate to the project directory:
cd Todo-List

3. Install dependencies:
npm install

## Configuration

1. Create a `.env` file in the root directory of the project.
2. Add the following environment variables to the `.env` file:

PORT=3000
MONGO_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_secret_key>

3. Please note that their is also already a .env file in the project, so you can also use that

## Running the Application

To start the server, run the following command:

npm start

The server will start running on port 3000 by default.

## Testing

To run unit tests, use the following command:

npm test


## API Documentation

### Base URL

http://localhost:3000/api

## Authentication

### Login

URL: /login
Method: POST
Request Body:
email: User's email address
password: User's password
Response: JWT token

### Signup

URL: /signup
Method: POST
Request Body:
first_name: User's name
email: User's email address
password: User's password
age: User's age
profile_photo: User's profile picture (multipart/form-data)
Response: User details with JWT token

## User Profile

### Update Profile

URL: /profile
Method: PUT
Authentication: Required (JWT token)
Request Body: Updated user details
Response: Updated user details

## Todo List

### Create Todo List

URL: /
Method: POST
Authentication: Required (JWT token)
Request Body: Todo list details
Response: Created todo list details

### Get Todo List by ID

URL: /:id
Method: GET
Authentication: Required (JWT token)
Response: Todo list details

### Update Todo List
URL: /:id
Method: PUT
Authentication: Required (JWT token)
Request Body: Updated todo list details
Response: Updated todo list details

### Delete Todo List
URL: /:id
Method: DELETE
Authentication: Required (JWT token)
Response: Success message

### Add Item to Todo List
URL: /:id/items
Method: POST
Authentication: Required (JWT token)
Request Body: Todo item details
Response: Updated todo list details

### Delete Item from Todo List
URL: /:id/items/:itemId
Method: DELETE
Authentication: Required (JWT token)
Response: Updated todo list details

## Technologies Used
Node.js
Express.js
MongoDB
Mongoose
JWT
Bcrypt
Cloudinary