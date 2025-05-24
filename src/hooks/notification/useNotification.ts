import notification from '@/api/notification';

const useNotificationHook = () => {
  const getNotification = async () => {
    try {
      const response = await notification.getNotification();
      return response;
    } catch (error) {
      throw error;
    }
  };

  const getUnreadNotification = async () => {
    try {
      const response = await notification.getUnreadNotification();
      return response;
    } catch (error) {
      throw error;
    }
  };

  const getNotificationById = async (id: string) => {
    try {
      const response = await notification.getNotificationById(id);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const updateReadNotification = async (ids: Array<string>) => {
    try {
      const response = await notification.updateNotification(ids);
      return response;
    } catch (error) {
      throw error;
    }
  };

  return {
    getNotification,
    getUnreadNotification,
    getNotificationById,
    updateReadNotification,
  };
};

export default useNotificationHook;
