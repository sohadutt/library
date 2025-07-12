import { useState, useEffect } from 'react';

export const useDarkMode = () => {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const savedMode = localStorage.getItem('darkmode');
    return savedMode === 'true' ? true : false;
  });

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('darkmode');
    } else {
      document.body.classList.remove('darkmode');
    }
    localStorage.setItem('darkmode', String(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  return [darkMode, toggleDarkMode] as const;
};