# 🚀 NewsHub: AI-Powered News Platform

This project is a full-stack web application that serves as an AI-powered news platform. It features a responsive UI for browsing news articles and uses Gemini API to generate AI summaries for each article.

## ✨ Features

- Responsive frontend displaying news articles
- Article summary generation using Gemini API
- Admin panel for article management
- RESTful API backend

## 🛠 Tech Stack

- **Frontend**: React.js, React Router, Tailwind CSS
- **Backend**: Node.js, Express.js
- **AI Integration**: Google Gemini API
- **Database**: MongoDB

## 🗂️ Project Structure

```
NewsHub/
├── client/                  # Frontend React app
│   ├── public/
│   └── src/
│       ├── components/      # Reusable UI components
│       ├── configs/         # Configuration files
│       ├── pages/           # Page components
│       ├── store/           # Global State Managmement(Themes)
│       ├── App.jsx          # Main app component
│       ├── Dockerfile       # Dockerfile for containerization
│       ├── .env             # Environment variables(not committed)
│       └── main.jsx         # Entry point
├── server/                  # Backend Node.js/Express app
│   ├── config/              # Server configuration
│   ├── controllers/         # Route controllers
│   ├── data/                # JSON data
│   ├── models/              # Database models
│   ├── routes/              # API routes
│   ├── Dockerfile           # Dockerfile for containerization
│   ├── .env                 # Environment variables (not committed)
│   ├── server.js            # Server entry point
├── docker-compose           # Docker compose file for containerization
├── LICENSE                  # License agreement
└── README.md
```

## 🧰 Setup Instructions

### ✅ Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Google Gemini API key

### 📦 Installation

1. Clone the repository:
   ```
   git clone https://github.com/EcstaticFly/NewsHub.git
   cd NewsHub
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

3. Create `.env` files in the server and client Directories:
   ```
   //For server
   PORT=5000
   GEMINI_API_KEY=your_gemini_api_key
   MONGODB_URI=your_mongodb_connection_string
   CLIENT_URL=your_frontend_url

   //For client
   VITE_API_URL=http://localhost:5000
   ```

4. Start the development servers:
   ```
   # Start backend server (from server directory)
   npm run dev
   
   # In a new terminal, start frontend (from client directory)
   npm run dev
   ```

5. Access the application:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## 🔍 API Endpoints

- `GET /api/articles` - Get all articles
- `GET /api/articles/:id` - Get a specific article
- `GET /api/articles/:id/summary` - Get AI-generated summary for an article
- `POST /api/admin/articles` - Create a new article (admin only)
- `PUT /api/admin/articles/:id` - Update an article (admin only)
- `DELETE /api/admin/articles/:id` - Delete an article (admin only)

## 🚀 Deployment

🔗 **Live Link:** [NewsHub](https://newshub-iota-vert.vercel.app/)  
📂 **Source Code:** [GitHub](https://github.com/EcstaticFly/Chatzy.git)

## 🧠 Development Approach

I approached this project with a focus on:
1. Clean architecture with separation of concerns
2. Responsive UI design using modern React practices
3. RESTful API design
4. Integration with Gemini API for AI-powered summaries

For the AI summary generation, I used Google's Gemini API to analyze the article content and generate concise summaries that capture the key points.

## 🔮 Potential Improvements

- Add user authentication
- Implement article categorization and filtering
- Add more advanced AI features like sentiment analysis
- Implement caching for API responses
- Add unit and integration tests

## 🤖 GPT Tool Usage

I used GPT tools for:
- Getting AI generated summaries
- Debugging complex React component interactions

## 🤝 Contributing  
Contributions, issues, and feature requests are welcome!  
Feel free to **fork** the repo and submit a **pull request**.  

## 📜 License  
This project is licensed under the **GNU GENERAL PUBLIC LICENSE v3**.

## 📬 Contact
For inquiries, reach out to me at [Suyash Pandey](mailto:suyash.2023ug1100@iiitranchi.ac.in).