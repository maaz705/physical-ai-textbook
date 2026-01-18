# ADR-0003: Authentication & Personalization - Better-Auth Implementation

> **Scope**: Document decision clusters, not individual technology choices. Group related decisions that work together (e.g., "Frontend Stack" not separate ADRs for framework, styling, deployment).

- **Status:** Accepted
- **Date:** 2026-01-18
- **Feature:** 001-physical-ai-textbook
- **Context:** Required for secure signup/signin and to capture user background data for content personalization, enabling adaptive learning experiences based on user's hardware and software background.

<!-- Significance checklist (ALL must be true to justify this ADR)
     1) Impact: Long-term consequence for architecture/platform/security?
     2) Alternatives: Multiple viable options considered with tradeoffs?
     3) Scope: Cross-cutting concern (not an isolated detail)?
     If any are false, prefer capturing as a PHR note instead of an ADR. -->

## Decision

- Authentication Library: Better-Auth for user management
- User Profiles: Store hardware and software background information
- Personalization Engine: Adaptive content delivery based on user profile
- Session Management: Secure JWT-based session handling
- Privacy Controls: User data protection and consent management
- Progress Tracking: Learning progress and content adaptation metrics

## Consequences

### Positive

- Developer-friendly authentication solution with good security practices out-of-box
- Easy integration with the Docusaurus frontend and FastAPI backend
- Supports multiple authentication providers for future expansion
- Built-in security features like password hashing and session management
- Enables personalized learning experiences based on user background
- Facilitates adaptive content delivery for different skill levels

### Negative

- Additional dependency that increases system complexity
- Potential vendor lock-in to Better-Auth's specific implementation
- Need to maintain user data privacy and comply with regulations
- Additional complexity in testing authentication flows
- Learning curve for team members unfamiliar with the library

## Alternatives Considered

Alternative Stack A: NextAuth.js
- Pros: Well-established, strong community support, extensive documentation
- Cons: Only suitable for Next.js applications, not compatible with Docusaurus setup

Alternative Stack B: Custom authentication with bcrypt and JWT
- Pros: Full control over authentication flow, no external dependencies
- Cons: Increased development time, potential security vulnerabilities if not implemented properly, more maintenance burden

Alternative Stack C: Clerk
- Pros: Feature-rich, good for user management, includes UI components
- Cons: Potentially more expensive for open-source project, heavier dependency

## References

- Feature Spec: specs/001-physical-ai-textbook/spec.md
- Implementation Plan: specs/001-physical-ai-textbook/plan.md
- Related ADRs: ADR-0001, ADR-0002
- Evaluator Evidence: specs/001-physical-ai-textbook/research.md
