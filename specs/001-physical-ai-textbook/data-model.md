# Data Model: Physical AI & Humanoid Robotics Textbook System

## Entities

### User
**Description**: Represents a student or educator using the platform
**Fields**:
- id: UUID (primary key)
- email: String (unique, required)
- name: String (required)
- created_at: DateTime (required)
- updated_at: DateTime (required)
- hardware_background: String (optional, enum: ["beginner", "intermediate", "advanced"])
- software_background: String (optional, enum: ["none", "basic", "intermediate", "advanced"])
- preferred_language: String (default: "en", enum: ["en", "ur"])
- last_accessed_module: Integer (optional)
- progress_tracking: JSON (optional, stores module/chapter completion status)

**Validation Rules**:
- Email must be valid email format
- Name must be 2-50 characters
- Background fields must be from allowed enum values

### Course Module
**Description**: One of the 4 core topics (ROS 2, Digital Twins, AI-Robot Brain, VLA)
**Fields**:
- id: UUID (primary key)
- title: String (required)
- description: Text (required)
- module_number: Integer (required, 1-4)
- weeks_duration: Integer (required, number of weeks)
- prerequisites: Array[String] (optional, list of module IDs)
- created_at: DateTime (required)
- updated_at: DateTime (required)

**Validation Rules**:
- Title must be 5-100 characters
- Module number must be between 1-4
- Weeks duration must be positive

### Chapter
**Description**: Individual sections within modules that can be personalized and translated
**Fields**:
- id: UUID (primary key)
- title: String (required)
- content: Text (required, in English)
- content_ur: Text (optional, Urdu translation)
- module_id: UUID (foreign key to Course Module, required)
- chapter_number: Integer (required within module)
- estimated_reading_time: Integer (minutes, required)
- difficulty_level: String (enum: "beginner", "intermediate", "advanced")
- created_at: DateTime (required)
- updated_at: DateTime (required)

**Validation Rules**:
- Title must be 5-100 characters
- Content must be provided in English
- Chapter number must be positive
- Difficulty level must be from allowed enum values

### RAG Chatbot Session
**Description**: Represents an interaction session where users can ask questions about the content
**Fields**:
- id: UUID (primary key)
- user_id: UUID (foreign key to User, required)
- query: Text (required)
- response: Text (required)
- context_used: Text (optional, portion of content that informed the response)
- timestamp: DateTime (required)
- is_helpful: Boolean (optional, for feedback)

**Validation Rules**:
- Query and response must not be empty
- Timestamp must be current or past

### Hardware Profile
**Description**: Information about user's available hardware to tailor exercises and examples
**Fields**:
- id: UUID (primary key)
- user_id: UUID (foreign key to User, required)
- workstation_gpu: String (optional, e.g. "RTX 4070 Ti", "RTX 4090")
- workstation_specs: JSON (optional, CPU, RAM, storage details)
- edge_kit_type: String (optional, e.g. "Jetson Orin Nano", "Jetson Orin NX")
- edge_kit_specs: JSON (optional, detailed specs)
- access_level: String (enum: "none", "simulation", "physical_hardware")
- created_at: DateTime (required)
- updated_at: DateTime (required)

**Validation Rules**:
- Access level must be from allowed enum values
- GPU specs must match known hardware specifications