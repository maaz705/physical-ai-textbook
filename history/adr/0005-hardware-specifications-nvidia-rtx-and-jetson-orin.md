# ADR-0005: Hardware Specifications - NVIDIA RTX and Jetson Orin

> **Scope**: Document decision clusters, not individual technology choices. Group related decisions that work together (e.g., "Frontend Stack" not separate ADRs for framework, styling, deployment).

- **Status:** Accepted
- **Date:** 2026-01-18
- **Feature:** 001-physical-ai-textbook
- **Context:** Necessary to handle heavy computational loads like physics simulation (Isaac Sim) and Vision-Language-Action (VLA) models, ensuring students have adequate hardware for running robotics simulations and AI workloads.

<!-- Significance checklist (ALL must be true to justify this ADR)
     1) Impact: Long-term consequence for architecture/platform/security?
     2) Alternatives: Multiple viable options considered with tradeoffs?
     3) Scope: Cross-cutting concern (not an isolated detail)?
     If any are false, prefer capturing as a PHR note instead of an ADR. -->

## Decision

- Digital Twin Workstation: NVIDIA RTX 4070 Ti (12GB VRAM minimum) for physics simulation
- GPU Computing: RTX 4080/4090 for intensive AI/ML workloads and Isaac Sim
- Edge Kit: Jetson Orin Nano for robotics deployment and edge AI
- Alternative Edge: Jetson Orin NX for higher performance edge applications
- Memory Requirements: 32GB system RAM minimum for smooth simulation
- Storage: SSD with 1TB capacity for datasets, models, and simulation environments

## Consequences

### Positive

- Adequate computational power for running complex physics simulations and AI models
- Compatible with NVIDIA's robotics and AI development tools ecosystem
- Sufficient VRAM for running Isaac Sim and VLA models simultaneously
- Proper hardware for sim-to-real transfer learning experiences
- Future-proof investment that supports advanced robotics applications
- Industry-relevant hardware that aligns with professional robotics development

### Negative

- Significant financial investment required for students and institutions
- Power consumption and cooling requirements for high-end GPUs
- Potential accessibility issues for students with limited financial resources
- Hardware maintenance and upgrade complexity
- Vendor lock-in to NVIDIA's ecosystem and toolchain

## Alternatives Considered

Alternative Stack A: AMD Radeon Pro + ROCm ecosystem
- Pros: Potentially lower cost, open-source driver support
- Cons: Limited compatibility with NVIDIA's robotics tools (Isaac Sim, CUDA-dependent libraries), less mature ecosystem for robotics

Alternative Stack B: Intel Arc + oneAPI
- Pros: Alternative to NVIDIA, growing ecosystem
- Cons: Limited support for robotics simulation tools, less proven in AI/ML workflows

Alternative Stack C: Cloud-based solutions (AWS G4dn, G5 instances)
- Pros: No upfront hardware investment, scalable resources, managed infrastructure
- Cons: Ongoing subscription costs, network dependency, limited offline access for students

## References

- Feature Spec: specs/001-physical-ai-textbook/spec.md
- Implementation Plan: specs/001-physical-ai-textbook/plan.md
- Related ADRs: ADR-0004
- Evaluator Evidence: specs/001-physical-ai-textbook/research.md
