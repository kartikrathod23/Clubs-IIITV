import React from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose} 
    >
      <div
        className="bg-white w-full h-auto sm:w-3/4 md:w-1/2 lg:w-1/3 rounded-lg shadow-lg p-6 relative overflow-auto"
        onClick={(e) => e.stopPropagation()} 
      >
        
        <button
          className="absolute top-2 right-2 bg-gray-300 text-black rounded-full px-2 py-1 hover:bg-red-600 hover:text-white"
          onClick={onClose}
        >
          X
        </button>
        {children}
      </div>
    </div>,
    document.getElementById('modal-root') 
  );
};

export default Modal;
