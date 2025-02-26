import {useAppDispatch, useAppSelector} from '@src/store/store';
import {
  addMessages,
  setMessages,
  setLastSeenMessage,
} from '@src/store/slices/chatSlice';
import storage from '@src/utils/storage';
import {storageKeys} from '@src/const/enums';

export const useMessages = () => {
  const dispatch = useAppDispatch();

  const updateByNotification = (notification: INotification) => {
    dispatch(addMessages(notification));
  };

  const setLastSeenMessageId = async (messageId: string) => {
    await storage.setItem(storageKeys.lastSeenMessage, messageId);
    dispatch(setLastSeenMessage(messageId));
  };

  return {updateByNotification, setLastSeenMessageId};
};
