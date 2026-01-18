# API Contracts: Physical AI & Humanoid Robotics Textbook System

## Authentication API

### POST /api/auth/register
**Description**: Register a new user account
**Request Body**:
```json
{
  "email": "string (required, valid email)",
  "password": "string (required, min 8 chars)",
  "name": "string (required, 2-50 chars)",
  "hardware_background": "enum (optional: beginner|intermediate|advanced)",
  "software_background": "enum (optional: none|basic|intermediate|advanced)"
}
```
**Response**:
```json
{
  "success": "boolean",
  "user": {
    "id": "UUID",
    "email": "string",
    "name": "string",
    "created_at": "DateTime"
  },
  "token": "string (JWT)"
}
```

### POST /api/auth/login
**Description**: Login to existing account
**Request Body**:
```json
{
  "email": "string (required)",
  "password": "string (required)"
}
```
**Response**:
```json
{
  "success": "boolean",
  "user": {
    "id": "UUID",
    "email": "string",
    "name": "string",
    "hardware_background": "string",
    "software_background": "string"
  },
  "token": "string (JWT)"
}
```

## Content API

### GET /api/modules
**Description**: Get all course modules
**Response**:
```json
{
  "modules": [
    {
      "id": "UUID",
      "title": "string",
      "description": "string",
      "module_number": "integer",
      "weeks_duration": "integer",
      "prerequisites": "array of UUIDs"
    }
  ]
}
```

### GET /api/modules/{moduleId}/chapters
**Description**: Get chapters for a specific module
**Response**:
```json
{
  "chapters": [
    {
      "id": "UUID",
      "title": "string",
      "chapter_number": "integer",
      "estimated_reading_time": "integer",
      "difficulty_level": "enum (beginner|intermediate|advanced)"
    }
  ]
}
```

### GET /api/chapters/{chapterId}
**Description**: Get chapter content (personalized based on user profile)
**Headers**: Authorization: Bearer {token}
**Query Params**: lang=en|ur (optional, defaults to user preference)
**Response**:
```json
{
  "chapter": {
    "id": "UUID",
    "title": "string",
    "content": "string (personalized based on user profile)",
    "module_id": "UUID",
    "chapter_number": "integer",
    "estimated_reading_time": "integer",
    "difficulty_level": "enum (beginner|intermediate|advanced)"
  }
}
```

## RAG Chatbot API

### POST /api/chat/query
**Description**: Submit a query to the RAG chatbot
**Headers**: Authorization: Bearer {token}
**Request Body**:
```json
{
  "query": "string (required)",
  "context": "string (optional, selected text from content)",
  "module_id": "UUID (optional, to narrow context)",
  "chapter_id": "UUID (optional, to narrow context)"
}
```
**Response**:
```json
{
  "response": "string",
  "sources": [
    {
      "title": "string",
      "url": "string",
      "relevance_score": "float"
    }
  ],
  "session_id": "UUID"
}
```

## User Profile API

### GET /api/profile
**Description**: Get current user profile
**Headers**: Authorization: Bearer {token}
**Response**:
```json
{
  "user": {
    "id": "UUID",
    "email": "string",
    "name": "string",
    "hardware_background": "string",
    "software_background": "string",
    "preferred_language": "string",
    "last_accessed_module": "integer",
    "progress_tracking": "JSON object"
  }
}
```

### PUT /api/profile
**Description**: Update user profile information
**Headers**: Authorization: Bearer {token}
**Request Body**:
```json
{
  "name": "string (optional)",
  "hardware_background": "enum (optional: beginner|intermediate|advanced)",
  "software_background": "enum (optional: none|basic|intermediate|advanced)",
  "preferred_language": "enum (optional: en|ur)",
  "progress_tracking": "JSON object (optional)"
}
```
**Response**:
```json
{
  "success": "boolean",
  "user": {
    "id": "UUID",
    "email": "string",
    "name": "string",
    "hardware_background": "string",
    "software_background": "string",
    "preferred_language": "string",
    "progress_tracking": "JSON object"
  }
}
```

### PUT /api/profile/hardware
**Description**: Update hardware profile information
**Headers**: Authorization: Bearer {token}
**Request Body**:
```json
{
  "workstation_gpu": "string (optional)",
  "workstation_specs": "JSON object (optional)",
  "edge_kit_type": "string (optional)",
  "edge_kit_specs": "JSON object (optional)",
  "access_level": "enum (none|simulation|physical_hardware)"
}
```
**Response**:
```json
{
  "success": "boolean",
  "hardware_profile": {
    "id": "UUID",
    "workstation_gpu": "string",
    "workstation_specs": "JSON object",
    "edge_kit_type": "string",
    "edge_kit_specs": "JSON object",
    "access_level": "enum (none|simulation|physical_hardware)"
  }
}
```