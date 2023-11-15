
### Sequence flow..
![sequence flow](https://www.websequencediagrams.com/cgi-bin/cdraw?lz=ClRpdGxlIGN1c3RvbWVyIHN1cHBvcnQgcmVxdWVzdCBzeXN0ZW0KCgphY3RvciBDACEHAAgIUwApBkFnZW50ABwIQWRtaW4KCgAjCCAtPnNpZ251cDooMSlSZWdpc3RlciBhcyB1c2VyCgoAFgYgLT5Mb2dpbjooMikgY3JlYXRlcyBSZWZyZXNoIGFuZCBhdXRoIHRva2VuCgoAfQkgLT4gVGlja2V0OigzKSBDADMFIGEgdAAPBSBmb3IgYQCBSggAgR4FLCBzdGF0ZSBpcyBvcGVuCiAKIAoAgTcNAEcLICg0KSBSZXNvbHZlIG9yIGNsb3MATg8Agi4IAEIGAIEEBiAtPgCCHQk6ICg1KSBnZW5lcmF0ZQA8BmQAgRcHcyByZXBvcnRzAIEiBXRoAIJ6CgogCiMgUmlnaHQgbGVmdCBvZgCBSgc6AEIJAEQGAIF1BgBBBgogCgCCcwYgLT4gY29tbWVudDogKDYpIGEAEQVjYW4gcHJvcGVyIGRlbGV0AIFOBXVwZ3JhZGUgACkIcwojABYIYQA9CACBNgkAYhFzCiAKAGoJAINlCTogKDcpIHJldHJpZXZlIGFsbACBVwYAgW4OYnkAg3kG&s=modern-blue)

# Customer Support request System
This repository hosts the backend code for the Customer Support Request System.
It provides RESTful APIs for user authentication, ticket management, comments .

## Technology Stack
The backend is crafted using Node.js, Express.js, and MongoDB as the database. It adheres to a modular structure with controllers, services, and models for each entity.

## API Documentation
Swagger powers the API documentation for the backend. To explore the documentation, fire up the server and navigate to:


```
http://localhost:8000/api-docs
```
Swagger offers a user-friendly interface for visualizing and interacting with the API, offering details about each endpoint, request bodies, response schemas, and more.

## Endpoints
Here are the primary endpoints provided by the backend API:

- **Authentication:**

POST /api/auth/signup: Register a new user.
POST /api/auth/login: Log in an existing user.
POST /api/auth/forgot-password: Request a password reset email.
POST /api/auth/reset-password: Reset the user's password.
- **Tickets:**

POST /api/tickets: Create a new ticket.
GET /api/tickets: Retrieve all tickets.
GET /api/tickets/:id: Retrieve a specific ticket.
GET /api/tickets/comment/:id: Retrieve comments for a specific ticket.
GET /api/tickets/closed: Retrieve tickets closed within a date range.
PATCH /api/tickets/:id: Update a ticket.
DELETE /api/tickets/:id: Delete a ticket.
- **Comments:**

POST /api/comments: Add a new comment to a ticket.
GET /api/comments: Retrieve all comments.
GET /api/comments/:id: Retrieve a specific comment.
PATCH /api/comments/:id: Update a comment.
DELETE /api/comments/:id: Delete a comment.

Setup Guide
To run the backend, follow these steps:

1. Clone this repository to your local machine.

2. Install dependencies:
```
npm install
```
3. Configure the MongoDB connection string in the .env file.

4. Build the TypeScript code:
```
npm run build
```
5. Start the server:
```
npm start
```
6. Access the API documentation at http://localhost:8000/api-docs.
## Commands/Scripts
- Start the server:
```
npm start
```
- Run the development server (with nodemon):
```
npm run dev
```
- Build the project
```
npm run build
```
- Run tests
```
npm test
```