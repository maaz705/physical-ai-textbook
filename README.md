# Physical AI & Humanoid Robotics Textbook System

This project implements a comprehensive educational platform for teaching Physical AI and Humanoid Robotics concepts through an interactive textbook system with AI-powered assistance.

## Features

### Core Functionality
- **Interactive Textbook**: Comprehensive 13-week curriculum covering ROS 2, Digital Twins, AI-Robot Brains, and Vision-Language-Action models
- **AI-Powered Assistance**: RAG (Retrieval Augmented Generation) chatbot for answering questions about textbook content
- **Personalization**: Content adaptation based on user's hardware background and technical level
- **Localization**: Support for English and Urdu languages
- **Hardware Integration**: Guidance for RTX workstation and Jetson Orin development kit usage

### 4 Core Modules
1. **ROS 2 Foundations**: Learn the fundamentals of Robot Operating System 2
2. **Digital Twin Systems**: Explore simulation environments and physics modeling
3. **AI-Robot Brain**: Develop intelligent control systems using machine learning
4. **Vision-Language-Action Models**: Implement VLA models for advanced robot capabilities

### Technical Architecture
- **Frontend**: Docusaurus-based web application with React components
- **Backend**: FastAPI with async support for scalable operations
- **Database**: Neon Serverless Postgres for user data
- **Vector Database**: Qdrant Cloud for RAG operations
- **Authentication**: Better-Auth integration for secure access
- **AI Integration**: OpenAI API for RAG chatbot functionality

## Curriculum Structure

### 13-Week Program
- **Weeks 1-3**: ROS 2 Foundations
- **Weeks 4-6**: Digital Twin Systems
- **Weeks 7-10**: AI-Robot Brain
- **Weeks 11-13**: Vision-Language-Action Models

### Capstone Project
Students complete "The Autonomous Humanoid" project integrating all learned concepts into a comprehensive humanoid robot application.

## Hardware Requirements

### Minimum Setup
- **Development Workstation**: RTX 4070 Ti with 12GB VRAM or equivalent
- **Operating System**: Ubuntu 22.04 LTS recommended
- **RAM**: 32GB DDR4 minimum

### Advanced Setup
- **Development Workstation**: RTX 4080/4090 for complex simulations
- **Edge Device**: NVIDIA Jetson Orin NX or AGX Orin for deployment
- **Sensors**: Stereo cameras, IMU, LiDAR for perception

## Installation

### Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### Frontend Setup
```bash
cd frontend
npm install
```

## Environment Variables

### Backend (.env)
```env
DATABASE_URL="postgresql://..."
QDRANT_URL="https://..."
QDRANT_API_KEY="..."
OPENAI_API_KEY="sk-..."
SECRET_KEY="your-secret-key"
```

## Running the Application

### Backend
```bash
cd backend
uvicorn backend.src.main:app --reload --host 0.0.0.0 --port 8000
```

### Frontend
```bash
cd frontend
npm start
```

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User login
- `GET /api/v1/auth/profile` - Get user profile
- `PUT /api/v1/auth/profile` - Update user profile

### Content Management
- `GET /api/v1/content/modules` - Get all course modules
- `GET /api/v1/content/modules/{id}` - Get specific module
- `GET /api/v1/content/chapters/{id}` - Get specific chapter
- `GET /api/v1/content/chapters/{id}/translate?language=en` - Get translated chapter

### RAG Chatbot
- `POST /api/v1/chat/query` - Submit query to RAG chatbot
- `POST /api/v1/chat/session` - Create chat session

### Hardware Profiles
- `GET /api/v1/hardware` - Get user's hardware profile
- `POST /api/v1/hardware` - Create hardware profile
- `PUT /api/v1/hardware` - Update hardware profile

## Frontend Components

### Core Components
- `RAGChatbot`: AI-powered textbook assistant
- `ContentDisplay`: Dynamic content rendering with selection tools
- `AuthComponent`: User registration and login
- `HardwareQuestionnaire`: Hardware profile setup
- `PersonalizationComponent`: Learning preferences
- `TranslationToggle`: Language switching

### Pages
- `/modules`: Course module browser
- `/chapters`: Interactive chapter viewer with chatbot
- `/dashboard`: User profile and progress tracking

## Project Structure

```
├── backend/                 # FastAPI backend
│   ├── src/
│   │   ├── models/         # Pydantic models
│   │   ├── services/       # Business logic
│   │   ├── api/           # API routers
│   │   └── main.py        # Application entry point
├── frontend/               # Docusaurus frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   └── contexts/      # React contexts
├── docs/                   # Curriculum content
│   ├── curriculum/        # Course structure
│   ├── modules/           # Module content
│   └── hardware-guides/   # Hardware documentation
└── specs/                  # Project specifications
```

## Technologies Used

- **Python 3.11+**: Backend development
- **FastAPI**: Modern Python web framework
- **PostgreSQL**: Relational database (via Neon)
- **Qdrant**: Vector database for RAG
- **OpenAI API**: LLM integration
- **Docusaurus**: Static site generator
- **React**: Frontend components
- **TypeScript**: Type-safe frontend development
- **Better-Auth**: Authentication framework

## Development Guidelines

### Backend Development
- Use async/await for all I/O operations
- Follow Pydantic for data validation
- Implement proper error handling with HTTP exceptions
- Use dependency injection for service management

### Frontend Development
- Use TypeScript for type safety
- Follow React best practices (hooks, context, etc.)
- Implement responsive design for all screen sizes
- Use CSS modules for scoped styling

### Content Guidelines
- Structure content with semantic HTML
- Include examples and practical exercises
- Provide clear learning objectives for each section
- Support both English and Urdu content

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built for the 001-physical-ai-textbook hackathon project
- Inspired by advances in Physical AI and Humanoid Robotics
- Designed to make robotics education accessible globally