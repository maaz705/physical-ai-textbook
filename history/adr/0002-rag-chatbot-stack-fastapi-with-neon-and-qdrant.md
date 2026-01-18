# ADR-0002: RAG Chatbot Stack - FastAPI with Neon and Qdrant

> **Scope**: Document decision clusters, not individual technology choices. Group related decisions that work together (e.g., "Frontend Stack" not separate ADRs for framework, styling, deployment).

- **Status:** Accepted
- **Date:** 2026-01-18
- **Feature:** 001-physical-ai-textbook
- **Context**: Necessary to handle Retrieval-Augmented Generation for the textbook content and user-selected text with support for OpenAI Agents and ChatKit SDKs for the chatbot interface.

<!-- Significance checklist (ALL must be true to justify this ADR)
     1) Impact: Long-term consequence for architecture/platform/security?
     2) Alternatives: Multiple viable options considered with tradeoffs?
     3) Scope: Cross-cutting concern (not an isolated detail)?
     If any are false, prefer capturing as a PHR note instead of an ADR. -->

## Decision

- Framework: FastAPI 0.104.x with Pydantic v2
- Primary Database: Neon Serverless Postgres for user data and content metadata
- Vector Database: Qdrant Cloud Free Tier for RAG operations and embeddings
- AI Integration: OpenAI SDK for LLM interactions
- APIs: OpenAI Agents and ChatKit SDKs for chatbot interface
- Async Processing: Built-in async/await support for efficient RAG operations
- Embeddings: OpenAI embeddings API for document vectorization

## Consequences

### Positive

- High performance with async/await support and automatic API documentation
- Strong typing with Pydantic for improved development experience
- Serverless database scales automatically with usage
- Specialized vector database optimized for similarity search operations
- Mature ecosystem for AI/ML integration
- Efficient handling of RAG operations with streaming responses

### Negative

- Dependency on external cloud services (Neon, Qdrant, OpenAI) creating potential vendor lock-in
- Additional complexity managing multiple database systems (PostgreSQL + Qdrant)
- Potential cost scaling with increased usage of vector database and AI APIs
- Network latency between multiple services affecting response times

## Alternatives Considered

Alternative Stack A: Express.js with MongoDB and Pinecone
- Pros: Familiar JavaScript ecosystem, good documentation, strong community
- Cons: Lower performance compared to FastAPI, no automatic API documentation, less type safety

Alternative Stack B: Django with PostgreSQL and FAISS
- Pros: Batteries-included framework, ORM for easier database operations, self-hosted vector search
- Cons: Heavier framework, less suitable for API-only applications, requires more infrastructure management

Alternative Stack C: Flask with SQLite and custom vector search
- Pros: Lightweight, simple to set up, minimal dependencies
- Cons: Lower performance, no built-in async support, requires custom vector search implementation

## References

- Feature Spec: specs/001-physical-ai-textbook/spec.md
- Implementation Plan: specs/001-physical-ai-textbook/plan.md
- Related ADRs: ADR-0001, ADR-0003
- Evaluator Evidence: specs/001-physical-ai-textbook/research.md
