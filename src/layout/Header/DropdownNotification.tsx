import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ClickOutside from './ClickOutside';
import useNotificationHook from '@/hooks/notification/useNotification';
import { INotification } from '@/types/notification/notificatioin';
import { NOTIFICATION_TYPE } from '@/configs';
import { iconArrowBack, iconBackVert } from '@/configs/icon';

const DropdownNotification = () => {
  //state
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifying, setNotifying] = useState(true);
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [showList, setShowList] = useState(true);
  const [notificationDetail, setNotificationDetail] = useState<INotification>();
  const [countUnread, setCountUnread] = useState<number>();
  //hook
  const { getNotification, getUnreadNotification, getNotificationById, updateReadNotification } = useNotificationHook();
  const navigate = useNavigate();
  const feacthNotification = async () => {
    try {
      const res = await getNotification();
      setNotifications(res.data.data);
      return res;
    } catch (error) {
      throw error;
    }
  };

  const fectNotificationDetail = async (id: string) => {
    try {
      const res = await getNotificationById(id);
      setNotificationDetail(res.data);
    } catch (error) {
      throw error;
    }
  };

  const fectUnreadNotification = async () => {
    try {
      const res = await getUnreadNotification();
      setCountUnread(res.data.unread);
      return res;
    } catch (error) {
      throw error;
    }
  };

  const updateRead = async (ids: any) => {
    try {
      const res = await updateReadNotification({ ...ids, ids: ids });
      await fectUnreadNotification();
      return res;
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    feacthNotification();
    fectUnreadNotification();
  }, []);

  const handleNotificationClick = async (item: INotification) => {
    if (item.type === NOTIFICATION_TYPE.newOrder) {
      navigate('/order/all');
      await updateRead([item.id]);
    } else {
      setNotificationDetail(item);
      fectNotificationDetail(item.id);
      await updateRead([item.id]);
      setShowList(false);
    }
  };

  const handleBack = () => {
    setNotificationDetail(undefined);
    setShowList(true);
  };
  return (
    <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
      <div>
        {countUnread != undefined && countUnread > 0 && (
          <span className="absolute -right-3 -top-3 z-999 inline-flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-red-500 text-xs font-bold text-white dark:border-gray-900">
            {countUnread}
          </span>
        )}

        <Link
          onClick={() => {
            setNotifying(false);
            setDropdownOpen(!dropdownOpen);
          }}
          to="#"
          className="relative flex h-8.5 w-8.5 items-center justify-center rounded-full border-[0.5px] border-stroke bg-gray hover:text-primary dark:border-strokedark dark:bg-meta-4 dark:text-white"
        >
          <span
            className={`absolute -top-0.5 right-0 z-1 h-2 w-2 rounded-full bg-meta-1 ${
              notifying === false ? 'hidden' : 'inline'
            }`}
          >
            <span className="absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-meta-1 opacity-75"></span>
          </span>

          <svg
            className="fill-current duration-300 ease-in-out"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.1999 14.9343L15.6374 14.0624C15.5249 13.8937 15.4687 13.7249 15.4687 13.528V7.67803C15.4687 6.01865 14.7655 4.47178 13.4718 3.31865C12.4312 2.39053 11.0812 1.7999 9.64678 1.6874V1.1249C9.64678 0.787402 9.36553 0.478027 8.9999 0.478027C8.6624 0.478027 8.35303 0.759277 8.35303 1.1249V1.65928C8.29678 1.65928 8.24053 1.65928 8.18428 1.6874C4.92178 2.05303 2.4749 4.66865 2.4749 7.79053V13.528C2.44678 13.8093 2.39053 13.9499 2.33428 14.0343L1.7999 14.9343C1.63115 15.2155 1.63115 15.553 1.7999 15.8343C1.96865 16.0874 2.2499 16.2562 2.55928 16.2562H8.38115V16.8749C8.38115 17.2124 8.6624 17.5218 9.02803 17.5218C9.36553 17.5218 9.6749 17.2405 9.6749 16.8749V16.2562H15.4687C15.778 16.2562 16.0593 16.0874 16.228 15.8343C16.3968 15.553 16.3968 15.2155 16.1999 14.9343ZM3.23428 14.9905L3.43115 14.653C3.5999 14.3718 3.68428 14.0343 3.74053 13.6405V7.79053C3.74053 5.31553 5.70928 3.23428 8.3249 2.95303C9.92803 2.78428 11.503 3.2624 12.6562 4.2749C13.6687 5.1749 14.2312 6.38428 14.2312 7.67803V13.528C14.2312 13.9499 14.3437 14.3437 14.5968 14.7374L14.7655 14.9905H3.23428Z"
              fill=""
            />
          </svg>
        </Link>

        {dropdownOpen && (
          <div
            className={`absolute -right-27 mt-2.5 flex h-90 w-75 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark sm:right-0 sm:w-80`}
          >
            <div className="px-4.5 py-3">
              <h5 className="text-sm font-medium text-bodydark2">Notification</h5>
            </div>
            {showList ? (
              <ul className="flex h-auto flex-col overflow-y-auto">
                {notifications.map((item, index) => (
                  <li key={index} className={`${item.is_read != true ? 'font-bold' : 'font-normal'} `}>
                    <div onClick={() => handleNotificationClick(item)} className="cursor-pointer">
                      <Link
                        className={`flex flex-col gap-2.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4 ${
                          item.type !== NOTIFICATION_TYPE.newOrder ? 'bg-white dark:bg-boxdark' : ''
                        }`}
                        to="#"
                      >
                        <p className="text-bold text-sm">
                          <span className="text-black dark:text-white">{item.title}</span>
                        </p>
                        <p className="text-bold truncate text-xs">{item.message}</p>

                        <p className="text-bold text-xs">{new Date(item.created_at).toLocaleDateString()}</p>
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="dark:bg-boxdark">
                <div onClick={handleBack} className="px-4 text-black dark:text-white">
                  {iconArrowBack}
                </div>
                <div className="p-4">
                  <h2 className="mb-2 text-lg font-semibold">{notificationDetail?.title}</h2>
                  <p className="mb-4 text-sm">{notificationDetail?.message}</p>
                  <p className="mb-6 text-xs text-gray-500">
                    {/* {new Date(notificationDetail?.created_at ?? '').toLocaleDateString()} */}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </ClickOutside>
  );
};

export default DropdownNotification;
