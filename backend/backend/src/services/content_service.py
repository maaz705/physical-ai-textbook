from typing import List, Optional
from ..models.course_module import CourseModule, CourseModuleCreate
from ..models.chapter import Chapter, ChapterCreate


class ContentService:
    """
    Service for handling course content operations
    """

    def __init__(self):
        # In a real implementation, this would connect to a database
        self.modules: List[CourseModule] = []
        self.chapters: List[Chapter] = []

    async def create_module(self, module_data: CourseModuleCreate) -> CourseModule:
        """
        Create a new course module
        """
        module = CourseModule(
            **module_data.dict()
        )
        self.modules.append(module)
        return module

    async def get_module_by_id(self, module_id: str) -> Optional[CourseModule]:
        """
        Retrieve a course module by its ID
        """
        for module in self.modules:
            if module.id == module_id:
                return module
        return None

    async def get_all_modules(self) -> List[CourseModule]:
        """
        Retrieve all course modules
        """
        return self.modules

    async def create_chapter(self, chapter_data: ChapterCreate) -> Chapter:
        """
        Create a new chapter
        """
        chapter = Chapter(
            **chapter_data.dict()
        )
        self.chapters.append(chapter)
        return chapter

    async def get_chapter_by_id(self, chapter_id: str) -> Optional[Chapter]:
        """
        Retrieve a chapter by its ID
        """
        for chapter in self.chapters:
            if chapter.id == chapter_id:
                return chapter
        return None

    async def get_chapters_by_module_id(self, module_id: str) -> List[Chapter]:
        """
        Retrieve all chapters for a specific module
        """
        return [chapter for chapter in self.chapters if chapter.module_id == module_id]

    async def update_chapter_content(self, chapter_id: str, new_content: str, user_background: Optional[str] = None) -> Optional[Chapter]:
        """
        Update chapter content with personalization based on user background
        """
        chapter = await self.get_chapter_by_id(chapter_id)
        if chapter:
            # In a real implementation, this would apply personalization based on user background
            chapter.content = new_content
            return chapter
        return None

    async def get_chapter_in_language(self, chapter_id: str, language: str = "en") -> Optional[Chapter]:
        """
        Retrieve a chapter in the specified language (English or Urdu)
        """
        chapter = await self.get_chapter_by_id(chapter_id)
        if not chapter:
            return None

        # Return the chapter with content in the requested language
        if language == "ur" and chapter.content_ur:
            # Create a copy of the chapter with Urdu content
            chapter_copy = chapter.copy()
            chapter_copy.content = chapter.content_ur
            return chapter_copy
        elif language == "en":
            return chapter
        else:
            # If requested language is not available, return English version
            return chapter