import React from 'react';

const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="w-16 h-16 border-8 border-gray-200 border-t-8 border-t-orange rounded-full animate-spin"></div>
    </div>
  );
};

export default Loading;
