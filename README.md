    # Smart Leads Dashboard

## Overview
The Smart Leads Dashboard is a production-grade, full-stack web application designed for efficient lead management. Built using the MERN stack (MongoDB, Express.js, React.js, Node.js) and strict TypeScript, it features role-based access control, advanced filtering, debounce searching, and a containerized infrastructure via Docker.

## Functional Features
* Authentication & Authorization: JWT-based login and registration with Role-Based Access Control (Admin vs. Sales User).
* Lead Management: Complete CRUD operations for leads.
* Strict Data Structure: Leads track Name, Email, Status (New, Contacted, Qualified, Lost), Source (Website, Instagram, Referral), and CreatedAt.
* Advanced Search & Filter: Debounced text search (Name/Email), categorical filtering by Status and Source.
* Sorting & Pagination: Backend-enforced pagination (10 records per page) and sorting (Latest/Oldest).
* Data Export: Direct to CSV export functionality.
* User Interface: Responsive design with native Dark Mode support.

## Tech Stack
* Frontend: React.js (Vite), TypeScript, Tailwind CSS, Axios, React Router.
* Backend: Node.js, Express.js, TypeScript, Mongoose, Zod (Request Validation), JSON Web Tokens, bcrypt.
* Database: MongoDB.
* Infrastructure: Docker, Docker Compose.

## Prerequisites
* Docker and Docker Compose installed on your machine.
* For Windows users: WSL2 configured and Docker Desktop integrated with your specific Linux distribution. Clone this repository directly into the WSL filesystem for optimal performance.

## Getting Started

1. Clone the repository
git clone https://github.com/siva-subramanian04/smart-leads-dash
cd smart-leads-dashboard

2. Environment Configuration
Copy the example environment files and configure them if necessary.
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

Ensure backend/.env contains:
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://mongodb:27017/smart_leads_db
JWT_SECRET=development_secret_key_change_in_production
JWT_EXPIRES_IN=7d

Ensure frontend/.env contains:
VITE_API_URL=http://localhost:5000/api

3. Build and Run via Docker
Start the application infrastructure using Docker Compose.
docker compose up --build

4. Access the Application
* Frontend UI: http://localhost:5173
* Backend API Health Check: http://localhost:5000/api/health

## Architecture & Code Standards
* Strict TypeScript: Explicit interface definitions are mandatory. The use of 'any' is strictly minimized.
* API Standards: Standardized RESTful architecture with centralized error handling and precise HTTP status codes.
* Validation: Comprehensive request validation implemented via Zod middleware.
* Containerization: Multi-container orchestration utilizing isolated bridge networks and volume persistence.