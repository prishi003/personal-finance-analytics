#  Personal Finance Tracker - MERN Stack Application

A comprehensive web-based personal finance management application built with the MERN stack (MongoDB, Express.js, React.js, and Node.js). Track your expenses, manage income, and gain valuable insights into your spending patterns with beautiful visualizations and analytics.


##  Table of Contents

- [Project Description](#project-description)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

##  Project Description

The Personal Finance Tracker is a full-stack web application designed to help individuals and families manage their finances effectively. It provides an intuitive interface for tracking daily expenses, monitoring income, categorizing transactions, and analyzing spending patterns through comprehensive visualizations and reports.

### Key Objectives

1. **Simplify Finance Tracking** - Make personal finance management accessible and easy for everyone
2. **Provide Insights** - Offer detailed analytics and visualizations to understand spending patterns
3. **Transaction Management** - Enable users to create, update, and delete financial transactions and categories
4. **Generate Reports** - Create comprehensive reports based on custom date ranges and categories

##  Features

###  User Authentication & Authorization
- Secure user registration and login system
- JWT-based authentication
- Avatar customization for user profiles
- Protected routes and API endpoints
- Session management with secure token storage

###  Transaction Management
- **Add Transactions** - Record income and expenses with detailed information
- **Transaction Types** - Support for both credit (income) and debit (expense) transactions
- **Categories** - Organize transactions by custom categories
- **Date Tracking** - Track transactions with specific dates
- **CRUD Operations** - Create, read, update, and delete transactions
- **Transaction Filtering** - Filter by date range, category, and transaction type

###  Enhanced Analytics & Visualizations
- **Scatter Plot Chart** - Visualize expenses scattered over days in a selected month
- **Monthly Expenditure Bar Chart** - View monthly spending trends for any year
- **Category-wise Doughnut Chart** - Analyze spending distribution across categories
- **Summary Cards** - Quick overview of:
  - Total transactions count
  - Total income
  - Total expenses
  - Net balance
- **Date Range Filtering** - Custom date range selection for analytics
- **Interactive Charts** - Built with Chart.js for responsive and interactive visualizations

###  User Interface
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI** - Built with React Bootstrap and Material-UI components
- **Particle Background** - Beautiful animated background using tsparticles
- **Toast Notifications** - User-friendly notifications for actions
- **Loading States** - Smooth loading indicators and spinners

###  Security Features
- Password hashing with bcrypt
- JWT token-based authentication
- CORS protection
- Helmet.js for security headers
- Input validation and sanitization

##  Tech Stack

### Frontend
- **React.js** (v18.2.0) - UI library
- **React Router DOM** (v6.10.0) - Client-side routing
- **React Bootstrap** (v2.7.3) - UI component library
- **Bootstrap** (v5.2.3) - CSS framework
- **Material-UI Icons** (v5.11.16) - Icon library
- **Chart.js** (v4.5.0) & **react-chartjs-2** (v5.3.0) - Data visualization
- **React DatePicker** (v4.11.0) - Date selection component
- **Moment.js** (v2.29.4) - Date manipulation
- **Axios** (v1.3.5) - HTTP client
- **React Toastify** (v9.1.2) - Toast notifications
- **TSParticles** (v2.9.3) - Particle animation effects
- **Unique Names Generator** (v4.7.1) - Avatar name generation

### Backend
- **Node.js** - Runtime environment
- **Express.js** (v4.18.2) - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** (v7.0.3) - MongoDB object modeling
- **JWT** (v9.0.0) - Authentication tokens
- **Bcrypt** (v5.1.0) - Password hashing
- **Helmet** (v6.1.5) - Security middleware
- **Morgan** (v1.10.0) - HTTP request logger
- **CORS** (v2.8.5) - Cross-origin resource sharing
- **Dotenv** (v16.0.3) - Environment variable management
- **Validator** (v13.9.0) - Input validation

### Database
- **MongoDB** - Document-based NoSQL database
- **Mongoose ODM** - Schema definition and validation

### Deployment
- **Frontend:** AWS Amplify
- **Backend:** Render
- **Database:** MongoDB Atlas (Cloud)

##  Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB database (local or MongoDB Atlas)


##  Project Structure

```
Expense-Tracker-App-main/
├── backend/
│   ├── controllers/
│   │   ├── transactionController.js
│   │   └── userController.js
│   ├── DB/
│   │   └── Database.js
│   ├── models/
│   │   ├── TransactionModel.js
│   │   └── UserSchema.js
│   ├── Routers/
│   │   ├── Transactions.js
│   │   └── userRouter.js
│   ├── config/
│   │   └── config.env
│   ├── app.js
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.js
│   │   │   ├── Spinner.js
│   │   │   └── ...
│   │   ├── Pages/
│   │   │   ├── Auth/
│   │   │   │   ├── Login.js
│   │   │   │   └── Register.js
│   │   │   ├── Home/
│   │   │   │   ├── Home.js
│   │   │   │   ├── Analytics.js
│   │   │   │   ├── EnhancedAnalytics.js
│   │   │   │   └── ...
│   │   │   └── Avatar/
│   │   │       └── setAvatar.js
│   │   ├── utils/
│   │   │   └── ApiRequest.js
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
│
└── README.md
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/logout` - Logout user

### Transactions
- `GET /api/v1/transactions` - Get all transactions for authenticated user
- `POST /api/v1/transactions` - Create a new transaction
- `PUT /api/v1/transactions/:id` - Update a transaction
- `DELETE /api/v1/transactions/:id` - Delete a transaction

