# Student Job Tracker

A modern web application built with React, TypeScript, and Vite that helps students organize and monitor their job search process.

## Overview

Student Job Tracker provides a simple, effective way for students to keep track of their job applications throughout the hiring process. The application features a clean, intuitive interface built with Tailwind CSS and integrates with Clerk for secure authentication.

## Features

- **User Authentication**: Secure login and registration using Clerk
- **Dashboard Overview**: Visual summary of application statistics
- **Job Application Management**:
  - Add new job applications with company, role, status, and other details
  - View all applications in a filterable table
  - Update application status as you progress through interviews
  - Delete applications that are no longer relevant
- **Status Tracking**: Monitor the progress of each application from applied to offer
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Technology Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS
- **Build Tool**: Vite 6
- **Authentication**: Clerk
- **Routing**: React Router 7
- **Icons**: Lucide React
- **Code Quality**: ESLint with TypeScript support

## Getting Started

### Prerequisites

- Node.js (version 18.18.0 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the root directory with your Clerk publishable key:
   ```
   VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   ```
4. Start the development server:
   ```
   npm run dev
   ```

## Development

### Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run lint` - Run ESLint to check for code quality issues
- `npm run preview` - Preview the production build locally

