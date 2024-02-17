import React, { useState, useRef, useEffect } from 'react';
import { createPopper } from '@popperjs/core';

export default function Popover({ children, content,x=10,y=10 }) {
  const [showPopover, setShowPopover] = useState(false);
  const buttonRef = useRef(null);
  const popoverRef = useRef(null);
  const popperInstance = useRef(null);

  const togglePopover = () => {
    setShowPopover(prev => !prev);
  };

  const handleClickOutside = (event) => {
    if (popoverRef.current && !popoverRef.current.contains(event.target) &&
        buttonRef.current && !buttonRef.current.contains(event.target)) {
      setShowPopover(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (buttonRef.current && popoverRef.current) {
      popperInstance.current = createPopper(buttonRef.current, popoverRef.current, {
        placement:"top",
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [x,y],
            },
          },
        ],
      });
    }
    return () => {
      if (popperInstance.current) {
        popperInstance.current.destroy();
      }
    };
  }, [showPopover]);

  return (
    <div className="relative">
      <button ref={buttonRef} onClick={togglePopover}>
        {children}
      </button>

      {showPopover && (
        <div ref={popoverRef} className={`w-full bg-white border border-gray-200 rounded shadow-lg z-10`}>
          {content}
        </div>
      )}
    </div>
  );
}