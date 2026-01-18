# Quickstart Guide: Physical AI & Humanoid Robotics Textbook System

## Development Setup

### Prerequisites
- Node.js 18+ (for Docusaurus frontend)
- Python 3.11+ (for FastAPI backend)
- Git
- Docker (optional, for local development)

### Frontend Setup (Docusaurus)
```bash
# Clone the repository
git clone <repo-url>
cd <repo-name>

# Install frontend dependencies
cd frontend
npm install

# Start the development server
npm start
```

The frontend will be available at http://localhost:3000

### Backend Setup (FastAPI)
```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set environment variables
cp .env.example .env
# Edit .env with your configuration

# Start the backend server
uvicorn src.main:app --reload --port 8000
```

The backend API will be available at http://localhost:8000

### Environment Variables
Create `.env` files for both frontend and backend:

**Backend (.env)**:
```bash
DATABASE_URL=postgresql://user:password@localhost/dbname
QDRANT_URL=https://your-qdrant-cluster.qdrant.tech
QDRANT_API_KEY=your-qdrant-api-key
OPENAI_API_KEY=your-openai-api-key
JWT_SECRET_KEY=your-jwt-secret-key
```

**Frontend (.env)**:
```bash
BACKEND_API_URL=http://localhost:8000
```

## Running the Application

### Development Mode
```bash
# Terminal 1: Start backend
cd backend
source venv/bin/activate
uvicorn src.main:app --reload

# Terminal 2: Start frontend
cd frontend
npm start
```

### Production Build
```bash
# Build frontend
cd frontend
npm run build

# Serve backend
cd backend
source venv/bin/activate
uvicorn src.main:app --host 0.0.0.0 --port 8000
```

## Key Components

### 1. Content Structure
Course content is organized in the `docs/` directory:
```
docs/
├── modules/             # 4 core modules
│   ├── module-1-ros/
│   ├── module-2-digital-twins/
│   ├── module-3-ai-brain/
│   └── module-4-vla/
├── hardware-guides/     # RTX and Jetson documentation
└── curriculum/          # 13-week schedule
```

### 2. API Endpoints
- Authentication: `/api/auth/*`
- Content: `/api/modules/*`, `/api/chapters/*`
- Chatbot: `/api/chat/query`
- User Profile: `/api/profile/*`

### 3. Internationalization
Urdu translations are stored in the `i18n/` directory:
```
i18n/
├── en/                 # English content
└── ur/                 # Urdu translations
```

## Testing

### Backend Tests
```bash
cd backend
source venv/bin/activate
pytest
```

### Frontend Tests
```bash
cd frontend
npm test
```

### E2E Tests
```bash
cd frontend
npm run e2e
```

## Deployment

### GitHub Pages (Frontend)
The Docusaurus frontend is configured for GitHub Pages deployment:

```bash
# Build and deploy to GitHub Pages
npm run deploy
```

### Backend Deployment
The FastAPI backend can be deployed to platforms like:
- Railway
- Render
- AWS EC2/App Runner
- Google Cloud Run

### Environment Configuration for Deployment
Update environment variables for production:
- Set `NODE_ENV=production` for frontend
- Set `ENVIRONMENT=production` for backend
- Configure production database and Qdrant connections
- Set up SSL certificates for secure connections