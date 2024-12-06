

# QnA Web Application

## Quick Start 🚀

```bash
# Start Backend (from backend directory)
cd backend && npm install && node app.js

# Start Frontend (from frontend directory)
cd frontend && npm install && npm start


```

## About the Project 📝

A dynamic Question & Answer platform built with the MERN stack (MongoDB, Express.js, React.js, Node.js). This application enables users to share knowledge, ask questions, and participate in meaningful discussions. It features a user-friendly interface with robust functionality for posting questions, providing answers, and engaging with the community.

## Core Features ⭐

### 1. User Authentication & Profiles
- Secure email & password registration
- JWT-based authentication system
- Personalized user profiles showing:
  - User activity history
  - Questions asked
  - Answers provided


### 2. Question Management
- Ask detailed questions with rich text formatting
- Add  tags for better categorization
- Edit questions after posting
- Delete questions (author only and admin)

### 3. Search & Filter
- Full-text search across questions
- Advanced filtering options:
  - By tags

### 4. Comments & Discussions
- Add comments on questions 
- Like/Unlike comments


### 5. User Interface
- Clean, responsive design
- easy to use

### 6. Admin Management(done directly from backend)
- Manage users
- Manage posts

## Technology Stack 💻

### Frontend
- React.js


### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Bcrypt for password hashing



## Some API Endpoints 📚

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - User login


### Questions(Posts)
- `GET /api/posts/approved` - Get all approved questions
- `POST /api/posts/` - Create question
- `PUT /api/posts/:id` - Update question
- `POST /api/posts/:id/like` - Like question
- `DELETE /api/posts/:id` - Delete question


### Comments (Answers)
- `POST /api/comments/:id` - Add comment
- `POST /api/comments/:id/like` - like comment
- `POST /api/answers/:id/unlike` - Dislike answer







