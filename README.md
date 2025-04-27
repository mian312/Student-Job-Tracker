# Student Job Tracker

A full-stack web application designed to help students organize and track their job search process effectively.

## Project Overview

Student Job Tracker is a comprehensive solution for students navigating the job market. It provides tools to manage job applications, track interview progress, and visualize job search metrics through an intuitive interface.

## Repository Structure

This repository contains both frontend and backend components:

```
student-job-tracker/
├── Frontend/     # React application
└── Backend/      # Express API server
```

## Frontend

### Technology Stack

- **Framework**: React 19 with TypeScript
- **UI/Styling**: Tailwind CSS 4
- **Build Tool**: Vite 6
- **Authentication**: Clerk
- **Routing**: React Router 7
- **Icons**: Lucide React
- **State Management**: React's built-in hooks

### Key Features

- **Responsive Dashboard**: Visual representation of application statistics
- **Application Management**: Add, edit, and delete job applications
- **Status Tracking**: Monitor progress from application to offer
- **User Authentication**: Secure login and registration via Clerk
- **Mobile-Friendly Design**: Optimized for all device sizes

### Setup Instructions

1. Navigate to the Frontend directory:
   ```bash
   cd Frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with your Clerk publishable key:
   ```
   VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   VITE_API_URL=http://localhost:3000
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Access the application at `http://localhost:5173`

## Backend

### Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js 5
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: Custom middleware (with userId query parameter)
- **API**: RESTful architecture
- **Development**: Nodemon for hot reloading

### API Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|--------------|
| GET    | /jobs    | Retrieve all job applications for a user | Yes (userId) |
| POST   | /jobs    | Create a new job application | Yes (userId) |
| PUT    | /jobs/:id | Update an existing job application | Yes (userId) |
| DELETE | /jobs/:id | Delete a job application | Yes (userId) |

### Data Models

**Job Application Schema:**
- Company name
- Position/Role
- Application status (Applied, Interview, Offer, Rejected)
- Application date
- Notes
- User ID (for association)
- Additional metadata

### Setup Instructions

1. Navigate to the Backend directory:
   ```bash
   cd Backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with the following variables:
   ```
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/job-tracker
   ```

4. Start the development server:
   ```bash
   npm start
   ```

5. The API will be available at `http://localhost:3000`

## Development Workflow

### Frontend Development

```bash
cd Frontend
npm run dev     # Start development server
npm run build   # Build for production
npm run lint    # Run linting
npm run preview # Preview production build
```

### Backend Development

```bash
cd Backend
npm start       # Start server with nodemon for auto-reloading
```

## Deployment

### Frontend Deployment
The React application can be deployed to services like Vercel, Netlify, or any static hosting provider:

1. Build the application:
   ```bash
   cd Frontend
   npm run build
   ```

2. Deploy the contents of the `dist` directory

### Backend Deployment
The Express API can be deployed to services like Heroku, Railway, or any Node.js hosting provider:

1. Ensure environment variables are properly set in your hosting platform
2. Deploy the Backend directory

## Future Enhancements

- Enhanced authentication with JWT
- Email notifications for application status changes
- Interview scheduling and calendar integration
- Resume and cover letter management
- Company research notes and contacts tracking

## Contributors

- [Milan Dey](https://github.com/mian312)

---

*This project was created to help students streamline their job search process and increase their chances of landing their dream job.*

