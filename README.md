# Tech Quiz Test Suite

A full-stack web application that allows users to test their coding knowledge through interactive quizzes.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Development](#development)
  - [Testing](#testing)
  - [Building for Production](#building-for-production)
- [Deployment](#deployment)
  - [Deploying to Render](#deploying-to-render)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

## Overview

This Coding Quiz application is a MERN stack project that provides users with a platform to test their programming knowledge. The application features a React frontend with a Node.js/Express backend, using MongoDB as the database.

## Features

- Interactive quiz interface
- Multiple-choice questions on programming topics
- Score tracking and results display
- Responsive design for desktop and mobile
- RESTful API for quiz data

## Tech Stack

### Frontend

- React
- TypeScript
- Vite
- Bootstrap (for styling)

### Backend

- Node.js
- Express
- TypeScript
- MongoDB with Mongoose

### Testing

- Cypress for component and E2E testing
- GitHub Actions for CI/CD

### Deployment

- Render for cloud deployment

#

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)
- MongoDB (local or Atlas)

### Installation

1. Clone the repository:
2. Install dependencies:
3. Set up environment variables:
   - Create a `.env` file in the server directory
   - Add your MongoDB connection string

### Development

To start the development server:

npm run develop

This will start both the client and server in development mode

- Client: http://localhost:3000
- Server: http://localhost:3001

### Testing

To run tests:
npm run test

# Run component tests only

npm run test-component

# Run E2E tests only

npm run test-e2e

# Open Cypress test runner

npm run test-gui

### Building for Production

To build the application for production:
npm run build

This will create optimized builds for both the client and server.

## Deployment

### Deploying to Render

The application is configured for deployment on Render. The deployment is automated through GitHub Actions.

1. Push changes to the main branch
2. GitHub Actions will trigger the deployment workflow
3. The application will be deployed to Render

For manual deployment:

1. Go to the GitHub repository
2. Navigate to Actions
3. Select the "Deploy to Render" workflow
4. Click "Run workflow"
5. Select the environment and provide a reason (optional)
6. Click "Run workflow"

#### Render Configuration

The application requires the following environment variables on Render:

- `NODE_ENV`: Set to `production`
- `PORT`: Set to `10000` (Render will automatically set the actual port)
- `MONGODB_URI`: Your MongoDB Atlas connection string

## API Documentation

### Endpoints

- `GET /api/questions/random`: Get a set of random questions

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
