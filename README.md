# Dynamic Portfolio Application

A modern, dynamic portfolio application with admin panel and GitHub integration.

## Features

### Frontend
- **Dynamic Projects Display**: Featured projects on homepage, all projects on dedicated page
- **GitHub Integration**: Fetch and display projects from GitHub repositories
- **Responsive Design**: Mobile-friendly interface
- **Dark/Light Mode**: Theme switching capability
- **Routing**: Multi-page navigation with React Router

### Backend
- **Admin Panel**: Complete CRUD operations for projects
- **Authentication**: JWT-based admin authentication
- **GitHub API Integration**: Fetch repository data automatically
- **Featured Projects Management**: Select up to 4 featured projects for homepage
- **Database**: MongoDB with Mongoose ODM

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)

### Installation

1. **Install dependencies**
   ```bash
   # Install frontend dependencies
   npm install
   
   # Install backend dependencies
   cd server
   npm install
   ```

2. **Environment Setup**
   
   **Frontend (.env)**
   ```
   VITE_API_URL=http://localhost:5000/api
   ```
   
   **Backend (server/.env)**
   ```
   JWT_SECRET=your-super-secret-jwt-key-here
   DB=mongodb://localhost:27017/portfolio
   PORT=5000
   ```

3. **Database Setup**
   ```bash
   # Start MongoDB service
   # Create admin user
   cd server
   npm run create-admin
   
   # Seed sample projects (optional)
   npm run seed-projects
   ```

4. **Start the application**
   
   **Development Mode:**
   ```bash
   # Start both frontend and backend with hot reload
   npm run dev
   ```
   
   **Production Mode:**
   ```bash
   # Build and start the application
   npm run build
   npm start
   ```
   
   **Using Docker:**
   ```bash
   # Using Docker Compose (recommended)
   npm run docker:compose:build
   
   # Or build and run manually
   npm run docker:build
   npm run docker:run
   ```

## Usage

### Admin Access
1. Navigate to `/admin`
2. Login with default credentials:
   - Username: `admin`
   - Password: `admin123`

### Admin Panel Features
- **Project Management**: Add, edit, delete projects
- **GitHub Integration**: Import projects from GitHub
- **Featured Projects**: Select up to 4 projects for homepage
- **Visibility Control**: Show/hide projects

## Technology Stack

### Frontend
- React 18, React Router DOM, Axios, Tailwind CSS, Vite

### Backend
- Node.js, Express.js, MongoDB, Mongoose, JWT Authentication