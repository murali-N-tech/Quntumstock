import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="text-center">
    <h1 className="text-6xl font-bold">404</h1>
    <p className="text-2xl mt-4">Page Not Found</p>
    <p className="text-gray-600 mt-2">The page you are looking for does not exist.</p>
    <Link to="/" className="mt-6 inline-block bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700">
      Go to Homepage
    </Link>
  </div>
);

export default NotFound;