"""
Utilities for translation functionality
"""

def detect_language(text: str) -> str:
    """
    Detect the language of the given text
    """
    # In a real implementation, this would use a language detection library
    # For now, we return 'en' as default
    return 'en'


def validate_translation_request(source_lang: str, target_lang: str) -> bool:
    """
    Validate if the translation request is valid
    """
    supported_languages = ['en', 'ur']

    if source_lang not in supported_languages:
        return False

    if target_lang not in supported_languages:
        return False

    return source_lang != target_lang


def preprocess_text_for_translation(text: str) -> str:
    """
    Preprocess text before sending for translation
    """
    # Remove extra whitespaces
    processed_text = ' '.join(text.split())

    # In a real implementation, you might want to handle special characters,
    # normalize text, etc.

    return processed_text


def postprocess_translated_text(text: str) -> str:
    """
    Post-process translated text
    """
    # In a real implementation, you might want to fix formatting,
    # handle special characters, etc.

    return text.strip()