# TIVIT Frontend MVP

This project is a **Frontend MVP built with Next.js** that demonstrates a secure authentication flow using **JWT tokens**, **role-based access control**, and **protected routes**.

The application authenticates users through an API and grants access to different sections based on the user's role (`user` or `admin`).

## Live Preview

You can access the running application here:

**Live Demo:**
[Tivit MVP]()

---

# Overview

The application implements the following authentication flow:

1. The client verifies API availability through `/health`.
2. The user authenticates using `/token`.
3. The API returns a **JWT token**.
4. The token is stored locally.
5. All protected requests include the token using the `Authorization: Bearer <token>` header.
6. The UI restricts access based on the user's role.

---

# Features

* Next.js (App Router)
* JWT Authentication
* Role-based route protection
* Axios API client with interceptors
* Global authentication state
* Health check for API availability
* Reusable UI components
* Unit tests with Jest
* SCSS styling
* Docker support

---

# Authentication Flow

```
Application Start
        │
        ▼
GET /health
        │
        ▼
API status OK?
        │
        ├─ No → Display API unavailable message
        │
        └─ Yes
              │
              ▼
User Login
POST /token
              │
              ▼
Receive JWT
              │
              ▼
Store token in localStorage
              │
              ▼
Axios interceptor attaches token
Authorization: Bearer <token>
              │
              ▼
Access protected routes
              │
        ┌─────┴─────┐
        ▼           ▼
      /user       /admin
```

---

# Roles and Protected Routes

The system implements **Role-Based Access Control (RBAC)**.

| Route    | Access                  |
| -------- | ----------------------- |
| `/login` | Public                  |
| `/user`  | Users with role `user`  |
| `/admin` | Users with role `admin` |

Access control is enforced through a **ProtectedRoute component**.

---

# Project Structure

```
tivit-mvp
│
├── app
│   ├── login
│   │   └── page.tsx
│   ├── user
│   │   └── page.tsx
│   ├── admin
│   │   └── page.tsx
│   └── layout.tsx
│
├── auth
│   ├── AuthProvider.tsx
│   ├── authService.ts
│   ├── authSlice.ts
│   ├── store.ts
│   └── useAuth.ts
│
├── components
│   ├── ProtectedRoute.tsx
│   ├── Button
│   ├── Card
│   ├── Input
│   ├── Table
│   ├── Alert
│   └── Logo
│
├── services
│   └── api.ts
│
├── styles
│   └── globals.scss
│
├── types
│   └── user.ts
│
├── public
│   └── assets
│
├── Dockerfile
├── jest.config.js
└── next.config.js
```

---

# API Integration

The application communicates with the backend through a centralized Axios client.

```
services/api.ts
```

Responsibilities:

* Defines API base URL
* Adds JWT token to requests
* Handles authentication errors
* Provides request timeout

Authorization header example:

```
Authorization: Bearer <token>
```

---

# Authentication Service

Authentication logic is implemented in:

```
auth/authService.ts
```

Responsibilities:

* Perform login
* Decode JWT token
* Store authentication data
* Fetch user/admin data
* Handle logout
* Perform API health checks

Stored authentication structure:

```
localStorage

auth_token
auth_user
```

Example stored user:

```
{
  "username": "john",
  "role": "admin",
  "token": "jwt-token"
}
```

---

# Health Check

Before authentication, the application checks the API availability using:

```
GET /health
```

Expected response:

```
{
  "status": "ok"
}
```

If the API is unavailable, the UI prevents login attempts and informs the user.

---

# Protected Routes

The component:

```
components/ProtectedRoute.tsx
```

Prevents unauthorized access by:

* Checking authentication state
* Verifying the user role
* Redirecting to `/login` if needed

---

# Running the Project

## Install dependencies

```
yarn install
```

or

```
npm install
```

---

## Run the development server

```
yarn dev
```

or

```
npm run dev
```

Application will be available at:

```
http://localhost:3000
```

---

# Running Tests

This project includes unit tests using **Jest**.

```
yarn test
```

or

```
npm run test
```

---

# Docker

The project can also be run using Docker.

Build image:

```
docker-compose --build .
```

Run container:

```
docker-compose up
```

---

# Technical Highlights

This MVP demonstrates:

* Secure JWT authentication flow
* Role-based authorization
* Separation of concerns
* Reusable component architecture
* Scalable API integration
* Clean folder structure
* Frontend resilience through health checks

---

# Future Improvements

Possible improvements for a production-ready system:

* Refresh token mechanism
* HTTP-only cookies for token storage
* Middleware authentication validation
* Global error handling
* API retry strategy
* Monitoring and observability

---

# Author

Developed as a **Frontend Engineering MVP** to demonstrate architecture, authentication patterns, and API integration using **Next.js**.
