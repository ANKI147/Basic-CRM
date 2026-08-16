# Basic CRM API

A simple Customer Relationship Management (CRM) API built with Node.js, Express, and MongoDB.

## Tech Stack

- **Runtime:** Node.js v26+
- **Framework:** Express.js v5
- **Database:** MongoDB (Mongoose v9)
- **Development:** Nodemon

## Prerequisites

- Node.js (v26 or higher)
- MongoDB running locally on port 27017
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/ANKI147/Basic-CRM.git
cd crm
```

2. Install dependencies:
```bash
npm install
```

3. Ensure MongoDB is running:
```bash
brew services start mongodb-community
# or your preferred MongoDB startup method
```

4. Start the server:
```bash
npm start
```

The server runs on `http://localhost:3000`

## API Endpoints

### Contacts

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/contact` | Get all contacts (with pagination) |
| POST | `/contact` | Create a new contact |
| GET | `/contact/:contactId` | Get a specific contact by ID |
| PUT | `/contact/:contactId` | Update a contact |
| PATCH | `/contact/:contactId` | Partially update a contact |
| DELETE | `/contact/:contactId` | Delete a contact |

### Query Parameters

**For GET /contact:**
- `page` - Page number (default: 1)
- `limit` - Results per page (default: 20, max: 100)

### Request Body Example (POST/PUT)

```json
{
  "firstname": "John",
  "lastname": "Doe",
  "email": "john@example.com",
  "phone": 1234567890,
  "company": "Tech Corp"
}
```

### Required Fields

- `firstname` (string) - Contact's first name
- `email` (string) - Contact's email address

### Optional Fields

- `lastname` (string) - Contact's last name
- `phone` (number) - Contact's phone number
- `company` (string) - Contact's company name

## Project Structure

```
crm/
├── src/
│   ├── controllers/
│   │   └── crmcontrollers.js    # Route handlers
│   ├── modules/
│   │   └── crmModules.js        # Mongoose schemas
│   └── routes/
│       └── crmRoutes.js         # API route definitions
├── index.js                     # Application entry point
├── package.json
└── README.md
```

## Error Handling

- `400` - Bad request (validation errors, missing required fields)
- `404` - Contact not found
- `500` - Internal server error

## Author

Ankit More
