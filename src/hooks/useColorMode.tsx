import { useEffect } from 'react';
import useLocalStorage from './useLocalStorage';
import { useDispatch } from 'react-redux';
import { setTheme } from '@/redux/reducer/main';

type Theme = 'dark' | 'light';

const useColorMode = () => {
  const dispatch = useDispatch();
  const [colorMode, setColorMode] = useLocalStorage<Theme>('color-theme', 'light');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const className = 'dark';
      const bodyClass = window.document.body.classList;

      if (colorMode === 'dark') bodyClass.add(className);
      else bodyClass.remove(className);
      dispatch(setTheme(colorMode));
    }
  }, [colorMode]);

  return [colorMode, setColorMode];
};

export default useColorMode;
