# Quick Start Guide

## Initial Setup

### 1. Database Setup

First, make sure PostgreSQL is installed and running. Create a database:

```sql
CREATE DATABASE quickrevisor;
```

### 2. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your database credentials
npm run migrate
npm run dev
```

### 3. Frontend Setup

In a new terminal:

```bash
cd frontend
npm install
cp .env.example .env
# Edit .env if needed (default should work)
npm start
```

## First Use

1. Open `http://localhost:3000` in your browser
2. Click "Don't have an account? Register" to create an account
3. Enter a username and password (minimum 6 characters)
4. You'll be automatically logged in and redirected to the dashboard
5. Click "+ Add Subject" to create your first subject
6. Click on a subject card to add questions
7. Use the microphone button for voice input (works best in Chrome/Edge)

## Features

- **Voice Input**: Click the microphone icon next to the question field to start voice recognition
- **Card Flip**: Click any question card to flip it and see the answer
- **Dark Mode**: Click the moon/sun icon in the header to toggle themes
- **Delete**: Click the × button on any card to delete it

## Troubleshooting

### Backend won't start
- Check that PostgreSQL is running
- Verify DATABASE_URL in backend/.env is correct
- Make sure you've run `npm run migrate` to create tables

### Frontend can't connect to backend
- Verify backend is running on port 5000
- Check REACT_APP_API_URL in frontend/.env matches your backend URL
- Check browser console for CORS errors

### Voice input not working
- Voice recognition requires Chrome, Edge, or Safari
- Make sure microphone permissions are granted
- Check browser console for errors

