
# Frontend - Technician Scheduler App

## Overview
A React-based web application that allows users to interact with the Technician Scheduler API via an AI-powered chatbot.

## Features
- User authentication (login/register)
- Chat interface to book, check, and cancel bookings
- Responsive and user-friendly UI

## Installation & Setup
1. Clone the repository:
   ```bash
   git clone <frontend-repo-url>
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the application:
   ```bash
   npm start
   ```
4. The application will be available at `http://localhost:3000`

## Environment Variables
Create a `.env` file and set the backend API URL:
```
REACT_APP_BACKEND_URL=http://localhost:8000
```

## Running Backend & Frontend Together
1. Ensure both backend and frontend repositories are cloned.
2. In the frontend directory, install `concurrently`:
   ```bash
   npm install -g concurrently
   ```
3. Modify `package.json` to include:
   ```json
   "scripts": {
     "start:both": "concurrently \"npm start\" \"cd ../backend && uvicorn app.main:app --reload\""
   }
   ```
4. Run both applications:
   ```bash
   npm run start:both
   ```

## Example Usage
1. **Login** with default user:
   ```json
   {
     "email": "alice@example.com",
     "password": "securepassword"
   }
   ```
2. **Book a technician:**
   - Type: `I need an electrician for Friday at 10 AM.`
   - Response: `Booking confirmed with Jane Doe (Electrician) on Friday at 10:00 AM.`
3. **Check existing bookings:**
   - Type: `What are my bookings?`
   - Response: `Your bookings: Booking ID 1: Electrician on Friday at 10:00 AM.`
4. **Cancel a booking:**
   - Type: `Cancel my booking ID 1.`
   - Response: `Booking ID 1 has been canceled.`

---
With this setup, the **Technician Scheduler** application provides a seamless booking experience using AI-powered interactions. 🚀

