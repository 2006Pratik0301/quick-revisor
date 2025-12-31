# Quick Revisor Web App

A modern web application for quickly adding and reviewing questions and answers. Built with Node.js, Express, PostgreSQL, and React.

## Features

- **User Authentication**: Secure login and registration with JWT tokens
- **Subject Management**: Create subjects with year, name, and related questions
- **Question Management**: Add questions with topics, questions, and answers
- **Voice Input**: Use Web Speech API for voice-to-text question input
- **Card Flip Animation**: Smooth 3D flip animation to reveal answers
- **Dark/Light Mode**: Toggle between light and dark themes
- **Modern UI**: Minimalist, responsive design

## Tech Stack

### Backend
- Node.js with Express.js
- PostgreSQL database
- JWT authentication
- bcrypt for password hashing

### Frontend
- React 18+
- React Router for navigation
- Axios for API calls
- Web Speech API for voice recognition
- CSS with custom properties for theming

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL database
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file:
```bash
cp .env.example .env
```

4. Update the `.env` file with your database credentials:
```
PORT=5000
DATABASE_URL=postgresql://user:password@localhost:5432/quickrevisor
JWT_SECRET=your-secret-key-change-this-in-production
NODE_ENV=development
```

5. Create the database tables:
```bash
npm run migrate
```

6. Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file:
```bash
cp .env.example .env
```

4. Update the `.env` file if your backend is running on a different port:
```
REACT_APP_API_URL=http://localhost:5000/api
```

5. Start the frontend development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## Usage

1. **Register/Login**: Create an account or login with existing credentials
2. **Add Subject**: Click "Add Subject" and fill in the form (subject name is required)
3. **View Questions**: Click on a subject card to view its questions
4. **Add Questions**: Click "Add Question" and fill in the form
   - Use the microphone button for voice input
   - Both manual typing and voice input are supported
5. **Review**: Click on any question card to flip it and see the answer
6. **Theme**: Toggle between light and dark mode using the theme button in the header

## Project Structure

```
quick-revisor/
├── backend/
│   ├── src/
│   │   ├── config/          # Database configuration
│   │   ├── controllers/     # Request handlers
│   │   ├── models/          # Database models
│   │   ├── routes/          # API routes
│   │   ├── middleware/      # Auth middleware
│   │   ├── utils/           # Utility functions
│   │   └── server.js        # Express app entry
│   ├── migrations/          # Database migrations
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── context/         # React contexts
│   │   ├── services/        # API service layer
│   │   ├── styles/          # CSS files
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/verify` - Verify JWT token

### Subjects
- `GET /api/subjects` - Get all subjects
- `GET /api/subjects/:id` - Get subject by ID
- `POST /api/subjects` - Create new subject
- `PUT /api/subjects/:id` - Update subject
- `DELETE /api/subjects/:id` - Delete subject

### Questions
- `GET /api/questions/subject/:subjectId` - Get questions for a subject
- `GET /api/questions/:id` - Get question by ID
- `POST /api/questions/subject/:subjectId` - Create new question
- `PUT /api/questions/:id` - Update question
- `DELETE /api/questions/:id` - Delete question

## Browser Compatibility

Voice recognition requires a browser that supports the Web Speech API:
- Chrome/Edge (recommended)
- Safari (with limitations)
- Firefox (not supported)

For browsers without voice support, manual typing is always available.

## License

MIT

