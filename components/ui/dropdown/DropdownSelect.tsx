import React, { useState, useRef, ReactNode, useEffect } from 'react';

interface DropdownSelectProps {
  buttonText: string;
  icon: ReactNode;
  children: ReactNode;
}

export const DropdownSelect: React.FC<DropdownSelectProps> = ({ buttonText, icon, children }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(true);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const handleButtonClick = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const closeDropdown = (event: Event) => {
      if (buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    return () => {
      document.removeEventListener('click', closeDropdown);
    };
  }, [isDropdownOpen]);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        onClick={handleButtonClick}
        className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
      >
            { icon }
            <span className="flex-1 ml-3 text-left whitespace-nowrap">{ buttonText }</span>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>                    
      </button>

      {isDropdownOpen && (
        <ul className="top-full left-0 py-2 space-y-2 divide-y divide-gray-100 dark:divide-gray-600 transition duration-300">
          {children}
        </ul>
      )}
    </>
  );
};
