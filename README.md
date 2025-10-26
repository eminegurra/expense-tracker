# Expense Tracker - Full Stack Application

A simple expense tracking application built with React, Node.js, Express, and MongoDB. Users can create categories, add expenses, track total spending, and receive email alerts when budget limits are exceeded.

## Tech Stack
- **Frontend:** React
- **Backend:** Node.js, Express
- **Database:** MongoDB Atlas
- **Email Service:** Brevo (Sendinblue)

## Prerequisites
Before running this project, make sure you have:
- Node.js (v14 or higher) installed
- MongoDB Atlas account (free tier)
- Brevo account (free tier for email service)

## Installation & Setup

### 1. Clone the Repository
```bash
git clone <your-repository-url>
cd expense-tracker
```

### 2. Backend Setup

#### Install Dependencies
```bash
cd backend
npm install
```

#### Set Up Environment Variables
Create a `.env` file in the `backend` folder:
```bash
cp .env.example .env
```

Then edit `.env` with your actual credentials:
```
MONGODB_URI=your_mongodb_connection_string
PORT=5000
BREVO_API_KEY=your_brevo_api_key
ALERT_EMAIL=your_email@example.com
BUDGET_LIMIT=1000
```

#### Start the Backend Server
```bash
npm run dev
```

The backend should now be running on `http://localhost:5000`

You should see:
```
Server running on port 5000
MongoDB connected successfully
```

### 3. Frontend Setup

Open a **NEW terminal** (keep backend running), then:

#### Install Dependencies
```bash
cd frontend
npm install
```

#### Start the React App
```bash
npm start
```

The frontend should automatically open in your browser at `http://localhost:3000`

## How to Get API Keys

### MongoDB Atlas Connection String

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Sign up or log in
3. Create a **free cluster** (M0 Sandbox)
4. Click **"Database Access"** → Add a database user with username and password
5. Click **"Network Access"** → Add IP Address → Allow access from anywhere (0.0.0.0/0)
6. Go back to **"Database"** → Click **"Connect"**
7. Choose **"Connect your application"**
8. Select **"Node.js"** as driver
9. Copy the connection string
10. Replace `<password>` with your database user password
11. Replace `<database>` with `expensetracker`

Example:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/expensetracker?retryWrites=true&w=majority
```

### Brevo API Key (Email Service)

1. Go to [Brevo](https://www.brevo.com)
2. Sign up for a free account
3. Verify your email
4. Go to **Settings** → **SMTP & API** → **API Keys**
5. Click **"Generate a new API key"**
6. Give it a name (e.g., "Expense Tracker")
7. Copy the API key
8. Paste it into your `.env` file as `BREVO_API_KEY`

## Running the Application

**Important:** You need to run BOTH backend and frontend simultaneously in separate terminals.

### Terminal 1 - Backend:
```bash
cd backend
npm run dev
```

### Terminal 2 - Frontend:
```bash
cd frontend
npm start
```

## Using the Application

1. **Create Categories:**
   - Use the "Add New Category" form
   - Examples: Food, Transport, Office Supplies

2. **Add Expenses:**
   - Select a category from the dropdown
   - Enter amount (e.g., 50.00)
   - Enter description (e.g., "Lunch at restaurant")
   - Click "Add Expense"

3. **View Total Spending:**
   - Total is displayed at the top of the expense list
   - All expenses are listed with their details

4. **Delete Expenses:**
   - Click the "Delete" button next to any expense

5. **Test Email Alert:**
   - Add expenses that total more than $1000 (or your configured BUDGET_LIMIT)
   - Check your email inbox for a budget alert notification
   - Check spam folder if you don't see it

## Project Structure