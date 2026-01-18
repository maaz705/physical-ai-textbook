# Quick Start Guide

Get up and running with the Physical AI & Humanoid Robotics Textbook System in minutes.

## Prerequisites

- **Python 3.11+** - Backend runtime
- **Node.js 18+** - Frontend development
- **Git** - Version control
- **RTX 4070 Ti or higher** - For AI computations (recommended)

## Step 1: Clone the Repository

```bash
git clone <repository-url>
cd <repository-name>
```

## Step 2: Set Up Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install fastapi uvicorn python-jose[cryptography] passlib[bcrypt] python-multipart qdrant-client openai python-dotenv
```

### Backend Environment Variables

Create a `.env` file in the backend directory:

```env
SECRET_KEY=your-super-secret-key-change-this-in-production
QDRANT_URL=https://your-qdrant-instance.qdrant.tech
QDRANT_API_KEY=your-qdrant-api-key
OPENAI_API_KEY=your-openai-api-key
DATABASE_URL=postgresql://user:password@localhost/dbname
```

## Step 3: Set Up Frontend

```bash
cd frontend  # From repository root
npm install
```

## Step 4: Start the Applications

### Start Backend Server

```bash
cd backend
uvicorn backend.src.main:app --reload --host 0.0.0.0 --port 8000
```

Backend will be available at `http://localhost:8000`

### Start Frontend Server

```bash
cd frontend
npm start
```

Frontend will be available at `http://localhost:3000`

## Step 5: Explore the Platform

1. Visit the frontend at `http://localhost:3000`
2. Register for an account using the registration form
3. Complete the hardware questionnaire to personalize your experience
4. Navigate to the Modules page to browse the curriculum
5. Select a module and chapter to start learning
6. Use the AI assistant to ask questions about the content

## Key Features to Try

### AI-Powered Assistant
- Select text in any chapter and click "Ask Assistant About Selection"
- Ask questions about robotics concepts in the chat interface
- Get personalized explanations based on your background

### Personalization
- Complete your profile in the dashboard
- Adjust learning preferences (difficulty, format, hardware focus)
- See content adapted to your technical level

### Multi-Language Support
- Switch between English and Urdu using the language toggle
- Access translated content seamlessly

### Hardware Integration
- Specify your RTX workstation or Jetson kit setup
- Get tailored recommendations based on your hardware

## API Testing

Test the backend API endpoints directly:

```bash
# Health check
curl http://localhost:8000/health

# Get all modules
curl http://localhost:8000/api/v1/content/modules

# Test chatbot (requires authentication)
curl -X POST http://localhost:8000/api/v1/chat/query \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your-token" \
  -d '{"query": "What is ROS 2?", "selected_text": ""}'
```

## Troubleshooting

### Common Issues

#### Backend Won't Start
- Ensure Python 3.11+ is installed: `python --version`
- Check that all dependencies are installed: `pip list`
- Verify environment variables are set correctly

#### Frontend Won't Start
- Ensure Node.js 18+ is installed: `node --version`
- Clear npm cache: `npm cache clean --force`
- Delete node_modules and reinstall: `rm -rf node_modules && npm install`

#### API Connection Issues
- Verify backend is running on port 8000
- Check CORS settings in backend
- Ensure frontend proxy is configured correctly

### Need Help?

- Check the full documentation in the `docs/` directory
- Review the API documentation at `http://localhost:8000/docs`
- Look at the project structure and examples

## Next Steps

1. **Explore Curriculum**: Browse through the 13-week program structure
2. **Complete Profile**: Set up your hardware profile for personalized content
3. **Try AI Assistant**: Ask questions about robotics concepts
4. **Join Community**: Participate in discussions and share learnings
5. **Contribute**: Add improvements to the curriculum or platform

## Production Deployment

For production deployment, consider:

- Setting up proper SSL certificates
- Configuring environment-specific settings
- Setting up CI/CD pipelines
- Monitoring and logging solutions
- Database backup strategies

---

That's it! You're now ready to explore the Physical AI & Humanoid Robotics curriculum. Happy learning!