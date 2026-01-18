---
title: Introduction to ROS 2 - The Robotic Nervous System
sidebar_label: Introduction to ROS 2
---

# Introduction to ROS 2 - The Robotic Nervous System

## Overview

Robot Operating System 2 (ROS 2) serves as the nervous system of robotic applications, providing a framework for communication, coordination, and control between different software components. Just as the biological nervous system enables communication between different parts of an organism, ROS 2 facilitates seamless interaction between sensors, actuators, and computational units in a robotic system.

## Learning Objectives

By the end of this module, you will be able to:
- Explain the core concepts of ROS 2 and its role in robotics
- Create and manage nodes, topics, and services
- Implement message passing and communication patterns
- Understand the architecture of ROS 2 and its advantages over ROS 1

## Table of Contents

1. [What is ROS 2?](#what-is-ros-2)
2. [Nodes and Communication](#nodes-and-communication)
3. [Topics and Services](#topics-and-services)
4. [Messages and Actions](#messages-and-actions)
5. [ROS 2 Ecosystem](#ros-2-ecosystem)

## What is ROS 2?

ROS 2 is the next generation of the Robot Operating System, designed to address the limitations of ROS 1 and provide enhanced capabilities for modern robotics applications. Unlike ROS 1, which was built on a distributed computing model, ROS 2 leverages DDS (Data Distribution Service) for communication, providing better real-time capabilities, security, and scalability.

### Key Features of ROS 2

- **Real-time support**: Enhanced determinism for time-critical applications
- **Security**: Built-in security features for safe robot operation
- **Cross-platform compatibility**: Runs on Linux, Windows, macOS, and real-time systems
- **Improved architecture**: Better modularity and maintainability

## Nodes and Communication

In ROS 2, nodes are the fundamental building blocks of a robot application. Each node typically encapsulates a specific functionality, such as sensor data processing, motion planning, or actuator control.

### Creating a Node

```python
import rclpy
from rclpy.node import Node

class MinimalPublisher(Node):

    def __init__(self):
        super().__init__('minimal_publisher')
        self.publisher_ = self.create_publisher(String, 'topic', 10)
        timer_period = 0.5  # seconds
        self.timer = self.create_timer(timer_period, self.timer_callback)
        self.i = 0

    def timer_callback(self):
        msg = String()
        msg.data = 'Hello World: %d' % self.i
        self.publisher_.publish(msg)
        self.get_logger().info('Publishing: "%s"' % msg.data)
        self.i += 1
```

## Topics and Services

ROS 2 supports two primary communication patterns:

1. **Topics**: Unidirectional communication using publish-subscribe pattern
2. **Services**: Bidirectional communication using request-response pattern

### Topic Communication

Topics enable asynchronous, decoupled communication between nodes. Publishers send messages to topics, and subscribers receive messages from topics. This pattern is ideal for sensor data distribution, status updates, and other continuous data streams.

### Service Communication

Services provide synchronous, request-response communication. A client sends a request to a service, and the service processes the request and returns a response. This pattern is suitable for operations that require acknowledgment or result data.

## Messages and Actions

Beyond topics and services, ROS 2 also supports Actions for long-running tasks that may provide feedback and can be canceled.

### Action Characteristics

- **Goal**: Request sent to start an action
- **Feedback**: Periodic updates during execution
- **Result**: Final outcome when the action completes

## ROS 2 Ecosystem

The ROS 2 ecosystem includes a rich set of tools, libraries, and packages that facilitate robot development:

- **Rviz**: 3D visualization tool for robot data
- **Gazebo**: Physics-based simulation environment
- **Navigation2**: Advanced path planning and navigation stack
- **MoveIt**: Motion planning framework
- **ros2_control**: Hardware abstraction and control framework

## Practical Exercise

Create a simple publisher-subscriber pair in ROS 2 that demonstrates topic communication between two nodes. The publisher should broadcast the robot's pose, and the subscriber should log received poses to the console.

## Summary

ROS 2 serves as the foundational communication framework for modern robotics applications. Understanding its core concepts is crucial for developing sophisticated robotic systems that can effectively coordinate multiple components and achieve complex behaviors.

## Resources

- [Official ROS 2 Documentation](https://docs.ros.org/en/humble/)
- [ROS 2 Tutorials](https://docs.ros.org/en/humble/Tutorials.html)
- [DDS Specification](https://www.omg.org/spec/DDS/)