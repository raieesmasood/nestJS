import React from 'react';

const NoPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800">404 - Page Not Found</h1>
      <p className="text-lg text-gray-600 mt-4">
        Sorry, the page you're looking for doesn't exist.
      </p>
    </div>
  );
}

export default NoPage;
