# 🏨 GharStay

GharStay is a **resort and hospitality management backend API** built with **Node.js, Express, MongoDB, and Mongoose**.

The platform provides APIs for managing users, rooms, packages, menu items, blogs, events, galleries, contacts, FAQs, testimonials, reservations, dashboards, newsletters, website content, AI chatbot functionality, and media uploads.

---

# 🚀 Features

### 👤 User Management

* User management
* User profile management
* Authentication and authorization
* Password hashing
* JWT-based authentication
* Role-based access control
* Protected operations

### 🏨 Room Management

* Create rooms
* Get rooms
* Update rooms
* Delete rooms
* Room pricing
* Room details
* Room availability
* Room image management
* Cloudinary image uploads

### 📦 Package Management

* Create packages
* Get packages
* Update packages
* Delete packages
* Package pricing
* Package details
* Package image management
* Cloudinary integration

### 🍽️ Menu Management

* Create menu items
* Get menu items
* Update menu items
* Delete menu items
* Menu categorization
* Menu details
* Menu image management

### 📝 Blog Management

* Create blog posts
* Get blog posts
* Update blog posts
* Delete blog posts
* Blog content management
* Blog image management
* Slug-based content support

### 🎉 Event Management

* Create events
* Get events
* Update events
* Delete events
* Event scheduling
* Event details
* Event image management

### 🖼️ Gallery Management

* Upload gallery images
* Get gallery images
* Delete gallery images
* Cloudinary media storage
* Resort media management

### 📞 Contact Management

* Submit contact inquiries
* Manage contact messages
* Retrieve contact information
* Administrative contact management

### ❓ FAQ Management

* Create FAQs
* Get FAQs
* Update FAQs
* Delete FAQs
* FAQ content management

### ⭐ Testimonial Management

* Create testimonials
* Get testimonials
* Update testimonials
* Delete testimonials
* Customer testimonial management

### 📅 Reservation Management

* Create reservations
* Manage reservations
* Retrieve reservation details
* Reservation status management
* Administrative reservation management

### 📊 Dashboard

* Dashboard data
* Resort statistics
* Administrative overview
* Management information

### 📧 Newsletter

* Newsletter subscription
* Subscriber management
* Subscriber retrieval
* Email communication support

### 🌐 Website Content

* Dynamic website content management
* Resort information management
* Website configuration
* Content updates

### 🤖 AI Chatbot

GharStay includes an AI-powered chatbot integration using Google's Generative AI services.

The chatbot can be used to provide automated assistance and answer resort-related questions.

### ☁️ Media Upload

A dedicated upload API handles media uploads and integrates with Cloudinary for cloud-based image storage.

---

# 🛠️ Tech Stack

## Backend

* Node.js
* Express 5
* JavaScript
* ES Modules

## Database

* MongoDB
* Mongoose
* mongoose-paginate-v2

## Authentication

* JSON Web Token
* bcrypt
* bcryptjs

## File Uploads

* Multer
* Cloudinary

## Email

* Nodemailer

## AI

* Google Generative AI
* Google GenAI

## Validation & Utilities

* Validator
* Slugify
* dotenv
* CORS
* Morgan
* Cross-env

## Development

* Nodemon

---

# 🏗️ Architecture

GharStay follows a modular backend architecture:

```text
Client
   │
   ▼
Express Application
   │
   ├── Routers
   │
   ├── Controllers
   │
   ├── Models
   │
   ├── Validation
   │
   └── Utilities
   │
   ▼
MongoDB
   │
   └── Mongoose
```

External services:

```text
                 ┌── Cloudinary
                 │
Client → API ────┼── MongoDB
                 │
                 ├── SMTP / Nodemailer
                 │
                 └── Google Generative AI
```

---

# 📁 Project Structure

```text
GharStay/
│
├── Config/
│   ├── cloudinary.js
│   └── ...
│
├── Controller/
│   ├── userController.js
│   ├── roomController.js
│   ├── packageController.js
│   ├── menuController.js
│   ├── blogController.js
│   ├── eventController.js
│   ├── galleryController.js
│   ├── contactController.js
│   ├── faqController.js
│   ├── testimonialController.js
│   ├── reservationController.js
│   ├── dashboardController.js
│   ├── newsletterController.js
│   ├── websiteController.js
│   ├── chatbotController.js
│   └── ...
│
├── Model/
│   ├── userModel.js
│   ├── roomModel.js
│   ├── packageModel.js
│   ├── menuModel.js
│   ├── blogModel.js
│   ├── eventModel.js
│   ├── galleryModel.js
│   ├── contactModel.js
│   ├── faqModel.js
│   ├── testimonialModel.js
│   ├── reservationModel.js
│   └── ...
│
├── Router/
│   ├── userRouter.js
│   ├── roomRouter.js
│   ├── packageRouter.js
│   ├── menuRouter.js
│   ├── blogRouter.js
│   ├── eventRouter.js
│   ├── galleryRouter.js
│   ├── contactRouter.js
│   ├── faqRouter.js
│   ├── tesimonialRouter.js
│   ├── reservationRouter.js
│   ├── dashboardRouter.js
│   ├── newLetterRouter.js
│   ├── websiteRouter.js
│   ├── chatbotRouter.js
│   └── uploadRouter.js
│
├── Utils/
│   ├── apiFeatures.js
│   ├── appError.js
│   ├── catchAsync.js
│   ├── sendEmail.js
│   ├── sendResponse.js
│   ├── uploadToCloudinary.js
│   └── ...
│
├── Validation/
│   └── ...
│
├── app.js
├── server.js
├── package.json
├── package-lock.json
└── .env
```

---

# 🗄️ Database

GharStay uses **MongoDB** as its database and **Mongoose** as the ODM.

Mongoose is responsible for:

* Schema definitions
* Model management
* Validation
* Database queries
* Document relationships
* Pagination

Major application data includes:

```text
Users
Rooms
Packages
Menu Items
Blogs
Events
Gallery
Contacts
FAQs
Testimonials
Reservations
Newsletter Subscribers
Website Content
```

---

# 🔄 Application Flow

```text
Frontend
   │
   ▼
REST API
   │
   ▼
Express Router
   │
   ▼
Controller
   │
   ▼
Mongoose Model
   │
   ▼
MongoDB
```

For image operations:

```text
Frontend
   │
   ▼
Multer
   │
   ▼
Cloudinary
   │
   ▼
Image URL
   │
   ▼
MongoDB
```

---

# 🔐 Authentication Flow

```text
User
  │
  ▼
Register
  │
  ▼
Password Hashing
  │
  ▼
MongoDB
  │
  ▼
Login
  │
  ▼
JWT
  │
  ▼
Protected API
  │
  ▼
Authorization
```

---

# 📡 API Endpoints

All API endpoints use the `/api/v1` prefix.

## 👤 Users

| Method | Endpoint            | Description         |
| ------ | ------------------- | ------------------- |
| GET    | `/api/v1/users`     | Get users           |
| GET    | `/api/v1/users/:id` | Get a specific user |
| POST   | `/api/v1/users`     | Create a user       |
| PATCH  | `/api/v1/users/:id` | Update a user       |
| DELETE | `/api/v1/users/:id` | Delete a user       |

---

## 🏨 Rooms

| Method | Endpoint            | Description      |
| ------ | ------------------- | ---------------- |
| GET    | `/api/v1/rooms`     | Get all rooms    |
| GET    | `/api/v1/rooms/:id` | Get room details |
| POST   | `/api/v1/rooms`     | Create a room    |
| PATCH  | `/api/v1/rooms/:id` | Update a room    |
| DELETE | `/api/v1/rooms/:id` | Delete a room    |

---

## 📦 Packages

| Method | Endpoint               | Description         |
| ------ | ---------------------- | ------------------- |
| GET    | `/api/v1/packages`     | Get all packages    |
| GET    | `/api/v1/packages/:id` | Get package details |
| POST   | `/api/v1/packages`     | Create a package    |
| PATCH  | `/api/v1/packages/:id` | Update a package    |
| DELETE | `/api/v1/packages/:id` | Delete a package    |

---

## 🍽️ Menu Items

| Method | Endpoint                | Description           |
| ------ | ----------------------- | --------------------- |
| GET    | `/api/v1/menu-item`     | Get menu items        |
| GET    | `/api/v1/menu-item/:id` | Get menu item details |
| POST   | `/api/v1/menu-item`     | Create a menu item    |
| PATCH  | `/api/v1/menu-item/:id` | Update a menu item    |
| DELETE | `/api/v1/menu-item/:id` | Delete a menu item    |

---

## 📝 Blogs

| Method | Endpoint            | Description      |
| ------ | ------------------- | ---------------- |
| GET    | `/api/v1/blogs`     | Get all blogs    |
| GET    | `/api/v1/blogs/:id` | Get blog details |
| POST   | `/api/v1/blogs`     | Create a blog    |
| PATCH  | `/api/v1/blogs/:id` | Update a blog    |
| DELETE | `/api/v1/blogs/:id` | Delete a blog    |

---

## 🎉 Events

| Method | Endpoint             | Description       |
| ------ | -------------------- | ----------------- |
| GET    | `/api/v1/events`     | Get all events    |
| GET    | `/api/v1/events/:id` | Get event details |
| POST   | `/api/v1/events`     | Create an event   |
| PATCH  | `/api/v1/events/:id` | Update an event   |
| DELETE | `/api/v1/events/:id` | Delete an event   |

---

## 🖼️ Gallery

| Method | Endpoint              | Description          |
| ------ | --------------------- | -------------------- |
| GET    | `/api/v1/gallery`     | Get gallery images   |
| POST   | `/api/v1/gallery`     | Upload gallery image |
| DELETE | `/api/v1/gallery/:id` | Delete gallery image |

---

## 📞 Contacts

| Method | Endpoint               | Description              |
| ------ | ---------------------- | ------------------------ |
| GET    | `/api/v1/contacts`     | Get contact messages     |
| POST   | `/api/v1/contacts`     | Submit a contact message |
| GET    | `/api/v1/contacts/:id` | Get contact details      |
| PATCH  | `/api/v1/contacts/:id` | Update contact           |
| DELETE | `/api/v1/contacts/:id` | Delete contact           |

---

## ❓ FAQs

| Method | Endpoint           | Description     |
| ------ | ------------------ | --------------- |
| GET    | `/api/v1/faqs`     | Get FAQs        |
| GET    | `/api/v1/faqs/:id` | Get FAQ details |
| POST   | `/api/v1/faqs`     | Create FAQ      |
| PATCH  | `/api/v1/faqs/:id` | Update FAQ      |
| DELETE | `/api/v1/faqs/:id` | Delete FAQ      |

---

## ⭐ Testimonials

| Method | Endpoint                   | Description             |
| ------ | -------------------------- | ----------------------- |
| GET    | `/api/v1/testimonials`     | Get testimonials        |
| GET    | `/api/v1/testimonials/:id` | Get testimonial details |
| POST   | `/api/v1/testimonials`     | Create testimonial      |
| PATCH  | `/api/v1/testimonials/:id` | Update testimonial      |
| DELETE | `/api/v1/testimonials/:id` | Delete testimonial      |

---

## 📅 Reservations

| Method | Endpoint                  | Description             |
| ------ | ------------------------- | ----------------------- |
| GET    | `/api/v1/reservation`     | Get reservations        |
| GET    | `/api/v1/reservation/:id` | Get reservation details |
| POST   | `/api/v1/reservation`     | Create a reservation    |
| PATCH  | `/api/v1/reservation/:id` | Update reservation      |
| DELETE | `/api/v1/reservation/:id` | Delete reservation      |

---

## 📊 Dashboard

| Method | Endpoint             | Description               |
| ------ | -------------------- | ------------------------- |
| GET    | `/api/v1/dashboards` | Get dashboard information |

---

## 📧 Newsletter Subscribers

| Method | Endpoint                  | Description             |
| ------ | ------------------------- | ----------------------- |
| GET    | `/api/v1/subscribers`     | Get subscribers         |
| POST   | `/api/v1/subscribers`     | Subscribe to newsletter |
| DELETE | `/api/v1/subscribers/:id` | Remove subscriber       |

---

## 🌐 Website

| Method | Endpoint              | Description            |
| ------ | --------------------- | ---------------------- |
| GET    | `/api/v1/website`     | Get website content    |
| POST   | `/api/v1/website`     | Create website content |
| PATCH  | `/api/v1/website/:id` | Update website content |
| DELETE | `/api/v1/website/:id` | Delete website content |

---

## 🤖 AI Assistant

| Method | Endpoint           | Description                        |
| ------ | ------------------ | ---------------------------------- |
| POST   | `/api/v1/assitant` | Send a message to the AI assistant |

> The current API route is `/api/v1/assitant` as defined in the application. The spelling can be changed later to `/api/v1/assistant` if desired, but the README currently reflects the actual route.

---

## 📤 Upload

| Method | Endpoint         | Description  |
| ------ | ---------------- | ------------ |
| POST   | `/api/v1/upload` | Upload media |

---

## ❤️ Root Health Check

| Method | Endpoint | Description                               |
| ------ | -------- | ----------------------------------------- |
| GET    | `/`      | Check whether the GharStay API is running |

Example response:

```json
{
  "status": "success",
  "message": "GharStay API is live and running!"
}
```

---

# 🔎 Query Features

Resource list endpoints can support query operations such as:

```text
?page=1
&limit=10
&search=room
&sort=createdAt
```

Common operations include:

* Pagination
* Searching
* Filtering
* Sorting
* Extended query parsing

---

# ☁️ Cloudinary Integration

GharStay uses Cloudinary for cloud-based image storage.

The upload process is:

```text
Client
   ↓
Multipart Form Data
   ↓
Multer
   ↓
File Validation
   ↓
Cloudinary
   ↓
Secure Image URL
   ↓
MongoDB
```

Cloudinary can be used for:

* Room images
* Package images
* Menu images
* Blog images
* Event images
* Gallery images
* Website images
* Other uploaded media

---

# 📧 Email System

GharStay uses **Nodemailer** for email functionality.

The email system can support:

* Contact-related emails
* Newsletter communication
* Reservation notifications
* Administrative communication
* User notifications

SMTP credentials should be configured through environment variables.

---

# 🤖 AI Integration

GharStay integrates Google's Generative AI services to provide chatbot functionality.

```text
User
 ↓
Chatbot API
 ↓
Google Generative AI
 ↓
Generated Response
 ↓
User
```

The AI assistant can be integrated into the resort website to answer questions related to:

* Resort information
* Rooms
* Packages
* Services
* Facilities
* General guest questions

---

# 🛡️ Security

The application includes several security practices:

* JWT authentication
* Password hashing
* Protected routes
* Role-based authorization
* CORS configuration
* Environment variables
* Input validation
* File validation
* Centralized error handling

Sensitive credentials should never be committed to Git.

---

# ⚠️ Error Handling

GharStay uses centralized error handling to provide consistent API responses.

The application handles errors such as:

* Invalid requests
* Authentication failures
* Authorization failures
* Validation errors
* Resource-not-found errors
* Database errors
* Server errors

---

# 📝 Logging

Morgan is used for HTTP request logging during development.

```javascript
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
```

This helps with:

* API debugging
* Request monitoring
* Development troubleshooting

---

# 🌐 CORS

GharStay includes dynamic CORS configuration supporting local development and Vercel deployments.

Configured environments include:

```text
http://localhost:5173
```

and Vercel deployments.

Vercel preview and production URLs are supported through the `.vercel.app` domain pattern.

---

# 📋 Prerequisites

Before setting up GharStay, make sure the following are installed.

### Required Software

* **Node.js** — v20+ recommended
* **npm** — included with Node.js
* **MongoDB** — local MongoDB or MongoDB Atlas
* **Git** — for version control

### Required Services

Depending on the features being used:

* **MongoDB / MongoDB Atlas** — database
* **Cloudinary** — image storage
* **SMTP provider** — email delivery
* **Google AI API** — chatbot functionality

### Recommended Development Tools

* VS Code
* Postman
* Git
* MongoDB Compass

---

# ⚙️ Installation

## 1. Clone the repository

```bash
git clone <repository-url>
```

## 2. Navigate into the project

```bash
cd GharStay
```

## 3. Install dependencies

```bash
npm install
```

---

# 🔑 Environment Variables

GharStay loads environment variables from:

```text
Config/config.env
```

Create the configuration file and provide the required credentials.

Example:

```env
NODE_ENV=development
PORT=3000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=your_jwt_expiration

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

SMTP_HOST=your_smtp_host
SMTP_PORT=587
SMTP_USER=your_smtp_username
SMTP_PASSWORD=your_smtp_password

GOOGLE_API_KEY=your_google_ai_api_key
```

> Use the exact environment variable names expected by your current configuration files.

**Never commit real credentials to GitHub.**

---

# ▶️ Running the Application

### Development

```bash
npm start
```

The application uses Nodemon for automatic server restarting during development.

### Production

```bash
npm run start:prod
```

The production script sets:

```text
NODE_ENV=production
```

---

# 🧪 API Testing

The API can be tested using:

* Postman
* Insomnia
* Thunder Client
* Frontend applications

Recommended testing areas:

* Users
* Rooms
* Packages
* Menu items
* Blogs
* Events
* Gallery
* Contacts
* FAQs
* Testimonials
* Reservations
* Dashboard
* Newsletter
* Website
* AI assistant
* File uploads

---

# 📊 API Response Structure

The application uses reusable response utilities to maintain consistent API responses.

A successful response may follow a structure similar to:

```json
{
  "status": "success",
  "data": {}
}
```

Error responses are handled centrally by the global error handler.

---

# 🔒 Production Security Checklist

Before deploying GharStay:

* Use strong JWT secrets
* Never commit `Config/config.env`
* Secure MongoDB credentials
* Configure production CORS
* Use HTTPS
* Secure Cloudinary credentials
* Secure SMTP credentials
* Secure Google AI credentials
* Validate uploaded files
* Apply authentication to administrative operations
* Use appropriate production logging
* Restrict database access

---

# 📈 Future Improvements

Potential future enhancements include:

* Online payment integration
* Advanced room availability calendar
* Automated reservation confirmation
* Customer reviews and ratings
* Advanced admin dashboard
* Redis caching
* Background job processing
* API documentation with Swagger/OpenAPI
* Automated integration testing
* Docker support
* CI/CD pipeline
* Production monitoring
* Advanced AI resort assistant
* Booking analytics
* Automated email notifications

---

# 🎯 Project Goals

GharStay was built as a backend foundation for a modern resort and hospitality platform.

The project demonstrates:

* REST API development
* Express.js architecture
* MongoDB database design
* Mongoose ODM
* Authentication and authorization
* Cloudinary integration
* File upload handling
* Email integration
* AI integration
* Pagination
* Searching
* Filtering
* Sorting
* Input validation
* Error handling
* CORS configuration
* Modular backend architecture

---

# 👨‍💻 Author

**Anishhh7**

GitHub:

```text
https://github.com/Anishhh7
```

---

# 📄 License

This project is licensed under the ISC License.
