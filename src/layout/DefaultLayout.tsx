import React, { useState, ReactNode, useEffect } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Loader from '@/components/Common/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux';
import { TOKEN_KEY } from '@/lib/axios';
import { setUser } from '@/redux/reducer/user';
import userApi from '@/api/user';
import { setMainLoading } from '@/redux/reducer/main';
import { useNavigate } from 'react-router-dom';

const DefaultLayout: React.FC<{ children?: ReactNode }> = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem(TOKEN_KEY);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { mainLoading } = useSelector((state: RootState) => state.main);

  const initial = async () => {
    try {
      const response = await userApi.me();
      if (response?.data) dispatch(setUser(response.data));
      if (response.data.warehouse_id === null) {
        navigate('/onboarding');
      }
      dispatch(setMainLoading(false));
    } catch (error) {
      dispatch(setUser(null));
    }
  };

  const destroy = () => {
    dispatch(setUser(null));
    localStorage.removeItem(TOKEN_KEY);
    return navigate('/auth');
  };

  useEffect(() => {
    if (token) initial();
    else destroy();
  }, [token]);

  return mainLoading ? (
    <Loader />
  ) : (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      <div className="flex h-screen overflow-hidden">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <main>
            <div className="relative mx-auto max-w-screen-3xl p-4 md:p-6 2xl:p-10">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default DefaultLayout;
