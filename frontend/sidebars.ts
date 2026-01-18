import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  // Manual sidebar structure for the 13-week curriculum
  tutorialSidebar: [
    {
      type: 'category',
      label: 'Getting Started',
      items: ['curriculum/index'],
    },
    {
      type: 'category',
      label: 'Module 1: ROS 2 Foundations (Weeks 1-3)',
      items: [
        'modules/ros2-foundations',
        {
          type: 'link',
          label: 'Week 1: ROS 2 & Node Architecture',
          href: '#', // Placeholder until actual content is created
        },
        {
          type: 'link',
          label: 'Week 2: Communication & Message Passing',
          href: '#', // Placeholder until actual content is created
        },
        {
          type: 'link',
          label: 'Week 3: Packages & Testing',
          href: '#', // Placeholder until actual content is created
        },
      ],
    },
    {
      type: 'category',
      label: 'Module 2: Digital Twin Systems (Weeks 4-6)',
      items: [
        'modules/digital-twin-systems',
        {
          type: 'link',
          label: 'Week 4: Simulation & Physics Modeling',
          href: '#', // Placeholder until actual content is created
        },
        {
          type: 'link',
          label: 'Week 5: Sensors & Perception',
          href: '#', // Placeholder until actual content is created
        },
        {
          type: 'link',
          label: 'Week 6: Control Systems & Feedback',
          href: '#', // Placeholder until actual content is created
        },
      ],
    },
    {
      type: 'category',
      label: 'Module 3: AI-Robot Brain (Weeks 7-10)',
      items: [
        'modules/ai-robot-brain',
        {
          type: 'link',
          label: 'Week 7: ML Fundamentals for Robotics',
          href: '#', // Placeholder until actual content is created
        },
        {
          type: 'link',
          label: 'Week 8: Deep Learning & Neural Networks',
          href: '#', // Placeholder until actual content is created
        },
        {
          type: 'link',
          label: 'Week 9: RL for Robot Control',
          href: '#', // Placeholder until actual content is created
        },
        {
          type: 'link',
          label: 'Week 10: Decision Making & Planning',
          href: '#', // Placeholder until actual content is created
        },
      ],
    },
    {
      type: 'category',
      label: 'Module 4: Vision-Language-Action Models (Weeks 11-13)',
      items: [
        'modules/vla-models',
        {
          type: 'link',
          label: 'Week 11: Computer Vision & Recognition',
          href: '#', // Placeholder until actual content is created
        },
        {
          type: 'link',
          label: 'Week 12: NLP for HRI',
          href: '#', // Placeholder until actual content is created
        },
        {
          type: 'link',
          label: 'Week 13: Advanced VLA Integration',
          href: '#', // Placeholder until actual content is created
        },
      ],
    },
    {
      type: 'category',
      label: 'Capstone Project',
      items: [
        'curriculum/capstone-project',
      ],
    },
    {
      type: 'category',
      label: 'Hardware Guides',
      items: [
        'hardware-guides/rtx-workstations',
        'hardware-guides/jetson-kits',
      ],
    },
  ],
};

export default sidebars;
