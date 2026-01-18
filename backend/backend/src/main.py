from fastapi import FastAPI
from .api.auth_router import router as auth_router
from .api.content_router import router as content_router
from .api.rag_router import router as rag_router
from .api.hardware_router import router as hardware_router
from fastapi.middleware.cors import CORSMiddleware


def create_app() -> FastAPI:
    app = FastAPI(
        title="Physical AI & Humanoid Robotics Textbook API",
        description="Backend API for the Physical AI & Humanoid Robotics textbook system",
        version="1.0.0"
    )

    # Add CORS middleware
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],  # In production, specify the frontend domain
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # Include API routers
    app.include_router(auth_router, prefix="/api/v1")
    app.include_router(content_router, prefix="/api/v1")
    app.include_router(rag_router, prefix="/api/v1")
    app.include_router(hardware_router, prefix="/api/v1")

    @app.get("/")
    def read_root():
        return {"message": "Welcome to the Physical AI & Humanoid Robotics Textbook API"}

    @app.get("/health")
    def health_check():
        return {"status": "healthy", "service": "Physical AI & Humanoid Robotics Textbook API"}

    return app


app = create_app()


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)