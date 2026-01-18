import React from 'react';
import FloatingChatbot from '../components/FloatingChatbot';

// Default wrapper component, you can customize it
export default function Root({ children }) {
  return (
    <>
      {children}
      <FloatingChatbot />
    </>
  );
}