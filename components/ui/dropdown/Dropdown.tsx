'use client'

import React, { useState, useEffect, useRef, ReactNode } from 'react';

interface DropdownProps {
  buttonText: string;
  children: any;
  icon?: ReactNode;
}

export const Dropdown: React.FC<DropdownProps> = ({ buttonText, icon, children }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, right: 0 });
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const handleButtonClick = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const calculateDropdownPosition = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const top = rect.bottom + window.scrollY;
      const right = window.innerWidth - rect.right;

      console.log({ top, right })
      setDropdownPosition({ top, right });
    }
  };

  useEffect(() => {
    if (isDropdownOpen) {
      calculateDropdownPosition();
    }
  }, [isDropdownOpen]);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        onClick={handleButtonClick}
        className="p-2 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700"
      >
        <span className="sr-only">{buttonText}</span>
        { icon }
      </button>

      {isDropdownOpen && (
        <div
          style={{ top: dropdownPosition.top, right: dropdownPosition.right }}
          className="absolute z-50 w-68 max-w-sm my-4 overflow-hidden text-base list-none bg-white divide-y divide-gray-100 rounded shadow-lg dark:divide-gray-600 dark:bg-gray-700" id="notification-dropdown"
        >
          {children}
        </div>
      )}
    </>
  );
};

