# Grubstake

**Grubstake** is a comprehensive Scholarship and Loan Management System that allows users to easily access data about available scholarships and loans. Additionally, banks have the capability to upload loan details through a dedicated portal. This project is built with a robust backend using Express, a dynamic frontend with React, and stylish, responsive design powered by Tailwind CSS.

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Frontend Setup](#frontend-setup)
- [Backend Setup](#backend-setup)
- [Technologies Used](#technologies-used)
- [Screenshots](#screenshots)
- [License](#license)

## Installation

To set up this project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/Anubhavprogramer/Grubstake
   cd greubstake

2. Install the necessary dependencies for both frontend and backend
    ```bash
    npm install
    cd frontend
    npm install



# Configuration

Before running the project, make sure to configure the environment variables in a .env file located in the root directory.

Here's an example configuration:
    
    ```bash
    PORT=
    DB_URI="mongodb://localhost:27017/{database name}"
    COOKIE_EXPIRE=
    JWT_SECRET=
    JWT_EXPIRE=
    SMTP_HOST=
    SMTP_PORT=
    SMTP_SERVICE=
    SMTP_MAIL=
    SMTP_PASSWORD=

## Frontend Setup
To start the frontend server, navigate to the frontend directory and run the following command:

    cd Frontend
    npm run start


## Frontend Setup
To start the frontend server, navigate to the frontend directory and run the following command:


    ```
    npm run dev


## 💻 Technologies Used

### Frontend
- **React**: A JavaScript library for building user interfaces.
- **Tailwind CSS**: A utility-first CSS framework for creating custom designs.

### Backend
- **Express**: A web application framework for Node.js, used to build the backend services.
- **MongoDB**: A NoSQL database for storing and managing data.

### Authentication
- **JWT (JSON Web Tokens)**: A compact, URL-safe means of representing claims between two parties.

### Email Service
- **Nodemailer**: A module for Node.js to send emails.
  - **SMTP Provider**: Gmail SMTP for email delivery.

### Database
- **MongoDB**: A NoSQL database used for data storage and retrieval.

