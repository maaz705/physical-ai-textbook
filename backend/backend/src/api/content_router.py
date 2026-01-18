from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from ..models.course_module import CourseModule, CourseModuleCreate
from ..models.chapter import Chapter, ChapterCreate, ChapterUpdate
from ..services.content_service import ContentService
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials


router = APIRouter(prefix="/content", tags=["Content"])
security = HTTPBearer()
content_service = ContentService()


@router.get("/modules", response_model=List[CourseModule])
async def get_all_modules():
    """
    Get all course modules
    """
    modules = await content_service.get_all_modules()
    return modules


@router.post("/modules", response_model=CourseModule)
async def create_module(module_data: CourseModuleCreate):
    """
    Create a new course module
    """
    module = await content_service.create_module(module_data)
    return module


@router.get("/modules/{module_id}", response_model=CourseModule)
async def get_module(module_id: str):
    """
    Get a specific course module by ID
    """
    module = await content_service.get_module_by_id(module_id)
    if not module:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Module not found"
        )
    return module


@router.get("/modules/{module_id}/chapters", response_model=List[Chapter])
async def get_chapters_by_module(module_id: str):
    """
    Get all chapters for a specific module
    """
    chapters = await content_service.get_chapters_by_module_id(module_id)
    return chapters


@router.post("/modules/{module_id}/chapters", response_model=Chapter)
async def create_chapter(module_id: str, chapter_data: ChapterCreate):
    """
    Create a new chapter for a specific module
    """
    # Set the module_id from the path parameter
    chapter_data_dict = chapter_data.dict()
    chapter_data_dict['module_id'] = module_id

    # Create a new ChapterCreate instance with the module_id
    from ..models.chapter import ChapterCreate
    chapter_data_with_module = ChapterCreate(**chapter_data_dict)

    chapter = await content_service.create_chapter(chapter_data_with_module)
    return chapter


@router.get("/chapters/{chapter_id}", response_model=Chapter)
async def get_chapter(chapter_id: str):
    """
    Get a specific chapter by ID
    """
    chapter = await content_service.get_chapter_by_id(chapter_id)
    if not chapter:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Chapter not found"
        )
    return chapter


@router.put("/chapters/{chapter_id}", response_model=Chapter)
async def update_chapter(chapter_id: str, chapter_update: ChapterUpdate):
    """
    Update a chapter's content (for personalization)
    """
    # In a real implementation, this would update the chapter in the database
    # For now, we'll return a not implemented error
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Update chapter functionality not implemented yet"
    )


@router.get("/chapters/{chapter_id}/personalized", response_model=Chapter)
async def get_personalized_chapter(chapter_id: str, credentials: HTTPAuthorizationCredentials = Depends(security)):
    """
    Get a personalized version of a chapter based on user's background
    """
    # This would typically retrieve the user's profile and customize content
    # For now, we'll return the original chapter
    chapter = await content_service.get_chapter_by_id(chapter_id)
    if not chapter:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Chapter not found"
        )
    return chapter


@router.get("/chapters/{chapter_id}/translate", response_model=Chapter)
async def get_translated_chapter(chapter_id: str, language: str = "en", credentials: HTTPAuthorizationCredentials = Depends(security)):
    """
    Get a chapter translated to the specified language (en or ur)
    """
    chapter = await content_service.get_chapter_in_language(chapter_id, language)
    if not chapter:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Chapter not found"
        )
    return chapter