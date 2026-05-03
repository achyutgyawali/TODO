# ✅ MERN Todo App — with AI Suggestion Microservice

A full-stack **Todo Management Application** built with the **MERN stack** (MongoDB, Express, React, Node.js) and enhanced with a **Python FastAPI microservice** that provides intelligent, context-aware developer suggestions for each task.

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Architecture](#-architecture)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [API Reference](#-api-reference)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [1. Clone the Repository](#1-clone-the-repository)
  - [2. Configure Environment Variables](#2-configure-environment-variables)
  - [3. Install Dependencies](#3-install-dependencies)
  - [4. Run the Application](#4-run-the-application)
  - [5. Run the Suggestion Microservice](#5-run-the-suggestion-microservice)
- [Usage](#-usage)
- [Environment Variables](#-environment-variables)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)
- [Author](#-author)

---

## 🌟 Overview

This project is a feature-rich todo application where authenticated users can:
- **Create**, **read**, **update**, and **delete** their personal tasks.
- Mark tasks as **completed or incomplete**.
- Request **intelligent AI-powered suggestions** for any task via a dedicated Python microservice — without using any external LLM APIs.

The suggestion engine uses rule-based keyword matching across **28+ developer categories** (Security, REST API, State Management, Testing, DevOps, etc.) to return rich, actionable advice.

---

## 🏗️ Architecture

The application consists of **three independent services** communicating via HTTP:

```
┌──────────────────────────────────────────────────────────┐
│                        CLIENT                            │
│         React 19 + Vite  (http://localhost:5173)         │
│   Pages: Landing, Home, Login, Register, About, Todos    │
└──────────────┬──────────────────────────┬────────────────┘
               │ REST (Axios)             │ REST (Axios)
               ▼                          ▼
┌──────────────────────┐     ┌────────────────────────────┐
│    BACKEND (Node.js) │     │   MICROSERVICE (Python)    │
│  Express + Mongoose  │     │       FastAPI              │
│  http://localhost:   │     │  http://localhost:8001     │
│        7000          │     │  POST /suggestion          │
│                      │     │                            │
│  /api/v1/user        │     │  Rule-based keyword        │
│  /api/v1/todo        │     │  suggestion engine         │
│  /api/v1/test        │     │  (28+ dev categories)      │
└──────────┬───────────┘     └────────────────────────────┘
           │ Mongoose ODM
           ▼
┌────────────────────────┐
│  MongoDB Atlas (Cloud) │
│  Collections:          │
│  - users               │
│  - todos               │
└────────────────────────┘
```

---

## ✨ Features

### 🔐 Authentication
- User **registration** with hashed passwords (`bcrypt`)
- Secure **JWT-based login** (token expires in 1 day)
- Protected API routes via **auth middleware**
- Session persisted in `localStorage` (`todoapp` key)

### 📝 Todo Management (Full CRUD)
- **Create** a new task with a title and description
- **View** all your personal tasks on the Home dashboard
- **Edit** any task's title, description, or completion status
- **Delete** tasks permanently
- Tasks display **creation date** and **completion status** badge

### 🤖 AI Suggestion Engine
- Click the 🩺 button on any task card to get **context-aware developer tips**
- The Python FastAPI microservice analyzes the task's title and description
- Matches against **28+ developer categories** using keyword rules:
  - 🛡️ Security & Authentication
  - 🔌 Real-time & WebSockets
  - ⚡ Performance & Optimization
  - 📦 State Management
  - 🎨 UI/UX & Styling
  - 🔗 REST API Design
  - 🗄️ Database & MongoDB
  - 🧪 Testing & Quality
  - 🚀 Git & DevOps
  - 🤖 AI & ML Integration
  - _(and 18+ more categories)_
- Falls back to **General Development Strategy** if no keywords match
- Displayed in a dedicated **Suggestion Modal**

### 🖥️ Pages & Navigation
| Route | Page | Description |
|---|---|---|
| `/` | Landing | Welcome/hero page |
| `/login` | Login | User login form |
| `/register` | Register | User registration form |
| `/home` | Home | Main dashboard with todos |
| `/todoList` | Todo List | Alternate list view |
| `/about` | About | About the app |

---

## 🛠️ Tech Stack

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| **React** | 19.x | UI framework |
| **Vite** | 6.x | Build tool & dev server |
| **React Router DOM** | 7.x | Client-side routing |
| **Axios** | 1.x | HTTP client for API calls |
| **React Hot Toast** | 2.x | Toast notifications |
| **Vanilla CSS** | — | Custom styling |

### Backend
| Technology | Version | Purpose |
|---|---|---|
| **Node.js** | — | Runtime environment |
| **Express** | 5.x | Web framework |
| **Mongoose** | 8.x | MongoDB ODM |
| **MongoDB** | 6.x (Atlas) | Database |
| **bcrypt** | 5.x | Password hashing |
| **jsonwebtoken** | 9.x | JWT auth |
| **Morgan** | 1.x | HTTP request logger |
| **dotenv** | 16.x | Environment config |
| **CORS** | 2.x | Cross-origin requests |
| **Nodemon** | 3.x | Dev auto-restart |
| **Concurrently** | 9.x | Run frontend + backend together |

### Microservice
| Technology | Version | Purpose |
|---|---|---|
| **Python** | 3.x | Runtime |
| **FastAPI** | — | Web framework |
| **Pydantic** | — | Request/response validation |
| **Uvicorn** | — | ASGI server |

---

## 📁 Project Structure

```
TODO/
├── index.js                    # Express server entry point
├── package.json                # Backend dependencies & scripts
├── .env                        # Environment variables (not committed)
├── .gitignore
│
├── config/
│   └── db.js                   # MongoDB connection setup
│
├── models/
│   ├── userModel.js            # User schema (username, email, password)
│   └── todoModel.js            # Todo schema (title, description, isCompleted, createdBy)
│
├── controllers/
│   ├── userController.js       # Register & Login logic
│   ├── todoController.js       # CRUD operations for todos
│   └── testController.js       # Test/health check endpoint
│
├── routes/
│   ├── userRoute.js            # POST /api/v1/user/register, /login
│   ├── todoRoutes.js           # CRUD routes under /api/v1/todo
│   └── testRoutes.js           # GET /api/v1/test
│
├── middlewares/
│   └── authMiddleware.js       # JWT Bearer token verification
│
├── microservice/
│   └── suggestion_service.py   # FastAPI suggestion engine (28+ categories)
│
└── client/                     # React frontend (Vite)
    ├── index.html
    ├── vite.config.js
    ├── package.json            # Frontend dependencies
    └── src/
        ├── main.jsx            # React entry point
        ├── App.jsx             # Route definitions
        ├── App.css
        ├── index.css
        │
        ├── pages/
        │   ├── Landing/        # Landing/hero page
        │   ├── Auth/           # Login & Register pages
        │   ├── Home/           # Main dashboard (Home.jsx)
        │   ├── Todos/          # Todo list view
        │   └── About/          # About page
        │
        ├── components/
        │   ├── Card/
        │   │   └── Card.jsx    # Todo card grid with Edit/Delete/Suggest buttons
        │   └── Layout/
        │       ├── Navbar.jsx          # Top navigation bar
        │       ├── PopModal.jsx        # Create task modal
        │       ├── EditTodo.jsx        # Edit task modal
        │       └── SuggestionModal.jsx # AI suggestion display modal
        │
        ├── Services/
        │   ├── AuthServices.jsx    # register & login API calls
        │   └── TodoServices.jsx    # CRUD + getSuggestion API calls
        │
        └── Utils/
            └── ErrorMessage.jsx    # Reusable error display component
```

---

## 📡 API Reference

### Base URL: `http://localhost:7000/api/v1`

### 🔓 User Routes (Public)

| Method | Endpoint | Body | Description |
|---|---|---|---|
| `POST` | `/user/register` | `{ username, email, password }` | Register a new user |
| `POST` | `/user/login` | `{ email, password }` | Login and receive JWT token |

**Login Response:**
```json
{
  "success": true,
  "message": "Login Successful",
  "token": "<jwt_token>",
  "user": { "id": "...", "username": "...", "email": "..." }
}
```

---

### 🔐 Todo Routes (Protected — requires `Authorization: Bearer <token>`)

| Method | Endpoint | Body / Params | Description |
|---|---|---|---|
| `POST` | `/todo/create` | `{ title, description, createdBy }` | Create a new todo |
| `POST` | `/todo/getAll/:userId` | Param: `userId` | Fetch all todos for a user |
| `PATCH` | `/todo/update/:id` | `{ title?, description?, isCompleted? }` | Update a todo |
| `DELETE` | `/todo/delete/:id` | Param: `id` | Delete a todo |

---

### 🤖 Suggestion Microservice

**Base URL:** `http://localhost:8001`

| Method | Endpoint | Body | Description |
|---|---|---|---|
| `POST` | `/suggestion` | `{ title, description }` | Get dev suggestion for a task |

**Example Request:**
```json
{ "title": "Add login", "description": "implement JWT auth" }
```

**Example Response:**
```json
{
  "suggestion": "🛡️ **Security & Authentication Best Practices**:\n• **Passwords**: Always hash passwords using `bcrypt` or `argon2`..."
}
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- **Node.js** (v18+) — [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Python** (v3.8+) — [Download](https://www.python.org/)
- **pip** (comes with Python)
- A **MongoDB Atlas** account — [Sign up free](https://www.mongodb.com/cloud/atlas)

---

### 1. Clone the Repository

```bash
git clone https://github.com/<your-username>/todo-mern.git
cd todo-mern
```

---

### 2. Configure Environment Variables

Create a `.env` file in the **project root** (next to `index.js`):

```env
PORT=7000
MONGO_URL=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/todo-mern?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_key_here
DEV_MODE=development
```
---

### 3. Install Dependencies

**Backend** (from project root):
```bash
npm install
```

**Frontend** (from the `client/` folder):
```bash
cd client
npm install
cd ..
```

**Python Microservice:**
```bash
pip install fastapi uvicorn pydantic
```

---

### 4. Run the Application

From the **project root**, run both the backend and frontend simultaneously:

```bash
npm run dev
```

This uses `concurrently` to start:
- **Backend** → `http://localhost:7000` (nodemon)
- **Frontend** → `http://localhost:5173` (Vite dev server)

Or run them separately in two terminals:

```bash
# Terminal 1 — Backend
npm start

# Terminal 2 — Frontend
npm run client
```

---

### 5. Run the Suggestion Microservice

Open a **third terminal** and run:

```bash
cd microservice
uvicorn suggestion_service:app --reload --port 8001
```

The suggestion engine will be live at → `http://localhost:8001`

You can explore the interactive API docs at → `http://localhost:8001/docs`

---

## 🎮 Usage

1. **Register** a new account at `/register`
2. **Login** at `/login` — your session is stored in `localStorage`
3. On the **Home** dashboard, click **"Add Task"** to create a todo
4. Each task card shows:
   - Title, description, creation date, and completion status
   - 🩺 **Suggest** — opens the AI suggestion modal
   - ✏️ **Edit** — opens the edit form
   - 🗑️ **Delete** — removes the task
5. Click the **🩺 suggestion button** on any task to get intelligent developer advice from the microservice
6. **Logout** to clear your session

---

## 🔧 Environment Variables

| Variable | Required | Description |
|---|---|---|
| `PORT` | ✅ | Port for the Express backend (default: `7000`) |
| `MONGO_URL` | ✅ | MongoDB connection string (Atlas or local) |
| `JWT_SECRET` | ✅ | Secret key for signing JWT tokens |
| `DEV_MODE` | ⬜ | Environment mode (`development` / `production`) |

---

