# Shopping List API

This repository contains the backend system for a web application that allows users to manage their shopping lists. The backend is implemented in Node.js using TypeScript and MongoDB as its primary data store.

## Prerequisites

Before running the application, make sure you have the following installed on your system:

- Node.js
- MongoDB
- npm (Node Package Manager)

## Installation

1. Clone the repository to your local machine:

git clone <repository_url>


2. Navigate to the project directory:

cd shopping-list-api


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

### POST /api/shoppingList/shareList

- Share a shopping list with another user.
- Request Body:

{
"listId": "string",
"sharedWith": "string",
"permission": "string"
}

- Returns: Shared shopping list details.

### GET /api/shoppingList/sharedLists/:userId

- Get all shopping lists shared with a specific user.
- Returns: Shared shopping lists.

### POST /api/user/login

- User login.

- Request Body:

{
"email": "string",
"password": "string"
}