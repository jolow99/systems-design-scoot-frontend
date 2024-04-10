import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm flex justify-center items-center p-4 w-full">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full flex flex-col w-9/12 max-w-[750px] relative">
        <button
          onClick={onClose}
          className="absolute top-0 right-0 p-2 m-6 bg-transparent text-gray-700 font-semibold rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
          aria-label="Close"
        >
          X
        </button>
        <div className="p-4 flex-1 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;