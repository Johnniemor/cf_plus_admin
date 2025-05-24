import { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import PageTitle from '@/components/Common/PageTitle';
import DefaultLayout from '@/layout/DefaultLayout';
import NotFound from '@/pages/NotFound';
import { TOKEN_KEY } from '@/lib/axios';
import { AUTH_ROUTES, IRoute, ROUTES } from '@/configs/routes';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux';
import { IUser } from './types/user';
import { ToastContainer } from 'react-toastify';
import { PopupProvider } from './components/Popup';
import useColorMode from './hooks/useColorMode';
import { useTranslation } from 'react-i18next';

function App() {
  const [colorMode] = useColorMode();
  const { pathname } = useLocation();
  const { i18n } = useTranslation();
  const { me } = useSelector((state: RootState) => state.user);
  const { theme } = useSelector((state: RootState) => state.main);
  const user = me as IUser;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, theme, colorMode, i18n]);

  return (
    <div className={`${i18n.language === 'la' ? 'font-lao' : 'font-pop'}`}>
      <PopupProvider>
        <Routes>
          <Route>
            {ROUTES.filter((item) => !item.permissions || item.permissions.includes(user?.role)).map(
              (item: IRoute, index: number) => (
                <Route
                  key={index}
                  path={item.path}
                  element={
                    // item.path === '/onboarding' ? (
                    //   <FreeLayout>
                    //     <PageTitle title={item.title} />
                    //     {item.component}
                    //   </FreeLayout>
                    // ) : (
                    <DefaultLayout>
                      <PageTitle title={item.title} />
                      {item.component}
                    </DefaultLayout>
                    // )
                  }
                />
              ),
            )}
            <Route path="*" element={<NotFound />} />
          </Route>
          {AUTH_ROUTES.map((item: IRoute, index: number) => (
            <Route
              key={index}
              path={item.path}
              element={
                <AuthRoute>
                  <PageTitle title={item.title} />
                  {item.component}
                </AuthRoute>
              }
            />
          ))}
        </Routes>
        <ToastContainer theme={theme} autoClose={3000} draggable="mouse" position="top-left" limit={4} />
      </PopupProvider>
    </div>
  );
}

function AuthRoute({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const token = localStorage.getItem(TOKEN_KEY);
  const { pathname } = useLocation();

  useEffect(() => {
    if (token && pathname.includes('/auth')) navigate('/');
  }, [token, pathname]);

  return children;
}

export default App;
