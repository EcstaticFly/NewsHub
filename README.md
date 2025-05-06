# AI-Powered News Platform

This project is a full-stack web application that serves as an AI-powered news platform. It features a responsive UI for browsing news articles and uses Gemini API to generate AI summaries for each article.

## Features

- Responsive frontend displaying news articles
- Article summary generation using Gemini API
- Admin panel for article management
- RESTful API backend

## Tech Stack

- **Frontend**: React.js, React Router, Tailwind CSS
- **Backend**: Node.js, Express.js
- **AI Integration**: Google Gemini API

## Project Structure

```
news-platform/
├── client/                  # Frontend React app
│   ├── public/
│   └── src/
│       ├── components/      # Reusable UI components
│       ├── pages/           # Page components
│       ├── App.js           # Main app component
│       └── index.js         # Entry point
├── server/                  # Backend Node.js/Express app
│   ├── controllers/         # Route controllers
│   ├── routes/              # API routes
│   ├── data/                # JSON data
│   ├── server.js            # Server entry point
├── .env                     # Environment variables (not committed)
└── README.md
```

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Google Gemini API key

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/ai-news-platform.git
   cd ai-news-platform
   ```

2. Install dependencies for both frontend and backend:
   ```
   # Install backend dependencies
   cd server
   npm install
   
   # Install frontend dependencies
   cd ../client
   npm install
   ```

3. Create a `.env` file in the server directory with your Gemini API key:
   ```
   PORT=5000
   GEMINI_API_KEY=your_gemini_api_key
   ```

4. Start the development servers:
   ```
   # Start backend server (from server directory)
   npm run dev
   
   # In a new terminal, start frontend (from client directory)
   npm start
   ```

5. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000/api

## API Endpoints

- `GET /api/articles` - Get all articles
- `GET /api/articles/:id` - Get a specific article
- `GET /api/articles/:id/summary` - Get AI-generated summary for an article
- `POST /api/articles` - Create a new article (admin only)
- `PUT /api/articles/:id` - Update an article (admin only)
- `DELETE /api/articles/:id` - Delete an article (admin only)

## Deployment

The application is deployed at [your-deployment-url.com](https://your-deployment-url.com)

## Development Approach

I approached this project with a focus on:
1. Clean architecture with separation of concerns
2. Responsive UI design using modern React practices
3. RESTful API design
4. Integration with Gemini API for AI-powered summaries

For the AI summary generation, I used Google's Gemini API to analyze the article content and generate concise summaries that capture the key points.

## Potential Improvements

- Add user authentication
- Implement article categorization and filtering
- Add more advanced AI features like sentiment analysis
- Implement caching for API responses
- Add unit and integration tests

## GPT Tool Usage

I used GPT tools for:
- Initial project structure planning
- Debugging complex React component interactions
- Optimizing the API integration with Gemini

## License

This project is licensed under the MIT License - see the LICENSE file for details.# NewsHub
