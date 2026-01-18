# ADR-0004: Course Technical Standards - ROS 2, Gazebo, NVIDIA Isaac

> **Scope**: Document decision clusters, not individual technology choices. Group related decisions that work together (e.g., "Frontend Stack" not separate ADRs for framework, styling, deployment).

- **Status:** Accepted
- **Date:** 2026-01-18
- **Feature:** 001-physical-ai-textbook
- **Context:** The curriculum focuses on these industry-standard tools for humanoid robotics and digital twins, providing students with practical experience using technologies prevalent in the robotics industry.

<!-- Significance checklist (ALL must be true to justify this ADR)
     1) Impact: Long-term consequence for architecture/platform/security?
     2) Alternatives: Multiple viable options considered with tradeoffs?
     3) Scope: Cross-cutting concern (not an isolated detail)?
     If any are false, prefer capturing as a PHR note instead of an ADR. -->

## Decision

- ROS Distribution: ROS 2 Humble Hawksbill (long-term support) for robotics middleware
- Simulation Platform: Gazebo Garden for physics simulation and digital twin creation
- NVIDIA Platform: Isaac Sim for advanced robot simulation and AI training
- Path Planning: Navigation2 stack for autonomous navigation capabilities
- Computer Vision: OpenCV integration with ROS 2 for perception tasks
- Hardware Abstraction: ros2_control for standardized hardware interfaces

## Consequences

### Positive

- Industry-standard tools that align with market demand and job requirements
- Extensive documentation and community support for learning resources
- Comprehensive ecosystem for developing complex robotics applications
- Compatibility with real hardware for sim-to-real transfer learning
- Integration with NVIDIA's AI and robotics tools for advanced capabilities
- Long-term support through LTS distributions ensuring stability

### Negative

- Steep learning curve for beginners due to complex architecture and concepts
- Resource-intensive requirements for running simulations efficiently
- Complex debugging and development environment setup
- Rapid evolution of some components may lead to breaking changes
- Licensing considerations for commercial applications

## Alternatives Considered

Alternative Stack A: ROS 1 with Gazebo Classic
- Pros: Mature ecosystem, extensive tutorials and examples available
- Cons: End-of-life support, lacks modern features, no Python 3 support

Alternative Stack B: PyBullet with custom Python frameworks
- Pros: Lighter weight, pure Python ecosystem, easier to set up
- Cons: Less realistic physics, limited industrial relevance, fewer robotics-specific tools

Alternative Stack C: Webots with custom controllers
- Pros: User-friendly interface, good for education, cross-platform
- Cons: Less industry adoption, limited integration with professional tools, licensing costs for commercial use

## References

- Feature Spec: specs/001-physical-ai-textbook/spec.md
- Implementation Plan: specs/001-physical-ai-textbook/plan.md
- Related ADRs: ADR-0005
- Evaluator Evidence: specs/001-physical-ai-textbook/research.md
