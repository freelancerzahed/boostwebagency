import React from 'react';

export default function LoadingSpinner() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-0.5">
      <div className="h-full bg-gradient-to-r from-pink-500 to-blue-600 animate-pulse"></div>
    </div>
  );
}
