# Module 1: ROS 2 Foundations

## Overview

This module provides the foundational knowledge required to work with Robot Operating System 2 (ROS 2). Students will learn the core concepts, architecture, and best practices for developing robotic applications using ROS 2.

## Learning Objectives

By the end of this module, students will be able to:

- Explain the ROS 2 architecture and its key components
- Create and manage ROS 2 nodes for different robot functions
- Implement communication patterns using topics, services, and actions
- Design and build packages for modular robot applications
- Test and debug ROS 2 applications effectively

## Week 1: Introduction to ROS 2 and Node Architecture

### Topics Covered
- ROS 2 architecture overview
- Nodes and processes
- Client Library implementations
- Quality of Service (QoS) settings

### Learning Activities
- Install ROS 2 development environment
- Create your first ROS 2 node
- Understand lifecycle nodes
- Practice with basic publisher/subscriber patterns

### Assignments
- Build a simple publisher node that generates sensor data
- Create a subscriber node that processes and displays the data
- Experiment with different QoS profiles

## Week 2: Communication Patterns and Message Passing

### Topics Covered
- Topics and message passing
- Services and request/reply patterns
- Actions for goal-oriented communication
- Parameters and configuration management

### Learning Activities
- Implement custom message types
- Create service clients and servers
- Work with action servers for complex tasks
- Manage parameters dynamically

### Assignments
- Build a robot controller using service calls
- Implement an action server for navigation goals
- Create a parameter management system

## Week 3: Package Management and Testing Frameworks

### Topics Covered
- Package structure and organization
- Build systems (CMake and colcon)
- Testing frameworks (gtest, launch tests)
- Best practices for package development

### Learning Activities
- Create a complete ROS 2 package
- Implement unit and integration tests
- Use launch files for system startup
- Practice debugging techniques

### Assignments
- Develop a reusable robot component as a package
- Write comprehensive tests for your package
- Create launch files for different scenarios
- Document your package using ROS 2 conventions

## Hardware Requirements

- Development workstation with Ubuntu 22.04
- ROS 2 Humble Hawksbill installation
- Basic sensors for practical exercises (optional)

## Resources

- [ROS 2 Documentation](https://docs.ros.org/en/humble/)
- Sample code repositories
- Community forums and support
- Video tutorials for hands-on practice

## Assessment

- Weekly quizzes on theoretical concepts
- Practical assignments demonstrating implementation skills
- Peer review of code quality and documentation
- Final module project integrating all concepts